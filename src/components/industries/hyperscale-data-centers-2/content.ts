/**
 * HYPERSCALE & DATA CENTERS — ITERATION 2
 * (`/industries/hyperscale-data-centers-2`).
 *
 * A fresh, parallel build standing beside `/industries/hyperscale-data-centers`
 * (live). NOTHING in this folder imports from that folder, and it was neither
 * read nor referenced while this file was written — every string here is
 * transcribed from the brief, not carried across from the shipped page.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md. Every value below carries the source line number it
 * came from. Nothing is invented. Where the source is silent on something this
 * file would otherwise have to guess, there is a comment saying so instead of a
 * filled-in guess.
 *
 * THIS FILE IS THE SHARED/TOP-LEVEL SLICE ONLY — meta, the hero, the page-level
 * conversions, the interactive model section, and the verified page-level link
 * map. Sector reality, the facility architecture, the technology index, the
 * asset classes, the dependency map, the scenario register, the four decisions,
 * the worked example, the case-study programme, capabilities, regulatory context,
 * engagement and the closing intake live in sibling `content.<section>.ts` files,
 * split along section boundaries because this repository caps a file at 500
 * lines.
 *
 * CLAIM RULE IN FORCE: OXOT_Visual_Foundation_Spec.md L401 — no percentages,
 * money values, annual-loss figures or "verified" language without approved
 * inputs. Not one numeric figure appears in this slice. The only two figures
 * permitted anywhere on this page are the 500 kW EU reporting threshold (source
 * L7 / L119 / L464 / L471) and the 48 MW illustrative campus size (L430); both
 * belong to sections held in sibling files, and both must stay in the source's
 * own regulatory or illustrative framing rather than becoming a performance
 * claim. Source L458's own standing instruction is stricter still and applies to
 * the whole page: do not promise automatic regulatory compliance, certification,
 * or assurance outcomes. Source L262 adds a second: do not market this as an
 * intelligence or classified-system tool.
 *
 * `Bilingual`-typed throughout via `same()` (../registry). Both locales render;
 * `nl` is a same-as-English placeholder pending translation, not a claim that
 * this text is correct Dutch. See registry.ts's own doc comment.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Meta ───────────────────────────────────────────────────────────────── */

export const META = {
  /** Source L555. */
  title:
    "Hyperscale Data Center Cyber Digital Twin | Critical Facilities Security",
  /** Source L558. */
  description:
    "Test critical-facilities cyber changes before they affect capacity. OXOT's Cyber Digital Twin connects BMS, EPMS, power, cooling, OT networks, suppliers, and external dependencies for hyperscale data centers.",
  /** Source L561. Identical to the hero H1 at L35, as the brief intends. */
  h1: "Test the failure path before it becomes a capacity event.",
  /* The brief's own URL at L11 is `/industries/hyperscale-data-centers`, which
     is the LIVE page's route. This is iteration 2 and therefore takes the `-2`
     route; the `-2` suffix is the only departure from the brief's stated URL. */
  route: "/industries/hyperscale-data-centers-2"
};

/* ── S00 · Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  /** Source L3, the brief's own bolded name for this vertical. */
  eyebrow: same("Hyperscale & Data Centers"),
  /** Source L35, repeated verbatim as the page H1 at L561. */
  h1: same("Test the failure path before it becomes a capacity event."),
  /** Source L37. */
  lead: same(
    "OXOT's Cyber Digital Twin connects critical-facilities controls, electrical and cooling infrastructure, operational networks, external utilities, and supply-chain dependencies—so you can test a cyber change before it risks availability, customer capacity, or safety."
  ),

  /* CTA HIERARCHY IS TAKEN FROM L25–L31, NOT FROM L41–L42'S BULLET ORDER — a
     judgment call, stated here rather than made silently. The brief prints its
     two hero CTAs in the order "Explore the hyperscale model" (L41), then
     "Discuss a critical-facilities scenario" (L42). But L25–L31 explicitly
     LABELS the page's conversion hierarchy the other way round: the PRIMARY
     conversion is "Discuss a campus, hall, or critical-facilities change" (L27)
     and the SECONDARY is "Explore the interactive hyperscale model" (L31). A
     labelled hierarchy outranks a list order, so `ctaPrimary` is the contact
     ask. Both strings are transcribed verbatim and neither is dropped; only
     which one gets primary emphasis is decided here. Same primary/secondary
     shape as every other -2 page. */
  /** Source L42 → the real `/contact` route (brief's suggested link, L573). */
  ctaPrimary: same("Discuss a critical-facilities scenario"),
  ctaPrimaryHref: PATHS.contact,
  /* Source L41. NOT an off-page route: L31 and L538 both make clear this points
     at the interactive model ON THIS PAGE, so the href is the in-page anchor
     built from `MODEL.id` rather than a PATHS key. */
  ctaSecondary: same("Explore the hyperscale model")

  /* NO `note` FIELD ON THIS HERO, unlike its Rail and Manufacturing siblings —
     and the difference is in the source, not an omission. On those pages the
     stated secondary conversion is a "bring one artifact" ask distinct from
     either CTA, so it needs a line of its own beside them. Here the secondary
     conversion (L31, "Explore the interactive hyperscale model") IS the
     secondary CTA (L41), so restating it beside itself would be the same
     sentence printed twice. The nearest equivalent artifact ask on this page
     exists only in the FINAL CTA (L492: "Bring a one-line diagram, P&ID,
     BMS/EPMS architecture, equipment list, or a proposed vendor-access,
     firmware, or segmentation change") and belongs to that section's content
     file; it is deliberately not hoisted into the hero. */
};

/* ── Page-level conversions ─────────────────────────────────────────────── */

export const CONVERSIONS = {
  /** Source L27, the brief's stated PRIMARY conversion for the whole page. */
  primary: same("Discuss a campus, hall, or critical-facilities change"),
  primaryHref: PATHS.contact,
  /** Source L31, the brief's stated SECONDARY conversion. Not an off-page
   *  route — it points at this page's own interactive model, `MODEL.id`. */
  secondary: same("Explore the interactive hyperscale model")
};

/* ── S01 · Interactive hyperscale model ─────────────────────────────────── */

/**
 * THE HEADING IS THE PAGE-STRUCTURE LIST'S OWN TITLE — gap resolution G3,
 * approved. This section is the only one on the page with no explicit
 * `### Section headline` in the source: L44 opens it with a plain `##` and every
 * other body section carries a quoted headline sentence. Rather than write a
 * headline the brief does not state, the h2 takes the literal title the brief
 * gives this section in its own page-structure list at L538, "Interactive
 * hyperscale model". No sentence is invented to fill the slot.
 *
 * `id` is DOM identity AND the hero's secondary-CTA anchor target — the section
 * component must render this exact id, or `HERO.ctaSecondary` dead-ends.
 */
export const MODEL = {
  id: "hyperscale-model",
  index: "01",
  /** Source L538, per G3 above. */
  heading: same("Interactive hyperscale model"),

  /* THE FIVE-LEVEL NAVIGATION DEPTH, source L51–L59, verbatim.
     This is the "core interaction" the brief specifies at L48 — the depth a
     visitor descends through, which is a different axis from the five
     synchronized VIEWS below. The brief prints them as two separate code blocks
     and states no mapping between them; they are kept as two separate lists
     here for that reason, and a component must not zip them. */
  depthChain: [
    /** Source L51. */
    same("Campus / site view"),
    /** Source L53. */
    same("Data hall / availability-zone view"),
    /** Source L55. */
    same("Electrical or cooling train"),
    /** Source L57. */
    same("Control and network pathway"),
    /** Source L59. */
    same("Failure cascade and business consequence")
  ],

  /* THE NINE SCENARIOS THE VISITOR CHOOSES FROM, source L65–L73, verbatim.
     G1, APPROVED: these are NOT the twelve scenarios of the risk-scenario
     register at L294–L307, and the two lists are deliberately kept apart —
     these nine live here, those twelve live in content.scenarios.ts, each
     transcribed verbatim from its own source rows. Several concepts overlap
     (BMS vendor access, EPMS/switchgear, generator/UPS, cooling-plant control,
     water constraint, utility disturbance, supply-chain controller, telecom
     dependency, sovereign-workload isolation) but the brief states no mapping
     between the two lists, and their wordings differ. No runtime join is
     performed and no correspondence is invented. */
  scenarios: [
    /** Source L65. */
    same("BMS vendor remote access"),
    /** Source L66. */
    same("EPMS / switchgear control path"),
    /** Source L67. */
    same("Generator or UPS maintenance update"),
    /** Source L68. */
    same("Chilled-water plant control change"),
    /** Source L69. */
    same("Water-constrained cooling operation"),
    /** Source L70. */
    same("Utility-grid disturbance plus OT disruption"),
    /** Source L71. */
    same("Supply-chain compromise in a critical controller"),
    /** Source L72. */
    same("Cross-connect / network dependency incident"),
    /** Source L73. */
    same("Defense / sovereign workload isolation requirement")
  ],

  /* THE FIVE SYNCHRONIZED VIEWS, source L79–L83, verbatim. Per L76 the visual
     changes ACROSS these five when a scenario is chosen — so they are the
     model's view bands, not captions about it. */
  views: [
    /** Source L79. */
    same("Physical infrastructure"),
    /** Source L80. */
    same("Electrical and mechanical controls"),
    /** Source L81. */
    same("OT / BMS / EPMS / DCIM network pathways"),
    /** Source L82. */
    same("Dependency graph"),
    /** Source L83. */
    same("Capacity, availability, and recovery consequence")
  ],

  /* Source L102, verbatim, split into its two sentences at the boundary the
     source writes. This is the model's stated PURPOSE — what a visitor must be
     able to see — and it is real page prose, unlike `buildNote` below. */
  purpose: same(
    "The visitor must be able to see that an issue affecting a cooling-controller network, electrical-monitoring platform, generator controller, or vendor path does not have a generic impact."
  ),
  purposeTwo: same(
    "It may consume redundancy, reduce available capacity, create a maintenance lockout, force a load shed, affect a data hall, or compound a real utility disturbance."
  ),

  /* NOT VISITOR COPY — A BUILD INSTRUCTION, source L46, transcribed as the
     instruction it is. It must never be printed on the page. The brief demands
     this vertical carry the site's best interactive demonstration, and rules out
     the obvious wrong answer: a navigable dependency model using the same
     logical structure as the live Cyber Digital Twin, not a rotating 3D
     building. The component owner must actually honour it. Same treatment
     rail-transportation-2/content.ts gives its own `segmentToggleNote`. */
  buildNote: same(
    "Do not make it a rotating 3D building. Make it a navigable dependency model that uses the same logical structure as your live Cyber Digital Twin."
  )

  /* GAP, FLAGGED NOT FILLED: the brief says visitors "choose a scenario in the
     left panel" (L62) and that the visual then "changes across five synchronized
     views" (L76), but specifies no control affordance for either — no accessible
     name for the scenario group, no statement of whether the five views are
     simultaneously visible bands or a second selectable axis, and no default
     scenario on first paint. None of these is invented here. The component owner
     decides; per the owner's standing rule an unbuilt interactive feature is
     built complete and visibly placeholdered rather than dropped. */
};

/* ── Internal-link map ──────────────────────────────────────────────────── */

/**
 * The brief's suggested internal links (L565–L573), each resolved against a real
 * key in src/components/shell/nav.ts. THE BRIEF'S RAW PATHS ARE NOT THIS SITE'S
 * ROUTES — it writes `/platform/decisions/fix-first` where the live route is
 * `/decisions/fix-first`, `/platform/deployment-data-sovereignty` where the live
 * route is `/deployment-sovereignty`, `/resources/technical-specification` where
 * the live route is `/technical-specification`, and `/resources/case-studies`
 * where the live route is `/case-studies`. Every entry below was checked against
 * nav.ts rather than transcribed from the brief; consumers must link through
 * these constants and never through the brief's literal strings.
 *
 * ONE SUGGESTED LINK HAS NO PAGE OF ITS OWN, AND IS REDIRECTED RATHER THAN
 * DROPPED — gap resolution G5, approved. The brief lists `/assurance/nis2`
 * (L570), but nav.ts has no NIS2 key: the assurance area covers IEC 62443, the
 * Cyber Resilience Act, TS 50701, IEC 62278-2 and Evidence & Data Provenance,
 * and nothing else. NIS2 matters more on this page than on any sibling — the
 * brief opens on it (L7) and gives it the first row of the regulatory matrix
 * (L462) — so instead of emitting a dead href it points at the `/assurance`
 * index, which is the real page that frames all of OXOT's assurance work. That
 * substitution is a ROUTING decision only; no NIS2 copy comes from anywhere but
 * the source rows that state it, and nothing here claims `/assurance` is a NIS2
 * page.
 */
export const LINKS = {
  /** Brief L565 `/platform/cyber-digital-twin`. */
  cyberDigitalTwin: PATHS.cdt2,
  /** Brief L566 `/platform/decisions/fix-first`. */
  fixFirst: PATHS.decisionFixFirst,
  /** Brief L567 `/platform/decisions/change-safely`. */
  changeSafely: PATHS.decisionChangeSafely,
  /** Brief L568 `/platform/deployment-data-sovereignty` — the brief's own
   *  sovereign/defense-workload material (L260–L271) is what makes this one
   *  load-bearing here rather than decorative. */
  deploymentSovereignty: PATHS.deploymentSovereignty,
  /** Brief L569 `/assurance/iec-62443`. */
  iec62443: PATHS.assuranceIec62443,
  /** Brief L570 `/assurance/nis2`, redirected to the assurance index per G5
   *  above. English-only — see `ASSURANCE_IS_ENGLISH_ONLY` below. */
  assurance: PATHS.assurance,
  /** Brief L571 `/resources/technical-specification`. English-only — see
   *  `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY` below. */
  technicalSpecification: PATHS.technicalSpecification,
  /** Brief L572 `/resources/case-studies`. The case-study programme section
   *  (L397–L428) is this link's natural home. */
  caseStudies: PATHS.caseStudies,
  /** Brief L573 `/contact`. */
  contact: PATHS.contact,

  /* NOT IN THE BRIEF'S LIST, ADDED FOR A STATED REASON: the brief's own "four
     hyperscale decisions" section (L315–L320) develops all four decisions in
     full, but its link list names only two of them. The other two are real, live
     routes verified in nav.ts (L130, L132), so all four can link out rather than
     two of four dead-ending for no reason the source gives. Linking is a routing
     decision; no decision's COPY comes from anywhere but the source row it
     belongs to, and that copy lives in content.decisions.ts, not here. Same
     resolution rail-transportation-2/content.ts applied to the identical gap. */
  investment: PATHS.decisionInvestment,
  riskAcceptance: PATHS.decisionRiskAcceptance
};

/**
 * `/technical-specification` IS ENGLISH-ONLY on this site. Every other page
 * linking to it gates the link on locale — the established pattern is
 * `locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2`. Any section of
 * this page linking to it must apply that gate rather than ship an `nl` link
 * into an EN-only page. This flag states the requirement in data so each section
 * owner does not have to rediscover it.
 */
export const TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY = true;

/**
 * `/assurance` IS ALSO ENGLISH-ONLY, and this page links to it — which no
 * sibling -2 page did, so the requirement is stated here explicitly rather than
 * inherited. `src/app/[locale]/assurance/page.tsx` calls `notFound()` for any
 * locale other than `en`, so an ungated `LINKS.assurance` would send Dutch
 * visitors to a 404. The established pattern across the live industry pages is
 * `locale === "en" ? PATHS.assurance : PATHS.consulting`. Note this is NOT true
 * of the five framework pages beneath it — `PATHS.assuranceIec62443` and its
 * siblings render both locales and need no gate.
 */
export const ASSURANCE_IS_ENGLISH_ONLY = true;
