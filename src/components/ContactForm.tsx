"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "mt-1 w-full border border-ink/25 bg-white px-3 py-2.5 text-[16px] font-normal text-ink outline-none focus:border-red focus:ring-2 focus:ring-red/20";

export default function ContactForm({ topics }: { topics: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="bg-white px-6 py-10 text-center">
        <p className="display text-[26px] text-red">Thank you</p>
        <p className="mt-2 text-[17px] text-ink">Your enquiry has been sent. We&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-[14px] font-medium text-ink/80 sm:grid-cols-2">
      <label>
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label>
        Organization
        <input name="organization" autoComplete="organization" className={field} />
      </label>
      <label className="sm:col-span-2">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label>
        I am enquiring about
        <select name="topic" required className={field} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Estimated Quantity / Target Event Date
        <input name="quantityOrDate" required className={field} />
      </label>
      <label className="sm:col-span-2">
        Message
        <textarea name="message" required rows={5} className={field} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-red px-8 py-3 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-red-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-[15px] text-red-dark">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
