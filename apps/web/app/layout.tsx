import React from "react";
import "./globals.css";
import Link from "next/link";
import ClientHeader from "../components/ClientHeader";
import Footer from "../components/Footer";
import Providers from "../components/Providers";

export const metadata = {
  title: "Yellow_book",
  description: "Discover and register organizations across Mongolia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--page-bg)] text-[var(--text)]">
        <Providers>
          <header className="sticky top-0 z-20 border-b border-white/20 bg-black/30 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
              <Link href="/" className="text-lg font-semibold text-white">
                Yellow_book
              </Link>
              <ClientHeader />
            </div>
          </header>

          <main className="container mx-auto flex-1 px-6 py-14">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
