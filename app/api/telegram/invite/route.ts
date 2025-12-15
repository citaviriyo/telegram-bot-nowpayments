import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { telegramId } = await req.json();
    if (!telegramId) {
      return NextResponse.json({ ok: false, error: "telegramId required" }, { status: 400 });
    }

    const member = await prisma.member.findUnique({
      where: { telegramId: String(telegramId) },
    });

    if (!member || member.status !== "ACTIVE") {
      return NextResponse.json({ ok: false, error: "member not active" }, { status: 400 });
    }

    // buat link 1x pakai, expire 15 menit
    const chatId = (process.env.TELEGRAM_VIP_CHAT_ID || "").trim();
const botToken = (process.env.TELEGRAM_BOT_TOKEN || "").trim();

if (!botToken) {
  return NextResponse.json({ ok: false, error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
}
if (!chatId) {
  return NextResponse.json({ ok: false, error: "Missing TELEGRAM_VIP_CHAT_ID" }, { status: 500 });
}

    const res = await fetch(`https://api.telegram.org/bot${botToken}{process.env.TELEGRAM_BOT_TOKEN}/createChatInviteLink`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        member_limit: 1,
        expire_date: Math.floor((Date.now() + 15 * 60 * 1000) / 1000),
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json({ ok: false, error: data }, { status: 500 });
    }

    const inviteLink = data.result.invite_link as string;

    await prisma.member.update({
      where: { telegramId: String(telegramId) },
      data: { inviteLink },
    });

    return NextResponse.json({ ok: true, inviteLink, endsAt: member.expiredAt });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
