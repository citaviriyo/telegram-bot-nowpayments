import prisma from "../prisma";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VIP_GROUP_ID = process.env.TELEGRAM_GROUP_ID; // ex: "-1002592772128"
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
  // ban lalu unban = “kick”
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

/**
 * Cron runner
 * @param {object} opts
 * @param {boolean} opts.dryRun - kalau true: tidak kirim pesan/kick
 * @param {boolean} opts.writeDb - kalau dryRun tapi tetap mau update kolom warn/kicked untuk simulasi
 */
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
    dryRun,
    errors: [] as Array<{ subId: string; telegramId?: string; step: string; error: string }>,
  };

  async function safeStep(subId: string, telegramId: string | undefined, step: string, fn: () => Promise<void>) {
    try {
      await fn();
    } catch (e: any) {
      const msg = String(e?.message || e);
      console.error(`❌ CRON ERROR step=${step}`, { subId, telegramId, error: msg });
      stats.errors.push({ subId, telegramId, step, error: msg });
    }
  }

  async function processBatches(findManyArgs: any, handler: (s: any) => Promise<void>) {
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
      // NOTE: row yang sudah diupdate (warn/kicked/status) akan keluar dari filter, jadi batch akan maju sendiri.
    }
  }

  // ========= H-3 WARNING =========
  await processBatches(
    {
      where: {
        status: "active",
        endsAt: { gt: in1Day, lte: in3Days },
        warn3SentAt: null,
      },
      include: { member: true },
    },
    async (s) => {
      const telegramId: string | undefined = s?.member?.telegramId;
      if (!telegramId) return;

      const chatId = toTgId(telegramId);
      stats.warnH3++;

      console.log("🟨 CRON H-3", { subId: s.id, telegramId, endsAt: s.endsAt?.toISOString?.(), dryRun });

      const msg =
        `⚠️ <b>Reminder H-3</b>\n\n` +
        `Langganan VIP kamu akan <b>berakhir dalam 3 hari</b>.\n` +
        `Silakan perpanjang biar akses tidak terputus. 🙏`;

      if (dryRun) {
        console.log("🟨 DRY RUN aktif: skip sendMessage H-3", { subId: s.id, telegramId });
      } else {
        await safeStep(s.id, telegramId, "H3_SEND", async () => {
          await tgSendMessage(chatId, msg);
        });
      }

      if (!dryRun || writeDb) {
        await safeStep(s.id, telegramId, "H3_DB", async () => {
          await prisma.subscription.update({
            where: { id: s.id },
            data: { warn3SentAt: now, lastCheckedAt: now },
          });
        });
      }
    }
  );

  // ========= H-1 WARNING =========
  await processBatches(
    {
      where: {
        status: "active",
        endsAt: { gt: now, lte: in1Day },
        warn1SentAt: null,
      },
      include: { member: true },
    },
    async (s) => {
      const telegramId: string | undefined = s?.member?.telegramId;
      if (!telegramId) return;

      const chatId = toTgId(telegramId);
      stats.warnH1++;

      console.log("🟧 CRON H-1", { subId: s.id, telegramId, endsAt: s.endsAt?.toISOString?.(), dryRun });

      const msg =
        `⏰ <b>Reminder H-1</b>\n\n` +
        `Langganan VIP kamu akan <b>berakhir besok</b>.\n` +
        `Kalau tidak diperpanjang, sistem akan otomatis remove dari grup saat expired.`;

      if (dryRun) {
        console.log("🟧 DRY RUN aktif: skip sendMessage H-1", { subId: s.id, telegramId });
      } else {
        await safeStep(s.id, telegramId, "H1_SEND", async () => {
          await tgSendMessage(chatId, msg);
        });
      }

      if (!dryRun || writeDb) {
        await safeStep(s.id, telegramId, "H1_DB", async () => {
          await prisma.subscription.update({
            where: { id: s.id },
            data: { warn1SentAt: now, lastCheckedAt: now },
          });
        });
      }
    }
  );

  // ========= EXPIRED (KICK) =========
  await processBatches(
    {
      where: {
        status: "active",
        endsAt: { lte: now },
        kickedAt: null, // anti dobel kick
      },
      include: { member: true },
    },
    async (s) => {
      const telegramId: string | undefined = s?.member?.telegramId;
      if (!telegramId) return;

      stats.expiredFound++;
      const chatId = toTgId(telegramId);

      console.log("🟥 CRON EXPIRED", { subId: s.id, telegramId, endsAt: s.endsAt?.toISOString?.(), dryRun });

      if (dryRun) {
        console.log("🟥 DRY RUN aktif: skip KICK + sendMessage expired", { subId: s.id, telegramId });
      } else {
        await safeStep(s.id, telegramId, "KICK", async () => {
          await tgKick(String(VIP_GROUP_ID), chatId);
          stats.kicked++;
        });

        await safeStep(s.id, telegramId, "EXPIRED_SEND", async () => {
          await tgSendMessage(
            chatId,
            `❌ <b>Langganan kamu sudah expired</b>\n\n` +
              `Akses VIP sudah dihentikan dan kamu dikeluarkan dari grup.\n` +
              `Kalau mau join lagi, silakan bayar ulang. 🙏`
          );
        });
      }

      if (!dryRun || writeDb) {
        await safeStep(s.id, telegramId, "EXPIRED_DB", async () => {
          await prisma.subscription.update({
            where: { id: s.id },
            data: { status: "expired", kickedAt: now, lastCheckedAt: now },
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
}
