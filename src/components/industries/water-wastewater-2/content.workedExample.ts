/**
 * S06 · THE WORKED EXAMPLE — source L205–L270. Pattern 2, Three-Gate Ledger.
 *
 * COLUMN ORDER IS A STRICT INEQUALITY, and `-1` shipped it inverted (4 / 5 / 3,
 * middle widest) under a comment asserting the asymmetry was deliberate. It is
 * enforced here as three numbers that can be checked without eyeballing widths:
 *
 *     Baseline lg:col-span-5  >  Proposed control lg:col-span-4  >  Decision
 *     output lg:col-span-3           (5 > 4 > 3, summing to 12)
 *
 * PROPOSED-CONTROL MINIMUM DENSITY. Pattern 2 offers two remedies for a middle
 * column that is bare chrome before the reader acts. (b) — fixed supporting copy
 * that is present regardless of selection — is REQUIRED and is `controls.fixed`
 * below: what a proposed control is, how the residual-exposure figure is
 * computed, and what the crosshair reticle means. (a) — pre-selecting the first
 * candidate — is DECLINED, with a content reason: the source's own Result
 * message (L268) concludes the answer is a COMBINATION of measures, not one
 * control, so a forced default would misrepresent the source's conclusion. That
 * is exactly the case the pattern anticipates. First paint is still informative
 * because the shared canvas renders the baseline route set (all `open`) rather
 * than a blank canvas — which is what fixes `-1`'s
 * `useState<number | null>(null)` failure without introducing a new claim.
 */
import { same } from "../registry";
import type { SystemAsset, SystemPath } from "@/components/twin/types";

/** Canvas data for the shared dosing diagram. Every node is named by the
 *  source's own evidence list; every edge is a relationship it states. */
export const DOSING_ASSETS: SystemAsset[] = [
  {
    id: "vendor",
    type: "remote-access",
    label: "Vendor remote-support endpoint",
    description: "The system integrator's remote troubleshooting connection.",
    zone: "external"
  },
  {
    id: "maintenance-net",
    type: "network-device",
    label: "Maintenance network",
    description: "The plant maintenance network the remote connection lands on.",
    zone: "plant"
  },
  {
    id: "ews",
    type: "engineering-workstation",
    label: "Engineering workstation",
    description: "PLC programming and configuration access.",
    zone: "plant"
  },
  {
    id: "scada",
    type: "network-device",
    label: "SCADA / historian",
    description: "SCADA data flow and alarm dependencies.",
    zone: "plant"
  },
  {
    id: "plc",
    type: "controller",
    label: "Chemical-dosing PLC",
    description: "Runs the dosing sequence and its interlocks.",
    zone: "process",
    criticality: "critical"
  },
  {
    id: "analyzer",
    type: "field-device",
    label: "Chlorine residual analyzer",
    description: "Residual feedback into the dosing sequence.",
    zone: "process",
    criticality: "important"
  },
  {
    id: "skid",
    type: "process-equipment",
    label: "Sodium-hypochlorite dosing skid",
    description: "The metering pumps the PLC drives.",
    zone: "process",
    criticality: "critical"
  },
  {
    id: "interlock",
    type: "safety-function",
    label: "High/low dosing alarm interlock",
    description: "Independent alarming and tank high/low conditions.",
    zone: "process",
    criticality: "critical"
  }
];

export const DOSING_PATHS: SystemPath[] = [
  { id: "e-vendor", from: "vendor", to: "maintenance-net", role: "vendor-access", status: "open" },
  { id: "e-maint-ews", from: "maintenance-net", to: "ews", role: "management", status: "open" },
  { id: "e-maint-plc", from: "maintenance-net", to: "plc", role: "attack-path", status: "open" },
  { id: "e-ews-plc", from: "ews", to: "plc", role: "management", status: "open" },
  { id: "e-scada-plc", from: "scada", to: "plc", role: "required-flow", status: "open" },
  { id: "e-analyzer-plc", from: "analyzer", to: "plc", role: "required-flow", status: "open" },
  { id: "e-plc-skid", from: "plc", to: "skid", role: "required-flow", status: "open" },
  { id: "e-interlock-skid", from: "interlock", to: "skid", role: "required-flow", status: "open" }
];

export const WORKED_EXAMPLE = {
  h2: same("Worked example: secure chemical-dosing control without compromising water quality."),
  scenarioLabel: same("Scenario"),
  scenarioOne: same(
    "A drinking-water treatment plant uses a PLC-controlled sodium-hypochlorite dosing skid. The dosing sequence relies on incoming flow, chlorine-residual feedback, pump status, chemical-tank level, and high/low alarm conditions. The PLC and local HMI are accessible through a maintenance network that also supports a system integrator's remote troubleshooting connection."
  ),
  scenarioTwo: same(
    "A cybersecurity review finds that the remote connection has broad access to the plant network and that the chemical-dosing PLC is reachable through an outdated pathway. The simple recommendation is “disconnect the access.” Operations objects: the integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously."
  ),
  canvasTitle: same("Vendor remote-access route to the chemical-dosing PLC"),
  discrepancyLabel: same("What changes on the canvas"),
  discrepancyHint: same("Each entry moves the highlight to its node above."),

  /* ── Gate 1 · Baseline · lg:col-span-5 · 11 content elements ───────────── */
  baseline: {
    label: same("Baseline"),
    caption: same("As documented, before anything is proposed."),
    entryLabel: same("Entry point"),
    entry: same("Compromised vendor credentials / remote-support endpoint."),
    intermediateLabel: same("Intermediate systems"),
    intermediate: same("Maintenance network route; chemical-dosing PLC or engineering workstation becomes reachable."),
    targetLabel: same("Target asset"),
    target: same("Chemical-dosing PLC — setpoint, logic, mode, or pump-state manipulation becomes possible."),
    chainLabel: same("Modelled chain"),
    chain: [
      same("Compromised vendor credentials / remote-support endpoint"),
      same("Maintenance network route"),
      same("Chemical-dosing PLC or engineering workstation becomes reachable"),
      same("Setpoint, logic, mode, or pump-state manipulation becomes possible"),
      same("Inadequate or excessive disinfection / loss of treatment verification"),
      same("Water-quality event, emergency response, service disruption, public-health risk")
    ],
    constraintLabel: same("Known constraints"),
    constraint: same(
      "The integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously."
    )
  },

  /* ── Gate 2 · Proposed control · lg:col-span-4 · 9 content elements ────── */
  controls: {
    label: same("Proposed control"),
    caption: same("Five candidates, tested in the model. Select one to place it on the canvas above."),
    testsLabel: same("What the Twin tests"),
    insightLabel: same("Decision insight"),
    closesLabel: same("Routes closed"),
    preservesLabel: same("Required flows preserved"),
    residualLabel: same("Residual exposure"),
    noneLabel: same("None in this option"),
    /* Pattern 2 remedy (b), mandatory: present at first paint, independent of
       any selection, and sized to occupy real height on its own. */
    fixed: [
      {
        term: same("What a proposed control is"),
        body: same(
          "A candidate change tested against the model, not a change made to the plant. Selecting one shows what it would close, what it would preserve, and what it would leave open."
        )
      },
      {
        term: same("How residual exposure is computed"),
        body: same(
          "Every route the model still leaves open once the selected control is applied — the baseline route set minus the routes that control closes. It is a list of named routes, never a score."
        )
      },
      {
        term: same("What the crosshair reticle means"),
        body: same(
          "A circled cross in P&ID convention, drawn in amber on the canvas at the asset where the proposed control is inserted. Amber is “proposed”; it never means the route is closed."
        )
      }
    ],
    items: [
      {
        id: "disconnect",
        option: same("Disconnect remote support"),
        tests: same("Whether fault recovery, calibration, or emergency assistance becomes operationally unacceptable."),
        insight: same("May lower cyber exposure but increase recovery and continuity risk."),
        closes: ["e-vendor"],
        preserves: [] as string[],
        residual: ["e-maint-ews", "e-maint-plc"],
        marks: ["vendor"]
      },
      {
        id: "broker",
        option: same("Broker vendor access"),
        tests: same(
          "MFA, approval, time-limited sessions, jump host, recording, per-asset access, and removal of persistent connectivity."
        ),
        insight: same("Preserves necessary support while removing uncontrolled reachability."),
        closes: [] as string[],
        preserves: ["e-maint-ews"],
        residual: ["e-maint-plc"],
        marks: ["vendor"]
      },
      {
        id: "segment",
        option: same("Segment the chemical skid"),
        tests: same(
          "Virtual firewall rules and conduit design between vendor path, engineering workstation, SCADA, and dosing PLC."
        ),
        insight: same("Shows required process/monitoring flows and the routes that can be safely closed."),
        closes: ["e-maint-plc"],
        preserves: ["e-scada-plc", "e-analyzer-plc"],
        residual: ["e-ews-plc"],
        marks: ["maintenance-net"]
      },
      {
        id: "harden",
        option: same("Harden the controller"),
        tests: same(
          "Password protection, clean PLC-image backup, restricted programming path, allowlisting, and change-control workflow."
        ),
        insight: same("Reduces takeover/lockout risk and improves recovery readiness."),
        closes: [] as string[],
        preserves: ["e-scada-plc"],
        residual: ["e-ews-plc"],
        marks: ["plc"]
      },
      {
        id: "safeguards",
        option: same("Add process safeguards"),
        tests: same(
          "Independent alarming, local/manual fallback, separate measurement verification, or operating procedure changes."
        ),
        insight: same("Shows which controls reduce consequence if cyber protections fail."),
        closes: [] as string[],
        preserves: ["e-interlock-skid", "e-analyzer-plc"],
        residual: [] as string[],
        marks: ["interlock", "analyzer"]
      }
    ]
  },

  /* ── Gate 3 · Decision output · lg:col-span-3 · 10 content elements ────── */
  output: {
    label: same("Decision output"),
    caption: same("What the model actually recommends."),
    recommendedLabel: same("Recommended sequence"),
    /* Source L268, as its own four clauses — which is also why no candidate
       control is pre-selected: the source concludes a combination, not one. */
    recommended: [
      same("Reduce unauthorized reachability."),
      same("Preserve controlled technical support."),
      same("Verify that SCADA and alarms still function."),
      same("Ensure operators can maintain compliant disinfection if digital control is unavailable.")
    ],
    evidenceLabel: same("Evidence needed"),
    evidence: [
      {
        category: same("Treatment-process evidence"),
        items: same(
          "Process-flow diagram and P&IDs; dosing-control narrative and interlocks; chemical dosing calculations and acceptable operating range; residual-monitoring points and sampling requirements; clearwell, contact-time and treatment operating constraints; emergency operating procedures and manual-dosing capability."
        )
      },
      {
        category: same("OT and network evidence"),
        items: same(
          "Chemical PLC, local HMI, VFD / metering-pump controls; SCADA data flow and alarm dependencies; engineering workstation and vendor-access route; firewall, VLAN, routing, remote gateway and observed OT traffic; existing backups, PLC project files and recovery procedure."
        )
      },
      {
        category: same("Operational-consequence evidence"),
        items: same(
          "Water-quality escalation thresholds; loss-of-treatment and service-impact assumptions; staff response time, operator coverage and manual operating limitations; relevant regulatory and notification obligations."
        )
      }
    ],
    validationLabel: same("Validation condition"),
    validation: same(
      "SCADA and alarms still function, and operators can maintain compliant disinfection if digital control is unavailable."
    ),
    /* Pattern 2's Decision-output panel also names an implementation window and
       a responsible role. The source states neither, so neither is printed. An
       invented window or owner would be fabricated evidence on a page whose
       whole argument is that evidence is traceable. */
    omissionLabel: same("Not asserted here"),
    omission: same(
      "Implementation window and responsible role are set with the utility during the engagement. This illustrative record does not claim them."
    ),
    citation: same(
      "This example closely reflects the sector threat pattern CISA has highlighted: internet-exposed PLCs can be used to lock operators out or change device configuration, while water utilities must preserve the ability to monitor and control treatment safely."
    )
  }
};
