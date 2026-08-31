/**
 * WATER & WASTEWATER — ITERATION 3. The page's ONE scenario, data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * ("Worked use case", L201-270). Every `L<n>` below is a line number in that
 * file. The hero and the worked example both render THIS record — the hero a
 * shrunk view of the same chain, the worked example the full ledger — so the
 * page cannot end up illustrating two different stories with the same claim.
 *
 * WHY THE SCENARIO TYPES ARE DECLARED HERE AND NOT IN
 * `src/components/twin/types.ts`. That file's own header says the full
 * `TwinScenario` / `ProposedControl` / `Consequence` types "belong to whichever
 * component first needs scenario-level data", which is this one. They are NOT
 * added there yet for a concurrency reason, not a design one: `src/components/
 * twin/` is being edited by other agents in this same worktree today, and the
 * project's own rule is one writer per file. PROMOTING THESE THREE TYPES INTO
 * `twin/types.ts` IS THE CORRECT FOLLOW-UP once that directory has a single
 * owner — they are transcribed verbatim from the same authority `SystemAsset`
 * and `SystemPath` came from (`OXOT_content-to-visual-mapping-table.md` §7),
 * with the two deviations below and nothing else.
 *
 * DEVIATION 1 — `ProposedControlType` adds `"process-safeguard"`. The mapping
 * table's four values (segmentation / brokered-access / patch / replacement)
 * are all network-or-device controls, and the brief's fifth candidate (L264,
 * "Add process safeguards": independent alarming, local/manual fallback,
 * separate measurement verification) is none of them — it reduces the
 * CONSEQUENCE rather than the reachability, which is the whole reason the brief
 * lists it. Forcing it into "segmentation" would misreport what it does; adding
 * a fifth value reports the gap. Flagged for a contract decision.
 *
 * DEVIATION 2 — `ProposedControl` adds `decisionInsight`. The brief's control
 * table (L258-264) has two distinct content columns, "What the Twin tests" and
 * "Decision insight", and the contract has one string field. The first maps to
 * `implementationConstraint`; the second had nowhere to go and is real sourced
 * content, so it gets a field rather than being dropped.
 *
 * WHAT IS NOT MODELLED: the brief gives no protocol for any path in this
 * chain, so no `SystemPath.protocol` is set. Guessing "Modbus TCP" from the
 * technology table (L154) would be fabrication — that table lists what the
 * sector uses, not what this plant's dosing skid speaks.
 */
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { WATER_ASSETS } from "./content.assets";

/* ── Scenario-level contract, per OXOT_content-to-visual-mapping-table.md §7 ─ */

export interface Consequence {
  title: string;
  operationalEffect: string;
  safetyOrReliabilityContext?: string;
  businessImpact?: string;
  evidenceIds: string[];
}

/** See DEVIATION 1 in the file header for `"process-safeguard"`. */
export type ProposedControlType =
  | "segmentation"
  | "brokered-access"
  | "patch"
  | "replacement"
  | "process-safeguard";

export interface ProposedControl {
  id: string;
  title: string;
  type: ProposedControlType;
  closesPathIds: string[];
  preservesPathIds: string[];
  /** Paths still reachable after the control. May overlap `preservesPathIds`:
   *  a path that must keep working and is still an exposure is both, and that
   *  overlap is the point of the row, not a modelling error. */
  residualPathIds: string[];
  implementationConstraint: string;
  /** See DEVIATION 2 in the file header. */
  decisionInsight: string;
}

export interface TwinScenario {
  id: string;
  title: string;
  label: "Illustrative scenario — no customer data";
  industry: string;
  entryAssetId: string;
  targetAssetId: string;
  attackPathIds: string[];
  consequence: Consequence;
  controls: ProposedControl[];
}

/* ── Evidence, transcribed from "Inputs to the Twin" (L217-238) ──────────── */

/**
 * The brief's own three groups, kept in its own order. These are what
 * `Consequence.evidenceIds` points at and what an evidence panel would list.
 */
export const DOSING_EVIDENCE: { id: string; group: string; label: string }[] = [
  /* L218-224 — "Treatment-process evidence" */
  { id: "ev-pfd-pid", group: "Treatment process", label: "Process-flow diagram and P&IDs" },
  { id: "ev-dosing-narrative", group: "Treatment process", label: "Dosing-control narrative and interlocks" },
  { id: "ev-dosing-calculations", group: "Treatment process", label: "Chemical dosing calculations and acceptable operating range" },
  { id: "ev-residual-monitoring", group: "Treatment process", label: "Residual-monitoring points and sampling requirements" },
  { id: "ev-contact-time", group: "Treatment process", label: "Clearwell, contact-time, and treatment operating constraints" },
  { id: "ev-manual-dosing", group: "Treatment process", label: "Emergency operating procedures and manual-dosing capability" },

  /* L226-232 — "OT and network evidence" */
  { id: "ev-chemical-control-assets", group: "OT and network", label: "Chemical PLC, local HMI, VFD / metering-pump controls" },
  { id: "ev-scada-alarm-flows", group: "OT and network", label: "SCADA data flow and alarm dependencies" },
  { id: "ev-vendor-access-route", group: "OT and network", label: "Engineering workstation and vendor-access route" },
  { id: "ev-network-configuration", group: "OT and network", label: "Firewall, VLAN, routing, remote gateway, and observed OT traffic" },
  { id: "ev-backups-recovery", group: "OT and network", label: "Existing backups, PLC project files, and recovery procedure" },

  /* L234-238 — "Operational-consequence evidence" */
  { id: "ev-quality-thresholds", group: "Operational consequence", label: "Water-quality escalation thresholds" },
  { id: "ev-loss-of-treatment", group: "Operational consequence", label: "Loss-of-treatment and service-impact assumptions" },
  { id: "ev-operator-coverage", group: "Operational consequence", label: "Staff response time, operator coverage, and manual operating limitations" },
  { id: "ev-regulatory-obligations", group: "Operational consequence", label: "Relevant regulatory and notification obligations" }
];

/* ── Paths ───────────────────────────────────────────────────────────────── */

/**
 * The chain of L243-253 as edges, plus the flows the brief says the dosing
 * sequence depends on (L211) and the ones the result message says must survive
 * (L268). `role` records what a path IS; `attackPathIds` below records which of
 * them the chain traverses — so the engineering programming path can be honest
 * about being a legitimate management route AND part of the attack chain.
 */
export const DOSING_PATHS: SystemPath[] = [
  /* --- the modelled chain, L243-249 --- */
  {
    /* L243 "Compromised vendor credentials / remote-support endpoint" →
       L245 "Maintenance network route". L213: the remote connection "has
       broad access to the plant network" — hence `open`. */
    id: "p-vendor-to-maintenance-net",
    from: "integrator-remote-support",
    to: "maintenance-network-firewall",
    role: "vendor-access",
    status: "open"
  },
  {
    /* L247 "Chemical-dosing PLC or engineering workstation becomes
       reachable" — the workstation half of that "or". */
    id: "p-maintenance-net-to-ews",
    from: "maintenance-network-firewall",
    to: "plant-engineering-workstation",
    role: "attack-path",
    status: "open"
  },
  {
    /* L247's other half, and L213 "the chemical-dosing PLC is reachable
       through an outdated pathway". */
    id: "p-maintenance-net-to-plc",
    from: "maintenance-network-firewall",
    to: "chemical-dosing-plc",
    role: "attack-path",
    status: "open"
  },
  {
    /* The programming path. `management`, not `attack-path`: L263's control is
       to RESTRICT it, which presumes it is legitimate and must survive. It is
       still in `attackPathIds` because L247 puts the workstation on the chain
       to the PLC. */
    id: "p-ews-to-plc-programming",
    from: "plant-engineering-workstation",
    to: "chemical-dosing-plc",
    role: "management",
    status: "open"
  },

  /* --- the flows the dosing sequence depends on, L211 --- */
  {
    /* L211 "incoming flow" */
    id: "p-flow-to-plc",
    from: "raw-water-flow-meter",
    to: "chemical-dosing-plc",
    role: "required-flow",
    status: "open"
  },
  {
    /* L211 "chlorine-residual feedback"; L221 residual-monitoring points */
    id: "p-residual-to-plc",
    from: "chlorine-residual-analyser",
    to: "chemical-dosing-plc",
    role: "required-flow",
    status: "open"
  },
  {
    /* L211 "chemical-tank level" */
    id: "p-tank-level-to-plc",
    from: "chemical-tank-level-transmitter",
    to: "chemical-dosing-plc",
    role: "required-flow",
    status: "open"
  },
  {
    /* L211 "high/low alarm conditions"; L219 interlocks */
    id: "p-alarm-to-plc",
    from: "dosing-high-low-alarm",
    to: "chemical-dosing-plc",
    role: "required-flow",
    status: "open"
  },
  {
    /* L211 "pump status"; L249 "pump-state manipulation" rides this edge */
    id: "p-plc-to-metering-pump",
    from: "chemical-dosing-plc",
    to: "chemical-metering-pump",
    role: "required-flow",
    status: "open"
  },
  {
    /* The dose itself reaching the process. L211's skid, L251's disinfection */
    id: "p-metering-pump-to-skid",
    from: "chemical-metering-pump",
    to: "hypochlorite-dosing-skid",
    role: "required-flow",
    status: "open"
  },
  {
    /* L211 the local HMI is how an operator reads and intervenes at the skid */
    id: "p-plc-to-local-hmi",
    from: "chemical-dosing-plc",
    to: "dosing-local-hmi",
    role: "required-flow",
    status: "open"
  },
  {
    /* L229 "SCADA data flow and alarm dependencies"; L268 requires this to
       still work after the change, which is why it is a named preserve. */
    id: "p-plc-to-scada",
    from: "chemical-dosing-plc",
    to: "scada-alarm-server",
    role: "required-flow",
    status: "open"
  }
];

/** Every flow the plant needs back after any control is applied — the "required
 *  process/monitoring flows" L262 says segmentation has to surface. */
const REQUIRED_FLOW_IDS = DOSING_PATHS.filter((p) => p.role === "required-flow").map((p) => p.id);

/* ── The scenario ────────────────────────────────────────────────────────── */

export const DOSING_SCENARIO: TwinScenario = {
  id: "water-3-chemical-dosing",
  /* L205, the brief's own worked-example headline. */
  title: "Secure chemical-dosing control without compromising water quality",
  /* L207 "Illustrative scenario—no customer data." The contract fixes the
     literal (spaced em dash); the sentence is the brief's. */
  label: "Illustrative scenario — no customer data",
  industry: "Water & Wastewater",
  /* L243 — the chain's first line. */
  entryAssetId: "integrator-remote-support",
  /* L247 — the chain's named target. The engineering workstation is its
     co-equal in the brief's "or", and is on the path list, but the setpoint
     manipulation of L249 happens at the controller. */
  targetAssetId: "chemical-dosing-plc",
  attackPathIds: [
    "p-vendor-to-maintenance-net",
    "p-maintenance-net-to-ews",
    "p-maintenance-net-to-plc",
    "p-ews-to-plc-programming"
  ],
  consequence: {
    /* L253, the chain's last line, verbatim. */
    title: "Water-quality event, emergency response, service disruption, public-health risk",
    /* L251, verbatim. */
    operationalEffect: "Inadequate or excessive disinfection / loss of treatment verification",
    /* L268's result message: the plant must be able to hold compliant
       disinfection with digital control unavailable. L236 supplies the limit
       on that — operator coverage and manual operating limitations. */
    safetyOrReliabilityContext:
      "Operators must be able to maintain compliant disinfection if digital control is unavailable, bounded by staff response time, operator coverage and manual operating limitations.",
    /* L213 (treatment must be continuous), L235 and L237. */
    businessImpact:
      "Loss-of-treatment and service-impact assumptions, and the regulatory and notification obligations that follow, against a plant that must maintain treatment continuously.",
    /* The brief's own "Operational-consequence evidence" group, L234-238 —
       the four inputs it says this consequence is reasoned from. */
    evidenceIds: [
      "ev-quality-thresholds",
      "ev-loss-of-treatment",
      "ev-operator-coverage",
      "ev-regulatory-obligations"
    ]
  },
  /* L258-264 — five candidate controls, in the brief's own order. Each row's
     middle column becomes `implementationConstraint` and its right column
     `decisionInsight`; both are transcribed, not summarised. */
  controls: [
    {
      /* L260 */
      id: "ctl-disconnect-remote-support",
      title: "Disconnect remote support",
      /* Removing a conduit outright. Nearest true value in the contract's
         union; nothing is stretched by it. */
      type: "segmentation",
      closesPathIds: ["p-vendor-to-maintenance-net"],
      /* Nothing of the support route survives — that is the objection L213
         records operations making. */
      preservesPathIds: [],
      /* Everything inside the plant is untouched: cutting the vendor link does
         not change what the maintenance network can still reach. */
      residualPathIds: [
        "p-maintenance-net-to-ews",
        "p-maintenance-net-to-plc",
        "p-ews-to-plc-programming"
      ],
      implementationConstraint:
        "Whether fault recovery, calibration, or emergency assistance becomes operationally unacceptable",
      decisionInsight: "May lower cyber exposure but increase recovery and continuity risk"
    },
    {
      /* L261 */
      id: "ctl-broker-vendor-access",
      title: "Broker vendor access",
      type: "brokered-access",
      /* "per-asset access, and removal of persistent connectivity" (L261): the
         vendor no longer reaches the dosing controller laterally. */
      closesPathIds: ["p-maintenance-net-to-plc"],
      /* The support capability itself survives, now as an approved,
         time-limited, recorded session — L261's whole point. */
      preservesPathIds: ["p-vendor-to-maintenance-net"],
      /* Brokered arrival at the engineering workstation remains the supported
         route, and remains reachability. */
      residualPathIds: ["p-maintenance-net-to-ews", "p-ews-to-plc-programming"],
      implementationConstraint:
        "MFA, approval, time-limited sessions, jump host, recording, per-asset access, and removal of persistent connectivity",
      decisionInsight: "Preserves necessary support while removing uncontrolled reachability"
    },
    {
      /* L262 */
      id: "ctl-segment-chemical-skid",
      title: "Segment the chemical skid",
      type: "segmentation",
      /* Conduit design between the vendor path, the workstation, SCADA and the
         dosing PLC closes the two undefined routes off the maintenance
         network. */
      closesPathIds: ["p-maintenance-net-to-plc", "p-maintenance-net-to-ews"],
      /* "Shows required process/monitoring flows" (L262) — every one of them. */
      preservesPathIds: REQUIRED_FLOW_IDS,
      /* The engineering programming path is what a conduit is drawn AROUND,
         not what it removes. */
      residualPathIds: ["p-ews-to-plc-programming"],
      implementationConstraint:
        "Virtual firewall rules and conduit design between vendor path, engineering workstation, SCADA, and dosing PLC",
      decisionInsight:
        "Shows required process/monitoring flows and the routes that can be safely closed"
    },
    {
      /* L263. `patch` is the contract's nearest value for a device-level
         remediation; the control is really hardening plus recovery readiness,
         and the union has no word for that. Noted, not smoothed over. */
      id: "ctl-harden-controller",
      title: "Harden the controller",
      type: "patch",
      /* "allowlisting" — L184 states this concretely as allowing only known
         authorized engineering assets, which closes any non-allowlisted route
         to the controller. */
      closesPathIds: ["p-maintenance-net-to-plc"],
      /* The restricted programming path must keep working for engineering. */
      preservesPathIds: ["p-ews-to-plc-programming"],
      /* And it is simultaneously the residual: an allowlisted workstation that
         is itself compromised still reaches the PLC. Same id in both fields,
         deliberately — see `ProposedControl.residualPathIds`. */
      residualPathIds: ["p-ews-to-plc-programming"],
      implementationConstraint:
        "Password protection, clean PLC-image backup, restricted programming path, allowlisting, and change-control workflow",
      decisionInsight: "Reduces takeover/lockout risk and improves recovery readiness"
    },
    {
      /* L264. See DEVIATION 1 — this is the control the contract's four types
         cannot name. */
      id: "ctl-process-safeguards",
      title: "Add process safeguards",
      type: "process-safeguard",
      /* Closes no path, by design. L264 is explicit that this control acts
         after the cyber protections have failed. */
      closesPathIds: [],
      preservesPathIds: REQUIRED_FLOW_IDS,
      /* Every route in the chain is still open afterwards. */
      residualPathIds: [
        "p-vendor-to-maintenance-net",
        "p-maintenance-net-to-ews",
        "p-maintenance-net-to-plc",
        "p-ews-to-plc-programming"
      ],
      implementationConstraint:
        "Independent alarming, local/manual fallback, separate measurement verification, or operating procedure changes",
      decisionInsight: "Shows which controls reduce consequence if cyber protections fail"
    }
  ]
};

/** The brief's result message, L268 — the sentence the worked example closes
 *  on, and the reason the page is not allowed to end at "secure the PLC". */
export const DOSING_RESULT =
  "The recommendation is not merely “secure the PLC.” It is a water-quality decision: reduce unauthorized reachability, preserve controlled technical support, verify that SCADA and alarms still function, and ensure operators can maintain compliant disinfection if digital control is unavailable.";

/** Assets this scenario actually touches, in the brief's chain order — for the
 *  hero's shrunk single-path view, which must not show the whole inventory. */
export const DOSING_CHAIN_ASSET_IDS = [
  "integrator-remote-support",
  "maintenance-network-firewall",
  "plant-engineering-workstation",
  "chemical-dosing-plc",
  "chemical-metering-pump",
  "hypochlorite-dosing-skid"
];

export const DOSING_CHAIN_ASSETS: SystemAsset[] = DOSING_CHAIN_ASSET_IDS.map(
  (id) => WATER_ASSETS.find((a) => a.id === id)!
);
