import { NextResponse } from "next/server";
import { runCheckExpired } from "../../../../lib/cron/checkExpired";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

export async function GET() {
  return NextResponse.json({ ok: true, ping: "kick-expired GET works" });
}

export async function POST(req: Request) {
  try {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
      return NextResponse.json({ ok: false, error: "CRON_SECRET missing" }, { status: 500 });
    }

    const headerSecret =
      req.headers.get("x-cron-secret") ||
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
      "";

    if (headerSecret !== secret) return unauthorized();

    const url = new URL(req.url);
    const dryRun = url.searchParams.get("dryRun") === "1";
    const writeDb = url.searchParams.get("writeDb") === "1";

    const result = await runCheckExpired({ dryRun, writeDb });

    return NextResponse.json({
      ok: true,
      time: new Date().toISOString(),
      dryRun,
      writeDb,
      result,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
