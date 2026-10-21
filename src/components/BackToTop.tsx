"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@/components/Icons";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] transition-[opacity,transform,background-color] duration-500 ease-out-expo hover:bg-red ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
