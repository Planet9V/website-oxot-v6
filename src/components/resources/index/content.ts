/**
 * RESOURCES HUB — content for /resources.
 *
 * AUTHORITATIVE SOURCE: new_material_source/1_website_layout_v4/6_resources/
 * resources_overview.md, which specifies this page's H1, supporting copy,
 * section order and the four "choose your path" cards verbatim.
 * resources-purpose.md and resources-map.md are secondary — they describe
 * what each resource TYPE is for, and supply the reader-intent framing
 * reused in the path cards, but the overview owns the page.
 *
 * WHAT IS DATA AND WHAT IS COPY. Only the framing is here. The actual
 * Insights, Case Studies and Guides & Briefings on the page are read at
 * request time from `content/` through `@/components/longform/content`, so
 * this hub can never advertise an article that does not exist or miss one
 * that does. That matters right now specifically: sibling agents are still
 * writing into `content/insights/` and `content/guides-briefings/` while
 * this page ships. The only editorial choices stored here are the pinned
 * FEATURED document and the CASE_STUDY_PICKS ordering — both deliberately
 * manual, per the source's "rotate this only manually, do not use an
 * auto-rotating carousel".
 *
 * `Bilingual`-typed via `same()` — both locales render, `nl` is a
 * same-as-English placeholder pending translation, not a claim that this is
 * correct Dutch. Same convention as the industry and platform pages.
 */
import type { Locale } from "@/i18n/config";
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { localePath, PATHS } from "@/components/shell/nav";

export const META = {
  title: "Resources — research, evidence and practical tools for cyber-physical decisions",
  description:
    "Technical research, decision guides, real-world case studies, product documentation and reference material for OT cybersecurity, railway safety, product security, sovereign deployment and cyber-physical resilience."
};

export const HERO = {
  kicker: same("Resources"),
  h1: same("Research, evidence, and practical tools for cyber-physical decisions."),
  lead: same(
    "From IEC 62443 and the CRA to railway safety, air-gapped deployment, and OT change assurance — OXOT resources connect technical context to real decisions."
  ),
  ctaPrimary: same("Browse Insights"),
  ctaSecondary: same("Explore the Technical Specification")
};

/**
 * EN-ONLY DESTINATIONS. /case-studies and /technical-specification both
 * call notFound() for any locale other than "en" (see their own page.tsx
 * doc comments). This page renders in both locales, so a plain
 * localePath(locale, …) would hand a Dutch reader a guaranteed 404. A
 * cross-locale link is the honest option: send them to the English page
 * that exists rather than a Dutch one that does not. Delete the flag from
 * a destination the day its page gains a Dutch render.
 */
export function resourceHref(locale: Locale, path: string, enOnly?: boolean): string {
  return localePath(enOnly ? "en" : locale, path);
}

/* ─── 2. Choose your path ──────────────────────────────────────────────── */

export interface PathCard {
  n: string;
  title: Bilingual;
  /** The visitor's own words, verbatim from the source's table. */
  question: Bilingual;
  /** What they get, and where it goes. */
  destination: Bilingual;
  href: string;
  enOnly?: boolean;
}

export const PATH_CARDS: readonly PathCard[] = [
  {
    n: "01",
    title: same("Understand a topic"),
    question: same("Help me understand this standard, threat, architecture, or decision."),
    destination: same("Insights"),
    href: PATHS.resourcesInsights
  },
  {
    n: "02",
    title: same("See a comparable decision"),
    question: same("Has OXOT worked on a problem like mine?"),
    destination: same("Case Studies"),
    href: PATHS.caseStudies,
    enOnly: true
  },
  {
    n: "03",
    title: same("Use a practical method"),
    question: same("Give me a framework, checklist, or briefing I can use internally."),
    destination: same("Guides & Briefings"),
    href: PATHS.resourcesGuidesBriefings
  },
  {
    n: "04",
    title: same("Evaluate the platform"),
    question: same("How does the Cyber Digital Twin work, deploy, and integrate?"),
    destination: same("Product Sheet · Technical Specification · Air-Gapped Deployments"),
    /* Three destinations, so this one routes to the section of this page
       that lists all three rather than picking one on the reader's behalf. */
    href: "#technical-documents"
  }
];

export const PATHS_SECTION = {
  h2: same("Choose your path"),
  lead: same("Four ways in, depending on what you came to decide.")
};

/* ─── 3. Featured resource ─────────────────────────────────────────────── */

/**
 * MANUALLY PINNED, exactly as the source requires. If the pinned slug is
 * missing — a sibling renames a file, or the pick is retired — the
 * component falls back to the newest Insight rather than rendering an
 * empty hole. Change `slug` to re-feature; there is no rotation logic and
 * there should not be one.
 */
export const FEATURED = {
  kicker: same("Featured Insight"),
  section: "insights",
  slug: "cvss-cannot-prioritize-ot-risk",
  cta: same("Read the Insight")
};

/* ─── 4/5/6. The three editorial libraries ─────────────────────────────── */

export const LATEST_INSIGHTS = {
  h2: same("Latest Insights"),
  lead: same(
    "Question-led technical articles with a named author, primary sources and a revision date. Ungated, always."
  ),
  all: same("Explore all Insights")
};

export const CASE_STUDIES_SECTION = {
  h2: same("Featured Case Studies"),
  lead: same(
    "The real operational question, the evidence that was actually available, the constraint that made the obvious fix unacceptable, and the decision taken."
  ),
  all: same("Explore Case Studies"),
  /* The source's publication-level rule: never present an illustrative
     scenario as a customer engagement. These ten are real engagement
     write-ups, so the strip states that rather than leaving the reader to
     assume it. */
  provenance: same("Real engagements, published with permission or anonymized — never illustrative scenarios presented as client work.")
};

/**
 * MANUAL PICKS, newest-first fallback. Three real studies chosen to span
 * three different decisions (vendor access, standards adoption, deal-clock
 * due diligence) rather than three variations of one. Any slug not found
 * is skipped and back-filled from the rest of the section.
 */
export const CASE_STUDY_PICKS: readonly string[] = [
  "plant-remote-access",
  "iec-62443-adoption",
  "ma-ot-due-diligence"
];

export const GUIDES_SECTION = {
  h2: same("Guides & Briefings"),
  lead: same("Practical assets built to be used inside your organisation, not just read."),
  all: same("Explore Guides & Briefings")
};

/** The rule that separates the two formats, from resources-purpose.md.
 *  The per-document `format` field is not exposed by the longform loader,
 *  so this explains the distinction alongside the real list rather than
 *  labelling each row with a value this page cannot actually read. */
export const GUIDE_FORMATS: readonly { format: Bilingual; rule: Bilingual; audience: Bilingual; length: Bilingual }[] = [
  {
    format: same("Guide"),
    rule: same("Tells you what to do."),
    audience: same("Engineers, architects, OT security and RAMS teams"),
    length: same("8–20 pages · 2,500–6,000 words")
  },
  {
    format: same("Briefing"),
    rule: same("Tells you what to decide."),
    audience: same("Board, executive, procurement, programme sponsors"),
    length: same("3–8 pages · 800–2,000 words")
  }
];

/* ─── 7. Technical documents ───────────────────────────────────────────── */

export interface TechnicalDoc {
  id: string;
  code: string;
  name: Bilingual;
  body: Bilingual;
  /** The evaluator question this document answers. */
  question: Bilingual;
  href: string;
  enOnly?: boolean;
}

export const TECHNICAL_DOCS_SECTION = {
  h2: same("Technical Documents"),
  lead: same(
    "For higher-intent technical evaluation. Deliberately kept apart from the thought leadership above — these describe the product, not the problem."
  )
};

export const TECHNICAL_DOCS: readonly TechnicalDoc[] = [
  {
    id: "product-sheet",
    code: "DOC-01",
    name: same("Cyber Digital Twin Product Sheet"),
    question: same("What is this product and what decisions does it support?"),
    body: same(
      "The Cyber Digital Twin stated as a product: what it is, what it produces, what it costs you to feed, and which decisions it exists to support."
    ),
    href: PATHS.resourcesProductSheet
  },
  {
    id: "technical-specification",
    code: "DOC-02",
    name: same("Cyber Digital Twin Technical Specification"),
    question: same("How does it technically work?"),
    body: same(
      "Four engineering disciplines, the seven-layer facility model, and the same model read through five lenses — P&ID, Purdue, network, graph and 3D."
    ),
    href: PATHS.technicalSpecification,
    enOnly: true
  },
  {
    id: "air-gapped-deployments",
    code: "DOC-03",
    name: same("Air-Gapped & Sovereign Deployment Briefing"),
    question: same("Can this operate in our sensitive or sovereign environment?"),
    body: same(
      "Deployment, update, governance and operation of the Twin in an isolated environment — for defence, government and sovereign operators."
    ),
    href: PATHS.resourcesAirGappedDeployments
  }
];

/* ─── 8. Browse by topic ───────────────────────────────────────────────── */

export interface BrowseGroup {
  id: string;
  label: Bilingual;
  note: Bilingual;
  items: readonly { label: Bilingual; href?: string; enOnly?: boolean }[];
}

export const BROWSE_SECTION = {
  h2: same("Browse by topic"),
  lead: same(
    "The library is small enough today that these route to the pages behind each topic rather than to a filtered list. They become filters once there is enough to filter."
  )
};

/**
 * EVERY LINK HERE RESOLVES TO A PAGE THAT EXISTS. The source names
 * "IEC 62278-2:2025" and a set of audience filters; the built routes are
 * /assurance/iec-62278-2 and — for audiences — nothing at all. So the
 * framework chip carries the real page's name, and the audience chips
 * render as plain text with an explicit note that the filter is not built.
 * A chip that looks clickable and 404s is worse than one that admits it is
 * not wired up yet.
 */
export const BROWSE_GROUPS: readonly BrowseGroup[] = [
  {
    id: "industry",
    label: same("By industry"),
    note: same("Six sectors where a cyber event is a physical event."),
    items: [
      { label: same("Manufacturing & Process"), href: `${PATHS.industries}/manufacturing-process` },
      { label: same("Energy & Utilities"), href: `${PATHS.industries}/energy-utilities` },
      { label: same("Water & Wastewater"), href: `${PATHS.industries}/water-wastewater` },
      { label: same("Rail & Transportation"), href: `${PATHS.industries}/rail-transportation` },
      { label: same("Hyperscale & Data Centers"), href: `${PATHS.industries}/hyperscale-data-centers` },
      { label: same("Defense & Government"), href: `${PATHS.industries}/defense-government` }
    ]
  },
  {
    id: "framework",
    label: same("By framework"),
    note: same("The standards and regulations the evidence has to satisfy."),
    items: [
      { label: same("IEC 62443"), href: PATHS.assuranceIec62443 },
      { label: same("Cyber Resilience Act"), href: PATHS.assuranceCra },
      { label: same("TS 50701"), href: PATHS.assuranceTs50701 },
      { label: same("IEC 62278"), href: PATHS.assuranceIec62278 },
      { label: same("Evidence & data provenance"), href: PATHS.assuranceEvidenceProvenance }
    ]
  },
  {
    id: "decision",
    label: same("By decision"),
    note: same("The four questions the Cyber Digital Twin exists to answer."),
    items: [
      { label: same("What do we fix first?"), href: PATHS.decisionFixFirst },
      { label: same("What should we spend?"), href: PATHS.decisionInvestment },
      { label: same("Can we change safely?"), href: PATHS.decisionChangeSafely },
      { label: same("What can we leave alone?"), href: PATHS.decisionRiskAcceptance }
    ]
  },
  {
    id: "audience",
    label: same("By audience"),
    note: same("Not a filter yet — no audience-tagged index exists to route to."),
    items: [
      { label: same("Board") },
      { label: same("CISO") },
      { label: same("Engineer") },
      { label: same("Safety / RAMS") },
      { label: same("Product team") },
      { label: same("Procurement") }
    ]
  }
];

/* ─── 9. Glossary ──────────────────────────────────────────────────────── */

export const GLOSSARY = {
  h2: same("Glossary"),
  /** Alias of h2 — ResourceHead (the shared 3-line header used by every
   *  other entry) reads `.name`, not `.h2`; kept both rather than rename
   *  h2 everywhere it's already used above. */
  name: same("Glossary"),
  question: same("What does this term mean in this context?"),
  role: same("Reference layer under everything else"),
  body: same(
    "Every entry carries a plain-English definition, why it matters, the OXOT context, the standards it belongs to, a worked example, and the date it was last reviewed."
  ),
  cta: same("Open the Glossary"),
  /** Alias of cta — ResourceAsk/ResourcesGlossary read `.ask`. */
  ask: same("Open the Glossary"),
  href: PATHS.resourcesGlossary,
  enOnly: false
};

/** A sample of terms, so the strip shows what an entry is about rather
 *  than merely asserting that one exists. Text, not links: each term's
 *  anchor lives on a page a sibling agent is still building, and nine
 *  speculative deep links that may not resolve would be worse than one
 *  that certainly does. Nine terms from the real 34-term list in
 *  new_material_source/1_website_layout_v4/6_resources/glossary.md. */
export const GLOSSARY_SAMPLE: readonly Bilingual[] = [
  same("Cyber Digital Twin"),
  same("System under consideration"),
  same("Zones and conduits"),
  same("Reachability"),
  same("Common-mode dependency"),
  same("Safety argument"),
  same("HBOM"),
  same("Consequence-led prioritization"),
  same("Purdue Model")
];
