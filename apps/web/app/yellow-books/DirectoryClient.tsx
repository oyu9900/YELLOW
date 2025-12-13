'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { YellowBookEntry } from '@yellow-book/contract'
import { Mail, Phone, Building2 } from 'lucide-react'



type Props = {
  entries: YellowBookEntry[]
}

const defaultOption = 'All'

export default function DirectoryClient({ entries = [] }: Props) {

  const [query, setQuery] = useState('')
  const [city, setCity] = useState(defaultOption)
  const [category, setCategory] = useState(defaultOption)

  const cityOptions = useMemo(
    () => [defaultOption, ...new Set(entries.map((entry) => entry.city))],
    [entries],
  )
  const categoryOptions = useMemo(
    () => [defaultOption, ...new Set(entries.map((entry) => entry.department))],
    [entries],
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return entries.filter((entry) => {
      const matchesQuery =
        !q ||
        entry.fullName.toLowerCase().includes(q) ||
        entry.title.toLowerCase().includes(q)
      const matchesCity = city === defaultOption || entry.city === city
      const matchesCategory = category === defaultOption || entry.department === category
      return matchesQuery && matchesCity && matchesCategory
    })
  }, [entries, query, city, category])

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="card h-fit space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#94a3b8]">Filter</p>
          <p className="text-sm text-slate-500">Search name, description…</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400" htmlFor="search">
              Search
            </label>
            <input
              id="search"
              className="form-input"
              placeholder="name, description..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400" htmlFor="city">
              City
            </label>
            <select
              id="city"
              className="form-input"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="form-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      <section className="space-y-5">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#94a3b9]">
            Organizations
          </p>
          <h2 className="text-5xl font-semibold text-slate-200">Organizations</h2>
          <p className="text-sm text-slate-500">Total {filtered.length} results</p>
        </header>
        <ul className="grid gap-6 md:grid-cols-2">
          {filtered.map((entry) => (
            <li key={entry.id} className="rounded-[34px] card-glass p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-300">{entry.fullName}</h3>
                  <p className="text-sm text-slate-400">{entry.title}</p>
                </div>
                <span className="chip">{entry.city}</span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <div className="flex items-center gap-2 font-medium text-slate-300">
                  <Building2 size={16} className="text-blue-600" />
                  {entry.department}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-200" />
                  {entry.phone ?? 'N/A'}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-200" />
                  {entry.email}
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/yellow-books/${entry.id}`} className="btn-primary px-6 text-sm">
                  View details →
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            No organizations match these filters.
          </div>
        )}
      </section>
    </div>
  )
}
