import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumns = Record<string, FooterLink[]>;

const footerColumns: FooterColumns = {
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
    <footer className="mt-16 border-t border-white/20 bg-black/20 backdrop-blur-xl py-12">
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-[2fr_repeat(3,minmax(0,1fr))]">
        {Object.entries(footerColumns).map(([title, links]) => (
          <div key={title}>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              {title}
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {links.map((link) => {
                const isInternal = link.href.startsWith("/");

                return (
                  <li key={link.label}>
                    {isInternal ? (
                      <Link
                        href={link.href as any}
                        className="hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="hover:text-white">
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
