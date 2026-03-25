import { NextResponse } from "next/server";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

function authorize(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return { error: NextResponse.json({ ok: false, error: "CRON_SECRET missing" }, { status: 500 }) };
  }

  const headerSecret =
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    "";

  if (headerSecret !== secret) {
    return { error: unauthorized() };
  }

  return { secret };
}

function isWIBExpiredWindow() {
  const now = new Date();
  const hour = (now.getUTCHours() + 7) % 24;
  const minute = now.getUTCMinutes();
  return hour === 0 && minute >= 5 && minute <= 15;
}

async function hit(path: string, secret: string) {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  const res = await fetch(`${base}${path}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "x-cron-secret": secret,
    },
  });

  return {
    path,
    status: res.status,
    ok: res.ok,
    body: await res.text(),
  };
}

export async function GET(req: Request) {
  const auth = authorize(req);
  if (auth.error) {
    return auth.error;
  }

  const result: any = {
    time: new Date().toISOString(),
  };

  result.reconcile = await hit("/api/cron/reconcile", auth.secret);

  if (isWIBExpiredWindow()) {
    result.checkExpired = await hit("/api/cron/check-expired", auth.secret);
  } else {
    result.checkExpired = "skipped";
  }

  return NextResponse.json(result);
}
