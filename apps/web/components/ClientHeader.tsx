"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function ClientHeader() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-slate-400 text-sm">Loading...</div>;
  }

  const user = session?.user as any;

  return (
    <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
      <Link href="/yellow-books" className="hover:text-white">
        Organizations
      </Link>

      {user ? (
        <>
          {/* 👑 ADMIN MENU */}
          {user?.role === "ADMIN" && (
  <Link href="/admin" className="hover:text-yellow-400">
    Admin
  </Link>
)}


          <Link
            href="/profile"
            className="rounded-lg bg-white/10 px-3 py-1 hover:bg-white/20"
          >
            {user.email}
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg bg-red-500/20 px-3 py-1 text-red-300 hover:bg-red-500/30"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-500/20 px-3 py-1 hover:bg-blue-500/30"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
