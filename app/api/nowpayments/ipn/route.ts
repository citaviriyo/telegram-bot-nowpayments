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

function maskDbUrl(url?: string | null) {
  if (!url) return "(missing)";
  try {
    const u = new URL(url);
    const host = u.host;
    const db = u.pathname?.replace("/", "") || "(no-db)";
    return `${u.protocol}//${host}/${db}`;
  } catch {
    return "(invalid DATABASE_URL)";
  }
}

function verifyNowPaymentsSigFromJson(body: any, sigHeader: string | null) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret) return { ok: true, skipped: true };
  if (!sigHeader) return { ok: false, error: "Missing x-nowpayments-sig" };

  const sorted = Object.keys(body || {})
    .sort()
    .reduce((acc: any, k) => {
      acc[k] = body[k];
      return acc;
    }, {});

  const h = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(sorted))
    .digest("hex");

  return h === sigHeader ? { ok: true } : { ok: false, error: "Invalid signature" };
}

function parseOrderId(orderId: string): { telegramId: string; plan: string; days: number } | null {
  const p4 = orderId.match(/^tg_(.+?)_([a-zA-Z0-9-]+)_(\d+)_(\d+)$/);
  if (p4) return { telegramId: p4[1], plan: p4[2], days: Number(p4[3]) };

  const p3 = orderId.match(/^tg_(.+?)_(\d+)_(\d+)$/);
  if (p3) return { telegramId: p3[1], plan: "vip", days: Number(p3[2]) };

  return null;
}

function parseFromOrderDescription(desc: string): { telegramId: string; plan: string; days: number } | null {
  if (!desc) return null;

  const parts = desc.split("|").map((s) => s.trim());
  if (parts.length < 3) return null;

  const telegramId = String(parts[1] || "").trim();
  const paketRaw = String(parts[2] || "").trim().toLowerCase();
  if (!telegramId) return null;

  if (paketRaw.includes("1bulan")) return { telegramId, plan: "vip", days: 30 };
  if (paketRaw.includes("3bulan")) return { telegramId, plan: "vip", days: 90 };
  if (paketRaw.includes("6bulan")) return { telegramId, plan: "vip", days: 180 };
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

async function telegramCreateInviteLink() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupId = process.env.TELEGRAM_GROUP_ID;
  if (!token || !groupId) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_GROUP_ID");

  const url = `https://api.telegram.org/bot${token}/createChatInviteLink`;
  const expire_date = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

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
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
    const raw = await req.text();
    let body: any = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
    }

    const sig = req.headers.get("x-nowpayments-sig");
    const v = verifyNowPaymentsSigFromJson(body, sig);
    if (!v.ok) {
      console.log("❌ IPN SIG FAIL:", v);
      return NextResponse.json({ ok: false, error: "signature verification failed" }, { status: 401 });
    }

    console.log("========================================");
    console.log("✅ NOWPAYMENTS IPN HIT");
    console.log("🕒 time:", new Date().toISOString());
    console.log("🌐 url:", req.url);
    console.log("🧬 DB TARGET:", {
      DATABASE_URL: maskDbUrl(process.env.DATABASE_URL),
      DIRECT_URL: maskDbUrl((process.env as any).DIRECT_URL),
      NODE_ENV: process.env.NODE_ENV,
    });
    console.log("📨 IPN RAW JSON:");
    console.log(JSON.stringify(body, null, 2));
    console.log("========================================");

    const paymentId = String(body.payment_id || "");
    const incomingStatus = String(body.payment_status || "unknown");
    const orderId = body.order_id ? String(body.order_id) : "";
    const orderDescription = String(body.order_description || "");

    if (!paymentId) {
      return NextResponse.json({ ok: false, error: "payment_id missing" }, { status: 400 });
    }

    const existing = await prisma.payment.findUnique({ where: { paymentId } });

    await prisma.payment.upsert({
      where: { paymentId },
      create: { paymentId, status: incomingStatus, raw: body },
      update: { status: incomingStatus, raw: body },
    });

    if (incomingStatus !== "finished") {
      console.log("ℹ️ IPN ignored status:", incomingStatus, "paymentId:", paymentId);
      return NextResponse.json({ ok: true, ignored: incomingStatus });
    }

    if (existing?.status === "finished") {
      console.log("ℹ️ alreadyProcessed finished:", paymentId);
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    let parsed = orderId ? parseOrderId(orderId) : null;
    if (!parsed) parsed = parseFromOrderDescription(orderDescription);

    if (!parsed) {
      console.log("⚠️ finished but cannot parse telegramId/days", { orderId, orderDescription, paymentId });
      return NextResponse.json({ ok: true, warning: "cannot extract telegramId/days" });
    }

    const telegramId = String(parsed.telegramId).trim();
    const plan = parsed.plan;
    const days = parsed.days;

    const now = new Date();

    const maxFutureMs = 400 * 24 * 60 * 60 * 1000; // 400 hari guardrail

    // source of truth: last active sub, TAPI harus masuk akal
    const lastActiveSub = await prisma.subscription.findFirst({
      where: { member: { telegramId }, status: "active", plan },
      orderBy: { endsAt: "desc" },
    });

    const lastSubOk =
      lastActiveSub?.endsAt &&
      lastActiveSub.endsAt.getTime() > now.getTime() &&
      lastActiveSub.endsAt.getTime() - now.getTime() < maxFutureMs;

    const prevMember = await prisma.member.findUnique({ where: { telegramId } });
    const memberExpiredOk =
      prevMember?.expiredAt &&
      prevMember.expiredAt.getTime() > now.getTime() &&
      prevMember.expiredAt.getTime() - now.getTime() < maxFutureMs;

    let baseTime = now;
    let baseTimeSource: string = "now";

    if (lastSubOk && lastActiveSub?.endsAt) {
      baseTime = lastActiveSub.endsAt;
      baseTimeSource = "subscription.endsAt";
    } else if (memberExpiredOk && prevMember?.expiredAt) {
      baseTime = prevMember.expiredAt;
      baseTimeSource = "member.expiredAt";
    } else {
      // kalau data lama corrupt, kita mulai dari sekarang
      baseTime = now;
      baseTimeSource = lastActiveSub?.endsAt ? "now (guardrail:sub too-far)" : "now";
    }

    const endsAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);

    console.log("🧠 RENEW BASE:", {
      telegramId,
      plan,
      days,
      baseTime: baseTime.toISOString(),
      baseTimeSource,
      computedEndsAt: endsAt.toISOString(),
      lastActiveSubEndsAt: lastActiveSub?.endsAt?.toISOString?.() ?? null,
      lastSubOk,
      prevMemberExpiredAt: prevMember?.expiredAt?.toISOString?.() ?? null,
      memberExpiredOk,
    });

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

    const memberCheck = await prisma.member.findUnique({ where: { telegramId } });
    console.log("✅ NEON WRITE PROOF:", {
      upsertMemberId: member.id,
      telegramId,
      memberCheckExists: !!memberCheck,
      memberExpiredAt: memberCheck?.expiredAt?.toISOString?.(),
    });

    const inviteLink = await telegramCreateInviteLink();
    await prisma.member.update({
      where: { id: member.id },
      data: { inviteLink },
    });

    const html =
      `✅ <b>Pembayaran berhasil!</b>\n\n` +
      `🎟️ VIP aktif <b>${escapeHtml(String(days))} hari</b>\n` +
      `⏳ Sampai: <b>${escapeHtml(fmtDateJakarta(endsAt))}</b>\n\n` +
      `👉 Link join VIP Group (1x pakai):\n${escapeHtml(inviteLink)}\n\n` +
      `Kalau link expired, chat admin.`;

    await telegramSendMessageHTML(telegramId, html);

    console.log("✅ ACTIVATED:", { telegramId, plan, days, endsAt: endsAt.toISOString(), paymentId });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.log("❌ IPN ERROR:", e);
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
