"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, Check, Send } from "@/components/Icons";
import { readerVoices } from "@/content/book";

type ReaderComment = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

const STORAGE_KEY = "vignettes-reader-comments";
const PAGE_SIZE = 5;
const EMPTY_COMMENTS: ReaderComment[] = [];
const listeners = new Set<() => void>();
let commentsSnapshot = EMPTY_COMMENTS;
let storageIssue: string | null = null;
let storageLoaded = false;

const label = "ui block text-left text-[12px] text-ink/75";
const field =
  "mt-2 w-full border border-ink/20 bg-paper px-4 py-3 font-serif text-[17px] font-normal normal-case tracking-normal text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 hover:border-ink/40 focus:border-red focus:shadow-[0_0_0_3px_rgba(200,55,42,0.15)]";

function isReaderComment(value: unknown): value is ReaderComment {
  if (!value || typeof value !== "object") return false;
  const comment = value as Record<string, unknown>;
  return (
    typeof comment.id === "string" &&
    typeof comment.name === "string" &&
    typeof comment.comment === "string" &&
    typeof comment.createdAt === "string"
  );
}

function loadComments() {
  if (storageLoaded || typeof window === "undefined") return;
  storageLoaded = true;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isReaderComment)) {
      throw new Error("Saved comments have an invalid format.");
    }
    commentsSnapshot = parsed;
  } catch {
    storageIssue = "Saved comments could not be loaded from this browser.";
  }
}

function getCommentsSnapshot() {
  loadComments();
  return commentsSnapshot;
}

function getStorageIssue() {
  loadComments();
  return storageIssue;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    storageLoaded = false;
    loadComments();
    listeners.forEach((notify) => notify());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function storeComments(comments: ReaderComment[]) {
  commentsSnapshot = comments;
  storageLoaded = true;
  storageIssue = null;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {
    storageIssue = "Your comment is shown here, but this browser could not save it for your next visit.";
  }
  listeners.forEach((notify) => notify());
}

export default function ReaderVoices() {
  const comments = useSyncExternalStore(subscribe, getCommentsSnapshot, () => EMPTY_COMMENTS);
  const storageError = useSyncExternalStore(subscribe, getStorageIssue, () => null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanComment = commentText.trim();
    if (!cleanName || !cleanComment) {
      setFormError("Enter your name and comment before submitting.");
      return;
    }

    const submitted: ReaderComment = {
      id: crypto.randomUUID(),
      name: cleanName,
      comment: cleanComment,
      createdAt: new Date().toISOString(),
    };
    const updated = [submitted, ...comments];
    storeComments(updated);
    setVisibleCount(PAGE_SIZE);
    setFormError("");
    setNotice("Your comment has been added.");
    setName("");
    setCommentText("");
    setFormOpen(false);
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
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="group ui inline-flex min-h-11 items-center justify-center gap-2 bg-red px-6 py-3 text-white transition-colors hover:bg-red-dark"
              >
                Submit comment
                <Send size={16} />
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="ui inline-flex min-h-11 items-center justify-center border border-ink/30 px-6 py-3 text-ink transition-colors hover:bg-cream"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {notice && (
          <p role="status" className="mt-6 flex items-center justify-center gap-2 text-center text-[16px] text-ink/80">
            <Check size={18} className="text-red" />
            {notice}
          </p>
        )}
        {(formError || storageError) && (
          <p role="alert" className="mt-6 text-center text-[16px] text-red-dark">
            {formError || storageError}
          </p>
        )}

        <div className="mt-12 border-t border-ink/15 pt-10">
          <h3 className="display text-center text-[28px] text-ink md:text-[36px]">
            Comments <span className="font-sans text-[18px] font-semibold">({comments.length})</span>
          </h3>
          {comments.length === 0 ? (
            <p className="mt-6 text-center text-[17px] text-ink/65">Be the first to share a comment.</p>
          ) : (
            <>
              <ul className="mt-7 grid gap-4">
                {comments.slice(0, visibleCount).map((item) => (
                  <li key={item.id} className="border-l-4 border-gold bg-white px-5 py-4 shadow-sm">
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
