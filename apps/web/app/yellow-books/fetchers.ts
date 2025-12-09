import { API_URL } from '@yellow-book/config'
import { YellowBookEntrySchema } from '@yellow-book/contract'

async function fallbackList() {
  const data = (await import('../data/seed.json')).default
  return YellowBookEntrySchema.array().parse(data)
}

async function fallbackOne(id: string) {
  const data = (await import('../data/seed.json')).default
  const found = (data as any[]).find((x) => x.id === id)
  return found ? YellowBookEntrySchema.parse(found) : null
}

export async function fetchAll() {
  try {
    const res = await fetch(`${API_URL}/yellow-books`, {
      next: { revalidate: 60, tags: ['yellow-books'] },
    })

    if (!res.ok) throw new Error(await res.text())
    const json = await res.json()
    return YellowBookEntrySchema.array().parse(json)
  } catch (err) {
    console.warn('⚠️ API not reachable — using fallback JSON for list')
    return fallbackList()
  }
}

export async function fetchOne(id: string) {
  try {
    const res = await fetch(`${API_URL}/yellow-books/${id}`, {
      cache: 'force-cache',
    })

    if (!res.ok) throw new Error(await res.text())
    const json = await res.json()
    return YellowBookEntrySchema.parse(json)
  } catch (err) {
    console.warn(`⚠️ API not reachable — fallback JSON for id=${id}`)
    return fallbackOne(id)
  }
}
