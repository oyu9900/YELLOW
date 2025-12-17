"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUnlockPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur">
        <h1 className="mb-2 text-xl font-semibold text-white">
          🔐 Admin Unlock
        </h1>

        <p className="mb-6 text-sm text-slate-400">
          Enter admin access code to continue
        </p>

        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Admin access code"
          className="w-full rounded-lg bg-black/30 px-4 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-yellow-400"
        />

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-yellow-500/80 py-2 font-medium text-black hover:bg-yellow-500"
        >
          {loading ? "Checking..." : "Unlock Admin"}
        </button>
      </div>
    </div>
  );
}
