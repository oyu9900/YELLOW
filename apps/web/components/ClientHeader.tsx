"use client";

import Link from "next/link";
import { useAuth } from "../app/auth/useAuth";

export default function ClientHeader() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center gap-6 text-sm font-medium text-slate-200">
      <Link href="/yellow-books" className="hover:text-white">
        Organizations
      </Link>

      {user ? (
        <>
          <span className="text-slate-300">{user.email}</span>

          <button
            onClick={logout}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
          <Link href="/register" className="hover:text-white">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

