import { NextResponse } from "next/server";
import { addPendingComment, listComments, StoreUnavailableError, underRateLimit } from "@/lib/commentStore";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const unavailable = () =>
  NextResponse.json({ error: "Comments are temporarily unavailable. Please try again later." }, { status: 503 });

/** Approved comments only, newest first. */
export async function GET() {
  try {
    const comments = await listComments("approved");
    return NextResponse.json({ comments }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof StoreUnavailableError) return unavailable();
    throw err;
  }
}

/** New comments are held for approval before they appear on the site. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Honeypot: real visitors never see or fill this field.
  if (str(body?.website, 200)) return NextResponse.json({ ok: true }, { status: 202 });

  const name = str(body?.name, 100);
  const comment = str(body?.comment, 1200);
  if (!name || !comment) {
    return NextResponse.json({ error: "Enter your name and comment before submitting." }, { status: 400 });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await underRateLimit(`comment:${ip}`, 5, 600))) {
      return NextResponse.json(
        { error: "You've sent several comments in a short time. Please wait a few minutes and try again." },
        { status: 429 },
      );
    }
    await addPendingComment({ id: crypto.randomUUID(), name, comment, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    if (err instanceof StoreUnavailableError) return unavailable();
    throw err;
  }
}
