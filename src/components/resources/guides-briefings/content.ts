import { same } from "@/components/industries/registry";
import type { Bilingual } from "@/i18n/bilingual";

/**
 * /resources/guides-briefings — the index's own copy, and the small registry
 * that says what SHAPE each document is.
 *
 * WHY A REGISTRY AND NOT FRONTMATTER. The markdown files do carry `format:`,
 * `audience:` and `decision:` keys, but `toDoc()` in components/longform/
 * content.ts exposes a fixed `Doc` interface and drops anything else — and
 * that file is shared, read-only, long-form infrastructure behind five
 * sections. Rather than widen a type all of them depend on for two
 * documents, the index keeps its own map. It is also the only place the
 * *presentational* difference between a Guide and a Briefing can live, since
 * that difference is not a property of the markdown at all.
 *
 * THE DIFFERENCE IS THE POINT OF THE PAGE. resources-format-guides-briefings
 * .md states the rule the whole section turns on — "A Guide tells the reader
 * what to do. A Briefing tells the reader what decision to make." — and
 * gives the two formats different audiences (engineers vs. board), different
 * lengths and different templates. One card component used twice would
 * flatten all of that into "two articles", which is exactly the failure the
 * format spec exists to prevent. So the Guide card leads with its method
 * spine (what you will do) and the Briefing card leads with its decision
 * sentence (what you will decide), in two separately-shaped sections.
 *
 * DELIBERATELY DOES NOT RESTATE THE TAXONOMY. components/resources/index/
 * content.ts's GUIDE_FORMATS already teaches the Guide-vs-Briefing rule with
 * its audience and word-length table, on the /resources shelf a reader
 * passes through to get here. Repeating that table as this page's opening
 * section would mean scrolling past the same comparison twice before
 * reaching either document — the duplicate-list failure /case-studies had to
 * be corrected for. The rule appears here once, as a single line under the
 * hero, and the audience and length then belong to each card.
 *
 * `Bilingual` throughout via `same()` — both locales render, `nl` is a
 * same-as-English placeholder pending translation, not a claim that it is
 * correct Dutch. Same convention as the platform and decision pages, and
 * matched by the two .nl.md documents this page links to.
 */

export const META = {
  title: "Guides & Briefings | Methods for Engineers, Decisions for Boards",
  description:
    "Long-form OXOT resources in two formats. A Guide sets out a method an engineering team can run against its own evidence. A Briefing sets out a decision a leadership team has to take."
};

export const BREADCRUMB = {
  section: same("Resources"),
  here: same("Guides & Briefings")
};

export const HERO = {
  kicker: same("Resources / Guides & Briefings"),
  h1: same("One is a method. The other is a decision."),
  lead: same(
    "Two formats, deliberately not interchangeable. A Guide is written for the people who will do the work and sets out a method they can run against their own evidence. A Briefing is written for the people who have to approve it, and sets out the decision, the options, and what it costs to be wrong."
  ),
  /* The rule the whole section turns on, from the format specification. */
  rule: same("A Guide tells the reader what to do. A Briefing tells the reader what decision to make.")
};

export type Format = "guide" | "briefing";

export interface Entry {
  slug: string;
  format: Format;
  /** Who the format spec says this one is written for. */
  audience: Bilingual;
  /** The one decision the document supports. Its reason for existing. */
  decision: Bilingual;
  /** Guides only — the method spine, so the card shows the shape of the work. */
  spine?: readonly Bilingual[];
  /** Briefings only — the decision sentence, verbatim from the document. */
  sentence?: Bilingual;
  /** Briefings only — what the reader is actually choosing between. */
  options?: readonly Bilingual[];
}

export const ENTRIES: readonly Entry[] = [
  {
    slug: "testing-an-ot-segmentation-change",
    format: "guide",
    audience: same("OT security · Network engineering · Controls engineering · Architecture"),
    decision: same("Whether a proposed firewall or segmentation change is safe to make."),
    spine: [
      same("State the change as a decision"),
      same("Draw the boundary you are moving"),
      same("Establish the baseline reading"),
      same("Name the required flows first"),
      same("Insert the control virtually"),
      same("Re-read against the baseline"),
      same("Account for what stays open"),
      same("Write the validation condition"),
      same("Implement, then re-measure")
    ]
  },
  {
    slug: "air-gapped-by-design-sovereign-by-operation",
    format: "briefing",
    audience: same("Board · Executive · Programme sponsor · Procurement · Security authority"),
    decision: same("Which deployment mode to approve for a sensitive environment."),
    sentence: same(
      "Approve a deployment mode on the basis of what your security authority can approve crossing the boundary, not on the basis of what the capability is assumed to need."
    ),
    options: [
      same("Island Mode — nothing crosses, in either direction"),
      same("Inbound Intelligence Mode — one flow, inward only"),
      same("Dedicated Sovereign Instance — single-tenant, your region")
    ]
  }
];

export const SECTIONS = {
  guide: {
    eyebrow: same("Guides"),
    /* Singular. The section heading is plural and the card badge is not —
       a badge on one document that reads "GUIDES" labels the shelf, not the
       thing on it. */
    badge: same("Guide"),
    read: same("Read the guide"),
    h2: same("Methods you can run against your own evidence."),
    dek: same(
      "Written for the team that will do the work. Each one carries its scope, the evidence it needs, the points where the answer changes what you do next, a worked example labelled as illustrative, and a checklist to work down before the change reaches a change advisory board."
    ),
    spineLabel: same("The method, end to end"),
    decisionLabel: same("Decision supported"),
    audienceLabel: same("Written for")
  },
  briefing: {
    eyebrow: same("Briefings"),
    badge: same("Briefing"),
    read: same("Read the briefing"),
    h2: same("Decisions, stated so a board can take them."),
    dek: same(
      "Written for the people who approve rather than the people who implement. Each one opens with the decision in a single sentence, states the operational, financial and mission consequence of getting it wrong, sets out the options against their trade-offs, and closes on a recommended path."
    ),
    sentenceLabel: same("The decision in one sentence"),
    optionsLabel: same("What you are choosing between")
  }
};

export const CLOSING = {
  h2: same("Readable in full, gated selectively."),
  body: same(
    "In a high-trust technical market a prospect needs evidence before they will fill in a form, so everything in this section is readable end to end. Where a Guide later carries a substantive template, assessment worksheet or decision tool, that artefact — not the reading — is what would sit behind a form."
  ),
  note: same(
    "Every scenario in this section is illustrative and synthetic. No statistics, named incidents or customer outcomes appear in either document."
  )
};
