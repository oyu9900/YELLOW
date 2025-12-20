import prisma from "../../../../lib/prisma";
import UsersTable from "../../../../components/admin/UsersTable";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
    select: { id: true, email: true, name: true, role: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Users</h1>
      <p className="mt-1 text-sm text-slate-400">
        Manage roles (USER / ADMIN)
      </p>
      <UsersTable initial={users} />
    </div>
  );
}
