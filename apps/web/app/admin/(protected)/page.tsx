import prisma from "../../../lib/prisma";

export default async function AdminDashboard() {
  const [users, admins, orgs] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.yellowBookEntry.count(),
  ]);

  const latestOrgs = await prisma.yellowBookEntry.findMany({
    orderBy: { fullName: "asc" },
    take: 5,
    select: { id: true, fullName: true, city: true, department: true },
  });

  const Card = ({ title, value }: { title: string; value: number }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-slate-300">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Quick overview of Yellow_book system
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Total users" value={users} />
        <Card title="Admins" value={admins} />
        <Card title="Organizations" value={orgs} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-semibold text-white">Latest organizations</div>
        <div className="mt-4 space-y-2">
          {latestOrgs.map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3">
              <div>
                <div className="text-white">{o.fullName}</div>
                <div className="text-xs text-slate-400">
                  {o.department} · {o.city}
                </div>
              </div>
              <a className="text-sm text-blue-300 hover:text-blue-200" href={`/admin/organizations/${o.id}/edit`}>
                Edit →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
