import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Parse dari order_description
 * contoh: "KOINITY|664884930|1bulan"
 */
function parseOrderDescription(desc: string): { telegramId: string; plan: string; days: number } | null {
  if (!desc) return null;
  const parts = desc.split("|").map(s => s.trim());
  if (parts.length < 3) return null;

  const telegramId = parts[1];
  const paket = parts[2].toLowerCase();

  if (paket.includes("1bulan")) return { telegramId, plan: "vip", days: 30 };
  if (paket.includes("3bulan")) return { telegramId, plan: "vip", days: 90 };
  if (paket.includes("12bulan") || paket.includes("1tahun")) return { telegramId, plan: "vip", days: 365 };

  const m = paket.match(/(\d+)/);
  if (m) return { telegramId, plan: "vip", days: Number(m[1]) * 30 };

  return null;
}

export async function GET() {
  const now = new Date();
  let fixed = 0;
  let skipped = 0;

  const payments = await prisma.payment.findMany({
    where: { status: "finished" },
    orderBy: { createdAt: "desc" },
    take: 100, // aman, bisa dinaikkan
  });

  for (const p of payments) {
    const raw = p.raw as any;
    const parsed = parseOrderDescription(raw?.order_description || "");

    if (!parsed) {
      skipped++;
      continue;
    }

    const { telegramId, plan, days } = parsed;
    const endsAt = new Date(p.createdAt.getTime() + days * 24 * 60 * 60 * 1000);

    const member = await prisma.member.upsert({
      where: { telegramId },
      create: {
        telegramId,
        status: "ACTIVE",
        expiredAt: endsAt,
      },
      update: {},
    });

    const existingSub = await prisma.subscription.findFirst({
      where: {
        memberId: member.id,
        endsAt: { gt: now },
      },
    });

    if (existingSub) {
      skipped++;
      continue;
    }

    await prisma.subscription.create({
      data: {
        memberId: member.id,
        plan,
        startsAt: p.createdAt,
        endsAt,
        status: "active",
        lastCheckedAt: now,
      },
    });

    fixed++;
  }

  return NextResponse.json({
    ok: true,
    fixed,
    skipped,
    checked: payments.length,
  });
}
