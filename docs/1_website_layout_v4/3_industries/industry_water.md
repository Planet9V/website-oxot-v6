 Supporing "Industy" on OXOT Website
 
 **Water & Wastewater** industry page brief designed to be materially different from the Manufacturing and Energy pages. The central story is not production efficiency or grid reliability; it is **protecting safe drinking water, public health, environmental compliance, and continuous sanitation when distributed, often under-resourced OT environments are targeted.**

This sector needs unusually direct messaging because drinking-water and wastewater organizations are often highly distributed, operate aging automation, rely on small teams and integrators, and must maintain service through flooding, storms, power loss, and cyber incidents. ENISA’s 2026 NIS360 assessment places drinking water and wastewater among the least mature sectors assessed, with drinking water somewhat ahead of wastewater. [enisa.europa](https://www.enisa.europa.eu/sites/default/files/2026-05/ENISA%20NIS360%202026.pdf)

## Page purpose

**URL:** `/industries/water-wastewater`

**Primary audiences**

- Water-utility general manager, operations director, or superintendent
- Treatment-plant manager and chief operator
- SCADA / OT manager, automation engineer, electrical/instrumentation team
- CISO, IT manager, or municipal technology leader
- Drinking-water quality, wastewater compliance, environmental, and resilience teams
- Regional water authority, public-works, and emergency-management leaders

**Primary conversion**

> **Discuss one treatment plant, pump station, or remote-access risk**

**Secondary conversion**

> **Bring one P&ID, process-flow diagram, or SCADA asset list**

## Hero

> ## Protect safe water and sanitation—before a cyber incident becomes a public-health event.
>
> OXOT’s Cyber Digital Twin connects treatment processes, field automation, SCADA pathways, and operational consequences. Test a change, prioritize the risks that can affect water quality or environmental compliance, and improve resilience without touching the live process.

**CTAs**

- **Discuss a water-system scenario**
- **See how the Twin works**

**Hero visual**

Use a **source-to-tap / influent-to-effluent** interactive system—not an industrial-generic network map.

```text
Drinking-water path:
Source → intake → treatment → clearwell → pumping → distribution → customers

Wastewater path:
Collection → lift station → headworks → biological treatment → disinfection →
effluent / reuse → receiving water
```

Layer controls over the process:

```text
Pump controls • chemical dosing skids • analyzers • PLCs • RTUs • SCADA •
telemetry • radio/cellular links • remote engineering access
```

Then let the user switch views:

```text
Water process        OT / SCADA paths        Cyber route        Public-health / compliance impact
```

The key visual must show why water differs from other verticals: a cyber route may alter dosing, disable monitoring, create a pump overflow, prevent treatment, or obscure an out-of-spec condition—not merely stop a production line.

## Sector reality

### Section headline

> ## A cyber incident can affect the quality of water, the environment, and the community—at the same time.

**Suggested body copy**

Water systems are both highly physical and highly distributed. A utility may operate treatment plants, reservoirs, booster stations, lift stations, well fields, storage tanks, wastewater facilities, remote telemetry units, chemical systems, laboratories, and thousands of miles of distribution or collection infrastructure. Many assets operate unattended and communicate through radio, cellular, leased-line, satellite, or internet-connected remote-access arrangements.

The operational consequence is distinctive. In drinking water, the concern may be inadequate disinfection, excessive chemical dosing, loss of pressure, loss of source monitoring, or inability to confirm water quality. In wastewater, it may be untreated discharge, sewer overflow, pump-station failure, aeration disruption, permit exceedance, damage to biological treatment, or an inability to maintain compliant effluent.

CISA reported a significant increase in cyber actors targeting PLCs in the water and wastewater sector in 2026, including cases in which exposed controllers had passwords changed or IP addresses altered, locking operators out and disrupting operations. [cisa](https://www.cisa.gov/news-events/alerts/2026/07/30/cisa-urges-water-and-wastewater-systems-sector-protect-ot-against-activity-targeting-plcs)

### Sector-specific challenges

| Challenge | Why it is different in water and wastewater |
|---|---|
| Distributed, unattended assets | Remote pump stations, lift stations, wells, reservoirs, tanks, and outfalls may be geographically dispersed and depend on low-bandwidth or intermittent communications |
| Direct physical-process consequences | A manipulated dosing skid, chlorine residual setpoint, pH controller, valve, pump, or aeration system can affect water quality, treatment performance, or environmental discharge |
| Public-health and environmental obligations | Operators must protect consumers and receiving waters while meeting regulatory, permit, monitoring, and reporting requirements |
| Small OT teams | Many utilities have limited in-house cyber, SCADA, engineering, and incident-response capacity, with substantial reliance on integrators and vendors |
| Aging, long-lived automation | Legacy PLCs, RTUs, radios, HMIs, dial-up/cellular equipment, unsupported operating systems, and thin documentation are common |
| Manual-operating dependency | Manual operation may be possible but difficult, staffing-intensive, slower, or unsafe—especially across multiple remote facilities |
| Chemical-process risk | Chlorine, sodium hypochlorite, ammonia, coagulants, polymers, lime, fluoride, acids, caustics, and other treatment chemicals create handling, dosing, and containment concerns |
| Weather and power resilience | Flooding, drought, wildfire, storm damage, power loss, and telecom outages frequently coincide with peak operational demand |
| Contractor and OEM access | Integrators and equipment vendors often remotely support PLCs, telemetry, dosing equipment, UV systems, VFDs, analysers, and SCADA platforms |
| Municipal IT interdependence | Water OT may share identity, remote access, network services, procurement, facilities, and incident-response functions with broader city or county IT |

## Typical water OT architecture

### Section headline

> ## Model the treatment process and the remote field estate together.

The industry page should provide two selectable visual diagrams: **Drinking Water** and **Wastewater**. These should share common SCADA layers but use different physical processes, consequences, assets, and decision language.

### Drinking-water architecture

```text
Source / raw water
Rivers • reservoirs • groundwater wells • intakes
                    │
Treatment
Screens • coagulation • flocculation • sedimentation • filtration
Disinfection • pH adjustment • fluoridation • clearwell
                    │
Storage and distribution
High-service pumps • reservoirs • tanks • pressure zones • PRVs
Booster stations • meters • pressure / chlorine residual monitoring
                    │
Control and operations
PLCs • RTUs • VFDs • HMIs • SCADA • historian • laboratory systems
                    │
Communications
Plant LAN • radio • cellular • private WAN • fiber • leased lines • VPN
```

### Wastewater architecture

```text
Collection system
Gravity sewer • force main • lift station • wet well • level instrumentation
                    │
Headworks and primary treatment
Screens • grit removal • primary clarifiers • pumps
                    │
Biological treatment
Aeration blowers • basins • DO / ammonia / nitrate analysers
RAS / WAS pumps • clarifiers • nutrient removal controls
                    │
Tertiary treatment and disinfection
Filtration • UV • chlorine / dechlorination • reuse systems
                    │
Solids and biosolids
Thickening • digestion • dewatering • biogas • storage / disposal
                    │
Control and monitoring
PLCs • RTUs • SCADA • HMI • historian • alarms • remote telemetry
```

### Common OT, telemetry, and process technologies

| Technology area | Water and wastewater examples |
|---|---|
| Plant control | PLCs, PACs, RTUs, VFDs, MCCs, HMIs, local panels, SCADA servers, engineering workstations |
| Remote telemetry | Radio, cellular, licensed/unlicensed spectrum, satellite, serial telemetry, microwave, leased lines, VPN-based remote sites |
| Common protocols | Modbus RTU/TCP, DNP3, OPC DA/UA, EtherNet/IP, PROFINET, BACnet, MQTT, serial-to-IP gateways, proprietary radio protocols |
| Water quality instrumentation | Turbidity, pH, conductivity, chlorine residual, ORP, fluoride, UV transmittance, flow, level, pressure, temperature, TOC |
| Wastewater instrumentation | Flow, level, dissolved oxygen, ammonia, nitrate/nitrite, pH, ORP, turbidity, MLSS, sludge blanket, biogas methane/H₂S |
| Critical actuation | Pumps, valves, gates, VFDs, chemical metering pumps, blowers, mixers, UV banks, chlorinators, polymer systems, belt presses |
| Operations systems | Historian, alarm-management platform, CMMS/EAM, laboratory information systems, GIS, hydraulic-modeling tools, work-order systems |
| Physical process evidence | P&IDs, process-flow diagrams, electrical single-lines, pump curves, chemical dosing calculations, control narratives, alarm rationalization, SOPs, maintenance history, permit limits |

The OXOT Twin can combine P&IDs, process and equipment data, PLC/SCADA/RTU/HMI configurations, network topology, passive traffic evidence, industrial protocol information, and operational safety/reliability inputs.

## Water-specific risk scenarios

### Section headline

> ## Trace a cyber route to a water-quality, flooding, or permit consequence.

Unlike the manufacturing page, do not use generic “production outage” examples. These scenarios should be visually tied to water chemistry, hydraulics, treatment barriers, and environmental compliance.

| Scenario | Cyber / OT pathway | Water or wastewater impact | Decision the Twin supports |
|---|---|---|---|
| Publicly exposed PLC or RTU | Internet-exposed controller, weak remote-access path, default/shared credentials, or insecure cellular/radio gateway | Operator lockout, altered setpoints, stopped pump, unavailable telemetry, inability to manage a remote facility | Remove direct exposure; model secure gateway/VPN, allowlists, backup and recovery requirements |
| Drinking-water chemical dosing manipulation | Path reaches chlorine, hypochlorite, fluoride, coagulant, pH, caustic, acid, or chemical-feed PLC/HMI | Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk | Map control points and safety barriers; test restricted engineering access and segment chemical systems |
| Loss of disinfection visibility | Compromise disrupts analyser data, SCADA alarms, historian, PLC/HMI, or communications | Utility cannot confirm residual, turbidity, UV performance, or treatment state; may need boil-water or operational response | Identify required telemetry paths, fail-safe conditions, backup measurement and manual-operating actions |
| Wastewater lift-station outage | Remote RTU, VFD, level sensor, or communications path is unavailable or manipulated | Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting | Identify reachable field assets, power/telemetry dependencies, and safe fallback controls |
| Aeration-process disruption | PLC/VFD/blower control, dissolved-oxygen loop, or plant HMI is altered | Nitrification failure, elevated ammonia, biological-process upset, permit exceedance, prolonged recovery | Test segmentation, control-lockdown, and fallback operating strategies |
| Pump / pressure-zone manipulation | Remote pump, VFD, PRV, valve, or pressure controller is affected | Low pressure, tank overflow, pressure transient, service disruption, possible contamination ingress risk | Model hydraulic and operational implications of control changes before implementation |
| Ransomware in the SCADA/utility environment | Enterprise compromise reaches SCADA servers, historian, domain services, engineering workstations, file shares, or remote-access infrastructure | Loss of view/control, manual operation, delayed response, degraded coordination across multiple facilities | Prioritize recovery dependencies and safe isolation steps |
| Vendor / integrator compromise | Vendor laptop, support portal, remote-maintenance tunnel, or system-integrator account reaches plant or field controls | Persistent unauthorized path, configuration changes, disrupted support, fleet-wide exposure across standardized assets | Compare vendor-access architectures and contract/control requirements |
| Storm, flood, or power outage plus cyber disruption | Weather event reduces staffing, power, fuel, and telecom reliability while a cyber incident affects OT visibility or control | Compounded inability to pump, treat, monitor, communicate, or recover | Model combined failure paths, manual workarounds, backup power, communications, and restoration priorities |
| Undocumented field-asset drift | Replacement RTU, modem, PLC, VFD, or radio configuration is changed during field maintenance without full documentation | Security model and operating assumptions become inaccurate; new remote route or unsafe configuration persists | Detect model deltas and re-evaluate reachability and operational impact |

EPA and CISA guidance emphasizes direct PLC internet exposure as a concrete sector risk. CISA recommends removing public exposure, using a VPN or gateway rather than direct PLC access, protecting credentials, allowing only known authorized engineering assets, and maintaining clean PLC-image backups. [cisa](https://www.cisa.gov/news-events/alerts/2026/07/30/cisa-urges-water-and-wastewater-systems-sector-protect-ot-against-activity-targeting-plcs)

## The four water decisions

### Section headline

> ## Four decisions that protect treatment, distribution, and environmental compliance.

| OXOT decision | Drinking-water and wastewater language | What the Twin provides |
|---|---|---|
| **What do we fix first?** | “Which cyber pathway can affect treatment quality, disinfection, pumping, overflow risk, process monitoring, or permit compliance?” | A NOW / NEXT / NEVER prioritization based on reachable control points and process/public-health/environmental consequence |
| **What should we spend?** | “Should we fund secure remote access, SCADA replacement, field-RTU modernization, network segmentation, backup communications, additional instrumentation, or generator capacity?” | A common consequence model for comparing capital and operational investments—not a generic security score |
| **Can we change safely?** | “Can we reconfigure this firewall, remote pump-station connection, VLAN, PLC firmware, SCADA server, or chemical-dosing network without losing monitoring or control?” | A virtual test of required data/control flows, residual exposure, failover requirements, and process impact |
| **What can we leave alone?** | “Which legacy asset is isolated, has limited operational consequence, or can safely wait for planned renewal—with a documented review trigger?” | A defensible exception record tied to actual reachability, treatment consequence, owner, compensating controls, and reassessment conditions |

The product’s decision framework is useful in water because it can connect a reachable pathway to the physical process, then classify remediation as NOW, NEXT, or NEVER rather than letting a generic CVSS backlog determine operational priorities. 

## Worked use case

### Section headline

> ## Worked example: secure chemical-dosing control without compromising water quality.

**Label:** *Illustrative scenario—no customer data.*

### Scenario

A drinking-water treatment plant uses a PLC-controlled sodium-hypochlorite dosing skid. The dosing sequence relies on incoming flow, chlorine-residual feedback, pump status, chemical-tank level, and high/low alarm conditions. The PLC and local HMI are accessible through a maintenance network that also supports a system integrator’s remote troubleshooting connection.

A cybersecurity review finds that the remote connection has broad access to the plant network and that the chemical-dosing PLC is reachable through an outdated pathway. The simple recommendation is “disconnect the access.” Operations objects: the integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously.

### Inputs to the Twin

```text
Treatment-process evidence
- Process-flow diagram and P&IDs
- Dosing-control narrative and interlocks
- Chemical dosing calculations and acceptable operating range
- Residual-monitoring points and sampling requirements
- Clearwell, contact-time, and treatment operating constraints
- Emergency operating procedures and manual-dosing capability

OT and network evidence
- Chemical PLC, local HMI, VFD / metering-pump controls
- SCADA data flow and alarm dependencies
- Engineering workstation and vendor-access route
- Firewall, VLAN, routing, remote gateway, and observed OT traffic
- Existing backups, PLC project files, and recovery procedure

Operational-consequence evidence
- Water-quality escalation thresholds
- Loss-of-treatment and service-impact assumptions
- Staff response time, operator coverage, and manual operating limitations
- Relevant regulatory and notification obligations
```

### Modelled chain

```text
Compromised vendor credentials / remote-support endpoint
        ↓
Maintenance network route
        ↓
Chemical-dosing PLC or engineering workstation becomes reachable
        ↓
Setpoint, logic, mode, or pump-state manipulation becomes possible
        ↓
Inadequate or excessive disinfection / loss of treatment verification
        ↓
Water-quality event, emergency response, service disruption, public-health risk
```

### Controls tested

| Candidate control | What the Twin tests | Decision insight |
|---|---|---|
| Disconnect remote support | Whether fault recovery, calibration, or emergency assistance becomes operationally unacceptable | May lower cyber exposure but increase recovery and continuity risk |
| Broker vendor access | MFA, approval, time-limited sessions, jump host, recording, per-asset access, and removal of persistent connectivity | Preserves necessary support while removing uncontrolled reachability |
| Segment the chemical skid | Virtual firewall rules and conduit design between vendor path, engineering workstation, SCADA, and dosing PLC | Shows required process/monitoring flows and the routes that can be safely closed |
| Harden the controller | Password protection, clean PLC-image backup, restricted programming path, allowlisting, and change-control workflow | Reduces takeover/lockout risk and improves recovery readiness |
| Add process safeguards | Independent alarming, local/manual fallback, separate measurement verification, or operating procedure changes | Shows which controls reduce consequence if cyber protections fail |

### Result message

> The recommendation is not merely “secure the PLC.” It is a water-quality decision: reduce unauthorized reachability, preserve controlled technical support, verify that SCADA and alarms still function, and ensure operators can maintain compliant disinfection if digital control is unavailable.

This example closely reflects the sector threat pattern CISA has highlighted: internet-exposed PLCs can be used to lock operators out or change device configuration, while water utilities must preserve the ability to monitor and control treatment safely. [cisa](https://www.cisa.gov/news-events/alerts/2026/07/30/cisa-urges-water-and-wastewater-systems-sector-protect-ot-against-activity-targeting-plcs)

## Product capabilities

### Section headline

> ## One model spanning source, treatment, field assets, and recovery.

| Capability | Water and wastewater value |
|---|---|
| **Process and treatment model** | Represents source-to-tap or influent-to-effluent pathways, chemical treatment, pumps, tanks, biological systems, disinfection, and key operating boundaries |
| **Field-estate and telemetry model** | Maps pump stations, lift stations, reservoirs, wells, remote RTUs, modems, radio/cellular links, and their operational dependencies |
| **SCADA and control-path model** | Links PLCs, RTUs, VFDs, HMIs, SCADA, historians, engineering workstations, alarms, and remote support to the process they control |
| **Hydraulic and process-consequence model** | Helps reason through operational effects such as overflow, low pressure, loss of treatment, loss of monitoring, aeration upset, or dosing deviation |
| **Cyber pathway and change simulation** | Tests segmentation, secure remote access, controller hardening, SCADA changes, radio/cellular network changes, and recovery controls before live deployment |
| **Resilience and recovery view** | Identifies dependencies on power, communications, staffing, clean backups, manual operation, chemicals, spares, and external integrators |
| **Evidence and assurance output** | Provides traceable risk decisions, architecture views, operational evidence, and regulatory/board-ready reporting from one model |

The OXOT Cyber Digital Twin supports facility-physics, asset, network, data-fusion, and governance layers, along with synchronized P&ID, Purdue, network, dependency-graph, and 3D views. It can produce risk deltas, BOM outputs, engineering visualizations, and compliance-oriented technical files. 
## Regulatory and standards context

### Section headline

> ## Support safe-water and environmental-resilience evidence from the same operating model.

Do not promise automatic compliance. The Twin supports risk assessment, evidence creation, traceability, scenario testing, recovery planning, and decision documentation.

| Framework / obligation | Sector relevance | How OXOT supports the work |
|---|---|---|
| **NIS2** | Drinking water and wastewater are included in the Directive’s high-criticality scope, subject to entity thresholds, national transposition, and Member State implementation | Supports cyber risk-management evidence, asset/dependency visibility, supply-chain analysis, governance reporting, and resilience-oriented risk treatment |
| **CER Directive** | Drinking water and wastewater are within the Critical Entities Resilience scope; it focuses on resilience to relevant natural and human-made risks | Supports a joined-up view of cyber, power, telecoms, weather, supplier, operational, and physical dependencies |
| **EU Drinking Water Directive** | Focuses on water quality, risk-based safety, monitoring, and consumer protection; it does not itself create a standalone cybersecurity regime | Connects OT and cyber scenarios to treatment and water-quality operational evidence |
| **Urban Wastewater Treatment Directive** | Drives treatment, collection, discharge, monitoring, and environmental requirements; cybersecurity implications arise when OT disruption affects these duties | Connects cyber pathways to process performance, effluent quality, pumping, overflow, and reporting consequences |
| **IEC 62443** | The primary IACS cybersecurity standard for treatment facilities, SCADA systems, remote telemetry, and system-integration work | Supports system definition, zones/conduits, reachability, risk decisions, and traceable security evidence |
| **NIST SP 800-82 Rev. 3** | Widely used OT/ICS guidance, especially for US utilities and multinational programs | Supports architecture, asset context, segmentation, access control, recovery, and safe implementation planning |
| **US SDWA / AWIA Section 1433** | Community water systems serving more than 3,300 people must conduct risk and resilience assessments that include automated-system cybersecurity, develop ERPs, and review/certify them at least every five years | Helps create a facility-specific evidence base for the cyber portion of risk/resilience assessment and emergency-response planning |
| **State drinking-water sanitary surveys** | US states must evaluate the adequacy of OT cybersecurity where it is part of a required public-water-system sanitary survey component | Provides OT architecture, control-path, asset, process, and documented risk-treatment evidence |
| **EPA cyber guidance and response planning** | EPA recommends IT/OT risk and resilience evaluation, mitigation planning, and response preparation across water-system types | Supports incident scenarios, recovery dependencies, critical-asset prioritization, and decision documentation |

NIS2 explicitly includes drinking water and wastewater entities, while ENISA notes that both sectors are subject to NIS2 baseline cybersecurity objectives. [eur-lex.europa](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022L2555)

In the United States, SDWA Section 1433 requires community water systems serving more than 3,300 people to include cybersecurity in their risk and resilience assessments and certify completion of the assessment and emergency-response planning; reassessment and ERP review are required every five years. [epa](https://www.epa.gov/enforcement/enforcement-alert-drinking-water-systems-address-cybersecurity-vulnerabilities)

EPA also recommends all water and wastewater operators assess the resilience of their IT and OT systems, develop a mitigation plan for critical operations, and address cybersecurity in risk/resilience and emergency-response work. [epa](https://www.epa.gov/system/files/documents/2024-08/epa-guidance-on-improving-cybersecurity-at-drinking-water-and-wastewater-systems-1.pdf)

## Engagement approach

### Section headline

> ## Start with one treatment process or one remote field system.

| Engagement | Best starting point | Example output |
|---|---|---|
| **Treatment-Process Decision Sprint** | Chemical dosing, UV/disinfection, filtration, aeration, biological process, or control-room change | Modelled cyber pathway, treatment consequence, control options, and prioritized action plan |
| **Remote-Asset Resilience Sprint** | Lift stations, pump stations, wells, reservoirs, booster stations, field RTUs, or telemetry network | Reachability map, operational dependency analysis, secure remote-access and recovery roadmap |
| **Facility Twin Build** | One drinking-water treatment plant, wastewater treatment plant, or regional operations environment | Validated Cyber Digital Twin, risk-priority queue, process/OT views, evidence package |
| **Continuous Twin Operations** | Multi-site utility with changing assets, vendors, threat context, capital programs, and seasonal risk | Risk deltas, scenario testing, evidence updates, resilience reporting, and recurring decision support |

## Final CTA

> ## Start with one plant, one pump station, or one treatment decision.
>
> Bring a process-flow diagram, P&ID, SCADA asset list, or a proposed remote-access or network change. OXOT will show how a Cyber Digital Twin can trace the path to the treatment or environmental consequence—before the live system is changed.

**Primary CTA:** **Discuss a water-system scenario**  
**Secondary CTA:** **Request the Technical Specification**

**Form fields**

- Name and work email
- Organization
- Role
- System type:
  - Drinking water
  - Wastewater
  - Combined water / wastewater utility
  - Regional authority
  - Municipal public works
  - Engineering integrator
  - Other
- Scope:
  - Treatment plant
  - Pump or lift-station network
  - Wells / reservoirs / booster stations
  - SCADA / control-room environment
  - Chemical dosing or disinfection system
  - Telemetry / radio / cellular network
  - Multi-site utility
- Decision to evaluate:
  - Publicly exposed PLC / RTU
  - Vendor remote access
  - SCADA or network segmentation
  - Chemical-dosing or disinfection control
  - Lift-station / pump-station resilience
  - Ransomware recovery and manual operations
  - Modernization / capital investment
  - NIS2, AWIA, ERP, or assurance evidence
  - Other

## Page structure

```text
Hero: Safe water and sanitation
├─ Sector reality: public-health and environmental consequences
├─ Drinking-water and wastewater OT architecture
├─ Water-specific risk scenarios
├─ Four treatment and resilience decisions
├─ Worked use case: secure chemical dosing without disrupting treatment
├─ Product capabilities
├─ Regulatory and standards context
├─ Engagement approach
└─ CTA: Discuss a water-system scenario
```

## Metadata

**SEO title**  
Water & Wastewater OT Cybersecurity Digital Twin | OXOT

**Meta description**  
Protect drinking water, wastewater treatment, and remote field assets. OXOT’s Cyber Digital Twin connects process controls, SCADA pathways, cyber risk, and public-health or environmental consequences.

**H1**  
Protect safe water and sanitation—before a cyber incident becomes a public-health event.

**Suggested internal links**

- `/platform/cyber-digital-twin`
- `/platform/decisions/fix-first`
- `/platform/decisions/change-safely`
- `/platform/deployment-data-sovereignty`
- `/assurance/iec-62443`
- `/assurance/nis2`
- `/resources/technical-specification`
- `/contact`