# blender-render-glb.py — headless-render a project GLB model to a PNG.
#
# Verified working on Blender 5.2.0 LTS; see docs/BLENDER-HEADLESS-RENDER.md
# for the two real bugs this hit and how they were fixed (mathutils import,
# render engine enum name), plus how to reuse this pattern.
#
# Usage:
#   Blender -b --python scripts/blender-render-glb.py -- <input.glb> <output.png> [width] [height]
#
# Example:
#   /Applications/Blender.app/Contents/MacOS/Blender -b --python \
#     scripts/blender-render-glb.py -- public/models/plc_s71500f_hq.glb \
#     public/generated/plc-hero.png 1600 1200

import bpy
import sys
import math
import mathutils

argv = sys.argv[sys.argv.index("--") + 1:]
glb_path, out_path = argv[0], argv[1]
width = int(argv[2]) if len(argv) > 2 else 1600
height = int(argv[3]) if len(argv) > 3 else 1200

# Clear the default scene (cube, default light, default camera) so only the
# imported model is in frame.
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

bpy.ops.import_scene.gltf(filepath=glb_path)

imported = [o for o in bpy.context.scene.objects if o.type == 'MESH']
if not imported:
    raise SystemExit(f"No mesh objects found after importing {glb_path}")

# Bounding box across all imported meshes, in world space — this is what
# lets the camera auto-frame any model without per-asset tuning.
xs, ys, zs = [], [], []
for o in imported:
    for corner in o.bound_box:
        world_corner = o.matrix_world @ mathutils.Vector(corner)
        xs.append(world_corner.x)
        ys.append(world_corner.y)
        zs.append(world_corner.z)
center = ((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, (min(zs) + max(zs)) / 2)
radius = max(max(xs) - min(xs), max(ys) - min(ys), max(zs) - min(zs)) or 1.0

# Camera: three-quarter angle, distance scaled to the model's real size.
cam_data = bpy.data.cameras.new("RenderCam")
cam = bpy.data.objects.new("RenderCam", cam_data)
bpy.context.collection.objects.link(cam)
dist = radius * 2.2
cam.location = (center[0] + dist * 0.7, center[1] - dist * 0.7, center[2] + dist * 0.5)
direction = mathutils.Vector(center) - cam.location
cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
bpy.context.scene.camera = cam

# Light: a sun lamp, angled, plus a dark-navy world background matching the
# OXOT dark-theme palette rather than Blender's default grey.
light_data = bpy.data.lights.new("RenderSun", type='SUN')
light_data.energy = 3.0
light = bpy.data.objects.new("RenderSun", light_data)
light.rotation_euler = (math.radians(55), 0, math.radians(35))
bpy.context.collection.objects.link(light)

world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
bpy.context.scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
if bg:
    bg.inputs[0].default_value = (0.02, 0.03, 0.04, 1.0)

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = width
scene.render.resolution_y = height
scene.render.filepath = out_path
scene.render.image_settings.file_format = 'PNG'

bpy.ops.render.render(write_still=True)
print(f"RENDER_OK: {out_path}")
