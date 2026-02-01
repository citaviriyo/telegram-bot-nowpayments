import prisma from "../prisma";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VIP_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const TG_API = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : null;

type RunOpts = {
  dryRun?: boolean;
  writeDb?: boolean;
};

function assertEnv() {
  if (!BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  if (!VIP_GROUP_ID) throw new Error("Missing TELEGRAM_GROUP_ID");
  if (!TG_API) throw new Error("Missing TG_API");
}

function toTgId(telegramId: string) {
  const n = Number(telegramId);
  if (!Number.isFinite(n)) throw new Error(`Invalid telegramId: ${telegramId}`);
  return n;
}

async function tgPost(method: string, body: any) {
  const r = await fetch(`${TG_API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await r.json().catch(() => null);
  if (!r.ok || (data && data.ok === false)) {
    throw new Error(`Telegram API error ${method}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function tgSendMessage(chatId: number, text: string) {
  return tgPost("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function tgKick(groupId: string, userId: number) {
  await tgPost("banChatMember", {
    chat_id: Number(groupId),
    user_id: Number(userId),
    revoke_messages: false,
  });

  await tgPost("unbanChatMember", {
    chat_id: Number(groupId),
    user_id: Number(userId),
    only_if_banned: true,
  });
}

async function tgGetChatMember(groupId: string, userId: number) {
  const data = await tgPost("getChatMember", {
    chat_id: Number(groupId),
    user_id: Number(userId),
  });
  return data?.result as { status?: string } | null;
}

function isAdminOrOwner(status?: string) {
  return status === "creator" || status === "administrator";
}

export async function runCheckExpired(opts: RunOpts = {}) {
  assertEnv();

  const dryRun = Boolean(opts.dryRun);
  const writeDb = Boolean(opts.writeDb);

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

  const stats: any = {
    warnH3: 0,
    warnH1: 0,
    expiredFound: 0,
    kicked: 0,
    skippedAdminOwner: 0,
    dryRun,
    errors: [] as Array<{
      subId: string;
      telegramId?: string;
      step: string;
      error: string;
    }>,
  };

  async function safeStep(
    subId: string,
    telegramId: string | undefined,
    step: string,
    fn: () => Promise<void>
  ) {
    try {
      await fn();
    } catch (e: any) {
      const msg = String(e?.message || e);
      console.warn(`⚠️ CRON WARN step=${step}`, { subId, telegramId, error: msg });
      stats.errors.push({ subId, telegramId, step, error: msg });
    }
  }

  async function processBatches(
    findManyArgs: any,
    handler: (s: any) => Promise<void>
  ) {
    let loop = 0;
    while (loop < 50) {
      loop++;
      const list = await prisma.subscription.findMany({
        ...findManyArgs,
        take: 100,
        orderBy: { endsAt: "asc" },
      });
      if (!list.length) break;
      for (const s of list) {
        await handler(s);
      }
    }
  }

  try {
    // ========================
    // H-3 REMINDER (ROBUST)
    // ========================
    await processBatches(
      {
        where: {
          status: "active",
          warn3SentAt: null,
          endsAt: {
            gt: now,
            lte: in3Days,
          },
        },
        include: { member: true },
      },
      async (s) => {
        const telegramId = s?.member?.telegramId;
        if (!telegramId) return;

        stats.warnH3++;
        const chatId = toTgId(telegramId);

        if (!dryRun) {
          await safeStep(s.id, telegramId, "H3_SEND", () =>
            tgSendMessage(
              chatId,
              `⚠️ <b>Reminder H-3</b>\n\n` +
                `Langganan VIP kamu akan <b>berakhir dalam 3 hari</b>.\n` +
                `Silakan segera perpanjang. 🙏`
            )
          );
        }

        if (!dryRun || writeDb) {
          await safeStep(s.id, telegramId, "H3_DB", () =>
            prisma.subscription.update({
              where: { id: s.id },
              data: {
                warn3SentAt: now,
                lastCheckedAt: now,
              },
            })
          );
        }
      }
    );

    // ========================
    // H-1 REMINDER (ROBUST)
    // ========================
    await processBatches(
      {
        where: {
          status: "active",
          warn1SentAt: null,
          endsAt: {
            gt: now,
            lte: in1Day,
          },
        },
        include: { member: true },
      },
      async (s) => {
        const telegramId = s?.member?.telegramId;
        if (!telegramId) return;

        stats.warnH1++;
        const chatId = toTgId(telegramId);

        if (!dryRun) {
          await safeStep(s.id, telegramId, "H1_SEND", () =>
            tgSendMessage(
              chatId,
              `⏰ <b>Reminder H-1</b>\n\n` +
                `Langganan VIP akan <b>berakhir dalam 24 jam</b>.\n` +
                `Jika tidak diperpanjang, kamu akan dikeluarkan dari grup.`
            )
          );
        }

        if (!dryRun || writeDb) {
          await safeStep(s.id, telegramId, "H1_DB", () =>
            prisma.subscription.update({
              where: { id: s.id },
              data: {
                warn1SentAt: now,
                lastCheckedAt: now,
              },
            })
          );
        }
      }
    );

    // ===== END PART 1 =====
    // ========================
    //          EXPIRED
    // ========================
    await processBatches(
      {
        where: {
          status: "active",
          endsAt: { lte: now },
          kickedAt: null,
        },
        include: { member: true },
      },
      async (s) => {
        const telegramId = s?.member?.telegramId;
        if (!telegramId) return;

        stats.expiredFound++;
        const chatId = toTgId(telegramId);

        let roleStatus: string | undefined;
        let roleCheckOk = false;

        // ROLE CHECK
        await safeStep(s.id, telegramId, "ROLE_CHECK", async () => {
          const cm = await tgGetChatMember(String(VIP_GROUP_ID), chatId);
          roleStatus = cm?.status;
          roleCheckOk = true;
        });

        // ================================
        // MEMBER_NOT_FOUND → CLOSE SILENT
        // ================================
        if (!roleCheckOk) {
          if (!dryRun || writeDb) {
            await safeStep(s.id, telegramId, "CLOSE_DB", async () => {
              await prisma.subscription.update({
                where: { id: s.id },
                data: {
                  status: "expired",
                  kickedAt: now,
                  lastCheckedAt: now,
                },
              });

              await prisma.member.update({
                where: { id: s.member.id },
                data: { status: "EXPIRED" },
              });
            });
          }
          return;
        }

        // ====================================
        // ADMIN / OWNER — HARD IMMUNE (NO KICK)
        // ====================================
        if (isAdminOrOwner(roleStatus)) {
          stats.skippedAdminOwner++;

          if (!dryRun || writeDb) {
            await safeStep(s.id, telegramId, "ADMIN_EXPIRE_DB", async () => {
              await prisma.subscription.update({
                where: { id: s.id },
                data: {
                  status: "expired",
                  lastCheckedAt: now,
                },
              });
            });
          }
          return;
        }

        // ====================================
        // USER EXPIRED → NOTIF + KICK
        // ====================================
        if (!dryRun) {
          await safeStep(s.id, telegramId, "EXPIRED_SEND", async () => {
            await tgSendMessage(
              chatId,
              `❌ <b>Langganan VIP telah berakhir</b>\n\n` +
                `Akses VIP dihentikan & kamu dikeluarkan dari grup.\n` +
                `Silakan berlangganan kembali jika ingin lanjut. 🙏`
            );
          });

          await safeStep(s.id, telegramId, "KICK", async () => {
            await tgKick(String(VIP_GROUP_ID), chatId);
            stats.kicked++;
          });
        }

        if (!dryRun || writeDb) {
          await safeStep(s.id, telegramId, "EXPIRED_DB", async () => {
            await prisma.subscription.update({
              where: { id: s.id },
              data: {
                status: "expired",
                kickedAt: now,
                lastCheckedAt: now,
              },
            });

            await prisma.member.update({
              where: { id: s.member.id },
              data: { status: "EXPIRED" },
            });
          });
        }
      }
    );

    return stats;
  } finally {
    // 🔑 WAJIB — MENUTUP KONEKSI PRISMA (NEON IDLE)
    await prisma.$disconnect();
  }
}
