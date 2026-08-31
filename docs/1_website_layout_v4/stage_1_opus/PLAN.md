# stage_1_opus — Independent second-pass research: components + layouts, Opus + orchestration

Standalone copy of the approved plan, saved here for continuity (isolated per owner instruction, since context compaction was imminent when this was written). The live/working copy is `~/.claude/plans/i-am-unhappy-with-fuzzy-biscuit.md` (v2 section, at the top of that file as of 2026-08-24).

## Context

The owner wants a genuinely **independent** second research pass at the same two questions already answered once this session (component library choices, layout pattern design) — not a refinement of the existing `../OXOT_Component_Inventory.md` / `../OXOT_Layout_Styles.md`, but a from-scratch process using different orchestration, to see whether it converges, diverges, or surfaces something better. Explicit requirements from the owner's own words: use **Opus**, real **orchestration**, real **sequential/step-by-step reasoning** (not single-shot), and research through **Perplexity, Valyu, and web search**.

**Isolation requirement (why this folder exists):** every artifact from this new process — plan copy, research output, comparison — lives in this dedicated subfolder, `new_material_source/1_website_layout_v4/stage_1_opus/`, separate from the existing docs in the parent folder. This was an explicit, urgent owner instruction given mid-planning, ahead of an expected context compaction.

## Tooling — verified live, not assumed

| Need | Mechanism | Verified detail |
|---|---|---|
| Sequential reasoning | `mcp__plugin_everything-claude-code_sequential-thinking__sequentialthinking` | Confirmed loadable. Required params: `thought`, `nextThoughtNeeded`, `thoughtNumber`, `totalThoughts`. Iterative — call repeatedly to build structured, revisable reasoning. |
| Perplexity | `mcp__MCP_DOCKER__perplexity_research` (Docker gateway) — **preferred**, zero OpenRouter billing | Real Perplexity models also exist on OpenRouter but routing through OpenRouter would revisit the billing issue already fixed this session (see hard rule below) for no benefit. |
| Valyu | `mcp__valyu__valyu_search` (MCP, primary) | Confirmed loadable. Raw Python SDK (`valyu` v2.10.0, `VALYU_API_KEY` set) also confirmed usable as fallback. |
| Web search | Native `WebSearch` | Already used successfully multiple times this session. |
| Orchestration | `Workflow` tool | Opt-in satisfied by owner's own words ("use opus and orchestration"). Actual concurrent `agent()` calls capped at 4 (hard rule, see below) even though the tool's internal cap is higher. Session workflow-size guideline: medium, ≤15 agents total — this design uses ~5. |

## Plan

### Step 0 (done first, before any research) — Persist continuity to memory
One `memory_store` call (Ruflo, `decision-log` namespace) + a matching auto-memory file, so a post-compaction session recovers full continuity via Recall.

### Step 1 — Independent Research phase (Workflow, 3 parallel agents, model: opus)
Each researches the same question — best 2026 layout-pattern and component approaches for a B2B industrial/OT-cybersecurity SaaS product on Next.js/Tailwind/shadcn — via a different tool, and does **not** read the existing `OXOT_Component_Inventory.md`/`OXOT_Layout_Styles.md`. Each **does** read the real OXOT spec files fresh (`../OXOT_Visual_Foundation_Spec.md`, `../OXOT_Composition_Rules.md`, `../OXOT_Mobile_Rules.md`, `../OXOT_content-to-visual-mapping-table.md`) — ground truth the independent pass must still honor.
- Agent A — Perplexity (`mcp__MCP_DOCKER__perplexity_research`)
- Agent B — Valyu (`mcp__valyu__valyu_search`)
- Agent C — Web search (`WebSearch`)

### Step 2 — Independent Synthesis (1 agent, model: opus, uses `sequentialthinking`)
Given the 3 research streams plus the spec files, reasons step-by-step (real iterative `sequentialthinking` calls) to produce its own component list and its own named layout patterns — independent naming, independent structure, no reference to the existing 8-pattern system.

### Step 3 — Comparison (1 agent, model: opus)
Given both Step 2's output and the existing `OXOT_Component_Inventory.md`/`OXOT_Layout_Styles.md`, produce a structured comparison: convergence (validates existing choices), divergence, and whether either pass found something the other missed.

### Step 4 — Write outputs, isolated (this folder)
- `stage_1_opus/PLAN.md` — this file
- `stage_1_opus/independent_research_findings.md` — Step 1+2 output
- `stage_1_opus/comparison_vs_existing_system.md` — Step 3 output

The existing docs in the parent folder are **not modified** — this is a comparison exercise; adoption decisions are the owner's to make afterward.

### Step 5 — Persist final state to Ruflo (mandatory loop close)

## Hard rules in effect (governance, established earlier this session)
- **Max 4 concurrent agents** — a real 5-agent swarm died to an API 529 outage with zero output. Never exceed 4 concurrent `Agent`/`Workflow` calls.
- **No OpenRouter text billing** — `ruflo agent_execute` silently bills a separate OpenRouter key even though its description claims Anthropic. Banned; use the native `Agent`/`Workflow` tools (Claude Max subscription) instead.
- RuFlo's Recall/Persist cycle is mechanically enforced (`.claude/hooks/ruflo-loop-enforcer.js`) — a fresh `memory_search` is required before every edit, every cycle.

## Critical files
- New: this whole `stage_1_opus/` subfolder
- Read (not modified): `../OXOT_Visual_Foundation_Spec.md`, `../OXOT_Composition_Rules.md`, `../OXOT_Mobile_Rules.md`, `../OXOT_content-to-visual-mapping-table.md`, `../OXOT_Component_Inventory.md`, `../OXOT_Layout_Styles.md`

## Verification
Read each written file back in full after writing — this session's established standard throughout, never self-reported.

## Status as of this save (2026-08-24, pre-compaction checkpoint)
Plan approved by owner via ExitPlanMode. Step 0 (this file + Ruflo memory_store + auto-memory) in progress. Steps 1-5 not yet started.
