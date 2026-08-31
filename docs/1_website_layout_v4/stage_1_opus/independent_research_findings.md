# OXOT Independent Research Pass — Step 2 Synthesis

**Stage:** `stage_1_opus` Step 2 of 3 · **Inputs:** `raw_research_websearch.md`, `raw_research_perplexity.md` · **Method:** full re-read of both raw streams, full re-read of all seven source spec files, then 11-step sequential reasoning (via `mcp__plugin_everything-claude-code_sequential-thinking__sequentialthinking`) to reconcile.

**Independence statement:** `OXOT_Component_Inventory.md` and `OXOT_Layout_Styles.md` were never opened at any point in Step 1 or Step 2, nor were `OXOT_README.md` or `OXOT_Master_Record.md` (excluded as likely to summarise the existing system). Spec grounding was re-derived from source: `OXOT_Visual_Foundation_Spec.md`, `OXOT_Composition_Rules.md`, `OXOT_Visual_Rules.md`, `OXOT_Mobile_Rules.md`, `OXOT_content-to-visual-mapping-table.md`, `OXOT_Visual QA Checklist.md`, `OXOT_Super_Critical_Reference.md`. Step 3 can therefore treat this document as a genuinely independent alternative to the existing system.

Throughout, provenance is marked: **[both]** · **[WS]** WebSearch only · **[PX]** Perplexity only · **[syn]** produced by this synthesis, in neither stream.

**Note on the third stream:** the planned Valyu stream failed after 3 independent attempts (2 via MCP tool, 1 via raw Python SDK) — all stalled with zero output, while WebSearch and Perplexity both succeeded. Documented as a real environment/tool issue, not silently dropped. This synthesis rests on 2 streams, not 3 — see §5 for the honest accounting of what that costs.

---

## 1. Synthesis narrative

### 1.1 The two instruments, and why the asymmetry matters

The streams were not symmetric, and the asymmetry is load-bearing for how their claims should be weighted.

Perplexity read **seven** spec files; WebSearch read **four**. The three PX read that WS did not include `OXOT_Visual_Rules.md` — which is where the prohibition on *"multiple competing accent colors"* lives. That single file is why PX found the brand-orange collision and WS structurally could not have. Where the two streams make competing claims about **spec compliance**, PX's larger spec surface is the stronger prior.

The reverse holds on research corpus. WS investigated cloud attack-path tooling (Microsoft Security Exposure Management, Wiz) that PX never touched, and that is where the choke-point finding came from — the most commercially useful idea in either document. PX's three-query structure (OT/ICS product UI · regulated-B2B web patterns · digital-twin visuals + accessible SVG) went deeper on accessibility and on the digital-twin market's own segmentation.

Neither document's findings are a superset of the other's. The merge is genuinely additive, which retroactively justifies running two streams rather than one.

### 1.2 Where they converge — treat as settled

Eight findings arrived at independently, by different evidence paths. These need no further research:

1. **Every diagram is hand-authored SVG; never a charting or node-graph library.** WS reached this via React Flow accessibility literature (roving tabindex, the unusability of hundreds of sequential tab stops); PX via a 2024–25 accessibility teardown of shadcn/ui charts (no text alternatives, arrow-key navigation announcing nothing, tooltips violating WCAG 1.4.13). Different libraries, different sources, identical verdict, both anchored to §5's *"Use HTML/SVG/CSS first"* and §8's *"do not make a canvas-only architecture graphic."*
2. **Radix/shadcn for interaction primitives only.** WS: do not adopt a shadcn *dashboard block* library (Kibo, Haze) — they are precisely the "flat catalogue of equal cards" §2 rejects. PX: do not build on shadcn *chart* primitives. Two failure modes of the same shortcut; the combined rule is stronger than either alone.
3. **Nine `AssetNode` glyphs, one per `SystemAsset.type`.** Independently stated by both. Verified against the mapping table: `process-equipment`, `field-device`, `controller`, `hmi`, `engineering-workstation`, `network-device`, `remote-access`, `safety-function`, `service` — exactly nine.
4. **`nuqs` for URL-synced scenario state**, tied to §8's literal `?layer=L4` requirement and §5's `view` / `scenario` / `proposedControl` reducer. Both named the same library unprompted.
5. **Reject the numeric asset risk score.** WS via Nozomi's 1–100 scoring, Armis correlated scoring, Claroty AI dashboards; PX via Claroty/Tenable/Armis/Otorio. PX's formulation is the better one-liner: *OXOT's differentiation is sequencing, not scoring.*
6. **Purdue view must be banded, never force-directed.** PX explicit with vendor evidence (Defender for IoT renders by Purdue layer by default; Tenable exposes `purdueLevel` 1–5; Claroty and Armis band by level); WS implied via `ZoneBand` grouping on `SystemAsset.zone`.
7. **Residual exposure stays visible after a control lands** — and is a *credibility* mechanism, not a completeness one. Both arrived at this non-obvious framing independently.
8. **Four surfaces (glass on active-system only), five type roles, two motion bands.** Both read §3.2/§3.3/§3.4 identically; verified correct against source.

### 1.3 Where they diverge

**Perplexity alone, and material:**

- **The WAI-ARIA Graphics Module (`graphics-aria-1.0`).** Canvas as `role="graphics-document document"`; each asset as `role="graphics-symbol img"` with `aria-roledescription` carrying the `SystemAsset.type` enum and `aria-label` carrying `SystemAsset.label`; fallback roles for ARIA-1.0 assistive tech. This is the single most technically valuable finding in either stream. WS reached for `<title>` on a `<g>` — correct but crude by comparison. PX further notes that no researched competitor does this, converting an accessibility obligation into a differentiation claim for a company whose entire pitch is defensibility.
- **Light-mode contrast failure of the §3.1 signal palette.** WS never opened the question.
- **The `#E58B3F` / `#FF9F43` orange collision.**
- **The five TwinViews require five different *layout algorithms*** — it is a projection problem over one `assets` array, not five diagrams. A real build risk; WS's "same components, different data" framing addresses sectors, not views, and does not cover it.
- **The before/after scrubber, explicitly rejected**, for two reasons: Mobile_Rules' *"Every interactive state must be selectable without drag"*, and — the better argument — a wipe has two states while the model has three (closed / preserved / residual). A scrubber structurally cannot express `preservesPathIds`. WS proposed the same three-column shape but never articulated why the obvious alternative fails.
- **`ProgressiveDetail` with a required `reason` prop**, turning §2's ban on hiding content "only to make a page shorter" into a type error.
- **A dedicated Assurance pattern.** WS has a requirement-trace *component* but no layout pattern for Assurance pages at all — a real hole, since Composition_Rules specifies them explicitly.

**WebSearch alone, and material:**

- **The choke-point frame.** `ProposedControl.closesPathIds` is a *plural* array. Microsoft Security Exposure Management and Wiz both surface choke points as nodes where multiple attack paths converge, so one remediation disrupts several scenarios. That plural array is already a choke-point claim, and it is the most persuasive available answer to "What should we spend?"
- **OKLCH** for the six signal colours, so cyan and green do not read as different importance-weights in dark mode.
- **`IndustryRouteRail` capped at six**, from Composition_Rules' *"Six industry routes maximum."* PX read that file and did not carry the constraint.
- **A dedicated fix-first board pattern.**
- **The hero holds a live model at rest, not a screenshot or video** — with the observation that none of Dragos, Claroty, Nozomi or Armis puts a working model in their hero.

### 1.4 Conflicts, and how each was adjudicated

**Conflict 1 — what does colour encode on a `PathEdge`? (the consequential one)**

WS: `role` → stroke geometry, `status` → signal colour. PX: colour → `role`, stroke pattern → `status`, non-colour glyph → `criticality`.

PX's is better information design but contradicts the spec, demonstrably from source:

- §3.1 binds green to *"closed pathway — **only after a scenario/control result is shown**"*. "Closed" is a `SystemPath.status` value.
- §3.1 binds slate to *"inactive state, **unknown** or legacy condition"*. "Unknown" is a `SystemPath.status` value.
- §5's required-states table, Proposed-control row: *"Amber control inserted; **closed segment turns green after simulation**."* One edge changes colour while its `role` is unchanged — only `status` changed. **This line alone settles it:** if colour were bound to role, a spec-mandated state transition would be unrenderable.

**Adjudication: WS is correct on the axis binding; PX is correct that three axes need three channels.** The resolution is a third answer belonging to neither:

> **Colour ← `SystemPath.status`** (spec-mandated, non-negotiable) · **stroke geometry/dash ← `SystemPath.role`** (four values, four geometries) · **non-colour glyph ← `SystemAsset.criticality`** (three values, and it lives on nodes, not edges, so it never contends).

Three axes, three channels, zero contention, WCAG 1.4.1 satisfied by construction. PX's precedents survive intact — Dragos NP-View's dual-layer visibility and Defender for IoT's star-marker criticality both support dual-channel encoding generally, even though PX assigned the channels the wrong way round.

**Conflict 2 — Tooltip.** WS includes Radix Tooltip; PX pointedly omits it on WCAG 1.4.13 grounds. Resolution: permitted only when hoverable, dismissible and persistent per 1.4.13, and **never** as the sole carrier of state text — Mobile_Rules is unambiguous (*"Never hide crucial state text behind hover"*). Tooltip is progressive enhancement, never a required reading path.

**Conflict 3 — how many type roles.** WS lists five but drops Body and promotes Eyebrow; PX says exactly five. §3.2's table has five: Display, Section heading, Lead, Body, Technical label. **PX correct.** `Eyebrow` is a §13 *Editorial* component that consumes the technical-label role — it is not a sixth type role. Small, but §3.2 exists to prevent ad-hoc sizes, and an unowned sixth role reopens that door.

**Conflict 4 — a shared mis-citation, corrected [syn].** Both streams cite §6 for the lens selector's accessible-control requirement. §6 is Deliverable 2, the *Four Decisions Switchboard*; its "native tab pattern, radio group, or equivalent" rule governs the switchboard, not the lens selector. The lens selector's requirement actually derives from §5 (*"Provide keyboard selection and a text-equivalent scenario summary"*) and §11. The conclusion is unchanged, but a document claiming "§6 requires this" when it does not will be challenged by the spec owner and will cost trust.

**Conflict 5 — is the hero a pattern or a configuration?** WS makes it a peer pattern; PX folds it into the explorer and spends the freed slot on Assurance. PX's allocation is better. But WS's underlying claim is real and worth preserving. Resolution: the hero becomes a named **configuration** of the explorer pattern. Keeps WS's positioning insight and PX's slot allocation.

### 1.5 The structural problem both streams share [syn]

**§13 already supplies roughly thirty canonical component names, and both streams invented parallel names on top of them.**

WS used spec names for `LensSelector`, `DecisionSwitchboard`, `ConsequenceChain`, `CaseStudyMeta`, `DeploymentBoundary`, `DataDiodeFlow`, `GovernancePanel` and the Shell set — but invented `TwinCanvas` (spec: `TwinExplorer`), `SelectedStateSummary` (spec: `ScenarioSummary`), `ProofGraphic` (spec: `DecisionFlow`), `ResidualRouteList` (spec: `ResidualRiskRecord`), `PathTraceOverlay` (spec: `PathOverlay`), `PublicationStatusBadge` (spec: `PublicationStatus`).

PX used spec names for `ConsequenceChain`, `EvidencePanel`, `EvidenceDrilldown`, `ControlOption`, `DecisionFlow`, `PublicationStatus`, `DeploymentBoundary`, `GovernancePanel` — but invented `SystemCanvas` (spec: `TwinExplorer`), `ViewSelector` (spec: `LensSelector`), `StateSummary` (spec: `ScenarioSummary`), `ResidualRecord` (spec: `ResidualRiskRecord`), `PathTrace` (spec: `PathOverlay`).

Both drifted in the same places; each got right what the other got wrong. So the synthesis rule writes itself:

> **Where §13 names a component, use §13's name. Invent only where §13 is silent.**

Applied, this resolves roughly a dozen naming collisions with no judgement calls, and makes the final inventory auditable against the spec by anyone.

**Corollary — a shared blind spot.** Four components §13 names that *neither* stream carried at all: `EvidenceCitation`, `SourceMeta`, `RelatedResources`, `CaseStudyCard`. All four sit in the Editorial/Proof layer. Both streams over-invested in the diagram substrate and under-covered the Resources surface — which is exactly the layer Composition_Rules warns must *not* reuse the Platform visual language, and therefore the layer most at risk of neglect.

---

## 2. Reconciled component inventory

Ordered by build dependency. §13 names used wherever the spec supplies one.

### Tier 0 — Tokens and resolvers

| Component | Contract | Provenance |
|---|---|---|
| `tokens.css` | §3.1 palette extended with **per-surface signal pairs** (`--signal-cyan-on-dark` / `-on-light`), expressed in **OKLCH** so hue holds constant per semantic role while lightness varies per theme. Plus spacing scale, `--focus-ring`, `--target-min: 44px`. | [syn] — PX's requirement + WS's mechanism |
| `signalFor()` | Variant resolver, not a component: `(SystemPath.status \| SystemAsset.criticality \| control phase) → signal token`. Implement as a `cva` variant map so Tailwind `@theme` tokens remain the single source. | [WS] |
| `TypeRole` | Exactly five variants: display / section / lead / body / technical-label. §3.2 forbids ad-hoc sizes; the component makes that mechanically enforceable. | [PX] |
| `Surface` | Four variants per §3.3: canvas / technical / active-system / decision. Only `active-system` receives `--panel-blur`. | [both] |
| `MotionScope` | Duration bands: ui 160–280ms, explanatory 300–500ms, both → 0 under reduced motion. JS path-tracing needs a runtime `matchMedia` read so it snaps rather than animates. | [PX] |
| `FocusRing` | Ring + ring-offset with theme-matched offset colour — must be tokenised per theme or focus rings vanish on dark panels. WCAG 2.2 §2.4.11, §2.4.13. | [PX] |

### Tier 1 — Diagram substrate (SVG; nothing here wraps a library)

| Component | Contract | Provenance |
|---|---|---|
| `TwinExplorer` | Root SVG, `viewBox`-driven, `role="graphics-document document"`. Owns coordinate space and the roving-tabindex ring; `aria-describedby` → `ScenarioSummary`. | [both] + PX's ARIA roles |
| `LayerCanvas` | Seven-layer variant of the same substrate. Accessible HTML/SVG per §8; never canvas-only. | [both] |
| `AssetNode` | Nine distinct glyphs switched on the `SystemAsset.type` enum. `role="graphics-symbol img"`, `aria-roledescription` = type, `aria-label` = label. A generic rounded rect is the "random node graph" the mapping table forbids. `safety-function` must be unmistakable. | [both] |
| `CriticalityMark` | Non-colour marker for context / important / critical. Precedent: Defender for IoT's starred device, orthogonal to alert colour. | [PX] |
| `PathEdge` | **Colour ← `status`, stroke geometry ← `role`, arrowhead ← direction.** See §1.4 Conflict 1. | [syn] |
| `PathOverlay` | Route animation in the 300–500ms band. Reduced motion → full route instantly plus an ordered-step text overlay. | [both] |
| `ZoneBand` | Purdue banding by `SystemAsset.zone`; `<g>` wrapper with `<title>` for a11y-tree survival. Cross-band traffic only through named conduits. **Never force-directed in the Purdue view** — it destroys the property the view exists to show. | [both], PX sharper |
| `ConduitGate` + `ChokePointMarker` | Boundary crossing as a first-class object, because `ProposedControl.type: "segmentation" \| "brokered-access"` inserts *at* a boundary, not at a node. `ChokePointMarker` is a derived annotation on it where `closesPathIds.length > 1` converge. **No spec home — see §4.** | [syn] — merges PX's ConduitGate with WS's choke point |
| `ControlOverlay` | Amber insertion; reads `closesPathIds` / `preservesPathIds` / `residualPathIds` and restyles those three edge sets. | [PX] |
| `CanvasLegend` | Shows **only** the encodings currently on screen — a three-axis encoding is unreadable without one. Persistent, never hover-revealed. | [both] |
| `ScenarioSummary` | §11's mandatory text equivalent. §5's required-states table already dictates the sentence templates (*"A route exists from [entry] to [asset]"*) — implement as a template function over typed data, never hand-written copy per page. | [both], PX's framing |
| `WideScrollRegion` | Horizontal scroll for the three cases Mobile_Rules permits, with visible affordance **and** alternate summary as *required* props. | [both] |

### Tier 2 — State and selection

`LensSelector` (five `TwinView` values as an accessible tablist/radiogroup — requirement from §5/§11, not §6) · `ScenarioProvider` (typed context, deterministic reducer on §5's three keys, synced to searchParams via nuqs; on state change, move focus to the summary region and announce via live region) **[PX]** · `EvidencePanel` (desktop) with a drawer shell on mobile, matching Mobile_Rules' mandated five-step stack · `ControlOption` · `ProgressiveDetail` (requires a `reason` prop — §2 forbids hiding content "only to make a page shorter", while §8 mandates progressive disclosure for protocol detail) **[PX]**.

### Tier 3 — Decision and consequence

`DecisionSwitchboard` (four decisions, one active by default — §6 is explicit that this is *"a switchboard, not four equal static cards"*, and Visual_Rules independently bars "more than three visually equal cards") · `ConsequenceChain` (`operationalEffect → safetyOrReliabilityContext? → businessImpact?` — **the two optional fields are the audience switch**: the engineer stops at safety/reliability, the CFO reads through to business impact, in one component) **[WS insight]** · `ResidualRiskRecord` · `ConstraintPreservationNote` (`preservesPathIds` + `implementationConstraint` — the differentiator versus a firewall-rule linter: it closes a route while required engineering and diagnostic flows remain available) **[WS]** · `PriorityBoard` (NOW / NEXT / deferred; never "NEVER" publicly per §6) · `ReviewConditionCard` (time-bounded exception plus review trigger) **[WS]** · `RiskReductionCurve` (**flagged — see §4**).

### Tier 4 — Evidence and provenance

`EvidenceDrilldown` (claim → artefact → source → date; of every product researched, only Bentley iTwin visually depicts provenance — open ground for a company selling defensible evidence) **[PX]** · `EvidenceArtifact` · `EvidenceCitation` **[§13, neither stream]** · `SourceMeta` **[§13, neither stream]** · `PublicationStatus` (three states — Named / Anonymized / Illustrative — not a boolean; the one badge the system permits, because it *constrains* a claim rather than asserting trust) · `ClaimBoundaryNote` (renders the typed `TwinScenario.label` — never hardcode the copy, render the field so the type system enforces the claim boundary) **[both]** · `AuthorityNote` (§7's *"supports but does not replace engineering approval"*, required wherever a `safety-function` asset appears) **[PX]** · `RequirementTrace` (columns: Requirement ID · Summary · What OXOT provides · Evidence artefact · Status. Clause granularity **is** the credibility — a "62443 compliant" badge is now a negative signal to this buyer. The Status column must be honest: partial and not-covered rows are what make covered rows believable) **[merged]** · `DecisionFlow` (§9's literal Decision → Constraint → Model → Options → Outcome graphic, one component reused verbatim).

### Tier 5 — Deployment and sovereignty

`DeploymentBoundary` (`mode: "island" | "inbound-intelligence" | "sovereign"`) · `DataDiodeFlow` (**no direction prop** — the API cannot express "out"; §10 requires "no outbound arrow", so make it structurally unrepresentable) **[WS, excellent]** · `PassiveSourceList` (approved export types; no agents on PLCs/RTUs/controllers, no active scanning — the anti-claim versus DPI-based competitors) **[WS]** · `GovernancePanel` (identity, roles, audit, update governance, provenance, backup).

### Tier 6 — Shell and editorial

§13 Shell set (`SiteHeader`, `MegaMenu`, `MobileNavigation`, `Footer`, `ContactBand`, `ThemeToggle`) · `Eyebrow`, `DisplayHeading`, `SectionHeading`, `Lead` · `CaseStudyCard` **[§13, neither stream]** · `CaseStudyMeta` (seven fields incl. Publication status, Last reviewed) · `RelatedResources` **[§13, neither stream]** · `AsymmetricSection` (§2's asymmetric-composition rule as a layout primitive) **[WS]** · `IndustryRouteRail` (max six routes per Composition_Rules) **[WS]**.

### Deliberately excluded

Each is shipped by a named competitor and forbidden by a named spec clause:

- Numeric asset risk score — Claroty / Armis / Otorio / Nozomi. `PriorityBoard` replaces it. (mapping table: "Traffic-light score alone" → Avoid)
- Severity heat-map dashboard tile — Tenable. (Composition_Rules: Assurance pages take "no sales-style dashboard blocks")
- Customer-logo wall — §9.
- ALE / percentage / money counter — §7.
- Generic equal-card grid — §11, Visual_Rules.
- Auto-rotating carousel — §2.
- shadcn **chart** primitives — accessibility. **[PX]**
- shadcn **dashboard block** libraries (Kibo, Haze) — they are the flat catalogue of equal cards §2 rejects. **[WS]**
- Before/after scrubber — cannot express three states. **[PX]**

---

## 3. Reconciled layout patterns

Sixteen proposals across the two streams collapse to **nine confirmed plus one provisional**. Names favour whichever states the information job most plainly; PX's names generally do, and are adopted where so.

**1. Lens Bench** — *lens strip / canvas / state-and-evidence column.* ← PX Lens Bench + WS Route-and-Consequence Stage, folded in as its **Hero Stage** configuration.
The same `assets` array projected five ways — a projection problem, not five diagrams. Each view needs a *different layout algorithm*: purdue = strict banding by zone; network = topology on `SystemPath`; process = material/energy order; attackPath = network plus traced `attackPathIds`; consequence = collapse to chain. One force-directed layout serving all five loses the meaning of every one. Mobile → Mobile_Rules' mandated five-step stack. The Hero Stage configuration holds the canvas in §5's Default "neutral system topology" state — a live model at rest, never a screenshot or video; no surveyed competitor does this. *Home, Platform, every Industry page.*

**2. Question Switchboard** — *four questions as a vertical rail, one deep asymmetric panel.* The only name both streams chose independently, which is itself evidence it is the right one. Organises by **buyer question**, not by capability — unlike all surveyed competitors. Per §6 in full: four fixed routes, six-step chain, one active by default, "Accept or defer" never "NEVER". *Home (abbreviated), Decisions overview, Platform.*

**3. Three-Gate Ledger** — *three unequal columns over one shared canvas.* ← PX + WS Control Bench. Baseline (widest, red) / Proposed control (amber) / Decision output (narrowest, densest). §7's required-panels table dictates all three contents verbatim. Evidence: Baymard found 67% of participants used side-by-side spec comparison; AWS Cloudscape caps useful comparison at ~5 decision-relevant attributes — §7 specifies 5/4/5, within budget, do not grow it. **The scrubber is rejected on principle**, and no competitor shows what a fix *preserves*. *`/decisions/change-safely`, Platform, Case Studies, Industry pages.*

**4. Sequencing Board** — *NOW / NEXT / deferred columns, cross-highlighting an adjacent canvas.* ← WS Triage Board + PX PriorityBoard. **Renamed [syn]:** "Triage" imports the severity-score connotation the pattern exists to reject. Cards are reachable routes-to-consequence, not CVEs or assets. *`/decisions/fix-first`, Industry pages.*

**5. Depth Rail** — *seven layers vertical, L1 bottom → L7 top, four-part panel per layer, plus Object Trace mode.* ← PX + WS Strata Canvas. The two modes answer opposite questions — *what is in this layer?* versus *where does my pump live?* — and §8 requires both, along with `?layer=L4` URL state. *Platform, Technical Specification.*

**6. Boundary Frame** — *one fixed enclosure, three modes, only the arrows change.* ← PX + WS Enclave Board. Arrow topology is the entire semantic payload (none / one inbound / defined integrations). The mandatory-elements panel sits **outside** the mode switcher, so invariance is structurally signalled rather than asserted — the passive-first claim must never read as mode-conditional. Defense examples notional and synthetic only. *Air-Gapped Deployments, Platform, Defense & Government, Contact qualification.*

**7. Evidence Spine** — *long-form single column, sticky metadata spine, exactly one full-bleed artefact at the hinge.* ← PX + WS Proof Spine. The artefact lands between §9's step 5 (pathway discovered) and step 6 (options tested) — the moment the reader's model changes. Closes on `DecisionFlow`. **Intentionally the least interactive pattern in the system:** the tonal shift is the point, and it directly serves Composition_Rules' instruction that Resources must not use the Platform visual language everywhere. Proof should read as documentation, not as product. *Case studies, Insights, long-form Assurance.*

**8. Requirement Trace** — *framework selector plus dense trace table, diagrams inline between clusters.* [PX-only pattern; WS had the component but no Assurance composition.] No tiles, no scores, no gauges. Row granularity is the credibility. *Assurance.*

**9. Sector Cutaway** — *operational problem in the operator's own units first (never OXOT's) → sector system model → one worked scenario reusing Lens Bench → sector CTA.* ← PX + WS Sector Swap Block. Not a new visual — **a data contract**: same components, six authored `TwinScenario`s. The mapping table warns that *"the visual system will collapse if every industry page hard-codes diagrams differently"*; PX supplies the acceptance test — **if two industry pages look identical, the scenario data was not actually authored.** *All six Industry pages.*

**10. Engagement Timeline — PROVISIONAL.** *Time-axis engagement journey.* Mandated by Composition_Rules (*"Use timeline or engagement journey. No deep seven-layer architecture."*) but supported by **zero research** in either stream. PX flagged the gap and declined to name a ninth pattern; this synthesis names it provisionally instead, so it appears in the coverage matrix rather than being silently absent — with its evidence basis marked spec-only and requiring its own research pass. *Consulting.*

### Coverage matrix (anchored to §4 + Composition_Rules)

| Page | Pattern | Status |
|---|---|---|
| Home | Lens Bench (Hero Stage) + Question Switchboard + Three-Gate Ledger + Sector Cutaway | covered |
| Platform | Lens Bench + Question Switchboard + Three-Gate Ledger + Depth Rail + Boundary Frame | covered |
| Consulting | Engagement Timeline | **provisional** |
| `/decisions` overview | Question Switchboard | covered |
| `/decisions/change-safely` | Three-Gate Ledger | covered |
| `/decisions/fix-first` | Sequencing Board | covered |
| `/decisions/investment` | — | **GAP** |
| `/decisions/risk-acceptance` | — | **GAP** |
| Industries (×6) | Sector Cutaway + Lens Bench | covered |
| Assurance | Requirement Trace | covered |
| Resources / Case Studies | Evidence Spine | covered |
| Air-Gapped / Defense | Boundary Frame | covered |
| Contact | Boundary Frame (reuse) | thin |

---

## 4. Flagged conflicts and gaps

### A. Brand orange `#E58B3F` vs `--signal-amber #FF9F43` — CONFIRMED, worse than first stated [PX, escalated]

Verified: §3.1 sets `--signal-amber: #FF9F43` and binds amber to *"Decision pending or proposed control."* Visual_Rules bars *"Multiple competing accent colors"*; §2 bars *"one accent color for all controls, panels, icons, warnings, and CTAs."*

An identity orange that is **near but not equal to** signal amber is the worst possible case — close enough to read as the same colour, different enough to function as a second accent.

**Fix:** a separate `--brand-orange` token reserved for identity, never used as a signal. **Escalation [syn]:** because §3.3 gives amber an entire *surface* type ("Decision panel — Amber highlight for proposed control"), brand orange must additionally be barred from panel chrome, not merely from strokes and icons. **Requires a design-owner decision.**

### B. Light-mode signal contrast failures — CONFIRMED, and a Phase-1 gate blocker [PX, escalated]

§11 mandates *"light mode is not an afterthought"* and WCAG 2.2 AA contrast. But §3.1's signals are tuned for `--ink-900`. Against `--paper-50 #F5F8F7`, PX measured `--signal-cyan #36D8D1` at ≈1.8:1 and `--signal-amber #FF9F43` at ≈2.2:1 — both below the 3:1 non-text minimum (WCAG 1.4.11). Separately `--signal-slate #536761` on `--ink-900` is ≈3:1: acceptable as a stroke, failing as body text.

**Escalation neither stream made [syn]:** §11's implementation order puts *"Design tokens and shell"* at **Phase 1**, gated on *"Dark/light themes, typography roles, semantic color … approved."* This is not later cleanup — it blocks the **first** approval gate, before a single Explorer component is written.

**Fix, merged from both streams [syn]:** each signal needs a per-surface pair (`-on-dark` / `-on-light`). PX supplied the requirement — *"lightness must differ per theme while hue identity stays constant"*; WS independently supplied the mechanism — OKLCH. Neither noticed the other half. Together the remedy is concrete: express all six signals in OKLCH, fix hue per semantic role, vary lightness per surface, and equalise lightness *across* the six within each theme so cyan and green do not read as different importance-weights. That is the difference between "shares semantic tokens" and "shares hex values."

### C. `RiskReductionCurve` self-tension — CONFIRMED [WS named it; PX hit the same wall]

The mapping table prescribes *"Investment decision → Risk-reduction curve."* §7 forbids *"percentages, money values, annual loss, or 'verified' language unless inputs and public approval exist."*

Proposed resolution: qualitative axes on the public site, the numeric version reserved for the product behind approved inputs. **Requires an explicit owner decision** — this is the one place where two spec documents give incompatible instructions.

### D. `ChokePointMarker` / `ConduitGate` has no spec home — CONFIRMED [WS gap, PX adjacent]

`ProposedControl.closesPathIds` is plural and structurally supports a choke-point claim, but no deliverable names the concept. PX arrives at the same territory from a different direction: `ProposedControl.type` of `"segmentation"` or `"brokered-access"` inserts *at* a boundary, not at a node, so a boundary must be a first-class object. **Proposed as an addition to Deliverable 3.**

### E. Three page-level coverage gaps [syn — visible only by crossing §6 × mapping table × §7]

- **`/decisions/investment` — the most serious gap.** The buyer question with the clearest commercial pull has no layout pattern in either stream, *and* its mapping-table-prescribed visual is the one §7 partially forbids. **Proposed resolution:** this is exactly where WS's choke-point finding lands. "One control closes several paths" is a spend argument that needs no money axis — the page should argue from `closesPathIds` cardinality rather than from currency, which satisfies the mapping table's intent while staying inside §7's claim boundary.
- **`/decisions/risk-acceptance`** — `ReviewConditionCard` exists as a component; no composition. §6 supplies the constraint but no layout.
- **Consulting** — see pattern 10.
- **Contact** — §4 lists "Contact qualification" as a reuse site for the Air-Gapped visual; neither stream composed the page.

### F. Out-of-plane scope gap [syn]

Neither stream mentioned **§12 Required Handoff Artifacts** at all. It names four, including `OXOT_CONTENT_MODEL.md` — the MDX/CMS schema for Insights, Case Studies, Guides, Glossary, Industries and Assurance. Both streams stayed entirely in the component/layout plane and produced no content-model view, consistent with their shared editorial-layer blind spot (§1.5). Flag as scope for a later pass, not a defect of either stream.

---

## 5. Note on the absent Valyu stream

The third planned stream (Valyu) failed after three attempts on tool/network grounds. This synthesis therefore rests on **two** streams, not three. The precise cost is worth stating rather than waving at:

- **Two streams can converge or conflict, but they cannot vote.** Where the streams disagreed, adjudication fell to the spec — which worked here only because *every* conflict encountered happened to be spec-decidable (§1.4). Had a conflict turned on pure design judgement with no spec line to appeal to, two streams would have deadlocked with no tiebreaker.
- **Valyu was the academic/technical-literature instrument**, so its absence is felt most precisely on the accessibility and colour-science findings. **PX's contrast ratios and WS's OKLCH recommendation are each single-sourced and unreplicated** — and both feed directly into the Phase-1 token gate.

That is the honest accounting: **the two flagged palette conflicts, which are the most expensive items in the system to get wrong, are also the items with the thinnest corroboration.**

**Recommendation:** re-measure the light-mode contrast ratios with an actual contrast tool against the real `--paper-50` / `--paper-100` / `--paper-200` surfaces before the Phase-1 approval gate, rather than trusting a single research pass. This is cheap to do and removes the synthesis's largest unverified dependency.

### Confidence tiers for downstream use

| Tier | Contents |
|---|---|
| **Settled** — both streams, independent evidence, verified against spec | Hand-authored SVG · Radix primitives only · 9 asset glyphs · 5 TwinViews · 4 surfaces / 5 type roles / 2 motion bands · no numeric risk score · banded Purdue · residual exposure visible · nuqs URL state |
| **Adjudicated** — streams conflicted, resolved against source | PathEdge three-channel encoding · Tooltip conditional · five type roles not six · §6 mis-citation corrected · hero as configuration · §13 naming precedence |
| **Single-stream, high value, unreplicated** | ARIA Graphics Module [PX] · choke points [WS] · light-mode contrast [PX] · orange collision [PX] · OKLCH [WS] · five-layout-algorithms [PX] · scrubber rejection [PX] |
| **Open — needs owner decision** | Orange token · light-mode palette · RiskReductionCurve numeric ban · ChokePointMarker spec home · investment / risk-acceptance / consulting compositions |

---

*End of Step 2 synthesis. Step 3 compares this against `OXOT_Component_Inventory.md` and `OXOT_Layout_Styles.md`, which remained unread throughout Steps 1 and 2.*
