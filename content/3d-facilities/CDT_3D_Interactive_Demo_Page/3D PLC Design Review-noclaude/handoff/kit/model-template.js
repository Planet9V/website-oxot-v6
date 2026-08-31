/**
 * model.js — the ONE file you author per site.
 *
 * Two halves:
 *   A. GEOMETRY — build named meshes. The name is the binding key for everything
 *      downstream, so name deliberately: <SYSTEM>_<equipment>_<vendor_or_index>.
 *   B. GRAPH — declare N() assets and E() connections over that geometry.
 *
 * Nothing else in the kit needs to change. Keep the exports and the signature.
 */

export const ZONES = {
  Z0: { label: 'Z0 / Zone 4 — Enterprise IT',        purdue: 'L4-L5',        slt: 'SL-T 2',   color: 0x9ba1a8 },
  Z1: { label: 'Z1 / Zone 3 — DCIM / IDMZ',          purdue: 'L3-L3.5',      slt: 'SL-T 2-3', color: 0x35c2c9 },
  Z2: { label: 'Z2 / Zone 2 — Supervisory control',  purdue: 'L2',           slt: 'SL-T 2-3', color: 0x8a4fd0 },
  Z3: { label: 'Z3 / Zone 1 — Field device',         purdue: 'L0-L1',        slt: 'SL-T 1-2', color: 0xd8b23a },
  Z4: { label: 'Z4 — Safety instrumented (SIS)',     purdue: 'isolated SIS', slt: 'SL-T 2-3', color: 0xc8332a },
  Z5: { label: 'Z5 — Out-of-band / jump',            purdue: 'DMZ segment',  slt: 'SL-T 3',   color: 0xe07a26 },
};

export const SERVICES = {
  water:       { label: 'Water / process fluid', color: 0x1f6fd0 },
  condenser:   { label: 'Condenser water',       color: 0x2e8b57 },
  air:         { label: 'Air / HVAC',            color: 0x9aa4ac },
  electricity: { label: 'Electricity',           color: 0xd8b23a },
  fuel:        { label: 'Fuel',                  color: 0xd8c23a },
  data:        { label: 'Data (IT)',             color: 0x35c2c9 },
  control:     { label: 'Control (OT)',          color: 0x8a4fd0 },
  fire:        { label: 'Fire & life safety',    color: 0xc8332a },
  security:    { label: 'Physical security',     color: 0xe07a26 },
};

export const PROTOCOLS = {
  'Ethernet/TCP-IP': { color: 0x35c2c9, layer: 'IT' },
  'BGP':             { color: 0x2aa9b5, layer: 'IT' },
  'SNMP':            { color: 0x59b8c9, layer: 'IT' },
  'CAPWAP':          { color: 0x46a8d0, layer: 'IT' },
  'RS-232 console':  { color: 0x7f8f9a, layer: 'IT' },
  'OPC UA':          { color: 0x9b6ee0, layer: 'OT' },
  'Modbus TCP':      { color: 0x8a4fd0, layer: 'OT' },
  'Modbus RTU':      { color: 0x6f3ab0, layer: 'OT' },
  'PROFINET':        { color: 0xb04fd0, layer: 'OT' },
  'PROFIBUS DP':     { color: 0xa044c4, layer: 'OT' },
  'EtherNet/IP':     { color: 0x7f5ad0, layer: 'OT' },
  'HART':            { color: 0xc07ad0, layer: 'OT' },
  'BACnet/IP':       { color: 0x5f6fd0, layer: 'OT' },
  'BACnet MS/TP':    { color: 0x4a58ad, layer: 'OT' },
  'IEC 61850 MMS':   { color: 0xd05fb0, layer: 'OT' },
  'DNP3':            { color: 0xa04f8a, layer: 'OT' },
  'CAN bus':         { color: 0x8a6ad0, layer: 'OT' },
  'OSDP RS-485':     { color: 0xe07a26, layer: 'OT' },
  'Dry contact':     { color: 0x9aa4ac, layer: 'OT' },
  '4-20 mA analog':  { color: 0xb0a48a, layer: 'OT' },
  'Physical flow':   { color: 0x7f8f9a, layer: 'Process' },
};

export function buildCampus(THREE) {
  // ---------- materials ----------
  const M = {};
  const mat = (n, c, r, mt, o = {}) => M[n] = new THREE.MeshStandardMaterial({
    name: n, color: c, roughness: r, metalness: mt, ...o });
  mat('ground',   0xb0ad9e, 0.95, 0);
  mat('concrete', 0xb9b6ae, 0.90, 0);
  mat('wall',     0xdedbd3, 0.90, 0);
  mat('wall_int', 0xcfd3d8, 0.85, 0);
  mat('cab_gray', 0x6b7178, 0.55, 0.20);
  mat('cab_light',0x9ba1a8, 0.55, 0.20);
  mat('steel',    0x8d939a, 0.45, 0.50);
  mat('copper',   0xc27a45, 0.35, 0.70);
  mat('white_box',0xe8e8e2, 0.60, 0);
  mat('screen',   0x0a1420, 0.25, 0.10, { emissive: 0x0a2a40, emissiveIntensity: 1 });
  mat('led_green',0x2bd96a, 0.30, 0,    { emissive: 0x1faf4e, emissiveIntensity: 1 });
  mat('glass',    0xbcd6de, 0.15, 0.10, { transparent: true, opacity: 0.25 });
  // service-coloured run materials — keep these names, the Blender pipeline maps them
  mat('chw_supply', 0x1f6fd0, 0.4, 0.2);
  mat('chw_return', 0xc23a2e, 0.4, 0.2);
  mat('cond_loop',  0x2e8b57, 0.45, 0.25);
  mat('pwr_busway', 0xd8b23a, 0.5, 0.3);
  mat('pwr_conduit',0x8a8f96, 0.4, 0.5);
  mat('fiber_aqua', 0x35c2c9, 0.55, 0.1);
  mat('ot_purple',  0x8a4fd0, 0.5, 0.2);
  mat('air_duct',   0x9aa4ac, 0.5, 0.4);
  mat('fire_red',   0xc8332a, 0.5, 0.2);
  mat('sec_dark',   0x2a2d33, 0.5, 0.2);

  const C = new THREE.Group(); C.name = 'site';

  // ---------- primitive helpers (do not change signatures) ----------
  function box(n, m, w, h, d, x, y, z, p = C) {
    const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    g.name = n; g.position.set(x, y, z); p.add(g); return g;
  }
  function cyl(n, m, r, len, x, y, z, ax = 'y', p = C) {
    const g = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 16), m);
    g.name = n;
    if (ax === 'x') g.rotation.z = Math.PI / 2;
    if (ax === 'z') g.rotation.x = Math.PI / 2;
    g.position.set(x, y, z); p.add(g); return g;
  }
  /** Routed run: rectilinear waypoints, elbows at the corners. */
  function pipe(n, m, r, pts, p = C) {
    const g = new THREE.Group(); g.name = n; p.add(g);
    for (let i = 0; i < pts.length - 1; i++) {
      const a = new THREE.Vector3(...pts[i]), b = new THREE.Vector3(...pts[i + 1]);
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(r, r, a.distanceTo(b), 12), m);
      seg.name = n + '_s' + i;
      seg.position.copy(a).lerp(b, 0.5);
      seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
      g.add(seg);
      if (i < pts.length - 2) {
        const e = new THREE.Mesh(new THREE.SphereGeometry(r * 1.15, 10, 8), m);
        e.name = n + '_e' + i; e.position.copy(b); g.add(e);
      }
    }
    return g;
  }
  /** Floor-standing cabinet with optional HMI screen and a status LED. */
  function cab(n, m, w, h, d, x, z, p = C, scr = false) {
    const g = box(n, m, w, h, d, x, h / 2, z, p);
    if (scr) box(n + '_screen', M.screen, Math.min(0.3, w * 0.4), 0.16, 0.02, x, h * 0.75, z + d / 2 + 0.005, p);
    box(n + '_led', M.led_green, 0.04, 0.02, 0.015, x - w / 4, h * 0.85, z + d / 2 + 0.005, p);
    return g;
  }
  /** 19"/600mm rack: frame plus named rack units on the front face. */
  function rack(name, x, z, units, p = C, h = 2.1, d = 1.0) {
    const r = new THREE.Group(); r.name = name; r.position.set(x, 0, z); p.add(r);
    box(name + '_frame', M.sec_dark, 0.6, h, d, 0, h / 2, 0, r);
    units.forEach(([un, m], i) => {
      const y = h - 0.18 - i * 0.11;
      box(un, m ?? M.cab_gray, 0.5, 0.09, 0.03, 0, y, d / 2 - 0.01, r);
      box(un + '_led', M.led_green, 0.04, 0.012, 0.005, -0.17, y, d / 2 + 0.02, r);
    });
    return r;
  }

  // ==========================================================
  // A. GEOMETRY — author your site here.
  //    Site shell, then one block per room / area / skid.
  // ==========================================================
  {
    const g = new THREE.Group(); g.name = 'building'; C.add(g);
    box('site_ground', M.ground, 60, 0.1, 40, 0, -0.05, 0, g);
    box('slab', M.concrete, 40, 0.25, 24, 0, 0.12, 0, g);
    // walls, partitions, doors …
  }
  const FLOOR = 0.29;   // finished floor height; add to every in-room y

  // ... your rooms, skids, racks, yards ...

  const bb = new THREE.Box3().setFromObject(C);
  C.position.y = -bb.min.y;          // rest the site on y = 0
  C.updateMatrixWorld(true);
  return { group: C, materials: M, graph: buildGraph(THREE, C) };
}

// ==========================================================
// B. GRAPH — assets and connections over the geometry above.
// ==========================================================
function buildGraph(THREE, root) {
  const byName = new Map();
  root.traverse(o => { if (o.name && !byName.has(o.name)) byName.set(o.name, o); });

  const nodes = {}, edges = [], missing = [];

  /** N(id, label, kind, system, room, mesh, { zone, purdue, slt, vendor, standards, attrs, surface }) */
  const N = (id, label, kind, system, room, mesh, o = {}) => {
    const obj = byName.get(mesh);
    if (!obj) { missing.push(mesh); return; }
    nodes[id] = { id, label, kind, system, room, mesh, obj,
      zone: o.zone || null, purdue: o.purdue || null, slt: o.slt || null,
      vendor: o.vendor || null, standards: o.standards || null,
      attrs: o.attrs || {}, surface: o.surface || [],
      anchor: new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3()) };
  };

  /** E(from, to, service, protocol, label, geom, { critical, oneway, cross, note }) */
  const E = (from, to, service, protocol, label, geom, o = {}) => {
    edges.push({ id: 'e' + edges.length, from, to, service, protocol, label, geom,
      critical: !!o.critical, oneway: !!o.oneway, cross: o.cross || null, note: o.note || null });
  };

  // ---- assets ----
  // N('utility', 'Utility intake', 'HV termination', 'PWR', 'Yard', 'PWR_intake',
  //   { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'…', standards:'IEC 61850',
  //     attrs:{ voltage:'33 kV' },
  //     surface:['Outside the operator perimeter — treat as untrusted.'] });

  // ---- connections ----
  // E('utility', 'mv_swg', 'electricity', 'Physical flow', '33 kV feeder', 'PWR_intake_cable');
  // E('relay', 'scada', 'control', 'IEC 61850 MMS', 'protection and metering', null,
  //   { critical:true, cross:'Z3 → Z2', note:'Station-bus conduit.' });

  // ---- resolve (leave this alone) ----
  const live = edges.filter(e => nodes[e.from] && nodes[e.to]);
  const adj = {};
  for (const id of Object.keys(nodes)) adj[id] = { out: [], in: [] };
  live.forEach(e => { adj[e.from].out.push(e); adj[e.to].in.push(e); });
  for (const n of Object.values(nodes)) n.obj.traverse(o => { o.userData.nodeId = n.id; });
  const geomIndex = new Map();
  for (const e of live) {
    if (!e.geom) continue;
    const g = byName.get(e.geom);
    if (!g) continue;
    geomIndex.set(e.id, g);
    g.traverse(o => { (o.userData.edgeIds ||= []).push(e.id); });
  }
  if (missing.length) console.warn('[graph] meshes not found:', missing);

  return { nodes, edges: live, adj, geomIndex, missing,
    trace(startId, dir = 'both', maxDepth = 12) {
      const seenN = new Set([startId]), seenE = new Set();
      let frontier = [startId];
      for (let d = 0; d < maxDepth && frontier.length; d++) {
        const next = [];
        for (const id of frontier) {
          const list = dir === 'up' ? adj[id].in : dir === 'down' ? adj[id].out
                     : [...adj[id].in, ...adj[id].out];
          for (const e of list) {
            seenE.add(e.id);
            const other = e.from === id ? e.to : e.from;
            if (!seenN.has(other)) { seenN.add(other); next.push(other); }
          }
        }
        frontier = next;
      }
      return { nodes: seenN, edges: seenE };
    } };
}
