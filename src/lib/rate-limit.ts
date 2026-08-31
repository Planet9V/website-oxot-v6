import "server-only";

/**
 * A small in-process rate limiter.
 *
 * Deliberately not Redis. This guards two free endpoints on a marketing site
 * against a script, not a determined adversary — and a dependency on an
 * external store would be a new way for the funnel to break. If the site ever
 * runs multiple instances the limit becomes per-instance, which is a weaker
 * guarantee but still the right shape; say so here rather than pretending
 * otherwise.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Stop the map growing without bound on a long-lived process. */
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}

/** Best-effort client IP behind a proxy. Used only to build a hash. */
export function clientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip");
}
