// prisma/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@yellowbook.dev";

  await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
    },
    create: {
      email,
      name: "Admin",
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  console.log("✅ Admin user seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
