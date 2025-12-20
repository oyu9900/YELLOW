"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Org = {
  id?: string;
  fullName: string;
  title: string;
  email: string;
  phone?: string | null;
  department: string;
  city: string;
  lat?: number | null;
  lng?: number | null;
  avatarUrl?: string | null;
};

export default function OrgForm({ initial }: { initial?: Org }) {
  const [v, setV] = useState<Org>(
    initial ?? {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      department: "",
      city: "",
      lat: null,
      lng: null,
      avatarUrl: "",
    }
  );
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    setErr("");

    const isEdit = Boolean(v.id);
    const url = isEdit ? "/api/admin/org/update" : "/api/admin/org/create";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(v),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || "Failed");
      setLoading(false);
      return;
    }

    router.push("/admin/organizations");
    router.refresh();
  };

  const Field = (label: string, key: keyof Org, type: string = "text") => (
    <label className="block">
      <div className="text-xs text-slate-400">{label}</div>
      <input
        type={type}
        value={(v[key] as any) ?? ""}
        onChange={(e) => setV({ ...v, [key]: e.target.value })}
        className="mt-1 w-full rounded-lg bg-black/30 px-4 py-2 text-white ring-1 ring-white/10 outline-none focus:ring-yellow-400"
      />
    </label>
  );

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Field("Full name", "fullName")}
        {Field("Title", "title")}
        {Field("Email", "email", "email")}
        {Field("Phone", "phone")}
        {Field("Department", "department")}
        {Field("City", "city")}
        {Field("Avatar URL", "avatarUrl")}
        {Field("Lat", "lat", "number")}
        {Field("Lng", "lng", "number")}
      </div>

      {err && <p className="text-sm text-red-400">{err}</p>}

      <button
        onClick={submit}
        disabled={loading}
        className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black hover:bg-yellow-400 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
