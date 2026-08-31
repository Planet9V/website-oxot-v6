/**
 * S03 · TYPICAL OT ARCHITECTURE, SEGMENT-SELECTED — source L113–136 (passenger)
 * and L171–194 (freight) of new_material_source/1_website_layout_v4/
 * 3_industries/industry_rail-transportation.md.
 *
 * Split out of `content.ts` along the section boundary, per that file's own
 * statement that the two OT architectures live in a sibling
 * `content.<section>.ts`.
 *
 * WHAT THE SOURCE SUPPLIES HERE, AND WHY THIS SECTION IS A REAL INTERACTIVE.
 * Unlike the energy brief — which asks for five segments and then supplies ONE
 * stack, forcing four fifths of that page's diagram to sit inert — this brief
 * supplies TWO COMPLETE STACKS, one per segment, at L115–136 and L173–194.
 * Every tier's contents differ between them. So the selector here changes the
 * whole canvas, not a strip of it, and there is no "common tier" note to write
 * because there is no common tier.
 *
 * THE TWO STACKS ARE BOTH SIX DEEP BUT THEIR TIERS ARE NOT A ONE-TO-ONE MAP,
 * and `PARALLEL_NOTE` says so on the page rather than letting the shared canvas
 * imply an alignment the source does not state. Read down the two source blocks:
 *
 *   passenger  enterprise → operations/security boundary → operations control
 *              centre → train control & signalling → station & infrastructure
 *              OT → rolling stock & depots
 *   freight    enterprise → dispatch & railroad operations → PTC & train-control
 *              services → wayside & territory → rolling-stock systems → yard,
 *              terminal & infrastructure OT
 *
 * Passenger tier 2 is an explicit security boundary (SOC, remote access, jump
 * hosts, operational DMZ, L119–120); freight names no equivalent tier and puts
 * dispatch there instead. Passenger reaches its facility-side OT at tier 5 and
 * ends on rolling stock; freight reaches rolling stock at tier 5 and ends on
 * yard/terminal OT. Forcing those into aligned rows — or drawing a Purdue
 * ladder with zone numbers over them — would print a structural claim the
 * source does not make. The tiers are therefore drawn in each stack's own
 * source order, under each stack's own source names.
 *
 * TRANSCRIPTION RULE: every tier name and every element below is the source's
 * own string, taken from the code fence at the cited lines. `rows` preserves the
 * source's own line breaks inside a tier — where the brief prints a tier's
 * elements across two lines (e.g. L126–127, L184–185), that grouping is kept
 * rather than flattened, because the second line is a coherent group in each
 * case (communications and detection; comms infrastructure) rather than an
 * arbitrary wrap. Nothing is added, reordered within a line, or renamed.
 *
 * SEGMENTS AND DEFAULT_SEGMENT ARE NOT REDECLARED HERE. They come from
 * `content.ts`, which exists precisely so the hero's toggle and this one cannot
 * drift apart. This file only supplies what the two segments SELECT.
 *
 * CLAIM RULE IN FORCE (OXOT_Visual_Foundation_Spec.md L401): nothing here
 * carries a percentage, a money value or "verified" language. Nothing here
 * asserts a zone number, a conduit boundary, a headway, an aspect or any other
 * engineering fact the source does not print.
 *
 * `Bilingual`-typed prose via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const ARCH_SECTION = {
  id: "architecture",
  /** The section's ordinal on the page — a fact about the page, not the railway. */
  index: "03",
  /** The source's own name for this content, shared by both stacks (L113, L171). */
  datumLabel: same("OT architecture"),
  /* THE BRIEF SUPPLIES NO HEADLINE FOR THIS SECTION. Sector reality (L79),
     passenger (L109) and freight (L167) each get a `### Section headline`; the
     architecture blocks get only the subsection titles at L113 and L171. Rather
     than write a sentence the source does not contain, the h2 is assembled from
     those two titles verbatim — which is also exactly what the section is. */
  heading: same("Passenger / transit and freight-rail OT architecture")
};

/** The radiogroup's accessible name. The brief specifies no wording for it
 *  (flagged as a gap in content.ts), so it names the control's function rather
 *  than borrowing prose that means something else. */
export const SELECTOR_LABEL = same("Rail segment");

/** Sits under the selector. States the honest structural relationship between
 *  the two stacks — see this file's head comment. */
export const PARALLEL_NOTE = same(
  "Both segments run six tiers, and every tier changes with the selection. The tiers do not line up one-to-one: passenger rail names an explicit operations and security boundary below the enterprise, and ends on rolling stock and depots; freight rail puts dispatch there, and ends on yard, terminal, and infrastructure OT."
);

/** Precedes the live-region line naming the stack currently on the canvas. */
export const STACK_SUMMARY_CAPTION = same("Architecture shown:");

/* ── The stacks (source L115–136, L173–194) ─────────────────────────────── */

/**
 * One tier of a stack. `rows` are equipment and system names — proper nouns and
 * acronyms — so they are plain strings rather than `Bilingual`, the same split
 * the other industry architecture files make. Tier NAMES are prose and are
 * translated. Each inner array is one line of the source's code fence.
 */
export interface Tier {
  id: string;
  name: Bilingual;
  rows: readonly (readonly string[])[];
}

export interface Stack {
  /** The source's own title for this stack. */
  title: Bilingual;
  tiers: readonly Tier[];
}

/** Source L113–136. */
const PASSENGER: Stack = {
  /** Source L113. */
  title: same("Passenger / transit OT architecture"),
  tiers: [
    {
      id: "enterprise",
      /** Source L116. */
      name: same("Enterprise and passenger services"),
      /** Source L117. */
      rows: [["Identity", "corporate IT", "ticketing", "mobile apps", "customer information"]]
    },
    {
      id: "boundary",
      /** Source L119. */
      name: same("Operations and security boundary"),
      /** Source L120. */
      rows: [["SOC", "remote access", "data brokers", "jump hosts", "operational DMZ"]]
    },
    {
      id: "control-centre",
      /** Source L122. */
      name: same("Rail operations control center"),
      /** Source L123. */
      rows: [["ATS", "OCC systems", "CAD / dispatch", "timetable", "incident management"]]
    },
    {
      id: "train-control",
      /** Source L125. */
      name: same("Train control and signaling"),
      /** Source L126–127, kept as the two lines the source prints. */
      rows: [
        ["CBTC zone controllers", "wayside controllers", "interlockings", "ETCS / ATP"],
        ["Radio / wireless train-ground communications", "axle counters", "track circuits"]
      ]
    },
    {
      id: "station-ot",
      /** Source L129. */
      name: same("Station and infrastructure OT"),
      /** Source L130–131. */
      rows: [
        ["Traction power SCADA", "ventilation", "tunnel systems", "platform screen doors"],
        ["CCTV", "public address", "fire/life safety", "elevators / escalators"]
      ]
    },
    {
      id: "rolling-stock",
      /** Source L133. */
      name: same("Rolling stock and depots"),
      /** Source L134–135. */
      rows: [
        ["Onboard controllers", "TCMS", "ATO/ATP equipment", "maintenance laptops"],
        ["Depot SCADA", "wheel lathes", "wash plants", "shore supply"]
      ]
    }
  ]
};

/** Source L171–194. */
const FREIGHT: Stack = {
  /** Source L171. */
  title: same("Freight-rail OT architecture"),
  tiers: [
    {
      id: "enterprise",
      /** Source L174. */
      name: same("Enterprise, customer, and logistics systems"),
      /** Source L175. */
      rows: [["Customer portals", "waybill / billing", "crew systems", "maintenance", "identity"]]
    },
    {
      id: "dispatch",
      /** Source L177. */
      name: same("Dispatch and railroad operations"),
      /** Source L178. */
      rows: [
        ["CAD / dispatch", "traffic management", "train sheets", "crew / locomotive operations"]
      ]
    },
    {
      id: "ptc",
      /** Source L180. */
      name: same("PTC and train-control services"),
      /** Source L181. */
      rows: [["Back office server", "key management", "PTC message routing", "radio networks"]]
    },
    {
      id: "wayside",
      /** Source L183. */
      name: same("Wayside and territory systems"),
      /** Source L184–185. */
      rows: [
        ["CTC", "interlockings", "signal houses", "WIUs", "grade crossings", "defect detectors"],
        ["Communications towers", "base stations", "fiber / microwave / cellular links"]
      ]
    },
    {
      id: "rolling-stock",
      /** Source L187. */
      name: same("Rolling-stock systems"),
      /** Source L188–189. */
      rows: [
        ["Locomotive onboard computer", "PTC onboard equipment", "event recorder"],
        ["Brake systems", "distributed power", "diagnostics", "onboard communications"]
      ]
    },
    {
      id: "yard-ot",
      /** Source L191. */
      name: same("Yard, terminal, and infrastructure OT"),
      /** Source L192–193. */
      rows: [
        ["Yard automation", "fueling", "shop systems", "car inspection", "cranes / transload"],
        ["Power inverters", "battery systems", "facility SCADA"]
      ]
    }
  ]
};

/**
 * Keyed by `SEGMENTS[n].id` in `content.ts` — `passenger` and `freight`. The
 * lookup is by id, never by array position, so a reordering of the toggle
 * cannot silently swap the two architectures.
 */
export const STACK_BY_SEGMENT: Record<string, Stack> = {
  passenger: PASSENGER,
  freight: FREIGHT
};
