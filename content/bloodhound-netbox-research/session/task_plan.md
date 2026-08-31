# task_plan.md — Phase A Upgrade

**Skill:** planning-with-files
**Owner:** Jim Mcknney (Eng lead) — single-tenant per OXOT deployment topology
**Started:** 2026-06-03
**Last updated:** 2026-06-03 v2 (post-pivot — DA9 reversed, DA14 local Docker, A0 retired, A10 promoted)
**Estimated duration:** 3-4 weeks (revised from 4.5-6 wks)
**Goal:** Ship Phase A upgrade — BloodHound CE v9.2.2 running in LOCAL DOCKER (DA14, separate stack), OXOT-native Sigma.js attack-path viewer, register-extractor wired, stale-page audit, working-code verification. Unblock Phase B (customer-onboarding hub).

> **Authoritative source for sequencing + estimates:** `../persistent/04-PHASE-A-PLAN.md`. This file mirrors phase status for the active session.

---

## Goal statement

> Build the Phase A upgrade exactly as specified in `PHASE-A-UPGRADE.md` without inventing new components, libraries, or patterns where existing ones suffice. Every phase must read `LIBRARY-AND-CODEBASE-REUSE-MAP.md` before generating any new code. Drift prevention is a first-class deliverable.

## 5-question reboot

| Question | Answer |
|---|---|
| Where am I? | See "current phase" below |
| Where am I going? | Phase A exit criteria in PHASE-A-UPGRADE.md |
| What's the goal? | This file, top |
| What have I learned? | findings.md |
| What have I done? | progress.md |

## Karpathy alignment (read before every decision)

| Rule | Phase A application |
|---|---|
| R1 — Build it from scratch, then use the library | Before adopting BH OpenGraph, we read the SpecterOps docs (already done in BLOODHOUND-DEEP-RESEARCH.md). No magic. |
| R2 — Start simple. Add complexity only when forced | A0 (compat test) before A1 (BH deploy). 3 attack-path templates v1, not all of BH's library. |
| R3 — Know your data before you touch the code | A0 OBSERVES BH's migrations against Neo4j BEFORE deploying. A2 ETL reads real `ot_inventory` + CDT shape, doesn't guess. |
| R4 — Overfit a tiny batch first | A3 ships 1 template (L4→L1-SIS) end-to-end before adding the other 2. |
| R5 — Vanilla over clever | Option C shared Neo4j is the user's call; mitigated by A0 gate + DA12 kill-switch. No magic Cypher contortions. |
| R6 — Say "I don't know" | A0 report explicit on what migrations BH ran. A9 manual smoke report distinguishes "verified" from "assumed." |
| R7 — Empirical vs theoretical | Every claim in progress.md is empirical: command output, run ID, count, timestamp. |
| R8 — No marketing language | Skip "comprehensive," "robust," "seamless." Just describe the work. |
| R9 — Vibe-coding permitted for scaffolding, throwaway scripts, Dockerfiles, GH Actions, dashboards | Stale-audit script (A5), Playwright route-mount spec (A8), BH deployment compose are vibe-OK. |
| R10 — Vibe-coding FORBIDDEN for auth, billing, data writes to prod tables, security boundaries, migrations not reversible | A0, A1, A2, A4 are all in this zone. Every line read before merge. **A0 + A4 + DA12 are non-negotiable safety boundaries.** |
| R11 — Visualize before debugging | A0 captures `db.constraints()` + `db.indexes()` BEFORE BH migrations. |
| R12 — Reproduce before fixing | Any failure → reproduction case in findings.md before patch. |
| R13 — Implement before importing | Sigma.js component starts with an in-process BFS over canvas edges before reaching for heavier viz libs (per Frontend reviewer). |
| R14 — One change per commit | A0 / A1 / A2 / A3 / etc. each = own PR, own commit. No bundling. |
| R15-R22 — Graphify rules | Before grepping `server/lib/`, query graphify (AST graph at `.graphify/oxot-admin/graph.json`). |

## Current phase

**A10 — Customer-value hypothesis doc (PROMOTED GATE, DA16).** Status: `pending`.

If A10 cannot produce a 2-page articulation of who runs attack-path queries, on what data, producing what report — kill the BH track entirely. No A1-A8 work begins until A10 PASS.

## Phase map (v2)

| # | Phase | Status | Est. | Spec section | Reuse map ref |
|---|---|---|---|---|---|
| ~~A0~~ | ~~Compatibility test (GATE)~~ | **RETIRED v2 — DA11 retired** | — | — | — |
| **A10** | **Customer-value hypothesis doc — GATE (DA16)** | pending | 0.5-1 d | SPEC §A10 | — |
| A1 | Local Docker compose for BH stack (DA14) | pending | 0.5-1 d | SPEC §A1 | `runbooks/LOCAL-DOCKER-BLOODHOUND.md` |
| A2 | OT collector for OpenGraph (Python ETL) | pending | 3-5 d | SPEC §A2 | RM §3 — `connections.ts` |
| A3 | OXOT-native Sigma.js attack-path viewer | pending | 5-7 d | SPEC §A3 | RM §4 — `AssetProfilePanel`, `pid-canvas` |
| A4 | OXOT auth → BH HMAC API key bridge | pending | 1 d | SPEC §A4 | RM §7 — auth + middleware |
| A5 | Stale-page audit + deletion PR (~26 files) | pending | 0.5-1 d | SPEC §A5 | RM §4 — App.tsx route enum |
| A6 | Wire `register-extractor.ts` | pending | 2-3 d | SPEC §A6 | RM §3 — `register-extractor.ts` exists |
| A7 | Frontend `graph_metrics` consumption | pending | 1-2 d | SPEC §A7 | RM §4 — AssetProfilePanel Network tab |
| A8 | Auto route-mount Playwright smoke | pending | 1 d | SPEC §A8 | RM §1 — `@playwright/test` in deps |
| A9 | 30-min manual smoke checklist + walkthrough | pending | 0.5 d | SPEC §A9 | — |

**Total estimate: 15-22 working days = 3-4.5 weeks for 1 dev. Realistic with rework: 4-5 weeks.**

**Parallelization:**
- Serial: A0 → A1 → A2 → A3 (A3 depends on ingested data); A4 can join after A1
- Independent (start day 1): A5, A6, A7
- Closing: A8 after A5; A9 + A10 last

## Drift-prevention checklist (read before EVERY phase)

Before writing any code in a phase:

1. **Read [LIBRARY-AND-CODEBASE-REUSE-MAP.md](./LIBRARY-AND-CODEBASE-REUSE-MAP.md).** Does what I'm about to build already exist?
2. **Query graphify.** `graphify query "<thing>" --graph /Users/jimmcknney/Documents/ot_frontend/.graphify/oxot-admin/graph.json` — does the symbol/file exist?
3. **Check [GUARDRAILS.md](./GUARDRAILS.md).** Am I about to violate a guardrail?
4. **Check Karpathy rule 1.** Can I explain what the library does before adding it?

If you can't answer YES to "this is genuinely new work needed by Phase A," stop and ask.

## Errors encountered

| Phase | Error | Attempt | Resolution |
|---|---|---|---|

(populated as Phase A proceeds)

## Decisions log

See [DECISION-LOG.md](./DECISION-LOG.md). DA1-DA13 locked at brainstorming exit 2026-06-03.

## Exit criteria (Phase A complete)

All true:
- [ ] A0 compat test passed OR fallback to Option A documented in `A0-COMPAT-TEST-RESULT.md`
- [ ] BH CE running on Railway, healthy (curl `/api/version` returns 200)
- [ ] OT collector ran end-to-end ≥1× (Neo4j `MATCH (n:OTAsset) RETURN count(n)` returns expected count)
- [ ] Sigma.js attack-path viewer renders 3 templates against ingested data
- [ ] Register-extractor populates seldon tables on FMECA/HAZOP/RAMS upload (verified by uploading 1 sample of each)
- [ ] Frontend reads `graph_metrics` in ≥2 surfaces
- [ ] Stale-page PR merged, page count ≤60
- [ ] Route-mount smoke green in nightly workflow
- [ ] Manual smoke checklist executed; findings logged
- [ ] Customer-value hypothesis doc locked

## After Phase A

→ Fix `db/migrations/*` vs `server/db/migrations/*` split-brain (Phase B entry gate per data-flow reviewer)
→ Start Phase B per [PHASE-B-PREVIEW.md](./PHASE-B-PREVIEW.md) (~12 wire/fill items, 3-4 weeks)
