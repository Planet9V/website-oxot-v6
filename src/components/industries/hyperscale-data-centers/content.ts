/**
 * HYPERSCALE & DATA CENTERS — content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_hyperscale.md, which is
 * finished, ready-to-use copy, not an outline. This is the richest of the
 * six industry source files (interactive model spec, sector-reality
 * section, a full external dependency map, a 12-scenario library, a worked
 * example, a 10-category case-study programme, capabilities, and a
 * regulatory table) — restructured into the sections this page's own
 * layout uses (see page.tsx's section order), with some list items
 * condensed rather than reprinted verbatim, per the owner's explicit
 * instruction not to render every sub-item if it makes the page
 * unreasonably long. No fact was invented; only length was cut.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that this is correct Dutch. See
 * registry.ts's own doc comment.
 *
 * Cross-references the source file assumes exist (/platform/decisions/*,
 * /assurance/<regime>, /resources/technical-specification) are retargeted
 * to what's real today: /cdt-2#decide, /assurance (EN) or /consulting (NL),
 * /technical-specification (EN) or /cdt-2 (NL), /consulting, /contact —
 * same retargeting energy-utilities' content.ts uses.
 */
import { same } from "../registry";

export const META = {
  title: "Hyperscale Data Center Cyber Digital Twin | Critical Facilities Security",
  description:
    "Test critical-facilities cyber changes before they affect capacity. OXOT's Cyber Digital Twin connects BMS, EPMS, power, cooling, OT networks, suppliers, and external dependencies for hyperscale data centers."
};

export const HERO = {
  h1: same("Test the failure path before it becomes a capacity event."),
  lead: same(
    "OXOT's Cyber Digital Twin connects critical-facilities controls, electrical and cooling infrastructure, operational networks, external utilities, and supply-chain dependencies — so you can test a cyber change before it risks availability, customer capacity, or safety."
  ),
  ctaPrimary: same("Discuss a critical-facilities scenario"),
  ctaSecondary: same("Explore the hyperscale model"),
  /* Dashboard status strip — a KPI row of monospace stat-readouts standing
     in for the page's control-room aesthetic, distinct from energy's
     single-line diagram. Purely descriptive counts of the page's own
     content, not live telemetry. */
  stats: [
    { label: same("Facility layers modeled"), value: "7" },
    { label: same("External dependency domains"), value: "6" },
    { label: same("Risk scenarios"), value: "12" },
    { label: same("Decisions supported"), value: "4" }
  ]
};

export const MODEL = {
  h2: same("A navigable dependency model — not a rotating building."),
  intro: same(
    "This vertical is specified to carry the site's most detailed interactive concept: a drill-down model using the same logical structure as the live Cyber Digital Twin, from campus view down to the failure cascade a change could trigger. The working, clickable version is not built on this page yet — what follows is the illustrated specification: the drill-down levels, the scenario list a visitor would choose from, the five synchronized views, and the physical-to-consequence chain each scenario would animate."
  ),
  drillDownLabel: same("Drill-down levels"),
  drillDown: [
    same("Campus / site view"),
    same("Data hall / availability-zone view"),
    same("Electrical or cooling train"),
    same("Control and network pathway"),
    same("Failure cascade and business consequence")
  ],
  scenariosLabel: same("Scenario selector (illustrative)"),
  scenarios: [
    same("BMS vendor remote access"),
    same("EPMS / switchgear control path"),
    same("Generator or UPS maintenance update"),
    same("Chilled-water plant control change"),
    same("Water-constrained cooling operation"),
    same("Utility-grid disturbance plus OT disruption"),
    same("Supply-chain compromise in a critical controller"),
    same("Cross-connect / network dependency incident"),
    same("Defense / sovereign workload isolation requirement")
  ],
  viewsLabel: same("Five synchronized views"),
  views: [
    same("Physical infrastructure"),
    same("Electrical and mechanical controls"),
    same("OT / BMS / EPMS / DCIM network pathways"),
    same("Dependency graph"),
    same("Capacity, availability, and recovery consequence")
  ],
  layers: [
    { short: same("Utility & on-site generation"), detail: same("Grid, substation, PPA, on-site generation") },
    { short: same("Critical power path"), detail: same("MV switchgear, transformers, LV switchgear, UPS, PDUs, busway, IT load") },
    { short: same("Thermal-management plant"), detail: same("Chillers, cooling towers, CRAH, CDUs, pumps, valves, water treatment") },
    { short: same("Facility controls"), detail: same("BMS, EPMS, DCIM, PLCs, RTUs, relays, sensors, controllers") },
    { short: same("OT & management network"), detail: same("OT network, management network, vendor remote access, cloud telemetry") },
    { short: same("Workload & capacity"), detail: same("Availability-zone capacity, customer workloads, regulated tenants, service commitments") }
  ],
  note: same(
    "The visitor must be able to see that an issue affecting a cooling-controller network, electrical-monitoring platform, generator controller, or vendor path does not have a generic impact — it may consume redundancy, reduce available capacity, force a load shed, or compound a real utility disturbance."
  )
};

export const REALITY = {
  h2: same("The data center is a cyber-physical availability system — not a collection of servers."),
  body: same(
    "Hyperscale facilities are designed around redundancy, compartmentalization, maintenance without interruption, and rapid recovery. But redundancy does not eliminate dependency. A facility may have multiple utility feeds, generators, UPS strings, chilled-water loops, BMS controllers, EPMS meters, DCIM platforms, and specialist vendors — yet a small number of shared controls, communications paths, or supply-chain components can still create a common-mode failure."
  ),
  bodyTwo: same(
    "For EU operators, the Energy Efficiency Directive requires annual energy-performance reporting for sites with installed IT power demand of 500 kW or more, covering energy use, water use, waste heat, and grid-service participation."
  ),
  redundantLabel: same("What is redundant"),
  redundant: [same("A/B power paths"), same("N+1 cooling"), same("Multiple generators"), same("Spare capacity"), same("Multi-site failover")],
  sharedLabel: same("What is shared"),
  shared: [
    same("BMS servers"),
    same("Identity systems"),
    same("Management workstations"),
    same("Remote-access gateways"),
    same("Time services and firmware"),
    same("Switchgear-control networks"),
    same("Water source and utility substation"),
    same("Fuel logistics and human procedures")
  ],
  challengesLabel: same("Hyperscale-specific challenges"),
  challenges: [
    { term: same("Layered availability"), body: same("The site may tolerate a component failure but not a hidden common-mode dependency across redundant paths.") },
    { term: same("Electrical/cooling inseparable from uptime"), body: same("A cyber issue affecting switchgear, generator controls, UPS monitoring, or BMS can consume redundancy and turn a minor event into a capacity event.") },
    { term: same("Continuous expansion"), body: same("New halls, substations, chillers, generators, and tenants are introduced while existing operations stay live.") },
    { term: same("Commissioning and change risk"), body: same("A control change correct on a diagram can interrupt monitoring, failover, sequencing, or emergency procedures.") },
    { term: same("Vendor density"), body: same("Electrical, mechanical, BMS, EPMS, DCIM, UPS, generator, cooling, and network vendors each bring remote-access and firmware dependencies.") },
    { term: same("IT/OT convergence"), body: same("Cloud management, DCIM, telemetry, and identity increasingly exchange operational dependencies with facility systems.") },
    { term: same("Scale and repeatability"), body: same("A shared firmware image, BMS template, or controller family can propagate an issue across campuses.") },
    { term: same("Power scarcity and grid dependency"), body: same("Interconnection delays, curtailment, demand response, and power-quality issues can constrain expansion and availability.") },
    { term: same("Water and cooling constraints"), body: same("Cooling design may depend on water availability, treatment, discharge, heat-reuse commitments, or local permitting.") },
    { term: same("Customer and sovereign commitments"), body: same("A facility can host commercial, financial, healthcare, government, and defense workloads with different isolation and continuity obligations.") },
    { term: same("Supply-chain concentration"), body: same("Long lead times for transformers, switchgear, generators, UPS systems, and chillers make resilience a procurement problem.") }
  ]
};

export const ARCHITECTURE = {
  h2: same("Model the facility from utility interconnect to workload consequence."),
  intro: same(
    "Seven layers, one model — from external dependencies through to the business, customer, and mission layer they ultimately support."
  ),
  stackLabel: same("Physical and operational stack"),
  stack: [
    { name: same("External dependencies"), body: same("Utility grid, substation, transmission/distribution operator, gas/fuel, water utility, telecom carriers, cloud/internet exchange, logistics") },
    { name: same("Campus utility and resilience layer"), body: same("HV/MV intake, transformers, MV/LV switchgear, protection relays, generator plant, fuel storage, BESS, power-quality systems") },
    { name: same("Critical power path"), body: same("UPS systems, batteries, static transfer switches, PDUs, RPPs, busway, rack PDUs, branch-circuit monitoring, IT load") },
    { name: same("Thermal-management path"), body: same("Chillers, cooling towers, dry coolers, pumps, valves, CRAH/CRAC, liquid cooling / CDUs, heat exchangers, water treatment") },
    { name: same("Facility control and operations"), body: same("BMS, EPMS, DCIM, PLCs, RTUs, controllers, meters, sensors, historians, alarming, engineering workstations") },
    { name: same("Digital infrastructure"), body: same("Management networks, OOB networks, production networks, cloud control plane, storage, compute, switching, optical transport") },
    { name: same("Business, customer, and mission layer"), body: same("Availability zones, customer workloads, SLAs, sovereign/defense enclaves, capacity commitments, AI/GPU clusters, regulated data") }
  ],
  domainsLabel: same("Key technology domains"),
  domains: [
    { name: same("Electrical OT"), body: same("MV switchgear, protection relays, generator controllers, paralleling switchgear, ATS, UPS controllers, battery-management systems, PDUs, branch-circuit monitoring") },
    { name: same("Mechanical OT"), body: same("Chiller controllers, cooling-tower PLCs, condenser/chilled-water pumps, VFDs, CRAH/CRAC controls, CDU controls, valve actuators, leak detection, water treatment") },
    { name: same("Facility platforms"), body: same("BMS/BAS, EPMS, DCIM, power-quality monitoring, historian, alarm management, CMMS/EAM, digital commissioning systems") },
    { name: same("OT communications"), body: same("BACnet/IP, BACnet MS/TP, Modbus TCP/RTU, SNMP, OPC UA, MQTT, EtherNet/IP, PROFINET, vendor fieldbus/serial protocols") },
    { name: same("IT / cloud dependency"), body: same("Corporate identity, privileged access management, remote-access brokers, NTP/PTP, SIEM/SOC, cloud monitoring, API gateways, OOB management") },
    { name: same("Operational evidence"), body: same("Single-line diagrams, protection-coordination studies, load flow, generator/UPS autonomy calculations, MOP/SOP/EOP documents, commissioning scripts") },
    { name: same("Supply-chain evidence"), body: same("SBOM, HBOM, CBOM, firmware images, controller/PLC models, vendor support contracts, spare inventory, critical lead times") },
    { name: same("Sustainability evidence"), body: same("IT load, total facility energy, PUE, WUE, water source/use, heat reuse, renewable-energy factor, capacity utilization") }
  ],
  protocolsLabel: same("Protocols"),
  protocols: ["BACnet/IP", "BACnet MS/TP", "Modbus TCP/RTU", "SNMP", "OPC UA", "MQTT", "EtherNet/IP", "PROFINET", "Industrial Ethernet"]
};

export const DEPENDENCIES = {
  h2: same("The risk is often outside the data hall."),
  intro: same(
    "This is the differentiator: data-center cyber risk connected explicitly to energy, water, communications, commercial customers, defense, and manufacturing/supply chain — not modeled as a self-contained building."
  ),
  domains: [
    {
      name: same("Energy"),
      body: [
        same("Utility feeder and substation dependency"),
        same("Generator availability, fuel contracts, and refueling procedures"),
        same("Battery/UPS autonomy and controller dependencies"),
        same("Shared electrical-control platforms that can create common-mode failure across A/B paths")
      ]
    },
    {
      name: same("Water"),
      body: [
        same("Cooling architecture ranges from air-cooled to direct-to-chip liquid cooling"),
        same("Each architecture carries a distinct water, treatment, and control dependency — see the cooling-model table below")
      ]
    },
    {
      name: same("Communications"),
      body: [
        same("Common physical routes, conduits, landing stations, and building entry points"),
        same("DNS, identity, NTP/PTP, cloud logging, and remote-access brokers"),
        same("BMS/EPMS/DCIM telemetry links and OT jump hosts"),
        same("Cross-connects, meet-me rooms, and optical transport equipment")
      ]
    },
    {
      name: same("Commercial"),
      body: [
        same("Availability-zone capacity loss"),
        same("Inability to place new customer load or AI/GPU clusters"),
        same("SLA credits and contract escalation"),
        same("Customer notification, incident communications, and recovery priorities")
      ]
    },
    {
      name: same("Defense & sovereign"),
      body: [
        same("For operators supporting sovereign, defense, public-safety, or other regulated workloads, the Twin can help model isolation boundaries, residency constraints, shared-facility dependencies, and privileged-access paths."),
        same("A shared BMS/EPMS or remote-access component crossing toward a restricted zone"),
        same("Data-residency or operational-access constraints that limit who can diagnose an incident")
      ]
    },
    {
      name: same("Manufacturing & supply chain"),
      body: [
        same("Long-lead MV transformers, switchgear, generators, UPS, batteries, chillers, and CDUs"),
        same("Concentration risk in specific controller, PLC, relay, BMS, and generator OEMs"),
        same("Field-service access, commissioning tools, and maintenance contractors"),
        same("Spares inventory, repair capacity, and emergency replacement logistics")
      ]
    }
  ],
  coolingLabel: same("Cooling architecture and its dependency"),
  cooling: [
    { model: same("Air-cooled / dry cooling"), concern: same("Ambient-temperature exposure, fan/VFD controls, electrical consumption, capacity derating") },
    { model: same("Evaporative cooling"), concern: same("Water availability, treatment, water-quality sensors, valves, pumps, local water restrictions") },
    { model: same("Water-cooled chiller plant"), concern: same("Chilled/condenser-water control loops, cooling towers, makeup water, treatment chemistry, pump/VFD controls") },
    { model: same("Direct-to-chip liquid cooling"), concern: same("CDUs, leak detection, flow/temperature sensing, distribution manifolds, high-density load concentration") },
    { model: same("District cooling / heat reuse"), concern: same("Third-party thermal network, contracted service levels, pumps/heat exchangers, seasonal operation") }
  ]
};

export const SCENARIOS = {
  h2: same("Test the common-mode failure before it consumes redundancy."),
  intro: same(
    "Each scenario is a dependency chain, not merely a vulnerability — the same entry point can consume redundancy, reduce hall capacity, or force a load shed depending on what it actually reaches."
  ),
  items: [
    { title: same("BMS vendor remote-access compromise"), pathway: same("Vendor credential or maintenance gateway reaches BMS server, engineering workstation, or controller network."), consequence: same("Unauthorized access to mechanical controls, alarm suppression, degraded cooling response, common-mode impact across halls."), decision: same("Broker access, segment control zones, restrict engineering functions.") },
    { title: same("EPMS / electrical-control path disruption"), pathway: same("Compromise affects EPMS server, relay-management workstation, or switchgear-control network."), consequence: same("Loss of electrical visibility, delayed response, impaired switching during a utility event."), decision: same("Separate monitoring from control; test management boundaries.") },
    { title: same("Generator / paralleling-controller compromise"), pathway: same("Vendor tool or maintenance route reaches generator or synchronizing/paralleling switchgear."), consequence: same("Failure to start, incorrect sequencing, loss of standby resilience during a utility outage."), decision: same("Model start sequence, shared dependencies, secure maintenance access.") },
    { title: same("UPS / BMS controller firmware issue"), pathway: same("Shared firmware, controller model, or update affects redundant equipment trains."), consequence: same("A/B common-mode exposure, reduced autonomy, maintenance lockout."), decision: same("Compare update sequence, isolated pilot, rollback, firmware provenance.") },
    { title: same("Cooling-plant control compromise"), pathway: same("Path reaches chiller PLC, tower control, pump VFD, or valve controller."), consequence: same("Thermal excursion, loss of cooling redundancy, load shedding, reduced hall capacity."), decision: same("Test segmentation, fail-safe behavior, independent monitoring.") },
    { title: same("Liquid-cooling / CDU disruption"), pathway: same("Compromise affects CDU controls, leak-detection network, or flow/temperature sensors."), consequence: same("Cluster throttling, GPU/AI capacity loss, localized shutdown."), decision: same("Model concentration of critical load and safe fallback control.") },
    { title: same("Utility-event plus OT visibility loss"), pathway: same("Grid disturbance occurs while BMS/EPMS telemetry or identity is unavailable."), consequence: same("Operators lose situational awareness while redundancy is already stressed."), decision: same("Simulate combined failures; prioritize tested manual procedures.") },
    { title: same("Telecom / management-plane dependency failure"), pathway: same("Carrier, DNS, identity, OOB network, or cloud-monitoring dependency is disrupted."), consequence: same("Remote sites harder to operate; facility telemetry and customer connectivity degraded."), decision: same("Identify shared dependencies; create independent local operating paths.") },
    { title: same("Supply-chain controller compromise"), pathway: same("Vulnerability or compromised update affects a BMS, UPS, generator, or DCIM component across a standardized fleet."), consequence: same("Fleet-wide common-mode exposure, emergency patching, constrained replacement due to lead times."), decision: same("Model affected estate, compensating controls, staged remediation.") },
    { title: same("Construction / commissioning laptop pathway"), pathway: same("Temporary commissioning network or contractor device bridges new build and live systems."), consequence: same("Malware/configuration drift, loss of isolation, disruption to existing live halls."), decision: same("Model temporary-to-permanent transition and access expiry.") },
    { title: same("Water constraint plus cooling incident"), pathway: same("Local water restriction or treatment issue combines with cooling automation impairment."), consequence: same("Capacity derating, temperature excursion, missed environmental/contractual targets."), decision: same("Model cooling strategy alternatives and operational thresholds.") },
    { title: same("Restricted-workload boundary failure"), pathway: same("Shared privileged-access or facility-management pathway crosses into a sovereign/defense-restricted environment."), consequence: same("Policy, contract, or regulatory breach; constrained incident response."), decision: same("Test segmentation, identity, and data-flow boundaries.") }
  ]
};

export const DECISIONS = {
  h2: same("Four decisions that preserve capacity — not just component uptime."),
  items: [
    { tag: same("PRIORITIZE"), name: same("What do we fix first?"), question: same("Which reachable control, management, or supplier pathway can consume redundancy, reduce available capacity, or impair safe recovery?"), provides: same("NOW / NEXT / NEVER prioritization tied to A/B-path dependency, common-mode exposure, and business impact.") },
    { tag: same("INVEST"), name: same("What should we spend?"), question: same("Do we invest in BMS/EPMS segmentation, secure vendor access, controller modernization, spare capacity, or supply-chain controls?"), provides: same("Comparable options with modeled risk reduction, operational impact, and a reasoned investment sequence.") },
    { tag: same("TEST"), name: same("Can we change safely?"), question: same("Can we patch this UPS controller, alter a switchgear firewall, isolate a vendor, or connect a new hall without reducing resilience?"), provides: same("A virtual change experiment showing required flows, redundancy impact, and recovery consequences.") },
    { tag: same("ACCEPT"), name: same("What can we leave alone?"), question: same("Which legacy BMS, controller, or vendor dependency is truly isolated and can remain under compensating controls?"), provides: same("A defensible exception with dependency evidence, compensating controls, owner, and reassessment trigger.") }
  ]
};

export const WORKED_EXAMPLE = {
  h2: same("Worked example: secure BMS vendor access without turning a maintenance change into a capacity event."),
  tag: same("Illustrative scenario — no customer data"),
  scenario: same(
    "A hyperscale campus runs multiple data halls with N+1 cooling. Chillers, cooling towers, and water-treatment systems report into BMS and DCIM platforms. An OEM remotely supports critical chiller controls; the BMS integrator maintains supervisory control logic. A review finds vendor remote access uses a persistent VPN path through a shared facility-management network, reaching an engineering workstation with pathways toward BMS servers and mechanical-control zones. Security proposes removing vendor access; Critical Facilities objects — the vendor may be needed during a chiller fault or overnight maintenance."
  ),
  inputs: [
    { category: same("Facility engineering evidence"), items: same("Mechanical P&IDs, sequence-of-operations narratives, N+1/2N redundancy design, thermal limits, MOPs/SOPs/EOPs, water-treatment dependencies") },
    { category: same("OT, BMS, and network evidence"), items: same("BMS servers, engineering workstations, DCIM links, vendor VPN/jump hosts, identity/MFA, VLANs, firewalls, required control flows, historian and SIEM connections") },
    { category: same("External and commercial evidence"), items: same("Utility-power and water-service dependencies, OEM support contract and escalation time, spare-controller lead times, customer capacity commitments") }
  ],
  chainLabel: same("Modelled chain"),
  chain: [
    same("Compromised vendor credential or remote-support endpoint"),
    same("Shared facility-management access path"),
    same("BMS engineering workstation / supervisory-control layer becomes reachable"),
    same("Chiller / pump / tower / VFD / valve control pathways potentially affected"),
    same("Loss of cooling visibility or impaired control during a physical event"),
    same("Redundancy consumed → hall capacity reduced → load shed or service-impact risk")
  ],
  controls: [
    { option: same("Remove remote OEM access"), evaluates: same("Whether incident recovery depends on vendor support and creates unacceptable repair-time exposure"), outcome: same("Reduces cyber pathway but may impair restoration during a mechanical fault") },
    { option: same("Broker OEM access"), evaluates: same("Named accounts, MFA, approval, just-in-time sessions, jump host, session recording"), outcome: same("Preserves support while removing persistent broad access") },
    { option: same("Segment BMS engineering zones"), evaluates: same("Virtual firewall rules between vendor path, supervisory BMS, data-hall controls, and DCIM"), outcome: same("Shows which required flows remain and which attack routes close") },
    { option: same("Separate monitoring from control"), evaluates: same("Isolate EPMS/DCIM/BMS reporting feeds from configuration and command paths"), outcome: same("Reduces impact of a monitoring-platform compromise") },
    { option: same("Stage controller/firmware hardening"), evaluates: same("Pilot update on one isolated element, validate rollback, sequence across redundancy trains"), outcome: same("Reduces common-mode update risk and preserves capacity") }
  ],
  result: same(
    "The decision is not “disconnect the vendor” or “trust the redundant chillers.” It is to remove persistent reachability, retain accountable emergency support, prove that segmentation preserves the required control flows, and test updates so a shared maintenance action cannot consume cooling redundancy across the campus."
  )
};

export const CASE_STUDIES = {
  h2: same("Dependency-rich, technically credible decision narratives — not generic posture stories."),
  intro: same(
    "Where confidentiality prevents named publication, use an anonymized but technically specific format: “A 48 MW, water-cooled campus with N+1 cooling and a shared BMS engineering path,” rather than vague claims about “a global client.”"
  ),
  items: [
    { name: same("BMS remote-access redesign"), question: same("How can OEM support remain available without persistent access to critical controls?") },
    { name: same("EPMS and switchgear-control isolation"), question: same("Which monitoring, engineering, and switching paths must be separated to reduce common-mode electrical risk?") },
    { name: same("Cooling-control common-mode analysis"), question: same("Could one BMS, controller firmware, or management path compromise multiple redundant cooling trains?") },
    { name: same("UPS / battery controller lifecycle decision"), question: same("Which firmware, vendor, and maintenance dependencies create shared risk across A/B power?") },
    { name: same("Liquid-cooling readiness for AI halls"), question: same("How do CDU, manifold, leak-detection, and high-density-rack control paths change availability exposure?") },
    { name: same("Utility-event resilience exercise"), question: same("What happens when a grid event coincides with reduced BMS/EPMS visibility or remote-access failure?") },
    { name: same("Data-center expansion / commissioning boundary"), question: same("How do temporary systems, contractor laptops, and new-hall controls enter the live estate safely?") },
    { name: same("Sovereign workload facility dependency"), question: same("What shared facility or privileged-access dependencies can affect a regulated/sensitive workload zone?") },
    { name: same("Supply-chain exposure across a standardized fleet"), question: same("Which components, firmware, and supplier relationships create fleet-wide common mode?") },
    { name: same("Energy/water reporting evidence model"), question: same("Can sustainability metrics be traced to the meters, systems, and assumptions that produce them?") }
  ]
};

export const CAPABILITIES = {
  h2: same("One model from facility control to tenant-impact decision."),
  items: [
    { name: same("Electrical-system and power-path model"), body: same("Connects utility feeds, switchgear, relays, generators, UPS, batteries, transfer equipment, PDUs, and IT load to redundancy and common-mode dependencies.") },
    { name: same("Mechanical and thermal model"), body: same("Represents chiller plants, cooling towers, pumps, heat exchangers, CRAH/CRAC units, liquid cooling, CDUs, water treatment, and thermal operating limits.") },
    { name: same("BMS / EPMS / DCIM control model"), body: same("Links supervisory platforms, controllers, field devices, configuration paths, alarm dependencies, and command/monitoring flows.") },
    { name: same("Network and access-path model"), body: same("Models IT/OT zones, vendor access, remote support, management/OOB networks, identity dependencies, and actual route reachability.") },
    { name: same("Capacity and consequence model"), body: same("Translates facility/control disruptions into redundancy consumption, thermal exposure, hall capacity loss, and recovery requirements.") },
    { name: same("External dependency model"), body: same("Relates power, water, fuel, telecoms, cloud platforms, customers, vendors, construction, weather, and logistics to each campus.") },
    { name: same("Supply-chain and provenance model"), body: same("Uses SBOM, HBOM, CBOM, SaaS-BOM, and operations-BOM views for firmware, hardware, certificates, and support tools.") },
    { name: same("Change and recovery simulation"), body: same("Tests access changes, segmentation, firmware rollouts, controller replacements, and failover before implementation.") },
    { name: same("Assurance and sustainability evidence"), body: same("Generates evidence for cyber risk management, NIS2-oriented requirements, and data-center energy/water reporting workflows.") }
  ]
};

export const REGULATORY = {
  h2: same("Build one evidence model for cyber resilience, operational assurance, and sustainability reporting."),
  intro: same(
    "OXOT does not promise automatic regulatory compliance, certification, or assurance outcomes. The Twin supports traceable risk management, control decisions, dependency evidence, scenario testing, and technical documentation."
  ),
  rows: [
    { code: "NIS2", framework: "NIS2", relevance: same("Data-centre service providers are in scope; applicable entities must implement cyber risk-management measures and incident handling under the Directive and Implementing Regulation"), support: same("Supports asset management, risk assessment, access-path modeling, continuity/crisis scenarios, and incident impact analysis"), href: "assurance" as const },
    { code: "EU 2024/2690", framework: "Commission Implementing Regulation (EU) 2024/2690", relevance: same("Specifies technical and methodological requirements and significant-incident criteria for data-centre service providers"), support: same("Produces facility/OT dependency evidence for policies, risk treatment, access control, and supplier-security workflows"), href: "assurance" as const },
    { code: "EU EED", framework: "EU Energy Efficiency Directive", relevance: same("Operators of sites with installed IT power demand of 500 kW or more must annually report specified energy-performance information"), support: same("Connects meters, power/cooling assets, water data, and controls to reporting workflows"), href: null },
    { code: "EU 2024/1364", framework: "Commission Delegated Regulation (EU) 2024/1364", relevance: same("Establishes harmonized reporting elements and the first phase of an EU data-center rating scheme"), support: same("Supports traceability for energy, cooling, water, heat-reuse, and capacity evidence inputs"), href: null },
    { code: "IEC 62443", framework: "IEC 62443", relevance: same("Relevant to BMS, EPMS, electrical and mechanical control environments, and lifecycle security for IACS components"), support: same("Supports system boundaries, zones/conduits, control-path visibility, and change decisions"), href: "assurance" as const },
    { code: "ISO 27001 / CSF", framework: "ISO 27001 / NIST CSF 2.0", relevance: same("Common enterprise governance frameworks for cloud and data-center organizations"), support: same("Provides the facility/OT component of wider risk, asset, and continuity programs"), href: null },
    { code: "ISO 22301", framework: "ISO 22301 / operational-resilience programs", relevance: same("Supports business-continuity, recovery, and customer-commitment planning"), support: same("Models dependencies, recovery sequence, and consequences of simultaneous failures"), href: null },
    { code: "SOVEREIGN", framework: "Customer / sovereign / defense requirements", relevance: same("May impose heightened access, residency, supply-chain provenance, and separation obligations"), support: same("Helps document isolation boundaries, access routes, and recovery options"), href: null }
  ]
};

export const ENGAGEMENT = {
  h2: same("Start with one hall, one utility dependency, or one critical-facilities change."),
  items: [
    { name: same("Critical-Facilities Decision Sprint"), useCase: same("Vendor access, BMS/EPMS segmentation, UPS/generator update, cooling-control change, or commissioning boundary"), output: same("Modelled dependency/cyber pathway, capacity consequence, controls comparison") },
    { name: same("Hyperscale Campus Twin Build"), useCase: same("One campus, data hall cluster, electrical system, or cooling plant"), output: same("Validated Cyber Digital Twin, A/B common-mode analysis, priority queue, assurance evidence") },
    { name: same("Expansion and Commissioning Assurance"), useCase: same("New building/hall, utility feed, cooling plant, substation, or liquid-cooling deployment"), output: same("Temporary-to-live trust-boundary analysis, change scenarios, acceptance criteria") },
    { name: same("Continuous Twin Operations"), useCase: same("Multi-site estate with ongoing expansion, firmware change, or evolving customer commitments"), output: same("Risk deltas, scenario testing, supplier/BOM change impact, decision support") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one power path, one cooling train, or one control-system change."),
  body: same(
    "Bring a one-line diagram, P&ID, BMS/EPMS architecture, equipment list, or a proposed vendor-access, firmware, or segmentation change. OXOT will show how the Cyber Digital Twin can trace the route, test the control, and expose the capacity consequence before the live facility is changed."
  ),
  ctaPrimary: same("Discuss a hyperscale scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
