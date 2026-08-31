/**
 * S06 · ENERGY & UTILITIES — the Three-Gate Ledger's scenario record, canvas
 * geometry and gate copy.
 *
 * SOURCE, line for line: `new_material_source/1_website_layout_v4/3_industries/
 * industry_energy.md` L172–240, the spec's own "Worked use case" section. Every
 * heading, claim-boundary string, narrative paragraph, Twin input, chain step,
 * candidate control, result clause and citation below carries its `L<n>` inline.
 * Spec citations are to `OXOT_Layout_Styles.md` Pattern 2 and
 * `OXOT_Visual_Foundation_Spec.md` §7.
 *
 * NO WAVE 0 SPLIT, unlike the water pages: they moved the scenario into
 * `content.scenario.ts` because their hero renders the same record, whereas this
 * page's hero draws the four synchronized views from `HERO`. No second consumer,
 * no split. What is shared is the *contract* — `SystemAsset` / `SystemPath` —
 * not a copy of it.
 *
 * THE EIGHT CANVAS ASSETS ARE SCENARIO INSTANCES, NOT THE NINE ASSET CLASSES in
 * `content.assets.ts`: the specific systems L189–207 and L213–223 name in *this*
 * scenario, typed against the same union so the shared glyph set draws them. No
 * vendor, product, site, voltage or feeder ID is invented — the spec states
 * none, and an authentic-looking annotation would be a fabricated engineering
 * fact.
 *
 * WHERE THE CROSSHAIR GOES IS DECLARED, NOT DERIVED FROM GEOMETRY. The water
 * precedent infers insertion points from the `from` endpoint of each closed
 * route. That inference breaks on candidate four: "Patch or upgrade component"
 * (L233) closes no route at all — its own outcome is that it "does not
 * necessarily eliminate access-path risk" — yet is unambiguously inserted *at*
 * the reachable component. Deriving marks from closed routes would leave it
 * marking nothing and reporting no discrepancy, reading as "this control does
 * nothing" rather than as the spec's actual finding. `insertAt` therefore states
 * the insertion point from the source text for every candidate.
 *
 * ONE HONEST GAP, DECLARED RATHER THAN FILLED. §7's Decision-output panel asks
 * for five things. Four are in the source: the recommended sequence and the
 * implementation window both inside L238 ("schedule disruptive work into an
 * engineered outage" is a window in kind, and L234 sequences it the same way),
 * the evidence needed at L189–207, and the validation condition in L238's own
 * "prove that the new boundary supports required flows". The fifth, a
 * responsible role, is assigned nowhere here and is printed as NOT ASSERTED.
 * Inventing an owner on a page whose argument is that evidence is traceable
 * would be the one claim in the section a reader could catch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

/* ── Section shell ───────────────────────────────────────────────────────── */

export const SECTION = {
  id: "worked-example",
  index: "06",
  /* L172, the spec's own H2 for this block. */
  datumLabel: same("Worked use case"),
  /* L176, verbatim. */
  heading: same("Worked example: redesign remote vendor access to a generation unit without disrupting operations."),
  /* L178, verbatim, em dash normalised to spaced. Pattern 2's guardrail: this
     string renders on the heading line and is never conditional on state. */
  claimBoundary: same("Illustrative scenario — no customer data.")
};

/* L182 and L184, verbatim. The second paragraph is operations' objection, which
   is the reason this ledger carries five candidate controls and not one
   recommendation. */
export const SCENARIO_PROSE: Bilingual[] = [
  same("A combined-cycle, thermal, hydro, or large renewable-generation site uses OEM remote support for a critical controller environment. The vendor route supports diagnostics and maintenance, but its connection has accumulated exceptions over time. It reaches an engineering workstation within the operational environment."),
  same("A risk assessment identifies a known vulnerability affecting a component in the reachable path. Security proposes cutting access immediately. Operations objects because the OEM may be required for fault diagnosis, startup support, performance tuning, and outage recovery.")
];

/* ── The scenario's assets ───────────────────────────────────────────────── */

/**
 * Eight systems, each named by L189–207's input categories or L213–223's chain.
 * Labels are type-representative, as in `content.assets.ts`. Criticality follows
 * that file's stated derivation rather than a second, private one.
 *
 * ── SYMBOLS, 2026-08-29 ───────────────────────────────────────────────────
 *
 * Run against `docs/diagram-system/using-the-library.md` §1, this canvas stops
 * at question 1 and does not reach question 5. `SystemPath.status` carries
 * BASELINE / CLOSED / CONTROLLED / RESIDUAL as colour through `PathEdge`, and
 * the whole section is the reader watching those states change as they pick a
 * candidate control — which is the textbook case §7 names as "no edge state,
 * no colour channel". Question 3 fires too (`ThreeGateLedger` is `"use
 * client"`). So the bespoke canvas stays and §4 applies to the MARKS only.
 *
 * TWO SLUGS ADDED, closing the one duplicate: `ot-firewall` and
 * `remote-access-jump-host` were both bare `network-device` and drew one
 * identical LAN topology for a boundary and a host. See each record.
 *
 * TWO MARKS ARE STILL WRONG AND CANNOT BE FIXED FROM THIS PAGE. Stating them
 * beats leaving them, because a wrong mark that nobody wrote down is how a
 * missing symbol becomes an invisible compromise instead of a work item:
 *
 *   generating-unit    `process-equipment` draws draw.io's "Container, Tank,
 *                      Cistern" — an OPEN-TOPPED WATER CISTERN, correct for the
 *                      vented dosing tanks it was chosen for on the water pages
 *                      and false for a generating unit. This is the same class
 *                      of error as ww3's metering pump drawn as a tank, on the
 *                      one node where the modelled chain becomes lost
 *                      generation. IEC 60617 draws a rotating machine as a
 *                      circle lettered `G`; twin/electrical-hand-drawn.tsx
 *                      publishes `AcSource`, `Battery`, `PhotovoltaicArray` and
 *                      `InverterBridge` but NO generator, so there is nothing to
 *                      point at yet and nothing here may be borrowed instead.
 *   protection-relay   `safety-function` draws the hand-drawn octagon, which
 *                      AssetNode.tsx itself flags as "unresolved rather than
 *                      settled". twin/electrical-instruments-hand-drawn.tsx
 *                      publishes `MeasuringRelay` — the IEC 60617-08 relay
 *                      rectangle marked `I>` — and the site's own energy
 *                      single-line already uses it as
 *                      `oxot/electrical/measuring_relay`. It is not in
 *                      `CURATED_SYMBOLS`, and that table is out of this page's
 *                      ownership. One line there closes it, and it is the single
 *                      highest-value addition for this sector: the same mark
 *                      would serve `content.assets.ts`'s protection-relay class
 *                      and `content.scenarios.ts`'s `relay-config`.
 *
 * THE OTHER FOUR KEEP THEIR TYPE SILHOUETTES AND SHOULD. `oem-remote-support`,
 * `engineering-workstation`, `unit-controller` and `control-room-hmi` each draw
 * a distinct, already-correct iX mark, and no two of them collide. Swapping a
 * correct mark for a different correct mark buys nothing and costs a review.
 */
export const CANVAS_ASSETS: SystemAsset[] = [
  {
    /* L182 (OEM remote support) and L215 (the chain's first step). */
    id: "oem-remote-support", type: "remote-access", label: "OEM remote-support endpoint", criticality: "important",
    description: "The vendor's own remote-support endpoint and the credentials behind it — the first step of the modelled chain."
  },
  {
    /* L195 (jump hosts) read with L217 (operational DMZ / remote-access route).
       `cset/remote-access-server` — CSET's own mark for a host that terminates
       an inbound remote-support session at a boundary: a chassis with the
       boundary drawn as a dashed rule to its left and the session crossing it.
       That is what this asset IS, and it is also the second half of the fix
       described on `ot-firewall` below. The `network-device` silhouette it
       replaces is a LAN TOPOLOGY — an uplink, a trunk and two attached devices
       — which states that this node is a segment rather than a host.

       IT DOES NOT COLLIDE WITH `oem-remote-support`, which was checked before
       this slug was chosen rather than after: that asset draws Siemens iX
       `remote-access`, two overlapping LANDSCAPE screens with an outbound
       arrow, and this one draws a tall PORTRAIT chassis with a dashed boundary
       beside it. Different outline family, different silhouette. */
    id: "remote-access-jump-host", type: "network-device", symbol: "cset/remote-access-server",
    label: "Operational DMZ jump host", criticality: "important",
    description: "The jump host in the operational DMZ carrying the remote-support route inward."
  },
  {
    /* L195: firewalls, VLANs, routing, and data flows.

       THE DEFECT THIS FIXES, READ OFF THE RENDERED CANVAS RATHER THAN ARGUED.
       `remote-access-jump-host` above and this asset were both `network-device`
       with no `symbol`, so both drew the SAME iX `network-wired` silhouette —
       and on this canvas they sit ADJACENT, joined by the very edge whose
       crossing is this section's finding. A screenshot at deviceScaleFactor 1
       shows two identical marks with only the caption separating a boundary
       from a host. That is the same class of false statement
       `water-wastewater-3`'s dosing skid and metering pump made about a plant,
       and `twin/types.ts::SystemAsset.symbol` exists for exactly it.

       `cset/firewall` is the mark, not `cset/router` or `cset/vlan_router`: the
       label names all three functions, but every candidate control in this
       ledger acts on the BOUNDARY — the accumulated exceptions are exceptions
       in a policy, not routes in a table. Same reasoning ww3's
       `maintenance-network-firewall` records. CSET is the right NAMESPACE here
       because this canvas is an architecture / attack-path drawing, which is
       what §5.2 of docs/diagram-system/using-the-library.md reserves `cset/…`
       for; an ISA bubble belongs on a P&ID and there is no P&ID on this page. */
    id: "ot-firewall", type: "network-device", symbol: "cset/firewall",
    label: "OT firewall / VLAN boundary", criticality: "important",
    description: "The firewall, VLAN and routing boundary between the DMZ route and the operational zone — where the accumulated exceptions sit."
  },
  {
    /* L182 ("reaches an engineering workstation"), L196, L219. */
    id: "engineering-workstation", type: "engineering-workstation", label: "Engineering workstation", criticality: "important",
    description: "The engineering workstation inside the OT zone the vendor route reaches, and from which control and protection configuration is authored."
  },
  {
    /* L197 (PLC / DCS / RTU configuration context), L219 (reachable control
       component), L184 (the component carrying the known vulnerability). */
    id: "unit-controller", type: "controller", label: "Unit DCS / PLC", criticality: "critical",
    description: "The unit's DCS or PLC — the reachable control component, and the one carrying the vulnerability the risk assessment identified."
  },
  {
    /* L197 (IED) read with L191 (protection, safety, and operating limits) and
       L219 (reachable protection component). */
    id: "protection-relay", type: "safety-function", label: "Protection relay / IED", criticality: "critical",
    description: "The protection relay or IED reachable from the same engineering path, and the operating limits it enforces."
  },
  {
    /* L197 (HMI) read with L221 (loss of view/control). */
    id: "control-room-hmi", type: "hmi", label: "Control-room HMI", criticality: "important",
    description: "The control-room interface onto the unit — the view whose loss is the first operational symptom in the modelled chain."
  },
  {
    /* L182 (generation site) and L221–223 (trip, delayed recovery, lost generation). */
    id: "generating-unit", type: "process-equipment", symbol: "oxot/electrical/generator",
    label: "Generating unit", criticality: "critical",
    description: "The generating unit itself, where the modelled chain stops being a network finding and becomes lost generation and restoration cost."
  }
];

/**
 * Eight routes. `role` carries stroke geometry and `status` carries colour, per
 * the shared `PathEdge` contract — this file never paints an edge itself, which
 * is what keeps the token rule enforceable by the renderer rather than by
 * convention. Every route is `open` at baseline: that is what "as documented"
 * means here, and a route drawn `unknown` would assert an uncertainty the source
 * does not state.
 */
export const SCENARIO_PATHS: SystemPath[] = [
  { id: "p-oem-to-jump-host", from: "oem-remote-support", to: "remote-access-jump-host", role: "vendor-access", status: "open" },
  { id: "p-jump-host-to-firewall", from: "remote-access-jump-host", to: "ot-firewall", role: "vendor-access", status: "open" },
  { id: "p-firewall-to-ews", from: "ot-firewall", to: "engineering-workstation", role: "attack-path", status: "open" },
  { id: "p-ews-to-controller", from: "engineering-workstation", to: "unit-controller", role: "management", status: "open" },
  { id: "p-ews-to-relay", from: "engineering-workstation", to: "protection-relay", role: "management", status: "open" },
  { id: "p-controller-to-unit", from: "unit-controller", to: "generating-unit", role: "required-flow", status: "open" },
  { id: "p-relay-to-unit", from: "protection-relay", to: "generating-unit", role: "required-flow", status: "open" },
  { id: "p-controller-to-hmi", from: "unit-controller", to: "control-room-hmi", role: "required-flow", status: "open" }
];

/* ── The shared canvas: geometry ─────────────────────────────────────────── */

/**
 * WHY LAYOUT DATA SITS IN A CONTENT FILE. These tables place *this* scenario's
 * eight nodes and eight routes and are useless to any other scenario, so they
 * travel with its copy rather than with the renderer — and keeping them here is
 * what holds `ThreeGateLedger.tsx` under the project's 500-line limit.
 *
 * Hand-authored rather than laid out by ELK, the same decision `CascadeCanvas`
 * and `/decisions/change-safely` record: the canvas re-renders on every control
 * selection, and re-running a layout each time would make the nodes jump, which
 * reads as a live simulation running in the browser — a claim OXOT does not
 * make. Fixed geometry holds the nodes still so the only thing that moves is the
 * only thing that changed, each route's state.
 *
 * THE SHAPE IS THIS PAGE'S SIGNATURE, a single-line diagram (see `Rule.tsx`):
 * one spine running left to right from the vendor endpoint to the generating
 * unit, with the engineering and control-room systems tapping off above it and
 * the protection function below.
 */
export const NODE_W = 150;
export const NODE_H = 42;
/** Label text runs from the glyph's right edge to the node's inner right edge. */
export const NODE_TEXT_W = NODE_W - 36 - 8;
export const VIEWBOX = { w: 900, h: 292 };

export const NODE_POS: Record<string, { x: number; y: number }> = {
  "engineering-workstation": { x: 366, y: 52 },
  "control-room-hmi": { x: 726, y: 52 },
  "oem-remote-support": { x: 6, y: 140 },
  "remote-access-jump-host": { x: 186, y: 140 },
  "ot-firewall": { x: 366, y: 140 },
  "unit-controller": { x: 546, y: 140 },
  "generating-unit": { x: 726, y: 140 },
  "protection-relay": { x: 546, y: 232 }
};

/** Orthogonal routes in the same point-sequence shape `PathEdge` already
 *  consumes from ELK, so the shared renderer is untouched. */
export const ROUTE_POINTS: Record<string, Array<{ x: number; y: number }>> = {
  "p-oem-to-jump-host": [{ x: 156, y: 161 }, { x: 186, y: 161 }],
  "p-jump-host-to-firewall": [{ x: 336, y: 161 }, { x: 366, y: 161 }],
  "p-firewall-to-ews": [{ x: 441, y: 140 }, { x: 441, y: 94 }],
  "p-ews-to-controller": [{ x: 516, y: 73 }, { x: 621, y: 73 }, { x: 621, y: 140 }],
  /* Down the 336–366 gutter rather than straight down from the workstation: a
     vertical at x=396 would run through the OT-firewall node's own box. */
  "p-ews-to-relay": [{ x: 366, y: 73 }, { x: 346, y: 73 }, { x: 346, y: 253 }, { x: 546, y: 253 }],
  "p-controller-to-unit": [{ x: 696, y: 161 }, { x: 726, y: 161 }],
  "p-relay-to-unit": [{ x: 696, y: 253 }, { x: 786, y: 253 }, { x: 786, y: 182 }],
  "p-controller-to-hmi": [{ x: 591, y: 140 }, { x: 591, y: 112 }, { x: 801, y: 112 }, { x: 801, y: 94 }]
};

/** The legend's swatch colours — deliberately the same four tokens `PathEdge`
 *  paints the edges with. A legend fed from a second table is a legend that can
 *  silently stop matching the thing it explains. */
export const STATUS_SWATCH: Record<SystemPath["status"], string> = {
  open: "hsl(var(--signal-blue))",
  controlled: "hsl(var(--signal-amber))",
  closed: "hsl(var(--signal-green))",
  unknown: "hsl(var(--signal-slate))"
};

/* ── Lookups derived from the record above ───────────────────────────────── */

const BY_ID = new Map(CANVAS_ASSETS.map((a) => [a.id, a]));

export const assetLabel = (id: string) => BY_ID.get(id)?.label ?? id;

/** A route named end to end, so the reader never meets a raw path id. */
export const routeLabel = (id: string) => {
  const edge = SCENARIO_PATHS.find((p) => p.id === id);
  return edge ? `${assetLabel(edge.from)} → ${assetLabel(edge.to)}` : id;
};

export const ENTRY_ASSET_ID = "oem-remote-support";
export const TARGET_ASSET_ID = "unit-controller";
/** The systems the chain passes through between entry and target — L217 and
 *  L219's second and third steps, in order. */
export const INTERMEDIATE_IDS = ["remote-access-jump-host", "ot-firewall", "engineering-workstation"];

/** Split a node label into two balanced lines at a word boundary. Part of the
 *  canvas contract rather than of the renderer: it exists because these specific
 *  labels run longer than `NODE_TEXT_W` at the 11px technical-label floor. */
export function wrapLabel(text: string, maxChars = 17): string[] {
  const words = text.split(" ");
  if (text.length <= maxChars || words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/* ── The shared canvas: copy ─────────────────────────────────────────────── */

export const CANVAS = {
  title: same("The remote-support route into the generation unit, its engineering and protection paths, and the selected candidate control's effect on each route."),
  /* The legend is load-bearing, not decoration: colour on this canvas carries
     `SystemPath.status` and nothing else, and an unlabelled colour is precisely
     what `OXOT_content-to-visual-mapping-table.md` exists to keep off this site. */
  legendLabel: same("Route state"),
  legend: [
    { status: "open" as const, text: same("As documented — route open") },
    { status: "controlled" as const, text: same("Brought under the candidate control") },
    { status: "closed" as const, text: same("Closed by the modelled result") }
  ],
  discrepancyLabel: same("Nodes whose state differs from the baseline"),
  discrepancyHint: same("Each entry moves the highlight to its node on the canvas above. Select a candidate control to repopulate this list."),
  discrepancyEmpty: same("No candidate is selected, so nothing differs from the baseline yet. The canvas above shows every route as documented."),
  noteClosed: same("route closed"),
  noteControlled: same("required flow preserved"),
  noteInsertion: same("control inserted here")
};

/* ── Gate 1 · Baseline ───────────────────────────────────────────────────── */

export const BASELINE = {
  label: same("Baseline"),
  caption: same("As documented, before any control"),
  entryLabel: same("Entry point"),
  intermediateLabel: same("Intermediate systems"),
  targetLabel: same("Target asset"),
  chainLabel: same("Modelled chain"),
  /* L215–223, the spec's own six-step chain, transcribed step for step. */
  chain: [
    same("Vendor credentials or remote-support endpoint compromised"),
    same("Operational DMZ / remote-access route"),
    same("Engineering workstation in an OT zone"),
    same("Reachable control, protection, or unit-support component"),
    same("Loss of view/control, unsafe configuration possibility, trip, or delayed recovery"),
    same("Lost generation / reliability impact / outage and restoration cost")
  ],
  exceptionLabel: same("Why the route looks like this"),
  /* L182's own account of how the connection reached its present state. */
  exception: same("The vendor route supports diagnostics and maintenance, but its connection has accumulated exceptions over time — so the documented boundary and the reachable one are no longer the same drawing."),
  findingLabel: same("What the risk assessment found"),
  /* L184, first two sentences. */
  finding: same("A known vulnerability affecting a component in the reachable path. Security proposes cutting access immediately."),
  constraintLabel: same("Known constraints"),
  /* L184's objection — the reason "disconnect the vendor" is not an available
     answer, and the constraint every candidate below is scored against. */
  constraint: same("The OEM may be required for fault diagnosis, startup support, performance tuning, and outage recovery. Any answer is bounded by those workflows, not only by the exposure it removes.")
};

/* ── Gate 2 · Proposed control ───────────────────────────────────────────── */

export interface ControlCandidate {
  id: string;
  /** L228–234's first column, verbatim. */
  title: Bilingual;
  /** L228–234's second column, "What the Twin evaluates", verbatim. */
  evaluates: Bilingual;
  /** L228–234's third column, "Likely outcome", verbatim. */
  outcome: Bilingual;
  /** Where the crosshair reticle is drawn — see this file's header. */
  insertAt: string[];
  closesPathIds: string[];
  preservesPathIds: string[];
  residualPathIds: string[];
}

/**
 * The five candidates of L228–234, in the source's own order and wording. The
 * route sets are read from each row's stated evaluation and outcome rather than
 * invented: they are the reason the outcome column says what it says.
 */
export const CONTROL_CANDIDATES: ControlCandidate[] = [
  {
    id: "ctl-remove-vendor-access",
    title: same("Remove vendor access entirely"),
    evaluates: same("Which operations and recovery workflows are lost"),
    outcome: same("Exposure falls, but operational resilience may become unacceptable"),
    insertAt: ["oem-remote-support"],
    closesPathIds: ["p-oem-to-jump-host", "p-jump-host-to-firewall", "p-firewall-to-ews"],
    /* None: removing the route is exactly what loses the recovery workflows the
       outcome column warns about. */
    preservesPathIds: [],
    residualPathIds: ["p-ews-to-controller", "p-ews-to-relay"]
  },
  {
    id: "ctl-broker-access",
    title: same("Broker all access"),
    evaluates: same("MFA, approval, just-in-time sessions, jump host, recording, and command restrictions"),
    outcome: same("Removes persistent pathways while retaining controlled OEM support"),
    insertAt: ["remote-access-jump-host"],
    /* The persistent route to the workstation is what brokering removes; the
       vendor route itself survives under session control, which is the exact
       distinction the outcome column draws. */
    closesPathIds: ["p-firewall-to-ews"],
    preservesPathIds: ["p-oem-to-jump-host", "p-jump-host-to-firewall"],
    residualPathIds: ["p-ews-to-controller", "p-ews-to-relay"]
  },
  {
    id: "ctl-rezone-remote-support",
    title: same("Re-zone remote support"),
    evaluates: same("Virtual firewall and conduit changes; required communications and residual routes"),
    outcome: same("Identifies whether normal operations or emergency support would break"),
    insertAt: ["ot-firewall"],
    closesPathIds: ["p-firewall-to-ews"],
    preservesPathIds: ["p-jump-host-to-firewall", "p-controller-to-hmi"],
    residualPathIds: ["p-oem-to-jump-host", "p-ews-to-controller", "p-ews-to-relay"]
  },
  {
    id: "ctl-patch-or-upgrade",
    title: same("Patch or upgrade component"),
    evaluates: same("Compatibility, residual paths, outage requirements, and changed exposure"),
    outcome: same("May reduce vulnerability risk but does not necessarily eliminate access-path risk"),
    /* Inserted at the component while closing no route — the row's own finding,
       and the case that made `insertAt` explicit rather than derived. */
    insertAt: ["unit-controller"],
    closesPathIds: [],
    preservesPathIds: [],
    residualPathIds: ["p-oem-to-jump-host", "p-jump-host-to-firewall", "p-firewall-to-ews", "p-ews-to-controller", "p-ews-to-relay"]
  },
  {
    id: "ctl-combine-and-time",
    title: same("Combine controls and time work"),
    evaluates: same("Access redesign now; patch/upgrade at planned outage"),
    outcome: same("Creates a defensible sequence with lower immediate operational disruption"),
    insertAt: ["remote-access-jump-host", "ot-firewall", "unit-controller"],
    closesPathIds: ["p-firewall-to-ews"],
    preservesPathIds: ["p-oem-to-jump-host", "p-jump-host-to-firewall", "p-controller-to-hmi"],
    residualPathIds: ["p-ews-to-controller", "p-ews-to-relay"]
  }
];

export const CONTROLS = {
  label: same("Proposed control"),
  caption: same("One candidate at a time, tested against the model"),
  chooseLabel: same("Candidate controls"),
  /**
   * PATTERN 2'S REMEDY (b), MANDATORY. Present at first paint, independent of
   * the selection, and sized to hold the column on its own — because a
   * Proposed-control column that is bare chrome until a user acts fails this
   * pattern regardless of its width. Each entry is sourced rather than written
   * to fill space: (1) is §7's definition of the Proposed-control panel, (2) is
   * L232's "required communications and residual routes" read against L184's
   * objection, (3) is Pattern 2's crosshair-reticle idiom in its own words.
   *
   * REMEDY (a), PRE-SELECTING A CANDIDATE, IS DECLINED — on a content ground,
   * not an ergonomic one. L238 concludes in the source's own words that the
   * answer may be none of the five taken alone, so a checked-by-default radio
   * would print a recommendation this scenario never makes.
   */
  fixed: [
    {
      term: same("What a candidate control is"),
      body: same("A control inserted in the model, not in the plant: the routes it affects, the required flows it preserves, and the residual exposure it leaves. Selecting one re-evaluates every route on the canvas above. The model changes; the unit does not.")
    },
    {
      term: same("How residual exposure is read"),
      body: same("Residual exposure is every route still reachable once the candidate is applied. A route can be preserved and residual at once — a support or recovery flow the site must keep that still carries exposure — and that overlap is the finding, not a modelling error.")
    },
    {
      term: same("The crosshair marker"),
      body: same("A circled cross, drawn in P&ID convention, marks where the selected candidate is inserted on the shared canvas. Every node whose state differs from the baseline keeps a persistent amber outline for as long as that candidate is selected — including a candidate that closes no route at all.")
    }
  ],
  evaluatesLabel: same("What the Twin evaluates"),
  outcomeLabel: same("Likely outcome"),
  insertionLabel: same("Inserted at"),
  closesLabel: same("Routes closed"),
  preservesLabel: same("Required flows preserved"),
  residualLabel: same("Residual exposure"),
  noneClosedLabel: same("None — this candidate closes no route."),
  nonePreservedLabel: same("None — this candidate keeps no support or recovery flow open.")
};

/* ── Gate 3 · Decision output ────────────────────────────────────────────── */

/** L189–207's three input blocks, in the spec's own grouping and order. */
export const EVIDENCE_GROUPS: Array<{ group: Bilingual; items: string[] }> = [
  {
    group: same("Physical and operating evidence"),
    items: [
      "P&IDs / single-line diagrams",
      "Unit or site criticality",
      "Protection, safety, and operating limits",
      "Maintenance, outage, restart, and lost-generation assumptions",
      "Required control, diagnostic, and support workflows"
    ]
  },
  {
    group: same("OT and network evidence"),
    items: [
      "Remote-access architecture",
      "Jump hosts, firewalls, VLANs, routing, and data flows",
      "Engineering workstation and controller relationships",
      "PLC / DCS / RTU / IED / HMI configuration context",
      "Existing security controls and access procedures"
    ]
  },
  {
    group: same("External context"),
    items: [
      "Known exploited vulnerability context",
      "Relevant threat-actor activity",
      "OEM and supply-chain dependencies",
      "Site/region-specific external-pressure inputs"
    ]
  }
];

export const OUTPUT = {
  label: same("Decision output"),
  /* NOT "narrowest, densest" — that is the layout pattern describing itself, and
     an independent critique found build-spec narration leaking into
     customer-facing copy as its most damaging finding. */
  caption: same("What the model recommends, and what it does not claim"),
  /* L238's opening clause, which is this section's actual argument. */
  headlineLabel: same("Not “disconnect the vendor”, and not “replace the system”"),
  recommendedLabel: same("Recommended sequence"),
  /**
   * L238's staged plan, split at its own clause boundaries. The sentence renders
   * whole beneath the gates as `RESULT`; this is the same four instructions as a
   * sequence, because a recommended sequence is a list and reading it as prose
   * loses the ordering the source gives it. Nothing added, reworded or
   * reordered.
   */
  recommended: [
    same("Close persistent exposure first"),
    same("Preserve controlled recovery capability"),
    same("Prove that the new boundary supports required flows"),
    same("Schedule disruptive work into an engineered outage")
  ],
  evidenceLabel: same("Evidence needed"),
  windowLabel: same("Implementation window"),
  /* L234 and L238 sequence the work the same way: access redesign now,
     disruptive work at a planned outage. */
  window: same("Two windows, not one: the access redesign proceeds now, and the patch or upgrade is timed into a planned, engineered outage. The sequence is fixed; the date is not."),
  validationLabel: same("Validation condition"),
  /* L238's own testable clause — the condition deciding whether the modelled
     result held. */
  validation: same("The redesigned boundary is proved to carry every required control, diagnostic and support flow, and controlled recovery capability is retained rather than removed."),
  notAssertedLabel: same("Not asserted by this scenario"),
  /* See the ONE HONEST GAP note in this file's header. */
  notAsserted: same("A responsible role. This scenario assigns none, so none is printed here as though it had been decided."),
  /* §7's claim-boundary rule for safety-sensitive contexts, applied. */
  approvalNote: same("OXOT supports but does not replace engineering approval, safety assessment, operational authority, or return-to-service authority.")
};

/* L238, verbatim — the result message, rendered whole beneath the three gates. */
export const RESULT = same("The best outcome may not be “disconnect the vendor” or “replace the system.” It may be a staged plan: close persistent exposure first, preserve controlled recovery capability, prove that the new boundary supports required flows, and schedule disruptive work into an engineered outage.");

/** L240's own link, transcribed from the source rather than constructed. */
export const NERC_CIP_013_URL = "https://www.nerc.com/standards/reliability-standards/cip/cip-013-3";

/* L240, verbatim, with that link. */
export const CITATION = {
  text: same("NERC’s CIP supply-chain work explicitly focuses on mitigating cybersecurity risks to reliable Bulk Electric System operation through supply-chain controls, while recent low-impact requirements emphasize vendor electronic remote-access protections."),
  linkLabel: same("NERC CIP-013-3"),
  href: NERC_CIP_013_URL
};
