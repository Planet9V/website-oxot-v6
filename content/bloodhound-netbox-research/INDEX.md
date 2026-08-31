# INDEX.md — canonical file map + ownership matrix

Single source of cross-references. If a topic appears in multiple files, the **owning file** is authoritative; others must link here, not duplicate.

> **Drift-prevention rule:** If you find content about the same topic in two files, one is authoritative (listed here as owner) and the other must be replaced with a link to the owner. No transclusion. No copy-paste.

## File map (all 15 files)

### Root

| File | Purpose | Update when |
|---|---|---|
| `00-START-HERE.md` | Onboarding + reading paths + hard-stops | Folder structure or top-level state changes |
| `INDEX.md` | This file — cross-reference + ownership | New file added, ownership reassigned |

### `persistent/` — LOCKED reference

| File | Purpose | Authoritative for |
|---|---|---|
| `01-PRD.md` | Problem, personas, goals, user stories, NFRs, success metrics | Why we're doing Phase A; what success looks like |
| `02-ARCHITECTURE.md` | System layer diagram, data flows, auth flow | Where BH sits; how data moves; auth picture |
| `03-SPECIFICATIONS.md` | Per-item specs A1-A10 with acceptance criteria | **Item-level spec detail + Cypher templates + acceptance** |
| `04-PHASE-A-PLAN.md` | Sequencing, estimates, dependencies | **Item order and timing only** — no spec duplication |
| `05-GUARDRAILS.md` | Karpathy rules + Phase-A-specific drift rules | Rules of the road |
| `06-LIBRARY-REUSE-MAP.md` | What exists and must NOT be rebuilt | **All "do not rebuild X" claims** |
| `07-DECISION-LOG.md` | DA1-DA15 with alternatives + rationale | **All architectural / process decisions** |
| `08-RISK-REGISTER.md` | R1-R16 with mitigations | **All risk assessments** |
| `09-PHASE-B-PREVIEW.md` | Customer-onboarding hub — 12 wire/fill items | Phase B scope only |

### `research/` — FROZEN provenance

| File | Purpose |
|---|---|
| `BLOODHOUND-DEEP-RESEARCH.md` | BH CE v9.2.2 architecture, OpenGraph, OT Cypher patterns, sources |
| `REVIEW-PANEL-FINDINGS.md` | 4-reviewer panel synthesis (Architecture / Frontend / Data-flow / Adversarial) |

### `session/` — MUTABLE working state

| File | Purpose |
|---|---|
| `task_plan.md` | Phases, status, exit criteria, drift-prevention checklist |
| `findings.md` | Empirical findings F1+; updated as work proceeds |
| `progress.md` | Real-time session log; commands + results + errors |

### `runbooks/` — EXECUTABLE playbooks

| File | Purpose |
|---|---|
| `LOCAL-DOCKER-BLOODHOUND.md` | Step-by-step local Docker BH stack setup + verification |

## Ownership matrix (drift prevention)

When the same topic appears in multiple files, **owner** is canonical. Others link here.

| Topic | Owner | Linkers (must NOT duplicate) |
|---|---|---|
| The 10 Phase A items (A1-A10) — sequencing + estimates | `persistent/04-PHASE-A-PLAN.md` | `00-START-HERE.md`, `session/task_plan.md`, `01-PRD.md` (FR table) |
| Per-item spec detail + Cypher templates + acceptance criteria | `persistent/03-SPECIFICATIONS.md` | `02-ARCHITECTURE.md`, `04-PHASE-A-PLAN.md` |
| Karpathy rules R1-R22 | `persistent/05-GUARDRAILS.md` | All others link, do not restate |
| Library + component reuse claims | `persistent/06-LIBRARY-REUSE-MAP.md` | `03-SPECIFICATIONS.md` reuse sections link here |
| Decisions DA1-DA15 | `persistent/07-DECISION-LOG.md` | All others reference by DA number only |
| Risks R1-R16 | `persistent/08-RISK-REGISTER.md` | All others reference by R number only |
| Findings F1-Fn | `session/findings.md` | All others reference by F number only |
| BH architecture facts (labels, edges, OpenGraph schema, API surface) | `research/BLOODHOUND-DEEP-RESEARCH.md` | `02-ARCHITECTURE.md` links; do not restate |
| OXOT label naming convention (`OT*` prefix) | `persistent/07-DECISION-LOG.md` DA13 | All references say "per DA13" |

## Reading paths (see `00-START-HERE.md` for full descriptions)

| Consumer | Files in order |
|---|---|
| Cold-start dev (1 hr) | `00-START-HERE.md` → `04-PHASE-A-PLAN.md` → `06-LIBRARY-REUSE-MAP.md` §3-§5 → `02-ARCHITECTURE.md` |
| Agent executing item | `00-START-HERE.md` → `03-SPECIFICATIONS.md` §A<n> → `05-GUARDRAILS.md` (R10 check) → `06-LIBRARY-REUSE-MAP.md` → `session/task_plan.md` update |
| PR reviewer | `00-START-HERE.md` → `05-GUARDRAILS.md` G-A9 → `03-SPECIFICATIONS.md` §A<n> → `07-DECISION-LOG.md` → `06-LIBRARY-REUSE-MAP.md` |
| Phase B planner | `09-PHASE-B-PREVIEW.md` → `06-LIBRARY-REUSE-MAP.md` §5+§7 → `session/findings.md` F4+F5 → `07-DECISION-LOG.md` (DB* entries) |

## Quick-reference: where to look for...

| Question | File + section |
|---|---|
| What is Phase A? | `00-START-HERE.md` + `01-PRD.md` |
| What's the order? | `04-PHASE-A-PLAN.md` |
| How do I do item X? | `03-SPECIFICATIONS.md` §A<n> |
| Why did we choose X? | `07-DECISION-LOG.md` DA<n> |
| Is this risky? | `08-RISK-REGISTER.md` |
| Does X exist already? | `06-LIBRARY-REUSE-MAP.md` |
| What are the rules? | `05-GUARDRAILS.md` |
| What does the system look like? | `02-ARCHITECTURE.md` |
| Where is BloodHound's data model documented? | `research/BLOODHOUND-DEEP-RESEARCH.md` |
| What did the review panel say? | `research/REVIEW-PANEL-FINDINGS.md` |
| What's the current status? | `session/task_plan.md` + `session/progress.md` |
| What have we learned? | `session/findings.md` |
| How do I set up BH locally? | `runbooks/LOCAL-DOCKER-BLOODHOUND.md` |

## Version stamp

Last meaningful update: 2026-06-03.
Architectural pivot: DA9 reversed (separate BH stack via local Docker, not shared Neo4j).
A0 retired. A10 promoted to gate-before-A1.
Stale-page count corrected: ~26 unrouted page files (not ~150).
