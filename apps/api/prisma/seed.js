const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@num.edu.mn" },
    update: { role: "admin" },
    create: {
      email: "admin@num.edu.mn",
      role: "admin",
      passwordHash: "seeded-admin",
    },
  });

  console.log("✅ Admin user seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
