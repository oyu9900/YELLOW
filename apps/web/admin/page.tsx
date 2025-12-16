import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return <div>Not logged in</div>;
  }

  const res = await fetch("http://localhost:4000/admin/stats", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Access denied</div>;
  }

  const data = await res.json();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
