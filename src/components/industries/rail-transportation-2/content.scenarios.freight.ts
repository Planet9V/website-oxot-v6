/**
 * S06 · US FREIGHT-RAIL CYBER SCENARIOS — source L211–L224 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_rail-transportation.md`.
 * Owned by `FreightScenarios.tsx`.
 *
 * SPLIT OUT OF `content.scenarios.ts`, which held both this section and S05's
 * passenger register in one file. That file crossed this project's 500-line
 * cap (CLAUDE.md) once both sections were built; `content.scenarios.passenger.ts`
 * is S05's half.
 *
 * WHY THIS SECTION DOES NOT TYPE AGAINST `RailScenario` (the passenger file's
 * row shape). `RailScenario` is the row shape of a MASTER/DETAIL interactive:
 * `entryPoint` is a register-list sub-line, and `diagramTitle` / `assets` /
 * `paths` / `noGraphReason` exist to feed `ScenarioTrace.tsx`'s trace pane. S06
 * renders no trace pane and no graph — it is a banded register showing all
 * eight scenarios and all four of their fields at once, and the reason it must
 * NOT repeat S05's mechanism is argued in `FreightScenarios.tsx`. Borrowing
 * the shape anyway would force eight fabricated `entryPoint` labels and eight
 * empty `assets`/`paths` arrays into this file purely to satisfy a type, and
 * would pull `@/components/twin/types` into a section that draws nothing from
 * it. The two tables share four SOURCE columns, which the two interfaces both
 * carry verbatim; they do not share a page mechanism, so they do not share a
 * row type.
 *
 * THE COLUMN NAMES ARE NOT IDENTICAL EITHER: column 3 of the passenger table
 * (L153) is "Operational impact", but column 3 of the FREIGHT table (L213) is
 * "Freight impact". `FREIGHT_SCENARIO_FIELD_LABELS` below prints the freight
 * table's own wording, so the two are not conflated on the page.
 *
 * `Bilingual`-typed prose via `same()`; `nl` is a same-as-English placeholder
 * pending translation, per ../registry.ts.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export const FREIGHT_SCENARIOS_SECTION = {
  id: "freight-scenarios",
  /** The section's ordinal on the page — a fact about the page, not the railway. */
  index: "06",
  /** Short section name at the head of the block run. */
  datumLabel: same("Freight scenarios"),
  /** Source L211, verbatim. Same resolution the passenger set records above:
   *  L167's `### Section headline` belongs to the whole US-freight block —
   *  architecture (L171), operational concerns (L196) and scenarios (L211)
   *  together — so claiming it for a scenarios-only section would print a scope
   *  this section does not have. */
  heading: same("Freight-rail cyber scenarios"),
  /** Source L169, second sentence, verbatim — the brief's own statement of why
   *  freight is a distributed operating system rather than one plant, which is
   *  exactly what the banded treatment answers. Not a `### Section headline`, so
   *  taking it here claims nothing from another section. */
  lead: same(
    "Its core operating model differs: long corridors, dispatching territories, PTC interoperability, locomotives and wayside assets, yards, grade crossings, customers, terminals, and Class I/short-line boundaries all form a large, distributed cyber-physical system."
  )
};

/** The three non-name column labels of the source table at L213, verbatim,
 *  carried as data so the component cannot quietly reword them. */
export const FREIGHT_SCENARIO_FIELD_LABELS = {
  pathway: same("Cyber / OT pathway"),
  impact: same("Freight impact"),
  decision: same("Twin-supported decision")
};

/**
 * Which tier of the freight OT stack a scenario's equipment sits in.
 *
 * THE IDS ARE THE FREIGHT STACK'S OWN TIER IDS, defined in
 * `content.architecture.ts` (`STACK_BY_SEGMENT.freight.tiers`, source L173–194).
 * They are repeated here as a union only so a mis-typed tier is a compile error
 * rather than a silently empty band; the tier NAMES and the band ORDER are read
 * from that file at render time and never restated here, so S03's stack and
 * S06's bands cannot drift apart.
 */
export type FreightTierId =
  | "enterprise"
  | "dispatch"
  | "ptc"
  | "wayside"
  | "rolling-stock"
  | "yard-ot";

export interface FreightScenario {
  id: string;
  /** Editorial placement — see the note on `FREIGHT_SCENARIOS`. */
  tier: FreightTierId;
  /** Source column 1, "Scenario", verbatim. */
  name: Bilingual;
  /** Source column 2, "Cyber / OT pathway", verbatim. */
  pathway: Bilingual;
  /** Source column 3, "Freight impact", verbatim. */
  impact: Bilingual;
  /** Source column 4, "Twin-supported decision", verbatim. */
  decision: Bilingual;
}

/**
 * All eight rows of the source table at L215–L222 — thirty-two cells,
 * transcribed verbatim: nothing summarised, shortened, reordered, and no fifth
 * prose field invented.
 *
 * THE `tier` FIELD IS THE ONE THING HERE THE SOURCE DOES NOT STATE, and it is
 * an editorial placement rather than a claim about the railway — the brief's
 * scenario table is flat. Each placement is made on the EQUIPMENT THE
 * SCENARIO'S OWN TEXT NAMES matching the equipment the brief's own freight
 * stack lists in that tier (L173–L194), so every one is checkable against the
 * source rather than asserted:
 *
 *   wayside        L184 lists "interlockings • signal houses • WIUs • grade
 *                  crossings" — where `ptc-wayside-wiu` ("a WIU or PTC-related
 *                  equipment"), `signal-house-access` ("signal maintenance
 *                  network, interlocking tooling, or field controller") and
 *                  `grade-crossing` ("crossing controller") each name their
 *                  equipment. `ptc-wayside-wiu` is filed on its EQUIPMENT, not
 *                  on the acronym in its title: it is about a wayside
 *                  component, and PTC's back-office side is the next row.
 *   ptc            L181 lists "Back office server • key management • PTC
 *                  message routing" — `ptc-back-office` names all three.
 *   dispatch       L178 lists "CAD / dispatch • traffic management" —
 *                  `dispatch-cad` names both.
 *   rolling-stock  L188–L189 list the locomotive onboard computer and onboard
 *                  diagnostics — `locomotive-maintenance` reaches "onboard
 *                  diagnostic systems".
 *   yard-ot        L192–L193 list "Yard automation • fueling • shop systems"
 *                  and "Power inverters • battery systems" — `yard-terminal`
 *                  and `power-inverter` name those lists almost word for word.
 *
 * NO SCENARIO LANDS IN THE `enterprise` TIER (L174–L175: customer portals,
 * waybill/billing, crew systems, identity). That is a real property of the
 * brief's own table, not an omission here, and the component states it on the
 * page rather than letting a missing band pass unremarked.
 *
 * NOTHING IS RANKED. The eight are peers in the source and stay peers here; the
 * band a row sits in is a location in the stack, not a priority.
 */
export const FREIGHT_SCENARIOS: readonly FreightScenario[] = [
  {
    id: "ptc-wayside-wiu",
    tier: "wayside",
    /** Source L215. */
    name: same("PTC wayside / WIU exposure"),
    pathway: same(
      "A remote maintenance path, weak interface, or compromised wayside component affects a WIU or PTC-related equipment"
    ),
    impact: same(
      "Train restrictions, unnecessary enforcement/braking, PTC availability loss, dispatch complexity; integrity risk requires safety analysis"
    ),
    decision: same(
      "Model actual reachability, communication dependencies, and safe containment sequence"
    )
  },
  {
    id: "ptc-back-office",
    tier: "ptc",
    /** Source L216. */
    name: same("PTC back-office or key-management disruption"),
    pathway: same(
      "Compromise/ransomware impacts PTC back-office servers, message routing, certificate/key services, or integration services"
    ),
    impact: same(
      "Large-scale PTC degradation, movement restrictions, dispatch delays, cross-network effects"
    ),
    decision: same("Identify recovery order, isolation boundaries, and failover requirements")
  },
  {
    id: "dispatch-cad",
    tier: "dispatch",
    /** Source L217. */
    name: same("Dispatch / CAD environment disruption"),
    pathway: same(
      "Compromise affects train dispatch, traffic-management, route-planning, or supporting identity/data services"
    ),
    impact: same(
      "Reduced ability to authorize/manage movement, manual-workload increase, congestion, delayed recovery"
    ),
    decision: same("Model IT/OT dependencies and staged recovery path")
  },
  {
    id: "signal-house-access",
    tier: "wayside",
    /** Source L218. */
    name: same("Signal-house or interlocking remote access"),
    pathway: same(
      "Unauthorized access reaches signal maintenance network, interlocking tooling, or field controller"
    ),
    impact: same(
      "Route restrictions, safe-stop behavior, reduced capacity, field-recovery requirement"
    ),
    decision: same("Test secure remote-access and segmentation architecture")
  },
  {
    id: "grade-crossing",
    tier: "wayside",
    /** Source L219. */
    name: same("Grade-crossing system compromise"),
    pathway: same(
      "Path affects crossing controller, telemetry, monitoring, or maintenance interface"
    ),
    impact: same(
      "Public safety risk, road/rail disruption, false activation or failed status visibility"
    ),
    decision: same("Prioritize by crossing criticality, physical safeguards, and reachable paths")
  },
  {
    id: "locomotive-maintenance",
    tier: "rolling-stock",
    /** Source L220. */
    name: same("Locomotive maintenance / diagnostic compromise"),
    pathway: same(
      "Maintenance laptop, vendor tool, Wi-Fi/cellular interface, or shop network reaches onboard diagnostic systems"
    ),
    impact: same(
      "Locomotive unavailability, configuration integrity concern, fleet maintenance delay"
    ),
    decision: same("Map shop-to-locomotive trust pathways and control programming access")
  },
  {
    id: "yard-terminal",
    tier: "yard-ot",
    /** Source L221. */
    name: same("Yard / terminal OT disruption"),
    pathway: same(
      "Attack affects yard automation, fueling, inspection, transload, crane, gate, or shop systems"
    ),
    impact: same(
      "Congestion, dwell increase, customer delays, hazardous-material handling disruption"
    ),
    decision: same("Compare recovery investment against network-wide delay consequence")
  },
  {
    id: "power-inverter",
    tier: "yard-ot",
    /** Source L222. */
    name: same("Power inverter / battery-system exposure"),
    pathway: same(
      "Networked inverter or battery-management system in operating environment is accessible via unused services or weak identity controls"
    ),
    impact: same("Availability loss or safety/recovery complication in support infrastructure"),
    decision: same("Inventory, segment, remove unused communications, test MFA/logging controls")
  }
];

/** Sits above the bands. A page that files the brief's flat table into tiers
 *  owes the reader a line saying that is what it did. */
export const FREIGHT_BAND_CAPTION = same(
  "Filed by the tier of the freight OT stack the scenario's own equipment sits in."
);

/** The brief's table has no row landing on the enterprise tier. Stated rather
 *  than left as a silent gap — see the note on `FREIGHT_SCENARIOS`. */
export const FREIGHT_BAND_GAP_NOTE = same(
  "No scenario in this set reaches the enterprise, customer, and logistics tier, so that tier carries no band here."
);

/** Source L224, verbatim, both sentences. The brief's own closing synthesis for
 *  this table — it is why the WIU row above is not simply a CVE — so it belongs
 *  after the register rather than before it. */
export const FREIGHT_SCENARIOS_CLOSING = same(
  "A modern freight rail environment joins digital train-control networks, SCADA/ICS, signaling, communications, and long-lived field equipment. For PTC, attacks on a wayside interface unit can cause unnecessary stopping in fail-safe scenarios or create more serious safety concerns depending on system and control conditions; the point is to model the route, safety architecture, and operational consequence rather than infer risk from the CVE alone."
);
