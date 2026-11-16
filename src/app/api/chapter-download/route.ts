import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { underRateLimit } from "@/lib/commentStore";
import { chapterPreview } from "@/content/book";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Google Apps Script web app that appends a row to the sign-up sheet.
// See docs/chapter-download-google-sheet.md for the script and setup steps.
const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
const sheetSecret = process.env.GOOGLE_SHEET_WEBHOOK_SECRET ?? "";

/** Records the sign-up. Never blocks the download: a failure is logged instead. */
async function recordSignup(name: string, email: string) {
  if (!sheetUrl) {
    console.warn("[chapter-download] GOOGLE_SHEET_WEBHOOK_URL is not set; sign-up not recorded:", email);
    return;
  }
  try {
    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: sheetSecret,
        name,
        email,
        chapter: `${chapterPreview.label}: ${chapterPreview.title}`,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) console.error("[chapter-download] Sheet responded", res.status, "for", email);
  } catch (err) {
    console.error("[chapter-download] Could not reach the sheet for", email, err);
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Honeypot: real visitors never see or fill this field.
  if (str(body?.website, 200)) return NextResponse.json({ error: "Something went wrong." }, { status: 400 });

  const name = str(body?.name, 120);
  const email = str(body?.email, 254);
  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // Rate limiting is best-effort: skip it when the shared store isn't available.
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await underRateLimit(`chapter:${ip}`, 10, 600))) {
      return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
    }
  } catch {
    /* no shared store configured */
  }

  let pdf: Buffer;
  try {
    pdf = await readFile(path.join(process.cwd(), "private", "chapter-five.pdf"));
  } catch (err) {
    console.error("[chapter-download] Chapter file missing", err);
    return NextResponse.json({ error: "The chapter isn't available right now. Please try again later." }, { status: 500 });
  }

  await recordSignup(name, email);

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${chapterPreview.fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
