import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchAll, fetchOne } from '../fetchers'
import { Mail, Phone, Building2, MapPin } from 'lucide-react'

export const revalidate = 60

export async function generateStaticParams() {
  const list = await fetchAll()
  return list.map((e) => ({ id: e.id }))
}

export default async function Page({
    params,
}: {
  params: { id: string }
}) {
  const e = await fetchOne(params.id)

  // ⛔ хамгаалалт
  if (!e) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link href="/yellow-books" className="text-sm font-medium text-blue-600">
        ← Back to organizations
      </Link>
      <div className="card space-y-5">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold text-slate-900">{e.fullName}</h1>
          <span className="chip">{e.city}</span>
        </div>
        <p className="text-lg text-slate-500">{e.title}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Category
            </div>
            <div className="inline-flex items-center gap-2 text-slate-700">
              <Building2 size={18} className="text-blue-600" />
              {e.department}
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Location
            </div>
            <div className="inline-flex items-center gap-2 text-slate-700">
              <MapPin size={18} className="text-blue-600" />
              {e.city}
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Email
            </div>
            <div className="inline-flex items-center gap-2 text-slate-700">
              <Mail size={18} className="text-blue-600" />
              {e.email}
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Phone
            </div>
            <div className="inline-flex items-center gap-2 text-slate-700">
              <Phone size={18} className="text-blue-600" />
              {e.phone ?? 'Not provided'}
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          Pre-rendered (SSG with generateStaticParams). On-demand revalidate hooked via /api/revalidate.
        </p>
      </div>
    </div>
  )
}