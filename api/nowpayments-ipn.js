// /api/nowpayments-ipn.js
// Legacy endpoint (dash). Jangan taruh logic bisnis di sini.
// Tugasnya: forward RAW payload ke endpoint baru /api/nowpayments/ipn

module.exports = async (req, res) => {
  try {
    // Ambil proto+host untuk panggil endpoint baru di domain yang sama
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;

    // Forward signature header (case-insensitive)
    const sig =
      req.headers["x-nowpayments-sig"] ||
      req.headers["X-NOWPAYMENTS-SIG"] ||
      req.headers["x-nowpayments-sig".toLowerCase()];

    // Ambil RAW body biar payload persis (anti req.body kosong / beda format)
    const rawBody = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

    // Log minimal (jangan spam)
    let parsed;
    try {
      parsed = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      parsed = { _raw: rawBody?.slice?.(0, 200) || "" };
    }
    console.log(
      "🟦 FORWARDER HIT /api/nowpayments-ipn",
      parsed?.payment_id,
      parsed?.payment_status
    );

    const headers = { "Content-Type": "application/json" };
    if (sig) headers["x-nowpayments-sig"] = sig;

    const r = await fetch(`${proto}://${host}/api/nowpayments/ipn`, {
      method: "POST",
      headers,
      body: rawBody || "{}",
    });

    const text = await r.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    console.log("🟩 FORWARDED RESULT /api/nowpayments/ipn status=", r.status);

    return res.status(r.status).json(data);
  } catch (e) {
    console.log("🟥 FORWARDER ERROR", String(e?.message || e));
    // Demi mencegah retry berulang dari gateway, tetap 200
    return res.status(200).json({ ok: false, error: String(e?.message || e) });
  }
};
