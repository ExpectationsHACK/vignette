"use client";

import { useState } from "react";
import { Check, Send } from "@/components/Icons";
import { enquire } from "@/content/book";

type Status = "idle" | "draft";

const label = "ui block text-[12px] text-ink/75";
const field =
  "mt-2 w-full border border-ink/20 bg-paper px-4 py-3 font-serif text-[17px] font-normal normal-case tracking-normal text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 hover:border-ink/40 focus:border-red focus:shadow-[0_0_0_3px_rgba(200,55,42,0.15)]";

export default function ContactForm({ topics }: { topics: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [draftUrl, setDraftUrl] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = new FormData(form);
    const body = [
      `Name: ${values.get("name") ?? ""}`,
      `Organization: ${values.get("organization") ?? ""}`,
      `Email: ${values.get("email") ?? ""}`,
      `Enquiry type: ${values.get("topic") ?? ""}`,
      `Quantity / target event date: ${values.get("quantityOrDate") ?? ""}`,
      "",
      "Message:",
      values.get("message") ?? "",
    ].join("\n");
    const url = `mailto:${enquire.email}?${new URLSearchParams({
      subject: "Bulk Order Inquiry - Vignettes of a Nigerian Experience",
      body,
    }).toString()}`;
    setDraftUrl(url);
    setStatus("draft");
    window.location.href = url;
  }

  if (status === "draft") {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-red text-white">
          <Check size={26} />
        </span>
        <p className="display mt-5 text-[28px] text-ink">Email draft ready</p>
        <p className="mt-2 text-[18px] text-ink/80">
          Your email app should open with the inquiry. Review and send the draft to complete your request.
        </p>
        <a href={draftUrl} className="ui mt-6 text-red underline-offset-[6px] hover:underline">
          Open your email draft
        </a>
        <button onClick={() => setStatus("idle")} className="ui mt-4 text-red underline-offset-[6px] hover:underline">
          Edit your inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className={label}>
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Organization
        <input name="organization" autoComplete="organization" className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        I am enquiring about
        <select name="topic" required className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231d1a17%22 stroke-width=%222%22 stroke-linecap=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        Estimated Quantity / Target Event Date
        <input name="quantityOrDate" required className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Message
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="group ui inline-flex h-[52px] w-full items-center justify-center gap-3 bg-red px-8 text-white shadow-[0_6px_16px_-6px_rgba(168,43,32,0.55)] transition-colors duration-300 hover:bg-red-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          Prepare Email
          <Send size={17} className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
