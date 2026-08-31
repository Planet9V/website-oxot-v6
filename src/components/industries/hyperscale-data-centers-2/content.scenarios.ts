/**
 * S07 · HYPERSCALE RISK SCENARIOS — source L286–L307 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_hyperscale.md`.
 * Owned by `ScenarioRegister.tsx`; the detail pane is `ScenarioTrace.tsx`.
 *
 * TWELVE ROWS × FOUR COLUMNS = FORTY-EIGHT CELLS, every one transcribed
 * verbatim. `name`, `pathway`, `consequence` and `decision` are the source cells
 * with no word changed, added, reordered or dropped. `entryPoint` is the only
 * extra string per row — a short register sub-line lifted from that row's own
 * pathway sentence, never new content.
 *
 * The typed graph geometry for the five rows that get one lives in
 * `content.scenarios.graphs.ts`; the rule for which rows qualify is stated
 * there, and the seven that do not each carry a `noGraphReason` below.
 *
 * ── THE TWO SCENARIO LISTS ON THIS PAGE ARE SEPARATE BY DESIGN ─────────────
 * `content.ts`'s `MODEL.scenarios` holds NINE scenarios (source L65–L73) that
 * S01's interactive canvas offers. This file holds TWELVE (source L294–L307).
 * They are different lists in different words, and the brief states no mapping
 * between them, so NOTHING here imports, joins, cross-references or
 * deduplicates against `MODEL.scenarios` — that was ruled on before this file
 * was written (gap resolution G1, approved) and it is not an error to fix.
 *
 * The overlap is real and is recorded here so a future reader does not mistake
 * the two-list structure for a missed link. Matched BY CONTENT, never by string:
 *
 *   this file (L294–L307)                    ·  MODEL.scenarios (L65–L73)
 *   BMS vendor remote-access compromise      →  BMS vendor remote access
 *   EPMS / electrical-control path           →  EPMS / switchgear control path
 *   Generator / paralleling-controller       →  Generator or UPS maintenance
 *   UPS / BMS controller firmware issue      →  Generator or UPS maintenance
 *   Cooling-plant control compromise         →  Chilled-water plant control
 *   Liquid-cooling/CDU disruption            →  (no counterpart in the nine)
 *   Utility-event plus OT visibility loss    →  Utility-grid disturbance + OT
 *   Telecom / management-plane dependency    →  Cross-connect / network incident
 *   Supply-chain controller compromise       →  Supply-chain in a controller
 *   Construction / commissioning laptop      →  (no counterpart in the nine)
 *   Water constraint plus cooling incident   →  Water-constrained cooling
 *   Restricted-workload boundary failure     →  Defense / sovereign isolation
 *
 * So all nine of the model's scenarios are echoed here, two of these twelve are
 * unique to the register, and two of these twelve (generator, UPS firmware)
 * split what the model states as one. That asymmetry is the source's, and it is
 * exactly why a runtime join would be wrong.
 *
 * ── CLAIM RULES IN FORCE ───────────────────────────────────────────────────
 * OXOT_Visual_Foundation_Spec.md L401: no percentages, money values,
 * annual-loss figures or "verified" language. Not one numeric figure appears in
 * this file. Source L458: no promise of automatic compliance, certification or
 * assurance outcome. Source L262: this is not marketed as an intelligence or
 * classified-system tool — the restricted-workload row is transcribed as
 * written and claims nothing beyond it.
 *
 * `Bilingual`-typed prose via `same()`; `nl` is a same-as-English placeholder
 * pending translation, per ../registry.ts.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { SCENARIO_GRAPHS, type ScenarioGraph } from "./content.scenarios.graphs";

/** One row of the source table at L294. Its column names are that table's own. */
export interface HyperscaleScenario {
  id: string;
  /** Source column 1, "Scenario", verbatim. */
  name: Bilingual;
  /** Register-list sub-line. Lifted from this row's own pathway sentence. */
  entryPoint: Bilingual;
  /** Source column 2, "Cyber / OT pathway", verbatim. */
  pathway: Bilingual;
  /** Source column 3, "Hyperscale consequence", verbatim. */
  consequence: Bilingual;
  /** Source column 4, "Twin-supported decision", verbatim. */
  decision: Bilingual;
  /** Present only where the source states a relation between the assets named. */
  graph?: ScenarioGraph;
  /** Present only where it does not. Renders in place of a graph, never silently. */
  noGraphReason?: Bilingual;
}

export const SCENARIOS_SECTION = {
  id: "hyperscale-scenarios",
  /** The section's ordinal on the page — a fact about the page, not a facility. */
  index: "07",
  /** Short section name at the head of the path pair. */
  datumLabel: same("Risk scenarios"),
  /** Source L290, verbatim. */
  heading: same("Test the common-mode failure before it consumes redundancy."),
  /** Source L286, the section's own title, used as the register's accessible name. */
  registerLabel: same("Hyperscale risk scenarios")
};

/**
 * NOT VISITOR COPY — A BUILD INSTRUCTION, source L292, transcribed as the
 * instruction it is and never printed. The brief writes "Use an interactive
 * scenario library. Each card should demonstrate that the risk is a dependency
 * chain, not merely a vulnerability." That is addressed to whoever builds the
 * section, not to a visitor: printing "Use an interactive scenario library" as
 * a section lead would show the reader the brief instead of the section.
 *
 * SO S07 CARRIES NO LEAD, and that is a decision rather than an omission. The
 * instruction is honoured instead: the section IS an interactive library, and
 * each selected row shows the dependency chain — drawn where the source states
 * one, stated in words where it does not. Same treatment `content.ts` gives
 * L46's `buildNote` for the interactive model.
 */
export const SCENARIOS_BUILD_NOTE = same(
  "Use an interactive scenario library. Each card should demonstrate that the risk is a dependency chain, not merely a vulnerability."
);

/**
 * Source L296–L307. Twelve rows, in the source's own order — the brief states no
 * ranking, severity order or grouping, so reordering them would impose one.
 */
export const SCENARIOS: readonly HyperscaleScenario[] = [
  {
    /** Source L296. Graph — an explicit reach. */
    id: "bms-vendor-remote-access",
    name: same("BMS vendor remote-access compromise"),
    entryPoint: same("Vendor credential or maintenance gateway"),
    pathway: same(
      "Vendor credential or maintenance gateway reaches BMS server, engineering workstation, or controller network"
    ),
    consequence: same(
      "Unauthorized access to mechanical control systems, alarm suppression, loss of visibility, degraded cooling response, or common-mode impact across halls"
    ),
    decision: same("Broker access, segment control zones, restrict engineering functions, model required flows"),
    graph: SCENARIO_GRAPHS["bms-vendor-remote-access"]
  },
  {
    /* Source L297 — NO GRAPH. "Compromise affects <four systems in a flat or
       list>": the subject is a compromise, not an asset, no entry point is
       named, and the row states no relation between any two of the four. The
       EPMS server could be promoted to the way in and deliberately is not — the
       row lists it alongside the workstation, the network and the integration
       rather than before them. */
    id: "epms-control-path",
    name: same("EPMS / electrical-control path disruption"),
    entryPoint: same("EPMS server or relay-management workstation"),
    pathway: same(
      "Compromise affects EPMS server, relay-management workstation, switchgear-control network, or power-monitoring integration"
    ),
    consequence: same(
      "Loss of electrical visibility, delayed response, impaired switching, protection-setting concern, avoidable escalation during utility event"
    ),
    decision: same("Separate monitoring from control; test management boundaries and recovery sequence"),
    noGraphReason: same(
      "The source names four electrical-control systems here as a flat list and states no entry point and no relation between them — its pathway begins “Compromise affects”. The EPMS server is listed alongside the others rather than before them, so promoting it to the way in would be this build's claim, not the brief's. No route is drawn; the affected systems are named in the pathway above."
    )
  },
  {
    /** Source L298. Graph — an explicit reach. */
    id: "generator-paralleling",
    name: same("Generator / paralleling-controller compromise"),
    entryPoint: same("Vendor tool or maintenance route"),
    pathway: same(
      "Vendor tool or maintenance route reaches generator controllers, synchronizing/paralleling switchgear, or fuel-management interface"
    ),
    consequence: same(
      "Failure to start, incorrect sequencing, load-transfer problem, loss of standby resilience during utility outage"
    ),
    decision: same("Model start sequence, shared dependencies, manual fallback, and secure maintenance access"),
    graph: SCENARIO_GRAPHS["generator-paralleling"]
  },
  {
    /** Source L299. Graph — a stated dependency direction, no attacker entry. */
    id: "ups-bms-firmware",
    name: same("UPS / BMS controller firmware issue"),
    entryPoint: same("Shared firmware, controller model or update"),
    pathway: same(
      "Shared firmware, controller model, software update, or monitoring integration affects redundant equipment trains"
    ),
    consequence: same(
      "A/B common-mode exposure, reduced autonomy, false alarms, inability to manage battery state, maintenance lockout"
    ),
    decision: same("Compare update sequence, isolated pilot, rollback, spare/firmware provenance, and residual risk"),
    graph: SCENARIO_GRAPHS["ups-bms-firmware"]
  },
  {
    /* Source L300 — NO GRAPH, and this is the clearest case of the seven. The
       pathway begins simply "Path reaches" and never says what the path is: six
       cooling assets are named as reachable, with no entry and no order among
       them. `rail-transportation-2` records the identical refusal for the
       identical sentence shape on its traction-power row. Drawing from an
       invented or promoted entry would print an engineering claim the brief
       does not make. */
    id: "cooling-plant-control",
    name: same("Cooling-plant control compromise"),
    entryPoint: same("Chiller PLC, tower control or pump VFD"),
    pathway: same(
      "Path reaches chiller PLC, tower control, pump VFD, valve controller, BMS integration, or water-treatment system"
    ),
    consequence: same(
      "Thermal excursion, loss of cooling redundancy, load shedding, reduced hall capacity, equipment-protection action"
    ),
    decision: same("Test segmentation, alarm/fail-safe behavior, independent monitoring, and response procedures"),
    noGraphReason: same(
      "The source names six reachable cooling assets for this scenario but never says what the path is — its pathway begins simply “Path reaches”, with no entry point and no order among the six. No route is drawn rather than one being invented; the reachable assets are named in the pathway above."
    )
  },
  {
    /* Source L301 — NO GRAPH. Same shape as L297: "Compromise affects" plus a
       flat "or" list of four, no entry point, no stated relation. The
       leak-detection network and the sensors are plainly related to the CDU
       controls in a real facility, but the brief does not say so here, and a
       drawn dependency would be this build's engineering rather than the
       source's. */
    id: "liquid-cooling-cdu",
    name: same("Liquid-cooling/CDU disruption"),
    entryPoint: same("CDU controls or leak-detection network"),
    pathway: same(
      "Compromise affects CDU controls, leak-detection network, flow/temperature sensors, or high-density rack cooling management"
    ),
    consequence: same("Cluster throttling, GPU/AI capacity loss, localized shutdown, leak/thermal response complication"),
    decision: same("Model concentration of critical load and safe fallback control"),
    noGraphReason: same(
      "The source names four liquid-cooling systems here as a flat list, with no entry point and no stated relation between them. A dependency between the CDU controls and the leak-detection network or the sensors would be plausible in a real facility and is exactly what this section exists to let an operator test — so it is not asserted here as though the brief had stated it. No route is drawn; the affected systems are named in the pathway above."
    )
  },
  {
    /* Source L302 — NO GRAPH, on different grounds from the flat-list rows.
       This row states a CO-OCCURRENCE, not a relation: a grid disturbance
       happening WHILE telemetry, identity or monitoring is unavailable. Two
       things at once is a condition to model, not an edge to draw — nothing
       here reaches, supports or depends on anything else. Its own decision
       column asks to simulate the combined failure, which is a Twin function,
       not a topology. */
    id: "utility-event-visibility-loss",
    name: same("Utility-event plus OT visibility loss"),
    entryPoint: same("Grid disturbance with telemetry unavailable"),
    pathway: same("Grid disturbance occurs while BMS/EPMS telemetry, identity, or monitoring is unavailable"),
    consequence: same(
      "Operators lose situational awareness while redundancy is stressed; recovery decisions become slower and riskier"
    ),
    decision: same("Simulate combined failures; prioritize independent local control and tested manual procedures"),
    noGraphReason: same(
      "This scenario is two things happening at once, not one thing reaching another: a grid disturbance while telemetry, identity or monitoring is unavailable. The source states a coincidence in time, which is a condition to simulate rather than a route to draw, so no route is drawn."
    )
  },
  {
    /* Source L303 — NO GRAPH. Seven dependencies named in a flat "or" list with
       no object at all: the sentence ends "is disrupted". Nothing is stated to
       reach, support or depend on anything else. This row is the one where
       drawing would be most actively wrong — its own fourth column asks the
       Twin to IDENTIFY the shared dependencies, so a drawn dependency map would
       answer the question the scenario exists to ask. */
    id: "telecom-management-plane",
    name: same("Telecom / management-plane dependency failure"),
    entryPoint: same("Carrier, DNS, identity or OOB network"),
    pathway: same(
      "Carrier, DNS, identity, OOB network, remote-access broker, cloud monitoring, or API dependency is disrupted"
    ),
    consequence: same(
      "Remote sites become harder to operate; facility telemetry/control support may be degraded; customer connectivity or recovery is affected"
    ),
    decision: same("Identify shared dependencies and create alternative local/independent operating paths"),
    noGraphReason: same(
      "The source names seven dependencies here as a flat list with no object — the sentence ends “is disrupted” — and its fourth column asks the Twin to identify exactly the shared dependencies between them. Drawing them would answer the question this scenario exists to ask, so no route is drawn; the dependencies are named in the pathway above."
    )
  },
  {
    /* Source L304 — NO GRAPH. "Vulnerability or compromised update affects
       <six component classes> across a standardized fleet". The subject is a
       vulnerability or an update, neither of which is one of the nine asset
       classes the Twin models, and the six components are a flat "or" list with
       no relation stated among them. The fleet is what they share, but the row
       states no structure for it — no estate shape, no site relationship,
       nothing that could be drawn without inventing an estate. */
    id: "supply-chain-controller",
    name: same("Supply-chain controller compromise"),
    entryPoint: same("Vulnerability or compromised update"),
    pathway: same(
      "Vulnerability or compromised update affects BMS, UPS, generator, chiller, relay, or DCIM component across a standardized fleet"
    ),
    consequence: same(
      "Fleet-wide common-mode exposure, emergency patching challenge, constrained replacement due to lead times"
    ),
    decision: same("Model affected estate, reachable pathways, compensating controls, and staged remediation"),
    noGraphReason: same(
      "What this row names as the origin is a vulnerability or a compromised update, which is not an asset the Twin models, and the six component classes behind it are a flat list with no stated relation. The standardized fleet is what they share, but the source gives it no shape — drawing an estate here would mean inventing one. No route is drawn; the affected components are named in the pathway above."
    )
  },
  {
    /** Source L305. Graph — an explicit bridge between two named environments. */
    id: "commissioning-laptop",
    name: same("Construction / commissioning laptop pathway"),
    entryPoint: same("Temporary commissioning network or contractor device"),
    pathway: same(
      "Temporary commissioning network, contractor device, or unsegmented tool bridges new build and live operational systems"
    ),
    consequence: same("Introduction of malware/configuration drift, loss of isolation, disruption to existing live halls"),
    decision: same("Model temporary-to-permanent transition, access expiry, and acceptance evidence"),
    graph: SCENARIO_GRAPHS["commissioning-laptop"]
  },
  {
    /* Source L306 — NO GRAPH, same co-occurrence grounds as L302. A water
       restriction, treatment issue or utility outage COMBINES WITH cooling
       automation impairment: two conditions coinciding, with neither stated to
       reach or depend on the other. */
    id: "water-constraint-cooling",
    name: same("Water constraint plus cooling incident"),
    entryPoint: same("Local water restriction or utility outage"),
    pathway: same(
      "Local water restriction, treatment issue, or utility outage combines with cooling automation impairment"
    ),
    consequence: same(
      "Capacity derating, temperature excursion, inability to meet environmental/contractual performance targets"
    ),
    decision: same("Model cooling strategy alternatives and operational thresholds"),
    noGraphReason: same(
      "This scenario is a water constraint combining with a cooling-automation impairment — two conditions coinciding, with neither stated to reach or depend on the other. The source states a combination, not a route, so no route is drawn."
    )
  },
  {
    /** Source L307. Graph — an explicit crossing into a named environment. */
    id: "restricted-workload-boundary",
    name: same("Restricted-workload boundary failure"),
    entryPoint: same("Shared privileged-access or monitoring pathway"),
    pathway: same(
      "Shared privileged-access, monitoring, or facility-management pathway crosses into a sovereign/defense-restricted environment"
    ),
    consequence: same(
      "Policy, contract, or regulatory breach; incident response and recovery constrained by access rules"
    ),
    decision: same("Test segmentation, identity, data-flow, and operational support boundaries"),
    graph: SCENARIO_GRAPHS["restricted-workload-boundary"]
  }
];
