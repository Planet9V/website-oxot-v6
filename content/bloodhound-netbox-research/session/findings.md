# findings.md — Phase A research storage

Empirical findings from the 2026-06-03 brainstorming + deep-research session. Updated as Phase A proceeds.

## Finding F1: BloodHound CE v9.2.2 is a general-purpose graph engine (NOT AD-only)

**Discovered:** 2026-06-03 via deep-research.
**Source:** [BLOODHOUND-DEEP-RESEARCH.md](./BLOODHOUND-DEEP-RESEARCH.md), [BH CE GitHub](https://github.com/SpecterOps/BloodHound).

- v8 introduced OpenGraph (custom JSON node/edge ingestion).
- v9 added extension definition schemas → custom domains get full pathfinding + node search + (Enterprise) risk metrics.
- OpenGraph payload format: `{graph: {nodes: [...], edges: [...]}}`. Each node/edge has `id`, `labels[]` or `type`, `properties{}`.
- Used by community for Kubernetes, SaaS, CI/CD. Per SpecterOps blogs, OT is a documented use case.
- This **refutes** the adversarial reviewer's "wrong tool" position from the 2026-06-03 review panel.

**Implication:** BH CE can ingest OT data via custom OpenGraph extension schema with `OT*` labels. Phase A2 implements the collector; Phase A3 consumes via API.

## Finding F2: SpecterOps explicitly recommends AGAINST sharing Neo4j with another app

**Discovered:** 2026-06-03 via deep-research.
**Source:** [BH custom installation docs](https://bloodhound.specterops.io/get-started/custom-installation).

> "BloodHound does not describe or support scenarios where it is pointed at a shared, multi-tenant Neo4j instance. The safest and most robust approach is to treat BloodHound's graph database as dedicated to BloodHound."

- BH assumes ownership: runs migrations, creates constraints/indices, may perform resets.
- Label collisions risk: BH may use `User`, `Computer`, `Group`, `Domain` — semantic conflicts with our app.
- Maintenance ops could affect our data.

**Implication:** User picked Option C (shared) anyway. Mitigations are A0 compat test, DA12 `source:'bloodhound-derived'` kill-switch, DA13 `OT*` namespacing. **A0 is a hard gate** — if collisions surface, fall back to Option A (separate BH Neo4j with ETL).

## Finding F3: register-extractor.ts is orphan code — never wired into upload pipeline

**Discovered:** 2026-06-03 via deep code-review agents.
**Source:** `server/lib/register-extractor.ts:1-200`; trace pipeline stages in `server/processes/stages/`.

- Full LLM prompts exist for: FMECA, HAZOP, RAMS, MOR, risk_register, critical_items_list (`extract_critical_items` settings flag).
- `extractRegisters()` function callable but **never invoked** by upload→classify→ner→graph pipeline.
- seldon.fmeca_full / hazard_log / rams_profile populated only by admin curation or migration seeds.

**Implication:** Phase A6 wires this — single new stage after classify, ~2-3 days. Closes user's "validate document workflow" requirement.

## Finding F4: Customer creation + batch onboarding endpoints already exist

**Discovered:** 2026-06-03 via deep code-review agents.
**Source:** `server/routes/ot-inventory.ts:1627-1652, 634-684, 840-912, 691-743`.

- `POST /api/ot/organizations` — bare org creation.
- `POST /api/ot/onboard/organization` — full: org + division + seldon namespace, idempotent (ON CONFLICT).
- `POST /api/ot/onboard/finalize` — seeds FMECA/RAMS/hazard stubs.
- `POST /api/ot/onboard/facilities` — array of facilities with nested zones.
- `POST /api/ot/onboard/systems`, `POST /api/ot/onboard/assets` — same array pattern.

**Implication:** Phase B (customer hub) does NOT need to build these endpoints. Initial brainstorming scoping of 30 items was wrong; corrected to ~12.

## Finding F5: Equipment library proposal queue is the human-in-the-loop pattern to reuse

**Discovered:** 2026-06-03 via deep code-review agents.
**Source:** `server/routes/equipment-library-proposals.ts:59-220`.

- `GET /api/equipment-library-proposals` with `status` filter (pending/accepted/rejected/superseded/all).
- `POST /api/equipment-library-proposals/:id/decide` with `action` ∈ {accept, reject, merge}.
- Every decision writes `audit.activities` row.
- Frontend UI exists at `src/pages/admin/equipment-library-proposals.tsx`.

**Implication:** Phase B (facility import verification queue) reuses this pattern. Don't reinvent.

## Finding F6: Document upload pipeline + classifier + re-link already work end-to-end

**Discovered:** 2026-06-03 via deep code-review agents.
**Source:** `server/routes/pipeline-ops.ts:489-875`, `server/lib/doc-classifier.ts:42`, `server/routes/customer-documents-classify.ts:32-120`.

- `POST /api/pipeline/upload` (multipart, 50MB cap, SHA-256 dedup, customer-scoped rate limit 30/min).
- LLM classifier reads `reference.required_document_types` dynamically (PID-01, SBOM-01, HLD-01, FMECA-01, HAZOP-01, RAMS-01, etc.).
- 7-stage pipeline: upload → convert → classify → ner → relationships → embed → graph.
- SSE stage status surfaced in `src/pages/customer/documents.tsx` via `CompactStageStrip.tsx`.
- `PATCH /api/customer/documents/:id/classify` — wholesale facility + org link replacement.

**Implication:** Phase A6 adds ONE stage (register-extract) to existing pipeline. Phase B does NOT need to build doc upload, classifier, or re-link UI.

## Finding F7: NetworkX path-finding is delegated to Neo4j by design

**Discovered:** 2026-06-03 via deep code-review agents.
**Source:** `agents/networkx_validator.py`, `agents/networkx_graph_metrics.py`, `server/routes/graph-explore.ts:184`, `server/lib/mc-importance-bfs.ts`.

- networkx_validator: topology checks, cycles, components, sources/sinks, DAG longest-path. Wired into dexpi-wizard.
- networkx_graph_metrics: centrality (degree/betweenness/closeness) + Louvain. Persisted nightly to `ot_inventory.graph_metrics`.
- Path-finding: `POST /api/graph-explore/paths` uses Neo4j `shortestPath()` + 5 alternatives. Consumed by `src/pages/graph-explorer/GraphUniverse.tsx:300+`.
- Importance-weighted BFS at `server/lib/mc-importance-bfs.ts` for subgraph selection.
- **Frontend reads zero from `graph_metrics`** — table populated, no SELECTs.

**Implication:** Phase A7 wires frontend to graph_metrics (closes "networkx must work" honestly). NO networkx path-finding implementation — Neo4j is the correct tool at 3.1M-node scale.

## Finding F8: 207 page files; ~54 routed in App.tsx; ~150 unrouted (stale)

**Discovered:** 2026-06-03 via Frontend reviewer empirical count.
**Source:** `src/App.tsx:440-486 (NAV_GROUPS), 1147+ (routes)`. `find src/pages -name '*.tsx' | wc -l = 207`.

- 3:1 dead-to-live ratio.
- Protected subtrees: `src/pages/demo/`, `src/pages/sales/`, `src/pages/Prospect_*.tsx`, `src/pages/reference-*.tsx`.
- These are intentionally deep-link-only (pitch decks, sales demos).

**Implication:** Phase A5 deletes ~150 unrouted files in single PR. Whitelist protects intentional orphans.

## Finding F9: AssetProfilePanel has tabs ready; queries partial

**Discovered:** 2026-06-03 via deep code-review.
**Source:** `src/components/customer/facility-hub/AssetProfilePanel.tsx:131`.

- Tabs already exist: Equipment, Safety, Reliability, MOR, Links, Threats, SBOM, IEC62443, Impact, Network.
- Queries to populate Safety + Reliability + Network tabs are MISSING (Network tab consumes graph_metrics in Phase A7).

**Implication:** Phase A7 + B5 fill the queries. Tabs themselves stay.

## Finding F10: PID canvas uses React Flow; Sigma.js NOT in deps yet

**Discovered:** 2026-06-03.
**Source:** `src/pages/world/pid-canvas.tsx` (4499 lines, `@xyflow/react`), check `package.json` for Sigma.

- React Flow handles per-facility editing well (small graphs, drag-drop).
- Sigma.js is appropriate for large attack-path graphs (3.1M nodes) — WebGL-accelerated.
- Need to add `sigma` + `graphology` to deps for Phase A3.

**Implication:** Phase A3 adds Sigma.js but doesn't replace React Flow. Mode toggle in PID canvas Panel.

## Finding F11: Adversarial reviewer's main pushback was AD-only assumption (refuted)

**Discovered:** 2026-06-03 by ordering deep-research AFTER the 4-reviewer panel.
**Source:** [REVIEW-PANEL-FINDINGS.md](./REVIEW-PANEL-FINDINGS.md) Adversarial section.

- Adversarial said "BloodHound is AD-native, OT lateral movement is Modbus/DNP3, not Kerberoasting."
- True for v7 and earlier. **False for v8+ with OpenGraph.**
- Other adversarial positions HELD UP: stale-audit scope, working-verify gold-plating risk, customer-hub deferral cost.

**Implication:** Karpathy rule 11 (visualize before debugging) and rule 6 (say "I don't know") in action. Always deep-research before final design lock.

## v2 findings (post-swarm review, 2026-06-03)

## Finding F12: Route count was double-claimed and both numbers were wrong

**Discovered:** 2026-06-03 via empirical re-count during reorganization.
**Source:** `grep -cE '<Route ' /Users/jimmcknney/Documents/ot_frontend/oxot-admin/src/App.tsx` returned **188**. `grep -oE 'path="[^"]+"' src/App.tsx | sort -u | wc -l` returned **181**. `find src/pages -name '*.tsx' | wc -l` returned **207**.

- v1 PHASE-A-UPGRADE.md claimed "54 routes" (wrong).
- v1 REVIEW-PANEL-FINDINGS.md claimed "~189 declarations" (close to right).
- Actual: **188 declarations, 181 unique paths, 207 page files** → stale bucket ≈ **26 unrouted files**, NOT 150.

**Implication:** A5 scope cut from 1-2 days to 0.5-1 day. Recorded in DECISION-LOG.md v2 empirical corrections table.

## Finding F13: BloodHound CE local Docker pivot eliminates compatibility risk class

**Discovered:** 2026-06-03 post-swarm-review user decision.
**Source:** Adversarial reviewer Alt #3 (reverse DA9) → user accepted → user further specified "local Docker."

- DA9 reversed: separate BH Neo4j (not shared with oxot-neo4j).
- DA14 added: local Docker for Phase A dev/staging.
- DA15 added: production deployment target deferred post-A.
- R1 + R2 RETIRED.
- A0 (compatibility test) RETIRED — no shared instance to test against.
- DA12 (kill-switch property) RETIRED — separate Neo4j needs no kill-switch.
- DA13 (OT* namespacing) STILL APPLIES but as good practice, not collision-critical.

**Implication:** Phase A duration drops 4.5-6 wk → 3-4 wk. A1 collapses from "Railway deployment" to `docker compose up`. Most operational complexity vanishes.

## Finding F14: DA13 label list had `OTZone` bug

**Discovered:** 2026-06-03 by Auditor swarm reviewer.
**Source:** v1 DECISION-LOG.md L21 listed `OTZone` while v1 PHASE-A-UPGRADE.md L75, ARCHITECTURE.md L56 listed `OTArea`.

- OXOT data model uses `ot_inventory.areas` (NOT zones) as the table name.
- DA13 v1 was wrong; everywhere else was right.
- Would have caused A2 code to use the wrong label and queries to return empty.

**Implication:** Fixed in DA13 v2 — canonical label is `OTArea`. INDEX.md ownership matrix prevents future drift.

## Finding F15: Adversarial reviewer's "stop editing docs" critique was correct

**Discovered:** 2026-06-03 swarm review.
**Source:** Adversarial reviewer: "Jim has 15 markdown files totaling ~135KB and zero lines of executable code. The leverage move is the opposite direction."

- My prior "recommended next move" was doc hygiene masquerading as critical work.
- The Karpathy rules I cited (R6, R12) were post-hoc. Correct rules: R3, R4, R11.
- The actual leverage move was: reverse DA9 → simplify everything → start A10 as the gate.

**Implication:** Post-pivot, Phase A is now action-ready. A10 doc is the first concrete output. No more doc reorganization needed for the foreseeable future.

## Finding F16: Schedule estimate was implicitly 1 dev at 100% utilization

**Discovered:** 2026-06-03 Impl-lead swarm reviewer.
**Source:** Sum of Phase A item estimates was 20-32.5 days. v1 said 4.5-6 wks. With rework + reviews + R10 every-line discipline, realistic is 8-10 wks for 1 dev.

- Post-pivot estimate 3-4 wks assumes 15-22 days at 1 dev. Same calibration issue applies.
- Realistic 4-5 weeks with rework buffer.

**Implication:** R20 added to RISK-REGISTER v2. Weekly check-ins via session/progress.md required. Cut A3 scope if week-2 burn rate is off.

## Finding F17: A2 idempotency contract and rate-limiting missing from spec

**Discovered:** 2026-06-03 Adversarial swarm reviewer.
**Source:** v1 SPEC §A2 said "stable node IDs" without specifying derivation. No chunking strategy for 3.1M-node scale.

- DA12 kill-switch (now retired) was meaningless without idempotency.
- Even without DA12, idempotency matters: re-runs must not create duplicates in BH Neo4j.

**Implication:** R17, R18 added v2. SPEC §A2 must be updated before A2 code begins (definition-of-ready blocks it).

## Future findings

(Populated as Phase A proceeds. Each finding gets F-number, date, source, content, implication.)
