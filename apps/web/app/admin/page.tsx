import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/admin/unlock");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">👑 Admin Dashboard</h1>
    </div>
  );
}
