"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Activity, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Sleep", label: "Sleep" },
  { href: "/shop?category=Diets", label: "Diets" },
  { href: "/shop?category=Wellbeing", label: "Wellbeing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" />
          </span>
          <span>BioMetrix Reviews</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Blog CTA */}
        <Link
          href="/shop"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <BookOpen className="h-4 w-4" />
          Browse Reviews
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
