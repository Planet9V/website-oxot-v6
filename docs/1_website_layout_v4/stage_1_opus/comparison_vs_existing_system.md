# Step 3 — Independent Synthesis vs. Existing System: Structured Comparison

**Files compared**
- Independent: `stage_1_opus/independent_research_findings.md`
- Existing: `../OXOT_Component_Inventory.md`
- Existing: `../OXOT_Layout_Styles.md`

**Method note:** Spec citations were not taken on trust. Every claim below marked "confirmed" was re-read in `OXOT_Visual_Foundation_Spec.md`, `OXOT_Composition_Rules.md`, `OXOT_Visual_Rules.md`, `OXOT_Mobile_Rules.md`, or `OXOT_content-to-visual-mapping-table.md`, with line numbers given. The light-mode contrast ratios were recomputed independently from the raw hex values rather than repeating either pass's figures.

---

## 0. The headline finding, stated up front

**These two documents are not two answers to the same question, and that is the most important thing about the comparison.**

- The **existing** `OXOT_Component_Inventory.md` answers: *"Which npm packages and shadcn primitives do we need to install?"* Its deliverables are `@tanstack/react-table`, `recharts`, `embla-carousel-react`, `@radix-ui/react-slider`, MagicUI additions — with an implementation status table showing them already scaffolded and building (111/111 pages).
- The **independent** synthesis answers: *"Which OXOT domain components exist, what are their prop contracts, and what does each one encode?"* Its deliverables are `TwinExplorer`, `PathEdge`, `ControlOverlay`, `ResidualRiskRecord`, `RequirementTrace` — the §13 Component family.

The Foundation Spec §12 (line 510-511) names the required artifact as:

> `OXOT_COMPONENT_CATALOG.md` — **Component props, variants, states, accessibility, and permitted usage.**

The existing inventory claims that status in its own header ("the `OXOT_COMPONENT_CATALOG.md` artifact named in `OXOT_Visual_Foundation_Spec.md` Section 12"). **It does not meet that description.** It is an excellent dependency-selection document and a genuinely useful one — but it contains no component props, no variants, no states, and its "permitted usage" section is a set of cross-document guardrails rather than a per-component contract.

The quantitative version of this, checked mechanically against all 32 names in §13's Component family table (spec lines 542-549):

| | §13 canonical names appearing | Coverage |
|---|---|---|
| Existing system (both docs combined) | 6 of 32 — `Eyebrow`, `DisplayHeading`, `SectionHeading`, `Lead`, `EvidenceCitation`, `SourceMeta`, all in a single passing sentence about MDX blog layout | **19%** |
| Independent synthesis | 32 of 32, plus a stated precedence rule | **100%** |

Zero of the Shell family, zero of the Decision family, zero of the Twin family, zero of the Proof family, zero of the Deployment family appear anywhere in the existing two documents.

Everything below should be read in that light: the two processes overlap far less than the framing of this task assumes, and where they *do* overlap, they mostly agree.

---

## 1. Convergence — where two independent processes landed in the same place

These are the strongest signals in the whole exercise. Each was reached by a different research route and each is verifiable against spec.

| Finding | Existing system | Independent pass | Spec anchor (verified) |
|---|---|---|---|
| **Diagrams stay hand-authored SVG/HTML; no charting or node-graph library** | Inventory row: "Stay custom-built (SVG/HTML)… web research explicitly found nothing" | Tier 1 entire: "nothing here wraps a library" | Spec line 535 & 246: "SVG/HTML diagrams first"; "Use HTML/SVG/CSS first" |
| **The nine `SystemAsset.type` values are a first-class design primitive** | Pattern 3 Asset-Class Bento: "Each cell **is one of the 9 real `SystemAsset.type` values**" | `AssetNode`: "Nine distinct glyphs switched on the `SystemAsset.type` enum" | Mapping table lines 31-40 — exactly nine, confirmed |
| **Generic engineering glyphs, never a rounded icon pack** | "single-color, line-drawn engineering glyphs… never Lucide's default rounded-icon-pack look" | "A generic rounded rect is the 'random node graph' the mapping table forbids" | Mapping table line 6: "Network path → Topology/pathway overlay / **Avoid:** Random node graph" |
| **Two motion bands: 160-280ms UI, 300-500ms diagrams; retime all third-party defaults** | Guardrail: "no third-party component's shipped default animation timing is used as-is"; plus an explicit resolution of the Eleken 300ms accordion recommendation *against* OXOT's tighter band | `MotionScope`: "ui 160-280ms, explanatory 300-500ms, both → 0 under reduced motion" | §3.4 |
| **No numeric risk score / no traffic-light dot** | "no bare ✓/— checkmarks, no unlabeled red/amber/green light" | "Reject the numeric asset risk score… `PriorityBoard` replaces it" | Mapping table line 7: **Avoid** "Traffic-light score alone" |
| **Every state carries a text equivalent, not colour alone** | Repeated across patterns 1, 4, 6, 8 | `ScenarioSummary` as §11's mandatory text equivalent | §5 line 249: "Provide keyboard selection and a text-equivalent scenario summary" |
| **Resources must not reuse the Platform visual language** | Pattern 8 Case File Index: "deliberately its own visual identity, not Asset-Class Bento reused" | Evidence Spine: "intentionally the least interactive pattern… Proof should read as documentation, not as product" | Composition Rules line 38 |
| **Assurance takes no dashboard blocks; Consulting takes no seven-layer architecture** | Both stated as binding guardrails | Requirement Trace ("no tiles, no scores, no gauges"); Engagement Timeline | Composition Rules lines 23, 34 |
| **The claim boundary is load-bearing and must be visible, not implied** | Pattern 1 & 2 guardrails; Pattern 8's two-variant fix | `ClaimBoundaryNote`, `PublicationStatus` | §7 line 343 |
| **Purdue/layer stacking is semantic, not decorative** | Pattern 4's foundation-to-roofline metaphor "isn't decorative, it's load-bearing" | `ZoneBand`: "Never force-directed in the Purdue view — it destroys the property the view exists to show" | §5 required-states, Purdue row |

Ten independent convergences, all spec-verifiable. **Treat every row in this table as settled and stop re-litigating it.** Whichever document the team works from, these carry over unchanged.

There is also a notable convergence on *method*: both processes independently concluded that the visual system's identity must derive from the product's own data contract rather than from a block library. The existing system phrases it as "a page built from these should be recognizable as OXOT with the logo cropped out"; the independent pass phrases it as "if two industry pages look identical, the scenario data was not actually authored." Same principle, two idioms.

---

## 2. Divergence

### 2.1 Divergences where one side is demonstrably right

#### (a) `NOW / NEXT / NEVER` — the existing system violates an explicit prohibition

**The existing system is wrong, and this is the single most serious defect found in it.**

`OXOT_Layout_Styles.md` Pattern 7 (Decision Ledger) uses NOW/NEXT/NEVER as its core vocabulary — line 73 ("NEVER is a slate stamp with a strike-through") and line 75 ("never one repeated per row or per NOW/NEXT/NEVER column"). `OXOT_Component_Inventory.md` line 66 does the same ("NOW-NEXT-NEVER + Consequence Index").

Foundation Spec line 297, §6:

> - Do not call the fourth category **"NEVER"** publicly. Use **Accept or defer** and state review conditions.

The entire spec set was grepped: the string `NEVER` appears **exactly once**, and that occurrence is the prohibition itself. The mapping table (line 7) independently uses the correct vocabulary: *"NOW / NEXT / **deferred** board."*

The independent pass gets this right without being prompted — `PriorityBoard` is specified as "NOW / NEXT / deferred; never 'NEVER' publicly per §6", and the layout pattern is named **Sequencing Board** precisely because "Triage imports the severity-score connotation the pattern exists to reject."

**Three review rounds did not catch this.** It sits in the reviewed text of a pattern that was graded four separate times.

#### (b) Pattern 2 "Baseline/Virtual-Control Reticle" is a two-pane control claiming to be a three-panel deliverable

Existing Pattern 2 states (line 32): *"Serves: Baseline vs Virtual Control (Foundation Deliverable 3) — **this pattern *is* that deliverable**, not a stand-in for it."*

Foundation Spec §7, lines 327-331, "Required information panels":

| Baseline | Proposed control | Decision output |
|---|---|---|
| Entry point, intermediate systems, target asset, consequence chain, known constraints | Control inserted in the model, routes affected, required flows preserved, residual exposure | Recommended sequence, evidence needed, implementation window, validation condition, responsible role |

Three panels, contents dictated verbatim. The Reticle is two panes, and its two panes are **"as documented" vs "as modelled"** — a documentation-accuracy claim ("see exactly where the drawings were wrong", "3 discrepancies found"). That is a different proposition from §7's, which is *baseline route vs. inserted candidate control*. The Reticle has no Decision output panel at all: no recommended sequence, no implementation window, no responsible role.

The independent pass's **Three-Gate Ledger** — "three unequal columns over one shared canvas… §7's required-panels table dictates all three contents verbatim" — matches the spec exactly.

**The independent pass is right, and its reasoning is stronger than the existing system realises.** Both processes independently found the WCAG 2.5.7 dragging problem on this control (existing system's round-3 review; independent pass via `OXOT_Mobile_Rules.md` line "Every interactive state must be selectable without drag"). The existing system patched it — step buttons, tap-to-position, an enumerated focusable delta list, three rounds of accumulating fixes. The independent pass rejected the pattern class outright, with an argument the existing system never engages:

> a wipe has two states while the model has three (closed / preserved / residual). A scrubber structurally cannot express `preservesPathIds`.

That maps onto the real data contract: `ProposedControl` (mapping table lines 63-71) carries `closesPathIds`, `preservesPathIds`, `residualPathIds` — three arrays. A two-position wipe cannot render three. **The accessibility problem was a symptom; the expressiveness problem is the disease, and only the independent pass diagnosed it.**

#### (c) The existing system invents four colour tokens that do not exist

`OXOT_Layout_Styles.md` uses `--pathway`, `--modelled`, `--consequence`, and `--proposed` (lines 14, 17, 26). Every spec file was grepped. **None of these tokens exist anywhere.** The canonical names, Foundation Spec lines 79-84, are `--signal-cyan`, `--signal-blue`, `--signal-amber`, `--signal-red`, `--signal-green`, `--signal-slate`.

Worse, the invented names are *semantic role descriptions* being used as *token identifiers* — `--consequence` is used to mean amber, but amber's spec meaning (line 91) is "Decision pending or proposed control", while consequence is **red** (line 92). The round-3 Fable review caught the resulting confusion at the level of the individual pattern (line 17: "amber is defined as *proposed/pending decision* — painting an already-breached target amber reads as 'proposed remediation'") but never noticed that the token name itself was fabricated and that the fabrication is what caused the confusion.

The independent pass uses `--signal-*` throughout, correctly.

#### (d) The Case File Index fix names a mechanism the type system forbids

Existing `OXOT_Layout_Styles.md` line 87 — presented as "the single most serious finding across all 8 patterns" — resolves the false-disclaimer problem this way:

> This must be a data field (`TwinScenario.label` already carries the illustrative marking… **real case studies simply don't set it**), never a hardcoded template string.

Mapping table line 76:

```ts
label: "Illustrative scenario — no customer data";
```

That is a **required field with a single literal type**. You cannot "simply not set it" on a `TwinScenario` — omitting it is a type error, and setting it to anything else is also a type error. The fix as written is not implementable against the actual contract.

The diagnosis was excellent; the remedy is broken. The independent pass's structure works: `PublicationStatus` as a **three-state field** (Named / Anonymized / Illustrative — "not a boolean; the one badge the system permits, because it *constrains* a claim rather than asserting trust"), with `ClaimBoundaryNote` rendering the typed `TwinScenario.label` where a scenario genuinely is illustrative. Real case studies are `CaseStudyCard`/`CaseStudyMeta` records, not `TwinScenario`s — so the two never collide.

#### (e) `recharts` is mapped to the wrong deliverable

Existing inventory line 56: *"charts/graphs primarily serve Baseline vs Virtual Control (risk-reduction curve)."* But §7 (Baseline vs Virtual Control) contains no curve, and §7 line 344 forbids *"percentages, money values, annual loss"*. The mapping table (line 8) assigns the risk-reduction curve to **Investment decision**, a different deliverable entirely. So `recharts@2.15.4` — carrying acknowledged upstream-deprecation tech debt — is installed against a deliverable mapping that does not hold.

The independent pass flags the same underlying tension more precisely (Flag C) and does not install anything on the strength of it.

### 2.2 Divergences that are genuine judgment calls

| Question | Existing system | Independent pass | Assessment |
|---|---|---|---|
| **Carousel: use one or not?** | Installs `embla-carousel-react`; guardrails it ("a carousel is a focal element in its own right… never pair with a competing CTA") | Excludes "auto-rotating carousel" per §2, and its Evidence Spine deliberately holds no carousel | **Not actually in conflict** — §2's do-not list bans *auto-rotating* carousels, and the existing system's guardrail is compatible with a manual one. Both are defensible; keep the package, keep the guardrail. |
| **Bento grid: legitimate or generic?** | Pattern 3 makes it OXOT-specific by driving cells from `SystemAsset.type` and spans from `criticality` | Would flag it against Visual Rules' "more than three visually equal cards" | **Genuine call, existing system slightly ahead.** Its round-3 fix (exactly one 2×2 hero, all other critical assets at 2×1) directly answers the Visual Rules objection. The independent pass has no equivalent grid pattern and offers nothing better here. |
| **Hero: pattern or configuration?** | Pattern 1 (Consequence Cascade Hero) is a peer pattern | Hero is a *configuration* of Lens Bench, freeing a slot for Assurance | **Judgment call; independent pass marginally better** on allocation grounds, but the existing system's hero is far more concretely specified (per-segment draw budget, token behaviour, mobile stack, reduced-motion end-state). Merge: independent's taxonomy, existing's specification. |
| **Number of layout patterns** | 8 signature patterns + 2 non-reusing deliverables | 9 confirmed + 1 provisional | Effectively the same granularity. Not a real divergence. |

---

## 3. What the independent pass found that the existing system missed

Each of these was checked against both existing documents specifically to see whether three review rounds had already caught it. **The answer, in every case, is no.**

### 3.1 Brand orange `#E58B3F` vs `--signal-amber #FF9F43` — genuinely new

Not present in either existing document; not mentioned in any of the three review rounds. `E58B3F` appears **only** in `stage_1_opus/` files. Yet project memory records `#E58B3F` as the real brand orange, and Foundation Spec line 81 sets `--signal-amber: #FF9F43`.

The escalation is correct and worth restating: because §3.3 (line 121) gives amber an entire **surface** type ("Decision panel — Amber highlight for proposed control"), brand orange must be barred from panel chrome, not merely from strokes and icons. `OXOT_Visual_Rules.md` bars "Multiple competing accent colors." An identity orange one hue-step from signal amber is the worst case: close enough to read as the same colour, different enough to function as a second accent.

**Status: new, real, needs a design-owner decision.**

### 3.2 Light-mode signal contrast failures — genuinely new, and worse than the independent pass stated

Not present anywhere in the existing system. Since the independent pass flagged its own contrast figures as single-sourced and unreplicated (§5), all six were recomputed from the raw hex values against `--paper-50 #F5F8F7`, using the WCAG relative-luminance formula:

| Token | Hex | Contrast on `--paper-50` | 3:1 (WCAG 1.4.11) |
|---|---|---:|---|
| `--signal-cyan` | `#36D8D1` | **1.65:1** | ✗ fails badly |
| `--signal-amber` | `#FF9F43` | **1.91:1** | ✗ fails |
| `--signal-green` | `#68C68B` | **1.96:1** | ✗ fails |
| `--signal-blue` | `#4A9EFF` | **2.58:1** | ✗ fails |
| `--signal-red` | `#EF6262` | **2.98:1** | ✗ fails (marginally) |
| `--signal-slate` | `#536761` | 5.64:1 | ✓ passes |

**Five of six signals fail the non-text contrast minimum in light mode.** The recomputed cyan figure (1.65:1) is worse than Perplexity's estimate of ~1.8:1; amber (1.91:1) worse than its ~2.2:1. The finding replicates, and the direction of error is against the palette.

The dark side was also computed, against `--ink-900 #0B171C`. All six pass 3:1, but the spread runs from slate at **3.02:1** to cyan at **10.32:1** — a 3.4× lightness range across six colours that are supposed to be peers. That independently corroborates the OKLCH-equalisation recommendation: cyan currently shouts and slate whispers, so the palette encodes an importance ordering nobody designed.

The escalation is also correct: §11's implementation order puts "Design tokens and shell" at **Phase 1**, gated on semantic colour being approved. This blocks the *first* approval gate.

**Status: new, real, replicated, and now the highest-priority item in this comparison.** The independent pass's own recommendation to re-measure before the Phase-1 gate is hereby discharged — the measurement is above.

### 3.3 The `RiskReductionCurve` / §7 tension — new as a *conflict*, half-present as a *rule*

The existing inventory (line 52) does state that investment decisions use the risk-reduction curve rather than a generic ROI icon. But it presents this as a settled rule and then compounds it by installing `recharts` against it. It never notices that §7 line 344 forbids "percentages, money values, annual loss" — i.e. that the mapping table and §7 give **incompatible instructions** for the same content type.

The independent pass names the conflict, and its proposed resolution is the better one on the merits: argue investment from `closesPathIds` **cardinality** ("one control closes several paths") rather than from a money axis. That satisfies the mapping table's intent while staying inside §7's claim boundary, and it needs no currency at all.

**Status: the rule was known; the conflict is new; the resolution is new and good.**

### 3.4 Missing layout patterns for `/decisions/investment` and Consulting — partly new

- **`/decisions/investment`:** Confirmed genuinely uncovered by **both** systems. Neither existing document mentions the route. So this is not a finding against the existing system so much as a shared gap — but the independent pass is the only one that *names* it, and it names it with a proposed resolution.
- **`/decisions/risk-acceptance`:** Same. Uncovered in both.
- **Consulting:** **The independent pass is wrong here, and the existing system is ahead.** See §4.1 below.

### 3.5 Structural findings with no counterpart in the existing system

These have no equivalent anywhere in the existing docs, and each is substantive:

1. **WAI-ARIA Graphics Module (`graphics-aria-1.0`)** — `role="graphics-document document"` on the canvas, `role="graphics-symbol img"` + `aria-roledescription` on each asset. The existing system's accessibility work is genuinely strong on *interaction* (roving tabindex, live regions, debouncing, 44px targets, WCAG SC numbers) but has nothing on **diagram semantics**. Every OXOT diagram is currently spec'd to be invisible to assistive tech as a *structure*, however well its controls behave.
2. **The five `TwinView` values need five different layout algorithms** — purdue = strict banding, network = topology, process = material/energy order, attackPath = network + traced paths, consequence = collapse to chain. This is a real build risk and nothing in the existing system acknowledges it. The existing Pattern 4 handles the seven-layer canvas only.
3. **Three-axis encoding on `PathEdge`** — colour ← `status`, stroke geometry ← `role`, non-colour glyph ← `criticality`. The adjudication was verified: §5's required-states table, Proposed-control row, reads *"Amber control inserted; **closed segment turns green after simulation**"* — one edge changing colour with `role` unchanged. That line does settle it. The existing system has no edge-encoding specification at all.
4. **`ProgressiveDetail` with a required `reason` prop**, turning §2's ban on hiding content "only to make a page shorter" into a type error. Elegant, and the existing system has no equivalent.
5. **`DataDiodeFlow` with no direction prop** — §10 requires "no outbound arrow", so make it structurally unrepresentable rather than a lint rule. The existing system specifies the air-gap visual (line 93) but as a topology toggle, with nothing preventing an outbound arrow.
6. **The §12 handoff-artifact gap** — the independent pass honestly flags that neither of its streams addressed `OXOT_CONTENT_MODEL.md`. Neither does the existing system.

---

## 4. What the existing system has that the independent pass missed

The existing system is stronger than the independent pass in four specific, non-trivial ways.

### 4.1 Consulting is actually covered, and the independent pass says it is not

The independent pass marks Consulting **PROVISIONAL** with "supported by **zero research** in either stream." That is a statement about its own research, not about the project. The existing **Pattern 6 (Zone Sequencer)** is a fully specified Consulting engagement-timeline pattern — reviewed three times, carrying the Composition Rules guardrail ("bans deep seven-layer architecture here"), with a semantic ordered list backing the visual and per-step completion announced as text.

Its round-3 fix is also a genuinely subtle piece of design reasoning that the independent pass produced no equivalent to:

> the original per-step "dashed perimeter fills solid on completion" mechanism still made every individual step visually "seal a security zone," regardless of whether the words "IEC 62443" appeared anywhere; **a security-literate buyer reads that grammar as compliance evidence no matter what it's labeled.**

That is a claim-boundary violation hiding inside a visual metaphor. Nothing in the independent pass operates at that level.

**Verdict: adopt Zone Sequencer as-is; delete the independent pass's "PROVISIONAL" marking on Consulting.**

### 4.2 The review history itself is an asset, and its central lesson is real

`OXOT_Layout_Styles.md` lines 151-166 document round 3's finding that **6 of 8 fixes from rounds 1-2 were incomplete or cosmetic**. That is not a footnote; it is the most transferable methodological result in either document:

- Pattern 1: motion violation "flagged once before but never actually restructured"
- Pattern 3: the fix covered "too few" critical cells but not "too many"
- Pattern 5: only the flip's *timing* was fixed; the inappropriate 3D flip itself survived
- Pattern 6: the fix removed the IEC 62443 *label* but kept the *mechanism*
- Pattern 8: the ARIA fix "offered two mutually-incompatible unpicked options"

The independent pass has no verification round. Its findings are all first-pass. Given that round 3 found a 75% cosmetic-fix rate on work that had already survived two reviews, **the independent synthesis should be assumed to contain a comparable proportion of incomplete resolutions until someone runs the same loop over it.** One such example was found in this very comparison (§3.4: the Consulting claim is simply false about the project's actual state).

### 4.3 Empirical verification, versus none

The existing inventory reports `tsc --noEmit` clean and `npm run build` at 111/111 pages, with pinned versions, a documented shadcn-CLI workaround (`--allow-scripts` blocked by npm policy), and a named piece of tech debt (recharts 2.x upstream-deprecated). The independent synthesis is entirely paper. Neither status is wrong for what each document is, but the difference matters for what you can act on today.

### 4.4 Two open questions the independent pass never reaches

- **The NOW token gap.** Existing line 75 identifies that *none* of the six spec tokens cleanly means "committed/active": amber means proposed/pending, and NOW is committed. It explicitly declines to invent a seventh token and escalates instead. That is a real hole in §3.1 that the independent pass — which reads the same six tokens — never notices, because it never designs a status-stamp component.
- **Index-schema reuse.** Existing line 85 flags that one card template was claimed to serve three structurally different indexes (Case Studies / Resources / Industries) with no per-index variance defined. The independent pass's `CaseStudyCard` / `RelatedResources` split gestures at the same problem but never states it.

Both should carry forward into any merged document.

---

## 5. Naming and taxonomy

Asked directly: **does the existing system's component naming match §13's canonical names better or worse than the independent pass's?**

**Decisively worse — by a margin that is not close.**

All 32 §13 names were checked mechanically across both existing documents:

- **Existing system: 6 of 32.** All six are Editorial-family names, and all six appear inside a single sentence (`OXOT_Component_Inventory.md` line 42) about MDX blog layout. Shell: 0/6. Decision: 0/5. Twin: 0/6. Proof: 0/5. Deployment: 0/3.
- **Independent pass: 32 of 32**, organised into a six-tier build-dependency inventory, plus an explicit precedence rule: *"Where §13 names a component, use §13's name. Invent only where §13 is silent."*

The existing system's naming is not *wrong*, because it names a different category of thing — `data-table.tsx`, `chart.tsx`, `carousel.tsx`, `slider.tsx` are correct shadcn-convention filenames for shadcn primitives. But it means the project currently has **no document that maps §13's required component family to anything**, and the file that claims to be `OXOT_COMPONENT_CATALOG.md` does not contain 26 of the 32 components §13 requires.

Two further points in the independent pass's favour:

1. Its §1.5 self-audit — catching that *both its own research streams* had drifted into inventing parallel names (`TwinCanvas`/`SystemCanvas` for `TwinExplorer`, `ProofGraphic`/`DecisionFlow`, `PathTrace`/`PathOverlay`) and then writing a mechanical rule to correct it — is exactly the kind of self-correction the existing system's round-3 review was designed to produce, achieved without a third round.
2. Its shared-blind-spot corollary is verifiable and useful: `EvidenceCitation`, `SourceMeta`, `RelatedResources`, `CaseStudyCard` were carried by *neither* of its streams, and the Editorial/Proof layer is precisely the layer Composition Rules (line 38) warns must not reuse the Platform visual language.

**On this criterion the independent pass wins outright.**

---

## 6. Recommendation

Concrete and actionable, not diplomatic hedging.

### Immediate — escalate to the design/spec owner, before any further build

These four need a decision from someone with authority over the spec. Three came from the independent pass; one from the existing system. Route them together as a single palette-and-vocabulary decision packet.

1. **Light-mode signal contrast — blocks the Phase-1 approval gate.** Five of six signals fail 3:1 on `--paper-50`; figures recomputed and tabulated in §3.2 above. This is no longer a research claim needing verification — it is measured. Remedy: per-surface pairs (`--signal-cyan-on-dark` / `-on-light`), expressed in OKLCH, hue fixed per semantic role, lightness varied per surface **and equalised across the six within each theme** (the dark-mode spread is currently 3.0:1 to 10.3:1). *Owner decision required.*
2. **Brand orange `#E58B3F` vs `--signal-amber #FF9F43`.** Introduce `--brand-orange` reserved for identity, barred from strokes, icons, **and panel chrome** (because §3.3 gives amber a whole surface type). *Owner decision required.*
3. **The NOW token gap** (from the existing system). No spec token means "committed/active." Do not invent a seventh token in a pattern document. *Owner decision required.*
4. **`RiskReductionCurve` vs §7's numeric ban.** Mapping table line 8 and Spec line 344 give incompatible instructions. Recommended resolution — argue investment from `closesPathIds` cardinality, not currency — is strong enough to propose rather than merely escalate, but it changes what a prescribed visual *is*, so it needs sign-off.

### Immediate — fix without escalation

These are unambiguous errors against text that was verified directly. No judgment call involved.

5. **Purge NOW/NEXT/NEVER from both existing documents.** Replace with NOW / NEXT / **deferred** per mapping table line 7 and §6 line 297. Touches `OXOT_Layout_Styles.md` lines 73, 75 and `OXOT_Component_Inventory.md` line 66.
6. **Replace `--pathway` / `--modelled` / `--consequence` / `--proposed` with `--signal-blue` / `--signal-cyan` / `--signal-red` / `--signal-amber`** throughout `OXOT_Layout_Styles.md`. These tokens do not exist. Re-check each usage for semantic correctness while substituting — the `--consequence`-means-amber conflation at line 17 was caused by the fabricated name.
7. **Rewrite the Case File Index disclaimer fix** (line 87). `TwinScenario.label` is a required single-literal field; "real case studies simply don't set it" is not implementable. Adopt the independent pass's `PublicationStatus` three-state (Named / Anonymized / Illustrative).
8. **Correct the recharts→deliverable mapping** (Inventory line 56). §7 contains no curve; the curve belongs to Investment decision — which is itself item 4 above. Until item 4 resolves, `recharts` has no approved consumer; say so rather than implying one.

### Structural — merge, don't pick a winner

9. **Rescope, don't replace, `OXOT_Component_Inventory.md`.** It is a good dependency-selection document that has mislabelled itself. Retitle it honestly (e.g. *OXOT Dependency & Package Decisions*) and **remove the claim that it is §12's `OXOT_COMPONENT_CATALOG.md`.**
10. **Promote the independent pass's Tier 0-6 inventory into the real `OXOT_COMPONENT_CATALOG.md`.** It is the only artifact in the project that covers all 32 §13 names, and §12 requires "props, variants, states, accessibility, and permitted usage" per component — which is the shape the independent inventory already has. Adopt its precedence rule verbatim: *where §13 names a component, use §13's name.*
11. **Replace Pattern 2 (Baseline/Virtual-Control Reticle) with the Three-Gate Ledger.** The Reticle is a two-pane control claiming to be a three-panel deliverable, and no amount of accessibility patching fixes a control that cannot express three states. Salvage from it: the crosshair-reticle P&ID visual idiom and the enumerated focusable delta list — both are good, and both survive inside a three-column layout.
12. **Keep the existing system's eight patterns otherwise**, and specifically keep **Zone Sequencer** (Consulting — delete the independent pass's PROVISIONAL flag) and **Asset-Class Bento** (the round-3 one-2×2-hero cap is better than anything the independent pass offers for grids). Fold in the independent pass's **Requirement Trace** (Assurance), **Depth Rail** (which is the same idea as Pattern 4 but adds §8's required Object Trace mode and `?layer=L4` URL state — a real omission in Pattern 4), and **Evidence Spine**.
13. **Add ARIA Graphics Module semantics to every diagram pattern.** The existing system's interaction accessibility is genuinely excellent; its diagram-structure accessibility is absent. This is additive, not corrective, and it converts an obligation into a differentiation claim for a company selling defensibility.

### Process

14. **Run the round-3 verification loop over the independent synthesis before adopting item 10.** Round 3 found 6 of 8 prior fixes were cosmetic. The independent synthesis has had zero verification rounds, and one factual error was already found in it during this comparison (the Consulting "zero coverage" claim). Same method, same grading dimensions, native Agent tool. Expect it to find real defects.
15. **Then close the three remaining page gaps** — `/decisions/investment`, `/decisions/risk-acceptance`, and Contact. All three are uncovered by **both** processes. Investment has a proposed resolution (item 4); the other two have nothing.
16. **Commission the §12 `OXOT_CONTENT_MODEL.md` pass.** Both processes stayed entirely in the component/layout plane. The MDX/CMS schema for Insights, Case Studies, Guides, Glossary, Industries and Assurance is required by §12 and does not exist.

---

## 7. Bottom line

Neither document supersedes the other, and the framing of "which pass is better" obscures the actual result.

**The independent pass is the better spec-compliance instrument.** It found four real defects that three review rounds missed — a fabricated token family, an explicit `NEVER` prohibition violated, a two-pane pattern claiming a three-panel deliverable, and an unimplementable disclaimer fix — plus two palette-level conflicts that block the Phase-1 approval gate, one of which was independently replicated and found *worse* than reported. It is the only artifact covering all 32 of §13's required components. Its adjudication method (appeal to spec text, cite the line) is auditable in a way the existing system's grading tables are not.

**The existing system is the better design instrument.** Its eight patterns are more concretely specified, more visually distinctive, and — critically — have been *verified*, both by a build that passes and by a review loop that proved most first-round fixes were cosmetic. Zone Sequencer's insight that a security-literate buyer reads zone geometry as compliance evidence regardless of labelling is a class of reasoning the independent pass never reaches.

The merge is genuinely additive, which is the same conclusion the independent pass reached about its own two streams — and for the same reason. Take the independent pass's taxonomy, component catalog, and spec-compliance corrections; keep the existing system's pattern designs, verification discipline, and build. Escalate the four palette-and-vocabulary questions today, because they are cheap to decide now and expensive to unwind once components are written.
