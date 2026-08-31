# 00-START-HERE.md — read this first

**You are about to start Phase A of the OXOT Update 2 upgrade.** This file is the canonical entry point for any session — human or agent — that needs to understand and execute the work. Read it completely before opening any other file.

---

## What this folder is

`/Users/jimmcknney/Documents/ot_frontend/update_2/` holds the locked plan, architecture, decisions, risks, and working state for **Phase A — Upgrade**: integrate BloodHound CE (dev/staging via local Docker) into the OXOT graph stack, wire the orphan register-extractor, surface graph metrics in the UI, clean up the codebase, and verify end-to-end correctness.

Phase A unblocks **Phase B — Customer Operations Console** (~12 wire/fill items, ~3-4 weeks).

The locked architecture (post 2026-06-03 pivot):

- **BloodHound stack runs in LOCAL DOCKER** (BH Go API + BH PostgreSQL + BH-dedicated Neo4j). NOT on Railway. NOT sharing `oxot-neo4j`. Production deployment target is deferred — Phase A builds and tests against local Docker only.
- OXOT data flows to BH via OpenGraph ETL (`/api/v2/file-upload/`).
- OXOT-side viz is Sigma.js (NOT a BH UI iframe). 3 saved attack-path templates v1.
- Existing OXOT codebase is the source of truth — reuse over rebuild.

## Current phase

**Phase 0 — Use-Case Gate (A10 promoted).** Status: pending.

A10 is now the FIRST item, not the last. If we cannot articulate in 2 pages who runs the attack-path query, on what data, producing what report, we do not start any BH work.

After A10 passes: Phase A continues per `persistent/04-PHASE-A-PLAN.md`.

## Reading paths (pick the one that matches your role)

### Path 1 — Cold-start developer, 1 hour to context

1. This file (15 min).
2. `persistent/04-PHASE-A-PLAN.md` — the 10 items (was 11; A0 retired), table + sequencing (15 min).
3. `persistent/06-LIBRARY-REUSE-MAP.md` §3 + §4 + §5 — what NOT to rebuild (20 min).
4. `persistent/02-ARCHITECTURE.md` — the picture (10 min).

Skip everything else for hour 1. Return for spec detail when you start coding.

### Path 2 — Agent executing a specific phase item

1. This file.
2. `persistent/03-SPECIFICATIONS.md` — find your A-item section.
3. `persistent/05-GUARDRAILS.md` — check if your item is in R10 (vibe-coding FORBIDDEN) zone.
4. `persistent/06-LIBRARY-REUSE-MAP.md` — re-read the section relevant to your task.
5. `session/task_plan.md` — mark `in_progress`, log in `session/progress.md` as you work.

### Path 3 — Reviewer auditing a Phase A PR

1. This file.
2. `persistent/05-GUARDRAILS.md` G-A9 (reuse-map referenced in every PR).
3. `persistent/03-SPECIFICATIONS.md` §<your-A-item> — verify acceptance criteria.
4. `persistent/07-DECISION-LOG.md` — verify no DA violated.
5. `persistent/06-LIBRARY-REUSE-MAP.md` — verify nothing was rebuilt that exists.

### Path 4 — Phase B planner picking up after Phase A

1. `persistent/09-PHASE-B-PREVIEW.md` — the 12 items.
2. `persistent/06-LIBRARY-REUSE-MAP.md` §5 + §7 — existing endpoints + auth.
3. `session/findings.md` — F4, F5 (customer onboarding endpoints + HITL pattern).
4. `persistent/07-DECISION-LOG.md` — Phase B DBn entries.

## North Star (lifted from `persistent/05-GUARDRAILS.md`)

> **If it already exists, USE it. If you're tempted to build a new component, library, helper, abstraction, or pattern, STOP and check `persistent/06-LIBRARY-REUSE-MAP.md` first.**
>
> Phase A succeeds when the *connective tissue* is built and the *one new product surface* (attack-path) ships. It does NOT succeed by rebuilding things we already have.

## Pre-write checklist (re-read before EVERY code change)

Before writing any code for Phase A:

- [ ] Did I re-read the SPEC section in `persistent/03-SPECIFICATIONS.md` for my item?
- [ ] Did I check `persistent/06-LIBRARY-REUSE-MAP.md` for existing surface?
- [ ] Did I run `graphify query "<thing I'm building>" --graph /Users/jimmcknney/Documents/ot_frontend/.graphify/oxot-admin/graph.json`?
- [ ] Am I within the Karpathy boundaries in `persistent/05-GUARDRAILS.md`?
- [ ] Am I in R10 (vibe-coding FORBIDDEN) territory? If yes, every line will be reviewed.
- [ ] Is my commit one logical change (R14)?
- [ ] Will I append empirical evidence to `session/progress.md`?

If any answer is "no" or "I don't know" — pause and re-orient.

## Hard-stop boundaries

| Stop condition | What to do |
|---|---|
| A10 (use-case doc) hasn't been written | DO NOT START A1-A8. A10 is the gate. |
| You're about to write code that duplicates something in 06-LIBRARY-REUSE-MAP.md | STOP. Use the existing component. If you genuinely can't, document why in a `findings.md` entry before proceeding. |
| You're touching auth, BH credentials, DB migrations, or `seldon.*` writes (R10 zone) | Every line must be reviewed. PR description must call out R10 and explain why this is necessary. |
| Local Docker BH won't boot | Check `runbooks/LOCAL-DOCKER-BLOODHOUND.md`. If still stuck after 3 strikes, escalate to Jim. |
| A spec in `03-SPECIFICATIONS.md` contradicts the plan in `04-PHASE-A-PLAN.md` | `03-SPECIFICATIONS.md` is authoritative for per-item specs. `04-PHASE-A-PLAN.md` owns sequencing + estimates only. Log the contradiction in `session/findings.md`. |

## Top 3 known unknowns (must resolve early)

| # | Unknown | Where to resolve |
|---|---|---|
| 1 | A2 collector idempotency contract — stable node ID derivation | `persistent/03-SPECIFICATIONS.md` §A2 needs concrete spec; update before A2 starts |
| 2 | Sample FMECA / HAZOP / RAMS documents for A6 acceptance — where are they? | Pin in `session/findings.md` before A6 starts; use real OXOT docs not synthetic |
| 3 | A3 Cypher query timeout / result-size caps | Add to `persistent/03-SPECIFICATIONS.md` §A3 before any A3 code |

## Folder layout

```
update_2/
├── 00-START-HERE.md          ← YOU ARE HERE
├── INDEX.md                  ← canonical cross-reference + ownership matrix
├── persistent/               ← locked reference (changes require DECISION-LOG entry)
│   ├── 01-PRD.md
│   ├── 02-ARCHITECTURE.md
│   ├── 03-SPECIFICATIONS.md   ← AUTHORITATIVE per-item specs
│   ├── 04-PHASE-A-PLAN.md     ← sequencing + estimates only
│   ├── 05-GUARDRAILS.md
│   ├── 06-LIBRARY-REUSE-MAP.md
│   ├── 07-DECISION-LOG.md     ← DA1-DA15 (DA9 reversed, DA12 retired)
│   ├── 08-RISK-REGISTER.md    ← R1-R2 retired post-pivot
│   └── 09-PHASE-B-PREVIEW.md
├── research/                 ← frozen provenance, append-only
│   ├── BLOODHOUND-DEEP-RESEARCH.md
│   └── REVIEW-PANEL-FINDINGS.md
├── session/                  ← MUTABLE, planning-with-files skill
│   ├── task_plan.md
│   ├── findings.md
│   └── progress.md
└── runbooks/                 ← executable playbooks
    └── LOCAL-DOCKER-BLOODHOUND.md
```

## Acknowledged-but-deferred work

- Production deployment target for BH (Railway / self-hosted / customer appliance). Decided after Phase A exit (DA15).
- Tunnel/proxy from OXOT-prod to local-Docker BH. Not needed during Phase A (local dev only).
- Phase B (customer-onboarding hub) — `persistent/09-PHASE-B-PREVIEW.md`. Starts after Phase A exit.
- Backlog gaps (#5-#30 from 2026-06-03 swarm audit) — see `session/findings.md` F12+.

## How this folder evolves

| File class | Update rule |
|---|---|
| `persistent/*` | Changes require a new `DA*` entry in `07-DECISION-LOG.md` |
| `research/*` | Append-only; never edit existing content |
| `session/*` | Mutable; update freely as work proceeds |
| `runbooks/*` | Update when commands change; preserve old version in comments |
| `00-START-HERE.md` / `INDEX.md` | Update only when folder structure or top-level state changes |

---

When in doubt, return to this file.
