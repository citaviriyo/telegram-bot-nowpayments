import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

export const runtime = "nodejs";

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
  return d.toISOString().slice(0, 10);
}

/**
 * Telegram invite link (1x pakai).
 * NOTE: expire_date Telegram max ~31 hari dari sekarang.
 * Jadi jangan pakai endsAt kalau membership 90/365 hari.
 * Kita set 24 jam dari sekarang biar aman.
 */
async function telegramCreateInviteLink() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupId = process.env.TELEGRAM_GROUP_ID;
  if (!token || !groupId) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_GROUP_ID");

  const url = `https://api.telegram.org/bot${token}/createChatInviteLink`;
  const expire_date = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 jam

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: Number(groupId),
      name: "KOINITY VIP Invite (1x)",
      member_limit: 1,
      expire_date,
      creates_join_request: false,
    }),
  });

  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram createChatInviteLink failed: ${JSON.stringify(j)}`);
  return j.result.invite_link as string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function telegramSendMessageHTML(telegramId: string, html: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: Number(telegramId),
      text: html,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram sendMessage failed: ${JSON.stringify(j)}`);
  return true;
}

export async function POST(req: Request) {
  try {
    // 0) raw body for signature + debug
    const raw = await req.text();
    const sig = req.headers.get("x-nowpayments-sig");
    const v = verifyNowPaymentsSig(raw, sig);
    if (!v.ok) {
      console.log("❌ IPN SIG FAIL:", v);
      return NextResponse.json({ ok: false, error: "signature verification failed" }, { status: 401 });
    }

    const body = raw ? JSON.parse(raw) : {};

    // ===== DEBUG LOG (FULL PAYLOAD) =====
    console.log("========================================");
    console.log("✅ NOWPAYMENTS IPN HIT");
    console.log("🕒 time:", new Date().toISOString());
    console.log("🌐 url:", req.url);
    console.log("📦 headers (subset):", {
      "content-type": req.headers.get("content-type"),
      "user-agent": req.headers.get("user-agent"),
      "x-forwarded-for": req.headers.get("x-forwarded-for"),
      "x-real-ip": req.headers.get("x-real-ip"),
      "x-nowpayments-sig": sig ? "(present)" : "(missing)",
    });
    console.log("📨 IPN RAW JSON:");
    console.log(JSON.stringify(body, null, 2));
    console.log("🧾 IPN SUMMARY:", {
      payment_id: body?.payment_id,
      payment_status: body?.payment_status,
      order_id: body?.order_id,
      order_description: body?.order_description,
      price_amount: body?.price_amount,
      price_currency: body?.price_currency,
      pay_amount: body?.pay_amount,
      pay_currency: body?.pay_currency,
      actually_paid: body?.actually_paid,
      outcome_amount: body?.outcome_amount,
      outcome_currency: body?.outcome_currency,
      invoice_id: body?.invoice_id,
    });
    console.log("========================================");
    // ===== END DEBUG LOG =====

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
      console.log("ℹ️ IPN ignored status:", incomingStatus, "paymentId:", paymentId);
      return NextResponse.json({ ok: true, ignored: incomingStatus });
    }

    // 2b) idempotency: kalau sebelumnya sudah finished, stop (hindari subscription & invite dobel)
    if (existing?.status === "finished") {
      console.log("ℹ️ alreadyProcessed finished:", paymentId);
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    // 3) parse telegramId/days
    let parsed = orderId ? parseOrderId(orderId) : null;
    if (!parsed) parsed = parseFromOrderDescription(orderDescription);

    if (!parsed) {
      console.log("⚠️ finished but cannot parse telegramId/days", { orderId, orderDescription, paymentId });
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

      const active = await tx.subscription.findFirst({
        where: { memberId: m.id, status: "active", plan },
        orderBy: { endsAt: "desc" },
      });

      if (active) {
        await tx.subscription.update({
          where: { id: active.id },
          data: { endsAt, lastCheckedAt: now, status: "active" },
        });
      } else {
        await tx.subscription.create({
          data: { memberId: m.id, plan, startsAt: now, endsAt, status: "active", lastCheckedAt: now },
        });
      }

      return m;
    });

    // 5) create invite link 1x + simpan
    const inviteLink = await telegramCreateInviteLink();
    await prisma.member.update({
      where: { id: member.id },
      data: { inviteLink },
    });

    // 6) DM user (HTML, anti error entity)
    const html =
      `✅ <b>Pembayaran berhasil!</b>\n\n` +
      `🎟️ VIP aktif <b>${escapeHtml(String(days))} hari</b>\n` +
      `⏳ Sampai: <b>${escapeHtml(fmtDateJakarta(endsAt))}</b>\n\n` +
      `👉 Link join VIP Group (1x pakai):\n${escapeHtml(inviteLink)}\n\n` +
      `Kalau link expired, chat admin.`;

    await telegramSendMessageHTML(telegramId, html);

    console.log("✅ ACTIVATED:", { telegramId, plan, days, endsAt: endsAt.toISOString(), paymentId });

    return NextResponse.json({
      ok: true,
      activated: { telegramId, plan, days, endsAt },
      telegram: { inviteLink },
    });
  } catch (e: any) {
    console.log("❌ IPN ERROR:", e);
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
