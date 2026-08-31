import "server-only";
import { createHash } from "node:crypto";
import { pool, hasDatabase } from "./db";
import type { Locale } from "@/i18n/config";

/**
 * THE SINGLE WRITER for `cra_readiness_leads`.
 *
 * Everything that captures a lead goes through here. The previous application
 * learned this the hard way: when three call sites each built their own
 * INSERT, the column lists drifted and a lead could be written without the
 * fields the admin screen read, so it existed and was invisible.
 *
 * WHAT THIS IS FOR (START-HERE §2.5). Email is not the delivery mechanism. The
 * reader registers, the row lands here, and the PDF is handed straight back as
 * a browser download. Nothing in the reader's path depends on mail working.
 * `cra_readiness_leads` row count is the project's tracked outcome metric, and
 * until this file existed the new site captured nothing at all.
 *
 * The table is shared with the previous application (same Postgres, same
 * schema, migration 039 + 046/050/051). We write the same columns so the
 * existing admin Prospects screen can read our rows without changes.
 */

export type CtaType = "cra_selfcheck" | "intake" | "landing" | "contact_written_review";

export interface LeadInput {
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  locale: Locale;
  /** The route the reader was on. */
  page: string;
  ctaType: CtaType;
  /** The wizard answers, verdict and gaps — whatever the caller wants kept. */
  answers: unknown;
  /** Raw client IP, hashed before it is stored. Never persisted in the clear. */
  ip: string | null;
}

/**
 * IP is stored as a salted hash, never raw.
 *
 * It exists to spot abuse of a free tool, which a one-way hash supports
 * perfectly well. Keeping the address itself would be personal data we have no
 * use for — and this is a site that sells taking that distinction seriously.
 */
function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "oxot-local-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 64);
}

export interface LeadResult {
  ok: boolean;
  id?: string;
  /** Set when the database is unreachable. The caller decides what to tell the
   *  reader — but it must never silently claim success. */
  error?: string;
}

export async function recordLead(input: LeadInput): Promise<LeadResult> {
  if (!hasDatabase) {
    return { ok: false, error: "no-database" };
  }

  const cols =
    "segment, cta_type, stage, name, email, company, role, answers, locale, page, ip_hash, source";
  const vals = "$1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12";

  const params = [
    "cra", // segment
    input.ctaType,
    "new", // stage
    input.name,
    input.email,
    input.company,
    input.role,
    JSON.stringify(input.answers ?? {}),
    input.locale,
    input.page,
    hashIp(input.ip),
    "web" // source — distinguishes the new app's rows from the old site's
  ];

  try {
    const res = await pool.query<{ id: string }>(
      `INSERT INTO cra_readiness_leads (${cols}) VALUES (${vals}) RETURNING id`,
      params
    );
    return { ok: true, id: res.rows[0]?.id };
  } catch (err) {
    // Log for the operator; return a flag for the caller. Never throw into a
    // request handler and never tell the reader "sent" when nothing landed.
    console.error("[leads] insert failed:", err instanceof Error ? err.message : err);
    return { ok: false, error: "insert-failed" };
  }
}
