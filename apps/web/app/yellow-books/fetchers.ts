import { API_URL } from '@yellow-book/config'
import { YellowBookEntrySchema } from '@yellow-book/contract'

export async function fetchAll() {
  const res = await fetch(`${API_URL}/yellow-books`, {
    next: { revalidate: 60, tags: ['yellow-books'] }
  })

  if (!res.ok) {
    console.error("❌ API /yellow-books FAILED", await res.text())
    return []
  }

  const json = await res.json()

  // API зөв array буцааж буй эсэхийг шалгана
  if (!Array.isArray(json)) {
    console.error("❌ Expected array, received:", json)
    return []
  }

  return YellowBookEntrySchema.array().parse(json)
}

export async function fetchOne(id: string) {
  const res = await fetch(`${API_URL}/yellow-books/${id}`, {
    cache: 'force-cache'
  })

  if (!res.ok) {
    console.error(`❌ API /yellow-books/${id} FAILED`, await res.text())
    return null
  }

  const json = await res.json()

  // Object parse хийх (нэг бүртгэл)
  return YellowBookEntrySchema.parse(json)
}
