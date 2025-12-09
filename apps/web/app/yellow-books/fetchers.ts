import { API_URL } from '@yellow-book/config'
import { YellowBookEntrySchema } from '@yellow-book/contract'

export async function fetchAll() {
  const res = await fetch(`${API_URL}/yellow-books`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    console.error("❌ /yellow-books failed:", await res.text())
    return []
  }

  const json = await res.json()
  return YellowBookEntrySchema.array().parse(json)
}

export async function fetchOne(id: string) {
  const res = await fetch(`${API_URL}/yellow-books/${id}`)

  if (!res.ok) {
    console.error(`❌ /yellow-books/${id} failed`, await res.text())
    return null
  }

  return YellowBookEntrySchema.parse(await res.json())
}
