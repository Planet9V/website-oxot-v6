# Project context — OXOT hyperscale datacenter model

Read `README.md` first. This file is the short brief for an assistant working in this repo.

## What this is

A representative hyperscale AI datacenter: 3D geometry plus a typed asset and connection graph
with solved containment routing. Built for IEC 62443-3-2 zone-and-conduit assessment,
consequence analysis, and cyber-risk quantification.

## Facts

- 415 assets, 1005 connections, 1005 solved routes (15,693 m)
- 97 critical conduits (IEC 62443-3-2 §5.6), 167 hardwired or serial connections with no network path
- 134 P&ID-tagged equipment items and 184 specified interfaces from the ICD
- Integrity is enforced and must stay that way: 0 danglers, 0 phantom endpoints, 0 unrouted connections

## Ground rules

1. **`graph/*.json` is the deliverable.** Framework-neutral, production-ready. Consume it; do not
   hand-edit it. Facility and hall graphs are generated from `model/campus-model.js` — change the
   model, then regenerate.
2. **`icd-graph.json` wins.** It is the specified interface truth. Where the modelled graph
   disagrees with it about a connection, the ICD is correct.
3. **`mesh` is the binding key.** Every asset names its GLB node. Never rename a mesh without
   updating the graph, and never invent one.
4. **The HTML files are references.** three.js prototypes proving the data. The target is
   Babylon.js — rebuild the viewer in the target codebase's idiom, reading the same JSON.
5. **Keep the graph closed.** Adding an asset means adding at least one connection. Adding a
   connection means both endpoints resolve to defined assets. Re-run the integrity check.
6. **Re-solve routes after moving anything.** Edit `graph/positions.json`, run
   `graph/routing.js`. Do not hand-author route point lists.

## Regenerating

```bash
# geometry -> GLB: open model/hyperscale-campus.html, click Download GLB

# higher-quality GLB with metadata, ICD records and run geometry baked in:
blender --background --python blender/enhance_campus.py -- \
  --glb hyperscale_campus.glb --graph graph --routes --icd \
  --out build/hyperscale_campus_hq.glb
```

## Vocabulary

- **Zone** — IEC 62443 zone Z0..Z5. **SL-T** — target security level.
- **Purdue** — ISA-95 level, L0 field through L5 enterprise.
- **Conduit** — a connection crossing a zone boundary. `critical_conduit` marks those needing
  explicit §5.6 documentation.
- **Service** — what flows (water, condenser, air, electricity, fuel, data, control, fire, security).
- **Protocol** — how it is carried. `Physical flow` means no protocol: pipe, duct, busway, cable.
- **Local drop vs corridor run** — routing mode. Local drops come straight off the nearest header;
  corridor runs follow the containment lattice.
