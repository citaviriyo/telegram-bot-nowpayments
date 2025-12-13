import prisma from "../../../lib/prisma";




export default async function handler(req, res) {
  const now = new Date();

const expired = await prisma.subscription.findMany({
  where: {
    endsAt: { lt: now },
    status: "active",
  },
  include: { member: true },
  take: 50,
});

// update status jadi expired
await prisma.subscription.updateMany({
  where: {
    id: { in: expired.map((s) => s.id) },
  },
  data: { status: "expired" },
});



  res.status(200).json({
    ok: true,
    expiredCount: expired.length,
  });
}
