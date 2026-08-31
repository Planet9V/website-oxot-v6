# Raw Research Stream: WebSearch (independent pass, agent: research-websearch, model: opus)

Grounded in `OXOT_Visual_Foundation_Spec.md`, `OXOT_Composition_Rules.md`, `OXOT_Mobile_Rules.md`, `OXOT_content-to-visual-mapping-table.md` (all read in full). The restricted files (`OXOT_Component_Inventory.md`, `OXOT_Layout_Styles.md`) were never opened. Research conducted via native WebSearch on Dragos, Claroty, Nozomi, Armis, Microsoft Security Exposure Management, Wiz, AVEVA/Cognite, and the 2026 shadcn/Tailwind ecosystem.

This is raw agent output, saved verbatim for the Step 2 synthesis and Step 3 comparison stages — not yet reconciled with the other two research streams (Perplexity, Valyu).

---

# OXOT Independent Research Pass — Component Inventory & Layout Patterns

## Part 0 — Three findings that shaped everything below

**(a) Every commercial OT product sells a *score*; OXOT sells a *state*.** Nozomi gives each asset a 1–100 risk score rolled up by zone/site/company. Armis Centrix does automated risk scoring correlated across integrated tools. Claroty xDome now ships AI-generated dashboards. All three converge on the same UI: a numeric severity dial plus a sortable table. The OXOT spec explicitly forecloses that route — `OXOT_content-to-visual-mapping-table.md` lists "Traffic-light score alone" under **Avoid** for risk prioritization, and Visual Foundation §3.1 assigns color to *model state* (modelled / pathway / proposed / consequence / validated / unknown), not to magnitude. So the component layer must be **state-encoded, not score-encoded**. This is OXOT's most defensible visual differentiator and should be visible in the first component built.

**(b) The "choke point" concept from cloud attack-path tools maps exactly onto `ProposedControl.closesPathIds`.** Microsoft Security Exposure Management and Wiz both surface *choke points* — nodes where multiple attack paths converge, so one remediation disrupts several scenarios. `ProposedControl` has `closesPathIds: string[]` (plural) alongside `preservesPathIds` and `residualPathIds`. That plural array *is* a choke-point claim. Nothing in the spec names it, but the data model already supports rendering it, and it is the most persuasive frame for "What should we spend?"

**(c) Accessibility constrains the diagram library choice, not just the markup.** React Flow has keyboard shortcuts and made a11y improvements at v2.1, but the accessibility literature is blunt that SVG/HTML diagrams lose their *relational* meaning to screen readers without deliberate semantics, and that hundreds of sequential tab stops make a chart technically reachable but practically unusable — roving tabindex is the required pattern. Combined with Foundation §5 ("Use HTML/SVG/CSS first; do not make WebGL mandatory") and §8 ("do not make a canvas-only architecture graphic"), recommendation is **hand-authored SVG with a shared roving-tabindex primitive, not React Flow**. React Flow's value is user-editable node graphs; OXOT's diagrams are authored, deterministic, and data-driven from `TwinScenario`. Importing a pan/zoom editor to render a fixed scenario adds bundle weight and an a11y surface OXOT would have to re-fix anyway.

## Part 1 — Component Inventory

### Tier 0 — Semantics before pixels
- `signalFor()` — variant resolver (not a component): `(SystemPath.status | SystemAsset.criticality | control phase) → signal token`. §3.1 assigns six semantic colors; §2 forbids "one accent color for all controls, panels, icons, warnings, and CTAs." Implement as a `cva` variant map so Tailwind v4 `@theme` tokens stay the single source.
- `StateLegend` — `views: TwinView[]`, `activeStates: SignalRole[]`. Color must never be the sole encoding channel; persistent, not hover-revealed (Mobile Rules: "Never hide crucial state text behind hover").
- `TechnicalLabel`, `DisplayHeading`, `SectionHeading`, `Lead`, `Eyebrow` — named type roles only (§3.2, forbids ad hoc 10px–16px sizes/opacity).
- `IllustrativeLabel` — renders `TwinScenario.label` (the literal `"Illustrative scenario — no customer data"`) — never hardcode the copy, render the typed field so the type system enforces the claim boundary (§7).

### Tier 1 — Diagram substrate
- `TwinCanvas` — `scenario: TwinScenario`, `view: TwinView`, `proposedControlId?`. Single SVG root, `viewBox`-driven (Mobile Rules: don't shrink a complex SVG until labels become unreadable). Owns roving-tabindex focus; `aria-describedby` → `SelectedStateSummary`.
- `AssetNode` — `asset: SystemAsset` → 9 distinct glyphs (one per `SystemAsset.type` enum value). OT engineers read shape before color; `safety-function` must be unmistakable (§7: OXOT supports but does not replace safety assessment).
- `PathEdge` — `path: SystemPath`, `role` → stroke geometry, `status` → signal color. Two orthogonal encoding channels (role × status) — dual encoding required by a11y guidance.
- `ZoneBand` — groups by `SystemAsset.zone`, `<g>` wrapper with `<title>` for a11y-tree survival (Purdue-layer framing).
- `PathTraceOverlay` — `pathIds: string[]`, honours `prefers-reduced-motion`. The one component licensed for 300–500ms duration per §3.4 ("explains a route, cascade, or changed system state").
- `ChokePointMarker` — derived: paths where `closesPathIds.length > 1` converge. See finding (b) — no spec home currently, flagged as a gap.
- `CanvasScrollFrame` — `summary: ReactNode`. Mobile Rules: horizontal scroll only with visible affordance + alternate summary as required props.

### Tier 2 — Selection and state
- `LensSelector` — `TwinView[]` as Radix Tabs/RadioGroup, generated from the type (§6).
- `useTwinState` — reducer over `{view, scenario, proposedControl}`, URL-synced via **nuqs** (type-safe search-param state for App Router ≥14.2). Spec names this reducer shape verbatim; §8 requires URL state like `?layer=L4`.
- `SelectedStateSummary` — required prop of `TwinCanvas`, text equivalent per §11 ("All diagrams have plain-language text equivalents").
- `EvidencePanel` (desktop) / `EvidenceDrawer` (mobile) — same data, two shells, matching the mandated mobile stack order.
- `ControlToggle` — `control: ProposedControl`, phases `proposed → modelled`. Green only reachable post-simulation, encoded in the type.

### Tier 3 — Decision and consequence
- `DecisionSwitchboard` / `DecisionPanel` — four decisions, one active by default (§6 explicit: "not four equal static cards"; §2 forbids "three equal cards" default).
- `ConsequenceChain` — `Consequence → operationalEffect → safetyOrReliabilityContext? → businessImpact?`. Two optional fields = audience switch (engineer stops at safety/reliability; CFO reads to business impact) in one component.
- `ResidualRouteList` — `residualPathIds`. Honesty signal: residual routes stay visible after a control lands.
- `ConstraintPreservationNote` — `preservesPathIds` + `implementationConstraint`. Differentiator vs. a firewall-rule linter: closes a route while required engineering/diagnostic flows remain available.
- `TriageBoard` — NOW / NEXT / DEFERRED (never "NEVER" — §6 explicit ban on the public label).
- `ReviewConditionCard` — time-bounded exception + review trigger (§6's fourth decision).
- `RiskReductionCurve` — options plotted as consequence-reduction per unit investment. **Flagged tension:** mapping table wants this, but §7 forbids percentages/money/ALE without approved inputs — public instance needs qualitative axes, numeric version reserved for the product.

### Tier 4 — Evidence and provenance
- `EvidenceChip` / `EvidenceTrace` — `Consequence.evidenceIds` drill-down (avoid "Trusted" badge per mapping table).
- `PublicationStatusBadge` — Named / Anonymized / Illustrative (three states, not boolean, per §9).
- `RequirementTraceTable` — requirement → evidence → status (IEC 62443 RTM convention; wrap in `CanvasScrollFrame` when wide).
- `ProofGraphic` — Decision → Constraint → Model → Options → Outcome (§9's literal five-stage graphic).

### Tier 5 — Deployment and sovereignty
- `DeploymentBoundary` — `mode: "island" | "inbound-intelligence" | "sovereign"` (§10's three modes).
- `DataDiodeFlow` — single arrowhead, structurally inbound-only (no direction prop — API cannot express "out"). §10: "no outbound arrow."
- `PassiveSourceList` — approved export types; no agents on PLCs/RTUs/controllers, no active scanning (§10) — the anti-claim vs. DPI-based competitors.
- `GovernancePanel` — identity, roles, audit, update governance, provenance, backup (§10).

### Tier 6 — Shell, editorial, surfaces
`AsymmetricSection` (§2's asymmetric-composition rule as a layout primitive) · four surface components matching §3.3 — `Canvas`, `TechnicalPanel`, `ActiveSystemPanel`, `DecisionPanel` (glass effects reachable only from `ActiveSystemPanel`) · `CaseStudyMeta` · `IndustryRouteRail` (max six routes) · `SiteHeader`/`MegaMenu`/`MobileNavigation`/`Footer`/`ContactBand`/`ThemeToggle`.

**Stack note:** Tailwind v4 with `@theme` in CSS + OKLCH color is the 2026 baseline (all major Next.js starters shipped v4 in Q1 2026). OKLCH matters specifically for the six signal colors needing perceptually even lightness so cyan/green don't read as different importance-weights in dark mode. Take Radix/shadcn primitives (Tabs, RadioGroup, Dialog, Tooltip); do NOT take a shadcn dashboard block library (Kibo, Haze, etc.) — those are built for data-heavy internal tooling and are exactly the "flat catalogue of equal cards" the Foundation brief rejects.

## Part 2 — Eight Named Layout Patterns

1. **Route-and-Consequence Stage** — Home/Platform hero. Asymmetric two-field hero: copy+CTA left, live `TwinCanvas` at rest right (neutral topology default state per §5). Not a screenshot/video. Research: interactive demos outperform passive video (~34% higher conversion); none of Dragos/Claroty/Nozomi/Armis puts a working model in their hero.

2. **Question Switchboard** — Home (abbreviated)/Decisions overview/Platform. Four buyer questions as vertical rail/tablist, one active by default, active panel expands to question→evidence→model action→output→roles→CTA. Per §6 in full. Organizes by *buyer's question* not *capability* — unlike all four competitors, which organize by capability.

3. **Control Bench** — `/decisions/change-safely`, Platform, Case Studies, Industry pages. Three-column bench (Baseline | Proposed control | Decision output) sharing one `TwinCanvas`. `ControlToggle` re-renders red→amber→green in place. Per §7's exact three-panel spec. No competitor shows what a fix *preserves* — `preservesPathIds` is unique territory.

4. **Triage Board** — `/decisions/fix-first`, Industry pages. NOW/NEXT/DEFERRED columns; cards are reachable routes-to-consequence (not CVEs), cross-highlight on adjacent `TwinCanvas`. Deliberate contrast with Dragos's "now next never" and Nozomi's 1-100 scores — OXOT ranks routes-to-consequence, not assets/vulnerabilities.

5. **Strata Canvas** — Platform, Technical Specification. Seven horizontal layer bands (L1 Facility physics → L7 Governance), selectable, plus a persistent "Object Trace" mode illuminating one component across every layer it touches. Per §8 in full, including both interaction models and the `?layer=L4` URL-state requirement.

6. **Proof Spine** — Case studies, Insights, long-form Assurance. Single editorial column, sticky left rail with `CaseStudyMeta`, exactly one primary evidence artifact at section 5, `ProofGraphic` closes. Per §9's ten-section/seven-metadata-field structure.

7. **Enclave Board** — Air-Gapped Deployments, Platform, Defense/Government. Three peer boundary diagrams (Island/Inbound Intelligence/Sovereign) side by side, shared invariant `PassiveSourceList`+`GovernancePanel` beneath (deliberately outside the switcher to signal invariance). Per §10's mode table.

8. **Sector Swap Block** — All six industry pages. Not a new visual — a data contract: same components (`TwinCanvas`+`ConsequenceChain`), different `TwinScenario` per sector, deliberately varied page rhythm so six pages don't read as one template. Per Composition Rules' industry-page requirements and the mapping table's explicit warning: "The visual system will collapse if every industry page hard-codes diagrams differently."

## Part 3 — Flags for the spec owner
1. `RiskReductionCurve` self-tension: mapping table wants a risk-reduction curve; §7 bans percentages/money/ALE without approved inputs. Resolution proposed: qualitative axes publicly, numeric version behind the product — needs an explicit decision.
2. `ChokePointMarker` has no spec home — `closesPathIds` (plural) supports it structurally but no deliverable names the concept. Proposed as an addition to Deliverable 3.

## Sources
Dragos (asset visibility, platform brief, Network Perception segmentation), Claroty (xDome, Purdue-model blog, AI visualization, Pillars Reveal), Nozomi (dynamic risk scoring, Guardian, Vantage), Armis (Centrix, ViPR Pro), Microsoft Security Exposure Management (attack-path review/overview docs), Wiz (attack path analysis academy), Picus (attack path visualization glossary), AVEVA/Cognite (industrial digital twin), OPSWAT (data diodes, air-gap maintenance), Parasoft (IEC 62443 automation), Altium (requirements traceability matrix), FAIR Institute + Kovrr (board-level cyber risk reporting/CRQ), Tailwind v4/shadcn 2026 stack guides, React Flow accessibility (Synergy Codes blog, official API docs), WCAG data-visualization checklists (5of10, A11y Collective, accessibility-test.org), nuqs docs + LogRocket guide, B2B SaaS marketing trend reports (Taboola, Aimers).
