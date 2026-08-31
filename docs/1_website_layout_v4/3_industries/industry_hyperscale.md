 Supporing "Industy" on OXOT Website
 
**Hyperscale & Data Centers** industry-page brief for OXOT. This vertical should position the Cyber Digital Twin around one core promise: **make cyber, operational, and investment decisions without compromising reliability, safety, or grid stability.**

This is not simply “OT security for a building.” A hyperscale facility is a tightly coupled availability system: utility power, on-site electrical distribution, generation, cooling, water, controls, networks, supply chains, customer platforms, and sometimes defense or sovereign workloads must operate together. The Cyber Digital Twin should make those dependencies visible, test changes safely, and establish which cyber pathways can actually threaten capacity, availability, safety, contractual commitments, or regulatory reporting.

NIS2 explicitly covers data-centre service providers, and its Implementing Regulation specifies cybersecurity risk-management and significant-incident requirements for them. Separately, EU energy-performance reporting applies to data centres with installed IT power demand of 500 kW or more. [enisa.europa](https://www.enisa.europa.eu/topics/state-of-cybersecurity-in-the-eu/cybersecurity-policies/nis-directive-2)

## Page purpose

**URL:** `/industries/hyperscale-data-centers`

**Primary audiences**

- VP / Director of Data Center Operations
- Campus or site operations leader
- Head of Critical Facilities / Engineering
- CISO, OT security leader, or physical-infrastructure security team
- Electrical, mechanical, controls, BMS, EPMS, DCIM, and commissioning engineers
- Cloud, infrastructure, network, and platform-resilience teams
- Site-selection, power-procurement, sustainability, and capacity-planning teams
- Data-center owner/operator, developer, colocation provider, hyperscaler, and critical-supply-chain stakeholders
- Government, defense, and regulated-workload leaders

**Primary conversion**

> **Discuss a campus, hall, or critical-facilities change**

**Secondary conversion**

> **Explore the interactive hyperscale model**

**Hero**

> ## Test the failure path before it becomes a capacity event.
>
> OXOT’s Cyber Digital Twin connects critical-facilities controls, electrical and cooling infrastructure, operational networks, external utilities, and supply-chain dependencies—so you can test a cyber change before it risks availability, customer capacity, or safety.

**CTAs**

- **Explore the hyperscale model**
- **Discuss a critical-facilities scenario**

## Interactive hyperscale model

This vertical should have the site’s best interactive demonstration. Do not make it a rotating 3D building. Make it a **navigable dependency model** that uses the same logical structure as your live Cyber Digital Twin.

### Core interaction

```text
Campus / site view
     ↓
Data hall / availability-zone view
     ↓
Electrical or cooling train
     ↓
Control and network pathway
     ↓
Failure cascade and business consequence
```

Visitors choose a scenario in the left panel:

```text
- BMS vendor remote access
- EPMS / switchgear control path
- Generator or UPS maintenance update
- Chilled-water plant control change
- Water-constrained cooling operation
- Utility-grid disturbance plus OT disruption
- Supply-chain compromise in a critical controller
- Cross-connect / network dependency incident
- Defense / sovereign workload isolation requirement
```

Then the visual changes across five synchronized views:

```text
1. Physical infrastructure
2. Electrical and mechanical controls
3. OT / BMS / EPMS / DCIM network pathways
4. Dependency graph
5. Capacity, availability, and recovery consequence
```

### Example visual layers

```text
Utility grid / substation / PPA / on-site generation
        ↓
MV switchgear → transformers → LV switchgear → UPS → PDUs → busway → IT load
        ↓
Chillers / cooling towers / CRAH / CDU / pumps / valves / water treatment
        ↓
BMS / EPMS / DCIM / PLCs / RTUs / relays / sensors / controllers
        ↓
OT network / management network / vendor remote access / cloud telemetry
        ↓
Availability-zone capacity / customer workloads / regulated tenants / service commitments
```

The visitor must be able to see that an issue affecting a cooling-controller network, electrical-monitoring platform, generator controller, or vendor path does not have a generic impact. It may consume redundancy, reduce available capacity, create a maintenance lockout, force a load shed, affect a data hall, or compound a real utility disturbance.

## Sector reality

### Section headline

> ## The data center is a cyber-physical availability system—not a collection of servers.

**Suggested body copy**

Hyperscale data centers are designed around redundancy, compartmentalization, maintenance without interruption, and rapid recovery. But redundancy does not eliminate dependency. A facility may have multiple utility feeds, generators, UPS strings, chilled-water loops, cooling towers, BMS controllers, EPMS meters, DCIM platforms, industrial networks, cloud management services, and specialist vendors—yet a small number of shared controls, communications paths, procedures, or supply-chain components can still create common-mode failure.

The Cyber Digital Twin should expose both sides of the availability claim:

- **What is redundant:** A/B power paths, N+1 cooling, multiple generators, spare capacity, multi-site failover.
- **What is shared:** BMS servers, identity systems, management workstations, remote-access gateways, time services, firmware, vendor tooling, switchgear-control networks, water source, utility substation, fuel logistics, and human procedures.

For EU operators, the Energy Efficiency Directive requires annual energy-performance reporting for sites with installed IT power demand of 500 kW or more; the reporting scheme covers energy use, water use, waste heat, grid-service participation, and related performance indicators. [energy.ec.europa](https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive/energy-performance-data-centres_en)

### Hyperscale-specific challenges

| Challenge | Why it matters in hyperscale data centers |
|---|---|
| Availability is engineered in layers | The site may tolerate a component failure but not a hidden common-mode dependency across redundant paths |
| Electrical and cooling systems are inseparable from compute availability | A cyber issue affecting switchgear, generator controls, UPS monitoring, cooling plant, or BMS can consume redundancy and turn a minor physical event into a capacity event |
| Expansion is continuous | New halls, substations, chillers, generators, battery systems, liquid-cooling loops, interconnects, and tenants are introduced while existing operations remain live |
| Commissioning and change risk | A control change that looks correct on a diagram can interrupt monitoring, failover, protection coordination, sequencing, or emergency operating procedures |
| Vendor density | Electrical, mechanical, BMS, EPMS, DCIM, UPS, generator, cooling, fire/life-safety, and network vendors all bring support tools, remote-access workflows, firmware, and maintenance dependencies |
| IT/OT convergence | Cloud management, DCIM, telemetry, APIs, virtualized controllers, identity, monitoring, and facility systems increasingly exchange data and operational dependencies |
| Scale and repeatability | Standardized designs create fleet efficiency, but a shared firmware image, BMS template, controller family, or supplier issue can propagate across campuses |
| Power scarcity and grid dependency | Utility interconnection delays, curtailment, grid events, demand response, on-site generation, and power-quality issues can constrain expansion and availability |
| Water and cooling constraints | Cooling design may depend on water availability, treatment, discharge, heat-reuse commitments, ambient temperature, or local permitting |
| Customer and sovereign commitments | A facility can host commercial cloud, financial, healthcare, AI, telecommunications, government, or defense workloads with different isolation, residency, continuity, and incident-management obligations |
| Supply-chain concentration | Long lead times for transformers, switchgear, generators, UPS systems, batteries, chillers, controllers, optics, servers, and network gear make resilience a procurement and lifecycle problem |
| Sustainability evidence | Energy, water, waste-heat, renewable-power, and capacity reporting increasingly become operating data that must be accurate, defensible, and linked to the real facility |

## Typical hyperscale architecture

### Section headline

> ## Model the facility from utility interconnect to workload consequence.

Use a large interactive architecture graphic with selectable layers. This is where the website can be much more sophisticated than the other industry pages.

### Physical and operational stack

```text
External dependencies
Utility grid • substation • transmission/distribution operator • gas/fuel
Water utility • telecom carriers • cloud / internet exchange • road and logistics
                    │
Campus utility and resilience layer
HV/MV intake • transformers • MV/LV switchgear • protection relays
Generator plant • fuel storage / delivery • BESS • power-quality systems
                    │
Critical power path
UPS systems • batteries • static transfer switches • PDUs • RPPs
Busway • rack PDUs • branch circuit monitoring • IT load
                    │
Thermal-management path
Chillers • cooling towers • dry coolers • pumps • valves • CRAH/CRAC
Liquid cooling / CDUs • heat exchangers • water-treatment systems
                    │
Facility control and operations
BMS • EPMS • DCIM • PLCs • RTUs • controllers • meters • sensors
Historians • alarming • engineering workstations • maintenance platforms
                    │
Digital infrastructure
Management networks • OOB networks • production networks • cloud control plane
Storage • compute • switching • optical transport • DDoS / edge services
                    │
Business, customer, and mission layer
Availability zones • customer workloads • SLAs • sovereign/defense enclaves
Capacity commitments • AI/GPU clusters • regulated data • service operations
```

### Key technology domains

| Domain | Hyperscale examples |
|---|---|
| Electrical OT | Medium-voltage switchgear, protection relays, generator controllers, paralleling switchgear, automatic transfer switches, UPS controllers, battery-management systems, PDUs, intelligent rack PDUs, branch-circuit monitoring |
| Mechanical OT | Chiller controllers, cooling-tower PLCs, condenser/chilled-water pumps, VFDs, CRAH/CRAC controls, CDU controls, valve actuators, leak detection, water-treatment skids, thermal sensors |
| Facility platforms | BMS/BAS, EPMS, DCIM, electrical power-quality monitoring, historian, alarm management, CMMS/EAM, building analytics, digital commissioning systems |
| OT communications | BACnet/IP, BACnet MS/TP, Modbus TCP/RTU, SNMP, OPC UA, MQTT, EtherNet/IP, PROFINET, vendor fieldbus/serial protocols, industrial Ethernet |
| IT / cloud dependency | Corporate identity, privileged access management, remote-access brokers, NTP/PTP, SIEM/SOC, cloud monitoring, API gateways, configuration management, OOB management, virtual desktops |
| Operational evidence | Single-line diagrams, protection-coordination studies, selectivity/arc-flash studies, load flow, generator/UPS autonomy calculations, MOP/SOP/EOP documents, sequence-of-operations narratives, commissioning scripts, maintenance records, capacity and redundancy calculations |
| Supply-chain evidence | SBOM, HBOM, CBOM, firmware images, controller/PLC models, vendor support contracts, spare inventory, critical lead times, maintenance windows, field-service dependencies |
| Sustainability evidence | IT load, total facility energy, PUE, WUE, water source/use, heat reuse, renewable-energy factor, grid-service participation, cooling strategy, capacity utilization |

OXOT’s technical model is designed to fuse facility physics, asset and control-system data, Purdue/network state, external intelligence, supply-chain BOMs, and financial consequence. It supports passive-first deployments and does not require agents on controllers or active production-network scanning. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYEVIACHS56&Signature=VgpP1SER%2FxM2Rn4kyOZV8vKCSRU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDXyRvxNl3BRA5kpvQbNypNcdo29ZEfwl82ghyyPl%2BzbwIhAMyZma%2BviKoW%2FncDaWH9IyDtE8tjSiYGxa%2F%2BEkw8BNzJKvwECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjk5NzUzMzA5NzA1Igxy1cZ39JhvldJWwa4q0ATdHtvLP5lwwO50HKe46mC7XFiPSmwxj075g0%2FXwVeIbdTUKyLWO0Hhvu2NBT7QYhCCt4iEHIEHxZ6JfayTSZtUqXAZiME1MjWlsKjb7Nq5QqRGtN45%2FWJ%2BM4UzATMKowPXGis2Y1eKYm1w8T4jR9HHyZ1IeelTW1o9Yvh7OrpxEXtcIY%2Bbp4LaqaXRJ8VG8cOTG6ftFTj5Hdz7F2IV8rmXlXdI7Czt62rSYrJU4MfHzKRDXs90ItKiCICFNZ0ZCTswSCDVDMfRURwxmlKtOh02oZCQfGD4KIrbXsmmzvNau66BhZ6oG4NToBgQmmBxWBcyubNHd92MvoSZNZ9kfU3axOnohn2pJTxs%2FMLcl5fGarmoyPSzpliYVqn3Fx3nFfSEIctWyapcx%2BvdakPbwZ4If%2BQDjqCixj%2FuQpgyaUMnvjyUKqQERqdGZYvbJV%2F%2BzZPmOnAEZDTGPq24KoMyCzcJdmQeNKDtqlA4%2F3bRkkhboyd2ECowWAMM6BdEE3ZlzxbhSzzilCRMNYINn99w6F51Y3xl%2FLQ1Y0ZaukrTAarPuO6oUtDUJd6dUV%2FLgNA19y%2BJWtWNK49H%2BWHcSuK%2F%2B1Q%2FnVc9ZkZudk%2FQoVmUHyfUNoU80bh64OoJeNb0m5St%2FjjNUtBjP0Cfx5u4FlXFJj5yCJ4TYuf8wdVtXzWsB898At%2FDRQUQmIiwmODs0dpSihI2N7ZA9EVpZYXfeH%2Blpngo6lM9IN7WNNb97etBCbnFGZFNhBdyzL0ZFiJ21m0oMSrA%2B72vUeSPU47moqlQiylrMOu1p9QGOpcBeVTc25ok8hF700ddSB819Qk6oF9oL2igKAamAYKYNOwzDaL6dpsYTw4rrT%2FbC6MNAr76cNM28lq9fivG7KfCr9tCLO%2FbDWPWrrDA%2BmLS%2BpFXNa4TIId3o59KsS0Ur8luvnUxWixs02t9sEKWIsuWrtryWlq540SwDSXlGIk%2FYJ86XMGqkH9rCT36hzMiu5DEzgCmY%2BQ2mw%3D%3D&Expires=1787422910)

## Dependency map: the differentiator

### Section headline

> ## The risk is often outside the data hall.

This section must explicitly connect data-center cyber risk to **energy, water, communications, commercial customers, defense, and manufacturing/supply chain**. It should be a clickable dependency map.

```text
                   Grid / utility operator
                          │
Water source ── Campus ── Telecom / carrier ecosystem
                          │
Fuel / generator supply   │   Cloud and customer networks
                          │
Equipment manufacturers ──┼── Customer workload / service commitments
                          │
Construction / commissioning / maintenance vendors
                          │
Government / defense / sovereign workloads
```

### Energy dependency

A data center’s redundancy may protect against a localized power event, but a complete model must include:

- Utility feeder and substation dependency.
- Transmission/distribution constraints and power-quality events.
- Generator availability, fuel contracts, delivery routes, and refueling procedures.
- Battery/UPS autonomy and controller dependencies.
- Demand-response, curtailment, or grid-service commitments.
- New-capacity interconnection timing.
- Shared electrical-control platforms that may create common-mode failure across A/B paths.

### Water dependency

The model should distinguish cooling architecture:

| Cooling model | Key dependency / cyber concern |
|---|---|
| Air-cooled / dry cooling | Ambient-temperature exposure, fan/VFD controls, electrical consumption, capacity derating |
| Evaporative cooling | Water availability, treatment, water-quality sensors, valves, pumps, local water restrictions |
| Water-cooled chiller plant | Chilled/condenser-water control loops, cooling towers, makeup water, treatment chemistry, pump/VFD controls |
| Direct-to-chip liquid cooling | CDUs, leak detection, flow/temperature sensing, distribution manifolds, equipment compatibility, high-density load concentration |
| District cooling / heat reuse | Third-party thermal network, contracted service levels, pumps/heat exchangers, control interfaces, seasonal operation |

### Communications dependency

A hyperscale campus may have redundant carriers yet share dependency on:

- Common physical routes, conduits, landing stations, metro rings, power feeds, or building entry points.
- DNS, identity, NTP/PTP, cloud logging, remote-access brokers, and management platforms.
- BMS/EPMS/DCIM telemetry links and OT jump hosts.
- Network-device firmware, controller APIs, and automation pipelines.
- Cross-connects, meet-me rooms, and optical transport equipment.

### Commercial dependency

The digital twin should connect physical-facility events to customer/business consequences:

- Availability-zone capacity loss.
- Inability to place new customer load or AI/GPU clusters.
- SLA credits and contract escalation.
- Service-provider dependency and tenant concentration.
- Financial-services, telecom, healthcare, SaaS, or public-sector critical workloads.
- Customer notification, incident communications, and recovery priorities.

### Defense and sovereign dependency

Do not market this as an intelligence or classified-system tool unless OXOT has authority to do so. Instead state:

> For operators supporting sovereign, defense, public-safety, or other regulated workloads, the Twin can help model isolation boundaries, residency constraints, shared-facility dependencies, privileged-access paths, support-vendor exposure, and recovery priorities.

Relevant scenarios include:

- A shared BMS/EPMS or remote-access component crossing from general-facility administration toward a restricted zone.
- Data-residency or operational-access constraints that limit who can diagnose a facility incident.
- Supply-chain provenance requirements for firmware, controllers, hardware, and maintenance access.
- Continuity requirements where load relocation is constrained by geography, latency, or sovereignty.

### Manufacturing and supply-chain dependency

This is especially important for hyperscale expansion:

- Long-lead MV transformers, switchgear, breakers, generators, UPS, batteries, chillers, cooling towers, and CDUs.
- Concentration risk in specific controller, PLC, relay, BMS, UPS, and generator OEMs.
- Firmware and software bill-of-material risk.
- Field-service access, commissioning tools, contractor laptops, and maintenance contractors.
- Spares inventory, repair capacity, warranty terms, and emergency replacement logistics.
- Fabrication, shipping, customs, port, rail, trucking, and construction-schedule dependencies.

The OXOT specification supports separate software, hardware, cryptographic, SaaS, and operations BOMs. This is a powerful fit for a hyperscale vertical because it lets the site model relate control-system dependencies to supplier, firmware, certificate, operational-role, and lifecycle exposure. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYEVIACHS56&Signature=VgpP1SER%2FxM2Rn4kyOZV8vKCSRU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDXyRvxNl3BRA5kpvQbNypNcdo29ZEfwl82ghyyPl%2BzbwIhAMyZma%2BviKoW%2FncDaWH9IyDtE8tjSiYGxa%2F%2BEkw8BNzJKvwECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjk5NzUzMzA5NzA1Igxy1cZ39JhvldJWwa4q0ATdHtvLP5lwwO50HKe46mC7XFiPSmwxj075g0%2FXwVeIbdTUKyLWO0Hhvu2NBT7QYhCCt4iEHIEHxZ6JfayTSZtUqXAZiME1MjWlsKjb7Nq5QqRGtN45%2FWJ%2BM4UzATMKowPXGis2Y1eKYm1w8T4jR9HHyZ1IeelTW1o9Yvh7OrpxEXtcIY%2Bbp4LaqaXRJ8VG8cOTG6ftFTj5Hdz7F2IV8rmXlXdI7Czt62rSYrJU4MfHzKRDXs90ItKiCICFNZ0ZCTswSCDVDMfRURwxmlKtOh02oZCQfGD4KIrbXsmmzvNau66BhZ6oG4NToBgQmmBxWBcyubNHd92MvoSZNZ9kfU3axOnohn2pJTxs%2FMLcl5fGarmoyPSzpliYVqn3Fx3nFfSEIctWyapcx%2BvdakPbwZ4If%2BQDjqCixj%2FuQpgyaUMnvjyUKqQERqdGZYvbJV%2F%2BzZPmOnAEZDTGPq24KoMyCzcJdmQeNKDtqlA4%2F3bRkkhboyd2ECowWAMM6BdEE3ZlzxbhSzzilCRMNYINn99w6F51Y3xl%2FLQ1Y0ZaukrTAarPuO6oUtDUJd6dUV%2FLgNA19y%2BJWtWNK49H%2BWHcSuK%2F%2B1Q%2FnVc9ZkZudk%2FQoVmUHyfUNoU80bh64OoJeNb0m5St%2FjjNUtBjP0Cfx5u4FlXFJj5yCJ4TYuf8wdVtXzWsB898At%2FDRQUQmIiwmODs0dpSihI2N7ZA9EVpZYXfeH%2Blpngo6lM9IN7WNNb97etBCbnFGZFNhBdyzL0ZFiJ21m0oMSrA%2B72vUeSPU47moqlQiylrMOu1p9QGOpcBeVTc25ok8hF700ddSB819Qk6oF9oL2igKAamAYKYNOwzDaL6dpsYTw4rrT%2FbC6MNAr76cNM28lq9fivG7KfCr9tCLO%2FbDWPWrrDA%2BmLS%2BpFXNa4TIId3o59KsS0Ur8luvnUxWixs02t9sEKWIsuWrtryWlq540SwDSXlGIk%2FYJ86XMGqkH9rCT36hzMiu5DEzgCmY%2BQ2mw%3D%3D&Expires=1787422910)

## Hyperscale risk scenarios

### Section headline

> ## Test the common-mode failure before it consumes redundancy.

Use an interactive scenario library. Each card should demonstrate that the risk is a **dependency chain**, not merely a vulnerability.

| Scenario | Cyber / OT pathway | Hyperscale consequence | Twin-supported decision |
|---|---|---|---|
| BMS vendor remote-access compromise | Vendor credential or maintenance gateway reaches BMS server, engineering workstation, or controller network | Unauthorized access to mechanical control systems, alarm suppression, loss of visibility, degraded cooling response, or common-mode impact across halls | Broker access, segment control zones, restrict engineering functions, model required flows |
| EPMS / electrical-control path disruption | Compromise affects EPMS server, relay-management workstation, switchgear-control network, or power-monitoring integration | Loss of electrical visibility, delayed response, impaired switching, protection-setting concern, avoidable escalation during utility event | Separate monitoring from control; test management boundaries and recovery sequence |
| Generator / paralleling-controller compromise | Vendor tool or maintenance route reaches generator controllers, synchronizing/paralleling switchgear, or fuel-management interface | Failure to start, incorrect sequencing, load-transfer problem, loss of standby resilience during utility outage | Model start sequence, shared dependencies, manual fallback, and secure maintenance access |
| UPS / BMS controller firmware issue | Shared firmware, controller model, software update, or monitoring integration affects redundant equipment trains | A/B common-mode exposure, reduced autonomy, false alarms, inability to manage battery state, maintenance lockout | Compare update sequence, isolated pilot, rollback, spare/firmware provenance, and residual risk |
| Cooling-plant control compromise | Path reaches chiller PLC, tower control, pump VFD, valve controller, BMS integration, or water-treatment system | Thermal excursion, loss of cooling redundancy, load shedding, reduced hall capacity, equipment-protection action | Test segmentation, alarm/fail-safe behavior, independent monitoring, and response procedures |
| Liquid-cooling/CDU disruption | Compromise affects CDU controls, leak-detection network, flow/temperature sensors, or high-density rack cooling management | Cluster throttling, GPU/AI capacity loss, localized shutdown, leak/thermal response complication | Model concentration of critical load and safe fallback control |
| Utility-event plus OT visibility loss | Grid disturbance occurs while BMS/EPMS telemetry, identity, or monitoring is unavailable | Operators lose situational awareness while redundancy is stressed; recovery decisions become slower and riskier | Simulate combined failures; prioritize independent local control and tested manual procedures |
| Telecom / management-plane dependency failure | Carrier, DNS, identity, OOB network, remote-access broker, cloud monitoring, or API dependency is disrupted | Remote sites become harder to operate; facility telemetry/control support may be degraded; customer connectivity or recovery is affected | Identify shared dependencies and create alternative local/independent operating paths |
| Supply-chain controller compromise | Vulnerability or compromised update affects BMS, UPS, generator, chiller, relay, or DCIM component across a standardized fleet | Fleet-wide common-mode exposure, emergency patching challenge, constrained replacement due to lead times | Model affected estate, reachable pathways, compensating controls, and staged remediation |
| Construction / commissioning laptop pathway | Temporary commissioning network, contractor device, or unsegmented tool bridges new build and live operational systems | Introduction of malware/configuration drift, loss of isolation, disruption to existing live halls | Model temporary-to-permanent transition, access expiry, and acceptance evidence |
| Water constraint plus cooling incident | Local water restriction, treatment issue, or utility outage combines with cooling automation impairment | Capacity derating, temperature excursion, inability to meet environmental/contractual performance targets | Model cooling strategy alternatives and operational thresholds |
| Restricted-workload boundary failure | Shared privileged-access, monitoring, or facility-management pathway crosses into a sovereign/defense-restricted environment | Policy, contract, or regulatory breach; incident response and recovery constrained by access rules | Test segmentation, identity, data-flow, and operational support boundaries |

## The four hyperscale decisions

### Section headline

> ## Four decisions that preserve capacity—not just component uptime.

| OXOT decision | Hyperscale data-center language | What the Twin provides |
|---|---|---|
| **What do we fix first?** | “Which reachable control, management, or supplier pathway can consume redundancy, reduce available capacity, interrupt customer workloads, or impair safe recovery?” | NOW / NEXT / NEVER prioritization tied to A/B-path dependency, common-mode exposure, thermal/electrical consequence, and customer/business impact |
| **What should we spend?** | “Do we invest in BMS/EPMS segmentation, secure vendor access, independent monitoring, controller modernization, spare capacity, water resilience, additional carriers, or supply-chain controls?” | Comparable options with modeled risk reduction, operational impact, lifecycle dependencies, and a reasoned investment sequence |
| **Can we change safely?** | “Can we patch this UPS controller, alter a switchgear firewall, rotate a certificate, isolate a vendor, reconfigure cooling controls, or connect a new hall without reducing resilience?” | A virtual change experiment showing required control/monitoring flows, redundancy impact, remaining pathways, and recovery consequences |
| **What can we leave alone?** | “Which legacy BMS, controller, monitoring component, or vendor dependency is truly isolated or can remain until the next maintenance window under compensating controls?” | A defensible exception with dependency evidence, compensating controls, owner, sunset date, and reassessment trigger |

The Cyber Digital Twin’s decision model is designed to rank findings by modeled physical consequence and reachability, compare security investments, simulate a virtual control before it touches production, and preserve evidence for deliberately deferred items. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYEVIACHS56&Signature=VgpP1SER%2FxM2Rn4kyOZV8vKCSRU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDXyRvxNl3BRA5kpvQbNypNcdo29ZEfwl82ghyyPl%2BzbwIhAMyZma%2BviKoW%2FncDaWH9IyDtE8tjSiYGxa%2F%2BEkw8BNzJKvwECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjk5NzUzMzA5NzA1Igxy1cZ39JhvldJWwa4q0ATdHtvLP5lwwO50HKe46mC7XFiPSmwxj075g0%2FXwVeIbdTUKyLWO0Hhvu2NBT7QYhCCt4iEHIEHxZ6JfayTSZtUqXAZiME1MjWlsKjb7Nq5QqRGtN45%2FWJ%2BM4UzATMKowPXGis2Y1eKYm1w8T4jR9HHyZ1IeelTW1o9Yvh7OrpxEXtcIY%2Bbp4LaqaXRJ8VG8cOTG6ftFTj5Hdz7F2IV8rmXlXdI7Czt62rSYrJU4MfHzKRDXs90ItKiCICFNZ0ZCTswSCDVDMfRURwxmlKtOh02oZCQfGD4KIrbXsmmzvNau66BhZ6oG4NToBgQmmBxWBcyubNHd92MvoSZNZ9kfU3axOnohn2pJTxs%2FMLcl5fGarmoyPSzpliYVqn3Fx3nFfSEIctWyapcx%2BvdakPbwZ4If%2BQDjqCixj%2FuQpgyaUMnvjyUKqQERqdGZYvbJV%2F%2BzZPmOnAEZDTGPq24KoMyCzcJdmQeNKDtqlA4%2F3bRkkhboyd2ECowWAMM6BdEE3ZlzxbhSzzilCRMNYINn99w6F51Y3xl%2FLQ1Y0ZaukrTAarPuO6oUtDUJd6dUV%2FLgNA19y%2BJWtWNK49H%2BWHcSuK%2F%2B1Q%2FnVc9ZkZudk%2FQoVmUHyfUNoU80bh64OoJeNb0m5St%2FjjNUtBjP0Cfx5u4FlXFJj5yCJ4TYuf8wdVtXzWsB898At%2FDRQUQmIiwmODs0dpSihI2N7ZA9EVpZYXfeH%2Blpngo6lM9IN7WNNb97etBCbnFGZFNhBdyzL0ZFiJ21m0oMSrA%2B72vUeSPU47moqlQiylrMOu1p9QGOpcBeVTc25ok8hF700ddSB819Qk6oF9oL2igKAamAYKYNOwzDaL6dpsYTw4rrT%2FbC6MNAr76cNM28lq9fivG7KfCr9tCLO%2FbDWPWrrDA%2BmLS%2BpFXNa4TIId3o59KsS0Ur8luvnUxWixs02t9sEKWIsuWrtryWlq540SwDSXlGIk%2FYJ86XMGqkH9rCT36hzMiu5DEzgCmY%2BQ2mw%3D%3D&Expires=1787422910)

## Worked use case

### Section headline

> ## Worked example: secure BMS vendor access without turning a maintenance change into a capacity event.

**Label:** *Illustrative scenario—no customer data.*

### Scenario

A hyperscale campus runs multiple data halls with N+1 cooling. Chillers, cooling towers, condenser-water pumps, chilled-water pumps, CRAHs, VFDs, and water-treatment systems report into BMS and DCIM platforms. An OEM remotely supports critical chiller controls and the BMS integrator maintains supervisory control logic.

A review finds that vendor remote access uses a persistent VPN path through a shared facility-management network. The route can reach an engineering workstation that has pathways toward BMS servers and selected mechanical-control zones. Security proposes removing vendor access. Critical Facilities objects: the vendor may be needed during a chiller fault, a controls instability event, or an overnight maintenance activity.

### Inputs to the Twin

```text
Facility engineering evidence
- Mechanical P&IDs and sequence-of-operations narratives
- Chiller, tower, pump, valve, CRAH, CDU, and VFD relationships
- N+1 / 2N redundancy design and current capacity state
- Thermal limits, load profile, alarm thresholds, and escalation procedures
- MOPs, SOPs, EOPs, commissioning scripts, and maintenance windows
- Water-treatment and makeup-water dependencies

OT, BMS, and network evidence
- BMS servers, engineering workstations, controllers, field panels, and DCIM links
- Vendor VPN / remote-access gateway, jump hosts, identity, MFA, approval process
- VLANs, firewalls, routing, required BACnet/Modbus/OPC/control flows
- Controller firmware, configuration, backups, and support-tool dependencies
- Historian, alarms, SIEM, and out-of-band management connections

External and commercial evidence
- Utility-power and water-service dependencies
- OEM support contract and escalation time
- Spare controllers and lead times
- Customer capacity commitments and load-shed/relocation constraints
- Site-level energy and water reporting obligations
```

### Modelled chain

```text
Compromised vendor credential or remote-support endpoint
        ↓
Shared facility-management access path
        ↓
BMS engineering workstation / supervisory-control layer becomes reachable
        ↓
Chiller / pump / tower / VFD / valve control pathways potentially affected
        ↓
Loss of cooling visibility or impaired control during a physical cooling event
        ↓
Redundancy consumed → hall capacity reduced → load shed or service-impact risk
```

### Candidate controls tested

| Candidate change | What the Twin tests | Decision insight |
|---|---|---|
| Remove remote OEM access | Whether incident recovery depends on vendor support and creates unacceptable repair-time exposure | Reduces cyber pathway but may impair restoration during a mechanical fault |
| Broker OEM access | Named accounts, MFA, approval, just-in-time sessions, jump host, recording, per-system authorization, session expiry | Preserves support while removing persistent broad access |
| Segment BMS engineering zones | Virtual firewall rules between vendor path, supervisory BMS, data-hall controls, chiller plant, DCIM, and corporate systems | Shows which required protocols/flows remain and which attack routes close |
| Separate monitoring from control | Isolate EPMS/DCIM/BMS reporting feeds from configuration and command paths | Reduces impact of a monitoring-platform compromise; exposes remaining control dependencies |
| Stage controller/firmware hardening | Pilot update on one noncritical or isolated element, validate rollback, then sequence across redundancy trains | Reduces common-mode update risk and preserves capacity |
| Add independent operational safeguards | Local control, alarm annunciation, tested manual sequences, independent thermal monitoring, clean backups | Reduces consequence if supervisory access or BMS availability is lost |

### Result message

> The decision is not “disconnect the vendor” or “trust the redundant chillers.” It is to remove persistent reachability, retain accountable emergency support, prove that segmentation preserves the required control flows, and test updates so a shared maintenance action cannot consume cooling redundancy across the campus.

This is exactly where a Cyber Digital Twin is stronger than a conventional asset inventory: it can represent the physical cooling chain, the management path, the actual network route, the redundancy model, the external water/power dependencies, and the customer-capacity consequence in one decision model. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYEVIACHS56&Signature=VgpP1SER%2FxM2Rn4kyOZV8vKCSRU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDXyRvxNl3BRA5kpvQbNypNcdo29ZEfwl82ghyyPl%2BzbwIhAMyZma%2BviKoW%2FncDaWH9IyDtE8tjSiYGxa%2F%2BEkw8BNzJKvwECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjk5NzUzMzA5NzA1Igxy1cZ39JhvldJWwa4q0ATdHtvLP5lwwO50HKe46mC7XFiPSmwxj075g0%2FXwVeIbdTUKyLWO0Hhvu2NBT7QYhCCt4iEHIEHxZ6JfayTSZtUqXAZiME1MjWlsKjb7Nq5QqRGtN45%2FWJ%2BM4UzATMKowPXGis2Y1eKYm1w8T4jR9HHyZ1IeelTW1o9Yvh7OrpxEXtcIY%2Bbp4LaqaXRJ8VG8cOTG6ftFTj5Hdz7F2IV8rmXlXdI7Czt62rSYrJU4MfHzKRDXs90ItKiCICFNZ0ZCTswSCDVDMfRURwxmlKtOh02oZCQfGD4KIrbXsmmzvNau66BhZ6oG4NToBgQmmBxWBcyubNHd92MvoSZNZ9kfU3axOnohn2pJTxs%2FMLcl5fGarmoyPSzpliYVqn3Fx3nFfSEIctWyapcx%2BvdakPbwZ4If%2BQDjqCixj%2FuQpgyaUMnvjyUKqQERqdGZYvbJV%2F%2BzZPmOnAEZDTGPq24KoMyCzcJdmQeNKDtqlA4%2F3bRkkhboyd2ECowWAMM6BdEE3ZlzxbhSzzilCRMNYINn99w6F51Y3xl%2FLQ1Y0ZaukrTAarPuO6oUtDUJd6dUV%2FLgNA19y%2BJWtWNK49H%2BWHcSuK%2F%2B1Q%2FnVc9ZkZudk%2FQoVmUHyfUNoU80bh64OoJeNb0m5St%2FjjNUtBjP0Cfx5u4FlXFJj5yCJ4TYuf8wdVtXzWsB898At%2FDRQUQmIiwmODs0dpSihI2N7ZA9EVpZYXfeH%2Blpngo6lM9IN7WNNb97etBCbnFGZFNhBdyzL0ZFiJ21m0oMSrA%2B72vUeSPU47moqlQiylrMOu1p9QGOpcBeVTc25ok8hF700ddSB819Qk6oF9oL2igKAamAYKYNOwzDaL6dpsYTw4rrT%2FbC6MNAr76cNM28lq9fivG7KfCr9tCLO%2FbDWPWrrDA%2BmLS%2BpFXNa4TIId3o59KsS0Ur8luvnUxWixs02t9sEKWIsuWrtryWlq540SwDSXlGIk%2FYJ86XMGqkH9rCT36hzMiu5DEzgCmY%2BQ2mw%3D%3D&Expires=1787422910)

## Case-study programme

This vertical is well suited to several case studies. Do not publish generic “improved security posture” stories. Use dependency-rich, technically credible decision narratives.

### Recommended case-study categories

| Case study | Primary question | Strong visual artifact |
|---|---|---|
| **BMS remote-access redesign** | How can OEM support remain available without persistent access to critical controls? | Before/after BMS network-and-control pathway |
| **EPMS and switchgear-control isolation** | Which monitoring, engineering, and switching paths must be separated to reduce common-mode electrical risk? | Single-line diagram synchronized with OT zones |
| **Cooling-control common-mode analysis** | Could one BMS, controller firmware, or management path compromise multiple redundant cooling trains? | Cooling topology and common-mode dependency graph |
| **UPS / battery controller lifecycle decision** | Which firmware, vendor, and maintenance dependencies create shared risk across A/B power? | A/B power-path map with shared dependencies highlighted |
| **Liquid-cooling readiness for AI halls** | How do CDU, manifold, leak-detection, and high-density-rack control paths change availability exposure? | Rack-to-CDU-to-plant thermal dependency model |
| **Utility-event resilience exercise** | What happens when a grid event coincides with reduced BMS/EPMS visibility or remote-access failure? | Timeline: utility event → generator/UPS sequence → operator actions → capacity outcome |
| **Data-center expansion / commissioning boundary** | How do temporary systems, contractor laptops, and new-hall controls enter the live estate safely? | Construction-to-operations trust-boundary diagram |
| **Sovereign workload facility dependency** | What shared facility or privileged-access dependencies can affect a regulated/sensitive workload zone? | Shared-services and isolation-boundary graph |
| **Supply-chain exposure across a standardized fleet** | Which components, firmware, support tools, and supplier relationships create fleet-wide common mode? | SBOM/HBOM/CBOM and vendor-dependency graph |
| **Energy/water reporting evidence model** | Can sustainability metrics be traced to the meters, systems, control assumptions, and site boundaries that produce them? | PUE/WUE evidence chain from meter to report |

### Case-study template

```text
1. Operational / commercial question
2. Facility scope and constraints
3. Systems and dependencies modeled
4. Cyber pathway or change considered
5. Physical / availability consequence
6. Candidate controls or investment options
7. Chosen decision and implementation sequence
8. Evidence created for operations, security, procurement, and assurance
9. What changed in the live environment
```

Where confidentiality prevents named publication, use an anonymized but technically specific format: “A 48 MW, water-cooled campus with N+1 cooling and a shared BMS engineering path,” rather than vague claims about “a global client.”

## Product capabilities

### Section headline

> ## One model from facility control to tenant-impact decision.

| Capability | Hyperscale value |
|---|---|
| **Electrical-system and power-path model** | Connects utility feeds, switchgear, relays, generators, UPS, batteries, transfer equipment, PDUs, and IT load to redundancy and common-mode dependencies |
| **Mechanical and thermal model** | Represents chiller plants, cooling towers, pumps, heat exchangers, CRAH/CRAC units, liquid cooling, CDUs, water treatment, and thermal operating limits |
| **BMS / EPMS / DCIM control model** | Links supervisory platforms, controllers, field devices, configuration paths, alarm dependencies, engineering workstations, and command/monitoring flows |
| **Network and access-path model** | Models IT/OT zones, vendor access, remote support, management/OOB networks, identity dependencies, virtual firewalls, and actual route reachability |
| **Capacity and consequence model** | Translates facility/control disruptions into redundancy consumption, thermal exposure, hall capacity loss, load-shedding risk, SLA/customer impact, and recovery requirements |
| **External dependency model** | Relates power, water, fuel, telecoms, cloud platforms, customers, vendors, construction, weather, and logistics to each campus/site |
| **Supply-chain and provenance model** | Uses SBOM, HBOM, CBOM, SaaS-BOM, and operations BOM views for firmware, hardware, certificates, suppliers, support tools, roles, and maintenance workflows |
| **Change and recovery simulation** | Tests access changes, segmentation, firmware rollouts, controller replacements, commissioning transitions, failover, and recovery before implementation |
| **Assurance and sustainability evidence** | Generates evidence for cyber risk management, NIS2-oriented requirements, internal resilience governance, and data-center energy/water reporting workflows |

The OXOT specification identifies five BOM categories—software/firmware, hardware, cryptographic, SaaS, and operational workflows—plus support for generated technical files, board reporting, interactive engineering views, and passive-first island, data-diode, or dedicated-instance deployments. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYEVIACHS56&Signature=VgpP1SER%2FxM2Rn4kyOZV8vKCSRU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDXyRvxNl3BRA5kpvQbNypNcdo29ZEfwl82ghyyPl%2BzbwIhAMyZma%2BviKoW%2FncDaWH9IyDtE8tjSiYGxa%2F%2BEkw8BNzJKvwECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjk5NzUzMzA5NzA1Igxy1cZ39JhvldJWwa4q0ATdHtvLP5lwwO50HKe46mC7XFiPSmwxj075g0%2FXwVeIbdTUKyLWO0Hhvu2NBT7QYhCCt4iEHIEHxZ6JfayTSZtUqXAZiME1MjWlsKjb7Nq5QqRGtN45%2FWJ%2BM4UzATMKowPXGis2Y1eKYm1w8T4jR9HHyZ1IeelTW1o9Yvh7OrpxEXtcIY%2Bbp4LaqaXRJ8VG8cOTG6ftFTj5Hdz7F2IV8rmXlXdI7Czt62rSYrJU4MfHzKRDXs90ItKiCICFNZ0ZCTswSCDVDMfRURwxmlKtOh02oZCQfGD4KIrbXsmmzvNau66BhZ6oG4NToBgQmmBxWBcyubNHd92MvoSZNZ9kfU3axOnohn2pJTxs%2FMLcl5fGarmoyPSzpliYVqn3Fx3nFfSEIctWyapcx%2BvdakPbwZ4If%2BQDjqCixj%2FuQpgyaUMnvjyUKqQERqdGZYvbJV%2F%2BzZPmOnAEZDTGPq24KoMyCzcJdmQeNKDtqlA4%2F3bRkkhboyd2ECowWAMM6BdEE3ZlzxbhSzzilCRMNYINn99w6F51Y3xl%2FLQ1Y0ZaukrTAarPuO6oUtDUJd6dUV%2FLgNA19y%2BJWtWNK49H%2BWHcSuK%2F%2B1Q%2FnVc9ZkZudk%2FQoVmUHyfUNoU80bh64OoJeNb0m5St%2FjjNUtBjP0Cfx5u4FlXFJj5yCJ4TYuf8wdVtXzWsB898At%2FDRQUQmIiwmODs0dpSihI2N7ZA9EVpZYXfeH%2Blpngo6lM9IN7WNNb97etBCbnFGZFNhBdyzL0ZFiJ21m0oMSrA%2B72vUeSPU47moqlQiylrMOu1p9QGOpcBeVTc25ok8hF700ddSB819Qk6oF9oL2igKAamAYKYNOwzDaL6dpsYTw4rrT%2FbC6MNAr76cNM28lq9fivG7KfCr9tCLO%2FbDWPWrrDA%2BmLS%2BpFXNa4TIId3o59KsS0Ur8luvnUxWixs02t9sEKWIsuWrtryWlq540SwDSXlGIk%2FYJ86XMGqkH9rCT36hzMiu5DEzgCmY%2BQ2mw%3D%3D&Expires=1787422910)

## Regulatory and assurance context

### Section headline

> ## Build one evidence model for cyber resilience, operational assurance, and sustainability reporting.

Do not promise automatic regulatory compliance, certification, or assurance outcomes. The Twin supports traceable risk management, control decisions, system/dependency evidence, scenario testing, supply-chain analysis, and technical documentation.

| Framework / requirement | Hyperscale relevance | How the Cyber Digital Twin supports the work |
|---|---|---|
| **NIS2** | Data-centre service providers are in scope; applicable entities must implement cyber risk-management measures and incident handling under the Directive and, for specified digital-infrastructure entities, the Implementing Regulation | Supports asset management, risk assessment, access-path modeling, business continuity/crisis scenarios, supply-chain evidence, incident impact analysis, and governance reporting |
| **Commission Implementing Regulation (EU) 2024/2690** | Specifies technical and methodological requirements and significant-incident criteria for data-centre service providers and other named digital-infrastructure entities | Produces facility/OT dependency evidence that can feed policies, risk treatment, access control, asset management, continuity, incident and supplier-security workflows |
| **EU Energy Efficiency Directive** | Operators of sites with installed IT power demand of 500 kW or more must annually report specified energy-performance information | Connects meters, power/cooling assets, water data, controls, site boundaries, and calculation provenance to reporting workflows |
| **Commission Delegated Regulation (EU) 2024/1364** | Establishes harmonized reporting elements and the first phase of an EU data-center rating scheme | Supports traceability for energy, IT load, cooling, water, heat-reuse, renewables, capacity, and related evidence inputs |
| **IEC 62443** | Relevant to BMS, EPMS, electrical and mechanical control environments, industrial network segmentation, and lifecycle security for IACS components/systems | Supports system boundaries, zones/conduits, control-path visibility, risk analysis, technical evidence, and change decisions |
| **ISO 27001 / NIST CSF 2.0** | Common enterprise governance frameworks for cloud and data-center organizations | Provides the facility/OT component of wider risk, asset, supplier, incident, and continuity programs |
| **ISO 22301 / operational-resilience programs** | Supports business-continuity, recovery, and customer-commitment planning | Models dependencies, recovery sequence, external constraints, and consequences of simultaneous failures |
| **Customer / sovereign / defense requirements** | May impose heightened access, residency, supply-chain provenance, auditing, separation, and continuity obligations | Helps document isolation boundaries, access routes, supplier dependencies, data/control flows, and recovery options—subject to the operator’s applicable requirements |

The EU’s data-centre reporting framework requires operators of sites with installed IT power demand of at least 500 kW to report annual information and specified KPIs to the European database; the Commission identifies energy use, water footprint, and sustainability metrics among the transparency objectives. [energy.ec.europa](https://energy.ec.europa.eu/document/download/2597a32b-c791-4d87-a9da-57b64a3c4d7d_en?filename=2026_07_03%20FAQ%20on%20European%20database%20on%20data%20centres%201v7-AA(1).pdf&prefLang=lt)

ENISA’s NIS2 material identifies data-centre service providers as in scope and highlights requirements spanning risk management, incident handling, business continuity and crisis management, supply-chain security, access control, asset management, and environmental/physical security. [enisa.europa](https://www.enisa.europa.eu/topics/state-of-cybersecurity-in-the-eu/cybersecurity-policies/nis-directive-2)

## Engagement approach

### Section headline

> ## Start with one hall, one utility dependency, or one critical-facilities change.

| Engagement | Best starting point | Example output |
|---|---|---|
| **Critical-Facilities Decision Sprint** | Vendor access, BMS/EPMS segmentation, UPS/generator update, cooling-control change, power-path concern, or commissioning boundary | Modelled dependency/cyber pathway, capacity consequence, controls comparison, implementation sequence |
| **Hyperscale Campus Twin Build** | One campus, data hall cluster, electrical system, cooling plant, or critical-facilities management environment | Validated Cyber Digital Twin, A/B common-mode analysis, priority queue, interactive system views, assurance evidence |
| **Expansion and Commissioning Assurance** | New building/hall, new utility feed, cooling plant, substation, liquid-cooling deployment, or major modernization | Temporary-to-live trust-boundary analysis, design/commissioning evidence, change scenarios, acceptance criteria |
| **Continuous Twin Operations** | Multi-site estate with ongoing expansion, firmware change, supplier exposure, energy/water constraints, and evolving customer commitments | Risk deltas, scenario testing, supplier/BOM change impact, capacity/resilience reporting, decision support |

## Final CTA

> ## Start with one power path, one cooling train, or one control-system change.
>
> Bring a one-line diagram, P&ID, BMS/EPMS architecture, equipment list, or a proposed vendor-access, firmware, or segmentation change. OXOT will show how the Cyber Digital Twin can trace the route, test the control, and expose the capacity consequence before the live facility is changed.

**Primary CTA:** **Discuss a hyperscale scenario**  
**Secondary CTA:** **Explore the interactive hyperscale model**

**Form fields**

- Name and work email
- Organization
- Role
- Organization type:
  - Hyperscaler
  - Colocation provider
  - Enterprise data-center operator
  - Developer / design-build / EPC
  - Critical-facilities OEM or integrator
  - Telecom / cloud / managed-service provider
  - Government / sovereign / defense-adjacent operator
  - Other
- Facility scope:
  - Campus / availability zone
  - Data hall
  - Electrical power path
  - Generator / UPS / BESS
  - Chiller / cooling-water plant
  - Liquid-cooling / AI hall
  - BMS / EPMS / DCIM environment
  - Vendor remote access
  - New build / commissioning / expansion
  - Multi-site estate
- Decision to evaluate:
  - Common-mode dependency analysis
  - BMS/EPMS segmentation
  - Vendor/OEM access
  - Controller/firmware lifecycle
  - Electrical or cooling change
  - Grid, fuel, water, or telecom dependency
  - Supply-chain / BOM / procurement risk
  - Sovereign or regulated-workload boundary
  - NIS2 / sustainability reporting evidence
  - Other

## Page structure

```text
Hero: Test the failure path before it becomes a capacity event
├─ Interactive hyperscale model
├─ Sector reality: engineered redundancy and hidden common-mode dependencies
├─ Facility architecture: grid to workload
├─ Dependency map: energy, water, communications, customers, defense, supply chain
├─ Hyperscale risk scenarios
├─ Four capacity and resilience decisions
├─ Worked use case: secure BMS vendor access without reducing cooling resilience
├─ Case-study programme
├─ Product capabilities
├─ Regulatory, assurance, and sustainability context
├─ Engagement approach
└─ CTA: Discuss a hyperscale scenario
```

## Metadata

**SEO title**  
Hyperscale Data Center Cyber Digital Twin | Critical Facilities Security | OXOT

**Meta description**  
Test critical-facilities cyber changes before they affect capacity. OXOT’s Cyber Digital Twin connects BMS, EPMS, power, cooling, OT networks, suppliers, and external dependencies for hyperscale data centers.

**H1**  
Test the failure path before it becomes a capacity event.

**Suggested internal links**

- `/platform/cyber-digital-twin`
- `/platform/decisions/fix-first`
- `/platform/decisions/change-safely`
- `/platform/deployment-data-sovereignty`
- `/assurance/iec-62443`
- `/assurance/nis2`
- `/resources/technical-specification`
- `/resources/case-studies`
- `/contact`