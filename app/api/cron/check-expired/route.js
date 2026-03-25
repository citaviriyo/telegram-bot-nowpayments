import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

function authorize(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET missing" }, { status: 500 });
  }

  const headerSecret =
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    "";

  if (headerSecret !== secret) {
    return unauthorized();
  }

  return null;
}

export async function GET(req) {
  const authError = authorize(req);
  if (authError) {
    return authError;
  }

  return NextResponse.json({
    ok: true,
    message: "check-expired route is alive (app router)",
  });
}
