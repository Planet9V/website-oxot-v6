# CLAUDE.md — OXOT Website (Planet9V/oxot-website)

> **This repository is only the website; its root is the app.** It was carried
> out of `Planet9V/OXOT-Website-JULY2026` on 2026-08-09, where it lived in a
> `web/` subdirectory beside a CMS application. Paths below are repo-root
> relative. The old repo still exists, untouched, and still holds the CMS app,
> `knowledge-source/` and `content-source/`.

Project law for any AI coding agent working in this repo. **These rules are binding.**
When any guidance conflicts, **the Karpathy rules in Section 1 win.**

> ## ⛔ READ FIRST, EVERY SESSION — `website_strategy/`
>
> **`website_strategy/` is the permanent, complete, always-referenceable source
> of truth for this website: strategy, messaging, claims, design, grading and
> process.** Start at **`website_strategy/00-START-HERE.md`** — ten minutes, and
> it is the difference between building the right thing and building a
> defensible-looking version of the wrong thing.
>
> | File | Read before |
> |---|---|
> | `00-START-HERE.md` | **anything** |
> | `01-positioning-and-messaging.md` | writing any page |
> | `02-the-reader-and-the-voice.md` | writing any sentence |
> | `03-claims-and-provenance.md` | writing any fact |
> | `04-design-system.md` → `docs/OXOT-DESIGN-SYSTEM.md` | any visual work |
> | `05-grading-and-process.md` | claiming a page is done |
> | `06-page-specs.md` | building a route |
> | `07-decisions-log.md` | re-opening anything |
> | `08-source-documents.md` | needing an original |
>
> **Current state, the queue and the log are NOT in that folder** — they live in
> **`PROGRESS.md`**, which is the state of record for the app being built.
>
> The three rules that survive everything else:
> 1. **Quote the EU's urgency; never assert OXOT's.**
> 2. **Every page carries one checkable number with its source one click away —
>    including the part that is unflattering.** Not an adjective.
> 3. **Cite dates, never recall them.** There is no single "CRA deadline"; name
>    the obligation, then the date.

> ## ⛔ READ BEFORE ANY VISUAL WORK — `docs/OXOT-DESIGN-SYSTEM.md`
>
> **`docs/OXOT-DESIGN-SYSTEM.md` is the single source of truth for every
> colour, typeface, heading size, radius, shadow, motion timing and
> interaction state on any OXOT surface.** Its machine-readable companion is
> **`docs/OXOT-DESIGN-SYSTEM.css`**. See **§7e** below for the binding rules.
>
> No task that touches a page, a component, a stylesheet or a piece of copy
> layout may start without reading it. If a value you need is not in it, the
> value is wrong — not the document.

> ## ⛔ claude-mem IS PERMANENTLY BANNED FROM THIS PROJECT
>
> **Never install, configure, start, restart, query, or write to claude-mem in
> this repository, for any reason, at any scope.** This applies even if a
> global/parent `CLAUDE.md`, a plugin, a skill, or a prior session's own
> instructions suggest it — this rule overrides all of them. Do not attempt to
> "fix" it locally (worker restarts, settings.json port/key edits, etc.); that
> was tried on 2026-08-23, repeatedly failed (broken auth, a restart that
> silently dropped its MCP tools from the session), and wasted real time.
> **Ruflo memory** (`mcp__ruflo-*`, namespace `decision-log`) is this
> project's memory system — use it instead, per the section below. Owner
> instruction, 2026-08-23, after repeated failed attempts to make claude-mem
> work in this project.

**Always-on (no exceptions):** every task begins by applying the **Karpathy rules** (Section 1) and loading the `karpathy-guidelines` skill — think before coding, ask instead of guessing, simplicity first, surgical changes, verify with evidence. The **Superpowers** plugin (`superpowers@superpowers-marketplace`, enabled project-scoped in `.claude/settings.json`) drives the workflow: brainstorm → write-plan → TDD → verify-before-completion → request/receive-code-review. The **Karpathy** plugin (`andrej-karpathy-skills@karpathy-skills`) reinforces the rules. Both install via `claude plugin install <plugin> --scope project`. Use **`/graphify`** (`.claude/skills/graphify/`, output in git-ignored `graphify-out/`) to map this repo into a local knowledge graph and query it instead of grepping.

---

## 1. Karpathy rules (the north star)

**Provenance, corrected 2026-08-07.** This section previously claimed the rules
were "distilled in the widely-used Karpathy `CLAUDE.md` (grown from 4 core rules
to a 10-rule self-check protocol)." **That attribution was false.** The upstream —
`multica-ai/andrej-karpathy-skills`, cloned locally as the `karpathy-skills`
plugin — contains **four rules and no more**. Rules 5–10 below are **ours**, and
are labelled as such. Misattributing our own rules to an external authority is
the same provenance failure this project polices in `claims.ts`.

**The core four — upstream, verbatim headings and their operative lines**

1. **Think Before Coding.** *"Don't assume. Don't hide confusion. Surface
   tradeoffs."* State assumptions explicitly. If multiple interpretations exist,
   present them — don't pick silently. If a simpler approach exists, say so;
   push back when warranted. **If something is unclear, stop. Name what's
   confusing. Ask.**
2. **Simplicity First.** *"Minimum code that solves the problem. Nothing
   speculative."* No features beyond what was asked. No abstractions for
   single-use code. No "flexibility" that wasn't requested. No error handling for
   impossible scenarios. **"If you write 200 lines and it could be 50, rewrite
   it."** Ask: *would a senior engineer say this is overcomplicated?*
3. **Surgical Changes.** *"Touch only what you must. Clean up only your own
   mess."* Don't "improve" adjacent code, comments or formatting. Don't refactor
   what isn't broken. Match existing style even if you'd do it differently.
   **"If you notice unrelated dead code, mention it — don't delete it."** Remove
   only the orphans *your* change created. **The test: every changed line should
   trace directly to the user's request.**
4. **Goal-Driven Execution.** *"Define success criteria. Loop until verified."*
   "Add validation" → *"write tests for invalid inputs, then make them pass"*.
   For multi-step work state a brief plan as `1. [Step] → verify: [check]`.
   **Strong success criteria let you loop independently; weak ones ("make it
   work") require constant clarification.**

> Upstream's own success measure: *"fewer unnecessary changes in diffs, fewer
> rewrites due to overcomplication, and clarifying questions come before
> implementation rather than after mistakes."*

**Self-check protocol (the expanded set)**
5. **Verify before claiming done.** Show evidence — tests, output, a diff — not assertions.
6. **Report uncertainty.** If unsure, say so and stop; do not bluff or paper over gaps.
7. **Stop when confused.** If you've looped twice without progress, halt and re-plan rather than thrash.
8. **Keep a running assumptions list** in the PR description; update it as facts are confirmed.
9. **Prefer evidence over confidence.** "It should work" is not acceptance; a passing test is.
10. **Leave the tree greener.** Don't introduce lint/type regressions; if you can't verify, don't merge.

---

## 1b. RuFlo — mandatory orchestration and memory (subordinate to Section 1)

**Owner instruction, 2026-08-23: RuFlo is now used for every part of this project, on every task, from here forward.** This section is binding, but it never overrides Section 1 — RuFlo is *how* work gets executed and remembered; Karpathy's judgment (ask when unclear, minimum code, surgical changes, verify before claiming done) still governs *what* gets done. If following the loop below would mean skipping a Karpathy rule, Karpathy wins.

**Infrastructure.** RuFlo runs as a centralized service in Docker (`http://localhost:3001`), reached through five already-wired MCP groups declared in `.mcp.json`: `ruflo-core`, `ruflo-agents`, `ruflo-memory`, `ruflo-intelligence`, `ruflo-devtools`. **Never run `npx ruflo`, `npx @claude-flow/cli`, `ruflo init`, or any local daemon/bootstrap command** — if the container is down, restart it via its own `docker-compose` file, never with a local process. Do not install RuFlo packages or write RuFlo server code into this website repository.

**⛔ claude-mem is permanently banned** — see the section above this one. RuFlo memory is its replacement, not a second option alongside it.

**The 4-step loop — mandatory on every task, every time, in order:**

1. **Recall.** Before inspecting code or making a decision, search prior context: `mcp__ruflo-memory__ruflo__memory_search` (namespace `decision-log`, or unscoped for a broad sweep). This is the step most tasks skip; it is the one that makes RuFlo worth using instead of starting cold.
2. **Route / Orchestrate.** Call `mcp__ruflo-devtools__ruflo__hooks_route` (or `mcp__ruflo-core__guidance` in `recommend` mode) for routing guidance on anything non-trivial. **Escalate to a swarm only past this threshold** — reuse the existing rule, don't invent a new one: **YES** (3+ files, new features, cross-module refactors, API changes, security, performance) → `mcp__ruflo-agents__ruflo__swarm_init` (`topology: "hierarchical"`) then `mcp__ruflo-agents__ruflo__task_create` / `mcp__ruflo-agents__ruflo__agent_spawn` per the Agent Routing table in `ruflo_rules.md`. **NO** (single-file edits, 1-2 line fixes, docs, config, questions) → skip orchestration, go straight to Execute.
3. **Execute.** Implement in isolated scopes — one writer per worktree, explicit file ownership if more than one agent is involved (see Concurrency rules in `ruflo_rules.md`). For repetitive, mechanical, pattern-shaped transforms across many files, `mcp__ruflo-devtools__ruflo__hooks_codemod` is available before hand-editing each one.
4. **Persist.** Before concluding, **always** — regardless of whether step 2 escalated to a swarm — call `mcp__ruflo-memory__ruflo__memory_store` with `namespace: "decision-log"`: the decision made, its rationale, any bug fix or regression warning, any schema/route/nav change. This is the step that makes the next session's Recall step actually return something.

*(The tool names above are the real, callable MCP names in this environment — `mcp__<group>__ruflo__<tool>`. Shorthand like `ruflo__memory_search` or bare `memory_search` in other docs/plans means the same tool; this file uses the exact names so they're copy-pasteable.)*

**This is mechanically enforced, not honor-system.** `.claude/hooks/ruflo-loop-enforcer.js` (registered in `.claude/settings.json`, modeled on the existing GateGuard Fact-Forcing Gate) blocks the first Edit/Write/MultiEdit each session until a `memory_search` call has happened, and blocks ending a turn if files were edited without a subsequent `memory_store` call. Verified live 2026-08-23 — it denied a real edit mid-session and only allowed the retry after Recall actually ran.

**Full reference:** `ruflo_rules.md` (repo root of `oxot_website_public_sept`, the sibling session-config repo) holds the complete Capability Brain loop (12 steps, for genuinely complex multi-agent work), Agent Comms (SendMessage-first coordination), Swarm & Routing config, and the Concurrency/authority rules. This CLAUDE.md section is the everyday minimum; that file is where to look when a task is big enough to need more than the 4 steps above.

**Memory layers — four, not one, each for a different job:**
- **RuFlo memory** (`mcp__ruflo-memory__ruflo__memory_store`, namespace `decision-log`) — the primary store for step 4 above. Local to this machine's Docker instance, fast semantic search, agent-facing.
- **Auto-memory** (`~/.claude/projects/<project>/memory/*.md`, indexed in that folder's `MEMORY.md`) — durable, human-readable, cross-session notes on user preferences, feedback, and project context. **Stays in use alongside RuFlo, not replaced by it** — owner instruction, 2026-08-23. Neither tool writes the other's store automatically; a decision worth keeping past this session may belong in both.
- **Episodic-memory** (`mcp__plugin_episodic-memory_episodic-memory__search`/`read`) — read-only, auto-indexes past Claude Code/Codex conversation transcripts in the background. No manual save step exists for it by design.
- **`memory/`** (Section 7, below) — a git-committed, team-shared directory referenced in this file; as of 2026-08-23 it does not exist on disk in this worktree. Pre-existing, unrelated to the three systems above — not something this section changes.

---

## 2. What this project is

A professional-services website: modern, reactive, mobile-first, highly interactive, with an
interactive AI agent that watches visitor behavior and aligns answers to what they're viewing.

**Stack (authoritative):**
- **Frontend:** Next.js (latest) + Tailwind CSS + shadcn/ui. A **global stylesheet is the single source of truth**; dark/light mode always enforced through it.
- **Backend/admin:** simple admin system for a small team to log in, edit menus, add pages, and add content.
- **Data:** PostgreSQL (latest) with **pgvector**; **file storage lives in Postgres itself**.
- **Embeddings:** **Ollama, `qwen3-embedding:4b`.** Vector dimension is **1536** (`EMBED_DIM=1536`, decision 2026-07-14). qwen3-embedding:4b emits **2560** natively, so we take the first 1536 dims and L2-renormalize (Matryoshka/MRL truncation) via the shared `fitDim` helper — applied identically in `src/lib/embeddings.ts` (query) and `scripts/ingest.mjs` (index) so vectors share one space. 1536 ≤ 2000 enables a plain pgvector **HNSW** index (no halfvec). The pgvector column, `fitDim`/`EMBED_DIM`, migration 001's placeholder, and migration 035 must all agree at 1536. Changing the dimension requires a full re-ingest.
- **Generation (AI agent):** provider is admin-configurable (`chatProvider`/`embedProvider` in `src/lib/ai-settings.ts`). Design intent is **Ollama as the local/primary path, OpenRouter as automatic fallback**; the shipped production default is **OpenRouter first** because no Ollama host is reachable from Railway.
- **Everything runs in Docker** (see `docker-compose.yml`).

---

## 3. Language — native Dutch + English (non-negotiable)

- **No user-facing string ships in only one language.** Every page, component, email, and agent
  reply must exist in both `nl` and `en`.
- Routing is locale-prefixed (`/nl`, `/en`); translation keys are shared; CMS content is stored per-locale.
- A change that adds English-only copy must fail review. See `.claude/skills/i18n-nl-en`.

---

## 4. The interactive AI visitor agent

- **Retrieval:** pgvector similarity over site-content embeddings (qwen3-embedding:4b, EMBED_DIM), filtered by
  active locale and boosted toward the visitor's current page.
- **Behavioral signals:** first-party, **consent-gated** capture of page/click/scroll/dwell events feeds
  the agent's context. No capture before consent (EU/NL).
- **Generation:** local Ollama first; fall back to OpenRouter on outage/latency/size. One swappable
  `LLMProvider` interface — not scattered conditionals.
- **Grounding:** answers cite retrieved chunks; on low confidence the agent says so (rule 6) rather than inventing.
- Full design in `SETUP_PLAN.md` §8.

---

## 5. How we work — GitHub process

- `main` is protected. **All changes via pull request** off `feature/*`, `fix/*`, or `chore/*`.
- PRs need green CI + review (see `.github/`). Fill in the PR template, including the assumptions list.
- Track work in GitHub Issues/Projects; link PRs with `Closes #n`.
- Superpowers skills (obra marketplace) drive the flow: brainstorm → plan → subagent-driven TDD → review.

---

## 6. Secrets — never commit

- Keys (`VALYU_API_KEY`, `OPENROUTER_API_KEY`, DB creds) live only in `.env.local` (gitignored) and
  GitHub Actions secrets. Never in code, `CLAUDE.md`, `.mcp.json`, `memory/`, or Docker image layers.
- The repo is **public** — treat every commit as world-readable. CI runs a secret scan; push protection is on.

---

## 7. Memory (shared team brain)

- `memory/` is committed and shared across all users and branches; it uses `merge=union` (see `.gitattributes`)
  so notes converge rather than conflict. Record durable decisions here, not one-off chatter.

---

## 7b. The page canvas (binding for all pages and new content)

Every page's content sits in **`.oxot-canvas`** (`src/app/globals.css`): full
width, capped at **1600px**, centred, with a 24px gutter (32px from `lg`). The
site header and footer use the same class, so a page's left edge always lands
under the "O" of OXOT and its right edge under the language toggle — at mobile,
tablet, desktop and ultrawide alike.

- **Never** introduce a new `mx-auto max-w-*` page wrapper. Use `.oxot-canvas`.
- Reading measure belongs **inside** the canvas (`max-w-3xl` on prose), never on
  the canvas itself. A narrow *column* is fine; a narrow *canvas* is not.
- Feature pages we author render **natively** (`FeatureHtml`, see
  `TRUSTED_FEATURE_SLUGS` in the `[slug]` route) so they inherit the canvas and
  the theme. Admin-pasted feature HTML stays sandboxed in `FeatureFrame`.
- Verify with a measurement, not by eye: compare the header's canvas box to the
  page's at 390 / 834 / 1440 / 2560.

## 7c. How we develop (binding)

- **Develop against one local dev server (`npm run dev`).** Never spin up a
  second parallel server to work around a problem with the first. If the dev
  server misbehaves, restart it — `i18n/*.ts` in particular is cached by
  Turbopack and will serve stale strings until you do.
- **Visually confirm every UI change through the Chrome plugin.** A passing test
  is not a look.
- **Sandboxed iframes are rejected.** Feature pages we author render natively
  (`FeatureHtml` / `TRUSTED_FEATURE_SLUGS`). A page that cannot be trusted
  natively is unpublished or rewritten - never shipped in an iframe. Iframed
  pages get no theme, no dark mode, no canvas and no CMS editing.
- **Verify against the rendered DOM, never `grep` on HTML.** Next's RSC payload
  contains the raw markdown source, so HTML greps produce false positives.
- **Content edits are migrations.** For `content_type='blocks'` pages the
  markdown body under `content/pages/**` is a dead mirror - only its frontmatter
  is live. See `docs/plans/2026-08-06-about-page-fixes/findings.md` §1.
- **Durability gate for any content migration:** build a scratch database from
  zero through every migration, then re-apply the new ones and diff the
  `page_blocks` hashes. `tests/migration-idempotence.test.ts` lints the pattern
  that makes this fail.

---

## 7d. CRA dates (binding — cite, never recall)

There is no single "CRA deadline". **`docs/reference/CRA-DATES.md` is the single
source of truth** for every date claim on this site. Cite it; never derive a
date from memory or from an older page.

The five that matter, and what each governs:

| Date | Governs |
|---|---|
| 11 Jun 2026 | Chapter IV (Arts 35-51) — conformity assessment bodies may be notified |
| 11 Sep 2026 | **Article 14 reporting** — two tracks, four notifications (see below) |
| 11 Dec 2026 | Member States to ensure sufficient notified bodies, "to avoid bottlenecks" |
| 11 Dec 2027 | **Full application** — CE marking, Annex I, Annex VII, Annex V |
| 30 Aug / 30 Oct 2026 | Harmonised standards targets (Type A/B, then Type C) |

Anchor the claim to the obligation, not to a generic deadline:
- CE marking, technical file, effort planning -> **11 Dec 2027**
- Reporting, PSIRT, the 24h clock, products already shipped -> **11 Sep 2026**
- Notified-body capacity and queue -> **11 Jun 2026** and **11 Dec 2026**

**Article 14 is TWO tracks with FOUR notifications** (corrected 2026-08-09
against the regulation text; this file previously said "24h / 72h / 14-day",
which was wrong). An **actively exploited vulnerability** — 24h, 72h, then a
final report **14 days after a corrective or mitigating measure is available**.
A **severe incident** — 24h, 72h, then a final report **one month after the
incident notification was submitted**. The 24h and 72h clocks run from
awareness; **neither final-report clock does.** Never write "24h / 72h / 14
days" as one countdown.

**Article 13 — 13(8) and 13(13) are linked, not parallel.** The support period
is **at least five years**, or the expected use time if that is shorter
(13(8)). Retention of the technical documentation and the DoC is **10 years
after placing on the market, or the support period, whichever is longer**
(13(13)) — so a long support period pushes retention past ten years. Ten years
is a floor, not the answer.

**Article 69:** products placed on the market before 11 Dec 2027 are exempt from
most requirements unless substantially modified (per unit, not per product
line) — **but Article 14 applies to all in-scope products placed before that
date.** Reporting is not grandfathered.

Every dated regulatory claim carries a re-check interval. The standards dates
and the notified-body register are the two most likely to move.

---

## 7e. The design system (binding — cite, never improvise)

**`docs/OXOT-DESIGN-SYSTEM.md` is the source of truth.**
**`docs/OXOT-DESIGN-SYSTEM.css` is its machine-readable companion.**

Sourced from the owner's *"OXOT Conformity — Design System Spec"* (claude.ai
artifact `d295f1e5-f9bf-4f89-bd89-436a66e31829`, 2026-08-07), which cites
`artifacts/conformity/src` file:line for every value. Read the `.md` before any
visual work. These are the rules people break:

1. **Tokens only. Never a raw colour.** No hex, no literal `rgb()`/`hsl()` in a
   component. The old site accumulated **41 contrast failures on one page**
   from a single hard-coded `#e8700a`.
2. **Three oranges, three jobs.** `--primary` (`28 90% 55%`) is an **accent
   fill** — it measures ~3.0:1 and fails AA under 24px. Small orange **text**
   uses `text-primary-ink` (`28 100% 33%` light / `28 100% 62%` dark). Text
   sitting **on** an orange fill uses `text-primary-foreground` — dark navy
   `210 50% 12%`, **not white**.
3. **Headings by ROLE, never by page.** `.h-page` (editorial serif, normal
   weight, one per page) · `.h-section` · `.h-sub` · `.h-card` · `.h-micro`.
   25+ files each choosing their own size between `text-2xl` and `text-7xl` is
   the documented failure this replaces. **Never write a raw `text-{size}` on a
   heading.**
4. **Shadows are two-layer and theme-tinted.** A flat 2px shelf under a soft
   blur; warm `hsl(28 20% 15%)` in light, near-opaque black **plus an inset top
   highlight** in dark. Never Tailwind's default `shadow-md`.
5. **Layout lives in `.oxot-canvas`.** Never a bespoke `mx-auto max-w-*` page
   wrapper. Reading measure goes on an inner element.
6. **Motion has three fixed durations**: buttons 200ms · cards 300ms ·
   `.cta-lift` 150ms, ease `cubic-bezier(0.22, 1, 0.36, 1)`. Transform and
   opacity only. Every hover has a `:focus-visible` twin.

**Three mandatory setup requirements (owner, 2026-08-07) — §0 of the `.md`:**

- **shadcn/ui** initialised with `style: new-york`, `baseColor: neutral`,
  `cssVariables: true`. The components read the tokens automatically; a
  different style or base colour silently breaks the system.
- **`defaultTheme="dark"`** on the theme provider. A config choice, not CSS —
  and the single change that made the biggest visual difference.
- **Every default `<Card>` lifts on hover**, applied once in
  `components/ui/card.tsx`:
  `transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0`

**One deliberate deviation, documented:** the spec loads the three faces from
Google Fonts; we self-host with `next/font` because `docs/OXOT-STYLEGUIDE.md`
§3.1 requires it (GDPR — no browser call to Google for EU/NL visitors). Same
families, weights and roles; delivery differs.

**Global reduced-motion is ours to add.** The reference implementation has no
global guard and the spec says explicitly not to repeat that gap: ship the CSS
`@media (prefers-reduced-motion: reduce)` block **and**
`<MotionConfig reducedMotion="user">` at the app root.

---

## 7g. Visual assets (binding — every page plan, no exceptions)

**A page plan is incomplete until it contains a Drawable Asset Inventory.**
This gate fires on *every* new page or new page version, whether or not the plan
intends to draw anything. It is unconditional because the failure it exists to
catch is the decision *not* to draw: the consulting page shipped its drawable
assets as typography and broke no rule doing it (`docs/consulting-2/task_plan.md`, D6).

Before any section is written, list every candidate asset the spec implies — each
flow, chain, comparison, sequence, layer model, physical object or site — and give
each one a routing decision from this table. Record the row in the plan.
**"Prose" is a legitimate outcome; an *unrecorded* one is not.**

| The asset is | Route to | Reference |
|---|---|---|
| A standards-governed drawing (P&ID, single-line, Purdue, IEC 62443 zoning, network/system architecture) | Run the §1 decision procedure | `docs/diagram-system/using-the-library.md` |
| Any drawing whose marks name real equipment | Search the 1,007-entry glyph index **before** hand-drawing a mark | `src/components/twin/drawio-manifest.ts`; §5.4 of `using-the-library.md` |
| A hero illustration, brand mark, or warm marketing graphic | **Not "leave it alone."** Choose a pipeline, or record why none applies | `docs/OPENROUTER-IMAGE-GENERATION.md`, `docs/GIMP-HEADLESS-BATCH-EXPORT.md` |
| A physical object already in `public/models/*.glb` | Headless Blender render | `docs/BLENDER-HEADLESS-RENDER.md` |
| Genuinely better as prose | Say so **in the inventory**, with the reason | — |

Three imagery pipelines are verified working on this machine and are not optional
to *consider*: headless Blender GLB render, headless GIMP batch, and OpenRouter
`google/gemini-3.1-flash-image`. A plan that never names them has not evaluated them.

**Reuse beats production.** Check `public/images/` for a shipped asset before
generating one. Never re-encode a shared asset in place — it mutates every page
already using it.

**Never import `resolveSymbol` or `DrawioGlyph` into a `"use client"` component** —
it pulls a 462 KB manifest into the client bundle (`using-the-library.md` §3.1).
`<Diagram>` is `async` and cannot mount under a client boundary at all; a section
that must host one is server-rendered, so prefer on-page anchors over accordions.

---

## 7f. The state of record (binding)

**Update it after every route.** It carries the queue, the grades, the decisions
and the log. It exists because a context compaction on 2026-08-07 cost the thread
of the plan: the old app had such a file and the new one did not.

> *"State of record. Updated after every batch, so the work survives any context
> loss."*

**Strategy lives in `website_strategy/` and should not change weekly. Current
state lives in `PROGRESS.md` and should.**

---

## 8. Definition of done (enforce rule 5)

- [ ] Tests written and passing (TDD: red → green → refactor).
- [ ] Both `nl` and `en` strings present for any user-facing change.
- [ ] No new lint/type errors; no secrets added.
- [ ] Global stylesheet respected; dark/light both verified.
- [ ] **`docs/OXOT-DESIGN-SYSTEM.md` complied with (§7e):** zero raw colours,
      zero raw `text-{size}` on a heading, roles used for every heading,
      `text-primary-ink` for small orange text.
- [ ] **Drawable Asset Inventory present (§7g):** every candidate asset routed to
      a glyph, a diagram spec, an imagery pipeline, or to prose *with a recorded
      reason*. A page of pure typography must say why, per asset.
- [ ] PR description lists assumptions and shows evidence.
