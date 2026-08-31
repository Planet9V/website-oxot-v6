# Babylon.js Connection Explorer

A from-scratch Babylon.js port of `../hyperscale-campus-explorer.html` (the three.js
reference — **read-only, never modified**; it's a design reference, not production code).
Single self-contained file: `hyperscale-campus-explorer.html`.

## Status (as of `BUILD_TAG` `views-v5-8s-rotate-delay`)

- **Phase 1 (complete):** GLB load, asset binding, click-to-select, camera fly-to, info panel.
- **Phase 2 (complete):** graph overlay (markers + tubes), Graph/Physical/Both view-mode
  toggle, filters, upstream/downstream/both tracing, search, asset panel, hover tooltip,
  keyboard shortcuts.
- **Phase 3 (complete):** rack-internal expansion (`graph/rack-graph.json`'s 10-component
  template expanded live across all 96 racks — 3,929 rack-internal components, ~12,672
  connections, lazily constructed on first need), full ANALYSE parity with the three.js
  reference (Threat Path Explorer, Cascading Failure, Risk Portfolio, Assumptions &
  Provenance).
- **Views/Tour feature (complete, 2026-08-31):** see "Views, sky, and Tour" below — this is
  the newest, least-battle-tested part of the codebase and the most likely place to still have
  rough edges.
- **Deliberately deferred, not started:** the 5 gap-fill assets from the completed gap
  analysis (water treatment, HSM, patch/firmware mgmt, EPMS, BESS safety layer), any
  visual/Blender enhancement pass, and richer loading-dock geometry (see "Loading dock" below
  — currently a low-fidelity placeholder, not a finished asset).
- **Live stat readout right now:** `4398 assets · 2011 bound to geometry · 2387 unbound ·
  5466 meshes` (base GLB + runtime-constructed loading dock; the graph overlay adds up to
  ~18,000 more markers/tubes once rack-internal detail is shown).

## Quick start

No build step — static HTML, loads Babylon.js from CDN (requires internet access on first
load; cached by the browser after). Serve the **repo root's parent**
(`3d_dev/CDT_Hyperscale_TM/..`, i.e. this file must be reachable at a path where `../` and
`../graph/` both resolve to the sibling `hyperscale_campus.glb` and `graph/*.json`):

```bash
cd 3d_dev/CDT_Hyperscale_TM
python3 -m http.server 8124
```

Then open `http://localhost:8124/babylon/hyperscale-campus-explorer.html`.

**Port 8124 is this project's documented convention** (see `package.json`'s `start`/`dev`/
`preview` scripts) — don't invent a different port per session. Check `ps aux | grep
http.server` before starting a second one; a stray extra server on a different port has
caused real confusion before ("why are the changes not showing up") — see gotcha #1 below.

**Confirm a clean load** by checking the bottom-left stats readout matches the numbers above
(± a few if you've since added/removed data), the build tag matches the last commit's edits,
and the browser console has no errors beyond Babylon's own version-log line.

**This plain `http.server` sends no cache-control headers.** Every reload during development
should be a **hard reload** (Cmd+Shift+R / Ctrl+Shift+R), not a plain refresh — a plain
refresh has repeatedly served stale JS/JSON in this project, wasting time debugging a "bug"
that was actually just an old cached copy. The `BUILD_TAG` constant at the top of the script
(bumped on every rendering-related edit) is your ground truth: check it in the on-page stats
readout before trusting anything else about what you're looking at.

## User guide

- **Click** any component (physical or in the graph overlay) to select it, fly the camera to
  it, and open the right-hand info panel.
- **View mode** (left panel, top): `Physical` shows the building only; `Graph` dims physical
  materials and shows the full connection network (this is the **default** on load — do not
  change without an explicit request, see `babylon-viewer-graph-mode-opacity-state` memory);
  `Both` shows both. Keyboard: `P` / `G` / `B`.
- **Search**: type 2+ characters to match asset label/mesh/kind/location/cell, or raw mesh
  names. Click a result to select+fly.
- **Viewpoints** (left panel): 10 one-click camera presets — Full campus, Data hall, GPU rack
  close-up, Core IT room, Electrical yard, Power room, Central facility, MMR/NOC, Reception &
  security, Loading dock. `F` = full campus. Every stop frames off REAL geometry (see
  `frameByLocation`/`frameByMeshPrefix` below), not hand-picked coordinates.
- **Tour** (below the Viewpoints row): auto-cycles all 10 stops in a loop, ~4s hold at each,
  hides the analyst side panels for a clean showcase view, forces Physical mode. Exit via the
  on-screen "Exit tour" button or Escape.
- **Filters** (left panel): service/protocol/zone chips + critical-conduits-only toggle.
- **Trace**: Upstream / Downstream / Both from a selected asset's info panel; Escape clears.
- **Assets** (left panel): browse everything grouped by zone/system/cell.
- **ANALYSE** (left panel): Threat Path, Cascading Failure, Risk Portfolio, Assumptions &
  Provenance. During an active threat walk or cascade, the REAL equipment meshes and conduit
  tubes glow to show status — **never the diamond graph markers**, even if the marker
  Show/Hide toggle is set to Show (this was an explicit, hard requirement — see
  `paintNode()`).
- **Node markers** (diamond/octahedron shapes): hidden by default in every mode via the
  Marker Colour panel's Hide/Show toggle. They exist only as a fallback click-target for the
  ~2,400 assets with no physical mesh binding; real equipment and conduit tubes are always
  clickable independent of this toggle.
- **Rack-internal detail** (CONDUITS panel): hidden by default (rendering-scale reasons); a
  threat walk or cascade that reaches into a rack shows its own edges regardless of the toggle
  (real conduit tubes only — again, never diamond markers for the reached nodes themselves;
  see `paintNode` targeting `asset._node`, not the marker).

### Views, sky, and Tour (new 2026-08-31, read this before touching camera code)

- **On-load default is a tight top-down view**, not a 3/4-angle establishing shot:
  `beta: 0.001` (not exactly 0 — ArcRotateCamera's up-vector is undefined at true beta=0),
  `alpha: -Math.PI/2`, `padding: TOP_VIEW_PADDING` (currently `0.32` — has been tuned closer
  several times by explicit request; check the live value before assuming it's still the
  number in this doc). The "Full campus" Viewpoint button matches this exactly (`TOP_VIEW` /
  `TOP_VIEW_PADDING` constants, shared).
- **Idle auto-rotate**: `camera.alpha` orbits slowly (`IDLE_ROTATE_SPEED`, 0.025 rad/sec)
  starting `INITIAL_ROTATE_DELAY_MS` (currently 8000ms) after the initial top-down fit
  settles, pauses on any interaction or programmatic camera move, resumes after
  `IDLE_RESUME_AFTER_MS` (25000ms) of quiet. **Known accepted tension:** at the top-down
  default (`beta≈0`), alpha-only rotation is a visual no-op — nothing to reveal looking
  straight down. It still works once the camera's beta changes (any other Viewpoint, or a
  manual drag). This was a deliberate choice, not an oversight — flagged to the user rather
  than silently resolved either way, since "tight top view on load" and "slow pan by default"
  were both real, separate requests.
- **Procedural gradient sky + fog**: a large inverted sphere painted with a canvas-gradient
  `DynamicTexture` (`SKY_ZENITH`/`SKY_HORIZON` colors), self-contained — no external HDR
  asset, no image-based-lighting side effects on this scene's plain `StandardMaterial`s.
  `scene.fogStart`/`fogEnd` are tuned against the camera's ACTUAL typical distance for the
  default framing (currently `140`/`450`) — **if you change the default camera distance
  significantly, re-check these against the new distance** (`cam.radius` in the console), or
  the fog will either do nothing or wash out the whole scene. This has already gone wrong
  once this session.
- **Every Viewpoint sets an explicit `alpha`/`beta`.** `flyTo()`/`frameObject()`/
  `frameByLocation()`/`frameByMeshPrefix()` only animate camera `target`+`radius` unless you
  pass `opts.alpha`/`opts.beta` — otherwise the camera silently inherits whatever angle it had
  before, which can point straight through an adjacent wall at close range with zero error or
  warning. Confirmed live on the Loading Dock stop before this was understood. If you add a
  new Viewpoint, give it an explicit angle (reuse `DEFAULT_ANGLE` unless the space needs
  something more specific, like `hall`/`rack` do).
- **`frameByLocation(locations, opts)`** unions the real world-space bounding boxes of every
  asset whose `.location` field matches (accepts one string or an array), then frames that.
  **`frameByMeshPrefix(prefix, opts)`** does the same off raw mesh-name prefix instead — used
  for the GPU rack close-up, since "Data hall" as a location would mean the whole hall, not
  one rack. Both fall back to `frameObject(root, opts)` with a `console.warn` if nothing
  resolves — check the console if a new Viewpoint shows the whole campus instead of what you
  expected.

### Loading dock

A real, previously-undiscovered gap: the design spec
(`facility_reseearch/Hyperscale_Design/Hyperscale-Data-Center-Complete-Reference-Architecture.md`,
Zone G) called for a loading dock/staging/burn-in area with real dock-leveler specs, but it
was never built — zero mesh nodes, zero graph assets, never mentioned as cut anywhere in this
project's tracking files. Closed with a **low-fidelity placeholder**: a runtime-constructed
box + canopy + 3 door insets (see the block right after `const root = ...` near the top of the
script), positioned in the real south service yard, registered as a real
`graph/facility-graph.json` asset (`id: "loading_dock"`) so it's searchable/selectable/framable
like everything else. **This is explicitly a placeholder, not a finished asset** — if asked to
improve it, the natural next step is more detail (dock levelers, a small staging-room
interior), not a location change.

## Developer guide

### Data flow

On load: the GLB (`../hyperscale_campus.glb`), facility/hall graphs, rack-graph template,
routes (`../graph/routes.json`, `../graph/rack-routes.json`), and positions all fetch in
parallel. See `graph/README.md` for field-level shapes.

### The coordinate-system fix (read before touching any overlay geometry)

Babylon's glTF loader wraps every import in a synthetic **`__root__`** node that corrects the
right-handed source coordinate convention into Babylon's left-handed default scene.
`positions.json`/`routes.json` coordinates are recorded in the *pre-correction* frame. **Every
piece of overlay geometry (graph markers, route tubes, the loading-dock placeholder, and every
fixed-viewpoint camera target) must be parented under `root`** and fed raw JSON `(x,y,z)`
directly as local coordinates, or transformed through `root.getWorldMatrix()` (`toWorld()`
helper) if you have a WORLD-space value you need to convert TO local — never placed at
scene-root level, which silently mirror-flips one axis. The loading-dock code demonstrates the
inverse direction (`BABYLON.Matrix.Invert(root.getWorldMatrix())`) for going from a world-space
position you have in mind to the local position to actually assign.

### Key in-file structures

- `assets` (Map, id → asset record with `._node` bound) / `byName` (Map, mesh name → node).
  **As of this session, rack-internal component assets are bound to `._node` too** (they used
  to only get the reverse `mesh.metadata.assetId` link) — this matters because `paintNode()`
  and `frameObject()`/camera framing key off `asset._node` directly with no mesh-name
  fallback; omitting this binding silently breaks glow-painting for whatever you're adding.
- `edges` / `adj` — combined facility+hall+rack-internal connection list and adjacency map.
- `nodeMarks` / `edgeTubes` (Maps, id → mesh) — the graph overlay (`gnode_`/`gedge_` prefixes).
  Conduit tubes render through the raw routed waypoints with **no Catmull-Rom smoothing** (a
  smoothing spline isn't constrained to stay inside its waypoints and can overshoot sharp
  corners — removed this session after a live diagonal-fraction re-check confirmed the
  underlying route data was still clean, so the visible "misalignment" was a rendering
  artifact, not a data regression).
- `S` — filter/trace/mode/tour state. `S.mode` default is `'graph'` (do not change without an
  explicit request). `edgeVisible(e)`/`nodeVisible(id)` derive visibility from it; `apply()`
  re-applies visibility everywhere. `S.showNodeMarkers` (diamond markers) and
  `S.showRackInternal` both default `false`.
- `paintNode(id, state)` / `paintEdge(id, state)` / `STATE_MATS` — the analysis-painting
  system behind Threat Path/Cascade. `paintNode` targets `assets.get(id)?._node` (the REAL
  mesh), stashing/restoring the original material — **never the diamond marker**, per explicit
  requirement.
- `VIEWPOINTS` (object, key → framing function) / `VIEWPOINT_ORDER` (its keys, tour iteration
  order) / `VIEWPOINT_LABELS` — the 10-stop Viewpoint system. `flyTo(center, radius, opts)`
  returns its actual animation duration in ms; the Tour uses this to schedule its next hop
  rather than guessing at timing.
- `idleRotating` / `pauseIdleRotate()` — idle auto-rotate state. Every camera move should
  route through `flyTo()` (which calls `pauseIdleRotate()` itself) rather than mutating
  `camera.alpha`/`radius`/`target` directly, or idle-rotate won't know to pause.
- `matBase` — per-material `{alpha, transparencyMode}` snapshot, what `dimPhysical()` restores
  to for Graph-mode dimming. Not hardcoded to `alpha:1`, so a future Blender-enhanced GLB with
  legitimate non-opaque materials restores correctly with zero code changes.
- `window.__dbg` — a deliberate, permanent debug surface (not scaffolding to delete). Exposes
  `scene`, `assets`, `edges`, `S`, `threatState()`, `cascadeState()`, and more. Add to it as
  you extend the file — module-scoped `const`s aren't reachable from the browser console
  otherwise, and this has been the single most useful tool for live-verifying real runtime
  state throughout this project's development.

### Known gotchas (hit once already, save yourself the time)

1. **`document.hidden === true` freezes Babylon's entire render loop, including every
   animation.** If you're driving the browser via automation (claude-in-chrome or similar) and
   camera movement appears completely broken with zero console errors, check
   `document.hidden`/`document.visibilityState` before debugging the code — a backgrounded tab
   fully stalls `requestAnimationFrame`, and Babylon's animation system depends on it. Bring
   the tab to the foreground (a screenshot/click action does this) and re-test. This produced
   a real false alarm this session — camera state appeared completely stuck for many seconds
   before this was understood.
2. **`BABYLON.MeshBuilder.CreateOctahedron` does not exist** in this Babylon.js version. Use
   `CreatePolyhedron(name, {type:1, size}, scene)` — type 1 is octahedron.
3. **A filter chip built from a fixed enum dict permanently hides any real value outside that
   dict** unless you explicitly let unrecognized values pass through (see `edgeVisible()`'s
   `PROTOCOLS[e.protocol] &&` guard).
4. **Fog/sky constants must be tuned against the ACTUAL measured camera distance for the
   framing they'll be seen from**, not guessed — check `camera.radius` live before picking
   `fogStart`/`fogEnd`. Getting this wrong washes out the entire default view.
5. **A new Viewpoint needs an explicit `alpha`/`beta`** or it inherits whatever angle the
   camera had before, which can point through an adjacent wall.
6. **Rack-internal assets need `asset._node` bound explicitly**, not just the reverse
   `mesh.metadata.assetId` link — the rack-graph.json expansion loop does this now, but if you
   add another synthetic asset-creation path, remember both directions or `paintNode`/camera
   framing will silently no-op for it.

### Extending

Same incremental pattern this was built with: read the relevant section above, make one
change, verify it live in a real browser (hard-reload, check `BUILD_TAG`, check
`window.__dbg`, take a screenshot and actually look at it — checking a material/property
number alone has caused real mistakes in this project's history), then move on.

## File structure map (for a developer new to this project)

```
3d_dev/CDT_Hyperscale_TM/
├── babylon/
│   ├── hyperscale-campus-explorer.html   <- THE viewer. Single file, everything lives here.
│   └── README.md                          <- this file
├── hyperscale-campus-explorer.html        <- three.js REFERENCE. Read-only, never edit.
├── hyperscale_campus.glb                  <- the 3D model, loaded by the Babylon viewer
├── graph/
│   ├── facility-graph.json                <- campus-level assets + connections (edit this
│   │                                          to add a new facility-level asset, e.g. the
│   │                                          loading_dock entry)
│   ├── hall-graph.json                    <- data-hall-level assets + connections
│   ├── rack-graph.json                    <- ONE rack as a template (10 components, 24
│   │                                          connections), expanded live across 96 racks by
│   │                                          the viewer itself at load time
│   ├── routing.js                         <- the corridor-following pathfinder. Has a real,
│   │                                          documented lane-offset bug class (see the
│   │                                          routingjs-lane-offset-runaway-bug memory) --
│   │                                          never edit this file directly to fix it; zero
│   │                                          SERVICE[s].lane on your OWN router instance
│   │                                          before calling routeAll()
│   ├── routes.json                        <- solved facility/hall routes (generated offline,
│   │                                          see the regen pattern in routingjs's memory)
│   ├── rack-routes.json                   <- solved rack-internal routes (generated by
│   │                                          generate-rack-overlay.js)
│   ├── positions.json / rack-positions.json  <- asset anchor points for the graph overlay
│   ├── generate-rack-overlay.js           <- offline generator for rack-positions/routes.json
│   ├── hazard-log.json                    <- CyHAZOP hazards, feeds Cascading Failure
│   ├── icd-graph.json                     <- interface-control-document detail
│   └── README.md                          <- data model field-level reference
├── task_plan.md                           <- the FULL decision/audit log. Long (60KB+); the
│                                              "Post-completion fixes" section has every visual
│                                              fix this session in chronological order with
│                                              verification evidence. Read before re-tuning
│                                              anything already tuned once.
├── progress.md                            <- session-by-session summary + "5-Question Reboot
│                                              Check" for fast orientation
├── findings.md                            <- research/verification notes
└── handoff/                                <- a SEPARATE, STALE (2026-08-25) data export
                                                bundle for publishing the model to another
                                                system/website. NOT the same thing as this
                                                README. Don't confuse the two, and don't
                                                assume it's current.
```

Outside `babylon/`, `graph/`, and the three tracking `.md` files above, the rest of
`3d_dev/CDT_Hyperscale_TM/` is marketing/deck material (`OXOT *.html`, `*-brochure*`, etc.) and
a separate `CDT_Hyperscale_TM-2/` directory — unrelated to the Babylon viewer, safe to ignore
for viewer development.

## Cross-session memory (read these before touching rendering/opacity/routing code)

This project has an auto-memory system at
`~/.claude/projects/-Users-jimmcknney-project-ruv/memory/` (Claude-specific, but the content is
useful reading for any developer picking this up):

- `babylon-viewer-graph-mode-opacity-state.md` — locked-in opacity/color numbers for Graph
  mode. Don't re-tune without a new explicit request.
- `babylon-viewer-views-sky-tour-dock-feature.md` — everything about the Views/Tour/sky/dock
  feature, including the gotchas listed above in more detail.
- `routingjs-lane-offset-runaway-bug.md` — the routing.js bug class and its proven fix
  pattern.
- `babylon-viewer-visual-verification-discipline.md` — always open and look at a real
  screenshot before claiming a visual change worked; a property/number alone isn't enough.
- `babylon-viewer-dev-server-and-cache-verification.md` — the port-8124 / hard-reload
  convention in more detail.
- `disambiguate-overloaded-visual-terms-before-guessing.md` — "equipment"/"the X" can mean
  different rendered layers; confirm which one before guessing.
- `hyperscale-babylon-blender-material-coupling.md` — still-open concern about
  `dimPhysical()`'s restore path once a Blender-enhanced GLB lands.

## Reference

- Full step-by-step build log, verification evidence, and every design decision:
  `../task_plan.md`, `../findings.md`, `../progress.md`.
- Data model: `../graph/README.md`.
- Three.js reference implementation (do not edit): `../hyperscale-campus-explorer.html`.
- Building program / space specification: `facility_reseearch/Hyperscale_Design/
  Hyperscale-Data-Center-Complete-Reference-Architecture.md` (the source of truth used to find
  the loading-dock gap — worth checking against the model if something else seems missing).
