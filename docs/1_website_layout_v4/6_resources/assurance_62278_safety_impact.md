# How does IEC 62278-2:2025 structure the systems approach to safety

IEC 62278-2:2025 structures railway safety as a **technology-independent systems approach**: define the system and its operating environment, identify hazards and risk, derive and allocate safety requirements, demonstrate that the requirements are met, and maintain the safety argument when the system changes.

It is the safety-focused companion to IEC 62278-1:2025’s generic RAMS lifecycle process. Part 2 addresses the generic safety-related aspects of the lifecycle and provides methods/tools independent of a particular railway technology or subsystem. [webstore.iec](https://webstore.iec.ch/en/publication/79793)

## Core structure

A practical reading of the standard’s systems approach is:

```text
System definition and operational context
        ↓
Hazard identification and risk analysis
        ↓
Safety objectives and risk acceptance
        ↓
System safety requirements
        ↓
Allocation to subsystems, people, procedures, and external measures
        ↓
Design and implementation
        ↓
Verification, validation, and safety demonstration
        ↓
Safety case, acceptance, operation, modification, and withdrawal
```

The essential discipline is **traceability**:

```text
Hazard
  → safety objective
  → safety requirement
  → allocated safety function / measure
  → verification evidence
  → validation evidence
  → safety-case claim
```

## 1. Define the system

The approach begins with a sufficiently detailed definition of the **system under consideration** and its operational environment. That includes boundaries, interfaces, intended functions, operating modes, users, assumptions, external systems, and lifecycle context. [webstore.iec](https://webstore.iec.ch/en/publication/79793)

For railway modeling, this means defining more than a device or subsystem:

```text
System:
A CBTC corridor, interlocking, traction-power SCADA environment,
PTC territory, train-control back office, depot, or station/tunnel system.

Operational context:
Normal operation • degraded mode • maintenance • emergency • recovery

Interfaces:
Control center • train-ground radio • field power • telecoms
vendor maintenance • identity • time services • onboard systems
```

The system definition needs to be explicit because hazards and safety requirements cannot be assessed meaningfully without knowing what lies inside the boundary and which external dependencies influence it.

## 2. Identify hazards and analyze risk

The system is examined for conditions that can lead to harm. A hazard analysis connects:

```text
Initiating event
        ↓
Hazardous condition
        ↓
Potential accident or harm
        ↓
Existing or proposed barriers
        ↓
Residual risk
```

The initiating event can be technical, procedural, environmental, human, or cyber-related.

For example:

```text
Initiating event:
Unauthorized alteration of interlocking configuration.

Hazardous condition:
Route-setting function cannot behave as designed.

Potential consequence:
Unsafe train movement prevented by fail-safe behavior, but rail service
is restricted or unavailable; further analysis determines applicable hazard.

Barriers:
Configuration integrity controls • engineering approval
segmentation • interlocking safety logic • validation process
```

The systems approach asks whether the **total risk** is acceptable after considering technical controls, operational procedures, independent barriers, people, training, maintenance, and external measures.

## 3. Establish safety objectives

Safety objectives state what must be achieved to reduce risk to an acceptable or tolerable level.

They should be measurable where possible and tied to the system’s operational environment, hazards, and risk-analysis outputs. Requirements work should not be created in isolation from system definition and risk analysis. [linkedin](https://www.linkedin.com/pulse/engineering-reliable-systems-iec-62278-1-part-36-from-singh-y2unf)

Typical railway safety objectives include:

- Prevent unsafe movement authority.
- Ensure safe route setting and release.
- Ensure unsafe conditions lead to a defined safe state.
- Detect and control train separation risk.
- Prevent incorrect traction-power switching.
- Maintain safe operation during communications loss.
- Ensure degraded modes remain controlled and understood.
- Restore safety-related functions through defined maintenance and validation processes.

For a Cyber Digital Twin, the important extension is:

> Identify the cybersecurity assumptions on which each safety objective depends.

For example, an interlocking safety objective may depend on the integrity of configuration tools, authorized engineering access, update controls, network segmentation, maintenance procedures, and configuration validation.

## 4. Derive safety requirements

The safety objectives are transformed into requirements that specify what the system must do—or must not permit.

```text
Hazard:
Unauthorized or incorrect configuration of a signaling system.

Safety objective:
Prevent a configuration change from compromising required safe behavior.

System safety requirements:
- Only authorized personnel can initiate configuration changes.
- Configuration packages must be identifiable and integrity-protected.
- Changes must be approved and traceable.
- Production signaling systems must be separated from general networks.
- Validation must occur before return to service.
- Recovery must use an approved configuration baseline.
```

Safety requirements include more than technical design measures. They can cover:

- Functional behavior.
- Performance and timing.
- Failure response and safe state.
- Interfaces and communications.
- Human-machine interaction.
- Maintenance and diagnostic procedures.
- Competence and training.
- Configuration control.
- Test, inspection, verification, and validation.
- External protections and operational restrictions.

## 5. Allocate requirements

A central feature of the systems approach is that safety requirements are allocated to the appropriate **system, subsystem, component, person, procedure, or external measure**.

```text
System-level requirement:
Prevent unauthorized signaling configuration change.

        ↓

Allocated measures:
- Interlocking: validates configuration integrity.
- Engineering workstation: named-user authorization.
- Network: segmentation and restricted data flow.
- Maintenance process: change approval and dual review.
- Vendor support: time-limited, approved remote access.
- Operations: controlled return-to-service procedure.
- Assurance: independent review and evidence retention.
```

This allocation prevents a common failure: putting all safety responsibility on one technical component when the required risk reduction actually depends on engineering, network design, maintenance, operational procedure, and independent review together.

## 6. Determine safety-integrity needs

Where a safety-related function is required, the analysis determines the necessary safety-integrity requirement and the evidence needed to demonstrate that the allocated implementation meets it.

Safety integrity is the ability of a safety-related function to perform satisfactorily under stated conditions and for a stated period. A Safety Integrity Level is a discrete level used to specify safety-integrity requirements for safety functions. [mylibrary.uitp](https://mylibrary.uitp.org/GED_V14/295612401389/Report_-_Safety_Security_Cybersecurity_non-SERA_rail_systems_1501.pdf)

The model should represent:

```text
Hazard
        ↓
Safety function
        ↓
Required safety integrity
        ↓
Allocated subsystem / implementation
        ↓
Assumptions and dependencies
        ↓
Verification, validation, and assessment evidence
```

A Cyber Digital Twin should **not** assign a SIL automatically. It can expose the dependencies and cybersecurity assumptions that may affect an existing safety-integrity argument.

For example:

```text
Safety function:
Prevent conflicting movement authority.

Cybersecurity assumptions:
- Engineering access is restricted.
- Configuration integrity is maintained.
- Remote maintenance is controlled.
- Update files are authentic.
- Communications boundaries are enforced.
- Recovery configuration is available and validated.
```

If a cyber pathway defeats one of those assumptions, it becomes a relevant input to the RAMS/safety reassessment.

## 7. Verify and validate

The safety approach distinguishes between proving that the system was built according to requirements and proving that it is suitable in its intended operational environment.

| Activity | Core question |
|---|---|
| **Verification** | “Did we build the system correctly against the allocated requirements?” |
| **Validation** | “Does the integrated system achieve the intended safe behavior in its actual operating context?” |

Evidence can include:

- Design reviews.
- Requirements traceability.
- Analysis and calculations.
- Inspections.
- Factory and site acceptance tests.
- Integration testing.
- Operational scenario testing.
- Failure-mode and degraded-mode testing.
- Configuration audits.
- Field trials and commissioning evidence.
- Independent assessment, where required.

For cyber-relevant changes, this becomes:

```text
Proposed firewall / access / patch / supplier change
        ↓
Verify:
Does it satisfy the security and interface requirements?

        ↓
Validate:
Does the live railway still operate safely, recoverably, and as intended
with the new boundary or control in place?
```

## 8. Build the safety argument

The output is not merely a test report. It is a structured **safety argument**—often expressed through a safety case—showing that the safety claims are supported by requirements, design, verification, validation, operational controls, and evidence.

```text
Safety claim:
The system is acceptably safe for the defined use.

        ↓

Argument:
Hazards identified → risks controlled → safety requirements allocated
→ implementation verified → integrated behavior validated
→ residual risk assessed → operation and maintenance controlled

        ↓

Evidence:
Hazard log • requirements • architecture • design records
tests • inspections • configuration baseline • procedures
competency records • independent assessment • approvals
```

IEC 62278-1:2025 explicitly includes independent safety assessment and safety-case guidance in its broader RAMS lifecycle framework. [standards.iteh](https://standards.iteh.ai/catalog/standards/iec/3b644430-cd5e-4291-bfc4-b700f7b45c5b/iec-62278-1-2025)

## How OXOT maps to it

The Cyber Digital Twin can function as the connected evidence layer beneath this structure:

| IEC 62278-2 safety element | OXOT Cyber Digital Twin support |
|---|---|
| System definition | Models railway system boundary, functions, interfaces, assets, locations, operating modes, and external dependencies |
| Hazard analysis | Links initiating events—including cyber scenarios—to affected assets, functions, barriers, and operational/safety consequences |
| Safety objectives | Associates hazards and operational consequences with target conditions, barriers, and minimum operating requirements |
| Safety requirements | Connects system-level requirements to technical controls, procedures, people, supplier obligations, and assets |
| Requirement allocation | Shows which subsystem, asset, control, workflow, or operator role implements each requirement |
| Safety integrity assumptions | Makes explicit the cybersecurity, configuration, communication, maintenance, and supplier assumptions beneath safety functions |
| Verification | Links requirements to modelled design artifacts, configuration, architecture, analysis, test artifacts, and review evidence |
| Validation | Supports scenario testing for degraded modes, change impact, recovery sequence, operational constraints, and residual pathways |
| Safety argument | Provides drill-down from claim to hazard, requirement, allocated control, evidence source, owner, and approval |
| Change control | Shows which hazards, requirements, interfaces, controls, and safety-case claims are affected by a proposed modification |

## The cyber-security connection

For OXOT, the critical addition is this:

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

This makes cybersecurity a **causal input** to the safety model, not a separate vulnerability dashboard.

## Practical model template

For each safety-relevant railway scenario, create:

```text
System: [e.g., CBTC corridor / interlocking / traction SCADA]

Operational context:
Normal • degraded • emergency • maintenance • recovery

Hazard:
[Defined hazardous condition]

Initiating events:
Technical failure • human error • supplier defect • cyber scenario

Safety objective:
[What must be prevented or ensured]

Safety requirements:
[Functional / technical / procedural requirements]

Allocated controls:
Assets • software • network • process • people • external barriers

Cybersecurity assumptions:
Access • integrity • segmentation • update • identity • supplier support

Verification evidence:
Design review • tests • configuration • analysis • inspection

Validation evidence:
Integration • field test • operational scenario • acceptance

Residual risk:
Assessment • acceptance authority • review conditions

Safety-case claim:
[Claim supported by linked evidence]
```

## Boundary

IEC 62278-2:2025 structures the **safety method**. OXOT can support its evidence and change-impact analysis, but does not replace the railway’s formal hazard analysis, safety case, independent safety assessment, certification/authorization, or accountable safety authority.

