/**
 * IEC 62443 — the tabular material, split out of ./content.ts so neither
 * file passes 500 lines. Same arrangement as the sibling
 * evidence-data-provenance page.
 *
 * These are tables in the source document and they stay tables here.
 * OXOT_Composition_Rules.md asks assurance pages for "diagrams, tables,
 * requirements traces", so a seven-row concept mapping is not improved by
 * being redrawn as seven cards — it is made harder to compare across.
 *
 * Every row is transcribed from new_material_source/1_website_layout_v4/
 * 4_assurance/assurance_IEC62443.md. `same()` marks NL as an untranslated
 * placeholder; see registry.ts.
 */
import { same } from "@/components/industries/registry";

/**
 * Column headings and captions, kept beside the rows they head rather than
 * in the shared dictionary — a header in en.ts and its rows here is exactly
 * the split that ends with a column captioned as the wrong thing.
 *
 * Every table gets a caption. Seven tables in one document is a lot to hold
 * in mind, and a caption is what lets a reader who jumped in from the
 * contents rail know what they are looking at.
 */
export const LABELS = {
  requirements: {
    caption: same("The eight-step trace, and the question OXOT helps answer at each step."),
    step: same("Step"),
    focus: same("IEC 62443 focus"),
    question: same("Question OXOT helps answer")
  },
  zoneModels: {
    caption: same("Each IEC 62443 concept, and the modelling capability that carries it."),
    concept: same("IEC 62443 concept"),
    capability: same("OXOT capability")
  },
  riskEvidence: {
    caption: same("Eleven evidence classes, and what each contributes to the risk picture."),
    source: same("Evidence source"),
    contribution: same("What it contributes")
  },
  sltObjectives: {
    caption: same("Each foundational requirement, and the model evidence that can inform the discussion."),
    objective: same("Security objective"),
    evidence: same("OXOT evidence that can support discussion")
  },
  treatment: {
    caption: same("Eight recurring decisions, and what the Twin is used to test in each."),
    decision: same("Candidate decision"),
    questions: same("Questions the Twin helps test")
  },
  outputs: {
    caption: same("Thirteen outputs, and the work each one normally feeds."),
    output: same("Output"),
    use: same("Typical use")
  },
  roles: {
    caption: same("Nine accountable parties, what each needs, and what the model gives them."),
    role: same("Role"),
    needs: same("What they need"),
    provides: same("What OXOT provides")
  }
} as const;

/** §2 — the eight-step requirements trace, the page's spine as a table. */
export const REQUIREMENT_ROWS = [
  {
    step: same("1. Define the system"),
    focus: same("Define the system under consideration"),
    question: same("What facility, line, site, control environment, or operational service is actually in scope?")
  },
  {
    step: same("2. Identify assets and functions"),
    focus: same("Understand the IACS environment and its components"),
    question: same("What devices, applications, controllers, networks, safety functions, and operators support that system?")
  },
  {
    step: same("3. Partition the system"),
    focus: same("Group assets into zones and define conduits"),
    question: same("Which assets share security characteristics, and how are zones allowed to communicate?")
  },
  {
    step: same("4. Assess risk"),
    focus: same("Evaluate threats, vulnerabilities, likelihood, and consequence"),
    question: same("What can be reached, what could happen, and which risks are not tolerable?")
  },
  {
    step: same("5. Establish SL-T"),
    focus: same("Define target security levels for zones and conduits"),
    question: same("What protection capability is required for each relevant security objective?")
  },
  {
    step: same("6. Specify requirements"),
    focus: same("Define controls and security requirements"),
    question: same("Which technical, procedural, and architectural controls reduce risk to an acceptable level?")
  },
  {
    step: same("7. Implement and validate"),
    focus: same("Design, build, operate, and change securely"),
    question: same("Does the control close the intended pathway without compromising safe or reliable operation?")
  },
  {
    step: same("8. Maintain evidence"),
    focus: same("Keep records current across the lifecycle"),
    question: same("What changed, what evidence supports the current state, and when should it be reviewed?")
  }
] as const;

/** §5 — IEC 62443 concept mapped to the modelling capability that carries it. */
export const ZONE_MODEL_ROWS = [
  {
    concept: same("Zones"),
    capability: same("Logical and physical groupings of assets, systems, operational functions, or shared security requirements")
  },
  {
    concept: same("Conduits"),
    capability: same(
      "Communication paths, services, protocols, firewall rules, routing, access controls, and trust boundaries between zones"
    )
  },
  {
    concept: same("Purdue context"),
    capability: same(
      "Level 0–4 operational context, including field devices, control, supervisory, operations management, enterprise, and DMZ boundaries"
    )
  },
  {
    concept: same("Segmentation"),
    capability: same("VLANs, subnets, virtual firewall controls, zones, remote-access boundaries, and logical separation")
  },
  {
    concept: same("Allowed flows"),
    capability: same(
      "Required OT/IT communications, management traffic, historian data, engineering access, vendor support, and protocol-specific pathways"
    )
  },
  {
    concept: same("Actual reachability"),
    capability: same("A traceable route from entry point through network and system dependencies to a target asset or function")
  },
  {
    concept: same("Control simulation"),
    capability: same(
      "A virtual firewall, segmentation boundary, routing change, vendor-access control, or patching decision inserted into the model"
    )
  }
] as const;

/** §6 — evidence classes and what each contributes to the risk picture. */
export const RISK_EVIDENCE_ROWS = [
  { source: same("FMECA"), contribution: same("Failure modes, effects, and criticality at equipment or component level") },
  { source: same("Hazard log / HAZOP evidence"), contribution: same("Hazards, barriers, and relevant worst-case process outcomes") },
  {
    source: same("SCIL / SIL context"),
    contribution: same("Safety-instrumented functions, controllers, sensors, valves, and protective functions")
  },
  {
    source: same("Reliability-critical item list"),
    contribution: same("Assets whose loss affects reliability, product quality, availability, or long-term equipment health")
  },
  {
    source: same("Minimum operating requirements"),
    contribution: same("The conditions that must be maintained to continue operations safely")
  },
  {
    source: same("Downtime and capacity curves"),
    contribution: same("Operational, service, production, capacity, or financial implications of disruption")
  },
  {
    source: same("P&IDs and process diagrams"),
    contribution: same("Equipment, process flows, interlocks, instrumentation, control relationships, and physical dependencies")
  },
  {
    source: same("Network topology and traffic evidence"),
    contribution: same("Reachability, zones, conduits, communication patterns, remote access, and boundary enforcement")
  },
  {
    source: same("PLC / DCS / SCADA / HMI data"),
    contribution: same("Configuration, control logic, tag relationships, controllers, engineering tools, and supervisory paths")
  },
  {
    source: same("Supplier and BOM data"),
    contribution: same("Vendor, hardware, firmware, certificates, remote-maintenance, support, cloud, and software dependencies")
  },
  {
    source: same("Threat and vulnerability information"),
    contribution: same("Known exploitation, exploit likelihood, severity, attack patterns, sector targeting, and actor capability")
  }
] as const;

/**
 * §7 — the seven foundational requirements again, this time as evidence.
 * `abbr` ties each row back to its element in the vector diagram above it,
 * so the reader can carry a position from the drawing into the table.
 */
export const SLT_OBJECTIVE_ROWS = [
  {
    abbr: "IAC",
    objective: same("Identification and authentication"),
    evidence: same("User, role, vendor-access, certificate, account, remote-maintenance, and identity dependencies")
  },
  {
    abbr: "UC",
    objective: same("Use control"),
    evidence: same("Privilege boundaries, engineering access, remote sessions, command pathways, and approval workflows")
  },
  {
    abbr: "SI",
    objective: same("System integrity"),
    evidence: same("Firmware, configuration, logic, update paths, engineering tools, backups, and change dependencies")
  },
  {
    abbr: "DC",
    objective: same("Data confidentiality"),
    evidence: same("Sensitive data flows, protocol paths, cloud and API dependencies, and access boundaries")
  },
  {
    abbr: "RDF",
    objective: same("Restricted data flow"),
    evidence: same("Zones, conduits, VLANs, subnets, routing, firewall policies, protocol flows, and actual reachability")
  },
  {
    abbr: "TRE",
    objective: same("Timely response to events"),
    evidence: same("Alarm, historian, monitoring, logging, incident-response, time-service, and operator-notification dependencies")
  },
  {
    abbr: "RA",
    objective: same("Resource availability"),
    evidence: same(
      "Redundancy, dependencies, power, cooling and service constraints, shared control paths, recovery procedures, and failure cascades"
    )
  }
] as const;

/** §8 — recurring treatment decisions and what the Twin is used to test. */
export const TREATMENT_ROWS = [
  {
    decision: same("Segmentation and zones"),
    questions: same("Which routes are closed? Which required OT protocols and operating flows remain?")
  },
  {
    decision: same("Firewall and conduit rules"),
    questions: same("Does the rule stop a cyber path without interrupting control, historian, alarm, vendor, or safety-support traffic?")
  },
  {
    decision: same("Remote-access redesign"),
    questions: same("Can persistent vendor access be replaced by brokered, time-limited, approved, and recorded access?")
  },
  {
    decision: same("Patching"),
    questions: same("Does the patch reduce exposure? What compatibility, outage, rollback, and residual-path issues remain?")
  },
  {
    decision: same("Legacy asset isolation"),
    questions: same("Can a difficult-to-patch controller be isolated or protected with compensating controls until replacement?")
  },
  {
    decision: same("Product or supplier selection"),
    questions: same("Which option changes reachable pathways, lifecycle risk, support dependencies, and consequence most effectively?")
  },
  {
    decision: same("Monitoring and response controls"),
    questions: same("Does the monitoring path provide timely detection and response without becoming a new management or access route?")
  },
  {
    decision: same("Architecture modernization"),
    questions: same("Which migration sequence reduces risk without producing an unacceptable operational or project-risk spike?")
  }
] as const;

/** §9 — what an engagement produces, and the work each output feeds. */
export const OUTPUT_ROWS = [
  {
    output: same("System-under-consideration definition"),
    use: same("Scope approval, system design, program planning, audit preparation")
  },
  { output: same("Asset and functional model"), use: same("Engineering review, asset governance, control-system lifecycle work") },
  { output: same("Zone and conduit model"), use: same("Architecture review, segmentation design, security-level discussion") },
  { output: same("Network and pathway view"), use: same("Firewall design, remote-access assessment, attack-path and boundary analysis") },
  { output: same("Risk scenario"), use: same("Engineering and security workshops, management review, threat and risk assessment") },
  { output: same("Consequence chain"), use: same("Safety, reliability, operations, investment, and risk-treatment rationale") },
  {
    output: same("Security-level support view"),
    use: same("SL-T discussion with asset owner, integrator, and responsible engineering or assurance parties")
  },
  {
    output: same("Control-treatment record"),
    use: same("Why a control was selected, what it changes, residual risk, approval, and review trigger")
  },
  {
    output: same("BOM and supplier dependency view"),
    use: same("Product lifecycle, supplier risk, vulnerability management, procurement decisions")
  },
  {
    output: same("Change simulation report"),
    use: same("Evidence for a proposed segmentation, firewall, patch, vendor-access, or modernization change")
  },
  {
    output: same("Risk acceptance record"),
    use: same("Documented exception, compensating controls, accountable owner, expiry or review condition")
  },
  {
    output: same("Change and risk delta"),
    use: same("Evidence that tracks altered assets, routes, configuration, supplier posture, or threat conditions")
  },
  {
    output: same("Technical documentation view"),
    use: same("Framework-aligned technical evidence that supports, but does not replace, the required assurance process")
  }
] as const;

/** §10 — the accountable parties, what each needs, what the model gives. */
export const ROLE_ROWS = [
  {
    role: same("Asset owner"),
    needs: same("A security program, risk ownership, evidence, and decision accountability"),
    provides: same("System scope, priorities, treatment rationale, exception records, governance views")
  },
  {
    role: same("OT / controls engineer"),
    needs: same("A safe design that preserves required process and control behavior"),
    provides: same("P&ID and control context, required flows, change simulation, operational constraints")
  },
  {
    role: same("Network / security architect"),
    needs: same("Defensible zones, conduits, remote access, and segmentation"),
    provides: same("Topology, reachability, firewall and route simulation, residual-path analysis")
  },
  {
    role: same("Safety / reliability lead"),
    needs: same("Evidence that cyber changes do not ignore protective functions or operational consequence"),
    provides: same("FMECA, SCIL/SIL, hazard, reliability, minimum-operating and cascade context")
  },
  {
    role: same("System integrator"),
    needs: same("A structured basis for secure system design, implementation, and handover"),
    provides: same("System boundary, security requirements, architecture and evidence outputs, change traceability")
  },
  {
    role: same("Product supplier"),
    needs: same("Context for components, software, firmware, certificates, interfaces, and lifecycle dependency"),
    provides: same("BOMs, interface and dependency model, vulnerability and update context")
  },
  {
    role: same("Procurement"),
    needs: same("Comparable risk and lifecycle consequences of suppliers, support arrangements, and investment options"),
    provides: same("Supplier dependencies, lifecycle and BOM context, modeled control value")
  },
  {
    role: same("Assurance / audit team"),
    needs: same("Traceability from claim to evidence"),
    provides: same("Drill-down evidence, source references, change history, assumptions, decision records")
  },
  {
    role: same("Leadership"),
    needs: same("A clear view of what matters and why investment is justified"),
    provides: same("Consequence-led priorities, control options, investment comparisons, trends")
  }
] as const;
