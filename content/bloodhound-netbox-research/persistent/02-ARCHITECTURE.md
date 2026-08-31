# 02-ARCHITECTURE.md — Phase A target architecture

System architecture after Phase A ships. Per Karpathy rule 11 (visualize before debugging), this doc draws the explicit picture.

> **v2 (2026-06-03):** Architecture pivoted from "shared Neo4j" (DA9 v1) to "BH stack in local Docker with own Neo4j + own Postgres" (DA9 reversed; DA14). The diagram below reflects v2 state.

## Layer overview (text — diagrams in ASCII intentionally)

```
OXOT Admin SPA (Railway)
  - PID canvas (React Flow) + Attack-Path mode toggle (A3 NEW)
  - AssetProfilePanel: Equipment / Safety / Reliability / MOR / Links /
    Threats / SBOM / IEC62443 / Impact / Network tabs (existing; A7 fills Network)
  - NEW: Sigma.js attack-path viewer (A3) under PID canvas mode toggle
        ↓ HTTP/JSON
OXOT server (Express, Node 20, tsx) — Railway
  - NEW: /api/attack-paths/* (A3, A4) — proxies to BH via env-configured
    BLOODHOUND_BASE_URL (local dev: http://localhost:8080; prod: TBD per DA15)
  - Existing: /api/pipeline/upload, /api/graph-explore/paths,
    /api/customer/documents/:id/classify, /api/ot/*
  - NEW: extract_* pipeline stages (A6) — register-extractor wired
  - NEW: server/lib/bloodhound-client.ts (A4) — HMAC signer
        ↓
oxot-postgres (Railway)               oxot-neo4j (Railway, UNTOUCHED)
  - ot_inventory.*                     - Existing CDT model ~3.1M nodes
  - seldon.* (A6 fills more rows)      - Phase A reads only, no writes
  - forge.canvas_layouts                - Existing labels preserved
  - public.threat_incidents

        ↑ ETL reads (Python collector, A2)
        |
   transforms to OpenGraph JSON + POSTs to BH /api/v2/file-upload/
        ↓
BloodHound CE v9.2.2 — LOCAL DOCKER (NEW, DA14)
  docker compose stack on dev's machine (NOT Railway):
    - BH Go API + React SPA   (HMAC + JWT auth)
    - BH PostgreSQL            (BH app state, separate from oxot-postgres)
    - BH Neo4j                 (DEDICATED — DA9 reversed v2)
        OT labels (OT* per DA13):
          OTOrganization, OTDivision, OTFacility, OTArea (NOT OTZone),
          OTSystem, OTAsset, OTEquipment
        Edges (OT_*):
          OT_BELONGS_TO, OT_CAN_REACH, OT_CAN_CONFIGURE, OT_IN_ZONE

  NO `source: 'bloodhound-derived'` property needed (DA12 retired
  — separate Neo4j instance from oxot-neo4j, no shared state)

  Production deployment of BH = DEFERRED (DA15) to after Phase A.
  Phase A is dev/staging only.
```

## Key architectural decisions (v2)

| Decision | Rationale | Risk + mitigation |
|---|---|---|
| BH stack runs in LOCAL DOCKER (DA9 reversed, DA14) | SpecterOps-recommended; eliminates compat-test gate; $0 infra cost | R1 + R2 RETIRED. New: production deployment deferred (DA15). |
| BH UI not embedded — OXOT-native Sigma.js (DA10) | Brand consistency; full UX control | Loses BH's Cypher editor + saved-query library; v1 ships 3 hardcoded templates |
| Per-facility PID canvas keeps React Flow | Right tool for small drag-drop graphs | None |
| Cross-facility attack-path viz uses Sigma.js (WebGL) | Right tool for thousands of nodes | Frontend reviewer flagged: in-process BFS first (Karpathy R13), Sigma only when needed |
| OT data: Postgres → Python ETL → BH `/api/v2/file-upload/` (OpenGraph) → BH-dedicated Neo4j | SpecterOps-supported ingestion; separate Neo4j eliminates collision risk | Nightly cadence is fine for v1 (R4). R17-R19 (idempotency, rate-limit, query timeout) tracked. |
| Auth: OXOT session → BH HMAC API key bridge (server-side only) | BH credentials never reach browser | R10 (credential leak) — code review the bridge |
| Production BH target deferred (DA15) | Local Docker covers Phase A dev needs; prod target needs use-case clarity (A10 gate) | Future tunnel/proxy or Railway deploy decision in Phase A.5 |

## Data flow — ingestion path (A2)

```
1. Nightly cron triggers agents/ot_opengraph_collector.py
2. Collector reads via Python psycopg2 + neo4j driver:
   - PG: ot_inventory.organizations, divisions, facilities, areas,
         systems, asset_nodes
   - oxot-neo4j: CDT edges (read-only — no writes back per DA9)
3. Transforms into OpenGraph JSON:
   - Every node label gets `OT*` prefix (DA13, FIXED: OTArea not OTZone)
   - High-value tagging: criticality='critical' OR sil_level>=2 →
     highvalue:true + system_tags='admin_tier_0'
   - Stable node ID derivation: 'ot-asset-' + UUID (R17 contract)
   - Chunked payloads per organization (R18 mitigation)
4. POSTs to local BH `/api/v2/file-upload/` via HMAC-signed call
   (BLOODHOUND_BASE_URL=http://localhost:8080 in dev)
5. BH validates payload, writes into ITS OWN Neo4j (NOT oxot-neo4j)
6. Result: OT* nodes in BH Neo4j ONLY. oxot-neo4j untouched.
```

## Data flow — query path (A3)

```
1. User in OXOT toggles "Attack Path" mode in PID canvas Panel
2. Picks source (e.g. virtual "External Internet") + target (e.g. critical OT asset)
3. Frontend calls OXOT-side: POST /api/attack-paths/cypher
   { template: "L4_to_L1_SIS", parameters: { source_id, target_id } }
4. OXOT server:
   - Looks up template Cypher from hardcoded saved templates
   - Substitutes parameters; adds LIMIT clauses (R19 mitigation)
   - Calls BH /api/v2/graphs/cypher with HMAC-signed request
   - Returns BH JSON results to frontend
5. Frontend renders via Sigma.js — dim non-path nodes, bold path edges
6. Click path node → opens existing AssetProfilePanel (REUSE per 06-LIBRARY-REUSE-MAP)
```

## Auth flow (A4)

```
[OXOT user logs in via existing server/auth.ts]
        ↓
[OXOT session created — existing in-memory store, 24h TTL]
        ↓
[User triggers attack-path query]
        ↓
[OXOT server middleware authorizes request via existing session]
        ↓
[server/lib/bloodhound-client.ts uses pre-configured BH API key from env:
   BLOODHOUND_BASE_URL + BLOODHOUND_TOKEN_ID + BLOODHOUND_TOKEN_KEY]
        ↓
[Computes HMAC signature per BH docs:
   Authorization: bhesignature $TOKEN_ID
   RequestDate: $RFC3339_DATETIME
   Signature: $BASE64ENCODED_HMAC_SIGNATURE]
        ↓
[BH validates signature + timestamp, executes Cypher, returns JSON]
        ↓
[OXOT server proxies response to frontend — BH credentials never leave server]
```

## Pipeline stage map (A6)

Existing 7-stage pipeline:
```
upload → convert → classify → ner → relationships → embed → graph
```

A6 adds NEW conditional stages after `classify`:
```
classify (existing — sets doc_code via doc-classifier.ts)
   ↓
[if doc_code IN (FMECA-01, HAZOP-01, RAMS-01, MOR-01, RISK-01, CIL-01)]
   ↓
extract_fmeca / extract_hazop / extract_rams / extract_mor /
extract_risk_register / extract_critical_items
   (NEW — invokes existing register-extractor.ts, persists to seldon.*)
   ↓
ner → relationships → embed → graph (existing, continue)
```

`register-extractor.ts` already has full LLM prompts per stage type. A6 is wiring + idempotency + persistence, not new extraction logic.

## What is NOT in Phase A architecture

- No new database (no Cassandra, no DuckDB, no…) — BH brings its own Postgres + Neo4j in its compose
- No new graph library beyond Sigma.js + graphology
- No new auth provider — existing session-based auth used
- No new ORM — raw pg via `connections.ts` pool stays
- No new pipeline framework — existing 7-stage pipeline extended
- No BH UI iframe (DA10) — OXOT-native Sigma.js only
- No customer-onboarding hub (Phase B)
- No production deployment of BH (DA15 — deferred)

## References

- [04-PHASE-A-PLAN.md](./04-PHASE-A-PLAN.md) — sequencing + estimates
- [03-SPECIFICATIONS.md](./03-SPECIFICATIONS.md) — per-item specs + acceptance
- [07-DECISION-LOG.md](./07-DECISION-LOG.md) — DA1-DA16
- [08-RISK-REGISTER.md](./08-RISK-REGISTER.md) — R3-R22 (R1+R2 retired)
- [06-LIBRARY-REUSE-MAP.md](./06-LIBRARY-REUSE-MAP.md) — what NOT to rebuild
- [`../research/BLOODHOUND-DEEP-RESEARCH.md`](../research/BLOODHOUND-DEEP-RESEARCH.md) — BH CE architecture details
- [`../runbooks/LOCAL-DOCKER-BLOODHOUND.md`](../runbooks/LOCAL-DOCKER-BLOODHOUND.md) — A1 runbook
