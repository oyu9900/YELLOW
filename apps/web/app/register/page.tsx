"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";

export const metadata = { title: "Register · Yellow_book" };

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await register(email, password);
      router.push("/yellow-books");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-md py-16">
      <div className="card space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
          <p className="text-sm text-slate-500">
            Register your organization to appear in the directory.
          </p>
        </div>
        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600" htmlFor="confirm">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={6}
              className="input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="btn-primary px-10"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
