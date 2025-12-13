const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.member.count();
  console.log("✅ DB CONNECTED. Member count:", count);
}

main()
  .catch((e) => {
    console.error("❌ ERROR:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
