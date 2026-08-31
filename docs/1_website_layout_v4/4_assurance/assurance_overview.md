# Assurance Overview

**URL:** `/assurance`  
**Navigation label:** `Assurance`  
**Primary CTA:** `Discuss an assurance use case`  
**Secondary CTA:** `Explore the Technical Specification`

***

## Hero

### Assurance built from the operating model.

OXOT does not create a second checklist universe.

The Cyber Digital Twin connects engineering evidence, OT assets, network pathways, safety and reliability context, supplier dependencies, and cyber-risk decisions in one evolving model. From that same model, teams can generate the views, rationale, technical evidence, and traceability needed to support assurance work.

**CTA:** `Discuss an assurance use case`  
**Secondary CTA:** `See how the Twin works`

**Supporting labels**

```text
IEC 62443-aligned evidence
Cyber Resilience Act support
Railway cybersecurity assurance
Traceable sources and decisions
```

***

## The assurance problem

### Compliance evidence should describe the system you actually operate.

In critical environments, assurance often becomes detached from operations. Architecture diagrams age. Asset registers disagree. Risk assessments are stored separately from safety records. Supplier information sits in procurement systems. Network evidence lives in another tool. The result is a compliance package that may look complete but cannot reliably answer the questions that matter when an auditor, engineer, regulator, board member, or customer asks:

- What system is actually in scope?
- Which assets, suppliers, and operational dependencies matter?
- Which cyber pathways can reach a critical function?
- Why was a control selected—or a risk accepted?
- What evidence supports that conclusion?
- What changed since the last review?

OXOT makes the Cyber Digital Twin the common operating model. The same model used to understand a facility, test a control, prioritize remediation, or evaluate a supplier can also produce framework-aligned assurance evidence.

> **One environment. One evolving model. Evidence that remains connected to the decision.**

The Twin is designed to unify facility physics, assets, control systems, OT network state, engineering data, external intelligence, and governance outputs. It can generate technical files and evidence views while maintaining drill-down from an organizational output to the underlying asset and source evidence. 
***

## One model, many views

### Build once. Use the evidence where it is needed.

```text
Customer engineering and operational evidence
P&IDs • asset records • FMECA • hazard logs • control logic
SCADA / PLC / RTU configuration • topology • network flows
supplier information • BOMs • maintenance and operating procedures
                           ↓
OXOT Cyber Digital Twin
Facility • assets • network • dependencies • cyber pathways
consequences • controls • suppliers • changes • decisions
                           ↓
Assurance and governance outputs
IEC 62443 • Cyber Resilience Act • TS 50701
technical documentation • risk treatment • executive reporting
evidence packs • decision records • audit support
```

The model can represent the same environment through synchronized P&ID, Purdue, network, dependency-graph, and 3D site views. This allows an engineering team, security architect, operational leader, auditor, and procurement function to examine the same underlying facts through different lenses. 

### What this changes

| Traditional assurance approach | OXOT assurance approach |
|---|---|
| Documents created for a review or audit | Evidence generated from an evolving operational model |
| Asset register, network diagram, risk register, and supplier records maintained separately | Assets, pathways, dependencies, controls, and suppliers connected in one model |
| Severity scores used as a proxy for risk | Consequence, reachability, threat context, and control effectiveness considered together |
| A control is recorded as implemented | The model shows what pathway it closes, what it does not close, and what operational flows it must preserve |
| Exceptions become unmanaged technical debt | Deferrals can be documented with rationale, compensating controls, owner, review trigger, and sunset decision |
| A report becomes stale after publication | Changes create visible risk and evidence deltas |

***

## Frameworks supported

### Framework-aligned evidence, not checkbox theater.

OXOT supports assurance work across the frameworks most relevant to industrial, product, railway, and critical-infrastructure environments. Each framework has a different purpose, audience, and evidence requirement; the value of the Twin is that it can reuse the same modelled facts without forcing teams to rebuild the system story from scratch.

### IEC 62443

**For industrial automation and control systems.**

IEC 62443 addresses cybersecurity across the lifecycle of industrial automation and control systems. It provides a structured basis for understanding the system, defining zones and conduits, assessing risk, selecting security requirements, and maintaining evidence through engineering, integration, operation, and change. [iec](https://www.iec.ch/blog/understanding-iec-62443)

OXOT supports IEC 62443-oriented work by modeling:

- The system under consideration.
- Assets, controllers, HMIs, SCADA, RTUs, engineering workstations, sensors, actuators, and network equipment.
- Purdue context, zones, conduits, VLANs, subnets, firewall boundaries, and communication pathways.
- Reachability from a potential entry point to a critical process, safety, reliability, or operational function.
- Candidate controls such as segmentation, virtual firewalls, access changes, and patching.
- Risk-treatment rationale and framework-oriented technical evidence.

**Link CTA:** `Explore IEC 62443`

### Cyber Resilience Act

**For products with digital elements placed on the EU market.**

The Cyber Resilience Act—Regulation (EU) 2024/2847—creates horizontal cybersecurity requirements for covered products with digital elements. It requires manufacturers and other relevant economic operators to address cybersecurity through the product lifecycle, including vulnerability handling and technical documentation. The Regulation generally applies from 11 December 2027, with certain obligations beginning earlier. [efta](https://www.efta.int/eea-lex/32024r2847)

OXOT supports CRA-related evidence by modeling:

- Product and system boundaries, interfaces, protocols, and remote-management paths.
- Software and firmware dependencies through an SBOM.
- Hardware origin and component context through an HBOM.
- Cryptographic dependencies, certificates, ciphers, and key context through a CBOM.
- Cloud APIs, service dependencies, and support connections through a SaaS-BOM.
- Human-access, maintenance, and support-process dependencies through an Ops-BOM.
- Vulnerability, supplier, exploitability, and technical-documentation context.

**Link CTA:** `Explore the Cyber Resilience Act`

### TS 50701

**For railway cybersecurity across the system lifecycle.**

CLC/TS 50701 provides railway-specific cybersecurity requirements and recommendations across communications, signaling and processing, rolling stock, and fixed installations. It considers railway safety context and aligns cybersecurity activity with the EN 50126 lifecycle, including risk assessment, security design, assurance, system acceptance, vulnerability management, and patch management. [cencenelec](https://www.cencenelec.eu/news-events/news/2021/eninthespotlight/2021-06-10-new-clc-ts-50701-railways-cybersecurity/)

OXOT supports railway assurance by modeling:

- Signaling, interlocking, CBTC, ETCS, PTC, SCADA, traction power, station, depot, wayside, and rolling-stock support systems.
- OT and communications pathways, remote-maintenance routes, engineering workstations, supplier access, and operational zones.
- Cyber pathways to safety-relevant, service-continuity, capacity, train-movement, and recovery consequences.
- Railway dependencies, degraded operating modes, safety/RAMS context, and risk-treatment options.
- Traceable engineering and assurance outputs linked to the underlying system model.

**Link CTA:** `Explore TS 50701`

***

## The evidence lifecycle

### From source to decision—without losing the chain.

```text
1. Source evidence
   Engineering drawings, asset data, control configuration, topology,
   maintenance records, supplier information, and approved intelligence

2. Model grounding
   Assets, functions, interfaces, dependencies, zones, pathways,
   constraints, and operating context are represented in the Twin

3. Decision analysis
   A threat, vulnerability, supplier issue, proposed change, or control
   is tested against the model

4. Risk treatment
   The Twin shows what is reachable, what can happen, what control
   changes the outcome, and what remains exposed

5. Assurance output
   Architecture views, BOMs, framework-oriented evidence, decision
   rationale, technical-file sections, and governance reporting

6. Change and review
   New assets, altered routes, configuration drift, supplier changes,
   new intelligence, or a changed decision create visible deltas
```

OXOT’s approach is grounded in the principle that consequence should come from the organization’s own engineering, safety, reliability, and operational evidence; reachability should come from the modelled topology; and externally sourced values should retain citations. 
***

## What evidence can include

### Evidence should be useful to operators—not only auditors.

Depending on the engagement and applicable framework, OXOT can help produce or maintain:

- System boundary and scope definition.
- P&ID, process, asset, Purdue, network, dependency-graph, and site views.
- Zones, conduits, segmentation, and communication-path evidence.
- Asset inventories and configuration context.
- SBOM, HBOM, CBOM, SaaS-BOM, and Ops-BOM outputs.
- Supplier, vendor-support, cloud-service, certificate, and maintenance dependencies.
- Risk scenarios, attack-path analysis, and consequence chains.
- Risk-treatment and control-selection rationale.
- Simulated before/after views of firewall, segmentation, patching, vendor-access, or investment decisions.
- Documentation of risk acceptance, compensating controls, review triggers, and accountable owners.
- Trend and change-delta reporting.
- Board, executive, engineering, procurement, and assurance views.
- Technical evidence to support applicable documentation and review workflows.

The product specification identifies machine-readable CycloneDX and DEXPI outputs, board reporting, interactive engineering visualizations, and generated framework-oriented technical-file outputs with evidence links. 
***

## Evidence is not a black box

### Every number should be traceable to its source—or visibly absent.

OXOT’s assurance model is built around evidence discipline:

| Principle | Meaning |
|---|---|
| **Grounding first** | The model starts with customer engineering, operational, safety, reliability, asset, and network evidence |
| **No fabrication** | A value that cannot be tied to a real source or documented method is omitted rather than invented |
| **Null over zero** | Unknown data remains visibly unknown; it is not silently treated as zero risk, zero impact, or not applicable |
| **Citations retained** | External vulnerability, threat, supplier, financial, and contextual information retains its source reference |
| **Drillable reasoning** | Users can move from a board-level output to a facility, line, asset, pathway, component, source, and assumption |
| **Change-aware evidence** | Changed configurations, assets, suppliers, routes, vulnerabilities, or external conditions create visible deltas |
| **Decision accountability** | Risk acceptance and treatment decisions can carry owner, rationale, approval, review date, and trigger conditions |

This discipline is especially important when dealing with financial exposure and loss calculations. The Consequence Index, expected annual loss, Monte Carlo outputs, and investment comparisons are OXOT’s transparent calculations—not actuarial opinions, insurance underwriting decisions, or rating-agency marks. 

**Link CTA:** `Explore Evidence & Data Provenance`

***

## Test before you claim

### Evidence should survive the proposed change.

A documented control is not necessarily an effective control. OXOT allows teams to place a candidate control into the Twin—such as a firewall rule, segmentation boundary, patch campaign, remote-access redesign, supplier replacement, or capital investment—and test its modeled effect before altering the live environment.

```text
Baseline
The current environment and reachable pathways

        ↓

Candidate control
A virtual firewall, access boundary, patch, replacement, or process change

        ↓

Simulation
Routes closed • routes remaining • operational dependencies preserved
consequence reduced • residual exposure documented

        ↓

Evidence-backed decision
Implement • sequence • defer • accept with compensating controls
```

This produces a stronger assurance narrative: not merely “a control is present,” but “this control was selected because it closes this route, preserves these operational flows, and reduces this consequence by a documented amount.” The Twin’s simulation is performed against the replica, not against the plant or live operational environment. [
***

## Scope and boundaries

### OXOT supports assurance. It does not replace accountability.

OXOT can help organizations build evidence, model risk, test changes, organize technical documentation, and make framework-aligned decisions. However:

- OXOT does **not** automatically certify a system or organization.
- OXOT does **not** guarantee regulatory conformity.
- OXOT is not a notified body, regulator, legal adviser, insurer, or rating agency.
- Legal applicability, classification, conformity route, national implementation, and regulatory interpretation remain the responsibility of the customer and its qualified advisers or assessors.
- Safety assessments, safety cases, engineering approval, and operational authority remain with the responsible organization and competent parties.
- Model outputs depend on the completeness, quality, assumptions, and approved use of the evidence supplied.

This is not a limitation to hide. It is why OXOT’s evidence-first approach matters: it makes assumptions, gaps, calculations, and decision ownership visible.

***

## Closing CTA

### Build assurance from the environment you actually operate.

Bring a system boundary, P&ID, network diagram, asset list, BOM, safety/reliability record, or an assurance question. OXOT will show how the Cyber Digital Twin can connect the evidence, model the dependency, test the decision, and produce a traceable assurance view.

**Primary CTA:** `Discuss an assurance use case`  
**Secondary CTA:** `Request the Technical Specification`

***

## Page metadata

**SEO title**  
OT Cybersecurity Assurance Evidence | IEC 62443, CRA & TS 50701 | OXOT

**Meta description**  
Build framework-aligned assurance evidence from the system you actually operate. OXOT’s Cyber Digital Twin connects engineering data, OT assets, network pathways, suppliers, risk decisions, and traceable documentation.

**H1**  
Assurance built from the operating model.

**Internal links**

- `/assurance/iec-62443`
- `/assurance/cyber-resilience-act`
- `/assurance/ts-50701`
- `/assurance/evidence-data-provenance`
- `/platform/cyber-digital-twin`
- `/platform/decisions/change-safely`
- `/platform/deployment-data-sovereignty`
- `/resources/technical-specification`
- `/contact`