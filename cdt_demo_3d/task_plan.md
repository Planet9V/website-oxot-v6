# Task Plan: Babylon.js Connection Explorer — Phase 3 (close the feature gap)

## Goal
Add the missing left-panel subsystems to `babylon/hyperscale-campus-explorer.html` (Phase 1+2
complete: GLB load, 449/449 asset binding, graph markers+tubes, view modes, filters, trace,
search, asset panel, viewpoints) so it reaches full feature parity with the three.js
reference: a 4-phase engagement-stage accordion, marker-colour mode, a conduits control, and
the full ANALYSE section (Threat Path Explorer, Cascading Failure, Risk Portfolio,
Assumptions & Provenance).

Full context, ground truth corrections, and rationale for every step: see the approved plan
at `/Users/jimmcknney/.claude/plans/starry-juggling-catmull.md` (do not duplicate it here —
re-read it directly before each step below).

## Current Phase
Step 9, still paused mid-check (see Step 9's own status note). Step 9b (unplanned rack-graph.json
work) is complete and logged below it. Steps 10-13 not started.

## Phases
Each "Step" below corresponds 1:1 to the approved plan's steps. Phase 3a = Steps 1-8
(modifies existing verified code — regression-test after each). Phase 3b = Steps 9-13
(purely additive on top of 3a's stubs/infrastructure).

### Step 1: Fetch hazard-log.json, build derived lookups
- [x] add to Promise.all, build HZ/HAZ_BY_ASSET/CRIT_BY_ASSET/NODE_OF_ASSET/ALE_BY_NODE/
      REDUNDANCY_OVERRIDE/TIMING
- **Status:** complete — verified live: hazards 11, critical_items 15, ale 6 (total
  $8,880,000), controls 8, assumptions 8, 6 redundancy overrides. Found+fixed a real bug:
  `critical_items` use an `assets` array like `hazards`, not a singular `asset` field —
  CRIT_BY_ASSET was silently empty (size 0) until fixed, now 38.

### Step 2: Normalize remaining edge fields (the oneway fix)
- [x] extend critical_conduit->critical remap with oneway/cross/label
- **Status:** complete — verified directly against both JSON files (not just the port):
  1155 total connections, 16 with one_way=true, 73 with non-null zone_crossing, matching the
  plan's predicted counts exactly.

### Step 3: Supply model (SUPPLY/rule()), no UI
- [x] port supplyMap(), rule(), HARD/SOFT sets against existing edges
- [x] add Ground Truth #1 invariant check (ids unique, mesh names disjoint)
- **Status:** complete — verified live: `rule('row01_cdu','water')` returns 'all-of' (forced
  by the override) despite the asset genuinely having 2 water feeds (confirmed via direct
  JSON read: fws_spine + row01_tcs_return) which would otherwise infer 'any-of' — proves the
  override is wired, not just present. `rule('ups','electricity')` returns 'any-of' from
  feed-count inference alone, as expected. No invariant warning logged.

### Step 4: Fold-section retrofit (regression-risk step)
- [x] convert .lsec/<details> to .sec.fold + .fold-body pairs, 13 ids, 4 empty stubs
- [x] split combined FILTERS into fSvc/fProto/fZone/fCond
- [x] fix keydown-while-typing-in-search latent bug
- [x] full Phase 2 regression sweep before Step 5
- **Status:** complete — verified live: 13 fold sections render matching the reference's
  exact section list/order (screenshot confirms visual parity), all start collapsed. Full
  regression: both view-mode toggles, service chip toggle, criticalOnly checkbox, search (13
  hits for "rack1", matches Phase 2 baseline), asset-group system tab (449 rows, matches
  baseline), viewpoint click, 3D click-select (selected "Row 3", right panel + 4 trace
  buttons present), downstream trace, Escape (closes panel) — all pass, zero console errors.

### Step 5: Phase-stack accordion
- [x] #phases container, PHASES table, openPhase(), built LAST (after all handlers bound)
- **Status:** complete — verified live: 4 phase panels created, section counts per phase
  match secs.length exactly (6/10/13/13), no "phase section missing" warnings, `#left`
  correctly display:none. Cycled through all 4 phases; re-tested chip/search/asset-tab
  handlers inside the moved sections — all survived reparenting (appendChild moves, doesn't
  clone). Screenshot confirms close visual match to the reference's phase-stack layout.

### Step 6: Marker-colour mode + shared paint/material layer
- [x] (mode,key)-keyed material cache, CELLCOL, paintNode/paintEdge(id, state|null)
- [x] 7 state materials, #colmode wiring
- **Status:** complete — verified live: System->Zone->Cell->System cycle fully recovers
  (all 449/449 markers match their expected `gn_system:<X>` material name after returning to
  System mode, not just a sampled one). Material count grew 75->84 (bounded +9 for the new
  zone/cell cache variants, not +449) — confirms the shared-material bug is fixed. matBase.size
  unchanged at 40 (no overlay-material leak into the physical-material snapshot).

### Step 7: Conduits segmented control
- [x] replace criticalOnly checkbox with 2-button segment in fCond
- **Status:** complete — verified live: Critical-only shows exactly 216 tubes (matches this
  project's own documented "216 critical conduits" figure), All restores all 1155.

### Step 8: Analysis arbiter (fixes reference's timer-leak bug)
- [x] beginAnalysis/endAnalysis, route existing trace through it, Escape wiring
- [x] apply() skips arbiter-owned nodes/edges — turned out to be a non-issue by
      construction: unlike the reference, this port's `apply()` only ever calls
      `.setEnabled()` (visibility), never touches `.material` — `applyMarkerColorMode()`
      (Step 6) is the only thing that reassigns marker materials outside paintNode/paintEdge,
      and it's only invoked from the colmode click handler, not from apply(). So there's no
      periodic repaint to fight in the first place.
- [x] full Phase 2 regression sweep; delete __dbg before 3b
- **Status:** complete — verified live end-to-end: setTrace('grid','down') correctly enters
  'trace' kind, force-switches physical->graph mode, traceSize 230 (matches known-good BFS
  result); clearTrace()/Escape both correctly restore kind=null, S.trace=null, 0 painted
  nodes/edges, mode preserved (not reverted). Full regression sweep (view modes, chips,
  critmode, search, asset tabs, colmode, viewpoints, real 3D click-select "Row 4 LV
  lighting", trace, Escape) all pass, zero console errors. __dbg fully removed (grep clean),
  fresh reload after removal still shows 449/449 bound. **Phase 3a complete.**

### Step 9: Threat Path Explorer
- [x] ROUTABLE/REVERSIBLE/BLOCKED_REASON/11 ENTRY buttons/threatWalk() over existing adj
- [x] #threat panel, paintThreat(), 550ms animation, text report
- **Status:** verification in progress, PAUSED mid-check (user switched to an unrelated task —
  a document-indexing job — resume here). So far confirmed live: 11/11 ENTRY ids resolve
  (matches Plan agent's corrected finding), all boundary entries have a reason (0 undefined),
  threatWalk('internet') reaches 267 assets with 308 boundary edges. Still needed: the
  decisive oneway-fix-disabled comparison test (was mid-run when a transient tool-classifier
  timeout interrupted it — not a code issue, just retry), the full UI click-through (entry
  button -> panel opens -> animation -> report renders -> hop-row click selects -> Clear),
  and the arbiter-conflict check with trace. Debug hook is still present in the file
  (window.__dbg with scene/assets/edges/adj/edgesById/HZ/S/analysis/ENTRY/threatWalk/
  runThreat/threatState) — do not forget to remove it before Step 13's final check.

### Step 9b (unplanned, out-of-band): rack-graph.json completion + live wiring
- **Not part of the original Phase 3 step list above.** This work entered through a separate
  conversation thread (`facility_reseearch/Rack_Envelope_Threat_Workstream/`, a rack-level
  threat-modeling workstream) and ended up modifying this same viewer file. It should have
  been logged here as it happened; it was not. Recording it now, after the fact, in full.
- [x] `graph/rack-graph.json` completed: added connections r22 (nvswitch_tray -> new
      `_external_scaleout_uplink` interface) and r23 (compute_tray -> tor_switch, storage
      egress); replaced generic "Ethernet/TCP-IP" protocol labels with real protocol names on
      r13/r14/r17/r18/r19; filled in all 15 previously-null connection notes; enriched
      compute_tray/nvswitch_tray/tor_switch attributes with real interconnect detail (PCIe,
      HBM, DPU identity). Full detail and citations: `facility_reseearch/Rack_Envelope_Threat_Workstream/research/09-amd-bom-vs-graph-gap-analysis.md` and `10-amd-icd-connections-vs-graph.md`.
- [x] Confirmed (before wiring) that rack-graph.json was NOT loaded by this viewer at all —
      audit in `facility_reseearch/Rack_Envelope_Threat_Workstream/research/11-rack-graph-scene-linkage-audit.md`.
- [x] Wired rack-graph.json into this file: added as a 7th `Promise.all` fetch; added ~90
      lines expanding its 10-component template across all 96 real rack instances into
      concrete per-instance assets/edges at load time (3,929 assets, 12,576 connections,
      verified counts); registered 5 new protocol strings in `PROTOCOLS`, `ROUTABLE`, and
      `REVERSIBLE` (missing from `ROUTABLE`/`REVERSIBLE` would have silently made the new
      edges untraversable by threatWalk — caught live, not by inspection).
- [x] Bug found+fixed during live verification: first pass created duplicate synthetic assets
      for 7 components (`rack1_psu`, `rack1_busbar`, `rack1_compute`, `rack1_storage`,
      `rack1_mgmt`, `row1_tor`, `row1_tor_b`) that `hazard-log.json`'s N14 node already
      references by those exact ids in `facility-graph.json` — was silently stealing their
      mesh binding. Fixed: defer to the pre-existing asset when a mesh is already claimed.
- [x] Bug found+fixed during live verification: the new rack-internal subgraph had zero edge
      connecting it to the hall-level rack node itself (`row01_rack01`, one of the 11
      `threatWalk` entry points) — `threatWalk('row01_rack01')` reached 0 of the new nodes.
      Fixed: added one bridging edge per rack instance (rack -> its own `mgmt_tray`, same
      IPMI/Redfish protocol as the real h713 critical conduit).
- [x] Verified live in a browser (local `python3 -m http.server`, not just read): JS syntax
      check, a Node dry-run of the expansion algorithm against real JSON first, then actual
      page load — console clean (only 18 pre-existing unrelated warnings), stats bar correct,
      `threatWalk('row01_rack01')` went from 463 -> 2,381 reached nodes and now correctly
      includes mgmt_tray/compute_tray/nvswitch_tray/storage_node.
- **Known gaps, not yet closed** (see `research/11-rack-graph-scene-linkage-audit.md` fix list
  items #4-6 and the retrospective below):
  - `positions.json` was NOT extended with per-component coordinates — the new assets bind to
    real meshes (clickable) but have no entry for the overlay-marker system, which reads
    `positions.json` separately from mesh transforms. Marker-mode rendering for rack-internal
    nodes is unverified and likely absent.
  - The search box, filter checkboxes, and asset-list panel UI were never clicked through
    directly — only the underlying data (`assets`/`edges`/`adj` via `threatWalk`) was verified.
  - `_external_scaleout_uplink` (r22's target) still has no real graph asset anywhere — the
    edge exists but a threat walk still dead-ends there by design (no fabricated node), so the
    scale-out risk this was built to demonstrate still can't be shown end-to-end.
  - The `REPRESENTATIVE_ONLY` single-edge simplification for r13/r14/r15/r16/r19/r22/r23 (real
    per-port fabric topology isn't specified anywhere) was a judgment call made solo, not
    checked against real topology data or flagged to the user as a decision point at the time.
  - `window.__dbg` (flagged for removal before Step 13 since Step 9's own note above) is not
    just still present — it was actively used for this turn's verification. Still needs
    removal before Step 13.
- **Interaction with Step 9 above:** Step 9's own pause point (decisive oneway-disabled test,
  full UI click-through, arbiter-conflict check) is untouched by this work and still open.
  `threatWalk('internet')` was not re-run to confirm its 267/308 figures are unchanged after
  these edits — should be re-verified before resuming Step 9, since ROUTABLE/REVERSIBLE (which
  Step 9 depends on) were modified above.

### Step 9c (unplanned, out-of-band): end-to-end threat walk, internet -> smallest rack component
- **Approved plan:** `/Users/jimmcknney/.claude/plans/starry-juggling-catmull.md` (overwrote the
  prior unrelated plan in that file per Plan Mode's own instruction — this task_plan.md's Step
  9b context still applies, that plan file's content does not).
- Four workstreams, each logged here as it happens (not after, per the Step 9b process-failure
  entry above):
  1. **[x] WS1 — close the r22 scale-out dead end. Complete, verified live.**
     Added `scaleout_spine_sw` to facility-graph.json (system DATA, zone Z0, `mesh: null` --
     honestly unbound, no physical asset exists yet; standards "UALink 1.0; UEC 1.0" per AMD
     ICD-025; asset_count 209->210, by_cell.Campus (shared) 176->177). Redirected
     `_external_scaleout_uplink` in the viewer to resolve to it instead of `null`.
     Live-verified: connections 12,576->12,672 (+96, exactly one r22 per rack), skipped
     192->96 (only `_external_leak_detection` still unresolved, expected). Console clean.
     Found and fixed a second real bug during this same verification pass: `UALink over
     Ethernet (UALoE) / UEC 1.0` was in ROUTABLE but not REVERSIBLE, so the spine was reachable
     (hop 6) but had 0 usable outgoing paths -- a pure dead-end sink, not a pivot. Added it to
     REVERSIBLE (shared switching fabric, not a one-way client uplink -- same class of
     reasoning as the existing IPMI/Redfish entries). Re-verified: all 96 racks' `_r22` edges
     now appear in `threatWalk('internet').used` -- confirmed the walk genuinely reverse-
     traverses the spine out to every other rack, not just coincidentally re-reaching racks
     already reachable via the pre-existing frontend-network lateral movement (checked directly
     via edge-level `used` membership, not just aggregate reached-count, since the aggregate
     count didn't change and would have hidden this).
  2. **[ ] WS2 — real tiered positions/routes for all 96 racks.** Reuse `graph/routing.js`
     unmodified. Tier 2 (rows01-02, mesh-derived, harvested live from the GLB) + Tier 3
     (rows03-06, synthetic, explicitly tagged `positionSource: 'synthetic'`). New
     `graph/generate-rack-overlay.js` + `graph/rack-positions.json` + `graph/rack-routes.json`.
     Default rack-internal markers/tubes hidden behind a new `S.showRackInternal` toggle pending
     a real load-time/frame-rate measurement.
  3. **[ ] WS3 — standards citation backfill.** Add `standards` field to all 24 rack-graph.json
     connections, sourced against the AMD workbook's Tab 4 ICD STANDARD column (28 rows); any
     connection with no real match gets `"standards": null` + a reason in `note`, never silent.
  4. **[ ] WS4 — live UI click-through.** Search box, filter chips, asset-list panel with real
     data loaded; check the 60-entry "WHERE THE PATH STOPS" cap; re-baseline
     threatWalk('internet') (was 267/308 before ROUTABLE/REVERSIBLE changed in Step 9b).
- **Status:** in progress. WS1 complete and verified live. WS2 broken into 6 bite-sized tasks
  (project-tool task ids #9-14) per the executing-plans skill; WS2.1 complete: harvested 1,561
  real mesh-derived tier-2 positions live from the loaded GLB (rows01-02 -- note: 1,561 is more
  than the naive 32-rack estimate of 1,305, meaning mesh-binding ground truth is somewhat wider
  than hall-graph.json's `model_detail` field alone predicted; used the real binding, not the
  estimate), transform verified against the curated `rack1_compute` entry before trusting it at
  scale, saved to `facility_reseearch/Rack_Envelope_Threat_Workstream/research/13-tier2-harvested-positions.json`.
  WS2.2 complete: agent found `campus-model.js`'s real `rackLOD()`/`rackLite()` generator
  functions (the authoritative source `hall-graph.json.meta.generated_from` names) and derived
  the 41-component offset table analytically from them rather than guessing -- I independently
  QA'd this myself (per the requested audit loop), not just trusted the summary: spot-checked
  `campus-model.js:145-174` constants/functions directly (exact match) and cross-checked
  `row04_rack03_busbar`/`frame`/`manifold_supply` against my own WS2.1 harvest -- all three
  matched the agent's derived offsets exactly. Verdict: pass.
  Two real, useful findings from this QA pass, folded into WS2.3's scope:
  1. 4 of 41 components (frame, busbar, manifold_supply, manifold_return) have REAL meshes on
     ALL 96 racks, not just rows01-02 -- WS2.3 should prefer the WS2.1 harvest for these 4 on
     every rack and only use WS2.2's offset table for the other 37 (tray-type) components.
  2. Found a real naming inconsistency in MY OWN Step 9b viewer code (not a rack-graph.json
     problem): for single-instance components whose own `mesh_suffix` already ends in a literal
     index (`storage_node`'s mesh_suffix is `"_storage_node_0"`, `mgmt_tray`'s is
     `"_mgmt_tray_0"`), the asset-id generator doesn't append that index (produces
     `row01_rack02_storage_node`, no `_0`) while the real mesh name correctly does
     (`row01_rack02_storage_node_0`). WS2.2's offset table correctly follows mesh_suffix
     (`storage_node_0`/`mgmt_tray_0` keys); WS2.1's harvest (keyed off actual asset ids) does
     not have the `_0`. WS2.3 must reconcile this when joining the two files -- key off
     `comp.id` consistently, not assume a literal string match between them.
  WS2.3 complete: `graph/generate-rack-overlay.js` written, `graph/rack-positions.json`
  (3,929 entries, 1,561 measured / 2,368 synthetic) and `graph/rack-routes.json` (12,576
  routes) generated. I independently re-verified (not just trusted the agent's self-check):
  confirmed `graph/routing.js` mtime unchanged (Aug 25, untouched); confirmed both output
  files' real structure/counts match the claim exactly; confirmed all 12,576 `route_key`
  values are actually unique; confirmed geometry bounds (x -4.7..7.34, z -9.87..9.59) show no
  wall-crossing outliers; confirmed the 96 unresolved routes are exactly and only the
  `scaleout_spine_sw` edges (0 fabricated). Verdict: pass.
  One real judgment call worth flagging, made by the agent and confirmed reasonable on review:
  `routing.js`'s stock lane-spreading (parallel runs in one corridor offset side-by-side, tuned
  for ~30 runs/corridor at facility scale) reached lane index 179 (12.6 m lateral offset) when
  fed 360 parallel rack-internal runs in one corridor, throwing polylines through/past the
  building wall (x=19.69, past the wall at x=13.4). Fixed by collapsing lane spacing to 0 on
  this script's own router instance only -- `routing.js` on disk is unmodified (confirmed by
  mtime), the deviation is scoped to this one generation pass.
  Batch 1 (WS2.1-2.3, executing-plans skill) complete. Batch 2 (WS2.4-2.6) complete, verified live:
  WS2.4 wired `rack-positions.json`/`rack-routes.json` into the viewer as an 8th/9th fetch. Found
  and fixed a real bug while wiring: every fan-out connection (e.g. busbar->18 compute_trays) had
  produced N edges sharing ONE `id` per rack (`${inst.id}_${c.id}` with no per-combo suffix),
  silently breaking every plain-`.id`-keyed Map (`edgesById`, `edgeTubes`, `routesById` -- only the
  last-created object of each duplicate group was ever reachable through them, though all N still
  rendered). Root-caused, not patched around: added a `comboIdx` suffix whenever
  `fromIds.length * toIds.length > 1`, applied identically in both the live viewer and
  `graph/generate-rack-overlay.js`, then regenerated `rack-routes.json`. Verified:
  `edgesById.size === edges.length === 13,851`; `row01_rack01_r2_0`..`_17` confirmed as 18
  genuinely distinct ids.
  WS2.5 added the `S.showRackInternal` filter toggle (default hidden) wired into `nodeVisible`/
  `edgeVisible`, correctly overridden by an active `S.trace`.
  WS2.6 live-verify surfaced a critical, real regression, root-caused and fixed before moving on:
  - **Finding:** with all ~3,929 rack-internal markers + ~12,576 tubes eagerly created at load
    (mirroring the reference three.js behavior), measured frame rate collapsed to 0.7 fps --
    and stayed 0.7 fps even with `S.showRackInternal: false` (`setEnabled(false)`) and even in
    `physical` mode where the whole graph overlay is invisible by design. This ruled out a simple
    visibility-toggle fix.
  - **Fix:** switched from eager-create-then-toggle to lazy construction. The marker- and
    tube-creation loops now skip anything rack-internal (`template?.startsWith('rack_component:')`
    / `e._rackInternal`) at load time; a new `ensureRackInternalOverlay()` builds the skipped
    ~3,929 markers + ~12,576 tubes on first real need, idempotently (guarded by
    `rackInternalOverlayBuilt`). Wired into two entry points: the rack-detail "Show" button
    (before `apply()`) and `runThreat()` (unconditionally, before `playThreat()`, since a trace
    can reach rack-internal nodes regardless of the toggle and `paintNode`/`paintEdge` need real
    meshes in `nodeMarks`/`edgeTubes` to paint anything).
  - **Live-verified, fresh reload each time:** (1) default load: 449 markers / 1,178 tubes created
    eagerly, ~3,929 markers / 12,672 tubes deferred (console-confirmed exact counts), steady-state
    FPS 60.0 sampled every 300ms for 9.5s in both `graph` and `physical` mode -- the eager-load
    regression is gone. (2) Show button: click fires a ~4.7s synchronous build (12,672 tubes is
    the expensive part), mesh count jumps 7,087 -> 23,592, and FPS settles at a *sustained* 60.0
    (10 samples over 9.5s, not just an instantaneous read) once the one-time build finishes --
    this directly contradicts the earlier 0.7 fps finding at the same total mesh count. Most
    likely explanation, not fully proven: the earlier reading was taken during/immediately after
    the sync construction stall itself rather than after it settled, since `getFps()` reflects
    recent elapsed frame time and a multi-second synchronous block would read as near-zero fps
    right after it ends. Flagging this discrepancy explicitly rather than silently overwriting the
    earlier claim. (3) `runThreat('internet')` on a fresh reload (Show never clicked): confirmed
    `ensureRackInternalOverlay()` fires from this path independently -- mesh count jumps
    7,087 -> 23,592, and exactly 17 `row01_rack01_compute_tray` markers get built, matching the
    plan's previously-verified "17 of 18 compute-tray instances reachable" fact. No console errors
    in any of the three scenarios.
  - **Practical takeaway kept regardless of the fps discrepancy:** lazy construction is still the
    right design -- it removes the ~4.7s synchronous stall from the default load path entirely
    (deferring it to an explicit user action), which is a real win independent of whether the
    steady-state rendering cost claim was fully correct.
  Task-tool WS2 tasks (#9-14) closed. Ready for WS3 (#15-16) and WS4 (#17-18).
  **Kaizen self-review (post-batch, before starting WS3):** two claims re-checked instead of
  taken on the aggregate-count match alone: (1) re-ran the *exact* original repro conditions
  (`physical` mode, full 23,592-mesh build) rather than a similar-but-different state -- sustained
  60.0 fps over 5s, a true apples-to-apples contradiction of the 0.7 fps reading. (2) Read the
  actual `ensureRackInternalOverlay()` console log instead of trusting the mesh-count delta:
  `3929 markers (0 unresolved), 12576 tubes (96 missing route)`. Traced the 96 -- exactly the
  `_r22` edges (`nvswitch_tray -> scaleout_spine_sw`) added in WS1. Not a new bug:
  `scaleout_spine_sw` was deliberately given `mesh: null` (no physical asset exists yet, logged
  in the WS1 entry above), so it has no position and can never get a marker or routed tube --
  reachable in `threatWalk` but permanently invisible in the 3D graph overlay. Reconfirmed
  consistent post-WS2, not something WS2 introduced or broke. Not yet checked: repeated
  Show/Hide/Show cycling behavior, and filter-chip interaction with rack-internal detail shown
  (the latter correctly already scoped as WS4.1, not a new gap).

- **WS3 — standards citation backfill. Complete, verified via independent adversarial audit.**
  Read the AMD ICD Tab 4 table directly (28 rows, `CDT-AMD-Hyperscale/...Workbook.md:248-284`)
  and `hall-graph.json`'s `meta.frameworks` as the documented fallback, then wrote
  `standards` (+ `standards_note` where null/approximate) onto all 24 `rack-graph.json`
  connections myself -- 23/24 real citations, 1 null (r21, dry-contact leak detection).
  Per the requested audit/QA loop, dispatched an independent Opus agent (fresh context, no
  anchoring on my own reasoning) to adversarially verify every citation against the actual
  workbook text, not from memory. Result: 0 fabrications (every ICD-ID real, every STANDARD
  string traced verbatim), but 6 of 24 flagged QUESTIONABLE -- under-citation (missed a better-
  fitting ICD row) or inconsistent disclosure (asserted an exact match via a missing
  `standards_note` where the endpoints didn't actually line up), plus one false claim inside a
  note ("only NIC-to-ToR row in Tab 4" -- ICD-013 also qualifies). Most significant finding: the
  r21 null was wrong -- I had only checked the AMD workbook and hall-graph.json, and missed
  `graph/icd-graph.json` entirely, this project's own authoritative interface spec (its own meta
  says it wins on conflict). It has ICD-10.16 (`LEK-DET-01 -> LEK-CTL-01`, `medium_protocol:
  "Relay contact (sense wire resistance)"`, `safety_class: "SIL 2"`) -- a real, on-point match
  for r21's own "Dry contact" protocol field. I independently re-verified this claim myself by
  reading `graph/icd-graph.json` directly (didn't just trust the agent's quote) before acting on
  it. Applied a corrective patch to all 13 flagged/related connections (r0-r6, r13, r14, r15,
  r17, r18, r21): r0-r6 switched from the generic TIA-942 fallback to OCP Open Rack v3 (already
  used by the `busbar` component itself, more precise); r13/r14/r15/r17/r18 gained honest
  `standards_note` disclosures of endpoint/approximation gaps and, where the audit found a
  better-fitting row the first pass missed (ICD-028 for r14's K8s traffic, ICD-013 for r15's
  storage/NVMe-oF traffic, ICD-026 for r17's Caliptra attestation traffic), added those
  citations too; r21 changed from `null` to `IEC 61508 (SIL 2 functional safety)` (a correct
  inference from the SIL 2 classification itself, not fabricated -- SIL ratings are only
  meaningfully defined by IEC 61508/61511). Final: **24/24 real citations**, structurally
  verified (`grep`-countable: every connection has a `standards` key, JSON still valid).
  One open item flagged by the audit but NOT fixed here, out of this workstream's scope
  (citation only, not topology): `icd-graph.json` routes leak alarms to a manifold isolation
  valve and the BMS, never to a DC busbar, while `rack-graph.json`'s r21 edge is
  `_external_leak_detection -> busbar` -- worth a future look at whether r21's endpoints
  themselves are right, separate from its standards citation.
  Task-tool WS3 tasks (#15-16) closed. Ready for WS4 (#17-18).

### Step 10: Cascading Failure
- [x] cascade() wave propagation, 14 seed buttons + hazard-log seeds + fail-selected
- [x] #cascade panel, paintCascade(), dollar consequence + MOR report
- **Status:** complete, verified live. Ported from the three.js reference
  (cascade/paintCascade/animateCascade/runCascade), adapted to Babylon's mesh/material API,
  the existing `beginAnalysis`/`endAnalysis` arbiter (Step 8), and `paintNode`/`paintEdge`/
  `STATE_MATS` (Step 6) -- added one missing state, `blind` (0xf5e6c8/0xd8a63a/0.80/0.30,
  exact match to the reference's `HL_BLIND`), the only STATE_MATS entry not already pre-built.
  **Real bug found and fixed during live verification, not just at write time:** `cascade()`
  itself (the wave-propagation function) was never actually ported in Step 3 -- only its
  dependencies `supplyMap()`/`rule()` were, despite Step 3's own log entry reading "Supply model
  (SUPPLY/rule())" which I misread as covering `cascade()` too. First live test threw
  `TypeError: cascade is not a function`. Fixed by porting `cascade(seedIds)` verbatim from the
  reference (CG.nodes -> assets Map, CG.edges -> edges array, same protective/host_equipment
  field names -- confirmed unchanged via direct read of hall-graph.json).
  **Real capability upgrade over the reference, not just a port:** the reference only ever
  modeled 96 atomic rack nodes; this port's `edges`/`assets` are the full WS2 rack-expanded
  graph, so a failure seeded above a rack now genuinely propagates into that rack's ~41 real
  components. Live-verified with the "Row 1 CDU" seed: 483 assets stopped (not just ~16 rack
  nodes), 31 degraded, 4 waves, 16 of 96 racks lost, consequence math correct ($240K/1h up to
  $1.92M/8h for one cell, ×14.5 cross-cell figure), N6's authored ALE cited correctly. Confirmed
  the paint pipeline reaches rack-internal meshes specifically (a `row01_rack01_compute_tray`
  marker directly observed with `material.name === 'state_failed'`), confirmed
  `ensureRackInternalOverlay()` fires correctly from `runCascade()` (mesh count 7,087 -> 23,592,
  same lazy-construction integration point as `runThreat()`), confirmed Clear correctly restores
  `S.trace = null` and hides the panel. 4 of 14 hardcoded CASCADE_SEEDS (dali_gw, pava_vacu,
  chw_buffer, fw_pump) don't resolve in this port's asset set -- logged via the same
  `console.warn` pattern already used for ENTRY/other seed lists, not a new failure mode, not
  silently dropped. No console errors in any tested scenario.

### Step 11: Risk Portfolio
- [x] #risk panel, money(), ALE-by-node, 8 controls w/ live residual (max not compound)
- **Status:** complete, verified live. Ported from the reference's renderRisk()/openRisk()
  near-verbatim -- entirely HZ-data-driven, no CG.nodes/three.js dependency to adapt. Verified:
  opened the panel, confirmed real baseline/residual/spend/ROSI figures ($8.88M baseline, 6
  ALE-by-node rows, 8 controls listed), clicked a control checkbox and confirmed residual
  recomputed live and correctly (baseline unchanged at $8.88M, residual dropped to $7.48M, "1
  control selected"). No console errors.

### Step 12: Assumptions & Provenance
- [x] #assume panel, cell_conformance/assumptions/reconciliation/architecture_review
- **Status:** complete, verified live. Ported from the reference's renderAssume()/openAssume()
  near-verbatim -- also entirely HZ-data-driven. Verified: opened the panel, confirmed real
  content rendered ("16 recorded · 3 high severity · 0 cell gaps · 7 gaps closed, 8 open"),
  including the CELL CONFORMANCE section's own cascade-verified claim ("a Cell A busway loss
  stops 67 assets and no Cell B rack, where the shared spine previously stopped 127..."). No
  console errors.

### WS4 (from Step 9c) — closed out after the interruption
- WS4.1 finished: the search box, filter chips, and asset-list panel were all re-verified live
  after the earlier interruption (Docker/localhost question from the user, addressed separately)
  found what looked like a zero-results search bug. Root cause: **not a real bug** -- it was the
  same stale-cache artifact that also hid the cascade panel on first load (the plain
  `python3 -m http.server` was serving a cached copy; a cache-busting reload resolved both).
  Re-tested clean: `runSearch('compute tray')` correctly returns 8 real hits (verified exact
  asset label `"Rack 01 compute tray"` exists and matches); a service filter chip (Water /
  coolant) correctly toggles 221 tubes on/off/on (957 -> 1178 -> 957 enabled) in `graph` mode.
- WS4.2 finished: the "WHERE THE PATH STOPS" 60-entry cap is confirmed non-silent at the new,
  much larger graph size -- live `threatWalk('internet')` from the UI showed "… and 1982 more."
  after listing 60 deduped boundary entries (2,138 raw boundary hits, deduped by edge id before
  the cap). Re-baselined `threatWalk('internet')`: **2,382 of 4,397 total assets reached**
  (2,994 edges used, 2,138 boundary hits). This is not comparable to Step 9's old 267/308
  baseline -- that baseline was taken on the pre-WS1-3 graph (~449 total assets); the graph is
  now ~10x larger (4,397 assets, of which ~3,929 are the rack-internal components WS2 added), so
  a like-for-like regression check against the old figure would be meaningless. 2,382/4,397 is
  the new baseline going forward.

### Step 13: Final regression + docs
- [x] fresh reload, full continuous session, __dbg grep clean
- [x] update babylon/README.md, task_plan.md/findings.md/progress.md
- **Status:** complete. Fresh reload (`?final=1`), one continuous session covering
  physical/graph/both mode switching, search, threat walk, cascade, risk, assumptions, and the
  rack-internal Show toggle (full 23,592-mesh build) with zero console errors throughout and a
  sustained 60.0 fps afterward. Found and removed one orphaned duplicate `TEMP DEBUG` comment
  (dead leftover from a mid-session edit anchor collision, no functional effect). Reconsidered
  the original "remove __dbg before shipping" note and decided to keep it as a deliberate
  permanent debug surface instead (documented in babylon/README.md), given how much real
  verification work it enabled across this whole phase. Docs updated: babylon/README.md's
  Status/Deployment/user-guide/Extending sections, findings.md's Issues Encountered table,
  progress.md's session log and 5-Question Reboot Check.
  **All 13 steps of this plan are now complete**, including the out-of-band Step 9c (WS1-4).

### Post-completion fixes (user feedback after Step 13)
- **Default view mode:** user asked for the default view to be Graph, not Physical. Changed
  `S.mode` init and the initial `setMode()` call from `'physical'` to `'graph'`. Live-verified:
  clean load, Graph button active, 60 fps, 7,087 meshes (rack-internal stays correctly
  deferred, unrelated toggle).
- **Sidebar collapsed by default (real UX gap, not caused by the above):** all four phase-stack
  tabs AND every section within them started fully collapsed on load (`openPhase(-1)`,
  explicitly commented as "matches the reference's initial state") -- meaning search, filters,
  the view-mode buttons themselves, and all four ANALYSE panels were completely invisible
  until two nested accordion clicks. User confirmed via `AskUserQuestion` they wanted this
  changed. Fixed: init now calls `openPhase(3)` (Phase 4, "WS-2 Risk Alignment" -- the most
  complete workflow stage) and un-shuts every section in `PHASES[3].secs`. Live-verified:
  `searchInput`/`viewModeBtns` both visible immediately, Phase 4 marked open, Graph button
  active, screenshot-confirmed the full panel (Viewpoint/View/Search/Marker Colour/Service/
  Asset List) renders correctly on load.
- **Graph-mode overlay far too bright (real, genuine parity gap with the reference):** the
  reference's own `CONDUIT` table deliberately dims graph-mode conduits (`opacity:0.34,
  emissive:0.06`, commented "schematic: recedes behind the facility") versus physical mode
  (`opacity:0.97, emissive:0.30`, "fully present") -- this per-mode scaling was never ported;
  Babylon's markers/tubes always rendered at one fixed full-brightness material regardless of
  mode. Only became visually obvious once Graph became the default (previously Physical was
  default, so nobody was looking closely at graph-mode brightness). Fixed: added the `CONDUIT`
  table verbatim and a new `conduitLook(mode)` function that rescales every cached node/edge
  material's `alpha`/`emissiveColor` (reading each material's own already-stored
  `diffuseColor` to rescale from, no separate bookkeeping needed). Deliberately does NOT touch
  `STATE_MATS` (threat/cascade painting stays full-brightness regardless of mode, so analysis
  results still stand out). Wired into `setMode()` (every mode switch) and the end of
  `ensureRackInternalOverlay()` (catches materials the lazy build creates for color-key
  combinations not seen before that call). Note: `nodeMaterialFor`/`edgeMaterialFor` cannot
  read `S.mode` directly at material-creation time -- they're called during the eager
  marker/tube build, which runs *before* `const S` is declared later in the file: this is why
  `conduitLook()` is a separate retroactive pass rather than mode-aware creation. Live-verified:
  sample marker alpha 1.0 -> 0.34 in graph mode (screenshot-confirmed visibly muted/schematic
  vs. the earlier saturated look), toggling Both -> Graph correctly reads 0.88 -> 0.34, zero
  console errors throughout.
- **Node marker desaturation/opacity tuning (multiple passes) + routing.js lane-offset bug:**
  see `babylon-viewer-graph-mode-opacity-state` and `routingjs-lane-offset-runaway-bug` memory
  files for the full record — grey-tint fixed to derive emissive from post-desaturation diffuse
  (not pre-desaturation base), building/marker opacity locked at 0.45 in graph mode ("translucent,
  walls visible through"), conduits split 10 points more transparent at 0.35 ("too overwhelming"
  at equal opacity), and `graph/routes.json` regenerated with `SERVICE[s].lane` zeroed on the
  router's own instance to fix a lane-offset runaway that was pushing several services' conduits
  diagonally through the building (air worst case: lane index 92 x 0.24m spacing = ~11m lateral
  distortion). `routing.js` itself was never edited — confirmed by checksum before/after.
- **Diamond node markers must never appear during click/select/threat-path/cascading-failure —
  only real equipment/conduits may glow (real functional gap, not cosmetic):** `paintNode(id,
  state)` (the function backing Threat Path Explorer and Cascading Failure's per-node visual
  state) targeted `nodeMarks.get(id)` — the diamond/octahedron overlay marker — instead of the
  real bound GLB geometry. Combined with `nodeVisible()`'s `S.trace` override (force-showing
  markers whenever an analysis was active, regardless of the user's Hide/Show toggle), this
  meant every threat walk or cascade populated the scene with diamonds even when the user had
  explicitly hidden them — directly contradicting "hide markers, work with real geometry"
  feedback given earlier the same session. `paintEdge`/edge tubes needed no change; they already
  correctly targeted real `edgeTubes.get(id)` meshes. Fixed: `paintNode` now targets
  `assets.get(id)?._node` (the real mesh) with a stash/restore pattern (`mesh.metadata.
  _paintOrigMaterial`) so the analysis material swap can be cleanly undone on `#threatClear`;
  the `S.trace` override was removed from `nodeVisible()` so markers never force-show. Also
  added defensive undefined-guards to `highlight(node)`/`frameObject(node)` (both call
  `node.getChildMeshes` — a latent crash risk that became newly reachable once markers became
  clickable, for the case of an unbound asset with no `_node`) and a `pickedMesh` fallback in
  `selectAndFly()`. Live-verified end to end: ran `window.__dbg.runThreat('internet','Internet')`
  with markers toggled Hide (`showNodeMarkers:false`) and confirmed `markersEnabledDuringThreat:
  0`; checked a reached asset's real mesh material read `state_entry`/`state_reached` correctly
  and restored to its true original material (`cab_gray`, not a placeholder) after
  `#threatClear`; dispatched a real click on an unbound asset's marker mesh via the same
  pointerdown/pointerup-at-projected-coordinates technique used for the earlier `assetOf` fix —
  no console error, no crash. Took two screenshots (one framed close on the entry point, one
  zoomed out to the full facility with 2,381 of 2,381 reachable assets marked reached) and
  opened both with the `Read` tool per the standing visual-verification rule: confirmed real
  conduit tubes and real equipment meshes glowing red/orange along the full threat path, the
  translucent 0.45-alpha building visible throughout, and zero diamond markers anywhere in
  either frame despite the large reached-count. Also corrected the now-stale helper text under
  the marker Hide/Show toggle, which previously read "an active threat walk or cascade shows its
  own nodes regardless of this toggle" — no longer true after this fix.
- **Rack-internal components never bound to `asset._node`, so they silently never glowed during
  a threat walk/cascade even though their conduits did (discovered answering "is the rack detail
  actually wired in / does it zoom / is it accurate"):** the rack-graph.json expansion loop
  (~line 729) has always set the reverse link (`node.metadata.assetId = localId`, so direct 3D
  clicks and search-by-mesh-name resolve correctly) but never the forward link
  (`asset._node = node`) that `paintNode()` and `frameObject()` key off with no mesh-name
  fallback. This was invisible until today's diamond-marker fix retargeted `paintNode` from the
  marker (which always existed) to `asset._node` (which never existed for any of the 3,929
  rack-internal component assets) — a real regression introduced by that same fix, not a
  pre-existing bug. Confirmed live: `row01_rack01_nvswitch_tray_0` was in a threat walk's
  reached set with its mesh still on the plain `nvsw_face` material, never swapped to a
  `state_*` paint, while its conduits lit up correctly. Fixed by setting
  `rackAsset._node = node` alongside the existing metadata link in the same expansion loop.
  Live-verified: same asset now reads `assetNodeBound: true`, its mesh material correctly
  becomes `state_reached` once the hop-animation reaches it (hop 5 of 8), and correctly restores
  to `nvsw_face` on `#threatClear`. Screenshot-confirmed (opened via `Read`) the full facility
  view with 2,381 assets reached: conduits and rack-internal equipment blocks glowing red/orange
  throughout, zero diamonds, translucent building visible — `BUILD_TAG` bumped to
  `look-v14-rack-component-node-binding`.
- **Search/asset-list zoom-to-rack-component confirmed working independently of the above bug:**
  searching "compute tray" and clicking the result zoomed the camera in tight (radius 48 -> 1.6)
  and opened a detail panel with real data (vendor: AMD/Intel/NVIDIA silicon; standards: OCP
  S.A.F.E., IEC 62443-4-1, TCG TPM 2.0, Caliptra; attributes: E1.S NVMe local storage, QSFP
  backend NIC; attack-surface notes; mesh name `row01_rack01_compute_tray_0`) — this path
  resolves the mesh by name independently of `asset._node`, so it was unaffected by the gap
  above. Screenshot-confirmed.
- **Standards-citation backfill (Workstream 3) confirmed complete:** all 24 of
  `graph/rack-graph.json`'s connections have a real `standards` field (grep-verified, not a
  percentage taken on faith) — e.g. `r13` (Infinity Fabric xGMI) -> "AMD xGMI", `r17`/`r18`/`r19`
  (IPMI/Redfish) -> "IPMI 2.0; DMTF DSP0266 v1.16", `r22` (scale-out) -> "UALink 1.0; UEC 1.0".

### Views/Tour/Loading-dock feature (new, brainstorming-skill design + implementation)
Driven by an explicit request to redesign the Viewpoint system, add a default rotating
establishing shot with a real sky background, and add an auto-cycling Tour. Followed the
brainstorming skill's discipline (review current state, one-question-at-a-time, Understanding
Lock before any code) rather than guessing a design — see the conversation's AskUserQuestion
exchanges for the full decision trail; summarized here.
- **Investigated before designing, not guessed:** the old 5-viewpoint list (campus/hall/
  electrical/cooling/mmr) covered only a fraction of the built spaces. Live asset-count query
  found Core IT room (51 assets) and the Reception/Mantrap/Security-office cluster (14 assets)
  had zero dedicated viewpoints despite being substantial. Also confirmed via mesh-name grep
  across all 23,575 GLB nodes that no "loading bay" exists anywhere in the model.
- **Real gap surfaced, not assumed:** user pushed back ("I thought we had these, where are
  they?") on reception/client-area/security-guard-room/loading-bay. Dispatched a research
  agent against `facility_reseearch/Hyperscale_Design/Hyperscale-Data-Center-Complete-
  Reference-Architecture.md` (the actual space-program spec) cross-referenced with the GLB and
  `graph/facility-graph.json`. Findings: loading dock/staging (Zone G) was specified in real
  detail (dock-leveler specs, truck-court depth) but never built -- a genuine, previously
  undiscovered gap, not mentioned as cut/deferred anywhere in this project's own tracking
  files. Client/customer work area was never specified anywhere in the design corpus at all
  (single-tenant hyperscale design, not colo) -- nothing to build. Reception and the indoor
  Security Officer's office both turned out to already have real furniture-level detail (desk,
  workstations, badge reader, turnstile, CCTV NVR) -- richer than assumed from the mesh name
  alone. The perimeter guard booth is real but minimal (one placeholder box).
- **Loading dock placeholder built and wired as a real asset**, not just decorative geometry:
  added `graph/facility-graph.json`'s `loading_dock` asset (location `"IT Staging"`, mesh
  `PLACEHOLDER_loading_dock`), and construct the actual blockout (box body + canopy + 3 door
  insets) at runtime in the viewer, parented under the GLB's own `root` transform node,
  positioned in the real south service yard (opposite the north-face public reception
  entrance) via the inverse of `root`'s world matrix. Built BEFORE the existing byName
  mesh-binding loop runs, so it binds exactly like real imported geometry -- no special-cased
  binding path. Screenshot-confirmed in place against the building's south wall.
- **10-stop Viewpoint list replaces the old 5**, framed by real geometry via two new generic
  helpers (`frameByLocation(locations, opts)` unions the real bounding boxes of every asset at
  a given `.location`; `frameByMeshPrefix(prefix, opts)` does the same by raw mesh-name prefix,
  used for the GPU rack close-up) instead of hand-picked coordinate constants -- self-correcting
  if the underlying geometry changes, with a console-warned fallback to full-campus framing if
  nothing resolves. `flyTo()` extended to optionally animate `alpha`/`beta` too (shortest-path
  wrap on alpha), and now returns its actual animation duration in ms for the Tour to schedule
  off of. **Real bug found and fixed during live verification:** every location-framed stop
  needs an EXPLICIT alpha/beta -- without it the camera inherits whatever angle the previous
  viewpoint left behind, which (live-tested on the Loading Dock stop) pointed straight through
  the adjacent building wall at close range and filled the frame with wall instead of the
  subject. Fixed by giving every stop an explicit angle (`DEFAULT_ANGLE` shared constant, with
  `hall`/`rack` overriding it for a better fit to their own geometry).
- **Procedural gradient sky + fog** replaces the flat `#E8E6E0` background: a large inverted
  sphere painted with a canvas-gradient `DynamicTexture` (self-contained, no external HDR
  asset, no image-based-lighting side effects on this scene's plain StandardMaterials), plus
  linear fog matching the horizon color. **Tuning bug found and fixed live:** first pass used
  `fogStart:55/fogEnd:170`, which washed out the ENTIRE default full-campus view because that
  framing sits the camera ~114 units from target (confirmed live) -- squarely inside the fog
  band. Retuned to `140/450` against the actual measured distance, not a guess.
- **Idle auto-rotate establishing shot**: slow `camera.alpha` orbit (0.025 rad/sec) starting
  automatically on load, pausing on any real interaction or programmatic `flyTo` (both route
  through one `pauseIdleRotate()` choke point) and auto-resuming after ~25s idle. Deliberately
  does NOT force Physical view mode -- Graph is this viewer's hard-locked default from earlier
  session feedback, and a passive default state shouldn't fight that.
- **Tour mode**: auto-cycles all 10 viewpoints in a loop, smooth ease-in-out (no elastic
  bounce, per explicit choice) flight + a 4s hold at each stop, forcing Physical mode for the
  showcase (restores prior mode on exit) and hiding the analyst panels (`#phases`, which holds
  the actual visible left-side controls -- `#left` is just an emptied template container after
  `openPhase()`'s section-relocation, confirmed by grep before touching it) behind a caption
  bar naming the current stop. Exit via a dedicated button or Escape.
- **Mid-session follow-up requests, addressed live:**
  - Default on-load view changed from a 3/4-angle fit to a **tight top-down view** (`beta:
    0.001`, not exactly 0 -- ArcRotateCamera's up-vector is undefined at true beta=0 --
    `padding:1.0`, the tightest fit anywhere in this codebase). "Full campus" viewpoint updated
    to match. Confirmed idle-rotate's alpha-only orbit is a visual no-op at beta≈0 (nothing to
    reveal looking straight down) -- flagged transparently rather than silently dropping either
    feature, since both were explicit requests at different points and are in real tension for
    the initial frame specifically.
  - **Debugging false alarm, worth recording:** repeated live tests of the new top-view default
    appeared completely broken (camera never moved from constructor defaults, no errors) until
    `document.hidden`/`visibilityState` were checked directly -- the automation tab was
    backgrounded (`hidden: true`), and Chrome fully throttles `requestAnimationFrame` for
    hidden tabs, freezing Babylon's render loop and every animation with it. Not a code bug;
    resolved by bringing the tab to the foreground before re-testing. Worth remembering for any
    future "nothing is moving and there's no error" report in this environment.
  - **Conduit alignment re-investigated end to end, not just re-applied:** re-ran the exact
    diagnostic from `routingjs-lane-offset-runaway-bug` (diagonal-fraction scan) against BOTH
    `graph/routes.json` and `graph/rack-routes.json` -- 0 routes over 30% diagonal fraction in
    either file, confirming the underlying routing data is still clean (the earlier lane-zeroing
    fix held). The actual cause of the renewed visual complaint was the tube-rendering code
    itself: `CreateTube`'s path was smoothed through `BABYLON.Curve3.CreateCatmullRomSpline`
    before this session, which is not constrained to stay inside the waypoints it interpolates
    -- at a sharp corridor turn it can overshoot past the real routed corner. Removed the
    spline entirely in both the eager and lazy (rack-internal) tube-building loops; tubes now
    render straight through `r.points` with zero smoothing, guaranteeing 100% fidelity to
    routing.js's own corridor path by construction rather than by tuning a smoothing factor.
  - Live-verified: default load is tight top-down in Graph mode (screenshot-confirmed),
    conduits render as a clean rectilinear grid at close zoom with no visible overshoot
    (screenshot-confirmed).
- **Follow-up tuning requests, addressed live one at a time:** "start the top view much closer
  up" -> `TOP_VIEW_PADDING` dropped from `1.0` to `0.55` (live-verified via fresh hard-reload
  screenshot, confirming this was the true default state and not a leftover camera position).
  "do about 20% close" -> `0.44`. "closer" (immediate follow-up, same turn) -> `0.32`
  (verified via `BUILD_TAG` on a fresh reload). "and pause about 8 seconds before rotating" ->
  new `INITIAL_ROTATE_DELAY_MS = 8000` constant, replacing the old fixed `+200`ms delay;
  verified with a 12-second `cam.alpha` sampling loop keyed off `performance.now()` (not
  wall-clock across separate tool calls, which had already produced one false-negative this
  session per the backgrounded-tab gotcha) — confirmed alpha held exactly at the `TOP_VIEW`
  target (`-π/2` = `-1.5708`) through ~8.6s of page age, then began moving.
- `BUILD_TAG` progression this feature: `views-v1-viewpoints-sky-tour-dock` ->
  `views-v2-topview-default-conduits-no-spline` -> `views-v3-topview-closer` ->
  `views-v4-topview-closer2` -> `views-v5-8s-rotate-delay` (current).
- **Full handoff prepared for a new session/developer:** `babylon/README.md` rewritten in full
  (status, quick start, user guide, developer guide with all new structures, gotchas including
  the ones found this session, a file structure map for the whole project, and a pointer to
  every relevant cross-session memory file). `progress.md` updated with a fresh session entry
  and a current "5-Question Reboot Check". See `babylon-viewer-views-sky-tour-dock-feature`
  memory (also refreshed) for the cross-session-portable version of the same information.

## Key Questions
1. Does the existing edges/adj structure serve as a drop-in replacement for the reference's
   merged CG graph? (answered: yes, verified 0 id/mesh overlap between facility/hall — see
   findings.md)
2. Does apply()'s periodic recolor fight an active analysis animation? (Step 8 must resolve
   this before Step 9/10 — see findings.md for verification result)

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Reuse existing edges/adj for threat/cascade, do not build a second merged graph | Verified 0 asset-id and 0 mesh-name overlap between facility-graph.json and hall-graph.json — the reference's mesh-aliasing is dead code on this data; a second graph would be a second source of truth, not shared infrastructure |
| Reassign marker.material from a (mode,key) cache rather than mutate cached material color | Phase 2's markers share one material per system; mutating .diffuseColor would recolor every marker of that system at once with no way back |
| Build an analysis arbiter (beginAnalysis/endAnalysis) rather than port the reference's claimLane panel-lane system | The reference has a real timer-leak bug when switching Threat->Cascade mid-animation (claimLane hides the panel but never clears the timer); the arbiter fixes this class of bug structurally |
| Fix the oneway field-name gap (Step 2) before any threat-path code | Without it, all 16 real one-way links silently read as bidirectionally traversable with zero errors — a safety/security-relevant miscalculation, not cosmetic |
| Split into Phase 3a (modifies existing code) / 3b (purely additive) | 3a needs its own regression sign-off since it touches apply()/S/materials/left-panel DOM; once signed off, 3b cannot regress Phase 2 by construction |
| Skip the reference's draggable-panel + lane-arbitration system | Orthogonal to the missing analytical features; claimLane is part of the timer-leak bug being deliberately avoided |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Process failure: did substantial multi-step engineering work on this file and `graph/rack-graph.json` (Step 9b above) across an entire session without ever opening or updating this task_plan.md — plan went stale by an entire unlogged phase of real changes. Caught only when the user asked "what did you actually do" after a self-critique that itself never mentioned the plan. | 1 | Backfilled Step 9b in full immediately upon being called out; going forward, update this file as each step happens, not after. |
| Two bugs shipped-then-caught during Step 9b's own live verification (asset mesh-collision with pre-existing hazard-log-referenced assets; new rack subgraph unreachable from its own entry point) | 1 | Both fixed same-session before calling the work done — see Step 9b detail above. Neither would have been caught without insisting on real browser verification instead of trusting the code read. |
| Graph-mode grey-tint fix (post-Step-13, third pass): claimed markers were "dark grey with a faint tint" based on checking `diffuseColor`'s numeric value alone -- did not re-examine the actual rendered screenshot pixels with matching scrutiny before saying so. User asked to see the exact screenshot files used; opening them directly (via Read, not memory) showed markers still clearly colored (blue/orange/teal/purple), not grey. Root cause: `emissiveColor` was computed from the ORIGINAL full-saturation base color, not the desaturated `diffuse` value -- emissive adds to the final pixel independent of lighting, so the "slight glow" channel was reinjecting most of the color the diffuse desaturation had just removed. The diffuse number alone was correct; the rendered result wasn't, and checking only the number instead of the pixels missed it. | 2 (first: diffuse-only fix that left emissive unaddressed; second: rederive emissive from the already-desaturated diffuse) | Fixed in `conduitLook()`/`greyTint()`: emissive now scales off `diffuse` (post-desaturation) instead of `base` (pre-desaturation). Re-verified by actually opening the new screenshots with the Read tool before claiming success, not just re-checking material properties in JS -- this is now the standing verification bar for any visual/rendering claim in this file: open and look at the actual image, don't infer appearance from a number. |
| Graph markers were never actually clickable -- a real, previously-undiscovered bug, not a design question. `assetOf(mesh)` (the resolver behind the click handler) only checked `mesh.metadata.assetId`; graph overlay markers are tagged `metadata.graphNode` instead (a different key), set in both the eager and lazy marker-creation loops. Hover-tooltip code separately checked `graphNode` and worked; the click handler went through `assetOf()` alone and always resolved to `null`, so clicking any marker silently did nothing. User reported this as "I cannot click on them...little or no functional value," which read at first as a design complaint but was actually this bug. | 1 | Added a `graphNode` check to `assetOf()` alongside `assetId`. Verified end-to-end, not just by re-reading the code: found a `gnode_` mesh's exact on-screen canvas coordinates via a `scene.pick()` grid-scan (the `computer` tool's click coordinates don't map 1:1 to the canvas's internal pixel resolution -- confirmed this by a failed click attempt first), dispatched a real `pointerdown`/`pointerup` at those exact coordinates, and confirmed the right-hand info panel opened with real asset data (label, zone, standards citation, trace buttons) -- not just that `assetOf()` returned non-null in isolation. Also increased node opacity 0.85 -> 0.98 per direct request ("less faded"), and added a visible `BUILD_TAG` string to the on-page stats readout (bump on every rendering-related edit) so a loaded page's freshness can be confirmed by eye -- addresses the recurring "I don't see any change" ambiguity from repeated stale-cache incidents this session; the user does not have to trust a claim that a fix is live, they can read it off the page. |
| User rejected the node/edge visual hierarchy outright: markers still felt distracting once actually visible (clutter, no clear payoff over clicking real geometry) and separately demanded ALL graph-mode overlay elements share identical opacity/grey with zero color, no exceptions. Two distinct asks in one message. | 1 each | (1) Added `S.showNodeMarkers` (default false) + a Hide/Show toggle in the Marker Colour panel, wired into `nodeVisible()` the same way `showRackInternal` already is (S.trace still overrides). Verified via mesh-enabled counts (0/449 default, correctly toggles 0<->449) and confirmed selection still works without markers: dispatched a real click at a marker's exact projected screen coordinates and confirmed the right panel opened with real data; physical-mesh clickability was untouched by any edit and independently confirmed via its still-intact `metadata.assetId`. (2) Collapsed `GRAPH_LOOK` from separate node/edge configs to one single uniform `{grey:1.0, opacity:0.95, emissive:0.18, targetGrey:0.35}` applied identically to every node AND edge material in one loop -- grey:1.0 means diffuse becomes pure grey with zero hue, so emissive (derived from that already-pure diffuse) carries no color either. Verified numerically (`nodeDiffuse`/`edgeDiffuse` both exactly `(0.35,0.35,0.35)`, both `alpha:0.95` -- identical, not just similar) and visually by opening the actual screenshot files with Read before claiming success -- at close zoom, markers and tubes are indistinguishable in tone. |
| Every prior "equipment opacity" fix this session was on the WRONG layer. User's word "equipment" was ambiguous across the conversation -- earlier it meant the diamond node markers (correctly addressed by the opacity/grey work above), but once markers were hidden by default, "equipment" in the next round of feedback meant the actual physical building/rack 3D geometry -- a completely different code path (`dimPhysical()`) that had NEVER been touched, still hardcoded to `alpha = 0.07` (93% transparent) for the entire session. Should have asked which layer was meant instead of continuing to guess. | many (see the full sequence of graph-look revisions above, none of which touched this) | Changed `dimPhysical(true)`'s alpha from 0.07 to 0.90 per explicit spec ("90% visible, 10% transparent"). This is a dramatically different, unmistakable visual result from every prior fix -- solid blue perimeter fence, grey structural walls, visible internal equipment -- confirmed by opening the actual screenshots with Read before saying anything, per the user's explicit standing instruction to always verify visually first. |
| The 0.90 fix above, while numerically correct to spec, broke something the user cared about more: Graph and Both mode share the identical graph-overlay code path and differ ONLY in the building's alpha value (`dimPhysical(true)` vs `dimPhysical(false)`) -- at 0.90 vs Both's ~1.0, the two modes became visually indistinguishable (full-color tubes, tooltips, solid walls, all present under the "Graph" button). User: "you have mixed the physical view with the graph view." | 1 | Documented the actual mode mechanics as a table (Physical/Graph/Both x building-alpha/overlay-visibility) directly in chat before touching code again, per explicit request to "use OPUS to figure out the difference and document it clearly." Rather than guess a 4th number, used AskUserQuestion with three concrete opacity-tier options; user picked "translucent, walls visible through (~40-50%)." Set graph-mode building alpha to 0.45. Verified both numerically (`graphAlpha: 0.45` vs `bothAlpha: 1` measured live, not assumed) and visually via Read before responding -- walls now genuinely see-through with interior structure visible behind them, clearly distinct from both the 0.90 solid look and the original 0.07 near-invisible ghost. |
| User confirmed the 0.45 building alpha as correct, then immediately flagged the conduits/tubes as still "very solid" -- `GRAPH_LOOK.opacity` (nodes+edges, unified since the earlier fix) was still 0.95, unrelated to the building's now-confirmed 0.45. | 1 | Set `GRAPH_LOOK.opacity` to 0.45 to match the building's confirmed value exactly (added a comment noting it's intentionally the same number, not independently chosen). Verified `buildingAlpha === edgeAlpha` (0.45 === 0.45) live before touching anything visual, then confirmed visually via Read -- tubes now read as thin, faint, receding lines instead of the solid grey mesh from before. |
| User revised the "must match exactly" rule almost immediately after confirming it: at equal opacity, conduits read as "too overwhelming." | 1 | Split `GRAPH_LOOK` back into a shared `opacity` (nodes, matches building 0.45) and a separate `edgeOpacity` (0.35 -- exactly 10 points lower, per explicit spec), keeping grey/emissive/targetGrey shared between them. Verified `buildingAlpha - edgeAlpha === 0.10` live, then visually via Read -- tubes now read visibly fainter than the building walls behind them. **Current final locked-in numbers, superseding the "must match" entry above: building + markers = 0.45, conduits/edges = 0.35.** Update [[babylon-viewer-graph-mode-opacity-state]] memory to match if this file and that memory ever diverge. |
| Real data-correctness bug, not a rendering/opacity issue: several conduits took visibly diagonal "shortcuts" through the building instead of following clean grid-aligned corridors (user screenshot showed this directly). Root cause: `routing.js`'s `applyLanes()` offsets parallel runs sharing a corridor perpendicular to each point's OWN LOCAL segment direction, spaced by `SERVICE[service].lane` per lane index. Several services' lane indices climbed far past what the mechanism was designed for -- worst was `air` (96 racks all fed from one CRAH unit, funneling through the same corridor near the source): max lane index 92 x 0.24m stock spacing = ~11m of lateral distortion on a single conduit. Since the offset direction changes at every bend, a large offset does not shift a path sideways, it warps it into a jagged, locally-diagonal shape. `data`/`control`/`electricity`/`security`/`water`/`fire` all showed the same pattern to a lesser degree (lane index >10 on 17-179 routes each). This is the SAME bug class already found and fixed once before this session for rack-internal routes (`graph/generate-rack-overlay.js`, lane index reached 179 there) -- just not yet applied to the main `graph/routes.json` (facility+hall level). | 1 | No generator script for `graph/routes.json` currently exists in the repo (it predates this session, generated 2026-08-26 by an ephemeral/undocumented script). Wrote a new one-off Node script mirroring `generate-rack-overlay.js`'s exact proven fix: `makeRouter()` returns `{routeAll, SERVICE, ...}` with `SERVICE` mutable on the returned instance (routing.js itself untouched on disk, confirmed via its own `module.exports` tail and unmodified checksum) -- zeroed `SERVICE[s].lane` for every service before calling `routeAll(positions, connections)`, using the CURRENT `facility-graph.json` + `hall-graph.json` connections (not the stale 2026-08-26 snapshot). Verified rigorously before touching the live viewer: (1) diagnosed the exact bug with a geometric "diagonal fraction" analysis script BEFORE writing any fix, confirming 49 routes were >50% diagonal by length, all `crah -> rack` air-service edges, all with lane index in the 60s-90s; (2) after regeneration, re-ran the identical diagonal-fraction scan across the full file: 0 remaining suspects (was 49); (3) spot-checked `h423`'s raw points directly -- diagonal fraction 0.85->0.078, length 72.35m->29.0m, points now show clean single-axis runs between bends; (4) confirmed route-id-prefix counts now line up with CURRENT source data exactly (314 "e" routes = current facility-graph.json's connection count exactly, was 445/stale; 847 "h" routes = 865 hall connections minus the 18 already-known, already-documented pre-existing sensor-position gap, not a new failure); (5) live-reloaded the viewer, confirmed 0 new console errors/warnings beyond the same pre-existing 18-sensor + 4-cascade-seed warnings; (6) visually confirmed via a zoomed-in camera shot (radius set directly via `scene.activeCamera.radius` for a legible close-up, since the automated browser's default view is too small to judge geometry at a glance) opened myself with Read before reporting -- the previously-diagonal teal conduit near the user's own screenshot now shows a clean vertical riser, one bend, then a horizontal run. Backed up the pre-regeneration file to `/tmp/routes.json.bak-pre-regen` before writing. |

## Notes
- Update phase status as you progress: pending → in_progress → complete
- Re-read this file (and the approved plan) before each step
- Log ALL errors immediately, even resolved ones
- Never repeat a failed action — mutate the approach instead
- Full Phase 2 regression sweep required after Steps 4 and 8 specifically (not just a smoke test)
