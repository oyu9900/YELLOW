"use client";
import { useState } from "react";

export default function Assistant() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<any[]>([]);

  async function ask() {
    const r = await fetch("/api/ai/yellow-books/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });
    setRes(await r.json());
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Yellow Book Assistant 🤖</h1>

      <input
        className="w-full mt-4 p-2 rounded bg-slate-800"
        placeholder="Search organizations..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />

      <button
        onClick={ask}
        className="mt-3 px-4 py-2 bg-blue-600 rounded"
      >
        Ask
      </button>

      <ul className="mt-6 space-y-3">
        {res.map(r => (
          <li key={r.id} className="p-3 bg-slate-900 rounded">
            <b>{r.fullName}</b>
            <div className="text-sm text-slate-400">{r.department}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
