export default async function handler(req, res) {
  try {
    const base =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

    if (!base) {
      // kalau base gak kebaca, jangan bikin provider retry spam
      return res.status(200).json({ ok: true, warning: "missing base url" });
    }

    const url = `${base}/api/nowpayments/ipn`;

    // ambil raw body seaman mungkin
    const raw =
      typeof req.body === "string"
        ? req.body
        : req.body
        ? JSON.stringify(req.body)
        : "";

    const fRes = await fetch(url, {
      method: req.method || "POST",
      headers: {
        "content-type": req.headers["content-type"] || "application/json",
        "x-nowpayments-sig": req.headers["x-nowpayments-sig"] || "",
        "user-agent": req.headers["user-agent"] || "",
      },
      body: raw,
    });

    const text = await fRes.text();

    res.status(fRes.status);
    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.send(text);
    }
  } catch (e) {
    console.error("api/pay/ipn forwarder error:", e);
    // balikin ok supaya gak retry terus
    return res.status(200).json({ ok: true });
  }
}
