"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Check, Loader } from "@/components/Icons";
import { chapterPreview } from "@/content/book";

type Status = "idle" | "sending" | "done" | "error";

const label = "ui block text-left text-[12px] text-ink/75";
const field =
  "mt-2 w-full border border-ink/20 bg-paper px-4 py-3 font-serif text-[17px] font-normal normal-case tracking-normal text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 hover:border-ink/40 focus:border-red focus:shadow-[0_0_0_3px_rgba(200,55,42,0.15)]";

function saveFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export default function ChapterPreview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [first, ...rest] = chapterPreview.paragraphs;

  // Reset the form state whenever the dialog is closed (button, Escape or backdrop).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setStatus("idle");
      setError("");
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/chapter-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "The download couldn't start. Please try again.");
      }
      saveFile(await res.blob(), chapterPreview.fileName);
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "The download couldn't start. Please try again.");
    }
  }

  return (
    <section id="chapter-preview" className="bg-paper px-4 py-16 md:py-24">
      <article className="relative mx-auto max-w-3xl bg-white px-6 pb-10 pt-12 shadow-[0_24px_60px_-32px_rgba(29,26,23,0.45)] sm:px-12 md:px-16 md:pt-16">
        <header className="text-center">
          <p className="ui text-red">{chapterPreview.label}</p>
          <h2 className="display mt-3 text-[34px] text-ink md:text-[48px]">{chapterPreview.title}</h2>
          <p className="mx-auto mt-6 max-w-md font-display text-[19px] italic leading-snug text-ink/80 md:text-[21px]">
            {chapterPreview.epigraph.text}
            <span className="mt-1 block font-sans text-[12px] font-semibold uppercase not-italic tracking-[0.14em] text-ink/55">
              {chapterPreview.epigraph.source}
            </span>
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-gold" />
        </header>

        <div className="relative mt-8 text-[18px] leading-[1.75] text-ink md:text-[19px]">
          <p className="font-display text-[24px] italic leading-snug md:text-[28px]">{first}</p>
          {rest.map((paragraph, i) => (
            <p key={i} className="mt-5">
              {paragraph}
            </p>
          ))}
          {/* The preview fades out where the full chapter continues */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/85 to-transparent" />
        </div>

        <div className="relative -mt-6 text-center">
          <p className="text-[16px] text-ink/70">The chapter continues in the full PDF.</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="group ui mt-5 inline-flex h-[52px] items-center justify-center gap-3 bg-red px-6 text-white shadow-[0_6px_16px_-6px_rgba(168,43,32,0.55)] transition-[background-color,box-shadow] duration-300 hover:bg-red-dark hover:shadow-[0_10px_22px_-8px_rgba(168,43,32,0.6)]"
          >
            <BookOpen size={18} />
            {chapterPreview.cta}
            <ArrowRight size={16} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </button>
        </div>
      </article>

      <dialog
        ref={dialogRef}
        aria-labelledby="chapter-download-title"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(92vw,480px)] border-t-[6px] border-red bg-white p-0 text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop:bg-ink/70"
      >
        <div className="p-6 md:p-8">
          {status === "done" ? (
            <div role="status" className="flex flex-col items-center py-4 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-red text-white">
                <Check size={26} />
              </span>
              <h3 id="chapter-download-title" className="display mt-5 text-[26px]">
                Your download has started
              </h3>
              <p className="mt-2 text-[17px] text-ink/80">Check your downloads folder for the chapter PDF. Enjoy the read.</p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="ui mt-6 inline-flex min-h-11 items-center justify-center border border-ink/30 px-6 py-3 transition-colors hover:bg-cream"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div>
                <h3 id="chapter-download-title" className="display text-[26px]">
                  {chapterPreview.formHeading}
                </h3>
                <p className="mt-2 text-[16px] text-ink/75">{chapterPreview.formBody}</p>
              </div>
              <label className={label}>
                Name
                <input name="name" required maxLength={120} autoComplete="name" className={field} />
              </label>
              <label className={label}>
                Email
                <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
              </label>
              {/* Honeypot for spam bots; hidden from people and screen readers. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="ui inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-red px-6 py-3 text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Preparing…
                    </>
                  ) : (
                    "Download"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="ui inline-flex min-h-11 items-center justify-center border border-ink/30 px-6 py-3 transition-colors hover:bg-cream"
                >
                  Cancel
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className="text-[16px] text-red-dark">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
}
