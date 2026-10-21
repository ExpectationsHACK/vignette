import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ["Bulk order", "Book club", "Author conversation", "Newsletter feature", "Other"];

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Placeholder: validates and logs. Forward to the press inbox here (Resend,
// SendGrid, Formspree, ...) once the contact email is decided.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = str(body?.name, 200);
  const organization = str(body?.organization, 200);
  const email = str(body?.email, 254);
  const topic = str(body?.topic, 50);
  const quantityOrDate = str(body?.quantityOrDate, 200);
  const message = str(body?.message, 5000);

  if (!name || !message || !quantityOrDate) {
    return NextResponse.json(
      { error: "Please fill in your name, estimated quantity / event date, and message." },
      { status: 400 },
    );
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!TOPICS.includes(topic)) {
    return NextResponse.json({ error: "Please choose what you are enquiring about." }, { status: 400 });
  }

  console.log("[enquiry]", { name, organization, email, topic, quantityOrDate, length: message.length });
  return NextResponse.json({ ok: true });
}
