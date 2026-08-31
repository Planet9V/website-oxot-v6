# progress.md — Phase A session log

Real-time log of Phase A work. Every entry: timestamp + phase + action + result. Errors recorded with reproduction case (Karpathy rule 12).

---

## Pre-Phase A — brainstorming + planning complete

| Time (UTC) | Phase | Action | Result |
|---|---|---|---|
| 2026-06-03T~12:00 | Pre-A | `/brainstorming` opened to scope customer-onboarding hub | Started |
| 2026-06-03T~12:30 | Pre-A | 6 parallel research agents dispatched to audit existing code | Returned corrected inventory: ~12 items not 30 |
| 2026-06-03T~12:45 | Pre-A | User pivots — wants upgrade phase with BloodHound + stale audit + working-code verify FIRST | Scope shift |
| 2026-06-03T~13:00 | Pre-A | 4-reviewer adversarial panel (Architecture / Frontend / Data-flow / Adversarial) | Returned; adversarial said "BH wrong tool" |
| 2026-06-03T~13:15 | Pre-A | User pushes back on adversarial — wants BH fully integrated, single Neo4j; invokes `/deep-research` | Required research |
| 2026-06-03T~13:25 | Pre-A | Perplexity deep-research + WebFetch + WebSearch on BH CE | Surfaced OpenGraph (v9), SpecterOps' "don't share Neo4j" guidance |
| 2026-06-03T~13:35 | Pre-A | User picks Option C (shared Neo4j) + API-only UI + full Phase A (4.5-6 wk) | Locked |
| 2026-06-03T~13:41 | Pre-A | 7 docs written to `update_2/` (README, PHASE-A-UPGRADE, PHASE-B-PREVIEW, DECISION-LOG, RISK-REGISTER, BLOODHOUND-DEEP-RESEARCH, REVIEW-PANEL-FINDINGS) | Done |
| 2026-06-03T~13:45 | Pre-A | User invokes `/planning-with-files` to add canonical 3 files + 5 supplements | In progress |

## Phase A — current

### A0 — Compatibility test (gate)

**Status:** pending — not started

**Pre-flight checklist:**
- [ ] Snapshot `oxot-neo4j` (Railway-hosted) to backup
- [ ] Provision isolated Neo4j instance (NOT production)
- [ ] Restore snapshot data into isolated Neo4j
- [ ] Pull `specterops/bloodhound:v9.2.2` Docker image
- [ ] Generate `bloodhound.config.json` pointing at isolated Neo4j Bolt URL
- [ ] Capture baseline: `CALL db.constraints()` + `CALL db.indexes()` + `CALL db.labels()` BEFORE BH boots

**Migration observation log:**
(Populated when BH boots against isolated Neo4j)

**Collision report:**
(Populated when A0 completes)

**Exit decision:**
- [ ] PASS — proceed to A1
- [ ] FAIL — document in `update_2/A0-COMPAT-TEST-RESULT.md`; fall back to Option A (separate BH Neo4j); re-scope A1-A3

---

(A1-A10 sections added as work begins)

---

## Errors encountered

(empty)

## Reproductions for fixes

(empty)

## Files created/modified by Phase A

(populated as files are committed)

## Test results

(populated as tests run)

## CI runs

(populated as CI executes)
