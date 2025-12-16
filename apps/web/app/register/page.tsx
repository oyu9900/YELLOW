"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";

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
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="text-sm text-white/70">
            Join Yellow Book and list your organization
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

          <div>
            <label className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
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

          <div>
            <label className="block text-sm font-medium text-white/80">
              Confirm password
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            type="submit"
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
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-white/70">
          Already registered?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
