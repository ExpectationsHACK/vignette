"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, socialIcons } from "@/components/Icons";
import { BuyButton, BulkButton } from "@/components/Cta";
import { site, footer } from "@/content/book";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const social = footer.social.filter((s) => s.href);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Wait a frame for the overlay to become visible, or focus() is ignored.
    const focusTimer = open ? window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 60) : 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-[53px] items-center justify-between px-4 transition-colors duration-500 md:px-6 ${
          open ? "bg-red text-white" : "bg-paper/95 text-ink shadow-[0_1px_0_rgba(29,26,23,0.08)] backdrop-blur-sm"
        }`}
      >
        <Link href="/" onClick={close} className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] sm:text-[17px]">
          {site.publisher}
        </Link>
        <button
          ref={toggleRef}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative -mr-2 grid h-11 w-11 place-items-center"
        >
          <span className="relative block h-[12px] w-[26px]">
            <span
              className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] bg-current transition-[transform,width] duration-500 ease-out-expo ${
                open ? "top-[5px] w-full -rotate-45" : "top-[11px] w-[70%]"
              }`}
            />
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-40 grid overflow-y-auto pt-[53px] transition-[clip-path,visibility] duration-700 ease-out-expo md:grid-cols-[1.25fr_1fr] ${
          open ? "visible [clip-path:circle(150%_at_100%_0)]" : "invisible [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        {/* Navigation */}
        <nav className="relative flex flex-col justify-start overflow-hidden bg-red px-6 py-8 md:justify-center md:px-12 md:py-10 lg:px-16">
          <div className="stripes pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-25 [--color-red:#fff]" />
          <ul className="relative space-y-1 md:space-y-2">
            {site.nav.map((item, i) => (
              <li
                key={item.label}
                className={`transition-[opacity,transform] duration-700 ease-out-expo ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              >
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={close}
                  className="group flex items-center gap-4 py-2 font-display text-[34px] leading-tight text-white sm:text-[44px] lg:text-[56px]"
                >
                  <span className="decoration-1 underline-offset-[10px] group-hover:italic group-hover:underline">{item.label}</span>
                  <ArrowRight
                    size={28}
                    className="shrink-0 -translate-x-2 opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          {social.length > 0 && (
            <ul className="relative mt-6 flex gap-3 md:mt-10">
              {social.map((s) => {
                const Ico = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.publisher} on ${s.label}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/50 text-white transition-colors hover:bg-white hover:text-red"
                    >
                      <Ico size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        {/* Book + actions */}
        <aside className="flex flex-col items-center justify-center gap-5 bg-cream px-6 py-8 text-center md:gap-7 md:px-12 md:py-12">
          <Image
            src={site.mockup.src}
            width={site.mockup.width}
            height={site.mockup.height}
            alt=""
            sizes="300px"
            className="hidden h-auto mix-blend-multiply md:block md:w-[280px]"
          />
          <div className="hidden md:block">
            <p className="display text-[22px] text-ink md:text-[26px]">{site.title}</p>
            <p className="mt-2 italic text-ink/75">{site.subtitle}</p>
          </div>
          <div className="flex w-full max-w-[340px] flex-col gap-3">
            <BuyButton className="w-full" />
            <BulkButton className="w-full" onClick={close} />
          </div>
        </aside>
      </div>
    </>
  );
}
