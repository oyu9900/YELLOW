export default async function AdminOrganizationsPage() {
  const res = await fetch("http://localhost:4000/yellow-books", {
    cache: "no-store",
  });
  const orgs = await res.json();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Organizations</h2>

      <ul className="space-y-2">
        {orgs.map((o: any) => (
          <li key={o.id} className="border p-2 rounded">
            <strong>{o.fullName}</strong> — {o.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
