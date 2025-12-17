"use client";

import { useSession } from "next-auth/react";
import Protected from "../../components/Protected";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <Protected>
      <div className="mx-auto max-w-3xl px-4 py-20">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl bg-black/30 p-10 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* Gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-lg">
                {user?.email?.[0]?.toUpperCase()}
              </div>

              <div>
                <h1 className="text-3xl font-semibold text-white">
                  Profile
                </h1>
                <p className="text-slate-300">
                  Your account information
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoCard
                label="Email"
                value={user?.email}
              />

              <InfoCard
                label="Role"
                value={user?.role}
                highlight={user?.role === "ADMIN"}
              />
            </div>

            {/* Divider */}
            <div className="my-10 h-px w-full bg-white/10" />

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/yellow-books"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Browse Organizations
              </a>

              {user?.role === "ADMIN" && (
                <a
                  href="/admin"
                  className="rounded-xl bg-red-500/20 px-6 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
                >
                  👑 Admin Dashboard
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}

/* 🔹 Small reusable card */
function InfoCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div
        className={`mt-2 text-lg font-medium ${
          highlight ? "text-red-300" : "text-white"
        }`}
      >
        {value ?? "-"}
      </div>
    </div>
  );
}
