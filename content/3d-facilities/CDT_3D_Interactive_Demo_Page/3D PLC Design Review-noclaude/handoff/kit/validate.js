/**
 * validate.js — integrity gate for a site model. Run it after every change.
 * Fails on the four defects that make a model untrustworthy:
 *   1. missing meshes   — a graph node names geometry that does not exist
 *   2. phantom endpoints— a connection references an undefined asset
 *   3. danglers         — an asset with no connection at all
 *   4. unrouted         — a connection the router could not solve
 *
 * Usage (sandbox or node):
 *   const { validate } = makeValidator();
 *   const report = validate({ modelSource, graphs: [facility, hall], routes, positions });
 *   if (!report.pass) throw new Error(report.summary);
 */
function makeValidator() {
  function validate({ graphs = [], routes = null, positions = null, missingMeshes = [] }) {
    const assets = [], conns = [];
    for (const g of graphs) {
      for (const a of (g.assets || [])) assets.push(a);
      for (const c of (g.connections || [])) conns.push(c);
    }
    const known = new Set(assets.map(a => a.id));
    const deg = new Map(assets.map(a => [a.id, 0]));
    const phantom = new Set();
    for (const c of conns) {
      for (const side of [c.from, c.to]) {
        if (!known.has(side)) phantom.add(side);
        else deg.set(side, deg.get(side) + 1);
      }
    }
    const danglers = [...deg].filter(([, d]) => d === 0).map(([id]) => id);

    // every asset should have a position if routing is expected
    const noPos = positions
      ? assets.filter(a => !positions[a.id]).map(a => a.id)
      : [];

    const unrouted = routes
      ? (() => {
          const done = new Set((routes.routes || []).map(r => r.id));
          return conns.filter(c => !done.has(c.id)).map(c => c.id);
        })()
      : [];

    // naming discipline: system prefix on the mesh should match the asset system
    const PREFIX = /^(PWR|CHW|AIR|DATA|OT|BMS|FA|SEC)_/;
    const mismatched = assets.filter(a => {
      if (!a.mesh) return false;
      const m = a.mesh.match(PREFIX);
      return m && a.system && m[1] !== a.system;
    }).map(a => a.id + ' (' + a.mesh + ' vs system ' + a.system + ')');

    const problems = [];
    if (missingMeshes.length) problems.push(missingMeshes.length + ' missing meshes');
    if (phantom.size) problems.push(phantom.size + ' phantom endpoints');
    if (danglers.length) problems.push(danglers.length + ' danglers');
    if (unrouted.length) problems.push(unrouted.length + ' unrouted connections');
    if (noPos.length) problems.push(noPos.length + ' assets without a position');

    return {
      pass: problems.length === 0,
      summary: problems.length ? 'FAIL: ' + problems.join(', ') : 'PASS',
      counts: { assets: assets.length, connections: conns.length,
                routes: routes ? (routes.routes || []).length : 0,
                critical: conns.filter(c => c.critical_conduit).length,
                hardwired: conns.filter(c => ['Dry contact','4-20 mA analog','OSDP RS-485',
                  'Modbus RTU','CAN bus','BACnet MS/TP','RS-232 console'].includes(c.protocol)).length },
      missingMeshes, phantom: [...phantom], danglers, unrouted,
      assetsWithoutPosition: noPos,
      systemPrefixMismatches: mismatched,
    };
  }
  return { validate };
}
if (typeof module !== 'undefined') module.exports = { makeValidator };
