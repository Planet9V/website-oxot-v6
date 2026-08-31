# 04-PHASE-A-PLAN.md — sequencing and estimates

**Status:** Locked v2 (2026-06-03 post-pivot).
**Estimated duration:** 3-4 weeks (revised down from 4.5-6 wks after DA9 reversal + DA14 local-Docker + A0 retirement + A5 rescope).
**Phase B (customer-onboarding hub) blocked until Phase A exit criteria met.**

> **Drift rule (per DP6):** This file owns SEQUENCING + ESTIMATES only. Per-item spec detail, Cypher templates, and acceptance criteria live in `03-SPECIFICATIONS.md`. Do not duplicate spec content here — reference by `§A<n>`.

## What changed from v1

- **A0 (compatibility test) RETIRED** (DA11 retired). DA9 reversed; no shared Neo4j; no compat test needed.
- **A1 collapsed.** Was "BH CE deployment on Railway, 2-3 days." Now `docker compose up` locally, ~0.5 day.
- **A10 promoted to gate-before-A1** (DA16). Was last item; adversarial reviewer's argument honored.
- **A5 rescoped.** Was "~150 stale files"; empirical recount on 2026-06-03 shows 188 `<Route>` declarations, 181 unique paths, 207 page files → **~26 unrouted files**, not 150. A5 estimate cut to 0.5-1 day.
- **DA12 + DA13 collision discipline RETIRED as critical.** Separate BH Neo4j means no kill-switch property needed. `OT*` namespacing still good practice for clarity (per fixed DA13).

## Phase 0 — Use-Case Gate

| # | Item | Status | Est. | Spec section |
|---|---|---|---|---|
| **A10** | **Customer-value hypothesis doc — GATE before any A1-A8 work.** Who runs the L4→L1-SIS query, on what data, producing what report. If we can't articulate this in 2 pages, kill the BH track entirely. | pending | 0.5-1 d | `03-SPECIFICATIONS.md` §A10 |

**A10 exit criterion:** Document exists, Jim reviewed, locks v1 attack-path scope to 3 templates OR Phase A pivots to drop the BH track.

## Phase A — Items (post-A10 gate)

| # | Item | Status | Est. | Spec section | Dependencies | Reuse map ref |
|---|---|---|---|---|---|---|
| A1 | Local Docker compose for BH stack (Go API + own Postgres + own Neo4j) | pending | 0.5-1 d | §A1 | A10 PASS | `runbooks/LOCAL-DOCKER-BLOODHOUND.md` |
| A2 | OT collector for OpenGraph (Python ETL) | pending | 3-5 d | §A2 | A1 + A4 | RM §3 — `connections.ts` patterns |
| A3 | OXOT-native Sigma.js attack-path viewer | pending | 5-7 d | §A3 | A1, A2 (data needed), A4 | RM §4 — AssetProfilePanel, pid-canvas |
| A4 | OXOT auth → BH HMAC API key bridge | pending | 1 d | §A4 | A1 | RM §7 — auth + middleware |
| A5 | Stale-page audit + deletion PR | pending | 0.5-1 d | §A5 | independent | RM §4 — App.tsx route enum |
| A6 | Wire `register-extractor.ts` | pending | 2-3 d | §A6 | independent | RM §3 — `register-extractor.ts` exists |
| A7 | Frontend `graph_metrics` consumption | pending | 1-2 d | §A7 | independent | RM §4 — AssetProfilePanel Network tab |
| A8 | Auto route-mount Playwright smoke | pending | 1 d | §A8 | A5 | RM §1 — `@playwright/test` in deps |
| A9 | 30-min manual smoke checklist + walkthrough | pending | 0.5 d | §A9 | A1-A8 (end-of-phase) | — |

**Total estimate: 15-22 working days for 1 dev = 3-4.5 weeks. Realistic with rework buffer: 4-5 weeks.**

## Parallelization

```
A10 (gate) ──→ START
                │
                ├──→ A1 (local docker) ──→ A4 (HMAC) ──→ A2 (collector) ──→ A3 (Sigma viewer)
                │                                                              │
                ├──→ A5 (stale pages) ──→ A8 (route-mount smoke)               │
                │                                                              │
                ├──→ A6 (register-extractor wire)                              │
                │                                                              │
                └──→ A7 (graph_metrics consumption)                            │
                                                                                │
                                                          A9 (manual smoke) ◄──┘
```

- **Sequential (BH track):** A10 → A1 → A4 → A2 → A3
- **Independent of BH track:** A5, A6, A7 (can start day 1 alongside A10)
- **Closer:** A8 after A5; A9 closes the phase

## Definition of ready per item

Before starting any item, all true:

| Item | Definition of ready |
|---|---|
| A10 | None. This is the gate. Just start. |
| A1 | A10 PASSED. `docker` + `docker compose` available locally. |
| A2 | A1 BH stack healthy locally. A4 HMAC client merged. OpenGraph payload format manually validated. |
| A3 | A1 + A2 + A4 done. Sample OT data ingested in local BH. 1 saved Cypher template tested via `cypher-shell` against local BH. |
| A4 | A1 done. BH admin UI accessible locally. API key generated. |
| A5 | Empirical route + page count verified (done 2026-06-03: 188/181/207). Whitelist of protected subtrees confirmed. |
| A6 | `register-extractor.ts` re-read. `pipeline-stage-config` table contents inspected. Sample FMECA/HAZOP/RAMS docs identified. |
| A7 | `ot_inventory.graph_metrics` table contents inspected (verify nightly cron is populating). |
| A8 | A5 merged. App.tsx route count stable. |
| A9 | A1-A8 all merged. |

## Definition of done — sign-off

Every item PR requires:
- Acceptance criteria from `03-SPECIFICATIONS.md` §A<n> verified (empirical evidence in PR description).
- `05-GUARDRAILS.md` checklist line in PR description: which existing components were considered and reused.
- For R10 items (A2, A4, A6 — auth, data writes, migrations): every line read and reviewed.
- `session/progress.md` updated with command + output + run ID.
- `session/task_plan.md` status flipped to `complete`.

**Named sign-off:** Jim (sole reviewer until Phase B brings a team).

## Phase A exit criteria

All true before Phase B starts:
- [ ] A10 (use-case doc) reviewed and locked
- [ ] BH stack runs locally via `docker compose up` per `runbooks/LOCAL-DOCKER-BLOODHOUND.md`
- [ ] OT collector ran end-to-end ≥1× successfully; BH `MATCH (n:OTAsset) RETURN count(n)` matches PG row count
- [ ] Sigma.js attack-path viewer renders 3 templates against locally-ingested data
- [ ] Register-extractor populates seldon tables on FMECA/HAZOP/RAMS upload (verified with 1 sample each)
- [ ] Frontend reads `graph_metrics` in ≥2 surfaces (AssetProfilePanel Network tab, PID canvas hover)
- [ ] Stale-page PR merged; page count drops by ~26
- [ ] Route-mount smoke green in nightly Playwright workflow
- [ ] Manual smoke checklist executed; findings logged in `session/progress.md`

## Trade-offs accepted

- **No customer-facing prod deployment of BH yet** — DA15. Phase A is dev/staging only.
- **Building Sigma.js component instead of iframing BH UI:** loses BH's mature Cypher editor + saved-query library. Gain: full OXOT brand consistency.
- **Phase B (customer hub) delayed 3-4 weeks** — user-confirmed trade.

## Dependencies on the wider codebase

- The `oxot-admin` Docker migration stays as is — BH compose is separate, on the dev's local machine.
- The flake-class fix (PR #477, `--no-file-parallelism`) means CI duration is stable for A8 route-mount smoke.
- Cluster A2 file-8 defer — `seldon.vendor_cve_exposure` gap still open; will surface again in A6 if FMECA extraction touches it.

## What is explicitly NOT in Phase A

- Production deployment of BH (DA15 — deferred)
- Customer self-serve attack-path queries (admin-only v1; can change in Phase B+)
- BH Cypher editor UI inside OXOT (3 hardcoded templates only)
- Per-equipment consequence rollup (Phase B B5)
- Critical Items List queryable view (Phase B B6)
- Fixing `db/migrations/*` vs `server/db/migrations/*` split-brain (Phase B entry gate)
- Repairing legacy 50-node-truncated facilities (audit-only)
- Customer-onboarding hub UI (Phase B)
