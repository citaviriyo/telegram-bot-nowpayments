import prisma from "../prisma";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VIP_GROUP_ID = process.env.TELEGRAM_GROUP_ID; // ex: -1002592772128 (string env)
const TG_API = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : null;

function assertEnv() {
  if (!BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  if (!VIP_GROUP_ID) throw new Error("Missing TELEGRAM_GROUP_ID");
  if (!TG_API) throw new Error("Missing TG_API");
}

function toTgId(telegramId) {
  // telegramId di DB kamu disimpan string, kita pastikan jadi number untuk Telegram API
  const n = Number(telegramId);
  if (!Number.isFinite(n)) throw new Error(`Invalid telegramId: ${telegramId}`);
  return n;
}

async function tgPost(method, body) {
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

async function tgSendMessage(chatId, text) {
  return tgPost("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function tgKick(groupId, userId) {
  // ban lalu unban = “kick” (user bisa join lagi kalau punya link baru)
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
 * @param {boolean} opts.dryRun - kalau true: tidak kirim pesan/kick, hanya log + update DB optional
 * @param {boolean} opts.writeDb - kalau dryRun tapi tetap mau set warn1/warn3/kickedAt untuk simulasi
 */
export async function runCheckExpired(opts = {}) {
  assertEnv();

  const dryRun = Boolean(opts.dryRun);
  const writeDb = Boolean(opts.writeDb);

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

  const stats = {
    warnH3: 0,
    warnH1: 0,
    expiredFound: 0,
    kicked: 0,
    dryRun,
  };

  // Helper: proses per batch biar aman kalau data banyak
  async function processBatches(findManyArgs, handler) {
    let loop = 0;
    while (loop < 50) {
      loop++;
      const list = await prisma.subscription.findMany({
        ...findManyArgs,
        take: 100,
        orderBy: { endsAt: "asc" },
      });
      if (!list.length) break;
      for (const s of list) await handler(s);
      // NOTE: karena kita update row (warn/kicked/status), batch berikutnya akan “geser” sendiri
      // jadi kita tidak perlu cursor rumit.
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
      const telegramId = s?.member?.telegramId;
      if (!telegramId) return;

      const chatId = toTgId(telegramId);
      stats.warnH3++;

      const msg =
        `⚠️ <b>Reminder H-3</b>\n\n` +
        `Langganan VIP kamu akan <b>berakhir dalam 3 hari</b>.\n` +
        `Silakan perpanjang biar akses tidak terputus. 🙏`;

      console.log("🟨 CRON H-3", { subId: s.id, telegramId, endsAt: s.endsAt?.toISOString?.(), dryRun });

      if (!dryRun) {
        await tgSendMessage(chatId, msg);
      }

      if (!dryRun || writeDb) {
        await prisma.subscription.update({
          where: { id: s.id },
          data: { warn3SentAt: now },
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
      const telegramId = s?.member?.telegramId;
      if (!telegramId) return;

      const chatId = toTgId(telegramId);
      stats.warnH1++;

      const msg =
        `⏰ <b>Reminder H-1</b>\n\n` +
        `Langganan VIP kamu akan <b>berakhir besok</b>.\n` +
        `Kalau tidak diperpanjang, sistem akan otomatis remove dari grup saat expired.`;

      console.log("🟧 CRON H-1", { subId: s.id, telegramId, endsAt: s.endsAt?.toISOString?.(), dryRun });

      if (!dryRun) {
        await tgSendMessage(chatId, msg);
      }

      if (!dryRun || writeDb) {
        await prisma.subscription.update({
          where: { id: s.id },
          data: { warn1SentAt: now },
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
      const telegramId = s?.member?.telegramId;
      if (!telegramId) return;

      stats.expiredFound++;

      const chatId = toTgId(telegramId);

      console.log("🟥 CRON EXPIRED", { subId: s.id, telegramId, endsAt: s.endsAt?.toISOString?.(), dryRun });

      if (!dryRun) {
        await tgKick(VIP_GROUP_ID, chatId);
        stats.kicked++;

        await tgSendMessage(
          chatId,
          `❌ <b>Langganan kamu sudah expired</b>\n\n` +
            `Akses VIP sudah dihentikan dan kamu dikeluarkan dari grup.\n` +
            `Kalau mau join lagi, silakan bayar ulang. 🙏`
        );
      }

      // Update DB: status expired + kickedAt (biar idempotent)
      if (!dryRun || writeDb) {
        await prisma.subscription.update({
          where: { id: s.id },
          data: { status: "expired", kickedAt: now, lastCheckedAt: now },
        });

        // opsional: update cache status member (biar gampang baca)
        await prisma.member.update({
          where: { id: s.member.id },
          data: { status: "EXPIRED" },
        });
      }
    }
  );

  return stats;
}
