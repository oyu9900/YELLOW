// apps/web/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center">
      <section className="max-w-4xl space-y-8 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#4c84ff]">
          Yellow_book
        </p>
        <h1 className="text-4xl font-semibold text-slate-400 sm:text-6xl">
          Yellow book for modern organizations
        </h1>
        <p className="text-lg text-slate-500 sm:text-xl">
          Search and discover organizations by name, city, and category. Sign in to add your
          organization.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/yellow-books" className="btn-primary">
            Browse directory →
          </Link>
          <Link href="/register" className="btn-secondary">
            Register org
          </Link>
        </div>
      </section>
    </div>
  )
}
