 Supporing "Industy" on OXOT Website
 
 **Rail & Transportation** industry-page brief for OXOT, deliberately split between **passenger rail / transit** and **US freight rail**. These should not read as one generic “transport” offering: the operating models, control systems, safety dependencies, economics, and cyber consequences differ substantially.

The shared positioning is:

> **Model the route from cyber pathway to unsafe, unavailable, or disrupted rail operations—before changing the live railway.**

For the European market, rail infrastructure managers and railway undertakings are explicitly listed in NIS2 Annex I as high-criticality entities. In the United States, TSA directives and proposed rules target higher-risk passenger rail, rail transit, and freight operators with cybersecurity risk-management, reporting, segmentation, access-control, monitoring, patching, and testing expectations.

## Page purpose

**URL:** `/industries/rail-transportation`

**Primary audiences**

- Railway infrastructure-manager security and engineering leadership
- Passenger-rail, metro, tram, light-rail, commuter-rail, and transit-agency operations leaders
- Signaling, train-control, SCADA, telecoms, rolling-stock, and depot-maintenance engineers
- Freight railroad PTC, dispatching, signal, communications, and operational-technology leaders
- CISO, safety/RAMS, compliance, and resilience teams
- Major-program, procurement, rolling-stock, and signaling-system stakeholders

**Primary conversion**

> **Discuss a railway system or operational-change scenario**

**Secondary conversion**

> **Bring one interlocking diagram, signaling architecture, PTC map, or asset list**

## Hero

> ## Secure the railway without compromising safety or service.
>
> OXOT’s Cyber Digital Twin links railway operations, signaling and train-control systems, OT and communications pathways, and service consequences—so you can test changes and prioritize cyber risk before they reach the live railway.

**CTAs**

- **Discuss a rail scenario**
- **Explore the Cyber Digital Twin**

**Hero visual**

Use a **railway operating model**, not a generic factory network:

```text
Passengers / freight movement
        ↓
Train movement authority / dispatch / route setting
        ↓
Signaling, interlocking, train control, SCADA, power, telecoms
        ↓
Wayside assets, rolling stock, depots, crossings, field equipment
        ↓
Cyber pathway → operational or safety consequence
```

Include an obvious toggle:

```text
Passenger Transit     Freight Rail
```

When users choose a rail segment, the model changes rather than merely swapping text.

```text
Passenger:
CBTC / ETCS / interlocking / station systems / traction power / passenger information

Freight:
PTC / dispatch / wayside interface units / grade crossings / locomotive systems / yards / fuel and power
```

## Sector reality

### Section headline

> ## A cyber issue in rail becomes an operational decision: move safely, stop safely, or restore safely.

Rail cybersecurity must respect the railway’s safety architecture. A train-control environment often fails safe: an unavailable system may slow, stop, or restrict train movement rather than allow unsafe movement. That can still create major passenger, capacity, freight-flow, and recovery consequences. Conversely, a cyber route affecting an interlocking, wayside controller, movement-authority system, protection function, dispatcher environment, or traction-power control can create a more direct safety concern.

The relevant outcome is therefore not simply “system uptime.” It may be:

- An enforced service slowdown or line suspension.
- Loss of movement authority or degraded signaling mode.
- An inability to route trains through a junction, terminal, or yard.
- A dispatching or crew-management disruption.
- A passenger-information, station, fare, or emergency-communications failure.
- A power, ventilation, tunnel, crossing, or platform-safety impact.
- A freight-network bottleneck, missed interchange, commodity delay, or hazardous-material response complication.

### Passenger transit vs freight rail

| Dimension | Passenger rail / transit | US freight rail |
|---|---|---|
| Core mission | Safe, predictable, high-frequency passenger movement and station access | Safe, efficient movement of long trains across large networks, yards, corridors, and interchanges |
| Operational rhythm | Dense peak periods, headway management, high passenger visibility, constrained recovery time | Network fluidity, dispatching, crew/locomotive availability, terminal dwell, interchange performance, commodity commitments |
| Dominant safety/control systems | CBTC, ATS/ATO, ETCS where applicable, interlocking, platform systems, traction power, tunnel/ventilation control | PTC, dispatch/CAD, interlocking, CTC, wayside interface units, grade-crossing systems, locomotive systems, yard automation |
| Main cyber impact | Passenger safety, service suspension, crowding, station/tunnel operations, emergency response, reputation | Train movement restrictions, mainline congestion, hazardous-material implications, yard disruption, customer supply-chain impact |
| Asset distribution | Stations, depots, tunnels, substations, trackside signaling, control centers, onboard train systems | Thousands of route miles, wayside devices, communications towers, locomotives, yards, terminals, grade crossings, dispatch centers |
| Change constraint | Timetable windows, overnight possessions, safety-case impact, passenger service continuity | Network-wide operating plan, dispatch windows, PTC interoperability, locomotives in service, maintenance blocks, interchange coordination |
| Typical external interfaces | Municipal IT, police/emergency services, ticketing, passenger apps, rolling-stock and signaling vendors | Customers, ports, terminals, short lines, Class I/II/III railroads, PTC interoperability partners, equipment OEMs, fuel/energy providers |

## Passenger rail and transit

### Section headline

> ## Passenger rail: protect movement, capacity, stations, and emergency operations.

Passenger transit includes metro, light rail, tram, commuter rail, intercity passenger rail, and automated people-mover systems. Its cyber-risk model must account for both **train movement** and the passenger-facing operational environment.

### Passenger / transit OT architecture

```text
Enterprise and passenger services
Identity • corporate IT • ticketing • mobile apps • customer information
                    │
Operations and security boundary
SOC • remote access • data brokers • jump hosts • operational DMZ
                    │
Rail operations control center
ATS • OCC systems • CAD / dispatch • timetable • incident management
                    │
Train control and signaling
CBTC zone controllers • wayside controllers • interlockings • ETCS / ATP
Radio / wireless train-ground communications • axle counters • track circuits
                    │
Station and infrastructure OT
Traction power SCADA • ventilation • tunnel systems • platform screen doors
CCTV • public address • fire/life safety • elevators / escalators
                    │
Rolling stock and depots
Onboard controllers • TCMS • ATO/ATP equipment • maintenance laptops
Depot SCADA • wheel lathes • wash plants • shore supply
```

### Passenger-rail operational concerns

| Concern | Why it matters |
|---|---|
| Headway and capacity | A CBTC, ATS, signaling, or control-center issue can immediately reduce frequency, create platform crowding, and force degraded operations |
| Movement authority and route setting | Interlockings, wayside controllers, radio links, track occupancy detection, and control-center interfaces support safe movement decisions |
| Tunnel and station safety | Ventilation, smoke-control, power, platform screen doors, public address, CCTV, fire systems, and emergency communications may be operationally coupled during an incident |
| Traction power | SCADA control of substations, switchgear, and third rail/overhead line equipment can affect service continuity and safe access for maintenance/emergency response |
| Rolling-stock lifecycle | Trains remain in service for decades; onboard systems, train-ground communications, and maintenance tools evolve at different rates |
| Passenger information | The operational effect of service disruption is magnified when passenger information, station displays, apps, PA systems, and incident communications fail together |
| Urban dependencies | Transit depends on city power, telecoms, emergency response, road access, and shared municipal IT, often under stress during major events |
| Vendor and program complexity | CBTC, signaling, rolling stock, telecoms, fare collection, and station systems can involve multiple OEMs and long-term support contracts |

### Passenger-transit cyber scenarios

| Scenario | Cyber / OT pathway | Operational impact | Twin-supported decision |
|---|---|---|---|
| CBTC wireless or zone-controller disruption | Compromise or loss of a train-ground communications path, zone controller, or supporting control-center service | Trains enter degraded mode; reduced headways, line suspension, station crowding, recovery delay | Test segmentation, redundancy, failover, and recovery sequencing |
| Interlocking engineering access | Vendor or maintenance pathway reaches interlocking configuration tools, wayside controller, or route-setting environment | Route-setting restrictions, safe-stop behavior, junction/terminal capacity loss, safety-case concern | Model just-in-time access, engineering workstations, approvals, and conduit boundaries |
| Traction-power SCADA compromise | Path reaches substation SCADA, RTU, PLC, protective device, or remote-control gateway | Loss of power to a section, service suspension, stranded trains, tunnel/station implications | Test remote-access and segmentation changes without disrupting required control flows |
| Station and tunnel system cascade | Ransomware or network compromise crosses into station OT, CCTV, PA, ventilation, fire/life safety, or platform systems | Impaired incident response, evacuation complexity, station closure, passenger safety management impact | Identify operational dependencies and prioritise isolation/recovery |
| Depot maintenance compromise | Vendor laptop or maintenance network reaches rolling-stock diagnostic, upload, or depot-control environment | Train availability reduction, delayed release to service, configuration integrity risk | Restrict programming paths; trace trust boundary from depot to onboard systems |
| Passenger-information outage during disruption | Attack affects operational data feeds, station displays, mobile application backend, PA/CCTV, or communications | Crowding, unsafe passenger flow, reputational impact, slower recovery | Map cross-domain dependencies and create resilient communications pathways |
| Time synchronization disruption | Compromise or failure affects timing that supports signalling, event correlation, security monitoring, or operational coordination | Degraded diagnostics, inconsistent records, potential signaling/communications effects depending on design | Identify timing dependencies and test isolation/fallback design |

## US freight rail

### Section headline

> ## Freight rail: preserve safe train movement and network fluidity across a distributed operating system.

Freight rail should appear as a dedicated subpage or major tab, not a paragraph under passenger rail. Its core operating model differs: long corridors, dispatching territories, PTC interoperability, locomotives and wayside assets, yards, grade crossings, customers, terminals, and Class I/short-line boundaries all form a large, distributed cyber-physical system.

### Freight-rail OT architecture

```text
Enterprise, customer, and logistics systems
Customer portals • waybill / billing • crew systems • maintenance • identity
                         │
Dispatch and railroad operations
CAD / dispatch • traffic management • train sheets • crew / locomotive operations
                         │
PTC and train-control services
Back office server • key management • PTC message routing • radio networks
                         │
Wayside and territory systems
CTC • interlockings • signal houses • WIUs • grade crossings • defect detectors
Communications towers • base stations • fiber / microwave / cellular links
                         │
Rolling-stock systems
Locomotive onboard computer • PTC onboard equipment • event recorder
Brake systems • distributed power • diagnostics • onboard communications
                         │
Yard, terminal, and infrastructure OT
Yard automation • fueling • shop systems • car inspection • cranes / transload
Power inverters • battery systems • facility SCADA
```

### Freight-specific operational concerns

| Concern | Why it matters |
|---|---|
| Positive Train Control | PTC depends on onboard, wayside, communications, and back-office elements; degraded availability can restrict movement, while integrity failures may have safety implications |
| Network fluidity | A disruption in one dispatch territory, terminal, bridge, junction, yard, or mainline corridor can propagate into missed connections and congestion across the network |
| Territory scale | Remote signal houses, grade crossings, wayside detectors, radio sites, and communications infrastructure may be difficult to inventory, physically access, patch, or recover |
| Interoperability | PTC and operations cross railroad boundaries; shared corridors, tenants, short lines, and host-railroad relationships create complex trust and change-management dependencies |
| Dispatching and CAD | Dispatching systems are central to managing train movements, maintenance windows, and recovery; outages can produce immediate service and safety-management consequences |
| Hazardous materials | Some routes and trains carry hazardous materials; a disruption can affect routing, situational awareness, emergency response, and restoration priorities |
| Locomotive lifecycle | Locomotive fleets have long service lives, complex onboard electronics, maintenance software, and vendor dependencies |
| Customer supply chain | Coal, grain, chemicals, automotive, intermodal, petroleum, minerals, construction materials, and defense-related shipments may be delayed by rail operating disruption |
| Remote communications | Wireless, microwave, fiber, cellular, and radio systems are central to PTC, dispatch, wayside control, and field maintenance—and can be geographically distributed |
| Power and inverter assets | FRA’s 2026 safety alert specifically notes that power inverters and battery-management systems in railroad operating environments should be treated as networked OT, with inventory, segmentation, MFA, logging, and monitoring considerations.  

### Freight-rail cyber scenarios

| Scenario | Cyber / OT pathway | Freight impact | Twin-supported decision |
|---|---|---|---|
| PTC wayside / WIU exposure | A remote maintenance path, weak interface, or compromised wayside component affects a WIU or PTC-related equipment | Train restrictions, unnecessary enforcement/braking, PTC availability loss, dispatch complexity; integrity risk requires safety analysis | Model actual reachability, communication dependencies, and safe containment sequence |
| PTC back-office or key-management disruption | Compromise/ransomware impacts PTC back-office servers, message routing, certificate/key services, or integration services | Large-scale PTC degradation, movement restrictions, dispatch delays, cross-network effects | Identify recovery order, isolation boundaries, and failover requirements |
| Dispatch / CAD environment disruption | Compromise affects train dispatch, traffic-management, route-planning, or supporting identity/data services | Reduced ability to authorize/manage movement, manual-workload increase, congestion, delayed recovery | Model IT/OT dependencies and staged recovery path |
| Signal-house or interlocking remote access | Unauthorized access reaches signal maintenance network, interlocking tooling, or field controller | Route restrictions, safe-stop behavior, reduced capacity, field-recovery requirement | Test secure remote-access and segmentation architecture |
| Grade-crossing system compromise | Path affects crossing controller, telemetry, monitoring, or maintenance interface | Public safety risk, road/rail disruption, false activation or failed status visibility | Prioritize by crossing criticality, physical safeguards, and reachable paths |
| Locomotive maintenance / diagnostic compromise | Maintenance laptop, vendor tool, Wi-Fi/cellular interface, or shop network reaches onboard diagnostic systems | Locomotive unavailability, configuration integrity concern, fleet maintenance delay | Map shop-to-locomotive trust pathways and control programming access |
| Yard / terminal OT disruption | Attack affects yard automation, fueling, inspection, transload, crane, gate, or shop systems | Congestion, dwell increase, customer delays, hazardous-material handling disruption | Compare recovery investment against network-wide delay consequence |
| Power inverter / battery-system exposure | Networked inverter or battery-management system in operating environment is accessible via unused services or weak identity controls | Availability loss or safety/recovery complication in support infrastructure | Inventory, segment, remove unused communications, test MFA/logging controls |

A modern freight rail environment joins digital train-control networks, SCADA/ICS, signaling, communications, and long-lived field equipment. For PTC, attacks on a wayside interface unit can cause unnecessary stopping in fail-safe scenarios or create more serious safety concerns depending on system and control conditions; the point is to model the route, safety architecture, and operational consequence rather than infer risk from the CVE alone. 

## Four rail decisions

### Section headline

> ## Four rail decisions that connect cyber risk to safe movement and service.

| OXOT decision | Passenger transit language | Freight rail language | What the Twin provides |
|---|---|---|---|
| **What do we fix first?** | “Which pathway can affect train separation, route setting, traction power, station safety, or passenger flow?” | “Which pathway can degrade PTC, dispatch, interlocking, grade-crossing, yard, or locomotive operations?” | NOW / NEXT / NEVER priorities based on actual reachability and safety/service consequence |
| **What should we spend?** | “Should we fund CBTC segmentation, resilient OCC services, secure OEM access, traction-power isolation, or depot controls?” | “Should we fund PTC hardening, field-device segmentation, communications resilience, dispatch recovery, or locomotive access controls?” | A comparable investment case with modeled risk reduction, sequence, and diminishing-return point |
| **Can we change safely?** | “Can we change a signaling firewall, control-center route, remote-maintenance path, or station-system boundary without reducing service or impairing emergency operation?” | “Can we re-zone a signal network, change PTC communications, alter remote access, or patch a back-office dependency without restricting train movement?” | A virtual control experiment showing flows preserved, pathways closed, residual exposure, and operational impact |
| **What can we leave alone?** | “Which legacy station, depot, or onboard system is isolated enough to defer—with documented constraints?” | “Which long-lived wayside, locomotive, or yard asset can remain in service until scheduled renewal with compensating controls?” | A documented risk-acceptance decision, review trigger, owner, and evidence trail |

OXOT’s approach is particularly well suited to rail because its model can combine network reachability with engineering/safety/reliability evidence, then produce a drillable decision rather than a generic vulnerability priority list. Its model supports IEC 62443 zones, TS 50701, asset/configuration mapping, device cascades, virtual-network state, and consequence-led prioritization.

## Worked use case: passenger transit

### Section headline

> ## Worked example: redesign signaling-vendor access without affecting service recovery.

**Label:** *Illustrative scenario—no customer data.*

### Scenario

A metropolitan rail operator uses a vendor-managed maintenance connection to support CBTC wayside equipment, interlocking tools, and selected control-center engineering systems. The original access design was built during commissioning and has accumulated exemptions: persistent vendor credentials, broad network visibility, and maintenance connections that cross more than one operational zone.

A security review recommends immediately severing remote vendor connectivity. Rail operations objects because the vendor may be needed to diagnose faults, restore service after a signal failure, support overnight maintenance possessions, or validate changes during a service incident.

### Inputs to the Twin

```text
Rail operations and engineering evidence
- Signaling block / interlocking diagrams
- CBTC or ATS architecture
- Train-control zones and communication boundaries
- Operating timetable, headway, and degraded-mode procedures
- Safety-case and hazard-log context
- Critical junction, terminal, depot, and tunnel dependencies

OT and network evidence
- Vendor remote-access route and jump hosts
- Engineering workstations and configuration tools
- Wayside controllers, zone controllers, interlockings, OCC connections
- Firewalls, VLANs, routing, required communications, and observed traffic
- Identity, approval, session-recording, and maintenance workflow data

Operational-consequence evidence
- Service disruption assumptions
- Headway reduction / line-closure effects
- Passenger crowding and emergency-operations dependencies
- Recovery time, vendor-response, and field-intervention requirements
```

### Modelled chain

```text
Compromised vendor credential or remote-support endpoint
        ↓
Remote-access gateway / maintenance jump host
        ↓
Reachable signaling engineering workstation or configuration environment
        ↓
Potential impact on CBTC / interlocking / wayside configuration pathway
        ↓
Degraded train-control operation, service restriction, or recovery complication
        ↓
Capacity loss, passenger disruption, safety-management burden, and restoration cost
```

### Controls tested

| Candidate control | What the Twin tests | Decision insight |
|---|---|---|
| Eliminate remote vendor access | Whether fault diagnosis and safe restoration become too slow or require impractical on-site response | May reduce cyber exposure while increasing operational recovery risk |
| Introduce brokered access | MFA, named accounts, approval, just-in-time sessions, jump host, recording, and role/asset restrictions | Preserves controlled support while eliminating persistent broad pathways |
| Re-zone the signaling maintenance environment | Virtual firewalls, required management/control flows, and remaining routes | Identifies which segmentation rules preserve signaling and diagnostic needs |
| Separate engineering tooling | Boundaries among vendor systems, engineering workstations, production signaling networks, and data-transfer services | Reduces route reachability and makes change control more defensible |
| Stage the program | Implement access control now; make deeper segmentation during planned possessions | Balances near-term risk reduction against safety-case, service, and testing constraints |

### Result message

> The recommended decision is usually not “disconnect the vendor.” It is: remove persistent reachability, preserve accountable and time-limited expert support, prove that required signaling and recovery flows remain viable, and implement deeper network changes in a planned possession with appropriate safety assurance.

## Worked use case: US freight rail

The freight version should be a separate tab or linked page titled **“Secure PTC and dispatching dependencies across the operating territory.”**

### Scenario

A freight railroad has a remote pathway used for maintenance of field equipment across a dispatch territory. The environment includes PTC-related wayside equipment, signal houses, communications infrastructure, and a dependency on dispatch/traffic-management systems. Asset inventory shows aging field devices, inconsistent remote-access patterns, and variations between subdivisions.

A security review identifies an exploitable component in a support path. Replacing it across the territory would be expensive and operationally difficult. Operations needs a decision that considers safety, dispatch flow, maintenance access, outage windows, and the effect on trains moving through the territory.

### Modelled chain

```text
Compromised remote-support path
        ↓
Signal / communications maintenance environment
        ↓
Reachable wayside equipment, PTC-support component, or field network
        ↓
Movement restriction, signal/interlocking degradation, or PTC availability impact
        ↓
Train delays, congestion, dispatch workload, customer impact, and field recovery needs
```

### Candidate controls

- Restrict access through named, time-limited, MFA-protected maintenance sessions.
- Segment field-maintenance networks by territory, function, and criticality.
- Remove unused services from wayside-support infrastructure.
- Separate PTC-support paths from broader enterprise or vendor networks.
- Stage component renewal by safety/operational consequence and true reachability.
- Test recovery sequence for a PTC back-office, dispatch, or territory communications disruption.

The relevant result is a **territory-specific remediation sequence**: which remote routes need immediate containment, which devices require planned replacement, what dispatch/field-maintenance dependencies must be preserved, and which legacy assets can remain under compensating controls until a scheduled modernization cycle.

TSA’s rail cybersecurity directives require covered passenger and freight rail carriers to maintain segmentation, access-control, monitoring, and risk-based patching measures, alongside a TSA-approved implementation plan and recurring assessment program. [tsa](https://www.tsa.gov/news/press/releases/2022/10/18/tsa-issues-new-cybersecurity-requirements-for-passenger-and-freight)

## Product capabilities

### Section headline

> ## One rail model spanning operations, signaling, OT, and service consequence.

| Capability | Passenger transit value | Freight rail value |
|---|---|---|
| **Operational-system model** | Links train control, OCC, signaling, stations, traction power, depots, and passenger operations | Links PTC, dispatch, CTC/interlockings, wayside systems, locomotives, yards, terminals, and corridors |
| **Safety and RAMS context** | Connects cyber pathways to hazard logs, degraded modes, emergency procedures, and service-capacity consequences | Connects cyber pathways to safe train movement, territory operations, hazardous-material considerations, and dispatch recovery |
| **Network and zone model** | Maps vendor access, signaling networks, radio, control centers, stations, depot boundaries, and corporate interfaces | Maps PTC support, field communications, signal houses, dispatch/operations systems, maintenance networks, and vendor paths |
| **Asset and configuration mapping** | Covers CBTC, ATS/ATO, interlockings, wayside controllers, onboard systems, and infrastructure OT | Covers PTC elements, WIUs, interlockings, crossings, locomotive systems, communication sites, yard OT, and inverters |
| **Change simulation** | Tests signaling/maintenance segmentation, secure access, OCC boundaries, and infrastructure-control changes | Tests PTC/dispatch dependencies, territory segmentation, field-access redesign, and recovery changes |
| **Supply-chain and lifecycle view** | Maps OEMs for signaling, rolling stock, CBTC, telecoms, fare systems, station systems, and maintenance tooling | Maps PTC suppliers, locomotive/wayside OEMs, telecoms, vendors, repair networks, parts, and interoperability dependencies |
| **Evidence output** | Supports TS 50701, IEC 62443, NIS2, safety-assurance, and board reporting workflows | Supports TSA cyber program evidence, FRA/rail safety context, IEC 62443/NIST alignment, risk decisions, and supply-chain analysis |

## Regulatory and standards context

### Section headline

> ## Build cyber evidence alongside safety, RAMS, and operational assurance.

Do not state that the Cyber Digital Twin automatically certifies a railway or guarantees regulatory compliance. It supports asset and dependency visibility, risk assessment, scenario testing, evidence traceability, change decisions, and documentation workflows.

| Framework / obligation | Passenger transit and European rail | US freight rail | How OXOT supports the work |
|---|---|---|---|
| **CLC/TS 50701:2023** | Rail-specific cybersecurity technical specification, aligned to railway lifecycle and safety/RAMS realities | Useful reference for multinationals or rail suppliers, but not a US mandate | Maps systems, assets, zones/conduits, cyber pathways, risk decisions, and traceable evidence |
| **IEC 62443** | Applicable IACS cybersecurity principles for signaling-adjacent OT, station systems, traction power, depots, and other industrial control environments | Useful for segmentation, access control, risk assessment, and system lifecycle engineering across rail OT | Supports zones, conduits, target controls, reachability modeling, and evidence outputs |
| **NIS2** | Rail infrastructure managers and railway undertakings are named in Annex I; scope, enforcement, and national implementation still matter | Not applicable as a US regulatory obligation | Supports risk management, supply-chain view, incident/resilience evidence, and governance reporting |
| **CER Directive** | Relevant to resilience of designated critical entities, including rail, across natural and human-made risk | Not applicable as an EU directive | Models cyber, power, telecoms, vendor, weather, physical-access, and recovery dependencies |
| **TSA rail cybersecurity directives** | Not applicable outside covered US operations | Covered passenger and freight carriers have requirements addressing incident reporting, response planning, vulnerability assessment, segmentation, access controls, monitoring, risk-based patching, and recurring testing/assessment | Supports implementation-plan evidence, asset/dependency views, assessment scenarios, control validation, and incident/recovery exercises |
| **FRA PTC regulations and safety oversight** | Not directly applicable | PTC systems and changes are subject to FRA safety oversight; cyber actions must be compatible with certified/approved PTC safety and operational requirements | Connects proposed cyber changes to PTC architecture, field assets, operating procedures, and consequence—not a substitute for FRA approvals |
| **NIST SP 800-82 / NIST CSF 2.0** | Often useful as supporting OT security/governance references | Commonly used US OT-security guidance | Supplies rail-specific evidence for broader program and governance frameworks |
| **Safety and RAMS standards** | EN 50126 / EN 50128 / EN 50129 and associated safety assurance remain central; cyber changes must be evaluated in safety context | FRA regulations, railroad safety processes, PTC certification, and operating rules govern key safety outcomes | Makes cyber-pathway decisions understandable alongside existing safety/RAMS and operating evidence |

CLC/TS 50701 is a railway-focused cybersecurity specification built around railway lifecycles and concepts such as zones, conduits, security levels, risk assessment, vulnerability management, and links to IEC 62443. It remains a technical specification rather than a blanket claim that every operator is automatically certified by using it. [ictsecuritymagazine](https://www.ictsecuritymagazine.com/articoli/ertms/)

For the United States, TSA’s directives explicitly cover designated passenger and freight railroad carriers; the 2022 measures require segmentation between IT and OT, access controls, monitoring/detection, risk-based patching, a TSA-approved cybersecurity implementation plan, and a recurring assessment program. [tsa](https://www.tsa.gov/news/press/releases/2022/10/18/tsa-issues-new-cybersecurity-requirements-for-passenger-and-freight)

## Engagement approach

### Section headline

> ## Start with one route, one control environment, or one critical change.

| Engagement | Passenger / transit use case | Freight-rail use case | Output |
|---|---|---|---|
| **Rail Decision Sprint** | CBTC vendor access, OCC dependency, traction-power SCADA, station/tunnel OT, depot network change | PTC support pathway, dispatch/CAD dependency, signal-house access, grade-crossing, yard/terminal OT | Modelled pathway, safety/service consequence, control options, evidence-backed recommendation |
| **System Twin Build** | One metro line, signaling zone, depot, control center, traction-power estate, or rolling-stock maintenance environment | One territory, PTC operational segment, dispatch environment, yard/terminal, locomotive maintenance domain, or communications estate | Validated Cyber Digital Twin, priority queue, architecture views, evidence package |
| **Continuous Twin Operations** | Programs with rolling-stock upgrades, CBTC modernization, changing vendor access, and planned possessions | Network/territory changes, PTC upgrades, fleet and wayside refresh, supplier risk, and ongoing operating-model evolution | Risk deltas, change testing, decision reporting, assurance evidence, and recurring scenario support |

## Final CTA

> ## Start with one line, one territory, or one operational decision.
>
> Bring a signaling architecture, interlocking diagram, PTC map, SCADA topology, or asset list. OXOT will show how the Cyber Digital Twin can trace the pathway, test the control, and support a defensible rail-security decision before the live railway is changed.

**Primary CTA:** **Discuss a rail scenario**  
**Secondary CTA:** **Request the Technical Specification**

**Form fields**

- Name and work email
- Organization
- Role
- Rail segment:
  - Metro / light rail / tram
  - Commuter rail
  - Intercity passenger rail
  - Rail infrastructure manager
  - Freight railroad
  - Short line / regional freight
  - Rolling-stock, signaling, or rail technology supplier
  - Other
- System scope:
  - CBTC / ETCS / ATP / ATS
  - Interlocking / wayside signaling
  - PTC
  - Dispatch / CAD / traffic management
  - Traction-power SCADA
  - Station / tunnel / depot OT
  - Grade crossings
  - Locomotive or rolling-stock maintenance
  - Yard / terminal systems
  - Remote vendor access
- Decision to evaluate:
  - Remediation prioritization
  - Segmentation / access redesign
  - Patching or legacy-asset replacement
  - Signaling / PTC / dispatch change
  - Supply-chain or procurement decision
  - NIS2 / TS 50701 / TSA evidence
  - Incident recovery exercise
  - Other

## Page structure

```text
Hero: Secure rail without compromising safety or service
├─ Sector reality: safe movement, safe stop, and recoverable service
├─ Passenger transit vs US freight rail
├─ Passenger / transit OT architecture and cyber scenarios
├─ Freight rail OT architecture and cyber scenarios
├─ Four rail decisions
├─ Worked use case: passenger signaling-vendor access
├─ Freight rail use-case tab: PTC and dispatching dependencies
├─ Product capabilities
├─ Regulatory and standards context
├─ Engagement approach
└─ CTA: Discuss a rail scenario
```

## Metadata

**SEO title**  
Rail & Transit Cybersecurity Digital Twin | Passenger and Freight Rail | OXOT

**Meta description**  
Test rail cybersecurity changes before they affect live operations. OXOT’s Cyber Digital Twin connects signaling, PTC, dispatch, SCADA, OT networks, safety context, and passenger or freight-service consequences.

**H1**  
Secure the railway without compromising safety or service.

**Suggested internal links**

- `/platform/cyber-digital-twin`
- `/platform/decisions/fix-first`
- `/platform/decisions/change-safely`
- `/platform/deployment-data-sovereignty`
- `/assurance/iec-62443`
- `/assurance/ts-50701`
- `/assurance/nis2`
- `/resources/technical-specification`
- `/contact`