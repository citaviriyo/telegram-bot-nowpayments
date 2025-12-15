import prisma from "../../lib/prisma.js";

export default async function handler(req, res) {
  // Vercel Cron biasanya GET
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Missing TELEGRAM_BOT_TOKEN" });
  }
  if (!TELEGRAM_GROUP_ID) {
    return res.status(500).json({ ok: false, error: "Missing TELEGRAM_GROUP_ID" });
  }

  const groupId = Number(TELEGRAM_GROUP_ID);
  if (!Number.isFinite(groupId)) {
    return res.status(500).json({ ok: false, error: "TELEGRAM_GROUP_ID is not a number" });
  }

  const now = new Date();

  // 1) Ambil subscription yang sudah lewat endsAt, masih active, dan belum pernah kick
  const expiredSubs = await prisma.subscription.findMany({
    where: {
      status: "active",
      endsAt: { lte: now },
      kickedAt: null,
    },
    include: { member: true },
    take: 200,
  });

  let kicked = 0;
  let failed = 0;
  const errors = [];

  for (const sub of expiredSubs) {
    const tgUserIdBigInt = sub?.member?.tgUserId;

    if (!tgUserIdBigInt) {
      failed++;
      errors.push({ subId: sub.id, reason: "Missing member.tgUserId" });
      continue;
    }

    const userId = tgUserIdBigInt.toString();

    try {
      // 2) Kick via Telegram API (banChatMember = kick + block)
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/banChatMember`;
      const payload = {
        chat_id: groupId,
        user_id: userId,
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const tgData = await resp.json().catch(() => null);

      if (!resp.ok || !tgData?.ok) {
        throw new Error(tgData?.description || `Telegram banChatMember failed (${resp.status})`);
      }

      // 3) Update DB: tandai expired + kicked
      await prisma.subscription.update({
        where: { id: sub.id },
        data: {
          status: "expired",
          kickedAt: now,
          lastCheckedAt: now,
        },
      });

      kicked++;
    } catch (e) {
      failed++;
      errors.push({
        subId: sub.id,
        tgUserId: userId,
        error: String(e?.message || e),
      });

      // tetap update lastCheckedAt supaya kebaca pernah dicek
      try {
        await prisma.subscription.update({
          where: { id: sub.id },
          data: { lastCheckedAt: now },
        });
      } catch {}
    }
  }

  return res.status(200).json({
    ok: true,
    now: now.toISOString(),
    checked: expiredSubs.length,
    kicked,
    failed,
    errors: errors.slice(0, 20),
  });
}
