/**
 * WATER & WASTEWATER — content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_water.md, which is finished,
 * ready-to-use copy, not an outline. Restructured into the sections this
 * page's own layout uses (see page.tsx's section order and WaterSpine.tsx's
 * doc comment for the "process-flow spine" design direction), not a verbatim
 * reprint of the source file's own headings.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that this is correct Dutch. See
 * registry.ts's own doc comment.
 *
 * Cross-references to pages the source file assumes exist (/platform/
 * decisions/fix-first, /assurance/iec-62443, /assurance/nis2, /resources/
 * technical-specification) are retargeted to what's real today: /cdt-2#decide,
 * /assurance (EN) or /consulting (NL), /technical-specification (EN) or
 * /cdt-2 (NL), /consulting, /contact — same retargeting map energy-utilities
 * used.
 */
import { same } from "../registry";
import type { SystemAsset } from "@/components/twin/types";

export const META = {
  title: "Water & Wastewater OT Cybersecurity Digital Twin",
  description:
    "Protect drinking water, wastewater treatment, and remote field assets. OXOT's Cyber Digital Twin connects process controls, SCADA pathways, cyber risk, and public-health or environmental consequences."
};

export const HERO = {
  h1: same("Protect safe water and sanitation—before a cyber incident becomes a public-health event."),
  lead: same(
    "OXOT's Cyber Digital Twin connects treatment processes, field automation, SCADA pathways, and operational consequences. Test a change, prioritize the risks that can affect water quality or environmental compliance, and improve resilience without touching the live process."
  ),
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("See how the Twin works"),
  /* The source brief specifies an interactive hero visual — a switchable
     source-to-tap / influent-to-effluent diagram with four synchronized
     views. Not built anywhere on this site yet, so it renders as a static,
     well-designed illustration instead of being skipped: two labelled
     process chains plus a static row depicting the (non-functional) view
     switch. */
  drinkingChain: [same("Source"), same("Intake"), same("Treatment"), same("Clearwell"), same("Pumping"), same("Distribution"), same("Customers")],
  wastewaterChain: [same("Collection"), same("Lift station"), same("Headworks"), same("Biological treatment"), same("Disinfection"), same("Effluent / reuse"), same("Receiving water")],
  controls: [
    same("Pump controls"), same("Chemical dosing skids"), same("Analyzers"), same("PLCs"), same("RTUs"),
    same("SCADA"), same("Telemetry"), same("Radio / cellular links"), same("Remote engineering access")
  ],
  views: [same("Water process"), same("OT / SCADA paths"), same("Cyber route"), same("Public-health / compliance impact")],
  visualNote: same(
    "A cyber route into a water system can alter dosing, disable monitoring, cause a pump overflow, prevent treatment, or obscure an out-of-spec condition — not merely stop a production line."
  ),
  /* Per-view captions for the interactive switcher below. View 2 (Cyber
     route) deliberately does NOT duplicate scenario text here — WaterHero
     reads SCENARIOS.items[0] live instead, so the two stay in sync rather
     than drifting if the scenario library changes later. Views 0/1/3 are
     original captions, but every fact in them is already stated elsewhere
     on this page — no new claims introduced. */
  viewFocus: [
    same("The physical route the Twin models — source or influent, through treatment, to customer or receiving water."),
    same("The same route with its control layer surfaced: every element a vendor, integrator, or attacker could reach."),
    same(""),
    same("What's actually at stake if a route resolves badly — not a generic outage, a water-quality or environmental one.")
  ],
  /* Extracted verbatim from visualNote above, as short tags — not new
     content, just a second rendering of the same real consequence list. */
  impactTags: [same("Altered dosing"), same("Disabled monitoring"), same("Pump overflow"), same("Obscured out-of-spec condition")]
};

export const SECTOR_REALITY = {
  h2: same("A cyber incident can affect the quality of water, the environment, and the community—at the same time."),
  bodyOne: same(
    "Water systems are both highly physical and highly distributed. A utility may operate treatment plants, reservoirs, booster stations, lift stations, well fields, storage tanks, wastewater facilities, remote telemetry units, chemical systems, laboratories, and thousands of miles of distribution or collection infrastructure. Many assets operate unattended and communicate through radio, cellular, leased-line, satellite, or internet-connected remote-access arrangements."
  ),
  bodyTwo: same(
    "The operational consequence is distinctive. In drinking water, the concern may be inadequate disinfection, excessive chemical dosing, loss of pressure, loss of source monitoring, or inability to confirm water quality. In wastewater, it may be untreated discharge, sewer overflow, pump-station failure, aeration disruption, permit exceedance, damage to biological treatment, or an inability to maintain compliant effluent."
  ),
  statNote: same(
    "CISA reported a significant increase in cyber actors targeting PLCs in the water and wastewater sector in 2026, including cases in which exposed controllers had passwords changed or IP addresses altered, locking operators out and disrupting operations."
  ),
  challenges: [
    { term: same("Distributed, unattended assets"), body: same("Remote pump stations, lift stations, wells, reservoirs, tanks, and outfalls may be geographically dispersed and depend on low-bandwidth or intermittent communications.") },
    { term: same("Direct physical-process consequences"), body: same("A manipulated dosing skid, chlorine residual setpoint, pH controller, valve, pump, or aeration system can affect water quality, treatment performance, or environmental discharge.") },
    { term: same("Public-health and environmental obligations"), body: same("Operators must protect consumers and receiving waters while meeting regulatory, permit, monitoring, and reporting requirements.") },
    { term: same("Small OT teams"), body: same("Many utilities have limited in-house cyber, SCADA, engineering, and incident-response capacity, with substantial reliance on integrators and vendors.") },
    { term: same("Aging, long-lived automation"), body: same("Legacy PLCs, RTUs, radios, HMIs, dial-up/cellular equipment, unsupported operating systems, and thin documentation are common.") },
    { term: same("Manual-operating dependency"), body: same("Manual operation may be possible but difficult, staffing-intensive, slower, or unsafe—especially across multiple remote facilities.") },
    { term: same("Chemical-process risk"), body: same("Chlorine, sodium hypochlorite, ammonia, coagulants, polymers, lime, fluoride, acids, caustics, and other treatment chemicals create handling, dosing, and containment concerns.") },
    { term: same("Weather and power resilience"), body: same("Flooding, drought, wildfire, storm damage, power loss, and telecom outages frequently coincide with peak operational demand.") },
    { term: same("Contractor and OEM access"), body: same("Integrators and equipment vendors often remotely support PLCs, telemetry, dosing equipment, UV systems, VFDs, analysers, and SCADA platforms.") },
    { term: same("Municipal IT interdependence"), body: same("Water OT may share identity, remote access, network services, procurement, facilities, and incident-response functions with broader city or county IT.") }
  ]
};

export const ARCHITECTURE = {
  h2: same("Model the treatment process and the remote field estate together."),
  intro: same(
    "Drinking water and wastewater are two distinct systems that share the same SCADA and telemetry layers. On the Twin they read as two stops along one physical route rather than a side-by-side comparison — the same field estate, control layer, and communications carrying two different processes and two different consequence sets."
  ),
  drinking: {
    label: same("Stop 1 — Drinking water"),
    stages: [
      { name: same("Source / raw water"), body: same("Rivers, reservoirs, groundwater wells, intakes.") },
      { name: same("Treatment"), body: same("Screens, coagulation, flocculation, sedimentation, filtration, disinfection, pH adjustment, fluoridation, clearwell.") },
      { name: same("Storage and distribution"), body: same("High-service pumps, reservoirs, tanks, pressure zones, PRVs, booster stations, meters, pressure / chlorine residual monitoring.") },
      { name: same("Control and operations"), body: same("PLCs, RTUs, VFDs, HMIs, SCADA, historian, laboratory systems.") },
      { name: same("Communications"), body: same("Plant LAN, radio, cellular, private WAN, fiber, leased lines, VPN.") }
    ]
  },
  wastewater: {
    label: same("Stop 2 — Wastewater"),
    stages: [
      { name: same("Collection system"), body: same("Gravity sewer, force main, lift station, wet well, level instrumentation.") },
      { name: same("Headworks and primary treatment"), body: same("Screens, grit removal, primary clarifiers, pumps.") },
      { name: same("Biological treatment"), body: same("Aeration blowers, basins, DO / ammonia / nitrate analysers, RAS / WAS pumps, clarifiers, nutrient removal controls.") },
      { name: same("Tertiary treatment and disinfection"), body: same("Filtration, UV, chlorine / dechlorination, reuse systems.") },
      { name: same("Solids and biosolids"), body: same("Thickening, digestion, dewatering, biogas, storage / disposal.") },
      { name: same("Control and monitoring"), body: same("PLCs, RTUs, SCADA, HMI, historian, alarms, remote telemetry.") }
    ]
  },
  techTable: [
    { area: same("Plant control"), examples: same("PLCs, PACs, RTUs, VFDs, MCCs, HMIs, local panels, SCADA servers, engineering workstations") },
    { area: same("Remote telemetry"), examples: same("Radio, cellular, licensed/unlicensed spectrum, satellite, serial telemetry, microwave, leased lines, VPN-based remote sites") },
    { area: same("Common protocols"), examples: same("Modbus RTU/TCP, DNP3, OPC DA/UA, EtherNet/IP, PROFINET, BACnet, MQTT, serial-to-IP gateways, proprietary radio protocols") },
    { area: same("Water quality instrumentation"), examples: same("Turbidity, pH, conductivity, chlorine residual, ORP, fluoride, UV transmittance, flow, level, pressure, temperature, TOC") },
    { area: same("Wastewater instrumentation"), examples: same("Flow, level, dissolved oxygen, ammonia, nitrate/nitrite, pH, ORP, turbidity, MLSS, sludge blanket, biogas methane/H₂S") },
    { area: same("Critical actuation"), examples: same("Pumps, valves, gates, VFDs, chemical metering pumps, blowers, mixers, UV banks, chlorinators, polymer systems, belt presses") },
    { area: same("Operations systems"), examples: same("Historian, alarm-management platform, CMMS/EAM, laboratory information systems, GIS, hydraulic-modeling tools, work-order systems") },
    { area: same("Physical process evidence"), examples: same("P&IDs, process-flow diagrams, electrical single-lines, pump curves, chemical dosing calculations, control narratives, alarm rationalization, SOPs, maintenance history, permit limits") }
  ],
  twinNote: same(
    "The Twin can combine P&IDs, process and equipment data, PLC/SCADA/RTU/HMI configurations, network topology, passive traffic evidence, industrial protocol information, and operational safety/reliability inputs."
  )
};

export const SCENARIOS = {
  h2: same("Trace a cyber route to a water-quality, flooding, or permit consequence."),
  intro: same(
    "Unlike a generic OT vertical, these routes are tied to water chemistry, hydraulics, treatment barriers, and environmental compliance — not to a stopped production line."
  ),
  items: [
    { title: same("Publicly exposed PLC or RTU"), pathway: same("Internet-exposed controller, weak remote-access path, default/shared credentials, or insecure cellular/radio gateway."), impact: same("Operator lockout, altered setpoints, stopped pump, unavailable telemetry, inability to manage a remote facility."), decision: same("Remove direct exposure; model secure gateway/VPN, allowlists, backup and recovery requirements.") },
    { title: same("Drinking-water chemical dosing manipulation"), pathway: same("Path reaches chlorine, hypochlorite, fluoride, coagulant, pH, caustic, acid, or chemical-feed PLC/HMI."), impact: same("Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk."), decision: same("Map control points and safety barriers; test restricted engineering access and segment chemical systems.") },
    { title: same("Loss of disinfection visibility"), pathway: same("Compromise disrupts analyser data, SCADA alarms, historian, PLC/HMI, or communications."), impact: same("Utility cannot confirm residual, turbidity, UV performance, or treatment state; may need boil-water or operational response."), decision: same("Identify required telemetry paths, fail-safe conditions, backup measurement and manual-operating actions.") },
    { title: same("Wastewater lift-station outage"), pathway: same("Remote RTU, VFD, level sensor, or communications path is unavailable or manipulated."), impact: same("Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting."), decision: same("Identify reachable field assets, power/telemetry dependencies, and safe fallback controls.") },
    { title: same("Aeration-process disruption"), pathway: same("PLC/VFD/blower control, dissolved-oxygen loop, or plant HMI is altered."), impact: same("Nitrification failure, elevated ammonia, biological-process upset, permit exceedance, prolonged recovery."), decision: same("Test segmentation, control-lockdown, and fallback operating strategies.") },
    { title: same("Pump / pressure-zone manipulation"), pathway: same("Remote pump, VFD, PRV, valve, or pressure controller is affected."), impact: same("Low pressure, tank overflow, pressure transient, service disruption, possible contamination ingress risk."), decision: same("Model hydraulic and operational implications of control changes before implementation.") },
    { title: same("Ransomware in the SCADA/utility environment"), pathway: same("Enterprise compromise reaches SCADA servers, historian, domain services, engineering workstations, file shares, or remote-access infrastructure."), impact: same("Loss of view/control, manual operation, delayed response, degraded coordination across multiple facilities."), decision: same("Prioritize recovery dependencies and safe isolation steps.") },
    { title: same("Vendor / integrator compromise"), pathway: same("Vendor laptop, support portal, remote-maintenance tunnel, or system-integrator account reaches plant or field controls."), impact: same("Persistent unauthorized path, configuration changes, disrupted support, fleet-wide exposure across standardized assets."), decision: same("Compare vendor-access architectures and contract/control requirements.") },
    { title: same("Storm, flood, or power outage plus cyber disruption"), pathway: same("Weather event reduces staffing, power, fuel, and telecom reliability while a cyber incident affects OT visibility or control."), impact: same("Compounded inability to pump, treat, monitor, communicate, or recover."), decision: same("Model combined failure paths, manual workarounds, backup power, communications, and restoration priorities.") },
    { title: same("Undocumented field-asset drift"), pathway: same("Replacement RTU, modem, PLC, VFD, or radio configuration is changed during field maintenance without full documentation."), impact: same("Security model and operating assumptions become inaccurate; new remote route or unsafe configuration persists."), decision: same("Detect model deltas and re-evaluate reachability and operational impact.") }
  ],
  citation: same(
    "EPA and CISA guidance emphasizes direct PLC internet exposure as a concrete sector risk. CISA recommends removing public exposure, using a VPN or gateway rather than direct PLC access, protecting credentials, allowing only known authorized engineering assets, and maintaining clean PLC-image backups."
  )
};

export const DECISIONS = {
  h2: same("Four decisions that protect treatment, distribution, and environmental compliance."),
  items: [
    { name: same("What do we fix first?"), question: same("Which cyber pathway can affect treatment quality, disinfection, pumping, overflow risk, process monitoring, or permit compliance?"), provides: same("A NOW / NEXT / NEVER prioritization based on reachable control points and process/public-health/environmental consequence.") },
    { name: same("What should we spend?"), question: same("Should we fund secure remote access, SCADA replacement, field-RTU modernization, network segmentation, backup communications, additional instrumentation, or generator capacity?"), provides: same("A common consequence model for comparing capital and operational investments—not a generic security score.") },
    { name: same("Can we change safely?"), question: same("Can we reconfigure this firewall, remote pump-station connection, VLAN, PLC firmware, SCADA server, or chemical-dosing network without losing monitoring or control?"), provides: same("A virtual test of required data/control flows, residual exposure, failover requirements, and process impact.") },
    { name: same("What can we leave alone?"), question: same("Which legacy asset is isolated, has limited operational consequence, or can safely wait for planned renewal—with a documented review trigger?"), provides: same("A defensible exception record tied to actual reachability, treatment consequence, owner, compensating controls, and reassessment conditions.") }
  ],
  note: same(
    "The decision framework is useful in water because it can connect a reachable pathway to the physical process, then classify remediation as NOW, NEXT, or NEVER rather than letting a generic CVSS backlog determine operational priorities."
  )
};

export const WORKED_EXAMPLE = {
  h2: same("Worked example: secure chemical-dosing control without compromising water quality."),
  tag: same("Illustrative scenario — no customer data"),
  scenario: same(
    "A drinking-water treatment plant uses a PLC-controlled sodium-hypochlorite dosing skid. The dosing sequence relies on incoming flow, chlorine-residual feedback, pump status, chemical-tank level, and high/low alarm conditions. The PLC and local HMI are accessible through a maintenance network that also supports a system integrator's remote troubleshooting connection."
  ),
  scenarioTwo: same(
    "A cybersecurity review finds that the remote connection has broad access to the plant network and that the chemical-dosing PLC is reachable through an outdated pathway. The simple recommendation is “disconnect the access.” Operations objects: the integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously."
  ),
  inputs: [
    { category: same("Treatment-process evidence"), items: same("Process-flow diagram and P&IDs, dosing-control narrative and interlocks, chemical dosing calculations and acceptable operating range, residual-monitoring points and sampling requirements, clearwell/contact-time/treatment operating constraints, emergency operating procedures and manual-dosing capability") },
    { category: same("OT and network evidence"), items: same("Chemical PLC, local HMI, VFD / metering-pump controls, SCADA data flow and alarm dependencies, engineering workstation and vendor-access route, firewall, VLAN, routing, remote gateway, and observed OT traffic, existing backups, PLC project files, and recovery procedure") },
    { category: same("Operational-consequence evidence"), items: same("Water-quality escalation thresholds, loss-of-treatment and service-impact assumptions, staff response time, operator coverage, and manual operating limitations, relevant regulatory and notification obligations") }
  ],
  chain: [
    same("Compromised vendor credentials / remote-support endpoint"),
    same("Maintenance network route"),
    same("Chemical-dosing PLC or engineering workstation becomes reachable"),
    same("Setpoint, logic, mode, or pump-state manipulation becomes possible"),
    same("Inadequate or excessive disinfection / loss of treatment verification"),
    same("Water-quality event, emergency response, service disruption, public-health risk")
  ],
  controls: [
    { option: same("Disconnect remote support"), evaluates: same("Whether fault recovery, calibration, or emergency assistance becomes operationally unacceptable"), outcome: same("May lower cyber exposure but increase recovery and continuity risk") },
    { option: same("Broker vendor access"), evaluates: same("MFA, approval, time-limited sessions, jump host, recording, per-asset access, and removal of persistent connectivity"), outcome: same("Preserves necessary support while removing uncontrolled reachability") },
    { option: same("Segment the chemical skid"), evaluates: same("Virtual firewall rules and conduit design between vendor path, engineering workstation, SCADA, and dosing PLC"), outcome: same("Shows required process/monitoring flows and the routes that can be safely closed") },
    { option: same("Harden the controller"), evaluates: same("Password protection, clean PLC-image backup, restricted programming path, allowlisting, and change-control workflow"), outcome: same("Reduces takeover/lockout risk and improves recovery readiness") },
    { option: same("Add process safeguards"), evaluates: same("Independent alarming, local/manual fallback, separate measurement verification, or operating procedure changes"), outcome: same("Shows which controls reduce consequence if cyber protections fail") }
  ],
  result: same(
    "The recommendation is not merely “secure the PLC.” It is a water-quality decision: reduce unauthorized reachability, preserve controlled technical support, verify that SCADA and alarms still function, and ensure operators can maintain compliant disinfection if digital control is unavailable."
  ),
  citation: same(
    "This example closely reflects the sector threat pattern CISA has highlighted: internet-exposed PLCs can be used to lock operators out or change device configuration, while water utilities must preserve the ability to monitor and control treatment safely."
  )
};

/**
 * Real per-asset-type inventory for the Asset-Class Bento pattern
 * (OXOT_Layout_Styles.md §3) — Industries pages' "applications" sections are
 * explicitly this pattern, not a generic capability list. Every asset below
 * is sourced from this page's own real content (see the citation table in
 * the approved build plan, 2026-08-24), reusing `WaterScenarioDiagram.tsx`'s
 * already-typed `dosing-plc` and `remote-support-endpoint` assets exactly
 * rather than re-deriving conflicting criticality judgments for the same
 * named things. Nothing here is fabricated.
 */
export const SYSTEM_ASSETS = {
  h2: same("The real assets a water or wastewater Twin models."),
  intro: same(
    "One inventory, nine asset classes — grouped by how much a compromise of that class actually costs the process, not by how much was written about it."
  ),
  assets: [
    {
      id: "chemical-dosing-skid",
      type: "process-equipment",
      label: "Chemical dosing skid",
      description: "Chlorine, hypochlorite, coagulant, pH, or fluoride dosing equipment — a manipulated skid can directly affect water quality or treatment performance.",
      criticality: "critical"
    },
    {
      id: "chlorine-residual-analyzer",
      type: "field-device",
      label: "Chlorine residual analyzer",
      description: "Water-quality instrumentation confirming disinfection is holding — turbidity, pH, ORP, and residual measurement.",
      criticality: "important"
    },
    {
      id: "dosing-plc",
      type: "controller",
      label: "Chemical-dosing PLC",
      description: "Chemical-dosing PLC or engineering workstation becomes reachable.",
      criticality: "critical"
    },
    {
      id: "local-hmi",
      type: "hmi",
      label: "Local HMI",
      description: "The operator interface co-located with the dosing PLC, reachable through the same maintenance network.",
      criticality: "important"
    },
    {
      id: "engineering-workstation",
      type: "engineering-workstation",
      label: "Engineering workstation",
      description: "Plant-control engineering access — PLC programming, configuration, and vendor-support entry point.",
      criticality: "important"
    },
    {
      id: "scada-server",
      type: "network-device",
      label: "SCADA server",
      description: "Plant-control data flow and alarm dependencies — historian, alarm management, and remote telemetry pass through here.",
      criticality: "important"
    },
    {
      id: "remote-support-endpoint",
      type: "remote-access",
      label: "Vendor remote-support endpoint",
      description: "Compromised vendor credentials / remote-support endpoint.",
      criticality: "important"
    },
    {
      id: "dosing-alarm-interlock",
      type: "safety-function",
      label: "High/low dosing alarm interlock",
      description: "Independent alarming and chemical-tank level/high-low conditions — the last barrier if digital dosing control fails.",
      criticality: "critical"
    },
    {
      id: "historian",
      type: "service",
      label: "Historian",
      description: "Operations system recording plant history — alarm-management platform, CMMS/EAM, and laboratory information systems share this tier.",
      criticality: "context"
    }
  ] satisfies SystemAsset[]
};

export const CAPABILITIES = {
  h2: same("One model spanning source, treatment, field assets, and recovery."),
  items: [
    { name: same("Process and treatment model"), body: same("Represents source-to-tap or influent-to-effluent pathways, chemical treatment, pumps, tanks, biological systems, disinfection, and key operating boundaries.") },
    { name: same("Field-estate and telemetry model"), body: same("Maps pump stations, lift stations, reservoirs, wells, remote RTUs, modems, radio/cellular links, and their operational dependencies.") },
    { name: same("SCADA and control-path model"), body: same("Links PLCs, RTUs, VFDs, HMIs, SCADA, historians, engineering workstations, alarms, and remote support to the process they control.") },
    { name: same("Hydraulic and process-consequence model"), body: same("Helps reason through operational effects such as overflow, low pressure, loss of treatment, loss of monitoring, aeration upset, or dosing deviation.") },
    { name: same("Cyber pathway and change simulation"), body: same("Tests segmentation, secure remote access, controller hardening, SCADA changes, radio/cellular network changes, and recovery controls before live deployment.") },
    { name: same("Resilience and recovery view"), body: same("Identifies dependencies on power, communications, staffing, clean backups, manual operation, chemicals, spares, and external integrators.") },
    { name: same("Evidence and assurance output"), body: same("Provides traceable risk decisions, architecture views, operational evidence, and regulatory/board-ready reporting from one model.") }
  ],
  note: same(
    "The Cyber Digital Twin supports facility-physics, asset, network, data-fusion, and governance layers, along with synchronized P&ID, Purdue, network, dependency-graph, and 3D views. It can produce risk deltas, BOM outputs, engineering visualizations, and compliance-oriented technical files."
  )
};

export const REGULATORY = {
  h2: same("Support safe-water and environmental-resilience evidence from the same operating model."),
  intro: same(
    "OXOT does not promise automatic compliance. The Twin supports risk assessment, evidence creation, traceability, scenario testing, recovery planning, and decision documentation."
  ),
  rows: [
    { framework: "NIS2", relevance: same("Drinking water and wastewater are included in the Directive's high-criticality scope, subject to entity thresholds, national transposition, and Member State implementation"), support: same("Supports cyber risk-management evidence, asset/dependency visibility, supply-chain analysis, governance reporting, and resilience-oriented risk treatment"), href: "assurance" as const },
    { framework: "CER Directive", relevance: same("Drinking water and wastewater are within the Critical Entities Resilience scope; it focuses on resilience to relevant natural and human-made risks"), support: same("Supports a joined-up view of cyber, power, telecoms, weather, supplier, operational, and physical dependencies"), href: null },
    { framework: "EU Drinking Water Directive", relevance: same("Focuses on water quality, risk-based safety, monitoring, and consumer protection; it does not itself create a standalone cybersecurity regime"), support: same("Connects OT and cyber scenarios to treatment and water-quality operational evidence"), href: null },
    { framework: "Urban Wastewater Treatment Directive", relevance: same("Drives treatment, collection, discharge, monitoring, and environmental requirements; cybersecurity implications arise when OT disruption affects these duties"), support: same("Connects cyber pathways to process performance, effluent quality, pumping, overflow, and reporting consequences"), href: null },
    { framework: "IEC 62443", relevance: same("The primary IACS cybersecurity standard for treatment facilities, SCADA systems, remote telemetry, and system-integration work"), support: same("Supports system definition, zones/conduits, reachability, risk decisions, and traceable security evidence"), href: "assurance" as const },
    { framework: "NIST SP 800-82 Rev. 3", relevance: same("Widely used OT/ICS guidance, especially for US utilities and multinational programs"), support: same("Supports architecture, asset context, segmentation, access control, recovery, and safe implementation planning"), href: null },
    { framework: "US SDWA / AWIA Section 1433", relevance: same("Community water systems serving more than 3,300 people must conduct risk and resilience assessments that include automated-system cybersecurity, develop ERPs, and review/certify them at least every five years"), support: same("Helps create a facility-specific evidence base for the cyber portion of risk/resilience assessment and emergency-response planning"), href: null },
    { framework: "State drinking-water sanitary surveys", relevance: same("US states must evaluate the adequacy of OT cybersecurity where it is part of a required public-water-system sanitary survey component"), support: same("Provides OT architecture, control-path, asset, process, and documented risk-treatment evidence"), href: null },
    { framework: "EPA cyber guidance and response planning", relevance: same("EPA recommends IT/OT risk and resilience evaluation, mitigation planning, and response preparation across water-system types"), support: same("Supports incident scenarios, recovery dependencies, critical-asset prioritization, and decision documentation"), href: null }
  ],
  notes: [
    same("NIS2 explicitly includes drinking water and wastewater entities, while ENISA notes that both sectors are subject to NIS2 baseline cybersecurity objectives."),
    same("In the United States, SDWA Section 1433 requires community water systems serving more than 3,300 people to include cybersecurity in their risk and resilience assessments and certify completion of the assessment and emergency-response planning; reassessment and ERP review are required every five years."),
    same("EPA also recommends all water and wastewater operators assess the resilience of their IT and OT systems, develop a mitigation plan for critical operations, and address cybersecurity in risk/resilience and emergency-response work.")
  ]
};

export const ENGAGEMENT = {
  h2: same("Start with one treatment process or one remote field system."),
  items: [
    { name: same("Treatment-Process Decision Sprint"), useCase: same("Chemical dosing, UV/disinfection, filtration, aeration, biological process, or control-room change"), output: same("Modelled cyber pathway, treatment consequence, control options, and prioritized action plan") },
    { name: same("Remote-Asset Resilience Sprint"), useCase: same("Lift stations, pump stations, wells, reservoirs, booster stations, field RTUs, or telemetry network"), output: same("Reachability map, operational dependency analysis, secure remote-access and recovery roadmap") },
    { name: same("Facility Twin Build"), useCase: same("One drinking-water treatment plant, wastewater treatment plant, or regional operations environment"), output: same("Validated Cyber Digital Twin, risk-priority queue, process/OT views, evidence package") },
    { name: same("Continuous Twin Operations"), useCase: same("Multi-site utility with changing assets, vendors, threat context, capital programs, and seasonal risk"), output: same("Risk deltas, scenario testing, evidence updates, resilience reporting, and recurring decision support") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one plant, one pump station, or one treatment decision."),
  body: same(
    "Bring a process-flow diagram, P&ID, SCADA asset list, or a proposed remote-access or network change. OXOT will show how a Cyber Digital Twin can trace the path to the treatment or environmental consequence—before the live system is changed."
  ),
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
