import { footer, site } from "@/content/book";

export default function Footer() {
  return (
    <footer className="bg-charcoal px-4 py-12 text-center text-white">
      <p className="display text-[20px] md:text-[24px]">{site.title}</p>
      <p className="mt-2 font-serif text-[15px] italic text-white/85">{site.subtitle}</p>
      <p className="mt-1 text-[13px] text-white/70">{site.editorialCredit}</p>

      <p className="mt-8 text-[14px]">
        Follow us:{" "}
        {footer.social.map((s, i) => (
          <span key={s.label}>
            {i > 0 && <span className="px-2 text-white/50">·</span>}
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-gold hover:underline">
              {s.label}
            </a>
          </span>
        ))}
      </p>
      <p className="mt-6 text-[12px] text-white/60">
        © {new Date().getFullYear()} {site.publisher}. All rights reserved.
      </p>
    </footer>
  );
}
