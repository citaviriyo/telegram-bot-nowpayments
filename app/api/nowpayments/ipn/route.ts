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

/**
 * Fallback kalau order_id null dari NowPayments.
 * Expect order_description seperti:
 * - "KOINITY|664884930|1bulan"
 * - "KOINITY|664884930|3bulan"
 * - "KOINITY|664884930|12bulan"
 * - "KOINITY|664884930|1tahun"
 */
function parseFromOrderDescription(desc: string): { telegramId: string; plan: string; days: number } | null {
  if (!desc) return null;

  const parts = desc.split("|").map((s) => s.trim());
  if (parts.length < 3) return null;

  const telegramId = parts[1];
  const paketRaw = parts[2].toLowerCase();

  // mapping paket → days
  if (paketRaw.includes("1bulan")) return { telegramId, plan: "vip", days: 30 };
  if (paketRaw.includes("3bulan")) return { telegramId, plan: "vip", days: 90 };
  if (paketRaw.includes("12bulan")) return { telegramId, plan: "vip", days: 365 };
  if (paketRaw.includes("1tahun") || paketRaw.includes("12bln")) return { telegramId, plan: "vip", days: 365 };

  // fallback: kalau ada angka, anggap "X bulan"
  const m = paketRaw.match(/(\d+)/);
  if (m) {
    const n = Number(m[1]);
    if (!Number.isNaN(n) && n > 0) return { telegramId, plan: "vip", days: n * 30 };
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const paymentId = String(body.payment_id || "");
    const status = String(body.payment_status || "unknown");

    // order_id bisa null (contoh payload lo), jadi jangan String(null) => "null"
    const orderId = body.order_id ? String(body.order_id) : "";
    const orderDescription = String(body.order_description || "");

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

    // 3) Coba parse dari order_id, kalau gagal fallback ke order_description
    let parsed = orderId ? parseOrderId(orderId) : null;
    if (!parsed) parsed = parseFromOrderDescription(orderDescription);

    if (!parsed) {
      return NextResponse.json({
        ok: true,
        warning: "finished but cannot extract telegramId/days from order_id or order_description",
        orderId: orderId || null,
        orderDescription: orderDescription || null,
      });
    }

    const { telegramId, plan, days } = parsed;

    const now = new Date();
    const endsAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    // 4) Upsert member
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

    // 5) Buat subscription baru (riwayat)
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
