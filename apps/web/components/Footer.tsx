import Link from "next/link";

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

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur py-12 text-slate-300">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-4">

        {/* BRAND */}
        <div className="space-y-3">
          <div className="text-lg font-semibold text-white">Yellow_book</div>
          <p className="text-sm">
            The simplest way to find organizations.
          </p>

          <div className="flex gap-4 text-sm text-blue-400">
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://github.com" target="_blank">GitHub</a>
            <a href="https://vercel.com" target="_blank">Vercel</a>
          </div>
        </div>

        {/* LINKS */}
        {Object.entries(footerColumns).map(([title, links]) => (
          <div key={title}>
            <div className="mb-3 text-sm font-semibold uppercase text-slate-400">
              {title}
            </div>

            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Yellow_book. All rights reserved.
      </div>
    </footer>
  );
}
