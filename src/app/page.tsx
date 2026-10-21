import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { site, aboutBook, author, excerpts, enquire } from "@/content/book";

function AmazonButton({ variant = "red" }: { variant?: "red" | "white" }) {
  return (
    <a
      href={site.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-[46px] min-w-[200px] items-center justify-center px-7 text-[15px] font-semibold uppercase tracking-wide transition-colors ${
        variant === "red" ? "bg-red text-white hover:bg-red-dark" : "bg-white text-red hover:bg-cream"
      }`}
    >
      Buy on Amazon
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* Header section: title, subtitle, credit, Buy on Amazon */}
      <section className="relative overflow-hidden bg-cream px-4 pb-12 pt-14 text-center md:pb-16 md:pt-20">
        {/* Striped corner echoes the cover */}
        <div className="stripes pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 opacity-80 md:h-44 md:w-44" />

        <div className="relative">
          {/* Red disc anchored to the title so its edge always clears the subtitle */}
          <div className="pointer-events-none absolute -bottom-6 left-1/2 aspect-square w-[160vw] -translate-x-1/2 rounded-full bg-red md:-bottom-10 md:w-[120vw]" />
          <h1 className="display relative text-[44px] leading-[1.02] text-ink sm:text-[64px] md:text-[96px]">
            Vignettes
            <span className="block font-serif text-[0.62em] normal-case italic leading-[1.1] tracking-normal text-gold">of a</span>
            Nigerian
            <br />
            Experience
          </h1>
        </div>
        <p className="relative mt-12 font-serif text-[20px] italic text-ink md:text-[26px]">{site.subtitle}</p>
        <p className="relative mx-auto mt-2 max-w-xl font-serif text-[15px] text-ink/75 md:text-[17px]">{site.editorialCredit}</p>
        <div className="relative mt-8">
          <AmazonButton />
        </div>

        <ul className="relative mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2 text-[16px] text-ink md:text-[17px]">
          {site.nav.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="underline underline-offset-4 hover:text-red">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* About the book: mockup + copy */}
      <section id="about" className="bg-paper px-4 py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
          <div className="w-full max-w-[420px] shrink-0 md:w-[42%] md:max-w-none">
            <Image
              src={site.mockup.src}
              width={site.mockup.width}
              height={site.mockup.height}
              alt={`${site.title} — hardcover book mockup`}
              priority
              sizes="(min-width: 768px) 460px, 90vw"
              className="h-auto w-full mix-blend-multiply"
            />
          </div>
          <div className="text-[17px] leading-relaxed text-ink md:text-[19px]">
            <h2 className="display text-[34px] text-red md:text-[52px]">{aboutBook.heading}</h2>
            {aboutBook.intro.map((p, i) => (
              <p key={i} className="mt-5">
                {p}
              </p>
            ))}
            <ul className="mt-5 space-y-3">
              {aboutBook.highlights.map((h) => (
                <li key={h.lead} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-2 w-2 shrink-0 rotate-45 bg-red" />
                  <span>
                    <strong className="font-semibold">{h.lead}</strong> {h.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif text-[18px] italic md:text-[20px]">{aboutBook.closing}</p>
            <div className="mt-8">
              <AmazonButton />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the author */}
      <section id="author" className="bg-charcoal px-4 py-14 text-white md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-14">
          <div className="relative aspect-[4/5] w-[240px] shrink-0 overflow-hidden bg-[linear-gradient(160deg,#5a534b_0%,#3a3530_100%)] md:w-[320px]">
            {author.photo ? (
              <Image src={author.photo} alt={site.author} fill sizes="320px" className="object-cover grayscale" />
            ) : (
              <>
                <div className="absolute bottom-[-25%] left-1/2 aspect-square w-[80%] -translate-x-1/2 rounded-full bg-white/15" />
                <div className="absolute bottom-[45%] left-1/2 aspect-square w-[36%] -translate-x-1/2 rounded-full bg-white/20" />
                <p className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.3em] text-white/60">Photo coming</p>
              </>
            )}
            <div className="absolute inset-x-0 top-0 h-2 bg-red" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="display text-[34px] md:text-[52px]">{author.heading}</h2>
            <p className="mt-2 font-serif text-[20px] italic text-gold md:text-[24px]">{site.author}</p>
            <p className="mt-5 text-[17px] leading-relaxed text-white/90 md:text-[19px]">{author.bio}</p>
          </div>
        </div>
      </section>

      {/* From the book */}
      <section id="excerpts" className="bg-cream px-4 py-14 md:py-20">
        <h2 className="display text-center text-[34px] text-red md:text-[52px]">{excerpts.heading}</h2>
        <div className="mx-auto mt-10 grid max-w-6xl gap-10 md:grid-cols-3 md:gap-8">
          {excerpts.quotes.map((q) => (
            <figure key={q.source} className="border-t-2 border-red pt-6 text-center">
              <blockquote className="font-serif text-[22px] italic leading-snug text-ink md:text-[24px]">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/70">— {q.source}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Secondary CTA below the quotes */}
      <section className="relative overflow-hidden bg-red px-4 py-12 text-center text-white">
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-40 [background-image:repeating-linear-gradient(-45deg,#fff_0_10px,transparent_10px_20px)]" />
        <p className="display relative text-[28px] md:text-[40px]">{site.title}</p>
        <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AmazonButton variant="white" />
          <a
            href="#enquire"
            className="inline-flex h-[46px] min-w-[200px] items-center justify-center border-2 border-white px-7 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-red"
          >
            Request Bulk / Event Copies
          </a>
        </div>
      </section>

      {/* Bulk orders, book clubs, and events */}
      <section id="enquire" className="bg-paper px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
          <div>
            <h2 className="display text-[30px] text-red md:text-[44px]">{enquire.heading}</h2>
            <p className="mt-5 text-[17px] leading-relaxed md:text-[19px]">{enquire.body}</p>
            {enquire.email && (
              <p className="mt-5 text-[17px]">
                Email:{" "}
                <a href={`mailto:${enquire.email}`} className="text-red underline underline-offset-4">
                  {enquire.email}
                </a>
              </p>
            )}
          </div>
          <ContactForm topics={enquire.topics} />
        </div>
      </section>
    </>
  );
}
