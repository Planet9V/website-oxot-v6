# 07-DECISION-LOG.md

All decisions from the 2026-06-03 brainstorming + deep-research + swarm-review session.

## Update history

- 2026-06-03 v1: Initial DA1-DA13 lock.
- 2026-06-03 v2: Post-swarm reorganization. DA9 reversed. DA12 retired. DA13 fixed (was `OTZone`, corrected to `OTArea`). DA14 + DA15 + DA16 added for local-Docker pivot.

## Active decisions

| # | Decision | Alternatives considered | Why this option |
|---|---|---|---|
| DA1 | Customer-scoped onboarding hub layered ABOVE per-facility `FacilityHub` | Replace FacilityHub; merge with FacilityHub | FacilityHub works at facility grain; onboarding is customer grain; layering keeps separation |
| DA2 | Hierarchy = Org → Division → Branch (geo) → Facility (4 levels) | Keep 3 levels with `division_type='region'` semantic | User explicit; geography needs its own grain |
| DA3 | Bulk import = CSV / XLSX / Word / copy-paste text | CSV only | User explicit; 100+ facility scale + free-form sources |
| DA4 | Verification queue modeled after existing `equipment-library-proposals` pattern | New from scratch | Working pattern; don't invent |
| DA5 | NetworkX path-finding stays Neo4j-native (existing) | Implement networkx path-finding | Neo4j is correct at OT scale (3.1M nodes); networkx batch-only |
| DA6 | Register-extractor wiring closes document-ingestion gap | Leave orphan; manual curation | Orphan code → wire it; closes user's "validate document workflow" requirement |
| DA7 | Equipment-grain consequence rollup via SQL view | Add `asset_node_id` columns to all seldon.* tables | Lower-risk; reusable for AssetProfilePanel tabs |
| DA8 | Use `sector_taxonomy` for facility_type via `level='facility_type'` | New `facility_type_taxonomy` table | Don't duplicate taxonomy infra |
| **DA9 (REVERSED v2)** | **BH stack runs SEPARATE — own Neo4j + own Postgres in local Docker. Not shared with `oxot-neo4j`.** | v1: shared Neo4j (Option C). v1 had explicit risk against SpecterOps guidance; v2 honors guidance + eliminates compat-test gate. | Adversarial swarm review identified ~$0/mo (local Docker) vs ~$30-50/mo Railway + ongoing maintenance discipline as decisive. SpecterOps-recommended path. |
| DA10 | UI integration = API-only, OXOT-native Sigma.js component | Iframe BH UI; fork BH frontend | User explicit; brand consistency; trade-off: loses BH's mature Cypher editor + saved-query library |
| **DA11 (RETIRED v2)** | ~~A0 compatibility test is a GATE~~ | — | DA9 reversal eliminated the shared-Neo4j scenario. No compat test needed. A0 retired from Phase A item list. |
| **DA12 (RETIRED v2)** | ~~All BH-ingested data carries `source: 'bloodhound-derived'` property~~ | — | DA9 reversal: BH data lives in separate BH Neo4j; never coresident with our data. Kill-switch unnecessary. |
| **DA13 (FIXED v2)** | All OT labels prefixed `OT*` — explicitly: `OTOrganization`, `OTDivision`, `OTFacility`, `OTArea` (NOT `OTZone`), `OTSystem`, `OTAsset`, `OTEquipment` | Bare `Asset`, `Zone`, etc. | v1 had drift bug (`OTZone` in DA13 vs `OTArea` everywhere else). Fixed: use `OTArea` (matches OXOT's existing `ot_inventory.areas` table). Still good practice for clarity even though collision-critical justification disappeared with DA9. |
| **DA14 (NEW v2)** | BH stack runs in LOCAL DOCKER for Phase A dev/staging | Railway-hosted BH (v1) | User decision 2026-06-03 post-pivot. Zero infra cost. Reversible. Simplifies A1 from "Railway service" to `docker compose up`. |
| **DA15 (NEW v2)** | Production deployment target for BH deferred to post-Phase A | Decide now (Railway, self-hosted, customer-side) | Local Docker covers Phase A development needs. Prod target decision needs Phase A learnings + use-case clarity (see A10). |
| **DA16 (NEW v2)** | A10 (customer-value hypothesis doc) PROMOTED to gate-before-A1 | Keep A10 as last Phase A item | Adversarial reviewer's core argument honored: if we can't articulate the use case in 2 pages, we don't start BH integration. |

## Phase B decisions (deferred, pre-design)

To be locked at Phase B kickoff. Anticipated decisions follow `DB*` numbering.

## Process decisions

| # | Decision | Why |
|---|---|---|
| DP1 | Multi-agent-brainstorming with 4 reviewers (Architecture / Frontend / Data-flow / Adversarial) | High-impact + high-risk per using-superpowers skill rule |
| DP2 | Deep-research via Perplexity + WebFetch BEFORE locking BloodHound architecture | Refuted adversarial reviewer's "wrong tool" claim; surfaced OpenGraph; surfaced SpecterOps' "don't share Neo4j" guidance (which then drove DA9 reversal) |
| DP3 | Documentation persisted to `/Users/jimmcknney/Documents/ot_frontend/update_2/` (outside `oxot-admin` repo) | User explicit; cross-phase reference |
| DP4 | Phase A is one phase; not split into A.1/A.2 | User confirmed full scope; cutting risks scope spiral |
| DP5 (v2) | Folder reorganized into persistent/research/session/runbooks subfolders | Doc-architect swarm reviewer recommendation; addresses drift via single-source-of-truth + INDEX.md ownership matrix |
| DP6 (v2) | Document content of Phase A items lives in ONE file (`03-SPECIFICATIONS.md`); `04-PHASE-A-PLAN.md` keeps only sequencing + estimates | Auditor swarm reviewer identified drift between two files describing A0-A10; one-owner rule fixes |

## Rejected alternatives

| Rejection | Why |
|---|---|
| Adversarial reviewer's "skip BloodHound entirely" | Deep-research v9 OpenGraph reveals BH is general-purpose, not AD-only |
| Architecture reviewer's Option 3 (BH concepts only, no integration) | User wants full integration |
| Data-flow reviewer's Option 2 (Neo4j multi-database) | Made obsolete by DA14 (local Docker) which gives separate Neo4j for free |
| Data-flow reviewer's Option 1 (shared Neo4j, namespaced) | Was v1 of DA9; reversed v2 after cost-benefit review |
| 30-item Phase B scope | Empirical recount: ~12 items, most code exists already |
| 30-day soft-disable for stale pages | Adversarial reviewer right that this is process overhead at scope; just delete (git is backup) |
| Audit dossier for stale pages | 1-pager rationale in PR is enough |
| Cypher templates duplicated across 4 files | Auditor swarm reviewer flagged drift; collapsed to single owner per DP6 |

## Empirical corrections (v2)

| What | v1 claim | v2 empirical reality |
|---|---|---|
| Routes in `App.tsx` | "54 routes" and "~189" — contradictory | **188 `<Route>` declarations, 181 unique paths, 207 page files** (verified `grep -cE '<Route ' src/App.tsx` on 2026-06-03). Stale pages bucket ≈ **26 unrouted files**, not 150. A5 scope re-estimated. |
| BH on Railway | DA9 v1 | Local Docker per DA14 |
| Phase A duration | 4.5-6 weeks | 3-4 weeks post-pivot (A0 gone, A1 collapsed, A5 smaller) |
