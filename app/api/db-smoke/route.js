import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const row = await prisma.member.create({
      data: {
        id: `smoke_${Date.now()}`,
        tgUserId: BigInt(999000111),
        username: "smoke_test",
      },
    });

    const totalMembers = await prisma.member.count();

    return Response.json({ ok: true, insertedId: row.id, totalMembers });
  } catch (e) {
    console.error("db-smoke error:", e);
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || String(e) }),
      { status: 500 }
    );
  }
}
