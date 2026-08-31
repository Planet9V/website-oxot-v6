# The accompanying the 3d Model Generator Procedure

The kit's above. The answer to "what's the best way" is: freeze everything generic, author one file.

That's what makes it repeatable. explorer.html, three-d-stage.js, validate.js and enhance_model.py never change — so the Connection Explorer, asset list, asset viewer, filters, tracing and viewpoints come out identical on every site. You author model.js (geometry + graph) and edit four lists in site-config.js. Corridor lines in routing.js are the one other per-site knob.

PROMPT.md is what you hand me with your documents. Fill in facility, scope boundary, level of detail, attach the HLD/DLD/ICD, and it runs the same seven phases.

AUTHORING.md is the procedure behind it — seven phases, each with a gate you can't skip past:

Scope → equipment count matching the DLD, written assumptions
Geometry → mesh count, zero missing meshes
Graph → zero phantom endpoints, zero danglers
Routing → zero unsolved connections
Export → validator passes on the written files
Explorer → panels work, selection resolves, tracing reaches field devices
Blender + handoff
The eight invariants at the end are the ones that actually protect the outcome — mesh names are the binding key, the graph stays closed, routes are solved not hand-authored, the ICD wins on conflicts, and hardwired interfaces never get collapsed into Ethernet.

One practical note: the biggest determinant of quality is phase 3 done from the ICD row by row rather than from a general sense of how such plants connect. Your OXOT ICD had 184 specified interfaces with signal, direction and safety class — that's what made the last model defensible rather than plausible.