/**
 * S09 · WORKED USE CASE, US FREIGHT RAIL — source L310–L345 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_rail-transportation.md`.
 * Owned by `WorkedExampleFreight.tsx`.
 *
 * SPLIT FROM `content.workedExample.passenger.ts` at the seam the source
 * insists on — L3 ("should not read as one generic 'transport' offering") and
 * L169 (freight is "a dedicated subpage or major tab, not a paragraph under
 * passenger rail"). The reasoning is argued in full at the head of the
 * passenger file; the same cut already separates S05 from S06.
 *
 * THIS EXAMPLE IS GENUINELY SHORTER THAN S08, AND THAT IS THE SOURCE'S OWN
 * PROPORTION, NOT AN OMISSION HERE. S08 carries five stages; this one carries
 * three. The source gives freight no `### Section headline`, no "Inputs to the
 * Twin" evidence block and no controls MATRIX — its candidate controls are a
 * flat six-item list (L336–L341) with no per-control "what the Twin tests" or
 * "decision insight" column. `content.ts`'s own docblock already records this
 * asymmetry: the passenger example is the one the brief develops in full, with
 * freight given as the parallel track. Manufacturing the three missing stages
 * so the two sections would set symmetrically is exactly the fabrication this
 * page refuses everywhere else, and it would additionally invent a
 * three-column judgement about six controls that the source states as six
 * sentences. The section is therefore built to be compact, and
 * `WorkedExampleFreight.tsx` says so where the reader can see it.
 *
 * THE STAGE LABELS ARE NOT IMPORTED FROM THE PASSENGER FILE even though two of
 * the three words match. They are cited to different source lines (L314, L320,
 * L334 here; L249, L255, L280, L296, L306 there), this set carries a label that
 * set does not ("Candidate controls"), and that set carries two this one lacks.
 * Two label sets that happen to overlap on two words are not one set, and
 * importing across the seam would rebuild the dependency the split exists to
 * remove.
 *
 * NO FABRICATED RAIL FACT. `Rule.tsx`'s rule for this page is explicit: no
 * aspect, no headway figure, no subdivision name, no territory ID. The source
 * names none — L316's subject is "a freight railroad" operating across "a
 * dispatch territory", and both stay unnamed here. L316's own phrase
 * "variations between subdivisions" is transcribed as written and is not
 * elaborated into named subdivisions.
 *
 * CLAIM RULE IN FORCE (`OXOT_Visual_Foundation_Spec.md` L401): no percentage,
 * money value, annual-loss figure or "verified" language below. L318's
 * "expensive and operationally difficult" is the source's own wording and
 * carries no figure; none is supplied.
 *
 * `Bilingual`-typed prose via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { TSA_DIRECTIVES_URL } from "./content.reality";

/* ── Section shell ───────────────────────────────────────────────────────── */

export const FREIGHT_EXAMPLE_SECTION = {
  id: "worked-example-freight",
  /** The section's ordinal on the page — a fact about the page, not the railway. */
  index: "09",
  /** Short section name at the head of the block run. */
  datumLabel: same("Worked example — freight"),
  /**
   * Source L312's own title for this example, verbatim, with the source's
   * quotation marks dropped because they are its quoting mechanism rather than
   * part of the title. Its terminal period is kept: the source prints it inside
   * the quotes.
   *
   * THE REST OF L312 IS A BUILD INSTRUCTION, NOT COPY, and is deliberately not
   * transcribed as a string. "The freight version should be a separate tab or
   * linked page" tells the builder how to place this example; printing it on
   * the page would show the reader the brief's stapled-on production note. How
   * the instruction is honoured is argued in `WorkedExampleFreight.tsx`.
   */
  heading: same("Secure PTC and dispatching dependencies across the operating territory.")
};

/**
 * The claim boundary, carried onto this section too.
 *
 * A JUDGEMENT CALL, STATED: the source prints its **Label:** *Illustrative
 * scenario—no customer data.* once, at L247, under the PASSENGER worked
 * example, and never restates it for freight. It is applied here anyway,
 * because this example is the same kind of object — a constructed illustration
 * with no named railroad, territory or customer behind it — and an unlabelled
 * worked example reads as a case study drawn from a real engagement. A
 * disclaimer under-applied is a materially worse failure than one applied
 * twice, and applying it invents no claim: it removes one.
 *
 * PUNCTUATION RESOLVED TO THE SITE-WIDE CONTRACT STRING, not L247's local
 * unspaced-dash/period spelling — see the passenger file's `PASSENGER_CLAIM_
 * BOUNDARY` doc comment for why: this disclaimer is `OXOT_Layout_Styles.md`'s
 * fixed `TwinScenario` literal, not page-local prose, and every other instance
 * on this page and every sibling page uses the spaced dash with no period.
 */
export const FREIGHT_CLAIM_BOUNDARY = same("Illustrative scenario — no customer data");

/* ── Stage labels · the source's own `###` headings ──────────────────────── */

export const FREIGHT_STAGE_LABELS = {
  /** Source L314. */
  scenario: same("Scenario"),
  /** Source L320. */
  chain: same("Modelled chain"),
  /** Source L334. */
  controls: same("Candidate controls")
};

/* ── Stage 1 · Scenario ──────────────────────────────────────────────────── */

/**
 * L316 and L318, verbatim, kept as the source's own two paragraphs — the
 * situation, then the decision operations actually has to make. Same reason the
 * passenger file keeps its pair apart: the second paragraph states the
 * constraints, and the six candidate controls below are answers to it.
 */
export const FREIGHT_SCENARIO: readonly Bilingual[] = [
  same(
    "A freight railroad has a remote pathway used for maintenance of field equipment across a dispatch territory. The environment includes PTC-related wayside equipment, signal houses, communications infrastructure, and a dependency on dispatch/traffic-management systems. Asset inventory shows aging field devices, inconsistent remote-access patterns, and variations between subdivisions."
  ),
  same(
    "A security review identifies an exploitable component in a support path. Replacing it across the territory would be expensive and operationally difficult. Operations needs a decision that considers safety, dispatch flow, maintenance access, outage windows, and the effect on trains moving through the territory."
  )
];

/* ── Stage 2 · Modelled chain ────────────────────────────────────────────── */

/**
 * The five steps of the fenced chain at L323–L331, verbatim and in order.
 *
 * FIVE, WHERE THE PASSENGER CHAIN HAS SIX — the source's own difference, not a
 * trimming here. Freight's chain enters directly at the remote-support path
 * (L323) where passenger's separates the compromised credential from the
 * gateway it is used against (L283, L285). Both are strictly linear: one arrow
 * between each pair, no branch or rejoin anywhere, which is what lets the same
 * `ModelledChain` drawing (`WorkedExampleKit.tsx`) serve both.
 *
 * THE LAST STEP IS WHERE THE CHAIN LEAVES THE NETWORK, as in the passenger set:
 * steps one to four name systems and system states, step five names delay,
 * congestion, workload, customer impact and field recovery. The renderer marks
 * that boundary because the source draws it, not for emphasis.
 */
export const FREIGHT_CHAIN: readonly Bilingual[] = [
  same("Compromised remote-support path"),
  same("Signal / communications maintenance environment"),
  same("Reachable wayside equipment, PTC-support component, or field network"),
  same("Movement restriction, signal/interlocking degradation, or PTC availability impact"),
  same("Train delays, congestion, dispatch workload, customer impact, and field recovery needs")
];

/* ── Stage 3 · Candidate controls ────────────────────────────────────────── */

/**
 * All six bullets of L336–L341, verbatim including their terminal periods,
 * which the source writes as full sentences rather than as table cells.
 *
 * NO FOURTH FIELD IS INVENTED. S08's controls carry "What the Twin tests" and
 * "Decision insight" because its source table has those columns; this list has
 * neither, and supplying them would be writing the brief's missing analysis
 * under the brief's name. NOTHING IS RANKED: the six are peers in the source,
 * and the sequencing question is answered by `FREIGHT_RESULT` below, which is
 * about the territory rather than about which control wins.
 */
export const FREIGHT_CONTROLS: readonly Bilingual[] = [
  same("Restrict access through named, time-limited, MFA-protected maintenance sessions."),
  same("Segment field-maintenance networks by territory, function, and criticality."),
  same("Remove unused services from wayside-support infrastructure."),
  same("Separate PTC-support paths from broader enterprise or vendor networks."),
  same("Stage component renewal by safety/operational consequence and true reachability."),
  same(
    "Test recovery sequence for a PTC back-office, dispatch, or territory communications disruption."
  )
];

/* ── The result ──────────────────────────────────────────────────────────── */

/**
 * Source L343, verbatim, as one sentence.
 *
 * KEPT WHOLE, NOT BROKEN INTO ITS FOUR CLAUSES. The sentence names four things
 * the remediation sequence resolves, and splitting them into a four-item list
 * would print an enumerated deliverable the source does not offer — it writes
 * them as one continuous clause describing a single output. The source's bold
 * on "territory-specific remediation sequence" is dropped rather than carried
 * as markup: emphasis inside a content string would need the component to parse
 * the string, and nothing else on this page does that.
 */
export const FREIGHT_RESULT = same(
  "The relevant result is a territory-specific remediation sequence: which remote routes need immediate containment, which devices require planned replacement, what dispatch/field-maintenance dependencies must be preserved, and which legacy assets can remain under compensating controls until a scheduled modernization cycle."
);

/* ── Citation ────────────────────────────────────────────────────────────── */

/**
 * Source L345 — the section's closing citation, and the one outbound link in
 * either worked example.
 *
 * THE URL IS IMPORTED, NOT RETYPED. `content.reality.ts` already exports
 * `TSA_DIRECTIVES_URL` and its own docblock cites this very line: the brief
 * prints the same `[tsa]` label against the same URL at L345 and L384. A second
 * copy of the string here is a second thing that can rot, and S01's citation
 * and this one would then be able to disagree about where TSA's directives
 * live.
 *
 * `sourceLabel` is the publisher's hostname rather than the brief's raw `[tsa]`
 * marker, matching `SectorReality.tsx`'s two citations ("tsa.gov",
 * "eur-lex.europa.eu"). A link labelled "tsa" states less than the page already
 * knows and matches nothing else on it.
 */
export const FREIGHT_CITATION = {
  /** Source L345, first sentence, verbatim. */
  text: same(
    "TSA’s rail cybersecurity directives require covered passenger and freight rail carriers to maintain segmentation, access-control, monitoring, and risk-based patching measures, alongside a TSA-approved implementation plan and recurring assessment program."
  ),
  sourceLabel: same("tsa.gov"),
  href: TSA_DIRECTIVES_URL
};
