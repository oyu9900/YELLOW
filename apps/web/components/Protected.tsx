"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Protected({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "USER" | "ADMIN";
}) {
  const { data: session, status } = useSession();

  // ⏳ Session ачаалж байхад юу ч битгий хий
  if (status === "loading") {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-300">
        Loading profile...
      </div>
    );
  }

  // ❌ Login хийгээгүй бол
  if (!session) {
    redirect("/login");
  }

  // 👑 Role шалгалт (ADMIN only)
  if (role && (session.user as any)?.role !== role) {
    redirect("/profile");
  }

  return <>{children}</>;
}

