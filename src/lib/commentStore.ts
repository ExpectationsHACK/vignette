// Reader comments, stored in Upstash Redis (added from Vercel → Storage).
// New comments are held as "pending" until approved at /admin/comments.
// Without Redis credentials, development falls back to in-memory storage so the
// flow can be tried locally; production refuses to run without real storage.

export type ReaderComment = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export type CommentStatus = "pending" | "approved";

const KEYS: Record<CommentStatus, string> = {
  pending: "vignettes:comments:pending",
  approved: "vignettes:comments:approved",
};

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export class StoreUnavailableError extends Error {}

export function storeConfigured() {
  return Boolean(redisUrl && redisToken) || process.env.NODE_ENV !== "production";
}

async function redis<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(redisUrl!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new StoreUnavailableError(data.error ?? `Redis responded ${res.status}`);
  return data.result as T;
}

// Development-only fallback, reset whenever the dev server restarts.
const memory: Record<CommentStatus, Map<string, string>> = { pending: new Map(), approved: new Map() };
const memoryCounters = new Map<string, { count: number; resetAt: number }>();

function hasRedis() {
  if (redisUrl && redisToken) return true;
  if (process.env.NODE_ENV === "production") throw new StoreUnavailableError("Comment storage is not configured.");
  return false;
}

function parse(values: string[]): ReaderComment[] {
  return values
    .map((v) => {
      try {
        return JSON.parse(v) as ReaderComment;
      } catch {
        return null;
      }
    })
    .filter((c): c is ReaderComment => c !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listComments(status: CommentStatus): Promise<ReaderComment[]> {
  if (!hasRedis()) return parse([...memory[status].values()]);
  return parse(await redis<string[]>(["HVALS", KEYS[status]]));
}

export async function addPendingComment(comment: ReaderComment) {
  const json = JSON.stringify(comment);
  if (!hasRedis()) {
    memory.pending.set(comment.id, json);
    return;
  }
  await redis(["HSET", KEYS.pending, comment.id, json]);
}

/** Moves a pending comment to approved. Returns false if it no longer exists. */
export async function approveComment(id: string): Promise<boolean> {
  if (!hasRedis()) {
    const json = memory.pending.get(id);
    if (!json) return false;
    memory.approved.set(id, json);
    memory.pending.delete(id);
    return true;
  }
  const json = await redis<string | null>(["HGET", KEYS.pending, id]);
  if (!json) return false;
  await redis(["HSET", KEYS.approved, id, json]);
  await redis(["HDEL", KEYS.pending, id]);
  return true;
}

export async function deleteComment(status: CommentStatus, id: string): Promise<boolean> {
  if (!hasRedis()) return memory[status].delete(id);
  return (await redis<number>(["HDEL", KEYS[status], id])) > 0;
}

/** Fixed-window rate limit. Returns true while the caller is under `limit`. */
export async function underRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const fullKey = `vignettes:ratelimit:${key}`;
  if (!hasRedis()) {
    const now = Date.now();
    const entry = memoryCounters.get(fullKey);
    if (!entry || entry.resetAt < now) {
      memoryCounters.set(fullKey, { count: 1, resetAt: now + windowSeconds * 1000 });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  }
  const count = await redis<number>(["INCR", fullKey]);
  if (count === 1) await redis(["EXPIRE", fullKey, windowSeconds]);
  return count <= limit;
}
