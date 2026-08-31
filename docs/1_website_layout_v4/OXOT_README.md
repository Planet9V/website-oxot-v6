# OXOT Design System — How To Use These Documents

**Status: the onboarding entry point for this directory.** If you are a fresh session with no memory of how any of this was built, read this file first, then follow the reading order below. Last updated 2026-08-24.

This file explains three things: which documents govern page-building, what order to read them in, and why the derived patterns can be trusted without re-deriving them.

---

## 1. Purpose

This system exists because pages in this project were previously built off improvised or pre-spec content. Pages got built — and rebuilt — without anyone reading the actual spec folders in `new_material_source/`, the project owner caught it, and the work had to be redone at real cost. The spec files were sitting on disk the whole time. The failure was not missing specification; it was not reading it. Everything in this directory — the six OXOT spec files plus the six derived documents — exists specifically to stop that from recurring, by making the correct reading order explicit, mandatory, and cheap to follow.

---

## 2. Read in this order, always

These six are the **real OXOT spec files**. They are the source of truth. Never improvise around them, never substitute your own judgment for them, never build a page before reading the sections that apply to it.

| # | File | What it governs |
|---|---|---|
| 1 | [`OXOT_Visual_Foundation_Spec.md`](./OXOT_Visual_Foundation_Spec.md) | **THE most important file.** Brand posture, semantic color tokens, typography, motion, the 6 Foundation Deliverables, the do-not list, acceptance criteria. Expanded below. |
| 2 | [`OXOT_Visual_Rules.md`](./OXOT_Visual_Rules.md) | Hierarchy discipline: one primary focal element per section, never more than one primary CTA, never more than three visually equal cards without a hierarchy break, no competing accent colors. Scale for statements, position for priority, contrast for state, spacing for grouping, borders only for structure, motion only for state transition. |
| 3 | [`OXOT_Composition_Rules.md`](./OXOT_Composition_Rules.md) | Per-section layout rules. Home, Platform, Consulting, Industry, Assurance, and Resources each have **distinct, non-interchangeable** constraints. A Platform rule is not an Assurance rule. |
| 4 | [`OXOT_Mobile_Rules.md`](./OXOT_Mobile_Rules.md) | Mandatory mobile stacking order for complex system visuals (View selector → Canvas → Selected state summary → Evidence drawer → CTA), no drag-only or hover-only interactions, 44px minimum touch targets, no crucial state text hidden behind hover. |
| 5 | [`OXOT_Visual QA Checklist.md`](./OXOT_Visual%20QA%20Checklist.md) | The mandatory final gate before any page ships. Five categories: **Hierarchy, Brand, Density, Interaction, Consistency.** A fail routes back to the build step. Never ship with a caveat. |
| 6 | [`OXOT_content-to-visual-mapping-table.md`](./OXOT_content-to-visual-mapping-table.md) | A "use this / avoid that" table per content type (operational consequence → process-chain diagram, *not* a generic warning card; network path → topology overlay, *not* a random node graph; etc.), plus the `TwinScenario` / `SystemAsset` / `SystemPath` / `Consequence` / `ProposedControl` TypeScript data contract that **every** Twin-related visual must use. |

### What the Foundation Spec actually contains

Because it is the file everything else defers to:

- **Brand posture** — "calm industrial intelligence." Engineered, high-consequence, restrained.
- **Semantic color tokens**, six of them, used for *state* rather than decoration:

  | Token | Means |
  |---|---|
  | cyan | modelled / verified |
  | blue | pathway / network |
  | amber | proposed / pending |
  | red | critical consequence — used sparingly |
  | green | validated closure **only** |
  | slate | inactive / context |

- **Typography roles**, surface and depth rules.
- **Motion timing** — UI transitions 160–280ms, diagram transitions 300–500ms. Motion must explain a system, pathway, control, or evidence state; decorative motion is a defect.
- **The 6 Foundation Deliverables** — Home Hero + Twin Explorer, Four Decisions Switchboard, Baseline vs. Virtual Control, Seven-Layer Architecture Canvas, Case Study Editorial Template, Air-Gapped Deployment Visual.
- **The do-not list** — no hooded hackers, no binary rain, no shields, no neon, no AI orbs, no generic templates, no fake data.
- **Acceptance criteria** — WCAG 2.2 AA, no placeholder links, reduced motion preserves all meaning.

---

## 3. Then read these 7 derived documents, in this order

| # | File | Why |
|---|---|---|
| 1 | [`OXOT_Master_Record.md`](./OXOT_Master_Record.md) | **The index. Start here for current status of everything** — the 8 patterns and their state, review history, open items, governance rules, and the full page-to-pattern-and-component alignment matrix (every real route, cross-checked directly against the live code 2026-08-24 — nearly the entire site is built; treat any "not built" claim you find elsewhere as suspect until re-verified). |
| 2 | [`OXOT_Page_Development_Process.md`](./OXOT_Page_Development_Process.md) | The 7-step loop to run for **every** page: Recall → Reference check → Rules/Composition audit → Mobile pass → Build → QA gate → Persist. Also documents the proven `*ScenarioDiagram.tsx`/`TwinExplorer` technique for worked-scenario diagrams. |
| 3 | [`OXOT_Agent_Build_Pipeline.md`](./OXOT_Agent_Build_Pipeline.md) | **The WHO/HOW to the process doc's WHAT/WHY** — a durable, copy-pasteable procedure for executing the 7-step loop with coordinated Opus agents (Taskmaster → Builders → QA → Fix, looping until real QA passes), with real paths, exact commands, and per-role prompt templates. Includes a pre-flight gate that checks whether the target menu's rules are actually ready before any build starts — do not skip it. |
| 4 | [`OXOT_Layout_Styles.md`](./OXOT_Layout_Styles.md) | The 8 named OXOT-native visual/structural patterns — Consequence Cascade Hero, Three-Gate Ledger (replaced Baseline/Virtual-Control Reticle 2026-08-24), Asset-Class Bento, Facility Cross-Section Scroll, Evidence Dossier Panel, Zone Sequencer, Decision Ledger, Case File Index. Tells you which one(s) to compose a given page from, and how they combine. |
| 5 | [`OXOT_Component_Inventory.md`](./OXOT_Component_Inventory.md) | What is **actually implemented in the real codebase already**, and where — so you build with what exists instead of reinventing it. |
| 6 | [`OXOT_FILE_INDEX.md`](./OXOT_FILE_INDEX.md) | **What every file in this system is, and how it was derived** — every spec file, every derived doc, every per-menu spec folder, plus the real repo's Twin substrate, Industries components, and Decisions components. Read this when you need to know what a specific file is, not just what page it feeds. |
| 7 | [`site-tree.md`](./site-tree.md) | The nav-menu tree, plus a full real-route site map (34 routes, checked directly against live code) — the fastest way to see which real URL a menu item points at and whether it's built. |

On that last point, concretely: `src/components/ui/` already contains `data-table.tsx`, `chart.tsx`, `carousel.tsx`, `slider.tsx`, `scroll-progress.tsx`, and `animated-list.tsx` (all added and build-verified 2026-08-24), alongside a pre-existing set including MagicUI-derived components — `animated-beam`, `bento-grid`, `blur-fade`, `border-beam`, `dot-pattern`, `magic-card`, `number-ticker` — plus the shadcn/Radix primitives (`accordion`, `badge`, `button`, `card`, `dialog`, `dropdown-menu`, `input`, `select`, `separator`, `switch`, `table`, `tabs`, `toggle`, `toggle-group`, `tooltip`). Check the inventory before adding a dependency.

---

## 4. How the patterns were derived — so a future session trusts them without re-deriving them

The 8 patterns in `OXOT_Layout_Styles.md` are not improvised, and they are not a generic component-library dump. They came out of a three-stage process.

### (a) Research, cited with real URLs

Valyu search, web search, and Perplexity deep-research (19 citations, full report read) supplied the **structural and technical lineage only** — grid mechanics, scroll behavior, accordion and tab conventions, motion libraries. Every source is listed with a real, resolvable URL in the Sources section at the bottom of `OXOT_Layout_Styles.md` — Tailwind UI, Aceternity, MagicUI, shadcn/ui, Motion, Smashing Magazine, SaaSFrame and others. Nothing was fabricated; the citations can be checked.

### (b) OXOT-native execution, not generic reuse

The research established *how the mechanics work*. The design work was binding those mechanics to real OXOT semantics. Two representative examples:

- Pattern 2 is **not** a generic "before/after slider." It is a P&ID-convention crosshair reticle, tied to the real `Baseline vs Virtual Control` Foundation Deliverable, with the divider reading as an instrumentation reticle rather than a marketing wipe.
- Pattern 3 is **not** a generic bento grid. Its cells are bound to the actual nine `SystemAsset.type` enum values from the data contract in `OXOT_content-to-visual-mapping-table.md` — so the grid is a taxonomy, not a layout convenience.

If a pattern in that file looks like something you have seen elsewhere, read past the lineage sentence to the OXOT execution beneath it. That is where the actual specification lives.

### (c) Three independent AI review rounds — and why round 3 is the one that mattered

Each round graded the **same 8 patterns** against the **actual spec text**, on four attributes: OXOT-Specificity, Spec Compliance, Accessibility, Buildability.

| Round | Model | What it found |
|---|---|---|
| 1 | Sonnet | Established the baseline and the grading rubric. Found **5 of 8** patterns needed rework. |
| 2 | Opus | Cross-checked round 1 — agreed on 6/8 verdicts, and caught **3 NEW defects round 1 missed entirely.** Including a self-contradictory scroll direction: a pattern claimed "scrolling down = descending" while its own layer order made that logically impossible. |
| 3 | Fable | Explicitly reviewed the **ALREADY-FIXED text**, not the originals. Found that **6 of 8 prior "fixes" were incomplete or cosmetic.** Example: a 3D page-flip had its *timing* corrected while the flip itself — the actual problem, wrong for a restrained editorial section — survived untouched until round 3 caught it and replaced it with a crossfade. |

**This is the reason these patterns can be trusted.** Grading original text catches obvious problems. Grading *whether a stated fix actually fixes the flagged thing* catches the far more common failure mode: a fix that changes the wording without changing the mechanism.

**Applies going forward:** any genuinely NEW pattern added to this system should follow the same 3-round approach — research → OXOT-native execution → three independent reviews, with the third round verifying the fixes rather than the originals. Do not skip straight to round 1 and call it reviewed.

---

## 5. The per-page workflow, briefly

For every page: Recall prior decisions from Ruflo memory, identify which Foundation Deliverable and which `OXOT_Composition_Rules.md` section apply, audit against `OXOT_Visual_Rules.md` and the mobile rules, build only what is flagged using the existing component families, then run the full Visual QA Checklist as a hard gate and persist what changed. A QA fail routes back to the build step — never ship with a caveat.

Full detail, including the artifact table, the four hard QA blockers, and per-step agent assignments, is in [`OXOT_Page_Development_Process.md`](./OXOT_Page_Development_Process.md). Do not improvise the process. For the concrete multi-agent execution of that process — who runs each step, exact prompt templates, and the loop-until-real-QA-passes mechanics — see [`OXOT_Agent_Build_Pipeline.md`](./OXOT_Agent_Build_Pipeline.md).

---

## 6. Hard rules currently in effect

All discovered or set 2026-08-24. All real, all from live incidents.

- **Max 4 concurrent agents.** A 5-agent swarm once died to a real API 529 outage and returned zero output. Stage work in batches of ≤4.
- **No OpenRouter text billing.** `mcp__ruflo-agents__ruflo__agent_execute` silently falls back to a **paid** OpenRouter key when no Anthropic API key is present in its container environment — confirmed, reproducibly. Use the native Claude Code `Agent` tool for any multi-agent dispatch; it runs on the Claude Max subscription, not a separate bill. *(OpenRouter for image generation remains a separate, still-sanctioned exception — different use case.)*
- **RuFlo's Recall/Persist loop is mechanically hook-enforced**, not honor-system, via `.claude/hooks/ruflo-loop-enforcer.js`. A fresh session editing any file in this project will be forced to call `memory_search` first, and cannot end its turn after an edit without calling `memory_store`. This **cycles** — Recall is required again after every Persist, not just once per session. Do not treat a hook block as a bug; satisfy it.

---

## 7. How a brand-new session picks this up, concretely

- **These are plain markdown files.** Findable with `ls` and `grep`, readable with no special tooling. If Ruflo, MCP, or any plugin is unavailable for some reason, none of that blocks you — the whole system is on disk in this directory.
- **If Ruflo IS available**, the mandatory Recall step (`memory_search`, namespace `decision-log`) surfaces the key **`oxot-master-record-2026-08-24`**, which points back to all of this.
- **Do not re-derive these patterns from scratch.** They already went through real, cited research and three rounds of independent review, with the third round specifically verifying the fixes. Re-deriving them wastes the review work and will produce something weaker. Only add a genuinely **NEW** pattern — following the same research → OXOT-native execution → 3-round-review process — if a new page type genuinely fits none of the existing 8.
- **Never build or rebuild a page without first reading its relevant `OXOT_Composition_Rules.md` section.** This is exactly the mistake that caused real project pain earlier: pages built, or left running, on old pre-spec content, caught by the project owner, redone at real cost. The section is a dozen lines. Read it.

---

## 8. Known open items

Recorded here so they are not rediscovered from scratch, and not silently "fixed" by guessing.

| Item | State |
|---|---|
| ~~Decision Ledger's "NOW" status has no correct color token.~~ **RESOLVED 2026-08-24.** Flagged three times across the review rounds, then resolved by owner decision: NOW reuses `--signal-blue` (a genuine semantic fit — "active route/communications" — rather than a forced one), not a 7th token. See `OXOT_Visual_Foundation_Spec.md` §3.1. | Closed. |
| ~~Six signal colors fail WCAG light-mode contrast.~~ **RESOLVED 2026-08-24.** 5 of 6 signals failed the 3:1 non-text minimum against `--paper-50` (verified by direct computation). Fixed with OKLCH-based `-on-light`/`-on-dark` token pairs, hue held constant, lightness adjusted per surface. See `OXOT_Visual_Foundation_Spec.md` §3.1. | Closed. |
| ~~The full page-development process has not been piloted end-to-end on any real page.~~ **PILOTED 2026-08-24** — ran all 7 steps on `/industries/water-wastewater`. Real finding: the Reference-check step correctly identified "polish 2 spots" (hero interactivity, a duplicate card-grid layout) rather than defaulting to a wasteful full rebuild, once real audit evidence was gathered first. Verified live: `tsc` clean, all interactive states click-tested, both themes checked. One real gap in the pilot's own QA gate: mobile-width visual verification could not be completed (`resize_window` tool didn't change the captured viewport in this environment) — code-level mitigation applied (explicit 44px touch targets) but not visually confirmed. Also surfaced a real, separate defect while in the file: this page's own `content.ts` still contains the literal word "NEVER" in a Decision Ledger string — the same vocabulary violation fixed in the spec docs earlier, never propagated to the real page content. Not fixed (outside the pilot's scope), flagged for a follow-up sweep across all Decision Ledger content, not just this one page. | Closed as a pilot; see `oxot-water-page-process-pilot-complete-2026-08-24` in Ruflo for full detail. |
| **Real generated imagery** (OpenRouter + GIMP + Blender toolchain, all verified working) has been applied to exactly **one** page — `/company`, dark mode only. | Site-wide rollout scope is an **undecided design question**, not a mechanical task. Do not bulk-apply imagery without direction. |
| ~~`OXOT_Master_Record.md`'s alignment-matrix Status column said "not built" or "needs pattern decision" for most real pages.~~ **RESOLVED 2026-08-24.** Checked every one of the 34 real `page.tsx` files directly (line counts, all substantive) — nearly the entire site is built. The genuinely open question per page, now separated out in that matrix, is whether its layout was ever *audited* against one of the 8 named patterns — many were built before this pattern system existed to audit against. | Closed as a documentation bug; per-page pattern audits remain individually open, tracked in the matrix. |
| **`/facility-due-diligence` and `/reference` are real, built, live routes with no corresponding entry in any per-menu spec folder**, and are missing from the nav-menu tree at the top of `site-tree.md` entirely. | Open. `/facility-due-diligence` is a confirmed deliberate owner decision (still linked from Home); `/reference`'s 3 real docs (nis2/ai-act/machine-act) are confirmed to have no defined spec home. Neither is a documentation bug to silently fix — both need an explicit decision. |
