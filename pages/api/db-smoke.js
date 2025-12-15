import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const row = await prisma.member.create({
      data: {
        id: `smoke_${Date.now()}`,
        tgUserId: 999000111,
        username: "smoke_test",
      },
    });

    const totalMembers = await prisma.member.count();

    return res.status(200).json({ ok: true, insertedId: row.id, totalMembers });
  } catch (e) {
    console.error("db-smoke error:", e);
    return res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
}
