/**
 * MANUFACTURING & PROCESS — content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_manu-process.md, which is
 * finished, ready-to-use copy, not an outline. Restructured into the
 * sections this page's own layout uses (see page.tsx's section order), not
 * a verbatim reprint of the source file's own headings.
 *
 * KNOWN SOURCE-FILE ARTIFACT: the source markdown repeats its "Operational
 * concerns" table verbatim, once near the top of the file (before any
 * section heading) and again under "Operational reality". Used once here,
 * inside OPERATIONAL_REALITY.concerns.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that this is correct Dutch. See
 * registry.ts's own doc comment.
 *
 * Cross-references to pages the source file assumes exist
 * (/platform/cyber-digital-twin, /platform/decisions/change-safely,
 * /platform/deployment-data-sovereignty, /assurance/iec-62443,
 * /resources/technical-specification) are retargeted to what's real today:
 * /cdt-2#decide, /assurance (EN) / /consulting (NL), /technical-specification
 * (EN) / /cdt-2 (NL), /consulting, /contact.
 *
 * ENGAGEMENT has no dedicated copy in the source file — its own page-structure
 * outline lists an "Engagement approach" section but never supplies the
 * table energy-utilities' equivalent source file did. Rather than invent new
 * facts, ENGAGEMENT reuses OXOT's real three-tier engagement structure
 * (Decision Sprint / Twin Build / Continuous Twin Operations — the same
 * tiers energy-utilities' own source file gave), with the use-case and
 * output language drawn only from facts already stated elsewhere in this
 * file's source: the "Bring one P&ID and asset list" secondary conversion,
 * the decision types listed in the source's own contact-form field, and the
 * brownfield/multi-site/shutdown-window concerns already in
 * OPERATIONAL_REALITY.
 */
import { same } from "../registry";

export const META = {
  title: "Manufacturing OT Cybersecurity Digital Twin",
  description:
    "Test OT security changes before production. OXOT's Cyber Digital Twin connects process engineering, OT networks, cyber pathways, and operational consequence for manufacturing and process facilities."
};

export const HERO = {
  h1: same("Make cyber decisions without gambling with production."),
  lead: same(
    "OXOT builds a Cyber Digital Twin from your process engineering, control environment, and network evidence — so you can test cyber changes, prioritize work, and justify investment before touching the plant."
  ),
  ctaPrimary: same("Discuss a facility or scenario"),
  ctaSecondary: same("See how the Twin works"),
  /* The vertical process-line diagram the source brief specifies for the
     hero visual. */
  chain: [
    same("P&ID / process equipment"),
    same("PLC / DCS / SIS / HMI / historian"),
    same("Purdue zones and remote-access pathways"),
    same("Physical consequence and business-loss view")
  ],
  /* The four-view toggle the source brief specifies is not built anywhere
     on this site yet — rendered as a static, labelled illustration instead
     of omitted. */
  views: [same("Process"), same("Network"), same("Attack path"), same("Decision impact")],
  viewsNote: same(
    "A four-view toggle is not built yet — this is a static illustration of the views the model supports, not a working switch."
  )
};

export const OPERATIONAL_REALITY = {
  h2: same("The plant cannot stop just because security needs to change."),
  body: same(
    "Manufacturers manage long-lived automation, partial asset records, production pressures, contractor access, and incremental changes made over years. A vulnerability, firewall rule, remote-access pathway, or control-system replacement is not only a cyber decision — it can affect quality, throughput, equipment integrity, safety barriers, environmental containment, and restart risk."
  ),
  bodyTwo: same(
    "In a process environment, cyber controls must be designed around operational constraints: deterministic or time-sensitive communications, continuous-process behavior, legacy controllers, vendor dependencies, scheduled shutdown windows, and safety-instrumented functions. IEC 62443 recognizes these IACS-specific constraints, while IEC 61511 addresses the lifecycle requirements for safety-instrumented systems used to bring or maintain processes in a safe state."
  ),
  concerns: [
    { term: same("Continuous production"), body: same("Stopping a line, reactor, furnace, kiln, compressor, or utility system can create quality loss, restart risk, lost production, and safety exposure.") },
    { term: same("Process safety"), body: same("Manipulation of a setpoint, interlock, valve, controller, or alarm can create loss-of-containment, thermal, pressure, chemical, or mechanical consequences.") },
    { term: same("Product quality"), body: same("Cyber-caused recipe, batch, dosing, temperature, pressure, timing, or traceability changes may result in scrap, quarantine, rework, recall, or customer nonconformance.") },
    { term: same("Asset integrity"), body: same("Equipment can be damaged by abnormal starts/stops, vibration, temperature excursions, cavitation, pressure excursions, or operation outside design limits.") },
    { term: same("Brownfield complexity"), body: same("Asset records, drawings, firmware versions, network diagrams, and installed configurations often diverge over time.") },
    { term: same("Shutdown constraints"), body: same("Patching, segmentation, upgrades, and replacements may require outages that are rare, costly, and operationally risky.") },
    { term: same("Remote support"), body: same("OEMs, systems integrators, and contractors need access, but unmanaged or persistent access paths increase exposure.") },
    { term: same("Multi-site variation"), body: same("Sites using similar equipment often have different network states, safety studies, process constraints, suppliers, and local threat context.") }
  ]
};

export const ARCHITECTURE = {
  h2: same("Model the plant as it operates — not as a flat asset inventory."),
  intro: same(
    "A manufacturing site normally contains several overlapping realities: the process itself; automation and safety systems; OT networks; production and quality data; engineering change records; and business systems that schedule, support, or maintain the plant. The Cyber Digital Twin combines those realities into one environment so teams can see whether a cyber pathway can actually reach an outcome that matters."
  ),
  stationCaption: same("Six stations, one line — enterprise to field"),
  layers: [
    { name: same("Enterprise / IT"), body: same("ERP · procurement · corporate identity · remote-access governance") },
    { name: same("Industrial DMZ"), body: same("Jump hosts · patch repositories · data transfer · security services") },
    { name: same("Operations management"), body: same("MES · batch systems · historians · engineering workstations") },
    { name: same("Control"), body: same("DCS · PLCs · SCADA · HMIs · remote I/O · industrial switches") },
    { name: same("Safety and critical control"), body: same("SIS · safety PLCs · critical interlocks · burner/furnace protection") },
    { name: same("Field and process"), body: same("Sensors · valves · drives · motors · pumps · furnaces · reactors · packaging") }
  ],
  dataSources: [
    { domain: same("Engineering"), examples: same("P&IDs, line lists, equipment data, FMECA, HAZOP/hazard logs, SIL/SCIL information, reliability-critical lists, operating envelopes, minimum-operating requirements, and downtime curves.") },
    { domain: same("Automation"), examples: same("PLC ladder logic and structured text, DCS configuration, SCADA/HMI projects, RTU configuration, alarm/interlock logic, safety-system information, and engineering-workstation exports.") },
    { domain: same("OT network"), examples: same("Switches, firewalls, VLANs, routing, remote-access paths, topology exports, passive packet captures, and Purdue/zone definitions.") },
    { domain: same("Operations and enterprise"), examples: same("Historians, MES, CMMS/EAM, asset management, service management, identity, supplier records, BOMs, and maintenance workflows.") }
  ],
  protocols: ["OPC UA", "Modbus TCP", "EtherNet/IP", "PROFINET", "DNP3", "BACnet", "MQTT", "TCP/IP"]
};

export const SCENARIOS = {
  h2: same("The relevant question is not “Is it vulnerable?” It is “What happens here?”"),
  intro: same(
    "Each scenario opens into an illustrated example: entry point → reachable asset → process effect → business/safety impact → possible control."
  ),
  items: [
    { title: same("Vendor remote access"), pathway: same("Compromised vendor account or unmanaged remote route reaches an engineering workstation."), consequence: same("Logic or configuration changes, loss of view/control, unauthorized program transfer."), decision: same("Broker, time-limit, record, and segment access; test the change first.") },
    { title: same("Ransomware crossing IT/OT"), pathway: same("Enterprise compromise disrupts historian, MES, domain services, file shares, or engineering workstations."), consequence: same("Lost production visibility, manual operation, delayed recipe/quality release, controlled shutdown."), decision: same("Identify dependencies and define segmentation/recovery priorities.") },
    { title: same("Unsafe configuration change"), pathway: same("Firewall, VLAN, routing, patching, or replacement alters a required control-system communication path."), consequence: same("Loss of communications, unstable process control, trip, loss of monitoring, delayed recovery."), decision: same("Simulate the change in the Twin before implementation.") },
    { title: same("Safety-barrier exposure"), pathway: same("A reachable pathway terminates near a safety-critical function or its supporting controls."), consequence: same("Reduced ability to detect or respond to abnormal process conditions."), decision: same("Map cyber pathway to SIL/SCIL context and prioritize protection.") },
    { title: same("Recipe, batch, or dosing manipulation"), pathway: same("Compromise reaches a recipe server, batch engine, HMI, or controller tag."), consequence: same("Off-spec product, waste, rework, quality event, or customer impact."), decision: same("Trace the route, validate constraints, and test controls.") },
    { title: same("Supply-chain compromise"), pathway: same("Vulnerable vendor component, software dependency, external support tool, or supplier disruption affects the environment."), consequence: same("Inherited exposure, delayed maintenance, availability or quality impact."), decision: same("Compare supplier/control options with a common consequence model.") },
    { title: same("Undocumented drift"), pathway: same("An unrecorded control or network change accumulates across maintenance cycles."), consequence: same("Security assumptions and engineering documentation no longer reflect reality."), decision: same("Detect model deltas and evaluate changed reachability.") },
    { title: same("External pressure"), pathway: same("Threat activity, geopolitical events, supplier disruption, or local environmental conditions change."), consequence: same("Likelihood changes while the plant remains technically unchanged."), decision: same("Recalculate exposure and refresh decision priorities.") }
  ]
};

export const DECISIONS = {
  h2: same("Four decisions every plant must make."),
  items: [
    { name: same("What do we fix first?"), question: same("Which changes reduce the greatest production, quality, safety, or equipment risk first?"), provides: same("A consequence- and reachability-led priority queue: NOW, NEXT, and NEVER.") },
    { name: same("What should we spend?"), question: same("Should we fund segmentation, secure remote access, replacement, patching, monitoring, or a shutdown?"), provides: same("Comparable options, modeled risk reduction, a spend ceiling, and an indication of diminishing returns.") },
    { name: same("Can we change safely?"), question: same("Can we implement this firewall rule, re-zone a line, patch an HMI, or replace a controller without destabilizing production?"), provides: same("A virtual experiment: baseline, proposed control, remaining pathways, operational effect, and expected reduction.") },
    { name: same("What can we leave alone?"), question: same("Which backlog items can be documented as low consequence or unreachable until conditions change?"), provides: same("An evidence-backed exception decision with assumptions, source data, review conditions, and a traceable rationale.") }
  ]
};

export const WORKED_EXAMPLE = {
  h2: same("Worked example: secure a vendor route before it becomes a production decision."),
  tag: same("Illustrative scenario — no customer data"),
  scenario: same(
    "A specialty-process facility has a controller on a heat-treatment or process line. The controller communicates with an HMI and engineering workstation in the control zone. A machine OEM provides remote support through a vendor-access route that has evolved over several years. The controller has a known exploitable weakness. The security team's initial response is to recommend replacement or an immediate patch. Operations objects because the line is high-utilization, patching requires a limited shutdown window, and the process has strict qualification and quality constraints."
  ),
  inputs: [
    { category: same("Engineering"), items: same("P&ID / process diagram, equipment and line records, FMECA and reliability-critical designation, process operating limits and downtime curve, and relevant hazard / safety-function information.") },
    { category: same("OT environment"), items: same("Controller, HMI, engineering workstation, and remote-access pathway; network zones, firewall state, VLANs, routing, and observed traffic; remote-support operating procedure; firmware / software / component information.") },
    { category: same("External context"), items: same("Known exploitation and relevant threat activity, vendor and supplier context, and loss and downtime assumptions, with source traceability.") }
  ],
  chainCaption: same("Modelled chain"),
  chain: [
    same("Vendor remote-access route"),
    same("Engineering workstation / control-zone reachability"),
    same("Reachable controller function or tag"),
    same("Process deviation or loss of availability"),
    same("Production interruption, quality hold, repair, restart, and safety review"),
    same("Financial exposure and decision priority")
  ],
  controls: [
    { option: same("Patch immediately"), evaluates: same("Effect on compatibility, operations, and remaining pathways."), outcome: same("The vulnerability is reduced, but a reachable route or operational dependency remains.") },
    { option: same("Replace the controller"), evaluates: same("Reduction in component exposure versus cost, outage, commissioning, and qualification risk."), outcome: same("High-cost option; may not be the best first investment.") },
    { option: same("Broker vendor access"), evaluates: same("MFA, time-bound approval, jump host, session recording, removal of persistent path."), outcome: same("Reduces reachable pathways with limited process impact.") },
    { option: same("Re-zone the control environment"), evaluates: same("Virtual firewall and conduit changes."), outcome: same("Identifies which required flows would break and which routes remain.") },
    { option: same("Combine controls"), evaluates: same("Vendor-access redesign now; planned patch/replacement in shutdown."), outcome: same("A sequenced roadmap with higher risk reduction per euro and lower production impact.") }
  ],
  result: same(
    "The recommendation is not “patch everything” or “buy a tool.” It is a defensible sequence: close the reachable route now, preserve necessary operations, schedule disruptive work in the correct outage, and retain the evidence for plant management, audit, and procurement."
  )
};

export const CAPABILITIES = {
  h2: same("One evolving model for security, operations, and investment decisions."),
  items: [
    { name: same("Facility and process model"), body: same("Represents equipment, process constraints, potential failure propagation, containment limits, and operational boundaries.") },
    { name: same("OT asset and logic mapping"), body: same("Connects controllers, HMI/SCADA/DCS assets, configuration, and relevant control logic to process functions.") },
    { name: same("Purdue and network-state model"), body: same("Represents zones, conduits, remote access, VLANs, subnets, virtual firewalls, and actual reachability.") },
    { name: same("Engineering consequence fusion"), body: same("Uses FMECA, hazard, safety, reliability, and operational evidence rather than invented security-layer impact estimates.") },
    { name: same("Threat, supplier, and external-pressure context"), body: same("Enriches decisions with vulnerability, threat-actor, supplier, geopolitical, and disruption signals.") },
    { name: same("Simulation, prioritization, and evidence"), body: same("Supports control experiments, NOW/NEXT/NEVER prioritization, financial exposure, technical outputs, and traceable evidence.") }
  ]
};

export const REGULATORY = {
  h2: same("Build evidence from the operating model — not a separate spreadsheet universe."),
  intro: same(
    "OXOT does not claim automatic compliance or certification. The Twin supports structured evidence, risk decisions, technical documentation, and control implementation."
  ),
  rows: [
    { framework: "IEC 62443", relevance: same("Core IACS cybersecurity standard across asset-owner, integrator/service-provider, system, and component contexts; supports zoning, conduits, risk assessment, and security levels"), support: same("Models the system under consideration, network zones/conduits, pathways, relevant assets, and evidence for risk and control decisions"), href: "assurance" as const },
    { framework: "NIST SP 800-82 Rev. 3", relevance: same("Widely used OT/ICS security guidance, particularly relevant to US-oriented organizations and multinational programs"), support: same("Helps ground the OT asset baseline, architecture, risk prioritization, segmentation, remote access, and lifecycle improvement plan"), href: null },
    { framework: "IEC 61511 / functional safety", relevance: same("Central for process-industry safety-instrumented systems and their ability to achieve or maintain a safe process state"), support: same("Connects cybersecurity pathways to the engineered safety and process-consequence context; does not replace functional-safety lifecycle work"), href: null },
    { framework: "NIS2", relevance: same("Applies to defined medium and large EU entities in Annex I/II sectors, subject to national transposition and scope; several manufacturing categories appear in Annex II"), support: same("Supports risk-management evidence, supply-chain/dependency analysis, architecture visibility, and board-level risk reporting"), href: "assurance" as const },
    { framework: "Cyber Resilience Act", relevance: same("Relevant when an organization manufactures, imports, or distributes in-scope products with digital elements — not simply because it operates a factory"), support: same("Supports product/supply-chain evidence, component/BOM context, vulnerability traceability, and technical-file workflows where applicable"), href: null },
    { framework: "ISO 27001 / NIST CSF 2.0", relevance: same("Governance and enterprise-risk frameworks often used alongside OT-specific methods"), support: same("Provides an evidence-rich OT model that can feed broader risk, governance, and assurance processes"), href: null }
  ]
};

export const ENGAGEMENT = {
  h2: same("One engagement model, three ways to start."),
  items: [
    { name: same("Decision Sprint"), useCase: same("A remediation priority, a segmentation or remote-access change, a patch/replacement/modernization decision, or an M&A/diligence question"), output: same("Modelled scenario, controls comparison, evidence-backed recommendation") },
    { name: same("Facility or Line Twin Build"), useCase: same("One line, one facility, or one production estate — built from your P&ID and asset list"), output: same("Validated Cyber Digital Twin, NOW/NEXT/NEVER priority backlog, architecture views, assurance evidence") },
    { name: same("Continuous Twin Operations"), useCase: same("A brownfield, multi-site estate with changing assets, vulnerabilities, and shutdown windows"), output: same("Model updates, risk deltas, scenario testing, and recurring evidence for plant management, audit, and procurement") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one line, one facility, or one decision."),
  body: same(
    "Bring a P&ID, an asset list, and a change or investment question. OXOT will show how a Cyber Digital Twin can connect the route, the consequence, and the decision — before your team changes production."
  ),
  ctaPrimary: same("Discuss a manufacturing scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
