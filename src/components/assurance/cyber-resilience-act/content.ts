/**
 * CYBER RESILIENCE ACT — copy for /assurance/cyber-resilience-act.
 *
 * Transcribed and restructured from new_material_source/1_website_layout_v4/
 * 4_assurance/assurance_cra.md and assurance_cra_support_cdt_docs.md. This is
 * a fresh page written from those specs, not a revival of the CRA product
 * line that was de-published on 2026-08-21.
 *
 * EVERY DATED CLAIM COMES FROM docs/reference/CRA-DATES.md, which is this
 * repo's single source for CRA dates. Nothing here is recalled or re-derived.
 * Two places where the source spec is WRONG and this file follows CRA-DATES.md
 * instead:
 *
 *  1. The spec's "reporting timeline callout" presents Article 14 as one
 *     sequence — 24h, 72h, 14 days. Article 14 carries TWO tracks and FOUR
 *     notifications, and the two final-report clocks do not even start from
 *     the same kind of event. See REPORTING below. `scripts/content-guards.mjs`
 *     fails any sentence that lists the first three clocks without the fourth.
 *  2. The spec says main obligations "apply from 11 December 2027" without
 *     distinguishing Chapter IV, the standards targets, or the notified-body
 *     sufficiency clause. The calendar below names all of them.
 *
 * Article 14 applies from 11 September 2026, which is still ahead. Nothing
 * here may describe it as already in force — guard 2 of content-guards.mjs,
 * and the reason it exists.
 *
 * `Bilingual`-typed via `same()`: both locales render, `nl` is a
 * same-as-English placeholder pending translation, not a claim of correct
 * Dutch. Same convention as the industry pages. `same()` is local rather
 * than imported from `components/industries/registry` — an assurance page
 * reaching into the industries directory is a worse artefact than three
 * duplicated lines.
 *
 * THIS FILE IS THE REGULATION HALF: the masthead, plus sections 01–03 —
 * scope, the date calendar, and Article 14. Sections 04–12, everything
 * about what OXOT models and produces, live in `content-model.ts`; the two
 * were split only for size (CLAUDE.md keeps files under 500 lines), on the
 * page's own seam. Same precedent as cdt2/content-1.ts and content-2.ts.
 */
import type { Bilingual } from "@/i18n/bilingual";

/** Marks a string as NOT YET TRANSLATED rather than translated to itself.
 *  Exported so `content-model.ts` shares one definition — grep `same(` when
 *  the real translation pass starts and it must find every string. */
export const same = (en: string): Bilingual => ({ en, nl: en });

export const META = {
  title: "Cyber Resilience Act Product Security Evidence & Technical Documentation",
  description:
    "Build CRA-oriented product-security evidence from the product you actually ship. OXOT's Cyber Digital Twin connects SBOM, HBOM, CBOM, SaaS-BOM and Ops-BOM views, vulnerabilities, suppliers and technical-documentation workflows."
};

export const MASTHEAD = {
  kicker: same("Assurance"),
  regulation: same("Regulation (EU) 2024/2847"),
  h1: same("Build CRA evidence from the product you actually ship."),
  standfirst: same(
    "The Cyber Resilience Act requires manufacturers of covered products with digital elements to address cybersecurity across the product lifecycle: planning and design, vulnerability handling, security updates, technical documentation, and post-market activity."
  ),
  standfirstTwo: same(
    "OXOT's Cyber Digital Twin connects the product, its software, hardware, interfaces, certificates, suppliers, support workflows, deployment pathways and vulnerability context in one traceable model — so the evidence behind a technical file is assembled from the product rather than reconstructed from memory."
  ),
  /* The hero chain from the source spec, rendered as a real trace rather
     than the spec's ASCII block. */
  chain: [
    same("Product boundary"),
    same("Components and dependencies"),
    same("Cybersecurity risk and exploitability"),
    same("Secure design and vulnerability handling"),
    same("Technical documentation and lifecycle evidence")
  ],
  ctaPrimary: same("Discuss CRA product evidence"),
  ctaSecondary: same("Explore the Cyber Digital Twin")
};

export interface ContentsEntry {
  id: string;
  n: string;
  label: Bilingual;
}

export const CONTENTS: readonly ContentsEntry[] = [
  { id: "scope", n: "01", label: same("What the CRA applies to") },
  { id: "calendar", n: "02", label: same("The dates, and what each one governs") },
  { id: "reporting", n: "03", label: same("Article 14: two tracks, four notifications") },
  { id: "evidence-gap", n: "04", label: same("Where product evidence actually lives") },
  { id: "bom-views", n: "05", label: same("Five bills of materials") },
  { id: "product-boundary", n: "06", label: same("The product boundary") },
  { id: "by-design", n: "07", label: same("Security by design and by default") },
  { id: "vulnerability", n: "08", label: same("Vulnerability handling") },
  { id: "technical-file", n: "09", label: same("Technical documentation") },
  { id: "support-period", n: "10", label: same("Support period and retention") },
  { id: "supply-chain", n: "11", label: same("Supply chain, lifecycle and change") },
  { id: "limits", n: "12", label: same("What OXOT does not do") }
];

/* ── 01 · Scope ─────────────────────────────────────────────────────────── */

export const SCOPE = {
  title: same("The CRA applies to products placed on the market — not to organisations that merely operate technology."),
  dek: same(
    "This is the distinction that decides whether the rest of this page is relevant to you. The Regulation concerns covered products with digital elements made available on the EU market. Its main obligations fall on manufacturers, with specific obligations also reaching importers and distributors in defined circumstances."
  ),
  notHead: same("Being subject to the CRA does not follow from operating"),
  notItems: [
    same("A factory, utility, water-treatment plant, railway, port or data centre."),
    same("An OT network or industrial control system."),
    same("A government or defence facility."),
    same("A software platform or internal tool not placed on the EU market as a product with digital elements.")
  ],
  yesHead: same("CRA obligations can become relevant when an organisation"),
  yesItems: [
    same("Manufactures a controller, sensor, gateway, network appliance, HMI, SCADA component, safety-related product, IoT device, embedded system or software product."),
    same("Develops and sells a digital platform, component, library, firmware package, appliance or connected service falling within scope."),
    same("Integrates or substantially modifies a product and places it on the EU market under its own name or trademark."),
    same("Imports or distributes a covered product."),
    same("Supplies digital elements into a product ecosystem where the manufacturer needs component, vulnerability or technical-documentation evidence.")
  ],
  boundary: same(
    "OXOT supports product-security evidence and technical-documentation workflows. It does not determine legal scope, product classification, exemption status, conformity route or regulatory responsibility."
  ),
  boundaryTail: same(
    "Those questions are resolved by the manufacturer and, where necessary, by qualified legal, regulatory, conformity-assessment and notified-body advisers."
  )
};

/* ── 02 · Calendar ──────────────────────────────────────────────────────── */

export interface CalendarEntry {
  /** ISO date. Past/future state is derived at render, never hard-coded —
   *  a hard-coded "five weeks out" goes stale silently. */
  iso: string;
  ref: Bilingual;
  what: Bilingual;
  detail: Bilingual;
  /** Milestones the Regulation frames as a target rather than an obligation
   *  are drawn differently on the timeline and said so in the table. */
  target?: boolean;
}

export const CALENDAR: {
  title: Bilingual;
  dek: Bilingual;
  entries: readonly CalendarEntry[];
  which: { head: Bilingual; rows: readonly (readonly Bilingual[])[] };
  source: Bilingual;
} = {
  title: same("There is no single CRA deadline. There are several, and they govern different obligations."),
  dek: same(
    "Naming the wrong one is not urgent, it is imprecise — and this is an audience that notices imprecision faster than it notices urgency. The dates below are compiled from Articles 69 and 71 and the Commission's own summary of the legislative text."
  ),
  entries: [
    {
      iso: "2024-12-10",
      ref: same("Art 71"),
      what: same("Regulation enters into force"),
      detail: same("No obligations bite on this date. It starts the clocks that follow.")
    },
    {
      iso: "2026-06-11",
      ref: same("Ch. IV, Arts 35–51"),
      what: same("Notification of conformity assessment bodies applies"),
      detail: same("Member States designate notifying authorities; conformity assessment bodies may be notified and listed in NANDO.")
    },
    {
      iso: "2026-08-30",
      ref: same("Standards"),
      what: same("Target for the horizontal Type A and vulnerability-management Type B standards"),
      detail: same("A target for standardisation deliverables, not an obligation falling on manufacturers."),
      target: true
    },
    {
      iso: "2026-09-11",
      ref: same("Art 14"),
      what: same("Reporting applies"),
      detail: same("Actively exploited vulnerabilities and severe incidents, to ENISA and the national CSIRT via the Single Reporting Platform. Two tracks, four notifications — see section 03."),
    },
    {
      iso: "2026-10-30",
      ref: same("Standards"),
      what: same("Target for Type C standards"),
      detail: same("Individual product categories. Again a standardisation target, not a manufacturer obligation."),
      target: true
    },
    {
      iso: "2026-12-11",
      ref: same("Notified bodies"),
      what: same("Notified-body sufficiency"),
      detail: same("Member States shall strive to ensure a sufficient number of notified bodies, in the Regulation's own words, in order to avoid bottlenecks and hindrances to market entry."),
      target: true
    },
    {
      iso: "2027-12-11",
      ref: same("Art 71"),
      what: same("Full application"),
      detail: same("CE marking, Annex I essential requirements, Annex VII technical documentation, Annex V declaration of conformity, conformity assessment.")
    }
  ],
  which: {
    head: same("Which date to anchor to"),
    rows: [
      [same("CE marking, technical file, conformity assessment, effort and timeline planning"), same("11 December 2027")],
      [same("Reporting, PSIRT process, products already shipped"), same("11 September 2026")],
      [same("Notified-body availability, queue and capacity"), same("11 June 2026 for the rules; 11 December 2026 for the sufficiency clause")],
      [same("Standards availability"), same("30 August and 30 October 2026")]
    ]
  },
  source: same(
    "Compiled in this repository from Articles 69 and 71 and the Commission's summary of the legislative text. Every dated claim here carries a re-check interval; the standards dates and the notified-body register are the two most likely to move."
  )
};

/* ── 03 · Article 14 ────────────────────────────────────────────────────── */

export const REPORTING = {
  title: same("Article 14 is two tracks and four notifications, and the final-report clocks start from different events."),
  dek: same(
    "This is the part that is easiest to state wrongly, and stating it wrongly in front of a PSIRT lead is expensive. An actively exploited vulnerability and a severe incident are separate triggers with separate final reports."
  ),
  /* TRANSPOSED DELIBERATELY — stages down the rows, the two tracks across
     the columns. Two reasons, and the second is not cosmetic:

     1. The comparison a reader actually needs is stage-by-stage. Two stacked
        per-track panels make them scroll back and forth to find the one row
        that differs.
     2. `scripts/content-guards.mjs` reads rendered innerText and fails any
        SENTENCE naming the 24h/72h/14-day clocks without the fourth
        notification. Transposed, the 14-day cell and the one-month cell sit
        adjacent in the same row, so the four notifications are never
        separated by a full stop. Per-track panels would put a
        sentence-ending clock note between them and fire the guard — which
        would be the guard doing its job, because a reader skimming the
        first panel would have taken away three clocks and one track. */
  tableHead: [
    same("Stage"),
    same("Art 14(2) — actively exploited vulnerability"),
    same("Art 14(4) — severe incident")
  ],
  rows: [
    [
      same("Trigger"),
      same("An actively exploited vulnerability contained in the product"),
      same("A severe incident affecting the security of the product")
    ],
    [same("Early warning"), same("Within 24 hours of becoming aware"), same("Within 24 hours of becoming aware")],
    [same("Notification"), same("Within 72 hours of becoming aware"), same("Within 72 hours of becoming aware")],
    [
      same("Final report"),
      same("No later than 14 days after a corrective or mitigating measure is available"),
      same("Within one month after the incident notification was submitted")
    ],
    [
      same("What starts the final clock"),
      same("A fix becoming available — an event the manufacturer partly controls, and which may fall months after awareness"),
      same("Your own 72-hour filing, not the moment of awareness")
    ]
  ],
  tableCaption: same(
    "Both tracks report to ENISA and the national CSIRT through the Single Reporting Platform. The first two clocks run from awareness in both tracks; neither final-report clock does."
  ),
  trap: same(
    "Any description that presents these as one countdown from a single starting gun is wrong twice over: it drops the severe-incident track, and it misstates what starts the third clock."
  ),
  grandfather: same(
    "Products placed on the market before 11 December 2027 are exempt from most CRA requirements unless they undergo a substantial modification after that date, and the grandfathering applies per unit rather than per product line. The derogation is the part that matters here: Article 14 reaches all in-scope products placed on the market before that date. Reporting is not grandfathered."
  ),
  support: same(
    "What a manufacturer needs at hour one is not a severity score. It is the answer to which shipped versions contain the affected component, which of them expose it through a reachable interface, and which customer function sits behind it. Those are model questions, and they are what the rest of this page is about."
  )
};

