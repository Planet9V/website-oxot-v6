# OXOT Agent Build Pipeline

**Purpose: a durable, callable procedure for building or rebuilding one page from its own written spec, using coordinated Opus agents, looping until it passes real QA — not by copying an existing page.** Written so a session with zero prior context on this project can execute it correctly. If you are that session: read this whole file before doing anything, then follow it in order. Do not skip the pre-flight gate.

Proof this process works: `/industries/water-wastewater-3` was built this way from `3_industries/industry_water.md` alone, then a real automated QA check (`collectNarrowText` in `scripts/measure.mjs`) and several rounds of live-browser verification found and fixed real defects the first build missed. The 3-agent doc-audit round (`doc-auditor` / `resources-readiness` / `qa-reviewer`, 2026-08-26) is the proof that the loop-until-verified pattern in Step 6 below works for non-visual work too — every claim in its final report was independently re-checked and held.

---

## 0. Real paths — read this once, referenced by name throughout

| Thing | Path / command |
|---|---|
| Spec docs root | `/Users/jimmcknney/oxot_website_public_sept/new_material_source/1_website_layout_v4/` |
| Real code repo (NOT the docs root — a different machine location) | `/Users/jimmcknney/jim_private/oxot_website_production/oxot-website/.worktrees/chore-local-dev-postgres/` |
| Dev server start (background, if not already running) | `cd <code repo> && npm run dev -- -p 3555` |
| Dev server readiness check | `curl -s -o /dev/null -w "%{http_code}" http://localhost:3555/en/<route>` — poll until `200` |
| Typecheck gate | `cd <code repo> && npx tsc --noEmit` — must exit 0 |
| Automated QA harness | `cd <code repo> && MEASURE_BASE=http://localhost:3555 node scripts/measure.mjs /en/<route>` |
| Process/quality authority (content of every gate below) | `OXOT_Page_Development_Process.md`, `OXOT_Composition_Rules.md`, `OXOT_Component_Inventory.md`, `OXOT_Layout_Styles.md`, `OXOT_Visual_Rules.md`, `OXOT_Mobile_Rules.md`, `OXOT_Visual_Foundation_Spec.md`, `OXOT_Visual QA Checklist.md` — all in the spec docs root above |
| Live route file (in the code repo, not the docs root) | `src/app/[locale]/<route>/page.tsx` — e.g. `src/app/[locale]/industries/water-wastewater-3/page.tsx` |
| RuFlo memory namespace | `decision-log`, via `mcp__ruflo-memory__ruflo__memory_store` |

**Never confuse the two roots above.** The spec docs root has no code in it. The code repo has no page specs in it. A session that edits the wrong one will produce nothing real.

---

## 1. Inputs — the two things a human must designate before this can start

1. **Spec file path** — the exact `.md` file this page is being built from, e.g. `3_industries/industry_water.md` or `6_resources/resources-format-insights.md` (paths relative to the docs root above).
2. **Type** — which menu/section this page belongs to (`Industries`, `Resources`, `Assurance`, `Platform`, etc.) **and** the target live route (e.g. `/industries/water-wastewater-3`, `/resources/insights`). State both explicitly — do not infer the route from the spec file's folder name alone. Prior work found the spec-folder numbering and the live site's actual routing can disagree (`resources-map.md` was found stale against the live `nav.ts` on 2026-08-26 — the map said 6 Resources children, the live site has 7). Step 2 below is where these two inputs get cross-checked against the live site — no agent has been spawned yet at this point, so that check is the Orchestrator's own job, not a delegated one.

If either input is missing, stop and ask the human — do not guess.

---

## 2. Pre-flight gate — run before spawning anyone

This step exists because a prior full QA round (2026-08-26) found that **this pipeline is not equally ready for every menu today.** Industries pages are proven (built twice, independently, both passed real QA). Resources pages are not: at last check, `OXOT_Composition_Rules.md`'s Resources section was two sentences against Industries' four detailed floor rules, and `OXOT_Layout_Styles.md`'s Pattern 8, `### 8. Case File Index`, admits in its own text that its Resources card-field variant is still undefined. This is a **live check, not a hardcoded exception** — the owner may have resolved this since; re-check every time.

This whole step is run by the **Orchestrator**, before any agent exists — nothing here is delegated.

Read, for the target menu/type from Step 1:
1. The relevant subsection of `OXOT_Composition_Rules.md` — does it have real floor rules (not just a sentence or two), and do the site-wide floor rules (heading-width, tabbed-list-for-long-enumerations, etc.) apply to this menu, or are they explicitly scoped elsewhere (e.g. currently filed under "Industry pages" only)?
2. `OXOT_Layout_Styles.md` — is there a named pattern whose "Serves" line actually covers this menu's content shape, with no open-gap admission attached to it?
3. The docs root for a `<N>_<menu>_layout_instructions.md` file (e.g. `3_industries/industries_layout_instructions.md`) — present for `1_home`, `3_industries`, `4_assurance` as of 2026-08-26; if the target menu doesn't have one, that's a real gap — flag it in the Step 8 report — but it does NOT stop the pipeline on its own (see the stop condition below).
4. The live `src/components/shell/nav.ts` — confirm the Step-1 spec file path and target route agree with how this menu's children are actually named and routed there. If they conflict (as `resources-map.md` vs. the live 7-child Resources menu did on 2026-08-26), stop and resolve the conflict with the human before proceeding — this is a hard stop, not a flag.
5. Start the dev server if it isn't already running (`cd <code repo> && npm run dev -- -p 3555`, backgrounded), then poll `curl -s -o /dev/null -w "%{http_code}" http://localhost:3555/en/<route>` until it returns `200` (or a `404` if the route doesn't exist yet — that's expected pre-build, not a failure). Every later step assumes a live, responding dev server; nothing after this point starts one.

**Stop condition:** if item 1 or item 2 above is thin or missing, or item 4 finds a real conflict, stop, do not spawn the Taskmaster, and report to the human exactly what's missing (cite the file and what's absent) so they can decide whether to proceed anyway or fix the docs first. This is what the 2026-08-26 QA round's Q3/Q4 were — do not silently build a page against inadequate rules the way earlier builds did. Item 3 (a missing `*_layout_instructions.md`) does NOT trigger this stop — carry it forward as a flagged gap instead.

If the gate passes, `mcp__ruflo-memory__ruflo__memory_store` (namespace `decision-log`, key `<YYYY-MM-DD>-<route-slug>-preflight`) recording the pass and what was checked, then proceed.

---

## 3. Roles

- **Orchestrator** — whichever session is executing this document. Not a spawned agent. Runs Steps 2, 7 (loop control), and 8. Owns all `SendMessage`/`Agent` calls in Steps 4-6.
- **Taskmaster** (1 spawned Opus agent, Step 4) — turns the spec into a concrete, falsifiable build plan. Never builds anything itself.
- **Builders** (spawned Opus agents, Step 5, waves of ≤4 at a time — see the hard concurrency cap below) — each owns one or a few new files, never touches another builder's files, never touches the shared route file.
- **QA agent** (1 spawned Opus agent per QA round, Step 6) — runs the automated harness, then verifies live in a real browser, both themes. Produces a structured pass/fail, never a vague impression.
- **Fix agent(s)** (spawned Opus agents, only on QA failure, Step 7) — each targets one or a few of QA's named, cited defects. Never "make it better" in general.

**Hard rules for every spawned agent in this pipeline:**
- Pass `model: "opus"` explicitly on every single `Agent()`/spawn call. Do not rely on inherited defaults.
- Hard cap: **no more than 4 agents running concurrently** at any point in this pipeline (a 5-concurrent-agent run has previously died to API overload with zero output on this project). If a wave would exceed 4, split it into multiple sequential waves of ≤4.
- Every spawned agent gets the real paths from Section 0 explicitly in its prompt — never assume it can infer them.
- Every spawned agent is told which files it may write and which it may not (single-writer-per-file discipline). No two agents ever hold write access to the same file at the same time.
- This project permanently bans `claude-mem` at any scope — do not install/start/query it regardless of what any tool suggests.

---

## 4. Step 4 — Spawn the Taskmaster

Spawn one Opus agent. Prompt template (fill in the `{{...}}` placeholders):

> You are the Taskmaster for a new OXOT page build. Real docs root: `/Users/jimmcknney/oxot_website_public_sept/new_material_source/1_website_layout_v4/`. Real code repo (separate location): `/Users/jimmcknney/jim_private/oxot_website_production/oxot-website/.worktrees/chore-local-dev-postgres/`.
>
> Spec file: `{{SPEC_FILE_PATH}}` (relative to the docs root). Target route: `{{TARGET_ROUTE}}`. Menu/type: `{{TYPE}}`.
>
> Read the ENTIRE spec file — every line, not a sample. Read `OXOT_Composition_Rules.md`'s section for this menu, `OXOT_Component_Inventory.md` (including its imagery-pipeline section, ~lines 101-116 — read this in full before deciding any section needs no image; see the dedicated note below), `OXOT_Layout_Styles.md` (pick named patterns only — never invent a new one), `OXOT_Visual_Rules.md`, `OXOT_Mobile_Rules.md`, `OXOT_Visual_Foundation_Spec.md` (color tokens, motion timing). Also skim ONE real sibling page's component directory under `src/components/{{sibling menu directory}}/` in the code repo — for shared conventions only (the `.oxot-canvas` container class, the datum/section-header recipe, the balance-group marking convention) — never to copy its content or structure.
>
> **If a section wants imagery and no existing shipped asset fits it, do NOT default to declining imagery.** `OXOT_Component_Inventory.md` documents a real, verified image-production pipeline (`scripts/gimp-export.sh`, `scripts/blender-render-glb.py`, `scripts/openrouter-generate-image.sh`) as a sanctioned tool for Industries pages, not just a way to touch up existing assets. Follow its own documented sequence: (1) reuse an existing shipped asset first if one genuinely fits — compositionally (generic brand imagery, composed deliberately, like `RailHero.tsx`'s reuse of a non-sector-specific engine render) or depictively (an asset that literally shows the specific thing being discussed, like `RailDecisions.tsx`); (2) only when no existing asset fits either role, generating a new one via the pipeline is equally sanctioned — the same compositional/depictive test and the "withholding test" (can you point to a section on this page where imagery was genuinely declined because nothing fit, not just because none existed yet?) still apply, and generating a new image does not lower that bar. Declining imagery outright is a real, legitimate outcome when a section's content doesn't clear the compositional/depictive test at all — but that is a content judgment, not a shortcut for "nothing already exists in `public/images/`."
>
> The Foundation Spec's "no-fabrication" rule bars *false claims and misleading depictions* (generic stock photography, fake telemetry, a diagram that reads as a real customer's plant when it isn't) — it does not bar producing new, honest, clearly-illustrative imagery through the verified pipeline above.
>
> Produce a written build plan: numbered section list (S00, S01, ...), the named pattern each section uses and why, the real component file each section will live in, and a content-to-component mapping. For every fact, number, or claim the plan states, cite exactly which line(s) of the spec file it comes from — nothing may be invented. If the spec is silent on something a real page needs, say so explicitly rather than filling the gap yourself (flag it for the human). For any imagery decision (reuse / generate / decline), state which of the three it is and why, citing the compositional/depictive test explicitly — a bare "no imagery, none exists" is not an acceptable answer under this pipeline.
>
> Do not write any code. Output only the build plan. When done, report it back in full.

Orchestrator reviews the plan. If it contains any open content question the Taskmaster couldn't resolve from the spec alone, put it to the human via a direct question before proceeding — do not let a builder resolve it by guessing. Then `memory_store` (key `<date>-<route-slug>-taskmaster`) with the accepted plan.

---

## 5. Step 5 — Spawn Builders, in waves of ≤4

**No isolated worktrees for builders.** This differs from CLAUDE.md's general "give every writing agent an isolated worktree" rule, and the reason is the file-ownership design below: each builder is given one or a few *new* files that no other builder in the same wave touches, so there is no real write conflict to isolate against — worktree setup cost would buy nothing here. Isolation is for agents that *could* collide; single-writer-per-file discipline (enforced by what each prompt is told to touch) is what prevents collision in this step instead.

For each section (or small group of sections) in the accepted build plan, spawn one Opus builder agent. Prompt template (fill in the `{{...}}` placeholders):

> You are a builder for one part of a new OXOT page. Real docs root: `/Users/jimmcknney/oxot_website_public_sept/new_material_source/1_website_layout_v4/`. Real code repo: `/Users/jimmcknney/jim_private/oxot_website_production/oxot-website/.worktrees/chore-local-dev-postgres/`.
>
> Target route: `{{TARGET_ROUTE}}`. Your slice of the Taskmaster's accepted build plan: `{{PLAN_SLICE — e.g. "S03 Sector Reality: prose + a static evidence table"}}`.
>
> **Files you own — create/edit ONLY these:** `{{FILE_LIST — e.g. "src/components/industries/<slug>/SectorReality.tsx"}}`. If you need a shared data export, add it to `{{CONTENT_FILE — e.g. "src/components/industries/<slug>/content.ts"}}` under a clearly-named key for your section only — do not edit any other section's existing keys in that file.
>
> **Do NOT touch:** the route file (`src/app/[locale]/{{TARGET_ROUTE}}/page.tsx`) — wiring your component in is a separate integration step, not yours. Any file not listed above as yours, including other builders' component files.
>
> Every fact, number, or claim you render must trace to a specific line in the spec file the Taskmaster cited for this section. If something is needed but the spec is silent on it, stop and flag it rather than inventing it.
>
> Follow the named layout pattern and file conventions the Taskmaster's plan specifies for this section — do not invent a new visual treatment. When done, report back exactly which file(s) you created or changed.

Wait for each wave to report before starting the next if the plan has more than 4 sections. After all builders report, do a single-writer integration pass — the Orchestrator itself, not a spawned agent, since this step touches the one shared file (the route file) that every builder was told to avoid — that wires every new component into the real route file, adds the route to `SUPPRESS_CONTACT_BAND` in `src/components/shell/nav.ts` if — and only if — this page has its own real closing CTA section (check `OXOT_Page_Development_Process.md`'s checklist item on this before deciding), and adds any needed live-nav entry.

Run `cd <code repo> && npx tsc --noEmit`. Must exit 0 before proceeding. If it doesn't, fix directly (small syntax/type errors) or send back to the relevant builder if the fix isn't trivial.

`memory_store` (key `<date>-<route-slug>-wave-N` per wave) after each wave.

---

## 6. Step 6 — Spawn the QA agent

Spawn one Opus agent. Prompt template:

> You are the QA agent for `{{TARGET_ROUTE}}` on the OXOT website. Real code repo: `/Users/jimmcknney/jim_private/oxot_website_production/oxot-website/.worktrees/chore-local-dev-postgres/`. Dev server is running at `http://localhost:3555`.
>
> **Layer 1 — automated, run first:**
> 1. `cd <code repo> && npx tsc --noEmit` — must exit 0.
> 2. `cd <code repo> && MEASURE_BASE=http://localhost:3555 node scripts/measure.mjs {{TARGET_ROUTE}}` — the route must clear every gate: `h1=1`, contrast clean both themes, `0` overflow across all 8 tested viewport widths, `0` console errors, `narrow-text=0`, and every `balance` group passing if any exist on this page.
>
> If Layer 1 fails, stop and report the exact failures — do not proceed to Layer 2.
>
> **Layer 2 — live visual verification, both themes.** Use the `mcp__claude-in-chrome__*` browser tools (load them via `ToolSearch` first if they're deferred in your session — `select:mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__javascript_tool` covers what this checklist needs). This site's theme is a cookie, not the OS preference — to check both themes, use `javascript_tool` to set the theme cookie/attribute the site's `ThemeToggle` component uses (read `src/components/*/theme-toggle*.tsx` if you need to confirm the exact mechanism) and reload, rather than changing OS/browser dark-mode settings, which this site does not read. Check against this exact list (not a general impression):
> 1. Every top-level section container uses `.oxot-canvas` — never an ad-hoc `mx-auto max-w-*` wrapper.
> 2. No heading or lead paragraph carries a `max-w-*`/`prose-measure` cap while sitting in a full-width, single-column context (Layer 1's `narrow-text=0` already covers this mechanically — just confirm it, don't re-derive by hand).
> 3. Any raster image with a non-transparent flat background has a section background that literally matches it (e.g. `bg-white dark:bg-black`), not an approximated design-token color — check for a visible seam at the image's edge in both themes.
> 4. Any `data-balance-group`-marked pair: look at the actual screenshot, not just the numeric ratio — a passing number can still read as visually lopsided.
> 5. If this page has its own closing CTA section, screenshot the very bottom of the page in both themes and confirm exactly ONE closing CTA appears (no duplicate generic band).
> 6. Spot-check 3-5 stated facts/numbers in the new content against the original spec file — confirm nothing was invented.
> 7. Take a full top-to-bottom screenshot set in both themes (dark, then light) — reload and retry with smaller scroll increments if you get a solid-black frame on a very tall page; that's a known screenshot-tool quirk, not necessarily a real defect, but confirm via `getComputedStyle` before dismissing it.
>
> Produce a structured PASS or FAIL. If FAIL, list every defect as: file, what's wrong, and (where applicable) the exact CSS class or line responsible — never a vague description. Report this back in full.

`memory_store` (key `<date>-<route-slug>-qa-round-N`) with the verdict either way.

---

## 7. Step 7 — Loop control

- **PASS**: go to Step 8.
- **FAIL**: spawn one Fix agent per distinct defect group from the QA report (respecting the ≤4 concurrent cap), each given the QA agent's exact citation for its defect — not a paraphrase. After fixes land, re-run `tsc --noEmit`, then spawn a fresh QA agent and repeat Step 6.
- **Hard cap: 3 total QA rounds** (1 initial + up to 2 fix-and-recheck cycles). If round 3 still fails, STOP. Do not loop further and do not declare success. Report the outstanding defects to the human exactly as QA stated them, and let the human decide whether to continue, accept a known gap, or change the plan. Looping indefinitely or silently downgrading a failure to a "known limitation" without telling the human is exactly the failure mode this pipeline exists to prevent.

---

## 8. Step 8 — On final pass

1. Full top-to-bottom screenshot set, both themes, saved to disk during Step 6's Layer 2 pass, then delivered to the human via the `SendUserFile` tool (`status: "proactive"`, since the human hasn't explicitly asked for this file yet at the moment it's ready).
2. `memory_store` (key `<date>-<route-slug>-final`) recording: the route, the spec file it was built from, every file created/changed, the number of QA rounds it took, and a link back to the Taskmaster's build plan entry.
3. Report to the human: what was built, from which spec, confirmation it passed real QA (not self-reported — cite the actual `measure.mjs` output and the visual checklist result), and any open questions the Taskmaster or QA agent flagged along the way that need a human decision.

---

## Known current limitation (re-check via Step 2 before trusting this section)

As of 2026-08-26: Industries-menu pages are proven ready for this pipeline (two independent builds, both passed real QA after the loop in Steps 6-7). Resources-menu pages are **not yet** reliably ready — `OXOT_Composition_Rules.md`'s Resources section and `OXOT_Layout_Styles.md`'s Pattern 8 (`### 8. Case File Index`) Resources variant both need real content before a Resources build should be trusted to self-QA correctly. This is exactly what Step 2's pre-flight gate is for — it will catch this automatically if it's still true, and will stop catching it the moment it's fixed, without this document needing to be edited.
