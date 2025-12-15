import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // bikin nilai unik setiap request
    const now = Date.now();
    const tgUserId = Number(now); // unique & aman buat BigInt-like ID

    const row = await prisma.member.create({
      data: {
        id: `smoke_${now}`,
        tgUserId,
        username: `smoke_${tgUserId}`,
      },
    });

    const totalMembers = await prisma.member.count();

    return res.status(200).json({
      ok: true,
      insertedId: row.id,
      tgUserId,
      totalMembers,
    });
  } catch (e) {
    console.error("db-smoke error:", e);
    return res.status(500).json({
      ok: false,
      error: e?.message || String(e),
    });
  }
}
