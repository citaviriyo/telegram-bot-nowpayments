import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isWIBExpiredWindow() {
  const now = new Date();
  const hour = (now.getUTCHours() + 7) % 24;
  const minute = now.getUTCMinutes();
  return hour === 0 && minute >= 5 && minute <= 15;
}

async function hit(path: string) {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  const res = await fetch(`${base}${path}`, {
    method: "GET",
    cache: "no-store",
  });

  return {
    path,
    status: res.status,
    ok: res.ok,
    body: await res.text(),
  };
}

export async function GET() {
  const result: any = {
    time: new Date().toISOString(),
  };

  // 1️⃣ reconcile tiap 30 menit
  result.reconcile = await hit("/api/cron/reconcile");

  // 2️⃣ check expired cuma 1x sehari (00:05–00:15 WIB)
  if (isWIBExpiredWindow()) {
    result.checkExpired = await hit("/api/cron/check-expired");
  } else {
    result.checkExpired = "skipped";
  }

  return NextResponse.json(result);
}
