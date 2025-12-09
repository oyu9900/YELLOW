"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";

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
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-md py-16">
      <div className="card space-y-6">
        <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-600">
            Email
            <input
              type="email"
              required
              className="input mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Password
            <input
              type="password"
              required
              className="input mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="btn-primary px-10" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-sm text-slate-500">
          No account?{" "}
          <Link href="/register" className="text-blue-600">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
