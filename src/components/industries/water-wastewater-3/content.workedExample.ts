/**
 * WATER & WASTEWATER — ITERATION 3, S07. Labels and prose for the Three-Gate
 * Ledger. THE SCENARIO ITSELF IS NOT HERE.
 *
 * `DOSING_SCENARIO`, `DOSING_PATHS`, `DOSING_EVIDENCE`, `DOSING_RESULT` and
 * `DOSING_CHAIN_ASSET_IDS` live in Wave 0's `content.scenario.ts` and are read
 * from there unchanged. That is the whole point of the split: the hero (S00)
 * and this section render THE SAME RECORD, so the page cannot end up telling
 * two versions of one story. Nothing in this file re-states an entry point, a
 * target, a control, a path or a consequence — re-typing any of them here is
 * exactly how the two sections would drift apart.
 *
 * What this file holds is the copy that is about the LEDGER rather than about
 * the scenario: the three gate captions, the field labels, the chain
 * transcription, the Proposed-control column's mandatory fixed copy, and the
 * Decision-output panel that `TwinScenario` has no field for.
 *
 * SOURCE for the prose: new_material_source/1_website_layout_v4/3_industries/
 * industry_water.md, `L<n>` as elsewhere in this folder. Spec citations are to
 * `OXOT_Layout_Styles.md` Pattern 2 and `OXOT_Visual_Foundation_Spec.md` §7.
 *
 * TWO HONEST GAPS, DECLARED RATHER THAN FILLED. §7's Decision-output panel
 * asks for five things: recommended sequence, evidence needed, implementation
 * window, validation condition, responsible role. The source supplies three.
 * It states no implementation window anywhere and assigns no responsible role
 * to this scenario's controls. Both are therefore printed as NOT ASSERTED. A
 * fabricated six-week window or an invented "OT manager" on a page whose
 * argument is that evidence is traceable would be worse than a visible gap —
 * and it would be the one claim in the section a reader could actually catch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";
import { WATER_ASSETS } from "./content.assets";
import { DOSING_CHAIN_ASSET_IDS, DOSING_EVIDENCE, DOSING_PATHS, DOSING_SCENARIO } from "./content.scenario";

/* ── Section prose, L211-213 ─────────────────────────────────────────────── */

export const SCENARIO_PROSE: Bilingual[] = [
  /* L211, verbatim. */
  same(
    "A drinking-water treatment plant uses a PLC-controlled sodium-hypochlorite dosing skid. The dosing sequence relies on incoming flow, chlorine-residual feedback, pump status, chemical-tank level, and high/low alarm conditions. The PLC and local HMI are accessible through a maintenance network that also supports a system integrator's remote troubleshooting connection."
  ),
  /* L213, verbatim — including operations' objection, which is the reason the
     ledger has five candidate controls instead of one recommendation. */
  same(
    "A cybersecurity review finds that the remote connection has broad access to the plant network and that the chemical-dosing PLC is reachable through an outdated pathway. The simple recommendation is “disconnect the access.” Operations objects: the integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously."
  )
];

/* ── The shared canvas: geometry ─────────────────────────────────────────── */

/**
 * WHY LAYOUT DATA IS IN A CONTENT FILE. These tables place THIS scenario's
 * twelve nodes and twelve routes and are useless to any other scenario, so
 * they travel with the scenario's copy rather than with the renderer — and
 * keeping them here is what holds `ThreeGateLedger.tsx` under the project's
 * 500-line file limit without splitting the ledger into a component it does
 * not otherwise need.
 *
 * Hand-authored rather than laid out by ELK: the canvas re-renders on every
 * control selection, and re-running a layout each time would make the nodes
 * jump, which reads as a live simulation running in the browser — a claim
 * OXOT does not make. Fixed geometry holds the nodes still so the only thing
 * that changes is the thing that actually changed, each route's state.
 *
 * Three reading bands, which is the story's own shape: the route in runs along
 * the middle spine, what the plant watches with sits above it, and what the
 * dosing sequence needs to run sits below. `process-historian` is absent on
 * purpose — real sector architecture with no path in this scenario, so drawing
 * it would add a node with no edge.
 */
export const NODE_W = 150;
export const NODE_H = 42;
/** Label text runs from the glyph's right edge to the node's inner right edge. */
export const NODE_TEXT_W = NODE_W - 36 - 8;
export const VIEWBOX = { w: 900, h: 292 };

export const NODE_POS: Record<string, { x: number; y: number }> = {
  "plant-engineering-workstation": { x: 186, y: 52 },
  "dosing-local-hmi": { x: 546, y: 52 },
  "scada-alarm-server": { x: 726, y: 52 },
  "integrator-remote-support": { x: 6, y: 140 },
  "maintenance-network-firewall": { x: 186, y: 140 },
  "chemical-dosing-plc": { x: 366, y: 140 },
  "chemical-metering-pump": { x: 546, y: 140 },
  "hypochlorite-dosing-skid": { x: 726, y: 140 },
  "raw-water-flow-meter": { x: 6, y: 232 },
  "chlorine-residual-analyser": { x: 186, y: 232 },
  "chemical-tank-level-transmitter": { x: 366, y: 232 },
  "dosing-high-low-alarm": { x: 546, y: 232 }
};

/** Orthogonal routes, in the same point-sequence shape `PathEdge` already
 *  consumes from ELK, so the shared renderer is untouched. Keyed by the real
 *  `SystemPath.id` values in content.scenario.ts. */
export const ROUTE_POINTS: Record<string, Array<{ x: number; y: number }>> = {
  "p-vendor-to-maintenance-net": [{ x: 156, y: 161 }, { x: 186, y: 161 }],
  "p-maintenance-net-to-ews": [{ x: 261, y: 140 }, { x: 261, y: 94 }],
  "p-maintenance-net-to-plc": [{ x: 336, y: 161 }, { x: 366, y: 161 }],
  "p-ews-to-plc-programming": [{ x: 336, y: 73 }, { x: 441, y: 73 }, { x: 441, y: 140 }],
  "p-flow-to-plc": [{ x: 81, y: 232 }, { x: 81, y: 206 }, { x: 386, y: 206 }, { x: 386, y: 182 }],
  "p-residual-to-plc": [{ x: 261, y: 232 }, { x: 261, y: 214 }, { x: 411, y: 214 }, { x: 411, y: 182 }],
  "p-tank-level-to-plc": [{ x: 441, y: 232 }, { x: 441, y: 182 }],
  "p-alarm-to-plc": [{ x: 621, y: 232 }, { x: 621, y: 214 }, { x: 471, y: 214 }, { x: 471, y: 182 }],
  "p-plc-to-metering-pump": [{ x: 516, y: 161 }, { x: 546, y: 161 }],
  "p-metering-pump-to-skid": [{ x: 696, y: 161 }, { x: 726, y: 161 }],
  "p-plc-to-local-hmi": [{ x: 501, y: 140 }, { x: 501, y: 112 }, { x: 621, y: 112 }, { x: 621, y: 94 }],
  "p-plc-to-scada": [{ x: 486, y: 140 }, { x: 486, y: 26 }, { x: 801, y: 26 }, { x: 801, y: 52 }]
};

/** The legend's swatch colours. Deliberately the same four tokens `PathEdge`
 *  uses for the edges themselves — a legend painted from a second table is a
 *  legend that can silently stop matching the thing it explains. */
export const STATUS_SWATCH: Record<SystemPath["status"], string> = {
  open: "hsl(var(--signal-blue))",
  controlled: "hsl(var(--signal-amber))",
  closed: "hsl(var(--signal-green))",
  unknown: "hsl(var(--signal-slate))"
};

/* ── Lookups derived from the scenario record ────────────────────────────── */

/* Derived HERE rather than in the component so the ledger stays inside the
   project's 500-line file limit, and because every one of them is a reading of
   Wave 0's data rather than a rendering concern. None of them re-states a
   fact: each is a projection of `WATER_ASSETS` or `DOSING_*`. */

const BY_ID = new Map(WATER_ASSETS.map((a) => [a.id, a]));

/** The twelve assets this scenario's canvas draws — every asset with a
 *  placement, which is every asset carrying a path in `DOSING_PATHS`. */
export const CANVAS_ASSETS: SystemAsset[] = WATER_ASSETS.filter((a) => a.id in NODE_POS);

export const assetLabel = (id: string) => BY_ID.get(id)?.label ?? id;

/** A route named end to end, so the reader never meets a raw path id. */
export const routeLabel = (id: string) => {
  const edge = DOSING_PATHS.find((p) => p.id === id);
  return edge ? `${assetLabel(edge.from)} → ${assetLabel(edge.to)}` : id;
};

/** The chain assets between the scenario's entry point and its target. */
export const INTERMEDIATE_IDS = DOSING_CHAIN_ASSET_IDS.slice(
  1,
  DOSING_CHAIN_ASSET_IDS.indexOf(DOSING_SCENARIO.targetAssetId)
);

/** The brief's own three evidence groups, kept in its own order. */
export const EVIDENCE_GROUPS = DOSING_EVIDENCE.reduce<Array<{ group: string; items: string[] }>>((acc, e) => {
  const row = acc.find((g) => g.group === e.group);
  if (row) row.items.push(e.label);
  else acc.push({ group: e.group, items: [e.label] });
  return acc;
}, []);

/** Split a node label into two balanced lines at a word boundary. Part of the
 *  canvas contract rather than of the renderer: it exists because these
 *  specific labels are longer than `NODE_TEXT_W` at the 11px label floor. */
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
  title: same(
    "Modelled chain and required process flows for the chemical-dosing skid, with the selected control's effect on each route."
  ),
  /* The legend is required, not decoration: on this canvas colour carries
     `SystemPath.status` and nothing else, and an unlabelled colour is the
     precise thing `OXOT_content-to-visual-mapping-table.md` exists to keep off
     this site. Wording matches `PathEdge`'s own token map. */
  legendLabel: same("Route state"),
  legend: [
    { status: "open" as const, text: same("As documented — route open") },
    { status: "controlled" as const, text: same("Brought under the proposed control") },
    { status: "closed" as const, text: same("Closed by the modelled result") }
  ],
  discrepancyLabel: same("Nodes whose state differs from the baseline"),
  discrepancyHint: same(
    "Each entry moves the highlight to its node on the canvas above. Select a candidate control to populate this list."
  ),
  discrepancyEmpty: same(
    "No control is selected, so no node differs from the baseline yet. The canvas above shows every route as documented."
  ),
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
  chainLabel: same("Consequence chain"),
  /* L243-253, the brief's own six-line chain, transcribed line for line. */
  chain: [
    same("Compromised vendor credentials / remote-support endpoint"),
    same("Maintenance network route"),
    same("Chemical-dosing PLC or engineering workstation becomes reachable"),
    same("Setpoint, logic, mode, or pump-state manipulation becomes possible"),
    same("Inadequate or excessive disinfection / loss of treatment verification"),
    same("Water-quality event, emergency response, service disruption, public-health risk")
  ],
  constraintLabel: same("Known constraints"),
  /* These two label the consequence record's OWN extra fields. They are not
     the consequence's title or its operational effect — using those as labels
     printed chain steps 5 and 6 twice in one column, which is the duplicate-
     content defect an independent critique caught on the previous iteration. */
  safetyLabel: same("Operator fallback, and its limits"),
  impactLabel: same("Service and regulatory impact"),
  /* L213's objection and L236's limit, which together are why "disconnect the
     access" is not an available answer. */
  constraint: same(
    "The integrator supports faults, calibration issues and emergency recovery, and the plant must maintain treatment continuously. Any answer is bounded by staff response time, operator coverage and manual operating limitations."
  )
};

/* ── Gate 2 · Proposed control ───────────────────────────────────────────── */

export const CONTROLS = {
  label: same("Proposed control"),
  caption: same("One candidate at a time, tested against the model"),
  chooseLabel: same("Candidate controls"),
  /**
   * PATTERN 2'S REMEDY (b), MANDATORY. This copy is present at first paint and
   * does not depend on the selection, because a Proposed-control column that
   * is bare chrome until a user acts fails the pattern regardless of its
   * width. Each entry is sourced, not written to fill space: (1) is §7's own
   * definition of the Proposed-control panel, (2) is the contract comment on
   * `ProposedControl.residualPathIds` in content.scenario.ts, (3) is Pattern
   * 2's crosshair-reticle idiom in its own words.
   */
  fixed: [
    {
      term: same("What a proposed control is"),
      body: same(
        "A control inserted in the model, not in the plant: the routes it affects, the required flows it preserves, and the residual exposure it leaves. Selecting one re-evaluates every route on the canvas above. The model changes; the plant does not."
      )
    },
    {
      term: same("How residual exposure is read"),
      body: same(
        "Residual exposure is every route still reachable once the control is applied. A route can be preserved and residual at the same time — a flow the plant must keep that still carries exposure — and that overlap is the finding, not a modelling error."
      )
    },
    {
      term: same("The crosshair marker"),
      body: same(
        "A circled cross, drawn in P&ID convention, marks where the selected control is inserted on the shared canvas. Every node whose state differs from the baseline keeps a persistent amber outline for as long as that control is selected."
      )
    }
  ],
  typeLabel: same("Control type"),
  testsLabel: same("What the Twin tests"),
  insightLabel: same("Decision insight"),
  closesLabel: same("Routes closed"),
  preservesLabel: same("Required flows preserved"),
  residualLabel: same("Residual exposure"),
  noneLabel: same("None — this control closes no route by design."),
  clearLabel: same("Clear selection"),
  /* `ProposedControlType` is a real union with a real deviation in it; these
     are the union's own five values in plain words. See DEVIATION 1 in
     content.scenario.ts for why the fifth value exists at all. */
  typeLabels: {
    segmentation: same("Segmentation"),
    "brokered-access": same("Brokered access"),
    patch: same("Device hardening"),
    replacement: same("Replacement"),
    "process-safeguard": same("Process safeguard")
  }
};

/* ── Gate 3 · Decision output ────────────────────────────────────────────── */

export const OUTPUT = {
  label: same("Decision output"),
  /* NOT "narrowest, densest" — that is the layout pattern describing itself,
     and an independent critique of the previous iteration found build-spec
     narration leaking into customer-facing copy as its most damaging finding. */
  caption: same("What the model recommends, and what it does not claim"),
  headlineLabel: same("Not merely “secure the PLC”"),
  recommendedLabel: same("Recommended sequence"),
  /**
   * L268's result message, split at its own clause boundaries. The sentence is
   * one string in `DOSING_RESULT` and renders there whole; this is the same
   * four instructions as a sequence, because a recommended sequence is a list
   * and reading it as prose loses the ordering the source gives it. Nothing is
   * added, reworded or reordered.
   */
  recommended: [
    same("Reduce unauthorized reachability"),
    same("Preserve controlled technical support"),
    same("Verify that SCADA and alarms still function"),
    same("Ensure operators can maintain compliant disinfection if digital control is unavailable")
  ],
  evidenceLabel: same("Evidence needed"),
  validationLabel: same("Validation condition"),
  /* The two testable conditions inside L268 — the ones that decide whether the
     modelled result held. */
  validation: same(
    "SCADA and alarm function is confirmed after the change, and operators can hold compliant disinfection with digital control unavailable."
  ),
  notAssertedLabel: same("Not asserted by this scenario"),
  /* See the TWO HONEST GAPS note in this file's header. */
  notAsserted: same(
    "Implementation window and responsible role. This scenario fixes neither, so neither is printed here as though it had been decided."
  ),
  /* §7's claim-boundary rule for safety-sensitive contexts, applied. */
  approvalNote: same(
    "OXOT supports but does not replace engineering approval, safety assessment, operational authority, or return-to-service authority."
  ),
  /* L272, verbatim. */
  citation: same(
    "This example closely reflects the sector threat pattern CISA has highlighted: internet-exposed PLCs can be used to lock operators out or change device configuration, while water utilities must preserve the ability to monitor and control treatment safely."
  )
};
