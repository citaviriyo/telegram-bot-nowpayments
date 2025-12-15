const prisma = require("../../lib/prisma.cjs");
module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  return res.status(200).json({
    ok: true,
    message: "check-expired is alive (vercel api folder)",
  });
};
