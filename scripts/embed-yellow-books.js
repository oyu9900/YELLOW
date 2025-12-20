import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Mock embedding (OpenAI-гүй)
 * 1536 хэмжээтэй random vector
 */
function fakeEmbedding(size = 1536) {
  return Array.from({ length: size }, () => Math.random());
}

async function run() {
  const entries = await prisma.yellowBookEntry.findMany();

  for (const entry of entries) {
    const embedding = fakeEmbedding();

    await prisma.yellowBookEntry.update({
      where: { id: entry.id },
      data: {
        embedding: JSON.stringify(embedding),
      },
    });

    console.log("Embedded:", entry.fullName);
  }

  console.log("✅ All entries embedded (MOCK)");
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
