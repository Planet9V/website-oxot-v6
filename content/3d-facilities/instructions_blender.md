333 assets, 815 connections, 33 critical conduits — three files by scale, extracted programmatically from the model so mesh names match the GLB exactly.

facility-graph.json — 117 assets / 143 connections
hall-graph.json — 216 assets / 672 connections (all 6 rows × 16 racks, every per-rack power/coolant/fibre/console link)
rack-graph.json — 10 component classes = 41 units per rack, 22 internal connections, as a template applied to all 96 instances (3,936 components / 2,112 connections expanded)
index.json + README.md — manifest, schemas, legends, Babylon binding snippet
Every asset carries mesh (GLB node name), zone, Purdue level, SL-T target, vendor, standards, attributes and attack-surface notes. Every connection carries service, protocol, the physical run realising it, direction, zone crossing, and the §5.6 critical flag.

On Blender: worth doing, and the script route is the one that keeps this data intact — procedural build from these JSONs with bevels, PBR materials, linked-duplicate instancing for the 96 racks, and the asset metadata written as custom properties so it exports into the GLB as extras. 