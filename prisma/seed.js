const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  const dataPath = path.join(__dirname, '../apps/api/src/data/seed.json')
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  for (const item of jsonData) {
    await prisma.yellowBookEntry.upsert({
      where: { email: item.email }, // Unique field
      update: {}, // Already exists → do nothing for now
      create: {
        id: item.id,
        fullName: item.fullName,
        title: item.title,
        email: item.email,
        phone: item.phone || null,
        department: item.department,
        city: item.city,
        lat: item.location?.lat || null,
        lng: item.location?.lng || null,
        avatarUrl: item.avatarUrl || null
      }
    })
  }
}

main()
  .then(() => console.log('🌱 Seed completed!'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
