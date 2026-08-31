/**
 * HERO — content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L42–L65 (plus the page H1, which the spec states outside this
 * block at L36 and restates verbatim at L524). Every string below carries the
 * source line it was transcribed from. Nothing is invented.
 *
 * TWO HEADINGS, NOT ONE, AND THEY ARE NOT INTERCHANGEABLE. The spec fixes the
 * page H1 at L36/L524 and gives the hero its own heading at L46. They say
 * different things on purpose — the H1 is the page's promise ("the system you
 * operate"), the hero heading is the mechanism ("enabled by the Cyber Digital
 * Twin"). Collapsing them into one string would delete a claim the spec makes
 * twice, so `h1` and `heading` are separate fields and a renderer must print
 * both, `h1` as the document's only `<h1>`.
 *
 * THE FLOW IS A SEQUENCE, NOT A TIMELINE. L57–L65 is an ASCII chain of four
 * stages joined by a downward arrow. `flow` preserves that order because the
 * order is the source's own. NO DURATION, PRICE, EFFORT, TEAM SIZE OR STAGE
 * WEIGHTING is stated for any stage, because the spec states none — so nothing
 * downstream may render a time axis, a progress percentage, or segments of
 * unequal length. Equal, unlabelled steps are the only honest drawing.
 *
 * ZERO NUMERIC CLAIMS. No percentage, currency figure, duration, count,
 * customer name or certification appears anywhere in L42–L65, and none is
 * added here. The hedge in the body copy ("can survive contact", L48) is the
 * spec's own and is transcribed unstrengthened.
 *
 * `Bilingual`-typed via `same()` (./content); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

/** One stage of the hero's ASCII flow (L57–L65). */
export interface HeroFlowNode {
  /** DOM identity, not copy. Never derive it from array position. */
  id: string;
  /** The stage's label, exactly as the source prints it. */
  label: Bilingual;
}

/** One of the hero's two calls to action (L54, L55). */
export interface HeroCta {
  /** DOM identity, not copy. */
  id: string;
  /** The CTA's label, exactly as the source prints it. */
  label: Bilingual;
}

export const HERO = {
  /**
   * Source L36, restated verbatim at L524 as the spec's `H1:` metadata field.
   * The document's only `<h1>`.
   */
  h1: same("OT cybersecurity consulting, built around the system you operate."),

  /** Source L46 — the hero's own heading, distinct from the H1 above. */
  heading: same(
    "Engineering-led OT cybersecurity. Enabled by the Cyber Digital Twin."
  ),

  /** Source L48. */
  lede: same(
    "OXOT helps operators and critical-infrastructure teams make cyber decisions that can survive contact with a live environment."
  ),

  /**
   * Source L50 and L52, in the spec's order. Kept as two paragraphs because
   * the source breaks them there: the first states the method, the second
   * states what the Twin turns that method into.
   */
  body: [
    /** Source L50. The em dash before "not a generic questionnaire" is the source's. */
    same(
      "We begin with the process, the system, and the operational consequence—not a generic questionnaire. We work with your engineers to understand what the environment does, what cannot stop, what an attacker could reach, and which action changes the outcome."
    ),
    /** Source L52. */
    same(
      "The Cyber Digital Twin is how we connect that evidence. It turns consulting from a static assessment into a working model for prioritization, change testing, investment decisions, and long-term resilience."
    ),
  ] as readonly Bilingual[],

  /** Source L54 — the spec labels this the Primary CTA. */
  primaryCta: {
    id: "hero-discuss-engagement",
    label: same("Discuss a consulting engagement"),
  } satisfies HeroCta,

  /** Source L55 — the spec labels this the Secondary CTA. */
  secondaryCta: {
    id: "hero-explore-twin",
    label: same("Explore the Cyber Digital Twin"),
  } satisfies HeroCta,

  /**
   * Source L57–L65, the four stages of the ASCII chain, in the source's order.
   * The arrows between them are structure, not copy, and are not transcribed —
   * a renderer draws the connector.
   */
  flow: [
    /** Source L58. */
    { id: "engineering-evidence", label: same("Engineering evidence") },
    /** Source L60. */
    { id: "cyber-digital-twin", label: same("Cyber Digital Twin") },
    /** Source L62. */
    {
      id: "decisions",
      label: same("Assessment, architecture, change, and investment decisions"),
    },
    /** Source L64. */
    {
      id: "retained-evidence",
      label: same("Evidence your team can use and retain"),
    },
  ] satisfies readonly HeroFlowNode[],

  /* GAP, FLAGGED NOT FILLED: the spec gives the hero no supporting figure,
     logo wall, customer name, accreditation or proof point of any kind, and no
     destination URLs for either CTA. None is invented. */
};
