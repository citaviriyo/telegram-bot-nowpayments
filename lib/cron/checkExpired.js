import prisma from "../prisma";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VIP_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

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

export async function runCheckExpired() {
  assertEnv();

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

  // H-3
  const h3List = await prisma.subscription.findMany({
    where: {
      status: "active",
      endsAt: { gt: in1Day, lte: in3Days },
      warn3SentAt: null,
    },
    include: { member: true },
  });

  for (const s of h3List) {
    if (!s.member?.tgUserId) continue;
    await tgSendMessage(
      s.member.tgUserId,
      `⚠️ <b>Reminder H-3</b>\n\nLangganan VIP kamu akan berakhir dalam 3 hari.`
    );
    await prisma.subscription.update({
      where: { id: s.id },
      data: { warn3SentAt: now },
    });
  }

  // H-1
  const h1List = await prisma.subscription.findMany({
    where: {
      status: "active",
      endsAt: { gt: now, lte: in1Day },
      warn1SentAt: null,
    },
    include: { member: true },
  });

  for (const s of h1List) {
    if (!s.member?.tgUserId) continue;
    await tgSendMessage(
      s.member.tgUserId,
      `⏰ <b>Reminder H-1</b>\n\nLangganan VIP kamu akan berakhir besok.`
    );
    await prisma.subscription.update({
      where: { id: s.id },
      data: { warn1SentAt: now },
    });
  }

  // EXPIRED
  const expiredList = await prisma.subscription.findMany({
    where: { status: "active", endsAt: { lte: now } },
    include: { member: true },
  });

  for (const s of expiredList) {
    if (!s.member?.tgUserId) continue;
    await tgKick(VIP_GROUP_ID, s.member.tgUserId);
    await prisma.subscription.update({
      where: { id: s.id },
      data: { status: "expired" },
    });
  }

  return {
    warnH3: h3List.length,
    warnH1: h1List.length,
    kicked: expiredList.length,
  };
}
