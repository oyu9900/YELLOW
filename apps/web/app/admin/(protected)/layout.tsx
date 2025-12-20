import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/options";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/admin/unlock");

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
            <div className="mb-4 text-sm font-semibold text-white/90">
              👑 Admin Panel
            </div>
            <nav className="space-y-2 text-sm">
              <Link className="block rounded-lg px-3 py-2 hover:bg-white/10 text-slate-200" href="/admin">
                Dashboard
              </Link>
              <Link className="block rounded-lg px-3 py-2 hover:bg-white/10 text-slate-200" href="/admin/users">
                Users
              </Link>
              <Link className="block rounded-lg px-3 py-2 hover:bg-white/10 text-slate-200" href="/admin/organizations">
                Organizations
              </Link>
              <Link className="block rounded-lg px-3 py-2 hover:bg-white/10 text-slate-200" href="/admin/system">
                System info
              </Link>
            </nav>

            <div className="mt-6 rounded-xl bg-white/5 p-3 text-xs text-slate-300">
              Signed in as<br />
              <span className="text-white">{session.user.email}</span>
            </div>
          </aside>

          <main className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
