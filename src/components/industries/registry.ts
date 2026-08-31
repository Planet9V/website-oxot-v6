/**
 * THE SIX INDUSTRIES, in one place — the single source every page (the
 * /industries index, each vertical page, and the industry cards already
 * shipped on /home2 and /cdt-2's WHERE_WE_WORK section) can import from
 * instead of re-typing the same six slugs and names with the risk of one
 * drifting out of sync with the others.
 *
 * CRITICAL INFRASTRUCTURE EXCLUDED, deliberately — new_material_source/
 * 1_website_layout_v4/3_industries/industry_critical_infra.md is an empty
 * file, and Critical Infrastructure is absent from every nav list and every
 * cross-reference in the source material except one orientation-doc table.
 * Confirmed dropped, not a gap to fill.
 */

import type { Bilingual } from "@/i18n/bilingual";

/**
 * BOTH LOCALES RENDER, NL NOT YET TRANSLATED (owner decision, 2026-08-22).
 * Every industry page's content is `Bilingual`-typed so the architecture
 * supports Dutch from day one — no `locale !== "en"` gate, unlike
 * /assurance and /technical-specification — but the actual translation work
 * is deliberately deferred until English is finished across every page.
 * `same()` marks a string as "not yet translated" rather than "translated
 * to itself" — the `nl` value is a placeholder, not a claim that this text
 * is correct Dutch. Grep `same(` when the real translation pass starts.
 */
export function same(en: string): Bilingual {
  return { en, nl: en };
}

export interface IndustrySummary {
  slug: string;
  /**
   * The version of this sector's page that is actually published.
   *
   * `slug` is the sector's identity and never changes; `liveSlug` moves when a
   * rebuild ships. They diverged silently: `nav.ts` sends readers to the `-2` /
   * `-3` builds while this index still pointed at the original `slug`, so the
   * menu and the index led to different pages for the same sector. Anything
   * linking out must use `liveSlug`.
   */
  liveSlug: string;
  name: Bilingual;
  /** One-line card summary, for the /industries index and any card grid
   *  that links out to these pages. */
  summary: Bilingual;
}

export const INDUSTRIES: readonly IndustrySummary[] = [
  {
    slug: "energy-utilities",
    liveSlug: "energy-utilities-2",
    name: same("Energy & Utilities"),
    summary: same("Generation, grid and fuels, where minimum operating requirements are a licence condition rather than a preference.")
  },
  {
    slug: "water-wastewater",
    liveSlug: "water-wastewater-3",
    name: same("Water & Wastewater"),
    summary: same("Treatment and distribution, where the safety function protecting a dosing set point is the last line before the public.")
  },
  {
    slug: "rail-transportation",
    liveSlug: "rail-transportation-2",
    name: same("Rail & Transportation"),
    summary: same("Rail, ports and logistics, where TS 50701 sits alongside IEC 62443 and an outage propagates down the chain.")
  },
  {
    slug: "manufacturing-process",
    liveSlug: "manufacturing-process-2",
    name: same("Manufacturing & Process"),
    summary: same("Discrete and process lines where an unplanned stop is measured in shifts, and a quality excursion in recalls.")
  },
  {
    slug: "hyperscale-data-centers",
    liveSlug: "hyperscale-data-centers-2",
    name: same("Hyperscale & Data Centers"),
    summary: same("Cooling, power and physical-security systems where uptime is the product itself, and a control-plane compromise is a headline before it is a ticket.")
  },
  {
    slug: "defense-government",
    liveSlug: "defense-government-2",
    name: same("Defense & Government"),
    summary: same("Programmes where a supply-chain or product-security gap is a sovereignty question, not only an operational one, and evidence has to survive an adversarial audit.")
  }
] as const;
