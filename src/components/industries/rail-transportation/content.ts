/**
 * RAIL & TRANSPORTATION — content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_rail-transportation.md, which
 * is finished, ready-to-use copy, not an outline. Restructured into the
 * sections this page's own "dual track" layout uses (see page.tsx's
 * section order), not a verbatim reprint of the source file's own
 * headings.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that this is correct Dutch. See
 * registry.ts's own doc comment.
 *
 * Cross-references to pages the source file assumes exist
 * (/platform/decisions/*, /assurance/<regime>, /resources/technical-
 * specification) are retargeted to what's real today: /cdt-2#decide,
 * /assurance (EN) / /consulting (NL), /technical-specification (EN) /
 * /cdt-2 (NL), /consulting, /contact.
 *
 * DUAL TRACK: the source content genuinely splits into two parallel
 * narratives, Passenger Transit and US Freight Rail, each with its own
 * architecture, scenario library, four-decision language, and worked
 * example. Anything the source presents once and shared (sector reality,
 * product capabilities, regulatory table, engagement approach, final CTA)
 * stays a single dataset; anything the source explicitly forks
 * (architecture, scenarios, decisions, worked example) is split into
 * `passenger` / `freight` halves here so the two page columns can run
 * fully independently top to bottom.
 */
import { same } from "../registry";

export const META = {
  title: "Rail & Transit Cybersecurity Digital Twin | Passenger and Freight Rail",
  description:
    "Test rail cybersecurity changes before they affect live operations. OXOT's Cyber Digital Twin connects signaling, PTC, dispatch, SCADA, OT networks, safety context, and passenger or freight-service consequences."
};

export const HERO = {
  h1: same("Secure the railway without compromising safety or service."),
  lead: same(
    "OXOT's Cyber Digital Twin links railway operations, signaling and train-control systems, OT and communications pathways, and service consequences — so you can test changes and prioritize cyber risk before they reach the live railway."
  ),
  ctaPrimary: same("Discuss a rail scenario"),
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  /* The shared operating-model chain, read top to bottom in the source: the
     one route every rail segment shares, from movement to consequence. */
  chain: [
    same("Passengers / freight movement"),
    same("Train movement authority, dispatch, route setting"),
    same("Signaling, interlocking, train control, SCADA, power, telecoms"),
    same("Wayside assets, rolling stock, depots, crossings, field equipment"),
    same("Cyber pathway → operational or safety consequence")
  ],
  /* Source brief: "Include an obvious toggle... When users choose a rail
     segment, the model changes rather than merely swapping text." Not built
     anywhere on this site — rendered as a static, labeled fork instead of
     omitted (RailFork.tsx), foreshadowing the two-column layout below. */
  forkNote: same(
    "A working segment toggle isn't built yet — this is a static illustration of how the model forks, not a functioning switch."
  ),
  passengerStack: same("CBTC / ETCS / interlocking / station systems / traction power / passenger information"),
  freightStack: same("PTC / dispatch / wayside interface units / grade crossings / locomotive systems / yards / fuel and power")
};

export const SECTOR_REALITY = {
  h2: same("A cyber issue in rail becomes an operational decision: move safely, stop safely, or restore safely."),
  body: same(
    "Rail cybersecurity must respect the railway's safety architecture. A train-control environment often fails safe: an unavailable system may slow, stop, or restrict train movement rather than allow unsafe movement. That can still create major passenger, capacity, freight-flow, and recovery consequences. Conversely, a cyber route affecting an interlocking, wayside controller, movement-authority system, protection function, dispatcher environment, or traction-power control can create a more direct safety concern."
  ),
  bodyTwo: same("The relevant outcome is therefore not simply system uptime. It may be:"),
  outcomes: [
    same("An enforced service slowdown or line suspension."),
    same("Loss of movement authority or degraded signaling mode."),
    same("An inability to route trains through a junction, terminal, or yard."),
    same("A dispatching or crew-management disruption."),
    same("A passenger-information, station, fare, or emergency-communications failure."),
    same("A power, ventilation, tunnel, crossing, or platform-safety impact."),
    same("A freight-network bottleneck, missed interchange, commodity delay, or hazardous-material response complication.")
  ],
  compareHead: same("Passenger transit vs freight rail"),
  compareRows: [
    { dimension: same("Core mission"), passenger: same("Safe, predictable, high-frequency passenger movement and station access"), freight: same("Safe, efficient movement of long trains across large networks, yards, corridors, and interchanges") },
    { dimension: same("Operational rhythm"), passenger: same("Dense peak periods, headway management, high passenger visibility, constrained recovery time"), freight: same("Network fluidity, dispatching, crew/locomotive availability, terminal dwell, interchange performance, commodity commitments") },
    { dimension: same("Dominant safety/control systems"), passenger: same("CBTC, ATS/ATO, ETCS where applicable, interlocking, platform systems, traction power, tunnel/ventilation control"), freight: same("PTC, dispatch/CAD, interlocking, CTC, wayside interface units, grade-crossing systems, locomotive systems, yard automation") },
    { dimension: same("Main cyber impact"), passenger: same("Passenger safety, service suspension, crowding, station/tunnel operations, emergency response, reputation"), freight: same("Train movement restrictions, mainline congestion, hazardous-material implications, yard disruption, customer supply-chain impact") },
    { dimension: same("Asset distribution"), passenger: same("Stations, depots, tunnels, substations, trackside signaling, control centers, onboard train systems"), freight: same("Thousands of route miles, wayside devices, communications towers, locomotives, yards, terminals, grade crossings, dispatch centers") },
    { dimension: same("Change constraint"), passenger: same("Timetable windows, overnight possessions, safety-case impact, passenger service continuity"), freight: same("Network-wide operating plan, dispatch windows, PTC interoperability, locomotives in service, maintenance blocks, interchange coordination") },
    { dimension: same("Typical external interfaces"), passenger: same("Municipal IT, police/emergency services, ticketing, passenger apps, rolling-stock and signaling vendors"), freight: same("Customers, ports, terminals, short lines, Class I/II/III railroads, PTC interoperability partners, equipment OEMs, fuel/energy providers") }
  ]
};

export const ARCHITECTURE = {
  h2: same("Two operating systems, mapped in full — not one network diagram stretched over both."),
  intro: same(
    "Passenger transit and US freight rail run on different control stacks and answer to different operational concerns. Each track below is modeled end to end: OT architecture layers, then the concerns that make each layer matter."
  ),
  passenger: {
    label: same("Passenger Transit"),
    layers: [
      { name: same("Enterprise and passenger services"), body: same("Identity · corporate IT · ticketing · mobile apps · customer information") },
      { name: same("Operations and security boundary"), body: same("SOC · remote access · data brokers · jump hosts · operational DMZ") },
      { name: same("Rail operations control center"), body: same("ATS · OCC systems · CAD / dispatch · timetable · incident management") },
      { name: same("Train control and signaling"), body: same("CBTC zone controllers · wayside controllers · interlockings · ETCS / ATP · radio / wireless train-ground communications · axle counters · track circuits") },
      { name: same("Station and infrastructure OT"), body: same("Traction power SCADA · ventilation · tunnel systems · platform screen doors · CCTV · public address · fire/life safety · elevators / escalators") },
      { name: same("Rolling stock and depots"), body: same("Onboard controllers · TCMS · ATO/ATP equipment · maintenance laptops · depot SCADA · wheel lathes · wash plants · shore supply") }
    ],
    concerns: [
      { term: same("Headway and capacity"), body: same("A CBTC, ATS, signaling, or control-center issue can immediately reduce frequency, create platform crowding, and force degraded operations.") },
      { term: same("Movement authority and route setting"), body: same("Interlockings, wayside controllers, radio links, track occupancy detection, and control-center interfaces support safe movement decisions.") },
      { term: same("Tunnel and station safety"), body: same("Ventilation, smoke-control, power, platform screen doors, public address, CCTV, fire systems, and emergency communications may be operationally coupled during an incident.") },
      { term: same("Traction power"), body: same("SCADA control of substations, switchgear, and third rail/overhead line equipment can affect service continuity and safe access for maintenance/emergency response.") },
      { term: same("Rolling-stock lifecycle"), body: same("Trains remain in service for decades; onboard systems, train-ground communications, and maintenance tools evolve at different rates.") },
      { term: same("Passenger information"), body: same("The operational effect of service disruption is magnified when passenger information, station displays, apps, PA systems, and incident communications fail together.") },
      { term: same("Urban dependencies"), body: same("Transit depends on city power, telecoms, emergency response, road access, and shared municipal IT, often under stress during major events.") },
      { term: same("Vendor and program complexity"), body: same("CBTC, signaling, rolling stock, telecoms, fare collection, and station systems can involve multiple OEMs and long-term support contracts.") }
    ]
  },
  freight: {
    label: same("US Freight Rail"),
    layers: [
      { name: same("Enterprise, customer, and logistics systems"), body: same("Customer portals · waybill / billing · crew systems · maintenance · identity") },
      { name: same("Dispatch and railroad operations"), body: same("CAD / dispatch · traffic management · train sheets · crew / locomotive operations") },
      { name: same("PTC and train-control services"), body: same("Back office server · key management · PTC message routing · radio networks") },
      { name: same("Wayside and territory systems"), body: same("CTC · interlockings · signal houses · WIUs · grade crossings · defect detectors · communications towers · base stations · fiber / microwave / cellular links") },
      { name: same("Rolling-stock systems"), body: same("Locomotive onboard computer · PTC onboard equipment · event recorder · brake systems · distributed power · diagnostics · onboard communications") },
      { name: same("Yard, terminal, and infrastructure OT"), body: same("Yard automation · fueling · shop systems · car inspection · cranes / transload · power inverters · battery systems · facility SCADA") }
    ],
    concerns: [
      { term: same("Positive Train Control"), body: same("PTC depends on onboard, wayside, communications, and back-office elements; degraded availability can restrict movement, while integrity failures may have safety implications.") },
      { term: same("Network fluidity"), body: same("A disruption in one dispatch territory, terminal, bridge, junction, yard, or mainline corridor can propagate into missed connections and congestion across the network.") },
      { term: same("Territory scale"), body: same("Remote signal houses, grade crossings, wayside detectors, radio sites, and communications infrastructure may be difficult to inventory, physically access, patch, or recover.") },
      { term: same("Interoperability"), body: same("PTC and operations cross railroad boundaries; shared corridors, tenants, short lines, and host-railroad relationships create complex trust and change-management dependencies.") },
      { term: same("Dispatching and CAD"), body: same("Dispatching systems are central to managing train movements, maintenance windows, and recovery; outages can produce immediate service and safety-management consequences.") },
      { term: same("Hazardous materials"), body: same("Some routes and trains carry hazardous materials; a disruption can affect routing, situational awareness, emergency response, and restoration priorities.") },
      { term: same("Locomotive lifecycle"), body: same("Locomotive fleets have long service lives, complex onboard electronics, maintenance software, and vendor dependencies.") },
      { term: same("Customer supply chain"), body: same("Coal, grain, chemicals, automotive, intermodal, petroleum, minerals, construction materials, and defense-related shipments may be delayed by rail operating disruption.") },
      { term: same("Remote communications"), body: same("Wireless, microwave, fiber, cellular, and radio systems are central to PTC, dispatch, wayside control, and field maintenance — and can be geographically distributed.") },
      { term: same("Power and inverter assets"), body: same("FRA's 2026 safety alert specifically notes that power inverters and battery-management systems in railroad operating environments should be treated as networked OT, with inventory, segmentation, MFA, logging, and monitoring considerations.") }
    ]
  }
};

export const SCENARIOS = {
  h2: same("Each cyber pathway, modeled to the operational consequence it can actually cause."),
  intro: same("Every scenario opens into the same chain: pathway → operational impact → the decision the Twin supports."),
  passenger: {
    label: same("Passenger Transit"),
    items: [
      { title: same("CBTC wireless or zone-controller disruption"), pathway: same("Compromise or loss of a train-ground communications path, zone controller, or supporting control-center service."), impact: same("Trains enter degraded mode; reduced headways, line suspension, station crowding, recovery delay."), decision: same("Test segmentation, redundancy, failover, and recovery sequencing.") },
      { title: same("Interlocking engineering access"), pathway: same("Vendor or maintenance pathway reaches interlocking configuration tools, wayside controller, or route-setting environment."), impact: same("Route-setting restrictions, safe-stop behavior, junction/terminal capacity loss, safety-case concern."), decision: same("Model just-in-time access, engineering workstations, approvals, and conduit boundaries.") },
      { title: same("Traction-power SCADA compromise"), pathway: same("Path reaches substation SCADA, RTU, PLC, protective device, or remote-control gateway."), impact: same("Loss of power to a section, service suspension, stranded trains, tunnel/station implications."), decision: same("Test remote-access and segmentation changes without disrupting required control flows.") },
      { title: same("Station and tunnel system cascade"), pathway: same("Ransomware or network compromise crosses into station OT, CCTV, PA, ventilation, fire/life safety, or platform systems."), impact: same("Impaired incident response, evacuation complexity, station closure, passenger safety management impact."), decision: same("Identify operational dependencies and prioritise isolation/recovery.") },
      { title: same("Depot maintenance compromise"), pathway: same("Vendor laptop or maintenance network reaches rolling-stock diagnostic, upload, or depot-control environment."), impact: same("Train availability reduction, delayed release to service, configuration integrity risk."), decision: same("Restrict programming paths; trace trust boundary from depot to onboard systems.") },
      { title: same("Passenger-information outage during disruption"), pathway: same("Attack affects operational data feeds, station displays, mobile application backend, PA/CCTV, or communications."), impact: same("Crowding, unsafe passenger flow, reputational impact, slower recovery."), decision: same("Map cross-domain dependencies and create resilient communications pathways.") },
      { title: same("Time synchronization disruption"), pathway: same("Compromise or failure affects timing that supports signalling, event correlation, security monitoring, or operational coordination."), impact: same("Degraded diagnostics, inconsistent records, potential signaling/communications effects depending on design."), decision: same("Identify timing dependencies and test isolation/fallback design.") }
    ]
  },
  freight: {
    label: same("US Freight Rail"),
    items: [
      { title: same("PTC wayside / WIU exposure"), pathway: same("A remote maintenance path, weak interface, or compromised wayside component affects a WIU or PTC-related equipment."), impact: same("Train restrictions, unnecessary enforcement/braking, PTC availability loss, dispatch complexity; integrity risk requires safety analysis."), decision: same("Model actual reachability, communication dependencies, and safe containment sequence.") },
      { title: same("PTC back-office or key-management disruption"), pathway: same("Compromise/ransomware impacts PTC back-office servers, message routing, certificate/key services, or integration services."), impact: same("Large-scale PTC degradation, movement restrictions, dispatch delays, cross-network effects."), decision: same("Identify recovery order, isolation boundaries, and failover requirements.") },
      { title: same("Dispatch / CAD environment disruption"), pathway: same("Compromise affects train dispatch, traffic-management, route-planning, or supporting identity/data services."), impact: same("Reduced ability to authorize/manage movement, manual-workload increase, congestion, delayed recovery."), decision: same("Model IT/OT dependencies and staged recovery path.") },
      { title: same("Signal-house or interlocking remote access"), pathway: same("Unauthorized access reaches signal maintenance network, interlocking tooling, or field controller."), impact: same("Route restrictions, safe-stop behavior, reduced capacity, field-recovery requirement."), decision: same("Test secure remote-access and segmentation architecture.") },
      { title: same("Grade-crossing system compromise"), pathway: same("Path affects crossing controller, telemetry, monitoring, or maintenance interface."), impact: same("Public safety risk, road/rail disruption, false activation or failed status visibility."), decision: same("Prioritize by crossing criticality, physical safeguards, and reachable paths.") },
      { title: same("Locomotive maintenance / diagnostic compromise"), pathway: same("Maintenance laptop, vendor tool, Wi-Fi/cellular interface, or shop network reaches onboard diagnostic systems."), impact: same("Locomotive unavailability, configuration integrity concern, fleet maintenance delay."), decision: same("Map shop-to-locomotive trust pathways and control programming access.") },
      { title: same("Yard / terminal OT disruption"), pathway: same("Attack affects yard automation, fueling, inspection, transload, crane, gate, or shop systems."), impact: same("Congestion, dwell increase, customer delays, hazardous-material handling disruption."), decision: same("Compare recovery investment against network-wide delay consequence.") },
      { title: same("Power inverter / battery-system exposure"), pathway: same("Networked inverter or battery-management system in operating environment is accessible via unused services or weak identity controls."), impact: same("Availability loss or safety/recovery complication in support infrastructure."), decision: same("Inventory, segment, remove unused communications, test MFA/logging controls.") }
    ]
  }
};

export const DECISIONS = {
  h2: same("Four rail decisions that connect cyber risk to safe movement and service."),
  items: [
    {
      name: same("What do we fix first?"),
      passengerQuestion: same("Which pathway can affect train separation, route setting, traction power, station safety, or passenger flow?"),
      freightQuestion: same("Which pathway can degrade PTC, dispatch, interlocking, grade-crossing, yard, or locomotive operations?"),
      provides: same("NOW / NEXT / NEVER priorities based on actual reachability and safety/service consequence.")
    },
    {
      name: same("What should we spend?"),
      passengerQuestion: same("Should we fund CBTC segmentation, resilient OCC services, secure OEM access, traction-power isolation, or depot controls?"),
      freightQuestion: same("Should we fund PTC hardening, field-device segmentation, communications resilience, dispatch recovery, or locomotive access controls?"),
      provides: same("A comparable investment case with modeled risk reduction, sequence, and diminishing-return point.")
    },
    {
      name: same("Can we change safely?"),
      passengerQuestion: same("Can we change a signaling firewall, control-center route, remote-maintenance path, or station-system boundary without reducing service or impairing emergency operation?"),
      freightQuestion: same("Can we re-zone a signal network, change PTC communications, alter remote access, or patch a back-office dependency without restricting train movement?"),
      provides: same("A virtual control experiment showing flows preserved, pathways closed, residual exposure, and operational impact.")
    },
    {
      name: same("What can we leave alone?"),
      passengerQuestion: same("Which legacy station, depot, or onboard system is isolated enough to defer — with documented constraints?"),
      freightQuestion: same("Which long-lived wayside, locomotive, or yard asset can remain in service until scheduled renewal with compensating controls?"),
      provides: same("A documented risk-acceptance decision, review trigger, owner, and evidence trail.")
    }
  ]
};

export const WORKED_EXAMPLES = {
  h2: same("Two worked examples, one per track."),
  intro: same(
    "Illustrative scenarios showing how the Twin traces a pathway to a decision — one for a passenger-transit vendor-access redesign, one for a freight PTC and dispatching dependency."
  ),
  passenger: {
    label: same("Passenger Transit"),
    h2: same("Redesign signaling-vendor access without affecting service recovery."),
    tag: same("Illustrative scenario — no customer data"),
    scenario: same(
      "A metropolitan rail operator uses a vendor-managed maintenance connection to support CBTC wayside equipment, interlocking tools, and selected control-center engineering systems. The original access design was built during commissioning and has accumulated exemptions: persistent vendor credentials, broad network visibility, and maintenance connections that cross more than one operational zone. A security review recommends immediately severing remote vendor connectivity. Rail operations objects because the vendor may be needed to diagnose faults, restore service after a signal failure, support overnight maintenance possessions, or validate changes during a service incident."
    ),
    inputs: [
      { category: same("Rail operations and engineering evidence"), items: same("Signaling block / interlocking diagrams, CBTC or ATS architecture, train-control zones and communication boundaries, operating timetable, headway and degraded-mode procedures, safety-case and hazard-log context, critical junction/terminal/depot/tunnel dependencies") },
      { category: same("OT and network evidence"), items: same("Vendor remote-access route and jump hosts, engineering workstations and configuration tools, wayside controllers, zone controllers, interlockings, OCC connections, firewalls, VLANs, routing, required communications, observed traffic, identity/approval/session-recording and maintenance workflow data") },
      { category: same("Operational-consequence evidence"), items: same("Service disruption assumptions, headway reduction / line-closure effects, passenger crowding and emergency-operations dependencies, recovery time, vendor-response and field-intervention requirements") }
    ],
    chain: [
      same("Compromised vendor credential or remote-support endpoint"),
      same("Remote-access gateway / maintenance jump host"),
      same("Reachable signaling engineering workstation or configuration environment"),
      same("Potential impact on CBTC / interlocking / wayside configuration pathway"),
      same("Degraded train-control operation, service restriction, or recovery complication"),
      same("Capacity loss, passenger disruption, safety-management burden, and restoration cost")
    ],
    controls: [
      { option: same("Eliminate remote vendor access"), evaluates: same("Whether fault diagnosis and safe restoration become too slow or require impractical on-site response"), outcome: same("May reduce cyber exposure while increasing operational recovery risk") },
      { option: same("Introduce brokered access"), evaluates: same("MFA, named accounts, approval, just-in-time sessions, jump host, recording, and role/asset restrictions"), outcome: same("Preserves controlled support while eliminating persistent broad pathways") },
      { option: same("Re-zone the signaling maintenance environment"), evaluates: same("Virtual firewalls, required management/control flows, and remaining routes"), outcome: same("Identifies which segmentation rules preserve signaling and diagnostic needs") },
      { option: same("Separate engineering tooling"), evaluates: same("Boundaries among vendor systems, engineering workstations, production signaling networks, and data-transfer services"), outcome: same("Reduces route reachability and makes change control more defensible") },
      { option: same("Stage the program"), evaluates: same("Implement access control now; make deeper segmentation during planned possessions"), outcome: same("Balances near-term risk reduction against safety-case, service, and testing constraints") }
    ],
    result: same(
      "The recommended decision is usually not “disconnect the vendor.” It is: remove persistent reachability, preserve accountable and time-limited expert support, prove that required signaling and recovery flows remain viable, and implement deeper network changes in a planned possession with appropriate safety assurance."
    )
  },
  freight: {
    label: same("US Freight Rail"),
    h2: same("Secure PTC and dispatching dependencies across the operating territory."),
    tag: same("Illustrative scenario — no customer data"),
    scenario: same(
      "A freight railroad has a remote pathway used for maintenance of field equipment across a dispatch territory. The environment includes PTC-related wayside equipment, signal houses, communications infrastructure, and a dependency on dispatch/traffic-management systems. Asset inventory shows aging field devices, inconsistent remote-access patterns, and variations between subdivisions. A security review identifies an exploitable component in a support path. Replacing it across the territory would be expensive and operationally difficult. Operations needs a decision that considers safety, dispatch flow, maintenance access, outage windows, and the effect on trains moving through the territory."
    ),
    chain: [
      same("Compromised remote-support path"),
      same("Signal / communications maintenance environment"),
      same("Reachable wayside equipment, PTC-support component, or field network"),
      same("Movement restriction, signal/interlocking degradation, or PTC availability impact"),
      same("Train delays, congestion, dispatch workload, customer impact, and field recovery needs")
    ],
    controls: [
      same("Restrict access through named, time-limited, MFA-protected maintenance sessions."),
      same("Segment field-maintenance networks by territory, function, and criticality."),
      same("Remove unused services from wayside-support infrastructure."),
      same("Separate PTC-support paths from broader enterprise or vendor networks."),
      same("Stage component renewal by safety/operational consequence and true reachability."),
      same("Test recovery sequence for a PTC back-office, dispatch, or territory communications disruption.")
    ],
    result: same(
      "The relevant result is a territory-specific remediation sequence: which remote routes need immediate containment, which devices require planned replacement, what dispatch/field-maintenance dependencies must be preserved, and which legacy assets can remain under compensating controls until a scheduled modernization cycle."
    )
  }
};

export const CAPABILITIES = {
  h2: same("One rail model spanning operations, signaling, OT, and service consequence."),
  items: [
    { name: same("Operational-system model"), passenger: same("Links train control, OCC, signaling, stations, traction power, depots, and passenger operations"), freight: same("Links PTC, dispatch, CTC/interlockings, wayside systems, locomotives, yards, terminals, and corridors") },
    { name: same("Safety and RAMS context"), passenger: same("Connects cyber pathways to hazard logs, degraded modes, emergency procedures, and service-capacity consequences"), freight: same("Connects cyber pathways to safe train movement, territory operations, hazardous-material considerations, and dispatch recovery") },
    { name: same("Network and zone model"), passenger: same("Maps vendor access, signaling networks, radio, control centers, stations, depot boundaries, and corporate interfaces"), freight: same("Maps PTC support, field communications, signal houses, dispatch/operations systems, maintenance networks, and vendor paths") },
    { name: same("Asset and configuration mapping"), passenger: same("Covers CBTC, ATS/ATO, interlockings, wayside controllers, onboard systems, and infrastructure OT"), freight: same("Covers PTC elements, WIUs, interlockings, crossings, locomotive systems, communication sites, yard OT, and inverters") },
    { name: same("Change simulation"), passenger: same("Tests signaling/maintenance segmentation, secure access, OCC boundaries, and infrastructure-control changes"), freight: same("Tests PTC/dispatch dependencies, territory segmentation, field-access redesign, and recovery changes") },
    { name: same("Supply-chain and lifecycle view"), passenger: same("Maps OEMs for signaling, rolling stock, CBTC, telecoms, fare systems, station systems, and maintenance tooling"), freight: same("Maps PTC suppliers, locomotive/wayside OEMs, telecoms, vendors, repair networks, parts, and interoperability dependencies") },
    { name: same("Evidence output"), passenger: same("Supports TS 50701, IEC 62443, NIS2, safety-assurance, and board reporting workflows"), freight: same("Supports TSA cyber program evidence, FRA/rail safety context, IEC 62443/NIST alignment, risk decisions, and supply-chain analysis") }
  ]
};

export const REGULATORY = {
  h2: same("Build cyber evidence alongside safety, RAMS, and operational assurance."),
  intro: same(
    "OXOT does not state that the Cyber Digital Twin automatically certifies a railway or guarantees regulatory compliance. It supports asset and dependency visibility, risk assessment, scenario testing, evidence traceability, change decisions, and documentation workflows."
  ),
  rows: [
    { framework: "CLC/TS 50701:2023", passenger: same("Rail-specific cybersecurity technical specification, aligned to railway lifecycle and safety/RAMS realities"), freight: same("Useful reference for multinationals or rail suppliers, but not a US mandate"), support: same("Maps systems, assets, zones/conduits, cyber pathways, risk decisions, and traceable evidence"), href: "assurance" as const },
    { framework: "IEC 62443", passenger: same("Applicable IACS cybersecurity principles for signaling-adjacent OT, station systems, traction power, depots, and other industrial control environments"), freight: same("Useful for segmentation, access control, risk assessment, and system lifecycle engineering across rail OT"), support: same("Supports zones, conduits, target controls, reachability modeling, and evidence outputs"), href: "assurance" as const },
    { framework: "NIS2", passenger: same("Rail infrastructure managers and railway undertakings are named in Annex I; scope, enforcement, and national implementation still matter"), freight: same("Not applicable as a US regulatory obligation"), support: same("Supports risk management, supply-chain view, incident/resilience evidence, and governance reporting"), href: "assurance" as const },
    { framework: "CER Directive", passenger: same("Relevant to resilience of designated critical entities, including rail, across natural and human-made risk"), freight: same("Not applicable as an EU directive"), support: same("Models cyber, power, telecoms, vendor, weather, physical-access, and recovery dependencies"), href: null },
    { framework: "TSA rail cybersecurity directives", passenger: same("Not applicable outside covered US operations"), freight: same("Covered passenger and freight carriers have requirements addressing incident reporting, response planning, vulnerability assessment, segmentation, access controls, monitoring, risk-based patching, and recurring testing/assessment"), support: same("Supports implementation-plan evidence, asset/dependency views, assessment scenarios, control validation, and incident/recovery exercises"), href: null },
    { framework: "FRA PTC regulations and safety oversight", passenger: same("Not directly applicable"), freight: same("PTC systems and changes are subject to FRA safety oversight; cyber actions must be compatible with certified/approved PTC safety and operational requirements"), support: same("Connects proposed cyber changes to PTC architecture, field assets, operating procedures, and consequence — not a substitute for FRA approvals"), href: null },
    { framework: "NIST SP 800-82 / NIST CSF 2.0", passenger: same("Often useful as supporting OT security/governance references"), freight: same("Commonly used US OT-security guidance"), support: same("Supplies rail-specific evidence for broader program and governance frameworks"), href: null },
    { framework: "Safety and RAMS standards", passenger: same("EN 50126 / EN 50128 / EN 50129 and associated safety assurance remain central; cyber changes must be evaluated in safety context"), freight: same("FRA regulations, railroad safety processes, PTC certification, and operating rules govern key safety outcomes"), support: same("Makes cyber-pathway decisions understandable alongside existing safety/RAMS and operating evidence"), href: null }
  ]
};

export const ENGAGEMENT = {
  h2: same("Start with one route, one control environment, or one critical change."),
  items: [
    { name: same("Rail Decision Sprint"), passenger: same("CBTC vendor access, OCC dependency, traction-power SCADA, station/tunnel OT, depot network change"), freight: same("PTC support pathway, dispatch/CAD dependency, signal-house access, grade-crossing, yard/terminal OT"), output: same("Modelled pathway, safety/service consequence, control options, evidence-backed recommendation") },
    { name: same("System Twin Build"), passenger: same("One metro line, signaling zone, depot, control center, traction-power estate, or rolling-stock maintenance environment"), freight: same("One territory, PTC operational segment, dispatch environment, yard/terminal, locomotive maintenance domain, or communications estate"), output: same("Validated Cyber Digital Twin, priority queue, architecture views, evidence package") },
    { name: same("Continuous Twin Operations"), passenger: same("Programs with rolling-stock upgrades, CBTC modernization, changing vendor access, and planned possessions"), freight: same("Network/territory changes, PTC upgrades, fleet and wayside refresh, supplier risk, and ongoing operating-model evolution"), output: same("Risk deltas, change testing, decision reporting, assurance evidence, and recurring scenario support") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one line, one territory, or one operational decision."),
  body: same(
    "Bring a signaling architecture, interlocking diagram, PTC map, SCADA topology, or asset list. OXOT will show how the Cyber Digital Twin can trace the pathway, test the control, and support a defensible rail-security decision before the live railway is changed."
  ),
  ctaPrimary: same("Discuss a rail scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
