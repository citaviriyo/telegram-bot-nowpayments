// /api/nowpayments-ipn.js
// Legacy endpoint (dash). Jangan taruh logic bisnis di sini.
// Tugasnya: forward payload ke endpoint baru /api/nowpayments/ipn

module.exports = async (req, res) => {
  try {
    const body = req.body || {};

    // ✅ bukti endpoint legacy kepanggil
    console.log("🟦 FORWARDER HIT /api/nowpayments-ipn", body?.payment_id, body?.payment_status);

    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;

    // forward signature header (case-insensitive)
    const sig =
      req.headers["x-nowpayments-sig"] ||
      req.headers["X-NOWPAYMENTS-SIG"] ||
      req.headers["x-nowpayments-sig".toLowerCase()];

    const headers = { "Content-Type": "application/json" };
    if (sig) headers["x-nowpayments-sig"] = sig;

    const r = await fetch(`${proto}://${host}/api/nowpayments/ipn`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const text = await r.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    // ✅ bukti forward berhasil dan status apa yang dibalik
    console.log("🟩 FORWARDED RESULT /api/nowpayments/ipn status=", r.status);

    // Balikin status yg sama dari endpoint baru
    return res.status(r.status).json(data);
  } catch (e) {
    console.log("🟥 FORWARDER ERROR", String(e?.message || e));
    // Demi mencegah retry berulang dari gateway, tetap 200
    return res.status(200).json({ ok: false, error: String(e?.message || e) });
  }
};
