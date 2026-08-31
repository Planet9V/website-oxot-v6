---
title: "How to Test an OT Segmentation Change Before Production"
slug: "testing-an-ot-segmentation-change"
locale: "en"
section: "guides-briefings"
format: "guide"
audience: "OT security, network engineering, controls engineering, architecture"
decision: "Whether a proposed firewall or segmentation change is safe to make"
excerpt: "A nine-step method for proving a firewall rule, zone boundary or conduit change in a model before it reaches a running plant — what evidence you need, what a baseline reading has to contain, where the decision points sit, and what the change authority should be handed at the end."
metaTitle: "Guide: Testing an OT Segmentation Change Before Production | OXOT"
metaDescription: "A practical OT guide: how to establish a baseline reading, insert a segmentation control virtually, re-read the model against the baseline, account for remaining routes, and write a change record a change authority can sign."
publishedAt: "2026-08-23T00:00:00+00:00"
updatedAt: "2026-08-23T00:00:00+00:00"
---
## Executive summary

A segmentation change is one of the few security controls that reliably reduces reachability in an OT environment, and it is also one of the few that can stop production if it is wrong. The two facts are the same fact: a rule that blocks a pathway an attacker could use will also block a pathway a technician, a historian, a safety system or a vendor diagnostic session uses, if you have mistaken one for the other.

The conventional answer to that risk is a maintenance window and a rollback plan. That is a containment strategy, not a test. It tells you what breaks only after it has broken, in the one environment where breaking things is most expensive, and it teaches you nothing about the pathways the change did *not* close.

This guide sets out a different sequence. You build a model of the environment from evidence you already hold, take a **baseline reading** of the routes that matter, insert the proposed control **in the model**, and re-read the same routes in the changed state. The difference between the two readings is what the control actually buys. Everything after that — the residual routes, the validation condition, the implementation sequence — falls out of the comparison rather than out of an argument in a change advisory board meeting.

The method has nine steps, needs seven kinds of evidence, and produces one deliverable: a change record that states what was open, what the control closes, what it leaves open, and how you will know afterwards that it worked.

A modelled closure is a modelled result. It is evidence for a decision, not a guarantee about the plant, and it does not replace engineering approval, safety assessment, operational authority or return-to-service authority. Those stay exactly where they are.

## Who this guide is for

Read this if you are the person who has to answer for a segmentation change:

- **OT security engineers and architects** proposing zone and conduit boundaries, and defending them to operations.
- **Network engineers** who will write the rule set, and who are usually asked for a change window before anyone has agreed what the rule is for.
- **Controls and process engineers** who know which flows are load-bearing and are rarely asked before the firewall arrives.
- **OT security leads** presenting the change to a change advisory board, a plant manager, or an IEC 62443 assessor.
- **RAMS, safety and reliability functions** who need to see that a cyber control has been considered against the functions it sits beside.

You do not need a modelling background. You do need to be able to get hold of the evidence in the list further down, and you need someone in the room who can say authoritatively which flows must keep working.

## What decision this guide supports

One decision, stated plainly:

> Is this proposed firewall rule, zone boundary, conduit change or re-zoning safe to apply to the running environment — and if it is, what exactly does it fix, and what does it leave alone?

It is deliberately not a guide to *designing* a segmentation architecture. It assumes a change has been proposed and that someone now has to decide whether to approve it. The design question — what the zone model should look like in the first place — is a longer conversation that IEC 62443-3-2's zone and conduit risk assessment already frames well.

If you want the short-form version of this argument rather than the method, [Can we change this safely?](/en/decisions/change-safely) states it in a page, with the before-and-after route comparison drawn out.

## Scope, and what this guide does not cover

**In scope.** Firewall rule changes, new or moved zone boundaries, conduit definition, re-zoning of an existing flat network, brokered or mediated vendor access replacing a persistent route, and access changes that alter who can reach a controller and from where.

**Out of scope, deliberately.**

- **Physical network redesign.** Recabling, new switch hardware and media changes have failure modes — link negotiation, spanning-tree behaviour, power — that a reachability model does not represent.
- **Real-time performance.** A model of who can reach what says nothing about latency, jitter or determinism. If the change touches a control loop's timing budget, that is an engineering test, not a modelling exercise.
- **Safety function certification.** If a change sits in the boundary of a safety instrumented function, the safety lifecycle owns it. This method produces an input to that process and nothing more.
- **Anything that requires touching the live process network to find out.** Active scanning, credentialed enumeration of controllers and probe traffic into a control segment are outside this method by design. The model is built from evidence you already have or can capture passively.

**Standing assumption.** You have, or can produce, an accurate-enough picture of the environment. "Accurate enough" is defined in the evidence section — it is a lower bar than people expect, and the gaps themselves are useful output.

## The problem: a segmentation change is a change to a running plant

### Why the maintenance window is not a test

A maintenance window gives you three things: a period when disruption is tolerated, a rollback plan, and a set of people watching. It does not give you a test, for two reasons.

The first is coverage. A window exercises the flows that happen to run during the window. Most OT environments have flows that appear weekly, monthly, at shift change, at batch start, during a campaign, or only when a specific vendor dials in. A four-hour Sunday window will not see them. The change passes, and the failure surfaces eleven days later in the middle of a production run, at which point nobody connects it to the firewall.

The second is direction. A window tells you what broke. It does not tell you what is still open. A rule set that blocks the one route somebody drew on a whiteboard, while leaving three others intact, will pass a maintenance window perfectly. It will also have bought you very little, and you will not find that out from the window.

### Why the rule set is not the answer either

Reading the proposed access control list is a necessary check and an insufficient one. A rule set describes what a single device will permit. Reachability is a property of the whole graph: routes, static routes nobody documented, dual-homed engineering workstations, management VLANs that touch both sides of a boundary, a historian that collects from the control segment and publishes to the enterprise, a vendor gateway with its own path into the site engineering network.

Practically every unwelcome discovery in a segmentation project is of that shape — not a wrong rule, but a second path that made the rule irrelevant. You cannot see a second path by reading the rule that does not mention it. You see it by modelling the environment as a graph and asking the graph a question.

## The OXOT framework: model, change, re-read

The framework is three moves, and its whole discipline is that the second and third are separate.

**Model.** Build a representation of the environment from engineering evidence — topology, zone drawings, asset records, controller and HMI configuration exports, passively captured flows, and the safety and reliability context that says which end-points matter. The model is a graph of assets and the routes between them, annotated with what the routes carry and what sits at the end of them.

**Change.** Insert the proposed control into the model. A firewall becomes an edge state change. A new zone boundary becomes a cut across a set of edges. Brokered vendor access becomes a mediating node in front of a gateway. Nothing about the live environment moves.

**Re-read.** Ask the changed model the same questions you asked the baseline, in the same order, and record the differences. This is the step people skip, and skipping it is why segmentation projects produce diagrams instead of decisions.

### The three readings

Every change in this method produces exactly three readings, and a change record that lacks any one of them is incomplete.

1. **The baseline reading.** What the routes are today, before anything moves — including the routes nobody proposed to change.
2. **The controlled reading.** The same routes with the candidate control inserted, showing which are closed in the model, which are preserved, and which are untouched.
3. **The residual reading.** What is still open after the control. Named, listed, and carried forward as its own work item — not absorbed into "the segmentation project" and forgotten.

The residual reading is the one that gives the method its credibility. A change proposal that claims to have closed everything is a change proposal nobody should sign.

## The step-by-step method

### Step 1 — State the change as a decision, not a configuration

Write one sentence in this shape:

> We propose to *[control]* so that *[route]* is no longer available from *[source]*, while *[named flows]* continue to work.

If you cannot fill in the second blank with a specific route, you do not have a change proposal — you have a rule. If you cannot fill in the fourth blank with named flows, you have a rule and an outage.

This sentence is the specification for everything that follows. The baseline reading has to show that the route exists. The controlled reading has to show it closed. The residual reading has to show what else reaches the same place.

### Step 2 — Draw the boundary you are actually moving

Segmentation arguments go wrong when "the boundary" means different things to different people in the room. Fix it on paper first:

- Which **assets** sit inside the new boundary and which sit outside? Name them individually where the count is small enough, and by zone where it is not.
- Which **conduits** are you claiming will be the only ways across it?
- Where is the boundary **enforced** — one firewall, several, a VLAN, a physically separate switch fabric?
- What **management and monitoring** paths cross it? These are the ones that get forgotten, and they are usually the ones that make a boundary notional rather than real.

Map this against the Purdue level or zone model you already use. If the change moves an asset between levels, say so explicitly; that is a bigger change than a rule.

### Step 3 — Establish the baseline reading

Load the evidence into the model and read the current state. At minimum, record for the route in your Step 1 sentence:

- **Entry point.** Where the route starts, and whether that origin is inside or outside the site.
- **Intermediate systems.** Every asset the route passes through, in order.
- **Target asset.** What sits at the end of it.
- **Consequence chain.** What happens in the process if the target is reached and manipulated — expressed in operational terms, not in severity scores.
- **Known constraints.** What cannot change: contractual vendor diagnostics, the single workstation where a piece of logic is edited, the absence of a process outage before the next scheduled one.

Then, and this matters, read the *other* routes to the same target. The baseline is not one line; it is every path to the thing you care about. If you only draw the route you already knew about, the comparison in Step 6 will flatter the control.

### Step 4 — Name the required flows before you name the control

Get the process and controls engineers in the room and produce a list of flows that must survive the change, each with an owner. Typical entries:

- Engineering edit traffic to controllers, from the specific hosts permitted to originate it.
- Historian and process-data collection out of the control segment.
- Diagnostic collection to a vendor or maintenance system.
- Time synchronisation.
- Alarm and event traffic to wherever operators actually watch it.
- Safety system engineering access, on its own terms and usually on its own path.
- Backup and restore paths, which are load-bearing precisely on the day everything else is broken.

Write this list **before** the control is finalised. If you write it afterwards, it turns into a justification for the rules you already drafted.

### Step 5 — Insert the control virtually

Now change the model. Concretely, this means declaring the edge state changes the control implies: which routes it closes, which it mediates, which it leaves untouched. Two rules keep this honest:

- **Model the control as specified, not as intended.** If the rule permits a subnet, model the subnet — not the two hosts you had in mind.
- **Model the enforcement point, not the diagram.** A boundary drawn on a slide but enforced by one device has one enforcement point, and everything that bypasses that device bypasses the boundary.

### Step 6 — Re-read the model against the baseline

Ask the changed model the same questions, in the same order. Produce a route-state table with one row per route and three columns: the route, its baseline state, its modelled state. Every route from Step 3 appears, including the ones nothing happened to — an unchanged row is information.

Read the table for four outcomes:

| Outcome | What it means | What to do |
|---|---|---|
| Closed in the model | The route in your Step 1 sentence is no longer available | Carry forward, with the validation condition from Step 8 |
| Preserved | A required flow from Step 4 still completes | Confirm with its named owner |
| Broken | A required flow no longer completes | The control is not ready; revise and re-read |
| Remaining | Another route to the same target is still open | Go to Step 7 |

### Step 7 — Account for what the control does not close

Every remaining route gets its own line, its own owner and its own scheduled item. It does not get absorbed into the parent change.

This is where the method earns its keep. The common failure in segmentation work is not a broken plant — it is a completed project that closed the documented route while a second path stayed open for years, because it never appeared on anything anybody signed. A remaining route that is written down and scheduled is a managed risk. A remaining route that is silently inside the project boundary is an unmanaged one wearing a project's clothes.

### Step 8 — Write the change record and the validation condition

The deliverable is a record, not a diagram. It contains:

- The Step 1 sentence.
- The baseline, controlled and residual readings.
- The **implementation sequence** — what goes first, what goes with it, what is separate.
- The **evidence used**, with dates, so a reviewer can see how current the picture was.
- The **validation condition**: a specific, checkable statement of how you will know afterwards that the change did what the model said. It should be a measurement, not an absence of complaints.

A good validation condition looks like: *"Validated when a repeat flow capture at the gateway shows no traffic from the gateway to the engineering workstation, and the engineering edit and diagnostic collection flows both still complete."* A bad one looks like: *"Validated when no issues are reported."*

### Step 9 — Implement, then re-measure

Apply the change through your normal change process, with your normal approvals, in your normal window. Then check the validation condition against reality, and record the answer.

If the measurement disagrees with the model, the model was wrong, and the interesting question is which piece of evidence was stale. That answer improves every subsequent change. A model that is never checked against the plant becomes a second, more confident version of the documentation problem you started with.

## The evidence you need before you start

Seven inputs carry most of the weight. None of them require touching a controller.

| Evidence | What it establishes | Usual owner |
|---|---|---|
| Network topology and zone/conduit drawings | The graph the routes run on | Network engineering, OT architecture |
| Current rule sets and access control lists | What is enforced today, at which device | Network / security engineering |
| Asset inventory and records | What exists, where it sits, what it is for | Maintenance, asset management |
| Passive flow capture (PCAP / NetFlow) | What actually communicates, versus what the drawing says | Network monitoring, OT security |
| Controller, SCADA and HMI configuration exports | Which hosts originate engineering traffic, and to what | Controls engineering |
| P&IDs and single-line diagrams | What the target asset does in the process | Process engineering |
| FMECA, hazard and reliability records | Why the target asset matters, in operational terms | RAMS, safety, reliability |

Two notes on quality. First, passive capture is worth more than any drawing, because it is the only input that reflects the environment as it is rather than as it was commissioned — but it only sees the window it ran in, so a short capture will miss periodic flows and you must say so. Second, gaps are output. "We do not have a current rule set for that device" is a finding, and a segmentation decision taken without one should be recorded as such.

## Decision points

Five points in the method where the answer changes what you do next.

**A. Is the baseline good enough to decide on?** If the evidence cannot show the routes to the target asset with reasonable confidence, stop and close the gap. Deciding on a model you do not trust is worse than deciding on no model, because it launders a guess into a document.

**B. Does the control close the route in the Step 1 sentence?** If not, the proposal has failed on its own terms. Revise it before discussing anything else.

**C. Do all required flows survive?** If a Step 4 flow breaks, the choice is to revise the control or to revise the flow — and revising the flow is a legitimate outcome, provided its owner agrees and it is written down.

**D. Are the remaining routes acceptable for now?** This is a risk-acceptance decision and it belongs to whoever owns that risk, not to the engineer who ran the model. Give them the residual reading and let them decide.

**E. Is the validation condition measurable?** If nobody can say how they will check it, the change has no closing evidence, and the next assessor will ask for it.

## Worked example

> **Illustrative scenario — no customer data.** The environment, systems and outcome below are synthetic, constructed to show the shape of the method. Nothing here describes a real site or a real client engagement.

**The proposal.** Vendor remote access currently reaches a remote-access gateway, the gateway reaches an engineering workstation, and that workstation edits a dosing-controller zone. The proposed control is brokered vendor access in front of the gateway, plus a virtual segmentation boundary at the edge of the dosing-controller zone.

**Step 1 sentence.** *We propose brokered vendor access and a zone boundary so that the gateway-to-engineering-workstation-to-dosing-zone route is no longer available from the vendor's remote origin, while engineering edit traffic into the dosing zone and diagnostic collection out of it continue to work.*

**Constraints named up front.** Vendor diagnostics are contractual. The engineering workstation is the only place the dosing logic is edited. There is no process outage available before the next scheduled one.

**Baseline reading.** Entry point: vendor remote access, reached from outside the site. Intermediate systems: remote-access gateway, site engineering network, engineering workstation. Target asset: the dosing-controller zone, and the dosing loop behind it. Consequence chain: controller reachable, dose driven outside its safe band, one protecting safety function left as the only barrier, a lost shift and a reportable quality event.

**Controlled reading, as a route-state table.**

| Route | Baseline | Modelled result |
|---|---|---|
| Gateway → engineering workstation → dosing-controller zone | Open — the selected pathway | Closed in the model by the segmentation boundary |
| Engineering edit into the zone, diagnostics out of it | Open, and required by the constraint | Preserved — both still complete |
| Gateway → site engineering network → engineering workstation | Open, unremarked | Remaining route — not closed by this control |
| Vendor access into the gateway | Direct | Brokered — mediated, recorded, revocable |

**Residual reading.** One remaining route reaches the engineering workstation through the site engineering network. The proposed control does not close it. It is carried into the decision output as its own scheduled item with its own evidence requirement, rather than counted as solved.

**Change record output.** Broker the vendor route first. Place the segmentation boundary in the same change. Treat the remaining route as a separate, scheduled item with its own evidence. Both items fit a normal change window; neither requires the process to stop. Validated when a repeat flow capture shows no gateway-to-workstation traffic and the engineering and diagnostic flows still complete. OT engineering owns the boundary; the vendor manager owns brokered access; the plant's change authority approves both.

**What the example is not.** It is not a claim that this control works in your environment, and the modelled closure is a modelled closure — evidence for the change authority, not a guarantee about the plant.

## Deliverables and success criteria

At the end of the method you should be holding four artefacts:

1. **The baseline reading** — routes to the target asset, with the consequence chain and the named constraints.
2. **The route-state table** — every route, its baseline state and its modelled state, including unchanged rows.
3. **The residual register** — remaining routes, each with an owner and a scheduled item.
4. **The change record** — the Step 1 sentence, the implementation sequence, the evidence used with dates, and the validation condition.

You have done this well if all of the following are true:

- Every required flow has a named owner who has seen and agreed the list.
- The change record names at least one route the control does **not** close, or explains credibly why there is none.
- The validation condition is a measurement somebody has agreed to take, on a date.
- The change advisory board discussion is about the residual routes, not about whether the change will break the plant. That shift is the point of the whole exercise.

## Common mistakes

**Modelling the control you meant instead of the control you wrote.** The rule set is the control. If it permits a subnet, the model must permit the subnet.

**Treating the drawing as the environment.** Zone drawings age. Passive flow capture is the corrective, and where the two disagree the capture usually wins.

**Reading only the route you already knew about.** A baseline of one route makes any control look decisive. Read every path to the target.

**Letting "remaining route" become "phase two".** A residual route without an owner and a date is not scheduled, it is deferred indefinitely. Give it both.

**Skipping the required-flow list until after the rules are drafted.** Written afterwards, it becomes a rationalisation. Written first, it is a specification.

**Forgetting management and monitoring paths.** Jump hosts, out-of-band management, monitoring collectors and backup agents cross boundaries by design, and are the most common reason a boundary turns out to be notional.

**Confusing a modelled closure with a verified one.** The model says the route is closed in the model. The repeat flow capture after implementation is what says it is closed in the plant.

**Running the exercise without process engineering in the room.** Reachability is a network property; consequence is a process property. A model with only the first half will confidently protect the wrong asset.

**Assuming a short capture window is representative.** Weekly, monthly and campaign-driven flows exist. If the capture did not span them, say so in the change record.

## The pre-change checklist

Work down this list before the change reaches a change advisory board. Anything unticked is either a gap to close or a limitation to state.

**Framing**

- The change is written as one Step 1 sentence, with a specific route and named surviving flows.
- The boundary is drawn: assets inside, assets outside, conduits across, enforcement points identified.
- Management, monitoring, backup and out-of-band paths across the boundary are listed.

**Evidence**

- Topology and zone/conduit drawings, with a date.
- Current rule sets for every enforcement point on the boundary.
- Asset inventory covering the assets on the routes in scope.
- Passive flow capture, with its capture window stated.
- Controller / SCADA / HMI configuration exports identifying engineering origins.
- P&ID or single-line context for the target asset.
- FMECA, hazard or reliability record explaining why the target matters.

**Readings**

- Baseline reading covers every path to the target asset, not only the proposed one.
- Required-flow list produced before the control was finalised, with an owner per flow.
- Control modelled as specified rather than as intended.
- Route-state table complete, including unchanged rows.
- Residual register produced, with an owner and a date per remaining route.

**Decision and closure**

- Someone with authority to accept the residual risk has seen the residual register.
- Implementation sequence stated: what goes first, what goes together, what is separate.
- Validation condition is a measurement, with a person and a date attached.
- Engineering approval, safety assessment, operational authority and return-to-service authority are unchanged and identified by role.
- A date is set to re-measure after implementation and record whether the model was right.

## Next step

If you have a segmentation change that has been proposed, argued about and never approved — the firewall nobody will sign without evidence, the patch campaign with no outage to run it in, the vendor route that has been temporary for four years — that is the right change to run this method against first.

Read the short-form version of the argument at [Can we change this safely?](/en/decisions/change-safely), then bring us the change. We will show you what the baseline reading looks like on your own evidence, and what the route-state table says once the control is inserted.

## Sources, scope and revision history

**What this guide is grounded in.** General OT security and network engineering practice, and the zone-and-conduit framing established by the IEC 62443 series — in particular IEC 62443-3-2's approach to partitioning a system under consideration into zones and conduits, and the separation IEC 62443-2-1 draws between the security programme and the operational authorities it informs. Nothing here should be read as a compliance interpretation of those standards; consult the current published text, and your assessor, for that.

**What it deliberately does not contain.** No statistics, no named incidents, and no customer outcomes. The worked example is synthetic and labelled as such. No percentage, monetary value or loss figure appears anywhere in this document, because none of them would be verified.

**Authority boundary.** OXOT supports the people who hold authority over a change. It does not replace engineering approval, safety assessment, operational authority or return-to-service authority, and a modelled closure is not a real-world guarantee.

**Revision history.** First published 23 August 2026. Review triggered by changes to the IEC 62443 series, to OXOT's modelling method, or to the material this guide cross-references.
