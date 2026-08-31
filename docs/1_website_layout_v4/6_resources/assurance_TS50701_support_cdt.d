The Cyber Digital Twin supports EN 50126 RAMS by giving the railway a single, traceable model of the **system, its functions, interfaces, dependencies, failure modes, operating constraints, and change history**. It does not replace the RAMS process, hazard log, safety case, or independent safety assessment; it makes the evidence behind them easier to connect, test, and maintain.

A terminology note: the former EN 50126 / IEC 62278:2002 has been replaced at IEC level by **IEC 62278-1:2025** for the generic RAMS process and **IEC 62278-2:2025** for the systems approach to safety. The current series applies across signaling, rolling stock, fixed installations, new systems, and relevant modifications, using a lifecycle-based process for specifying and demonstrating RAMS requirements. [webstore.iec](https://webstore.iec.ch/en/publication/6747)

## Where it fits

```text
Railway engineering evidence
System description • hazard log • RAMS requirements • architecture
interlocking / CBTC / ETCS / PTC data • asset records • maintenance data
operating rules • degraded-mode procedures • configuration records
                           ↓
OXOT Cyber Digital Twin
Functions • assets • interfaces • dependencies • pathways
failure cascades • cyber scenarios • operational consequences
                           ↓
RAMS work products and decisions
Requirements • hazard analysis support • availability/reliability context
maintainability dependencies • safety evidence support • change-impact analysis
```

The Twin becomes the **live evidence map** underneath RAMS activities. Instead of keeping the system description, network architecture, asset register, operational dependencies, cybersecurity analysis, supplier data, and change records in separate documents, the model links them.

## Support across RAMS

| RAMS element | How the Cyber Digital Twin helps |
|---|---|
| **Reliability** | Connects assets, control functions, communications, power, supplier components, configuration, and maintenance history to identify single points of failure and common-mode dependencies |
| **Availability** | Models what must remain available for train movement, route setting, control-center operations, traction power, communications, depot function, and safe recovery; helps quantify what happens when a dependency is lost |
| **Maintainability** | Maps diagnostic tools, remote support, spares, firmware, field-service procedures, engineering workstations, vendor access, access windows, and required human roles |
| **Safety** | Links cyber or component failure pathways to railway functions, hazard-log context, safety-related systems, degraded modes, protective barriers, and operational consequences |
| **Security** | Adds cyber reachability, vulnerability, remote-access, supplier, and threat context to the RAMS system model—supporting TS 50701 and IEC 62443-aligned analysis |
| **Lifecycle evidence** | Tracks system versions, configuration changes, updates, supplier changes, new interfaces, control changes, risk decisions, and resulting evidence deltas |

IEC 62278-1:2025 defines a lifecycle-based, tailorable RAMS process for specifying requirements and demonstrating they are achieved. It applies from whole railway systems to subsystems and components, including software, and covers new systems as well as relevant modifications and extensions. [webstore.iec](https://webstore.iec.ch/en/publication/68933)

## System definition and interfaces

A strong RAMS analysis begins with a clear **system under consideration** and its interfaces. The Twin supports this directly.

For example, for a CBTC corridor:

```text
Safe passenger movement through a corridor
        ↓
CBTC zone controller and interlocking functions
        ↓
Wayside equipment • train-ground radio • OCC interface
        ↓
Field power • time synchronization • network services
        ↓
Maintenance access • vendor tools • configuration data • spares
```

The model can show:

- What is inside the system boundary.
- What interfaces enter or leave it.
- Which subsystems support an operational or safety function.
- What control, communication, power, time, remote-support, and supplier dependencies exist.
- Which dependencies are shared by systems assumed to be redundant.
- What changes affect only a subsystem versus the overall railway application.

IEC 62278-2:2025 specifically emphasizes defining the system under consideration, including its interfaces and interactions with subsystems or other systems, so that risk analysis can be performed properly. [webstore.iec](https://webstore.iec.ch/en/publication/79793)

## Safety-linked consequence

The most valuable contribution is linking a cyber or technical failure to a railway consequence rather than treating it as a disconnected security event.

```text
Cyber or technical event
Compromised remote access / failed controller / firmware defect
        ↓
Affected asset
Engineering workstation / interlocking / wayside controller / traction RTU
        ↓
Affected railway function
Route setting / train detection / movement authority / power control
        ↓
Degraded or safe state
Train restriction / safe stop / manual procedure / reduced headway
        ↓
RAMS consequence
Safety barrier affected • availability loss • recovery requirement
operational workload • passenger or freight service impact
```

The Twin can associate these chains with:

- Hazard-log entries.
- Safety functions and protective barriers.
- EN 50126 / IEC 62278 RAMS assumptions.
- Degraded-mode procedures.
- Minimum operating requirements.
- Restoration sequence.
- Availability targets and service constraints.
- FMECA and reliability-critical-item data.
- Incident, maintenance, and supplier dependencies.

That is particularly useful when evaluating cybersecurity changes: a firewall rule may close a malicious path but also disrupt the diagnostic or communication flow needed to recover a signaling fault safely.

## Reliability and availability

### Find common-mode dependencies

Railway systems are designed with redundancy, but redundancy can be undermined by shared dependencies. The Twin makes those dependencies visible.

```text
Two redundant signaling servers
        ↓
Both rely on the same:
- Identity service
- Time source
- Management network
- Software release
- Engineering workstation
- Vendor remote-support tool
- Shared power or telecoms path
```

The model can reveal questions that are difficult to answer from a reliability block diagram alone:

- Do redundant CBTC zones share a management or update path?
- Do multiple interlockings depend on one field-network gateway?
- Does a single certificate or PKI service affect a fleet of wayside devices?
- Does a remote-access gateway create a common cyber pathway to several operational zones?
- Are multiple stations or traction substations dependent on one SCADA, radio, or fiber route?
- Does a maintenance tool, laptop image, firmware release, or vendor portal create fleet-wide common-mode risk?

## Maintainability and recovery

### Model the recovery process—not just the failed asset.

Maintainability in rail depends on much more than a mean-time-to-repair figure. Recovery may require:

- Access to the affected site, signal house, depot, or substation.
- Skilled maintainers and required shift coverage.
- Approved maintenance windows or possessions.
- An engineering workstation, diagnostic tool, configuration file, certificate, or software package.
- Vendor remote support or field-service escalation.
- Spares, test equipment, power, telecoms, transport, and safe access.
- System restart, validation, and controlled return-to-service procedures.

The Cyber Digital Twin can model those dependencies:

```text
Restore a wayside controller
        ↓
Technician + safe site access + spare controller
        ↓
Correct firmware + configuration baseline + engineering tool
        ↓
Communications link + control-center validation
        ↓
Functional test + route / train-control release
        ↓
Return to service
```

This supports maintainability and resilience discussions such as:

- Can the vendor route be removed without increasing restoration time beyond operational tolerance?
- Which spares, certificates, tools, and qualified people are required to restore a critical asset?
- Which field assets have no practical recovery path during extreme weather or major disruption?
- What is the operational impact if a supplier or remote support capability is unavailable?
- Which legacy system can remain in service only if offline backups, local configuration copies, and tested recovery procedures exist?

## Cybersecurity as a RAMS input

Cybersecurity does not replace RAMS. It adds another causal pathway into RAMS outcomes.

```text
Cyber entry point
        ↓
Reachability through OT / telecoms / vendor access
        ↓
Asset or configuration affected
        ↓
Failure mode or unsafe/unavailable function
        ↓
Safety, availability, maintainability, and service consequence
```

This is the connection between the Cyber Digital Twin, TS 50701, IEC 62443, and RAMS:

| Discipline | Main question | Twin contribution |
|---|---|---|
| **RAMS** | Can the railway meet reliability, availability, maintainability, and safety requirements across its lifecycle? | Models functions, dependencies, failure propagation, recovery prerequisites, and operational consequences |
| **Safety / hazard management** | What hazards exist, what barriers prevent them, and what happens if barriers fail? | Links cyber/asset pathways to hazard, safety-function, and degraded-mode evidence |
| **TS 50701** | How are cybersecurity activities managed through the railway lifecycle? | Models railway cyber pathways, assets, interfaces, security treatment, and evidence |
| **IEC 62443** | How are IACS zones, conduits, risk, and controls designed and maintained? | Models OT zones, communications, reachability, segmentation, and candidate controls |
| **Cyber Digital Twin** | What happens if a threat, failure, change, or dependency affects this real railway system? | Connects all of the above in a navigable model and supports scenario testing |

Europe’s Rail has explicitly described the need to manage cybersecurity-related and RAMS-related evolutions of control-command and signaling systems, reflecting the fact that cyber changes can affect safety-related railway system evolution. [rail-research.europa](https://rail-research.europa.eu/wp-content/uploads/2026/01/20240902-SP-AWP-extract-Update.pdf)

## Change-impact analysis

RAMS evidence is most vulnerable when systems change. The Twin can show the impact of a proposed change before it enters the live railway.

```text
Proposed change
New firmware • firewall rule • vendor tool • radio network
controller replacement • remote-access redesign • new signaling interface
        ↓
Affected assets and interfaces
        ↓
Changed pathways and dependencies
        ↓
Potential RAMS consequences
Reliability • availability • maintainability • safety
        ↓
Required validation, controls, evidence, and approvals
```

### Typical use cases

| Change | RAMS question the Twin supports |
|---|---|
| Segmentation change | Does the new boundary protect signaling assets while retaining required train-control, diagnostic, and recovery communication? |
| Firmware update | Which systems share the software component, and what is the rollback, validation, and common-mode impact? |
| Vendor-access redesign | Can remote support become controlled and time-limited without making fault recovery operationally unacceptable? |
| Interlocking replacement | Which interfaces, dependencies, field assets, route-control functions, and operating procedures are affected? |
| CBTC modernization | What shared network, timing, control-center, onboard, and depot dependencies alter availability or recovery assumptions? |
| PTC support-system change | Does a change affect field communications, back-office services, certificate dependencies, wayside equipment, or dispatching recovery? |
| Traction-power SCADA change | Can the network/control change preserve operational switching, field safety, remote diagnostics, and emergency restoration? |
| Supplier substitution | What firmware, configuration, tooling, spare, certification, lifecycle, and support dependencies change with the new supplier? |

## Evidence outputs

For an EN 50126 / IEC 62278-oriented engagement, the Twin can support—not replace—the following work products:

- System-under-consideration definition.
- Functional, asset, interface, and dependency model.
- Cyber-to-RAMS consequence chains.
- FMECA and reliability-critical-item context.
- Hazard-log and safety-function linkage.
- Degraded-mode and recovery dependency view.
- Availability and capacity consequence scenarios.
- Maintainability and restoration prerequisite map.
- Supplier, spare, tooling, firmware, certificate, and vendor-support dependencies.
- Change-impact analysis.
- Security-treatment simulation.
- Risk acceptance and compensating-control records.
- Evidence links, assumptions, approvals, review conditions, and change deltas.

OXOT’s product model supports engineering data including FMECA, hazard logs, SCIL/SIL context, RCILs, RAMS analysis, operational minimum requirements, device cascades, topology, configuration, and technical evidence outputs. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYER6M5UDVF&Signature=BolhRjGZEQXOaCocJu%2F4KpiuBOw%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIGBk2nvlXaR9efCKL%2FvNLdbUTfJQS38Zx7uv3abivJdVAiEAnW3CopsBF%2B4X%2F0Pjc5ldkqt74idq92%2FD6HYF%2F5oNiHcq%2FAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDNQj5SCB9Ju5ZIvwuSrQBMtIU%2F7Kbgk2IaN6vL6Febwb6%2BM%2BaAAoKhi3zNruXQFHAv0qH6%2FMOJj4qPNqn5pu9f9%2FV%2FQbOwQXVApRxVZGm7hB7M9rI1mXBVWn5uccwlBXXklbWNBjDeoGeuOu1OGE7XMfasLOINDdBTZ67hUip3DjV0eSqYH6%2BfINcPheDUFGbUyr%2Fa0r0QfHrBxXvVDQsLV1y3GnH7yzyrCjDbSp5xNAuS9vzossuVFm%2BZCobrGiAr6FHmTovOkQr8JTEUh6IL3iML7C%2BXljl%2BHlfiwaeWstziX%2B1l0g2tRQY2zQPILoKc7Bl0AZorugPys9kY5HFMt800qI7cyqCYglN40f88NUtF%2BzyRY7VbZ7%2FkVsR8SvuYagVA13DJEqreGVFXqS0zDmM4oKFECSuPuQNnklMBbhY%2F%2BNgg8PmdBj4pHosQMwydb4OKdK37eYjwMrHi%2FUKl0pnjhd34p7QDT1DT1RQlV7PUDBut9H%2B3Qjk0QRXyLDkfqBchuELwgLBl2GVBvJAKiZ2l9nlKMIUzCoxVzWV83bAbTS3pejQak3tLLFWq9RBdHf1dxr8iTCoFuFKe0tS%2FQPKuX4IrLOSEeq7JYFiTGDeJrnviQjDXUzvxK1HNrAJWRRlf7Hy5xgwIslBvSwCk2yqubVjuIaiub0LdQmoE7nMg2lwaRV5wtuLVPkizAPIJ6AJ7GXQXWWirml7oaZXeK8w6bgVU%2FskyL%2FFtLt%2B4TrGgAR8a71vdYLiJf%2Fn%2FocSYL6uRwutOiet6Wq9UfEXWk0FWM60AlShbf%2FoFf%2Fgo4wtsWn1AY6mAFhvLhEUZ8uEd1RvK52Z6NWrlQxJfnUrBhhrgnJaNx5%2FHmJU6ZVIe4nvHc50QMROf0o4G%2B2kOL%2FMKMTbaqzE4uG%2B%2FbWYjJ%2BWFERBO6neRexa3qtiMlx%2FAbHTSum2PbqDECt4sCVj3qkXcAUC0TWVc8S27Rf8Ja8QlJEM00KCEpRXAIOqay1JaauWVQkYv2XzyGKPuu581InDw%3D%3D&Expires=1787424905)

## Important boundary

Use this wording on the TS 50701 and rail-industry pages:

> **OXOT supports RAMS evidence, cybersecurity analysis, dependency modeling, and change-impact assessment. It does not replace the railway’s RAMS process, safety case, hazard-log ownership, safety authorization, independent safety assessment, system acceptance, or the accountable engineering and operational authorities.**

The Twin is strongest when it is treated as the **evidence and scenario layer** beneath the organization’s formal RAMS and safety-governance processes—not as a replacement for them.