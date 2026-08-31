/**
 * `/consulting` — shared content foundation.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md (537 lines). Every string on this page carries the source line
 * it was transcribed from. Nothing is invented.
 *
 * BUILT FROM SCRATCH. Owner direction 2026-08-30: no reference to the previous
 * consulting page. Its files were not opened, read, diffed against or cited.
 *
 * ANCHORS, NOT ACCORDIONS (owner decision 2026-08-30). The spec offers either
 * at L185. Anchors were chosen because they keep every section server-rendered,
 * and `<Diagram>` is async — it cannot mount under a `"use client"` boundary at
 * all. An accordion here would mean the page could carry no diagrams.
 *
 * ZERO NUMERIC CLAIMS. The spec contains no percentages, currency, durations,
 * counts, customer names or certifications; its only numerals are service
 * indices and standard designations. That absence is itself the constraint.
 * In particular the engagement table's column is headed "Typical duration and
 * outcome" (L421) and not one of its five rows states a duration — so nothing
 * downstream may render a time axis, bar length or schedule.
 */
import type { Bilingual } from "@/i18n/bilingual";

/**
 * A string that is the same in both languages for now.
 *
 * `nl` is a same-as-English placeholder pending translation, NOT a claim the
 * text is correct Dutch. Defined locally rather than imported from
 * `../industries/registry` so this page does not depend on the industries
 * domain for a helper that is not industry-specific — the same call
 * `assurance/ts-50701/content.ts` makes.
 */
export function same(en: string): Bilingual {
  return { en, nl: en };
}

/**
 * Section ids, which are also the on-page anchor targets.
 *
 * DOM identity, not copy — never derive one from array position, and never
 * translate one. The order is the spec's own running order.
 */
export const ANCHORS = [
  "how-we-work",
  "method",
  "twin",
  "services",
  "assessments",
  "programmes",
  "architecture",
  "remote-access",
  "baseline",
  "capability-transfer",
  "engagement-models",
  "iec-62443",
  "commitments",
] as const;

export type Anchor = (typeof ANCHORS)[number];
