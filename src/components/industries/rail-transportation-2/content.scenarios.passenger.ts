/**
 * S05 · PASSENGER-TRANSIT CYBER SCENARIOS — source L151–L161 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_rail-transportation.md`.
 * Owned by `PassengerScenarios.tsx`.
 *
 * SPLIT OUT OF `content.scenarios.ts`, which held both this section and S06's
 * freight register in one file. That file crossed this project's 500-line cap
 * (CLAUDE.md) once both sections were built; the two sections never shared a
 * row type or a component, only the same source document, so splitting along
 * that boundary loses nothing — `content.scenarios.freight.ts` is S06's half.
 *
 * ── WHAT IS TRANSCRIBED AND WHAT IS DERIVED ────────────────────────────────
 * The prose is transcribed verbatim: every `name`, `pathway`, `impact` and
 * `decision` string below is the source cell with no word changed, added or
 * dropped. `entryPoint` is the only extra string per row — a short register
 * label lifted from that row's own pathway sentence, not new content.
 *
 * The `assets`/`paths` graph per scenario is DERIVED. The source writes each
 * pathway as one sentence; turning that sentence into typed
 * `SystemAsset`/`SystemPath` records is a structuring decision, and every row
 * that carries a graph carries a comment saying exactly what was ordered or
 * grouped and on what grounds. No vendor, product, model number, protocol,
 * line, territory or site is invented anywhere — node labels are the source's
 * own asset words.
 *
 * ── THE RULE FOR WHETHER A ROW GETS A GRAPH AT ALL ─────────────────────────
 * A graph is drawn ONLY where the source states a RELATION between the assets
 * it names. Two forms of statement qualify:
 *
 *   · an explicit REACH — "Vendor or maintenance pathway REACHES…", "Ransomware
 *     or network compromise CROSSES INTO…" — which names an entry and puts the
 *     rest behind it (rows 2, 4, 5);
 *   · an explicit SUPPORT — "…or SUPPORTING control-center service", "timing
 *     that SUPPORTS signalling…" — which names a dependency direction among the
 *     assets even though no attacker entry is given (rows 1, 7). Those rows'
 *     edges are `required-flow`, not `attack-path`: the drawing is the
 *     dependency the row describes, not a route in that the row does not state.
 *
 * A FLAT "or" LIST WITH NEITHER GETS NO GRAPH, and says so in place of one —
 * `noGraphReason`, rows 3 and 6. This is the same convention and the same
 * threshold the energy page's `content.scenarios.ts` records, applied to a
 * different table. Do not "fix" those two rows by adding nodes; both still
 * render their pathway, impact and decision text in full.
 *
 * ── EVERY EDGE IS `status: "open"` ─────────────────────────────────────────
 * Nothing in this register is validated-closed: the register shows modelled
 * exposure BEFORE controls are tested, and the fourth column is what the Twin
 * would let an operator test NEXT. An edge rendered `controlled` or `closed`
 * would claim a control already holds.
 *
 * `Bilingual`-typed prose via `same()`; `nl` is a placeholder pending
 * translation, per ../registry.ts. `SystemAsset.label`/`.description` are plain
 * strings by contract (already-localized, authored per scenario) and so stay
 * untyped by `Bilingual` here.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

/**
 * One row of the PASSENGER table (L153). The column names below are that
 * table's own. The freight table at L213 is close but not identical — its
 * third column is "Freight impact", not "Operational impact" — and it is a
 * different treatment besides, so `content.scenarios.freight.ts` types
 * against its own shape rather than borrowing this one.
 */
export interface RailScenario {
  id: string;
  /** Source column 1, "Scenario", verbatim. */
  name: Bilingual;
  /** Register-list sub-line. Lifted from this row's own pathway sentence. */
  entryPoint: Bilingual;
  /** Source column 2, "Cyber / OT pathway", verbatim. */
  pathway: Bilingual;
  /** Source column 3, "Operational impact", verbatim. */
  impact: Bilingual;
  /** Source column 4, "Twin-supported decision", verbatim. */
  decision: Bilingual;
  /** Already-localized `TwinExplorer` accessible name. Empty when no graph. */
  diagramTitle: Bilingual;
  assets: SystemAsset[];
  paths: SystemPath[];
  /** Set only where the source states no relation. Renders instead of a graph. */
  noGraphReason?: Bilingual;
}

/**
 * THE SUBSECTION SUPPLIES NO HEADLINE OF ITS OWN. L107's `### Section headline`
 * and its blockquote at L109 belong to the whole "Passenger rail and transit"
 * section, not to this table; the table arrives at L151 under a bare
 * subsection title. Rather than write a sentence the source does not contain,
 * or borrow a headline that is doing a different job one level up, the h2 is
 * the subsection title verbatim — the same resolution `content.architecture.ts`
 * records for the same gap at L113/L171.
 */
export const PASSENGER_SCENARIOS_SECTION = {
  id: "passenger-scenarios",
  /** The section's ordinal on the page — a fact about the page, not the railway. */
  index: "05",
  /** Short section name at the head of the block run. */
  datumLabel: same("Passenger scenarios"),
  /** Source L151, verbatim. */
  heading: same("Passenger-transit cyber scenarios")
};

/**
 * Source L155–L161 — SEVEN scenarios, FOUR columns, twenty-eight cells.
 *
 * NO CHAIN LEGEND PRECEDES THIS REGISTER, and that is a real difference from
 * the energy page rather than an omission. `industry_energy.md` draws an
 * explicit six-stage chain in a fenced block above its scenario table, which is
 * what that page prints as a legend; this source draws no chain anywhere near
 * L151. A legend invented here would present a structure the brief does not
 * state as though the brief stated it.
 */
export const PASSENGER_SCENARIOS: readonly RailScenario[] = [
  {
    /* Source L155. GRAPH ON THE "SUPPORTING" RELATION. The row names three
       elements in an "or" list and no attacker entry, but it calls the last one
       a "SUPPORTING control-center service" — a stated dependency direction.
       The order below is that word plus the source's OWN architecture stack
       (L117–L128), which puts the rail operations control center (ATS, OCC)
       above train control and signaling (CBTC zone controllers, then radio /
       wireless train-ground communications). Nothing is added to the three the
       row names, and the edges are `required-flow` because what is drawn is the
       support chain the row describes, not a route in it does not state. */
    id: "cbtc-disruption",
    name: same("CBTC wireless or zone-controller disruption"),
    entryPoint: same("Train-ground path or zone controller"),
    pathway: same(
      "Compromise or loss of a train-ground communications path, zone controller, or supporting control-center service"
    ),
    impact: same(
      "Trains enter degraded mode; reduced headways, line suspension, station crowding, recovery delay"
    ),
    decision: same("Test segmentation, redundancy, failover, and recovery sequencing"),
    diagramTitle: same("Control-center service supporting the CBTC zone controller and train-ground communications path"),
    assets: [
      {
        id: "cbtc-occ",
        type: "service",
        label: "Supporting control-center service",
        description: "The control-center service the row names as supporting CBTC operation."
      },
      {
        id: "cbtc-zone",
        type: "controller",
        label: "Zone controller",
        description: "The CBTC zone controller the scenario is named for.",
        criticality: "critical"
      },
      {
        id: "cbtc-radio",
        type: "network-device",
        label: "Train-ground communications path",
        description: "The train-ground communications path carrying movement authority.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "cbtc1", from: "cbtc-occ", to: "cbtc-zone", role: "required-flow", status: "open" },
      { id: "cbtc2", from: "cbtc-zone", to: "cbtc-radio", role: "required-flow", status: "open" }
    ]
  },
  {
    /* Source L156. GRAPH ON AN EXPLICIT REACH — "Vendor or maintenance pathway
       reaches…". Three reached items in an "or" list, so the graph FANS OUT
       from the pathway rather than chaining through them: the row lists them
       side by side, and chaining would claim one sits behind another.
       `route-setting environment` takes type `service` deliberately — the
       source calls it an environment, not a device, and typing it `hmi` or
       `engineering-workstation` would name hardware the source does not. */
    id: "interlocking-access",
    name: same("Interlocking engineering access"),
    entryPoint: same("Vendor or maintenance pathway"),
    pathway: same(
      "Vendor or maintenance pathway reaches interlocking configuration tools, wayside controller, or route-setting environment"
    ),
    impact: same(
      "Route-setting restrictions, safe-stop behavior, junction/terminal capacity loss, safety-case concern"
    ),
    decision: same("Model just-in-time access, engineering workstations, approvals, and conduit boundaries"),
    diagramTitle: same("Vendor or maintenance pathway reaching interlocking and route-setting assets"),
    assets: [
      {
        id: "il-pathway",
        type: "remote-access",
        label: "Vendor or maintenance pathway",
        description: "The vendor or maintenance route the row names as the way in."
      },
      {
        id: "il-tools",
        type: "engineering-workstation",
        label: "Interlocking configuration tools",
        description: "The configuration tools that set interlocking behaviour.",
        criticality: "critical"
      },
      {
        id: "il-wayside",
        type: "controller",
        label: "Wayside controller",
        description: "The wayside controller named as reachable on the same pathway.",
        criticality: "critical"
      },
      {
        id: "il-route",
        type: "service",
        label: "Route-setting environment",
        description: "The environment routes are set from, named as reachable on the same pathway."
      }
    ],
    paths: [
      { id: "il1", from: "il-pathway", to: "il-tools", role: "vendor-access", status: "open" },
      { id: "il2", from: "il-pathway", to: "il-wayside", role: "vendor-access", status: "open" },
      { id: "il3", from: "il-pathway", to: "il-route", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L157 — NO GRAPH. The row names five reachable traction-power
       assets and states NO entry point: its pathway begins simply "Path
       reaches". The remote-control gateway is the one item that could be
       promoted to the way in, and it is deliberately not — the row lists it
       ALONGSIDE the field devices, not before them, and the energy page records
       the identical refusal for the identical shape. Drawing from an invented
       or promoted entry would print an engineering claim the brief never makes. */
    id: "traction-scada",
    name: same("Traction-power SCADA compromise"),
    entryPoint: same("Substation SCADA, RTU, PLC or gateway"),
    pathway: same("Path reaches substation SCADA, RTU, PLC, protective device, or remote-control gateway"),
    impact: same("Loss of power to a section, service suspension, stranded trains, tunnel/station implications"),
    decision: same("Test remote-access and segmentation changes without disrupting required control flows"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "The source names the reachable traction-power assets for this scenario but states no entry point — its pathway begins simply “Path reaches”, and it lists the remote-control gateway alongside the field devices rather than before them. No route is drawn rather than one being invented; the reachable assets are named in the pathway above."
    )
  },
  {
    /* Source L158. GRAPH ON AN EXPLICIT REACH — "crosses into station OT", so
       station OT is the boundary the row itself names and the five station
       systems sit behind it. CCTV and PA are drawn as ONE node because the
       source's own architecture stack (L131) prints them on one line —
       a grouping, not a claim that they are one device. Ventilation and
       platform systems keep the row's own words rather than the stack's
       narrower "tunnel systems" and "platform screen doors". */
    id: "station-cascade",
    name: same("Station and tunnel system cascade"),
    entryPoint: same("Ransomware or network compromise"),
    pathway: same(
      "Ransomware or network compromise crosses into station OT, CCTV, PA, ventilation, fire/life safety, or platform systems"
    ),
    impact: same(
      "Impaired incident response, evacuation complexity, station closure, passenger safety management impact"
    ),
    decision: same("Identify operational dependencies and prioritise isolation/recovery"),
    diagramTitle: same("Compromise crossing into station OT and the station systems behind it"),
    assets: [
      {
        id: "sc-station-ot",
        type: "network-device",
        label: "Station OT",
        description: "The station operational network the row names the compromise as crossing into."
      },
      {
        id: "sc-cctv-pa",
        type: "field-device",
        label: "CCTV and PA",
        description: "Station CCTV and public address, named together in the source's own stack."
      },
      {
        id: "sc-ventilation",
        type: "process-equipment",
        /* ISO 10628-2 X8164. Previously collided with sc-platform. */
        symbol: "oxot/thermal/ventilation_fan",
        label: "Ventilation",
        description: "Station and tunnel ventilation named as affected."
      },
      {
        id: "sc-fls",
        type: "safety-function",
        label: "Fire/life safety",
        description: "The fire and life-safety systems relied on during an incident.",
        criticality: "critical"
      },
      {
        id: "sc-platform",
        type: "process-equipment",
        label: "Platform systems",
        description: "Platform systems named as affected in the same crossing."
      }
    ],
    paths: [
      { id: "sc1", from: "sc-station-ot", to: "sc-cctv-pa", role: "attack-path", status: "open" },
      { id: "sc2", from: "sc-station-ot", to: "sc-ventilation", role: "attack-path", status: "open" },
      { id: "sc3", from: "sc-station-ot", to: "sc-fls", role: "attack-path", status: "open" },
      { id: "sc4", from: "sc-station-ot", to: "sc-platform", role: "attack-path", status: "open" }
    ]
  },
  {
    /* Source L159. GRAPH ON AN EXPLICIT REACH — "Vendor laptop or maintenance
       network reaches…". Three reached environments in an "or" list, so a
       fan-out again. The upload environment carries the `critical` mark
       because the row's own impact column names configuration integrity as
       what is at risk. */
    id: "depot-maintenance",
    name: same("Depot maintenance compromise"),
    entryPoint: same("Vendor laptop or maintenance network"),
    pathway: same(
      "Vendor laptop or maintenance network reaches rolling-stock diagnostic, upload, or depot-control environment"
    ),
    impact: same("Train availability reduction, delayed release to service, configuration integrity risk"),
    decision: same("Restrict programming paths; trace trust boundary from depot to onboard systems"),
    diagramTitle: same("Vendor laptop or maintenance network reaching depot and rolling-stock environments"),
    assets: [
      {
        id: "dp-entry",
        type: "remote-access",
        label: "Vendor laptop or maintenance network",
        description: "The depot-side route the row names as the way in."
      },
      {
        id: "dp-diagnostic",
        type: "engineering-workstation",
        label: "Rolling-stock diagnostic environment",
        description: "The diagnostic environment used against rolling stock."
      },
      {
        id: "dp-upload",
        type: "engineering-workstation",
        label: "Upload environment",
        description: "The upload environment through which onboard configuration is changed.",
        criticality: "critical"
      },
      {
        id: "dp-depot-control",
        type: "controller",
        label: "Depot-control environment",
        description: "The depot control environment named as reachable on the same route."
      }
    ],
    paths: [
      { id: "dp1", from: "dp-entry", to: "dp-diagnostic", role: "vendor-access", status: "open" },
      { id: "dp2", from: "dp-entry", to: "dp-upload", role: "vendor-access", status: "open" },
      { id: "dp3", from: "dp-entry", to: "dp-depot-control", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L160 — NO GRAPH. Five affected systems in a flat "or" list, with
       no entry point and no stated relation between any two of them. This row
       is the one where drawing would be most actively wrong: its own fourth
       column asks the Twin to MAP the cross-domain dependencies, which is
       precisely the thing the source has not stated. A drawn dependency here
       would answer the question the scenario exists to ask. */
    id: "passenger-information",
    name: same("Passenger-information outage during disruption"),
    entryPoint: same("Operational data feeds and communications"),
    pathway: same(
      "Attack affects operational data feeds, station displays, mobile application backend, PA/CCTV, or communications"
    ),
    impact: same("Crowding, unsafe passenger flow, reputational impact, slower recovery"),
    decision: same("Map cross-domain dependencies and create resilient communications pathways"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "The source names five affected systems here as a flat list, with no entry point and no stated relation between them — and its fourth column asks the Twin to map exactly those cross-domain dependencies. Drawing them would answer the question this scenario exists to ask, so no route is drawn; the affected systems are named in the pathway above."
    )
  },
  {
    /* Source L161. GRAPH ON THE "SUPPORTS" RELATION — "timing that SUPPORTS
       signalling, event correlation, security monitoring, or operational
       coordination". Timing is the source of the dependency and the rest hang
       off it; the edges are `required-flow` for that reason. Event correlation
       and security monitoring are ONE node — both are the same monitoring
       function reading the same clock. "Operational coordination" is NOT drawn:
       it is an activity, not an asset, and the nine asset classes have no
       honest home for it. It stays named in the pathway above. */
    id: "time-sync",
    name: same("Time synchronization disruption"),
    entryPoint: same("Timing that supports signalling"),
    pathway: same(
      "Compromise or failure affects timing that supports signalling, event correlation, security monitoring, or operational coordination"
    ),
    impact: same(
      "Degraded diagnostics, inconsistent records, potential signaling/communications effects depending on design"
    ),
    decision: same("Identify timing dependencies and test isolation/fallback design"),
    diagramTitle: same("Timing supporting signalling and the monitoring functions that read it"),
    assets: [
      {
        id: "ts-timing",
        type: "service",
        label: "Timing",
        description: "The timing the row names as supporting the functions below."
      },
      {
        id: "ts-signalling",
        type: "controller",
        label: "Signalling",
        description: "Signalling, the first function the row names as depending on timing.",
        criticality: "critical"
      },
      {
        id: "ts-monitoring",
        type: "service",
        label: "Event correlation and security monitoring",
        description: "The two monitoring functions the row names, both reading the same clock."
      }
    ],
    paths: [
      { id: "ts1", from: "ts-timing", to: "ts-signalling", role: "required-flow", status: "open" },
      { id: "ts2", from: "ts-timing", to: "ts-monitoring", role: "required-flow", status: "open" }
    ]
  }
];
