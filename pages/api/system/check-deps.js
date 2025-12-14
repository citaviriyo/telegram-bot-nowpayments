export default function handler(req, res) {
  try {
    const axiosPath = require.resolve("axios");
    return res.status(200).json({ ok: true, axios: true, axiosPath });
  } catch (e) {
    return res.status(200).json({ ok: true, axios: false, error: String(e?.message || e) });
  }
}
