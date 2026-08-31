# Evidence & Data Provenance

**URL:** `/assurance/evidence-data-provenance`  
**Navigation label:** `Evidence & Data Provenance`  
**Primary CTA:** `Discuss an evidence model`  
**Secondary CTA:** `Request the Technical Specification`

***

## Hero

### Every number should be traceable to its source—or visibly absent.

OXOT’s Cyber Digital Twin is not a black box that converts incomplete data into confident-looking answers.

It is an evidence model: each asset, dependency, pathway, risk scenario, safety assumption, supplier relationship, control decision, and calculation can be connected to its source, method, owner, and review state. Where evidence is absent, the gap should remain visible.

**CTA:** `Discuss an evidence model`  
**Secondary CTA:** `Explore the Cyber Digital Twin`

```text
Source evidence
        ↓
Modelled system, product, or railway environment
        ↓
Pathway, dependency, consequence, or safety analysis
        ↓
Control and decision rationale
        ↓
Framework-oriented evidence output
        ↓
Change history, review, and accountability
```

> **No fabricated certainty. No unexplained score. No evidence detached from the system it describes.**

***

## Why provenance matters

### The problem is not a lack of documents. It is a lack of connection.

Critical environments typically have extensive documentation:

- P&IDs, single-line diagrams, interlocking diagrams, system descriptions, drawings, and architecture records.
- PLC, SCADA, HMI, RTU, relay, controller, firmware, and configuration exports.
- Asset registers, network diagrams, firewall rules, packet captures, and remote-access procedures.
- FMECA, hazard logs, HAZOP material, RAMS records, safety requirements, and degraded-mode procedures.
- Product architecture, SBOMs, HBOMs, certificate records, software-release data, and vulnerability records.
- Supplier contracts, service agreements, maintenance procedures, support obligations, and spare-part information.
- Incident reports, threat intelligence, public advisories, geopolitical context, and external risk data.
- Audit reports, compliance evidence, risk registers, test reports, approvals, and change records.

But when a decision is needed, organizations often cannot answer:

- Which version of this document applies to the live system?
- Which asset, product release, interface, or operating assumption does it describe?
- What evidence supports this risk conclusion?
- Which control was selected, and what pathway does it actually close?
- What changed since the last assessment?
- Which values are sourced facts, which are assumptions, and which are model calculations?
- What evidence is missing?

The Cyber Digital Twin is designed to turn a document estate into a **traceable decision model**.

## The OXOT evidence model

### From source record to accountable decision.

```text
1. Source evidence
   Engineering record • configuration export • product release
   safety record • supplier document • approved intelligence source

2. Model object
   Asset • component • function • interface • zone • conduit
   hazard • requirement • supplier • procedure • control

3. Relationship
   Depends on • communicates with • implements • supports
   reaches • mitigates • verifies • validates • supersedes

4. Analysis
   Attack path • dependency cascade • hazard scenario
   product vulnerability impact • control simulation • investment comparison

5. Decision
   Implement • validate • phase • defer • accept • replace • monitor

6. Evidence output
   System view • BOM • risk record • safety trace • technical-file section
   framework evidence • engineering report • executive decision brief

7. Change and review
   New version • configuration drift • supplier change • new vulnerability
   altered route • changed safety assumption • evidence expiry
```

Each conclusion should be navigable in reverse:

```text
Board-level output
        ↓
Risk or safety decision
        ↓
Control rationale
        ↓
Pathway / dependency / consequence
        ↓
Model objects and assumptions
        ↓
Original evidence artifacts
```

The OXOT specification describes this as a “glass box” approach: outputs drill back to the component and relevant source, while evidence is grounded in customer engineering data and cited external information. 
***

## Evidence principles

### The rules that keep the model honest.

| Principle | What it means |
|---|---|
| **Grounding first** | Retrieve real customer engineering, operational, safety, product, supplier, asset, network, and configuration evidence before synthesizing conclusions |
| **No fabrication** | Do not create an asset relationship, safety assumption, vulnerability impact, financial input, supplier fact, or control claim that cannot be supported |
| **Null over zero** | Unknown or unsourced information stays visibly empty; it is not silently treated as zero risk, no dependency, or “not applicable” |
| **Citations retained** | External threat, vulnerability, supplier, financial, regulatory, standards, geopolitical, and contextual data retains its source reference |
| **Version-aware** | Evidence is tied to the relevant asset configuration, product release, firmware, document revision, system state, or lifecycle stage |
| **Drillable reasoning** | Users can move from summary output to system, function, zone, component, interface, hazard, supplier, requirement, source, and assumption |
| **Change-aware** | A changed device, route, component, firmware, certificate, supplier, procedure, risk treatment, or operating condition creates a visible delta |
| **Fact, assumption, calculation separated** | Customer facts, sourced external data, approved assumptions, and OXOT-generated calculations remain distinguishable |
| **Decision ownership retained** | Each treatment, acceptance, exception, or assurance statement can carry accountable owner, approver, date, review trigger, and expiry condition |
| **Human review stays visible** | The model supports expert judgment; it does not hide incomplete evidence or replace accountable engineering, safety, product, legal, or operational approval |

These principles reflect OXOT’s documented data discipline: grounding first, no fabrication, null over zero, and citations stored with external values. 
***

## Evidence sources

### OXOT starts with the records that already describe the real environment.

The Cyber Digital Twin can ingest or link to approved source evidence across multiple domains.

| Evidence domain | Typical source artifacts | What it supports |
|---|---|---|
| **Engineering and process** | P&IDs, process-flow diagrams, single-line diagrams, CAD, equipment lists, control narratives, calculations, operating limits | Physical functions, equipment dependencies, process consequence, facility/system boundary |
| **OT and control systems** | PLC ladder logic, structured text, SCADA/HMI projects, DCS configurations, RTU exports, relay settings, controller baselines | Control functions, configuration integrity, asset relationships, safety/operational dependencies |
| **Networks and communications** | Network diagrams, VLAN/subnet plans, firewall configurations, routing, topology exports, PCAP/flow evidence, remote-access records | Zones, conduits, actual reachability, communications dependencies, segmentation evidence |
| **Safety, RAMS, and reliability** | FMECA, hazard log, HAZOP, SIL/SCIL evidence, RCIL, RAMS analysis, safety requirements, degraded-mode procedures | Hazard linkage, safety assumptions, reliability impact, barriers, recovery, operational consequence |
| **Product and lifecycle** | Product architecture, source/release records, firmware inventory, SBOM, hardware specification, certificates, cryptography design, test reports | Product boundary, component dependency, version control, CRA-oriented documentation |
| **Operations and maintenance** | SOPs, MOPs, EOPs, work orders, CMMS/EAM data, maintenance schedules, operating procedures, access approvals | Human workflow, recovery, maintainability, operational constraints, change governance |
| **Supplier and supply chain** | Supplier list, contracts, support agreements, component origin, firmware/service commitments, spares, lead times, maintenance dependencies | Supplier concentration, remote support, replacement options, lifecycle and resilience analysis |
| **Vulnerability and threat** | CVE, KEV, EPSS, CVSS, CWE, CAPEC, ATT&CK, vendor advisories, threat reports | Exploitability context, affected component/version, threat relevance, treatment priority |
| **External context** | Geopolitical, climate, utility, logistics, financial, incident, claims, and sector sources | Site-specific likelihood, external dependency, supplier pressure, resilience and investment context |
| **Assurance and governance** | Requirements, test plans, verification reports, validation records, audit findings, approvals, risk registers, safety case artifacts | Traceability, claims, treatment evidence, compliance workflow, accountable acceptance |

OXOT’s documented ingestion model includes P&ID extraction, DEXPI 2.0, control-system configuration, topology and passive flow evidence, industrial protocols, CycloneDX, FMECA, hazard records, SCIL/RCIL, RAMS, BOMs, and external intelligence. 
***

## Source confidence and quality

### Not all evidence has the same authority.

A mature evidence model should retain not only a document link, but the **quality and status** of the source.

Each evidence item can be assessed using a practical hierarchy:

| Evidence class | Example | Typical confidence |
|---|---|---|
| **Verified current configuration** | Signed controller export, approved firewall configuration, passive network evidence, released firmware manifest | Highest |
| **Approved engineering record** | Issued-for-construction drawing, approved system architecture, verified P&ID, approved single-line diagram | High |
| **Controlled operational record** | Approved operating procedure, maintenance record, work order, test result, commissioning record | High to medium |
| **Supplier or vendor declaration** | SBOM, advisory, datasheet, support notice, certificate statement | Medium; validate against product/version context |
| **Historical or legacy documentation** | Old network diagram, archived engineering drawing, prior assessment, outdated asset register | Medium to low until reconciled |
| **External intelligence** | CVE, KEV, EPSS, threat report, geopolitical source, claims study | Useful context; must retain source, date, applicability, and assumptions |
| **Assumption / estimate** | Recovery-time estimate, unavailable component relationship, estimated cost, inferred configuration | Explicitly labeled; never presented as observed fact |
| **Unknown / missing** | No source available or source cannot be validated | Stored as null; creates an evidence gap rather than false confidence |

### Evidence gap model

```text
Known and verified
        ↓
Known but awaiting validation
        ↓
Sourced external context
        ↓
Approved assumption
        ↓
Unknown / missing
```

The model should make evidence gaps actionable:

- Which high-consequence assets lack a current configuration baseline?
- Which safety-relevant interfaces have no verified network evidence?
- Which product releases lack a complete SBOM?
- Which critical suppliers have no documented support, spares, or lifecycle information?
- Which recovery steps depend on an unvalidated procedure?
- Which risk assumptions have expired or need a new owner review?

> **The absence of evidence is not evidence of safety. It is a decision-relevant gap.**

***

## Evidence types in the model

### Fact, assumption, analysis, and decision must remain separate.

One of the most important design rules is to prevent derived statements from looking like facts.

```text
FACT
A signed PLC configuration identifies firmware version X.

EXTERNAL FACT
A published advisory identifies CVE-Y as affecting version X.

MODEL RELATIONSHIP
The PLC supports this process function and is reachable through this route.

ASSUMPTION
The maintenance route is assumed active until confirmed by network evidence.

CALCULATION
The modeled pathway produces a defined risk or loss range.

DECISION
Broker vendor access now; reassess after the planned shutdown.
```

| Type | Meaning | Example |
|---|---|---|
| **Observed fact** | Directly evidenced customer or system information | A firewall rule, asset configuration, approved drawing, controller export |
| **External fact** | Cited information from a trusted/public/approved source | CVE record, vendor advisory, standards text, threat report |
| **Assumption** | Necessary but unverified input | Estimated recovery duration, presumed protocol route, provisional supplier dependency |
| **Derived relationship** | Connection inferred or calculated from modelled evidence | Device depends on a network route; component belongs to a product version |
| **Model calculation** | Transparent OXOT output based on inputs and methods | Consequence Index, pathway score, simulation output, loss range |
| **Control decision** | Accountable action selected by the responsible organization | Segment route, patch system, replace supplier, accept risk with controls |
| **Evidence claim** | Statement supported by linked artifacts and approval | “Only approved users may reach the engineering function” |

This separation is essential for credible IEC 62443, CRA, TS 50701, and IEC 62278-2:2025 evidence.

***

## Drillable calculations

### A board figure should lead back to the component and source.

OXOT can produce summarized outputs for leadership, but they should remain explainable.

```text
Consequence Index, risk trend, or investment decision
        ↓
System, site, product, or railway function
        ↓
Relevant scenario or pathway
        ↓
Assets, components, interfaces, and dependencies
        ↓
Engineering / safety / product / supplier context
        ↓
Source artifacts, citations, assumptions, and calculation method
```

### Example: a rail safety and cybersecurity decision

```text
Decision:
Redesign remote signaling-vendor access.

        ↓

Why:
The access route can reach a signaling engineering workstation.

        ↓

Operational and safety context:
The workstation supports configuration and recovery for an interlocking zone.

        ↓

Safety assumption:
Only authorized, validated, and traceable changes can affect route setting.

        ↓

Control:
MFA, named accounts, approval, time-limited access, recording,
segmentation, and configuration validation.

        ↓

Evidence:
System description • topology export • access procedure
hazard/RAMS record • vendor support contract • test/validation record
```

### Example: a CRA product decision

```text
Decision:
Issue a firmware update and disable a legacy management service by default.

        ↓

Why:
A disclosed component vulnerability affects selected firmware releases.

        ↓

Product context:
The service is reachable through a management interface in common deployments.

        ↓

Treatment:
Update affected component, change default configuration,
publish customer guidance, track affected versions.

        ↓

Evidence:
SBOM • firmware manifest • architecture • advisory
test record • release note • update procedure • PSIRT decision record
```

The OXOT specification states that its financial and risk outputs can drill from an organizational result down to the component and source filing/evidence behind it. 
***

## Change history and evidence deltas

### Assurance begins to fail when the system changes faster than the documentation.

The Cyber Digital Twin should treat each relevant change as a new evidence event.

```text
Changed asset, component, firmware, supplier, configuration,
network route, certificate, procedure, operating mode, or external condition
                           ↓
Updated model state
                           ↓
Affected pathways, dependencies, hazards, controls, requirements, or evidence
                           ↓
Visible risk and documentation delta
                           ↓
Review, approval, validation, or remediation trigger
```

### Common change triggers

| Change | Evidence that may need review |
|---|---|
| New PLC, controller, relay, RTU, HMI, server, or network device | Asset inventory, topology, zone/conduit model, configuration baseline, risk scenario |
| New or changed firewall rule | Communications path, reachability, segmentation evidence, control validation |
| Firmware or software release | SBOM, vulnerability status, test evidence, product/version record, change impact |
| Certificate renewal or cryptographic change | CBOM, trust boundary, update mechanism, access control, expiry monitoring |
| Vendor remote-access change | Network paths, identity, approval workflow, maintenance procedure, supplier risk |
| New cloud API or SaaS dependency | SaaS-BOM, product boundary, data flow, availability/recovery dependency |
| Supplier change or end-of-life notice | HBOM/SBOM, support dependency, spare availability, replacement plan, product/operational risk |
| Updated safety or operating procedure | Hazard linkage, recovery model, maintenance workflow, validation evidence |
| New CVE, exploitation advisory, or supplier alert | Affected versions/assets, reachability, treatment decision, customer/operational action |
| Changed external conditions | Site risk, supplier risk, utility/logistics dependency, resilience scenario, investment view |

### The three reasons an output changes

OXOT’s product model uses a useful discipline:

```text
1. You changed something
   A control, configuration, component, supplier, or operating procedure changed.

2. The environment changed
   A new asset, undocumented drift, lifecycle change, dependency, or configuration difference appeared.

3. The world changed
   A vulnerability, exploited threat, supplier event, geopolitical condition,
   market condition, or external disruption changed the context.
```

The Twin is designed to regenerate BOMs, risk deltas, and technical-file sections as differences in the underlying model occur. 
***

## Provenance across assurance frameworks

### One evidence foundation, different proof obligations.

| Assurance area | Evidence and provenance need | What the Twin connects |
|---|---|---|
| **IEC 62443** | System scope, assets, zones/conduits, risk, target-security-level reasoning, control implementation, lifecycle evidence | Engineering data, topology, configurations, access paths, controls, operational consequence, source-linked treatment decisions |
| **Cyber Resilience Act** | Product identity, architecture, interfaces, SBOM, vulnerability management, testing, technical documentation, change history | Product versions, software/firmware/hardware/crypto/cloud/operational dependencies, suppliers, advisories, mitigations, evidence artifacts |
| **TS 50701** | Railway application scope, interfaces, security risk, lifecycle controls, vulnerability and change management, assurance evidence | Signaling, CBTC, ETCS, PTC, traction power, communications, vendor pathways, maintenance, operational and safety dependencies |
| **IEC 62278-2:2025** | System definition, hazards, safety objectives, requirements, allocation, verification, validation, safety argument, change impact | Hazards, safety functions, cyber assumptions, barriers, requirements, controls, test evidence, approvals, operational context |
| **Governance and investment** | Credible risk, consequence, residual exposure, treatment priority, and decision record | Source-linked calculations, explicit assumptions, investment options, approval, review trigger, and change history |

IEC 62443 system design centers on the system under consideration, zones/conduits, risk assessment, and target security levels; CRA manufacturers must maintain technical documentation; and railway safety work depends on structured system, hazard, requirement, and evidence traceability. [webstore.iec](https://webstore.iec.ch/en/publication/30727)

***

## Human accountability

### The model supports judgment. It does not replace it.

A trustworthy evidence system makes responsible human decisions more visible—not less.

Every significant modelled decision should be capable of carrying:

```text
Decision
├─ Decision owner
├─ Approver
├─ Engineering / security / safety reviewer
├─ Evidence sources
├─ Assumptions
├─ Applicable framework or requirement
├─ Selected treatment
├─ Residual risk or limitation
├─ Review date
├─ Expiry or reassessment trigger
└─ Change history
```

This is essential for:

- Risk acceptance.
- Deferred remediation.
- Safety assumption management.
- Cybersecurity exception decisions.
- Supplier-risk treatment.
- Product-release decisions.
- CRA vulnerability handling.
- Railway change and return-to-service decisions.
- Engineering-control validation.
- Audit, regulator, customer, or board review.

> **The Twin can show the reasoning. The accountable organization still owns the decision.**

***

## Data sovereignty and sensitive evidence

### Evidence can be sensitive even when the model is not connected to the live system.

For defense, government, critical infrastructure, regulated products, and sensitive industrial environments, the Twin may contain:

- Network topology and segmentation design.
- Safety-related system and engineering information.
- Vulnerability and configuration data.
- Supplier, component, and support dependencies.
- Operational procedures and recovery plans.
- Critical infrastructure location or capacity information.
- Product intellectual property.
- Customer, operational, or restricted information.

OXOT supports deployment options designed for sensitive environments:

| Deployment | Evidence handling position |
|---|---|
| **Island Mode** | Isolated deployment on customer-controlled infrastructure; no external dependency, no direct connection to live control systems |
| **Inbound Intelligence Mode** | One-way data diode allows approved intelligence into the Twin without customer data leaving the environment |
| **Dedicated Instance** | Single-tenant deployment in a customer-approved environment aligned to sovereignty requirements |

All documented options are passive-first: no agents on PLCs, RTUs, or controllers, and no active scanning of the process network. 
***

## What OXOT does not claim

### Provenance is not automatic conformity.

OXOT supports source-grounded modeling, traceability, evidence organization, risk analysis, control simulation, documentation workflows, and accountable decision records.

OXOT does **not**:

- Certify a system, product, railway application, organization, or evidence package.
- Guarantee regulatory or framework conformity.
- Act as a notified body, regulator, independent safety assessor, railway safety authority, legal adviser, insurer, or rating agency.
- Determine CRA scope, legal applicability, product classification, CE-marking requirements, or conformity-assessment route.
- Determine safety acceptance, assign SILs, authorize a railway system, or replace a hazard-log owner.
- Convert incomplete evidence into a verified conclusion.
- Treat an unverified source, external intelligence input, or model assumption as an observed fact.

The model can show what is known, what is assumed, what is calculated, what is missing, and who approved the resulting decision. That is its value.

***

## Closing CTA

### Start with one decision that needs stronger evidence.

Bring a system description, P&ID, network topology, asset register, PLC or SCADA export, hazard-log extract, RAMS requirement, product architecture, SBOM, firmware inventory, supplier record, vulnerability question, or change proposal.

OXOT will show how the Cyber Digital Twin can connect the source material, reveal dependencies, make evidence gaps visible, test the decision, and preserve a traceable rationale.

**Primary CTA:** `Discuss an evidence model`  
**Secondary CTA:** `Request the Technical Specification`

***

## Metadata

**SEO title**  
Evidence & Data Provenance for OT, Product and Railway Assurance | OXOT

**Meta description**  
Every OXOT Cyber Digital Twin output is traceable to evidence, assumptions, sources, and model logic. Connect engineering data, asset records, safety evidence, product BOMs, suppliers, cyber pathways, decisions, and change history.

**H1**  
Every number should be traceable to its source—or visibly absent.

**Suggested internal links**

- `/assurance`
- `/assurance/iec-62443`
- `/assurance/cyber-resilience-act`
- `/assurance/ts-50701`
- `/assurance/iec-62278-2-railway-safety`
- `/platform/cyber-digital-twin`
- `/platform/decisions/fix-first`
- `/platform/decisions/change-safely`
- `/platform/deployment-data-sovereignty`
- `/resources/technical-specification`
- `/contact`