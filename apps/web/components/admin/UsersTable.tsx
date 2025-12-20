"use client";

import { useState } from "react";

type U = {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
};

export default function UsersTable({ initial }: { initial: U[] }) {
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const setRole = async (userId: string, role: "USER" | "ADMIN") => {
    setBusy(userId);
    const res = await fetch("/api/admin/users/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });

    if (res.ok) {
      setRows((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    }
    setBusy(null);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-slate-300">
          <tr>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((u) => (
            <tr key={u.id} className="text-slate-200">
              <td className="px-4 py-3">{u.email ?? "-"}</td>
              <td className="px-4 py-3">{u.name ?? "-"}</td>
              <td className="px-4 py-3">
                <span className={u.role === "ADMIN" ? "text-yellow-300" : "text-slate-300"}>
                  {u.role}
                </span>
              </td>
              <td className="px-4 py-3">
                {u.role === "ADMIN" ? (
                  <button
                    onClick={() => setRole(u.id, "USER")}
                    disabled={busy === u.id}
                    className="rounded-lg bg-red-500/20 px-3 py-1 text-red-200 hover:bg-red-500/30 disabled:opacity-60"
                  >
                    Make USER
                  </button>
                ) : (
                  <button
                    onClick={() => setRole(u.id, "ADMIN")}
                    disabled={busy === u.id}
                    className="rounded-lg bg-yellow-500/20 px-3 py-1 text-yellow-200 hover:bg-yellow-500/30 disabled:opacity-60"
                  >
                    Make ADMIN
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
