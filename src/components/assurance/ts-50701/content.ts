/**
 * TS 50701 — narrative copy, transcribed from new_material_source/
 * 1_website_layout_v4/4_assurance/assurance_TS50701.md and its companion
 * assurance_TS50701_support_cdt.d (the RAMS / IEC 62278 support note).
 * The reference tables live next door in content-tables.ts so neither file
 * approaches the 500-line ceiling.
 *
 * SHORT PAGE, ON PURPOSE. `content/reference/ts-50701.en.md` already carries
 * the full regulatory deep-dive and renders at /reference/ts-50701. This page
 * is the product/assurance framing — what the Cyber Digital Twin does with
 * TS 50701 — and links out rather than reprinting the standard.
 *
 * BOTH LOCALES RENDER. Every string is `Bilingual` via `same()`; `nl` is a
 * same-as-English placeholder pending translation, not a claim that this is
 * correct Dutch. Same convention as the six industry pages — grep `same(`
 * when the translation pass starts.
 *
 * TWO QUOTATIONS ARE FIXED WORDING, NOT EDITORIAL COPY: BOUNDARY.calculation
 * and BOUNDARY.rams are reproduced verbatim from the source briefs, which
 * both say "use this exact wording". Do not paraphrase them.
 */
import type { Bilingual } from "@/i18n/bilingual";

export function same(en: string): Bilingual {
  return { en, nl: en };
}

export const META = {
  title: "TS 50701 Railway Cybersecurity Assurance & Risk Evidence",
  description:
    "Build TS 50701-oriented railway cybersecurity evidence from the operational system you run. OXOT's Cyber Digital Twin connects signaling, train control, OT networks, dependencies, safety context, cyber pathways, and traceable risk-treatment decisions."
};

export const HERO = {
  kicker: same("Assurance / CLC/TS 50701"),
  h1: same("Connect railway cybersecurity to safe, recoverable operations."),
  lead: same(
    "Railway cybersecurity cannot be assessed as a separate IT exercise. A cyber pathway can affect signaling, train control, traction power, control-center operations, communications, depot systems, wayside equipment, rolling-stock maintenance, and the ability to move passengers or freight safely."
  ),
  body: same(
    "OXOT's Cyber Digital Twin connects the railway system, its operational dependencies, cyber pathways, safety and RAMS context, and candidate controls in one evolving model."
  ),
  chainLabel: same("From railway system to assurance evidence"),
  chain: [
    same("Railway system and operational context"),
    same("Assets, interfaces, zones, and communications"),
    same("Cyber pathway and railway consequence"),
    same("Risk treatment and security engineering"),
    same("Traceable assurance evidence across the lifecycle")
  ],
  ctaPrimary: same("Discuss a railway cybersecurity scenario"),
  ctaSecondary: same("Explore the Cyber Digital Twin")
};

/** The standing facts a reader needs before any of the rest means anything. */
export const FACTS: readonly { k: string; v: Bilingual }[] = [
  {
    k: "Designation",
    v: same("CLC/TS 50701 — a railway-specific cybersecurity technical specification, published by CENELEC.")
  },
  {
    k: "Basis",
    v: same("Built on IEC 62443 cybersecurity concepts and EN 50126 RAMS lifecycle thinking.")
  },
  { k: "Edition", v: same("Second edition published August 2023.") },
  {
    k: "Status",
    v: same(
      "The European Union Agency for Railways has described it as a valuable milestone but not, as such, a mandatory standard in the EU railway regulatory framework. Treat it as important railway guidance, not an automatic obligation."
    )
  },
  {
    k: "RAMS series",
    v: same(
      "The former EN 50126 / IEC 62278:2002 has been replaced at IEC level by IEC 62278-1:2025 (generic RAMS process) and IEC 62278-2:2025 (systems approach to safety)."
    )
  }
];

export const CHALLENGE = {
  h2: same("In rail, “safe” can still mean a major operational disruption."),
  lead: same(
    "A failure in a conventional IT system may be measured in lost productivity. A failure in a railway system may result in a deliberately safe but operationally restrictive state:"
  ),
  outcomes: [
    same("Trains are stopped or slowed."),
    same("Movement authorities cannot be issued or validated."),
    same("Routes cannot be set through a junction, terminal, depot, or yard."),
    same("Train-control availability is reduced."),
    same("Signaling or communications enter a degraded mode."),
    same("Traction power is unavailable to a section of railway."),
    same("Stations, tunnels, passenger-information systems, or emergency-support systems cannot operate normally."),
    same("Dispatchers lose visibility or the ability to manage traffic efficiently."),
    same("Field engineering response and safe recovery take longer than the initial technical disruption.")
  ],
  passenger: same(
    "For passenger transit, the result may be reduced headways, station crowding, passenger safety-management pressure, and network-wide service disruption."
  ),
  freight: same(
    "For freight rail, it may be PTC restrictions, dispatching delays, mainline congestion, yard blockage, missed interchange, hazardous-material response complexity, or customer supply-chain impact."
  ),
  pullQuote: same(
    "The question is not only “Can an attacker reach the system?” It is “What railway function becomes unavailable, degraded, or unsafe if they do?”"
  )
};

export const LIFECYCLE = {
  h2: same("Cybersecurity aligned to railway lifecycle and safety context."),
  lead: same(
    "TS 50701 provides railway-specific cybersecurity guidance across the lifecycle of a railway application. It connects cybersecurity activities to railway system definition, risk analysis, requirements, implementation, validation, acceptance, operation, maintenance, monitoring, and decommissioning."
  ),
  stepsLabel: same("Core lifecycle logic"),
  steps: [
    same("Define the railway system and operational context"),
    same("Identify assets, functions, interfaces, and dependencies"),
    same("Assess cybersecurity risk"),
    same("Understand links to safety and operational consequence"),
    same("Define cybersecurity requirements and treatment"),
    same("Implement, integrate, verify, validate, and accept"),
    same("Operate, monitor, maintain, manage vulnerabilities, and change"),
    same("Preserve evidence through decommissioning")
  ],
  tableLabel: same("What this means in practice"),
  tableHeadConcern: same("Lifecycle concern"),
  tableHeadQuestion: same("Railway question")
};

export const APPROACH = {
  h2: same("Model the railway as an operational system — not just a network."),
  lead: same(
    "OXOT builds a Cyber Digital Twin from the railway's engineering, operational, OT, communications, asset, and safety/reliability evidence."
  ),
  inputsLabel: same("Railway evidence in"),
  inputs: [
    same("Signaling diagrams, interlocking data, CBTC / ETCS / PTC architecture"),
    same("SCADA and traction-power data, asset records, topology exports"),
    same("Maintenance records, safety/RAMS evidence, operating procedures"),
    same("Vendor access, supplier, firmware, and component information")
  ],
  modelLabel: same("Held in the Twin as"),
  model: [
    same("Railway functions, assets, systems, communications, zones"),
    same("Dependencies, pathways, degraded modes, consequences")
  ],
  outputsLabel: same("TS 50701-oriented evidence out"),
  outputs: [
    same("System definition, risk scenarios, security treatment"),
    same("Safety-linked consequence, change decisions, lifecycle traceability")
  ],
  principle: same("Model the route. Trace the consequence. Test the control. Preserve the evidence."),
  distinctionsLead: same("Linking a cyber pathway to the operational function it can affect lets a team distinguish:"),
  distinctions: [
    same("A vulnerability that is present but unreachable."),
    same("A reachable system that has limited operational consequence."),
    same(
      "A reachable route into an asset that supports a safety, movement-authority, traction-power, dispatch, or high-capacity operational function."
    ),
    same("A control that closes the intended route but breaks a required diagnostic, signaling, maintenance, or recovery flow."),
    same("A legacy issue that can be deferred only with documented compensating controls and review conditions.")
  ]
};

export const SCENARIOS = {
  h2: same("Trace the attack path to a service, safety, or recovery consequence."),
  lead: same(
    "Every scenario in the library follows the same five-stage logic, so a security finding and an operations objection can be argued against the same trace."
  ),
  chain: [
    same("Entry point"),
    same("Reachable system or asset"),
    same("Railway function affected"),
    same("Safety / operational / service consequence"),
    same("Candidate control and residual risk")
  ],
  passengerTab: same("Passenger rail & transit"),
  freightTab: same("Freight rail"),
  headScenario: same("Scenario"),
  headPathway: same("Cyber pathway"),
  headConsequence: same("Railway consequence")
};

export const SCOPE = {
  h2: same("Define the rail system before defining the security controls."),
  lead: same(
    "A railway “system under consideration” may be much smaller than an entire rail network. A credible cybersecurity assurance effort needs a precise scope — a boundary, the interfaces that cross it, and the operational assumptions that hold inside it."
  ),
  figureCaption: same(
    "A system under consideration is defined by what sits inside the boundary and by every interface that crosses it. Each crossing is a candidate cyber pathway and an operational dependency at the same time."
  ),
  boundariesLabel: same("Example system boundaries"),
  headScopeClass: same("Scope"),
  headScopeExample: same("Example system under consideration"),
  outputsLabel: same("OXOT system-definition outputs"),
  headEvidenceElement: same("Evidence element"),
  headEvidenceProvided: same("What the Twin provides")
};

export const SAFETY = {
  h2: same("Cybersecurity read in the context of railway safety and degraded operation."),
  lead: same(
    "A Cyber Digital Twin does not replace a safety case, hazard analysis, independent safety assessment, RAMS process, or responsible engineering authority. It supports cybersecurity analysis by making the relationship between a cyber pathway and its possible safety or operational consequence explicit."
  ),
  chainLabel: same("The consequence chain"),
  chain: [
    {
      stage: same("Cyber entry point"),
      detail: same("Vendor connection, remote maintenance, compromised credential, network route, exposed service, supplier component")
    },
    {
      stage: same("Reachable railway asset"),
      detail: same("Engineering workstation, interlocking, CBTC controller, PTC-support component, traction-power RTU, signaling server")
    },
    {
      stage: same("Affected railway function"),
      detail: same("Route setting, movement authority, train detection, dispatch visibility, power control, maintenance configuration")
    },
    {
      stage: same("Railway outcome"),
      detail: same("Safe degraded mode, train restriction, loss of capacity, service suspension, station closure, recovery delay")
    },
    {
      stage: same("Safety / service / business consequence"),
      detail: same(
        "Passenger crowding, delayed emergency response, network congestion, freight disruption, operational workload, financial and reputational impact"
      )
    }
  ],
  evidenceLabel: same("Safety-linked evidence"),
  headEvidenceType: same("Evidence type"),
  headEvidenceContributes: same("What it contributes"),
  keyMessage: same(
    "A cybersecurity control should not be judged only by whether it blocks an attack. It must also be judged by whether the railway can still operate, fail safely, diagnose faults, and recover when the control is in place."
  )
};

export const TREATMENT = {
  h2: same("Test the security control before changing the railway."),
  lead: same(
    "Security changes in rail can affect signaling, diagnostic capability, field maintenance, vendor access, remote recovery, operations control, and safe degraded modes. A control that reduces cyber risk but prevents timely safe restoration may create a new operational problem. Candidate controls are modelled in the Twin first."
  ),
  flow: [
    {
      stage: same("Baseline"),
      detail: same("Current system, zones, pathways, dependencies, and operating constraints")
    },
    {
      stage: same("Candidate change"),
      detail: same("Firewall, segmentation, remote-access redesign, patch, replacement, monitoring control, supplier change, procedure")
    },
    {
      stage: same("Simulation"),
      detail: same("Routes closed, required flows preserved, residual pathways, operational effect, safety/RAMS dependencies, recovery implications")
    },
    {
      stage: same("Decision"),
      detail: same("Implement, phase, validate in possession, add compensating controls, defer with accountable evidence, redesign the option")
    }
  ],
  tableLabel: same("Common railway treatment decisions"),
  headDecision: same("Decision"),
  headEvaluate: same("What OXOT helps evaluate")
};

export const WORKED = {
  h2: same("Worked example: secure signaling vendor access without impairing service recovery."),
  disclaimer: same("Illustrative scenario — no customer data."),
  situation: same(
    "A passenger-rail operator uses a vendor-managed maintenance connection to support signaling engineering tools, wayside controllers, and selected control-center engineering systems. The route was established during deployment and evolved through years of maintenance work."
  ),
  findingsLabel: same("What the security review finds"),
  findings: [
    same("Persistent vendor access."),
    same("Shared accounts or broad engineering permissions."),
    same("A pathway across more than one operational zone."),
    same("Limited documentation of required data and diagnostic flows."),
    same("A critical dependency on vendor support during a signaling incident.")
  ],
  conflict: same(
    "The security team proposes to remove remote vendor access immediately. Operations objects: vendor support may be required to diagnose a fault, support an overnight possession, restore a CBTC or signaling issue, or confirm a safe configuration after field work."
  ),
  pathwayLabel: same("Modelled pathway"),
  pathway: [
    same("Compromised vendor credential or support endpoint"),
    same("Remote-access gateway / vendor route"),
    same("Signaling engineering workstation"),
    same("Configuration or diagnostic pathway toward signaling / CBTC assets"),
    same("Potential degraded train-control operation or service-recovery complication"),
    same("Reduced headway, service restriction, passenger disruption, and longer recovery")
  ],
  controlsLabel: same("Candidate controls, as modelled"),
  headTreatment: same("Candidate treatment"),
  headTests: same("What the Twin tests"),
  headInsight: same("Likely decision insight"),
  result: same(
    "The defensible outcome is rarely “disconnect the vendor” or “leave the route unchanged.” It is a staged, evidence-backed design: remove persistent reachability, preserve authorized support, prove required signaling and recovery flows, validate changes in the appropriate engineering and possession process, and retain the reasoning for assurance review."
  )
};

export const OUTPUTS = {
  h2: same("Produce evidence that remains connected to the railway system."),
  lead: same(
    "Each output stays attached to the model objects it was derived from, so a reviewer can move from a statement back to the asset, interface, and source artifact behind it."
  ),
  headOutput: same("Output"),
  headUse: same("Typical use")
};

export const PROVENANCE = {
  h2: same("Every railway cybersecurity claim should be traceable to its source — or visibly absent."),
  lead: same("One claim, drilled all the way down. This is the shape every assurance statement in the model takes."),
  trace: [
    { k: same("Assurance claim"), v: same("“Remote vendor access must be restricted.”") },
    {
      k: same("Cyber pathway"),
      v: same("Vendor portal → remote gateway → engineering workstation → signaling configuration pathway")
    },
    {
      k: same("Operational consequence"),
      v: same("Possible train-control degradation, slower recovery, service restriction")
    },
    {
      k: same("Railway evidence"),
      v: same(
        "System diagram, network export, access procedure, RAMS record, degraded-mode procedure, vendor-support agreement, configuration evidence"
      )
    },
    { k: same("Treatment decision"), v: same("Brokered access + segmentation + planned validation") },
    { k: same("Accountability"), v: same("Decision owner, approval, residual risk, review trigger, change history") }
  ],
  principlesLabel: same("Evidence principles"),
  headPrinciple: same("Principle"),
  headMeaning: same("Meaning for railway assurance")
};

export const BOUNDARY = {
  h2: same("OXOT supports TS 50701-oriented evidence. It does not replace railway accountability."),
  lead: same(
    "OXOT can help railway organizations, system integrators, suppliers, and engineering teams build an evidence-grounded model of railway cybersecurity risk, dependencies, controls, changes, and operational consequences. However:"
  ),
  notList: [
    same("OXOT does not certify a railway system, product, operator, supplier, or organization to TS 50701."),
    same("OXOT does not issue a safety case, safety authorization, independent safety assessment, or regulatory approval."),
    same(
      "OXOT does not determine whether a particular national, EU, customer, contract, procurement, or railway authorization requirement applies."
    ),
    same(
      "OXOT does not guarantee conformance with TS 50701, NIS2, CRA, IEC 62443, railway Technical Specifications for Interoperability, or any other framework."
    ),
    same("Safety, operational, cybersecurity, and regulatory decisions remain with the accountable railway organization and qualified authorities."),
    same(
      "The model depends on the quality, completeness, versioning, and approved interpretation of customer-supplied engineering, operational, safety, network, and supplier evidence."
    )
  ],
  /* Fixed wording — see this file's header. */
  calculation: same(
    "The Cyber Digital Twin provides transparent, drillable models and calculations to support cybersecurity and operational decision-making. It is not a safety case, independent safety assessment, certification decision, legal opinion, regulatory determination, insurance assessment, or rating-agency mark."
  ),
  rams: same(
    "OXOT supports RAMS evidence, cybersecurity analysis, dependency modeling, and change-impact assessment. It does not replace the railway's RAMS process, safety case, hazard-log ownership, safety authorization, independent safety assessment, system acceptance, or the accountable engineering and operational authorities."
  )
};

export const ONWARD = {
  h2: same("Where to go next"),
  deepDiveLabel: same("The full TS 50701 regulatory deep-dive"),
  deepDiveBody: same(
    "Scope, structure, clause-level detail, and how the specification sits against IEC 62443 and the EN 50126 / IEC 62278 RAMS series — the long-form reference document, not this product framing."
  ),
  railLabel: same("Rail & Transportation"),
  railBody: same(
    "The sector page: passenger-transit and US freight-rail operating models, their OT architectures, and the engagement shape — the railway context this page assumes rather than repeats."
  ),
  twinLabel: same("The Cyber Digital Twin"),
  twinBody: same("What the model is, what it holds, and how a candidate control is tested in it before it reaches the live railway.")
};

export const CTA = {
  h2: same("Start with one railway system, one operational dependency, or one change."),
  body: same(
    "Bring a signaling architecture, interlocking diagram, CBTC/ETCS/PTC map, traction-power SCADA diagram, asset list, network topology, hazard/RAMS record, vendor-access design, or proposed change. OXOT will show how the Cyber Digital Twin traces the cyber pathway, connects it to the railway consequence, tests the treatment, and preserves the assurance evidence."
  ),
  primary: same("Discuss a railway cybersecurity scenario"),
  secondary: same("Request the Technical Specification")
};
