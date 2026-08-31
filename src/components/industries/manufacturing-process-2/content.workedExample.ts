/**
 * S06 · MANUFACTURING & PROCESS — the Three-Gate Ledger's scenario record,
 * canvas geometry and gate copy.
 *
 * SOURCE, line for line: `new_material_source/1_website_layout_v4/3_industries/
 * industry_manu-process.md` L179–245, the spec's own "Worked use case" section.
 * Every heading, claim-boundary string, narrative paragraph, Twin input, chain
 * step, candidate control, result clause and closing sentence below carries its
 * `L<n>` inline. Spec citations are to `OXOT_Layout_Styles.md` Pattern 2 and
 * `OXOT_Visual_Foundation_Spec.md` §7.
 *
 * THE EIGHT CANVAS NODES ARE SCENARIO INSTANCES, NOT THE NINE ASSET CLASSES in
 * `content.assets.ts`: the specific systems L189, L204–207 and L218–228 name in
 * *this* scenario, typed against the same union so the shared glyph set draws
 * them. No vendor, product, site, line number or tag is invented — the spec
 * states none, and a P&ID annotation written to look authentic would be a
 * fabricated engineering fact.
 *
 * WHERE THE CROSSHAIR GOES IS DECLARED, NOT DERIVED FROM GEOMETRY. Two of this
 * scenario's five candidates — "Patch immediately" (L235) and "Replace the
 * controller" (L236) — close no route at all: their own outcomes are that "a
 * reachable route or operational dependency remains" and that the option "may
 * not be the best first investment". Both are nonetheless inserted unambiguously
 * *at* the controller. Inferring insertion points from closed routes would leave
 * those two marking nothing and reporting no discrepancy, which reads as "this
 * control does nothing" rather than as the source's finding. `insertAt` states
 * the insertion point from the source text for every candidate.
 *
 * NO CITATION LINK, BECAUSE THE SOURCE CARRIES NONE. L245 closes the section
 * with a claim about the Cyber Digital Twin's own capability and cites no
 * external standard or URL — unlike the energy page's L240, which names NERC
 * CIP-013-3. It renders as plain prose; a plausible-looking standard link
 * attached here would be the one claim in this section a reader could catch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

/* ── Section shell ───────────────────────────────────────────────────────── */

export const SECTION = {
  id: "worked-example",
  index: "06",
  /* L179, the spec's own H2 for this block. */
  datumLabel: same("Worked use case"),
  /* L183, verbatim. */
  heading: same("Worked example: secure a vendor route before it becomes a production decision."),
  /* L185, verbatim; the source's unspaced em dash is normalised to a spaced one
     to match every other claim-boundary string on the site. Pattern 2's
     guardrail: renders under the heading, never conditional on selection. */
  claimBoundary: same("Illustrative scenario — no customer data.")
};

/* L189 and L191, verbatim. The second paragraph is operations' objection, which
   is the reason this ledger carries five candidate controls rather than the
   single recommendation the security team opened with. */
export const SCENARIO_PROSE: Bilingual[] = [
  same("A specialty-process facility has a controller on a heat-treatment or process line. The controller communicates with an HMI and engineering workstation in the control zone. A machine OEM provides remote support through a vendor-access route that has evolved over several years."),
  same("The controller has a known exploitable weakness. The security team’s initial response is to recommend replacement or an immediate patch. Operations objects because the line is high-utilization, patching requires a limited shutdown window, and the process has strict qualification and quality constraints.")
];

/* ── The scenario's assets ───────────────────────────────────────────────── */

/**
 * Eight systems, each named by L189's own sentence, L204–207's OT-environment
 * inputs, or L218–228's chain. Labels are type-representative, as in
 * `content.assets.ts`, and criticality follows that file's stated derivation
 * rather than a second, private one.
 *
 * ONE ASSET CARRIES A `symbol` OVERRIDE, AND EXACTLY ONE. Six of these eight
 * are the only member of their `SystemAssetType` in this drawing, so the nine
 * type silhouettes resolve them unambiguously and a published mark would add
 * nothing. TWO were `network-device`: `remote-access-gateway` and
 * `zone-firewall` drew the SAME topology silhouette while carrying different
 * claims — a session-carrying pathway and a zone boundary — which is a false
 * statement made by the renderer, not a shortfall in detail
 * (docs/diagram-system/using-the-library.md §10.2). `zone-firewall` therefore
 * names `cset/firewall`, CISA/INL's own published mark for the thing, and the
 * pathway keeps the generic topology silhouette, which is not wrong for it.
 *
 * THE PATHWAY DOES *NOT* TAKE `cset/remote-access-server`, and the reason is a
 * measurement rather than a preference. This canvas is a 900-unit viewBox
 * holding 22-unit glyph cells, so a cell renders 21.52 css px at a 1440
 * viewport (measured, light theme, deviceScaleFactor 1). That mark's rack
 * faceplate rules sit 2.6 units apart at 1.3 stroke, leaving 1.3 units of
 * white, which needs a cell of 32 / 1.3 ≈ 24.6 px to hold one device pixel of
 * white on a 1× raster — above what this canvas can give it, so its faceplate
 * would merge into a solid block. `cset/firewall`'s tightest gap is 3.95 units
 * (courses at x 5.5 / 10.75 / 16 / 21.25 / 26.5, less the 1.3 stroke), needing
 * only ≈ 8.1 px, so it is comfortable here with room to spare. §3.4's rule is
 * to measure the mark you are actually using, not to trust one number.
 */
export const CANVAS_ASSETS: SystemAsset[] = [
  {
    /* L189 ("a machine OEM provides remote support through a vendor-access
       route") and L218, the chain's first step. */
    id: "vendor-remote-route", type: "remote-access", label: "OEM vendor-access route", criticality: "important",
    description: "The machine OEM's remote-support route into the plant — the vendor-access path L189 describes as having evolved over several years, and the first step of the modelled chain."
  },
  {
    /* L204: "remote-access pathway", listed among the OT-environment inputs. */
    id: "remote-access-gateway", type: "network-device", label: "Remote-access pathway", criticality: "important",
    description: "The remote-access pathway itself: the gateway and session infrastructure carrying OEM support inward from the plant boundary."
  },
  {
    /* L205: "Network zones, firewall state, VLANs, routing, and observed
       traffic" — the boundary the accumulated exceptions sit on. */
    id: "zone-firewall", type: "network-device", symbol: "cset/firewall", label: "Zone firewall and VLAN boundary", criticality: "important",
    description: "The zone, firewall, VLAN and routing boundary between the vendor pathway and the control zone, read against observed traffic rather than against the drawing alone."
  },
  {
    /* L189 ("engineering workstation in the control zone"), L204, and L220's
       "Engineering workstation / control-zone reachability". */
    id: "engineering-workstation", type: "engineering-workstation", label: "Engineering workstation", criticality: "important",
    description: "The engineering workstation in the control zone the vendor route reaches, and from which controller configuration is authored."
  },
  {
    /* L189 ("a controller on a heat-treatment or process line"), L191 (the known
       exploitable weakness), L222 ("Reachable controller function or tag"). */
    id: "line-controller", type: "controller", label: "Process-line controller", criticality: "critical",
    description: "The controller on the heat-treatment or process line — the reachable component, and the one carrying the known exploitable weakness the risk assessment identified."
  },
  {
    /* L189 ("The controller communicates with an HMI … in the control zone")
       and L204. */
    id: "control-zone-hmi", type: "hmi", label: "Control-zone HMI", criticality: "important",
    description: "The control-zone interface onto the line — the view whose loss L224 names as a first operational symptom."
  },
  {
    /* L201: "Relevant hazard / safety-function information", read with L226's
       "safety review". */
    id: "safety-function", type: "safety-function", label: "Safety function", criticality: "critical",
    description: "The hazard and safety-function layer acting on the line, and the reason L226 puts a safety review inside the consequence chain rather than after it."
  },
  {
    /* L189 (the heat-treatment or process line), L224 and L226 — where the chain
       stops being a network finding. */
    id: "process-line", type: "process-equipment", label: "Heat-treatment / process line", criticality: "critical",
    description: "The heat-treatment or process line itself, where the modelled chain becomes process deviation, production interruption, quality hold and restart cost."
  }
];

/**
 * Seven routes. `role` carries stroke geometry and `status` carries colour, per
 * the shared `PathEdge` contract — this file never paints an edge itself, which
 * is what keeps the token rule enforceable by the renderer rather than by
 * convention. Every route is `open` at baseline: that is what "as documented"
 * means here, and a route drawn `unknown` would assert an uncertainty the source
 * does not state.
 *
 * SEVEN, NOT EIGHT. L189's own sentence fixes which systems talk to which here,
 * and an extra edge drawn to balance the picture would be a fabricated flow.
 */
export const SCENARIO_PATHS: SystemPath[] = [
  { id: "p-vendor-to-gateway", from: "vendor-remote-route", to: "remote-access-gateway", role: "vendor-access", status: "open" },
  { id: "p-gateway-to-firewall", from: "remote-access-gateway", to: "zone-firewall", role: "vendor-access", status: "open" },
  { id: "p-firewall-to-ews", from: "zone-firewall", to: "engineering-workstation", role: "attack-path", status: "open" },
  { id: "p-ews-to-controller", from: "engineering-workstation", to: "line-controller", role: "management", status: "open" },
  { id: "p-controller-to-hmi", from: "line-controller", to: "control-zone-hmi", role: "required-flow", status: "open" },
  { id: "p-controller-to-line", from: "line-controller", to: "process-line", role: "required-flow", status: "open" },
  { id: "p-safety-to-line", from: "safety-function", to: "process-line", role: "required-flow", status: "open" }
];

/* ── The shared canvas: geometry ─────────────────────────────────────────── */

/**
 * WHY LAYOUT DATA SITS IN A CONTENT FILE. These tables place *this* scenario's
 * eight nodes and seven routes and are useless to any other scenario, so they
 * travel with its copy rather than with the renderer — and keeping them here is
 * what holds `ThreeGateLedger.tsx` under the project's 500-line limit.
 *
 * Hand-authored rather than laid out by ELK, the same decision
 * `/decisions/change-safely` records: the canvas re-renders on every control
 * selection, and re-running a layout each time would make the nodes jump, which
 * reads as a live simulation running in the browser — a claim OXOT does not
 * make. Fixed geometry holds the nodes still, so the only thing that moves is
 * the one thing that changed: each route's state.
 *
 * THE SHAPE IS THIS PAGE'S SIGNATURE, a P&ID reading rather than an electrical
 * single line (see `Rule.tsx`): the vendor path along the top, the control zone
 * across the middle, and the process line with its safety function at the
 * bottom — the drawing descends from network to product as a plant drawing does.
 */
export const NODE_W = 150;
export const NODE_H = 42;
/** Label text runs from the glyph's right edge to the node's inner right edge. */
export const NODE_TEXT_W = NODE_W - 36 - 8;
export const VIEWBOX = { w: 900, h: 300 };

export const NODE_POS: Record<string, { x: number; y: number }> = {
  "vendor-remote-route": { x: 6, y: 44 },
  "remote-access-gateway": { x: 186, y: 44 },
  "zone-firewall": { x: 366, y: 44 },
  "engineering-workstation": { x: 366, y: 140 },
  "line-controller": { x: 546, y: 140 },
  "control-zone-hmi": { x: 726, y: 140 },
  "safety-function": { x: 546, y: 236 },
  "process-line": { x: 726, y: 236 }
};

/** Orthogonal routes in the same point-sequence shape `PathEdge` already
 *  consumes from ELK, so the shared renderer is untouched. */
export const ROUTE_POINTS: Record<string, Array<{ x: number; y: number }>> = {
  "p-vendor-to-gateway": [{ x: 156, y: 65 }, { x: 186, y: 65 }],
  "p-gateway-to-firewall": [{ x: 336, y: 65 }, { x: 366, y: 65 }],
  "p-firewall-to-ews": [{ x: 441, y: 86 }, { x: 441, y: 140 }],
  "p-ews-to-controller": [{ x: 516, y: 161 }, { x: 546, y: 161 }],
  "p-controller-to-hmi": [{ x: 696, y: 161 }, { x: 726, y: 161 }],
  /* Down at x=680 and across at y=210, not straight down from the controller's
     centre: a drop at x=621 continued east at y=257 would run through the
     safety-function node's own box (x 546–696, y 236–278). */
  "p-controller-to-line": [{ x: 680, y: 182 }, { x: 680, y: 210 }, { x: 801, y: 210 }, { x: 801, y: 236 }],
  "p-safety-to-line": [{ x: 696, y: 257 }, { x: 726, y: 257 }]
};

/** The legend's swatch colours — deliberately the same four tokens `PathEdge`
 *  paints the edges with. A legend fed from a second table can silently stop
 *  matching the thing it explains. */
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

export const ENTRY_ASSET_ID = "vendor-remote-route";
export const TARGET_ASSET_ID = "line-controller";
/** Between entry and target — L218's route, L205's boundary, L220's zone. */
export const INTERMEDIATE_IDS = ["remote-access-gateway", "zone-firewall", "engineering-workstation"];

/** Split a node label into two balanced lines at a word boundary. Part of the
 *  canvas contract rather than of the renderer: it exists because several of
 *  these labels run longer than `NODE_TEXT_W` at the 11px technical-label
 *  floor. */
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
  title: same("The OEM vendor-access route into the control zone, the process line and safety function it reaches, and the selected candidate control's effect on each route."),
  /* Load-bearing, not decoration: colour here carries `SystemPath.status` and
     nothing else, and an unlabelled colour is precisely what
     `OXOT_content-to-visual-mapping-table.md` exists to keep off this site. */
  legendLabel: same("Route state"),
  legend: [
    { status: "open" as const, text: same("As documented — route open") },
    { status: "controlled" as const, text: same("Brought under the candidate control") },
    { status: "closed" as const, text: same("Closed by the modelled result") }
  ],
  discrepancyLabel: same("Nodes whose state differs from the baseline"),
  discrepancyHint: same("Each entry moves the highlight to its node on the canvas above. Select a different candidate control to repopulate this list."),
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
  /* L218–228, the spec's own six-step chain, transcribed step for step. */
  chain: [
    same("Vendor remote-access route"),
    same("Engineering workstation / control-zone reachability"),
    same("Reachable controller function or tag"),
    same("Process deviation or loss of availability"),
    same("Production interruption, quality hold, repair, restart, and safety review"),
    same("Financial exposure and decision priority")
  ],
  exceptionLabel: same("Why the route looks like this"),
  /* L189's own account of how the connection reached its present state. */
  exception: same("The OEM's remote support runs over a vendor-access route that has evolved over several years — so the documented boundary and the reachable one are no longer the same drawing."),
  findingLabel: same("What the risk assessment found"),
  /* L191, first two sentences. */
  finding: same("The controller has a known exploitable weakness. The security team’s initial response is to recommend replacement or an immediate patch."),
  constraintLabel: same("Known constraints"),
  /* L191's objection — the reason "patch it now" is not an available answer, and
     the constraint every candidate below is scored against. */
  constraint: same("The line is high-utilization, patching requires a limited shutdown window, and the process has strict qualification and quality constraints. Any answer is bounded by those constraints, not only by the exposure it removes.")
};

/* ── Gate 2 · Proposed control ───────────────────────────────────────────── */

export interface ControlCandidate {
  id: string;
  /** L235–239's first column, "Candidate change", verbatim. */
  title: Bilingual;
  /** L235–239's second column, "What the Twin tests", verbatim. */
  tests: Bilingual;
  /** L235–239's third column, "Possible outcome", verbatim. */
  outcome: Bilingual;
  /** Where the crosshair reticle is drawn — see this file's header. */
  insertAt: string[];
  closesPathIds: string[];
  preservesPathIds: string[];
  residualPathIds: string[];
}

/**
 * The five candidates of L235–239, in the source's own order and wording. The
 * route sets are read from each row's stated test and outcome rather than
 * invented: they are the reason the outcome column says what it says.
 */
export const CONTROL_CANDIDATES: ControlCandidate[] = [
  {
    id: "ctl-patch-immediately",
    title: same("Patch immediately"),
    tests: same("Effect on compatibility, operations, and remaining pathways"),
    outcome: same("The vulnerability is reduced, but a reachable route or operational dependency remains"),
    /* Inserted at the controller while closing no route — the row's own finding,
       and one of the two cases that made `insertAt` explicit rather than
       derived. */
    insertAt: ["line-controller"],
    closesPathIds: [],
    preservesPathIds: [],
    residualPathIds: ["p-vendor-to-gateway", "p-gateway-to-firewall", "p-firewall-to-ews", "p-ews-to-controller"]
  },
  {
    id: "ctl-replace-controller",
    title: same("Replace the controller"),
    tests: same("Reduction in component exposure versus cost, outage, commissioning, and qualification risk"),
    outcome: same("High-cost option; may not be the best first investment"),
    /* Component exposure falls; the route into it is untouched, which is why the
       outcome column ranks this behind the access work rather than ahead of it. */
    insertAt: ["line-controller"],
    closesPathIds: [],
    preservesPathIds: [],
    residualPathIds: ["p-vendor-to-gateway", "p-gateway-to-firewall", "p-firewall-to-ews", "p-ews-to-controller"]
  },
  {
    id: "ctl-broker-vendor-access",
    title: same("Broker vendor access"),
    tests: same("MFA, time-bound approval, jump host, session recording, removal of persistent path"),
    outcome: same("Reduces reachable pathways with limited process impact"),
    insertAt: ["remote-access-gateway"],
    /* "Removal of persistent path" is what closes the reach into the control
       zone; the vendor route itself survives under session control, which is the
       exact distinction the outcome column draws. */
    closesPathIds: ["p-firewall-to-ews"],
    preservesPathIds: ["p-vendor-to-gateway", "p-gateway-to-firewall"],
    residualPathIds: ["p-ews-to-controller"]
  },
  {
    id: "ctl-rezone-control-environment",
    title: same("Re-zone the control environment"),
    tests: same("Virtual firewall and conduit changes"),
    outcome: same("Identifies which required flows would break and which routes remain"),
    insertAt: ["zone-firewall"],
    closesPathIds: ["p-firewall-to-ews"],
    /* The required flows the re-zoning must be proved not to break — which is
       the whole of what this row's outcome column claims to identify. */
    preservesPathIds: ["p-controller-to-hmi", "p-controller-to-line", "p-safety-to-line"],
    residualPathIds: ["p-vendor-to-gateway", "p-gateway-to-firewall", "p-ews-to-controller"]
  },
  {
    id: "ctl-combine-controls",
    title: same("Combine controls"),
    tests: same("Vendor-access redesign now; planned patch/replacement in shutdown"),
    outcome: same("A sequenced roadmap with higher risk reduction per euro and lower production impact"),
    insertAt: ["remote-access-gateway", "zone-firewall", "line-controller"],
    closesPathIds: ["p-firewall-to-ews"],
    preservesPathIds: ["p-vendor-to-gateway", "p-gateway-to-firewall", "p-controller-to-hmi", "p-controller-to-line", "p-safety-to-line"],
    residualPathIds: ["p-ews-to-controller"]
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
   * to fill space: (1) is §7's definition of the Proposed-control panel read
   * against L191's shutdown constraint, (2) is L238's "which required flows
   * would break and which routes remain", (3) is Pattern 2's crosshair-reticle
   * idiom in its own words — load-bearing in this scenario specifically,
   * because two of the five candidates close no route and would otherwise
   * appear to do nothing.
   *
   * REMEDY (a), PRE-SELECTING A CANDIDATE, IS DECLINED — on a content ground,
   * not an ergonomic one. L243 concludes in the source's own words that the
   * recommendation is a sequence rather than any single change, so a
   * checked-by-default radio would print a recommendation this scenario never
   * makes.
   */
  fixed: [
    {
      term: same("What a candidate control is"),
      body: same("A control inserted in the model, not on the line: the routes it affects, the required flows it preserves, and the residual exposure it leaves. Selecting one re-evaluates every route on the canvas above. No shutdown window is consumed, because the model changes and the line does not.")
    },
    {
      term: same("How residual exposure is read"),
      body: same("Residual exposure is every route still reachable once the candidate is applied. A route can be preserved and residual at once — a support or diagnostic flow the plant must keep that still carries exposure — and that overlap is the finding, not a modelling error.")
    },
    {
      term: same("The crosshair marker"),
      body: same("A circled cross, drawn in P&ID convention, marks where the selected candidate is inserted on the shared canvas. Every node whose state differs from the baseline keeps a persistent amber outline for as long as that candidate is selected — including the two candidates here that close no route at all.")
    }
  ],
  testsLabel: same("What the Twin tests"),
  outcomeLabel: same("Possible outcome"),
  insertionLabel: same("Inserted at"),
  closesLabel: same("Routes closed"),
  preservesLabel: same("Required flows preserved"),
  residualLabel: same("Residual exposure"),
  noneClosedLabel: same("None — this candidate closes no route."),
  nonePreservedLabel: same("None — this candidate holds no route under control; it changes the component, not the path.")
};

/* ── Gate 3 · Decision output ────────────────────────────────────────────── */

/** L196–212's three input blocks, in the spec's own grouping and order. */
export const EVIDENCE_GROUPS: Array<{ group: Bilingual; items: string[] }> = [
  {
    group: same("Engineering"),
    items: [
      "P&ID / process diagram",
      "Equipment and line records",
      "FMECA and reliability-critical designation",
      "Process operating limits and downtime curve",
      "Relevant hazard / safety-function information"
    ]
  },
  {
    group: same("OT environment"),
    items: [
      "Controller, HMI, engineering workstation, remote-access pathway",
      "Network zones, firewall state, VLANs, routing, and observed traffic",
      "Remote-support operating procedure",
      "Firmware / software / component information"
    ]
  },
  {
    group: same("External context"),
    items: [
      "Known exploitation and relevant threat activity",
      "Vendor and supplier context",
      "Loss and downtime assumptions, with source traceability"
    ]
  }
];

export const OUTPUT = {
  label: same("Decision output"),
  /* NOT "narrowest, densest" — that is the layout pattern describing itself, and
     an independent critique found build-spec narration leaking into
     customer-facing copy as its most damaging finding. */
  caption: same("What the model recommends, and what it does not claim"),
  /* L243's opening clause, which is this section's actual argument. */
  headlineLabel: same("Not “patch everything”, and not “buy a tool”"),
  recommendedLabel: same("Recommended sequence"),
  /**
   * L243's defensible sequence, split at its own clause boundaries. The sentence
   * renders whole beneath the gates as `RESULT`; this is the same four
   * instructions as a sequence, because a defensible sequence is a list and
   * reading it as prose loses the ordering the source gives it. Nothing added,
   * reworded or reordered.
   */
  recommended: [
    same("Close the reachable route now"),
    same("Preserve necessary operations"),
    same("Schedule disruptive work in the correct outage"),
    same("Retain the evidence for plant management, audit, and procurement")
  ],
  evidenceLabel: same("Evidence needed"),
  windowLabel: same("Implementation window"),
  /* L239 and L243 sequence the work the same way, and L191 states why the second
     window is bounded: patching requires a limited shutdown window. */
  window: same("Two windows, not one: the vendor-access redesign proceeds now, and the patch or replacement is timed into the planned shutdown the line already has. The sequence is fixed; the date is not."),
  validationLabel: same("Validation condition"),
  /* L238's own testable clause, read against L191's qualification and quality
     constraints — the condition deciding whether the modelled result held. */
  validation: same("The re-zoned boundary is proved to carry every required control, diagnostic and support flow, and the line's qualification and quality constraints are shown to be unaffected by the change."),
  notAssertedLabel: same("Not asserted by this scenario"),
  /* §7 asks the Decision-output panel for five things. Four are in the source;
     the fifth, a responsible role, is assigned nowhere in L179–245. Inventing an
     owner on a page whose argument is that evidence is traceable would be the
     one claim here a reader could catch. */
  notAsserted: same("A responsible role. This scenario assigns none, so none is printed here as though it had been decided."),
  /* §7's claim-boundary rule for safety-sensitive contexts, applied. */
  approvalNote: same("OXOT supports but does not replace engineering approval, safety assessment, process qualification, or the plant's own authority to return a line to service.")
};

/* L243, verbatim — the result message, rendered whole beneath the three gates. */
export const RESULT = same("The recommendation is not “patch everything” or “buy a tool.” It is a defensible sequence: close the reachable route now, preserve necessary operations, schedule disruptive work in the correct outage, and retain the evidence for plant management, audit, and procurement.");

/* L245, verbatim. No link: the source names no standard or URL here — see this
   file's header. */
export const CLOSING = same("This is consistent with the Cyber Digital Twin’s ability to simulate candidate controls without altering production, connect attack paths to physical/financial consequence, and rank interventions by consequence and exploitability.");
