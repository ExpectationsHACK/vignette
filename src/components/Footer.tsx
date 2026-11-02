import { socialIcons } from "@/components/Icons";
import { GoodreadsButton } from "@/components/Cta";
import { enquire, footer, site } from "@/content/book";

export default function Footer() {
  const social = footer.social.filter((s) => s.href);

  return (
    <footer className="bg-cream px-4 pb-10 pt-16 text-center text-ink">
      <p className="display text-[24px] md:text-[30px]">{site.title}</p>
      <p className="mt-3 font-display text-[18px] italic text-ink/85">{site.subtitle}</p>
      <p className="mx-auto mt-2 max-w-xl text-[15px] text-ink/65">{site.editorialCredit}</p>

      {social.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="ui text-ink/65">Follow us</p>
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
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/30 text-ink transition-colors hover:border-red hover:bg-red hover:text-white"
                  >
                    <Ico size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <GoodreadsButton />
        {enquire.email && (
          <a
            href={`mailto:${enquire.email}?subject=${encodeURIComponent("Press & Media Inquiry - Vignettes of a Nigerian Experience")}`}
            className="inline-flex min-h-11 items-center text-ink/75 underline underline-offset-4 transition-colors hover:text-red"
          >
            Press &amp; Media Inquiries
          </a>
        )}
      </div>

      <p className="mt-12 border-t border-ink/10 pt-8 font-sans text-[13px] text-ink/55">
        © {new Date().getFullYear()} {site.publisher}. All rights reserved.
      </p>
    </footer>
  );
}
