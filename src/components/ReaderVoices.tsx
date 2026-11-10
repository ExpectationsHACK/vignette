"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader, Send } from "@/components/Icons";
import { readerVoices } from "@/content/book";

type ReaderComment = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

type LoadState = "loading" | "ready" | "error";

const PAGE_SIZE = 5;

const label = "ui block text-left text-[12px] text-ink/75";
const field =
  "mt-2 w-full border border-ink/20 bg-paper px-4 py-3 font-serif text-[17px] font-normal normal-case tracking-normal text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 hover:border-ink/40 focus:border-red focus:shadow-[0_0_0_3px_rgba(200,55,42,0.15)]";

export default function ReaderVoices() {
  const [comments, setComments] = useState<ReaderComment[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/comments")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = (await res.json()) as { comments: ReaderComment[] };
        if (!cancelled) {
          setComments(data.comments);
          setLoadState("ready");
        }
      })
      .catch(() => !cancelled && setLoadState("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const cleanName = name.trim();
    const cleanComment = commentText.trim();
    if (!cleanName || !cleanComment) {
      setFormError("Enter your name and comment before submitting.");
      return;
    }

    setSending(true);
    setFormError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          comment: cleanComment,
          website: new FormData(form).get("website") ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Your comment couldn't be sent. Please try again.");
      setNotice("Thank you! Your comment will appear here once it has been approved.");
      setName("");
      setCommentText("");
      setFormOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Your comment couldn't be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="reader-voices" className="bg-paper px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="ui text-red">Community &amp; Endorsements</p>
          <h2 className="display mt-3 text-[34px] text-ink md:text-[48px]">{readerVoices.heading}</h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[18px] leading-relaxed text-ink/80 md:text-[19px]">
            {readerVoices.body}
          </p>
          <button
            type="button"
            onClick={() => {
              setFormOpen(true);
              setNotice("");
              setFormError("");
            }}
            className="ui mt-7 inline-flex min-h-11 items-center justify-center gap-2 border-[1.5px] border-red px-6 py-3 text-red transition-colors hover:bg-red hover:text-white"
          >
            Share a comment
            <ArrowRight size={16} />
          </button>
        </div>

        {formOpen && (
          <form
            onSubmit={submitComment}
            className="mx-auto mt-10 grid max-w-2xl gap-5 border-t-[6px] border-red bg-white p-6 shadow-[0_18px_40px_-24px_rgba(29,26,23,0.35)] md:p-8"
          >
            <h3 className="display text-[26px] text-ink">Add your comment</h3>
            <p className="-mt-2 text-[15px] text-ink/70">Comments are reviewed before they appear on the site.</p>
            <label className={label}>
              Your name
              <input
                name="commenterName"
                required
                maxLength={100}
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={field}
              />
            </label>
            <label className={label}>
              Your comment
              <textarea
                name="comment"
                required
                maxLength={1200}
                rows={5}
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                className={`${field} resize-y`}
              />
            </label>
            {/* Honeypot for spam bots; hidden from people and screen readers. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={sending}
                className="group ui inline-flex min-h-11 items-center justify-center gap-2 bg-red px-6 py-3 text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit comment
                    <Send size={16} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="ui inline-flex min-h-11 items-center justify-center border border-ink/30 px-6 py-3 text-ink transition-colors hover:bg-cream"
              >
                Cancel
              </button>
            </div>
            {formError && (
              <p role="alert" className="text-[16px] text-red-dark">
                {formError}
              </p>
            )}
          </form>
        )}

        {notice && (
          <p role="status" className="mt-6 flex items-center justify-center gap-2 text-center text-[16px] text-ink/80">
            <Check size={18} className="shrink-0 text-red" />
            {notice}
          </p>
        )}

        <div className="mt-12 border-t border-ink/15 pt-10">
          <h3 className="display text-center text-[28px] text-ink md:text-[36px]">
            Comments{" "}
            {loadState === "ready" && <span className="font-sans text-[18px] font-semibold">({comments.length})</span>}
          </h3>
          {loadState === "loading" && (
            <p className="mt-6 flex items-center justify-center gap-2 text-[17px] text-ink/65">
              <Loader size={18} className="animate-spin" />
              Loading comments…
            </p>
          )}
          {loadState === "error" && (
            <p role="alert" className="mt-6 text-center text-[17px] text-ink/65">
              Comments couldn&rsquo;t be loaded right now. Please refresh the page to try again.
            </p>
          )}
          {loadState === "ready" && comments.length === 0 && (
            <p className="mt-6 text-center text-[17px] text-ink/65">Be the first to share a comment.</p>
          )}
          {loadState === "ready" && comments.length > 0 && (
            <>
              <ul className="mt-7 grid gap-4">
                {comments.slice(0, visibleCount).map((item) => (
                  <li key={item.id} className="border-t-2 border-gold bg-white px-5 py-4 shadow-sm">
                    <blockquote className="whitespace-pre-wrap text-[17px] leading-relaxed text-ink">
                      &ldquo;{item.comment}&rdquo;
                    </blockquote>
                    <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-[18px] font-semibold text-red">{item.name}</p>
                      <time dateTime={item.createdAt} className="font-sans text-[12px] text-ink/55">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
              {visibleCount < comments.length && (
                <div className="mt-7 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="ui inline-flex min-h-11 items-center justify-center gap-2 border-[1.5px] border-red px-6 py-3 text-red transition-colors hover:bg-red hover:text-white"
                  >
                    More comments
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
