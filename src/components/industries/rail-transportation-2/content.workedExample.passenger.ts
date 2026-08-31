/**
 * S08 · WORKED USE CASE, PASSENGER TRANSIT — source L241–L308 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_rail-transportation.md`.
 * Owned by `WorkedExamplePassenger.tsx`.
 *
 * SPLIT FROM FREIGHT AT THE PAGE'S OWN SEAM, not merely at the 500-line cap.
 * `content.workedExample.freight.ts` is S09's half. The split follows the one
 * the source itself insists on: L3 opens by refusing to let passenger and
 * freight "read as one generic 'transport' offering", and L169 goes further —
 * freight must be "a dedicated subpage or major tab, not a paragraph under
 * passenger rail". Two worked examples in one file would be the two segments
 * sharing a record again, which is the shape the brief spends its opening
 * paragraph rejecting. `content.scenarios.passenger.ts` /
 * `content.scenarios.freight.ts` already cut S05/S06 the same way.
 *
 * THE FIVE STAGE LABELS ARE THE SOURCE'S OWN `###` HEADINGS, not a machine
 * invented for this section: Scenario (L249), Inputs to the Twin (L255),
 * Modelled chain (L280), Controls tested (L296), Result message (L306). The
 * section renders them in that order because that is the order the source sets
 * them in, and together they already form the pipeline the section is — what
 * evidence goes in, what the model traces, what is tested against the trace,
 * what comes out.
 *
 * NO FABRICATED RAIL FACT ANYWHERE. `Rule.tsx` states the rule for this page:
 * no aspect, no train number, no headway figure, no subdivision name, no
 * territory ID. This file names no line, operator, city, vendor, product or
 * interlocking, because the source names none — L251's subject is "a
 * metropolitan rail operator" and stays that way here.
 *
 * CLAIM RULE IN FORCE (`OXOT_Visual_Foundation_Spec.md` L401, restated in
 * `content.ts`): no percentage, money value, annual-loss figure or "verified"
 * language appears below. L300's "May reduce cyber exposure while increasing
 * operational recovery risk" is transcribed with its hedge intact — the source
 * writes "May", and hardening it to "reduces" would manufacture a claim.
 *
 * `Bilingual`-typed prose via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section shell ───────────────────────────────────────────────────────── */

export const PASSENGER_EXAMPLE_SECTION = {
  id: "worked-example-passenger",
  /** The section's ordinal on the page — a fact about the page, not the railway. */
  index: "08",
  /** Short section name at the head of the block run. */
  datumLabel: same("Worked example — passenger"),
  /** Source L245, verbatim. */
  heading: same(
    "Worked example: redesign signaling-vendor access without affecting service recovery."
  )
};

/**
 * Source L247 states this claim boundary as "Illustrative scenario—no customer
 * data." (unspaced dash, terminal period). RESOLVED IN FAVOUR OF THE SITE-WIDE
 * CONTRACT STRING, not the source's local punctuation — orchestrator decision.
 *
 * `OXOT_Layout_Styles.md` fixes this exact claim boundary as a load-bearing,
 * required literal ("Illustrative scenario — no customer data", spaced dash,
 * no period) precisely because it is not this page's own copy: it is the
 * `TwinScenario` contract's disclaimer, printed identically everywhere an
 * illustrative Twin scenario appears — `ScenarioTrace.tsx` (S05, this page),
 * `HeroCanvas.tsx` (S00, this page), and every sibling industry page's own
 * `ScenarioTrace`/`CascadeCanvas`/`ProcessLineCanvas`, all spaced/no-period.
 * `water-wastewater-3/content.scenario.ts` hit the identical source-vs-contract
 * mismatch at its own L207 and records the same resolution. A brief's local
 * wording of a fixed UI contract string is not new content to transcribe —
 * it is the same disclaimer, and the contract's spelling wins so the page does
 * not print the same claim boundary two different ways.
 */
export const PASSENGER_CLAIM_BOUNDARY = same("Illustrative scenario — no customer data");

/* ── Stage labels · the source's own `###` headings ──────────────────────── */

export const STAGE_LABELS = {
  /** Source L249. */
  scenario: same("Scenario"),
  /** Source L255. */
  inputs: same("Inputs to the Twin"),
  /** Source L280. */
  chain: same("Modelled chain"),
  /** Source L296. */
  controls: same("Controls tested"),
  /** Source L306. */
  result: same("Result message")
};

/* ── Stage 1 · Scenario ──────────────────────────────────────────────────── */

/**
 * L251 and L253, verbatim, kept as the source's own two paragraphs.
 *
 * THE SECOND PARAGRAPH IS THE CONFLICT, and it is why the section carries five
 * candidate controls rather than one recommendation: security's proposal and
 * rail operations' objection are both stated, and neither is resolved until
 * L308. Merging the two into one block would let the objection read as an
 * afterthought to the finding instead of as the constraint every candidate
 * below is scored against.
 */
export const PASSENGER_SCENARIO: readonly Bilingual[] = [
  same(
    "A metropolitan rail operator uses a vendor-managed maintenance connection to support CBTC wayside equipment, interlocking tools, and selected control-center engineering systems. The original access design was built during commissioning and has accumulated exemptions: persistent vendor credentials, broad network visibility, and maintenance connections that cross more than one operational zone."
  ),
  same(
    "A security review recommends immediately severing remote vendor connectivity. Rail operations objects because the vendor may be needed to diagnose faults, restore service after a signal failure, support overnight maintenance possessions, or validate changes during a service incident."
  )
];

/* ── Stage 2 · Inputs to the Twin ────────────────────────────────────────── */

export interface EvidenceGroup {
  id: string;
  /** The group's own heading line inside the source's fenced block. */
  name: Bilingual;
  /** The group's `- ` items, verbatim and in source order. */
  items: readonly Bilingual[];
}

/**
 * The three evidence groups of the fenced block at L257–L278 — fifteen items,
 * transcribed verbatim and in the source's own order. Nothing is summarised,
 * merged, re-grouped or added.
 *
 * THE GROUPS ARE THE SOURCE'S, NOT A TAXONOMY INVENTED HERE. Each group's
 * heading line is the one the block itself prints (L258, L266, L273), and the
 * item counts are uneven BY THE SOURCE — six, then five, then four. That
 * unevenness is left alone: padding the shorter groups to six so three columns
 * would set flush is exactly the filler this page refuses everywhere else.
 */
export const PASSENGER_INPUTS: readonly EvidenceGroup[] = [
  {
    id: "operations-engineering",
    /** Source L258. */
    name: same("Rail operations and engineering evidence"),
    /** Source L259–L264. */
    items: [
      same("Signaling block / interlocking diagrams"),
      same("CBTC or ATS architecture"),
      same("Train-control zones and communication boundaries"),
      same("Operating timetable, headway, and degraded-mode procedures"),
      same("Safety-case and hazard-log context"),
      same("Critical junction, terminal, depot, and tunnel dependencies")
    ]
  },
  {
    id: "ot-network",
    /** Source L266. */
    name: same("OT and network evidence"),
    /** Source L267–L271. */
    items: [
      same("Vendor remote-access route and jump hosts"),
      same("Engineering workstations and configuration tools"),
      same("Wayside controllers, zone controllers, interlockings, OCC connections"),
      same("Firewalls, VLANs, routing, required communications, and observed traffic"),
      same("Identity, approval, session-recording, and maintenance workflow data")
    ]
  },
  {
    id: "operational-consequence",
    /** Source L273. */
    name: same("Operational-consequence evidence"),
    /** Source L274–L277. */
    items: [
      same("Service disruption assumptions"),
      same("Headway reduction / line-closure effects"),
      same("Passenger crowding and emergency-operations dependencies"),
      same("Recovery time, vendor-response, and field-intervention requirements")
    ]
  }
];

/* ── Stage 3 · Modelled chain ────────────────────────────────────────────── */

/**
 * The six steps of the fenced chain at L283–L293, verbatim and in order.
 *
 * SIX STEPS, STRICTLY LINEAR. The source draws one arrow between each pair and
 * no branch, fan-out or rejoin anywhere — see `WorkedExampleKit.tsx` for why
 * that property decides the drawing.
 *
 * THE LAST STEP IS WHERE THE CHAIN LEAVES THE NETWORK. Steps one to five name
 * systems and system states; step six names service consequence and cost. That
 * boundary is the source's own, and it is the same boundary the hero's cascade
 * crosses at its final stage (L56) — so the renderer may mark it, because it is
 * a fact about the chain rather than an emphasis invented for the page.
 */
export const PASSENGER_CHAIN: readonly Bilingual[] = [
  same("Compromised vendor credential or remote-support endpoint"),
  same("Remote-access gateway / maintenance jump host"),
  same("Reachable signaling engineering workstation or configuration environment"),
  same("Potential impact on CBTC / interlocking / wayside configuration pathway"),
  same("Degraded train-control operation, service restriction, or recovery complication"),
  same("Capacity loss, passenger disruption, safety-management burden, and restoration cost")
];

/* ── Stage 4 · Controls tested ───────────────────────────────────────────── */

/** The three column labels of the source table at L298, verbatim, carried as
 *  data so the component cannot quietly reword them. */
export const CONTROL_FIELD_LABELS = {
  candidate: same("Candidate control"),
  tests: same("What the Twin tests"),
  insight: same("Decision insight")
};

export interface ControlTested {
  id: string;
  /** Source column 1, "Candidate control", verbatim. */
  candidate: Bilingual;
  /** Source column 2, "What the Twin tests", verbatim. */
  tests: Bilingual;
  /** Source column 3, "Decision insight", verbatim. */
  insight: Bilingual;
}

/**
 * All five rows of the source table at L300–L304 — fifteen cells, transcribed
 * verbatim: nothing summarised, shortened, reordered, or invented.
 *
 * NOTHING IS RANKED AND NOTHING IS RECOMMENDED HERE. The five are peers in the
 * source; the answer the section arrives at is L308's result message, which is
 * a combination rather than a winner among these rows. Marking one row as the
 * chosen control would contradict the result the section closes on — L308's
 * recommendation is explicitly not "disconnect the vendor", which is row one.
 */
export const PASSENGER_CONTROLS: readonly ControlTested[] = [
  {
    id: "eliminate-remote-access",
    /** Source L300. */
    candidate: same("Eliminate remote vendor access"),
    tests: same(
      "Whether fault diagnosis and safe restoration become too slow or require impractical on-site response"
    ),
    insight: same("May reduce cyber exposure while increasing operational recovery risk")
  },
  {
    id: "brokered-access",
    /** Source L301. */
    candidate: same("Introduce brokered access"),
    tests: same(
      "MFA, named accounts, approval, just-in-time sessions, jump host, recording, and role/asset restrictions"
    ),
    insight: same("Preserves controlled support while eliminating persistent broad pathways")
  },
  {
    id: "re-zone-maintenance",
    /** Source L302. */
    candidate: same("Re-zone the signaling maintenance environment"),
    tests: same("Virtual firewalls, required management/control flows, and remaining routes"),
    insight: same("Identifies which segmentation rules preserve signaling and diagnostic needs")
  },
  {
    id: "separate-tooling",
    /** Source L303. */
    candidate: same("Separate engineering tooling"),
    tests: same(
      "Boundaries among vendor systems, engineering workstations, production signaling networks, and data-transfer services"
    ),
    insight: same("Reduces route reachability and makes change control more defensible")
  },
  {
    id: "stage-the-program",
    /** Source L304. */
    candidate: same("Stage the program"),
    tests: same("Implement access control now; make deeper segmentation during planned possessions"),
    insight: same(
      "Balances near-term risk reduction against safety-case, service, and testing constraints"
    )
  }
];

/** Sits under the table as its `<caption>`. Names what the matrix is and what
 *  it is not; adds no claim the matrix does not already make. */
export const PASSENGER_CONTROLS_CAPTION = same(
  "Five candidate controls, each tested against the modelled chain above. None is the section's recommendation on its own."
);

/* ── Stage 5 · Result message ────────────────────────────────────────────── */

/** Source L308, verbatim, the source's own curly quotation marks intact. */
export const PASSENGER_RESULT = same(
  "The recommended decision is usually not “disconnect the vendor.” It is: remove persistent reachability, preserve accountable and time-limited expert support, prove that required signaling and recovery flows remain viable, and implement deeper network changes in a planned possession with appropriate safety assurance."
);
