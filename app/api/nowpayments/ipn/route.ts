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

/* =========================
   UTILS
========================= */

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * NOWPayments signature:
 * - kalau NOWPAYMENTS_IPN_SECRET tidak diset -> skip verify (dev mode)
 * - kalau diset -> wajib cocok
 */
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

  // Format dari webhook lo: "KOINITY|<chatId>|1bulan"
  const parts = desc.split("|").map((s) => s.trim());
  if (parts.length < 3) return null;

  const telegramId = String(parts[1] || "").trim();
  const paket = String(parts[2] || "").trim().toLowerCase();
  if (!telegramId) return null;

  if (paket.includes("1bulan")) return { telegramId, days: 30, plan: "vip" };
  if (paket.includes("3bulan")) return { telegramId, days: 90, plan: "vip" };
  if (paket.includes("1tahun") || paket.includes("12bulan") || paket.includes("12bln"))
    return { telegramId, days: 365, plan: "vip" };

  return null;
}

function fmtDateJakarta(d: Date) {
  // simpel & stabil (YYYY-MM-DD)
  return d.toISOString().slice(0, 10);
}

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
  if (!json.ok) throw new Error(`Failed to create invite link: ${JSON.stringify(json)}`);
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
  if (!json.ok) throw new Error(`Telegram sendMessage failed: ${JSON.stringify(json)}`);
}

/* =========================
   IPN HANDLER
========================= */

export async function POST(req: Request) {
  const startedAt = Date.now();
  let paymentIdForUnlock: string | null = null;

  try {
    // 1) RAW untuk signature verify
    const raw = await req.text();
    const sig = req.headers.get("x-nowpayments-sig");

    const verify = verifyNowPaymentsSigFromRaw(raw, sig);
    if (!verify.ok) {
      console.log("❌ IPN signature invalid", { sigExists: !!sig });
      return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
    }

    // 2) parse JSON
    let body: any = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
    }

    const paymentId = String(body.payment_id || "");
    const status = String(body.payment_status || "unknown").toLowerCase();
    const desc = String(body.order_description || "");

    if (!paymentId) {
      return NextResponse.json({ ok: false, error: "payment_id missing" }, { status: 400 });
    }
    paymentIdForUnlock = paymentId;

    // 3) simpan audit payment
    await prisma.payment.upsert({
      where: { paymentId },
      create: { paymentId, status, raw: body },
      update: { status, raw: body },
    });

    // 4) paid status
    const paid = status === "confirmed" || status === "finished";
    if (!paid) {
      // status lain: waiting / sending / partially_paid / failed / expired / refunded dll
      return NextResponse.json({ ok: true, ignored: status });
    }

    /**
     * 🔒 ATOMIC LOCK (anti double-invite)
     * Syarat claim:
     * - paymentId sama
     * - inviteSentAt masih null
     *
     * Kalau ada 2 IPN masuk barengan:
     * - cuma 1 yang sukses updateMany -> count=1
     * - sisanya count=0 => alreadyProcessed
     */
    const claimed = await prisma.payment.updateMany({
      where: { paymentId, inviteSentAt: null },
      data: { inviteSentAt: new Date() },
    });

    if (claimed.count === 0) {
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    // 5) parse telegramId & days
    const parsed = parseFromOrderDescription(desc);
    if (!parsed) {
      // unlock supaya bisa retry setelah lo benerin format desc
      await prisma.payment.update({
        where: { paymentId },
        data: { inviteSentAt: null },
      });
      return NextResponse.json({ ok: true, warning: "cannot parse order_description" });
    }

    const telegramId = parsed.telegramId;
    const days = parsed.days;
    const plan = parsed.plan; // "vip"

    const now = new Date();

    /**
     * 6) Hitung endsAt dengan cara “extend” jika masih aktif.
     * Ambil subscription active terakhir utk plan ini (kalau ada),
     * kalau endsAt masih di masa depan -> extend dari endsAt,
     * else -> mulai dari now.
     */
    const lastActiveSub = await prisma.subscription.findFirst({
      where: { member: { telegramId }, status: "active", plan },
      orderBy: { endsAt: "desc" },
    });

    const baseTime =
      lastActiveSub?.endsAt && lastActiveSub.endsAt.getTime() > now.getTime() ? lastActiveSub.endsAt : now;

    const endsAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);

    // 7) upsert member + upsert subscription active (1 record aktif utk plan ini)
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
          data: { memberId: m.id, plan, startsAt: now, endsAt, status: "active", lastCheckedAt: now },
        });
      }

      return m;
    });

    // 8) create invite + simpan ke member
    const inviteLink = await telegramCreateInviteLink();
    await prisma.member.update({
      where: { id: member.id },
      data: { inviteLink },
    });

    // 9) send telegram message (HTML safe)
    const html =
      `✅ <b>Pembayaran berhasil!</b>\n\n` +
      `🎟️ VIP aktif <b>${escapeHtml(String(days))} hari</b>\n` +
      `⏳ Sampai: <b>${escapeHtml(fmtDateJakarta(endsAt))}</b>\n\n` +
      `👉 Link join VIP Group (1x pakai):\n${escapeHtml(inviteLink)}\n\n` +
      `Kalau link expired, chat admin.`;

    await telegramSendMessageHTML(telegramId, html);

    console.log("✅ IPN OK", { paymentId, status, telegramId, days, ms: Date.now() - startedAt });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("❌ IPN ERROR:", e?.message ?? e);

    // Kalau error terjadi setelah claim lock, kita UNLOCK supaya bisa retry via IPN berikutnya
    if (paymentIdForUnlock) {
      try {
        await prisma.payment.update({
          where: { paymentId: paymentIdForUnlock },
          data: { inviteSentAt: null },
        });
      } catch (unlockErr) {
        console.error("❌ UNLOCK FAILED:", unlockErr);
      }
    }

    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
