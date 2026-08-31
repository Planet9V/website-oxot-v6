# PROMPT.md — the brief to hand an assistant

Copy the text below, fill the bracketed lines, and attach your documents. It produces the same
deliverable every time.

---

**Build a facility model, asset graph and Connection Explorer for the facility described in the
attached documents, following `kit/AUTHORING.md` exactly.**

**Facility:** [name and type — water treatment works, substation, pharma fill-finish line, port
terminal, hospital estate, rail depot]

**Documents attached:** [list them — HLD, DLD, ICD, P&IDs, single-line diagrams, asset register,
network diagrams]

**Scope boundary:** [what is in — buildings, yards, perimeter, upstream utilities; and what is
explicitly out]

**Level of detail:** [which areas need component-level fidelity, and which can be zone-band LOD]

**Systems present:** [the systems and their prefixes, or "derive from the documents"]

Work through the seven phases in `AUTHORING.md` and stop at each gate to report before
continuing:

1. **Scope** — write `SCOPE.md`: boundary, systems with prefixes, zone and SL-T assignment per
   system, LOD decision, and an explicit assumptions list for anything the documents do not
   state. Report the equipment count per system against the DLD.
2. **Geometry** — copy `model-template.js` to `model.js` and author section A. Real dimensions in
   metres, rectilinear runs, named groups per room, builder functions for repeated units, no
   roof. Report mesh count and confirm `missing meshes 0`.
3. **Graph** — author section B from the **ICD, not from memory**. One `E()` per interface row
   with its real protocol; `N()` for every endpoint with zone, Purdue level, SL-T, vendor,
   standards, attributes and attack-surface notes. Preserve hardwired interfaces as dry contact,
   4–20 mA, OSDP, Modbus RTU, CAN, BACnet MS/TP or serial — never as Ethernet. Flag zone
   crossings and safety-authority links as `critical` with the governing rule in the note.
   Report `validate.js` output: 0 phantom endpoints, 0 danglers.
4. **Routing** — capture positions, set the corridor lattice and service altitudes in
   `routing.js` to this site's real containment, and solve. Report 0 failures, length per
   service, and the busiest corridors.
5. **Export** — generate `graph/*.json` including `icd-graph.json` parsed mechanically from the
   ICD, with a P&ID-tag-to-mesh crosswalk. Tags with no geometry keep `mesh: null` and
   `geometry_bound: false`. Report totals and the integrity counts.
6. **Explorer** — copy the viewer files, edit **only** `site-config.js`. Report that all panels
   work, click-to-select resolves, and tracing reaches field devices.
7. **Handoff** — Blender command, then a bundle with `graph/`, `model.js`, the viewer, the
   Blender script, a `README.md` with the schema and Babylon build path, and a `CLAUDE.md` with
   the ground rules.

**Do not change** `explorer.html`, `three-d-stage.js`, `validate.js` or `enhance_model.py`. Site
differences belong in `model.js` and `site-config.js`. Corridor lines in `routing.js` are the one
exception.

**Tell me explicitly:** what you inferred rather than read from my documents, any ICD row you
could not resolve to two assets, and any equipment named in the documents that you did not model
and why.

---

## Variations worth asking for

Append any of these to the brief:

- *"Split the GLB export per system, sharing one world origin."* — for streaming large sites.
- *"Build the areas in priority order and stop after each."* — for sites too large for one pass.
- *"Model only the OT estate; represent IT as boundary endpoints."* — narrows a big campus to
  the assessment scope.
- *"Add a second LOD tier for the repeated units."* — when the repetitive area dominates.
- *"Produce the zone-and-conduit register as a separate table keyed on conduit id."* — when the
  62443 workshop needs a document rather than a model.

## What you get back, every time

- `model.js` — the authored site: geometry plus asset and connection graph
- `SCOPE.md` — boundary, systems, zones, LOD, assumptions
- `graph/` — asset register, connection graph, parsed ICD, solved routes, positions, manifest
- The Connection Explorer with the asset list, asset viewer, filters, tracing and viewpoints
- A metadata-carrying GLB via the Blender pipeline
- A handoff bundle ready for Claude Code and Babylon
