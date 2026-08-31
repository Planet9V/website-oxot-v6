/**
 * HOW WE WORK — content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L67–L91. Every string below carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * THE CHAIN IS FIVE QUESTIONS, AND THEY ARE QUESTIONS. L75–L85 is an ASCII
 * chain whose every node ends in a question mark. They are modelled as an
 * ordered list of interrogatives rather than as capability statements, because
 * the section's whole argument (L69, L91) is that the work starts by asking the
 * operator what the system does, not by asserting what OXOT covers. Rewriting
 * "What could an attacker actually reach?" into "We map attacker reach" would
 * invert the claim, so the question mark is load-bearing and is preserved.
 *
 * THE ORDER IS THE SOURCE'S AND IT IS THE ONLY ORDERING CLAIM MADE. The chain
 * narrows: purpose, then criticality, then protection, then reachability, then
 * safe change. `index` records position in that chain, which is a real fact
 * about the source. NO DURATION, PHASE LENGTH, SEQUENCE GATE OR EFFORT SPLIT is
 * stated, because the source states none — nothing downstream may render a time
 * axis or size the steps unequally.
 *
 * IEC 62443 APPEARS HERE AS VOCABULARY, NOT AS A CERTIFICATION. L87 states the
 * standard is how the answer is structured and recorded, and explicitly that it
 * "is not the reason for the work". No certification, accreditation, audit
 * status or conformity claim is made in this section, and none is added.
 *
 * ZERO NUMERIC CLAIMS. No percentage, currency figure, duration, count,
 * customer name or certification appears in L67–L91, and none is added. The
 * source's own hedged and negative framings — "cannot tell", "has not completed
 * the job" (L89) — are transcribed unsoftened and unstrengthened.
 *
 * `Bilingual`-typed via `same()` (./content); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

/** One node of the operational-reality chain (L75–L85). */
export interface RealityQuestion {
  /** DOM identity, not copy. Never derive it from array position. */
  id: string;
  /** Ordinal in the source chain. A fact about the source, not a rating. */
  index: string;
  /** The question, verbatim, question mark included. */
  question: Bilingual;
}

export const HOW_WE_WORK = {
  /** Section anchor — matches the `how-we-work` entry in ANCHORS (./content). */
  sectionId: "how-we-work",

  /** Source L67 — the source's own name for this section. */
  datumLabel: same("How we work"),

  /** Source L69. The em dash before "not the point" is the source's. */
  heading: same("Engineers first. The standard is the vocabulary—not the point."),

  /** Source L71. */
  lede: same(
    "Plant engineers and operators are measured on reliability, safety, throughput, quality, and recovery. They are not measured on control coverage."
  ),

  /** Source L73 — the sentence that introduces the chain below. */
  chainIntro: same("That is why OXOT starts with operational reality:"),

  /**
   * Source L75–L85, the five nodes of the ASCII chain, in the source's order.
   * The arrows between them are structure, not copy, and are not transcribed —
   * a renderer draws the connector.
   */
  questions: [
    /** Source L76. */
    {
      id: "what-does-it-do",
      index: "1",
      question: same("What does this system do?"),
    },
    /** Source L78. */
    {
      id: "what-cannot-stop",
      index: "2",
      question: same("Which functions cannot stop?"),
    },
    /** Source L80. */
    {
      id: "what-protects",
      index: "3",
      question: same(
        "What protects life, quality, production, service, or mission?"
      ),
    },
    /** Source L82. */
    {
      id: "what-can-be-reached",
      index: "4",
      question: same("What could an attacker actually reach?"),
    },
    /** Source L84. */
    {
      id: "what-can-change",
      index: "5",
      question: same("What can we safely change?"),
    },
  ] satisfies readonly RealityQuestion[],

  /**
   * Source L87 and L89, in the spec's order. Kept as two paragraphs because the
   * source breaks them: the first places the standard, the second states what a
   * standard-scored report still fails to do.
   */
  body: [
    /** Source L87. */
    same(
      "IEC 62443 is how OXOT structures and records the answer. It is not the reason for the work."
    ),
    /** Source L89. */
    same(
      "A report that scores a facility against a framework but cannot tell the plant manager, controls engineer, or operations leader what to do on Monday has not completed the job."
    ),
  ] as readonly Bilingual[],

  /** Source L91 — the section's closing line, printed as a blockquote. */
  pullQuote: same(
    "The goal is not a better score. The goal is a better decision."
  ),

  /* GAP, FLAGGED NOT FILLED: the source gives this section no CTA, no figure,
     no evidence-artefact list, and no further steps beyond the five questions
     above. None is invented. */
};
