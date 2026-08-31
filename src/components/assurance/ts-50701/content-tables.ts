/**
 * TS 50701 — the reference tables, split out of content.ts so neither file
 * approaches the 500-line ceiling. Same source and same bilingual convention;
 * see content.ts's header. Callers: the section components in this directory.
 *
 * `pair()` and the per-table row types keep a row to a line or two without
 * losing the column names — a table row here is data, and reading it should
 * not require counting positions in a tuple.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

export interface Pair {
  k: Bilingual;
  v: Bilingual;
}

function pair(k: string, v: string): Pair {
  return { k: same(k), v: same(v) };
}

/** LIFECYCLE — what each lifecycle concern asks of a railway. */
export const LIFECYCLE_ROWS: readonly Pair[] = [
  pair(
    "System definition",
    "What is in scope: a signaling zone, CBTC environment, interlocking, traction-power system, PTC territory, depot, OCC, or rolling-stock maintenance system?"
  ),
  pair("Operating context", "How is the railway expected to operate in normal, degraded, emergency, and recovery modes?"),
  pair(
    "Interfaces",
    "Which systems exchange movement, signaling, control, telemetry, passenger, dispatch, maintenance, or vendor-support data?"
  ),
  pair(
    "Cyber risk",
    "What actors, pathways, vulnerabilities, configuration weaknesses, supplier dependencies, or remote-support routes are relevant?"
  ),
  pair(
    "Safety relationship",
    "Could a cyber event affect a safety function, safety-related system, hazard barrier, route availability, emergency response, or safe degraded state?"
  ),
  pair(
    "Service consequence",
    "What happens to headway, capacity, route availability, terminal throughput, passenger flow, freight movement, or recovery time?"
  ),
  pair("Security treatment", "Which security control reduces the pathway without undermining required railway functions?"),
  pair(
    "Assurance evidence",
    "Can the decision be traced to assets, system interfaces, railway operating assumptions, safety/RAMS evidence, test results, and accountable approvals?"
  )
];

export interface ScenarioRow {
  scenario: Bilingual;
  pathway: Bilingual;
  consequence: Bilingual;
}

function scenario(s: string, p: string, c: string): ScenarioRow {
  return { scenario: same(s), pathway: same(p), consequence: same(c) };
}

export const SCENARIOS_PASSENGER: readonly ScenarioRow[] = [
  scenario(
    "Vendor access to signaling engineering tools",
    "Compromised vendor credential or remote-support gateway reaches a signaling engineering workstation",
    "Configuration integrity concern; delayed fault diagnosis; degraded train control; service restriction or recovery delay"
  ),
  scenario(
    "CBTC communications disruption",
    "Wireless train-ground communication, zone controller, or supporting system is unavailable or manipulated",
    "Degraded mode, reduced headway, line suspension, passenger crowding, and longer service recovery"
  ),
  scenario(
    "Interlocking environment exposure",
    "Maintenance route or engineering system reaches interlocking configuration or route-control pathway",
    "Safe-stop or route restriction; junction and terminal capacity loss; field intervention requirement"
  ),
  scenario(
    "Traction-power SCADA disruption",
    "Path reaches a substation RTU, PLC, SCADA interface, remote-control gateway, or management system",
    "Loss of traction power to a section; stranded trains; station and tunnel operational impact; recovery burden"
  ),
  scenario(
    "Station / tunnel OT cascade",
    "Ransomware or network event affects station control, PA, CCTV, ventilation, fire/life safety integration, or passenger information",
    "Station closure, impaired incident response, passenger-flow risk, and more difficult evacuation or recovery"
  ),
  scenario(
    "Depot maintenance-path exposure",
    "Maintenance laptop or vendor-support system reaches rolling-stock diagnostic, configuration, or depot-control environment",
    "Reduced fleet availability, delayed release to service, configuration integrity issue, or maintenance backlog"
  )
];

export const SCENARIOS_FREIGHT: readonly ScenarioRow[] = [
  scenario(
    "PTC support or wayside exposure",
    "A maintenance route reaches a PTC-related wayside component, signal-house equipment, communications asset, or support environment",
    "PTC availability degradation, movement restrictions, dispatch burden, territory congestion, and field recovery activity"
  ),
  scenario(
    "Dispatch / CAD dependency disruption",
    "Compromise affects traffic management, CAD, identity, communications, or related operational support",
    "Reduced ability to manage train movement, manual workload increase, delayed routing, congestion, and recovery complexity"
  ),
  scenario(
    "Signal / interlocking access pathway",
    "Remote or engineering path reaches an interlocking, signal-house network, configuration tool, or wayside controller",
    "Route restrictions, safe-stop behavior, lower line capacity, and potential high-priority field intervention"
  ),
  scenario(
    "Grade-crossing system disruption",
    "Path affects a crossing controller, field modem, telemetry, monitoring platform, or maintenance interface",
    "Public-safety concern, road and rail disruption, failed status visibility, and repair dispatch requirement"
  ),
  scenario(
    "Locomotive maintenance compromise",
    "Vendor tool, maintenance laptop, workshop network, wireless/cellular interface, or diagnostic system reaches locomotive systems",
    "Locomotive unavailability, maintenance delay, configuration integrity issue, fleet-wide supplier concern"
  ),
  scenario(
    "Yard or terminal OT disruption",
    "Attack affects yard automation, fueling, shop systems, car-inspection equipment, crane/transload controls, or terminal access systems",
    "Congestion, dwell increase, hazardous-material handling constraints, customer delay, and network fluidity impact"
  )
];

/** SCOPE — what a "system under consideration" can be, by railway role. */
export const SCOPE_BOUNDARIES: readonly Pair[] = [
  pair(
    "Passenger transit",
    "One CBTC line, signaling zone, OCC interface, depot, station group, tunnel environment, or traction-power SCADA system"
  ),
  pair(
    "Mainline passenger rail",
    "ETCS/ERTMS segment, interlocking corridor, rail telecoms environment, route-control system, or maintenance-support system"
  ),
  pair(
    "Freight rail",
    "PTC territory, back-office dependency, CTC/interlocking environment, wayside field network, grade-crossing estate, locomotive-maintenance domain, or yard"
  ),
  pair(
    "Infrastructure manager",
    "Route section, interlocking portfolio, signaling operations environment, control center, traction-power network, or communications layer"
  ),
  pair(
    "Depot and maintenance",
    "Rolling-stock maintenance network, diagnostic tools, software-loading process, depot SCADA, wheel lathe, wash plant, fueling, or workshop controls"
  ),
  pair(
    "Station and tunnel",
    "Platform systems, tunnel ventilation, traction-power interface, CCTV, public address, passenger information, fire/life safety, and station OT"
  ),
  pair(
    "Supplier / integrator",
    "Signaling product, CBTC subsystem, interlocking, onboard system, wayside controller, remote-maintenance platform, or deployment interface"
  )
];

export const SCOPE_OUTPUTS: readonly Pair[] = [
  pair(
    "Operational boundary",
    "Defined route, line, signaling zone, control center, depot, corridor, territory, or railway application"
  ),
  pair(
    "Asset population",
    "Interlockings, wayside controllers, zone controllers, radios, RTUs, PLCs, HMIs, SCADA, engineering tools, servers, switches, field devices, and onboard or maintenance systems"
  ),
  pair(
    "Functional context",
    "Train movement, route setting, train separation, detection, dispatch, traction power, maintenance, passenger service, freight flow, and recovery dependencies"
  ),
  pair(
    "Interface definition",
    "Train-to-ground, control-center-to-field, signaling-to-telecoms, OT-to-IT, vendor-access, remote-maintenance, and supplier or service boundaries"
  ),
  pair(
    "Safety and RAMS context",
    "Hazard log, safety functions, degraded operating mode, availability and reliability assumptions, restoration sequence, and minimum operational requirements"
  ),
  pair(
    "Evidence links",
    "Architecture diagrams, interlocking and signal data, configuration exports, asset records, system descriptions, operating rules, test records, and approved assumptions"
  )
];

/** SAFETY — the railway evidence a consequence chain is anchored in. */
export const SAFETY_EVIDENCE: readonly Pair[] = [
  pair("Hazard log", "Relevant hazards, barriers, mitigation assumptions, and safety-related consequences"),
  pair(
    "EN 50126 / IEC 62278 RAMS evidence",
    "Reliability, availability, maintainability, safety lifecycle context, operational assumptions, and performance constraints"
  ),
  pair(
    "Interlocking and signaling design",
    "Functional relationships, route setting, train detection, signal aspects, field devices, and configuration dependencies"
  ),
  pair(
    "CBTC / ETCS / PTC architecture",
    "Train-control functions, communications, onboard, wayside and control-center boundaries, fallback modes, and service constraints"
  ),
  pair(
    "Traction-power and SCADA diagrams",
    "Electrical-control dependencies, remote operation, safety boundaries, and recovery requirements"
  ),
  pair(
    "Operating rules and degraded-mode procedures",
    "Safe fallback actions, movement restrictions, operator decision authority, staffing requirements, and restoration sequence"
  ),
  pair(
    "Timetable, headway, and capacity data",
    "Passenger or freight service impact of degraded operation, line closure, route restriction, or reduced system availability"
  ),
  pair(
    "Maintenance and field-recovery procedures",
    "Diagnostic dependencies, vendor role, site access, spare parts, test equipment, and restoration constraints"
  )
];

/** TREATMENT — the decisions a railway actually argues about. */
export const TREATMENT_DECISIONS: readonly Pair[] = [
  pair(
    "Vendor-access redesign",
    "Whether persistent broad access can become approved, named, MFA-protected, time-limited, recorded, asset-specific access"
  ),
  pair(
    "Signaling segmentation",
    "Which routes from enterprise, maintenance, vendor, depot, telecoms, or control-center systems can be closed without impairing required operations"
  ),
  pair(
    "Interlocking / CBTC engineering boundary",
    "Separation of configuration tooling, engineering workstations, production systems, vendor systems, and update paths"
  ),
  pair(
    "PTC and dispatch dependency hardening",
    "Which supporting services, field networks, certificates, communications, and recovery systems create shared availability risk"
  ),
  pair(
    "Patch campaign",
    "Compatibility, rollback, service-window, safety-assurance, vendor-support, and residual-path considerations"
  ),
  pair(
    "Legacy asset isolation",
    "Which difficult-to-patch wayside, depot, onboard, or station system can be isolated, monitored, or protected until planned renewal"
  ),
  pair(
    "Monitoring and detection",
    "How monitoring, historian, SOC, logging, alarm, and time-service dependencies improve response without adding excessive management exposure"
  ),
  pair(
    "Supplier and procurement selection",
    "Which product, support model, protocol, firmware, lifecycle commitment, and supplier dependency gives the strongest risk reduction"
  ),
  pair(
    "Change and possession planning",
    "Which control requires a planned possession, validation, field test, safety review, or staged rollout before operational implementation"
  )
];

export interface ControlRow {
  treatment: Bilingual;
  tests: Bilingual;
  insight: Bilingual;
}

function control(t: string, w: string, i: string): ControlRow {
  return { treatment: same(t), tests: same(w), insight: same(i) };
}

export const WORKED_CONTROLS: readonly ControlRow[] = [
  control(
    "Remove remote access completely",
    "Loss of vendor-assisted diagnosis, recovery, and maintenance support",
    "Lower cyber exposure but possibly unacceptable restoration delay"
  ),
  control(
    "Broker access through a controlled gateway",
    "Named user, MFA, approval, time-limited session, recording, asset-specific permissions, session expiry",
    "Preserves expert support while removing persistent broad access"
  ),
  control(
    "Re-zone the engineering environment",
    "Virtual firewall and conduit rules between vendor tools, engineering workstations, control center, and signaling systems",
    "Identifies required diagnostic and control flows, and routes that can be closed"
  ),
  control(
    "Separate configuration from monitoring",
    "Distinct boundaries for engineering changes, operational monitoring, logging, and vendor support",
    "Reduces high-consequence access paths and improves accountability"
  ),
  control(
    "Stage the program",
    "Immediate access controls; deeper segmentation during planned possession with validation",
    "Balances near-term risk reduction with railway safety and service constraints"
  )
];

/** OUTPUTS — the security-engineering work products the model can support. */
export const OUTPUT_ROWS: readonly Pair[] = [
  pair(
    "Railway system-under-consideration definition",
    "Scope approval, assurance planning, supplier and system boundary review"
  ),
  pair(
    "Asset and functional model",
    "Signaling, CBTC, ETCS, PTC, OCC, depot, traction-power, wayside, and station system review"
  ),
  pair(
    "Communications and dependency map",
    "Train-ground, field-control, vendor, telecoms, control-center, and remote-maintenance analysis"
  ),
  pair("Zone and conduit view", "Segmentation design, remote-access assessment, security architecture review"),
  pair("Cyber-risk scenario", "Safety and security workshops, threat assessment, risk-evaluation evidence"),
  pair(
    "Safety-linked consequence chain",
    "Connects a cyber pathway to degraded mode, safety function, service impact, and recovery requirement"
  ),
  pair(
    "Candidate-control simulation",
    "Tests segmentation, firewall, patch, remote access, update, supplier, or operational-procedure changes"
  ),
  pair(
    "Risk acceptance record",
    "Documents deferred risks, compensating controls, operational rationale, owner, and review trigger"
  ),
  pair(
    "Supplier and lifecycle view",
    "Firmware, hardware, certificates, remote support, field-service, spare-part, and end-of-life dependencies"
  ),
  pair(
    "Change and risk delta",
    "Shows how a new version, route, configuration, supplier, or operational change alters exposure"
  ),
  pair(
    "Assurance evidence package",
    "Source-linked architecture, decision, test, risk, and lifecycle documentation for review and acceptance processes"
  )
];

/** PROVENANCE — the data discipline the evidence rests on. */
export const PROVENANCE_PRINCIPLES: readonly Pair[] = [
  pair(
    "Grounding first",
    "System descriptions, architecture, signaling data, asset records, configuration evidence, RAMS and hazard records, operating procedures, and network evidence come before model conclusions"
  ),
  pair(
    "No fabrication",
    "An unknown asset relationship, control function, supplier dependency, recovery assumption, or safety effect is not invented"
  ),
  pair(
    "Null over zero",
    "Missing evidence remains visible as a gap requiring investigation; it is not treated as “no risk”"
  ),
  pair(
    "Citations retained",
    "Vulnerability, threat, supplier, standard, operational, and external-reference inputs retain their source context"
  ),
  pair(
    "Drillable reasoning",
    "Teams can move from a management decision to route, zone, asset, function, safety and service consequence, source artifact, and assumption"
  ),
  pair(
    "Change-aware evidence",
    "New firmware, a changed signaling configuration, a remote-access exception, a network route, a vendor tool, a supplier, or an operating procedure produces a visible delta"
  ),
  pair(
    "Safety and security distinction",
    "The Twin links cyber pathways to safety and operational context, but does not replace responsible safety assessment, safety-case ownership, or independent safety assurance"
  ),
  pair(
    "Accountable decision records",
    "Risk treatment, acceptance, compensating controls, owner, approval, review condition, and sunset date can be retained with the model"
  )
];
