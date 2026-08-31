import type { Locale } from "@/i18n/config";

/**
 * THE CLAIM SHEET, as code.
 *
 * Every factual claim this site makes about OXOT, the Regulation, or the world
 * lives here with its source attached. Pages compose from these constants; they
 * do not retype facts.
 *
 * WHY THIS EXISTS. The previous site's second-worst axis was copy fidelity, and
 * the two most expensive failures of the whole project were both provenance
 * failures rather than writing failures:
 *
 *   - A headline the advisory board had condemned BY NAME shipped on the
 *     homepage, because a builder improvised while the cleared line sat unused.
 *   - Eight surfaces told readers Article 14 "already requires" something "as of
 *     11 September 2026" — 35 days before it applies. That copy was quoted
 *     VERBATIM from the cleared claim sheet, which had been written for a reader
 *     arriving after September. A cleared line can expire in the other
 *     direction: true when written, false when shipped early.
 *
 * Neither is caught by careful writing. Both are caught by a claim carrying its
 * source and its date, and by `recheck` on anything that can go stale.
 *
 * RULES
 *  - `source` is a real file and section in this repo. Not "the strategy".
 *  - `cleared` is when a human signed it off.
 *  - `recheck` is set on anything the world can change under us — a register,
 *    a standards target, a count. Absent means the fact is permanent.
 *  - If a claim is not in here, a page may not assert it.
 *  - BOTH LANGUAGES OR NEITHER (CLAUDE.md §3). `nl` is required, not optional,
 *    so a fact cannot reach a Dutch page in English by omission.
 *
 * ON TRANSLATING REGULATION. The Dutch here uses the standard Dutch legal
 * terms — aangemelde instantie, technisch dossier, conformiteitsverklaring,
 * geharmoniseerde normen, in de handel brengen.
 *
 * Where the English copy QUOTES the Regulation inside quotation marks, there
 * are exactly two acceptable options, and inventing a third is the provenance
 * failure this file exists to prevent:
 *
 *   1. QUOTE THE AUTHENTIC DUTCH. Regulation (EU) 2024/2847 has a Dutch text
 *      of equal legal force at https://eur-lex.europa.eu/eli/reg/2024/2847/oj/nld
 *      This is the right answer whenever the passage can be located, and the
 *      article number must be recorded in `source` so the next person can. See
 *      `CRA.bottleneck`, where doing this also caught two substantive errors:
 *      "vóór" for "uiterlijk op", and "ensure" for "strive to ensure".
 *   2. KEEP THE ENGLISH AND SAY SO, when the Dutch passage has not been
 *      verified. Honest, and visibly provisional.
 *
 * NEVER translate a phrase yourself and leave it inside quotation marks. That
 * manufactures a quote, and this audience is the one that would catch it.
 */

export interface Claim {
  /** The exact words that may ship, in English. */
  en: string;
  /** The exact words that may ship, in Dutch. Required — see CLAUDE.md §3. */
  nl: string;
  /** File and section in this repo that cleared it. */
  source: string;
  /** ISO date a human cleared it. */
  cleared: string;
  /** ISO date this must be re-verified, for facts the world can change. */
  recheck?: string;
  /** A URL the reader can open to check it themselves. */
  proof?: string;
  /** Why this wording and not another — the trap, where there is one. */
  note?: string;
}

/** Today, for date-sensitive copy. The site must never assert that a future
 *  obligation is already in force. */
export const AS_OF = "2026-08-07";

/** Read a claim in the active language. Pages call this instead of reaching
 *  for `.en`, which is how an English sentence used to end up on a Dutch page. */
export function say(claim: Claim, locale: Locale): string {
  return locale === "nl" ? claim.nl : claim.en;
}

/* ── The grant — the only externally adjudicated credential OXOT has ─────── */

const RVO_REGISTER =
  "https://english.rvo.nl/subsidies-financing/cif-nl/summaries-granted-projects";

export const GRANT = {
  award: {
    /* Names the scheme so the row is checkable on its own, rather than only in
       the context of the FUND row above it: the CIF-NL 2025 ceiling is public
       even though no per-project figure is. The euro amount stays off the page
       — the grant letter is private, and the ban on attributing a figure to RVO
       is recorded in `note`. */
    en: "The maximum grant available under CIF-NL 2025, a round RVO published with a range of €60,000–€100,000.",
    nl: "Het maximale subsidiebedrag onder CIF-NL 2025, een ronde die RVO publiceerde met een bandbreedte van € 60.000–€ 100.000.",
    proof: RVO_REGISTER,
    source: "docs/plans/2026-08-06-option-b/START-HERE.md §4",
    cleared: "2026-08-06",
    note:
      'OXOT\'s own statement. NEVER "RVO awarded €100,000" / "RVO kende €100.000 toe" — RVO publishes no per-project figure, so that phrasing attributes to RVO something it never said. The distinction is attribution, not truth: OXOT is the recipient and can state its own award.'
  },
  fund: {
    en: "Netherlands Cybersecurity Innovation Fund — CIF-NL 2025, administered by RVO, coordinated by NCC-NL, commissioned by the Ministry of Economic Affairs, co-funded by the European Cybersecurity Competence Centre.",
    nl: "Netherlands Cybersecurity Innovation Fund — CIF-NL 2025, uitgevoerd door RVO, gecoördineerd door NCC-NL, in opdracht van het ministerie van Economische Zaken, medegefinancierd door het European Cybersecurity Competence Centre.",
    source: "docs/reference/OXOT-CIF-NL-GRANT.md",
    cleared: "2026-08-06",
    proof: RVO_REGISTER,
    note:
      "The fund's and the centre's names are proper nouns and stay in English in both languages; the roles around them are translated."
  },
  field: {
    en: "One of 13 projects selected from 95 applications · 17 of a possible 20 points.",
    nl: "Een van de 13 geselecteerde projecten uit 95 aanvragen · 17 van de maximaal 20 punten.",
    source: "docs/plans/2026-08-06-option-b/START-HERE.md §4",
    cleared: "2026-08-06",
    proof: RVO_REGISTER,
    recheck: "2027-02-06",
    note:
      "Verified by summing RVO's own published score column by hand: 20:1, 19:1, 18:4, 17:7, 16:11 … = 95 exactly."
  },
  /* theCostlyTruth REMOVED, 2026-08-21, per direct instruction. It read: "Six
     of those thirteen scored higher than ours. We would rather you read that
     from RVO than from us." It was previously the highest-endorsed line in
     the corpus — two independent reviewers scored it the site's best
     paragraph — and the doc comments in grant-panel.tsx, credential.tsx and
     company/page.tsx that called it "THE SIGNATURE MOVE" have been updated to
     match. The rest of the CIF-NL credential (fund, award, field, announced,
     RVO's own words) is unchanged and still rendered. */
  announced: {
    en: "Announced 14 July 2026. Applicant of record: Oxot B.V.",
    nl: "Bekendgemaakt op 14 juli 2026. Aanvrager: Oxot B.V.",
    source: "docs/reference/OXOT-CIF-NL-GRANT.md",
    cleared: "2026-08-06",
    note: "The date is from the HSD release, not the RVO page — RVO publishes no announcement date, so cite HSD for it."
  },
  rvoWords: {
    en: "A truthful copy of reality.",
    nl: "A truthful copy of reality.",
    source: "docs/plans/2026-08-06-option-b/START-HERE.md §4",
    cleared: "2026-08-06",
    proof: RVO_REGISTER,
    note:
      "RVO's own phrase for the Cyber Digital Twin. Quotable and attributed — and therefore NOT translated: the words we are quoting are the English ones RVO published at the proof URL. A Dutch rendering would be our sentence attributed to them."
  }
} satisfies Record<string, Claim>;

/* ── OXOT — who we are and what we will say about ourselves ─────────────── */

export const OXOT = {
  sentence: {
    en: "OXOT is a Dutch OT engineering firm. We turn what you already have — P&IDs, asset registers, SBOMs — into a technical file that clears first review and a risk number in euros.",
    nl: "OXOT is een Nederlands OT-engineeringbureau. Wij maken van wat u al heeft — P&ID's, assetregisters, SBOM's — een technisch dossier dat de eerste beoordeling doorstaat, en een risicobedrag in euro's.",
    source: "docs/plans/2026-08-07-straight-a/vision.md §2",
    cleared: "2026-08-07"
  },
  founders: {
    en: "Founded by former Fox-IT and NCC Group OT security leads.",
    nl: "Opgericht door voormalige OT-securityleads van Fox-IT en NCC Group.",
    source: "content/pages/en/about.md",
    cleared: "2026-08-06",
    note:
      'The exact phrasing on /about, which is frozen and authoritative. "Both were OT security leads at Fox-IT and NCC Group" over-reaches — it asserts each held the role at both firms. The Dutch keeps the same restraint.'
  },
  noScan: {
    en: "No active scanning. No agent on a PLC.",
    nl: "Geen actieve scans. Geen agent op een PLC.",
    source: "docs/plans/2026-08-07-straight-a/vision.md §6",
    cleared: "2026-08-06",
    note: "The single best objection-killer on the site. It answers the first question every OT engineer asks."
  },
  noLogos: {
    en: "We're not going to show you logos we haven't earned yet.",
    nl: "Wij laten u geen logo's zien die wij nog niet verdiend hebben.",
    source: "docs/plans/2026-08-07-straight-a/vision.md §6",
    cleared: "2026-08-06"
  },
  twinAnswer: {
    en: "The Cyber Digital Twin is a working model of your operational estate. So you can.",
    nl: "De Cyber Digital Twin is een werkend model van uw operationele omgeving. Zodat u dat wél kunt.",
    source: "docs/reference/COPY-cyber-digital-twin-grant.md §B",
    cleared: "2026-08-07",
    note:
      'THE ANSWER TO `constraint`, AND THE SOURCE PAIRS THEM. §B sets this line directly under the h1 it answers: "You cannot test a security change on a running plant." / "…So you can." The homepage keeps that adjacency, which is why it sits above the ask rather than below it — a two-word payoff whose antecedent is three paragraphs away is not a payoff.\n\nIt is HERE and not in the dictionary because it asserts a product capability. A reviewer found it shipping from `i18n/en.ts` with no source, no cleared date and no proof, while the h1 immediately above it came from this file — which makes the rule at the top of this file ("if a claim is not in here, a page may not assert it") decorative on the one new sentence that most needed it.\n\nThe Dutch is ours to write, not a quotation, so it is translated: "wél" carries the emphatic contradiction that "So you can" carries in English, and Dutch needs the particle to get it.',
  },
  constraint: {
    en: "You cannot test a security change on a running plant.",
    nl: "Een securitywijziging test u niet op een draaiende installatie.",
    source: "docs/reference/COPY-cyber-digital-twin-grant.md §B",
    cleared: "2026-08-06",
    note:
      "WAS the homepage h1, and this note said so long after it stopped being true. A round-1 reviewer called it the best four seconds on the site. The rule attached to it was: nothing else repeats it — vision §5. The Dutch fronts the object so the sentence lands on the constraint rather than on the reader.\n\nSTATUS 2026-08-09: THIS CLAIM IS CURRENTLY RENDERED NOWHERE, and that is a decision the owner should make rather than inherit from a cleanup. What happened, in order. The homepage h1 was rewritten to \"The full picture of your OT risk — and where your next euro reduces it most\", so the one sanctioned home for this line quietly went away, and this note went stale. Meanwhile the line was being repeated in exactly the two places the rule forbade: the /cra close panel quoted it at display size, and the ThreeDoors twin card OPENED with it — which put it on roughly ten pages, and twice on one screen of /cra. Removing those two repetitions was right, but with the h1 gone it also removed the last rendering.\n\nSo the line is not lost, it is unplaced. If it should come back it needs ONE home, chosen deliberately — the /twin hero is the obvious candidate. Until then, surfaces that want it state the consequence of the constraint instead, as the doors card and twin-claims.ts do."
  },
  writtenReview: {
    en: "An OXOT engineer reviews what you send and answers plainly — in writing, within two working days. No call required.",
    nl: "Een OXOT-engineer beoordeelt wat u stuurt en antwoordt zonder omwegen — schriftelijk, binnen twee werkdagen. Een gesprek is niet nodig.",
    source: "src/content/claims.ts — reworded 2026-08-21",
    cleared: "2026-08-21",
    note: "Reworded when the CRA self-check was pulled (owner, 2026-08-21): previously named 'confirms or corrects your classification', which assumed a CRA classification already existed. The free-human rung of the ladder is otherwise unchanged — it replaced a 45-minute call, deliberately: the call still happens for anyone who wants one, but it is now their idea."
  },
  yoursToForward: {
    en: "Free. In writing. Yours to forward, whether or not we ever work together.",
    nl: "Gratis. Op schrift. Van u, om door te sturen — of we nu ooit samenwerken of niet.",
    source: "docs/plans/2026-08-06-option-b/START-HERE.md §4",
    cleared: "2026-08-06"
  }
} satisfies Record<string, Claim>;

/* ── Words this site will not use ────────────────────────────────────────── */

/* NOTE: this list is ADVISORY. Nothing reads it — no guard, no test. It
   records the marketing register this site avoids, and that is all.

   "one living model" / "één levend model" was removed on the owner's explicit
   instruction: it is a DESCRIPTION of what the twin does, not a claim about the
   world requiring external proof, and blocking descriptive language cost time
   without improving a sentence. Do not re-add it, and do not wire this list to
   a gate without asking. */
export const BANNED = [
  "industry-leading", "world class", "best-in-class", "comprehensive",
  "cutting-edge", "seamless", "robust", "award-winning", "first of its kind",
  "unrivalled", "top rated", "RVO awarded",
  "reserved slot", "scheduling priority", "front of the line"
] as const;

/** The Dutch equivalents, so the guard test covers both languages. A banned
 *  claim is banned in the language it ships in, and "toonaangevend" on a Dutch
 *  page is the same failure as "industry-leading" on an English one. */
export const BANNED_NL = [
  "toonaangevend", "wereldklasse", "best-in-class", "compleet aanbod",
  "innovatief als geen ander", "naadloos", "robuust", "bekroond",
  "eerste in zijn soort", "ongeëvenaard", "hoogst beoordeeld",
  "RVO kende toe", "gereserveerde plek",
  "voorrang in de planning", "vooraan in de rij"
] as const;

/** Every claim on the site, flattened — used by the provenance test. */
export const ALL_CLAIMS: Record<string, Claim> = {
  ...Object.fromEntries(Object.entries(GRANT).map(([k, v]) => [`grant.${k}`, v])),
  ...Object.fromEntries(Object.entries(OXOT).map(([k, v]) => [`oxot.${k}`, v]))
};
