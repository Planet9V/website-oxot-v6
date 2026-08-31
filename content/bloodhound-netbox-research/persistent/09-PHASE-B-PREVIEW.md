# Phase B — Customer Operations Console (Preview)

**Status:** Pre-design. Starts after Phase A exit criteria met.
**Estimated duration:** ~3-4 weeks.

**Scope correction (per Karpathy rule 6):** initial brainstorming claimed "30 greenfield items." Empirical re-audit dropped this to **~12 wire/fill items** — most of the surface is already implemented; what's missing is the customer-scoped landing page that aggregates and the few specific gaps below.

## The 12 actual gaps

### Schema layer (2 items)

| # | Item | Approach |
|---|---|---|
| B1 | Branches as 4th hierarchy level (Org → Div → Branch (geo) → Facility) | Either add `parent_division_id` to existing `divisions` (cheap, nested) OR new `branches` table + `branch_id` on facilities. Decision deferred. |
| B2 | Contact info on facilities | Add `primary_contact, contact_email, contact_phone` columns to `ot_inventory.facilities`. Migration; add to `railway-schema.sql` to avoid split-brain. |

### Backend (4 items)

| # | Item | Existing code |
|---|---|---|
| B3 | Bulk facility import endpoint (CSV/XLSX/Word/copy-paste) | Build new — analog of `dexpi-wizard` research step but for facilities. Free-text parser via LLM, structured CSV/XLSX parser inline. |
| B4 | Verification queue for imports | Model after **existing** `equipment-library-proposals` pattern (`server/routes/equipment-library-proposals.ts` — fully working accept/reject/merge with audit). |
| B5 | Equipment-grain consequence rollup view | SQL view in `seldon.*` that joins fmeca_full / hazard_log / rams_profile down to `asset_node_id` via `asset_nodes.system_id`. No schema change. |
| B6 | Critical Items List queryable view | Materialize from `criticality='critical'` rows + `register-extractor` CIL output (wired in Phase A6). |

### Frontend (6 items)

| # | Item | Existing code |
|---|---|---|
| B7 | Customer-onboarding hub landing page | New page at `/customer/{customer_code}/hub`. Aggregates existing components. Hub-pattern modeled after `FacilityHub.tsx` (11 tabs working). |
| B8 | Bulk facility import wizard UI | New page. Reuses existing `multipart` infrastructure (`server/lib/multipart.ts`). Verification queue UI reuses `equipment-library-proposals` admin page pattern. |
| B9 | Map-picker for lat/lon (click-to-place + geocoding) | Extend existing `customer-org-map.tsx` Mapbox. Add `mapbox-gl-geocoder` dependency. |
| B10 | Per-facility Reliability tab | New tab in `FacilityHub`. Parameterize existing `world/reliability-assessment.tsx` to accept `facility_id`. Reuse `consequence-batch` endpoint (already supports facility filter per audit). |
| B11 | Standalone Safety hub OR expanded HazopsTab | Expand existing `HazopsTab.tsx` to include LOPA + functional safety (SIL) + occupational safety sections. Same component, 3-4 tabs added. |
| B12 | Deep-link fix in onboarding-kanban | Pass `facility_id` through `CARD_LINK_MAP` (currently doesn't). 1-hour change. |

## Existing-code reuse map (what we DON'T build)

- ✅ `POST /api/ot/onboard/organization` — creates org + division + seldon namespace, idempotent. Use as-is.
- ✅ `POST /api/ot/onboard/facilities/systems/assets` — batch creators with array input. Use as-is.
- ✅ Equipment library proposal queue — full human-in-the-loop accept/reject/merge with audit. **Pattern reused for facility import verification (B4)**.
- ✅ Document upload + classify pipeline (`POST /api/pipeline/upload`, 7-stage tracking, SSE status). Use as-is.
- ✅ `PATCH /api/customer/documents/:id/classify` — wholesale facility + org link replacement. Use as-is for re-link UI.
- ✅ `POST /api/ot/sbom-boms/import` — CycloneDX/SPDX parser, atomic. Use as-is.
- ✅ Sector taxonomy (`ot_inventory.sector_taxonomy`, 217 CISA rows, 3-level hierarchy, full CRUD). Use for facility-type via `level='facility_type'`.
- ✅ AssetProfilePanel tabs (Equipment / Safety / Reliability / MOR / Links / Threats / SBOM / IEC62443 / Impact / Network) — UI exists. Phase A6 + B5 fill the queries.
- ✅ `register-extractor.ts` wired in Phase A6 — closes "validate document workflow" requirement.
- ✅ Neo4j path-finding via `POST /api/graph-explore/paths` (shortestPath + 5 alternatives) — already consumed by GraphUniverse.tsx.

## Phase B scope NON-goals

- Customer self-serve registration (admin/sales-driven only).
- New networkx path-finding (Phase A already closed scope: BH for attack paths, Neo4j shortestPath for OT-internal, networkx for centrality only).
- Repairing legacy 50-node-truncated facilities (audit only).
- Fixing `db/migrations/*` vs `server/db/migrations/*` split-brain (block Phase B start on it instead — see data-flow reviewer recommendation).

## Phase B entry criteria

- All Phase A exit criteria met.
- `db/migrations/*` vs `server/db/migrations/*` split-brain fixed (separate PR before Phase B kicks off).
- BH attack-path mode running (for cross-customer benchmarking later).

## Full design

Comes after Phase A. This file is a forward-looking preview, not a commitment to specific implementation details.
