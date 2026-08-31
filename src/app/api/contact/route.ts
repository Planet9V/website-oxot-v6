/**
 * POST /api/contact — validate, STORE, and notify.
 *
 * This used to validate and log, and nothing else, while the page above it
 * promised an engineer's reply within two working days. The store existed the
 * whole time: /api/intake writes the 2-minute check's leads into
 * `cra_readiness_leads` through `recordLead`, and this route simply never
 * called it. Same table, same admin surface, different `cta_type` so the two
 * rungs of the ladder stay tellable apart.
 *
 * Notification is best-effort and deliberately non-blocking: if a webhook is
 * configured we post to it, and a failure there never costs the visitor their
 * submission. The durable record is the row.
 *
 * Validation is duplicated deliberately. The client validates for the reader —
 * fast, inline, focus-managed. The server validates because the client's
 * validation is a courtesy that anyone can skip.
 */

import { recordLead } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rate-limit";

interface Payload {
  name: string;
  email: string;
  organisation: string;
  role: string;
  industry: string;
  country: string;
  decision: string;
  message: string;
}

const MAX = {
  name: 200,
  email: 320,
  organisation: 200,
  role: 200,
  industry: 200,
  country: 200,
  decision: 60,
  message: 5000
} as const;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, errors: { form: "Body must be JSON." } });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const payload: Payload = {
    name: str(raw.name).slice(0, MAX.name),
    email: str(raw.email).slice(0, MAX.email),
    organisation: str(raw.organisation).slice(0, MAX.organisation),
    role: str(raw.role).slice(0, MAX.role),
    industry: str(raw.industry).slice(0, MAX.industry),
    country: str(raw.country).slice(0, MAX.country),
    decision: str(raw.decision).slice(0, MAX.decision),
    message: str(raw.message).slice(0, MAX.message)
  };

  /*
   * RATE LIMIT AND HONEYPOT, because this route now WRITES.
   *
   * It used to validate and log, so an unthrottled POST cost nothing. It now
   * inserts a row per accepted submission, and it shipped without either
   * guard while both siblings had them — /api/intake rate-limits at 8/min and
   * /api/check/report at 6/min with an off-screen honeypot. Measured: twelve
   * consecutive POSTs from one address, twelve rows.
   */
  const rlIp = clientIp(request);
  if (!rateLimit(`contact:${rlIp ?? "unknown"}`, 5, 60_000)) {
    return json(429, { ok: false, error: "rate-limited" });
  }

  // A filled honeypot gets a plausible success. Telling a bot why it failed
  // only helps it succeed next time — same contract as the report gate.
  if (str(raw.website)) return json(200, { ok: true, persisted: true });

  const errors: Record<string, string> = {};
  if (!payload.name) errors.name = "Name is required.";
  if (!payload.email) errors.email = "Work email is required.";
  else if (!looksLikeEmail(payload.email)) errors.email = "Work email is not a valid address.";
  if (!payload.message) errors.message = "A message is required.";

  if (Object.keys(errors).length > 0) return json(400, { ok: false, errors });

  const ip: string | null = rlIp ?? null;

  // Read from the BODY. It was read from a query string the form never sent,
  // so every Dutch submission was filed as English — and the two-working-day
  // reply is written from this row.
  const locale =
    str(raw.locale) === "nl" || new URL(request.url).searchParams.get("locale") === "nl"
      ? "nl"
      : "en";

  const lead = await recordLead({
    name: payload.name,
    email: payload.email,
    company: payload.organisation || null,
    role: payload.role || null,
    locale,
    page: `/${locale}/contact`,
    // Distinguishes the written-review rung from the 2-minute check's
    // "cra_selfcheck", so the admin can see which ladder step converted.
    ctaType: "contact_written_review",
    answers: {
      message: payload.message,
      industry: payload.industry || null,
      country: payload.country || null,
      decision: payload.decision || null
    },
    ip
  });

  // Best effort, and never blocking. A notifier outage must not cost a lead:
  // the row is the record, the ping is a convenience.
  void notify(payload, (lead.ok && lead.id) ? lead.id : null);

  if (!lead.ok) {
    /*
      HONEST UNDER FAILURE. The reader gave us their details and gets a
      confirmation either way — but we do not silently pretend a row landed.
      The log line stays greppable so an operator can recover the submission.
    */
    console.error(
      "[contact] lead NOT stored:",
      lead.error,
      JSON.stringify({ email: payload.email, receivedAt: new Date().toISOString() })
    );
    return json(200, { ok: true, persisted: false });
  }

  return json(200, { ok: true, persisted: true, id: lead.id });
}

/**
 * Fire-and-forget notification. Configure CONTACT_WEBHOOK_URL (Slack, Teams,
 * a Zap, anything that takes a JSON POST) and OXOT hears about a lead within
 * seconds. Unset, this is a no-op and the row is still the source of truth.
 */
async function notify(payload: Payload, id: string | null): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text:
          `New OXOT written-review request from ${payload.name} (${payload.email})` +
          (payload.organisation ? ` at ${payload.organisation}` : "") +
          (id ? ` — lead ${id}` : " — NOT STORED, recover from logs"),
        lead: { id, ...payload }
      }),
      signal: AbortSignal.timeout(4000)
    });
  } catch (err) {
    console.error("[contact] notifier failed (lead is still stored):", String(err).slice(0, 200));
  }
}

function json(status: number, data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}
