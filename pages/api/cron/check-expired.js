export const config = {
  runtime: "nodejs",
};

import { runCheckExpired } from "../../../lib/cron/checkExpired";

export default async function handler(req, res) {
  try {
    const result = await runCheckExpired();
    return res.status(200).json({ ok: true, ...result });
  } catch (e) {
    console.error("CRON ERROR:", e);
    return res.status(500).json({
      ok: false,
      error: String(e?.message || e),
    });
  }
}
