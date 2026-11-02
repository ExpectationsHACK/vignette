import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { BuyButton, BulkButton, RetailerButton } from "@/components/Cta";
import { Eye, Heart, Home as HomeIcon, Instagram, QuoteMark, Users } from "@/components/Icons";
import ReaderVoices from "@/components/ReaderVoices";
import { site, aboutBook, author, excerpts, enquire, footer, selectedQuotes } from "@/content/book";

const highlightIcons = [Heart, Eye, HomeIcon, Users];

// Show the author portrait only once its file exists in /public.
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", author.photo.src));
const instagram = footer.social.find((s) => s.icon === "instagram" && s.href);

function PhotoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[linear-gradient(160deg,#4a443d_0%,#2f2b27_100%)] ${className}`}>
      <div className="absolute bottom-[-25%] left-1/2 aspect-square w-[80%] -translate-x-1/2 rounded-full bg-white/10" />
      <div className="absolute bottom-[45%] left-1/2 aspect-square w-[36%] -translate-x-1/2 rounded-full bg-white/15" />
    </div>
  );
}

export default function Home() {
  const [featured, ...restQuotes] = excerpts.quotes;

  return (
    <>
      {/* Title band, echoing the cover */}
      <section className="relative overflow-hidden bg-cream px-4 pb-16 pt-14 text-center md:pb-20 md:pt-20">
        <div className="stripes pointer-events-none absolute -bottom-6 -left-6 hidden h-28 w-28 opacity-80 sm:block md:h-44 md:w-44" />
        <div className="stripes pointer-events-none absolute right-0 top-16 hidden h-28 w-28 opacity-50 sm:block md:h-40 md:w-40" />

        <div className="relative">
          <div className="pointer-events-none absolute -bottom-6 left-1/2 aspect-square w-[160vw] -translate-x-1/2 rounded-full bg-red md:-bottom-10 md:w-[120vw]" />
          <h1 className="display relative text-[46px] text-ink sm:text-[68px] md:text-[96px]">
            Vignettes
            <span className="block font-display text-[0.6em] font-normal normal-case italic leading-[1.15] tracking-normal text-gold-light">
              of a
            </span>
            Nigerian
            <br />
            Experience
          </h1>
        </div>

        <Image
          src={site.heroCover.src}
          width={site.heroCover.width}
          height={site.heroCover.height}
          alt={`${site.title} book cover`}
          priority
          sizes="(min-width: 1024px) 500px, (min-width: 640px) 420px, 340px"
          className="relative mx-auto mt-5 w-[340px] max-w-[86vw] drop-shadow-[0_28px_24px_rgba(29,26,23,0.3)] sm:w-[420px] md:w-[500px]"
        />

        <div className="relative mx-auto mt-7 max-w-5xl overflow-hidden rounded-xl border border-red/25 bg-paper/95 p-4 shadow-[0_20px_44px_-28px_rgba(29,26,23,0.55)] sm:p-6 md:p-8">
          <div className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(-45deg,#c8372a_0_9px,#ebe3d5_9px_18px)]" />
          <div className="mb-5 mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red/50 sm:w-16" />
            <p className="ui text-[11px] text-red sm:text-[12px]">Choose where to buy</p>
            <span className="h-px w-8 bg-red/50 sm:w-16" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <BuyButton className="w-full" />
            <RetailerButton retailer="barnesAndNoble" href={site.barnesAndNobleUrl} label="Buy on Barnes & Noble" className="w-full" />
            <RetailerButton retailer="bookshop" href={site.bookshopUrl} label="Buy on Bookshop.org" className="w-full" />
            <RetailerButton
              retailer="selar"
              href={site.selarUrl}
              label="Buy in Nigeria / West Africa"
              className="w-full"
            />
            <BulkButton className="w-full" />
          </div>
        </div>

        <figure className="relative mx-auto mt-7 max-w-2xl">
          <blockquote className="font-display text-[22px] italic leading-snug text-ink md:text-[28px]">
            &ldquo;{selectedQuotes.landing}&rdquo;
          </blockquote>
          <figcaption className="ui mt-3 text-[10px] text-ink/65 sm:text-[11px]">
            {selectedQuotes.source}
          </figcaption>
        </figure>

        <p className="relative mt-7 font-display text-[20px] italic text-ink md:text-[24px]">{site.subtitle}</p>
        <p className="relative mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-ink/70 md:text-[16px]">{site.editorialCredit}</p>

        <ul className="ui relative mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3 text-ink/80">
          {site.nav.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="underline-offset-[6px] transition-colors hover:text-red hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="stripe-band" aria-hidden />

      {/* About the book */}
      <section id="about" className="relative overflow-hidden bg-paper px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="relative mx-auto w-full max-w-[420px] md:sticky md:top-24">
            <div className="pointer-events-none absolute -left-[18%] -top-[12%] aspect-square w-[78%] rounded-full bg-red" />
            <div className="relative bg-cream shadow-[0_24px_48px_-24px_rgba(29,26,23,0.45)]">
              <Image
                src={site.mockup.src}
                width={site.mockup.width}
                height={site.mockup.height}
                alt={`${site.title}, hardcover book mockup`}
                priority
                sizes="(min-width: 768px) 420px, 90vw"
                className="h-auto w-full mix-blend-multiply"
              />
            </div>
          </div>

          <div className="max-w-[65ch] text-[18px] leading-[1.7] md:text-[19px]">
            <h2 className="display text-[38px] text-red md:text-[56px]">{aboutBook.heading}</h2>
            <figure className="mt-7 border-l-4 border-gold pl-5">
              <blockquote className="font-display text-[23px] italic leading-snug text-ink md:text-[28px]">
                &ldquo;{selectedQuotes.about}&rdquo;
              </blockquote>
              <figcaption className="ui mt-4 text-[10px] text-ink/60 sm:text-[11px]">
                {selectedQuotes.source}
              </figcaption>
            </figure>
            <p className="mt-7 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.8] first-letter:text-red">
              {aboutBook.intro[0]}
            </p>
            <p className="mt-5">{aboutBook.intro[1]}</p>

            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {aboutBook.highlights.map((h, i) => {
                const Ico = highlightIcons[i];
                return (
                  <li key={h.lead} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red text-white shadow-[0_6px_14px_-6px_rgba(168,43,32,0.6)]">
                      <Ico size={18} />
                    </span>
                    <span className="text-[17px] leading-relaxed">
                      <strong className="font-semibold text-ink">{h.lead}</strong> {h.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 border-t-2 border-gold pt-8 font-display text-[22px] italic leading-snug text-ink md:text-[26px]">
              {aboutBook.closing}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <BuyButton className="w-full sm:w-auto" />
              <RetailerButton
                retailer="selar"
                href={site.selarUrl}
                label="Buy in Nigeria / West Africa"
                className="w-full sm:w-auto"
              />
              <RetailerButton
                retailer="barnesAndNoble"
                href={site.barnesAndNobleUrl}
                label="Buy on Barnes & Noble"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the author */}
      <section id="author" className="relative overflow-hidden bg-red px-4 py-16 text-white md:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 aspect-square w-72 rounded-full bg-red-dark md:w-[28rem]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="pointer-events-none absolute -bottom-5 -left-5 h-28 w-28 [background-image:repeating-linear-gradient(-45deg,var(--color-cream)_0_10px,transparent_10px_20px)]" />
            {hasPhoto ? (
              <div className="relative aspect-[4/5] overflow-hidden border-[10px] border-cream shadow-[0_28px_50px_-22px_rgba(0,0,0,0.65)]">
                <Image
                  src={author.photo.src}
                  alt={author.photo.alt}
                  fill
                  sizes="(min-width: 768px) 420px, 90vw"
                  className="object-cover"
                  style={{ objectPosition: author.photo.position }}
                />
              </div>
            ) : (
              <PhotoPlaceholder className="aspect-[4/5]" />
            )}
          </div>

          <div className="relative max-w-[60ch]">
            <h2 className="display text-[38px] md:text-[56px]">{author.heading}</h2>
            <p className="mt-3 font-display text-[22px] italic text-cream md:text-[26px]">{site.author}</p>
            <p className="mt-6 text-[18px] leading-[1.75] text-white md:text-[19px]">{author.bio}</p>
            <figure className="mt-8 border-l-2 border-gold-light pl-5">
              <blockquote className="font-display text-[22px] italic leading-snug text-white md:text-[27px]">
                &ldquo;{selectedQuotes.author}&rdquo;
              </blockquote>
              <figcaption className="ui mt-4 text-[10px] text-cream/75 sm:text-[11px]">
                {selectedQuotes.source}
              </figcaption>
            </figure>
            {instagram && (
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ui mt-8 inline-flex items-center gap-2 border-[1.5px] border-white px-5 py-3 text-white transition-colors hover:bg-white hover:text-red"
              >
                <Instagram size={18} />
                Follow {site.publisher} on Instagram
              </a>
            )}
          </div>
        </div>
      </section>

      {/* From the book: one featured line, two supporting */}
      <section id="excerpts" className="relative overflow-hidden bg-cream px-4 py-16 text-ink md:py-24">
        <div className="pointer-events-none absolute -bottom-40 -left-32 aspect-square w-80 rounded-full bg-red md:w-[30rem]" />
        <h2 className="display relative text-center text-[38px] text-ink md:text-[56px]">{excerpts.heading}</h2>

        <figure className="relative mx-auto mt-12 max-w-4xl text-center">
          <QuoteMark size={48} className="mx-auto text-red" />
          <blockquote className="mt-4 font-display text-[30px] italic leading-[1.2] text-ink text-balance md:text-[48px]">
            {featured.text}
          </blockquote>
          <figcaption className="ui mt-6 text-ink/70">{featured.source}</figcaption>
        </figure>

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-10 border-t border-ink/20 pt-12 md:grid-cols-2 md:gap-16">
          {restQuotes.map((q) => (
            <figure key={q.source} className="text-center md:text-left">
              <blockquote className="font-display text-[24px] italic leading-snug text-ink md:text-[28px]">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="ui mt-4 text-ink/70">{q.source}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Secondary CTA below the quotes, laid out like the cover: red disc on cream */}
      <section className="relative overflow-hidden bg-cream px-4 pb-20 pt-24 text-center md:pb-24 md:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 aspect-square w-[160vw] -translate-x-1/2 -translate-y-[86%] rounded-full bg-red md:w-[90vw] md:-translate-y-[88%]" />
        <div className="stripes pointer-events-none absolute -bottom-6 -right-6 hidden h-32 w-32 opacity-80 sm:block" />
        <p className="display relative mx-auto max-w-3xl text-[32px] text-ink md:text-[52px]">
          Vignettes <span className="font-display normal-case italic tracking-normal text-gold">of a</span> Nigerian Experience
        </p>
        <p className="relative mt-4 font-display text-[20px] italic text-ink/80 md:text-[22px]">{site.subtitle}</p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BuyButton className="w-full max-w-[360px] sm:w-auto" />
          <BulkButton className="w-full max-w-[360px] sm:w-auto" />
        </div>
      </section>

      <div className="stripe-band" aria-hidden />

      {/* Bulk orders, book clubs, and events */}
      <section id="enquire" className="bg-paper px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <h2 className="display text-[34px] text-red md:text-[48px]">{enquire.heading}</h2>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.7] md:text-[19px]">{enquire.body}</p>
            {enquire.email && (
              <p className="mt-6 text-[18px]">
                Email:{" "}
                <a href={`mailto:${enquire.email}`} className="text-red underline underline-offset-4">
                  {enquire.email}
                </a>
              </p>
            )}
          </div>
          <div className="border-t-[6px] border-red bg-white p-6 shadow-[0_18px_40px_-24px_rgba(29,26,23,0.35)] md:p-10">
            <ContactForm topics={enquire.topics} />
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-14 text-center text-ink md:py-16">
        <figure className="mx-auto max-w-4xl">
          <blockquote className="font-display text-[27px] italic leading-snug md:text-[42px]">
            &ldquo;{selectedQuotes.closing}&rdquo;
          </blockquote>
          <figcaption className="ui mt-5 text-[10px] text-red sm:text-[11px]">
            {selectedQuotes.source}
          </figcaption>
        </figure>
      </section>

      <ReaderVoices />
    </>
  );
}
