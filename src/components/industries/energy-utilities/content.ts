/**
 * ENERGY & UTILITIES — content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_energy.md, which is finished,
 * ready-to-use copy, not an outline. Restructured into the sections this
 * page's own layout uses (see EnergyPage.tsx's section order), not a
 * verbatim reprint of the source file's own headings.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that this is correct Dutch. See
 * registry.ts's own doc comment.
 *
 * Cross-references to pages the source file assumes exist
 * (/platform/decisions/*, /platform/deployment-data-sovereignty,
 * /assurance/<regime>, /resources/technical-specification) are retargeted
 * to what's real today: /cdt-2#decide, /assurance (the current consolidated
 * page), /technical-specification, /consulting, /contact.
 */
import { same } from "../registry";

export const META = {
  title: "Energy & Utilities OT Cybersecurity Digital Twin",
  description:
    "Test OT-security changes before live operations. OXOT's Cyber Digital Twin connects physical assets, grid and plant controls, network pathways, and operational consequence for energy and utility operators."
};

export const HERO = {
  h1: same("Make energy-security decisions without compromising reliability."),
  lead: same(
    "OXOT's Cyber Digital Twin connects physical assets, OT topology, control dependencies, and threat context — so you can test changes, prioritize risk, and justify investment before touching live operations."
  ),
  ctaPrimary: same("Discuss an energy scenario"),
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  /* The four synchronized views the source brief specifies for an
     interactive hero visual — not built anywhere on this site yet (the
     only confirmed interactive component sitewide is Cdt2Services' own
     expand/collapse grid). Rendered as a static, illustrated chain instead
     of omitted. */
  chain: [
    same("Physical system"),
    same("OT / protection network"),
    same("Attack pathway"),
    same("Operational consequence")
  ]
};

export const OPERATIONAL_REALITY = {
  h2: same("In energy, a cyber change can become a reliability event."),
  body: same(
    "Energy operators manage assets that must remain safe and available through changing load, weather, market conditions, maintenance activity, and external threat pressure. Control environments are distributed, long-lived, and highly interconnected: substations, generation units, control centers, field communications, protection systems, remote operations, OEM support, market interfaces, and enterprise systems all create dependencies."
  ),
  bodyTwo: same(
    "A security control that looks straightforward in IT — an access change, firewall rule, software update, certificate rollover, segmentation redesign, or vendor connection restriction — can affect telemetry, protection coordination, dispatch, plant control, remote diagnostics, alarm visibility, or recovery procedures. The correct question is therefore not simply whether a control is “best practice,” but whether it reduces real exposure while preserving the required operating function."
  ),
  concerns: [
    { term: same("Reliability and continuity"), body: same("A loss of visibility, control, protection, dispatch capability, or communications can propagate beyond one asset or site.") },
    { term: same("Safety and environmental exposure"), body: same("Generation, gas, hydrogen, thermal, hydro, storage, and district-energy assets can involve pressure, temperature, combustion, chemical, electrical, and containment hazards.") },
    { term: same("Protection-system integrity"), body: same("Incorrect relay settings, time synchronization, communications, or engineering access can affect fault detection, isolation, and restoration.") },
    { term: same("Distributed operations"), body: same("Utilities may operate thousands of field devices, substations, renewable sites, DERs, meters, and remote communications paths.") },
    { term: same("Interdependence"), body: same("Electricity, gas, water, telecoms, transport, and data systems can depend on each other during a disruption.") },
    { term: same("High-consequence change windows"), body: same("Maintenance outages, switching windows, grid conditions, generation schedules, and seasonal demand restrict when changes can safely occur.") },
    { term: same("Remote vendor access"), body: same("OEMs and service providers often require access to turbines, inverters, protection relays, DCS, PLCs, and monitoring platforms.") },
    { term: same("Legacy and multi-vendor estates"), body: same("Assets may remain operational for decades, often with inconsistent records, unsupported components, and differing network/security designs.") },
    { term: same("External pressure"), body: same("Geopolitics, severe weather, supply-chain disruption, fuel constraints, commodity conditions, and active threat campaigns can change exposure even when the physical environment is unchanged.") }
  ]
};

export const ARCHITECTURE = {
  h2: same("See the energy system, its controls, and its dependencies in one model."),
  intro: same(
    "The same model, read as a single-line diagram of the estate rather than a network map — five segments on one line, each carrying its own controls and dependencies."
  ),
  segments: [
    same("Generation"),
    same("Transmission & Distribution"),
    same("Renewables & Storage"),
    same("Gas / Hydrogen"),
    same("District Energy")
  ],
  segmentNote: same(
    "A segment selector is not built yet — this is a static illustration of the five views the model supports, not a working switch."
  ),
  layers: [
    { name: same("Enterprise and market systems"), body: same("ERP · identity · procurement · trading · billing · analytics") },
    { name: same("Operational DMZ"), body: same("Jump hosts · data brokers · patching · remote-support gateways · SOC tooling") },
    { name: same("Control center / plant operations"), body: same("EMS · ADMS · DMS · SCADA · historians · outage management · engineering tools") },
    { name: same("Control and protection"), body: same("DCS · PLCs · RTUs · IEDs · relays · HMIs · turbine/inverter controls") },
    { name: same("Field / physical assets"), body: same("Generators · transformers · switchgear · feeders · turbines · batteries · pumps · compressors · valves · substations · meters · sensors · actuators") }
  ],
  dataSources: [
    { domain: same("Engineering and operational evidence"), examples: same("Single-line diagrams, P&IDs, protection studies, load-flow studies, FMECA, HAZOP/hazard registers, criticality ratings, outage and restoration procedures") },
    { domain: same("Control and automation"), examples: same("SCADA configurations, EMS/DMS/ADMS data, DCS/PLC logic, RTU and IED configurations, relay settings, HMI projects, alarm and event records") },
    { domain: same("OT network and communications"), examples: same("Network diagrams, substation LAN/WAN paths, firewalls, VLANs, remote-access paths, serial/Ethernet gateways, topology exports, passive traffic data") },
    { domain: same("Field and asset information"), examples: same("Asset inventories, firmware and configuration versions, maintenance records, work orders, lifecycle data, spares and supplier dependencies") },
    { domain: same("Business and market dependency"), examples: same("Dispatch and balancing processes, market interfaces, vendor contracts, critical-service dependencies, outage-cost and restoration assumptions") }
  ],
  protocols: ["IEC 61850", "DNP3", "IEC 60870-5-101/104", "Modbus", "OPC UA", "ICCP/TASE.2", "MQTT", "PROFINET", "EtherNet/IP", "TCP/IP"]
};

export const SCENARIOS = {
  h2: same("Model the route, the system effect, and the decision."),
  intro: same(
    "Each scenario opens into the same illustrated chain: entry point → reachable OT asset → control or protection effect → physical or operational consequence → financial or service impact → control options."
  ),
  items: [
    { title: same("Vendor access to a plant or substation"), pathway: same("Compromised OEM session reaches engineering workstation, relay, PLC, RTU, turbine controller, or DCS segment."), consequence: same("Unauthorized configuration, loss of availability, altered setpoints, delayed recovery, or impaired protection/control."), decision: same("Test brokered access, MFA, jump host, segmentation, and session restrictions.") },
    { title: same("Ransomware crossing IT/OT boundaries"), pathway: same("Compromise affects identity, historian, HMI, engineering workstations, dispatch support, or operational DMZ services."), consequence: same("Loss of view/control, manual operation, reduced dispatch ability, degraded restoration, controlled shutdown."), decision: same("Identify critical dependencies and sequence recovery/segmentation controls.") },
    { title: same("Protection or relay-setting exposure"), pathway: same("An engineering pathway reaches IED/relay configuration or supporting timing/communications infrastructure."), consequence: same("Incorrect protection behavior, unwanted trip, failure to trip, reduced fault isolation, or restoration delay."), decision: same("Map dependencies and test access/control boundaries before change.") },
    { title: same("Substation or field-device compromise"), pathway: same("Remote communications route reaches RTUs, IEDs, gateways, or field automation."), consequence: same("Loss/manipulation of telemetry, remote switching risk, outage escalation, or safety exposure for field crews."), decision: same("Prioritize based on operational criticality and reachable paths.") },
    { title: same("Generation-control manipulation"), pathway: same("Compromise reaches turbine, boiler, inverter, governor, compressor, battery, or balance-of-plant controls."), consequence: same("Trip, output reduction, equipment stress, safety action, emissions/quality issue, or grid-support loss."), decision: same("Compare segmentation, hardening, patching, and replacement options.") },
    { title: same("Renewable / DER aggregation exposure"), pathway: same("Cloud/API, aggregator, inverter fleet-management, or remote O&M route is compromised."), consequence: same("Coordinated loss of generation, voltage/frequency support implications, loss of fleet visibility."), decision: same("Assess concentration, communications, supplier, and geographic dependency.") },
    { title: same("Supply-chain compromise"), pathway: same("Vulnerable product, software update channel, OEM maintenance tool, cloud service, or replacement component creates inherited exposure."), consequence: same("Fleet-scale impact, delayed maintenance, unavailable support, or a common-mode control failure."), decision: same("Compare vendors and procure controls against modeled system consequence.") },
    { title: same("External pressure and physical disruption"), pathway: same("Threat activity, conflict, weather, wildfire, flood, fuel disruption, or telecom failure affects a site or region."), consequence: same("Increased likelihood of outage, constrained restoration, or compounded interdependency."), decision: same("Recalculate exposure based on site-specific external context.") }
  ]
};

export const DECISIONS = {
  h2: same("Four decisions that preserve reliability while reducing cyber risk."),
  items: [
    { name: same("What do we fix first?"), question: same("Which exposure can disrupt generation, grid operations, field control, safety, or restoration — and is actually reachable?"), provides: same("A NOW / NEXT / NEVER priority queue grounded in asset criticality, pathways, and operational consequence.") },
    { name: same("What should we spend?"), question: same("Do we fund secure vendor access, segmentation, relay modernization, a new monitoring platform, spares, or a replacement program?"), provides: same("Comparable investment cases, modeled reduction, sequencing, and a point of diminishing returns.") },
    { name: same("Can we change safely?"), question: same("Can we alter this firewall, remote-access route, protection environment, firmware baseline, or communications path without impairing control or restoration?"), provides: same("A virtual change test showing required flows, routes closed, residual exposure, and potential operational impacts.") },
    { name: same("What can we leave alone?"), question: same("Which legacy issue is isolated, low consequence, or can wait until the next outage — with documented conditions?"), provides: same("A formal risk-acceptance record tied to actual reachability, consequence, assumptions, owner, and review trigger.") }
  ]
};

export const WORKED_EXAMPLE = {
  h2: same("Worked example: redesign remote vendor access to a generation unit without disrupting operations."),
  tag: same("Illustrative scenario — no customer data"),
  scenario: same(
    "A combined-cycle, thermal, hydro, or large renewable-generation site uses OEM remote support for a critical controller environment. The vendor route supports diagnostics and maintenance, but its connection has accumulated exceptions over time. It reaches an engineering workstation within the operational environment. A risk assessment identifies a known vulnerability affecting a component in the reachable path. Security proposes cutting access immediately. Operations objects because the OEM may be required for fault diagnosis, startup support, performance tuning, and outage recovery."
  ),
  inputs: [
    { category: same("Physical and operating evidence"), items: same("P&IDs, single-line diagrams, unit or site criticality, protection and operating limits, maintenance/outage/restart assumptions, required control and support workflows") },
    { category: same("OT and network evidence"), items: same("Remote-access architecture, jump hosts, firewalls, VLANs, routing, engineering workstation and controller relationships, PLC/DCS/RTU/IED/HMI context, existing controls") },
    { category: same("External context"), items: same("Known exploited vulnerability context, relevant threat-actor activity, OEM and supply-chain dependencies, site/region-specific external pressure") }
  ],
  chain: [
    same("Vendor credentials or remote-support endpoint compromised"),
    same("Operational DMZ / remote-access route"),
    same("Engineering workstation in an OT zone"),
    same("Reachable control, protection, or unit-support component"),
    same("Loss of view/control, unsafe configuration possibility, trip, or delayed recovery"),
    same("Lost generation / reliability impact / outage and restoration cost")
  ],
  controls: [
    { option: same("Remove vendor access entirely"), evaluates: same("Which operations and recovery workflows are lost"), outcome: same("Exposure falls, but operational resilience may become unacceptable") },
    { option: same("Broker all access"), evaluates: same("MFA, approval, just-in-time sessions, jump host, recording, and command restrictions"), outcome: same("Removes persistent pathways while retaining controlled OEM support") },
    { option: same("Re-zone remote support"), evaluates: same("Virtual firewall and conduit changes; required communications and residual routes"), outcome: same("Identifies whether normal operations or emergency support would break") },
    { option: same("Patch or upgrade component"), evaluates: same("Compatibility, residual paths, outage requirements, and changed exposure"), outcome: same("May reduce vulnerability risk but does not necessarily eliminate access-path risk") },
    { option: same("Combine controls and time work"), evaluates: same("Access redesign now; patch/upgrade at planned outage"), outcome: same("Creates a defensible sequence with lower immediate operational disruption") }
  ],
  result: same(
    "The best outcome may not be “disconnect the vendor” or “replace the system.” It may be a staged plan: close persistent exposure first, preserve controlled recovery capability, prove that the new boundary supports required flows, and schedule disruptive work into an engineered outage."
  )
};

export const CAPABILITIES = {
  h2: same("One energy-system model for cyber, reliability, and capital decisions."),
  items: [
    { name: same("Physical asset and consequence model"), body: same("Connects generation, transmission, distribution, storage, gas, or utility-process assets to operating limits, criticality, and failure propagation.") },
    { name: same("Protection and control mapping"), body: same("Represents IEDs, relays, RTUs, PLCs, DCS, SCADA, HMIs, engineering workstations, and relevant logic/configuration relationships.") },
    { name: same("Network and communications model"), body: same("Maps IT/OT boundaries, operational DMZs, field communications, zones, conduits, routing, VLANs, firewalls, and remote-access paths.") },
    { name: same("Dependency and interdependency graph"), body: same("Shows dependencies among plant/site controls, field assets, telecoms, remote support, market/dispatch systems, suppliers, and adjacent services.") },
    { name: same("Threat and external-pressure model"), body: same("Incorporates vulnerabilities, threat actors, supplier risk, geopolitical context, climate/disaster data, and location-specific pressure.") },
    { name: same("Simulation and investment analysis"), body: same("Tests candidate controls before production implementation and compares changes by risk reduction, cost, residual exposure, and operational consequence.") },
    { name: same("Evidence and assurance outputs"), body: same("Produces board, engineering, compliance, and technical views from the same traceable model.") }
  ]
};

export const REGULATORY = {
  h2: same("Use one model to support reliability, security, and assurance work."),
  intro: same(
    "OXOT does not claim automatic compliance, certification, or audit approval. The Twin is a source of evidence, risk context, traceability, scenario analysis, and documentation support."
  ),
  rows: [
    { framework: "IEC 62443", relevance: same("Core cybersecurity framework for industrial automation and control systems; useful across generation, substations, control centers, and utility process environments"), support: same("Supports system definition, zones/conduits, reachability, asset context, risk decisions, and security-evidence workflows"), href: "assurance" as const },
    { framework: "NIST SP 800-82 Rev. 3", relevance: same("US-oriented and multinational OT/ICS guidance for SCADA, PLC, DCS, and operational environments"), support: same("Helps establish OT architecture, critical dependencies, segmentation/risk decisions, and safe lifecycle improvement planning"), href: null },
    { framework: "NERC CIP", relevance: same("Mandatory reliability and cybersecurity standards for registered North American BES entities; includes supply-chain risk management and remote-access controls"), support: same("Supports asset/dependency mapping, evidence traceability, supplier and remote-access analysis, change scenarios, and defensible risk decisions"), href: null },
    { framework: "EU NIS2", relevance: same("Energy is an Annex I “highly critical” sector; applicability and enforcement depend on entity scope and national implementation"), support: same("Supports risk-management evidence, supply-chain visibility, incident/resilience context, governance reporting, and risk treatment"), href: "assurance" as const },
    { framework: "EU Electricity Cybersecurity Network Code", relevance: same("Directly applicable EU regulation for entities identified as high- or critical-impact in relation to cross-border electricity flows"), support: same("Supports recurring risk assessment, identification of critical digital processes and dependencies, mitigation analysis, monitoring, reporting, and crisis-planning evidence"), href: null },
    { framework: "ISO 27001 / NIST CSF 2.0", relevance: same("Enterprise governance and risk frameworks often operate alongside OT-specific requirements"), support: same("Supplies a plant/site-specific OT evidence layer for broader governance and assurance"), href: null },
    { framework: "Functional safety standards", relevance: same("Depending on facility type, safety lifecycle standards remain central to protection and safe-operation requirements"), support: same("Connects cyber pathways to physical and safety-engineering context; it does not replace safety studies or safety-lifecycle responsibilities"), href: null }
  ]
};

export const ENGAGEMENT = {
  h2: same("Start with one operational decision."),
  items: [
    { name: same("Decision Sprint"), useCase: same("Vendor-access redesign, segmentation change, protection/relay engineering path, modernization, acquisition, or high-risk site"), output: same("Modelled scenario, controls comparison, evidence-backed recommendation") },
    { name: same("Site or system Twin Build"), useCase: same("One generating station, substation fleet, regional control environment, renewable portfolio, or utility process site"), output: same("Validated Cyber Digital Twin, priority decision backlog, architecture views, assurance evidence") },
    { name: same("Continuous Twin Operations"), useCase: same("Dynamic estate with changing assets, vulnerabilities, threat activity, or external conditions"), output: same("Model updates, risk deltas, scenario testing, executive/engineering reporting, recurring evidence outputs") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one site, one control environment, or one change."),
  body: same(
    "Bring a single-line diagram, P&ID, asset list, or a proposed access/segmentation change. OXOT will show how a Cyber Digital Twin can trace the pathway, test the control, and support a defensible decision before you touch live operations."
  ),
  ctaPrimary: same("Discuss an energy scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
