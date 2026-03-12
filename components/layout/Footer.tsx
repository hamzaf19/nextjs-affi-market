import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Fitness", href: "/shop?category=Fitness" },
      { label: "Mindset", href: "/shop?category=Mindset" },
      { label: "Productivity", href: "/shop?category=Productivity" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Affiliate Disclosure", href: "/" },
      { label: "Privacy Policy", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <span>BioMetrix Reviews</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Curated reviews and honest recommendations for fitness gear,
              mindset books, and productivity tools. Every link on this site is
              an affiliate link — we may earn a commission at no extra cost to
              you.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold">{col.heading}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BioMetrix Reviews. All rights reserved. This
          site contains affiliate links.
        </div>
      </div>
    </footer>
  );
}
