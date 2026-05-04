"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { siteData } from "@/lib/data";
import { isAdminEnabled } from "@/lib/env";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const adminVisible = isAdminEnabled();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleContactClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/#contact" && pathname === "/") {
      e.preventDefault();
      const target = document.getElementById("contact");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "/#contact");
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled
          ? "border-b border-hairline/15 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-edge flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex lg:gap-10" aria-label="Primary">
          {siteData.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleContactClick(e, item.href)}
              className={`text-sm tracking-wide link-underline ${
                isActive(item.href) ? "text-cream" : "text-cream/70 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {adminVisible && (
            <Link
              href="/admin"
              className="rounded-full border border-sage/40 px-3 py-1 text-[10px] uppercase tracking-wide-2 text-sage hover:bg-sage/10"
            >
              Admin
            </Link>
          )}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline/20 text-cream"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-hairline/15 bg-ink/95 backdrop-blur transition-[max-height,opacity] duration-500 ease-soft ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-edge flex flex-col gap-1 py-6" aria-label="Mobile">
          {siteData.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleContactClick(e, item.href)}
              className="rounded-md px-3 py-3 text-sm text-cream/80 hover:bg-surface hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
          {adminVisible && (
            <Link
              href="/admin"
              className="rounded-md px-3 py-3 text-sm text-sage hover:bg-surface"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
