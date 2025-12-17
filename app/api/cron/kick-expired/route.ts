import { NextResponse } from "next/server";
import { runCheckExpired } from "../../../../lib/cron/checkExpired";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

function getSecret(req: Request) {
  // boleh via header x-cron-secret atau Authorization: Bearer <secret>
  return (
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    ""
  ).trim();
}

function boolParam(url: URL, key: string, fallback: boolean) {
  const v = url.searchParams.get(key);
  if (v === null) return fallback;
  return v === "1" || v === "true" || v === "yes";
}

export async function GET(req: Request) {
  // ping GET supaya gampang cek route hidup
  return NextResponse.json({ ok: true, ping: "kick-expired GET works", url: req.url });
}

export async function POST(req: Request) {
  try {
    const serverSecret = process.env.CRON_SECRET;
    if (!serverSecret) {
      return NextResponse.json({ ok: false, error: "CRON_SECRET missing" }, { status: 500 });
    }

    const clientSecret = getSecret(req);
    if (!clientSecret || clientSecret !== serverSecret) return unauthorized();

    const url = new URL(req.url);

    // default aman:
    // - dryRun=1 (tidak kick/tidak DM)
    // - writeDb=0 (tidak update warn/kicked/status)
    const dryRun = boolParam(url, "dryRun", true);
    const writeDb = boolParam(url, "writeDb", false);

    const result = await runCheckExpired({ dryRun, writeDb });

    return NextResponse.json({
      ok: true,
      time: new Date().toISOString(),
      dryRun,
      writeDb,
      result,
    });
  } catch (e: any) {
    console.log("❌ kick-expired ERROR:", e);
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
