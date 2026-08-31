/**
 * S08 · THE FOUR HYPERSCALE DECISIONS — content slice for
 * `/industries/hyperscale-data-centers-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md, L309-L322. Every string below carries the source line
 * it was transcribed from. Nothing is invented.
 *
 * THREE COLUMNS, FOUR ROWS, ONE AUDIENCE. L315's header row is
 * `OXOT decision | Hyperscale data-center language | What the Twin provides`,
 * and L317-L320 are the four decisions. There is ONE restatement column, not
 * two: unlike the rail brief's equivalent table, which states every decision
 * twice in passenger and in freight operating language, this one states each
 * decision once, in one operator's language. That single fact is what decides
 * the section's shape, and `DecisionRecords.tsx` records the rest of that
 * reasoning.
 *
 * THE `**` MARKERS ARE STRIPPED FROM COLUMN 1. L317-L320 wrap each decision
 * name in markdown bold. That is source FORMATTING, not source copy, and the
 * heading level the name renders at already carries the emphasis. Every other
 * character of every cell is transcribed exactly, including the source's own
 * typographic quotation marks around each hyperscale-language question, its
 * unspaced em-dash in the headline, and its spaced `NOW / NEXT / NEVER`.
 *
 * THE QUOTATION MARKS ARE KEPT AND ARE NOT RE-MARKED. The source encloses each
 * column-2 question in curly quotes because it is an operator's own phrasing of
 * OXOT's question, not OXOT's narration. Those characters ship verbatim, so the
 * component renders the question as an ordinary paragraph rather than wrapping
 * it in a second, redundant quotation treatment.
 *
 * NO PER-DECISION STATUS IS CARRIED. `NOW / NEXT / NEVER` appears exactly once
 * in this whole section, inside decision one's `provides` string, where it names
 * the triage the model returns for a pathway. The source assigns no status to
 * any of the four decisions themselves, so no record carries a status field and
 * no badge is available to render — four invented ones would be a fabricated
 * classification. Same rule `rail-transportation-2/content.decisions.ts` states
 * for the identical table.
 *
 * NO FIGURE OF ANY KIND appears here, because the source states none for this
 * section: no percentage, no currency, no loss figure, no count, no duration.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { LINKS, TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY } from "./content";

export interface HyperscaleDecision {
  /** DOM identity, not copy. Anything wiring an id off these must never derive
   *  it from array position. */
  id: string;
  /** Source column 1 — OXOT's own name for the decision. */
  name: Bilingual;
  /** Source column 2 — the same decision as a hyperscale operator states it. */
  question: Bilingual;
  /** Source column 3 — what the Twin returns for that decision. */
  provides: Bilingual;
  /** The live route for this decision's method page. */
  href: string;
}

/**
 * ALL FOUR DECISIONS LINK OUT, and the routes are read from `LINKS` rather than
 * from `PATHS` directly so this page's one verified route map stays the single
 * place a route is decided. `content.ts` already carries all four — `fixFirst`
 * and `changeSafely` from the brief's own link list, `investment` and
 * `riskAcceptance` added there with a stated reason, because the brief develops
 * four decisions but names only two of them in its links and all four routes
 * are live in nav.ts. Nothing was added to `content.ts` for this section; the
 * gap it names was already closed before this file was written.
 *
 * THE ORDER IS THE SOURCE'S, VERBATIM. L317-L320 run fix first, spend, change
 * safely, leave alone, and that is also the order the site header lists the four
 * decision pages in (nav.ts L219-L222). Nothing is reordered and nothing here
 * records position — see `DecisionRecords.tsx` on why no ordinal is printed.
 */
const ITEMS: readonly HyperscaleDecision[] = [
  {
    id: "fix-first",
    /** Source L317 column 1, less its markdown bold markers. */
    name: same("What do we fix first?"),
    /** Source L317 column 2, verbatim, including the source's quotation marks. */
    question: same(
      "“Which reachable control, management, or supplier pathway can consume redundancy, reduce available capacity, interrupt customer workloads, or impair safe recovery?”"
    ),
    /** Source L317 column 3, verbatim. */
    provides: same(
      "NOW / NEXT / NEVER prioritization tied to A/B-path dependency, common-mode exposure, thermal/electrical consequence, and customer/business impact"
    ),
    href: LINKS.fixFirst
  },
  {
    id: "investment",
    /** Source L318 column 1, less its markdown bold markers. */
    name: same("What should we spend?"),
    /** Source L318 column 2, verbatim, including the source's quotation marks. */
    question: same(
      "“Do we invest in BMS/EPMS segmentation, secure vendor access, independent monitoring, controller modernization, spare capacity, water resilience, additional carriers, or supply-chain controls?”"
    ),
    /** Source L318 column 3, verbatim. */
    provides: same(
      "Comparable options with modeled risk reduction, operational impact, lifecycle dependencies, and a reasoned investment sequence"
    ),
    href: LINKS.investment
  },
  {
    id: "change-safely",
    /** Source L319 column 1, less its markdown bold markers. */
    name: same("Can we change safely?"),
    /** Source L319 column 2, verbatim, including the source's quotation marks. */
    question: same(
      "“Can we patch this UPS controller, alter a switchgear firewall, rotate a certificate, isolate a vendor, reconfigure cooling controls, or connect a new hall without reducing resilience?”"
    ),
    /** Source L319 column 3, verbatim. */
    provides: same(
      "A virtual change experiment showing required control/monitoring flows, redundancy impact, remaining pathways, and recovery consequences"
    ),
    href: LINKS.changeSafely
  },
  {
    id: "risk-acceptance",
    /** Source L320 column 1, less its markdown bold markers. */
    name: same("What can we leave alone?"),
    /** Source L320 column 2, verbatim, including the source's quotation marks. */
    question: same(
      "“Which legacy BMS, controller, monitoring component, or vendor dependency is truly isolated or can remain until the next maintenance window under compensating controls?”"
    ),
    /** Source L320 column 3, verbatim. */
    provides: same(
      "A defensible exception with dependency evidence, compensating controls, owner, sunset date, and reassessment trigger"
    ),
    href: LINKS.riskAcceptance
  }
];

export const DECISIONS = {
  /** The section's ordinal on the page's running block rule. */
  index: "08",
  /** Section anchor. */
  sectionId: "hyperscale-decisions",
  /** Source L309 — the source's own name for this section. */
  datumLabel: same("The four hyperscale decisions"),
  /** Source L313, the section headline the brief prints as a blockquote h2,
   *  including its unspaced em-dash. */
  h2: same("Four decisions that preserve capacity—not just component uptime."),

  /** Source L315, the brief's own column headers. Transcribed exactly,
   *  including its sentence-case for the two value columns. The body renders no
   *  header row, so these name each value in place. Column 1's header is not
   *  used: that column's value is the record's own heading, and a label above a
   *  heading would name what the heading already says. */
  columns: {
    language: same("Hyperscale data-center language"),
    provides: same("What the Twin provides")
  },

  items: ITEMS,

  /**
   * Source L322's closing sentence.
   *
   * THE SOURCE'S OWN LINK IS NOT EMITTED. L322 closes on a bracketed
   * `ppl-ai-file-upload.s3.amazonaws` URL — an expiring pre-signed S3 link to
   * `OXOT-CDT-Product-Specification-V2.pdf`, carrying an `Expires` parameter
   * and a scoped security token. Shipping it would put a link on the site that
   * dies. The document it names is OXOT's own CDT product specification and
   * this site's real page for that material is `/technical-specification`, so
   * the citation resolves there. Identical resolution to
   * `content.capabilities.ts` (L450), `content.architecture.ts` (L191) and
   * `content.dependency.commercial.ts` (L284), which handle the same dangling
   * marker in their own sections.
   *
   * THE SENTENCE IS TRANSCRIBED IN THE SOURCE'S OWN FRAMING AND EXTENDED IN NO
   * DIRECTION. It states what the decision model IS DESIGNED TO do. It is not a
   * claim that any ranking, comparison or simulation has been performed,
   * verified or certified for any operator.
   *
   * `englishOnly` re-exports `content.ts`'s flag rather than restating the
   * rule: the component applies the site's established gate,
   * `englishOnly && locale !== "en" ? fallbackHref : href`, and clearing the
   * flag in `content.ts` the day that page renders `nl` retires the gate
   * without this file or the component being touched.
   */
  close: {
    /** Source L322, verbatim, less its trailing citation marker. */
    text: same(
      "The Cyber Digital Twin’s decision model is designed to rank findings by modeled physical consequence and reachability, compare security investments, simulate a virtual control before it touches production, and preserve evidence for deliberately deferred items."
    ),
    citation: {
      label: same("See the Technical Specification"),
      href: LINKS.technicalSpecification,
      /** `/cyber-digital-twin` renders both locales — the site's established
       *  substitute wherever an EN-only page is linked from a bilingual one. */
      fallbackHref: LINKS.cyberDigitalTwin,
      englishOnly: TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY
    }
  }
};
