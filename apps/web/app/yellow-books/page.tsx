import { Suspense } from "react"
import { fetchAll } from "./fetchers"
import DirectoryClient from "./DirectoryClient"
import { API_URL } from "@yellow-book/config"

export const revalidate = 5   // ✔ ISR every 60 sec
export const dynamic = 'force-dynamic'


export default async function Page() {
  const entries = await fetchAll()

  return (
    <div className="space-y-10">
      {/* MAIN CONTENT */}
      <DirectoryClient entries={entries} />

      {/* STREAMED / OPTIONAL SECTION */}
      <Suspense fallback={<HighlightsSkeleton />}>
      <Highlights />
      </Suspense>
    </div>
  )
}

// STREAMED SECTION
async function Highlights() {
  const res = await fetch(`${API_URL}/yellow-books`, {
    next: { revalidate: 60 },
  })

  const json = await res.json()
  const items = Array.isArray(json) ? json.slice(0, 4) : []

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Highlights</h3>
      <p className="text-sm text-slate-500">
        Organizations viewed recently.
      </p>

      <div className="flex flex-wrap gap-2">
        {items.map((entry: any) => (
          <span
            key={entry.id}
            className="chip border border-slate-200 bg-slate-100 text-slate-700"
          >
            {entry.fullName}
          </span>
        ))}
      </div>
    </div>
  )
}

function HighlightsSkeleton() {
  return (
    <div className="card h-24 animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
    </div>
  )
}
