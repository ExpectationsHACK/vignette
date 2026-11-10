import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  approveComment,
  deleteComment,
  listComments,
  StoreUnavailableError,
  underRateLimit,
  type CommentStatus,
} from "@/lib/commentStore";

// The moderation password comes from the COMMENTS_ADMIN_PASSWORD environment variable.
const adminPassword = process.env.COMMENTS_ADMIN_PASSWORD ?? (process.env.NODE_ENV === "production" ? "" : "dev-admin");

const digest = (v: string) => createHash("sha256").update(v).digest();

async function authorized(req: Request) {
  if (!adminPassword) return false;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  // Slow down password guessing: 20 attempts per 10 minutes per address.
  if (!(await underRateLimit(`admin:${ip}`, 20, 600))) return false;
  const given = req.headers.get("x-admin-password") ?? "";
  return timingSafeEqual(digest(given), digest(adminPassword));
}

function handleError(err: unknown) {
  if (err instanceof StoreUnavailableError) {
    return NextResponse.json({ error: "Comment storage is not set up yet." }, { status: 503 });
  }
  throw err;
}

const denied = () => NextResponse.json({ error: "Incorrect password." }, { status: 401 });

export async function GET(req: Request) {
  try {
    if (!(await authorized(req))) return denied();
    const [pending, approved] = await Promise.all([listComments("pending"), listComments("approved")]);
    return NextResponse.json({ pending, approved }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: Request) {
  try {
    if (!(await authorized(req))) return denied();
    const body = await req.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    const action = body?.action;
    if (!id || !["approve", "delete"].includes(action)) {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    if (action === "approve") {
      const ok = await approveComment(id);
      return ok ? NextResponse.json({ ok }) : NextResponse.json({ error: "That comment no longer exists." }, { status: 404 });
    }

    const status: CommentStatus = body?.status === "approved" ? "approved" : "pending";
    const ok = await deleteComment(status, id);
    return ok ? NextResponse.json({ ok }) : NextResponse.json({ error: "That comment no longer exists." }, { status: 404 });
  } catch (err) {
    return handleError(err);
  }
}
