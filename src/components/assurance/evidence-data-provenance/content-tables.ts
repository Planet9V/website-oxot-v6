/**
 * EVIDENCE & DATA PROVENANCE — the seven tables, split out of ./content.ts
 * purely for file size: fifty-odd rows of three-column data alongside the
 * narrative copy would put a single content file well past 500 lines.
 * Same transcription source, same `same()` / `Bilingual` convention, same
 * both-locales-render rule. See content.ts's doc comment.
 *
 * Composition rule this serves: OXOT_Composition_Rules.md, "Assurance
 * pages — editorial/technical reading experience. Diagrams, tables,
 * requirements traces." These are meant to be read as reference tables,
 * not summarized into cards.
 */
import { same } from "@/components/industries/registry";

/** Evidence principles — the rules that keep the model honest. */
export const PRINCIPLE_ROWS = [
  { principle: same("Grounding first"), meaning: same("Retrieve real customer engineering, operational, safety, product, supplier, asset, network, and configuration evidence before synthesizing conclusions.") },
  { principle: same("No fabrication"), meaning: same("Do not create an asset relationship, safety assumption, vulnerability impact, financial input, supplier fact, or control claim that cannot be supported.") },
  { principle: same("Null over zero"), meaning: same("Unknown or unsourced information stays visibly empty; it is not silently treated as zero risk, no dependency, or not applicable.") },
  { principle: same("Citations retained"), meaning: same("External threat, vulnerability, supplier, financial, regulatory, standards, geopolitical, and contextual data retains its source reference.") },
  { principle: same("Version-aware"), meaning: same("Evidence is tied to the relevant asset configuration, product release, firmware, document revision, system state, or lifecycle stage.") },
  { principle: same("Drillable reasoning"), meaning: same("Users can move from summary output to system, function, zone, component, interface, hazard, supplier, requirement, source, and assumption.") },
  { principle: same("Change-aware"), meaning: same("A changed device, route, component, firmware, certificate, supplier, procedure, risk treatment, or operating condition creates a visible delta.") },
  { principle: same("Fact, assumption, calculation separated"), meaning: same("Customer facts, sourced external data, approved assumptions, and OXOT-generated calculations remain distinguishable.") },
  { principle: same("Decision ownership retained"), meaning: same("Each treatment, acceptance, exception, or assurance statement can carry accountable owner, approver, date, review trigger, and expiry condition.") },
  { principle: same("Human review stays visible"), meaning: same("The model supports expert judgment; it does not hide incomplete evidence or replace accountable engineering, safety, product, legal, or operational approval.") }
] as const;

/** Evidence sources — domain, typical artifacts, what each supports. */
export const SOURCE_ROWS = [
  {
    domain: same("Engineering and process"),
    artifacts: same("P&IDs, process-flow diagrams, single-line diagrams, CAD, equipment lists, control narratives, calculations, operating limits"),
    supports: same("Physical functions, equipment dependencies, process consequence, facility and system boundary")
  },
  {
    domain: same("OT and control systems"),
    artifacts: same("PLC ladder logic, structured text, SCADA/HMI projects, DCS configurations, RTU exports, relay settings, controller baselines"),
    supports: same("Control functions, configuration integrity, asset relationships, safety and operational dependencies")
  },
  {
    domain: same("Networks and communications"),
    artifacts: same("Network diagrams, VLAN/subnet plans, firewall configurations, routing, topology exports, PCAP/flow evidence, remote-access records"),
    supports: same("Zones, conduits, actual reachability, communications dependencies, segmentation evidence")
  },
  {
    domain: same("Safety, RAMS, and reliability"),
    artifacts: same("FMECA, hazard log, HAZOP, SIL/SCIL evidence, RCIL, RAMS analysis, safety requirements, degraded-mode procedures"),
    supports: same("Hazard linkage, safety assumptions, reliability impact, barriers, recovery, operational consequence")
  },
  {
    domain: same("Product and lifecycle"),
    artifacts: same("Product architecture, source and release records, firmware inventory, SBOM, hardware specification, certificates, cryptography design, test reports"),
    supports: same("Product boundary, component dependency, version control, CRA-oriented documentation")
  },
  {
    domain: same("Operations and maintenance"),
    artifacts: same("SOPs, MOPs, EOPs, work orders, CMMS/EAM data, maintenance schedules, operating procedures, access approvals"),
    supports: same("Human workflow, recovery, maintainability, operational constraints, change governance")
  },
  {
    domain: same("Supplier and supply chain"),
    artifacts: same("Supplier list, contracts, support agreements, component origin, firmware and service commitments, spares, lead times, maintenance dependencies"),
    supports: same("Supplier concentration, remote support, replacement options, lifecycle and resilience analysis")
  },
  {
    domain: same("Vulnerability and threat"),
    artifacts: same("CVE, KEV, EPSS, CVSS, CWE, CAPEC, ATT&CK, vendor advisories, threat reports"),
    supports: same("Exploitability context, affected component and version, threat relevance, treatment priority")
  },
  {
    domain: same("External context"),
    artifacts: same("Geopolitical, climate, utility, logistics, financial, incident, claims, and sector sources"),
    supports: same("Site-specific likelihood, external dependency, supplier pressure, resilience and investment context")
  },
  {
    domain: same("Assurance and governance"),
    artifacts: same("Requirements, test plans, verification reports, validation records, audit findings, approvals, risk registers, safety-case artifacts"),
    supports: same("Traceability, claims, treatment evidence, compliance workflow, accountable acceptance")
  }
] as const;

/**
 * Source confidence hierarchy, highest authority first. `rank` is the row's
 * position on that hierarchy (1 = highest) and drives the rung indicator in
 * SourceConfidence.tsx — it is a position in this list, not a score.
 */
export const CONFIDENCE_ROWS = [
  { rank: 1, cls: same("Verified current configuration"), example: same("Signed controller export, approved firewall configuration, passive network evidence, released firmware manifest"), confidence: same("Highest") },
  { rank: 2, cls: same("Approved engineering record"), example: same("Issued-for-construction drawing, approved system architecture, verified P&ID, approved single-line diagram"), confidence: same("High") },
  { rank: 3, cls: same("Controlled operational record"), example: same("Approved operating procedure, maintenance record, work order, test result, commissioning record"), confidence: same("High to medium") },
  { rank: 4, cls: same("Supplier or vendor declaration"), example: same("SBOM, advisory, datasheet, support notice, certificate statement"), confidence: same("Medium — validate against product and version context") },
  { rank: 5, cls: same("Historical or legacy documentation"), example: same("Old network diagram, archived engineering drawing, prior assessment, outdated asset register"), confidence: same("Medium to low until reconciled") },
  { rank: 6, cls: same("External intelligence"), example: same("CVE, KEV, EPSS, threat report, geopolitical source, claims study"), confidence: same("Useful context — must retain source, date, applicability, and assumptions") },
  { rank: 7, cls: same("Assumption / estimate"), example: same("Recovery-time estimate, unavailable component relationship, estimated cost, inferred configuration"), confidence: same("Explicitly labeled — never presented as observed fact") },
  { rank: 8, cls: same("Unknown / missing"), example: same("No source available, or source cannot be validated"), confidence: same("Stored as null — creates an evidence gap rather than false confidence") }
] as const;

/** Evidence types — the separation that stops derived statements reading as facts. */
export const TYPE_ROWS = [
  { type: same("Observed fact"), meaning: same("Directly evidenced customer or system information"), example: same("A firewall rule, asset configuration, approved drawing, controller export") },
  { type: same("External fact"), meaning: same("Cited information from a trusted, public, or approved source"), example: same("CVE record, vendor advisory, standards text, threat report") },
  { type: same("Assumption"), meaning: same("Necessary but unverified input"), example: same("Estimated recovery duration, presumed protocol route, provisional supplier dependency") },
  { type: same("Derived relationship"), meaning: same("Connection inferred or calculated from modelled evidence"), example: same("Device depends on a network route; component belongs to a product version") },
  { type: same("Model calculation"), meaning: same("Transparent OXOT output based on inputs and methods"), example: same("Consequence Index, pathway score, simulation output, loss range") },
  { type: same("Control decision"), meaning: same("Accountable action selected by the responsible organization"), example: same("Segment route, patch system, replace supplier, accept risk with controls") },
  { type: same("Evidence claim"), meaning: same("Statement supported by linked artifacts and approval"), example: same("Only approved users may reach the engineering function") }
] as const;

/** Change triggers and the evidence each one puts back in question. */
export const CHANGE_ROWS = [
  { change: same("New PLC, controller, relay, RTU, HMI, server, or network device"), evidence: same("Asset inventory, topology, zone and conduit model, configuration baseline, risk scenario") },
  { change: same("New or changed firewall rule"), evidence: same("Communications path, reachability, segmentation evidence, control validation") },
  { change: same("Firmware or software release"), evidence: same("SBOM, vulnerability status, test evidence, product and version record, change impact") },
  { change: same("Certificate renewal or cryptographic change"), evidence: same("CBOM, trust boundary, update mechanism, access control, expiry monitoring") },
  { change: same("Vendor remote-access change"), evidence: same("Network paths, identity, approval workflow, maintenance procedure, supplier risk") },
  { change: same("New cloud API or SaaS dependency"), evidence: same("SaaS-BOM, product boundary, data flow, availability and recovery dependency") },
  { change: same("Supplier change or end-of-life notice"), evidence: same("HBOM/SBOM, support dependency, spare availability, replacement plan, product and operational risk") },
  { change: same("Updated safety or operating procedure"), evidence: same("Hazard linkage, recovery model, maintenance workflow, validation evidence") },
  { change: same("New CVE, exploitation advisory, or supplier alert"), evidence: same("Affected versions and assets, reachability, treatment decision, customer or operational action") },
  { change: same("Changed external conditions"), evidence: same("Site risk, supplier risk, utility and logistics dependency, resilience scenario, investment view") }
] as const;

/**
 * One evidence foundation, five proof obligations. `slug` is the sibling
 * /assurance child this row routes to; `null` for the governance row,
 * which has no dedicated page — it is the reason this page exists at all.
 */
export const FRAMEWORK_ROWS = [
  {
    slug: "iec-62443",
    area: same("IEC 62443"),
    need: same("System scope, assets, zones and conduits, risk, target-security-level reasoning, control implementation, lifecycle evidence"),
    connects: same("Engineering data, topology, configurations, access paths, controls, operational consequence, source-linked treatment decisions")
  },
  {
    slug: "cyber-resilience-act",
    area: same("Cyber Resilience Act"),
    need: same("Product identity, architecture, interfaces, SBOM, vulnerability management, testing, technical documentation, change history"),
    connects: same("Product versions, software, firmware, hardware, crypto, cloud and operational dependencies, suppliers, advisories, mitigations, evidence artifacts")
  },
  {
    slug: "ts-50701",
    area: same("TS 50701"),
    need: same("Railway application scope, interfaces, security risk, lifecycle controls, vulnerability and change management, assurance evidence"),
    connects: same("Signaling, CBTC, ETCS, PTC, traction power, communications, vendor pathways, maintenance, operational and safety dependencies")
  },
  {
    /* Corrected 2026-08-23: this row previously read "iec-62278-1" /
       "IEC 62278-1:2025", on the earlier (wrong) claim that the sibling
       railway page's real designation was Part 1. It is Part 2 — see that
       page's own doc comment. The source doc's original "IEC 62278-2:2025"
       was right all along; restored to match the page it actually links to,
       which is exactly the citing-what-the-page-is discipline this section
       argues for. */
    slug: "iec-62278-2",
    area: same("IEC 62278-2:2025"),
    need: same("System definition, hazards, safety objectives, requirements, allocation, verification, validation, safety argument, change impact"),
    connects: same("Hazards, safety functions, cyber assumptions, barriers, requirements, controls, test evidence, approvals, operational context")
  },
  {
    slug: null,
    area: same("Governance and investment"),
    need: same("Credible risk, consequence, residual exposure, treatment priority, and decision record"),
    connects: same("Source-linked calculations, explicit assumptions, investment options, approval, review trigger, and change history")
  }
] as const;

/** Deployment options and the evidence-handling position each one takes. */
export const DEPLOYMENT_ROWS = [
  { mode: same("Island Mode"), position: same("Isolated deployment on customer-controlled infrastructure; no external dependency, no direct connection to live control systems.") },
  { mode: same("Inbound Intelligence Mode"), position: same("A one-way data diode allows approved intelligence into the Twin without customer data leaving the environment.") },
  { mode: same("Dedicated Instance"), position: same("Single-tenant deployment in a customer-approved environment aligned to sovereignty requirements.") }
] as const;
