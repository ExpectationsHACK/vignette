"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/book";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[53px] items-center justify-between bg-white px-4 shadow-[0_1px_0_rgba(0,0,0,0.08)]">
        <Link href="/" className="font-serif text-[14px] font-bold uppercase tracking-wide text-ink sm:text-[17px]">
          {site.publisher}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex flex-col items-center gap-[3px] text-ink"
        >
          <span className="relative block h-[16px] w-[32px]">
            <span className={`absolute left-0 h-[3px] w-full bg-ink transition-all ${open ? "top-[7px] rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-[7px] h-[3px] w-full bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[3px] w-full bg-ink transition-all ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`} />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{open ? "Close" : "Menu"}</span>
        </button>
      </header>

      <nav
        id="site-menu"
        className={`fixed inset-0 top-[53px] z-40 bg-red transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
          {site.nav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="display text-3xl text-white transition-colors hover:text-cream md:text-5xl"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href={site.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white px-7 py-2.5 text-[15px] font-semibold uppercase tracking-wide text-red hover:bg-cream"
            >
              Buy on Amazon
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
