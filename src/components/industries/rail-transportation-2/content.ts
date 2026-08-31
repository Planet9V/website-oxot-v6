/**
 * RAIL & TRANSPORTATION — ITERATION 2 (`/industries/rail-transportation-2`).
 *
 * A fresh, parallel build standing beside `/industries/rail-transportation`
 * (live). NOTHING in this folder imports from that folder, and it was neither
 * read nor referenced while this file was written — every string here is
 * transcribed from the brief, not carried across from the shipped page.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md. Every value below carries the source line
 * number it came from. Nothing is invented. Where the source is silent on
 * something this file would otherwise have to guess, there is a comment saying
 * so instead of a filled-in guess.
 *
 * THIS FILE IS THE SHARED/TOP-LEVEL SLICE ONLY — meta, the hero, the two rail
 * segments, and the verified page-level link map. Sector reality, the two OT
 * architectures, the asset tables, both scenario libraries, the four decisions,
 * both worked examples, capabilities, regulatory context and engagement live in
 * sibling `content.<section>.ts` files, split along section boundaries because
 * this repository caps a file at 500 lines.
 *
 * THIS PAGE IS DUAL-TRACK, WHICH IS THE BRIEF'S CENTRAL STRUCTURAL DEMAND.
 * Source L3 opens by insisting passenger transit and US freight rail "should
 * not read as one generic 'transport' offering", and L169 goes further: freight
 * "should appear as a dedicated subpage or major tab, not a paragraph under
 * passenger rail." `SEGMENTS` below is therefore a single shared array rather
 * than two hard-coded toggles — S00's hero model switch (L59–72) and S03's
 * architecture switch (L115–136 vs L173–194) are the SAME two-way selector
 * rendered twice, so they must not be able to drift apart.
 *
 * CLAIM RULE IN FORCE: OXOT_Visual_Foundation_Spec.md L401 — no percentages,
 * money values, annual-loss figures or "verified" language without approved
 * inputs. Nothing in this slice carries a numeric figure. Source L369's own
 * standing instruction is stricter still and applies to the whole page: do not
 * state that the Twin automatically certifies a railway or guarantees
 * regulatory compliance.
 *
 * `Bilingual`-typed throughout via `same()` (../registry). Both locales render;
 * `nl` is a same-as-English placeholder pending translation, not a claim that
 * this text is correct Dutch. See registry.ts's own doc comment.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Meta ───────────────────────────────────────────────────────────────── */

export const META = {
  /** Source L462. */
  title:
    "Rail & Transit Cybersecurity Digital Twin | Passenger and Freight Rail",
  /** Source L465. */
  description:
    "Test rail cybersecurity changes before they affect live operations. OXOT's Cyber Digital Twin connects signaling, PTC, dispatch, SCADA, OT networks, safety context, and passenger or freight-service consequences.",
  /** Source L468. Identical to the hero H1 at L34, as the brief intends. */
  h1: "Secure the railway without compromising safety or service.",
  /* The brief's own URL at L13 is `/industries/rail-transportation`, which is
     the LIVE page's route. This is iteration 2 and therefore takes the `-2`
     route; the `-2` suffix is the only departure from the brief's stated URL. */
  route: "/industries/rail-transportation-2"
};

/* ── Segments · shared by S00's hero toggle and S03's architecture toggle ── */

/**
 * The two rail segments the whole page is split along.
 *
 * `label` is the brief's own toggle wording (L62), which is what the selector
 * control shows. `tableLabel` is the longer form the brief uses for column
 * headers and comparison rows (L96) — "US freight rail", not just "Freight
 * Rail" — kept distinct because the toggle and the comparison table are not the
 * same surface and the brief words them differently.
 *
 * `id` is DOM identity, not copy. Anything wiring `aria-controls`, a URL hash,
 * or a persisted selection must key off `id` and never off array position.
 */
export const SEGMENTS = [
  {
    id: "passenger",
    /** Source L62, left half of the brief's toggle. */
    label: same("Passenger Transit"),
    /** Source L96, the comparison table's own column header. */
    tableLabel: same("Passenger rail / transit"),
    /* Source L68–70. The brief prints these as one slash-separated run; they
       are split on its own separators into the list they already are.
       Per L65 the MODEL changes when a segment is chosen, not merely the text —
       so these are the hero visual's actual contents for this segment, not a
       caption about it. */
    heroModel: [
      same("CBTC / ETCS"),
      same("Interlocking"),
      same("Station systems"),
      same("Traction power"),
      same("Passenger information")
    ]
  },
  {
    id: "freight",
    /** Source L62, right half of the brief's toggle. */
    label: same("Freight Rail"),
    /** Source L96, the comparison table's own column header. */
    tableLabel: same("US freight rail"),
    /** Source L71–72, split on the brief's own separators, same as above. */
    heroModel: [
      same("PTC"),
      same("Dispatch"),
      same("Wayside interface units"),
      same("Grade crossings"),
      same("Locomotive systems"),
      same("Yards"),
      same("Fuel and power")
    ]
  }
];

/** The default segment on first paint. */
export const DEFAULT_SEGMENT = "passenger";
/* WHY `passenger`: the brief itself orders the page passenger-first — the
   toggle prints Passenger Transit on the left (L62), the segment sections run
   passenger (L105) then freight (L163), and the worked example the brief
   develops in full is the passenger one (L241–308), with freight given as the
   parallel track (L310). This is an ordering the source states; it is not a
   judgement that passenger rail matters more. */

/* ── S00 · Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  /** Source L3, the brief's own bolded name for this vertical. */
  eyebrow: same("Rail & Transportation"),
  /** Source L34. */
  h1: same("Secure the railway without compromising safety or service."),
  /** Source L36. */
  lead: same(
    "OXOT's Cyber Digital Twin links railway operations, signaling and train-control systems, OT and communications pathways, and service consequences—so you can test changes and prioritize cyber risk before they reach the live railway."
  ),
  /** Source L40 → the real `/contact` route (brief's suggested link, L480). */
  ctaPrimary: same("Discuss a rail scenario"),
  ctaPrimaryHref: PATHS.contact,
  /** Source L41 → `/platform/cyber-digital-twin` (L472) maps to PATHS.cdt2. */
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  ctaSecondaryHref: PATHS.cdt2,
  /* The brief's stated SECONDARY CONVERSION, source L30 — a page-level ask, not
     a button. Carried here so the hero can state it beside the two CTAs. */
  note: same(
    "Bring one interlocking diagram, signaling architecture, PTC map, or asset list."
  ),

  /* THE FIVE-STAGE CONSEQUENCE CASCADE, source L48–56, verbatim.
     FIVE LEVELS, NOT FOUR. The brief is explicit at L45 that this must be "a
     railway operating model, not a generic factory network", and its chain runs
     one level deeper than the four-stage physical/control/pathway/consequence
     cascade other industry briefs use: rail separates the SERVICE being moved
     (L48) from the AUTHORITY to move it (L50) before reaching control systems.
     Collapsing those two would erase the distinction the whole page rests on —
     that an unavailable train-control system fails safe by withholding movement
     authority (L81) rather than by permitting unsafe movement.
     NO `view` LABEL IS INVENTED for these stages: unlike some briefs, this one
     prints the cascade WITHOUT a parallel set of view names, so each stage
     carries only the text the source gives it. */
  cascade: [
    /** Source L48. */
    same("Passengers / freight movement"),
    /** Source L50. */
    same("Train movement authority / dispatch / route setting"),
    /** Source L52. */
    same("Signaling, interlocking, train control, SCADA, power, telecoms"),
    /** Source L54. */
    same("Wayside assets, rolling stock, depots, crossings, field equipment"),
    /** Source L56. */
    same("Cyber pathway → operational or safety consequence")
  ],

  /* Source L65 — the brief's stated REQUIREMENT for the toggle, which is what
     stops the segment switch reading as a tab that swaps a paragraph.
     Transcribed as the instruction it is; the renderer must actually honour it
     by re-rendering the model from `SEGMENTS[n].heroModel`, not by cross-fading
     one static graphic. */
  segmentToggleNote: same(
    "When users choose a rail segment, the model changes rather than merely swapping text."
  )

  /* GAP, FLAGGED NOT FILLED: the brief says the toggle must be "obvious" (L59)
     but specifies no control affordance for it — no wording for the group's
     accessible name, and no statement of whether the choice persists into the
     page's later architecture toggle (L115 vs L173) or is set independently in
     each place. Neither is invented here. The `SegmentSelector` owner decides
     shared-vs-independent state; this file only guarantees both surfaces read
     the same two segments from `SEGMENTS`. */
};

/* ── Page-level conversions ─────────────────────────────────────────────── */

export const CONVERSIONS = {
  /** Source L26, the brief's stated PRIMARY conversion for the whole page. */
  primary: same("Discuss a railway system or operational-change scenario"),
  primaryHref: PATHS.contact,
  /** Source L30, the brief's stated SECONDARY conversion. Not a route — it is
   *  an ask about what the visitor should bring to that conversation. */
  secondary: same(
    "Bring one interlocking diagram, signaling architecture, PTC map, or asset list"
  )
};

/* ── Internal-link map ──────────────────────────────────────────────────── */

/**
 * The brief's suggested internal links (L470–480), each resolved against a real
 * key in src/components/shell/nav.ts. THE BRIEF'S RAW PATHS ARE NOT THIS SITE'S
 * ROUTES — it writes `/platform/decisions/fix-first` where the live route is
 * `/decisions/fix-first`, `/platform/deployment-data-sovereignty` where the
 * live route is `/deployment-sovereignty`, and
 * `/resources/technical-specification` where the live route is
 * `/technical-specification`. Every entry below was checked against nav.ts
 * rather than transcribed from the brief; consumers must link through these
 * constants and never through the brief's literal strings.
 *
 * ONE SUGGESTED LINK HAS NO REAL DESTINATION AND IS DELIBERATELY ABSENT:
 * the brief lists `/assurance/nis2` (L478), but nav.ts has no NIS2 key — the
 * assurance area covers IEC 62443, the Cyber Resilience Act, TS 50701,
 * IEC 62278-2 and Evidence & Data Provenance, and nothing else. NIS2 is still
 * discussed in this page's regulatory copy (L375), it simply has no page to
 * point at. No substitute target is invented and no dead href is emitted;
 * whoever builds the regulatory section should render that row unlinked.
 */
export const LINKS = {
  /** Brief L472 `/platform/cyber-digital-twin`. */
  cyberDigitalTwin: PATHS.cdt2,
  /** Brief L473 `/platform/decisions/fix-first`. */
  fixFirst: PATHS.decisionFixFirst,
  /** Brief L474 `/platform/decisions/change-safely`. */
  changeSafely: PATHS.decisionChangeSafely,
  /** Brief L475 `/platform/deployment-data-sovereignty`. */
  deploymentSovereignty: PATHS.deploymentSovereignty,
  /** Brief L476 `/assurance/iec-62443`. */
  iec62443: PATHS.assuranceIec62443,
  /** Brief L477 `/assurance/ts-50701` — the brief's single most rail-specific
   *  framework reference (L373, L382). */
  ts50701: PATHS.assuranceTs50701,
  /** Brief L479 `/resources/technical-specification`. */
  technicalSpecification: PATHS.technicalSpecification,
  /** Brief L480 `/contact`. */
  contact: PATHS.contact,

  /* NOT IN THE BRIEF'S LIST, ADDED FOR A STATED REASON: the brief's own "Four
     rail decisions" section (L232–237) develops all four decisions in full, but
     its link list names only two of them. The other two are real, live routes
     verified in nav.ts (L130, L132), so all four can link out rather than two
     of four dead-ending for no reason the source gives. Linking is a routing
     decision; no decision's COPY comes from anywhere but the source row it
     belongs to, and that copy lives in content.decisions.ts, not here. */
  investment: PATHS.decisionInvestment,
  riskAcceptance: PATHS.decisionRiskAcceptance
};

/**
 * `/technical-specification` IS ENGLISH-ONLY on this site. Every other page
 * linking to it gates the link on locale — the established pattern is
 * `locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2`. Any section of
 * this page linking to it must apply that gate rather than ship an `nl` link
 * into an EN-only page. This flag states the requirement in data so each
 * section owner does not have to rediscover it.
 */
export const TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY = true;
