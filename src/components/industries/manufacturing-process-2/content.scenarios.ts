/**
 * S04 · MANUFACTURING RISK SCENARIOS — source L141–L160 of
 * `new_material_source/1_website_layout_v4/3_industries/industry_manu-process.md`.
 *
 * ALL EIGHT SCENARIOS, ALL FOUR COLUMNS, VERBATIM. The source table at
 * L149–L158 has four columns — Scenario, Example pathway, Potential process
 * consequence, Candidate decision — and every one of the 32 cells is
 * transcribed below without a word changed, added or dropped. `entryPoint` is
 * the only additional string per row; it is a short register label lifted from
 * the row's own pathway sentence, not new content.
 *
 * WHAT IS TRANSCRIBED AND WHAT IS DERIVED. The prose is transcribed. The
 * `assets`/`paths` graph per scenario is DERIVED — the source writes each
 * pathway as one sentence, and turning that sentence into typed
 * `SystemAsset`/`SystemPath` records is a structuring decision, the same one
 * the Energy build's `content.scenarios.ts` makes. Each scenario below carries
 * a comment saying exactly what was grouped or ordered and why. No vendor,
 * product, model number, line, site or protocol is invented anywhere: node
 * labels are the source's own asset words.
 *
 * THE CHAIN IS FIVE STAGES AND ONLY THE FIRST TWO ARE DRAWN. L147 asks for
 * "entry point → reachable asset → process effect → business/safety impact →
 * possible control". The graph carries stages 1–2; stages 3–5 are text captions
 * beneath it. That is not the graph stopping early — it is the source's own
 * column split. Column 2 ("Example pathway") names entry points and reachable
 * assets and nothing else; column 3 ("Potential process consequence") names
 * process EFFECTS — off-spec product, trip, manual operation, loss of view —
 * which are process states, not `SystemAsset` records, and column 4 names a
 * decision. Not one of the eight pathway sentences names a piece of process
 * equipment, so there is no honest third node to draw. Forcing "off-spec
 * product" into the topology as a terminal node would print an asset that does
 * not exist, which `OXOT_content-to-visual-mapping-table.md`'s contract
 * separates deliberately.
 *
 * FOUR OF THE EIGHT CARRY NO GRAPH, and each says why in place of one. This is
 * a higher no-graph count than Energy's two, and it is not laziness: every one
 * of the four was checked against L147's chain shape and fails it at a named
 * stage. The rule applied is the sibling page's, unchanged — do not invent a
 * stage the source does not name:
 *   · `unsafe-config-change` (L153) has no entry point and no reachable asset.
 *     What acts is a planned change; what it alters is a communication PATH,
 *     which in the Twin contract is an edge between two assets, and the source
 *     names neither endpoint.
 *   · `recipe-batch-dosing` (L155) names four reachable assets and no entry
 *     point at all — its pathway begins "Compromise reaches". Verbatim the
 *     construction the Energy build refused at its own L150, refused here on
 *     the same grounds so the two pages do not contradict each other.
 *   · `undocumented-drift` (L157) names no route and no reachable asset: an
 *     unrecorded change accumulating across maintenance cycles is a divergence
 *     between the model and the plant, not a pathway through it.
 *   · `external-pressure` (L158) names no OT asset — threat activity,
 *     geopolitics, supplier disruption, local conditions. External context.
 * All four still render their pathway, consequence and decision text in full. A
 * stated gap, not an omission — do not "fix" these by adding nodes.
 *
 * EDGE STATUS. Every edge is `open` except `safety-barrier-exposure`'s two,
 * which are `unknown`, and the difference is the source's own wording. Seven
 * rows say a route REACHES, DISRUPTS or AFFECTS something. L154 says the
 * pathway "terminates NEAR a safety-critical function or its supporting
 * controls" — near, not at. An `open` attack path into the safety function
 * would claim a reachability the brief pointedly does not claim; `unknown`
 * renders slate and says an adjacency exists whose state is not established.
 * Nothing on this page is validated-closed: the register shows modelled
 * exposure before controls are tested, and column 4 is what the Twin would let
 * a plant test NEXT.
 *
 * L160'S TRAILING CITATION MARKER IS DELIBERATELY NOT RESOLVED TO
 * `/technical-specification`, and that is a departure from this page's other
 * dangling markers (`content.ts` L177 and L262, both resolved that way). Those
 * cite "the underlying OXOT approach" — OXOT's own material, so OXOT's own
 * specification is the right destination. L160 cites what "industrial guidance
 * commonly recommends" about remote access, which is external guidance. Linking
 * that to OXOT's Technical Specification would attribute an industry
 * recommendation to OXOT. The sentence renders verbatim with no link, and the
 * gap is recorded here rather than papered over with a plausible-looking one.
 *
 * `Bilingual`-typed prose via `same()`; `nl` is a placeholder pending
 * translation, per ../registry.ts. `SystemAsset.label`/`.description` are plain
 * strings by contract (already-localized, authored per scenario) and so stay
 * untyped by `Bilingual` here, matching the shared Twin components.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const SCENARIOS_SECTION = {
  id: "scenarios",
  /** The section's ordinal on the page — S01 reality, S02 architecture, S03 assets. */
  index: "04",
  /** Source L141, the brief's own section name. */
  datumLabel: same("Risk scenarios"),
  /** Source L145, verbatim, curly quotes and all. */
  heading: same("The relevant question is not “Is it vulnerable?” It is “What happens here?”")
};

/**
 * Source L147's chain, split at its own arrows. The source writes these five
 * stages in lower case inside a bold run mid-sentence; they are sentence-cased
 * here because they render as standalone chips, which is display casing and not
 * a wording change.
 */
export const CHAIN_STAGES: readonly Bilingual[] = [
  same("Entry point"),
  same("Reachable asset"),
  same("Process effect"),
  same("Business/safety impact"),
  same("Possible control")
];

export const CHAIN_LABEL = same("Each scenario opens an illustrated example");

/**
 * The legend's own note on where the chain splits. Authored UI chrome, not
 * source prose — it exists because only the first two stages are drawn and a
 * reader should be told that rather than left to infer a diagram gave up. See
 * the file docblock for why the split falls there.
 */
export const CHAIN_SPLIT_NOTE = same(
  "The first two stages are drawn wherever a scenario names them. The last three are stated beneath the drawing — a process effect is a plant state, not an asset."
);

/* ── The eight scenarios ────────────────────────────────────────────────── */

export interface ManufacturingScenario {
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

export const SCENARIOS: readonly ManufacturingScenario[] = [
  {
    /* Source L151. Two named ways in — a compromised account and an unmanaged
       route — converging on the one asset the row names as reached. The "or"
       is drawn as two entries into a single target, not as a sequence: the row
       says either reaches the workstation, not that one reaches the other. */
    id: "vendor-remote-access",
    name: same("Vendor remote access"),
    entryPoint: same("Compromised vendor account or unmanaged route"),
    pathway: same("Compromised vendor account or unmanaged remote route reaches an engineering workstation"),
    consequence: same("Logic or configuration changes, loss of view/control, unauthorized program transfer"),
    decision: same("Broker, time-limit, record, and segment access; test the change first"),
    diagramTitle: same("Compromised vendor account and unmanaged remote route reaching an engineering workstation"),
    assets: [
      {
        id: "vendor-account",
        type: "remote-access",
        label: "Compromised vendor account",
        description: "The vendor's own credentialed access into the plant."
      },
      {
        id: "unmanaged-route",
        type: "remote-access",
        label: "Unmanaged remote route",
        description: "A remote path into the plant that no one brokers or records."
      },
      {
        id: "vendor-ews",
        type: "engineering-workstation",
        label: "Engineering workstation",
        description: "The engineering workstation this pathway reaches.",
        criticality: "important"
      }
    ],
    paths: [
      { id: "vra1", from: "vendor-account", to: "vendor-ews", role: "vendor-access", status: "open" },
      { id: "vra2", from: "unmanaged-route", to: "vendor-ews", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L152. Five disrupted systems in an "or" list, so a fan-out from
       the enterprise compromise rather than a chain through them. Domain
       services and file shares are drawn as ONE node — both are enterprise
       directory/share infrastructure and the row lists them adjacently; that
       is a grouping, not a claim that they are the same system. */
    id: "ransomware-it-ot",
    name: same("Ransomware crossing IT/OT"),
    entryPoint: same("Enterprise compromise"),
    pathway: same(
      "Enterprise compromise disrupts historian, MES, domain services, file shares, or engineering workstations"
    ),
    consequence: same(
      "Lost production visibility, manual operation, delayed recipe/quality release, controlled shutdown"
    ),
    decision: same("Identify dependencies and define segmentation/recovery priorities"),
    diagramTitle: same(
      "Enterprise compromise disrupting historian, MES, domain services, file shares and engineering workstations"
    ),
    assets: [
      {
        id: "enterprise-compromise",
        type: "service",
        label: "Enterprise compromise",
        description: "The compromise on the enterprise side of the plant boundary."
      },
      {
        id: "historian",
        type: "service",
        /* THE ONE `symbol` OVERRIDE IN THIS FILE, AND IT IS A PARTIAL FIX WITH
           A NAMED REMAINDER. Four of this scenario's five nodes are typed
           `service`, so four different systems drew one silhouette — the defect
           docs/diagram-system/using-the-library.md §10.2 says is the one worth
           fixing. It is worse than a coarseness here, because `ServiceGlyph`'s
           four tiles mean "a TIER of software systems" (AssetNode.tsx's own
           words), which is false of one named historian. `cset/historian` is
           CISA/INL's published mark for exactly this: a cylinder with a trend
           trace, i.e. stored process history.

           LEGIBLE HERE, MEASURED NOT ASSUMED — and measured off the CTM, not
           off a bounding box. `TwinExplorer` renders an `AssetNode` as a `<g>`,
           whose `getBoundingClientRect` returns the mark's INK box rather than
           its cell, so reading that would have compared the wrong two numbers.
           Taken from `getScreenCTM().a` on the node group with this scenario
           selected, at a 1440 viewport, light theme, deviceScaleFactor 1: one
           user unit is 1.1685 css px, so the 32-unit cell renders 37.39 px.
           The mark's tightest white is the 3.0-unit gap between the cylinder's
           lower ellipse (y 10.6) and the trend trace (y 13.6), less the 1.3
           stroke — 1.7 units, needing 32 / 1.7 ≈ 18.8 px. Twice the floor.

           THE OTHER THREE `service` NODES KEEP THE SILHOUETTE, because the only
           marks that would fix them (`cset/server` for MES and for domain and
           file services) are published in ./cset-glyphs.tsx but absent from
           `CURATED_SYMBOLS` in AssetNode.tsx, which this page must not edit
           unilaterally — that table is the client bundle's used set and is
           shared with every other industry page. An unlisted slug falls back to
           the silhouette and warns rather than throwing, so naming one here
           would ship a console warning and no visual change. Tracked as a
           one-line addition to that table, not routed around. */
        symbol: "cset/historian",
        label: "Historian",
        description: "The process history the plant reads production from.",
        criticality: "important"
      },
      {
        id: "mes",
        type: "service",
        label: "MES",
        description: "Manufacturing execution — the system that releases and tracks work.",
        criticality: "important"
      },
      {
        id: "domain-file",
        type: "service",
        label: "Domain services and file shares",
        description: "The directory and share infrastructure plant systems depend on."
      },
      {
        id: "ransomware-ews",
        type: "engineering-workstation",
        label: "Engineering workstations",
        description: "The engineering workstations among the disrupted systems.",
        criticality: "important"
      }
    ],
    paths: [
      { id: "rw1", from: "enterprise-compromise", to: "historian", role: "attack-path", status: "open" },
      { id: "rw2", from: "enterprise-compromise", to: "mes", role: "attack-path", status: "open" },
      { id: "rw3", from: "enterprise-compromise", to: "domain-file", role: "attack-path", status: "open" },
      { id: "rw4", from: "enterprise-compromise", to: "ransomware-ews", role: "attack-path", status: "open" }
    ]
  },
  {
    /* Source L153 — NO GRAPH, see the file docblock. */
    id: "unsafe-config-change",
    name: same("Unsafe configuration change"),
    entryPoint: same("A firewall, VLAN, routing or replacement change"),
    pathway: same(
      "Firewall, VLAN, routing, patching, or replacement alters a required control-system communication path"
    ),
    consequence: same("Loss of communications, unstable process control, trip, loss of monitoring, delayed recovery"),
    decision: same("Simulate the change in the Twin before implementation"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "This pathway has neither of the chain's first two stages. What acts is a planned change — firewall, VLAN, routing, patching or replacement — not an entry point; and what it alters is a communication path, which in the Twin's data contract is an edge between two assets. This scenario names the devices changed but neither endpoint of the path they carry, so no route is drawn rather than two endpoints being invented."
    )
  },
  {
    /* Source L154. One route in, two things it ends beside — the safety
       function and the controls supporting it — so a branch, not a sequence.
       BOTH EDGES ARE `unknown`, NOT `open`: the row says the pathway
       "terminates near" these, and near is not reached. See the file docblock. */
    id: "safety-barrier-exposure",
    name: same("Safety-barrier exposure"),
    entryPoint: same("A reachable pathway"),
    pathway: same("A reachable pathway terminates near a safety-critical function or its supporting controls"),
    consequence: same("Reduced ability to detect or respond to abnormal process conditions"),
    decision: same("Map cyber pathway to SIL/SCIL context and prioritize protection"),
    diagramTitle: same("A reachable pathway terminating near a safety-critical function and its supporting controls"),
    assets: [
      {
        id: "reachable-pathway",
        type: "remote-access",
        label: "A reachable pathway",
        description: "The route this scenario names, without naming where it starts."
      },
      {
        id: "safety-critical-function",
        type: "safety-function",
        label: "Safety-critical function",
        description: "The protective function the scenario is named for.",
        criticality: "critical"
      },
      {
        id: "supporting-controls",
        type: "controller",
        label: "Supporting controls",
        description: "The controls the safety function depends on.",
        criticality: "critical"
      }
    ],
    paths: [
      {
        id: "sbe1",
        from: "reachable-pathway",
        to: "safety-critical-function",
        role: "attack-path",
        status: "unknown"
      },
      { id: "sbe2", from: "reachable-pathway", to: "supporting-controls", role: "attack-path", status: "unknown" }
    ]
  },
  {
    /* Source L155 — NO GRAPH, see the file docblock. The row names four
       reachable assets and no entry point whatsoever; its pathway begins
       "Compromise reaches", with the compromise itself unspecified. */
    id: "recipe-batch-dosing",
    name: same("Recipe, batch, or dosing manipulation"),
    entryPoint: same("Compromise of a recipe or batch system"),
    pathway: same("Compromise reaches a recipe server, batch engine, HMI, or controller tag"),
    consequence: same("Off-spec product, waste, rework, quality event, or customer impact"),
    decision: same("Trace the route, validate constraints, and test controls"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "This scenario names the reachable systems but states no entry point — its pathway begins simply “Compromise reaches”. No route is drawn rather than one being invented; the recipe server, batch engine, HMI and controller tag are named in the pathway above."
    )
  },
  {
    /* Source L156. Four sources of inherited exposure; they are grouped into
       the two that are routes into the plant (the software dependency and the
       external support tool) and the one that is the thing delivered (the
       vendor component itself). "Supplier disruption" is drawn as NO node —
       a disruption is an event, not an asset — and stays in the pathway text
       where the source puts it. */
    id: "supply-chain-compromise",
    name: same("Supply-chain compromise"),
    entryPoint: same("Vendor component, dependency or support tool"),
    pathway: same(
      "Vulnerable vendor component, software dependency, external support tool, or supplier disruption affects the environment"
    ),
    consequence: same("Inherited exposure, delayed maintenance, availability or quality impact"),
    decision: same("Compare supplier/control options with a common consequence model"),
    diagramTitle: same(
      "Software dependency and external support tool carrying inherited exposure into a vendor component"
    ),
    assets: [
      {
        id: "software-dependency",
        type: "service",
        label: "Software dependency",
        description: "The supplier-maintained dependency exposure is inherited through."
      },
      {
        id: "external-support-tool",
        type: "remote-access",
        label: "External support tool",
        description: "The outside support tooling used against the environment."
      },
      {
        id: "vendor-component",
        type: "field-device",
        label: "Vulnerable vendor component",
        description: "The delivered component carrying the inherited exposure.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "scc1", from: "software-dependency", to: "vendor-component", role: "vendor-access", status: "open" },
      { id: "scc2", from: "external-support-tool", to: "vendor-component", role: "vendor-access", status: "open" }
    ]
  },
  {
    /* Source L157 — NO GRAPH, see the file docblock. */
    id: "undocumented-drift",
    name: same("Undocumented drift"),
    entryPoint: same("An unrecorded control or network change"),
    pathway: same("An unrecorded control or network change accumulates across maintenance cycles"),
    consequence: same("Security assumptions and engineering documentation no longer reflect reality"),
    decision: same("Detect model deltas and evaluate changed reachability"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "This scenario's pathway names no entry point and no reachable asset. An unrecorded change accumulating across maintenance cycles is a divergence between the model and the plant, not a route through it — which is exactly why the decision below is about detecting model deltas rather than about closing a path."
    )
  },
  {
    /* Source L158 — NO GRAPH, see the file docblock. Nothing in this pathway
       is an OT asset: it is threat activity, geopolitics, supplier disruption
       and local conditions acting on the plant from outside. */
    id: "external-pressure",
    name: same("External pressure"),
    entryPoint: same("Threat activity, geopolitics or local conditions"),
    pathway: same(
      "Threat activity, geopolitical events, supplier disruption, or local environmental conditions change"
    ),
    consequence: same("Likelihood changes while the plant remains technically unchanged"),
    decision: same("Recalculate exposure and refresh decision priorities"),
    diagramTitle: same(""),
    assets: [],
    paths: [],
    noGraphReason: same(
      "This scenario's pathway names no OT asset and no reachable route — it is external context acting on the plant from outside. It is carried here as real context rather than as a drawable route, because the decision below is what the Twin does with it."
    )
  }
];

/* ── Closing note ───────────────────────────────────────────────────────── */

export const SCENARIOS_CLOSING = {
  eyebrow: same("Remote access"),
  /** Source L160, verbatim. Its trailing citation marker is deliberately NOT
   *  resolved to a link — see the file docblock. */
  text: same(
    "For remote access specifically, industrial guidance commonly recommends operator-controlled, time-limited access; multi-factor authentication; monitoring; and avoiding persistent vendor connections into the control network."
  )
};
