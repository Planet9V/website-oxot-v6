/**
 * WATER & WASTEWATER — ITERATION 3. Page metadata and section headings ONLY.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * in the oxot_website_public_sept repo; `L<n>` below is a line number there.
 * Every heading on this page is the brief's own headline, transcribed. The one
 * exception is flagged at `ASSET_CLASSES` and nowhere else.
 *
 * THIS FILE DELIBERATELY HOLDS NO SECTION BODY. Wave 0 owns the page's skeleton
 * and its shared data (`content.assets.ts`, `content.scenario.ts`); the tables,
 * prose and diagrams of each section are later waves' work and belong in their
 * own `content.<section>.ts` files beside their components. A heading and its
 * lead are the contract between the two — fixing them now is what lets later
 * waves build in parallel without agreeing on wording first.
 *
 * `Bilingual` via `same()`, per registry.ts: both locales render and `nl` is a
 * marked placeholder pending translation, not a claim of correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* L387-390 — the brief's own SEO title and meta description, verbatim. */
export const META = {
  title: "Water & Wastewater OT Cybersecurity Digital Twin",
  description:
    "Protect drinking water, wastewater treatment, and remote field assets. OXOT's Cyber Digital Twin connects process controls, SCADA pathways, cyber risk, and public-health or environmental consequences."
};

/**
 * INTERNAL LINKS, RESOLVED AGAINST THE REAL `PATHS` — not against the brief.
 * The brief's suggested-links list (L397-403) was written before the site tree
 * settled and FIVE of its eight entries point at URLs that do not exist. Each
 * is corrected here once, by importing the real constant so a future rename
 * breaks the build rather than the page:
 *   L397 /platform/cyber-digital-twin          → PATHS.cdt2
 *   L399 /platform/decisions/fix-first         → PATHS.decisionFixFirst
 *   L400 /platform/decisions/change-safely     → PATHS.decisionChangeSafely
 *   L401 /platform/deployment-data-sovereignty → PATHS.deploymentSovereignty
 *   L403 /resources/technical-specification    → PATHS.technicalSpecification
 * L402 `/assurance/nis2` HAS NO PAGE AT ALL — the assurance split of
 * 2026-08-23 produced IEC 62443, CRA, TS 50701, IEC 62278-2 and evidence
 * provenance, and no NIS2 page among them. The NIS2 row in the regulatory
 * table therefore links to the `/assurance` index, which does cover it.
 * Do not link `/assurance/nis2`; it would 404.
 */
export const LINKS: { label: Bilingual; href: string }[] = [
  { label: same("Cyber Digital Twin"), href: PATHS.cdt2 },
  { label: same("What do we fix first?"), href: PATHS.decisionFixFirst },
  { label: same("Can we change safely?"), href: PATHS.decisionChangeSafely },
  { label: same("Deployment and data sovereignty"), href: PATHS.deploymentSovereignty },
  { label: same("IEC 62443"), href: PATHS.assuranceIec62443 },
  { label: same("Assurance"), href: PATHS.assurance },
  { label: same("Technical Specification"), href: PATHS.technicalSpecification },
  { label: same("Contact"), href: PATHS.contact }
];

/* ── S00 · Hero — L30-37, L393 ───────────────────────────────────────────── */

export const HERO = {
  eyebrow: same("Water & Wastewater"),
  /* L30 and L393 (the brief states the same sentence as hero copy and as H1). */
  h1: same(
    "Protect safe water and sanitation—before a cyber incident becomes a public-health event."
  ),
  /* L32, verbatim. */
  lead: same(
    "OXOT's Cyber Digital Twin connects treatment processes, field automation, SCADA pathways, and operational consequences. Test a change, prioritize the risks that can affect water quality or environmental compliance, and improve resilience without touching the live process."
  ),
  /* L36-37 */
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("See how the Twin works"),
  /* L26 — the brief's secondary conversion, carried on the hero. */
  note: same("Bring one P&ID, process-flow diagram, or SCADA asset list.")
};

/* ── S01 · Sector reality — L71 ──────────────────────────────────────────── */

export const SECTOR_REALITY = {
  datum: same("Sector reality"),
  h2: same(
    "A cyber incident can affect the quality of water, the environment, and the community—at the same time."
  )
};

/* ── S02 · Architecture — L100-102 ───────────────────────────────────────── */

export const ARCHITECTURE = {
  datum: same("Architecture"),
  h2: same("Model the treatment process and the remote field estate together."),
  /* L102 — this sentence is also the section's build instruction: two
     selectable diagrams sharing a SCADA layer. The drinking-water /
     wastewater selector and the four-view switcher both live here, NOT on the
     hero, which holds one strict path. */
  intro: same(
    "Two selectable diagrams, Drinking Water and Wastewater. They share common SCADA layers but use different physical processes, consequences, assets, and decision language."
  )
};

/* ── S03 · Asset classes ─────────────────────────────────────────────────── */

export const ASSET_CLASSES = {
  datum: same("Asset classes"),
  /* THE ONE HEADING ON THIS PAGE THE BRIEF DOES NOT WRITE. The brief has no
     asset-class section; this section exists because the ratified page plan
     places the Pattern 3 bento here and `content.assets.ts` passed its
     9-of-9 falsification check. The heading is therefore derived from two
     REAL sources rather than invented as marketing copy: the nine-value
     `SystemAssetType` union in src/components/twin/types.ts, and L161's
     statement of what the Twin combines. It makes no claim the brief does
     not support. Flagged so a reviewer can hold it to a different standard
     than the transcribed headings above and below. */
  h2: same("Nine asset classes, and what a compromise of each one costs the process."),
  /* L161, verbatim. */
  intro: same(
    "The OXOT Twin can combine P&IDs, process and equipment data, PLC/SCADA/RTU/HMI configurations, network topology, passive traffic evidence, industrial protocol information, and operational safety/reliability inputs."
  )
};

/* ── S04 · Technology index — L149 ───────────────────────────────────────── */

export const TECHNOLOGY_INDEX = {
  datum: same("Technology index"),
  /* L149 is a sub-heading under the architecture section in the brief; it
     becomes its own section here because its eight-row table (L150-159) is a
     different content shape from the two process diagrams above it. */
  h2: same("Common OT, telemetry, and process technologies.")
};

/* ── S05 · Risk scenarios — L167-169 ─────────────────────────────────────── */

export const SCENARIOS = {
  datum: same("Risk scenarios"),
  h2: same("Trace a cyber route to a water-quality, flooding, or permit consequence."),
  /* L169, verbatim — and a real constraint on what this section may contain. */
  intro: same(
    "Unlike the manufacturing page, do not use generic “production outage” examples. These scenarios are tied to water chemistry, hydraulics, treatment barriers, and environmental compliance."
  )
};

/* ── S06 · Four decisions — L190 ─────────────────────────────────────────── */

export const DECISIONS = {
  datum: same("Four decisions"),
  h2: same("Four decisions that protect treatment, distribution, and environmental compliance.")
};

/* ── S07 · Worked example — L205 ─────────────────────────────────────────── */

export const WORKED_EXAMPLE = {
  datum: same("Worked example"),
  h2: same("Worked example: secure chemical-dosing control without compromising water quality.")
  /* No `intro`: the scenario, its chain, its evidence and its five controls all
     come from `content.scenario.ts`, which is the single record the hero also
     renders. Writing a lead here would be a second, unsourced description of
     the same story. */
};

/* ── S08 · Capabilities — L276 ───────────────────────────────────────────── */

export const CAPABILITIES = {
  datum: same("Capabilities"),
  h2: same("One model spanning source, treatment, field assets, and recovery."),
  figureAlt: same(
    "The OXOT Cyber Digital Twin's seven-layer architecture, from Layer 1 facility physics up through Layer 7 governance, with DEXPI 2.0, P&ID and CycloneDX feeding equipment and network topology into the model and continuous synchronization and data flow running through every layer to a unified digital twin bill of materials."
  )
};

/* ── S09 · Regulatory — L293-295 ─────────────────────────────────────────── */

export const REGULATORY = {
  datum: same("Regulatory context"),
  h2: same(
    "Support safe-water and environmental-resilience evidence from the same operating model."
  )
  /* No `intro` here — L295's claim boundary ("do not promise automatic
     compliance") is the brief's instruction TO THE BUILDER, not page copy.
     Regulatory.tsx writes the real claim boundary in the site's own voice in
     `content.regulatory.ts` instead; see that component's docblock. Removed
     at Wave 3 integration once confirmed to have zero callers (`grep` — only
     `.datum`/`.h2` are read anywhere in this route). */
};

/* ── S10 · Engagement — L319 ─────────────────────────────────────────────── */

export const ENGAGEMENT = {
  datum: same("Engagement"),
  h2: same("Start with one treatment process or one remote field system.")
};

/* ── S11 · Final CTA and intake — L330-335 ───────────────────────────────── */

export const FINAL_CTA = {
  datum: same("Start here"),
  h2: same("Start with one plant, one pump station, or one treatment decision."),
  /* L332, verbatim. */
  intro: same(
    "Bring a process-flow diagram, P&ID, SCADA asset list, or a proposed remote-access or network change. OXOT will show how a Cyber Digital Twin can trace the path to the treatment or environmental consequence—before the live system is changed."
  ),
  /* L334-335 */
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
