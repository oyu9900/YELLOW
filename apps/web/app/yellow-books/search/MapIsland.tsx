'use client'

import React, { useMemo, useState } from 'react'
import type { YellowBookEntry } from '@yellow-book/contract'

type Props = { entries: YellowBookEntry[] }

export default function MapIsland({ entries }: Props) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return entries
    return entries.filter(e =>
      e.fullName.toLowerCase().includes(s) ||
      e.title.toLowerCase().includes(s) ||
      e.department.toLowerCase().includes(s) ||
      e.city.toLowerCase().includes(s)
    )
  }, [q, entries])

  return (
    <div className="card space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600" htmlFor="live-search">
          Live search
        </label>
        <input
          id="live-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, title, department…"
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          {filtered.map(e => (
            <div
              key={e.id}
              className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-medium text-slate-900">{e.fullName}</div>
                  <div className="text-sm text-slate-500">
                    {e.title} — {e.department}
                  </div>
                </div>
                <span className="chip">{e.city}</span>
              </div>
              {e.location ? (
                <div className="text-xs text-slate-400">
                  ({e.location.lat.toFixed(3)}, {e.location.lng.toFixed(3)})
                </div>
              ) : (
                <div className="text-xs text-slate-400">No coordinates provided</div>
              )}
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-dashed border-slate-200 bg-[#f8fbff] p-5 text-sm text-slate-500">
          <p className="font-semibold text-slate-700">Map (client island placeholder)</p>
          <p className="text-xs text-slate-400">
            Rendered on the client to avoid SSR map issues.
          </p>
          <ul className="mt-4 space-y-2">
            {filtered.slice(0, 10).map(e => (
              <li key={e.id}>
                • {e.fullName}{' '}
                {e.location
                  ? `(lat: ${e.location.lat.toFixed(3)}, lng: ${e.location.lng.toFixed(3)})`
                  : '(no coords)'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
