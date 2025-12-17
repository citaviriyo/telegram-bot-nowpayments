import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, ping: "kick-expired GET works" });
}

export async function POST() {
  return NextResponse.json({ ok: true, ping: "kick-expired POST works" });
}
