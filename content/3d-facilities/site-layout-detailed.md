Below is a practical **product-first sitemap** for OXOT. The Cyber Digital Twin is the main offer; consulting appears as the implementation and ongoing operational model that makes the platform work in a real plant environment.

## Sitemap

```text
Home
│
├─ Platform
│  ├─ Cyber Digital Twin
│  ├─ How It Works
│  ├─ Decisions
│  │  ├─ What Do We Fix First?
│  │  ├─ What Should We Spend?
│  │  ├─ Can We Change Safely?
│  │  └─ What Can We Leave Alone?
│  ├─ Deployment & Data Sovereignty
│  ├─ Integrations & Data Inputs
│  └─ Work With OXOT
│
├─ Industries
│  ├─ Energy & Utilities
│  ├─ Water & Wastewater
│  ├─ Rail & Transportation
│  ├─ Manufacturing & Process Industry
│  ├─ Hyperscale & Datacentre
│  └─ Defence & Government
│
├─ Assurance
│  ├─ IEC 62443
│  ├─ NIS2
│  ├─ Cyber Resilience Act
│  ├─ TS 50701
│  └─ Evidence & Data Provenance
│
├─ Consulting 
│
├─ Resources
│  ├─ Explore Resources               
│  ├─ Learn
│  │  ├─ Insights                   
│  │  ├─ Guides & Briefings           
│  │  └─ Glossary                    
│  ├─ Proof
│  │  ─ Case Studies                 
│  └─ Technical Documents
│     ├─ Product Sheet                
│     ├─ Technical Specification     
│     └─ Air-Gapped Deployments  
│
├─ Company
│  ├─ About OXOT
│  └─ Contact
│
└─ Request a Technical Briefing
```

## Home

**Goal:** Make a CISO, plant manager, chief architect, or investment/risk leader understand the product in 10 seconds.

**Hero:**

> **Before you change and spend, replicate your plant.**  
> OXOT’s Cyber Digital Twin turns your engineering records, OT topology, and threat intelligence into defensible decisions—without touching production.

**Primary CTA:** “Request a technical briefing”  
**Secondary CTA:** “Explore the four decisions”

**Sections:**

1. A visual Twin explorer: Process / Purdue / Attack Path / Financial Consequence tabs.
2. Trust strip: passive-first; no active process-network scanning; island, data-diode, and dedicated-instance deployment.
3. The four buyer decisions.
4. “How it works” in four steps.
5. One worked scenario, such as a vendor remote-access route to a critical controller.
6. Industry links.
7. Consulting-led engagement model.
8. Final CTA: “Bring one P&ID and an asset list.”

The key homepage message is not “we have a digital twin.” It is “we help you decide what to fix, fund, simulate, or formally accept.”
## Platform

### Cyber Digital Twin

**Goal:** Explain the product at a buyer-readable level.

**Opening message:**

> A working model of your facility, built from the engineering evidence you already hold.

**Page content:**

- What the Twin models: facility physics, OT assets, network/Purdue state, engineering dependencies, external threat pressure, and financial impact.
- What it produces: prioritized decisions, control simulations, Consequence Index, annual loss exposure, technical and compliance evidence.
- Five views of the same environment: P&ID, Purdue, network, dependency graph, and 3D site view.
- Interactive product demonstration using synthetic data.
- Links to the four decision pages.
- CTA: “See a decision scenario.”

The model combines plant engineering, safety/reliability information, topology, and external intelligence into a deterministic representation that can trace a pathway from compromised component through physical consequence to loss exposure. 

### How It Works

**Goal:** Build confidence with engineering, architecture, OT security, and risk professionals.

**Core sequence:**

```text
1. Ingest engineering and operational evidence
2. Build the facility, asset, network, and dependency model
3. Establish cyber reachability and physical consequence
4. Simulate threats, changes, and controls
5. Produce traceable decisions and evidence
```

**Page sections:**

- Data sources: P&IDs, FMECA, hazard logs, SCIL/RCIL, control logic, configurations, topology exports, packet data, asset records, and BOM data.
- Model layers: facility physics → assets → protocols/interoperation → network state → data fusion → services → governance.
- The consequence chain: compromise → cascade → physics → downtime/loss.
- “No black box” evidence model: source citations, traceability, unsourced values shown as null rather than fabricated.
- CTA: “Read the technical specification.”

The technical story should appear below the outcome story. Engineers should be able to go deep; executives should not have to. 

### Decisions

This is an overview page that introduces the four decision pages. Use a large four-card layout with a simple “Choose the decision you need to make” interaction.

#### What Do We Fix First?

**Goal:** Sell risk prioritization.

**Core message:**

> Rank remediation by real consequence and actual reachability—not generic CVSS severity.

**Content:**

- NOW / NEXT / NEVER model.
- Explain that an issue is important only when it can be reached and can lead to a material physical or operational outcome.
- Show a before/after remediation queue.
- Explain that “NEVER” is a documented, defensible decision, not neglect.
- CTA: “Prioritize a facility backlog.”

The product supports triage by consequence and exploitability, with drill-down from an organizational indicator to components and underlying evidence. 

#### What Should We Spend?

**Goal:** Sell decision support for cyber investment, procurement, and M&A.

**Core message:**

> Test competing controls against the same modeled consequences before approving spend.

**Content:**

- Investment/risk-reduction curve.
- “ROI ridge”: the point at which incremental spend no longer materially reduces risk.
- Compare control options: segmentation, vendor access redesign, patching, replacement, monitoring.
- Explain expected annual loss and tail-event exposure carefully: transparent internal calculations, not an insurer or ratings-agency opinion.
- CTA: “Evaluate an investment decision.”

The Twin uses modeled scenarios and loss calculations to support bounded, evidence-backed recommendations rather than open-ended security budget requests. 

#### Can We Change Safely?

**Goal:** Sell “test before production” differentiation.

**Core message:**

> Test the firewall, patch, re-zoning, or configuration change in the replica first.

**Content:**

- Interactive baseline vs. proposed control experience.
- Scenarios: virtual firewall, segmentation redesign, vendor remote access, patch campaign, new equipment/supplier.
- Show routes closed, routes remaining, operational consequence, and expected risk reduction.
- Reiterate that simulated changes affect the model, not the live plant.
- CTA: “Discuss a proposed change.”

This is likely your strongest product page because it connects cyber risk reduction directly to safe operations and procurement decisions. 
#### What Can We Leave Alone?

**Goal:** Sell defensible risk acceptance and audit readiness.

**Core message:**

> Record what does not create material exposure—and preserve the reasoning.

**Content:**

- Explain the distinction between vulnerability severity and business/physical risk.
- Show a documented exception record: affected asset, reachability, consequence, rationale, evidence, review trigger.
- Explain why this survives audit, leadership change, and changing threat conditions.
- CTA: “Create defensible risk decisions.”

This page directly addresses overloaded teams and demonstrates that OXOT is not selling endless remediation. 

### Deployment & Data Sovereignty

**Goal:** Remove adoption concerns early.

**Opening message:**

> A Twin that fits critical environments—not the other way around.

**Page content:**

| Deployment model | Positioning |
|---|---|
| Island mode | Isolated, on customer-controlled infrastructure, with no external dependency |
| One-way data diode | Intelligence can enter the Twin; customer plant data does not exit |
| Dedicated instance | Single-tenant customer deployment aligned to sovereignty requirements |

Also include:

- Passive-first approach.
- No agents installed on controllers.
- No active scanning of the production process network.
- Data boundaries and access control.
- Hosting / regional / sovereignty principles.
- CTA: “Discuss deployment architecture.”

These options are specifically intended for sensitive OT environments and are central to customer confidence. 

### Integrations & Data Inputs

**Goal:** Answer “what would this take to implement?”

**Page content:**

- Engineering sources: P&IDs, CAD/legacy PDFs, DEXPI 2.0, FMECA, HAZOP/hazard records, SCIL, RCIL, and operational thresholds.
- OT sources: PLC logic, SCADA/RTU/HMI configurations, topology exports, PCAP flows, asset inventories.
- Protocol coverage: OPC UA, MQTT, Modbus TCP, DNP3, EtherNet/IP, PROFINET, BACnet, and TCP/IP.
- Business/security inputs: CycloneDX BOMs, vulnerability data, threat intelligence, supplier and external-risk information.
- Enterprise integrations: asset management, historians, network monitoring, and service management.
- CTA: “Review your available source data.”

The message should be: “Start with what you have; do not wait for perfect asset data.” 

### Work With OXOT

**Goal:** Explain consulting without diluting the product story.

**Opening message:**

> OXOT engineers build and operate the Twin with your teams.

**Three engagement options:**

| Engagement | Best for | Output |
|---|---|---|
| Decision Sprint | One high-priority change, investment, acquisition, or facility question | Model-backed recommendation and evidence pack |
| Twin Build | Building a durable facility or estate model | Validated Cyber Digital Twin, onboarding, and initial decision backlog |
| Continuous Twin Operations | A living environment that changes with the plant and threat landscape | Model updates, scenario analysis, risk deltas, and governance reporting |

Include the onboarding offer:

> Bring one P&ID and an asset list for a single facility.

The documented model supports one-time transient engagements or sustained long-term operations alongside the customer estate. 

## Industries

Use one reusable template for each industry. Avoid thin “we serve X” pages.

### Each industry page should include

1. Industry-specific operational concerns.
2. Typical OT architecture and process constraints.
3. Relevant safety, availability, supply-chain, and cyber-risk scenarios.
4. Regulations and standards commonly relevant to the sector.
5. The four decisions expressed in sector language.
6. A worked use case.
7. Relevant product capabilities.
8. CTA to discuss a facility or scenario.

### Recommended initial industries

| Industry page | Strong emphasis |
|---|---|
| Energy & Utilities | Distributed assets, grid/plant operations, remote access, high-consequence downtime |
| Water & Wastewater | Process safety, dosing, pumping, quality events, remote operations |
| Rail & Transportation | Signaling/operational technology, TS 50701, safety and service continuity |
| Manufacturing & Process Industry | Safety systems, batch/continuous process constraints, IP, uptime, plant change |
| Critical Infrastructure | Multi-site dependency, supply chain, external pressure, governance and resilience |

Start with the verticals for which you have proof, expertise, and credible scenarios. Do not publish a vertical just because it is a large market.

## Assurance

This section positions compliance as an output from the same facility model—not a separate checklist business. The platform documentation supports mapping to frameworks such as IEC 62443, NIS2, CRA, and TS 50701. 

### IEC 62443

- Zones and conduits.
- Target and achieved security levels.
- Asset and network evidence.
- Risk treatment and control rationale.
- Generated technical evidence linked to model objects.

### NIS2

- Risk-management evidence.
- Supplier and dependency visibility.
- Incident and resilience context.
- Governance-oriented reporting and traceability.

### Cyber Resilience Act

- Product and supply-chain evidence.
- Technical-file support.
- BOM and vulnerability context.
- Evidence links and documentation workflows.

Be precise about scope: do not imply automatic conformity, certification, or legal advice unless you are explicitly offering and qualified to provide it.

### TS 50701

- Railway cybersecurity risk scenarios.
- Safety-linked consequence mapping.
- Asset and operational dependencies.
- Supporting security engineering and evidence outputs.

### Evidence & Data Provenance

This may be one of the most valuable trust pages.

**Core message:**

> Every number should be traceable to its source—or visibly absent.

Explain:

- Grounding in customer engineering evidence.
- Citations retained with external data.
- Drillable calculation paths.
- Change history and risk deltas.
- Explicit nulls for unsourced values.
- Separation between transparent OXOT calculations and actuarial/rating-agency assertions. 
## Resources

**Goal:** Support long enterprise buying cycles and provide material for engineers, risk leaders, procurement, and boards.

### Insights

Articles and analysis, filterable by:

- Industry
- IEC 62443 / NIS2 / CRA / TS 50701
- OT security practice
- Digital twins
- Supply chain
- Board/risk
- Engineering

### Case Studies

Use a consistent format:

```text
Operational challenge
Environment and constraints
Available source data
Twin model scope
Scenario tested
Decision made
Operational / risk / investment result
Evidence produced
```

If customer confidentiality prevents named case studies, publish rigorously anonymized “decision scenarios” rather than vague testimonials.

### Product Sheet

A concise, executive-friendly download explaining the four decisions, passive-first deployment, and engagement models. 
### Technical Specification

A detailed resource for engineers and architects: seven-layer architecture, supported data sources, protocols, modeling approach, calculation boundaries, integrations, deployments, and outputs. 

### Guides & Briefings

Potential downloadable pieces:

- “How to test an OT segmentation change before production.”
- “From P&ID to Cyber Digital Twin: a practical evidence workflow.”
- “Why CVSS cannot prioritize OT risk by itself.”
- “Building CRA and IEC 62443 evidence from one operating model.”
- “A board guide to consequence-led OT risk decisions.”

### Glossary

Plain-language definitions for terms such as Cyber Digital Twin, Purdue model, FMECA, SCIL, RCIL, DEXPI, SBOM, HBOM, CBOM, ALE, tail risk, zones and conduits, and passive-first monitoring.

## Company

### About OXOT

**Goal:** Establish that OXOT understands both engineering reality and cybersecurity.

Cover:

- Purpose and market position.
- Why the Twin exists: making real OT decisions under operational constraints.
- The product’s engineering-led philosophy.
- Critical-infrastructure focus.
- Dutch / European identity and data-sovereignty orientation where relevant.

### Team & Expertise

Focus on capability, not generic biographies:

- Process and control engineering.
- Industrial networks and OT cybersecurity.
- Safety, reliability, and operational risk.
- Compliance and assurance.
- Data/AI/modeling expertise.

### Partners

Include only genuine partners, technology relationships, research collaborations, government programs, or ecosystem associations that you can substantiate.

### Contact

Do not use only a generic blank form. Provide clear routes:

| Visitor | CTA |
|---|---|
| Plant / OT engineering leader | “Discuss a facility model” |
| CISO / security leader | “Prioritize OT risk” |
| Architecture / IT-OT leader | “Review deployment architecture” |
| Procurement / M&A | “Evaluate an investment or target” |
| Compliance leader | “Discuss evidence and assurance” |

Use a short form: name, company, role, work email, facility/industry, decision to be made, and optional message.

## Global requirements

Every page should include:

- A visible **“Talk to an OT Engineer”** CTA.
- A secondary, lower-commitment CTA such as “Read the technical specification.”
- Evidence-based language; avoid unqualified claims of guaranteed loss reduction or compliance.
- A consistent plain-English explanation before detailed technical content.
- An accessibility-friendly version of all interactive diagrams.
- Light and dark themes, with reduced-motion support.
- A footer with deployment, assurance, resources, company, privacy, and contact links.

The main conversion path should be:

```text
Homepage → Decision page → Worked scenario / technical evidence →
Request a technical briefing
```

That path sells what is distinctive: OXOT turns complex OT evidence into decisions a plant, security, finance, and compliance team can all examine and defend. 