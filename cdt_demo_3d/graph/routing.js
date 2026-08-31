/**
 * routing.js — containment-aware route solver for the campus model.
 *
 * Cables and pipes do not fly between equipment. They leave a cabinet on a
 * riser, join a tray or pipe rack, run orthogonally along shared corridors,
 * and drop at the destination. This module models that:
 *
 *   1. a lattice of legal corridors at service-specific altitudes
 *   2. Dijkstra with a turn penalty (straight runs are cheaper than dog-legs)
 *      and a bundling discount (a corridor already carrying the same service
 *      is cheaper than an empty one, so runs gather into trays)
 *   3. lane assignment so parallel runs in one corridor sit side by side
 *      instead of coincident
 *   4. corner fillets at a per-service bend radius
 *
 * Pure data in, pure data out — no three.js dependency.
 *
 *   const { routeAll } = makeRouter();
 *   const { routes, occupancy } = routeAll(positions, connections);
 */

function makeRouter(opts = {}) {
  const R = 2;                                   // coordinate rounding (cm)
  const round = v => Math.round(v * 10 ** R) / 10 ** R;
  const key = (x, y, z) => `${round(x)},${round(y)},${round(z)}`;

  // ---- service routing profile -------------------------------------------
  // altitude: the ceiling band this service runs at inside the building
  // grade:    the outdoor altitude (duct bank / pipe rack / at-grade)
  // radius:   corner fillet radius, standing in for minimum bend radius
  // lane:     horizontal spacing between parallel runs in the same corridor
  const SERVICE = {
    electricity: { altitude: 3.99, grade: 1.00, radius: 0.30, lane: 0.14, label: 'busway / cable tray' },
    fuel:        { altitude: 0.50, grade: 0.40, radius: 0.40, lane: 0.12, label: 'buried fuel line' },
    water:       { altitude: 3.45, grade: 1.10, radius: 0.45, lane: 0.16, label: 'pipe rack (chilled water)' },
    condenser:   { altitude: 3.30, grade: 1.00, radius: 0.45, lane: 0.16, label: 'pipe rack (condenser)' },
    air:         { altitude: 3.60, grade: 1.40, radius: 0.50, lane: 0.24, label: 'duct run' },
    data:        { altitude: 3.89, grade: 0.60, radius: 0.20, lane: 0.10, label: 'fibre tray' },
    control:     { altitude: 3.80, grade: 0.70, radius: 0.15, lane: 0.08, label: 'OT signal tray' },
    fire:        { altitude: 4.24, grade: 0.90, radius: 0.25, lane: 0.10, label: 'fire main / SLC loop' },
    security:    { altitude: 4.14, grade: 2.20, radius: 0.15, lane: 0.08, label: 'LV security tray' },
  };
  const profile = s => SERVICE[s] || SERVICE.control;

  // ---- corridor lattice ---------------------------------------------------
  // Longitudinal corridors run along z at fixed x; lateral corridors run
  // along x at fixed z. Values follow the real equipment lines and the
  // existing ceiling spines in the model.
  const X_LINES = opts.xLines || [
    -24.5, -22.3, -20.6,                       // west yard: generators, BESS, wall approach
    -19.25, -17.45, -16.9, -15.5, -14.2, -13.0, // west wing equipment rows
    -12.3, -10.2, -8.2, -7.6,                  // MMR / chiller room
    -6.3,                                      // main hall riser spine
    -4.7, 0.92, 6.78, 7.34,                    // hall: cold-aisle edge, CDU line, EoR line
    13.4, 16.5, 18.0,                          // east wall facility, yard
  ];
  const Z_LINES = opts.zLines || [
    -19.0, -17.0, -11.3, -10.6,                // perimeter, yard headers
    -9.87, -9.5, -9.0, -8.1,                   // row 01 bands
    -6.27, -5.9, -5.4, -4.5,                   // row 02 bands
    -2.67, -2.3, -1.8, -0.9,                   // row 03 bands
    0.25,                                      // central cross-corridor
    0.93, 1.3, 1.8, 2.7,                       // row 04 bands
    4.53, 4.9, 5.4, 6.3,                       // row 05 bands
    8.13, 8.5, 9.0, 9.44, 9.9,                 // row 06 bands + MMR line
    11.6, 12.4, 17.4, 22.0,                    // NOC / MMR, north yard
  ];
  const OUTDOOR = p => p.x < -20.2 || p.x > 14.2 || p.z < -12.2 || p.z > 12.2;

  // ---- graph construction -------------------------------------------------
  function buildLattice(service) {
    const prof = profile(service);
    const nodes = new Map();                    // key -> {x,y,z}
    const adj = new Map();                      // key -> [{to, cost, axis, corridor}]
    const addNode = (x, y, z) => {
      const k = key(x, y, z);
      if (!nodes.has(k)) { nodes.set(k, { x: round(x), y: round(y), z: round(z) }); adj.set(k, []); }
      return k;
    };
    const link = (a, b, axis, corridor, mult = 1) => {
      const A = nodes.get(a), B = nodes.get(b);
      const d = Math.hypot(A.x - B.x, A.y - B.y, A.z - B.z) * mult;
      adj.get(a).push({ to: b, cost: d, axis, corridor });
      adj.get(b).push({ to: a, cost: d, axis, corridor });
    };

    // two altitudes: indoor ceiling band and outdoor grade
    for (const [alt, tag] of [[prof.altitude, 'indoor'], [prof.grade, 'outdoor']]) {
      for (const x of X_LINES) {
        const zs = Z_LINES.filter(z => tag === 'outdoor' ? true : true).slice().sort((p, q) => p - q);
        for (let i = 0; i < zs.length; i++) addNode(x, alt, zs[i]);
        for (let i = 0; i < zs.length - 1; i++) {
          const a = key(x, alt, zs[i]), b = key(x, alt, zs[i + 1]);
          const mid = { x, z: (zs[i] + zs[i + 1]) / 2 };
          // wrong-region segments stay in the graph but cost 6x, so routes
          // prefer the correct level without the lattice ever fragmenting
          const wrong = OUTDOOR(mid) !== (tag === 'outdoor');
          link(a, b, 'z', `X${x}@${alt}`, wrong ? 6 : 1);
        }
      }
      for (const z of Z_LINES) {
        const xs = X_LINES.slice().sort((p, q) => p - q);
        for (let i = 0; i < xs.length; i++) addNode(xs[i], alt, z);
        for (let i = 0; i < xs.length - 1; i++) {
          const a = key(xs[i], alt, z), b = key(xs[i + 1], alt, z);
          const mid = { x: (xs[i] + xs[i + 1]) / 2, z };
          const wrong = OUTDOOR(mid) !== (tag === 'outdoor');
          link(a, b, 'x', `Z${z}@${alt}`, wrong ? 6 : 1);
        }
      }
    }
    // wall penetrations: vertical links between the two altitudes where the
    // indoor ceiling band meets the outdoor grade band, at the crossing lines
    // Vertical risers between the ceiling band and grade at every lattice
    // intersection: cheap at the documented wall penetrations, expensive
    // elsewhere so routes still prefer to use a real opening.
    const PEN = [
      { x: -20.6, z: 0.25 }, { x: -20.6, z: -9.5 },   // west wall
      { x: 13.4,  z: 0.25 }, { x: 13.4,  z: -10.6 },  // east wall
      { x: -6.3,  z: 12.4 },                          // north (carrier entry)
    ];
    const nearPen = (x, z) => PEN.some(p => Math.abs(p.x - x) < 1.6 && Math.abs(p.z - z) < 2.0);
    if (Math.abs(prof.altitude - prof.grade) > 0.01) {
      for (const x of X_LINES) for (const z of Z_LINES) {
        const a = addNode(x, prof.altitude, z), b = addNode(x, prof.grade, z);
        link(a, b, 'y', nearPen(x, z) ? `PEN@${x},${z}` : `RISER@${x},${z}`,
             nearPen(x, z) ? 1.0 : 9);
      }
    }
    return { nodes, adj, prof };
  }

  // ---- stub: equipment anchor -> nearest lattice node --------------------
  function stub(lattice, pos) {
    const prof = lattice.prof;
    const want = OUTDOOR(pos) ? prof.grade : prof.altitude;
    let best = null, bestD = Infinity;
    for (const [k, n] of lattice.nodes) {
      const d = Math.abs(n.x - pos.x) + Math.abs(n.z - pos.z)
              + (Math.abs(n.y - want) > 0.01 ? 12 : 0);   // strongly prefer the right band
      if (d < bestD) { bestD = d; best = k; }
    }
    return best;
  }

  // ---- Dijkstra with turn penalty and bundling discount -----------------
  function shortest(lattice, from, to, load, service) {
    const { adj, nodes } = lattice;
    const TURN = 0.9, BUNDLE = 0.55;
    const dist = new Map([[from + '|start', 0]]);
    const prev = new Map();
    const heap = [];
    const push = v => { heap.push(v); let i = heap.length - 1;
      while (i > 0) { const p = (i - 1) >> 1; if (heap[p].c <= heap[i].c) break;
        [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
    const pop = () => { const top = heap[0], last = heap.pop();
      if (heap.length) { heap[0] = last; let i = 0;
        for (;;) { const l = 2*i+1, r = l+1; let m = i;
          if (l < heap.length && heap[l].c < heap[m].c) m = l;
          if (r < heap.length && heap[r].c < heap[m].c) m = r;
          if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } }
      return top; };
    push({ k: from, axis: 'start', c: 0 });
    const seen = new Set();
    while (heap.length) {
      const cur = pop();
      const sk = cur.k + '|' + cur.axis;
      if (seen.has(sk)) continue;
      seen.add(sk);
      if (cur.k === to) {
        const path = [];
        let s = sk;
        while (s) { path.push(s.split('|')[0]); s = prev.get(s); }
        return path.reverse().map(k => nodes.get(k));
      }
      for (const e of adj.get(cur.k) || []) {
        let c = cur.c + e.cost;
        if (cur.axis !== 'start' && e.axis !== cur.axis) c += TURN;
        const occ = load.get(e.corridor);
        if (occ && occ.services.has(service)) c -= Math.min(BUNDLE, e.cost * 0.4);
        const nk = e.to + '|' + e.axis;
        if (!dist.has(nk) || c < dist.get(nk)) {
          dist.set(nk, c); prev.set(nk, sk);
          push({ k: e.to, axis: e.axis, c });
        }
      }
    }
    return null;
  }

  // ---- geometry post-processing ------------------------------------------
  const dedupe = pts => pts.filter((p, i) =>
    i === 0 || Math.abs(p.x - pts[i-1].x) > 1e-3 || Math.abs(p.y - pts[i-1].y) > 1e-3 || Math.abs(p.z - pts[i-1].z) > 1e-3);

  function simplify(pts) {
    // drop collinear intermediates so corner detection is clean
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = out[out.length - 1], b = pts[i], c = pts[i + 1];
      const ab = [b.x - a.x, b.y - a.y, b.z - a.z], bc = [c.x - b.x, c.y - b.y, c.z - b.z];
      const la = Math.hypot(...ab), lb = Math.hypot(...bc);
      if (la < 1e-6 || lb < 1e-6) continue;
      const dot = (ab[0]*bc[0] + ab[1]*bc[1] + ab[2]*bc[2]) / (la * lb);
      if (dot < 0.9995) out.push(b);
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  function fillet(pts, radius) {
    if (pts.length < 3) return pts;
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const la = Math.hypot(b.x-a.x, b.y-a.y, b.z-a.z);
      const lc = Math.hypot(c.x-b.x, c.y-b.y, c.z-b.z);
      const r = Math.min(radius, la * 0.45, lc * 0.45);
      if (r < 0.02) { out.push(b); continue; }
      const ta = r / la, tc = r / lc;
      const p1 = { x: b.x + (a.x-b.x)*ta, y: b.y + (a.y-b.y)*ta, z: b.z + (a.z-b.z)*ta };
      const p2 = { x: b.x + (c.x-b.x)*tc, y: b.y + (c.y-b.y)*tc, z: b.z + (c.z-b.z)*tc };
      // quadratic through the corner, three samples is plenty at this scale
      out.push(p1);
      for (const t of [0.33, 0.66]) {
        const u = 1 - t;
        out.push({
          x: u*u*p1.x + 2*u*t*b.x + t*t*p2.x,
          y: u*u*p1.y + 2*u*t*b.y + t*t*p2.y,
          z: u*u*p1.z + 2*u*t*b.z + t*t*p2.z,
        });
      }
      out.push(p2);
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  function applyLanes(pts, laneIndex, spacing) {
    if (!laneIndex) return pts;
    // offset perpendicular to each run, in the horizontal plane where the run
    // is horizontal, vertically where it is not
    const off = ((laneIndex % 2 ? 1 : -1) * Math.ceil(laneIndex / 2)) * spacing;
    return pts.map((p, i) => {
      const q = pts[Math.min(i + 1, pts.length - 1)], r = pts[Math.max(i - 1, 0)];
      const dx = q.x - r.x, dz = q.z - r.z, dy = q.y - r.y;
      const hor = Math.hypot(dx, dz);
      if (hor > Math.abs(dy)) {
        const nx = -dz / (hor || 1), nz = dx / (hor || 1);
        return { x: p.x + nx * off, y: p.y, z: p.z + nz * off };
      }
      return { x: p.x + off, y: p.y, z: p.z };
    });
  }

  // ---- entry point --------------------------------------------------------
  function routeAll(positions, connections) {
    const lattices = new Map();
    const load = new Map();                     // corridor -> {count, services:Set, ids:[]}
    const laneCounter = new Map();              // corridor|service -> next lane
    const routes = [];
    const failures = [];

    // longest first: trunk routes claim the corridors, branches bundle onto them
    const order = connections.map((c, i) => ({ c, i })).sort((A, B) => {
      const pa = positions[A.c.from], pb = positions[A.c.to];
      const qa = positions[B.c.from], qb = positions[B.c.to];
      const la = pa && pb ? Math.hypot(pa.x-pb.x, pa.y-pb.y, pa.z-pb.z) : 0;
      const lb = qa && qb ? Math.hypot(qa.x-qb.x, qa.y-qb.y, qa.z-qb.z) : 0;
      return lb - la;
    });

    for (const { c } of order) {
      const A = positions[c.from], B = positions[c.to];
      if (!A || !B) { failures.push({ id: c.id, reason: 'missing position', from: c.from, to: c.to }); continue; }
      const service = c.service || 'control';
      if (!lattices.has(service)) lattices.set(service, buildLattice(service));
      const lat = lattices.get(service);
      const prof = lat.prof;

      // Local drops do not go out to a corridor and back: a rack coolant
      // drop, a tap-off, a sensor lead all run straight off the nearest
      // header. Short, near-aligned pairs get a direct orthogonal path.
      const span = Math.hypot(A.x - B.x, A.z - B.z);
      const LOCAL = opts.localMax ?? 5.0;
      let mid, local = false;
      if (span <= LOCAL) {
        local = true;
        const yBand = Math.max(A.y, B.y) + 0.12;   // rise just clear of both
        mid = [
          { x: round(A.x), y: round(yBand), z: round(A.z) },
          { x: round(A.x), y: round(yBand), z: round(B.z) },
          { x: round(B.x), y: round(yBand), z: round(B.z) },
        ];
      } else {
        const sA = stub(lat, A), sB = stub(lat, B);
        mid = sA === sB ? [lat.nodes.get(sA)] : shortest(lat, sA, sB, load, service);
      }
      if (!mid) { failures.push({ id: c.id, reason: 'no path', from: c.from, to: c.to }); continue; }

      // record corridor usage and take a lane
      let laneIdx = 0;
      const corridors = [];
      for (let i = 0; local ? false : i < mid.length - 1; i++) {
        const a = mid[i], b = mid[i + 1];
        const cid = Math.abs(a.x - b.x) > 1e-3 ? `Z${round(a.z)}@${round(a.y)}`
                  : Math.abs(a.z - b.z) > 1e-3 ? `X${round(a.x)}@${round(a.y)}`
                  : `PEN@${round(a.x)},${round(a.z)}`;
        corridors.push(cid);
        if (!load.has(cid)) load.set(cid, { count: 0, services: new Set(), ids: [] });
        const rec = load.get(cid);
        rec.count++; rec.services.add(service); rec.ids.push(c.id);
        const lk = cid + '|' + service;
        laneCounter.set(lk, (laneCounter.get(lk) || 0));
        laneIdx = Math.max(laneIdx, laneCounter.get(lk));
      }
      for (const cid of new Set(corridors)) {
        const lk = cid + '|' + service;
        laneCounter.set(lk, (laneCounter.get(lk) || 0) + 1);
      }

      // assemble: riser out of the source, lattice run, riser into the target
      const raw = local
        ? dedupe([{ x: A.x, y: A.y, z: A.z }, ...mid, { x: B.x, y: B.y, z: B.z }])
        : dedupe([
            { x: A.x, y: A.y, z: A.z },
            { x: A.x, y: prof.altitude, z: A.z },
            ...mid,
            { x: B.x, y: prof.altitude, z: B.z },
            { x: B.x, y: B.y, z: B.z },
          ]);
      let pts = simplify(raw);
      if (!local) pts = applyLanes(pts, laneIdx, prof.lane);
      pts = fillet(pts, prof.radius);

      let length = 0;
      for (let i = 0; i < pts.length - 1; i++)
        length += Math.hypot(pts[i+1].x-pts[i].x, pts[i+1].y-pts[i].y, pts[i+1].z-pts[i].z);

      routes.push({
        id: c.id, from: c.from, to: c.to, service, protocol: c.protocol || null,
        mode: local ? 'local drop' : 'corridor run',
        containment: local ? 'local drop / stub' : prof.label,
        altitude: local ? null : prof.altitude, lane: local ? 0 : laneIdx,
        bend_radius: prof.radius,
        length_m: round(length),
        corridors: [...new Set(corridors)],
        points: pts.map(p => [round(p.x), round(p.y), round(p.z)]),
      });
    }

    const occupancy = [...load].map(([id, r]) => ({
      corridor: id, runs: r.count, services: [...r.services], connection_ids: r.ids,
    })).sort((a, b) => b.runs - a.runs);

    return { routes, occupancy, failures, services: SERVICE };
  }

  return { routeAll, SERVICE, X_LINES, Z_LINES };
}

if (typeof module !== 'undefined') module.exports = { makeRouter };
