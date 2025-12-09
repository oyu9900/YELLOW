import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Yellow_book",
  description: "Discover and register organizations across Mongolia",
};

const footerColumns = {
  Main: [
    { label: "Organizations", href: "/yellow-books" },
    { label: "Register Org", href: "/register" },
    { label: "About", href: "/" },
  ],
  Explore: [
    { label: "Prototyping", href: "#" },
    { label: "Design systems", href: "#" },
    { label: "Docs", href: "#" },
  ],
  Resources: [
    { label: "Support", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Community", href: "#" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--page-bg)] text-[var(--text)] font-sans">
        <div className="flex min-h-screen flex-col">

          {/* HEADER */}
          <header className="sticky top-0 z-20 border-b border-white/20 bg-black/20 backdrop-blur">
            <div className="container flex h-20 items-center justify-between">
              <Link href="/" className="text-xl font-semibold text-slate-300">
                Yellow_book
              </Link>

              <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
                <Link href="/yellow-books" className="hover:text-white">
                  Organizations
                </Link>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
                <Link href="/register" className="hover:text-white">
                  Register
                </Link>
              </nav>
            </div>
          </header>

          {/* MAIN */}
          <main className="container flex-1 py-16">{children}</main>

          {/* FOOTER */}
          <footer className="mt-16 border-t border-white/20 bg-black/20 backdrop-blur-xl py-12">
            <div className="container grid grid-cols-1 gap-10 md:grid-cols-[2fr_repeat(3,minmax(0,1fr))]">

              <div className="space-y-3">
                <div className="text-lg font-semibold text-white">Yellow_book</div>
                <p className="text-sm text-slate-300">
                  The simplest way to find organizations.
                </p>

                <div className="flex gap-4 text-sm font-medium text-blue-400">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://vercel.com" target="_blank" rel="noreferrer">Vercel</a>
                </div>
              </div>

              {Object.entries(footerColumns).map(([title, links]) => (
                <div key={title}>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                    {title}
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {links.map((link) => {
                      const isExternal = link.href.startsWith("http");
                      const isHash = link.href.startsWith("#");

                      if (isExternal || isHash) {
                        return (
                          <li key={link.label}>
                            <a href={link.href} className="hover:text-white">
                              {link.label}
                            </a>
                          </li>
                        );
                      }

                      return (
                        <li key={link.label}>
                          <Link
                            href={link.href as any}
                            className="hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="container mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
              © {new Date().getFullYear()} Yellow_book. All rights reserved.
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
