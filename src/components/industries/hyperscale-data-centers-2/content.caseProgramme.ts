/**
 * S10 · CASE-STUDY PROGRAMME — source L397–L430.
 *
 * THE DEFINING FACT OF THIS SECTION: NONE OF THE TEN CASE STUDIES EXISTS.
 * L399 says this vertical "is well suited to several case studies" and L401
 * titles the table "Recommended case-study categories". Recommended. This is a
 * programme of work not yet done, and every value in this file is shaped so a
 * component cannot accidentally render it as a catalogue of published proof.
 * Two structural consequences follow, and both are load-bearing:
 *
 *   1. THE TEN ARE `CANDIDATES`, NOT `CASE_STUDIES`, and each carries a
 *      `question` as its primary field with the case-study `name` demoted to a
 *      kicker. A register keyed on open questions cannot be misread as a shelf
 *      of finished answers; a register keyed on names can.
 *   2. THE ARTIFACT FIELD IS LABELLED `Would produce` (`ARTIFACT_LABEL`), not
 *      by the source's own column header. That header — "Strong visual artifact"
 *      (L403) — describes an artifact that would exist once the study is done.
 *      Printed as a field label it states the artifact is on hand. It is not.
 *      The conditional is the honest tense, and it is baked into the label
 *      rather than left to a component to remember.
 *
 * NO IMAGERY BELONGS TO THIS SECTION, and that is a content fact rather than an
 * art-direction preference. All ten "strong visual artifacts" below are things a
 * FUTURE study would produce. A mockup or placeholder image here would fabricate
 * the exact artifact the section says does not yet exist.
 *
 * CLAIM RULE, in force page-wide (see content.ts): no percentages, money values,
 * annual-loss figures, "verified" wording or certification claims. ONE numeric
 * figure appears in this file — the 48 MW in `ANONYMIZATION.acceptable` — and it
 * is permitted for one narrow reason: it sits inside the source's own
 * ANONYMIZATION EXAMPLE at L430, an illustration of how to describe a site
 * without naming it. It is not an OXOT performance claim, not a fact about any
 * real campus, and must never be extracted into a standalone statistic.
 *
 * `Bilingual` via `same()` (../registry): `nl` renders as English pending the
 * translation pass, and is not a claim that this text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section frame ──────────────────────────────────────────────────────── */

export const CASE_PROGRAMME_SECTION = {
  id: "case-study-programme",
  /** The section's ordinal on the page — a fact about the page, not the estate.
   *  Tenth in the page-structure list at L538–L550. */
  index: "10",
  /* The datum label is SHORTER THAN THE H2, the same shortening
     `ScenarioModel.tsx` makes ("Interactive model" beside the h2 "Interactive
     hyperscale model"). The datum is a chrome strip, not a second title, and
     repeating the h2 verbatim a few millimetres above itself is a duplication
     rather than a label. */
  datumLabel: same("Case studies"),
  /**
   * Source L397, the section's own `##` heading, taken as the h2 because THIS
   * SECTION HAS NO `### Section headline` — the same G3 resolution `content.ts`
   * records for the interactive model. Every other body section on this page
   * carries a quoted headline sentence; this one does not, and writing a
   * headline the brief never states would be inventing page copy.
   */
  heading: same("Case-study programme"),
  /**
   * PROGRAMME STATUS — AUTHORED, NOT TRANSCRIBED, AND FLAGGED AS SUCH.
   *
   * No sentence anywhere in L397–L430 tells a visitor these ten studies have not
   * been published. The source did not need one: it is an internal brief, and
   * "Recommended case-study categories" is unambiguous to the person receiving
   * the recommendation. Rendered on a public page that same table is unambiguous
   * the other way round — ten named studies, each with a question and a
   * described artifact, is the exact layout from which a reader concludes "they
   * have done these". So the status is stated in words rather than left to be
   * inferred from the word "recommended" in an h3.
   *
   * IT GOES IN THE `lead` SLOT AND NOWHERE ELSE: full body size, directly under
   * the h2, above both parts. That placement is the technique
   * `energy-utilities-2/Regulatory.tsx` uses for its own compliance guardrail
   * (its source L265, lead slot, above the caption, never a footnote) — a reader
   * who reads only the headline and the first paragraph still meets it. It is
   * deliberately NOT repeated on each of the ten entries: ten identical
   * disclaimers is the version a reader learns to skip, and it would also make
   * every entry longer than the question it exists to ask.
   */
  lead: same(
    "This is a programme of work, not a library of published results. No case study named below has been published, and nothing here reports a completed engagement — the ten are candidate subjects, listed as the question each would set out to answer."
  )
};

/**
 * NOT VISITOR COPY — A BUILD INSTRUCTION, source L399, transcribed as the
 * instruction it is so it can be checked against what was built rather than
 * paraphrased from memory. It must never be printed on the page: its second and
 * third sentences are addressed to whoever writes the studies, and its first is
 * an assessment of the vertical made to OXOT, not a claim made to a visitor.
 * Same treatment `content.ts` gives L46 and `content.dependency.ts` gives L199.
 */
export const PROGRAMME_NOTE = same(
  "This vertical is well suited to several case studies. Do not publish generic “improved security posture” stories. Use dependency-rich, technically credible decision narratives."
);

/* ── Part A · The record ────────────────────────────────────────────────── */

/**
 * Source L416, the source's own `###` heading for the nine steps.
 *
 * METHOD BEFORE CANDIDATES inverts the source's own block order, and it is the
 * one ordering decision made in this file. The source prints the ten categories
 * (L401) before the template (L416) because it is briefing someone on scope
 * first. A public page has the opposite problem: the ten are the part that can
 * be mistaken for proof, and the template is the part that shows there is a
 * method behind them. Leading with the method means a reader meets "here is how
 * one of these gets built" before "here are ten that could be built". No string
 * is reordered, summarised or dropped by this — only which of the source's two
 * blocks renders first.
 */
export const TEMPLATE_HEADING = same("Case-study template");

/**
 * The nine steps, source L419–L427, verbatim and in the source's own order.
 *
 * A NUMBERED `<ol>` IS THE HONEST ELEMENT HERE, and the distinction matters on a
 * page that otherwise avoids numbered lists. These steps are genuinely ordered —
 * step 7 is the decision, step 9 is what changed afterwards — so the sequence is
 * part of the content rather than a presentational choice.
 */
export const TEMPLATE_STEPS: readonly Bilingual[] = [
  /** Source L419. */
  same("Operational / commercial question"),
  /** Source L420. */
  same("Facility scope and constraints"),
  /** Source L421. */
  same("Systems and dependencies modeled"),
  /** Source L422. */
  same("Cyber pathway or change considered"),
  /** Source L423. */
  same("Physical / availability consequence"),
  /** Source L424. */
  same("Candidate controls or investment options"),
  /** Source L425. */
  same("Chosen decision and implementation sequence"),
  /** Source L426. */
  same("Evidence created for operations, security, procurement, and assurance"),
  /** Source L427. */
  same("What changed in the live environment")
];

/**
 * THE ANONYMIZATION RULE AS A REAL WORKED CONTRAST, source L430 — the one
 * sentence in this section that already contains its own before and after.
 *
 * The source does not merely state a rule; it supplies BOTH sides of it, the
 * acceptable form and the unacceptable one, as quoted examples. So the page
 * renders both, verbatim, as the pair the source wrote. Rendering the rule and
 * paraphrasing the examples would throw away the only worked demonstration in
 * the section, and inventing a third example to "balance" the pair would be
 * fabricating source material. There are exactly two, because the source gives
 * exactly two.
 *
 * THE TWO LABELS ARE THE SOURCE'S OWN ADJECTIVES, lifted from the same sentence
 * — "anonymized but technically specific" and "vague claims" — rather than a
 * good/bad judgement written here. L430 is the only place either phrase comes
 * from.
 *
 * The 48 MW figure inside `acceptable` is permitted under the page's claim rule
 * only in this framing: it is part of the source's illustration of how to
 * describe a site without naming it. See this file's head comment.
 *
 * ONE PUNCTUATION DECISION, RECORDED SO IT IS NOT MISTAKEN FOR A SLIP. L430
 * closes each example inside its quotation marks with the sentence's own
 * punctuation — a comma after "…BMS engineering path," and a full stop after
 * "a global client." Neither mark belongs to the example; both terminate L430's
 * sentence around it. Both are therefore dropped, symmetrically. Keeping them
 * would print a stray comma mid-pane and give one example a full stop the other
 * lacks.
 */
export const ANONYMIZATION = {
  /** Source L430, the rule's own opening clause, verbatim. */
  rule: same(
    "Where confidentiality prevents named publication, use an anonymized but technically specific format:"
  ),
  /** Source L430's own adjectives for the acceptable form. */
  acceptableLabel: same("Anonymized but technically specific"),
  /** Source L430, the acceptable example, verbatim and complete. */
  acceptable: same("A 48 MW, water-cooled campus with N+1 cooling and a shared BMS engineering path"),
  /** Source L430's own words for what the rule rejects. */
  unacceptableLabel: same("Vague claims"),
  /** Source L430, the unacceptable example, verbatim. */
  unacceptable: same("a global client")
};

/* ── Part B · The ten candidates ────────────────────────────────────────── */

/** Source L401, the source's own `###` heading for the table. The word
 *  "Recommended" is load-bearing and is why it is kept rather than shortened. */
export const CANDIDATES_HEADING = same("Recommended case-study categories");

/**
 * The label on each candidate's artifact field. AUTHORED — see this file's head
 * comment: the source's own column header at L403, "Strong visual artifact",
 * read as a field label asserts the artifact exists. "Would produce" is the
 * conditional the rest of the section is written in.
 */
export const ARTIFACT_LABEL = same("Would produce");

export interface Candidate {
  /** DOM key, derived from the source's own case-study name. */
  id: string;
  /** Source column 1, the case-study name. A KICKER, never the entry's title —
   *  see this file's head comment. */
  name: Bilingual;
  /** Source column 2, the primary question. THE ENTRY'S TITLE. */
  question: Bilingual;
  /** Source column 3, the artifact the study would produce. Rendered under
   *  `ARTIFACT_LABEL`, never presented as an artifact on hand. */
  artifact: Bilingual;
}

/** Ten candidates, source L405–L414, in the source's own row order. Nothing is
 *  ranked, scored, prioritised or marked as nearer to publication than another —
 *  the source states no such ordering and none is invented. */
export const CANDIDATES: readonly Candidate[] = [
  {
    /** Source L405. */
    id: "bms-remote-access-redesign",
    name: same("BMS remote-access redesign"),
    question: same("How can OEM support remain available without persistent access to critical controls?"),
    artifact: same("Before/after BMS network-and-control pathway")
  },
  {
    /** Source L406. */
    id: "epms-switchgear-control-isolation",
    name: same("EPMS and switchgear-control isolation"),
    question: same(
      "Which monitoring, engineering, and switching paths must be separated to reduce common-mode electrical risk?"
    ),
    artifact: same("Single-line diagram synchronized with OT zones")
  },
  {
    /** Source L407. */
    id: "cooling-control-common-mode-analysis",
    name: same("Cooling-control common-mode analysis"),
    question: same(
      "Could one BMS, controller firmware, or management path compromise multiple redundant cooling trains?"
    ),
    artifact: same("Cooling topology and common-mode dependency graph")
  },
  {
    /** Source L408. */
    id: "ups-battery-controller-lifecycle-decision",
    name: same("UPS / battery controller lifecycle decision"),
    question: same(
      "Which firmware, vendor, and maintenance dependencies create shared risk across A/B power?"
    ),
    artifact: same("A/B power-path map with shared dependencies highlighted")
  },
  {
    /** Source L409. */
    id: "liquid-cooling-readiness-for-ai-halls",
    name: same("Liquid-cooling readiness for AI halls"),
    question: same(
      "How do CDU, manifold, leak-detection, and high-density-rack control paths change availability exposure?"
    ),
    artifact: same("Rack-to-CDU-to-plant thermal dependency model")
  },
  {
    /** Source L410. The arrows are the source's own, and the sequence they
     *  describe IS the artifact — they are transcribed, not restyled. */
    id: "utility-event-resilience-exercise",
    name: same("Utility-event resilience exercise"),
    question: same(
      "What happens when a grid event coincides with reduced BMS/EPMS visibility or remote-access failure?"
    ),
    artifact: same(
      "Timeline: utility event → generator/UPS sequence → operator actions → capacity outcome"
    )
  },
  {
    /** Source L411. */
    id: "data-center-expansion-commissioning-boundary",
    name: same("Data-center expansion / commissioning boundary"),
    question: same(
      "How do temporary systems, contractor laptops, and new-hall controls enter the live estate safely?"
    ),
    artifact: same("Construction-to-operations trust-boundary diagram")
  },
  {
    /** Source L412. */
    id: "sovereign-workload-facility-dependency",
    name: same("Sovereign workload facility dependency"),
    question: same(
      "What shared facility or privileged-access dependencies can affect a regulated/sensitive workload zone?"
    ),
    artifact: same("Shared-services and isolation-boundary graph")
  },
  {
    /** Source L413. */
    id: "supply-chain-exposure-across-a-standardized-fleet",
    name: same("Supply-chain exposure across a standardized fleet"),
    question: same(
      "Which components, firmware, support tools, and supplier relationships create fleet-wide common mode?"
    ),
    artifact: same("SBOM/HBOM/CBOM and vendor-dependency graph")
  },
  {
    /** Source L414. */
    id: "energy-water-reporting-evidence-model",
    name: same("Energy/water reporting evidence model"),
    question: same(
      "Can sustainability metrics be traced to the meters, systems, control assumptions, and site boundaries that produce them?"
    ),
    artifact: same("PUE/WUE evidence chain from meter to report")
  }
];
