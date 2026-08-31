/**
 * S04 · ENERGY AND UTILITY CYBER-RISK SCENARIOS — source L131–L155 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_energy.md`.
 *
 * ALL EIGHT SCENARIOS, ALL FOUR COLUMNS, VERBATIM. The source table at
 * L144–L153 has four columns — Scenario, Example pathway, Potential
 * consequence, Decision the Twin supports — and every one of the 32 cells is
 * transcribed below without a word changed, added or dropped. `entryPoint` is
 * the only additional string per row; it is a short register label lifted from
 * the row's own pathway sentence, not new content.
 *
 * WHAT IS TRANSCRIBED AND WHAT IS DERIVED. The prose is transcribed. The
 * `assets`/`paths` graph per scenario is DERIVED — the source writes each
 * pathway as one sentence, and turning that sentence into typed
 * `SystemAsset`/`SystemPath` records is a structuring decision, the same one
 * `rail-transportation/RailScenarioDiagram.tsx` makes when it renders six
 * prose bullets as a four-node topology. Each scenario below carries a comment
 * saying exactly what was grouped or ordered and why. No vendor, product,
 * model number, voltage, site or protocol is invented anywhere: node labels
 * are the source's own asset words.
 *
 * TWO SCENARIOS CARRY NO GRAPH, DELIBERATELY — see `noGraphReason`:
 *   · `generation-control` (L150) names the reachable controls but states no
 *     entry point at all ("Compromise reaches…"), so the chain's first stage
 *     is absent from the source. Drawing a route from an invented entry node
 *     would print an engineering claim the brief does not make.
 *   · `external-pressure` (L153) names no OT asset in its pathway — threat
 *     activity, conflict, weather, wildfire, flood, fuel disruption or telecom
 *     failure affecting a site or region. It is external context, not a
 *     reachable-asset route.
 * Both still render their pathway, consequence and decision text in full. A
 * stated gap, not an omission — do not "fix" these by adding nodes.
 *
 * EVERY EDGE IS `status: "open"`. Nothing on this page is validated-closed:
 * the register shows modelled exposure before controls are tested, and the
 * fourth column is what the Twin would let an operator test NEXT. An edge
 * rendered `controlled` or `closed` would claim a control already holds.
 *
 * L155'S CITATION MARKER, RESOLVED. The closing paragraph cites a document it
 * never names — the same dangling marker `content.ts` records at L170 and
 * L258 and `content.architecture.ts` at L129. All four resolve to
 * `PATHS.technicalSpecification`, the real live `/technical-specification`
 * route carrying the OXOT CDT Product Specification material, because the
 * source PDF has no public URL.
 *
 * `Bilingual`-typed prose via `same()`; `nl` is a placeholder pending
 * translation, per ../registry.ts. `SystemAsset.label`/`.description` are
 * plain strings by contract (already-localized, authored per scenario) and so
 * stay untyped by `Bilingual` here, matching `RailScenarioDiagram.tsx`.
 *
 * ── SYMBOLS, 2026-08-29 ───────────────────────────────────────────────────
 *
 * These graphs were run against the decision procedure in
 * `docs/diagram-system/using-the-library.md` §1. Question 3 fires on all six:
 * `ScenarioRegister` selects between them at runtime and `ScenarioTrace` mounts
 * `TwinExplorer`, which lays out with ELK in a `useEffect` under a `"use
 * client"` boundary. Question 1 fires as well — `SystemPath.status` carries
 * colour through `PathEdge`, and `DiagramSpec` has no colour channel and no
 * per-edge state. So NO scenario becomes a `DiagramSpec`; §4's per-asset
 * `symbol` is the whole of what applies here.
 *
 * THREE OF THE SIX GRAPHS DRAW A MARK TWICE, found by screenshotting each at
 * deviceScaleFactor 1 rather than by reading the types:
 *
 *   ransomware-it-ot  `identity` and `historian-dispatch` are both `service`.
 *                     CLOSED — see `historian-dispatch` below.
 *   vendor-access     `vendor-field-control` ("Relay, PLC or RTU") and
 *                     `vendor-plant-control` ("Turbine controller or DCS
 *                     segment") are both `controller`, drawn side by side in a
 *                     three-way fan-out. LEFT OPEN ON PURPOSE, twice over.
 *                     Both nodes are GROUPINGS — the comment on this scenario
 *                     says so — and a grouping has no single correct device
 *                     mark: drawing `cset/plc` for "Relay, PLC or RTU" would
 *                     assert one of the three the label refuses to choose
 *                     between, which is a narrower claim than the source makes,
 *                     not a truer one. `cset/dcs` for the other is the same
 *                     error mirrored. Closing this needs a decision about the
 *                     CONTENT (split the groupings, or accept them), not a slug.
 *   substation-field  `rtus-ieds` ("RTUs and IEDs") and `field-automation` are
 *                     both `field-device`, and both draw the identical
 *                     circle-plus-waveform — only the criticality chevron tells
 *                     them apart, and that mark means something else entirely.
 *                     BLOCKED, NOT DECLINED. `cset/rtu` is the right mark for
 *                     the first and it EXISTS in twin/cset-glyphs.tsx; it is not
 *                     in `CURATED_SYMBOLS` in twin/AssetNode.tsx, and that table
 *                     is out of this page's ownership. An ISA bubble is not a
 *                     substitute — an RTU is not an instrument loop — and §5.4
 *                     is explicit that a neighbouring mark must not be borrowed.
 *                     One line in that table closes it; until then the duplicate
 *                     stands and is named here rather than quietly tolerated.
 */
import { PATHS } from "@/components/shell/nav";
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const SCENARIOS_SECTION = {
  id: "scenarios",
  /** The section's ordinal on the page. */
  index: "04",
  /** Source L131, the brief's own section name. */
  datumLabel: same("Energy risk scenarios"),
  /** Source L135. */
  heading: same("Model the route, the system effect, and the decision.")
};

/**
 * Source L139–L142, the chain shape the brief draws in a fenced block, split
 * at its own arrows. Six stages: the first three are the graph, the last three
 * are the text beneath it — which is precisely why the trace pane is a graph
 * plus captions rather than one or the other.
 */
export const CHAIN_STAGES: readonly Bilingual[] = [
  same("Entry point"),
  same("Reachable OT asset"),
  same("Control or protection effect"),
  same("Physical / operational consequence"),
  same("Financial or service impact"),
  same("Control options")
];

export const CHAIN_LABEL = same("Each scenario opens into an illustrated chain");

/* ── The eight scenarios ────────────────────────────────────────────────── */

export interface EnergyScenario {
  id: string;
  /** Source column 1, verbatim. */
  name: Bilingual;
  /** Register-list summary. Lifted from this row's own pathway sentence. */
  entryPoint: Bilingual;
  /** Source column 2, verbatim. */
  pathway: Bilingual;
  /** Source column 3, verbatim. */
  consequence: Bilingual;
  /** Source column 4, verbatim. */
  decision: Bilingual;
  /** Already-localized `TwinExplorer` accessible name. Empty when no graph. */
  diagramTitle: Bilingual;
  assets: SystemAsset[];
  paths: SystemPath[];
  /** Set only where the source states no route. Renders instead of the graph. */
  noGraphReason?: Bilingual;
}

export const SCENARIOS: readonly EnergyScenario[] = [
  {
    /* Source L146. The pathway is an "or" list of reached assets, so the graph
       fans out from the session rather than chaining through them. Relay/PLC/
       RTU are grouped as one controller node and turbine controller/DCS as
       another — a grouping, not a claim that they sit together. */
    id: "vendor-access",
    name: same("Vendor access to a plant or substation"),
    entryPoint: same("Compromised OEM session"),
    pathway: same(
      "Compromised OEM session reaches engineering workstation, relay, PLC, RTU, turbine controller, or DCS segment"
    ),
    consequence: same(
      "Unauthorized configuration, loss of availability, altered setpoints, delayed recovery, or impaired protection/control"
    ),
    decision: same("Test brokered access, MFA, jump host, segmentation, and session restrictions"),
    diagramTitle: same("Compromised OEM session reaching engineering and control assets"),
    assets: [
      {
        id: "oem-session",
        type: "remote-access",
        label: "Compromised OEM session",
        description: "The vendor's own remote-support session into a plant or substation."
      },
      {
        id: "vendor-ews",
        type: "engineering-workstation",
        label: "Engineering workstation",
        description: "Engineering workstation reachable from the vendor session."
      },
      {
        id: "vendor-field-control",
        type: "controller",
        label: "Relay, PLC or RTU",
        description: "Protection and control devices named as reachable in the same pathway.",
        criticality: "critical"
      },
      {
        id: "vendor-plant-control",
        type: "controller",
        label: "Turbine controller or DCS segment",
        description: "Plant control assets named as reachable in the same pathway.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "va1", from: "oem-session", to: "vendor-ews", role: "vendor-access", status: "open" },
      { id: "va2", from: "oem-session", to: "vendor-field-control", role: "vendor-access", status: "open" },
      { id: "va3", from: "oem-session", to: "vendor-plant-control", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L147. The row lists six affected systems and names no entry, so
       the IT→OT ORDER BELOW IS DERIVED from the row's own title — "crossing
       IT/OT boundaries" — with identity as the enterprise-side start and the
       HMI as the operational end. Every one of the six is present; none is
       dropped to make the chain read cleanly. */
    id: "ransomware-it-ot",
    name: same("Ransomware crossing IT/OT boundaries"),
    entryPoint: same("Identity services"),
    pathway: same(
      "Compromise affects identity, historian, HMI, engineering workstations, dispatch support, or operational DMZ services"
    ),
    consequence: same(
      "Loss of view/control, manual operation, reduced dispatch ability, degraded restoration, controlled shutdown"
    ),
    decision: same("Identify critical dependencies and sequence recovery/segmentation controls"),
    diagramTitle: same("Ransomware crossing the IT/OT boundary into operational systems"),
    assets: [
      {
        id: "identity",
        type: "service",
        label: "Identity services",
        description: "Enterprise identity, the first system the row names as affected."
      },
      {
        id: "ot-dmz",
        type: "network-device",
        label: "Operational DMZ services",
        description: "The DMZ services standing between enterprise systems and operations."
      },
      {
        /* THE ONE SYMBOL SWAP IN THIS FILE, AND IT CLOSES A MEASURED DUPLICATE.
           `identity` above and this asset are both `service`, so both drew the
           SAME four-tile silhouette — two nodes of a five-node chain, two hops
           apart, identical marks. A reader who knows the notation reads "these
           are the same system". `cset/historian` is CSET's process-historian
           mark, a data cylinder with a trend line across it, and this row's own
           label names a historian, so the mark and the caption now agree.

           `identity` KEEPS the four-tile `service` silhouette rather than
           taking a slug of its own: iX `applications` is a TIER of software
           systems, which is exactly what enterprise identity is, and CSET
           publishes no identity-provider mark to borrow. One slug removes the
           duplicate; a second would have been change for its own sake. */
        id: "historian-dispatch",
        type: "service",
        symbol: "cset/historian",
        label: "Historian and dispatch support",
        description: "Historian and dispatch-support systems named as affected."
      },
      {
        id: "ransomware-ews",
        type: "engineering-workstation",
        label: "Engineering workstations",
        description: "Engineering workstations named as affected."
      },
      {
        id: "ransomware-hmi",
        type: "hmi",
        label: "HMI",
        description: "The operator's view and control of the process.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "rw1", from: "identity", to: "ot-dmz", role: "attack-path", status: "open" },
      { id: "rw2", from: "ot-dmz", to: "historian-dispatch", role: "attack-path", status: "open" },
      { id: "rw3", from: "historian-dispatch", to: "ransomware-ews", role: "attack-path", status: "open" },
      { id: "rw4", from: "ransomware-ews", to: "ransomware-hmi", role: "attack-path", status: "open" }
    ]
  },
  {
    /* Source L148. The source's "or" is drawn as a branch, not a sequence: the
       engineering pathway reaches EITHER the relay configuration OR the timing
       and communications infrastructure that supports it. */
    id: "protection-settings",
    name: same("Protection or relay-setting exposure"),
    entryPoint: same("An engineering pathway"),
    pathway: same(
      "An engineering pathway reaches IED/relay configuration or supporting timing/communications infrastructure"
    ),
    consequence: same(
      "Incorrect protection behavior, unwanted trip, failure to trip, reduced fault isolation, or restoration delay"
    ),
    decision: same("Map dependencies and test access/control boundaries before change"),
    diagramTitle: same("Engineering pathway reaching relay configuration and its supporting infrastructure"),
    assets: [
      {
        id: "engineering-pathway",
        type: "engineering-workstation",
        label: "Engineering pathway",
        description: "The configuration route the row names as the way in."
      },
      {
        id: "relay-config",
        type: "safety-function",
        label: "IED / relay configuration",
        description: "Protection settings — the function the scenario is named for.",
        criticality: "critical"
      },
      {
        id: "timing-comms",
        type: "network-device",
        label: "Timing and communications infrastructure",
        description: "The supporting infrastructure protection depends on."
      }
    ],
    paths: [
      { id: "pr1", from: "engineering-pathway", to: "relay-config", role: "management", status: "open" },
      { id: "pr2", from: "engineering-pathway", to: "timing-comms", role: "management", status: "open" }
    ]
  },
  {
    /* Source L149. Four reached items in an "or" list, so a fan-out from the
       communications route. Gateways are NOT drawn as an intermediate hop —
       the source lists them alongside the field devices, not before them. */
    id: "substation-field",
    name: same("Substation or field-device compromise"),
    entryPoint: same("Remote communications route"),
    pathway: same("Remote communications route reaches RTUs, IEDs, gateways, or field automation"),
    consequence: same(
      "Loss/manipulation of telemetry, remote switching risk, outage escalation, or safety exposure for field crews"
    ),
    decision: same("Prioritize based on operational criticality and reachable paths"),
    diagramTitle: same("Remote communications route reaching substation and field assets"),
    assets: [
      {
        id: "remote-comms",
        type: "remote-access",
        label: "Remote communications route",
        description: "The remote route into the substation or field estate."
      },
      {
        id: "substation-gateways",
        type: "network-device",
        label: "Gateways",
        description: "Substation gateways named as reachable."
      },
      {
        id: "rtus-ieds",
        type: "field-device",
        label: "RTUs and IEDs",
        description: "Remote terminal units and intelligent electronic devices.",
        criticality: "critical"
      },
      {
        id: "field-automation",
        type: "field-device",
        label: "Field automation",
        description: "Field automation named as reachable on the same route."
      }
    ],
    paths: [
      { id: "sf1", from: "remote-comms", to: "substation-gateways", role: "attack-path", status: "open" },
      { id: "sf2", from: "remote-comms", to: "rtus-ieds", role: "attack-path", status: "open" },
      { id: "sf3", from: "remote-comms", to: "field-automation", role: "attack-path", status: "open" }
    ]
  },
  {
    /* Source L150 — NO GRAPH, see the file docblock. The row names seven
       reachable control assets and no entry point whatsoever; its pathway
       begins "Compromise reaches", with the compromise itself unspecified. */
    id: "generation-control",
    name: same("Generation-control manipulation"),
    entryPoint: same("Compromise of plant controls"),
    pathway: same(
      "Compromise reaches turbine, boiler, inverter, governor, compressor, battery, or balance-of-plant controls"
    ),
    consequence: same(
      "Trip, output reduction, equipment stress, safety action, emissions/quality issue, or grid-support loss"
    ),
    decision: same("Compare segmentation, hardening, patching, and replacement options"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "The source names the reachable controls for this scenario but states no entry point — its pathway begins simply “Compromise reaches”. No route is drawn rather than one being invented; the reachable controls are named in the pathway above."
    )
  },
  {
    /* Source L151. Two named routes in — the cloud/aggregator platform and the
       remote O&M route — converging on inverter fleet management, which the
       row names and which the consequence column reaches for again ("loss of
       fleet visibility"). */
    id: "der-aggregation",
    name: same("Renewable / DER aggregation exposure"),
    entryPoint: same("Cloud/API, aggregator or remote O&M route"),
    pathway: same("Cloud/API, aggregator, inverter fleet-management, or remote O&M route is compromised"),
    consequence: same(
      "Coordinated loss of generation, voltage/frequency support implications, loss of fleet visibility"
    ),
    decision: same("Assess concentration, communications, supplier, and geographic dependency"),
    diagramTitle: same("Cloud, aggregator and remote O&M routes into inverter fleet management"),
    assets: [
      {
        id: "aggregator-cloud",
        type: "service",
        label: "Cloud / API and aggregator platform",
        description: "The aggregation platform the fleet is operated through."
      },
      {
        id: "remote-om",
        type: "remote-access",
        label: "Remote O&M route",
        description: "The remote operations-and-maintenance route into the fleet."
      },
      {
        id: "inverter-fleet",
        type: "controller",
        label: "Inverter fleet management",
        description: "Fleet-wide inverter control and visibility.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "dr1", from: "aggregator-cloud", to: "inverter-fleet", role: "attack-path", status: "open" },
      { id: "dr2", from: "remote-om", to: "inverter-fleet", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L152. The row names five sources of inherited exposure; they are
       grouped into the two that are routes (update channel / cloud service,
       OEM maintenance tool) and the one that is the thing delivered (the
       vulnerable product or replacement component itself). */
    id: "supply-chain",
    name: same("Supply-chain compromise"),
    entryPoint: same("Update channel, OEM tool or cloud service"),
    pathway: same(
      "Vulnerable product, software update channel, OEM maintenance tool, cloud service, or replacement component creates inherited exposure"
    ),
    consequence: same(
      "Fleet-scale impact, delayed maintenance, unavailable support, or a common-mode control failure"
    ),
    decision: same("Compare vendors and procure controls against modeled system consequence"),
    diagramTitle: same("Update channel and OEM maintenance routes carrying inherited exposure into the estate"),
    assets: [
      {
        id: "update-channel",
        type: "service",
        label: "Software update channel or cloud service",
        description: "The supplier-operated channel exposure is inherited through."
      },
      {
        id: "oem-tool",
        type: "remote-access",
        label: "OEM maintenance tool",
        description: "The vendor maintenance tool used against the estate."
      },
      {
        id: "vulnerable-product",
        type: "field-device",
        label: "Vulnerable product or replacement component",
        description: "The delivered product or spare carrying the inherited exposure.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "sc1", from: "update-channel", to: "vulnerable-product", role: "vendor-access", status: "open" },
      { id: "sc2", from: "oem-tool", to: "vulnerable-product", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L153 — NO GRAPH, see the file docblock. Nothing in this pathway
       is an OT asset: it is threat activity, conflict, weather and utility
       disruption acting on a site or a region. */
    id: "external-pressure",
    name: same("External pressure and physical disruption"),
    entryPoint: same("Threat activity, weather, fuel or telecom disruption"),
    pathway: same(
      "Threat activity, conflict, weather, wildfire, flood, fuel disruption, or telecom failure affects a site or region"
    ),
    consequence: same("Increased likelihood of outage, constrained restoration, or compounded interdependency"),
    decision: same("Recalculate exposure based on site-specific external context"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "This scenario's pathway names no OT asset and no reachable route — it is external context acting on a whole site or region. It is carried here because the source carries it, and because the decision below is what the Twin does with it."
    )
  }
];

/* ── Closing paragraph ──────────────────────────────────────────────────── */

export const SCENARIOS_CLOSING = {
  /** Source L155, verbatim. */
  text: same(
    "The platform is designed to combine threat-actor intelligence, known-exploited vulnerabilities, supplier/product context, geopolitical and climate-related inputs, and site-specific operational impact rather than treating cyber likelihood as a static score."
  ),
  /* L155's trailing citation marker, resolved — same resolution as L170, L258
     and architecture L129. See the file docblock. */
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};
