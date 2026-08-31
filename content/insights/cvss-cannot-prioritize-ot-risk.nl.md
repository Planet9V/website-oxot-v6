---
title: "Why CVSS cannot prioritize OT risk by itself"
slug: "cvss-cannot-prioritize-ot-risk"
locale: "nl"
section: "insights"
excerpt: "CVSS scores the severity of a vulnerability in the abstract — the same number for every deployment, everywhere. Ordering an OT backlog needs two things the score does not carry: whether anyone can reach the asset, and what happens physically if they do."
metaTitle: "Why CVSS Cannot Prioritize OT Risk On Its Own — Severity, Reachability and Consequence | OXOT"
metaDescription: "CVSS measures severity, not risk, and FIRST's own guidance says so. What a base score omits in an OT context, why environmental metrics rarely close the gap, and how reachability and physical consequence produce a defensible order of work."
publishedAt: "2026-08-23T00:00:00+00:00"
updatedAt: "2026-08-23T00:00:00+00:00"
---

**Deze Insight is nog niet vertaald.** De Engelse versie staat hieronder. *(This Insight has not yet been translated — the English version follows.)*

## Short answer

CVSS measures the **severity** of a vulnerability as a property of the flawed product — how hard it is to exploit and how badly it breaks the software when it is. That number is intentionally the same for every deployment of that product, in every architecture, at every site. It has to be: it is published once, by a vendor or a coordinator, for a component whose eventual installations they cannot see.

An OT backlog needs an order of work, and an order of work is a risk statement about *your* plant. Two inputs decide it, and neither is inside the base score: **reachability** — can anything actually get to that instance, through the zones, conduits and trust relationships you actually operate — and **consequence** — what happens to the process, physically, if that function is affected. Sort by severity alone and an instance behind two conduits on a test cell arrives at the top of the queue beside one sitting a hop away from a safety function. FIRST's own guidance says the base score is not a risk score. The failure is not the metric. It is using the metric for a job it was never specified to do.

## Why this matters now

Vulnerability disclosure against industrial products has become routine rather than exceptional. Vendors publish advisories on a schedule; coordinators aggregate them; scanners and asset-inventory platforms now surface CVE matches against OT estates that were previously dark. That is genuine progress — you cannot reason about what you cannot see.

It has also created a specific management problem. The volume of findings arriving at an OT team is now larger than the number of change windows available to act on them, and it grows faster than remediation capacity ever will. In IT, that pressure is absorbed by patching cadence. In OT it cannot be: patching a controller usually means a process interruption, a vendor validation, a re-commissioning step, and in safety-related systems a re-proof of the safety argument. The cost of a fix is measured in production and in engineering hours, not in a maintenance window that closes overnight.

So the decision an OT team actually faces is not "how do we patch everything?" It is "given that we will act on a fraction of this list this year, which fraction, and can we defend the choice to the plant manager, the regulator and the board?" A severity band cannot answer that, because it does not know which instances matter here. Meanwhile NIS2 and IEC 62443-2-1 both push in the same direction: show the reasoning behind risk treatment, including what you deliberately chose not to do.

## The question in context

Some precision, because the terms get used interchangeably and they are not the same thing.

**CVSS** is the Common Vulnerability Scoring System, maintained by FIRST. Its Base metric group captures the intrinsic characteristics of a vulnerability that are constant over time and across environments — exploitability characteristics such as attack vector, complexity and required privileges, and the impact on the affected system's confidentiality, integrity and availability. Version 4.0 restructures this into Base, Threat, Environmental and Supplemental groups, separates impact on the vulnerable system from impact on subsequent systems, and provides for expressing a safety consequence where a technical impact carries a physical one.

**Severity** is what the base score expresses: how bad this flaw is, in this product, in the abstract.

**Risk** is a statement about a specific system: the likelihood that a specific consequence occurs to a specific asset in a specific architecture. IEC 62443-3-2 treats IACS cybersecurity as exactly this — a risk-management problem in which the relevant risk depends on the threats, likelihood, vulnerabilities and consequences of a *specific environment*.

The boundary condition, stated plainly: none of what follows is an argument that CVSS is wrong, badly designed, or should be ignored. It is a well-specified instrument that does what it says. It is an input to a model. The error is treating the output of that instrument as the output of the model.

## The technical explanation

### The base score is deployment-blind by design

The reason a base score cannot rank your plant is structural, not a shortcoming awaiting a revision. The score is computed at publication time by someone who does not know, and cannot know, where the product will be installed. It has to describe every instance identically. Two identical PLC firmware versions — one on a laboratory test cell that never touches product, one executing an interlock on a fired heater — carry the same score. Any ordering that uses only that number treats them as the same problem.

This is not an inference about the standard's intent. FIRST's own documentation is explicit that the base score reflects intrinsic, environment-independent characteristics, and that the Threat and Environmental metric groups exist precisely so the consumer can adjust it to their situation. The score arrives incomplete on purpose.

### "Attack vector: network" is not the same as "reachable"

The exploitability metrics are frequently read as a proxy for likelihood, and this is where OT prioritisation goes wrong most often. `AV:N` — network attack vector — means the vulnerability *can* be exploited across a network. It says nothing about whether a network path to this instance exists in your estate.

In a plant, that distinction is the whole question. A network-exploitable flaw on a device sitting behind a properly enforced conduit, reachable only from a zone that is itself reachable only from a brokered session, may have no viable path at all. A locally-exploitable flaw — `AV:L`, which scores lower — on an engineering workstation that a vendor session can reach with inherited credentials may sit on a very short chain to something that matters. Ordering by the score inverts these two.

The path question is also compositional rather than per-device: individually justified rules and trusts can compose into a multi-hop route that no single control sees. Zone and conduit modelling defines where the boundaries are meant to be — see [IEC 62443](/nl/assurance/iec-62443) for how that partition is built and evidenced — but establishing what is genuinely reachable means computing routes over a model of the whole system rather than reviewing controls one at a time.

### The impact metrics measure the wrong system

CVSS impact metrics describe what happens to the *information system*: loss of confidentiality, integrity or availability of the software and its data. In OT, the consequence that governs is what happens to the *physical process* — and the mapping between the two is neither fixed nor monotonic.

A denial-of-service on an HMI may score high on availability impact and mean an operator uses a different console. A subtle integrity flaw permitting a manipulated setpoint may score lower and mean a vessel operates outside its design envelope. A confidentiality loss may score meaningfully and, on a control network, matter far less than either. Nothing in the score knows which function the affected component performs, what depends on it, or what the plant does when it misbehaves.

CVSS v4.0 acknowledges this direction of travel: it separates impact on the vulnerable system from impact on subsequent systems, and provides for expressing safety consequence. That is a genuine improvement and worth adopting. It still requires someone with knowledge of the installation to supply the physical consequence — which is the hard part, and the part that lives in your engineering studies, not in the advisory.

### Why environmental metrics rarely close the gap in practice

The obvious objection is that CVSS already anticipates all of this: apply the Environmental metrics, set the confidentiality, integrity and availability requirements for your context, and the score adjusts.

That is correct, and it is worth doing. It does not close the gap, for three practical reasons.

First, the environmental adjustment is per-instance and manual. Applying it honestly across a full OT estate means a per-asset judgement made repeatedly, by hand, and repeated again whenever the estate changes.

Second, it asks for the answer as an input. To set the requirement modifiers correctly you must already know what the asset does and what depends on it — which is the analysis that produces the ranking. You are not computing consequence; you are typing it in.

Third, the output is still a single scalar. Compressing "reachable from a brokered vendor session, terminates at a barrier for an overpressure case" into a number discards the reasoning, which is the part that survives challenge. A plant manager does not accept a score. They accept a route and a named outcome.

### Where exploitation-likelihood feeds fit

Two complements are frequently and correctly proposed: EPSS, FIRST's estimate of the probability that a vulnerability will be exploited in the wild, and catalogues of known-exploited vulnerabilities such as CISA's KEV. Both are useful — they add a threat-activity dimension the base score genuinely lacks, and they help suppress noise from flaws nobody is using.

Both are also global. They tell you what is happening in the world, not what is reachable in your plant or what it would cost you. A known-exploited flaw on an unreachable test asset is still not your first job; an unexploited flaw one hop from a safety function may well be. Threat data narrows the field. It does not order it.

### What the model has to hold instead

To produce a defensible order, four things have to sit in one structure:

1. **The asset and the function it performs** — not just an address and a firmware version, but its role in the process.
2. **The reachable pathways to it** — traced through zones, conduits and trust relationships as they actually are, from every entry point that exists.
3. **The operational consequence of that function being affected** — taken from HAZOP, LOPA, FMEA and criticality studies engineering has already done.
4. **The published severity and threat context** — CVSS, EPSS, vendor advisory, known exploitation. Inputs, weighed inside the model rather than substituted for it.

That is the shape our [What do we fix first?](/nl/decisions/fix-first) decision page sets out in full: severity is an input to the model, never the ranking that comes out of it.

## What commonly goes wrong

**The threshold policy.** "Remediate everything above 7.0 within ninety days" is auditable, simple and produces the wrong list. It commits scarce change windows to whatever the vendor scored highly, and it leaves genuinely dangerous low-scored findings untouched because they never crossed the line.

**Consequence is guessed from the score.** Someone reads a high availability impact and infers a process outage. The inference skips the entire dependency question — what actually depends on that component, and what the plant does when it is unavailable. Engineering already answered this, in documents the security team often has not read.

**Reachability is asserted, not traced.** "It's on the OT network, so it's segmented" is a claim about intent. Whether it holds is a property of the running configuration, and it is the thing most likely to be wrong after several years of legitimate change.

**The remainder is left unranked forever.** Everything below the threshold stays on the list, unaddressed and undecided, indefinitely. That is worse than deferring it: an undecided finding has no owner, no condition that would reopen it, and no record explaining the choice — so it fails the one thing an assessor actually asks for.

**Scores are compared across products.** A high band on a plant historian and the same band on a protection relay are not comparable quantities. The number is calibrated to the flaw, not to the estate, and treating the two as equivalent work items is a category error.

## The decision framework

Before a finding gets a position in the queue, five questions. The published score is the last of them, not the first.

| # | Question | Where the answer comes from |
|---|---|---|
| 1 | **Which instance?** Which specific assets carry this component, and what function does each perform? | Asset records reconciled with topology and observed flows |
| 2 | **Can it be reached?** Is there a traced route from any entry point to this instance, including multi-hop and identity-borne paths? | Computed pathways over the zone, conduit and trust model |
| 3 | **What breaks if it is used?** What does the affected function failing do to the process, physically? | HAZOP, LOPA, FMEA, criticality studies |
| 4 | **What is the cost of acting?** Patch, isolate, broker, compensate or re-zone — and what does each cost in production and engineering? | Change planning with OT engineering |
| 5 | **What does the published score and threat context add?** | CVSS, EPSS, KEV, vendor advisory — as inputs, weighed last |

The order matters more than the content. If question 5 is asked first it anchors everything after it, and questions 2 and 3 become a justification exercise rather than an analysis. Findings that clear the framework land in one of three bands — act now, act next, or accept-or-defer in writing with the condition that would reopen it — and the third band is the discipline that makes the first two credible.

## Worked example

**Illustrative scenario — no customer data.** The two findings below are written to show the shape of the argument. They are not output from a customer engagement, and no scores, counts, currency values or percentages appear, because none of them would be real.

Two findings arrive in the same week at the same site.

**Finding A** is a remote code execution flaw in a widely deployed protocol library. The advisory carries a high severity band, network attack vector, no privileges required. It is present on a historian and on several engineering workstations. It is being discussed publicly and appears in exploitation-activity feeds. Sorted by severity, it is unambiguously the top of the queue.

**Finding B** is an authentication weakness in a device management interface. The advisory carries a middling band: the flaw requires an adjacent network position, and the impact is described as partial integrity loss to the device's configuration. It attracts no attention. Sorted by severity, it sits somewhere in the middle of a long list.

The model is then asked the framework's questions rather than the score's.

For **Finding A**, pathway tracing shows the historian sits in the plant DMZ, reachable from the enterprise zone through a conduit that permits only the replication service, and the engineering workstations sit inside the control zone with no inbound path from outside it. The vulnerable library is present, but the vulnerable *service* is not exposed on any reachable interface on those hosts. Consequence, were it exploited, is loss of historian availability — which the site's own studies rate as a reporting and analysis interruption, not a process one. A real finding, with a real severity, and no traced route to it.

For **Finding B**, the affected management interface is present on devices in the control zone, including a controller that the site's LOPA identifies as providing a barrier function. Pathway tracing finds that an adjacent position is available: a brokered vendor session terminates on a jump host in the same segment, for a support arrangement that is legitimate and documented. The consequence of a manipulated device configuration on that controller is loss of the barrier — the barrier and the thing it guards on the same path again. Middling score, short route, severe physical outcome.

The board that comes out of this places Finding B in the act-now band, with the route recorded beside it and the LOPA reference as the consequence. Finding A goes into act-next, scheduled with the next planned maintenance on the historian, with the reasoning written down: the flaw is real and will be fixed, and the reason it is not first is that no traced pathway reaches the vulnerable service and the consequence is not a process consequence.

The second half of that record is the part that matters under challenge. A severity-ordered list would have produced the opposite order, and would have offered no reasoning to interrogate — only a number, and a backlog that never shrinks.

## The OXOT perspective

The reason a Cyber Digital Twin changes this is not that it scores better. It is that it holds the three things severity cannot: your architecture as it actually is, your engineering studies as they already exist, and the traced route that connects one to the other.

Consequence in the Twin comes from your own HAZOP, LOPA, FMEA and criticality work, not from our opinion or a vendor's impact metric. Reachability is computed over a model of the network you actually run, from every entry point, including the multi-hop and identity-borne chains that per-device review does not surface. CVSS, EPSS and vendor advisories go in as inputs and are weighed inside that structure. What comes out is not a re-scored list — it is a NOW / NEXT / accepted-or-deferred board, ordered by the consequence each finding carries among those someone can actually reach, with the reasoning recorded beside every placement.

That last property is what survives contact with a plant manager, and with an assessor after that. Both ask the same question, and it is never "what did it score?" It is "why this one, and why not that one?" A model that can answer with a route and a named physical outcome answers it. A score cannot, because it was never asked about your plant.

## Practical next step

Bring the backlog you cannot order — the scan output, the advisories, and the network and asset records behind them — and we will show what a reachability-and-consequence model does to the ordering. [See the decision in full](/nl/decisions/fix-first).

## Sources and revision history

**Primary references**

- FIRST, [Common Vulnerability Scoring System](https://www.first.org/cvss/) — specification and user guide. Base metrics represent intrinsic characteristics constant over time and across environments; the Threat and Environmental metric groups exist for the consumer to apply.
- FIRST, [Exploit Prediction Scoring System (EPSS)](https://www.first.org/epss/) — estimated probability of exploitation in the wild; a threat-activity signal, not an asset-specific one.
- IEC 62443-3-2 — *Security risk assessment for system design.* Relevant risk depends on the threats, likelihood, vulnerabilities and consequences of a specific environment.
- IEC 62443-2-1 — *Security programme requirements for IACS asset owners.* Risk treatment, and the record of decisions taken and not taken.

**Related OXOT reading**

- [What do we fix first?](/nl/decisions/fix-first)
- [How does IEC 62278-2:2025 structure the systems approach to safety?](/nl/resources/insights/iec-62278-2-systems-approach-to-safety)
- [IEC 62443 — building evidence from the system you operate](/nl/assurance/iec-62443)

**Revision history**

- 2026-08-23 — First publication.
