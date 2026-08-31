# IEC 62443 Assurance Page

**URL:** `/assurance/iec-62443`  
**Navigation label:** `IEC 62443`  
**Primary CTA:** `Discuss an IEC 62443 system model`  
**Secondary CTA:** `Request the Technical Specification`

***

## Hero

### Make IEC 62443 evidence part of the system model.

IEC 62443 is not a diagram exercise, a vulnerability register, or a document produced at the end of a project. It is a risk-based approach to securing industrial automation and control systems throughout their lifecycle.

OXOT’s Cyber Digital Twin connects the system under consideration, its assets, zones, conduits, operational constraints, cyber pathways, consequences, and risk-treatment decisions in one evolving model.

**CTA:** `Discuss an IEC 62443 system model`  
**Secondary CTA:** `Explore the Cyber Digital Twin`

```text
System under consideration
        ↓
Zones and conduits
        ↓
Risk and target security levels
        ↓
Security requirements and controls
        ↓
Traceable evidence and change history
```

IEC 62443-3-2 establishes requirements to define the system under consideration, partition it into zones and conduits, assess risk for each, establish target security levels, and document security requirements. [webstore.iec](https://webstore.iec.ch/en/publication/30727)

***

## The challenge

### Most IEC 62443 evidence is fragmented before the work even begins.

An industrial environment is rarely documented in one place. Engineering drawings, P&IDs, control logic, SCADA projects, asset registers, VLAN diagrams, firewall rules, maintenance procedures, safety studies, and supplier records commonly sit in different repositories and are maintained by different teams.

This creates a familiar problem:

- The asset register does not match the engineering drawings.
- The network diagram does not reflect the actual segmentation.
- The zone model exists, but no one can show which routes are actually permitted.
- Risk treatment is recorded, but the physical or operational consequence is not connected to it.
- A control is implemented, but no evidence shows what it closes or what it must preserve.
- A project delivers an assurance package that drifts out of date as the plant changes.

> **A zone-and-conduit diagram is useful. A model that proves what can traverse it is more useful.**

OXOT builds the assurance view from the operational environment: facility and process evidence, OT assets, control-system configuration, network state, dependencies, and engineering consequence.

## What IEC 62443 requires

### A structured path from system boundary to security requirements.

IEC 62443 is a family of standards for industrial automation and control system security. It includes different requirements for asset owners, service providers, system integrators, and component/product suppliers. The series addresses security across the IACS lifecycle rather than treating cyber risk as an IT-only activity. [iec](https://www.iec.ch/blog/understanding-iec-62443)

For an asset owner or system-design engagement, the central logic is:

| Step | IEC 62443 focus | Question OXOT helps answer |
|---|---|---|
| 1. Define the system | Define the system under consideration | What facility, line, site, control environment, or operational service is actually in scope? |
| 2. Identify assets and functions | Understand the IACS environment and its components | What devices, applications, controllers, networks, safety functions, and operators support that system? |
| 3. Partition the system | Group assets into zones and define conduits | Which assets share security characteristics, and how are zones allowed to communicate? |
| 4. Assess risk | Evaluate threats, vulnerabilities, likelihood, and consequence | What can be reached, what could happen, and which risks are not tolerable? |
| 5. Establish SL-T | Define target security levels for zones and conduits | What protection capability is required for each relevant security objective? |
| 6. Specify requirements | Define controls and security requirements | Which technical, procedural, and architectural controls reduce risk to an acceptable level? |
| 7. Implement and validate | Design, build, operate, and change securely | Does the control close the intended pathway without compromising safe or reliable operation? |
| 8. Maintain evidence | Keep records current across the lifecycle | What changed, what evidence supports the current state, and when should it be reviewed? |

IEC 62443-3-2 is specifically centered on security risk assessment, system partitioning, zones, conduits, and target security levels. IEC 62443-3-3 then defines system-security requirements and security levels for the defined zones and conduits. [webstore.iec](https://webstore.iec.ch/en/publication/30727)

***

## The OXOT approach

### Model the system you operate—not the diagram you wish you had.

OXOT begins with approved customer evidence and builds a working Cyber Digital Twin of the system under consideration.

```text
Engineering and operational evidence
P&IDs • process diagrams • FMECA • SCIL / safety evidence
asset inventories • PLC logic • SCADA / HMI configuration
network diagrams • topology exports • firewall rules • PCAP flows
maintenance records • supplier data • operating procedures
                          ↓
OXOT Cyber Digital Twin
Facility • assets • network state • dependencies • controls
zones • conduits • pathways • operational consequence
                          ↓
IEC 62443 assurance evidence
System definition • zone/conduit views • risk rationale
SL-T support • treatment decisions • control validation
technical documentation • change history
```

The Twin can represent an environment through P&ID, Purdue, network, dependency-graph, and site views. It supports facility physics, controller and configuration mapping, virtual network state, VLAN/subnet/firewall modeling, industrial protocol context, and engineering-grounded consequence analysis.
### The design principle

> **Consequence first. Reachability second. Control decision third.**

A critical vulnerability on an isolated asset may not be a critical operational risk. A moderate issue on a reachable engineering workstation, safety-related controller, or critical operational dependency may require immediate attention.

The Twin evaluates risk in context:

```text
Engineering consequence
What physically, operationally, or financially happens?
        ↓
Cyber pathway
Can a credible route reach the asset or function?
        ↓
Threat and vulnerability context
What exploit, actor capability, configuration, or supplier exposure applies?
        ↓
Control effect
What route does a candidate control close, and what does it leave open?
```

OXOT’s product model uses customer safety, reliability, operational, and engineering evidence to establish consequence, then evaluates cyber reachability using the modelled network and system topology. 
***

## System under consideration

### Define the boundary before defining the controls.

A system under consideration is not necessarily an entire enterprise, plant, campus, or railway. It is the specific IACS environment to be assessed and secured.

Examples include:

- One manufacturing process line or cell.
- A water-treatment process and its chemical-dosing controls.
- A generating unit, substation, or utility control environment.
- A rail signaling zone, depot, traction-power system, or operations-control interface.
- A hyperscale data-center cooling plant, BMS/EPMS environment, or power path.
- A defense base facility-control environment, sovereign data center, or logistics site.
- A specific product, system integration, or remote-maintenance service boundary.

### OXOT system-boundary outputs

| Evidence element | What the Twin provides |
|---|---|
| Scope definition | Defined facility, process, system, service, site, line, control environment, or operational capability |
| Asset population | Controllers, PLCs, DCS, RTUs, HMIs, SCADA, engineering workstations, switches, firewalls, field devices, sensors, actuators, and virtualized elements |
| Process and functional context | P&IDs, equipment relationships, control functions, safety/reliability context, operating constraints, minimum operating requirements |
| Interface definition | Connections to enterprise IT, operational DMZs, vendors, cloud services, remote support, historians, asset management, and other OT systems |
| Dependency view | Internal dependencies, supplier dependencies, critical shared services, external data/control paths, and recovery requirements |
| Evidence links | Source document, configuration export, topology record, asset record, operational procedure, or approved assumption associated with a model object |

***

## Zones and conduits

### Show the boundaries. Then test the routes.

IEC 62443 uses **zones** to group logical or physical assets that share common security requirements and **conduits** to represent the communication channels connecting zones. Zones can be defined by criticality, operational function, location, required access, responsible organization, or other relevant risk criteria. [programs.isa](https://programs.isa.org/hubfs/06%20-%20ASCI/0920-ISASecure-Certifications-Guide-FINAL.pdf)

OXOT turns zones and conduits from a static architecture diagram into a navigable model.

```text
Enterprise zone
        │
Operational DMZ
        │
Operations management zone
        │
Control zone
        │
Safety or critical-control zone
        │
Field-device zone
```

### What OXOT models

| IEC 62443 concept | OXOT capability |
|---|---|
| Zones | Logical/physical groupings of assets, systems, operational functions, or shared security requirements |
| Conduits | Communication paths, services, protocols, firewall rules, routing, access controls, and trust boundaries between zones |
| Purdue context | Level 0–4 operational context, including field devices, control, supervisory, operations management, enterprise, and DMZ boundaries |
| Segmentation | VLANs, subnets, virtual firewall controls, zones, remote-access boundaries, and logical separation |
| Allowed flows | Required OT/IT communications, management traffic, historian data, engineering access, vendor support, and protocol-specific pathways |
| Actual reachability | A traceable route from entry point through network and system dependencies to a target asset/function |
| Control simulation | A virtual firewall, segmentation boundary, routing change, vendor-access control, or patching decision inserted into the model |

### Key message

> A conduit is not secure because it exists on an architecture slide. It is secure when its permitted services, routes, access controls, and operational dependencies are understood—and when its remaining exposure is acceptable.

The technical model supports network-state representation, VLAN/subnet and virtual-firewall modeling, Purdue segmentation, DMZ verification, and PCAP flow analysis. 

***

## Risk assessment

### Risk should reflect the consequence that the system can actually produce.

IEC 62443-3-2 treats IACS cybersecurity as a risk-management problem. The relevant risk depends on the threats, likelihood, vulnerabilities, and consequences associated with a specific environment. [isa](https://www.isa.org/intech-home/2019/january-february/departments/united-nations-commission-to-integrate-isa-iec-624)

In an OT environment, consequence should not be guessed from a vulnerability score. It should be grounded in engineering and operational reality.

### Evidence OXOT can use

| Evidence source | What it contributes |
|---|---|
| FMECA | Failure modes, effects, and criticality at equipment or component level |
| Hazard log / HAZOP evidence | Hazards, barriers, and relevant worst-case process outcomes |
| SCIL / SIL context | Safety-instrumented functions, controllers, sensors, valves, and protective functions |
| Reliability-critical item list | Assets whose loss affects reliability, product quality, availability, or long-term equipment health |
| Minimum operating requirements | The conditions that must be maintained to continue operations safely |
| Downtime and capacity curves | Operational, service, production, capacity, or financial implications of disruption |
| P&IDs and process diagrams | Equipment, process flows, interlocks, instrumentation, control relationships, and physical dependencies |
| Network topology and traffic evidence | Reachability, zones, conduits, communication patterns, remote access, and boundary enforcement |
| PLC / DCS / SCADA / HMI data | Configuration, control logic, tag relationships, controllers, engineering tools, and supervisory paths |
| Supplier and BOM data | Vendor, hardware, firmware, certificates, remote-maintenance, support, cloud, and software dependencies |
| Threat and vulnerability information | Known exploitation, exploit likelihood, severity, attack patterns, sector targeting, and relevant actor capability |

### Risk chain

```text
1. Asset or function identified
   A PLC, HMI, SIS-related controller, engineering workstation, server, switch,
   remote-access gateway, sensor, actuator, or supporting service

2. Cyber pathway established
   The model determines whether a route can reach that asset or function

3. Operational consequence traced
   Device cascade, process dependency, safety/reliability evidence, or service
   impact establishes what could happen if that function is affected

4. Risk treatment evaluated
   The Twin compares candidate controls and shows the remaining pathway,
   residual exposure, and operational impact
```

OXOT’s specification describes this as a consequence chain: a reachable path terminates at a controller tag or field device, a device cascade is traced, facility/process physics determines the result, and safety, reliability, operational, and downtime inputs establish the resulting impact. 

***

## Target security levels

### Support SL-T reasoning with the actual risk context.

IEC 62443-3-2 requires the establishment of a **target security level**—SL-T—for each relevant zone and conduit. Security level is not intended to be a generic “maturity score.” It is a risk-informed target for the security capability required to reduce risk to a tolerable level.

The security level may be represented as a vector across the IEC 62443 foundational requirements:

```text
IAC — Identification and Authentication Control
UC  — Use Control
SI  — System Integrity
DC  — Data Confidentiality
RDF — Restricted Data Flow
TRE — Timely Response to Events
RA  — Resource Availability
```

IEC guidance describes the target security level as a vector with an element for each foundational requirement, allowing different target levels to be defined where risk differs by security objective. [syc-se.iec](https://syc-se.iec.ch/deliveries/cybersecurity-guidelines/security-standards-and-best-practices/iec-62443/)

### How OXOT supports SL-T work

OXOT does **not** automatically assign an authoritative target security level. The responsible asset owner, integrator, engineering authority, and assurance process retain that responsibility.

OXOT supports the reasoning by making visible:

- The zone’s operational function and criticality.
- The assets and safety/reliability dependencies within the zone.
- The conduits and communication services entering or leaving the zone.
- Credible pathways that reach the zone or traverse its conduits.
- Vulnerability and threat context relevant to those pathways.
- Existing controls and their modeled effect.
- Residual routes that remain after a candidate control is applied.
- The evidence, assumptions, and accountable decision behind the target.

| Security objective | OXOT evidence that can support discussion |
|---|---|
| Identification and authentication | User, role, vendor-access, certificate, account, remote-maintenance, and identity dependencies |
| Use control | Privilege boundaries, engineering access, remote sessions, command pathways, and approval workflows |
| System integrity | Firmware, configuration, logic, update paths, engineering tools, backups, and change dependencies |
| Data confidentiality | Sensitive data flows, protocol paths, cloud/API dependencies, and access boundaries |
| Restricted data flow | Zones, conduits, VLANs, subnets, routing, firewall policies, protocol flows, and actual reachability |
| Timely response to events | Alarm, historian, monitoring, logging, incident-response, time-service, and operator-notification dependencies |
| Resource availability | Redundancy, dependencies, power/cooling/service constraints, shared control paths, recovery procedures, and failure cascades |

***

## Risk treatment

### Test the control before changing the plant.

A security design is only useful if it reduces the intended risk without creating an unacceptable operational, safety, reliability, or recovery problem.

OXOT lets teams model candidate controls in the Twin first.

```text
Baseline
Current zones, conduits, dependencies, and reachable pathways
        ↓
Candidate control
Firewall rule • segmentation boundary • vendor-access redesign
patch campaign • system replacement • monitoring control • process change
        ↓
Simulation
Routes closed • routes preserved • residual routes • operational impact
        ↓
Decision
Implement now • sequence during outage • add compensating controls
defer with evidence • redesign the option
```

### Common IEC 62443 treatment decisions

| Candidate decision | Questions the Twin helps test |
|---|---|
| Segmentation and zones | Which routes are closed? Which required OT protocols and operating flows remain? |
| Firewall and conduit rules | Does the rule stop a cyber path without interrupting control, historian, alarm, vendor, or safety-support traffic? |
| Remote-access redesign | Can persistent vendor access be replaced by brokered, time-limited, approved, and recorded access? |
| Patching | Does the patch reduce exposure? What compatibility, outage, rollback, and residual-path issues remain? |
| Legacy asset isolation | Can a difficult-to-patch controller be isolated or protected with compensating controls until replacement? |
| Product or supplier selection | Which option changes reachable pathways, lifecycle risk, support dependencies, and consequence most effectively? |
| Monitoring and response controls | Does the monitoring path provide timely detection and response without becoming a new management or access route? |
| Architecture modernization | Which migration sequence reduces risk without producing an unacceptable operational or project-risk spike? |

The OXOT product sheet describes this explicitly: the organization can add a virtual firewall, redraw segmentation, or apply a patch campaign in the model, rerun attack paths, and compare the outcome without touching production. 
***

## Evidence outputs

### Produce evidence that keeps its connection to the system.

An IEC 62443 engagement can use the Twin to create structured, source-linked outputs for engineering, security, operations, procurement, and assurance stakeholders.

| Output | Typical use |
|---|---|
| System-under-consideration definition | Scope approval, system design, program planning, audit preparation |
| Asset and functional model | Engineering review, asset governance, control-system lifecycle work |
| Zone and conduit model | Architecture review, segmentation design, security-level discussion |
| Network and pathway view | Firewall design, remote-access assessment, attack-path and boundary analysis |
| Risk scenario | Engineering/security workshops, management review, threat/risk assessment |
| Consequence chain | Safety, reliability, operations, investment, and risk-treatment rationale |
| Security-level support view | SL-T discussion with asset owner, integrator, and responsible engineering/assurance parties |
| Control-treatment record | Why a control was selected, what it changes, residual risk, approval, and review trigger |
| BOM and supplier dependency view | Product lifecycle, supplier risk, vulnerability management, procurement decisions |
| Change simulation report | Evidence for a proposed segmentation, firewall, patch, vendor-access, or modernization change |
| Risk acceptance record | Documented exception, compensating controls, accountable owner, expiry/review condition |
| Change and risk delta | Evidence that tracks altered assets, routes, configuration, supplier posture, or threat conditions |
| Technical documentation view | Framework-aligned technical evidence that supports, but does not replace, the required assurance process |

OXOT supports outputs including machine-readable CycloneDX and DEXPI exports, interactive P&ID, network, Purdue, graph, and site views, plus generated technical-file sections with evidence links. 
***

## How OXOT fits roles

### The same model supports different accountable parties.

| Role | What they need | What OXOT provides |
|---|---|---|
| Asset owner | A security program, risk ownership, evidence, and decision accountability | System scope, priorities, treatment rationale, exception records, governance views |
| OT / controls engineer | A safe design that preserves required process and control behavior | P&ID/control context, required flows, change simulation, operational constraints |
| Network / security architect | Defensible zones, conduits, remote access, and segmentation | Topology, reachability, firewall/route simulation, residual-path analysis |
| Safety / reliability lead | Evidence that cyber changes do not ignore protective functions or operational consequence | FMECA, SCIL/SIL, hazard, reliability, minimum-operating and cascade context |
| System integrator | A structured basis for secure system design, implementation, and handover | System boundary, security requirements, architecture/evidence outputs, change traceability |
| Product supplier | Context for components, software, firmware, certificates, interfaces, and lifecycle dependency | BOMs, interface/dependency model, vulnerability and update context |
| Procurement | Comparable risk and lifecycle consequences of suppliers, support arrangements, and investment options | Supplier dependencies, lifecycle/BOM context, modeled control value |
| Assurance / audit team | Traceability from claim to evidence | Drill-down evidence, source references, change history, assumptions, decision records |
| Leadership | A clear view of what matters and why investment is justified | Consequence-led priorities, control options, investment comparisons, trends |

IEC 62443-2-1 is directed at asset owners responsible for establishing and implementing an IACS cybersecurity program, while other parts of the series address system design, system security requirements, components, and service-provider practices. [isa](https://www.isa.org/products/ansi-isa-62443-2-1-2024-security-industrial-automa)

***

## Evidence and provenance

### Every IEC 62443 claim should be traceable.

IEC 62443 evidence becomes more credible when the reader can move from a security requirement or decision back to the real environment and its source records.

```text
Claim
“This remote-access pathway requires stronger restriction.”
        ↓
Modeled route
Vendor connection → jump host → engineering workstation → control zone
        ↓
Asset / operational context
Controller supports a safety-, reliability-, or production-critical function
        ↓
Source evidence
Network export • firewall configuration • control-system record
P&ID • FMECA / hazard evidence • access procedure
        ↓
Treatment decision
Brokered access + segmentation + scheduled hardening
        ↓
Review condition
Reassess after vendor-tool upgrade, firewall change, or planned outage
```

### Evidence principles

- Grounding in customer engineering, operational, safety, reliability, asset, and network evidence.
- Citations retained for approved external vulnerability, threat, supplier, and contextual inputs.
- Clear distinction between customer facts, externally sourced information, assumptions, and OXOT calculations.
- Visible gaps: unknown data remains unknown rather than becoming an invented value.
- Drill-down from organizational outcome to zone, conduit, asset, component, pathway, source record, and decision.
- Change history that shows how new equipment, altered configurations, new network routes, supplier changes, or vulnerability intelligence changes the model.

**Link CTA:** `Explore Evidence & Data Provenance`

OXOT’s published data discipline states: grounding first; no fabricated values; null over zero for unsourced fields; source citations retained; and traceable, drillable outputs. 

***

## Scope statement

### OXOT supports IEC 62443 evidence. It does not certify compliance by itself.

OXOT can support IEC 62443-aligned system modeling, zones and conduits, risk assessment, risk-treatment reasoning, control simulation, technical evidence, and lifecycle traceability.

However:

- OXOT does not automatically certify a system, organization, product, or service.
- OXOT does not determine a customer’s official security-level target or accept residual risk on its behalf.
- OXOT does not replace the responsibilities of the asset owner, system integrator, product supplier, service provider, safety authority, assessor, auditor, or certification body.
- OXOT does not guarantee IEC 62443 conformity.
- Security decisions and safety/operational approvals remain with the responsible customer and qualified authorities.
- Model results depend on the completeness, quality, and approved interpretation of provided evidence.

This is why the Twin makes sources, assumptions, gaps, model calculations, and responsible decisions visible.

***

## Closing CTA

### Start with one system under consideration.

Bring a P&ID, network diagram, asset list, topology export, FMECA, control-system configuration, or a proposed segmentation or remote-access change. OXOT will show how the Cyber Digital Twin can define the system, map zones and conduits, test the pathway, and support a traceable IEC 62443 decision.

**Primary CTA:** `Discuss an IEC 62443 system model`  
**Secondary CTA:** `Request the Technical Specification`

***

## Metadata

**SEO title**  
IEC 62443 Cybersecurity Evidence & Zones and Conduits | OXOT

**Meta description**  
Build IEC 62443-aligned evidence from the industrial system you operate. OXOT’s Cyber Digital Twin models systems under consideration, zones, conduits, cyber pathways, consequences, controls, and traceable risk-treatment decisions.

**H1**  
Make IEC 62443 evidence part of the system model.

**Suggested internal links**

- `/assurance`
- `/assurance/cyber-resilience-act`
- `/assurance/ts-50701`
- `/assurance/evidence-data-provenance`
- `/platform/cyber-digital-twin`
- `/platform/decisions/fix-first`
- `/platform/decisions/change-safely`
- `/platform/deployment-data-sovereignty`
- `/resources/technical-specification`
- `/contact`