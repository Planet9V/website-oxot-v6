---
title: "How does IEC 62278-2:2025 structure the systems approach to safety?"
slug: "iec-62278-2-systems-approach-to-safety"
locale: "nl"
section: "insights"
excerpt: "Part 2 is the safety-focused companion to IEC 62278-1's generic RAMS lifecycle: define the system, identify hazards, set objectives, derive and allocate requirements, verify, validate, and maintain the safety argument as the railway changes. Cybersecurity enters as a causal input to that chain, not as a separate dashboard."
metaTitle: "IEC 62278-2:2025 — How the Systems Approach to Safety Is Structured | OXOT"
metaDescription: "A practitioner's walk through IEC 62278-2:2025's systems approach to railway safety — system definition, hazard analysis, safety objectives, requirement allocation, safety integrity, verification and validation, and the safety argument — and where cyber pathways enter it."
publishedAt: "2026-08-24T00:00:00+00:00"
updatedAt: "2026-08-24T00:00:00+00:00"
---

**Deze Insight is nog niet vertaald.** De Engelse versie staat hieronder. *(This Insight has not yet been translated — the English version follows.)*

## Short answer

IEC 62278-2:2025 structures railway safety as a **technology-independent systems approach**: define the system and its operating environment, identify hazards and analyse risk, establish safety objectives, derive safety requirements and allocate them, demonstrate through verification and validation that they are met, and maintain the safety argument when the system changes.

It is the safety-focused companion to [IEC 62278-1:2025's generic RAMS lifecycle](/nl/assurance/iec-62278-1). Part 2 addresses the generic safety-related aspects of that lifecycle and supplies methods independent of any particular railway technology or subsystem.

For cybersecurity, the practical implication is narrow and useful: a cyber pathway matters when it can reach an asset, interface, configuration, dependency or **assumption** that supports a safety-related function — because at that point it stops being a vulnerability finding and becomes an input to the safety argument.

## Why this matters now

Railway organisations are running several structural changes at once — CBTC modernisation, ETCS/ERTMS rollout, PTC-related programmes, signalling renewals, traction-power SCADA replacement, and the steady growth of remote maintenance and vendor support into systems that used to be reached only by walking to them. Every one of those adds interfaces to systems that already carry a signed safety case.

At the same time the assurance obligations have hardened. TS 50701 gives railway cybersecurity a process; NIS2 gives supervisors a reason to ask about it; and the RAMS framework has always required that a safety argument stay valid as the system changes, not only on the day it was accepted.

What has not kept pace is the join between them. Cybersecurity work in rail is frequently run as a parallel programme with its own register, its own severity scale and its own reporting line, producing findings that never touch the hazard log. Safety work, meanwhile, carries assumptions about access, configuration integrity and maintenance discipline that were true when they were written and are rarely re-tested against the network as it is now operated. The systems approach in Part 2 is the structure that makes those two bodies of work the same body of work — which is why it is worth reading from a security seat and not only a RAMS one.

## The question in context

A point of precision first, because the numbering causes real confusion.

**IEC 62278-1:2025** is the generic RAMS process — the lifecycle within which reliability, availability, maintainability and safety are specified and demonstrated across a railway system's life, including independent safety assessment and safety-case guidance.

**IEC 62278-2:2025** is Part 2, the **systems approach to safety**. It is a distinct standard, not a variant spelling of Part 1. Where Part 1 gives the lifecycle, Part 2 gives the safety method that runs inside it: how a hazard becomes an objective, an objective becomes a requirement, a requirement is allocated to something that will actually carry it, and the whole chain becomes an argument somebody signs.

Two further boundaries are worth stating before going on.

First, **Part 2 is technology-independent by design**. It does not tell you which controller, protocol or architecture to use. It tells you what has to be true about the reasoning, whatever you build. That is what lets the same method cover an interlocking, a CBTC corridor and a depot.

Second, **this is a safety standard, not a security standard**. It does not define zones, conduits or security levels — that is [IEC 62443](/nl/assurance/iec-62443)'s job, and in a rail context [TS 50701](/nl/assurance/ts-50701)'s. What Part 2 defines is the frame into which a security finding must be translated before it can change a safety decision. Understanding that translation is the whole point of reading it as a security engineer.

## The technical explanation

A practical reading of the systems approach runs as a sequence, and the discipline holding it together is traceability:

```text
Hazard
  → safety objective
  → safety requirement
  → allocated safety function / measure
  → verification evidence
  → validation evidence
  → safety-case claim
```

Every link has to be followable in both directions. Forwards, it shows a hazard has been dealt with. Backwards, it answers the question an assessor actually asks: *what is this control here for, and what happens to the argument if it stops working?*

### 1. Define the system and its operating context

The approach begins with a sufficiently detailed definition of the **system under consideration** and its operational environment: boundaries, interfaces, intended functions, operating modes, users, assumptions, external systems and lifecycle context.

For railway modelling this means defining considerably more than a device or a subsystem. The system might be a CBTC corridor, an interlocking, a traction-power SCADA environment, a PTC territory, a train-control back office, a depot, or a station and tunnel system. The operational context spans normal operation, degraded mode, maintenance, emergency and recovery — and the interfaces reach out to the control centre, train-ground radio, field power, telecoms, vendor maintenance, identity services, time services and onboard systems.

The definition has to be explicit, because hazards and safety requirements cannot be assessed meaningfully without knowing what lies inside the boundary and which external dependencies influence it. This is also where security and safety most often diverge without anyone noticing: a security scope drawn around "the signalling network" and a safety scope drawn around "the interlocking function" are not the same system, and findings written against one will not land in the other.

### 2. Identify hazards and analyse risk

The system is then examined for conditions that can lead to harm. A hazard analysis connects an initiating event to a hazardous condition, to a potential accident or harm, to the barriers that exist or are proposed, and finally to residual risk.

The initiating event may be technical, procedural, environmental, human — or cyber-related. That last category is not a special case needing its own method; it is another way an initiating event can occur.

Worth noting is how the chain behaves in a fail-safe system. An unauthorised alteration of interlocking configuration produces a hazardous condition — the route-setting function cannot behave as designed — but the fail-safe design may well prevent an unsafe train movement while leaving rail service restricted or unavailable. The honest output of the analysis is therefore not "catastrophe" but *this is the hazardous condition; further analysis determines which hazard applies, and the availability consequence is real even where the safety consequence is contained.* Overstating the safety consequence of a cyber event costs as much credibility as ignoring it.

The systems approach then asks whether **total risk** is acceptable after considering technical controls, operational procedures, independent barriers, people, training, maintenance and external measures together — not control by control.

### 3. Establish safety objectives, and name their assumptions

Safety objectives state what must be achieved to reduce risk to an acceptable or tolerable level. They should be measurable where possible and tied to the system's operational environment, its hazards and the outputs of the risk analysis — requirements work created in isolation from system definition and risk analysis is the classic way a safety programme produces a large document that proves nothing.

Typical railway safety objectives include preventing unsafe movement authority; ensuring safe route setting and release; ensuring unsafe conditions lead to a defined safe state; detecting and controlling train separation risk; preventing incorrect traction-power switching; maintaining safe operation during communications loss; keeping degraded modes controlled and understood; and restoring safety-related functions through defined maintenance and validation processes.

The extension that matters for a Cyber Digital Twin is one added step:

> Identify the cybersecurity assumptions on which each safety objective depends.

An interlocking safety objective may quietly depend on the integrity of configuration tools, on authorised engineering access, on update controls, on network segmentation, on maintenance procedures and on configuration validation. None of those are stated in the objective. All of them can be defeated. An assumption nobody has written down cannot be re-tested when the network changes — which is precisely how a valid safety argument becomes an invalid one without anybody editing it.

### 4. Derive safety requirements

Objectives are then transformed into requirements specifying what the system must do, or must not permit. Taking the configuration hazard through the chain: the hazard is unauthorised or incorrect configuration of a signalling system; the objective is to prevent a configuration change from compromising required safe behaviour; and the requirements that follow are that only authorised personnel can initiate configuration changes, that configuration packages are identifiable and integrity-protected, that changes are approved and traceable, that production signalling systems are separated from general networks, that validation occurs before return to service, and that recovery uses an approved configuration baseline.

Note how much of that is not a technical control. Safety requirements can cover functional behaviour, performance and timing, failure response and safe state, interfaces and communications, human-machine interaction, maintenance and diagnostic procedures, competence and training, configuration control, test and inspection and verification and validation, and external protections and operational restrictions.

### 5. Allocate requirements

A central feature of the systems approach — and the one most often skipped — is that each safety requirement is **allocated** to a specific system, subsystem, component, person, procedure or external measure.

A system-level requirement to prevent unauthorised signalling configuration change decomposes into allocated measures: the interlocking validates configuration integrity; the engineering workstation enforces named-user authorisation; the network provides segmentation and restricted data flow; the maintenance process requires change approval and dual review; vendor support is time-limited and approved; operations run a controlled return-to-service procedure; and assurance performs independent review and retains the evidence.

Allocation prevents a specific and common failure: loading all safety responsibility onto one technical component when the required risk reduction actually depends on engineering, network design, maintenance, operational procedure and independent review acting together. It also produces something a security team can use directly — a list of the exact places where a security control is doing safety work.

### 6. Determine safety-integrity needs

Where a safety-related function is required, the analysis determines the necessary safety-integrity requirement and the evidence needed to show the allocated implementation meets it. Safety integrity is the ability of a safety-related function to perform satisfactorily under stated conditions for a stated period; a Safety Integrity Level is a discrete level used to specify safety-integrity requirements for safety functions.

The model should therefore carry the hazard, the safety function, the required integrity, the allocated implementation, the assumptions and dependencies, and the verification, validation and assessment evidence.

One boundary here is firm and worth stating plainly: **a Cyber Digital Twin should not assign a SIL.** That is the accountable safety engineering organisation's determination. What a model can legitimately do is expose the dependencies and cybersecurity assumptions sitting beneath an existing safety-integrity argument — that a function preventing conflicting movement authority assumes restricted engineering access, maintained configuration integrity, controlled remote maintenance, authentic update files, enforced communications boundaries, and an available and validated recovery configuration. If a cyber pathway defeats one of those assumptions, that becomes a relevant input to the RAMS and safety reassessment. The reassessment itself remains the safety authority's.

### 7. Verify and validate

The approach distinguishes carefully between two questions that are frequently collapsed into one.

| Activity | Core question |
|---|---|
| **Verification** | "Did we build the system correctly against the allocated requirements?" |
| **Validation** | "Does the integrated system achieve the intended safe behaviour in its actual operating context?" |

Evidence spans design reviews, requirements traceability, analysis and calculations, inspections, factory and site acceptance tests, integration testing, operational scenario testing, failure-mode and degraded-mode testing, configuration audits, field trials and commissioning evidence, and independent assessment where required.

Applied to a cyber-relevant change — a firewall rule, an access change, a patch, a new supplier arrangement — the two questions become concrete. Verification asks whether the change satisfies the security and interface requirements. Validation asks whether the live railway still operates safely, recoverably and as intended with the new boundary or control in place. A change can pass the first and fail the second: a correctly implemented segmentation change that breaks a degraded-mode recovery path is verified and not validated. That gap is the subject of our [Can we change it safely?](/nl/decisions/change-safely) decision.

### 8. Build and maintain the safety argument

The output is not a test report. It is a structured **safety argument**, usually expressed through a safety case, showing that safety claims are supported by requirements, design, verification, validation, operational controls and evidence.

The claim is that the system is acceptably safe for the defined use. The argument is the chain: hazards identified, risks controlled, safety requirements allocated, implementation verified, integrated behaviour validated, residual risk assessed, operation and maintenance controlled. The evidence is the hazard log, requirements, architecture, design records, tests, inspections, configuration baseline, procedures, competency records, independent assessment and approvals.

The word doing the work is *maintain*. A safety argument is a live claim about a system that keeps changing.

### Where cybersecurity actually enters

Pulling the thread together, the causal chain a security finding has to travel before it can change a safety decision looks like this:

```text
Cyber threat or configuration error
        ↓
Can it reach a safety-related asset, function, interface, or maintenance process?
        ↓
Can it defeat or invalidate a safety assumption or barrier?
        ↓
Does that alter the hazard, safety requirement, safety integrity argument,
degraded mode, recovery process, or residual risk?
        ↓
What control restores an acceptable safety argument?
```

This makes cybersecurity a **causal input to the safety model**, not a separate vulnerability dashboard. It also sets a useful filter in both directions: a finding that cannot be walked down that chain has not yet earned a place in the hazard log, and one that can should never have been left sitting in a security register on its own.

## What commonly goes wrong

**Two registers that never meet.** The hazard log lives with RAMS and the vulnerability register lives with security, with no defined join. Each is well maintained. Neither can answer whether a given finding affects a safety claim, because the question is not asked in either language.

**Assumptions inherited without re-test.** The safety argument was built when engineering access meant a laptop in a relay room. Vendor remote support arrived later, through a properly approved change, and nobody revisited whether the access assumption underneath the interlocking objective still held. Nothing was done wrong; the argument simply aged.

**Allocation collapsed onto one box.** The requirement is written and then satisfied entirely by a technical control — usually a firewall — when the risk reduction actually depended on the firewall *plus* dual review *plus* return-to-service validation. When the single allocated control is bypassed, the argument has no depth left.

**Cyber consequence overstated to get attention.** Claiming a collision where the fail-safe design gives a service interruption damages credibility with the exact audience whose sign-off is needed. The availability consequence is serious enough to state accurately.

**Change impact assessed on the changed thing only.** A modification is reviewed against the subsystem being modified rather than against the hazards, requirements, interfaces and safety-case claims that touch it. The claims most likely to be invalidated are elsewhere.

**Verification treated as validation.** The change was implemented as specified, so the box is ticked — and nobody tested whether the integrated railway still behaves safely in degraded mode with the change in place.

## The decision framework

For any proposed change with a cyber dimension on a safety-related railway system, six questions in order. Each has an evidence answer or it has none.

| # | Question | Evidence that answers it |
|---|---|---|
| 1 | **What is the system?** Is the boundary, operating-mode set and interface list current? | System definition reconciled with topology, asset records and interface register |
| 2 | **Which safety function is in scope?** Which allocated functions sit inside or across that boundary? | Hazard log, requirement allocation records |
| 3 | **Can it be reached?** Is there a traced pathway to that function, interface, configuration or maintenance process? | Computed pathways across the modelled network, identity and vendor-access architecture |
| 4 | **Which assumption does it defeat?** Access, integrity, segmentation, update authenticity, recovery availability? | The named cybersecurity assumptions recorded beneath each safety objective |
| 5 | **What does that change?** Hazard, requirement, integrity argument, degraded mode, recovery, residual risk — which of these moves? | Change-impact trace from the affected assumption back up to safety-case claims |
| 6 | **What restores the argument?** Which control, procedure or restriction returns residual risk to acceptable, and who accepts it? | Risk-treatment record with named acceptance authority and review conditions |

Question 4 is the hinge. A finding that reaches a safety-related asset but defeats no stated assumption may be a genuine security issue with no safety consequence — and being able to say so is as valuable as being able to escalate the ones that do.

## Worked example

**Illustrative scenario — no customer data.** The scenario below is written to show the shape of the reasoning. It is not drawn from any customer engagement, describes no real railway, and carries no counts, scores or values, because none of them would be real.

**System.** An interlocking within a defined signalling area, with its engineering workstation, configuration management arrangements and vendor support route inside the boundary. Operational context spans normal, degraded, maintenance and recovery.

**Hazard.** Unauthorised or incorrect configuration of the signalling system.

**Safety objective.** Prevent a configuration change from compromising required safe behaviour.

**Cybersecurity assumptions recorded beneath that objective.** Engineering access is restricted to named, authorised personnel; configuration packages are integrity-protected and identifiable; remote maintenance is time-limited and approved; production signalling is separated from general networks; validation occurs before return to service; an approved recovery baseline is available and itself validated.

**The proposed change.** A vendor asks for a standing remote support arrangement to replace per-visit access, so diagnostics can begin before an engineer travels. The business case is sound — faster fault resolution, fewer failed visits — and the change is raised properly.

**What the systems approach asks.** Not "is remote access acceptable?", which has no answer in the abstract, but the six questions above.

Pathway tracing establishes that the proposed arrangement reaches the engineering workstation, which holds the configuration route to the interlocking. That answers question 3: the pathway terminates at a maintenance process supporting a safety-related function.

Question 4 is where it becomes decidable. The arrangement does not defeat *configuration integrity* — packages remain signed and validated. It does not defeat *return-to-service validation*, which stays a manual gate. It does defeat *time-limited, approved remote maintenance*, because standing access is by definition not per-visit approved, and it partially defeats *restricted engineering access*, because the vendor's authentication path is broader than the named-user arrangement the objective assumed.

Question 5 therefore has a specific answer rather than a general worry. The hazard is unchanged. The safety requirement stands. What moves is the allocation: a requirement previously carried in part by *procedural* control — access exists only when somebody approved it for a visit — now has that portion unallocated. The safety-integrity argument is not recomputed here, because that is the safety authority's determination, but the dependency it rests on has visibly changed, and that is reportable into the reassessment.

Question 6 produces a design rather than a veto. The arrangement proceeds with the procedural allocation reconstructed technically: sessions brokered and recorded rather than standing; diagnostic access separated from configuration capability, so the vendor can read without holding the configuration route; named-user authentication preserved through the broker; and the return-to-service validation gate left explicitly untouched and re-stated in the change record as a control the argument still depends on.

**What is different about that outcome.** A security review would likely have approved or refused the access on its own merits. The systems approach produced a third thing: the arrangement the vendor asked for, minus the one property that was silently carrying a safety allocation, with the reason written down where the next reviewer will find it.

## The OXOT perspective

A Cyber Digital Twin can act as the connected evidence layer beneath this structure — one model in which the safety chain and the cyber pathway are the same graph.

| IEC 62278-2 safety element | OXOT Cyber Digital Twin support |
|---|---|
| System definition | Models the railway system boundary, functions, interfaces, assets, locations, operating modes and external dependencies |
| Hazard analysis | Links initiating events — including cyber scenarios — to affected assets, functions, barriers and operational or safety consequences |
| Safety objectives | Associates hazards and operational consequences with target conditions, barriers and minimum operating requirements |
| Safety requirements | Connects system-level requirements to technical controls, procedures, people, supplier obligations and assets |
| Requirement allocation | Shows which subsystem, asset, control, workflow or operator role implements each requirement |
| Safety-integrity assumptions | Makes explicit the cybersecurity, configuration, communication, maintenance and supplier assumptions beneath safety functions |
| Verification | Links requirements to modelled design artefacts, configuration, architecture, analysis, test artefacts and review evidence |
| Validation | Supports scenario testing for degraded modes, change impact, recovery sequence, operational constraints and residual pathways |
| Safety argument | Provides drill-down from claim to hazard, requirement, allocated control, evidence source, owner and approval |
| Change control | Shows which hazards, requirements, interfaces, controls and safety-case claims are affected by a proposed modification |

The last row is the one that pays for the rest. A safety argument built as a document is correct on the day it is signed; a safety argument built as a model can be re-interrogated when a vendor asks for standing access, and can say which claims move.

## The boundary

IEC 62278-2:2025 structures the safety **method**. OXOT can support its evidence and change-impact analysis. It does not replace the railway's formal hazard analysis, its safety case, independent safety assessment, certification or authorisation, or the accountable safety authority. Nothing in a model assigns a SIL, accepts a residual risk, or signs a claim — those remain decisions with names attached.

## Practical next step

Bring one proposed change on a safety-related system — a remote-access arrangement, a segmentation redesign, a supplier variation — with the hazard log entry and the requirement allocation behind it, and we will trace what it does to the assumptions underneath. [Read the Part 1 RAMS process](/nl/assurance/iec-62278-1), or [talk to us about a change](/nl/contact).

## Sources and revision history

**Primary references**

- IEC 62278-2:2025 — *Railway applications. Specification and demonstration of reliability, availability, maintainability and safety (RAMS). Part 2: Systems approach to safety.* [webstore.iec.ch](https://webstore.iec.ch/en/publication/79793)
- IEC 62278-1:2025 — *Part 1: Generic RAMS process*, including independent safety assessment and safety-case guidance within the broader lifecycle framework. [standards.iteh.ai](https://standards.iteh.ai/catalog/standards/iec/3b644430-cd5e-4291-bfc4-b700f7b45c5b/iec-62278-1-2025)
- UITP, [Safety, Security and Cybersecurity in non-SERA rail systems](https://mylibrary.uitp.org/GED_V14/295612401389/Report_-_Safety_Security_Cybersecurity_non-SERA_rail_systems_1501.pdf) — safety integrity and Safety Integrity Level as used above.
- CLC/TS 50701 — railway cybersecurity, for the security process this safety method receives inputs from.

**Related OXOT reading**

- [IEC 62278-1:2025 — the generic RAMS process](/nl/assurance/iec-62278-1)
- [TS 50701 — railway cybersecurity](/nl/assurance/ts-50701)
- [Can we change it safely?](/nl/decisions/change-safely)
- [Why CVSS cannot prioritize OT risk by itself](/nl/resources/insights/cvss-cannot-prioritize-ot-risk)

**Revision history**

- 2026-08-24 — First publication.
