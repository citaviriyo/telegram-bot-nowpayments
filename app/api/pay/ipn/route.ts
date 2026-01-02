import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const site =
      process.env.SITE_URL?.trim() ||
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

    if (!site) {
      // jangan bikin provider retry spam
      return NextResponse.json({ ok: true, warning: "missing base url" });
    }

    const raw = await req.text();
    const sig = req.headers.get("x-nowpayments-sig") || "";
    const ct = req.headers.get("content-type") || "application/json";
    const ua = req.headers.get("user-agent") || "";

    const fRes = await fetch(`${site}/api/nowpayments/ipn`, {
      method: "POST",
      headers: {
        "content-type": ct,
        "x-nowpayments-sig": sig,
        "user-agent": ua,
      },
      body: raw,
    });

    const text = await fRes.text();

    // coba balikin JSON kalau valid
    try {
      return NextResponse.json(JSON.parse(text), { status: fRes.status });
    } catch {
      return new NextResponse(text, { status: fRes.status });
    }
  } catch (e) {
    console.error("app/api/pay/ipn forwarder error:", e);
    return NextResponse.json({ ok: true });
  }
}

// Optional: biar kalau ada yang GET, tetap gak error
export async function GET() {
  return NextResponse.json({ ok: true });
}
