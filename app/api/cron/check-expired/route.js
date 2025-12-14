import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "check-expired route is alive (app router)",
  });
}
