// pages/api/cron/check-expired.js
import prisma from "../../../lib/prisma";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VIP_GROUP_ID = process.env.TELEGRAM_GROUP_ID; // pastikan ini ID grup VIP (angka -100xxxx)

const TG_API = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : null;

function assertEnv() {
  if (!BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  if (!VIP_GROUP_ID) throw new Error("Missing TELEGRAM_GROUP_ID");
}

async function tgSendMessage(chatId, text) {
  return axios.post(`${TG_API}/sendMessage`, {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

// Kick = ban lalu unban (remove user from group)
async function tgKick(groupId, userId) {
  await axios.post(`${TG_API}/banChatMember`, {
    chat_id: Number(groupId),
    user_id: Number(userId),
    revoke_messages: false,
  });
  await axios.post(`${TG_API}/unbanChatMember`, {
    chat_id: Number(groupId),
    user_id: Number(userId),
    only_if_banned: true,
  });
}

export default async function handler(req, res) {
  try {
    assertEnv();

    const now = new Date();
    const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const in1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

    // ===== A) WARNING H-3 (belum pernah dikirim) =====
// Biar gak dobel dengan H-1, kita ambil yang endsAt > 1 hari lagi dan <= 3 hari lagi
const h3List = await prisma.subscription.findMany({
  where: {
    status: "active",
    endsAt: { gt: in1Day, lte: in3Days },
    warn3SentAt: null,
  },
  include: { member: true },
  take: 100,
});

for (const s of h3List) {
  const chatId = s.member?.tgUserId;
  if (!chatId) continue;

  await tgSendMessage(
    chatId,
    `⚠️ <b>Reminder H-3</b>\n\nLangganan VIP kamu akan <b>berakhir dalam 3 hari</b>.\nSilakan perpanjang biar akses tidak terputus. 🙏`
  );

  // ✅ sesuai schema: warn3SentAt (DateTime?)
  await prisma.subscription.update({
    where: { id: s.id },
    data: { warn3SentAt: now },
  });
}

// ===== B) WARNING H-1 (belum pernah dikirim) =====
const h1List = await prisma.subscription.findMany({
  where: {
    status: "active",
    endsAt: { gt: now, lte: in1Day },
    warn1SentAt: null,
  },
  include: { member: true },
  take: 100,
});

for (const s of h1List) {
  const chatId = s.member?.tgUserId;
  if (!chatId) continue;

  await tgSendMessage(
    chatId,
    `⏰ <b>Reminder H-1</b>\n\nLangganan VIP kamu akan <b>berakhir besok</b>.\nKalau tidak diperpanjang, sistem akan otomatis remove dari grup saat expired.`
  );

  // ✅ sesuai schema: warn1SentAt (DateTime?)
  await prisma.subscription.update({
    where: { id: s.id },
    data: { warn1SentAt: now },
  });
}

// ===== C) EXPIRED => ambil list yang sudah lewat =====
const expiredList = await prisma.subscription.findMany({
  where: {
    status: "active",
    endsAt: { lte: now },
  },
  include: { member: true },
  take: 100,
});


    for (const s of expiredList) {
  const userId = s.member?.tgUserId;
  if (!userId) continue;

  // kick dari grup (ban lalu unban)
  await tgKick(VIP_GROUP_ID, userId);

  // ✅ tandai sudah expired supaya tidak diproses ulang
  // (karena query expiredList hanya ambil status: "active")
  await prisma.subscription.update({
    where: { id: s.id },
    data: { status: "expired" },
  });

  // notif user
  await tgSendMessage(
    userId,
    `❌ <b>Langganan kamu sudah expired</b>\n\nAkses VIP sudah dihentikan dan kamu dikeluarkan dari grup.\nKalau mau join lagi, silakan bayar ulang. 🙏`
  );
}

return res.status(200).json({
  ok: true,
  warnH3: h3List.length,
  warnH1: h1List.length,
  kicked: expiredList.length,
});
} catch (e) {
  console.error(e);
  return res.status(200).json({ ok: false, error: String(e?.message || e) });
}
}