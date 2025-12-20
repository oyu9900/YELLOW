"use client";

import Link from "next/link";
import { useState } from "react";

type O = { id: string; fullName: string; email: string; city: string; department: string };

export default function OrgTable({ initial }: { initial: O[] }) {
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const del = async (id: string) => {
    if (!confirm("Delete this organization?")) return;

    setBusy(id);
    const res = await fetch("/api/admin/org/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) setRows((p) => p.filter((x) => x.id !== id));
    setBusy(null);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-slate-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((o) => (
            <tr key={o.id} className="text-slate-200">
              <td className="px-4 py-3">{o.fullName}</td>
              <td className="px-4 py-3">{o.email}</td>
              <td className="px-4 py-3">{o.department}</td>
              <td className="px-4 py-3">{o.city}</td>
              <td className="px-4 py-3 flex gap-2">
                <Link
                  href={`/admin/organizations/${o.id}/edit`}
                  className="rounded-lg bg-white/10 px-3 py-1 hover:bg-white/20"
                >
                  Edit
                </Link>
                <button
                  onClick={() => del(o.id)}
                  disabled={busy === o.id}
                  className="rounded-lg bg-red-500/20 px-3 py-1 text-red-200 hover:bg-red-500/30 disabled:opacity-60"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
