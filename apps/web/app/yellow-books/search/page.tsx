import { Suspense } from 'react'
import dynamicImport from 'next/dynamic'
import { fetchAll } from '../fetchers'

// ⚡ Энэ route бол SSR (server-rendered)
export const dynamic = 'force-dynamic'

// 🗺 MapIsland-ийг динамик импортоор Client component болгоно
const MapIsland = dynamicImport(() => import('./MapIsland'), {
  ssr: false,
  loading: () => (
    <div className="card h-72 animate-pulse flex items-center justify-center text-slate-400">
      Loading map…
    </div>
  ),
})

// ---------------------------------------------------

export default async function Page() {
  const entries = await fetchAll() // SSR fetch

  return (
    <div className="space-y-6">
      
      {/* Intro */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Search
        </p>

        <h1 className="text-3xl font-semibold text-slate-900">
          Live search (SSR) + client map island
        </h1>

        <p className="text-sm text-slate-500">
          Server-rendered page streaming in a hydrated map island to avoid SSR crashes.
        </p>
      </div>

      {/* Map client island + Suspense fallback */}
      <Suspense fallback={<MapSkeleton />}>
        <MapIsland entries={entries} />
      </Suspense>
    </div>
  )
}

// ---------------------------------------------------

function MapSkeleton() {
  return (
    <div className="card h-72 animate-pulse flex items-center justify-center text-slate-400">
      Loading map island…
    </div>
  )
}
