# SPECIFICATIONS.md — Phase A detailed specs

Per-item specifications for A0-A10. Each section: scope, inputs, outputs, dependencies, testable acceptance criteria, reuse references.

> **Discipline rule:** Before implementing any spec section, re-read [LIBRARY-AND-CODEBASE-REUSE-MAP.md](./LIBRARY-AND-CODEBASE-REUSE-MAP.md) and [GUARDRAILS.md](./GUARDRAILS.md). Drift-prevention is a deliverable.

---

## §A0 — Compatibility test (GATE)

**Scope:** Prove BloodHound CE v9.2.2 can run against `oxot-neo4j` without modifying our existing data or labels. Hard gate — A1 cannot start until A0 passes.

**Inputs:**
- Snapshot of `oxot-neo4j` (Railway-hosted, production-equivalent)
- BloodHound CE v9.2.2 Docker image (`specterops/bloodhound:9.2.2`)
- Isolated Neo4j 5.x instance for testing

**Outputs:**
- `update_2/A0-COMPAT-TEST-RESULT.md` — full report with: BH version, Neo4j version, every migration executed, before/after `db.constraints()` + `db.indexes()` + `db.labels()` outputs, collision findings, recommendation (PROCEED / FALLBACK).

**Dependencies:** None. Can run independently of other Phase A items.

**Acceptance criteria (PROCEED case):**
- BH boots cleanly against isolated Neo4j (HTTP 200 on `/healthz`).
- No constraint or index created by BH overlaps a label our app uses: `Asset`, `Zone`, `Facility`, `System`, `Equipment`, `Customer`, `User`, `Computer`, `Group`, `Domain`, `Organization`, `Division`, `Area`.
- Sample queries from `server/routes/graph-explore.ts` against the test Neo4j return correct results post-BH-boot.
- All migrations BH ran are listed in the report with their Cypher statements.

**Acceptance criteria (FALLBACK case):**
- Collision documented with exact Cypher statement that introduced it.
- Fallback to Option A (separate BH Neo4j with ETL) documented and re-scoped in `update_2/A1-ALT-OPTION-A.md`.

**Reuse:**
- `server/lib/connections.ts` — used by sample queries.
- BH custom installation docs (BLOODHOUND-DEEP-RESEARCH.md).

**Karpathy alignment:** R3 (know data before code), R11 (visualize), R12 (reproduce), R10 (vibe-coding FORBIDDEN for data writes).

---

## §A1 — BH CE deployment on Railway

**Scope:** Provision BH CE service on Railway pointing at `oxot-neo4j` (post-A0 pass). Healthy + logged + admin can sign in.

**Inputs:**
- A0 PASS verdict.
- `bloodhound.config.json` template with `graph_driver.uri` = `oxot-neo4j` Bolt URL.
- Railway Postgres instance for BH app state (separate from `oxot-postgres`).

**Outputs:**
- `bloodhound-ce` Railway service running.
- BH admin password stored in Railway env.
- Internal Railway URL for BH (not exposed to public).
- Logs piped to Railway log aggregator.

**Dependencies:** A0 PASS.

**Acceptance criteria:**
- `curl <internal-url>/healthz` returns 200.
- Admin logs into BH UI at internal URL (used for setup only — DA10 says no end-user iframe).
- BH startup logs show "graph driver: neo4j, uri: <oxot-neo4j>".
- Empty graph query (`MATCH (n:OTAsset) RETURN n`) returns empty set (data ingestion in A2).
- `/api/v2/file-upload/` returns 400 on missing file (i.e., endpoint is live).

**Reuse:**
- Railway service pattern (other Railway services in OXOT).
- Existing env-var management.

**Karpathy alignment:** R5 (vanilla — use SpecterOps' published Docker setup, no custom build), R9 (vibe-OK for Dockerfile/compose).

---

## §A2 — OT collector for OpenGraph

**Scope:** Python script that reads OT data from `ot_inventory` + `oxot-neo4j`, transforms to OpenGraph JSON, POSTs to BH `/api/v2/file-upload/`. Nightly cron.

**Inputs:**
- BH HMAC API key (from A1).
- Read access to `ot_inventory` schema (PG) and CDT edges (Neo4j).

**Outputs:**
- `agents/ot_opengraph_collector.py` — collector script.
- `.github/workflows/ot-opengraph-collector.yml` OR Railway cron — nightly trigger.
- OpenGraph JSON archived to MinIO/S3 for replay.

**Dependencies:** A1, A4 (for HMAC client).

**Schema (must match exactly):**
```json
{
  "graph": {
    "nodes": [
      {
        "id": "ot-asset-<uuid>",
        "labels": ["OTAsset"],
        "properties": {
          "name": "...",
          "purdue_level": 2,
          "criticality": "critical",
          "sil_level": 3,
          "highvalue": true,
          "system_tags": "admin_tier_0",
          "source": "bloodhound-derived"
        }
      }
    ],
    "edges": [
      {
        "id": "ot-edge-<uuid>",
        "type": "OT_CAN_REACH",
        "source": "ot-asset-<uuid-a>",
        "target": "ot-asset-<uuid-b>",
        "properties": {
          "protocol": "Modbus/TCP",
          "port": 502,
          "attackability": 7,
          "source": "bloodhound-derived"
        }
      }
    ]
  }
}
```

**Label/edge taxonomy (DA13):**
- Nodes: `OTOrganization`, `OTDivision`, `OTFacility`, `OTArea`, `OTSystem`, `OTAsset`, `OTEquipment`.
- Edges: `OT_BELONGS_TO`, `OT_CAN_REACH`, `OT_CAN_CONFIGURE`, `OT_IN_ZONE`.
- Every node + edge: `source: 'bloodhound-derived'` (DA12).

**Acceptance criteria:**
- Cron runs end-to-end ≥1× successfully.
- BH `MATCH (n:OTAsset) RETURN count(n)` returns count == `SELECT count(*) FROM ot_inventory.asset_nodes`.
- High-value query `MATCH (n:OTAsset {highvalue:true}) RETURN n LIMIT 10` returns critical OT assets.
- Re-running collector is idempotent (uses OpenGraph upsert semantics via stable node IDs).
- Failed runs visible in logs with reproducible error.

**Reuse:**
- `server/lib/connections.ts` getPool() for PG read.
- `server/lib/connections.ts` neo4jQuery() for CDT edge read.
- Pattern from `agents/networkx_*.py` for Python subprocess style.
- `server/lib/bloodhound-client.ts` (A4) for HMAC POST.

**Karpathy alignment:** R3, R4 (start with 1 organization end-to-end before scaling), R7 (log empirical counts).

---

## §A3 — OXOT-native Sigma.js attack-path viewer

**Scope:** Mode toggle in existing `src/pages/world/pid-canvas.tsx` Panel. New `AttackPathViewer` component. 3 hardcoded saved query templates. Reuses existing AssetProfilePanel for node drill-down.

**Inputs:**
- BH HMAC client (A4).
- Ingested OT data in BH (A2).
- Existing PID canvas + AssetProfilePanel (LIBRARY-MAP §4).

**Outputs:**
- `src/components/attack-path/AttackPathViewer.tsx` — Sigma.js renderer.
- `src/lib/attack-paths.ts` — in-process BFS helper (60-100 LOC per Frontend reviewer).
- `server/routes/attack-paths.ts` — proxy + 3 templates.
- `src/pages/world/pid-canvas.tsx` — mode toggle added to existing Panel.
- New deps: `sigma`, `graphology`.

**3 saved query templates (DA10 lock):**

1. **L4→L1-SIS shortest path:**
```cypher
MATCH p = shortestPath(
  (a:OTAsset {id: $source})
   -[:OT_CAN_REACH|OT_CAN_CONFIGURE|OT_IN_ZONE*..8]->
  (b:OTAsset {id: $target})
)
RETURN p
```

2. **Conduit-bypass detection:**
```cypher
MATCH p = allShortestPaths(
  (a:OTArea {id: $source})-[*..6]->(b:OTArea {id: $target})
)
WHERE NONE(n IN nodes(p) WHERE n.type IN ['firewall','data_diode'])
RETURN p
LIMIT 100
```

3. **Blast radius:**
```cypher
MATCH (compromised:OTAsset {id: $source, source:'bloodhound-derived'})
-[*..6]->(downstream)
RETURN downstream.name, downstream.purdue_level, count(*) AS reach_count
ORDER BY reach_count DESC
LIMIT 25
```

**Acceptance criteria:**
- User toggles to attack-path mode in PID canvas, picks source + target, sees top-3 paths rendered.
- Node click in attack-path mode opens existing AssetProfilePanel with that asset's data (REUSE, do not fork).
- All 3 saved query templates return paths against ingested test data.
- v1 viewer in-process BFS over canvas edges (≤1k nodes) — Sigma WebGL used only when query result exceeds 100 nodes (per Frontend reviewer's "implement before importing" / Karpathy R13).

**Reuse (mandatory — do NOT rebuild):**
- `src/components/customer/facility-hub/AssetProfilePanel.tsx` — node drill-down.
- `src/pages/world/pid-canvas.tsx` Panel — mode toggle location.
- `src/lib/nav-utils.ts` — for any URL building.
- `@tanstack/react-query` — data fetching pattern.
- Existing `MarkerType.ArrowClosed`, `Edge` styling in React Flow for path highlighting.

**Karpathy alignment:** R2 (start with 1 template), R4 (overfit BFS first), R13 (implement before importing — in-process BFS before Sigma), R14 (1 PR per template).

---

## §A4 — OXOT auth → BH HMAC API key bridge

**Scope:** Server-side BH API client. BH credentials never sent to browser. All OXOT-side endpoints calling BH use this client.

**Outputs:**
- `server/lib/bloodhound-client.ts` — HMAC signer + thin wrapper.
- Env vars: `BLOODHOUND_TOKEN_ID`, `BLOODHOUND_TOKEN_KEY`, `BLOODHOUND_BASE_URL`.

**Signature spec (per BH docs):**
```
Authorization: bhesignature $TOKEN_ID
RequestDate: $RFC3339_DATETIME
Signature: $BASE64ENCODED_HMAC_SIGNATURE
```
Signature = `HMAC-SHA256(TOKEN_KEY, method || URI || requestDate || body)`

**Acceptance criteria:**
- `GET /api/attack-paths/status` (test endpoint) returns BH version via HMAC-signed call.
- HMAC validation passes on BH server (no 401).
- Replay window enforced (BH rejects requests with stale timestamps).
- No BH credentials visible in browser network tab.

**Reuse:**
- `server/lib/rls-tx.ts` pgTxScoped pattern (for any DB writes triggered by BH-mediated workflows).
- `server/lib/logger.ts` for request/response logging.
- Standard `node:crypto` for HMAC computation (no new lib needed).

**Karpathy alignment:** R10 (auth = vibe-coding FORBIDDEN — every line read and reviewed), R5 (vanilla node:crypto, not a custom HMAC lib).

---

## §A5 — Stale-page audit + deletion PR

**Scope:** Single script + single PR. Removes `src/pages/**/*.tsx` files unreachable from `App.tsx` router. ~150 candidates.

**Outputs:**
- `scripts/audit-stale-pages.ts` — enumerator.
- `audits/2026-06-03-stale-pages/inventory.csv` — full inventory.
- Single deletion PR with 1-page rationale.

**Methodology:**
1. Glob `src/pages/**/*.tsx`.
2. Parse `src/App.tsx` for `<Route path="...">` (lines 1148+) and `NAV_GROUPS` (lines 440-486).
3. Grep `src/` for `<Link href=...>` and import paths to pages.
4. Classify per file: dead-file / mounted-but-unlinked / linked-but-unmounted.
5. Apply protected-subtree whitelist: `src/pages/demo/`, `src/pages/sales/`, `src/pages/Prospect_*.tsx`, `src/pages/reference-*.tsx`.
6. Output CSV: file, route_path, in_nav_groups, link_count, last_modified, last_author, days_since_touch, recommendation.

**Acceptance criteria:**
- PR merges cleanly. Page count drops from 207 to ~57.
- No 404s reported by route-mount smoke (A8) post-merge.
- Protected subtrees untouched.

**Reuse:**
- `glob` npm package (already in deps).
- Standard `fs` + `child_process` for git log per file.
- No new libs.

**Karpathy alignment:** R9 (vibe-OK for audit script), R14 (single PR).

---

## §A6 — Wire `register-extractor.ts`

**Scope:** New pipeline stage after `classify` that invokes existing `extractRegisters()` when doc_type matches FMECA/HAZOP/RAMS/MOR/RR/CIL. Persists to existing seldon.* tables.

**Inputs:**
- Uploaded documents already classified by existing pipeline.
- Existing `server/lib/register-extractor.ts` with full LLM prompts.

**Outputs:**
- `server/processes/stages/register-extract.ts` — new stage.
- DB migration adding `critical_items_list` table (if missing).
- Pipeline UI update — show register_extract stage in `CompactStageStrip.tsx`.

**Acceptance criteria:**
- Upload sample FMECA → `seldon.fmeca_full` has N new rows linked to the document.
- Upload sample HAZOP → `seldon.hazard_log` has N new rows.
- Upload sample RAMS → `seldon.rams_profile` has N new rows.
- Re-running extraction on same document upserts (idempotent on `(document_id, item_id)`).
- `/api/customer/documents/{id}` response includes `register_extract` stage status.

**Reuse (mandatory — do NOT rebuild):**
- `server/lib/register-extractor.ts` — full extraction logic exists. Just wire it.
- `server/lib/pipeline-stage.ts` `setStage()` — canonical stage lifecycle writer.
- `server/lib/openrouter.ts` — LLM call wrapper.
- `server/lib/pipeline-stage-config.ts` — read model + prompt overrides.
- `src/pages/customer/documents.tsx` + `CompactStageStrip.tsx` — display.

**Karpathy alignment:** R1 (no new extraction code — wire existing), R10 (writes to seldon are data writes — review every line), R12 (sample doc upload = reproduction case).

---

## §A7 — Frontend `graph_metrics` consumption

**Scope:** Surface centrality + Louvain community in PID canvas + AssetProfilePanel Network tab. Today the table is populated nightly; frontend reads zero.

**Outputs:**
- `src/hooks/useGraphMetrics.ts` — TanStack Query hook.
- AssetProfilePanel Network tab populated.
- PID canvas node tooltip enriched with centrality chip.
- "Last computed at" badge for nightly-stale data.

**Acceptance criteria:**
- Open AssetProfilePanel for any asset → Network tab shows centrality (degree, betweenness, closeness) + community ID.
- PID canvas node hover shows centrality rank chip.
- Badge displays last-computed timestamp (nightly cron timestamp).

**Reuse (mandatory):**
- `src/components/customer/facility-hub/AssetProfilePanel.tsx` Network tab already exists — just fill the queries.
- `@tanstack/react-query` existing pattern from FacilityHub.
- `ot_inventory.graph_metrics` table already populated by `server/processes/instances/networkx-graph-metrics.ts`.
- Existing `Badge` component (Radix-based).

**Karpathy alignment:** R1 (no new viz lib needed), R2 (start with 2 surfaces).

---

## §A8 — Auto route-mount Playwright smoke

**Scope:** Single Playwright spec iterates over routes from `App.tsx` post-A5 deletion. Asserts no ErrorBoundary fallback and no console errors. Runs in nightly `playwright-scheduled-smoke.yml`.

**Outputs:**
- `e2e/route-mount-smoke.spec.ts`.

**Acceptance criteria:**
- Spec passes in nightly smoke against Railway prod.
- ~57 routes covered.
- Spec timeboxes per route (5s navigate + 2s settle).
- Failures upload trace + screenshot artifacts.

**Reuse:**
- `@playwright/test` existing scheduled smoke workflow (already PR #476).
- Existing test utilities in `e2e/` folder.

**Karpathy alignment:** R9 (vibe-OK), R7 (empirical pass/fail per route in report).

---

## §A9 — 30-min manual smoke checklist + walkthrough

**Scope:** 1 written document + 1 executed walkthrough. Tight scope. Adversarial reviewer's exit criterion.

**Outputs:**
- `update_2/MANUAL-SMOKE-CHECKLIST.md` — 5-step walkthrough.
- Execution notes appended to `progress.md`.

**5 steps (locked):**
1. Log in as `admin@oxot.local`.
2. Upload sample FMECA document → verify `seldon.fmeca_full` gets new rows (A6).
3. Open PID canvas, toggle attack-path mode, run L4→L1-SIS query, verify rendering (A3).
4. Open AssetProfilePanel on critical asset, verify centrality shown in Network tab (A7).
5. Confirm Playwright route-mount smoke is green in nightly workflow (A8).

**Acceptance criteria:** All 5 steps green. Findings logged.

**Karpathy alignment:** R6 (honest acknowledgments in findings), R7 (empirical observations).

---

## §A10 — Customer-value hypothesis doc

**Scope:** Written-down statement of who runs BH-style attack-path queries, on what data, producing what report. Adversarial-reviewer gate.

**Outputs:**
- `update_2/ATTACK-PATH-USE-CASES.md`.

**Required sections:**
1. Personas (CISO, OT security lead, insurance underwriter).
2. Concrete queries each persona runs (mapping to the 3 saved templates).
3. Output artifact (risk report, mitigation list, premium calculation).
4. Acceptance criteria for "useful" output.

**Acceptance:** Doc exists, reviewed by Jim, locks v1 attack-path scope to 3 templates.

**Karpathy alignment:** R6 (must articulate clearly), R8 (no marketing language).
