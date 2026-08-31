/**
 * DEFENSE & GOVERNMENT — content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_defence.md, which is finished,
 * ready-to-use copy, not an outline. industry_defense_airgap.md (thinner,
 * earlier draft material in the same source directory) supplies AIR_GAP
 * only, cross-checked against 6_resources/air-gapped_deployment.md for the
 * Island Mode / Inbound Intelligence Mode / Dedicated Sovereign Instance
 * wording. Restructured into the sections this page's own layout uses (see
 * page.tsx's section order), not a verbatim reprint of either source
 * file's own headings — the source's separate "Interactive sovereign-
 * system model" section is folded into ARCHITECTURE.views rather than
 * built twice, and the source's lead-form field list is dropped: this site
 * has one shared contact mechanism (ContactBand + ThreeDoors), not a
 * per-page custom form.
 *
 * SCOPE BOUNDARY IS LOAD-BEARING, not a stylistic choice: OXOT models
 * supporting cyber-physical infrastructure and operational dependencies —
 * explicitly NOT weapons systems, classified battle-management systems, or
 * intelligence operations. See SCOPE.boundary below; keep this line intact
 * in any future edit to this file.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that this is correct Dutch. See
 * registry.ts's own doc comment.
 *
 * Cross-references to pages the source file assumes exist
 * (/platform/decisions/*, /assurance/<regime>, /resources/
 * technical-specification) are retargeted to what's real today: /cdt-2#decide,
 * /assurance (EN) or /consulting (NL), /technical-specification (EN) or
 * /cdt-2 (NL), /consulting, /contact — same retargeting rules
 * energy-utilities' content.ts uses.
 */
import { same } from "../registry";

export const META = {
  title: "Sovereign Defense & Government Cyber Digital Twin",
  description:
    "Model the infrastructure and dependencies that sustain sovereign defense and government operations. OXOT's Cyber Digital Twin tests cyber, supply-chain, power, communications, and hybrid-disruption decisions before they constrain the mission."
};

export const HERO = {
  h1: same("Preserve sovereign operational freedom under cyber and physical pressure."),
  lead: same(
    "OXOT's Cyber Digital Twin models the infrastructure, controls, communications, dependencies, and recovery pathways that enable government and defense operations — so teams can test decisions before a real incident constrains their options."
  ),
  ctaPrimary: same("Discuss a sovereign resilience scenario"),
  ctaSecondary: same("Explore the sovereign-system model"),
  /* The source brief's interactive hero visual (a four-perspective selector
     over this same chain) is not built anywhere on this site yet — rendered
     as a static, illustrated vertical chain instead of omitted or invented
     as a working control. See DefenseHero.tsx. */
  chain: [
    same("Mission / essential public service"),
    same("Government and defense operations"),
    same("Secure facilities & critical infrastructure"),
    same("OT, communications, identity, suppliers, personnel"),
    same("Cyber pathway → disruption → recovery decision")
  ]
};

export const SOVEREIGNTY = {
  h2: same("Sovereignty is the ability to decide, operate, recover, and sustain — without an unexamined dependency."),
  intro: same(
    "This distinguishes digital sovereignty from a simplistic data-residency claim. Six dimensions, each with its own evidence."
  ),
  rows: [
    {
      dimension: same("Operational sovereignty"),
      practice: same("The organization can operate essential functions under degraded conditions, rather than depending on a single vendor, remote-support route, or cloud service."),
      models: same("Local control, manual fallback, failover, restoration sequence, operator knowledge, and command dependencies.")
    },
    {
      dimension: same("Data sovereignty"),
      practice: same("Sensitive data, telemetry, model data, and evidence remain under appropriate jurisdictional, access, classification, and handling controls."),
      models: same("Data flows, storage/processing boundary, access roles, outbound connections, and evidence provenance.")
    },
    {
      dimension: same("Technology sovereignty"),
      practice: same("Critical functions are not silently dependent on untrusted, unsupported, unpatchable, or nonreplaceable technology."),
      models: same("Hardware, firmware, software, cryptographic, SaaS, and support dependencies.")
    },
    {
      dimension: same("Supply sovereignty"),
      practice: same("Essential spares, fuel, parts, maintenance expertise, connectivity, and logistics remain available during crisis or conflict."),
      models: same("Supplier tiers, lead times, alternatives, stock, repair capacity, routes, and contractual obligations.")
    },
    {
      dimension: same("Decision sovereignty"),
      practice: same("Leaders can justify which risks to accept, which investments to make, and what to restore first, using transparent evidence."),
      models: same("Consequence model, priority queue, simulations, source-linked assumptions, and recovery choices.")
    },
    {
      dimension: same("Alliance interoperability"),
      practice: same("Sovereign systems can still exchange the right information and operate with trusted partners when authorized."),
      models: same("Interfaces, information-sharing boundaries, federation points, shared services, and controlled cross-domain dependencies.")
    }
  ]
};

export const SCOPE = {
  h2: same("One model for the facilities and dependencies that sustain mission and government continuity."),
  boundary: same(
    "OXOT models the supporting cyber-physical infrastructure and operational dependencies that enable sovereign missions and essential public functions. It does not model weapons systems, classified battle-management systems, or intelligence operations."
  ),
  environments: [
    { name: same("Defense bases and estates"), body: same("Power, water, fuel, heating/cooling, perimeter systems, communications, facilities control, maintenance, accommodation, and operational support must work under disruption.") },
    { name: same("Airfields and aviation-support infrastructure"), body: same("Airfield lighting, fueling, hangars, weather systems, ground support, power, communications, maintenance, and secure operational facilities depend on coordinated OT and logistics.") },
    { name: same("Ports, naval support, and maritime logistics"), body: same("Shore power, cranes, fuel, security, access, ship support, warehouses, communications, and transportation links affect force movement and sustainment.") },
    { name: same("Military and government data centers"), body: same("Critical facilities, power/cooling, sovereign cloud, secure operations, data residency, identity, carrier dependencies, and mission workload continuity.") },
    { name: same("Command and operational-support facilities"), body: same("Secure communications, power, HVAC, access control, situational-awareness platforms, alternate sites, and continuity capabilities.") },
    { name: same("Munitions, maintenance, and industrial support sites"), body: same("Process systems, storage, machinery, quality controls, energy, safety systems, controlled access, and supplier dependence.") },
    { name: same("Government continuity facilities"), body: same("Emergency coordination, public warning, identity and citizen services, crisis communications, emergency operations, and backup sites.") },
    { name: same("Dual-use civil infrastructure"), body: same("Ports, airports, rail, energy, water, telecoms, logistics hubs, and data centers that must support both civilian continuity and defense mobilization.") }
  ]
};

export const ARCHITECTURE = {
  h2: same("Trace a dependency from mission function to field device and supplier."),
  intro: same("Mission-to-infrastructure, not IT-centric — six tiers, each depending on the one below it."),
  tiers: [
    { name: same("Mission / essential-government function"), body: same("Crisis coordination · sovereign cloud · logistics · force support · public warning") },
    { name: same("Operational systems and secure services"), body: same("C2 support · communications · identity · data platforms · SOC/NOC · operations centers") },
    { name: same("Secure facilities and critical infrastructure"), body: same("Bases · airfields · ports · depots · data centers · government buildings · alternate sites") },
    { name: same("OT and physical-support systems"), body: same("Power · generators · UPS · fuel · HVAC · BMS · EPMS · water · access control · CCTV · fire/life safety · cranes · pumps · industrial processes") },
    { name: same("Networks and access pathways"), body: same("IT/OT segmentation · management networks · radio · fiber · satellite · carrier services · remote support · privileged access · time services") },
    { name: same("External dependencies"), body: same("Utilities · telecoms · cloud providers · OEMs · logistics · spares · contractors · fuel · water · workforce · allied partners") }
  ],
  domains: [
    { domain: same("Facility OT"), examples: same("BMS/BAS, EPMS, switchgear, UPS, generators, batteries, HVAC/chillers, pumps, fuel systems, building controllers, fire/life-safety integration") },
    { domain: same("Operational technology"), examples: same("PLCs, RTUs, HMIs, SCADA, industrial gateways, remote telemetry, industrial Ethernet, fieldbus and serial devices") },
    { domain: same("Physical-security systems"), examples: same("Access control, secure entry, perimeter intrusion detection, CCTV, vehicle barriers, alarm panels, visitor systems, security operations integration") },
    { domain: same("Communications"), examples: same("Secure WAN, fiber, carrier networks, microwave, satellite, radio, tactical-support interfaces, time services, telecom power and environmental systems") },
    { domain: same("Government digital services"), examples: same("Identity, PKI, privileged-access management, cloud/sovereign-cloud services, case-management systems, emergency notification, digital records, data exchange") },
    { domain: same("Defense support systems"), examples: same("Maintenance, logistics, warehouse, fuel, transportation, depot, repair, operational-readiness, and supply-chain management systems") },
    { domain: same("Data-center dependencies"), examples: same("BMS, EPMS, DCIM, cooling, electrical control, carrier diversity, cloud management, identity, service-provider and workload boundaries") },
    { domain: same("Engineering evidence"), examples: same("Single-line diagrams, P&IDs, building and site drawings, sequence-of-operations narratives, asset records, hazard registers, MOP/SOP/EOPs, maintenance data, contingency plans") },
    { domain: same("Supply-chain evidence"), examples: same("Hardware/firmware inventories, SBOMs, certificates, vendor support contracts, supplier tiers, maintenance windows, spare parts, repair routes, personnel qualifications") }
  ],
  /* Folded in from the source's own "Interactive sovereign-system model"
     section rather than built as a second, duplicate interactive visual —
     the perspectives it names are real modeling views, shown here as a
     compact reference row. */
  views: [
    same("Mission"),
    same("Infrastructure"),
    same("Control"),
    same("Network"),
    same("Dependency"),
    same("Consequence"),
    same("Evidence")
  ],
  viewsNote: same(
    "A synthetic, notional environment — never actual national infrastructure, sensitive sites, force posture, or classified dependencies."
  )
};

export const SCENARIOS = {
  h2: same("Rehearse the cascade, not just the cyber event."),
  intro: same(
    "Every scenario begins with a modest cyber or physical disruption and reveals the second- and third-order dependency effects."
  ),
  items: [
    { title: same("Base power and generator-control disruption"), event: same("A remote-support route, maintenance laptop, or exposed controller reaches generator, switchgear, BMS, or EPMS management systems."), cascade: same("Grid loss occurs; standby generation is delayed, unavailable, or poorly visible; secure services, fuel operations, communications, and operations-center capacity degrade."), decision: same("Test vendor access, segmentation, manual fallback, clean backups, generator-start dependencies, fuel prioritization, and recovery sequence.") },
    { title: same("Airfield support-system outage"), event: same("Cyber disruption affects airfield lighting control, fuel-system automation, hangar power, weather/communications support, or facilities controls."), cascade: same("Flight operations are restricted; maintenance and turnaround slow; ground support, safety, and operational readiness are affected."), decision: same("Identify safe operating modes, isolate support systems, and prioritize restoration by mission effect.") },
    { title: same("Port / maritime logistics disruption"), event: same("A pathway reaches crane controls, shore power, gate systems, fuel/warehouse automation, perimeter systems, or logistics data exchange."), cascade: same("Cargo and military mobility slow; vessel support and loadout are delayed; alternate routes and assets become constrained."), decision: same("Model OT and commercial dependencies, recovery order, alternatives, and supplier/logistics bottlenecks.") },
    { title: same("Sovereign data-center common-mode event"), event: same("BMS, EPMS, cooling, UPS, or remote-access dependency is compromised during a power or thermal incident."), cascade: same("A shared dependency consumes redundancy; mission workloads, public services, or restricted enclaves lose capacity or must shift under constraints."), decision: same("Test isolation, independent monitoring, capacity preservation, controlled support, and workload-recovery priorities.") },
    { title: same("Telecom and timing degradation"), event: same("Carrier route, time service, radio/satellite link, network-management plane, or telecom power system is disrupted."), cascade: same("Remote sites lose telemetry/support; secure coordination, incident response, or field operations are impaired."), decision: same("Identify common routes, independent local operation, alternative communications, and recovery triggers.") },
    { title: same("Fuel and logistics disruption"), event: same("Supplier system, route, fleet management, depot OT, port/rail interface, or contractor access is disrupted."), cascade: same("Generators, vehicles, aircraft, ships, or emergency systems face delayed refueling/maintenance; crisis endurance falls."), decision: same("Model stock, consumption, route alternatives, criticality, supplier concentration, and replenishment sequence.") },
    { title: same("Maintenance and munitions-support disruption"), event: same("Compromise reaches industrial process controls, test equipment, warehouse automation, quality/traceability systems, or engineering tooling."), cascade: same("Maintenance cycle slows; safety/quality assurance is impaired; readiness and replenishment are affected."), decision: same("Test segmentation, engineering access, update paths, recovery evidence, and process-specific priorities.") },
    { title: same("Vendor withdrawal / high-risk component exposure"), event: same("A supplier is sanctioned, unavailable, compromised, or classified as high risk."), cascade: same("Remote support, firmware updates, spares, certificates, and replacement components become unavailable at once."), decision: same("Identify inherited exposure, substitutes, stockpile needs, migration sequence, and mission impact.") },
    { title: same("Hybrid event: cyber plus physical disruption"), event: same("Cyber incident coincides with storm, sabotage, utility outage, flood, civil disturbance, or communications failure."), cascade: same("Staffing, access, power, logistics, sensor data, and command coordination are simultaneously constrained."), decision: same("Simulate the combined event, define minimum operating requirements, and validate the cross-sector recovery plan.") },
    { title: same("Cross-domain access failure"), event: same("Privileged or vendor access crosses a boundary between general administration and restricted/sovereign services."), cascade: same("Sensitive-system exposure, policy breach, constrained incident response, or loss of trust in the isolation boundary."), decision: same("Test access architecture, logging, session restrictions, support procedures, and evidence of separation.") }
  ]
};

export const DECISIONS = {
  h2: same("Four decisions that preserve mission and national continuity."),
  items: [
    { name: same("What do we fix first?"), question: same("Which reachable pathway can degrade a mission-enabling function, essential public service, base, logistics route, secure facility, or continuity capability?"), provides: same("NOW / NEXT / NEVER priority based on mission effect, physical consequence, reachability, recovery constraints, and dependency cascade.") },
    { name: same("What should we spend?"), question: same("Should we fund isolation, resilient power, alternate communications, secure remote maintenance, sovereign hosting, spare parts, alternative suppliers, fuel reserve, or redundancy?"), provides: same("Comparable options that show which investment reduces mission risk most, and where additional spend stops materially improving resilience.") },
    { name: same("Can we change safely?"), question: same("Can we change a firewall, remote-support architecture, generator-control configuration, identity boundary, carrier route, or controller firmware without reducing readiness or continuity?"), provides: same("A virtual experiment showing operating flows preserved, routes closed, residual dependencies, rollback needs, and recovery consequences.") },
    { name: same("What can we leave alone?"), question: same("Which legacy system, supplier dependency, or constrained asset can stay in service under compensating controls until replacement — without silently creating an operational gap?"), provides: same("A traceable risk-acceptance record with owner, mission rationale, compensating controls, supply assumptions, review trigger, and sunset date.") }
  ]
};

export const WORKED_EXAMPLE = {
  h2: same("Worked example: preserve a sovereign operations center through a compound power and cyber event."),
  tag: same("Illustrative scenario — no operational, customer, or classified data"),
  scenario: same(
    "A sovereign government operations center supports crisis coordination and hosts sensitive digital services. It has dual utility feeds, UPS systems, generators, fuel storage, BMS, EPMS, secure communications, and a controlled vendor-support arrangement for generator and electrical-management systems. The facility is designed for loss of a utility feed. However, the support vendor's remote connection reaches a facilities engineering workstation that has access paths toward BMS/EPMS management systems. At the same time, regional disruption creates a realistic risk of utility instability and delayed fuel deliveries. The question is not merely whether the vendor path is \"insecure.\" It is: can the facility sustain essential operations through a grid event if the control and recovery pathway is compromised at the same time?"
  ),
  inputs: [
    { category: same("Mission and continuity evidence"), items: same("Essential-government functions supported, minimum operating requirements and prioritized service tiers, alternate-site and workload-transfer assumptions, crisis staffing and escalation authority, continuity plans and recovery objectives.") },
    { category: same("Facility and OT engineering evidence"), items: same("Single-line electrical diagrams, utility-feed/generator/UPS/battery/transfer-switch dependencies, fuel storage and burn rate, BMS/EPMS architecture, HVAC/access-control/fire-life-safety dependencies, MOPs, SOPs, EOPs, maintenance records.") },
    { category: same("Cyber and access-path evidence"), items: same("Vendor remote support, jump hosts, privileged accounts, MFA and session controls, engineering workstations, BMS/EPMS servers, controllers and relays, IT/OT segmentation, firmware, certificates, backups, recovery media.") }
  ],
  chain: [
    same("Regional utility instability + compromised vendor remote-support endpoint"),
    same("Facilities engineering path becomes reachable"),
    same("BMS/EPMS visibility or generator-control-management functions are impaired"),
    same("Standby-power response and operator situational awareness are degraded"),
    same("Fuel, cooling, secure communications, and critical-service capacity become constrained"),
    same("Essential-government workload prioritization and alternate-site decisions are triggered")
  ],
  controls: [
    { option: same("Remove all remote vendor access"), evaluates: same("Impact on fault diagnosis, emergency generator support, and repair time during a prolonged disruption"), outcome: same("Reduces exposure but may create recovery risk if local expertise or spares are insufficient") },
    { option: same("Introduce sovereign brokered access"), evaluates: same("Named accounts, MFA, local authorization, just-in-time access, session recording, command restrictions, and access expiry"), outcome: same("Retains controlled support without a persistent external pathway") },
    { option: same("Segment facility-management systems"), evaluates: same("Separate vendor access, engineering tools, BMS/EPMS, electrical-control management, monitoring, and protected operations networks"), outcome: same("Shows which control and monitoring flows must remain while closing high-consequence routes") },
    { option: same("Create local recovery independence"), evaluates: same("Tested clean backups, local configuration repositories, offline runbooks, break-glass procedures, manual control capability, and trained local staff"), outcome: same("Reduces reliance on a network, vendor, or cloud service during crisis") },
    { option: same("Improve fuel and logistics resilience"), evaluates: same("Change fuel stock, delivery contracts, alternate suppliers, route assumptions, or generator priority policy"), outcome: same("Reveals whether the actual endurance constraint is cyber, fuel, staffing, cooling, or utility restoration") },
    { option: same("Reprioritize essential services"), evaluates: same("Service tiers, capacity constraints, alternate-site failover, and protected workloads"), outcome: same("Provides leadership with a transparent, pre-agreed restoration and load-priority decision") }
  ],
  result: same(
    "The result is not a generic security recommendation. It is a sovereign continuity plan: isolate the reachable management path, retain controlled support under national authority, prove local recovery can work without external access, and prioritize fuel, power, cooling, communications, and workloads according to mission effect."
  )
};

export const AIR_GAP = {
  h2: same("Air-gapped by design. Sovereign by operation."),
  body: same(
    "Deploy the Cyber Digital Twin inside your controlled environment. Build the model from approved engineering exports and evidence — without connecting to live controllers, actively scanning operational networks, or exporting sensitive operational data."
  ),
  modes: [
    { name: same("Island Mode"), body: same("Fully isolated deployment on customer-controlled infrastructure. No internet connection, no outbound telemetry, no direct access to PLCs, RTUs, controllers, or live OT networks.") },
    { name: same("Inbound Intelligence Mode"), body: same("Approved threat or vulnerability updates delivered through a one-way data diode — intelligence flows in; nothing customer-related flows out.") },
    { name: same("Dedicated Sovereign Instance"), body: same("Single-tenant deployment within a customer-approved sovereign environment, aligned to classification and sovereignty requirements.") }
  ],
  offline: [
    same("Model the environment: facility/process model, assets, control logic, PLC/SCADA/HMI configurations, Purdue zones, OT topology, dependencies, safety/reliability context."),
    same("Trace cyber pathways through the imported topology, routes, segmentation rules, and observed/passively captured network flows."),
    same("Test a change — firewall, segmentation, patch, vendor-access, control-system, or procurement — virtually, before it touches the live environment."),
    same("Prioritize decisions: NOW / NEXT / NEVER, based on consequence and reachability."),
    same("Generate evidence: engineering views, risk decisions, BOMs, dependency maps, technical documentation, and traceable rationale for assurance or leadership review.")
  ],
  caveat: same(
    "“Air-gapped” is not presented as automatically risk-free. Its effectiveness depends on the full operational boundary — removable media, contractor laptops, maintenance tooling, temporary connections, engineering workstations, supply-chain updates, and authorized cross-domain processes can all create pathways. OXOT's role is to model those pathways and their consequences, retaining source provenance and showing unsourced fields as empty rather than invented."
  )
};

export const CASE_STUDIES = {
  h2: same("A stricter publication model for defense and government evidence."),
  intro: same(
    "The goal is to demonstrate realism without exposing sensitive architecture, operations, or customer identity."
  ),
  rules: [
    same("Customer approval and classification/security review before publication."),
    same("Default to anonymized capability cases, not named systems."),
    same("No detailed network topology, facility layouts, access-control rules, operating schedules, locations, vendor accounts, or recovery thresholds."),
    same("Describe the decision, modeling method, and outcome — not sensitive system design."),
    same("State scale only when approved, using bounded descriptors such as “multi-site estate” or “high-availability sovereign facility.”"),
    same("Use synthetic diagrams and modified data values while preserving the logic of the decision.")
  ],
  categories: [
    { name: same("Sovereign data-center continuity"), question: same("Can a common BMS/EPMS, vendor, or cooling dependency compromise multiple resilient power/cooling paths?") },
    { name: same("Base energy resilience"), question: same("Which cyber, fuel, generator, and utility dependencies limit endurance during crisis?") },
    { name: same("Airfield operational support"), question: same("Which control, power, fuel, communications, and facility dependencies limit safe airfield operations?") },
    { name: same("Port and military-mobility resilience"), question: same("What cyber and supply dependencies delay force movement through a port or logistics hub?") },
    { name: same("Secure vendor-access redesign"), question: same("How can OEM support remain available without persistent reachability to sensitive facilities OT?") },
    { name: same("High-risk technology transition"), question: same("Which systems, spares, certificates, vendor tools, and support dependencies must be replaced or isolated first?") },
    { name: same("Crisis communications continuity"), question: same("What happens when a telecom disruption coincides with a facility or identity-service issue?") },
    { name: same("Defense industrial maintenance resilience"), question: same("Which process, tooling, quality, supplier, and energy dependencies can interrupt readiness or replenishment?") },
    { name: same("Civil-military dependency exercise"), question: same("What competing priorities emerge for fuel, power, water, roads, telecoms, and skilled personnel in a national crisis?") },
    { name: same("Sovereign cloud isolation boundary"), question: same("Can facility support, identity, monitoring, or vendor operations cross a restricted workload boundary?") }
  ]
};

export const CAPABILITIES = {
  h2: same("A sovereign digital twin for capability, infrastructure, and recovery decisions."),
  items: [
    { name: same("Mission-to-infrastructure mapping"), body: same("Connects essential government functions and mission-enabling capabilities to facilities, OT, communications, suppliers, personnel, and recovery requirements.") },
    { name: same("Facility and infrastructure model"), body: same("Represents power, fuel, water, HVAC, BMS/EPMS, data centers, physical security, industrial systems, and site operating limits.") },
    { name: same("Cyber-pathway and zone model"), body: same("Maps OT/IT boundaries, remote support, privileged access, network segmentation, management paths, configuration relationships, and actual reachability.") },
    { name: same("Dependency and mobilization model"), body: same("Relates civil infrastructure, vendors, logistics, workforce, spares, fuel, communications, cloud, and allied interfaces to required capability.") },
    { name: same("Supply-chain provenance model"), body: same("Uses software, hardware, cryptographic, SaaS, and operations BOMs to identify inherited dependency, firmware, certificate, vendor, and human-workflow exposure.") },
    { name: same("Hybrid-event simulation"), body: same("Tests cyber plus power, weather, physical disruption, telecom loss, supply interruption, or personnel constraint — before a crisis.") },
    { name: same("Investment and prioritization model"), body: same("Compares resilient power, alternate communications, access redesign, local recovery, supplier diversification, spares, and modernization options.") },
    { name: same("Evidence and decision provenance"), body: same("Links each modelled value and recommendation to source engineering data, operating procedures, contracts, configuration evidence, and external intelligence.") },
    { name: same("Sovereign deployment options"), body: same("Supports isolated/on-premises operation, one-way intelligence ingestion via data diode, or dedicated customer-controlled deployment, aligned to classification and sovereignty requirements.") }
  ]
};

export const REGULATORY = {
  h2: same("Support assurance without reducing sovereignty to a checkbox."),
  intro: same(
    "Most national-defense organizations operate separate security, classification, procurement, export-control, safety, and assurance regimes. OXOT does not claim that NIS2, IEC 62443, or any civilian framework automatically applies to military systems, or substitutes for national-security controls. OXOT provides an evidence model that can support the organization's applicable national security, defense assurance, OT-security, resilience, supplier-security, and continuity requirements."
  ),
  rows: [
    { framework: same("National-defense security requirements"), relevance: same("Defense organizations typically operate under national classification, security-accreditation, operational-security, procurement, and assurance regimes."), support: same("Supports controlled, source-traceable infrastructure, dependency, access-path, and recovery evidence; deployment must align to the organization's security authority.") },
    { framework: same("NATO cyber defense and resilience"), relevance: same("NATO emphasizes cyber resilience, freedom of action in cyberspace, protection of networks, interoperability, and national resilience."), support: same("Supports cross-domain dependencies, resilience scenarios, operational continuity, risk prioritization, and exercise planning.") },
    { framework: same("NATO public-private resilience guidance"), relevance: same("Encourages whole-of-government coordination, critical-supplier visibility, civil-military collaboration, cross-sector dependency analysis, continuity and crisis exercises."), support: same("Models dependencies among government, military, utilities, telecoms, logistics, suppliers, and civilian services.") },
    { framework: same("NIS2 and national implementation"), relevance: same("May apply to government-linked entities, digital infrastructure providers, civil critical-infrastructure operators, and suppliers; national-security exclusions and national law matter."), support: same("Supports risk-management, asset, supply-chain, continuity, access-control, incident, and governance evidence where applicable."), href: "assurance" as const },
    { framework: same("CER Directive and national resilience regimes"), relevance: same("Focuses on critical-entity resilience against natural and human-made risks, with security/national-defense scope determined by national implementation."), support: same("Supports cross-sector consequence and dependency mapping, resilience scenarios, and continuity planning.") },
    { framework: same("IEC 62443"), relevance: same("Useful technical basis for OT, IACS, BMS/EPMS, utilities, industrial facilities, and supplier/system lifecycle practices."), support: same("Supports zones/conduits, system modeling, risk analysis, control evidence, and cyber change decisions."), href: "assurance" as const },
    { framework: same("NIST SP 800-82 / NIST CSF"), relevance: same("Often relevant for government/defense-adjacent OT programs, especially in US-aligned contexts."), support: same("Supplies OT-specific system, dependency, and risk evidence that can feed broader cybersecurity governance.") },
    { framework: same("Supply-chain and technology-sovereignty policy"), relevance: same("Increasingly central to procurement, high-risk supplier management, secure-by-design requirements, and sustaining capability through crisis."), support: same("Maps vendor concentration, BOMs, certificate/firmware dependencies, spares, support routes, migration options, and mission consequence.") },
    { framework: same("Cyber Resilience Act"), relevance: same("Relevant primarily to covered products with digital elements placed on the EU market; not a substitute for defense accreditation, and exemptions/scopes must be assessed legally."), support: same("Supports product and component evidence, BOM traceability, vulnerability/change context, and technical-documentation workflows where applicable.") }
  ]
};

export const ENGAGEMENT = {
  h2: same("Start with one essential function, one operational site, or one dependency chain."),
  items: [
    { name: same("Sovereign Resilience Decision Sprint"), useCase: same("A high-consequence facility, remote-access path, fuel/power dependency, data-center control environment, or continuity question"), output: same("Notional/approved model, dependency cascade, candidate controls, recovery sequence, leadership decision brief") },
    { name: same("Mission-Support Twin Build"), useCase: same("Base, airfield-support environment, port/logistics site, sovereign data center, government operations center, depot, or industrial-support facility"), output: same("Validated Cyber Digital Twin, mission-to-infrastructure map, priority decisions, exercise-ready scenarios, evidence package") },
    { name: same("Hybrid Resilience Exercise"), useCase: same("Cyber plus utility outage, fuel/logistics disruption, telecom loss, weather event, supplier withdrawal, or physical-access incident"), output: same("Scenario playbook, decision points, minimum operating requirements, recovery sequence, gaps and investment roadmap") },
    { name: same("Technology Sovereignty Assessment"), useCase: same("High-risk components, supplier exit, cloud/remote-support reliance, firmware lifecycle, control-system modernization, or restricted-workload isolation"), output: same("Dependency/BOM analysis, replacement and compensating-control strategy, supplier-risk sequence") },
    { name: same("Continuous Sovereign Twin Operations"), useCase: same("Multi-site estate with evolving threat, supplier, infrastructure, operational, and geopolitical context"), output: same("Risk deltas, change testing, supply-chain monitoring, resilience reporting, exercise and investment support") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one essential function and the infrastructure that makes it possible."),
  body: same(
    "Bring a site diagram, single-line electrical drawing, P&ID, BMS/EPMS architecture, dependency map, asset list, or a proposed change. OXOT will show how the Cyber Digital Twin can trace the pathway, rehearse the cascade, and support a sovereign resilience decision before the live environment is changed."
  ),
  ctaPrimary: same("Discuss a sovereign resilience scenario"),
  ctaSecondary: same("Explore the sovereign-system model")
};
