import { socialIcons } from "@/components/Icons";
import { footer, site } from "@/content/book";

export default function Footer() {
  const social = footer.social.filter((s) => s.href);

  return (
    <footer className="bg-charcoal px-4 pb-10 pt-16 text-center text-white">
      <p className="display text-[24px] md:text-[30px]">{site.title}</p>
      <p className="mt-3 font-display text-[18px] italic text-white/85">{site.subtitle}</p>
      <p className="mx-auto mt-2 max-w-xl text-[15px] text-white/65">{site.editorialCredit}</p>

      {social.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="ui text-white/65">Follow us</p>
          <ul className="flex gap-3">
            {social.map((s) => {
              const Ico = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.publisher} on ${s.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-gold-light hover:bg-gold-light hover:text-charcoal"
                  >
                    <Ico size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="mt-12 border-t border-white/10 pt-8 font-sans text-[13px] text-white/55">
        © {new Date().getFullYear()} {site.publisher}. All rights reserved.
      </p>
    </footer>
  );
}
