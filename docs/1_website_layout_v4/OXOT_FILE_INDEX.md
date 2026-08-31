# OXOT File Index — Every File, What It Does, How It Was Derived

**New to this system? Start with [`OXOT_README.md`](./OXOT_README.md) first**, then use this file as the reference when you need to know what a specific file is or where something lives. For page-by-page build status, see [`OXOT_Master_Record.md`](./OXOT_Master_Record.md)'s alignment matrix and [`site-tree.md`](./site-tree.md)'s route table — this file answers "what is this file," those two answer "what got built."

Last built 2026-08-24. Two repos are covered:

- **This repo** (`oxot_website_public_sept`, specifically `new_material_source/1_website_layout_v4/`) — specs, briefs, derived process docs, research. No production code lives here.
- **The real repo** (`jim_private/oxot_website_production/oxot-website`, dev worktree `.worktrees/chore-local-dev-postgres`) — the actual Next.js site. This is where every page and component described below actually runs.

---

## Part 1 — This repo: specs, briefs, and derived process docs

### 1.1 The 6 real spec files (source of truth — never improvise around these)

| File | What it governs | Derivation |
|---|---|---|
| [`OXOT_Visual_Foundation_Spec.md`](./OXOT_Visual_Foundation_Spec.md) | **The most important file.** Brand posture, semantic color tokens, typography, motion, the 6 Foundation Deliverables, do-not list, acceptance criteria. 616 lines, 51 headers — the largest and structurally deepest file in the directory. | Owner-authored design brief. Amended 2026-08-24 with the OKLCH light-mode-contrast fix and the NOW-token resolution (§3.1) — both real, computed decisions, not guesses. |
| [`OXOT_Visual_Rules.md`](./OXOT_Visual_Rules.md) | Hierarchy discipline: one focal element per section, ≤1 primary CTA, ≤3 equal-weight cards, no competing accents. 22 lines. | Owner-authored. |
| [`OXOT_Composition_Rules.md`](./OXOT_Composition_Rules.md) | Per-section layout constraints — Home / Platform / Consulting / Industry / Assurance / Resources each distinct and non-interchangeable. 37 lines. | Owner-authored. |
| [`OXOT_Mobile_Rules.md`](./OXOT_Mobile_Rules.md) | Mandatory mobile stacking order, 44px touch targets, no hover/drag-only interaction. 18 lines. | Owner-authored. |
| [`"OXOT_Visual QA Checklist.md"`](./OXOT_Visual%20QA%20Checklist.md) | Mandatory pre-ship gate — Hierarchy, Brand, Density, Interaction, Consistency. 25 lines. | Owner-authored. |
| [`OXOT_content-to-visual-mapping-table.md`](./OXOT_content-to-visual-mapping-table.md) | "Use this, avoid that" per content type, plus the `TwinScenario`/`SystemAsset`/`SystemPath` TypeScript data contract every Twin-related visual must use. 97 lines. | Owner-authored; the data contract is what the real `src/components/twin/types.ts` (Part 2.2) implements verbatim. |

### 1.2 Derived process and pattern documents

| File | What it does | How it was derived |
|---|---|---|
| [`OXOT_README.md`](./OXOT_README.md) | Onboarding entry point — reading order, why the patterns can be trusted, hard rules, known open items. 134 lines. | Written by a native `Agent`/Opus dispatch after the pattern system existed, to make it navigable by a fresh session. |
| [`OXOT_Master_Record.md`](./OXOT_Master_Record.md) | **The index.** The 8 patterns at a glance, 3-round review history, governance rules, and the full page-to-pattern-and-component alignment matrix (every real route × composition rule × pattern × components × build status). 100+ lines. | Built by cross-referencing `OXOT_Layout_Styles.md`'s pattern definitions against `site-tree.md`'s nav structure and the real repo's actual routes. Its alignment-matrix Status column was found stale on nearly every row 2026-08-24 (said "not built" for pages that had been built in an earlier, separate plan) and corrected against direct `wc -l` evidence on all 34 real `page.tsx` files — see that file's own note at the top of the matrix. |
| [`OXOT_Page_Development_Process.md`](./OXOT_Page_Development_Process.md) | The repeatable 7-step per-page loop (Recall → Reference check → Rules/Composition audit → Mobile pass → Build → QA gate → Persist), agent responsibilities, and a documented reusable technique for building `*ScenarioDiagram.tsx` worked-scenario diagrams. 90+ lines. | Operationalizes the 6 spec files into one loop. Updated 2026-08-24 to fix a stale "component inventory to be built" line, add an explicit warning against `ruflo agent_execute`'s OpenRouter billing, and document the `TwinExplorer`/`*ScenarioDiagram.tsx` technique proven across all 6 Industries pages that same day. |
| [`OXOT_Layout_Styles.md`](./OXOT_Layout_Styles.md) | The 8 named OXOT-native visual/structural patterns (Consequence Cascade Hero, Three-Gate Ledger, Asset-Class Bento, Facility Cross-Section Scroll, Evidence Dossier Panel, Zone Sequencer, Decision Ledger, Case File Index), grid mechanics, and full review history. 184 lines, largest process doc. | Cited research (Valyu, WebSearch, Perplexity — real URLs in the Sources section) supplied structural/technical lineage only; every pattern was then bound to real OXOT semantics (e.g. Pattern 3's grid cells are the actual 9 `SystemAsset.type` enum values, not a generic bento). Went through 3 independent AI review rounds (Sonnet → Opus → Fable 5), each grading the same 8 patterns against the actual spec text; round 3 specifically re-graded the fixes, not the originals, and found 6 of 8 prior "fixes" cosmetic. Pattern 2 was later fully replaced (not patched) 2026-08-24 — "Baseline/Virtual-Control Reticle" → "Three-Gate Ledger" — because a 2-pane control structurally cannot express the 3 states the Foundation Spec requires. |
| [`OXOT_Component_Inventory.md`](./OXOT_Component_Inventory.md) | Research-backed component/package recommendations scoped to the real stack (Next.js/Tailwind/shadcn/Framer Motion), and which are already implemented and build-verified. 78 lines. | Research-backed; implementation status verified live via `tsc`/`npm run build` against the real repo, not assumed. |
| [`OXOT_Super_Critical_Reference.md`](./OXOT_Super_Critical_Reference.md) | Short, unheaded "don't forget this" condensed callout list. 42 lines. | Owner-authored quick-reference. A byte-identical duplicate of an earlier version of this file (`OXOT_Super_Critical_Reference;md`, semicolon typo in the name) was found and deleted during an earlier cleanup pass. |
| [`ruflo_workflow_mandate.md`](./ruflo_workflow_mandate.md) | Instructs Recall → Orchestrate → Execute → Persist against RuFlo's Docker MCP tools on every task. 24 lines. | Owner-authored, mirrors the RuFlo section of the project's `CLAUDE.md`. |
| [`site-tree.md`](./site-tree.md) | The site's navigation tree, plus (as of 2026-08-24) a full real-route site map cross-referencing every live route to its menu location, spec source, and build status. | Original nav tree owner-authored; the route-map section added 2026-08-24 by checking every `page.tsx` in the real repo directly — see §1.3 below and the file itself. |

### 1.3 `site-tree.md` in detail

Two parts as of 2026-08-24: the original nav-menu tree (owner-authored, what a visitor sees in navigation), and a new "Full Real-Route Site Map" table added this session that lists all 34 real routes with their menu label, spec-folder source, and Master Record status — the direct answer to "which real URL does this menu item point at, and is it built." See the file itself; not duplicated here to avoid drift between two copies of the same table.

### 1.4 Per-menu original spec folders — the raw briefs behind every page

These are the **original page-level content briefs**, read once each in full before any page was built (per the "read the full spec folder" rule — a hard requirement after an earlier pass caught a page built from a partial reading). They are more specific than `site-tree.md`'s bare nav labels and are the actual source material every `content.ts` in the real repo was transcribed from.

**`1_home/`** (4 files) — feeds `/` (protected, reference only):
- `PAGE_RECONSTRUCTION_SPEC_home-2.md` — OBSERVED/INFERRED/RECOMMENDED reverse-engineered spec of the live `/home-2` comparison-build page, read directly from its React source.
- `home_critique.md` — design critique arguing the page is too dense and should route to dedicated section pages instead.
- `home_critique_review.md` — fact-check pass on the critique against real page source; confirms most claims, flags half the recommendations as assuming routes that didn't exist yet at the time.
- `home_layout_instructions.md` — original content brief: hero copy, CTAs, section list.

**`2_platform/`** (4 files) — feeds `/cdt-2` and `/how-it-works`:
- `Platform_deconstruction.md` — OBSERVED/INFERRED/RECOMMENDED spec of the live `/cdt-2` page from its 13+ component source files.
- `platform.md` — original positioning brief ("product-first, consulting-enabled") with a full recommended nav+hero+section outline.
- `platform_critique.md` — critique of `/cdt-2`'s strengths/weaknesses.
- `platform_critique_review.md` — verification pass on the critique; corrects a "no final CTA" claim (a global `ContactBand` exists) and flags recommendations assuming non-existent destination pages.

**`3_industries/`** (10 files) — feeds all 6 `/industries/*` pages + `/industries` index:
- `industries-map.md` — nav-tree fragment for the 6 sub-pages.
- `industries_layout_instructions.md` — "one reusable template per industry" rule + a table of each sector's strong-emphasis themes.
- `industry_critical_infra.md` — **empty (0 bytes)**; Critical Infrastructure was later confirmed dropped from source material entirely (the real repo's `registry.ts` deliberately excludes it).
- `industry_defence.md` (41.7 KB, longest file in the folder) — full Defense & Government brief.
- `industry_defense_airgap.md` — companion brief for Defense's air-gap/isolated-deployment angle.
- `industry_energy.md` — Energy & Utilities brief.
- `industry_hyperscale.md` (50 KB, largest industry file) — Hyperscale & Data Centers brief; richest source file, includes an interactive model spec, dependency map, 12-scenario library, 10-category case study programme.
- `industry_manu-process.md` — Manufacturing & Process Industry brief.
- `industry_rail-transportation.md` — Rail & Transportation brief, deliberately split passenger/transit vs. US freight.
- `industry_water.md` — Water & Wastewater brief.

**`4_assurance/`** (10 files) — feeds all 5 `/assurance/*` pages + `/assurance` index:
- `assurance-map.md` — nav-tree fragment.
- `assurance_layout_instructions.md` — original brief covering all 5 sub-sections in one file.
- `assurance_62278-2:2025.md`, `assurance_IEC62443.md`, `assurance_TS50701.md`, `assurance_cra.md`, `assurance_evidence_data_provenance.md` — full page specs, one per standard, each with URL/nav-label/CTA metadata and hero copy.
- `assurance_TS50701_support_cdt.d`, `assurance_cra_support_cdt_docs.md` — supporting content (Twin → RAMS/CRA-documentation mapping); each is a **byte-identical duplicate** of a file with the same name in `6_resources/`.
- `assurance_overview.md` (302 lines, draft 1) and `assurance_overview_2.md` (513 lines, draft 2) — two genuinely different drafts of the `/assurance` landing page, not duplicates.

**`6_consulting/`** (1 file) — feeds `/consulting`:
- `consulting.md` — brief recommending "decision-led engineering engagements enabled by the Twin," with a proposed nav update and page structure.

**`6_resources/`** (13 files) — feeds `/resources/*`, `/case-studies`, `/technical-specification`, `/deployment-sovereignty`:
- `IEC62278-1_-2_cdt.md`, `assurance_62278_safety_impact.md` — Twin-to-standard mapping explainers.
- `air-gapped_deployment.md` — OXOT's "Island Mode" air-gapped deployment model.
- `assurance_TS50701_support_cdt.d`, `assurance_cra_support_cdt_docs.md` — duplicates of the `4_assurance/` files above.
- `glossary.md` — flat list of ~24 glossary terms (ALE, CBOM, Purdue Model, SBOM, etc.), no definitions included.
- `resources-case-studies.md`, `resources-format-guides-briefings.md`, `resources-format-insights.md` — purpose/structure briefs per resource type.
- `resources-format-glossary.md` — **empty (0 bytes)**, planned but never written.
- `resources-map.md` — nav-tree fragment.
- `resources-purpose.md` (28 KB, largest file in folder) — strategic brief on Resources as a "conversion and credibility system."
- `resources_overview.md` — recommends the hub-and-spoke `/resources` landing structure.

**`7_company/`** (5 files) — feeds `/company`, `/contact`, `/cookies`, `/privacy`, `/terms`:
- `company.md` — `/company` brief (1,200–1,800 words target, evidence-led).
- `contact.md` — `/contact` brief, framed around conversion.
- `cookie_policy.md`, `privacy_policy.md` — draft legal text (unreviewed templates) → `/cookies`, `/privacy`.
- `toc.md` — **misleadingly named**: holds draft Terms of Use legal text, not a table of contents → `/terms`.

### 1.5 `stage_1_opus/` — the independent second research pass

An intentionally isolated subfolder (owner instruction, ahead of an expected context compaction) holding a from-scratch second opinion on component/layout choices — different orchestration (Opus, real sequential-reasoning tool calls, Perplexity + WebSearch), explicitly not reading the existing `OXOT_Component_Inventory.md`/`OXOT_Layout_Styles.md` so it couldn't just echo them back.

| File | What it is |
|---|---|
| `PLAN.md` | Standalone saved copy of the approved plan for this pass, explaining why the isolation and why now. |
| `raw_research_perplexity.md` | Raw Perplexity stream output, grounded in 7 spec files. |
| `raw_research_websearch.md` | Raw WebSearch stream output, researching competitor OT-security product UIs (Dragos, Claroty, Nozomi, Armis, Microsoft, Wiz). |
| `independent_research_findings.md` | Step-2 synthesis reconciling both streams via 11-step sequential reasoning; notes a planned 3rd stream (Valyu) failed 3 times and was dropped. |
| `comparison_vs_existing_system.md` | Step-3 structured comparison against the existing docs — concludes they answer different questions (package selection vs. component prop contracts) rather than converging/diverging on the same one. This comparison is what surfaced the 4 real, cited defects fixed in `OXOT_Layout_Styles.md`/`OXOT_Component_Inventory.md` on 2026-08-24 (the `NOW/NEXT/NEVER` naming violation, 4 fabricated color tokens, an unimplementable Case File Index fix, and a wrong deliverable mapping), plus the light-mode-contrast WCAG failure later resolved in the Foundation Spec. |

### 1.6 `archive/`

- `directions.md.superseded` — a retired, pre-spec "full website package" pitch/capability list; predates the current spec system entirely. Kept, not deleted, for historical reference.

### 1.7 Reference binaries — not read into any derived doc, kept as source material

- `CDT Product Sell Sheet v2.pdf` (3.0 MB), `OXOT CDT Product Specification V2.pdf` (3.1 MB), `OXOT Product Sheet v2.pdf` (15.4 MB) — product PDFs.
- `OXOT_CDT_Demo_Onboardiing_process.html` (463 KB, note the filename typo) and `OXOT_CDT_Demo_Onboarding.html` (791 KB) — two distinct standalone bundled HTML demos despite the near-identical name.
- `images/` — 20 files (~137 MB): CDT architecture renders (dark/light), OXOT logo files, misc reference JPGs/PNGs.
- `screenshots_home_page/` (4 PNGs) and `screenshots_twin_page/` (6 PNGs) — reference screenshots of the live Home and Twin pages, used to confirm those protected pages already match spec intent rather than needing rework.

---

## Part 2 — The real repo: implemented code

Repo root: `jim_private/oxot_website_production/oxot-website`, dev worktree `.worktrees/chore-local-dev-postgres`. Everything below is real, live TypeScript/React, not a spec document.

### 2.1 Design tokens

`src/app/globals.css` (25.8 KB) defines the `--signal-cyan`/`-blue`/`-amber`/`-red`/`-green`/`-slate` semantic tokens as HSL triples, once for light theme and once for `.dark`, plus `--color-signal-*` Tailwind-consumable aliases. Values were computed via OKLCH conversion (hue held constant, lightness adjusted per surface) to fix a WCAG 1.4.11 light-mode contrast failure found in the `stage_1_opus` comparison — see `OXOT_Visual_Foundation_Spec.md` §3.1 for the full derivation and exact hex/HSL values (not reproduced here to avoid a second copy drifting out of sync).

### 2.2 Twin diagram substrate — `src/components/twin/` (8 files)

The reusable component set implementing the `SystemAsset`/`SystemPath` data contract from `OXOT_content-to-visual-mapping-table.md` as a real, interactive, accessible diagram. Spec: `docs/OXOT-DIAGRAMMING-SPEC.md` (§2.3 below).

| File | What it does |
|---|---|
| `types.ts` | The `SystemAsset`/`SystemPath` data contract — 9 asset types, 3 criticality tiers, path `status`/`role` unions — the TypeScript implementation of the mapping table's contract. |
| `AssetNode.tsx` | Renders one asset as a distinct silhouette per type (shape carries type, never color). `process-equipment` uses a sourced P&ID vessel glyph from `pid-symbols.tsx`; the other 8 types are hand-drawn IT/OT glyphs. |
| `PathEdge.tsx` | Renders one path/edge with two independent encoding axes: color from `status` (blue/amber/green/slate signal tokens), stroke dash pattern from `role` — never conflated. |
| `ZoneBand.tsx` | Draws the labeled Purdue-level grouping band behind a zone's assets. Pure presentation, `role="group"`, deliberately excluded from the roving-tabindex focus ring. |
| `layout.ts` | Wraps `elkjs` (bundled build, not the web-worker entry) to compute node positions and edge bend points. Exports `layoutTwin`, `TWIN_NODE_SIZE`. |
| `zones.ts` | Pure geometry helper — groups already-positioned nodes by `SystemAsset.zone` into padded bounding boxes for `ZoneBand`. |
| `pid-symbols.tsx` | 7 real P&ID symbols (vessel, instrument bubble, gate/check/globe valve, centrifugal pump, heat exchanger) converted from draw.io's Apache-2.0 stencil set, scaled to match `AssetNode`'s hand-drawn glyphs. |
| `TwinExplorer.tsx` | The root `<svg role="graphics-document document">` client component. Owns roving-tabindex keyboard focus across all `AssetNode`s, runs `layoutTwin` in `useEffect`, composes `AssetNode` + `PathEdge` + `ZoneBand`. |

**How derived:** built directly against `docs/OXOT-DIAGRAMMING-SPEC.md`'s architecture decision (elk.js for layout + hand-authored SVG for rendering, explicitly rejecting Cytoscape.js and React Flow) and the mapping table's data contract. Every component was verified live — `tsc --noEmit`, rendered in a real browser with a screenshot, and functionally interaction-tested via `document.activeElement` keyboard-focus checks, not just visually inspected.

**Not yet built** (named in the diagramming spec as open items, no files exist yet): `ConduitGate`/`ChokePointMarker`, `CanvasLegend`, and 4 of the 5 named `TwinView` layout algorithms (only the general layered/orthogonal default exists).

### 2.3 `docs/OXOT-DIAGRAMMING-SPEC.md` (113 lines)

The governing spec for the Twin substrate. Sections: (1) the stack decision and why competitors were rejected; (2) symbol libraries (Wikimedia Commons P&ID symbols, public domain ISO 10628-2; draw.io's Apache-2.0 stencils; MITRE Attack Flow's schema adopted for threat-model data rather than inventing one — with an explicit warning never to trace ANSI/ISA-5.1, which is not open-licensed); (3) a table mapping each `TwinView` (purdue/network/process/attackPath/consequence) to its required ELK algorithm/config; (4) open items before further build. Its own status line still says "Draft... not yet built," which is now stale — the substrate in §2.2 has since been implemented; that line has not yet been corrected in the real repo (flagged here, not fixed — this index doesn't edit the real repo).

### 2.4 Industries components — `src/components/industries/`

Shared file: **`registry.ts`** — the single source of the 6 industry slugs/names (Critical Infrastructure confirmed excluded, matching `industry_critical_infra.md`'s empty spec file) and the `same()` bilingual placeholder helper (nl is currently a same-as-English placeholder pending real translation).

Every sector follows the same shape: `content.ts` (page copy transcribed from its `3_industries/industry_*.md` brief) + ~11 standard section components (Hero, Architecture, Capabilities, Decisions, Regulatory, Scenarios, WorkedExample, Engagement, FinalCta, plus 1-2 sector-specific reality/concerns sections) + a `*ScenarioDiagram.tsx` (real `TwinExplorer` instance, built 2026-08-24 from that page's own worked-example chain, per the technique documented in `OXOT_Page_Development_Process.md`) + one or more **signature motif components** that give each sector a distinct visual identity rather than six copies of one template:

| Sector | Spec source | Signature motif component(s) |
|---|---|---|
| `energy-utilities/` (12 files) | `industry_energy.md` | `EnergyLine.tsx` — horizontal single-line-diagram rule, the literal grid-engineer convention. |
| `water-wastewater/` (14 files) | `industry_water.md` | `WaterSpine.tsx` — persistent vertical "process-flow spine" with station markers and a wave divider. |
| `rail-transportation/` (17 files) | `industry_rail-transportation.md` | `RailTrack.tsx` (literal two-rail illustration), `RailTrackHeader.tsx` (dual-track column headers), `RailForkDiagram.tsx` (`AnimatedBeam`-based fork from shared operating model to passenger/freight). |
| `manufacturing-process/` (13 files) | `industry_manu-process.md` | `ManuCornerFrame.tsx` (technical-drawing corner brackets), `ManuStationLine.tsx` (stamped assembly-line bar with station numbers). |
| `hyperscale-data-centers/` (16 files) | `industry_hyperscale.md` | `HyperscaleModel.tsx` (interactive toggle-group model), `StatusDot.tsx` (dashboard-style glow indicator). |
| `defense-government/` (17 files) | `industry_defence.md` + `industry_defense_airgap.md` | `DefenseStamp.tsx` (classification-stamp-style kicker, deliberately never claims a real classification level), `DefenseEdge.tsx` (angular clip-path divider), `DefenseAirGap.tsx` (dedicated air-gap subsection). |

**How derived (the proven, repeatable technique):** for each `*ScenarioDiagram.tsx`, the page's real `content.ts` worked-example chain was read in full, each step classified as ASSET (one of the 9 `SystemAsset` types) vs. CONSEQUENCE text, genuine ambiguity flagged rather than guessed. Node counts were **not** forced to a uniform 4 — water and manufacturing use exactly 3 real assets because that's what their source chains actually support; defense synthesizes 2 of its 3 assets from the scenario's own prose because its chain array is almost entirely consequence-language. Full methodology in `OXOT_Page_Development_Process.md`'s "Reusable technique" section.

### 2.5 Decisions components — `src/components/decisions/`

Four subfolders, one per Decision route, each following the pattern `content.ts` + section components + 1-2 signature evidence/visual components:

| Folder | Real route | Spec source (Foundation Deliverable) | Signature component(s) |
|---|---|---|---|
| `change-safely/` (5 files) | `/decisions/change-safely` | Deliverable 3, Baseline vs. Virtual Control | `RouteDiagram.tsx` (shared-coordinate baseline/proposed geometry) + `RouteComparison.tsx` (renders it twice — "one geometry, two readings"). Deliberately static server-rendered SVG, not `TwinExplorer` — avoids implying a live simulation runs client-side. |
| `investment/` (8 files) | `/decisions/investment` | Deliverable 2, "What should we spend?" | `RiskReductionCurve.tsx` (explicit alternative to a generic ROI icon), `LossTailCurve.tsx` (right-skewed lognormal loss-density curve). |
| `risk-acceptance/` (9 files) | `/decisions/risk-acceptance` | Deliverable 2, "What can we leave alone?" (accept-or-defer — see the `NOW/NEXT/deferred` vocabulary fix in `OXOT_Layout_Styles.md`) | `ExceptionRecord.tsx` (deliberately not an icon/checkmark/"trusted" badge), `EvidenceTrace.tsx` (drill-down evidence chain). |
| `fix-first/` (7 files) | `/decisions/fix-first` | Deliverable 2, "What do we fix first?" | `RankingLogic.tsx`, `ReachabilityTrace.tsx`, `TriageBoard.tsx`. |

**How derived:** each folder's `content.ts` implements the specific field/panel contract in `OXOT_Visual_Foundation_Spec.md` §6-7 for that Decision. `change-safely/` was confirmed, by reading the actual code rather than assuming, to be a real, complete, deliberately-static implementation predating this session's diagram work — an earlier documentation edit had incorrectly claimed it needed rebuilding with `TwinExplorer`; that edit was caught and corrected the same session (see `OXOT_Master_Record.md`'s note on that row).

---

## Part 3 — How this cross-references OXOT's menus

This file answers "what is this file." For "which menu item maps to which pattern, which real route, and is it actually built" — the question that spans both repos — see [`OXOT_Master_Record.md`](./OXOT_Master_Record.md)'s alignment matrix (the fullest, most current answer, corrected 2026-08-24 against direct evidence from every real `page.tsx`) and [`site-tree.md`](./site-tree.md)'s route table (the flatter, faster-to-scan version of the same mapping). All three files — this one, the Master Record, and site-tree — are kept deliberately non-duplicative: this file owns "what/how derived," Master Record owns "pattern + status," site-tree owns "route + menu label." If any two of them disagree on a fact, treat it as a documentation bug and fix it rather than trusting either blindly — that exact kind of drift (a status claim nobody re-checked against the live code) is what triggered this whole file's creation.
