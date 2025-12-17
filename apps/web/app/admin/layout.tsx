import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <aside className="w-64 border-r pr-4">
        <ul className="space-y-3 font-medium">
          <li><Link href="/admin/users">👥 Users</Link></li>
          <li><Link href="/admin/organizations">🏢 Organizations</Link></li>
          <li><Link href="/admin/system">⚙️ System</Link></li>
        </ul>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
