---
title: "Air-Gapped by Design, Sovereign by Operation"
slug: "air-gapped-by-design-sovereign-by-operation"
locale: "nl"
section: "guides-briefings"
format: "briefing"
audience: "Board, executive, programme sponsor, procurement, security authority"
decision: "Which deployment mode to approve for a Cyber Digital Twin in a sensitive environment"
excerpt: "A decision briefing for leadership: what actually crosses the boundary when a modelling capability is deployed into a sensitive environment, the three approvable modes, what each one costs you, and why the isolated option does not cost you capability."
metaTitle: "Briefing: Air-Gapped by Design, Sovereign by Operation | OXOT"
metaDescription: "An executive briefing on deploying a Cyber Digital Twin inside a controlled environment — Island Mode, Inbound Intelligence Mode and a Dedicated Sovereign Instance, the trade-offs, and the decision path."
publishedAt: "2026-08-23T00:00:00+00:00"
updatedAt: "2026-08-23T00:00:00+00:00"
---
**Deze Briefing is nog niet vertaald.** De Engelse versie staat hieronder. *(This Briefing has not yet been translated — the English version follows.)*

## The decision in one sentence

Approve a deployment mode for the Cyber Digital Twin — fully isolated, inbound-intelligence-only, or a dedicated sovereign instance — on the basis of what your security authority can approve crossing the boundary, not on the basis of what the capability is assumed to need.

## Why this decision arrives now

Organisations that operate national infrastructure, defence programmes, regulated utilities or classified estates are being asked to demonstrate something they have not previously had to demonstrate: not only that their operational technology is defended, but that they understand its dependencies well enough to make evidenced decisions about it. Regulators, insurers, assurance regimes and programme sponsors are converging on the same expectation.

That creates a procurement problem. The tooling that answers the question is usually built as a connected service. It expects to reach the network, install collectors, phone home for updates, and hold your model on infrastructure you do not control. For a sensitive environment that is not a feature discussion — it is the end of the conversation, and it is usually where these programmes stall.

The decision in front of leadership is therefore narrower and more tractable than "should we buy a modelling capability". It is: **which boundary can we approve, and does the capability survive that boundary intact?**

## The consequence of getting it wrong

**Operationally.** The commonest failure is not a breach. It is a capability that was approved in principle, never accredited in practice, and quietly never deployed — so the estate stays undocumented and every subsequent decision about it is taken on assumption. The second commonest is the reverse: a tool deployed by relaxing the boundary, which then has to be argued for again at every security review.

**Financially.** A deployment that cannot be accredited is a sunk cost with no offsetting benefit, and it consumes the scarcest resource in the programme — your security authority's attention. Reopening a boundary decision costs more the second time.

**On mission.** The environments where this matters are the ones where an outage is a public event. The reason to model dependencies at all is to make consequential decisions — what to fix first, what to segment, what a supplier change actually exposes — before they are forced. A capability that never lands is a decision you keep taking blind.

## What leadership needs to know

Five points carry the decision.

**1. The model is built from evidence you already own.** The Cyber Digital Twin is constructed from approved engineering exports — P&IDs and single-line diagrams, asset records, controller and SCADA configuration exports, network topology, approved passive flow captures, and safety and reliability records such as FMECA entries. It is not built by pointing a scanner or a cloud service at operational technology.

**2. Nothing touches the live process network, in any mode.** No agent is installed on a PLC, RTU, safety controller, HMI or engineering workstation. No active scan, port probe or credentialed sweep is run against the production network. No control action, set point or configuration write is issued to any operational system. This is a property of the product, not a deployment option you select.

**3. Because of point 2, isolation does not cost capability.** This is the point most often assumed the other way round in the boardroom. Choosing the most isolated mode does not sacrifice an analysis that a connected mode would have bought back by touching the plant — because no mode touches the plant. What isolation costs is the freshness of external intelligence, and that is a manageable, scheduled problem rather than an architectural one.

**4. The controls that matter stay with you.** Identity, roles, privileged-access workflow, audit logging, data-handling domains and update approval remain customer-held in every mode. Update packages are signed, versioned and reversible, and every external feed passes an approval gate.

**5. Air-gapped is not the same as safe, and should not be sold to you as if it were.** An air gap does not close removable media and the workflow that authorises it, contractor laptops and maintenance tooling brought on site, temporary connections opened for a commissioning or outage window, engineering workstations that touch both sides of a segmentation boundary, firmware and supply-chain updates arriving through an approved channel, or the authorised cross-domain processes and the people who operate them. Those pathways are precisely what the model is for. A vendor who tells you the air gap settles the question is describing a network diagram, not an operational boundary.

## Key dependencies and risk drivers

- **Your security authority's position on outbound flows.** This single question determines the shortlist. If no outbound path is approvable, the choice is made for you.
- **Data residency and jurisdiction.** Where a connected deployment is acceptable but a shared service is not, sovereignty becomes a tenancy and control-plane question rather than an air-gap question.
- **Currency of threat and vulnerability intelligence.** How stale can it be before the model's prioritisation degrades? That is a policy answer, not a technical one, and it should be stated before the mode is chosen.
- **Availability of engineering evidence.** The quality of the model tracks the quality of the drawings, exports and captures you can supply. Gaps are shown as gaps rather than filled in.
- **Who operates it afterwards.** A model of a changing estate needs sustaining. Deployment mode and operating model are one decision, not two.

## Options and trade-offs

| Mode | What crosses the boundary | Approvable where | The trade-off you accept |
|---|---|---|---|
| Island Mode | Nothing, in either direction. Approved local data and curated intelligence packages are carried in under your own workflow. | Highly classified or tightly controlled systems, and anywhere an outbound path is not approvable at all. | External intelligence is only as current as your last authorised import. Every refresh is a scheduled, staffed action. |
| Inbound Intelligence Mode | Exactly one flow, inward only, through a one-way data diode: signed threat, vulnerability and supplier intelligence. Nothing exits. | Sensitive systems where policy permits inbound-only transfer, and disconnected environments needing a periodic refresh. | Diode hardware and its accreditation, plus an approval gate per feed. Outbound is blocked by construction, not by policy. |
| Dedicated Sovereign Instance | Named, one-directional read integrations to your systems of record, inside a customer-approved region and control plane. | Sovereignty and data-residency requirements a shared service cannot meet, where a connected deployment is nonetheless approvable. | A connected deployment to accredit and maintain. Single-tenant — no infrastructure, storage, model content, key material or identity shared with another tenant. |

The three are variations on one architecture. What differs between them is the boundary and the flows crossing it. What does not differ is that the Twin models the environment and does not operate it.

Worth stating explicitly for a procurement discussion: in every mode, an integration is a source the Twin **reads**. It is never a channel through which the Twin acts.

## The recommended decision path

1. **Ask your security authority one question first:** is any outbound flow from the enclave approvable? A "no" resolves the choice to Island Mode and shortens the programme considerably.
2. **If inbound-only is permitted, ask whether diode accreditation is already available to you.** Existing accredited cross-domain infrastructure makes Inbound Intelligence Mode the low-friction option; standing one up for this capability alone rarely justifies itself.
3. **If a connected deployment is approvable, treat it as a sovereignty question rather than a convenience one.** Fix region, jurisdiction and control plane in the deployment agreement, and name every integration before anything is built.
4. **Set the intelligence-currency policy before you set the mode**, not after. It is the only real trade-off between the three, and it is a leadership decision.
5. **Agree the governance requirements as design requirements**, with the security authority in the room, rather than discovering them during rollout.
6. **Decide the operating model in the same meeting.** A transient build handed over, or sustained operations as the estate changes. Deferring this is how good deployments become stale ones.

## What evidence is needed to decide

You do not need a technical evaluation to take this decision. You need four things:

- **A written position from the security authority** on outbound flows, removable media and import workflow.
- **A data-handling statement** covering which classes of model data exist — unclassified, sensitive, classified — and whether they need separate handling domains.
- **An inventory of available engineering evidence**, honest about the gaps. This determines what the first model can actually say.
- **An intelligence-currency policy**: how stale is acceptable, and who authorises each refresh.

## What OXOT can model once it is inside the boundary

With no external connection at all, the Twin still models the facility and process, assets, control logic, controller and HMI configurations, zones and topology, dependencies, and the safety and reliability context. It traces reachability through the imported topology, rules and passive flow evidence you supplied. It tests a proposed firewall, segmentation, patch, vendor-access or procurement change virtually, before it reaches the live environment. It produces consequence-and-reachability-led priorities, and it generates engineering views, dependency maps, technical documentation and traceable rationale for assurance or leadership review.

Source provenance is retained throughout. Where nothing supports a field, the model shows it empty rather than inventing a value, and conclusions trace back to the engineering document or external source that produced them.

## Next step

The fuller technical treatment — the three boundary diagrams, the import workflow, the intelligence-update options and the governance requirement list — is on [Deployment & Data Sovereignty](/nl/deployment-sovereignty). Take that to your security authority.

Then bring us the boundary they will approve, and we will tell you what the model can say inside it.

---

**Scope note.** This briefing is decision-level. It is not an architecture specification and not an accreditation submission. Any scenario referenced here is illustrative and synthetic; nothing in it describes a real site, programme or classified system. No statistics, named incidents or customer outcomes appear, and no percentage, monetary value or loss figure is stated, because none would be verified. First published 23 August 2026.
