# Findings & Decisions — Babylon Explorer Phase 2

## Requirements
<!-- Captured from user request -->
- Render all 1,155 connections/routes (currently not rendered at all)
- Graph / Physical / Both view-mode toggle (ghost-shell effect on physical meshes)
- Filters: service, protocol, zone, critical-conduit
- Search (asset fields + mesh names)
- Upstream / downstream / both tracing from a selected asset
- Fixed viewpoints toolbar (fit campus / data hall / electrical / cooling / MMR-NOC / rack)
- Asset-list panel (single-select-group for this pass)
- Must be a faithful port of the three.js reference; reference file itself is never modified
- "be very careful" — verify incrementally in a real browser, not build-then-debug

## Research Findings
<!-- Key discoveries during exploration (already verified this session before Plan Mode) -->
- `graph/routes.json`: `{meta, corridor_occupancy, routes:[...]}`, 1,155 entries, points-per-route
  min/max/avg = 6/38/17. Route ids are 1:1 with combined facility+hall connection ids.
- `graph/positions.json`: `{meta:{units,frame,note,count:449}, positions:{[id]:{x,y,z}}}`, exactly
  449 entries, matching the 449-asset dedup Phase 1 already uses.
- `meta.frame` in positions.json reads "GLB world space of hyperscale_campus.glb (Y up)" — this
  phrasing is what originally raised the coordinate-system question that Step 0 exists to answer.
- Connections use `critical_conduit` (bool) field name, NOT `critical`. Three.js reference remaps
  this at graph-assembly time (`critical: c.critical_conduit`).
- Canonical `SERVICES`/`PROTOCOLS` (campus-model.js L7-38) and `ZONES` (L688-695) are byte-exact
  source of truth. Phase 1's local ZONES copy has matching colors but slightly different label
  wording; facility-graph.json's `legends.zones`/`legends.services` is a third redundant copy.
- `campus-model.js`'s `trace(startId, dir, maxDepth)` (L1782-1798) is a framework-independent BFS
  over a precomputed `adj` map — copied verbatim into the plan.
- Babylon's glTF loader wraps imports in a synthetic `__root__` node correcting a right-handed
  (source)/left-handed (Babylon default) coordinate mismatch — flagged by the Plan agent as the
  single highest-risk unknown for this phase. Not yet independently re-verified live in-browser;
  Step 0's console script is the empirical check.

## Technical Decisions
<!-- Decisions made with rationale — mirrors task_plan.md's Decisions Made table -->
| Decision | Rationale |
|----------|-----------|
| Parent all new overlay geometry (markers, tubes) under the GLB's root node; feed raw JSON (x,y,z) as local coordinates | If Step 0 confirms the mirror-correction risk, this is the fix with zero manual axis math |
| Individual CreateTube per route (not merged/downgraded to line system) | Per-edge visibility (filters/trace) and per-protocol coloring within a service would break under merged geometry |
| Consolidate ZONES definition on campus-model.js's canonical version | Avoids a 3-way divergent-copy problem across Phase 1 local copy / facility-graph.json legends / campus-model.js |

## Issues Encountered
<!-- Errors and how they were resolved -->
| Issue | Resolution |
|-------|------------|
| Fact-Forcing Gate blocked Write to plan file and to task_plan.md/findings.md on first attempt | Answered the gate's 4 questions inline (caller, duplicate-file check via Glob/ls, data schema, verbatim user instruction), then retried — succeeded each time |

## Resources
<!-- URLs, file paths, API references -->
- Approved plan: `/Users/jimmcknney/.claude/plans/starry-juggling-catmull.md`
- Babylon file being extended: `3d_dev/CDT_Hyperscale_TM/babylon/hyperscale-campus-explorer.html`
- Three.js reference (read-only): `3d_dev/CDT_Hyperscale_TM/hyperscale-campus-explorer.html`
- `3d_dev/CDT_Hyperscale_TM/campus-model.js` — SERVICES/PROTOCOLS/ZONES/trace() source of truth
- `3d_dev/CDT_Hyperscale_TM/graph/routes.json`, `graph/positions.json`
- Material-snapshot risk memo: `~/.claude/projects/-Users-jimmcknney-project-ruv/memory/hyperscale-babylon-blender-material-coupling.md`
- Dev server: `http://localhost:8124/babylon/hyperscale-campus-explorer.html`

## Visual/Browser Findings
<!-- CRITICAL: Update after every 2 view/browser operations -->
- **Step 0 coordinate verification — CONFIRMED, risk closed.** Live in-browser check against
  the running dev server (`?_cb=1` cache-bust needed — browser had cached the pre-edit JS
  module and silently ran stale code on first reload attempt).
  `importResult.meshes.find(m => !m.parent)` resolves to a node literally named `__root__`,
  confirming Babylon's glTF loader does insert the expected correcting root transform.
  Checked ALL 449 `positions.json` entries (not just the planned 3-5 spot check):
  `BABYLON.Vector3.TransformCoordinates(rawJsonXYZ, root.getWorldMatrix())` vs each asset's
  live resolved world position.
  - 334 Mesh-type assets: max deviation 0.0999m across all of them (bounding-box-center vs.
    JSON-recorded-anchor noise, not a bug) — X/Y/Z all correct, e.g. `rack1_compute` local
    x=-4.2 transforms to world x=+4.2 (exactly matching the live mesh), confirming the X-axis
    mirror correction is real and the fix handles it correctly.
  - 115 TransformNode-type assets (rack/rows/carrier assemblies): X and Z match exactly in
    every sample; only Y differs, by a consistent per-assembly amount (e.g. every `row01_*`
    child rack differs by exactly 1.15 on Y) — this is the assembly's pivot sitting at its
    base rather than at the recorded anchor height, an unrelated modeling convention. No
    mirroring on any axis for any TransformNode either.
  - **Conclusion:** parent all Phase 2 overlay geometry (markers, tubes) under this same
    `__root__` node and feed raw `positions.json`/`routes.json` (x,y,z) directly as local
    coordinates — exactly as planned, now empirically confirmed at full 449/449 coverage
    rather than assumed. Markers/tubes are placed from the transformed JSON coordinates
    directly (not from `getAbsolutePosition()` on live nodes), so the TransformNode Y-pivot
    quirk above does not affect them at all.
  - Temporary `window.__dbg = {scene, assets, byName, root}` debug line added to
    `babylon/hyperscale-campus-explorer.html` right after the stats line, purely to run this
    check from the browser console (module-scoped consts aren't reachable from outside
    otherwise) — to be removed immediately after this verification, not left in for Step 1+.

---
*Update this file after every 2 view/browser/search operations*
*This prevents visual information from being lost*
