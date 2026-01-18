import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

export const runtime = "nodejs";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

/* =========================
   UTILS
========================= */

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function truncate(s: string, max = 1200) {
  if (!s) return s;
  return s.length > max ? s.slice(0, max) + `…(truncated ${s.length - max} chars)` : s;
}

function pickNowPaymentsSummary(body: any) {
  const get = (k: string) => (body?.[k] !== undefined && body?.[k] !== null ? body[k] : undefined);

  return {
    payment_id: get("payment_id"),
    payment_status: get("payment_status"),
    order_id: get("order_id"),
    order_description: get("order_description"),
    price_amount: get("price_amount"),
    price_currency: get("price_currency"),
    pay_amount: get("pay_amount"),
    pay_currency: get("pay_currency"),
    actually_paid: get("actually_paid"),
    fee: get("fee"),
    outcome_amount: get("outcome_amount"),
    outcome_currency: get("outcome_currency"),
    invoice_id: get("invoice_id"),
    pay_address: get("pay_address"),
    created_at: get("created_at"),
    updated_at: get("updated_at"),
  };
}

function listKeys(body: any) {
  try {
    return Object.keys(body || {}).sort();
  } catch {
    return [];
  }
}

function verifyNowPaymentsSigFromRaw(rawBody: string, sigHeader: string | null) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret) return { ok: true as const, skipped: true as const };

  if (!sigHeader) return { ok: false as const, error: "Missing x-nowpayments-sig" };

  const computed = crypto
    .createHmac("sha512", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  const a = computed.trim().toLowerCase();
  const b = sigHeader.trim().toLowerCase();

  return a === b ? { ok: true as const } : { ok: false as const, error: "Invalid signature" };
}

function parseFromOrderDescription(desc: string): { telegramId: string; days: number; plan: string } | null {
  if (!desc) return null;

  const parts = desc.split("|").map((s) => s.trim());
  if (parts.length < 3) return null;

  const telegramId = String(parts[1] || "").trim();
  const paket = String(parts[2] || "").trim().toLowerCase();
  if (!telegramId) return null;

  if (paket.includes("1bulan")) return { telegramId, days: 30, plan: "vip" };
  if (paket.includes("3bulan")) return { telegramId, days: 90, plan: "vip" };
  if (paket.includes("1tahun") || paket.includes("12bulan") || paket.includes("12bln")) return { telegramId, days: 365, plan: "vip" };

  return null;
}

function fmtDateJakarta(d: Date) {
  return d.toISOString().slice(0, 10);
}

/* =========================
   TELEGRAM HELPERS
========================= */

async function telegramCreateInviteLink() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupId = process.env.TELEGRAM_GROUP_ID;
  if (!token || !groupId) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_GROUP_ID");

  const res = await fetch(`https://api.telegram.org/bot${token}/createChatInviteLink`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: Number(groupId),
      name: "KOINITY VIP Invite (1x)",
      member_limit: 1,
      expire_date: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      creates_join_request: false,
    }),
  });

  const json = await res.json();
  if (!json.ok) throw new Error(`Failed to create invite link: ${truncate(JSON.stringify(json), 1200)}`);

  return json.result.invite_link as string;
}

async function telegramSendMessageHTML(telegramId: string, html: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: Number(telegramId),
      text: html,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const json = await res.json();
  if (!json.ok) throw new Error(`Telegram sendMessage failed: ${truncate(JSON.stringify(json), 1200)}`);
}

/* =========================
   NEW — MEMBERSHIP CHECK
========================= */

async function telegramCheckMembership(telegramId: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const groupId = process.env.TELEGRAM_GROUP_ID!;
  const url = `https://api.telegram.org/bot${token}/getChatMember?chat_id=${groupId}&user_id=${telegramId}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (!json.ok) return "unknown";
    return json.result.status as string;
  } catch {
    return "unknown";
  }
}
/* =========================
   IPN HANDLER
========================= */

export async function POST(req: Request) {
  const startedAt = Date.now();
  const reqId = crypto.randomUUID();
  let paymentIdForUnlock: string | null = null;

  try {
    const raw = await req.text();
    const sig = req.headers.get("x-nowpayments-sig");

    console.log("📩 IPN IN", {
      reqId,
      hasSig: !!sig,
      rawBytes: raw ? Buffer.byteLength(raw, "utf8") : 0,
      ct: req.headers.get("content-type"),
      ua: req.headers.get("user-agent"),
    });

    const verify = verifyNowPaymentsSigFromRaw(raw, sig);
    if (!verify.ok) {
      console.log("❌ IPN signature invalid", { reqId, sigExists: !!sig, error: verify.error });
      return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
    }

    let body: any = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      console.log("❌ IPN invalid json", { reqId, rawPreview: truncate(raw, 800) });
      return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
    }

    const summary = pickNowPaymentsSummary(body);
    const keys = listKeys(body);

    const paymentId = String(body.payment_id || "");
    const status = String(body.payment_status || "unknown").toLowerCase();
    const desc = String(body.order_description || "");

    if (!paymentId) {
      console.log("❌ IPN missing payment_id", { reqId, keys, summary });
      return NextResponse.json({ ok: false, error: "payment_id missing" }, { status: 400 });
    }

    paymentIdForUnlock = paymentId;

    console.log("🧾 IPN DETAILS", {
      reqId,
      paymentId,
      status,
      summary,
      keys,
    });

    await prisma.payment.upsert({
      where: { paymentId },
      create: { paymentId, status, raw: body },
      update: { status, raw: body },
    });

    const paid = status === "confirmed" || status === "finished";
    if (!paid) {
      console.log("⏳ IPN NOT PAID (ignored)", {
        reqId,
        paymentId,
        status,
        summary,
        ms: Date.now() - startedAt,
      });
      return NextResponse.json({ ok: true, ignored: status });
    }

    /* =========================
       UNDERPAID CHECK
    ========================== */
    const expected = Number(body.price_amount || 0);
    const received = Number(body.actually_paid || body.pay_amount || 0);
    const short = expected - received;
    const tolerated = short <= 0.01; // toleransi ~1 cent

    if (!tolerated) {
      console.log("⚠️ UNDERPAID — NO INVITE", {
        reqId,
        paymentId,
        expected,
        received,
        short,
        status,
      });

      const parsedForUnderpaid = parseFromOrderDescription(desc);
      if (parsedForUnderpaid?.telegramId) {
        const telegramId = parsedForUnderpaid.telegramId;

        const html =
          `⚠️ <b>Pembayaran tidak mencukupi</b>\n\n` +
          `Harga: <b>$${expected.toFixed(2)}</b>\n` +
          `Diterima: <b>$${received.toFixed(2)}</b>\n` +
          `Kurang: <b>$${short.toFixed(2)}</b>\n\n` +
          `Silakan bayar ulang dengan memperhatikan fee jaringan.\n\n` +
          `⛔ <b>Akses VIP belum aktif.</b>`;

        try {
          await telegramSendMessageHTML(telegramId, html);
        } catch (err) {
          console.error("❌ FAILED SEND TELEGRAM UNDERPAID MSG:", err);
        }
      }

      return NextResponse.json({ ok: true, underpaid: true });
    }

    /* =========================
       IDEMPOTENT LOCK
    ========================== */
    const claimed = await prisma.payment.updateMany({
      where: { paymentId, inviteSentAt: null },
      data: { inviteSentAt: new Date() },
    });

    if (claimed.count === 0) {
      console.log("🔁 IPN already processed", { reqId, paymentId, status });
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    const parsed = parseFromOrderDescription(desc);
    if (!parsed) {
      await prisma.payment.update({
        where: { paymentId },
        data: { inviteSentAt: null },
      });

      console.log("⚠️ IPN cannot parse order_description", {
        reqId,
        paymentId,
        order_description: desc,
        summary,
      });

      return NextResponse.json({ ok: true, warning: "cannot parse order_description" });
    }
    const telegramId = parsed.telegramId;
    const days = parsed.days;
    const plan = parsed.plan;

    const now = new Date();

    /* =========================
       EXTEND SUBSCRIPTION LOGIC
    ========================== */

    const lastActiveSub = await prisma.subscription.findFirst({
      where: { member: { telegramId }, status: "active", plan },
      orderBy: { endsAt: "desc" },
    });

    const baseTime =
      lastActiveSub?.endsAt && lastActiveSub.endsAt.getTime() > now.getTime()
        ? lastActiveSub.endsAt
        : now;

    const endsAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);

    console.log("🧮 SUB-EXTEND", {
      reqId,
      telegramId,
      plan,
      days,
      baseTime: baseTime.toISOString(),
      endsAt: endsAt.toISOString(),
    });

    const member = await prisma.$transaction(async (tx) => {
      const m = await tx.member.upsert({
        where: { telegramId },
        create: { telegramId, expiredAt: endsAt, status: "ACTIVE" },
        update: { expiredAt: endsAt, status: "ACTIVE" },
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

    console.log("👤 MEMBER UPSERT OK", {
      reqId,
      telegramId,
      memberId: member.id,
      endsAt: endsAt.toISOString(),
    });

    /* =========================
       🔥 ANTI SEAT-SHARING SECTION
       Placement = setelah extend
    ========================== */

    const membership = await telegramCheckMembership(telegramId);

    console.log("🔍 TG MEMBERSHIP CHECK", {
      reqId,
      telegramId,
      membership,
    });

    const isInGroup =
      membership === "member" ||
      membership === "administrator" ||
      membership === "creator";

    if (!isInGroup) {
      /* =========================
         CASE A — NEW / EXPIRED USER
         → kirim link invite
      ========================== */

      const inviteLink = await telegramCreateInviteLink();

      await prisma.member.update({
        where: { id: member.id },
        data: { inviteLink },
      });

      console.log("🎟️ INVITE CREATED", {
        reqId,
        telegramId,
        inviteLink,
      });

      const html =
        `✅ <b>Pembayaran berhasil!</b>\n\n` +
        `🎫 Paket: <b>${escapeHtml(plan.toUpperCase())}</b>\n` +
        `⏳ Durasi: <b>${days} hari</b>\n` +
        `📅 Sampai: <b>${fmtDateJakarta(endsAt)}</b>\n\n` +
        `👉 Link Join VIP (1x pakai):\n${escapeHtml(inviteLink)}\n\n` +
        `Kalau expired atau error, chat admin.`;

      await telegramSendMessageHTML(telegramId, html);

    } else {
      /* =========================
         CASE B — RENEWAL SAAT MASIH DI GROUP
         → tidak kirim invite
      ========================== */

      console.log("♻️ RENEWAL NO INVITE", {
        reqId,
        telegramId,
        days,
        endsAt: endsAt.toISOString(),
      });

      const html =
        `♻️ <b>Perpanjangan berhasil!</b>\n\n` +
        `🎫 Paket: <b>${escapeHtml(plan.toUpperCase())}</b>\n` +
        `⏳ Durasi tambah: <b>${days} hari</b>\n` +
        `📅 Sampai: <b>${fmtDateJakarta(endsAt)}</b>\n\n` +
        `Kamu masih dalam VIP Group jadi tidak perlu link baru.`;

      await telegramSendMessageHTML(telegramId, html);
    }

    console.log("✅ IPN VIP ACCESS OK", {
      reqId,
      paymentId,
      telegramId,
      days,
      plan,
      endsAt: endsAt.toISOString(),
      ms: Date.now() - startedAt,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("❌ IPN ERROR:", {
      reqId,
      message: e?.message ?? String(e),
      stack: e?.stack,
      paymentId: paymentIdForUnlock,
    });

    /* =========================
       IDEMPOTENT UNLOCK
       kalau error pas tengah jalan
    ========================== */

    if (paymentIdForUnlock) {
      try {
        await prisma.payment.update({
          where: { paymentId: paymentIdForUnlock },
          data: { inviteSentAt: null },
        });

        console.log("🔓 UNLOCK OK", {
          reqId,
          paymentId: paymentIdForUnlock,
        });
      } catch (unlockErr) {
        console.error("❌ UNLOCK FAILED:", {
          reqId,
          paymentId: paymentIdForUnlock,
          unlockErr: unlockErr,
        });
      }
    }

    return NextResponse.json({ ok: false, error: e?.message ?? String(e) }, { status: 500 });
  }
}
