import Link from "next/link";
import prisma from "../../../../lib/prisma";
import OrgTable from "../../../../components/admin/OrgTable";

export default async function AdminOrgsPage() {
  const orgs = await prisma.yellowBookEntry.findMany({
    orderBy: { fullName: "asc" },
    select: { id: true, fullName: true, email: true, city: true, department: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Organizations</h1>
          <p className="mt-1 text-sm text-slate-400">Create / edit / delete</p>
        </div>
        <Link
          href="/admin/organizations/new"
          className="rounded-lg bg-blue-500/20 px-4 py-2 text-blue-200 hover:bg-blue-500/30"
        >
          + New
        </Link>
      </div>

      <OrgTable initial={orgs} />
    </div>
  );
}
