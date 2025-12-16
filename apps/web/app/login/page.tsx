"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";
import { signIn } from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      router.push("/yellow-books");
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4">
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          p-8
          space-y-6
        "
      >
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-white/70">
            Sign in to your Yellow Book account
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                mt-1 w-full rounded-lg
                bg-white/20
                border border-white/30
                px-4 py-2
                text-white
                placeholder:text-white/60
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
              "
            />
          </div>
          {/* DIVIDER */}
<div className="relative py-2">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-white/20" />
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="bg-transparent px-2 text-white/60">
      Or continue with
    </span>
  </div>
</div>

{/* GITHUB LOGIN */}
<button
  type="button"
  onClick={() => signIn("github", { callbackUrl: "/yellow-books" })}
  className="
    w-full
    flex items-center justify-center gap-2
    rounded-lg
    border border-white/30
    bg-white/10
    py-2.5
    text-white
    hover:bg-white/20
    transition
  "
>
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.435.375.81 1.102.81 2.222v3.293c0 .322.21.694.825.576C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
  Continue with GitHub
</button>


          <div>
            <label className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                mt-1 w-full rounded-lg
                bg-white/20
                border border-white/30
                px-4 py-2
                text-white
                placeholder:text-white/60
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
              "
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            disabled={submitting}
            className="
              w-full mt-2
              rounded-lg
              bg-blue-600 hover:bg-blue-700
              transition
              py-2.5
              font-semibold
              text-white
              shadow-lg
              disabled:opacity-60
            "
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-white/70">
          No account?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
