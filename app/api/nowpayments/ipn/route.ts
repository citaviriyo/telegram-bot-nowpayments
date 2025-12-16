import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

/**
 * Optional signature verify (recommended).
 * Aktif kalau env NOWPAYMENTS_IPN_SECRET di-set.
 */
function verifyNowPaymentsSig(rawBody: string, sigHeader: string | null) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret) return { ok: true, skipped: true };
  if (!sigHeader) return { ok: false, error: "Missing x-nowpayments-sig" };

  const h = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  return h === sigHeader ? { ok: true } : { ok: false, error: "Invalid signature" };
}

/**
 * Support 2 format order_id:
 * 1) tg_<telegramId>_<days>_<timestamp>
 * 2) tg_<telegramId>_<plan>_<days>_<timestamp>
 */
function parseOrderId(orderId: string): { telegramId: string; plan: string; days: number } | null {
  const p4 = orderId.match(/^tg_(.+?)_([a-zA-Z0-9-]+)_(\d+)_(\d+)$/);
  if (p4) return { telegramId: p4[1], plan: p4[2], days: Number(p4[3]) };

  const p3 = orderId.match(/^tg_(.+?)_(\d+)_(\d+)$/);
  if (p3) return { telegramId: p3[1], plan: "vip", days: Number(p3[2]) };

  return null;
}

/**
 * Fallback kalau order_id null.
 * Expect order_description seperti:
 * - "KOINITY|664884930|1bulan"
 */
function parseFromOrderDescription(desc: string): { telegramId: string; plan: string; days: number } | null {
  if (!desc) return null;

  const parts = desc.split("|").map((s) => s.trim());
  if (parts.length < 3) return null;

  const telegramId = parts[1];
  const paketRaw = parts[2].toLowerCase();

  if (paketRaw.includes("1bulan")) return { telegramId, plan: "vip", days: 30 };
  if (paketRaw.includes("3bulan")) return { telegramId, plan: "vip", days: 90 };
  if (paketRaw.includes("12bulan")) return { telegramId, plan: "vip", days: 365 };
  if (paketRaw.includes("1tahun") || paketRaw.includes("12bln")) return { telegramId, plan: "vip", days: 365 };

  const m = paketRaw.match(/(\d+)/);
  if (m) {
    const n = Number(m[1]);
    if (!Number.isNaN(n) && n > 0) return { telegramId, plan: "vip", days: n * 30 };
  }

  return null;
}

function fmtDateJakarta(d: Date) {
  // biar user ga bingung timezone; simple YYYY-MM-DD
  return d.toISOString().slice(0, 10);
}

async function telegramCreateInviteLink(expireAt: Date) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupId = process.env.TELEGRAM_GROUP_ID;
  if (!token || !groupId) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_GROUP_ID");

  const url = `https://api.telegram.org/bot${token}/createChatInviteLink`;
  const expire_date = Math.floor(expireAt.getTime() / 1000);

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: Number(groupId),
      name: "KOINITY VIP Invite",
      member_limit: 1,
      expire_date,
      creates_join_request: false,
    }),
  });

  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram createChatInviteLink failed: ${JSON.stringify(j)}`);
  return j.result.invite_link as string;
}

async function telegramSendMessage(telegramId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: Number(telegramId),
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });

  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram sendMessage failed: ${JSON.stringify(j)}`);
  return true;
}

export async function POST(req: Request) {
  try {
    // 0) raw body for signature
    const raw = await req.text();
    const sig = req.headers.get("x-nowpayments-sig");
    const v = verifyNowPaymentsSig(raw, sig);
    if (!v.ok) {
      return NextResponse.json({ ok: false, error: "signature verification failed" }, { status: 401 });
    }

    const body = raw ? JSON.parse(raw) : {};
    console.log("🔥 ROUTE.TS HIT ✅", body?.payment_id, body?.payment_status);

    const paymentId = String(body.payment_id || "");
    const incomingStatus = String(body.payment_status || "unknown");
    const orderId = body.order_id ? String(body.order_id) : "";
    const orderDescription = String(body.order_description || "");

    if (!paymentId) {
      return NextResponse.json({ ok: false, error: "payment_id missing" }, { status: 400 });
    }

    // 1) Upsert payment + ambil status sebelumnya (buat anti retry)
    const existing = await prisma.payment.findUnique({ where: { paymentId } });

    await prisma.payment.upsert({
      where: { paymentId },
      create: { paymentId, status: incomingStatus, raw: body },
      update: { status: incomingStatus, raw: body },
    });

    // 2) hanya finished yang memicu aktivasi
    if (incomingStatus !== "finished") {
      return NextResponse.json({ ok: true, ignored: incomingStatus });
    }

    // 2b) idempotency: kalau sebelumnya sudah finished, stop (hindari subscription & invite dobel)
    if (existing?.status === "finished") {
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    // 3) parse telegramId/days
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

    // Kalau member masih aktif, extend dari expiredAt (biar renewal ga mengurangi masa aktif)
    const prevMember = await prisma.member.findUnique({ where: { telegramId } });
    const baseTime =
      prevMember?.expiredAt && prevMember.expiredAt.getTime() > now.getTime()
        ? prevMember.expiredAt
        : now;

    const endsAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);

    // 4) transaksi: upsert member + upsert/extend subscription active
    const member = await prisma.$transaction(async (tx) => {
      const m = await tx.member.upsert({
        where: { telegramId },
        create: { telegramId, status: "ACTIVE", expiredAt: endsAt },
        update: { status: "ACTIVE", expiredAt: endsAt },
      });

      // cari subscription aktif terakhir untuk plan ini
      const active = await tx.subscription.findFirst({
        where: { memberId: m.id, status: "active", plan },
        orderBy: { endsAt: "desc" },
      });

      if (active) {
        // extend subscription aktif
        await tx.subscription.update({
          where: { id: active.id },
          data: {
            endsAt,
            lastCheckedAt: now,
            status: "active",
          },
        });
      } else {
        // buat baru
        await tx.subscription.create({
          data: {
            memberId: m.id,
            plan,
            startsAt: now,
            endsAt,
            status: "active",
            lastCheckedAt: now,
          },
        });
      }

      return m;
    });

    // 5) create invite link + simpan ke member.inviteLink
    const inviteLink = await telegramCreateInviteLink(endsAt);
    await prisma.member.update({
      where: { id: member.id },
      data: { inviteLink },
    });

    // 6) DM user
    const msg =
      `✅ *Pembayaran berhasil!*\n\n` +
      `🎟️ VIP aktif *${days} hari*\n` +
      `⏳ Sampai: *${fmtDateJakarta(endsAt)}*\n\n` +
      `👉 Link join VIP Group (1x pakai):\n${inviteLink}\n\n` +
      `Kalau link expired, chat admin.`;

    await telegramSendMessage(telegramId, msg);

    return NextResponse.json({
      ok: true,
      activated: { telegramId, plan, days, endsAt },
      telegram: { inviteLink },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
