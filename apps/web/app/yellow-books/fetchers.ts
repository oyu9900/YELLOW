
import { YellowBookEntrySchema } from "@/lib/contracts/yellowBook";


const API_URL =
  process.env.API_URL || "http://localhost:4000";

// 🔑 BUILD vs RUNTIME ялгах
const isBuildTime =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_IS_RUNTIME !== 'true'

export async function fetchAll() {
  if (isBuildTime) {
    console.warn('⚠️ BUILD TIME: skip fetchAll')
    return []
  }

  const res = await fetch(`${API_URL}/yellow-books`, {
    next: { revalidate: 5 },
  })

  if (!res.ok) {
    console.error('❌ fetchAll failed')
    return []
  }

  return YellowBookEntrySchema.array().parse(await res.json())
}

export async function fetchOne(id: string) {
  if (isBuildTime) {
    console.warn(`⚠️ BUILD TIME: skip fetchOne(${id})`)
    return null
  }

  const res = await fetch(`${API_URL}/yellow-books/${id}`)
  if (!res.ok) return null

  return YellowBookEntrySchema.parse(await res.json())
}
