# Risk Register

All risks identified during the 2026-06-03 brainstorming + deep-research + swarm-review session.

## Update history

- 2026-06-03 v1: Initial R1-R16 lock.
- 2026-06-03 v2: Post-pivot reassessment. R1 + R2 RETIRED (DA9 reversed; BH gets its own Neo4j stack in local Docker). R17-R20 added from swarm audit (idempotency, rate-limiting, query timeouts, schedule realism).

## Critical (gate Phase A start)

| # | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| ~~R1~~ | ~~BloodHound CE migration deletes/modifies existing CDT nodes/edges in shared Neo4j~~ | — | — | — | — | **RETIRED v2** — DA9 reversed; BH stack runs separate via DA14 |
| ~~R2~~ | ~~Label collision on future BH version bump conflicting with our existing bare labels~~ | — | — | — | — | **RETIRED v2** — Separate BH Neo4j eliminates collision surface |
| **R17 (NEW v2)** | A2 ETL collector lacks idempotency contract — stable node ID derivation unspecified. Re-runs could create duplicates; DA12 kill-switch removal doesn't compensate. | High | High | Adversarial-reviewer flagged. A2 SPEC must define ID derivation (e.g., `'ot-asset-' + asset_node.id`) before A2 code. Add idempotency test (run twice, expect same row count). | Backend lead | Open |
| **R18 (NEW v2)** | A2 ETL POSTs to BH `/api/v2/file-upload/` have no chunking / rate-limiting at 3.1M-node scale. First run may OOM or time out. | Medium | Medium | Adversarial-reviewer flagged. A2 SPEC must define payload size cap + chunk strategy. Start small (1 organization) per Karpathy R4. | Backend lead | Open |
| **R19 (NEW v2)** | A3 Cypher templates use `*..8` and `*..6` variable-length traversals with no query timeout or result-size cap. Pathological graph kills BH. | Medium | Medium | Adversarial-reviewer flagged. A3 SPEC must add `LIMIT` clauses and BH-side timeout config. EXPLAIN every template before merge. | Frontend + Backend | Open |

## High

| # | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R3 | Sigma.js component build takes longer than 5-7 day budget | Medium | Medium | Time-box. If blown, fall back: ship Phase A without attack-path UI (defer A3 to Phase A.5). BH ingestion + API still valuable as backend. | Frontend lead | Open |
| R4 | OpenGraph ETL cadence (nightly) is too slow for users expecting live attack-path data | Low (v1) | Medium | Document explicit "last computed at" badge. Pursue trigger-based ingestion in Phase A.5 if user feedback demands. | Backend lead | Open |
| R5 | Customer-value hypothesis (A10) can't be written down — adversarial gate not satisfied | Low | High | A10 doc is the gate. If can't articulate use case, defer A3 attack-path UI; keep ingestion + register-extractor wiring (those have independent value). | Product / Jim | Open |

## Medium

| # | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R6 | Scope spiral into "BloodHound parity" — chasing every BH feature | Medium | Medium | Define done as "3 OT attack-path templates render in PID canvas". No more. A10 doc enforces. | Eng lead | Open |
| R7 | Customer-onboarding hub (Phase B) deferred further as Phase A consumes the calendar | High (likely) | Medium | User-accepted trade. Phase B preview doc (PHASE-B-PREVIEW.md) keeps it in sight. | Product | Accepted |
| R8 | Stale-page deletion (A5) removes a page that turns out to be deep-linkable from outside the app (email, n8n workflows, AttackNarratives strings) | Medium | Medium | Whitelist `demo/`, `sales/`, `Prospect_*`, `reference-*` subtrees. Git is the rollback. | Frontend lead | Open |
| R9 | Register-extractor wiring (A6) surfaces latent FMECA/HAZOP bugs in extraction prompts | High (likely) | Low | Budget fix-cycles in A6 estimate (already 2-3 days). Treat extraction failures as expected during dev. | Backend lead | Open |
| R10 | OXOT auth → BH HMAC bridge (A4) leaks BH credentials to frontend | Low | High | All BH API calls go through OXOT server. BH credentials never sent to browser. Code review BH-client wrapper. | Backend lead | Open |

## Low / accepted

| # | Risk | Notes |
|---|---|---|
| R11 | Route-mount smoke (A8) balloons CI duration | Mitigated by Phase A flake-fix (`--no-file-parallelism` already landed); 6.4 min baseline holds |
| R12 | `db/migrations/*` vs `server/db/migrations/*` split-brain widens during Phase A | Phase B kickoff gate fixes this; tracked separately |
| R13 | Cluster A2 file-8 (`round-7-r7-027-mc-money-path`) defer reopened by Phase A6 register-extractor work | If FMECA extraction populates the missing `seldon.vendor_cve_exposure` analog, file-8 may auto-resolve. Track separately. |
| R14 | A0 compat test reveals BH writes are destructive — Phase A fully restarts on Option A | Documented fallback path; ~1-2 days extra setup |

## Decision-related risks

| # | Risk | Notes |
|---|---|---|
| R15 | Building Sigma.js component (DA10) vs using iframe — we lose BH's mature Cypher editor + saved-query library | Accepted trade for brand consistency. v1 ships 3 saved query templates only. |
| R16 | Single shared Neo4j (DA9) goes against SpecterOps guidance | A0 + DA12 + DA13 are the discipline. Documented in BLOODHOUND-DEEP-RESEARCH.md. |

## Review cadence

- ~~R1, R2~~: RETIRED v2.
- R3: re-evaluated at A3 mid-point.
- R5: A10 promoted to GATE — phase exit blocked if doc fails review.
- R17, R18, R19: must be addressed in `03-SPECIFICATIONS.md` updates BEFORE the corresponding A-item starts.
- R20 (new): see below.
- Others: reviewed at Phase A exit.

## Added 2026-06-03 v2 (post-swarm)

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R20 | Schedule slip — empirical math suggests 8-10 weeks for 1 dev vs the 3-4 week estimate (Impl-lead-reviewer flag) | High | Medium | Make staffing assumption explicit (1 dev = ~4-5 weeks realistic with rework). Re-evaluate weekly via `session/progress.md`. Cut A3 scope (1 template instead of 3) if week-2 burn rate is wrong. |
| R21 | Cross-language ETL assumption (Python collector reusing TS `connections.ts` patterns) — non-trivial (Auditor-reviewer flag) | Low | Medium | A2 SPEC must specify Python-side DB connection (use `psycopg2` + `neo4j` Python driver directly, NOT shim to TS code). |
| R22 | `pipeline-stage-config` table rows for `extract_fmeca` etc. not confirmed — A6 may silently no-op (Adversarial-reviewer flag) | Medium | Medium | A6 definition-of-ready (in `04-PHASE-A-PLAN.md`) requires inspecting `pipeline-stage-config` first. If rows missing, seed before code. |
