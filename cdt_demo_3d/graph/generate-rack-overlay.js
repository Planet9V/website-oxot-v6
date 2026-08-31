#!/usr/bin/env node
/**
 * generate-rack-overlay.js — offline overlay generator for the rack-internal graph.
 *
 * WHY THIS EXISTS
 * ---------------
 * graph/positions.json (449 entries) and graph/routes.json (1,310 routes) only
 * cover facility- and hall-level assets. babylon/hyperscale-campus-explorer.html
 * expands graph/rack-graph.json's 10-component template across the 96 racks in
 * graph/hall-graph.json AT RUNTIME, minting 3,929 new assets and 12,672 new
 * connections that exist only in browser memory. Nothing populates positions or
 * routes for them, so they are invisible in graph-mode / overlay view even
 * though threatWalk()'s text report already traverses them correctly.
 *
 * This script re-implements that runtime expansion offline (no Babylon), joins
 * it to two prepared position sources, solves every rack-internal edge with the
 * existing graph/routing.js solver, and writes graph/rack-positions.json and
 * graph/rack-routes.json.
 *
 * IT DOES NOT MODIFY routing.js, positions.json, routes.json, or the viewer.
 * Wiring the outputs into the viewer is a separate, later task.
 *
 * THE ID-FIDELITY PROBLEM (the highest-risk part)
 * -----------------------------------------------
 * If the asset/edge ids generated here differ by even one character from what
 * the live viewer generates, the output files reference ids that do not exist
 * at runtime and are silently useless. So expandRacks() below is a line-by-line
 * mirror of the viewer's expansion block, including three behaviours that a
 * "clean" reimplementation would get wrong:
 *
 *   1. localId = `${inst.id}_${comp.id}` + (suffixes.length > 1 ? '_' + idx : '')
 *      — the index is appended based on how many suffixes the {a..b} range
 *      produced, NOT on whether the mesh_suffix already carries an index.
 *      storage_node's mesh_suffix is the literal "_storage_node_0" (no range),
 *      so suffixes.length === 1 and the asset id is `..._storage_node`, while
 *      its MESH is `..._storage_node_0`. Same for mgmt_tray. This is the
 *      naming inconsistency the two input files disagree about; the viewer's
 *      behaviour is authoritative and is reproduced verbatim here.
 *   2. External-interface tokens are resolved by SCANNING this rack's own edges
 *      in the facility+hall edge list, never by a naming formula — row01_rack01's
 *      rPDU is row01_rpdu_1 while row01_rack02's is row01_rpdu_0.
 *   3. A mesh already claimed by a hand-authored facility/hall asset yields that
 *      asset's id instead of a freshly minted one (7 such meshes exist, all on
 *      row01_rack01: rack1_psu, rack1_busbar, rack1_compute, rack1_storage,
 *      rack1_mgmt, row1_tor, row1_tor_b). Those 7 already have positions.json
 *      entries and are therefore NOT re-emitted here.
 *
 * Both totals are asserted against the session's live-verified numbers
 * (3,929 assets / 12,672 edges) before any output is written.
 *
 * ONE TUNING DECISION (see LANE_SPACING below)
 * ---------------------------------------------
 * routing.js spreads parallel runs sharing a corridor into side-by-side lanes.
 * That model assumes a handful of trunk runs per corridor — true for routes.json
 * (1,310 routes, busiest corridor ~30 runs). The rack expansion puts 360 runs in
 * a single corridor, and lane index 179 x 0.14 m = 12.6 m of lateral offset,
 * which throws polylines out to x = 19.7 (the building wall is at 13.4). Lanes
 * are therefore collapsed to the corridor centreline for this pass. routing.js
 * itself is untouched — only the SERVICE table of THIS script's own router
 * instance is adjusted, before routeAll() runs. Pass --lanes to restore the
 * stock spacing and reproduce the artifact.
 *
 * Usage:  node graph/generate-rack-overlay.js          # generate + self-check
 *         node graph/generate-rack-overlay.js --check  # self-check only, no write
 *         node graph/generate-rack-overlay.js --lanes  # keep routing.js's stock lane spacing
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { makeRouter } = require('./routing.js');

const GRAPH_DIR = __dirname;
const PROJECT_DIR = path.resolve(GRAPH_DIR, '..');
const RESEARCH_DIR = path.resolve(
  PROJECT_DIR, '..', '..',
  'facility_reseearch', 'Rack_Envelope_Threat_Workstream', 'research'
);

const GENERATED_DATE = '2026-08-30';

// Live-verified totals for the runtime expansion. Treat any mismatch as a bug
// in this script, not as a discrepancy to note and move past.
const EXPECT_ASSETS = 3929;
const EXPECT_EDGES = 12672;

const readJSON = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const r4 = v => Math.round(v * 1e4) / 1e4;

// ---------------------------------------------------------------------------
// inputs
// ---------------------------------------------------------------------------
const facility = readJSON(path.join(GRAPH_DIR, 'facility-graph.json'));
const hall = readJSON(path.join(GRAPH_DIR, 'hall-graph.json'));
const rack = readJSON(path.join(GRAPH_DIR, 'rack-graph.json'));
const positionsFile = readJSON(path.join(GRAPH_DIR, 'positions.json'));
const harvestedFile = readJSON(path.join(RESEARCH_DIR, '13-tier2-harvested-positions.json'));
const offsetsFile = readJSON(path.join(RESEARCH_DIR, '12-tier3-synthetic-offsets.json'));

const basePositions = positionsFile.positions;
const harvested = harvestedFile.positions;
const offsets = offsetsFile.offsets;

// ---------------------------------------------------------------------------
// Stage 1 — offline mirror of the viewer's runtime rack expansion
// ---------------------------------------------------------------------------
// Mirrors babylon/hyperscale-campus-explorer.html, the block headed
// "rack-graph.json: per-rack template expansion". Structure and variable names
// are kept close to the original so the two can be diffed by eye.
const REPRESENTATIVE_ONLY = new Set(['r13', 'r14', 'r15', 'r16', 'r19', 'r22', 'r23']);

function expandRacks() {
  // --- viewer step: build `assets` from facility + hall, first definition wins
  const assets = new Map();
  for (const a of [...facility.assets, ...hall.assets]) {
    if (assets.has(a.id)) continue;
    assets.set(a.id, a);
  }

  // The viewer binds assets to GLB nodes and stores node.metadata.assetId, then
  // later asks "is this component mesh already claimed?". Offline there is no
  // scene, so the equivalent lookup is a mesh-name -> asset-id index built from
  // the same asset list. A claim only counts if the mesh actually exists in the
  // GLB (otherwise the viewer's byName.get() misses and it mints a fresh id);
  // 13-tier2-harvested-positions.json is the record of which rack-component
  // meshes really exist, and all 7 claims below are cross-checked against the
  // expected asset total at the end of this function.
  const assetIdByMesh = new Map();
  for (const a of assets.values()) if (a.mesh) assetIdByMesh.set(a.mesh, a.id);

  // --- viewer step: build `edges` from facility + hall, skipping unresolved ends
  const edges = [];
  for (const c of [...facility.connections, ...hall.connections]) {
    if (!assets.has(c.from) || !assets.has(c.to)) continue;
    edges.push({ ...c, critical: c.critical_conduit, oneway: c.one_way, cross: c.zone_crossing, label: c.description });
  }
  const preRackEdgeCount = edges.length;

  // --- viewer step: expansion proper
  const rackComponentIds = [];      // newly minted component asset ids, in mint order
  const componentMeta = new Map();  // mintedId -> { rackId, compId, mesh, offsetKey }
  const rackEdges = [];             // edges minted by the expansion (the 12,672)
  let expandedAssets = 0, expandedEdges = 0, skipped = 0;
  const deferredToExisting = [];    // meshes already claimed by a hand-authored asset

  const rackInstances = hall.assets.filter(a => a.template === 'rack_gpu_48u');
  for (const inst of rackInstances) {
    const ownEdges = edges.filter(e => e.from === inst.id || e.to === inst.id);
    const findExternal = matchFn => {
      const hit = ownEdges.find(matchFn);
      return hit ? (hit.from === inst.id ? hit.to : hit.from) : null;
    };
    const externalMap = {
      _external_power_in:        findExternal(e => e.service === 'electricity'),
      _external_chw_supply:      findExternal(e => e.service === 'water' && e.to === inst.id),
      _external_chw_return:      findExternal(e => e.service === 'water' && e.from === inst.id),
      _external_fabric_uplink:   findExternal(e => e.service === 'data' && (/_eor_sw/.test(e.from) || /_eor_sw/.test(e.to))),
      _external_oob_uplink:      findExternal(e => e.service === 'data' && e.protocol === 'RS-232 console'),
      _external_scaleout_uplink: assets.has('scaleout_spine_sw') ? 'scaleout_spine_sw' : null,
      _external_leak_detection:  null,
    };

    const instanceIdByCompId = new Map();
    for (const comp of rack.components) {
      const range = comp.mesh_suffix.match(/\{(\d+)\.\.(\d+)\}/);
      const suffixes = range
        ? Array.from({ length: +range[2] - +range[1] + 1 }, (_, i) => comp.mesh_suffix.replace(/\{\d+\.\.\d+\}/, String(+range[1] + i)))
        : [comp.mesh_suffix];
      const ids = [];
      suffixes.forEach((suffix, idx) => {
        const meshName = `${inst.mesh}${suffix}`;
        const claimedBy = assetIdByMesh.get(meshName);
        if (claimedBy && assets.has(claimedBy)) {
          // defer to the hand-authored asset; the viewer does not mint here
          ids.push(claimedBy);
          deferredToExisting.push({ rackId: inst.id, mesh: meshName, assetId: claimedBy });
          return;
        }
        // NOTE: index suffix is driven by suffixes.length, not by whether the
        // mesh_suffix itself already contains an index. See header comment (1).
        const localId = `${inst.id}_${comp.id}${suffixes.length > 1 ? '_' + idx : ''}`;
        assets.set(localId, {
          id: localId, label: `${comp.label} (${inst.id}${suffixes.length > 1 ? ' #' + idx : ''})`,
          kind: comp.kind, system: comp.system, location: inst.location, mesh: meshName,
          zone: comp.zone, purdue: comp.purdue, sl_target: comp.sl_target, standards: comp.standards,
          template: `rack_component:${comp.id}`, attributes: comp.attributes, attack_surface: comp.attack_surface,
          cell: inst.cell,
        });
        rackComponentIds.push(localId);
        componentMeta.set(localId, {
          rackId: inst.id, compId: comp.id, mesh: meshName,
          // offset-table key == rack-graph.json mesh_suffix minus its leading
          // underscore; this is the join that reconciles storage_node ->
          // storage_node_0 and mgmt_tray -> mgmt_tray_0.
          offsetKey: suffix.replace(/^_/, ''),
        });
        expandedAssets++;
        ids.push(localId);
      });
      instanceIdByCompId.set(comp.id, ids);
    }

    const resolveSingle = ref => ref.startsWith('_external_') ? externalMap[ref] : (instanceIdByCompId.get(ref) || [])[0];

    for (const c of rack.connections) {
      const fromMulti = !c.from.startsWith('_external_') && instanceIdByCompId.get(c.from)?.length > 1;
      const toMulti = !c.to.startsWith('_external_') && instanceIdByCompId.get(c.to)?.length > 1;
      const representative = REPRESENTATIVE_ONLY.has(c.id);
      const fromIds = fromMulti && !representative ? instanceIdByCompId.get(c.from) : [resolveSingle(c.from)];
      const toIds = toMulti && !representative ? instanceIdByCompId.get(c.to) : [resolveSingle(c.to)];
      // Mirrors the live-viewer fix applied 2026-08-30 (WS2.4): fan-out combos
      // previously all shared one id per rack per template edge, which broke
      // every Map keyed by plain edge id (edgesById/edgeTubes/routesById) --
      // only the last of N duplicates was ever reachable. Root-caused here to
      // match the browser exactly, not patched with a composite key.
      const totalCombos = fromIds.length * toIds.length;
      let comboIdx = 0;
      for (const f of fromIds) for (const t of toIds) {
        if (!f || !t || !assets.has(f) || !assets.has(t)) { skipped++; continue; }
        const e = {
          id: totalCombos > 1 ? `${inst.id}_${c.id}_${comboIdx}` : `${inst.id}_${c.id}`,
          from: f, to: t, service: c.service, protocol: c.protocol,
          description: representative ? `${c.description} (representative edge — see rack-graph.json ${c.id} for the full component-class relationship)` : c.description,
          critical: c.critical_conduit, oneway: c.one_way, cross: false, label: c.description, note: c.note, count: c.count,
          _rackId: inst.id, _templateEdge: c.id,
        };
        comboIdx++;
        edges.push(e); rackEdges.push(e); expandedEdges++;
      }
    }

    const mgmtIds = instanceIdByCompId.get('mgmt_tray');
    if (mgmtIds && mgmtIds.length === 1 && assets.has(mgmtIds[0])) {
      const e = {
        id: `${inst.id}_bridge_mgmt`, from: inst.id, to: mgmtIds[0], service: 'data',
        protocol: 'IPMI 2.0 (RMCP+) / Redfish HTTPS',
        description: `${inst.id}'s hall-level BMC identity (h713-equivalent) is backed by its own mgmt_tray internally`,
        critical: true, oneway: false, cross: false,
        label: 'rack BMC identity -> internal mgmt_tray',
        note: 'Added so the rack-internal subgraph is reachable from the hall-level rack node a threat walk actually starts from.',
        count: null, _rackId: inst.id, _templateEdge: 'bridge_mgmt',
      };
      edges.push(e); rackEdges.push(e); expandedEdges++;
    }
  }

  return {
    assets, edges, preRackEdgeCount, rackInstances,
    rackComponentIds, componentMeta, rackEdges,
    expandedAssets, expandedEdges, skipped, deferredToExisting,
  };
}

const X = expandRacks();

// --- hard gate: id fidelity ------------------------------------------------
const fidelity = [];
if (X.rackInstances.length !== 96) fidelity.push(`rack instances ${X.rackInstances.length} != 96`);
if (X.expandedAssets !== EXPECT_ASSETS) fidelity.push(`expanded assets ${X.expandedAssets} != ${EXPECT_ASSETS}`);
if (X.expandedEdges !== EXPECT_EDGES) fidelity.push(`expanded edges ${X.expandedEdges} != ${EXPECT_EDGES}`);
if (fidelity.length) {
  console.error('[generate-rack-overlay] EXPANSION MISMATCH — refusing to write output.');
  for (const f of fidelity) console.error('  ' + f);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Stage 2 — resolve a position for every minted rack-internal asset
// ---------------------------------------------------------------------------
// Priority, per 12-tier3-synthetic-offsets.json meta.tier3_mesh_reality:
//   1. 13-tier2-harvested-positions.json (a real mesh was measured in the GLB)
//   2. rack anchor from positions.json + the analytic offset table
// Preferring (1) wherever it exists means frame/busbar/manifold_supply/
// manifold_return come out 'measured' on ALL 96 racks, not just rows 01-02 —
// those four have real meshes on every rack. The two sources agree to 0.0005 m
// where they overlap, so this is a provenance choice, not a numeric one.
const rackPositions = {};
const unresolvedAssets = [];
let nMeasured = 0, nSynthetic = 0;
const measuredByComp = {}, syntheticByComp = {};

for (const id of X.rackComponentIds) {
  const m = X.componentMeta.get(id);
  const hit = harvested[id];
  if (hit) {
    rackPositions[id] = { x: r4(hit.x), y: r4(hit.y), z: r4(hit.z), positionSource: 'measured' };
    nMeasured++;
    measuredByComp[m.compId] = (measuredByComp[m.compId] || 0) + 1;
    continue;
  }
  const anchor = basePositions[m.rackId];
  const off = offsets[m.offsetKey];
  if (anchor && off) {
    rackPositions[id] = {
      x: r4(anchor.x + off.dx), y: r4(anchor.y + off.dy), z: r4(anchor.z + off.dz),
      positionSource: 'synthetic',
    };
    nSynthetic++;
    syntheticByComp[m.compId] = (syntheticByComp[m.compId] || 0) + 1;
    continue;
  }
  // Never guess. An asset with no harvested mesh AND no derivable offset is
  // reported, not invented.
  unresolvedAssets.push({
    id, rack: m.rackId, component: m.compId, offsetKey: m.offsetKey,
    reason: !anchor ? 'no rack anchor in positions.json' : 'no entry in the offset table',
  });
}

// ---------------------------------------------------------------------------
// Stage 3 — solve routes with graph/routing.js (unmodified)
// ---------------------------------------------------------------------------
// Same invocation pattern routes.json records ("Solved by graph/routing.js from
// positions.json"): one makeRouter(), one routeAll(positions, connections).
// The position table handed to the router is positions.json's 449 entries plus
// the 3,929 resolved above — rack-internal edges terminate on both.
const solverPositions = {};
for (const [k, v] of Object.entries(basePositions)) solverPositions[k] = { x: v.x, y: v.y, z: v.z };
for (const [k, v] of Object.entries(rackPositions)) solverPositions[k] = { x: v.x, y: v.y, z: v.z };

// Route ids are NOT unique in the rack subgraph: the viewer gives every fan-out
// edge of one template connection the same id (all 18 busbar -> compute_tray
// drops in a rack are `<rack>_r2`), because it mints ids as `${inst.id}_${c.id}`.
// id + from + to IS unique, and is emitted as `route_key` so a consumer can build
// a lookup that does not collapse the fan-out the way an id-keyed Map would.
const routerConnections = X.rackEdges.map(e => ({
  id: e.id, from: e.from, to: e.to, service: e.service, protocol: e.protocol,
}));

const router = makeRouter();

// --- lane spreading: collapsed to the corridor centreline for this pass -----
// routing.js offsets parallel runs in a shared corridor by SERVICE[s].lane
// metres each, so they sit side by side instead of coincident. That is right
// for routes.json's scale (busiest corridor ~30 runs). Here 360 electricity
// runs share corridor X7.34@3.99; the highest lane index is 179, and
// ceil(179/2) x 0.14 = 12.60 m of lateral offset pushes polylines out to
// x = 19.69 / x = -14.55, i.e. through and beyond the building wall at 13.4.
// The lane model's premise (a few parallel runs) does not hold at this
// occupancy, so runs are drawn on the corridor centreline instead — the same
// simplification routing.js already applies to every local drop.
//
// This mutates only the SERVICE table belonging to THIS router instance
// (`const SERVICE = {...}` is declared inside makeRouter, so each call gets a
// fresh copy). graph/routing.js on disk is not modified, and routes.json is
// unaffected. --lanes restores the stock spacing for comparison.
const KEEP_STOCK_LANES = process.argv.includes('--lanes');
const stockLaneSpacing = Object.fromEntries(
  Object.entries(router.SERVICE).map(([s, p]) => [s, p.lane])
);
if (!KEEP_STOCK_LANES) for (const p of Object.values(router.SERVICE)) p.lane = 0;

const solved = router.routeAll(solverPositions, routerConnections);

// routeAll re-orders (longest first) and drops failures, so re-attach the
// per-route provenance by matching on the unique triple.
const keyOf = r => `${r.id}|${r.from}|${r.to}`;
const edgeByKey = new Map(X.rackEdges.map(e => [keyOf(e), e]));

const rackRoutes = solved.routes.map(r => {
  const e = edgeByKey.get(keyOf(r));
  return {
    route_key: keyOf(r),
    id: r.id, from: r.from, to: r.to, service: r.service, protocol: r.protocol,
    rack: e ? e._rackId : null, template_edge: e ? e._templateEdge : null,
    mode: r.mode, containment: r.containment, altitude: r.altitude, lane: r.lane,
    bend_radius: r.bend_radius, length_m: r.length_m, corridors: r.corridors,
    points: r.points,
  };
});

// annotate every failure with why, so meta can list them honestly
const unresolvedRoutes = solved.failures.map(f => {
  const missing = [];
  if (!solverPositions[f.from]) missing.push(f.from);
  if (!solverPositions[f.to]) missing.push(f.to);
  return { id: f.id, from: f.from, to: f.to, reason: f.reason, missing_positions: missing };
});

// ---------------------------------------------------------------------------
// Stage 4 — roll-ups for the meta blocks
// ---------------------------------------------------------------------------
const byService = {};
for (const r of rackRoutes) {
  const s = (byService[r.service] ||= { runs: 0, length_m: 0 });
  s.runs++; s.length_m += r.length_m;
}
for (const s of Object.values(byService)) s.length_m = Math.round(s.length_m * 10) / 10;

const totalLength = Math.round(rackRoutes.reduce((a, r) => a + r.length_m, 0) * 10) / 10;
const localDrops = rackRoutes.filter(r => r.mode === 'local drop').length;
const corridorRuns = rackRoutes.length - localDrops;

const missingPositionIds = [...new Set(unresolvedRoutes.flatMap(f => f.missing_positions))];
const failureReasons = {};
for (const f of unresolvedRoutes) failureReasons[f.reason] = (failureReasons[f.reason] || 0) + 1;

// ---------------------------------------------------------------------------
// Stage 5 — write output
// ---------------------------------------------------------------------------
const SOURCES = {
  expansion_mirrored_from: 'babylon/hyperscale-campus-explorer.html — the "rack-graph.json: per-rack template expansion" block',
  template: 'graph/rack-graph.json (10 components, 41 instances per rack; 24 template connections)',
  instances: 'graph/hall-graph.json (96 assets where template === "rack_gpu_48u")',
  anchors_and_external_endpoints: 'graph/positions.json',
  measured_positions: 'facility_reseearch/Rack_Envelope_Threat_Workstream/research/13-tier2-harvested-positions.json (1,561 entries harvested live from the loaded GLB)',
  synthetic_offsets: 'facility_reseearch/Rack_Envelope_Threat_Workstream/research/12-tier3-synthetic-offsets.json (41-entry offset table derived analytically from campus-model.js rackLOD()/rackLite())',
  solver: 'graph/routing.js (used unmodified)',
};

const NAMING_RECONCILIATION =
  'The two position sources key rack components differently. 13-tier2-harvested-positions.json keys by the ASSET ID the browser mints, ' +
  'which omits a numeric index whenever the template produced a single instance — so storage_node and mgmt_tray appear WITHOUT a trailing _0. ' +
  '12-tier3-synthetic-offsets.json keys by rack-graph.json\'s own mesh_suffix, which for those two components already contains a literal index — ' +
  'so the same components appear as storage_node_0 and mgmt_tray_0. The viewer\'s id-generation logic causes this: ' +
  'localId = inst.id + "_" + comp.id + (suffixes.length > 1 ? "_" + idx : ""), where suffixes.length counts what the {a..b} range expanded to, ' +
  'not whether mesh_suffix already carried an index. This generator reproduces the viewer\'s ids verbatim (row01_rack02_storage_node, ' +
  'row01_rack02_mgmt_tray) and joins to the offset table through the mesh suffix (mesh_suffix minus its leading underscore) rather than through the ' +
  'asset id — so the offset lookup finds storage_node_0 / mgmt_tray_0 while the emitted key stays storage_node / mgmt_tray. The inconsistency is ' +
  'deliberately NOT "fixed" here: emitting corrected ids would produce keys that no runtime asset has.';

const positionsOut = {
  meta: {
    units: 'metres',
    frame: 'GLB world space of hyperscale_campus.glb (Y up) — same raw pre-root-transform space as graph/positions.json',
    note: 'Overlay marker positions for the rack-internal assets that babylon/hyperscale-campus-explorer.html mints at runtime from graph/rack-graph.json. ' +
          'Companion to graph/positions.json, not a replacement — merge the two (this file second) to get every marker. Each entry carries positionSource: ' +
          '"measured" (bounding-box centre of a real GLB mesh, from the tier-2 harvest) or "synthetic" (rack anchor from positions.json plus the analytic ' +
          'per-component offset). No position in this file is guessed.',
    generated: GENERATED_DATE,
    count: Object.keys(rackPositions).length,
    scale: 'rack (rack-internal components)',
    racks_covered: X.rackInstances.length,
    components_per_rack: 41,
    breakdown: {
      component_instances_across_96_racks: X.rackInstances.length * 41,
      emitted_here: Object.keys(rackPositions).length,
      measured: nMeasured,
      synthetic: nSynthetic,
      unresolved: unresolvedAssets.length,
      already_in_positions_json: X.deferredToExisting.length,
      already_in_positions_json_note:
        'Seven component meshes on row01_rack01 were hand-authored into facility-graph.json before the rack template existed ' +
        '(rack1_psu, rack1_busbar, rack1_compute, rack1_storage, rack1_mgmt, row1_tor, row1_tor_b). The viewer defers to those existing ' +
        'assets instead of minting duplicates, and they already have graph/positions.json entries, so they are deliberately not re-emitted here. ' +
        '96 x 41 = 3,936 component instances minus these 7 = the 3,929 assets this file covers.',
      measured_by_component: measuredByComp,
      synthetic_by_component: syntheticByComp,
      measured_source_detail:
        'All 1,561 tier-2 harvest entries are used. That is every component of the 32 tray-level racks in rows 01-02 (minus the 7 deferred above), ' +
        'plus frame/busbar/manifold_supply/manifold_return on each of the 64 zone-band-LOD racks in rows 03-06 — those four have real meshes on ' +
        'every rack (12-tier3-synthetic-offsets.json meta.tier3_mesh_reality). The offset table reproduces those four to 0.00000 m, so preferring ' +
        'the measured value changes no coordinate; it only keeps the provenance label honest.',
      synthetic_source_detail:
        'The remaining 2,368 = 64 racks x the 37 genuinely-synthetic tray-type components (power_shelf 0-5, compute_tray 0-17, nvswitch_tray 0-8, ' +
        'storage_node, mgmt_tray, tor_switch 0-1), which have no mesh of their own on a zone-band-LOD rack.',
    },
    naming_reconciliation: NAMING_RECONCILIATION,
    unresolved: unresolvedAssets,
    sources: SOURCES,
    generator: 'graph/generate-rack-overlay.js',
  },
  positions: rackPositions,
};

const routesOut = {
  meta: {
    generated: GENERATED_DATE,
    routes: rackRoutes.length,
    total_length_m: totalLength,
    failures: unresolvedRoutes.length,
    by_service: byService,
    local_drops: localDrops,
    corridor_runs: corridorRuns,
    scale: 'rack (rack-internal connections)',
    racks_covered: X.rackInstances.length,
    note: 'Solved by graph/routing.js from graph/positions.json + graph/rack-positions.json, for the rack-internal connections that ' +
          'babylon/hyperscale-campus-explorer.html mints at runtime from graph/rack-graph.json. Companion to graph/routes.json, not a replacement. ' +
          'Solved in its own routeAll() pass, so corridor lane indices in this file are numbered independently of routes.json\'s — ' +
          localDrops + ' of ' + rackRoutes.length + ' rack routes are local drops, which never enter the corridor lattice at all.',
    lane_model: KEEP_STOCK_LANES
      ? 'routing.js\'s stock lane spacing was kept (--lanes). NOTE: at this occupancy that produces up to 12.6 m of lateral offset and pushes ' +
        'corridor runs outside the building envelope. Only use this output for comparison.'
      : 'Lane spreading is collapsed to the corridor centreline for this pass (every corridor run has lane index 0 applied at 0 m spacing). ' +
        'routing.js normally offsets parallel runs in a shared corridor by ' + JSON.stringify(stockLaneSpacing) + ' m each so they sit side by side, ' +
        'which is correct at routes.json\'s scale (busiest corridor ~30 runs). The rack expansion puts 360 runs in corridor X7.34@3.99 alone; the ' +
        'stock model reached lane index 179 = 12.60 m of lateral offset and threw polylines out to x = 19.69 and x = -14.55, beyond the building ' +
        'wall at x = 13.4. The lane model\'s premise (a few parallel runs) does not hold at this occupancy, so runs follow the corridor centreline — ' +
        'the same simplification routing.js already applies to every local drop. graph/routing.js is NOT modified; only this script\'s own router ' +
        'instance\'s SERVICE table is adjusted before routeAll(). Re-run with --lanes to reproduce the stock behaviour.',
    external_edges_note:
      'All ' + corridorRuns + ' corridor runs come from the only five template connections that actually leave the rack — r0 (busway tap to power ' +
      'shelf), r7/r12 (CDU/TCS header), r16 (ToR to end-of-row switch) and r19 (mgmt tray to row console server). Every genuinely rack-internal ' +
      'edge is a sub-2 m local drop. The physical corridor portion of those five is already drawn at hall level in routes.json (e.g. h52, ' +
      'row01_rpdu_1 -> row01_rack07, 13.95 m); the rack-level versions of the same run solve to comparable lengths, which is the cross-check that ' +
      'the corridor geometry here is sane.',
    id_uniqueness: 'Route ids are NOT unique in this file, unlike routes.json. The viewer gives every fan-out edge of one template connection the same ' +
                   'id (all 18 busbar -> compute_tray drops in a rack are `<rack>_r2`), because it mints ids as `${inst.id}_${c.id}`. `route_key` ' +
                   '(id|from|to) IS unique and is the field to key a lookup on — routes.json\'s `new Map(routes.map(r => [r.id, r]))` pattern would ' +
                   'silently keep only the last route of each fan-out.',
    expansion_verified: {
      rack_instances: X.rackInstances.length,
      component_assets: X.expandedAssets,
      connections: X.expandedEdges,
      skipped_unresolved_external_endpoint: X.skipped,
      skipped_note: 'One skip per rack for r21 (_external_leak_detection): the leak rope is a row asset, not a per-rack one, and hall-graph.json ' +
                    'has no per-rack asset to resolve it to. The viewer skips it identically.',
      matches_live_browser_totals: X.expandedAssets === EXPECT_ASSETS && X.expandedEdges === EXPECT_EDGES,
    },
    unresolved: {
      count: unresolvedRoutes.length,
      by_reason: failureReasons,
      missing_position_ids: missingPositionIds,
      detail: missingPositionIds.length
        ? 'These endpoint ids have no entry in positions.json or rack-positions.json, so no polyline could be solved for edges touching them. ' +
          'Nothing was fabricated to fill the gap. `scaleout_spine_sw` is the expected case: it was added to facility-graph.json on 2026-08-30 with ' +
          'mesh: null and has no position of its own yet, which strands every rack\'s r22 scale-out edge. Giving it a position is a facility-level ' +
          'task, not a rack-internal one, so it is reported here rather than guessed.'
        : 'None.',
      routes: unresolvedRoutes,
    },
    naming_reconciliation: NAMING_RECONCILIATION,
    sources: SOURCES,
    generator: 'graph/generate-rack-overlay.js',
  },
  corridor_occupancy: solved.occupancy,
  routes: rackRoutes,
};

const CHECK_ONLY = process.argv.includes('--check');
const posPath = path.join(GRAPH_DIR, 'rack-positions.json');
const routePath = path.join(GRAPH_DIR, 'rack-routes.json');
if (!CHECK_ONLY) {
  // Match each companion file's own on-disk convention: positions.json is
  // pretty-printed with 2-space indent, routes.json is minified to one line
  // (pretty-printing 12,576 polylines costs ~13 MB of whitespace).
  fs.writeFileSync(posPath, JSON.stringify(positionsOut, null, 2) + '\n');
  fs.writeFileSync(routePath, JSON.stringify(routesOut));
}

// ---------------------------------------------------------------------------
// Stage 6 — self-check report
// ---------------------------------------------------------------------------
// Re-reads what was actually written (not the in-memory objects) so the report
// describes the files on disk.
const L = [];
const say = s => L.push(s);

const P = CHECK_ONLY ? positionsOut : readJSON(posPath);
const R = CHECK_ONLY ? routesOut : readJSON(routePath);
const posIds = new Set(Object.keys(P.positions));

say('===== generate-rack-overlay self-check ' + '='.repeat(34));
say('');
say('EXPANSION FIDELITY (must match the live browser)');
say(`  rack instances               ${X.rackInstances.length}   (expect 96)      ${X.rackInstances.length === 96 ? 'OK' : 'FAIL'}`);
say(`  rack-internal assets       ${X.expandedAssets}   (expect ${EXPECT_ASSETS})    ${X.expandedAssets === EXPECT_ASSETS ? 'OK' : 'FAIL'}`);
say(`  rack-internal edges       ${X.expandedEdges}   (expect ${EXPECT_EDGES})   ${X.expandedEdges === EXPECT_EDGES ? 'OK' : 'FAIL'}`);
say(`  deferred to existing asset    ${X.deferredToExisting.length}   (row01_rack01 hand-authored meshes)`);
say(`  edges skipped (no endpoint)  ${X.skipped}   (expect 96 = one r21 per rack)  ${X.skipped === 96 ? 'OK' : 'CHECK'}`);
say('');
say('POSITIONS  -> graph/rack-positions.json');
say(`  entries written            ${posIds.size}`);
say(`  covers minted assets       ${X.rackComponentIds.filter(id => posIds.has(id)).length} / ${X.expandedAssets}`);
say(`  measured (real GLB mesh)   ${nMeasured}`);
say(`  synthetic (anchor+offset)  ${nSynthetic}`);
say(`  unresolved                 ${unresolvedAssets.length}`);
for (const u of unresolvedAssets.slice(0, 20)) say(`    - ${u.id}: ${u.reason}`);
say(`  measured+synthetic sum     ${nMeasured + nSynthetic} ${nMeasured + nSynthetic === X.expandedAssets ? 'OK' : 'FAIL'}`);
say('');
say('  per-component provenance (measured / synthetic):');
for (const c of rack.components) {
  const mm = measuredByComp[c.id] || 0, ss = syntheticByComp[c.id] || 0;
  say(`    ${c.id.padEnd(16)} ${String(mm).padStart(5)} / ${String(ss).padStart(5)}   (${mm + ss} instances)`);
}
say('');
say('ROUTES  -> graph/rack-routes.json');
say(`  routes written             ${R.routes.length}`);
say(`  edges covered              ${R.routes.length} / ${X.expandedEdges}  (${(100 * R.routes.length / X.expandedEdges).toFixed(2)}%)`);
const uniqKeys = new Set(R.routes.map(r => r.route_key)).size;
say(`  unique route_key values    ${uniqKeys} ${uniqKeys === R.routes.length ? 'OK (unique)' : 'FAIL (collision)'}`);
const distinctIds = new Set(R.routes.map(r => r.id)).size;
say(`  distinct route id values   ${distinctIds} ${distinctIds === R.routes.length ? 'OK (unique, fixed 2026-08-30)' : 'FAIL (fan-out ids still colliding)'}`);
say(`  local drops                ${localDrops}`);
say(`  corridor runs              ${corridorRuns}`);
say(`  total length               ${totalLength} m`);
say(`  by service                 ${Object.entries(byService).map(([s, v]) => `${s}:${v.runs}`).join('  ')}`);
say(`  unresolved routes          ${unresolvedRoutes.length}`);
for (const [reason, n] of Object.entries(failureReasons)) say(`    - ${reason}: ${n}`);
if (missingPositionIds.length) say(`    missing position ids: ${missingPositionIds.join(', ')}`);
say('');
say('GEOMETRY SANITY');
say(`  lane model                 ${KEEP_STOCK_LANES ? 'routing.js stock spacing (--lanes)' : 'collapsed to corridor centreline'}`);
let bx = [Infinity, -Infinity], by = [Infinity, -Infinity], bz = [Infinity, -Infinity];
for (const r of R.routes) for (const p of r.points) {
  bx = [Math.min(bx[0], p[0]), Math.max(bx[1], p[0])];
  by = [Math.min(by[0], p[1]), Math.max(by[1], p[1])];
  bz = [Math.min(bz[0], p[2]), Math.max(bz[1], p[2])];
}
say(`  polyline bounds x          ${bx[0].toFixed(2)} .. ${bx[1].toFixed(2)}   (building envelope roughly -24.5 .. 18.0)`);
say(`  polyline bounds y          ${by[0].toFixed(2)} .. ${by[1].toFixed(2)}`);
say(`  polyline bounds z          ${bz[0].toFixed(2)} .. ${bz[1].toFixed(2)}   (building envelope roughly -19.0 .. 22.0)`);
const outside = R.routes.filter(r => r.points.some(p => p[0] < -24.5 || p[0] > 18.0 || p[2] < -19.0 || p[2] > 22.0)).length;
say(`  routes leaving the site    ${outside} ${outside === 0 ? 'OK' : 'FAIL'}`);
// cross-check the corridor portion against the hall-level route for the same physical run
const rjRoutes = readJSON(path.join(GRAPH_DIR, 'routes.json')).routes;
const h52 = rjRoutes.find(r => r.id === 'h52');
const r0sample = R.routes.filter(r => r.template_edge === 'r0' && r.from === 'row01_rpdu_1'
                                   && /row01_rack07/.test(r.to) && r.mode === 'corridor run');
if (h52 && r0sample.length) {
  const lens = r0sample.map(r => r.length_m);
  say(`  cross-check vs routes.json h52 (row01_rpdu_1 -> row01_rack07): hall ${h52.length_m} m  vs  rack r0 ${Math.min(...lens)}-${Math.max(...lens)} m`);
}
say('');
say('ENDPOINT INTEGRITY');
const allPos = new Set([...Object.keys(basePositions), ...posIds]);
const badEndpoint = R.routes.filter(r => !allPos.has(r.from) || !allPos.has(r.to));
say(`  routes with both endpoints positioned  ${R.routes.length - badEndpoint.length} / ${R.routes.length} ${badEndpoint.length === 0 ? 'OK' : 'FAIL'}`);
const emitted = R.routes.length + unresolvedRoutes.length;
say(`  routes + unresolved == expanded edges  ${emitted} vs ${X.expandedEdges} ${emitted === X.expandedEdges ? 'OK' : 'FAIL'}`);
say('');
say(CHECK_ONLY ? 'MODE: --check (nothing written)' : `WROTE: ${path.relative(PROJECT_DIR, posPath)}, ${path.relative(PROJECT_DIR, routePath)}`);
say('='.repeat(74));

console.log(L.join('\n'));
