# OXOT Visual Foundation and Development Brief

**Version:** 1.0  
**Purpose:** Foundation deliverables for the OXOT public website  
**Audience:** Design, development, product marketing, OT/cybersecurity SMEs, and reviewers

> **Objective:** Create a premium, technical, evidence-led website for OXOT. The Cyber Digital Twin remains the commercial center of gravity; Consulting, Industries, Assurance, Resources, Company, and Contact support the buyer’s journey.
>
> The visual language must feel like **calm industrial intelligence**: engineered, layered, sovereign, precise, and interactive. It must not feel like generic SaaS, hacker-themed cybersecurity marketing, a startup template, or a flat catalogue of equal cards.

---

## 1. Foundation Deliverables

Build and approve these six experiences before expanding the whole sitemap.

| Deliverable | Role | Primary destination |
|---|---|---|
| Home Hero + Twin Explorer | Make OXOT and the Cyber Digital Twin understandable in ten seconds | Home |
| Four Decisions Switchboard | Make buyer outcomes the primary route into product value | Home, Decisions, Platform |
| Baseline vs. Virtual Control | Prove “test before production” through a cyber-physical scenario | Home, Platform, Can We Change Safely? |
| Seven-Layer Architecture Canvas | Give technical buyers a usable explanation of how the Twin is built | Platform, Technical Specification |
| Case Study Editorial Template | Turn real and anonymized work into credible technical proof | Resources / Case Studies |
| Air-Gapped Deployment Visual | Make sovereignty, passive-first operation, and boundaries tangible | Platform, Air-Gapped Deployments, Defense & Government |

---

## 2. Design Principles

### Brand posture

**Calm industrial intelligence.** OXOT should communicate deep understanding of physical systems, process constraints, safety, reliability, evidence, supply chains, operational recovery, and high-consequence decisions.

### Do

- Use process diagrams, topology, dependency chains, evidence traces, engineering abstractions, and meaningful state changes.
- Use asymmetric composition to distinguish strategic narrative from technical proof.
- Use color as a semantic indicator of model state.
- Use motion to show a route, a selected state, a control being introduced, or a decision changing an outcome.
- Use real technical artifacts where safe: simplified P&IDs, one-lines, network abstractions, dependency graphs, and evidence records.
- Use synthetic scenarios clearly labelled as illustrative when customer data cannot be shown.
- Make every interaction useful with keyboard, touch, and reduced-motion alternatives.

### Do not

- Use hooded hackers, binary rain, shields, padlocks, neon terminal effects, fake telemetry, generic circuitry, or AI-orb illustrations.
- Use a centered heading, paragraph, two buttons, and three equal cards as the default page pattern.
- Use one accent color for all controls, panels, icons, warnings, and CTAs.
- Use auto-rotating carousels, scroll-jacking, decorative parallax, or motion without explanatory value.
- Use generic stock photos of factories, server racks, or “cyber” people.
- Use fake customer logos, fake metrics, unapproved testimonials, or implied customer outcomes.
- Make complex technical content disappear inside accordions only to make a page shorter.

**On the stock-photo bullet above, clarified 2026-08-26 (owner correction) — this bars *stock* photography, not all new imagery.** This project has a real, verified image-production pipeline — `scripts/gimp-export.sh`, `scripts/blender-render-glb.py`, `scripts/openrouter-generate-image.sh` (all confirmed working, headless) — documented in full in `OXOT_Component_Inventory.md`'s imagery-pipeline section (~lines 101–116): a real, sanctioned tool for producing new, honest, clearly-illustrative Industries-page imagery, not a way to smuggle in the same generic-stock-photo failure through a different tool. Building a builder/Taskmaster that reads only this bullet and concludes "no image should ever be added unless one already exists in `public/images/`" is a real misreading this project has already made once (an Energy & Utilities Product Capabilities section shipped with imagery declined outright, when an existing real asset and, failing that, the generation pipeline were both live options). Read `OXOT_Component_Inventory.md`'s section before deciding a page needs no imagery — it sets out the actual test (reuse first, generate second, compositional/depictive fit, the "withholding test"), not this bullet alone.

---

## 3. Visual System

### 3.1 Semantic color roles

```css
/* Dark surfaces */
--ink-950: #071014;
--ink-900: #0B171C;
--ink-850: #102126;
--ink-800: #163038;

/* Light surfaces */
--paper-50: #F5F8F7;
--paper-100: #EAF0EE;
--paper-200: #D9E4E0;

/* Text */
--text-primary-dark: #F0F6F3;
--text-secondary-dark: #B7C8C1;
--text-primary-light: #102126;
--text-secondary-light: #536761;

/* Semantic signals — canonical hue reference, use only inside per-theme pairs below */
--signal-cyan: #36D8D1;  /* modelled, verified, connected */
--signal-blue: #4A9EFF;  /* pathway, network, information */
--signal-amber: #FF9F43; /* proposed change, decision attention */
--signal-red: #EF6262;   /* critical consequence / unsafe route */
--signal-green: #68C68B; /* validated closure / reduced risk */
--signal-slate: #536761; /* inactive, context, unknown */

/* Per-theme signal pairs — RESOLVED 2026-08-24 (owner decision).
   The canonical hex values above are tuned for --ink-900 and measurably fail
   WCAG 1.4.11 (3:1 non-text minimum) against --paper-50: cyan 1.65:1, amber
   1.91:1, green 1.96:1, blue 2.58:1, red 2.98:1 — 5 of 6 fail (verified by
   direct WCAG relative-luminance computation, not estimated). This blocked
   the Foundation Spec's own Phase-1 approval gate (§11, "Design tokens and
   shell," gated on semantic colour being approved) before a single Explorer
   component could be built.
   Fix: each signal's hue (H) and chroma (C) held exactly constant in OKLCH;
   only lightness (L) adjusted per surface. -on-light values computed to
   clear 3:1 with headroom (3.31-3.33:1 across all 5 that needed it; slate
   already passed at 5.65:1, left unchanged). -on-dark values simultaneously
   re-equalized to ~6.0:1 across all six (previously ranged 3.02:1 to
   10.32:1 — cyan visually "shouted" while slate "whispered," an unintended
   importance ordering). Verified visually via rendered swatches in both
   themes, not just computed. */
--signal-cyan-on-light: #009893;
--signal-cyan-on-dark: #00A6A0;
--signal-blue-on-light: #3489E9;
--signal-blue-on-dark: #4296F6;
--signal-amber-on-light: #CC7100;
--signal-amber-on-dark: #DA7D0F;
--signal-red-on-light: #E6595A;
--signal-red-on-dark: #F46666;
--signal-green-on-light: #399961;
--signal-green-on-dark: #46A66D;
--signal-slate-on-light: #536761;  /* unchanged — already 5.65:1 */
--signal-slate-on-dark: #839992;

/* Brand identity — RESOLVED 2026-08-24 (owner decision).
   See stage_1_opus/comparison_vs_existing_system.md §6 item 2.
   Resolves a real collision: the brand mark's #E58B3F sits one hue-step from
   --signal-amber (#FF9F43) — close enough to read as the same color, distinct
   enough to function as an unauthorized second accent. */
--brand-orange: #E58B3F; /* identity mark ONLY — never a signal, never state */

/* NOW status — RESOLVED 2026-08-24 (owner decision).
   See OXOT_Layout_Styles.md's Decision Ledger pattern for the original gap:
   none of the six signal hues cleanly means "committed, active, urgent" —
   amber means proposed/pending, green means validated-closure. A prior fix
   attempt glued an urgency glyph onto amber and was correctly rejected: it
   patched the symptom (indistinguishable from NEXT) while leaving the real
   mismatch (wrong-meaning token) untouched.
   Resolution: NOW reuses --signal-blue rather than introducing a 7th hue.
   Blue's own defined meaning already covers "routes, interfaces,
   communications" — i.e. an active, in-motion pathway — which is a genuine,
   not forced, semantic fit for "currently being executed on," and blue was
   otherwise unused in the Decision Ledger's three prior states (NEXT=amber,
   deferred=slate). A 7th token was deliberately avoided: Visual_Rules bars
   "multiple competing accent colors," and the existing six already cover
   the state space once NOW's mapping is fixed rather than expanded. */
```

| Color | Meaning | Use |
|---|---|---|
| Cyan / teal | Modelled, verified, connected | Evidence, selected object, engineering truth |
| Blue | Network and information pathway; also NOW status (see below) | Routes, topology, interfaces, communications; committed/active decisions |
| Amber | Decision pending or proposed control; NEXT status | Candidate firewall, proposed action, investment choice |
| Red | Critical consequence or unresolved consequential route | Use sparingly and only when the scenario warrants it |
| Green | Modelled validation or closed pathway | Only after a scenario/control result is shown |
| Slate | Context, inactive state, unknown or legacy condition; deferred status | Supporting information |
| **Brand orange** | Identity mark only — logo, wordmark, brand-adjacent marketing chrome | **Never** signals, panels, icons, controls, or diagram elements — see rule below |

**Rule:** `--brand-orange` and `--signal-amber` are visually close but semantically distinct and must never be treated as interchangeable. `--brand-orange` is barred from every surface §3.3 gives amber load-bearing meaning on — including the Decision panel's amber highlight, which uses `--signal-amber` only, never the brand mark color.

**Decision Ledger status vocabulary (resolved):** NOW = solid `--signal-blue` stamp with a motion/urgency glyph (the glyph is now meaningful because it sits on the correct token, unlike the rejected amber attempt). NEXT = `--signal-amber` outline stamp. Deferred = `--signal-slate` stamp with strike-through. All three always paired with the word, never color alone, per the existing hard rule.

### 3.2 Typography

```text
Display / strategic statement:  Instrument Serif, Newsreader, or equivalent
Operational / technical copy:   Instrument Sans, Inter, Geist, or Manrope
Technical labels and diagrams:  IBM Plex Mono, Geist Mono, or JetBrains Mono
```

| Role | Desktop | Mobile | Use |
|---|---:|---:|---|
| Display | 48–72px | 36–48px | Hero and major narrative moments only |
| Section heading | 32–44px | 28–34px | Main page sections |
| Lead | 18–22px | 17–20px | Explanatory positioning |
| Body | 15–17px | 15–17px | Normal prose |
| Technical label | 11–13px | 11–13px | Evidence, diagram labels, metadata, state |

Use named type roles. Do not use a broad collection of ad hoc 10px–16px text sizes and opacity values.

### 3.3 Surfaces and depth

Use four surface types:

1. **Canvas** — Full-width dark or light section background.
2. **Technical panel** — Fine border, restrained noise/grid texture, no heavy shadow.
3. **Active system panel** — Controlled translucency and cyan/blue edge highlight for diagrams and stateful interfaces.
4. **Decision panel** — Amber highlight for proposed control, investment choice, or pending decision.

```css
--panel-border: rgba(158, 214, 204, 0.14);
--panel-surface: rgba(18, 42, 47, 0.68);
--panel-blur: blur(16px);
--panel-shadow: 0 16px 48px rgba(0, 0, 0, 0.24);
```

Use glass effects only for active technical system panels—not every card.

### 3.4 Motion rules

- Respect `prefers-reduced-motion`.
- Essential information must never depend on motion, hover, or WebGL.
- Use 160–280ms transitions for normal UI state changes.
- Use 300–500ms only when a diagram explains a route, cascade, or changed system state.
- Avoid automatic moving content that distracts from reading.
- Use motion to show: selected view, pathway trace, control placement, route closure, evidence drill-down, or state comparison.

---

## 4. Site Map Alignment

The foundation patterns must be reused consistently across the sitemap.

| Foundation pattern | Primary pages | Secondary reuse |
|---|---|---|
| Twin Explorer | Home, Platform | Each Industry page with sector-specific scenario data |
| Four Decisions Switchboard | Home, Decisions overview | Platform, Consulting, Industry pages |
| Baseline vs. Virtual Control | Platform, Can We Change Safely? | Home, Consulting, Case Studies, Rail/Water/Hyperscale pages |
| Seven-Layer Architecture | Platform | Technical Specification, Assurance, selected Insights |
| Case Study Editorial | Resources / Case Studies | Industry proof blocks, Consulting, Insights |
| Air-Gapped Deployment | Air-Gapped Deployments | Platform, Defense & Government, Company, Contact qualification |

### Primary navigation

```text
Platform · Consulting · Decisions · Industries · Assurance · Resources · Company
                                                        [Talk to an OT Engineer]
```

At launch, Company contains only:

```text
Company
├─ About OXOT
└─ Contact
```

---

# 5. Deliverable 1 — Home Hero + Twin Explorer

## Purpose

Make the OXOT proposition understandable in ten seconds:

- OXOT works in OT and critical systems.
- The Cyber Digital Twin is the product.
- It uses engineering evidence to trace pathways and consequence.
- It lets teams test decisions before they touch production.

## Content contract

```text
Eyebrow:
Dutch OT cybersecurity

H1:
See your OT environment.
Understand the risk.
Know what to do next.

Lead:
OXOT builds a Cyber Digital Twin from the engineering evidence you already hold.
Model cyber pathways, test changes safely, and make decisions your engineers
can act on and your board can defend.

Primary CTA:
Talk to an OT Engineer

Secondary CTA:
Explore the Cyber Digital Twin
```

## Required explorer information flow

Use a notional industrial scenario, labelled clearly:

> **Illustrative model — no customer data.**

```text
View selector:
[ Process ] [ Purdue ] [ Network ] [ Attack Path ] [ Consequence ]

Scenario:
Vendor remote access reaches a maintenance network, engineering workstation,
and a dosing-controller zone.

User action:
Select a view or select the scenario.

Response:
- Relevant assets and relationships are highlighted.
- The selected route is traceable.
- The affected process function is shown.
- The consequence chain is explained.
- A virtual control can be introduced.
```

## Required states

| State | Visual/system expression | Text equivalent |
|---|---|---|
| Default | Neutral system topology | “No scenario selected. Select a view or scenario.” |
| Process | Process equipment and material/energy relationship highlighted | “The dosing controller regulates [function].” |
| Purdue | Zones, levels, and conduits highlighted | “The controller sits in [zone]; access enters through [route].” |
| Network | Hosts, VLANs, firewall boundaries, and routes visible | “A route exists from [entry] to [asset].” |
| Attack path | Selected credible route traces through intermediate systems | “The selected route reaches [target] under stated assumptions.” |
| Consequence | Affected function and operational outcome shown | “Compromise could lead to [outcome], subject to barriers.” |
| Proposed control | Amber control inserted; closed segment turns green after simulation | “The control closes [route] and leaves [residual routes/required flows].” |

## Development requirements

- Use HTML/SVG/CSS first; do not make WebGL mandatory.
- Drive all assets, paths, views, scenarios, controls, and copy from typed data.
- Use a deterministic state reducer such as `view`, `scenario`, and `proposedControl`.
- Provide keyboard selection and a text-equivalent scenario summary.
- Do not use fake telemetry, tiny unreadable labels, auto-rotating 3D models, or a generic dashboard screenshot.
- Design the component so the same structure can support Manufacturing, Energy, Water, Rail, Hyperscale, and Defense variants later.

---

# 6. Deliverable 2 — Four Decisions Switchboard

## Purpose

Make OXOT’s differentiation commercial and immediate. Buyers are not purchasing a digital twin because it is technically interesting. They are purchasing decision confidence.

| Decision | Buyer question | Destination |
|---|---|---|
| What do we fix first? | Which reachable issue can affect what matters most? | `/decisions/fix-first` |
| What should we spend? | Which option removes the most consequential risk for the investment? | `/decisions/investment` |
| Can we change safely? | Can we test a firewall, patch, route, vendor-access, or replacement change before production? | `/decisions/change-safely` |
| What can we accept or defer? | Which issue has a defensible, time-bounded exception with evidence? | `/decisions/risk-acceptance` |

## Interaction model

Use a **switchboard**, not four equal static cards.

```text
Selected decision panel:
Decision question
→ evidence required
→ OXOT model action
→ output
→ relevant roles
→ CTA
```

Example for **Can we change safely?**:

```text
Baseline route
→ virtual firewall or brokered access
→ required flows retained
→ residual route identified
→ implementation and validation decision
```

## Rules

- Use a native tab pattern, radio group, or equivalent accessible control.
- One decision is active by default.
- Use amber for selected proposed decision state, cyan for evidence/model state, green only for a modelled closure.
- ~~Do not call the fourth category "NEVER" publicly. Use Accept or defer and state review conditions.~~ **REVERSED by owner decision, 2026-08-24.** "NEVER" is permitted publicly. Reason: this rule was never actually followed by the shipped product — a grep across all 6 real industry pages' `content.ts` found "NOW / NEXT / NEVER" already in pervasive, real use (9 occurrences across `energy-utilities`, `water-wastewater`, `rail-transportation`, `manufacturing-process`, `hyperscale-data-centers`, `defense-government`), and `src/components/decisions/risk-acceptance/content.ts` had a doc comment citing this rule as the reason it avoided the word. The rule was fixed into the derived docs (`OXOT_Layout_Styles.md`, `OXOT_Component_Inventory.md`) earlier this session on 2026-08-24, sourced correctly from this exact line — that fix is now reverted, since the rule itself is what changed, not the earlier fix's accuracy.
- Use this component in abbreviated form on Home and detailed form on the Decisions overview page.

---

# 7. Deliverable 3 — Baseline vs. Virtual Control

## Purpose

Prove the central OXOT claim:

> **Test the firewall, patch, re-zoning, access change, or supplier option in the model before changing the live environment.**

## Scenario specification

```text
Scenario:
Vendor remote access reaches an engineering workstation and a dosing-controller zone.

Candidate control:
Brokered vendor access plus a virtual segmentation boundary.

Constraint:
Required engineering and diagnostic flows must remain available.

Modelled result:
The control closes the selected path, identifies residual paths, and records the rationale.
The model changes; the plant does not.
```

## Required information panels

| Baseline | Proposed control | Decision output |
|---|---|---|
| Entry point, intermediate systems, target asset, consequence chain, known constraints | Control inserted in the model, routes affected, required flows preserved, residual exposure | Recommended sequence, evidence needed, implementation window, validation condition, responsible role |

## Semantic state rules

- Red: the explicitly selected consequential baseline route only.
- Amber: a proposed virtual control before modeled outcome.
- Green: a modelled validated closure only—not a real-world guarantee.
- Blue: network and information flow.
- Cyan: evidence-backed system and object state.

## Claim boundaries

- Every scenario must state: **Illustrative scenario — no customer data.**
- Do not show percentages, money values, annual loss, or “verified” language unless inputs and public approval exist.
- Use “modelled result,” “selected pathway,” “remaining route,” and “decision evidence.”
- In safety-sensitive contexts, state that OXOT supports but does not replace engineering approval, safety assessment, operational authority, or return-to-service authority.

---

# 8. Deliverable 4 — Seven-Layer Architecture Canvas

## Purpose

Provide technical credibility on the Platform page without forcing nontechnical visitors through a feature catalogue.

## Layer model

| Layer | Name | Primary content |
|---|---|---|
| L1 | Facility physics | Thermodynamics, fluids, kinetics, process limits, physical failure modes |
| L2 | Assets | PLC logic, SCADA/RTU/HMI configuration, instruments, actuators, virtualized elements |
| L3 | Interoperation | P&ID extraction, DEXPI, OT protocols, CycloneDX integration |
| L4 | Networks | VLANs, subnets, virtual firewalls, Purdue levels, PCAP flow analysis |
| L5 | Data fusion | FMECA, SCIL, RCIL, MOR, device cascades, external sources |
| L6 | Services | Simulation, Analyst Studio, visualizers, adversary emulation |
| L7 | Governance | Consequence Index, decision outputs, technical files, evidence |

## Interaction model

```text
Select a layer
→ see what enters the layer
→ see what the model derives
→ see which decisions it enables
→ see related evidence
```

Also provide **Trace one object** mode:

```text
Select a pump, controller, supplier component, rail function, or product interface.
See how it appears across relevant layers.
```

## Constraints

- Use accessible HTML/SVG; do not make a canvas-only architecture graphic.
- Support keyboard, touch, screen reader, and URL state such as `?layer=L4`.
- Keep summaries concise. Put extensive protocol and implementation detail in progressive disclosure or the Technical Specification.
- Reuse the same semantic layer data in Platform, Assurance, and Resources diagrams.

---

# 9. Deliverable 5 — Case Study Editorial Template

## Purpose

Publish technical proof without generic success-story language, fake metrics, or unapproved social proof.

## Required content structure

```text
Title: Describe the decision made.

1. The decision
2. Operating environment and constraints
3. Evidence available
4. What OXOT modeled
5. Pathway or dependency discovered
6. Options tested
7. Decision and implementation sequence
8. Evidence produced
9. Result and lessons
10. Comparable scenario CTA
```

## Required metadata

```text
Industry
Environment
Decision
Engagement model
Evidence used
Publication status: Named / Anonymized / Illustrative
Last reviewed
```

## Visual language

- Editorial layout with strong hierarchy and generous reading space.
- One primary evidence artifact per study.
- Use a standard proof graphic:

```text
Decision → Constraint → Model → Options → Outcome
```

- Use “Illustrative scenario — no customer data” or “Anonymized case study” visibly where applicable.
- Do not use generic factory photography, a customer-logo wall, or unapproved outcomes.

## Initial case-study candidates

| Candidate | Core decision | Primary visual artifact |
|---|---|---|
| Rail signaling vendor access | Preserve fault recovery while removing persistent broad access | Vendor route → engineering zone → signaling function → brokered control |
| Water chemical dosing | Protect dosing control while preserving safe treatment and support | Source-to-treatment pathway and dosing-control consequence chain |
| Hyperscale BMS | Identify common-mode risk across redundant cooling trains | Cooling topology with shared BMS/vendor dependency |
| OT M&A due diligence | Assess a large estate under deal-clock pressure | Portfolio-to-site drill-down and evidence-coverage map |

---

# 10. Deliverable 6 — Air-Gapped Deployment Visual

## Purpose

Show a sensitive buyer that OXOT can operate within a controlled environment without connecting to live controllers, actively scanning production networks, or exporting sensitive operational data.

## Deployment modes

| Mode | Diagram must show | Key statement |
|---|---|---|
| Island Mode | Customer-controlled enclave; approved source imports; local Twin; no external arrow | Fully isolated deployment. No external dependency and no direct access to control systems. |
| Inbound Intelligence Mode | One-way data-diode arrow pointing into the Twin; no outbound arrow | Approved intelligence can enter. Customer engineering and operational data does not leave. |
| Dedicated Sovereign Instance | Single-tenant boundary, customer-approved region/control plane, defined integrations | Dedicated deployment aligned to sovereignty and access requirements. |

## Mandatory common elements

- Passive-first: no agents on PLCs, RTUs, or controllers; no active production-network scanning.
- Approved engineering exports: P&IDs, asset lists, configuration exports, topology, PCAP/flow evidence, safety/reliability records, BOMs.
- Customer-controlled identity, roles, audit logging, update governance, source provenance, backup, and recovery.
- Defense/government examples must be notional and synthetic. Do not depict actual sensitive sites, national infrastructure, classified systems, or real topology.

---

# 11. Development Sequence and Approval Gates

## Implementation order

| Phase | Deliverable | Approval gate |
|---|---|---|
| 1 | Design tokens and shell | Dark/light themes, typography roles, semantic color, navigation, footer approved |
| 2 | Home Hero + Twin Explorer | One industry-neutral synthetic scenario works on desktop, mobile, keyboard, and reduced-motion modes |
| 3 | Four Decisions + Virtual Control | State language, controls, text equivalents, CTA destinations approved |
| 4 | Seven-Layer Canvas | Data-driven layer model and object trace interaction approved |
| 5 | Case Study Template | One approved or anonymized study migrated and editorial template approved |
| 6 | Air-Gapped Deployment Visual | Deployment claims, boundaries, and safety/legal language approved |
| 7 | Full sitemap rollout | Platform, Consulting, Industries, Assurance, Resources, Company, and Contact composed from approved patterns |

## Non-negotiable acceptance criteria

- No page is a generic repeated card grid without a defined information purpose.
- All diagrams have plain-language text equivalents.
- All interactive controls work with keyboard, touch, and screen reader patterns.
- All CTAs route to real production destinations; no placeholder links.
- All synthetic scenarios and values are clearly labelled.
- No unapproved customer data, logo, testimonial, result, or percentage claim appears.
- Dark and light themes share semantic tokens; light mode is not an afterthought.
- Meet WCAG 2.2 AA expectations for contrast, focus, labels, keyboard operation, reflow, reduced motion, and target sizes.
- Follow the approved sitemap and page specifications; this brief controls visual and interaction consistency, not copy ownership.

---

# 12. Required Handoff Artifacts

```text
OXOT_VISUAL_SYSTEM.md
  Tokens, typography, colors, surfaces, motion, do/don’t rules.

OXOT_COMPONENT_CATALOG.md
  Component props, variants, states, accessibility, and permitted usage.

OXOT_SCENARIO_DATA.ts
  Typed synthetic scenario data for the Explorer, Decisions, and Control simulator.

OXOT_CONTENT_MODEL.md
  MDX/CMS schema for Insights, Case Studies, Guides, Glossary, Industries, Assurance.

Storybook or equivalent component sandbox
  Visual regression and state review.

High-fidelity reference captures or Figma
  Approved visual reference for the six foundation deliverables before broad page rollout.
```

---

# 13. Suggested Technical Architecture

```text
Next.js App Router + TypeScript
Tailwind CSS with semantic design tokens
Radix or shadcn accessible primitives
Framer Motion only for meaningful state transitions
SVG/HTML diagrams first; WebGL only if later requirements cannot be met accessibly
MDX for Insights, Case Studies, Guides, and Glossary
Typed content models for industries, assurance frameworks, scenarios, and deployment modes
```

## Component family

| Family | Required components |
|---|---|
| Shell | `SiteHeader`, `MegaMenu`, `MobileNavigation`, `Footer`, `ContactBand`, `ThemeToggle` |
| Editorial | `Eyebrow`, `DisplayHeading`, `SectionHeading`, `Lead`, `EvidenceCitation`, `SourceMeta`, `RelatedResources` |
| Decision | `DecisionSwitchboard`, `ScenarioSummary`, `EvidencePanel`, `ControlOption`, `ResidualRiskRecord` |
| Twin | `TwinExplorer`, `PathOverlay`, `ConsequenceChain`, `LayerCanvas`, `LensSelector`, `EvidenceDrilldown` |
| Proof | `CaseStudyCard`, `CaseStudyMeta`, `DecisionFlow`, `EvidenceArtifact`, `PublicationStatus` |
| Deployment | `DeploymentBoundary`, `DataDiodeFlow`, `GovernancePanel` |

---

# 14. Final Instruction to the Development Team

> Do not build the complete site first.
>
> Build these six experiences as one coherent visual system. Once the Home Hero, Decisions Switchboard, Virtual Control scenario, Architecture Canvas, Case Study template, and Air-Gapped visual feel unmistakably OXOT, compose the remaining sitemap from those approved patterns.
>
> The site must look designed around evidence, systems, dependencies, and decisions—not around a template library.
