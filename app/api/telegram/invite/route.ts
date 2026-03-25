import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { telegramId } = await req.json();
    const normalizedTelegramId = String(telegramId ?? "").trim();
    const now = new Date();

    if (!normalizedTelegramId || !/^\d+$/.test(normalizedTelegramId)) {
      return NextResponse.json({ ok: false, error: "invalid user" }, { status: 401 });
    }

    const member = await prisma.member.findUnique({
      where: { telegramId: normalizedTelegramId },
      include: {
        subscriptions: {
          where: {
            status: "active",
            endsAt: { gt: now },
          },
          orderBy: { endsAt: "desc" },
          take: 1,
        },
      },
    });

    if (!member) {
      return NextResponse.json({ ok: false, error: "invalid user" }, { status: 401 });
    }

    const activeSubscription = member.subscriptions[0];
    const isActiveMember =
      member.status === "ACTIVE" &&
      member.expiredAt instanceof Date &&
      member.expiredAt.getTime() > now.getTime();

    if (!isActiveMember || !activeSubscription) {
      return NextResponse.json({ ok: false, error: "member not active" }, { status: 403 });
    }

    const chatId = (process.env.TELEGRAM_GROUP_ID || "").trim();
    const botToken = (process.env.TELEGRAM_BOT_TOKEN || "").trim();

    if (!botToken) {
      return NextResponse.json({ ok: false, error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
    }
    if (!chatId) {
      return NextResponse.json({ ok: false, error: "Missing TELEGRAM_GROUP_ID" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/createChatInviteLink`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          member_limit: 1,
          expire_date: Math.floor((Date.now() + 15 * 60 * 1000) / 1000),
        }),
      }
    );

    const data = await res.json();

    if (!data.ok) {
      return NextResponse.json({ ok: false, error: data }, { status: 500 });
    }

    const inviteLink = data.result.invite_link as string;

    await prisma.member.update({
      where: { telegramId: normalizedTelegramId },
      data: { inviteLink },
    });

    return NextResponse.json({ ok: true, inviteLink, endsAt: member.expiredAt });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
