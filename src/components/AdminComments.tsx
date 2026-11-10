"use client";

import { useState } from "react";
import { Check, Loader } from "@/components/Icons";

type ReaderComment = { id: string; name: string; comment: string; createdAt: string };
type Lists = { pending: ReaderComment[]; approved: ReaderComment[] };

const field =
  "mt-2 w-full border border-ink/20 bg-paper px-4 py-3 font-serif text-[17px] text-ink outline-none focus:border-red focus:shadow-[0_0_0_3px_rgba(200,55,42,0.15)]";
const btn = "ui inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 transition-colors disabled:opacity-60";

export default function AdminComments() {
  const [password, setPassword] = useState("");
  const [lists, setLists] = useState<Lists | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function call(method: "GET" | "POST", body?: object) {
    const res = await fetch("/api/comments/admin", {
      method,
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
    return data;
  }

  async function load() {
    setBusy("load");
    setError("");
    try {
      setLists((await call("GET")) as Lists);
    } catch (err) {
      setLists(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  }

  async function act(action: "approve" | "delete", id: string, status: "pending" | "approved") {
    if (action === "delete" && !window.confirm("Delete this comment permanently?")) return;
    setBusy(id);
    setError("");
    try {
      await call("POST", { action, id, status });
      setLists((await call("GET")) as Lists);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  }

  if (!lists) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="mx-auto max-w-md bg-white p-6 shadow-[0_18px_40px_-24px_rgba(29,26,23,0.35)] md:p-8"
      >
        <label className="ui block text-[12px] text-ink/75">
          Moderation password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
        </label>
        <button type="submit" disabled={busy === "load"} className={`${btn} mt-5 w-full bg-red text-white hover:bg-red-dark`}>
          {busy === "load" && <Loader size={16} className="animate-spin" />}
          Open comments
        </button>
        {error && (
          <p role="alert" className="mt-4 text-[16px] text-red-dark">
            {error}
          </p>
        )}
      </form>
    );
  }

  const section = (title: string, items: ReaderComment[], status: "pending" | "approved") => (
    <section className="mt-10">
      <h2 className="display text-[26px] text-ink md:text-[32px]">
        {title} <span className="font-sans text-[18px] font-semibold">({items.length})</span>
      </h2>
      {items.length === 0 ? (
        <p className="mt-4 text-[17px] text-ink/65">
          {status === "pending" ? "Nothing waiting for review." : "No approved comments yet."}
        </p>
      ) : (
        <ul className="mt-5 grid gap-4">
          {items.map((c) => (
            <li key={c.id} className="bg-white px-5 py-4 shadow-sm">
              <p className="whitespace-pre-wrap text-[17px] leading-relaxed text-ink">{c.comment}</p>
              <p className="mt-3 text-[15px] text-ink/70">
                <span className="font-semibold text-red">{c.name}</span> · {new Date(c.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {status === "pending" && (
                  <button
                    onClick={() => act("approve", c.id, status)}
                    disabled={busy === c.id}
                    className={`${btn} bg-red text-white hover:bg-red-dark`}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}
                <button
                  onClick={() => act("delete", c.id, status)}
                  disabled={busy === c.id}
                  className={`${btn} border border-ink/30 text-ink hover:bg-cream`}
                >
                  {status === "pending" ? "Reject" : "Remove from site"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[17px] text-ink/75">Approved comments appear in Reader Voices on the home page.</p>
        <button onClick={load} disabled={busy === "load"} className={`${btn} border border-ink/30 text-ink hover:bg-cream`}>
          {busy === "load" && <Loader size={16} className="animate-spin" />}
          Refresh
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-[16px] text-red-dark">
          {error}
        </p>
      )}
      {section("Waiting for review", lists.pending, "pending")}
      {section("On the site", lists.approved, "approved")}
    </div>
  );
}
