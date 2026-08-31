// Hyperscale campus model + typed connection graph.
// buildCampus(THREE) -> { group, graph, materials }
// graph.nodes: id -> { label, kind, system, room, mesh, attrs }
// graph.edges: [{ id, from, to, service, protocol, medium, label, geom }]
//   geom = name of the physical routed group/mesh that realises the edge (may be null)

export const SERVICES = {
  water:       { label: 'Water / coolant',   color: 0x1f6fd0 },
  condenser:   { label: 'Condenser water',   color: 0x2e8b57 },
  air:         { label: 'Air / HVAC',        color: 0x9aa4ac },
  electricity: { label: 'Electricity',       color: 0xd8b23a },
  fuel:        { label: 'Fuel',              color: 0xd8c23a },
  data:        { label: 'Data (IT)',         color: 0x35c2c9 },
  control:     { label: 'Control (OT)',      color: 0x8a4fd0 },
  fire:        { label: 'Fire & life safety', color: 0xc8332a },
  security:    { label: 'Physical security', color: 0xe07a26 },
};

export const PROTOCOLS = {
  'Ethernet/TCP-IP':  { color: 0x35c2c9, layer: 'IT' },
  'BGP':              { color: 0x2aa9b5, layer: 'IT' },
  'SNMP':             { color: 0x59b8c9, layer: 'IT' },
  'CAPWAP':           { color: 0x46a8d0, layer: 'IT' },
  'RS-232 console':   { color: 0x7f8f9a, layer: 'IT' },
  'OPC UA':           { color: 0x9b6ee0, layer: 'OT' },
  'Modbus TCP':       { color: 0x8a4fd0, layer: 'OT' },
  'Modbus RTU':       { color: 0x6f3ab0, layer: 'OT' },
  'PROFINET':         { color: 0xb04fd0, layer: 'OT' },
  'BACnet/IP':        { color: 0x5f6fd0, layer: 'OT' },
  'BACnet MS/TP':     { color: 0x4a58ad, layer: 'OT' },
  'IEC 61850 MMS':    { color: 0xd05fb0, layer: 'OT' },
  'DNP3':             { color: 0xa04f8a, layer: 'OT' },
  'CAN bus':          { color: 0x8a6ad0, layer: 'OT' },
  'OSDP RS-485':      { color: 0xe07a26, layer: 'OT' },
  'Dry contact':      { color: 0x9aa4ac, layer: 'OT' },
  '4-20 mA analog':   { color: 0xb0a48a, layer: 'OT' },
  'Physical flow':    { color: 0x7f8f9a, layer: 'Process' },
};

export function buildCampus(THREE) {
  // ===== materials ======================================================
  const M = {};
  const mat = (n, c, r, mt, o = {}) => M[n] = new THREE.MeshStandardMaterial({ name: n, color: c, roughness: r, metalness: mt, ...o });
  mat('ground',      0xb0ad9e, 0.95, 0);
  mat('concrete',    0xb9b6ae, 0.9, 0);
  mat('slab_hall',   0xd4d2cb, 0.85, 0);
  mat('wall',        0xdedbd3, 0.9, 0);
  mat('wall_int',    0xcfd3d8, 0.85, 0);
  mat('frame_black', 0x21242a, 0.55, 0.25);
  mat('panel_gray',  0x3a3f46, 0.6, 0.15);
  mat('compute_face',0x272b31, 0.45, 0.2);
  mat('nvsw_face',   0x1d2b3a, 0.45, 0.2);
  mat('psu_face',    0x383d45, 0.5, 0.15);
  mat('drive_face',  0x454a52, 0.5, 0.2);
  mat('copper',      0xc27a45, 0.35, 0.7);
  mat('chw_supply',  0x1f6fd0, 0.4, 0.2);
  mat('chw_return',  0xc23a2e, 0.4, 0.2);
  mat('cond_loop',   0x2e8b57, 0.45, 0.25);
  mat('pwr_busway',  0xd8b23a, 0.5, 0.3);
  mat('pwr_conduit', 0x8a8f96, 0.4, 0.5);
  mat('mv_cable',    0x5a3d8a, 0.5, 0.2);
  mat('data_tray',   0xe8c53f, 0.55, 0.2);
  mat('fiber_aqua',  0x35c2c9, 0.55, 0.1);
  mat('ot_purple',   0x8a4fd0, 0.5, 0.2);
  mat('air_duct',    0x9aa4ac, 0.5, 0.4);
  mat('fire_red',    0xc8332a, 0.5, 0.2);
  mat('sec_dark',    0x2a2d33, 0.5, 0.2);
  mat('cab_gray',    0x6b7178, 0.55, 0.2);
  mat('cab_light',   0x9ba1a8, 0.55, 0.2);
  mat('ups_beige',   0xc9c4b6, 0.6, 0.1);
  mat('batt_blue',   0x2d4a6b, 0.55, 0.15);
  mat('yard_steel',  0x8d939a, 0.45, 0.5);
  mat('louver',      0x5a6067, 0.6, 0.3);
  mat('bess_white',  0xe3e4de, 0.6, 0.1);
  mat('fuel_yellow', 0xd8c23a, 0.55, 0.2);
  mat('fence_gray',  0x7d8288, 0.5, 0.4);
  mat('screen',      0x0a1420, 0.25, 0.1, { emissive: 0x0a2a40, emissiveIntensity: 1 });
  mat('led_green',   0x2bd96a, 0.3, 0, { emissive: 0x1faf4e, emissiveIntensity: 1 });
  mat('led_amber',   0xf2b736, 0.3, 0, { emissive: 0xc78a12, emissiveIntensity: 1 });
  mat('light_bar',   0xf5f5ee, 0.4, 0, { emissive: 0xd8d8c8, emissiveIntensity: 0.7 });
  mat('glass',       0xbcd6de, 0.15, 0.1, { transparent: true, opacity: 0.25 });
  mat('leak_ring',   0xe07a26, 0.6, 0.1);
  mat('white_box',   0xe8e8e2, 0.6, 0);

  const C = new THREE.Group(); C.name = 'hyperscale_campus';
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
  function cab(n, m, w, h, d, x, z, p = C, scr = false) {
    const g = box(n, m, w, h, d, x, h / 2, z, p);
    if (scr) box(n + '_screen', M.screen, Math.min(0.3, w * 0.4), 0.16, 0.02, x, h * 0.75, z + d / 2 + 0.005, p);
    box(n + '_led', M.led_green, 0.04, 0.02, 0.015, x - w / 4, h * 0.85, z + d / 2 + 0.005, p);
    return g;
  }

  // ===== building shell =================================================
  {
    const g = new THREE.Group(); g.name = 'building'; C.add(g);
    box('site_ground', M.ground, 62, 0.1, 44, -1, -0.05, 0, g);
    box('slab', M.concrete, 34.4, 0.25, 24.4, -3, 0.12, 0, g);
    box('slab_finish', M.slab_hall, 34, 0.04, 24, -3, 0.27, 0, g);
    const wy = 0.25, WH = 5;
    const wall = (n, w, d, x, z) => box(n, M.wall, w, WH, d, x, wy + WH / 2, z, g);
    wall('wall_south', 34.4, 0.25, -3, -12.2); wall('wall_north_a', 14, 0.25, -13.2, 12.2);
    wall('wall_north_b', 17, 0.25, 5.7, 12.2);
    box('wall_north_gap_top', M.wall, 3.4, 2.0, 0.25, -4.5, wy + 4, 12.2, g);
    wall('wall_west_a', 0.25, 10, -20.2, -7); wall('wall_west_b', 0.25, 9, -20.2, 7.5);
    box('wall_west_door_top', M.wall, 0.25, 2.8, 5, -20.2, wy + 3.6, 0.5, g);
    wall('wall_east_a', 0.25, 9, 14.2, -7.5); wall('wall_east_b', 0.25, 9, 14.2, 7.5);
    box('wall_east_mid_top', M.wall, 0.25, 2.2, 6, 14.2, wy + 3.9, 0, g);
    box('part_west', M.wall_int, 0.15, WH, 24, -13, wy + WH / 2, 0, g);
    for (const z of [-4, 4, 8]) box('part_ww_' + z, M.wall_int, 7.2, WH, 0.15, -16.6, wy + WH / 2, z, g);
    box('part_chiller_e', M.wall_int, 0.15, 5, 6, -7, wy + 2.5, -9, g);
    box('part_chiller_n', M.wall_int, 6, WH, 0.15, -10, wy + WH / 2, -6, g);
    box('part_mmr_e', M.wall_int, 0.15, 5, 4, -7, wy + 2.5, 10, g);
    box('part_mmr_s', M.wall_int, 6, WH, 0.15, -10, wy + WH / 2, 8, g);
  }
  const FLOOR = 0.29;

  // ===== rack builders =================================================
  const U = 0.04445, RKW = 0.6, RKD = 1.2, RKH = 2.3, IW = 0.538;
  function rackLOD(name, p) {
    const g = new THREE.Group(); g.name = name; p.add(g);
    box(name + '_frame', M.frame_black, RKW, RKH, RKD, 0, RKH / 2, 0, g);
    const plan = [[3,1,M.psu_face,'power_shelf'],[9,1,M.compute_face,'compute_tray'],[9,1,M.nvsw_face,'nvswitch_tray'],
      [9,1,M.compute_face,'compute_tray'],[3,1,M.psu_face,'power_shelf'],[1,2,M.drive_face,'storage_node'],
      [1,1,M.cab_gray,'mgmt_tray'],[2,1,M.frame_black,'tor_switch']];
    let u = 1; const cnt = {};
    for (const [c, hU, m, pre] of plan) for (let i = 0; i < c; i++) {
      const idx = cnt[pre] = (cnt[pre] ?? -1) + 1, y = 0.1 + (u - 1) * U + hU * U / 2;
      box(name + '_' + pre + '_' + idx, m, IW, hU * U - 0.006, 0.03, 0, y, RKD / 2 - 0.015, g);
      box(name + '_' + pre + '_' + idx + '_led', idx % 6 === 4 ? M.led_amber : M.led_green, 0.05, 0.006, 0.004, -0.18, y, RKD / 2 + 0.002, g);
      u += hU;
    }
    box(name + '_busbar', M.copper, 0.05, 1.9, 0.03, 0, 1.15, -RKD / 2 + 0.08, g);
    cyl(name + '_manifold_supply', M.chw_supply, 0.025, 1.8, -0.22, 1.15, -RKD / 2 + 0.06, 'y', g);
    cyl(name + '_manifold_return', M.chw_return, 0.025, 1.8, 0.22, 1.15, -RKD / 2 + 0.06, 'y', g);
    return g;
  }
  function rackLite(name, p) {
    const g = new THREE.Group(); g.name = name; p.add(g);
    box(name + '_frame', M.frame_black, RKW, RKH, RKD, 0, RKH / 2, 0, g);
    const zones = [[0.1,0.14,M.psu_face,'power_zone_lo'],[0.25,0.42,M.compute_face,'compute_zone_lo'],[0.68,0.4,M.nvsw_face,'switch_zone'],
      [1.09,0.42,M.compute_face,'compute_zone_hi'],[1.52,0.14,M.psu_face,'power_zone_hi'],[1.67,0.2,M.drive_face,'storage_zone'],[1.88,0.14,M.frame_black,'network_zone']];
    for (const [y0, h, m, nm] of zones)
      box(name + '_' + nm, m, IW, h, 0.03, 0, y0 + h / 2, RKD / 2 - 0.015, g);
    box(name + '_led_strip', M.led_green, 0.03, 1.8, 0.004, -0.2, 1.05, RKD / 2 + 0.002, g);
    box(name + '_busbar', M.copper, 0.05, 1.9, 0.03, 0, 1.15, -RKD / 2 + 0.08, g);
    cyl(name + '_manifold_supply', M.chw_supply, 0.025, 1.8, -0.22, 1.15, -RKD / 2 + 0.06, 'y', g);
    cyl(name + '_manifold_return', M.chw_return, 0.025, 1.8, 0.22, 1.15, -RKD / 2 + 0.06, 'y', g);
    return g;
  }
  function cduRack(name, p) {
    const g = new THREE.Group(); g.name = name; p.add(g);
    box(name + '_cabinet', M.panel_gray, RKW, RKH, RKD, 0, RKH / 2, 0, g);
    box(name + '_screen', M.screen, 0.28, 0.16, 0.02, 0, 1.75, RKD / 2 + 0.005, g);
    box(name + '_grille', M.frame_black, 0.4, 0.9, 0.02, 0, 0.65, RKD / 2 + 0.005, g);
    for (const [i, x] of [-0.14, 0.14].entries()) cyl(name + '_pump_' + i, M.cab_light, 0.09, 0.3, x, 0.35, 0, 'z', g);
    box(name + '_bphe', M.copper, 0.42, 0.7, 0.5, 0, 1.35, -0.2, g);
    box('BMS_' + name + '_plc', M.white_box, 0.2, 0.25, 0.06, 0.1, 1.98, RKD / 2 + 0.03, g);
    return g;
  }
  function eorRack(name, p) {
    const g = new THREE.Group(); g.name = name; p.add(g);
    box(name + '_frame', M.frame_black, RKW, RKH, RKD * 0.7, 0, RKH / 2, 0, g);
    for (let i = 0; i < 4; i++) {
      box('DATA_' + name + '_dist_switch_' + i, M.nvsw_face, IW, 0.06, 0.03, 0, 1.9 - i * 0.09, RKD * 0.35 - 0.015, g);
      box('DATA_' + name + '_dist_switch_' + i + '_led', M.led_green, 0.05, 0.006, 0.004, -0.18, 1.9 - i * 0.09, RKD * 0.35 + 0.002, g);
    }
    box('DATA_' + name + '_patch_panel', M.cab_gray, IW, 0.3, 0.03, 0, 1.35, RKD * 0.35 - 0.015, g);
    box('DATA_' + name + '_oob_console', M.drive_face, IW, 0.06, 0.03, 0, 1.0, RKD * 0.35 - 0.015, g);
    return g;
  }

  // ===== data hall rows ================================================
  const hallRows = [];
  function row(idx, z, detailed) {
    const rn = 'row' + String(idx).padStart(2, '0');
    const g = new THREE.Group(); g.name = rn; g.position.y = FLOOR; C.add(g);
    const N = 17, x00 = -4.2, xs = [];
    for (let i = 0; i < N; i++) {
      const x = x00 + i * 0.64; xs.push(x);
      let r;
      if (i === 8) r = cduRack(rn + '_cdu_rack', g);
      else {
        const nm = rn + '_rack' + String(i < 8 ? i + 1 : i).padStart(2, '0');
        r = detailed ? rackLOD(nm, g) : rackLite(nm, g);
      }
      r.position.set(x, 0, z);
    }
    const eor = eorRack(rn + '_eor_rack', g); eor.position.set(x00 + N * 0.64 + 0.1, 0, z);
    const x0 = xs[0] - 0.5, x1 = xs[N - 1] + 1.3, xc = (x0 + x1) / 2;
    const hz = z - RKD / 2 - 0.55;
    box(rn + '_containment_roof', M.glass, x1 - x0, 0.04, 1.1, xc, 2.62, hz, g);
    box(rn + '_containment_back', M.glass, x1 - x0, 2.6, 0.04, xc, 1.3, hz - 0.55, g);
    for (const [i, ex] of [x0, x1].entries()) box(rn + '_containment_door_' + i, M.glass, 0.05, 2.6, 1.1, ex, 1.3, hz, g);
    box('PWR_' + rn + '_busway', M.pwr_busway, x1 - x0, 0.14, 0.22, xc, 3.0, z - 0.5, g);
    xs.forEach((x, i) => { if (i === 8) return;
      box('PWR_' + rn + '_tapbox_' + i, M.sec_dark, 0.18, 0.12, 0.24, x, 2.88, z - 0.5, g);
      cyl('PWR_' + rn + '_drop_' + i, M.pwr_conduit, 0.02, 0.5, x, 2.57, z - 0.5, 'y', g);
    });
    for (const [nm, m, off] of [['supply', M.chw_supply, -0.15], ['return', M.chw_return, 0.15]]) {
      cyl('CHW_' + rn + '_tcs_header_' + nm, m, 0.05, x1 - x0, xc, 2.74, z - 0.72 + off, 'x', g);
      cyl('CHW_' + rn + '_cdu_riser_' + nm, m, 0.045, 0.45, xs[8] + off * 0.8, 2.52, z - 0.5, 'y', g);
      xs.forEach((x, i) => { if (i === 8) return;
        pipe('CHW_' + rn + '_drop_' + nm + '_' + i, m, 0.018,
          [[x + off * 0.5, 2.74, z - 0.72 + off], [x + off * 0.5, 2.15, z - 0.72 + off], [x + off * 0.5, 2.05, z - 0.52]], g);
      });
    }
    box('DATA_' + rn + '_fiber_tray', M.data_tray, x1 - x0 + 2, 0.05, 0.3, xc - 1, 3.2, z + 0.9, g);
    cyl('DATA_' + rn + '_trunk', M.fiber_aqua, 0.035, x1 - x0 + 2, xc - 1, 3.27, z + 0.9, 'x', g);
    xs.forEach((x, i) => { if (i === 8) return;
      pipe('DATA_' + rn + '_drop_' + i, M.fiber_aqua, 0.013, [[x, 3.2, z + 0.9], [x, 2.45, z + 0.62], [x, 2.32, z + 0.55]], g);
    });
    for (const x of [xc - 2, xc + 2]) cyl('FA_' + rn + '_nozzle_' + Math.round(x * 10), M.fire_red, 0.03, 0.12, x, 3.6, hz, 'y', g);
    cyl('FA_' + rn + '_vesda_pipe', M.white_box, 0.02, x1 - x0, xc, 3.85, z + 0.3, 'x', g);
    box('SEC_' + rn + '_lightbar', M.light_bar, x1 - x0, 0.03, 0.12, xc, 3.75, z + 0.9, g);
    for (const [i, sx] of [x0, x1].entries()) box('BMS_' + rn + '_th_sensor_' + i, M.white_box, 0.08, 0.12, 0.04, sx, 1.6, z + 0.8, g);
    box('BMS_' + rn + '_leak_ring', M.leak_ring, x1 - x0, 0.012, 0.05, xc, 0.05, z - RKD / 2 - 0.15, g);
    hallRows.push({ rn, z, xc, x0, x1 });
  }
  [-9, -5.4, -1.8, 1.8, 5.4, 9].forEach((z, i) => row(i + 1, z, i < 2));

  // ===== per-cell services: OT segment, BMS zone ctl, fire panel ========
  // Cell architecture (WP06 3.2): rows 01-03 = Cell A, rows 04-06 = Cell B.
  function cellServices(cid, zc) {
    const g = new THREE.Group(); g.name = cid + '_services'; g.position.y = FLOOR; C.add(g);
    const r = new THREE.Group(); r.name = cid + '_ot_rack'; r.position.set(-5.5, 0, zc); g.add(r);
    box(cid + '_ot_rack_frame', M.frame_black, 0.6, 2.0, 0.7, 0, 1.0, 0, r);
    [['DATA_' + cid + '_ot_switch', 1.72], ['DATA_' + cid + '_ot_firewall', 1.52],
     ['BMS_' + cid + '_zone_ctl', 1.32], ['DATA_' + cid + '_ot_gw', 1.12]].forEach(([nm, y]) => {
      box(nm, M.nvsw_face, 0.5, 0.08, 0.03, 0, y, 0.34, r);
      box(nm + '_led', M.led_amber, 0.04, 0.01, 0.004, -0.16, y, 0.36, r);
    });
    box('FA_' + cid + '_facp', M.fire_red, 0.5, 0.7, 0.14, -5.5, 1.6, zc + 1.9, g);
    for (let i = 0; i < 2; i++)
      cyl('FA_' + cid + '_bottle_' + i, M.fire_red, 0.14, 1.3, -5.75, 0.65, zc + 2.6 + i * 0.34, 'y', g);
    pipe('DATA_' + cid + '_ot_trunk', M.ot_purple, 0.022,
      [[-5.5, 2.05, zc], [-5.5, 3.8, zc], [-6.3, 3.8, zc]], g);
  }
  cellServices('cellA', -5.4);
  cellServices('cellB', 5.4);

  // ===== field-controller tier, OT monitoring taps, switched rPDUs =======
  // WP07 4.2: sensors terminate at DDC field controllers (Z3/L1), not at the
  // supervisory zone controller. WP07 8: the OT IDS needs SPAN/TAP presence.
  for (const [cid, zc] of [['cellA', -5.4], ['cellB', 5.4]]) {
    const g = new THREE.Group(); g.name = cid + '_field'; g.position.y = FLOOR; C.add(g);
    cab('BMS_' + cid + '_ddc_mech', M.cab_gray, 0.5, 1.2, 0.3, -4.9, zc - 1.1, g);
    cab('BMS_' + cid + '_ddc_elec', M.cab_gray, 0.5, 1.2, 0.3, -4.9, zc + 1.1, g);
    box('DATA_' + cid + '_ids_tap', M.sec_dark, 0.32, 0.09, 0.26, -5.5, 2.25, zc + 0.42, g);
  }
  { const g = new THREE.Group(); g.name = 'bms_integration'; g.position.y = FLOOR; C.add(g);
    cab('BMS_jace_a', M.cab_gray, 0.45, 1.0, 0.3, -4.9, -2.6, g);
    cab('BMS_jace_b', M.cab_gray, 0.45, 1.0, 0.3, -4.9, 2.6, g);
    box('DATA_idmz_ids_tap', M.sec_dark, 0.32, 0.09, 0.26, -9.4, 2.25, 1.2, g);
    cyl('DATA_gnss_mast', M.pwr_conduit, 0.035, 2.4, -11.0, 6.1, -8.6, 'y', g);
    box('DATA_gnss_antenna', M.white_box, 0.24, 0.11, 0.24, -11.0, 7.4, -8.6, g); }
  for (const r of hallRows) {
    const g = new THREE.Group(); g.name = r.rn + '_field'; g.position.y = FLOOR; C.add(g);
    box('BMS_' + r.rn + '_dp_sensor', M.white_box, 0.11, 0.11, 0.05, r.xc, 2.92, r.z + 0.86, g);
    box('DATA_' + r.rn + '_bmc_agg', M.sec_dark, 0.5, 0.09, 0.6, r.x1 + 1.0, 1.52, r.z, g);
    for (const [i, sx] of [r.x0 + 0.25, r.x1 - 0.25].entries())
      box('PWR_' + r.rn + '_rpdu_' + i, M.pwr_conduit, 0.09, 1.9, 0.09, sx, 1.05, r.z - RKD / 2 - 0.06, g);
  }

  for (const [i, [x, z]] of [[-3, -7], [7, -7], [-3, 0], [7, 0], [-3, 7], [7, 7], [12, -3.5], [12, 3.5]].entries()) {
    cyl('DATA_wap_' + i, M.white_box, 0.11, 0.04, x, 4.3, z);
    box('DATA_wap_' + i + '_led', M.led_green, 0.03, 0.01, 0.03, x, 4.27, z);
  }
  for (const [i, z] of [-7.2, 0, 7.2].entries()) {
    box('AIR_crah_' + i, M.cab_light, 0.9, 2.4, 2.4, 13.4, FLOOR + 1.2, z);
    box('AIR_crah_' + i + '_grille', M.louver, 0.05, 1.6, 2.0, 12.92, FLOOR + 1.0, z);
    box('BMS_crah_' + i + '_ctl', M.white_box, 0.2, 0.3, 0.06, 13.4, FLOOR + 1.9, z + 1.24);
  }

  // ===== west wing rooms ===============================================
  {
    const g = new THREE.Group(); g.name = 'mv_room'; g.position.y = FLOOR; C.add(g);
    ['hitachi_zx2', 'abb_pass', 'se_sm6', 'abb_unigear'].forEach((mn, i) =>
      cab('PWR_mv_swg_' + mn, M.cab_gray, 1.0, 2.3, 1.3, -19.3, -10.8 + i * 1.15, g, true));
    ['sel751a', 'easergy_p3', 'ref615'].forEach((mn, i) =>
      cab('PWR_relay_' + mn, M.sec_dark, 0.5, 1.8, 0.4, -17.6, -10.6 + i * 0.7, g, true));
    for (const [i, mn] of ['abb_resibloc', 'se_trihal'].entries()) {
      const x = -15.5, z = -10.2 + i * 2.6;
      box('PWR_xfmr_' + mn, M.yard_steel, 1.6, 1.8, 1.3, x, 0.9, z, g);
      for (let f = 0; f < 4; f++) box('PWR_xfmr_' + mn + '_coil_' + f, M.copper, 0.34, 1.3, 1.0, x - 0.55 + f * 0.37, 0.9, z, g);
    }
    pipe('PWR_mv_feed', M.mv_cable, 0.06, [[-22.5, 0.6, -8], [-20.3, 0.6, -8], [-19.3, 0.6, -9], [-19.3, 1.2, -9.5]], g);
    pipe('PWR_mv_to_xfmr', M.mv_cable, 0.05, [[-19.3, 2.4, -9.5], [-15.5, 2.9, -9.5], [-15.5, 1.9, -10.2]], g);
    pipe('PWR_xfmr_lv_feeder', M.pwr_conduit, 0.06, [[-15.5, 1.9, -7.6], [-15.5, 3.2, -7.0], [-15.5, 3.2, -3.0]], g);
  }
  {
    const g = new THREE.Group(); g.name = 'lv_ups_room'; g.position.y = FLOOR; C.add(g);
    cab('PWR_lv_swg_eaton_prl', M.cab_gray, 1.2, 2.2, 1.1, -19.2, -2.8, g, true);
    cab('PWR_ats_eaton_magnum', M.cab_gray, 0.9, 2.2, 1.0, -19.2, -1.2, g, true);
    cab('PWR_ats_asco7000', M.cab_gray, 0.9, 2.2, 1.0, -19.2, 0.2, g, true);
    cab('PWR_sts_vertiv_sts2', M.cab_gray, 0.9, 2.0, 1.0, -19.2, 1.6, g, true);
    cab('PWR_epms_ion9000', M.sec_dark, 0.5, 1.8, 0.4, -19.3, 3.0, g, true);
    ['eaton_9395xr', 'galaxy_vxl', 'vertiv_exl', 'abb_megaflex'].forEach((mn, i) =>
      cab('PWR_ups_' + mn, M.ups_beige, 1.2, 2.0, 0.95, -16.9, -2.9 + i * 1.55, g, true));
    for (let i = 0; i < 2; i++) cab('PWR_rpp_' + i, M.cab_gray, 0.8, 2.0, 0.5, -14.2, -1.5 + i * 3.0, g);
    pipe('PWR_lv_to_ats', M.pwr_conduit, 0.05, [[-19.2, 2.2, -2.8], [-19.2, 2.9, -2.8], [-19.2, 2.9, -0.5]], g);
    pipe('PWR_ats_to_ups', M.pwr_conduit, 0.05, [[-19.2, 2.9, -0.5], [-16.9, 2.9, -0.5], [-16.9, 2.0, -0.5]], g);
    pipe('PWR_ups_to_sts', M.pwr_conduit, 0.04, [[-16.9, 2.0, 1.7], [-17.9, 2.6, 1.6], [-19.2, 2.0, 1.6]], g);
    pipe('PWR_ups_to_rpp', M.pwr_conduit, 0.05, [[-16.9, 2.0, 0.2], [-16.9, 3.3, 0.2], [-14.2, 3.3, 0.0], [-14.2, 2.0, -1.5]], g);
    // one busway spine per cell — a busway loss is bounded to its own cell
    pipe('PWR_rpp_a_riser', M.pwr_busway, 0.07, [[-14.2, 2.0, -1.5], [-14.2, 3.6, -1.5], [-6.3, 3.6, -4.9]], g);
    pipe('PWR_rpp_b_riser', M.pwr_busway, 0.07, [[-14.2, 2.0, 1.5], [-14.2, 3.6, 1.5], [-6.3, 3.6, 5.4]], g);
    cyl('PWR_cellA_busway_spine', M.pwr_busway, 0.07, 9.2, -6.3, 3.6, -4.9, 'z', g);
    cyl('PWR_cellB_busway_spine', M.pwr_busway, 0.07, 9.2, -6.3, 3.6, 5.4, 'z', g);
    for (const r of hallRows)
      pipe('PWR_spine_to_' + r.rn, M.pwr_busway, 0.055, [[-6.3, 3.6, r.z - 0.5], [-5.5, 3.3, r.z - 0.5], [r.x0, 3.0, r.z - 0.5]], g);
  }
  {
    const g = new THREE.Group(); g.name = 'battery_room'; g.position.y = FLOOR; C.add(g);
    for (let i = 0; i < 6; i++)
      cab('PWR_battery_string_' + i, M.batt_blue, 0.75, 2.0, 0.85, -19.2 + (i % 3) * 1.0, 5.0 + Math.floor(i / 3) * 1.9, g);
    box('AIR_batt_h2_exhaust_fan', M.louver, 0.5, 0.5, 0.2, -15.0, 4.3, 7.85, g);
    pipe('AIR_batt_h2_duct', M.air_duct, 0.12, [[-15.0, 4.3, 7.9], [-15.0, 4.6, 6.0], [-15.0, 4.6, 4.5]], g);
    box('BMS_batt_h2_sensor', M.white_box, 0.1, 0.14, 0.05, -16.5, 2.2, 7.9, g);
    pipe('PWR_batt_dc_bus', M.pwr_conduit, 0.05, [[-18.2, 2.0, 5.0], [-18.2, 2.8, 4.2], [-17.5, 2.8, 2.0], [-16.9, 2.0, 1.9]], g);
  }
  {
    const g = new THREE.Group(); g.name = 'noc'; g.position.y = FLOOR; C.add(g);
    const cabs = [['BMS_srv_honeywell_ebi', 8.6], ['BMS_srv_jci_metasys', 9.4], ['BMS_dcim_environet', 10.2], ['BMS_ot_ids_nozomi', 11.0], ['SEC_acs_lenels2_onguard', 11.8]];
    for (const [nm, z] of cabs) cab(nm, M.cab_gray, 0.7, 2.0, 0.6, -19.3, z, g, true);
    const otr = new THREE.Group(); otr.name = 'ot_boundary_rack'; otr.position.set(-17.3, 0, 11.6); g.add(otr);
    box('ot_rack_frame', M.frame_black, 0.6, 2.0, 0.7, 0, 1.0, 0, otr);
    [['DATA_OT_switch_moxa_tn4900', 1.7], ['DATA_OT_firewall_moxa_edr9010', 1.5], ['DATA_OT_data_diode', 1.3], ['DATA_OT_gw_loytec_lgate', 1.1]]
      .forEach(([nm, y]) => { box(nm, M.nvsw_face, 0.5, 0.08, 0.03, 0, y, 0.34, otr); box(nm + '_led', M.led_amber, 0.04, 0.01, 0.004, -0.16, y, 0.36, otr); });
    box('BMS_console_desk', M.cab_light, 2.4, 0.06, 0.9, -16.2, 0.78, 9.4, g);
    for (let i = 0; i < 4; i++) {
      box('BMS_console_monitor_' + i, M.screen, 0.5, 0.32, 0.03, -17.2 + i * 0.65, 1.12, 9.7, g);
      box('BMS_console_stand_' + i, M.sec_dark, 0.05, 0.22, 0.05, -17.2 + i * 0.65, 0.92, 9.7, g);
    }
    box('BMS_wall_display', M.screen, 2.2, 1.1, 0.06, -14.0, 2.2, 11.9, g);
    box('FA_facp_sinteso_fc2080', M.fire_red, 0.55, 0.75, 0.14, -13.4, 1.7, 9.0, g).rotation.y = Math.PI / 2;
  }
  {
    const g = new THREE.Group(); g.name = 'mmr'; g.position.y = FLOOR; C.add(g);
    for (const [i, x] of [-12.3, -8.2].entries())
      pipe('DATA_carrier_entry_' + i, M.fiber_aqua, 0.05, [[x, 0.4, 13.5], [x, 0.4, 11.9], [x, 1.5, 11.4]], g);
    const rk = (nm, x, z, units) => {
      const r = new THREE.Group(); r.name = nm; r.position.set(x, 0, z); g.add(r);
      box(nm + '_frame', M.frame_black, 0.6, 2.1, 0.9, 0, 1.05, 0, r);
      units.forEach(([un, y, m]) => { box(un, m ?? M.nvsw_face, 0.5, 0.08, 0.04, 0, y, 0.44, r); box(un + '_led', M.led_green, 0.04, 0.01, 0.005, -0.16, y, 0.47, r); });
      return r;
    };
    rk('DATA_isp_rack_a', -12.3, 10.6, [['DATA_isp_router_a', 1.8], ['DATA_wan_ingress_a', 1.6], ['DATA_ddos_appliance_a', 1.4]]);
    rk('DATA_isp_rack_b', -8.2, 10.6, [['DATA_isp_router_b', 1.8], ['DATA_wan_ingress_b', 1.6], ['DATA_ddos_appliance_b', 1.4]]);
    rk('DATA_perimeter_fw_rack', -11.4, 9.0, [['DATA_fw_paloalto_pa7000_a', 1.8], ['DATA_fw_paloalto_pa7000_b', 1.55, M.nvsw_face], ['DATA_dmz_switch', 1.3]]);
    rk('DATA_core_rack_a', -10.2, 9.0, [['DATA_core_spine_arista7800_a', 1.8], ['DATA_leaf_agg_a', 1.55]]);
    rk('DATA_core_rack_b', -9.0, 9.0, [['DATA_core_spine_arista7800_b', 1.8], ['DATA_leaf_agg_b', 1.55]]);
    rk('DATA_mgmt_rack', -7.8, 10.6, [['DATA_jumpbox_bastion_a', 1.8], ['DATA_jumpbox_bastion_b', 1.62], ['DATA_oob_console_acs8000', 1.44], ['DATA_oob_kvm_raritan', 1.26], ['DATA_wlan_controller', 1.08]]);
    pipe('DATA_core_to_hall_spine', M.fiber_aqua, 0.04, [[-9.6, 2.1, 9.0], [-9.6, 3.5, 9.0], [-6.3, 3.5, 9.0]], g);
    cyl('DATA_hall_fiber_spine', M.fiber_aqua, 0.04, 19.5, -6.3, 3.5, 0.15, 'z', g);
    for (const r of hallRows)
      pipe('DATA_spine_to_' + r.rn, M.fiber_aqua, 0.025, [[-6.3, 3.5, r.z + 0.9], [-5.5, 3.3, r.z + 0.9], [r.x0 - 0.5, 3.2, r.z + 0.9]], g);
    pipe('DATA_OT_trunk', M.ot_purple, 0.025,
      [[-17.3, 2.05, 11.6], [-17.3, 3.4, 11.6], [-17.3, 3.4, -8.5], [-11.5, 3.4, -8.5], [-11.5, 2.2, -8.5]], C);
    pipe('DATA_OT_branch_epms', M.ot_purple, 0.02, [[-17.3, 3.4, 3.0], [-19.3, 3.4, 3.0], [-19.3, 2.1, 3.0]], C);
    pipe('DATA_OT_branch_hall_bms', M.ot_purple, 0.02, [[-17.3, 3.4, 0.25], [-6.3, 3.8, 0.25]], C);
    cyl('DATA_OT_hall_spine', M.ot_purple, 0.02, 19.5, -6.3, 3.8, 0.25, 'z', C);
  }
  {
    const g = new THREE.Group(); g.name = 'chiller_room'; g.position.y = FLOOR; C.add(g);
    for (const [i, mn] of ['carrier_30xw', 'trane_cvhf', 'york_yz'].entries()) {
      const z = -11 + i * 1.8, x = -10.5;
      box('CHW_chiller_' + mn, M.yard_steel, 3.4, 1.5, 1.2, x, 0.75, z, g);
      cyl('CHW_chiller_' + mn + '_comp', M.cab_light, 0.35, 1.6, x - 0.5, 1.6, z, 'x', g);
      box('BMS_chiller_' + mn + '_optiview', M.white_box, 0.3, 0.4, 0.08, x + 1.3, 1.3, z + 0.66, g);
    }
    for (let i = 0; i < 2; i++) {
      cyl('CHW_pump_grundfos_' + i, M.chw_supply, 0.14, 0.45, -8.0, 0.4, -11 + i * 0.9, 'x', g);
      cab('CHW_vfd_abb_acq580_' + i, M.sec_dark, 0.4, 1.2, 0.35, -7.6, -8.8 + i * 0.7, g, true);
    }
    box('BMS_wts_plc_s71200', M.white_box, 0.5, 0.7, 0.2, -12.6, 1.5, -6.3, g);
    pipe('CHW_fws_supply_main', M.chw_supply, 0.08, [[-9.0, 1.4, -10.6], [-7.4, 1.4, -10.6], [-7.4, 3.35, -10.6], [-6.3, 3.35, -10.2]], g);
    pipe('CHW_fws_return_main', M.chw_return, 0.08, [[-6.3, 3.55, -10.2], [-7.6, 3.55, -10.9], [-9.0, 1.6, -10.9]], g);
    cyl('CHW_fws_supply_spine', M.chw_supply, 0.065, 19.5, -6.3, 3.35, 0.2, 'z', C);
    cyl('CHW_fws_return_spine', M.chw_return, 0.065, 19.5, -6.3, 3.55, 0.2, 'z', C);
    for (const r of hallRows) {
      pipe('CHW_fws_to_' + r.rn + '_s', M.chw_supply, 0.04, [[-6.3, 3.35, r.z - 0.6], [-5.6, 3.1, r.z - 0.6], [-3.62, 2.9, r.z - 0.6], [-3.62, 2.75, r.z - 0.5]], C);
      pipe('CHW_fws_to_' + r.rn + '_r', M.chw_return, 0.04, [[-3.32, 2.75, r.z - 0.5], [-3.32, 3.0, r.z - 0.6], [-5.6, 3.25, r.z - 0.6], [-6.3, 3.55, r.z - 0.6]], C);
    }
  }
  {
    const g = new THREE.Group(); g.name = 'east_yard'; C.add(g);
    for (const [i, z] of [-8, -4.5, -1].entries()) {
      box('CHW_tower_bac3000_' + i, M.yard_steel, 2.4, 2.2, 2.4, 18, 1.35, z, g);
      cyl('CHW_tower_' + i + '_fan', M.louver, 0.8, 0.15, 18, 2.55, z, 'y', g);
      box('CHW_tower_' + i + '_basin', M.cab_light, 2.6, 0.5, 2.6, 18, 0.25, z, g);
    }
    pipe('CHW_cond_supply', M.cond_loop, 0.08, [[18, 1.0, -8], [16.2, 1.0, -8], [16.2, 1.0, -10.6], [14.4, 1.0, -10.6], [-6.8, 1.0, -10.6], [-8.6, 1.0, -10.6]], g);
    pipe('CHW_cond_return', M.cond_loop, 0.08, [[-8.6, 1.7, -11.3], [14.4, 1.7, -11.3], [16.2, 1.7, -11.3], [16.2, 1.7, -4.5], [18, 1.7, -4.5]], g);
    for (const [i, z] of [4, 7.5].entries()) {
      box('CHW_drycooler_' + i, M.yard_steel, 2.4, 1.6, 2.0, 17.5, 0.9, z, g);
      for (const fx of [17.0, 18.0]) cyl('CHW_drycooler_' + i + '_fan_' + Math.round(fx), M.louver, 0.4, 0.1, fx, 1.75, z, 'y', g);
    }
    pipe('CHW_econo_loop', M.cond_loop, 0.06, [[17.5, 0.9, 4], [15.5, 0.9, 2.5], [14.4, 0.9, 2.5], [14.4, 0.9, 0]], g);
    box('AIR_ahu_outdoor', M.cab_light, 2.2, 1.5, 1.2, 16.5, 0.85, 10.5, g);
    pipe('AIR_ahu_duct', M.air_duct, 0.2, [[16.5, 1.6, 10.5], [16.5, 3.6, 10.5], [14.4, 3.6, 10.5], [13.6, 3.6, 9.5]], g);
  }
  {
    const g = new THREE.Group(); g.name = 'west_yard'; C.add(g);
    for (const [i, z] of [-9, -5].entries()) {
      box('PWR_sub_gantry_' + i, M.fence_gray, 0.15, 4.5, 0.15, -26, 2.25, z, g);
      box('PWR_sub_gantry_' + i + 'b', M.fence_gray, 0.15, 4.5, 0.15, -23.5, 2.25, z, g);
      box('PWR_sub_beam_' + i, M.fence_gray, 2.65, 0.15, 0.15, -24.75, 4.4, z, g);
      for (let k = 0; k < 3; k++) cyl('PWR_sub_insulator_' + i + '_' + k, M.white_box, 0.06, 0.5, -25.4 + k * 0.65, 4.05, z, 'y', g);
    }
    box('PWR_sub_gis', M.yard_steel, 2.0, 1.8, 1.4, -24.5, 0.9, -2, g);
    box('PWR_sub_pad_xfmr', M.yard_steel, 1.8, 1.7, 1.5, -22.5, 0.85, -7.8, g);
    for (let f = 0; f < 5; f++) box('PWR_sub_pad_xfmr_fin_' + f, M.louver, 0.05, 1.2, 1.3, -23.45, 0.85, -7.8 - 0.5 + f * 0.25, g);
    pipe('PWR_sub_to_gis', M.mv_cable, 0.05, [[-24.75, 4.0, -9], [-24.75, 2.4, -5.5], [-24.5, 1.8, -3.0]], g);
    pipe('PWR_gis_to_pad', M.mv_cable, 0.05, [[-24.5, 0.9, -2.7], [-23.5, 0.5, -4.5], [-22.5, 0.5, -7.0]], g);
    for (const [i, mn] of ['cat_3516c', 'cummins_qsk60', 'kohler_kd'].entries()) {
      const z = 2 + i * 3.0;
      box('PWR_gen_' + mn, M.yard_steel, 4.2, 2.0, 1.6, -24.5, 1.0, z, g);
      box('PWR_gen_' + mn + '_exhaust', M.sec_dark, 0.18, 0.9, 0.18, -23.0, 2.6, z, g);
      box('PWR_gen_' + mn + '_daytank', M.fuel_yellow, 0.8, 0.8, 0.8, -22.0, 0.4, z, g);
      box('BMS_gen_' + mn + '_ctl_easygen', M.white_box, 0.25, 0.35, 0.08, -24.5, 1.6, z + 0.85, g);
    }
    cyl('PWR_fuel_bulk_tank', M.fuel_yellow, 0.9, 4.5, -24.5, 1.15, 11.5, 'x', g);
    pipe('PWR_fuel_line', M.fuel_yellow, 0.03, [[-24.5, 0.5, 11.5], [-22.0, 0.3, 9.5], [-22.0, 0.3, 8.0]], g);
    pipe('PWR_gen_feeder', M.pwr_conduit, 0.06, [[-24.5, 1.8, 2.0], [-21.5, 2.2, 1.0], [-20.3, 1.2, 0.2]], g);
    for (const [i, mn] of ['tesla_megapack', 'vertiv_bess'].entries()) {
      box('PWR_bess_' + mn, M.bess_white, 1.4, 2.2, 5.5, -22.3 + i * 2.0, 1.1, 17.4, g);
      box('PWR_bess_' + mn + '_hvac', M.louver, 1.2, 1.6, 0.15, -22.3 + i * 2.0, 1.0, 20.2, g);
      box('BMS_bess_' + mn + '_bms', M.white_box, 0.2, 0.3, 0.08, -22.3 + i * 2.0, 1.9, 14.7, g);
    }
    pipe('PWR_bess_tie', M.pwr_conduit, 0.05, [[-22.3, 1.0, 14.6], [-22.3, 0.4, 12.8], [-20.6, 0.4, 4.0], [-20.3, 0.8, 0.4]], g);
  }
  {
    const g = new THREE.Group(); g.name = 'perimeter'; C.add(g);
    const FX0 = -29, FX1 = 27, FZ0 = -19, FZ1 = 22, FH = 2.4;
    const run = (n, x0, z0, x1, z1) => {
      const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz), nseg = Math.round(len / 3);
      for (let i = 0; i <= nseg; i++)
        box('SEC_fence_post_' + n + '_' + i, M.fence_gray, 0.08, FH, 0.08, x0 + dx * i / nseg, FH / 2, z0 + dz * i / nseg, g);
      box('SEC_fence_panel_' + n, M.glass, Math.max(Math.abs(dx), 0.04), FH - 0.3, Math.max(Math.abs(dz), 0.04), x0 + dx / 2, FH / 2, z0 + dz / 2, g);
      box('SEC_pids_fiber_' + n, M.fiber_aqua, Math.max(Math.abs(dx), 0.03), 0.03, Math.max(Math.abs(dz), 0.03), x0 + dx / 2, FH - 0.2, z0 + dz / 2, g);
    };
    run('south_w', FX0, FZ0, -4, FZ0); run('south_e', 2, FZ0, FX1, FZ0);
    run('north', FX0, FZ1, FX1, FZ1); run('west', FX0, FZ0, FX0, FZ1); run('east', FX1, FZ0, FX1, FZ1);
    box('SEC_gate', M.fence_gray, 5.6, 2.0, 0.1, -1, 1.0, FZ0, g);
    for (let i = 0; i < 6; i++) cyl('SEC_hvm_bollard_' + i, M.fuel_yellow, 0.12, 0.9, -3.5 + i * 1.4, 0.45, FZ0 - 1.2, 'y', g);
    box('SEC_guard_house', M.wall, 2.2, 2.6, 2.0, 4.5, 1.3, FZ0 + 1.8, g);
    for (const [i, [x, z]] of [[FX0 + 2, FZ0 + 2], [FX1 - 2, FZ0 + 2], [FX1 - 2, FZ1 - 2], [FX0 + 2, FZ1 - 2], [-1, FZ0 + 1]].entries()) {
      cyl('SEC_cctv_pole_' + i, M.fence_gray, 0.06, 5, x, 2.5, z, 'y', g);
      box('SEC_cctv_cam_' + i, M.sec_dark, 0.12, 0.12, 0.3, x, 4.9, z, g);
      box('SEC_pole_light_' + i, M.light_bar, 0.3, 0.06, 0.12, x, 4.6, z, g);
    }
    box('SEC_mantrap_shell', M.glass, 3.2, 2.5, 1.6, -4.5, FLOOR + 1.25, 12.9, g);
    for (const [i, z] of [12.2, 13.6].entries()) {
      box('SEC_mantrap_door_' + i, M.sec_dark, 1.0, 2.2, 0.06, -4.5, FLOOR + 1.1, z, g);
      box('SEC_mantrap_reader_' + i, M.white_box, 0.06, 0.14, 0.09, -3.9, FLOOR + 1.2, z + 0.15, g);
    }
    box('SEC_biometric_facestation', M.screen, 0.18, 0.26, 0.05, -5.1, FLOOR + 1.5, 12.2, g);
  }
  for (const [i, z] of [-11.5, 11.5].entries()) {
    for (let b = 0; b < 3; b++) cyl('FA_agent_bottle_bank' + i + '_' + b, M.fire_red, 0.15, 1.4, 12.6 - b * 0.4, FLOOR + 0.7, z * 0.96);
    box('FA_epo_button_' + i, M.fire_red, 0.12, 0.12, 0.06, -6.4, FLOOR + 1.4, z * 0.9);
  }

  // ===== core IT / DCS / security room (interior, x -13..-7, z -6..8) ====
  {
    const g = new THREE.Group(); g.name = 'core_it_room'; g.position.y = FLOOR; C.add(g);
    // room shell
    box('part_itroom_e', M.wall_int, 0.15, 5, 14, -6.9, 2.5 - FLOOR + 0.25, 1.0, g);
    box('part_itroom_s', M.wall_int, 6.2, 5, 0.15, -10, 2.5 - FLOOR + 0.25, -6.0, g);
    box('part_itroom_n', M.wall_int, 6.2, 5, 0.15, -10, 2.5 - FLOOR + 0.25, 8.0, g);
    box('SEC_itroom_door', M.sec_dark, 0.06, 2.2, 1.1, -6.9, 1.1, 1.0, g);
    box('SEC_itroom_reader', M.white_box, 0.05, 0.14, 0.09, -6.78, 1.2, 1.75, g);
    box('SEC_itroom_door_contact', M.white_box, 0.05, 0.06, 0.12, -6.9, 2.25, 1.0, g);

    // server rack builder: frame + named rack units on the front face
    const srvRack = (name, x, z, units) => {
      const r = new THREE.Group(); r.name = name; r.position.set(x, 0, z); g.add(r);
      box(name + '_frame', M.frame_black, 0.6, 2.1, 1.0, 0, 1.05, 0, r);
      units.forEach(([un, m], i) => {
        const y = 1.92 - i * 0.11;
        box(un, m ?? M.compute_face, 0.5, 0.09, 0.03, 0, y, 0.49, r);
        box(un + '_led', M.led_green, 0.04, 0.012, 0.005, -0.17, y, 0.52, r);
      });
      box(name + '_pdu', M.psu_face, 0.07, 1.7, 0.07, 0.24, 1.0, -0.4, r);
      return r;
    };

    // --- row A (z = -4.0): applications, data, control, identity, monitoring
    srvRack('it_app_rack_a', -12.0, -4.0, [
      ['APP_bms_honeywell_ebi'], ['APP_hvac_desigo_cc'], ['APP_cooling_plant_mgr'], ['APP_power_epms_pme'],
    ]);
    srvRack('it_app_rack_b', -11.2, -4.0, [
      ['APP_vms_cctv_genetec'], ['APP_acs_lenels2'], ['APP_fire_graphics'], ['APP_suppression_mimic'],
    ]);
    srvRack('it_db_rack', -10.4, -4.0, [
      ['DB_sql_cluster_a', M.drive_face], ['DB_sql_cluster_b', M.drive_face],
      ['DB_historian_store', M.drive_face], ['DB_config_cmdb', M.drive_face],
    ]);
    srvRack('it_dcs_rack', -9.6, -4.0, [
      ['DCS_controller_a', M.nvsw_face], ['DCS_controller_b', M.nvsw_face],
      ['DCS_opc_ua_server', M.nvsw_face], ['DCS_engineering_ws', M.cab_gray],
    ]);
    srvRack('it_ad_rack', -8.8, -4.0, [
      ['AD_domain_controller_a'], ['AD_domain_controller_b'], ['AD_dns_dhcp'],
      ['AD_pki_ca'], ['NTP_ptp_grandmaster', M.white_box],
    ]);
    srvRack('it_sec_rack', -8.0, -4.0, [
      ['SIEM_collector', M.sec_dark], ['SIEM_indexer', M.sec_dark],
      ['SIEM_log_archive', M.drive_face], ['SOAR_automation', M.sec_dark],
    ]);

    // --- row B (z = 6.0): DMZ, historians, SCADA, backup, virtualisation, storage
    srvRack('it_dmz_rack', -12.0, 6.0, [
      ['DMZ_firewall_a', M.nvsw_face], ['DMZ_firewall_b', M.nvsw_face],
      ['DMZ_reverse_proxy'], ['DMZ_remote_access_gw'], ['DMZ_jump_host', M.cab_gray],
    ]);
    srvRack('it_hist_rack', -11.2, 6.0, [
      ['HIST_ot_primary', M.drive_face], ['HIST_ot_standby', M.drive_face], ['HIST_scada_archive', M.drive_face],
    ]);
    srvRack('it_scada_rack', -10.4, 6.0, [
      ['SCADA_server_a', M.nvsw_face], ['SCADA_server_b', M.nvsw_face], ['SCADA_hmi_station', M.cab_gray],
    ]);
    srvRack('it_backup_rack', -9.6, 6.0, [
      ['BKP_backup_server', M.drive_face], ['BKP_dedupe_appliance', M.drive_face], ['BKP_tape_library', M.cab_gray],
    ]);
    srvRack('it_virt_rack', -8.8, 6.0, [
      ['VIRT_host_01'], ['VIRT_host_02'], ['VIRT_host_03'],
    ]);
    srvRack('it_stor_rack', -8.0, 6.0, [
      ['STOR_san_controller_a', M.drive_face], ['STOR_san_controller_b', M.drive_face], ['STOR_shelf_01', M.drive_face],
    ]);

    // in-room cooling + power for the IT room
    box('AIR_itroom_crac', M.cab_light, 0.8, 2.2, 0.9, -12.6, 1.1, 1.0, g);
    box('BMS_itroom_crac_ctl', M.white_box, 0.18, 0.26, 0.06, -12.6, 1.85, 1.5, g);
    box('PWR_itroom_pdu', M.cab_gray, 0.7, 2.0, 0.5, -12.6, 1.0, -2.0, g);
  }

  // ===== internet demarcation + external cloud ==========================
  {
    const g = new THREE.Group(); g.name = 'internet_demarc'; C.add(g);
    // north and south demarcs: physically separated carrier terminations
    for (const [nm, z] of [['north', 11.6], ['south', -11.6]]) {
      const b = 'DATA_demarc_' + nm;
      box(b, M.cab_gray, 0.7, 2.0, 0.6, -5.6, FLOOR + 1.0, z, g);
      box(b + '_ont', M.nvsw_face, 0.5, 0.09, 0.03, -5.6, FLOOR + 1.7, z + 0.31, g);
      box(b + '_csu_dsu', M.nvsw_face, 0.5, 0.09, 0.03, -5.6, FLOOR + 1.55, z + 0.31, g);
      box(b + '_led', M.led_green, 0.04, 0.012, 0.005, -5.78, FLOOR + 1.7, z + 0.33, g);
    }
    // internet / cloud, drawn outside the perimeter as an external 3D Cloud
    const cloudGroup = new THREE.Group();
    cloudGroup.name = 'DATA_internet_cloud';
    cloudGroup.position.set(0, 9.5, -26);
    const puffs = [
      { r: 1.8, x: 0, y: 0, z: 0, sx: 1.35, sy: 0.85, sz: 1.1 },
      { r: 1.35, x: -1.8, y: -0.2, z: 0.1, sx: 1.15, sy: 0.8, sz: 0.95 },
      { r: 1.45, x: 1.8, y: -0.15, z: -0.1, sx: 1.15, sy: 0.8, sz: 0.95 },
      { r: 1.0, x: -2.9, y: -0.45, z: 0.2, sx: 1.0, sy: 0.65, sz: 0.85 },
      { r: 1.05, x: 2.9, y: -0.4, z: 0.1, sx: 1.0, sy: 0.7, sz: 0.85 },
      { r: 1.25, x: 0.4, y: 0.9, z: -0.1, sx: 1.15, sy: 0.85, sz: 0.9 },
      { r: 1.0, x: -1.1, y: 0.75, z: 0.15, sx: 1.05, sy: 0.8, sz: 0.85 }
    ];
    const sphGeo = new THREE.SphereGeometry(1, 16, 12);
    puffs.forEach((p, idx) => {
      const m = new THREE.Mesh(sphGeo, M.glass);
      m.name = `DATA_internet_cloud_puff_${idx}`;
      m.position.set(p.x, p.y, p.z);
      m.scale.set(p.r * p.sx, p.r * p.sy, p.r * p.sz);
      cloudGroup.add(m);
    });
    g.add(cloudGroup);
    box('DATA_internet_cloud_label', M.white_box, 2.4, 0.5, 0.06, 0, 8.2, -24.45, g);
    pipe('DATA_isp_path_north', M.fiber_aqua, 0.05,
      [[0, 9.5, -26], [0, 6.0, -24], [-5.6, 6.0, -20], [-5.6, 4.6, 13.6], [-5.6, 2.0, 12.0]], g);
    pipe('DATA_isp_path_south', M.fiber_aqua, 0.05,
      [[0, 9.5, -26], [0, 6.0, -24], [-5.6, 6.0, -20], [-5.6, 4.6, -13.6], [-5.6, 2.0, -12.0]], g);
  }

  // ===== hall cameras + door contacts ===================================
  {
    const g = new THREE.Group(); g.name = 'hall_security'; C.add(g);
    let ci = 0;
    for (const z of [-9, -1.8, 9]) for (const x of [-4.5, 1.3, 7.0]) {
      const n = 'SEC_hall_cam_' + ci;
      box(n, M.sec_dark, 0.12, 0.12, 0.28, x, 4.45, z, g);
      box(n + '_mount', M.fence_gray, 0.05, 0.18, 0.05, x, 4.62, z, g);
      box(n + '_led', M.led_green, 0.02, 0.02, 0.02, x, 4.45, z + 0.15, g);
      ci++;
    }
    // door contacts on every controlled opening
    const doors = [['mantrap', -4.5, 12.2], ['hall_west', -6.4, 1.0], ['mv_room', -13.0, -8.0],
                   ['battery_room', -13.0, 6.0], ['chiller_room', -7.0, -8.0]];
    for (const [nm, x, z] of doors) {
      box('SEC_door_contact_' + nm, M.white_box, 0.05, 0.06, 0.12, x, FLOOR + 2.25, z, g);
      box('SEC_door_rex_' + nm, M.white_box, 0.05, 0.10, 0.06, x, FLOOR + 1.2, z + 0.4, g);
    }
  }

  // ===== additional VFDs + fuel handling ================================
  {
    const g = new THREE.Group(); g.name = 'plant_drives'; g.position.y = FLOOR; C.add(g);
    for (const [i, z] of [-7.4, -6.6].entries())
      cab('AIR_crah_vfd_' + i, M.sec_dark, 0.35, 1.1, 0.3, -12.6, z, g, true);
    for (const [i, z] of [-11.6, -10.9].entries())
      cab('CHW_tower_fan_vfd_' + i, M.sec_dark, 0.35, 1.1, 0.3, -8.6, z, g, true);
    box('PWR_fuel_polishing_skid', M.fuel_yellow, 0.9, 1.0, 0.7, -21.0, 0.5 - FLOOR + 0.2, 11.5, g);
    box('BMS_fuel_level_ctl', M.white_box, 0.2, 0.28, 0.07, -21.0, 1.5 - FLOOR + 0.2, 11.9, g);
  }

  // ===== reception, security office, guest access (north entry) =========
  {
    const g = new THREE.Group(); g.name = 'reception_security'; g.position.y = FLOOR; C.add(g);
    box('part_reception_s', M.wall_int, 9.0, 3.2, 0.15, -1.0, 1.6, 10.4, g);
    box('part_secoff_e', M.wall_int, 0.15, 3.2, 1.8, -0.6, 1.6, 11.3, g);

    const desk = (n, x, z, w) => {
      box(n + '_desk', M.cab_light, w, 0.06, 0.8, x, 0.75, z, g);
      for (const s of [-1, 1]) box(n + '_leg' + (s > 0 ? '_r' : '_l'), M.sec_dark, 0.05, 0.72, 0.05, x + s * (w / 2 - 0.1), 0.36, z, g);
    };
    const workstation = (n, x, z, screens) => {
      for (let i = 0; i < screens; i++) {
        const sx = x + (i - (screens - 1) / 2) * 0.58;
        box(n + '_monitor_' + i, M.screen, 0.52, 0.32, 0.03, sx, 1.12, z - 0.22, g);
        box(n + '_stand_' + i, M.sec_dark, 0.05, 0.22, 0.05, sx, 0.92, z - 0.22, g);
      }
      box(n, M.cab_gray, 0.18, 0.42, 0.42, x + 0.55, 0.96, z + 0.15, g);   // the PC itself
      box(n + '_led', M.led_green, 0.03, 0.012, 0.005, x + 0.55, 1.13, z + 0.36, g);
    };

    // --- security officer's office (west of the entry) ---
    desk('secoff', -2.4, 11.3, 2.4);
    workstation('SEC_officer_workstation', -3.0, 11.3, 2);
    workstation('SEC_cctv_view_workstation', -1.5, 11.3, 3);
    box('SEC_badge_encoder', M.white_box, 0.22, 0.12, 0.16, -2.4, 0.84, 11.65, g);
    box('SEC_badge_encoder_led', M.led_amber, 0.03, 0.02, 0.01, -2.4, 0.9, 11.74, g);
    box('SEC_cctv_nvr', M.drive_face, 0.6, 1.4, 0.8, -4.4, 0.7, 11.4, g);
    for (let i = 0; i < 3; i++)
      box('SEC_cctv_nvr_shelf_' + i, M.frame_black, 0.5, 0.1, 0.03, -4.4, 1.15 - i * 0.16, 11.81, g);

    // --- reception / greeter position (east of the entry) ---
    desk('greeter', 1.4, 11.3, 2.6);
    workstation('SEC_greeter_workstation', 1.0, 11.3, 2);
    box('SEC_greeter_badge_reader', M.white_box, 0.06, 0.14, 0.09, 2.9, 1.2, 10.45, g);
    box('SEC_greeter_badge_reader_led', M.led_green, 0.02, 0.02, 0.095, 2.9, 1.3, 10.45, g);
    box('SEC_greeter_turnstile', M.fence_gray, 0.9, 1.0, 0.18, 3.5, 0.5, 10.45, g);

    // --- guest self sign-in kiosk ---
    box('SEC_guest_kiosk', M.sec_dark, 0.5, 1.4, 0.4, 4.6, 0.7, 11.6, g);
    box('SEC_guest_kiosk_screen', M.screen, 0.4, 0.55, 0.03, 4.6, 1.2, 11.39, g);
    box('SEC_guest_kiosk_reader', M.white_box, 0.12, 0.06, 0.08, 4.6, 0.82, 11.39, g);

    // --- guest wireless: dedicated AP + captive-portal firewall ---
    cyl('DATA_guest_wap', M.white_box, 0.11, 0.04, 1.0, 3.0 - FLOOR, 11.6, 'y', g);
    box('DATA_guest_wap_led', M.led_amber, 0.03, 0.01, 0.03, 1.0, 2.97 - FLOOR, 11.6, g);
    cab('DATA_guest_network_cabinet', M.cab_gray, 0.6, 1.8, 0.5, -5.2, 10.9, g, true);
    box('DATA_guest_captive_portal_fw', M.nvsw_face, 0.5, 0.08, 0.03, -5.2, 1.45, 11.16, g);
    box('DATA_guest_vlan_switch', M.nvsw_face, 0.5, 0.08, 0.03, -5.2, 1.28, 11.16, g);
  }

  // ===== engineering workstation in the core IT room =====================
  {
    const g = new THREE.Group(); g.name = 'eng_workstation'; g.position.y = FLOOR; C.add(g);
    box('eng_ws_desk', M.cab_light, 1.8, 0.06, 0.8, -12.0, 0.75, 2.6, g);
    for (const s of [-1, 1]) box('eng_ws_leg' + (s > 0 ? '_r' : '_l'), M.sec_dark, 0.05, 0.72, 0.05, -12.0 + s * 0.8, 0.36, 2.6, g);
    for (let i = 0; i < 2; i++) {
      box('eng_ws_monitor_' + i, M.screen, 0.52, 0.32, 0.03, -12.3 + i * 0.58, 1.12, 2.38, g);
      box('eng_ws_stand_' + i, M.sec_dark, 0.05, 0.22, 0.05, -12.3 + i * 0.58, 0.92, 2.38, g);
    }
    box('DCS_engineering_workstation_pc', M.cab_gray, 0.18, 0.42, 0.42, -11.3, 0.96, 2.75, g);
    box('DCS_engineering_workstation_pc_led', M.led_green, 0.03, 0.012, 0.005, -11.3, 1.13, 2.96, g);
  }

  const bb = new THREE.Box3().setFromObject(C);
  C.position.y = -bb.min.y;
  C.updateMatrixWorld(true);

  return { group: C, materials: M, graph: buildGraph(THREE, C) };
}


export const ZONES = {
  Z0: { label: 'Z0 / Zone 4 — Enterprise IT',        purdue: 'L4-L5',        slt: 'SL-T 2',   color: 0x9ba1a8 },
  Z1: { label: 'Z1 / Zone 3 — DCIM / IDMZ',          purdue: 'L3-L3.5',      slt: 'SL-T 2-3', color: 0x35c2c9 },
  Z2: { label: 'Z2 / Zone 2 — Supervisory control',  purdue: 'L2',           slt: 'SL-T 2-3', color: 0x8a4fd0 },
  Z3: { label: 'Z3 / Zone 1 — Field device',         purdue: 'L0-L1',        slt: 'SL-T 1-2', color: 0xd8b23a },
  Z4: { label: 'Z4 — Safety instrumented (SIS)',     purdue: 'isolated SIS', slt: 'SL-T 2-3', color: 0xc8332a },
  Z5: { label: 'Z5 — Out-of-band / jump',            purdue: 'DMZ segment',  slt: 'SL-T 3',   color: 0xe07a26 },
};

// ======================================================================
// Connection graph — IEC 62443 zone/conduit model
// ======================================================================
function buildGraph(THREE, root) {
  const byName = new Map();
  root.traverse(o => { if (o.name && !byName.has(o.name)) byName.set(o.name, o); });

  const nodes = {}, edges = [], missing = [];
  // N(id, label, kind, system, room, mesh, opts)
  //   opts: zone, purdue, slt, vendor, standards, attrs{}, surface[]
  const cellOf = (mesh, o) => {
    if (o.cell) return o.cell;
    const m = /row0([1-6])/.exec(mesh);
    if (m) return +m[1] <= 3 ? 'Cell A' : 'Cell B';
    if (/cellA/.test(mesh)) return 'Cell A';
    if (/cellB/.test(mesh)) return 'Cell B';
    return 'Campus (shared)';
  };
  const N = (id, label, kind, system, room, mesh, o = {}) => {
    const obj = byName.get(mesh);
    if (!obj) { missing.push(mesh); return; }
    nodes[id] = { id, label, kind, system, room, mesh, obj, cell: cellOf(mesh, o),
      zone: o.zone || null, purdue: o.purdue || null, slt: o.slt || null,
      vendor: o.vendor || null, standards: o.standards || null,
      attrs: o.attrs || {}, surface: o.surface || [],
      anchor: new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3()) };
  };
  // E(from, to, service, protocol, label, geom, opts)
  //   opts: critical (62443-3-2 §5.6 documented conduit), oneway, cross ('Z4 → Z2'), note
  const E = (from, to, service, protocol, label, geom, o = {}) => {
    edges.push({ id: 'e' + edges.length, from, to, service, protocol, label, geom,
      critical: !!o.critical, oneway: !!o.oneway, cross: o.cross || null, note: o.note || null });
  };

  // ==================== Z3/Z2 — electrical power chain ====================
  N('grid','Utility grid intake','HV overhead termination','PWR','West yard','PWR_sub_beam_0',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'Utility / TSO', standards:'IEC 61850',
      attrs:{ voltage:'150 kV', redundancy:'dual utility feed (Tier IV)' },
      surface:['Utility interface is outside the operator security perimeter — treat as untrusted source.'] });
  N('gis','GIS switchgear','Gas-insulated switchgear','PWR','West yard','PWR_sub_gis',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Hitachi Energy / Siemens Energy', standards:'IEC 62443-4-2, IEC 61850',
      attrs:{ voltage:'150 kV', lead_time:'12+ months' },
      surface:['Protection IEDs report to Z2 via IEC 61850 MMS — one documented conduit.'] });
  N('pad_xfmr','Pad-mount transformer','HV/MV transformer','PWR','West yard','PWR_sub_pad_xfmr',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'ABB / SPX', standards:'IEC 62443-4-2',
      attrs:{ ratio:'150 / 33 kV', rating:'50-100 MVA' },
      surface:['Winding temperature monitor and Buchholz relay are Z3 field instruments.'] });
  N('mv_swg','MV switchgear ZX2','MV switchgear','PWR','MV room','PWR_mv_swg_hitachi_zx2',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Hitachi Energy ZX2', standards:'IEC 62443-4-2, IEC 61850',
      attrs:{ voltage:'33 kV', topology:'dual-bus' },
      surface:['Relay IEDs form a Z3 sub-zone; station bus interface to Z2 must be explicitly documented.'] });
  N('mv_swg_b','MV switchgear PASS (B lineup)','MV switchgear','PWR','MV room','PWR_mv_swg_abb_pass',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'ABB PASS', standards:'IEC 62443-4-2',
      attrs:{ role:'redundant lineup' } });
  N('relay','Protection relay SEL-751A','Protection relay IED','PWR','MV room','PWR_relay_sel751a',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'Schweitzer SEL-751A', standards:'IEC 61850 Ed.2, IEC 62443-4-2',
      attrs:{ function:'fault detection, isolation, auto-switching' },
      surface:['GOOSE on the process bus is unauthenticated by default — segment and disable unused ports.',
               'Engineering access (DIGSI/AcSELerator class tooling) must route through the Z5 jump host.'] });
  N('relay_b','Protection relay Easergy P3','Protection relay IED','PWR','MV room','PWR_relay_easergy_p3',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'Schneider Easergy P3', standards:'IEC 61850' });
  N('xfmr','Dry transformer RESIBLOC','MV/LV transformer','PWR','MV room','PWR_xfmr_abb_resibloc',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'ABB RESIBLOC', standards:'IEC 62443-4-2',
      attrs:{ ratio:'33 / 0.4 kV', type:'cast-resin (indoor mandatory)' } });
  N('xfmr_b','Dry transformer Trihal','MV/LV transformer','PWR','MV room','PWR_xfmr_se_trihal',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'Schneider Trihal', attrs:{ role:'B feed' } });
  N('lv_swg','LV switchgear','LV switchboard','PWR','LV/UPS room','PWR_lv_swg_eaton_prl',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Eaton Pow-R-Line', standards:'IEC 62443-3-3',
      attrs:{ voltage:'400 V', architecture:'dual LV board per pod' },
      surface:['Firmware-capable "smart" breakers are elevated OT attack surface — dedicated VLAN required.'] });
  N('ats','ATS (Magnum)','Automatic transfer switch','PWR','LV/UPS room','PWR_ats_eaton_magnum',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'Eaton Magnum', standards:'IEC 62443-4-2, NFPA 110',
      attrs:{ transfer_time:'60-100 ms electromechanical' },
      surface:['Ethernet-capable transfer controllers require a dedicated management VLAN.'] });
  N('ats_b','ATS (ASCO 7000)','Automatic transfer switch','PWR','LV/UPS room','PWR_ats_asco7000',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'ASCO 7000 series', attrs:{ role:'B path' } });
  N('sts','STS2 static transfer switch','Static transfer switch','PWR','LV/UPS room','PWR_sts_vertiv_sts2',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'Vertiv STS2',
      attrs:{ transfer_time:'<4 ms thyristor', topology:'N+2C catcher (Tier III+)' } });
  N('ups','UPS 9395XR','Modular double-conversion UPS','PWR','LV/UPS room','PWR_ups_eaton_9395xr',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Eaton 9395XR', standards:'IEC 62443-4-2 SL2',
      attrs:{ ride_through:'5-15 min', redundancy:'2N+1 (Tier IV)' },
      surface:['Network management card exposes SNMP, Modbus TCP and a web UI — isolate in a UPS management VLAN.',
               'Microsoft OCP mandate applies directly to UPS network cards.',
               'Vendor cloud service portal is a Z2 \u2192 external conduit and must transit the Z1 DMZ.'] });
  N('ups_b','UPS Galaxy VXL','Modular UPS','PWR','LV/UPS room','PWR_ups_galaxy_vxl',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Schneider Galaxy VXL', attrs:{ role:'B path' } });
  N('ups_c','UPS Liebert EXL','Modular UPS','PWR','LV/UPS room','PWR_ups_vertiv_exl',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Vertiv Liebert EXL S1' });
  N('ups_d','UPS MegaFlex','Modular UPS','PWR','LV/UPS room','PWR_ups_abb_megaflex',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'ABB MegaFlex' });
  N('epms','EPMS meter ION9000','Revenue-grade power meter','PWR','LV/UPS room','PWR_epms_ion9000',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Schneider PowerLogic ION9000', standards:'IEC 62053-22 Class 0.2S',
      attrs:{ class:'Class A power quality', protocols:'OPC UA, DNP3, IEC 61850, Modbus TCP' },
      surface:['EPMS SCADA must be segmented from IT by firewall or unidirectional gateway.',
               'Each supported protocol is a separate conduit requiring its own documentation.'] });
  N('battery','Battery string 1','VRLA string + monitoring','PWR','Battery room','PWR_battery_string_0',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'EnerSys DataSafe', standards:'NFPA 855',
      attrs:{ runtime:'5 min at full load', monitoring:'per-cell V, T, ohmic' },
      surface:['Battery monitoring head-end (Alb\u00e9r / BTECH class) is a Z2 asset; sensing units are Z3.',
               'Uptime and NERC CIP auditors require 2-year data retention.'] });
  N('battery_b','Battery string 2','VRLA string','PWR','Battery room','PWR_battery_string_1',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'EnerSys', attrs:{ role:'B path' } });
  N('rpp','RPP 1 (with BCMS)','Remote power panel','PWR','LV/UPS room','PWR_rpp_0',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Schneider / Square D', standards:'ASHRAE TC 9.9',
      attrs:{ poles:'42-84', metering:'branch circuit monitoring' },
      surface:['Metered RPPs sit on the Z3/Z2 boundary — BCMS aggregation is Z2, DCIM dashboard is Z1.'] });
  N('rpp_b','RPP 2','Remote power panel','PWR','LV/UPS room','PWR_rpp_1',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', attrs:{ role:'B bus' } });
  N('gen','Generator CAT 3516C','Diesel generator','PWR','West yard','PWR_gen_cat_3516c',
    { zone:'Z3', purdue:'L1', slt:'SL-T 1-2', vendor:'Caterpillar 3516C', standards:'NFPA 110 Type 10',
      attrs:{ rating:'2-3 MW', start:'10 s to load' },
      surface:['Engine ECM/ECU is Z3; SAE J1939 gateways need explicit zone assignment.'] });
  N('gen_b','Generator QSK60','Diesel generator','PWR','West yard','PWR_gen_cummins_qsk60',
    { zone:'Z3', purdue:'L1', slt:'SL-T 1-2', vendor:'Cummins QSK60' });
  N('gen_c','Generator KD series','Diesel generator','PWR','West yard','PWR_gen_kohler_kd',
    { zone:'Z3', purdue:'L1', slt:'SL-T 1-2', vendor:'Kohler KD' });
  N('gen_ctl','Generator paralleling control','Genset controller / PLC','BMS','West yard','BMS_gen_cat_3516c_ctl_easygen',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Woodward easYgen', standards:'IEC 62443-4-2',
      attrs:{ functions:'sync-on-close, load share, islanding detection' },
      surface:['Highest-value Z2 electrical target — holds authority over generation dispatch.',
               'Supports Modbus TCP, IEC 60870-5-101/104 and SNMP; each is a separate conduit.'] });
  N('daytank','Generator day tank','Fuel day tank','PWR','West yard','PWR_gen_cat_3516c_daytank',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', attrs:{ instrument:'level sensor to BMS' } });
  N('fuel_tank','Bulk fuel tank','Fuel storage','PWR','West yard','PWR_fuel_bulk_tank',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', attrs:{ capacity:'48 h at full load' } });
  N('bess','BESS Megapack','Battery energy storage','PWR','West yard','PWR_bess_tesla_megapack',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 2', vendor:'Tesla Megapack (LFP)', standards:'NFPA 855',
      attrs:{ capacity:'3.9-5.6 MWh/unit' },
      surface:['PCS/inverter speaking DNP3 or IEC 61850 is a high-risk conduit endpoint.',
               'Li-ion deployment mandates off-gas detection.'] });
  N('bess_b','BESS (B bank)','Battery energy storage','PWR','West yard','PWR_bess_vertiv_bess',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 2', vendor:'Vertiv' });
  N('bess_bms','BESS controller / microgrid','Battery mgmt + microgrid ctl','BMS','West yard','BMS_bess_tesla_megapack_bms',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3', vendor:'Tesla / Schneider EcoStruxure MGC', standards:'IEEE 2030.7, NERC CIP (if above BES threshold)',
      attrs:{ functions:'dispatch, frequency/voltage regulation, islanding' },
      surface:['Microgrid controller holds authority over all on-site generation — highest-value Z2 asset.',
               'Grid-operator interface (IEEE 2030.7 / DNP3) is a priority Z2 \u2192 external conduit.'] });
  N('busway_b','Cell B busway spine','Busway / bus duct','PWR','Data hall','PWR_cellB_busway_spine',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'Starline / Eaton Pow-R-Way III', cell:'Cell B',
      attrs:{ rating:'up to 1250 A', scope:'row04-row06 (24 racks per bus, 2N)' },
      surface:['Cell-bounded busway — a loss here does not reach Cell A.'] });
  N('busway','Cell A busway spine','Busway / bus duct','PWR','Data hall','PWR_cellA_busway_spine',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'Starline / Eaton Pow-R-Way III', cell:'Cell A',
      attrs:{ rating:'up to 1250 A', ingress:'IP54 (liquid-cooled halls)' },
      surface:['Critical Power Monitor over Modbus TCP is a Z3 \u2192 Z2 conduit.'] });
  N('row1_tap','Row 01 tap-off box 1','Plug-in tap-off box','PWR','Data hall','PWR_row01_tapbox_0',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1' });
  N('rack1_busbar','Rack 01 DC busbar','OCP 48 V busbar','PWR','Data hall','row01_rack01_busbar',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', standards:'OCP Open Rack v3' });
  N('rack1_psu','Rack 01 power shelf','OCP power shelf','PWR','Data hall','row01_rack01_power_shelf_0',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2', standards:'OCP S.A.F.E., IEC 62443-4-2',
      attrs:{ psus:'6 hot-swap, N+1' },
      surface:['Shelf controller firmware is an OCP S.A.F.E. scope item.',
               'A malicious PSU firmware image produces correlated failure across every row.'] });

  // ==================== Z2/Z3 — mechanical & cooling ======================
  N('tower','Cooling tower BAC 3000','Open-circuit cooling tower','CHW','East yard','CHW_tower_bac3000_0',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Baltimore Aircoil', standards:'ASHRAE 188',
      attrs:{ instruments:'basin level, conductivity, fan VFD' },
      surface:['Chemical dosing wireless links are conduits — isolate and document.',
               'Legionella water management plan legally required (ASHRAE 188).'] });
  N('tower_b','Cooling tower 2','Open-circuit cooling tower','CHW','East yard','CHW_tower_bac3000_1',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Baltimore Aircoil' });
  N('chiller','Chiller 30XW','Water-cooled centrifugal chiller','CHW','Central facility (shared)','CHW_chiller_carrier_30xw',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Carrier AquaEdge 30XW', standards:'IEC 62443, ASHRAE 15',
      attrs:{ supply:'7 \u00b0C', return:'12-14 \u00b0C', redundancy:'N+1 (T3) / 2N (T4)' },
      surface:['OEM cloud diagnostics is a Z2 \u2192 external conduit and must transit the Z1 DMZ.',
               'Facility compromise causes thermal shutdown of the IT load — treat as safety-adjacent.'] });
  N('chiller_b','Chiller CenTraVac','Water-cooled chiller','CHW','Central facility (shared)','CHW_chiller_trane_cvhf',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Trane CenTraVac' });
  N('chiller_c','Chiller YZ magnetic-bearing','Water-cooled chiller','CHW','Central facility (shared)','CHW_chiller_york_yz',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'York / JCI YZ', attrs:{ efficiency:'COP 6-8 at part load' } });
  N('chiller_ctl','Chiller facility controller','Unit controller','BMS','Central facility (shared)','BMS_chiller_carrier_30xw_optiview',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Carrier OptiView', standards:'IEC 62443-4-2',
      surface:['Holds setpoint authority over the whole thermal chain.'] });
  N('pump','Primary CHW pump 1','Centrifugal pump','CHW','Central facility (shared)','CHW_pump_grundfos_0',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'Grundfos', standards:'ASHRAE TC 9.9' });
  N('pump_b','Primary CHW pump 2','Centrifugal pump','CHW','Central facility (shared)','CHW_pump_grundfos_1',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', vendor:'Grundfos', attrs:{ role:'N+1' } });
  N('vfd','Pump VFD ACQ580','Variable frequency drive','CHW','Central facility (shared)','CHW_vfd_abb_acq580_0',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2', vendor:'ABB ACQ580', standards:'IEC 62443-4-2',
      attrs:{ saving:'30-60 % vs constant speed' },
      surface:['Drives with Modbus RTU/TCP or PROFINET carry direct control authority over flow.'] });
  N('vfd_b','Pump VFD 2','Variable frequency drive','CHW','Central facility (shared)','CHW_vfd_abb_acq580_1',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2', vendor:'ABB ACQ580' });
  N('wts_plc','Water treatment PLC','PLC','BMS','Central facility (shared)','BMS_wts_plc_s71200',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2-3', vendor:'Siemens S7-1200', standards:'IEC 62443-4-1, IEC 62443-4-2, ASHRAE 188',
      attrs:{ duty:'biocide, scale, pH/ORP, blowdown' },
      surface:['Target for firmware security validation to reach SL-3/4.',
               'TCS loop resistivity >1 M\u03a9\u00b7cm required for bare-copper direct-to-chip cooling.'] });
  N('drycooler','Dry cooler / adiabatic economiser','Dry fluid cooler','CHW','East yard','CHW_drycooler_0',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Evapco eco-Air / G\u00fcntner',
      attrs:{ water_saving:'~95 % vs evaporative' } });
  N('drycooler_b','Dry cooler 2','Dry fluid cooler','CHW','East yard','CHW_drycooler_1',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2', vendor:'Evapco' });
  N('fws_spine','Facility water spine (FWS)','Primary header','CHW','Data hall','CHW_fws_supply_spine',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', standards:'ASHRAE TC 9.9 Liquid Cooling',
      attrs:{ dT:'6 K', loop:'facility water system' } });
  N('rack1_compute','Rack 01 compute tray','GPU compute tray','IT','Data hall','row01_rack01_compute_tray_0',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', vendor:'AMD / Intel / NVIDIA silicon',
      standards:'OCP S.A.F.E., IEC 62443-4-1, TCG TPM 2.0, Caliptra',
      attrs:{ local_storage:'E1.S NVMe', fabric:'OSFP backend NIC' },
      surface:['BMC (OpenBMC class) is an embedded control plane with its own network path.',
               'BIOS/firmware and DPU/SmartNIC images are ICS supply-chain scope under IEC 62443-2-4.',
               'TPM / root-of-trust (Caliptra) anchors measured boot.'] });
  N('rack1_storage','Rack 01 storage node','NVMe storage node','IT','Data hall','row01_rack01_storage_node_0',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', vendor:'SK hynix / Samsung / Dell',
      standards:'OCP S.A.F.E., FIPS 140-3, Caliptra', attrs:{ bays:'24 \u00d7 E3.S' } });
  N('rack1_mgmt','Rack 01 management tray','BMC aggregation','IT','Data hall','row01_rack01_mgmt_tray_0',
    { zone:'Z5', purdue:'L3.5', slt:'SL-T 3', standards:'OCP S.A.F.E.',
      surface:['Out-of-band management plane — must sit on an isolated OOB VLAN reachable only via the jump host.'] });

  // ==================== Z2/Z3 — air side ==================================
  N('ahu','Outdoor AHU','Air handling unit','AIR','East yard','AIR_ahu_outdoor',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2', vendor:'Munters / Nortek', standards:'ASHRAE TC 9.9',
      attrs:{ filtration:'MERV 11+ for economiser air' } });
  N('crah','CRAH 1','Computer room air handler','AIR','Data hall','AIR_crah_0',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Vertiv Liebert / Stulz CyberAir', standards:'IEC 62443, ASHRAE TC 9.9',
      attrs:{ fans:'EC plug fans', redundancy:'N+1 per room (T3)' },
      surface:['Vendor remote service portal (iCOM / SiteController class) is a Z2 \u2192 external conduit.'] });
  N('crah_b','CRAH 2','Computer room air handler','AIR','Data hall','AIR_crah_1',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Vertiv Liebert' });
  N('crah_c','CRAH 3','Computer room air handler','AIR','Data hall','AIR_crah_2',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Stulz' });
  N('crah_ctl','CRAH 1 controller','Unit controller','BMS','Data hall','BMS_crah_0_ctl',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2', vendor:'Vertiv iCOM', standards:'IEC 62443-4-2',
      surface:['Receives the fire-alarm HVAC shutdown interlock — verify it cannot be defeated from the network.'] });
  N('h2_fan','Battery room H2 exhaust','Emergency exhaust fan','AIR','Battery room','AIR_batt_h2_exhaust_fan',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 2', standards:'NFPA 855',
      surface:['Ventilation start is a safety function — interlocked at the starter, not operator-overridable.'] });
  N('h2_sensor','Battery room H2 detector','Gas detector','BMS','Battery room','BMS_batt_h2_sensor',
    { zone:'Z3', purdue:'L0', slt:'SL-T 2', vendor:'Honeywell Analytics / Li-ion Tamer',
      standards:'NFPA 855', attrs:{ alarm:'1 % LEL' },
      surface:['Off-gas detection is mandatory wherever Li-ion UPS or BESS is deployed.'] });

  // ==================== Z4 — safety instrumented systems ==================
  N('facp','Fire alarm panel','Addressable FACP (SIS)','FA','NOC','FA_facp_sinteso_fc2080',
    { zone:'Z4', purdue:'SIS (isolated)', slt:'SL-T 2-3', vendor:'Siemens FC2080 / Notifier NFS2',
      standards:'NFPA 72, TIA-942-C \u00a76, IEC 62443',
      attrs:{ loop:'addressable SLC ring' },
      surface:['Z4 must be isolated from all other zones; supervisory output to Z2 is one-way only.',
               'Panel \u2192 central station is a Z4 \u2192 external conduit (listed supervising station).'] });
  N('bottles','Agent bottle bank','Clean-agent cylinders','FA','Data hall','FA_agent_bottle_bank0_0',
    { zone:'Z4', purdue:'SIS', slt:'SL-T 2-3', vendor:'Kidde / Ansul', standards:'NFPA 2001',
      attrs:{ agent:'inert gas (IG-541 class)', abort:'15-30 s pre-discharge' } });
  N('epo','EPO station','Emergency power off','FA','Data hall','FA_epo_button_0',
    { zone:'Z4', purdue:'SIS', slt:'SL-T 2-3', standards:'NFPA 70 / NFPA 75',
      surface:['Hard-wired safety circuit — must not be reachable from any network.'] });

  // ==================== Z0/Z1 — IT network ================================
  N('carrier_a','Carrier entry A','OSP duct bank / MMR entry','DATA','MMR','DATA_carrier_entry_0',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2', standards:'TIA-942',
      attrs:{ fibre:'single-mode', diversity:'physically separate path from entry B' } });
  N('isp_a','ISP router A','Carrier edge router','DATA','MMR','DATA_isp_router_a',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2', vendor:'Cisco / Arista', standards:'IEC 62443-4-2' });
  N('isp_b','ISP router B','Carrier edge router','DATA','MMR','DATA_isp_router_b',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2', vendor:'Cisco / Arista', attrs:{ role:'diverse carrier' } });
  N('ddos_a','DDoS scrubber A','Security appliance','DATA','MMR','DATA_ddos_appliance_a',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2', vendor:'Fortinet / Arbor class' });
  N('ddos_b','DDoS scrubber B','Security appliance','DATA','MMR','DATA_ddos_appliance_b',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2' });
  N('wan_a','WAN ingress A','WAN aggregation','DATA','MMR','DATA_wan_ingress_a',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2' });
  N('fw_a','Perimeter firewall A','Next-gen firewall','DATA','MMR','DATA_fw_paloalto_pa7000_a',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2-3', vendor:'Palo Alto PA-7000', standards:'IEC 62443-4-2',
      attrs:{ pairing:'active/active HA' },
      surface:['Network boundary protection: the enterprise-side control on every IT \u2194 OT crossing.'] });
  N('fw_b','Perimeter firewall B','Next-gen firewall','DATA','MMR','DATA_fw_paloalto_pa7000_b',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2-3', vendor:'Palo Alto PA-7000' });
  N('dmz_sw','DMZ switch','Switch','DATA','MMR','DATA_dmz_switch',
    { zone:'Z1', purdue:'L3.5', slt:'SL-T 2-3', standards:'IEC 62443-4-2',
      surface:['IDMZ is the most security-critical architectural element in the facility.'] });
  N('spine_a','Core spine A','Spine switch','DATA','MMR','DATA_core_spine_arista7800_a',
    { zone:'Z0', purdue:'L4-L5', slt:'SL-T 2', vendor:'Arista 7800', standards:'IEC 62443-4-2, OCP S.A.F.E.',
      attrs:{ fabric:'400G' } });
  N('spine_b','Core spine B','Spine switch','DATA','MMR','DATA_core_spine_arista7800_b',
    { zone:'Z0', purdue:'L4-L5', slt:'SL-T 2', vendor:'Arista 7800' });
  N('leaf_a','Leaf aggregation A','Leaf switch','DATA','MMR','DATA_leaf_agg_a',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', vendor:'Arista / Cisco' });
  N('leaf_b','Leaf aggregation B','Leaf switch','DATA','MMR','DATA_leaf_agg_b',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('fiber_spine','Hall fibre spine','Fibre trunk','DATA','Data hall','DATA_hall_fiber_spine',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', standards:'TIA-942' });
  N('row1_patch','Row 01 patch panel','Structured cabling','DATA','Data hall','DATA_row01_eor_rack_patch_panel',
    { zone:'Z0', purdue:'L4', slt:'SL-T 1', standards:'TIA-942' });
  N('row1_tor','Row 01 rack 01 ToR A','Top-of-rack switch','DATA','Data hall','row01_rack01_tor_switch_0',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', vendor:'Arista / Cisco', attrs:{ uplink:'2 \u00d7 100G' } });
  N('row1_tor_b','Row 01 rack 01 ToR B','Top-of-rack switch','DATA','Data hall','row01_rack01_tor_switch_1',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', attrs:{ role:'redundant' } });
  N('jumpbox','Jump host / PAM A','Bastion + privileged access','DATA','MMR','DATA_jumpbox_bastion_a',
    { zone:'Z5', purdue:'L3.5', slt:'SL-T 3', vendor:'CyberArk / Azure Bastion class',
      standards:'IEC 62443-3-3 SR 1.13',
      attrs:{ controls:'MFA, session recording' },
      surface:['Sole sanctioned path for vendor and engineering access into Z2/Z3 — SL-T 3.'] });
  N('jumpbox_b','Jump host / PAM B','Bastion','DATA','MMR','DATA_jumpbox_bastion_b',
    { zone:'Z5', purdue:'L3.5', slt:'SL-T 3' });
  N('oob','OOB console server','Console server','DATA','MMR','DATA_oob_console_acs8000',
    { zone:'Z5', purdue:'L3.5', slt:'SL-T 3', vendor:'Vertiv ACS8000' });
  N('kvm','OOB KVM','KVM over IP','DATA','MMR','DATA_oob_kvm_raritan',
    { zone:'Z5', purdue:'L3.5', slt:'SL-T 3', vendor:'Raritan / Legrand' });
  N('wlc','WLAN controller','WLAN controller','DATA','MMR','DATA_wlan_controller',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('wap','Ceiling access point 1','Wi-Fi access point','DATA','Data hall','DATA_wap_0',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2',
      surface:['Wireless in the white space is an additional radio attack surface — 802.1X and rogue-AP monitoring.'] });
  N('wap_b','Ceiling access point 2','Wi-Fi access point','DATA','Data hall','DATA_wap_1',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });

  // ==================== Z1/Z2 — OT boundary & supervisory =================
  N('ot_sw','OT switch TN-4900','Industrial managed switch','OT','NOC','DATA_OT_switch_moxa_tn4900',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Moxa TN-4900', standards:'IEC 62443-4-2',
      surface:['High priority for firmware code review (whitebox).'] });
  N('ot_fw','OT firewall EDR-9010','Industrial firewall','OT','NOC','DATA_OT_firewall_moxa_edr9010',
    { zone:'Z1', purdue:'L3.5 (IDMZ)', slt:'SL-T 3', vendor:'Moxa EDR-9010', standards:'IEC 62443-4-2',
      surface:['Enforces the Z2 \u2192 Z1 conduit; deny-by-default with per-protocol allow lists.'] });
  N('diode','Data diode','Unidirectional gateway','OT','NOC','DATA_OT_data_diode',
    { zone:'Z1', purdue:'L3.5 (IDMZ)', slt:'SL-T 3', vendor:'Owl / Waterfall class', standards:'IEC 62443-4-2',
      attrs:{ direction:'OT \u2192 IT only' },
      surface:['Hardware-enforced one-way path; the only sanctioned Z2 \u2192 Z1 data export.'] });
  N('gw','Protocol gateway L-Gate','Protocol gateway','OT','NOC','DATA_OT_gw_loytec_lgate',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'LOYTEC L-Gate', standards:'IEC 62443-4-2',
      attrs:{ translates:'BACnet MS/TP, Modbus RTU, LON, 4-20 mA \u2192 BACnet/IP' },
      surface:['Protocol translation collapses many field conduits into one — a single high-value target.'] });
  N('bms_ebi','BMS head-end (EBI)','BMS supervisory server','BMS','NOC','BMS_srv_honeywell_ebi',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Honeywell EBI', standards:'IEC 62443 SL2 \u2192 SL-3/4 target',
      surface:['Vendor remote access to the BMS is an explicitly documented Z2 \u2192 external conduit.'] });
  N('bms_metasys','BMS head-end (Metasys)','BMS supervisory server','BMS','NOC','BMS_srv_jci_metasys',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Johnson Controls Metasys',
      standards:'IEC 62443 SL2 \u2192 SL-3/4 target' });
  N('dcim','DCIM (Environet)','DCIM platform','BMS','NOC','BMS_dcim_environet',
    { zone:'Z1', purdue:'L3-L3.5', slt:'SL-T 2-3', vendor:'Vertiv Environet / Schneider EcoStruxure IT',
      surface:['Historian must be read-only toward Z2 — it must never push commands downward.',
               'DCIM cloud connectivity is a Z1 \u2192 external conduit.'] });
  N('ids','OT IDS (Nozomi)','OT intrusion detection','BMS','NOC','BMS_ot_ids_nozomi',
    { zone:'Z1', purdue:'L3-L3.5', slt:'SL-T 2-3', vendor:'Nozomi / Claroty / Dragos',
      attrs:{ mode:'passive SPAN / mirror' },
      surface:['Passive only — no active scanning of live process networks.'] });
  N('console','Operator workstation','HMI / engineering workstation','BMS','NOC','BMS_console_monitor_0',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', standards:'IEC 62443-4-2 (host devices)',
      surface:['Engineering workstations are the classic pivot into Z2 — application allow-listing and no direct internet.'] });
  N('wall_display','NOC video wall','Supervisory display','BMS','NOC','BMS_wall_display',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2' });

  // ==================== Z2 — physical security ============================
  N('acs','Access control head end','ACS / IACS','SEC','NOC','SEC_acs_lenels2_onguard',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'LenelS2 OnGuard / Genetec',
      standards:'IEC 62443, NIS2, SOCI',
      surface:['Physical access control is a cyber-physical system — compromise holds doors and defeats zone boundaries.'] });
  N('reader','Mantrap card reader','Card reader','SEC','Mantrap','SEC_mantrap_reader_0',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'HID / LenelS2', standards:'OSDP v2 secure channel',
      attrs:{ credential:'MIFARE / DESFire' },
      surface:['Legacy MIFARE Classic credentials are cryptographically broken — migrate to DESFire EV3.',
               'Use OSDP secure channel; Wiegand is clear-text and cloneable.'] });
  N('mantrap_door','Mantrap door','Interlocked door','SEC','Mantrap','SEC_mantrap_door_0',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 2', standards:'IEC 62443-2-1 \u00a77',
      attrs:{ interlock:'two-door anti-passback' } });
  N('biometric','Biometric reader','Face recognition terminal','SEC','Mantrap','SEC_biometric_facestation',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2-3', standards:'GDPR (biometric data)',
      surface:['Biometric templates are special-category personal data under GDPR.'] });
  N('cctv','Perimeter camera 1','Network video camera','SEC','Perimeter','SEC_cctv_cam_0',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Fortinet / JCI / Honeywell', standards:'IEC 62443',
      surface:['Camera firmware is a recurring gap — component gap analysis required.',
               'IP cameras are a common initial-access foothold; isolate on a dedicated VLAN.'] });
  N('cctv_b','Perimeter camera 2','Network video camera','SEC','Perimeter','SEC_cctv_cam_1',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3' });
  N('pids','Perimeter intrusion detection','Fence fibre sensor','SEC','Perimeter','SEC_pids_fiber_north',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', standards:'IEC 62443, SL-3/SL-4 target' });
  N('gate','Vehicle gate','Access barrier','SEC','Perimeter','SEC_gate',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2' });
  N('bollards','HVM bollards','Hostile vehicle mitigation','SEC','Perimeter','SEC_hvm_bollard_0',
    { zone:'Z3', purdue:'L0', slt:'SL-T 1', attrs:{ rating:'IWA 14-1 class' } });
  N('guard','Guard house','Security post','SEC','Perimeter','SEC_guard_house',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2' });

  // ============================ EDGES ====================================
  // ---- electricity ----
  E('grid','gis','electricity','Physical flow','150 kV overhead','PWR_sub_to_gis');
  E('gis','pad_xfmr','electricity','Physical flow','150 kV cable','PWR_gis_to_pad');
  E('pad_xfmr','mv_swg','electricity','Physical flow','33 kV feeder','PWR_mv_feed');
  E('pad_xfmr','mv_swg_b','electricity','Physical flow','33 kV feeder (B)','PWR_mv_feed');
  E('mv_swg','xfmr','electricity','Physical flow','33 kV cable','PWR_mv_to_xfmr');
  E('mv_swg_b','xfmr_b','electricity','Physical flow','33 kV cable (B)','PWR_mv_to_xfmr');
  E('xfmr','lv_swg','electricity','Physical flow','400 V LV feeder','PWR_xfmr_lv_feeder');
  E('xfmr_b','lv_swg','electricity','Physical flow','400 V LV feeder (B)','PWR_xfmr_lv_feeder');
  E('lv_swg','ats','electricity','Physical flow','LV bus','PWR_lv_to_ats');
  E('lv_swg','ats_b','electricity','Physical flow','LV bus (B)','PWR_lv_to_ats');
  E('gen','ats','electricity','Physical flow','generator feeder','PWR_gen_feeder');
  E('gen_b','ats','electricity','Physical flow','generator feeder','PWR_gen_feeder');
  E('gen_c','ats_b','electricity','Physical flow','generator feeder','PWR_gen_feeder');
  E('bess','lv_swg','electricity','Physical flow','BESS tie','PWR_bess_tie');
  E('bess_b','lv_swg','electricity','Physical flow','BESS tie (B)','PWR_bess_tie');
  E('ats','ups','electricity','Physical flow','UPS input','PWR_ats_to_ups');
  E('ats_b','ups_b','electricity','Physical flow','UPS input (B)','PWR_ats_to_ups');
  E('ats','ups_c','electricity','Physical flow','UPS input','PWR_ats_to_ups');
  E('ats_b','ups_d','electricity','Physical flow','UPS input (B)','PWR_ats_to_ups');
  E('battery','ups','electricity','Physical flow','DC bus','PWR_batt_dc_bus');
  E('battery_b','ups_b','electricity','Physical flow','DC bus (B)','PWR_batt_dc_bus');
  E('ups','sts','electricity','Physical flow','UPS output','PWR_ups_to_sts');
  E('ups_b','sts','electricity','Physical flow','UPS output (B)','PWR_ups_to_sts');
  E('ups','rpp','electricity','Physical flow','distribution','PWR_ups_to_rpp');
  E('ups_b','rpp_b','electricity','Physical flow','distribution (B)','PWR_ups_to_rpp');
  E('ups_c','rpp','electricity','Physical flow','distribution (2N pair, Cell A)','PWR_ups_to_rpp');
  E('ups_d','rpp_b','electricity','Physical flow','distribution (2N pair, Cell B)','PWR_ups_to_rpp');
  E('rpp','busway','electricity','Physical flow','Cell A busway riser','PWR_rpp_a_riser');
  E('rpp_b','busway_b','electricity','Physical flow','Cell B busway riser','PWR_rpp_b_riser');
  E('busway_b','epms','control','Modbus TCP','busway critical power monitor (Cell B)',null);
  E('busway','row01_busway','electricity','Physical flow','row feed','PWR_spine_to_row01');
  E('row01_busway','row1_tap','electricity','Physical flow','tap-off','PWR_row01_tapbox_0');
  E('row1_tap','rack1_psu','electricity','Physical flow','rack drop','PWR_row01_drop_0');
  E('rack1_psu','rack1_busbar','electricity','Physical flow','48 V DC busbar','row01_rack01_busbar');
  E('rack1_busbar','rack1_compute','electricity','Physical flow','tray power','row01_rack01_busbar');
  E('rack1_busbar','rack1_storage','electricity','Physical flow','tray power','row01_rack01_busbar');
  E('fuel_tank','daytank','fuel','Physical flow','fuel transfer','PWR_fuel_line');
  E('daytank','gen','fuel','Physical flow','engine supply','PWR_fuel_line');

  // ---- water / cooling ----
  E('tower','chiller','condenser','Physical flow','condenser supply','CHW_cond_supply');
  E('chiller','tower','condenser','Physical flow','condenser return','CHW_cond_return');
  E('tower_b','chiller_b','condenser','Physical flow','condenser supply','CHW_cond_supply');
  E('drycooler','chiller','condenser','Physical flow','economiser loop','CHW_econo_loop');
  E('drycooler_b','chiller_c','condenser','Physical flow','economiser loop','CHW_econo_loop');
  E('chiller','pump','water','Physical flow','chilled water out','CHW_fws_supply_main');
  E('chiller_b','pump_b','water','Physical flow','chilled water out','CHW_fws_supply_main');
  E('pump','fws_spine','water','Physical flow','facility water supply','CHW_fws_supply_main');
  E('pump_b','fws_spine','water','Physical flow','facility water supply (B)','CHW_fws_supply_main');
  E('fws_spine','row01_cdu','water','Physical flow','FWS drop to CDU','CHW_fws_to_row01_s');
  E('row01_cdu','fws_spine','water','Physical flow','FWS return','CHW_fws_to_row01_r');
  E('row01_cdu','row01_tcs_supply','water','Physical flow','TCS header (secondary loop)','CHW_row01_tcs_header_supply');
  E('row01_tcs_supply','row01_rack01','water','Physical flow','rack manifold via quick-disconnect','CHW_row01_drop_supply_0');
  E('row01_rack01','rack1_compute','water','Physical flow','cold plate on die',null);

  // ---- air ----
  E('ahu','crah','air','Physical flow','outside air duct','AIR_ahu_duct');
  E('crah','row01_rack01','air','Physical flow','cold aisle supply',null);
  E('crah_b','row01_rack01','air','Physical flow','cold aisle supply',null);
  E('h2_fan','bess','air','Physical flow','H2 exhaust duct','AIR_batt_h2_duct');
  E('h2_fan','battery','air','Physical flow','battery room exhaust','AIR_batt_h2_duct');

  // ---- IT data ----
  E('carrier_a','isp_a','data','Ethernet/TCP-IP','carrier handoff','DATA_carrier_entry_0',
    { critical:true, cross:'external \u2192 Z0', note:'Diverse carrier entry; outermost untrusted boundary.' });
  E('isp_a','ddos_a','data','BGP','transit peering',null);
  E('isp_b','ddos_b','data','BGP','transit peering (diverse)',null);
  E('ddos_a','wan_a','data','Ethernet/TCP-IP','scrubbed transit',null);
  E('ddos_b','wan_a','data','Ethernet/TCP-IP','scrubbed transit (B)',null);
  E('wan_a','fw_a','data','Ethernet/TCP-IP','WAN uplink',null);
  E('wan_a','fw_b','data','Ethernet/TCP-IP','WAN uplink (B)',null);
  E('fw_a','dmz_sw','data','Ethernet/TCP-IP','DMZ segment',null,
    { critical:true, cross:'Z0 \u2192 Z1', note:'IDMZ boundary — the facility\u2019s most security-critical element.' });
  E('fw_a','spine_a','data','Ethernet/TCP-IP','inside interface',null);
  E('fw_b','spine_b','data','Ethernet/TCP-IP','inside interface (B)',null);
  E('spine_a','leaf_a','data','Ethernet/TCP-IP','400G fabric',null);
  E('spine_b','leaf_b','data','Ethernet/TCP-IP','400G fabric (B)',null);
  E('leaf_a','fiber_spine','data','Ethernet/TCP-IP','hall trunk','DATA_core_to_hall_spine');
  E('leaf_b','fiber_spine','data','Ethernet/TCP-IP','hall trunk (B)','DATA_core_to_hall_spine');
  E('fiber_spine','row01_eor_sw0','data','Ethernet/TCP-IP','row trunk','DATA_spine_to_row01');
  E('row01_eor_sw0','row1_patch','data','Ethernet/TCP-IP','structured cabling',null);
  E('row1_patch','row1_tor','data','Ethernet/TCP-IP','rack uplink 2\u00d7100G','DATA_row01_drop_0');
  E('row1_patch','row1_tor_b','data','Ethernet/TCP-IP','rack uplink (B)','DATA_row01_drop_0');
  E('row1_tor','rack1_compute','data','Ethernet/TCP-IP','host attachment',null);
  E('row1_tor_b','rack1_storage','data','Ethernet/TCP-IP','storage attachment',null);
  E('wlc','wap','data','CAPWAP','AP control tunnel',null);
  E('wlc','wap_b','data','CAPWAP','AP control tunnel',null);
  E('jumpbox','oob','data','Ethernet/TCP-IP','SSH to console server',null,
    { critical:true, cross:'Z5 internal', note:'Privileged access path; MFA and session recording required.' });
  E('jumpbox_b','oob','data','Ethernet/TCP-IP','SSH (B)',null);
  E('oob','row01_eor_oob','data','Ethernet/TCP-IP','OOB management network',null);
  E('row01_eor_oob','row1_tor','data','RS-232 console','serial console',null);
  E('kvm','rack1_mgmt','data','Ethernet/TCP-IP','KVM over IP',null,
    { critical:true, cross:'Z5 \u2192 Z0 (OOB)', note:'Out-of-band control of IT hosts; isolated OOB VLAN only.' });
  E('rack1_mgmt','rack1_compute','data','Ethernet/TCP-IP','BMC / Redfish',null,
    { critical:true, note:'Embedded management plane with power and firmware authority over the host.' });
  E('dcim','row1_tor','data','SNMP','device polling',null);
  E('jumpbox','ot_fw','data','Ethernet/TCP-IP','engineering access into OT',null,
    { critical:true, cross:'Z5 \u2192 Z1', note:'Sole sanctioned vendor/engineering path toward Z2.' });

  // ---- OT control ----
  E('row01_cdu_plc','row01_cdu','control','Modbus RTU','pump + valve control',null,
    { critical:true, note:'Direct cyber-physical authority; thermal runaway within ~90 s if defeated.' });
  E('row01_cdu_plc','cellA_ot_sw','control','Modbus TCP','CDU telemetry','DATA_cellA_ot_trunk');
  E('row01_leak','row01_cdu_plc','control','Dry contact','leak alarm contact',null);
  E('row01_th_0','cellA_gw','control','BACnet MS/TP','aisle temp / RH','DATA_cellA_ot_trunk');
  E('chiller_ctl','chiller','control','Modbus RTU','compressor + valve control',null);
  E('chiller_ctl','chiller_b','control','Modbus RTU','facility sequencing',null);
  E('chiller_ctl','gw','control','BACnet/IP','chiller facility telemetry','DATA_OT_trunk');
  E('wts_plc','vfd','control','PROFINET','pump speed command',null);
  E('wts_plc','vfd_b','control','PROFINET','pump speed command (B)',null);
  E('vfd','pump','control','Physical flow','motor drive output',null);
  E('vfd_b','pump_b','control','Physical flow','motor drive output',null);
  E('wts_plc','ot_sw','control','PROFINET','water treatment telemetry','DATA_OT_trunk');
  E('wts_plc','tower','control','Modbus RTU','dosing + blowdown control',null);
  E('crah_ctl','crah','control','BACnet MS/TP','fan + valve control',null);
  E('crah_ctl','crah_b','control','BACnet MS/TP','fan + valve control',null);
  E('crah_ctl','gw','control','BACnet/IP','CRAH telemetry',null);
  E('relay','epms','control','IEC 61850 MMS','protection + metering',null,
    { critical:true, cross:'Z3 \u2192 Z2', note:'Station-bus conduit from protection IEDs to EPMS.' });
  E('relay_b','epms','control','IEC 61850 MMS','protection + metering (B)',null);
  E('gis','relay','control','IEC 61850 MMS','breaker status / trip',null);
  E('epms','ot_sw','control','Modbus TCP','power quality telemetry','DATA_OT_branch_epms');
  E('rpp','epms','control','Modbus TCP','branch circuit monitoring',null);
  E('busway','epms','control','Modbus TCP','busway critical power monitor',null);
  E('gen_ctl','gen','control','CAN bus','engine control (J1939)',null);
  E('gen_ctl','gen_b','control','CAN bus','engine control',null);
  E('gen_ctl','ats','control','Modbus TCP','paralleling + transfer command',null,
    { critical:true, note:'Dispatch authority over standby generation.' });
  E('gen_ctl','ot_sw','control','Modbus RTU','genset status',null);
  E('daytank','gen_ctl','control','4-20 mA analog','day tank level',null);
  E('bess_bms','bess','control','Modbus TCP','charge / discharge dispatch',null,
    { critical:true, note:'Microgrid controller authority over on-site storage.' });
  E('bess_bms','ot_sw','control','DNP3','state of charge, alarms',null,
    { critical:true, cross:'Z2 \u2192 external (grid operator)', note:'IEEE 2030.7 / DNP3 grid interface.' });
  E('h2_sensor','gw','control','4-20 mA analog','H2 concentration',null);
  E('h2_sensor','h2_fan','control','Dry contact','ventilation interlock',null,
    { critical:true, note:'Safety interlock — hard-wired at the starter, not operator-overridable.' });
  E('ats','epms','control','Modbus TCP','transfer status',null);
  E('ups','ot_sw','control','Modbus TCP','UPS management card',null,
    { critical:true, note:'SNMP / Modbus / web on the NMC — isolate in a UPS management VLAN.' });
  E('battery','ot_sw','control','Modbus TCP','battery monitoring (cell V, T, ohmic)',null);
  E('gw','ot_sw','control','BACnet/IP','normalised field data',null);
  E('ot_sw','ot_fw','control','Ethernet/TCP-IP','OT zone uplink',null,
    { critical:true, cross:'Z2 \u2192 Z1', note:'Deny-by-default with per-protocol allow lists.' });
  E('ot_fw','diode','control','OPC UA','supervisory export',null,
    { critical:true, cross:'Z1 internal' });
  E('diode','dcim','control','OPC UA','one-way data feed',null,
    { critical:true, oneway:true, cross:'Z2 \u2192 Z1',
      note:'Historian is read-only toward Z2 — it must never push commands downward.' });
  E('diode','ids','control','Ethernet/TCP-IP','mirrored OT traffic',null, { oneway:true });
  E('ot_sw','bms_ebi','control','BACnet/IP','building supervision',null);
  E('ot_sw','bms_metasys','control','BACnet/IP','building supervision',null);
  E('bms_ebi','dcim','control','OPC UA','supervisory rollup',null);
  E('console','bms_ebi','control','Ethernet/TCP-IP','operator HMI session',null,
    { critical:true, cross:'Z1 \u2192 Z2', note:'Engineering workstation is the classic pivot into Z2.' });
  E('dcim','wall_display','control','Ethernet/TCP-IP','NOC display feed',null);

  // ---- fire (Z4, isolated) ----
  E('row01_vesda','facp','fire','Dry contact','supervised detection loop','FA_row01_vesda_pipe',
    { critical:true, cross:'Z3 \u2192 Z4', note:'Supervised SLC loop from field detector to panel.' });
  E('facp','bottles','fire','Dry contact','suppression release',null,
    { critical:true, note:'15-30 s pre-discharge abort interval required (NFPA 2001).' });
  E('bottles','row01_nozzle_0','fire','Physical flow','agent discharge',null);
  E('facp','ot_sw','fire','Dry contact','alarm state to BMS',null,
    { critical:true, oneway:true, cross:'Z4 \u2192 Z2',
      note:'One-way hardened dry contact only — no bidirectional Ethernet between Z4 and Z2.' });
  E('facp','crah_ctl','fire','Dry contact','HVAC shutdown on alarm',null,
    { critical:true, oneway:true, cross:'Z4 \u2192 Z2', note:'Supervised safety output.' });
  E('facp','epo','fire','Dry contact','emergency power off circuit',null, { critical:true });

  // ---- physical security ----
  E('reader','acs','security','OSDP RS-485','credential read',null,
    { critical:true, note:'OSDP secure channel; Wiegand is clear-text and cloneable.' });
  E('reader','mantrap_door','security','Dry contact','door strike release',null);
  E('biometric','acs','security','Ethernet/TCP-IP','biometric verification',null);
  E('cctv','acs','security','Ethernet/TCP-IP','video stream',null);
  E('cctv_b','acs','security','Ethernet/TCP-IP','video stream',null);
  E('pids','acs','security','Ethernet/TCP-IP','fence intrusion alarm',null);
  E('gate','acs','security','Dry contact','barrier status / release',null);
  E('guard','acs','security','Ethernet/TCP-IP','guard workstation',null);
  E('acs','dcim','security','Ethernet/TCP-IP','event forwarding',null,
    { critical:true, cross:'Z2 \u2192 Z1' });

  // ==================== Z0/Z1 — core IT room: applications, data, identity ====
  N('app_bms','BMS application server','Application server','BMS','Core IT room','APP_bms_honeywell_ebi',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', vendor:'Honeywell EBI', standards:'IEC 62443-4-2, IEC 62443 SL2 \\u2192 SL-3/4 target',
      attrs:{ role:'building supervision front end' },
      surface:['Vendor remote support into the BMS application is a documented Z1 \\u2192 external conduit.'] });
  N('app_hvac','HVAC application server','Application server','AIR','Core IT room','APP_hvac_desigo_cc',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', vendor:'Siemens Desigo CC' });
  N('app_cooling','Cooling facility manager','Application server','CHW','Core IT room','APP_cooling_plant_mgr',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3',
      surface:['Holds facility sequencing logic — compromise here reaches every chiller and CDU.'] });
  N('app_power','Power monitoring application','Application server','PWR','Core IT room','APP_power_epms_pme',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', vendor:'Schneider PowerLogic PME' });
  N('app_vms','Video management server','Application server','SEC','Core IT room','APP_vms_cctv_genetec',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', vendor:'Genetec / Milestone class',
      surface:['Aggregates every camera stream — a single high-value target for surveillance denial.'] });
  N('app_acs','Access control application','Application server','SEC','Core IT room','APP_acs_lenels2',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', vendor:'LenelS2 OnGuard', standards:'IEC 62443, NIS2' });
  N('app_fire','Fire graphics workstation','Application server','FA','Core IT room','APP_fire_graphics',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2', standards:'NFPA 72',
      surface:['Receives supervisory state only — must have no command path back into Z4.'] });
  N('app_supp','Suppression mimic panel','Application server','FA','Core IT room','APP_suppression_mimic',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2' });
  N('db_sql_a','SQL cluster node A','Database server','BMS','Core IT room','DB_sql_cluster_a',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', standards:'FIPS 140-3 (at rest)',
      surface:['Holds configuration and event data for every facility application.'] });
  N('db_sql_b','SQL cluster node B','Database server','BMS','Core IT room','DB_sql_cluster_b',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3' });
  N('db_hist','Historian datastore','Database server','BMS','Core IT room','DB_historian_store',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3',
      attrs:{ retention:'2 years (Uptime / NERC CIP expectation)' } });
  N('db_cmdb','Configuration / CMDB','Database server','DATA','Core IT room','DB_config_cmdb',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('dcs_a','DCS controller A','Distributed control system','OT','Core IT room','DCS_controller_a',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3', standards:'IEC 62443-4-2, ISA/IEC 62443-4-1',
      surface:['Process control authority — highest-consequence asset in the room.',
               'Redundant pair must fail over without operator intervention.'] });
  N('dcs_b','DCS controller B','Distributed control system','OT','Core IT room','DCS_controller_b',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3' });
  N('dcs_opc','OPC UA server','Protocol server','OT','Core IT room','DCS_opc_ua_server',
    { zone:'Z1', purdue:'L3-L3.5', slt:'SL-T 3', standards:'IEC 62541, IEC 62443-4-2',
      surface:['Aggregation point for all supervisory data — certificate trust list is the control.'] });
  N('dcs_eng','DCS engineering workstation','Engineering workstation','OT','Core IT room','DCS_engineering_ws',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3', standards:'IEC 62443-4-2 (host devices)',
      surface:['Holds controller logic and download capability — application allow-listing, no internet path.'] });
  N('ad_dc_a','Domain controller A','Directory service','DATA','Core IT room','AD_domain_controller_a',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2-3',
      surface:['Identity compromise is the shortest path to every application in the room.',
               'OT accounts must not depend on the enterprise forest — separate trust or none.'] });
  N('ad_dc_b','Domain controller B','Directory service','DATA','Core IT room','AD_domain_controller_b',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2-3' });
  N('ad_dns','DNS / DHCP','Network service','DATA','Core IT room','AD_dns_dhcp',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('ad_pki','PKI / certificate authority','Certificate authority','DATA','Core IT room','AD_pki_ca',
    { zone:'Z0', purdue:'L4', slt:'SL-T 3', standards:'FIPS 140-3, TCG',
      surface:['Issues the certificates OPC UA, BACnet/SC and ONVIF TLS depend on — CBOM scope.'] });
  N('ntp','PTP / NTP grandmaster','Time source','DATA','Core IT room','NTP_ptp_grandmaster',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', standards:'IEEE 1588 PTP',
      surface:['Time is a forensic prerequisite — without common time, event correlation fails.'] });
  N('siem_col','SIEM collector','Log collector','DATA','Core IT room','SIEM_collector',
    { zone:'Z1', purdue:'L3-L3.5', slt:'SL-T 2-3',
      surface:['Collection must be pull-from-Z1 or push-through-diode; never a Z2 inbound session.'] });
  N('siem_idx','SIEM indexer','SIEM','DATA','Core IT room','SIEM_indexer',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2-3', vendor:'Splunk / Sentinel class' });
  N('siem_arch','Log archive','Archive store','DATA','Core IT room','SIEM_log_archive',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', attrs:{ retention:'immutable, 12 months minimum' } });
  N('soar','SOAR automation','Response automation','DATA','Core IT room','SOAR_automation',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2',
      surface:['Automated response must never hold write access into Z2.'] });
  N('dmz_fw_a','DMZ firewall A','Firewall','DATA','Core IT room','DMZ_firewall_a',
    { zone:'Z1', purdue:'L3.5 (IDMZ)', slt:'SL-T 3', vendor:'Fortinet / Cisco', standards:'IEC 62443-4-2',
      surface:['The IDMZ enforcement point between enterprise IT and the facility.'] });
  N('dmz_fw_b','DMZ firewall B','Firewall','DATA','Core IT room','DMZ_firewall_b',
    { zone:'Z1', purdue:'L3.5 (IDMZ)', slt:'SL-T 3' });
  N('dmz_proxy','Reverse proxy','Application proxy','DATA','Core IT room','DMZ_reverse_proxy',
    { zone:'Z1', purdue:'L3.5', slt:'SL-T 3' });
  N('dmz_ra','Remote access gateway','Vendor access gateway','DATA','Core IT room','DMZ_remote_access_gw',
    { zone:'Z1', purdue:'L3.5', slt:'SL-T 3',
      surface:['Every vendor session lands here first — MFA, time-boxing and recording are mandatory.'] });
  N('dmz_jump','DMZ jump host','Bastion','DATA','Core IT room','DMZ_jump_host',
    { zone:'Z5', purdue:'L3.5', slt:'SL-T 3' });
  N('hist_a','OT historian (primary)','Historian','BMS','Core IT room','HIST_ot_primary',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3',
      surface:['Read-only toward Z2 — the historian must never push commands downward.'] });
  N('hist_b','OT historian (standby)','Historian','BMS','Core IT room','HIST_ot_standby',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3' });
  N('hist_scada','SCADA archive','Historian','OT','Core IT room','HIST_scada_archive',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3' });
  N('scada_a','SCADA server A','SCADA','OT','Core IT room','SCADA_server_a',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3', standards:'IEC 62443-4-2',
      surface:['Supervisory command authority over the electrical and mechanical facility.'] });
  N('scada_b','SCADA server B','SCADA','OT','Core IT room','SCADA_server_b',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3' });
  N('scada_hmi','SCADA HMI station','HMI','OT','Core IT room','SCADA_hmi_station',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3' });
  N('bkp','Backup server','Backup platform','DATA','Core IT room','BKP_backup_server',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2-3', vendor:'Bacula / Veeam class',
      standards:'IEC 62443, FIPS 140-3, NIS2, GDPR',
      surface:['Backup infrastructure is a primary ransomware target — immutability and an offline copy.'] });
  N('bkp_dedupe','Dedupe appliance','Backup storage','DATA','Core IT room','BKP_dedupe_appliance',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('bkp_tape','Tape library','Offline backup','DATA','Core IT room','BKP_tape_library',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', attrs:{ role:'air-gapped copy' } });
  N('virt_1','Virtualisation host 01','Hypervisor host','DATA','Core IT room','VIRT_host_01',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', standards:'OCP S.A.F.E., IEC 62443-4-2',
      surface:['Hosts multiple facility applications — hypervisor escape collapses several zones at once.'] });
  N('virt_2','Virtualisation host 02','Hypervisor host','DATA','Core IT room','VIRT_host_02',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('virt_3','Virtualisation host 03','Hypervisor host','DATA','Core IT room','VIRT_host_03',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('san_a','SAN controller A','Storage controller','DATA','Core IT room','STOR_san_controller_a',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', standards:'FIPS 140-3, OCP S.A.F.E.' });
  N('san_b','SAN controller B','Storage controller','DATA','Core IT room','STOR_san_controller_b',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });
  N('itroom_crac','IT room CRAC','Precision cooling unit','AIR','Core IT room','AIR_itroom_crac',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2', standards:'ASHRAE 15' });
  N('itroom_crac_ctl','IT room CRAC controller','Unit controller','BMS','Core IT room','BMS_itroom_crac_ctl',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2' });
  N('itroom_pdu','IT room PDU','Power distribution unit','PWR','Core IT room','PWR_itroom_pdu',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1-2' });
  N('itroom_reader','IT room card reader','Card reader','SEC','Core IT room','SEC_itroom_reader',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', standards:'OSDP v2 secure channel' });
  N('itroom_contact','IT room door contact','Door contact','SEC','Core IT room','SEC_itroom_door_contact',
    { zone:'Z3', purdue:'L0', slt:'SL-T 2',
      surface:['Hardwired supervised contact — door-forced and door-held alarms.'] });

  // ==================== internet boundary ================================
  N('demarc_n','North demarcation','Carrier demarc','DATA','Hall north','DATA_demarc_north',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2', standards:'TIA-942',
      attrs:{ role:'carrier A termination', diversity:'physically separated from south demarc' },
      surface:['Outermost network boundary — carrier equipment is not under operator control.'] });
  N('demarc_s','South demarcation','Carrier demarc','DATA','Hall south','DATA_demarc_south',
    { zone:'Z0', purdue:'L5', slt:'SL-T 2', attrs:{ role:'carrier B termination' } });
  N('internet','Internet / cloud','External network','DATA','Off site','DATA_internet_cloud',
    { zone:'Z0', purdue:'L5', slt:'n/a (untrusted)',
      attrs:{ role:'public network and vendor cloud services' },
      surface:['Untrusted by definition — every path inward crosses a documented conduit.'] });

  // ==================== hall cameras + door contacts =====================
  for (let i = 0; i < 9; i++)
    N('hall_cam_' + i, 'Data hall camera ' + (i + 1), 'IP camera', 'SEC', 'Data hall', 'SEC_hall_cam_' + i,
      { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', standards:'ONVIF profile S over TLS, IEC 62443',
        surface:['Camera firmware is a recurring supplier gap — component-level assessment required.'] });
  for (const d of ['mantrap','hall_west','mv_room','battery_room','chiller_room'])
    N('contact_' + d, 'Door contact — ' + d.replace(/_/g,' '), 'Door contact', 'SEC', 'Various',
      'SEC_door_contact_' + d, { zone:'Z3', purdue:'L0', slt:'SL-T 2',
        surface:['Hardwired supervised loop — no network path to defeat.'] });

  // ==================== additional drives + fuel =========================
  N('crah_vfd','CRAH fan VFD','Variable frequency drive','AIR','Chiller room','AIR_crah_vfd_0',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2', vendor:'ABB / Danfoss', standards:'IEC 62443-4-2' });
  N('tower_vfd','Cooling tower fan VFD','Variable frequency drive','CHW','Central facility (shared)','CHW_tower_fan_vfd_0',
    { zone:'Z2', purdue:'L1-L2', slt:'SL-T 2', vendor:'ABB ACQ580' });
  N('fuel_polish','Fuel polishing skid','Fuel conditioning','PWR','West yard','PWR_fuel_polishing_skid',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 1', attrs:{ duty:'water and particulate removal' } });
  N('fuel_ctl','Fuel level controller','Tank gauge controller','BMS','West yard','BMS_fuel_level_ctl',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2' });

  // ============ EDGES: core IT room, internet, security, drives ==========
  // internet -> demarc -> ISP routers (north / south diverse paths)
  E('internet','demarc_n','data','Ethernet/TCP-IP','carrier A service handoff','DATA_isp_path_north',
    { critical:true, cross:'external \\u2192 Z0', note:'Untrusted ingress; north demarcation.' });
  E('internet','demarc_s','data','Ethernet/TCP-IP','carrier B service handoff','DATA_isp_path_south',
    { critical:true, cross:'external \\u2192 Z0', note:'Untrusted ingress; south demarcation, physically diverse.' });
  E('demarc_n','carrier_a','data','Ethernet/TCP-IP','demarc to MMR entry','DATA_carrier_entry_0');
  E('demarc_s','isp_b','data','Ethernet/TCP-IP','demarc to diverse ISP router','DATA_carrier_entry_1');
  E('demarc_n','ntp','data','Ethernet/TCP-IP','GNSS / carrier time reference',null);

  // enterprise edge -> DMZ -> IDMZ -> OT
  E('fw_a','dmz_fw_a','data','Ethernet/TCP-IP','enterprise to DMZ',null,
    { critical:true, cross:'Z0 \\u2192 Z1', note:'IDMZ enforcement point.' });
  E('fw_b','dmz_fw_b','data','Ethernet/TCP-IP','enterprise to DMZ (B)',null, { critical:true, cross:'Z0 \\u2192 Z1' });
  E('dmz_fw_a','dmz_proxy','data','Ethernet/TCP-IP','published application access',null);
  E('dmz_fw_a','dmz_ra','data','Ethernet/TCP-IP','vendor remote access',null,
    { critical:true, cross:'external \\u2192 Z1', note:'MFA, time-boxed, session recorded.' });
  E('dmz_ra','dmz_jump','data','Ethernet/TCP-IP','vendor session brokered to jump host',null, { critical:true });
  E('dmz_jump','ot_fw','data','Ethernet/TCP-IP','engineering access into OT',null,
    { critical:true, cross:'Z5 \\u2192 Z1', note:'Sole sanctioned path toward Z2.' });
  E('dmz_jump','dcs_eng','data','Ethernet/TCP-IP','brokered session to engineering workstation',null, { critical:true });
  E('jumpbox','dmz_jump','data','Ethernet/TCP-IP','PAM to DMZ bastion',null);

  // identity, time, certificates
  E('ad_dc_a','ad_dns','data','Ethernet/TCP-IP','directory and name services',null);
  E('ad_dc_a','ad_dc_b','data','Ethernet/TCP-IP','directory replication',null);
  E('ad_pki','ad_dc_a','data','Ethernet/TCP-IP','certificate enrolment',null);
  E('ad_pki','dcs_opc','data','OPC UA','application certificate issuance',null,
    { critical:true, note:'OPC UA trust depends on this CA — CBOM scope.' });
  E('ad_pki','cctv','data','Ethernet/TCP-IP','ONVIF TLS certificate issuance',null);
  E('ntp','dcs_a','control','Ethernet/TCP-IP','PTP time distribution',null,
    { critical:true, note:'Common time is a forensic prerequisite.' });
  E('ntp','siem_col','data','Ethernet/TCP-IP','time synchronisation',null);
  E('ntp','row1_tor','data','Ethernet/TCP-IP','PTP to fabric',null);
  E('ad_dc_a','virt_1','data','Ethernet/TCP-IP','host domain membership',null);

  // applications -> their field systems (through the OT boundary)
  E('app_bms','bms_ebi','control','BACnet/IP','BMS application to head end',null);
  E('app_hvac','crah_ctl','control','BACnet/IP','HVAC supervisory command',null, { critical:true, cross:'Z1 \\u2192 Z2' });
  E('app_hvac','itroom_crac_ctl','control','BACnet/IP','IT room cooling supervision',null);
  E('app_cooling','chiller_ctl','control','BACnet/IP','chiller facility sequencing',null, { critical:true, cross:'Z1 \\u2192 Z2' });
  E('app_cooling','row01_cdu_plc','control','Modbus TCP','CDU setpoint supervision',null, { critical:true });
  E('app_power','epms','control','Modbus TCP','power monitoring application',null);
  E('app_power','scada_a','control','OPC UA','electrical supervisory data',null);
  E('app_vms','cctv','security','Ethernet/TCP-IP','camera stream ingest (ONVIF TLS)',null);
  E('app_vms','cctv_b','security','Ethernet/TCP-IP','camera stream ingest',null);
  for (let i = 0; i < 9; i++)
    E('app_vms','hall_cam_' + i,'security','Ethernet/TCP-IP','camera stream ingest',null);
  E('app_acs','acs','security','Ethernet/TCP-IP','access control application to head end',null);
  E('jace_a','bms_ebi','control','BACnet/IP','normalised field points to head-end',null, { critical:true });
  E('jace_a','bms_metasys','control','BACnet/IP','normalised field points to head-end',null, { critical:true });
  E('jace_b','bms_ebi','control','BACnet/IP','normalised field points (B)',null);
  E('gnss','ntp','data','IEEE 1588 PTP','timing reference',null,
    { critical:true, note:'Single upstream timing source — spoofing propagates to protection and logging.' });
  E('ids_idmz','ids','data','Ethernet/TCP-IP','IDMZ sensor telemetry to console',null, { critical:true });
  E('ot_fw','ids_idmz','data','Ethernet/TCP-IP','SPAN mirror at the IT/OT boundary',null, { oneway:true });
  E('app_fire','facp','fire','Dry contact','supervisory state to graphics',null,
    { critical:true, oneway:true, cross:'Z4 \\u2192 Z1', note:'Read-only; no command path back into Z4.' });
  E('app_supp','bottles','fire','Dry contact','suppression status mimic',null, { oneway:true });

  // data tier
  E('app_bms','db_sql_a','data','Ethernet/TCP-IP','application database',null);
  E('app_vms','db_sql_b','data','Ethernet/TCP-IP','application database',null);
  E('app_acs','db_sql_a','data','Ethernet/TCP-IP','credential and event store',null);
  E('db_sql_a','db_sql_b','data','Ethernet/TCP-IP','cluster replication',null);
  E('db_hist','hist_a','data','Ethernet/TCP-IP','historian datastore',null);
  E('db_cmdb','dcim','data','Ethernet/TCP-IP','asset reconciliation',null);
  E('san_a','virt_1','data','Ethernet/TCP-IP','block storage',null);
  E('san_a','san_b','data','Ethernet/TCP-IP','controller pair',null);
  E('virt_1','app_bms','data','Ethernet/TCP-IP','hosted workload',null);
  E('virt_2','app_vms','data','Ethernet/TCP-IP','hosted workload',null);
  E('virt_3','db_sql_a','data','Ethernet/TCP-IP','hosted workload',null);
  E('bkp','db_sql_a','data','Ethernet/TCP-IP','database backup',null);
  E('bkp','bkp_dedupe','data','Ethernet/TCP-IP','backup landing',null);
  E('bkp_dedupe','bkp_tape','data','Ethernet/TCP-IP','offline copy',null,
    { critical:true, note:'Air-gapped copy — the ransomware recovery position.' });

  // DCS / SCADA / historian chain
  E('dcs_a','dcs_b','control','Ethernet/TCP-IP','controller redundancy link',null, { critical:true });
  E('dcs_a','dcs_opc','control','OPC UA','process data publication',null);
  E('dcs_eng','dcs_a','control','Ethernet/TCP-IP','logic download and configuration',null,
    { critical:true, note:'Write path into process control — strongest access controls apply.' });
  E('dcs_a','scada_a','control','OPC UA','supervisory data',null);
  E('scada_a','scada_b','control','Ethernet/TCP-IP','server redundancy',null);
  E('scada_hmi','scada_a','control','Ethernet/TCP-IP','operator session',null, { critical:true, cross:'Z2 internal' });
  E('scada_a','hist_scada','control','OPC UA','archive write',null, { oneway:true });
  E('dcs_opc','hist_a','control','OPC UA','historian collection',null,
    { critical:true, oneway:true, cross:'Z2 \\u2192 Z1', note:'Read-only toward Z2.' });
  E('hist_a','hist_b','data','Ethernet/TCP-IP','historian replication',null);
  E('hist_a','dcim','data','Ethernet/TCP-IP','trend data to DCIM',null);
  E('dcs_a','wts_plc','control','PROFINET','water treatment supervision',null);
  E('dcs_a','gen_ctl','control','Modbus TCP','generation dispatch supervision',null, { critical:true });
  E('scada_a','ot_sw','control','Ethernet/TCP-IP','OT network attachment',null, { critical:true, cross:'Z2 internal' });

  // monitoring / SIEM
  E('siem_col','ot_sw','data','SNMP','OT device telemetry collection',null,
    { critical:true, cross:'Z2 \\u2192 Z1', note:'Pull from Z1; never an inbound session into Z2.' });
  E('ids','siem_col','data','Ethernet/TCP-IP','OT detection alerts',null);
  E('siem_col','siem_idx','data','Ethernet/TCP-IP','log forwarding',null);
  E('siem_idx','siem_arch','data','Ethernet/TCP-IP','immutable archive',null);
  E('siem_idx','soar','data','Ethernet/TCP-IP','detection to response',null);
  E('acs','siem_col','security','Ethernet/TCP-IP','access events',null);
  E('app_vms','siem_col','security','Ethernet/TCP-IP','video system events',null);
  E('facp','siem_col','fire','Dry contact','alarm state to monitoring',null, { oneway:true, cross:'Z4 \\u2192 Z1' });
  E('siem_idx','internet','data','Ethernet/TCP-IP','managed detection feed',null,
    { critical:true, cross:'Z0 \\u2192 external' });

  // IT room services
  E('rpp_b','itroom_pdu','electricity','Physical flow','feed to IT room PDU','PWR_ups_to_rpp');
  E('rpp','itroom_pdu','electricity','Physical flow','feed to IT room PDU (A path)','PWR_ups_to_rpp');
  E('itroom_pdu','virt_1','electricity','Physical flow','rack power',null);
  E('itroom_pdu','dcs_a','electricity','Physical flow','rack power',null);
  E('itroom_crac','virt_1','air','Physical flow','room cooling',null);
  E('itroom_crac_ctl','itroom_crac','control','BACnet MS/TP','fan and valve control',null);
  E('itroom_crac_ctl','gw','control','BACnet/IP','room cooling telemetry',null);
  E('fws_spine','itroom_crac','water','Physical flow','chilled water to CRAC',null);
  E('itroom_reader','acs','security','OSDP RS-485','credential read',null, { critical:true });
  E('itroom_contact','acs','security','Dry contact','door forced / held alarm',null,
    { critical:true, note:'Hardwired supervised loop.' });

  // door contacts and readers -> ACS (all hardwired)
  for (const d of ['mantrap','hall_west','mv_room','battery_room','chiller_room'])
    E('contact_' + d, 'acs', 'security', 'Dry contact', 'door position supervision', null,
      { note:'Hardwired supervised loop — no network path.' });

  // drives and fuel
  E('crah_vfd','crah','control','Physical flow','fan motor drive output',null);
  E('crah_ctl','crah_vfd','control','Modbus RTU','fan speed command',null);
  E('tower_vfd','tower','control','Physical flow','fan motor drive output',null);
  E('wts_plc','tower_vfd','control','PROFINET','tower fan speed command',null);
  E('fuel_tank','fuel_polish','fuel','Physical flow','fuel conditioning loop','PWR_fuel_line');
  E('fuel_polish','fuel_tank','fuel','Physical flow','conditioned return','PWR_fuel_line');
  E('fuel_ctl','fuel_tank','control','4-20 mA analog','bulk tank level',null);
  E('fuel_ctl','gen_ctl','control','Modbus RTU','fuel availability to generation control',null);
  E('fuel_ctl','ot_sw','control','Modbus TCP','fuel telemetry',null);

  // utility grid boundary made explicit
  E('internet','dmz_ra','data','Ethernet/TCP-IP','vendor inbound to remote access gateway',null,
    { critical:true, cross:'external \\u2192 Z1', note:'Vendor support ingress.' });

  // ---- close out remaining assets so nothing dangles -------------------
  E('ahu','crah_c','air','Physical flow','outside air duct','AIR_ahu_duct');
  E('gate','bollards','security','Dry contact','HVM interlock with gate sequence',null,
    { note:'Hardwired interlock — bollards raise before the gate releases.' });
  E('acs','gate','security','Ethernet/TCP-IP','barrier release command',null, { critical:true });
  // ==================== engineering, reception, guest access =============
  N('eng_ws','Engineering workstation','Windows 11 workstation','OT','Core IT room','DCS_engineering_workstation_pc',
    { zone:'Z2', purdue:'L2', slt:'SL-T 3', vendor:'Windows 11 Enterprise',
      standards:'IEC 62443-4-2 (host devices), IEC 62443-3-3 SR 1.1',
      attrs:{ role:'DCS and PLC engineering, logic download', domain:'joined to domain controller A', screens:'2' },
      surface:['Holds controller logic and download capability — the classic pivot into Z2.',
               'Application allow-listing, no direct internet path, removable media blocked.',
               'Domain membership means an identity compromise reaches process control.'] });
  N('secoff_ws','Security officer workstation','Windows 11 workstation','SEC',"Security officer's office",
    'SEC_officer_workstation',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2-3', vendor:'Windows 11 Enterprise',
      standards:'IEC 62443-4-2, NIS2, GDPR (badge and video data)',
      attrs:{ applications:'BMS, fire alarm graphics, CCTV VMS client, access control client',
              domain:'joined to domain controller A', screens:'2' },
      surface:['Single seat with reach into four separate facility systems — segregate by application role, not by host.',
               'Compromise here yields door control, camera denial and fire-panel visibility at once.'] });
  N('secoff_cctv_ws','CCTV viewing workstation','Video client workstation','SEC',"Security officer's office",
    'SEC_cctv_view_workstation',
    { zone:'Z1', purdue:'L3', slt:'SL-T 2', attrs:{ role:'dedicated live and recorded video review', screens:'3' } });
  N('badge_encoder','Badge reader / writer','Credential encoder','SEC',"Security officer's office",
    'SEC_badge_encoder',
    { zone:'Z3', purdue:'L1', slt:'SL-T 3', standards:'MIFARE DESFire EV3',
      attrs:{ role:'issues and revokes access credentials', connection:'USB to security officer workstation' },
      surface:['Credential issuance is a trust-minting function — dual authorisation and an audit trail.',
               'An encoder with a writable key diversification set can mint valid site credentials.'] });
  N('cctv_nvr','CCTV storage server','Video recording server','SEC',"Security officer's office",
    'SEC_cctv_nvr',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3',
      attrs:{ role:'video retention and export', retention:'31 days' },
      standards:'GDPR (retention and access), IEC 62443-4-2',
      surface:['Holds the evidentiary record — tamper protection and export logging matter more than uptime.'] });
  N('greeter_ws','Greeter workstation','Windows 11 workstation','SEC','Reception',
    'SEC_greeter_workstation',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', vendor:'Windows 11 Enterprise',
      attrs:{ role:'visitor registration, door access request', domain:'joined to domain controller A',
              access:'internet plus identity management' },
      surface:['Internet-facing seat with a path to identity management — the shortest external route to a door.',
               'Must not hold direct access control client rights; requests go through workflow, not the panel.'] });
  N('greeter_reader','Reception badge reader','Card reader','SEC','Reception',
    'SEC_greeter_badge_reader',
    { zone:'Z3', purdue:'L1', slt:'SL-T 2', standards:'OSDP v2 secure channel',
      attrs:{ role:'controls the turnstile past the greeter position' } });
  N('turnstile','Reception turnstile','Access barrier','SEC','Reception','SEC_greeter_turnstile',
    { zone:'Z3', purdue:'L0-L1', slt:'SL-T 2' });
  N('guest_kiosk','Guest sign-in kiosk','Self-service kiosk','SEC','Entry way','SEC_guest_kiosk',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2',
      attrs:{ role:'visitor self sign-in, host notification', directory:'authenticates against domain controller A' },
      standards:'GDPR (visitor records)',
      surface:['Unattended public terminal inside the envelope — kiosk lockdown and no local credential cache.',
               'Directory queries must be read-only and scoped to a service account.'] });
  N('guest_wap','Guest wireless access point','Wi-Fi access point','DATA','Entry way','DATA_guest_wap',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2', standards:'WPA3, 802.1X for staff SSID',
      attrs:{ role:'guest SSID only', isolation:'client isolation on, dedicated VLAN' },
      surface:['Guest radio reaches beyond the building envelope — treat the VLAN as untrusted.'] });
  N('guest_fw','Guest captive portal firewall','Firewall / captive portal','DATA','Entry way',
    'DATA_guest_captive_portal_fw',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2',
      attrs:{ role:'internet-only egress for the guest VLAN', policy:'deny all to internal ranges' },
      surface:['The only control preventing guest Wi-Fi reaching the facility estate — deny-by-default east-west.'] });
  N('guest_sw','Guest VLAN switch','Access switch','DATA','Entry way','DATA_guest_vlan_switch',
    { zone:'Z0', purdue:'L4', slt:'SL-T 2' });

  // ---- edges: engineering workstation ----
  E('ad_dc_a','eng_ws','data','Ethernet/TCP-IP','domain authentication and policy',null,
    { critical:true, note:'Domain membership of an engineering host links identity compromise to process control.' });
  E('eng_ws','dcs_a','control','Ethernet/TCP-IP','logic download and configuration',null,
    { critical:true, cross:'Z2 internal', note:'Write path into process control.' });
  E('eng_ws','dcs_eng','control','Ethernet/TCP-IP','engineering toolchain session',null);
  E('dmz_jump','eng_ws','data','Ethernet/TCP-IP','brokered engineering session',null, { critical:true, cross:'Z5 \\u2192 Z2' });
  E('itroom_pdu','eng_ws','electricity','Physical flow','workstation power',null);

  // ---- edges: security officer's office ----
  E('ad_dc_a','secoff_ws','data','Ethernet/TCP-IP','domain authentication and policy',null, { critical:true });
  E('secoff_ws','app_bms','control','Ethernet/TCP-IP','BMS client session',null, { critical:true, cross:'Z1 internal' });
  E('secoff_ws','app_fire','fire','Ethernet/TCP-IP','fire alarm graphics client',null,
    { critical:true, note:'View-only; no command path into the Z4 panel.' });
  E('secoff_ws','app_vms','security','Ethernet/TCP-IP','CCTV client session',null);
  E('secoff_ws','app_acs','security','Ethernet/TCP-IP','access control client session',null,
    { critical:true, note:'Door control authority — privileged role, dual authorisation on credential changes.' });
  E('secoff_ws','badge_encoder','security','Physical flow','USB credential encoder',null,
    { critical:true, note:'Hardwired peripheral — credential minting.' });
  E('badge_encoder','app_acs','security','Ethernet/TCP-IP','credential issuance and revocation',null, { critical:true });
  E('secoff_cctv_ws','app_vms','security','Ethernet/TCP-IP','live and recorded video review',null);
  E('secoff_cctv_ws','cctv_nvr','security','Ethernet/TCP-IP','recorded video retrieval',null);
  E('ad_dc_a','secoff_cctv_ws','data','Ethernet/TCP-IP','domain authentication',null);
  E('app_vms','cctv_nvr','security','Ethernet/TCP-IP','stream write to storage',null,
    { critical:true, note:'Evidentiary record — tamper protection and export logging.' });
  for (let i = 0; i < 9; i++)
    E('hall_cam_' + i,'cctv_nvr','security','Ethernet/TCP-IP','camera stream recording',null);
  E('cctv','cctv_nvr','security','Ethernet/TCP-IP','camera stream recording',null);
  E('cctv_b','cctv_nvr','security','Ethernet/TCP-IP','camera stream recording',null);
  E('cctv_nvr','siem_col','security','Ethernet/TCP-IP','video system audit events',null);

  // ---- edges: reception, greeter, guest ----
  E('ad_dc_a','greeter_ws','data','Ethernet/TCP-IP','domain authentication and policy',null);
  E('greeter_ws','internet','data','Ethernet/TCP-IP','internet access',null,
    { critical:true, cross:'Z0 \\u2192 external', note:'Internet-facing seat with a path toward identity management.' });
  E('greeter_ws','app_acs','security','Ethernet/TCP-IP','visitor door access request',null,
    { critical:true, note:'Request through workflow; no direct panel rights.' });
  E('greeter_ws','ad_dns','data','Ethernet/TCP-IP','identity management for door access',null);
  E('greeter_reader','app_acs','security','OSDP RS-485','credential read at reception',null, { critical:true });
  E('greeter_reader','turnstile','security','Dry contact','turnstile release',null,
    { note:'Hardwired release — fails secure on loss of signal.' });
  E('turnstile','acs','security','Dry contact','barrier position and tailgate detection',null);
  E('ad_dc_a','guest_kiosk','data','Ethernet/TCP-IP','directory lookup for host notification',null,
    { critical:true, cross:'Z0 internal', note:'Read-only, scoped service account.' });
  E('guest_kiosk','app_acs','security','Ethernet/TCP-IP','visitor badge request',null);
  E('guest_kiosk','guest_sw','data','Ethernet/TCP-IP','kiosk network attachment',null);
  E('guest_wap','guest_sw','data','Ethernet/TCP-IP','guest SSID uplink',null);
  E('guest_sw','guest_fw','data','Ethernet/TCP-IP','guest VLAN to captive portal',null,
    { critical:true, cross:'Z0 internal', note:'Deny-by-default east-west; internet egress only.' });
  E('guest_fw','internet','data','Ethernet/TCP-IP','guest internet egress',null,
    { critical:true, cross:'Z0 \\u2192 external' });
  E('wlc','guest_wap','data','CAPWAP','AP control tunnel',null);
  E('guest_fw','siem_col','data','Ethernet/TCP-IP','guest network logs',null);
  E('itroom_pdu','cctv_nvr','electricity','Physical flow','recorder power',null);
  E('rpp_b','secoff_ws','electricity','Physical flow','office power',null);
  E('rpp_b','greeter_ws','electricity','Physical flow','reception power',null);
  E('rpp_b','guest_kiosk','electricity','Physical flow','kiosk power',null);

  // ==================== per-cell OT / BMS / fire =========================
  // JACE integration tier + GNSS + IDMZ IDS sensor (campus scope)
  N('jace_a','Niagara JACE-8000 A','BMS integration gateway','BMS','Data hall','BMS_jace_a',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Tridium JACE-8000',
      standards:'IEC 62443-4-1 SDLC certified (process, not product)',
      attrs:{ role:'normalises DDC field points to the BMS head-ends', drivers:'200+ protocol drivers',
              hardening:'Secure Boot + HSM root of trust, TLS 1.3 FOXS' },
      surface:['Runs 200+ drivers and speaks to every field controller — the highest-value single Z2 host.',
               'Niagara station credentials are a repeated CVE theme; certificate auth and station lockdown are mandatory.'] });
  N('jace_b','Niagara JACE-8000 B','BMS integration gateway','BMS','Data hall','BMS_jace_b',
    { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Tridium JACE-8000', attrs:{ role:'redundant integration gateway' } });
  N('gnss','GNSS antenna / receiver','Timing reference','DATA','Roof','DATA_gnss_antenna',
    { zone:'Z3', purdue:'L0', slt:'SL-T 2', vendor:'Meinberg / Oscilloquartz class',
      standards:'IEEE 1588 PTP, Galileo OSNMA',
      attrs:{ feeds:'PTP grandmaster', authentication:'Galileo OSNMA signal authentication' },
      surface:['GNSS spoofing shifts facility time — corrupts IEC 61850 protection coordination and log correlation.',
               'Antenna is outside the building envelope: physical tamper protection required.'] });
  N('ids_idmz','OT IDS sensor — IDMZ','Passive network sensor','OT','Core IT room','DATA_idmz_ids_tap',
    { zone:'Z1', purdue:'L3.5 (IDMZ)', slt:'SL-T 3', vendor:'Nozomi Guardian',
      attrs:{ mode:'passive SPAN / TAP — zero active probing', position:'Z1/Z2 conduit' },
      surface:['A passive sensor cannot be used to attack the process, but losing it blinds detection silently.'] });

  for (const [cid, cname, rows] of [['cellA','Cell A',['row01','row02','row03']],
                                    ['cellB','Cell B',['row04','row05','row06']]]) {
    N(cid + '_ot_sw', cname + ' OT switch','Industrial managed switch','OT','Data hall','DATA_' + cid + '_ot_switch',
      { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Moxa TN-4900', standards:'IEC 62443-4-2', cell:cname,
        attrs:{ scope: cname + ' only (' + rows.join(', ') + ')', segmentation:'cell OT VLAN — no inter-cell routing' },
        surface:['Cell-dedicated OT segment: a compromise here is bounded to ' + cname + '.'] });
    N(cid + '_ot_fw', cname + ' OT firewall','Industrial firewall','OT','Data hall','DATA_' + cid + '_ot_firewall',
      { zone:'Z1', purdue:'L3.5 (IDMZ)', slt:'SL-T 3', vendor:'Moxa EDR-9010', standards:'IEC 62443-4-2', cell:cname,
        attrs:{ policy:'deny-by-default; no cell-to-cell rules' },
        surface:['Enforces the cell boundary — the control that bounds a BMS compromise to one cell.'] });
    N(cid + '_bms_zc', cname + ' BMS zone controller','BMS zone controller','BMS','Data hall','BMS_' + cid + '_zone_ctl',
      { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Siemens Desigo / JCI FEC class', standards:'IEC 62443-4-2', cell:cname,
        attrs:{ scope:'cooling, containment and environmental control for ' + cname,
                autonomy:'holds last-good setpoints if campus BMS is lost' },
        surface:['Independent zone controller — campus BMS loss degrades supervision, not control.'] });
    N(cid + '_gw', cname + ' protocol gateway','Protocol gateway','OT','Data hall','DATA_' + cid + '_ot_gw',
      { zone:'Z2', purdue:'L2', slt:'SL-T 2-3', vendor:'Loytec / Anybus class', cell:cname,
        attrs:{ translates:'BACnet MS/TP, Modbus RTU -> BACnet/IP within the cell' } });
    N(cid + '_facp', cname + ' fire panel','Addressable FACP (SIS)','FA','Data hall','FA_' + cid + '_facp',
      { zone:'Z4', purdue:'SIS (isolated)', slt:'SL-T 2-3', vendor:'Siemens FC2080 class',
        standards:'NFPA 72, NFPA 2001', cell:cname,
        attrs:{ scope:'detection + suppression release for ' + cname },
        surface:['Cell-independent detection and release; reports to the campus panel one-way only.'] });
    E(cid + '_ot_sw', cid + '_ot_fw','data','Ethernet/TCP-IP','cell OT uplink','DATA_' + cid + '_ot_trunk',
      { critical:true, cross:'Z2 -> Z1', note:'Cell boundary conduit — the only path out of the ' + cname + ' OT segment.' });
    E(cid + '_ot_fw','diode','data','Ethernet/TCP-IP','cell telemetry to campus','DATA_OT_hall_spine',
      { critical:true, cross:'Z1 internal', note:'Aggregates to the campus diode; read-only toward IT.' });
    E(cid + '_bms_zc', cid + '_ot_sw','control','BACnet/IP','zone telemetry + setpoints',null);
    E(cid + '_gw', cid + '_ot_sw','control','BACnet/IP','translated field points',null);
    E(cid + '_facp', cid + '_bms_zc','fire','Dry contact','HVAC shutdown + alarm',null,
      { critical:true, oneway:true, cross:'Z4 -> Z2', note:'Hardwired one-way; no network path into the cell fire panel.' });
    E(cid + '_facp','facp','fire','Dry contact','cell alarm to campus panel',null,
      { critical:true, oneway:true, note:'Campus panel annunciates only; it cannot release agent in the cell.' });
    E('bms_ebi', cid + '_bms_zc','control','BACnet/IP','campus supervision of cell',null,
      { critical:true, cross:'Z2 internal', note:'Supervisory only — cell holds last-good setpoints if lost.' });
    E(cid === 'cellA' ? 'rpp' : 'rpp_b', cid + '_ot_sw','electricity','Physical flow','cell services power',null);

    // DDC field-controller tier (WP07 4.2) — sensors terminate here, not at Z2
    N(cid + '_ddc_mech', cname + ' mechanical DDC','DDC field controller','BMS','Data hall','BMS_' + cid + '_ddc_mech',
      { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'Saia-Burgess PCD QronoX', cell:cname,
        standards:'IEC 62443-4-2 SL-3 certified, IEC 61131-3',
        attrs:{ scope:'aisle temp/RH, differential pressure, leak detection for ' + cname,
                note:'only BMS DDC certified to SL-3 — chosen deliberately for the field tier' },
        surface:['Field controllers are where BACnet MS/TP terminates: no authentication on the bus below this point.',
                 'DDC firmware patching in a live hall is high-risk — compensating controls needed instead.'] });
    N(cid + '_ddc_elec', cname + ' electrical DDC','DDC field controller','BMS','Data hall','BMS_' + cid + '_ddc_elec',
      { zone:'Z3', purdue:'L1', slt:'SL-T 2', vendor:'Saia-Burgess PCD QronoX', cell:cname,
        attrs:{ scope:'busway and rPDU branch metering, lighting for ' + cname } });
    N(cid + '_ids','OT IDS sensor — ' + cname,'Passive network sensor','OT','Data hall','DATA_' + cid + '_ids_tap',
      { zone:'Z2', purdue:'L2', slt:'SL-T 3', vendor:'Nozomi Guardian', cell:cname,
        attrs:{ mode:'passive SPAN / TAP', position:'cell OT switch mirror port' },
        surface:['Without a sensor inside the cell, a cell-bounded compromise is also a detection-bounded one.'] });
    E(cid + '_ddc_mech', cid + '_gw','control','BACnet MS/TP','field points to gateway','DATA_' + cid + '_ot_trunk');
    E(cid + '_ddc_elec', cid + '_gw','control','BACnet MS/TP','branch metering to gateway','DATA_' + cid + '_ot_trunk');
    E('jace_a', cid + '_ddc_mech','control','BACnet/IP','field point normalisation',null,
      { critical:true, cross:'Z2 -> Z3', note:'JACE reaches directly into the field tier — the conduit that matters most.' });
    E('jace_a', cid + '_ddc_elec','control','BACnet/IP','field point normalisation',null, { critical:true, cross:'Z2 -> Z3' });
    E(cid + '_ot_sw', cid + '_ids','data','Ethernet/TCP-IP','SPAN mirror to IDS sensor',null,
      { oneway:true, note:'Mirror port only — the sensor has no transmit path onto the segment.' });
    E(cid + '_ids','ids','data','Ethernet/TCP-IP','sensor telemetry to IDS console',null, { critical:true });
  }

  // resolve
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
  if (missing.length) console.warn('[campus-graph] meshes not found:', missing);

  return { nodes, edges: live, adj, geomIndex, missing,
    trace(startId, dir = 'both', maxDepth = 12) {
      const seenN = new Set([startId]), seenE = new Set();
      let frontier = [startId];
      for (let d = 0; d < maxDepth && frontier.length; d++) {
        const next = [];
        for (const id of frontier) {
          const list = dir === 'up' ? adj[id].in : dir === 'down' ? adj[id].out : [...adj[id].in, ...adj[id].out];
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
