import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Support 2 format order_id:
 * 1) tg_<telegramId>_<days>_<timestamp>
 * 2) tg_<telegramId>_<plan>_<days>_<timestamp>
 *
 * Contoh:
 * - tg_123456789_30_1700000000
 * - tg_123456789_vip_30_1700000000
 */
function parseOrderId(orderId: string): { telegramId: string; plan: string; days: number } | null {
  const p4 = orderId.match(/^tg_(.+?)_([a-zA-Z0-9-]+)_(\d+)_(\d+)$/);
  if (p4) return { telegramId: p4[1], plan: p4[2], days: Number(p4[3]) };

  const p3 = orderId.match(/^tg_(.+?)_(\d+)_(\d+)$/);
  if (p3) return { telegramId: p3[1], plan: "vip", days: Number(p3[2]) };

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const paymentId = String(body.payment_id || "");
    const status = String(body.payment_status || "unknown");
    const orderId = String(body.order_id || "");

    if (!paymentId) {
      return NextResponse.json({ ok: false, error: "payment_id missing" }, { status: 400 });
    }

    // 1) Rekam semua IPN (idempotent)
    await prisma.payment.upsert({
      where: { paymentId },
      create: { paymentId, status, raw: body },
      update: { status, raw: body },
    });

    // 2) Hanya finished yang mengaktifkan membership
    if (status !== "finished") {
      return NextResponse.json({ ok: true, ignored: status });
    }

    const parsed = parseOrderId(orderId);
    if (!parsed) {
      return NextResponse.json({
        ok: true,
        warning: "finished but order_id format not recognized",
        orderId,
      });
    }

    const { telegramId, plan, days } = parsed;

    const now = new Date();
    const endsAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    // 3) Upsert member (schema lo: telegramId, status, expiredAt)
    const member = await prisma.member.upsert({
      where: { telegramId },
      create: {
        telegramId,
        status: "ACTIVE",
        expiredAt: endsAt,
      },
      update: {
        status: "ACTIVE",
        expiredAt: endsAt,
      },
    });

    // 4) Buat subscription baru (schema lo: plan, startsAt, endsAt, status, lastCheckedAt)
    await prisma.subscription.create({
      data: {
        memberId: member.id,
        plan,
        startsAt: now,
        endsAt,
        status: "active",
        lastCheckedAt: now,
      },
    });

    return NextResponse.json({
      ok: true,
      activated: { telegramId, plan, days, endsAt },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
