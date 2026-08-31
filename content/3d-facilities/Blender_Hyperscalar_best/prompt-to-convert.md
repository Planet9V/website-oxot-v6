# Replace the current 3D model in my Babylon scene with the OXOT hyperscale datacenter model in this repo, and wire up the asset graph.

Read CLAUDE.md and README.md first, then graph/README.md for the schema.

Step 1 — get the geometry. Serve the repo over HTTP, open model/hyperscale-campus.html, click Download GLB. That gives hyperscale_campus.glb — 5,879 meshes, hierarchy preserved. Put it wherever my project keeps 3D assets. If Blender is available, prefer running the pipeline in blender/enhance_campus.py with --routes --icd instead, so the metadata and the routed run geometry are baked into the file.

Step 2 — find and replace the current model. Locate wherever my scene currently loads its model (search for ImportMesh, AppendSceneAsync, .glb, .babylon). Replace that load with the campus GLB. Keep my existing camera, lighting and render pipeline setup unless the model demands otherwise — but note the model is ~57 m × 41 m in metres, Y-up, sitting on the ground plane at y=0, so my camera radius and clipping planes almost certainly need rescaling. Tell me what you changed there.

Step 3 — bind the graph. Load graph/facility-graph.json and graph/hall-graph.json, index every asset by its mesh field against the loaded node names, and attach the asset record to each node's metadata. Log any asset whose mesh doesn't resolve — there should be zero.

Step 4 — make it interactive. Implement, in my codebase's own patterns:

Click-to-select that walks up the parent chain to the owning asset, so clicking a tray resolves to its rack
Zoom-to-component: merge the asset subtree's world bounds and animate the camera target and radius
Hover tooltip showing the asset label and its mesh name
A panel showing the selected asset's zone, Purdue level, SL-T target, vendor, standards, attributes and attack-surface notes, plus its inbound and outbound connections with protocol
Upstream/downstream tracing from the selection, highlighting the dependency chain in 3D
Filters on service, protocol and IEC 62443 zone, and a critical-conduits-only mode
model/hyperscale-campus-explorer.html is the working reference for all of this — read it for the algorithms, don't copy its DOM.

Step 5 — draw the runs. Load graph/routes.json and build a tube per route from its points array, coloured by service, with the route record on metadata. Route ids match connection ids, so they join directly.

Constraints: don't hand-edit anything in graph/. Don't rename meshes. If a connection's endpoints don't both resolve, say so rather than dropping it silently.

When you're done, tell me the asset bind rate, the route count drawn, and anything in my existing scene setup that conflicted.

Two things worth knowing before you run it: if your scene already has its own picking or highlight layer, mention that in the prompt so it extends yours rather than adding a parallel system. And if your project is TypeScript, add "generate types from the JSON schemas in graph/README.md" — the shapes are stable enough to be worth typing properly.