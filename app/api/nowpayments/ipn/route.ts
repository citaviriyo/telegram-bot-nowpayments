import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const paymentId = String(body.payment_id || "");
    const status = String(body.payment_status || "unknown");

    if (!paymentId) {
      return NextResponse.json({ ok: false, error: "payment_id missing" }, { status: 400 });
    }

    // Upsert biar aman kalau IPN dikirim ulang (umum terjadi)
    await prisma.payment.upsert({
      where: { paymentId },
      create: { paymentId, status, raw: body },
      update: { status, raw: body },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
