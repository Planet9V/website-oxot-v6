#!/usr/bin/env python3
"""
enhance_campus.py — Blender pipeline for the OXOT hyperscale datacenter model.

Takes the GLB exported from hyperscale-campus.html plus the JSON graph in graph/,
and produces a higher-quality, metadata-carrying GLB for the Babylon scene:

  1. imports the GLB, preserving every node name
  2. writes the asset register onto each object as custom properties
     (Blender custom props export as glTF `extras`, readable in Babylon as
      mesh.metadata.gltf.extras)
  3. tags connection geometry with its service / protocol / conduit criticality
  4. rebuilds materials as proper PBR (metallic, roughness, emission)
  5. adds bevels and smooth shading so edges catch light instead of reading flat
  6. shares mesh data between identical components (96 racks stop being 96 copies)
  7. optionally swaps in the high-detail rack GLB for named rows
  8. optionally emits LOD1 / LOD2 decimated variants
  9. re-exports GLB with extras enabled, and writes a report

Run headless:

  blender --background --python blender/enhance_campus.py -- \
      --glb hyperscale_campus.glb \
      --graph graph \
      --out build/hyperscale_campus_hq.glb

Optional:
      --rack-glb hyperscale_rack.glb --rack-detail-rows row01 row02
      --lods 0.5 0.2
      --no-bevel      (skip bevel modifiers)
      --keep-copies   (skip mesh data sharing)

Tested against Blender 3.6 LTS and 4.x. Nothing outside bpy is required.
"""

import argparse
import json
import math
import os
import sys
from collections import defaultdict

import bpy


# ----------------------------------------------------------------------------
# args
# ----------------------------------------------------------------------------
def parse_args():
    argv = sys.argv
    argv = argv[argv.index("--") + 1:] if "--" in argv else []
    p = argparse.ArgumentParser(prog="enhance_campus.py")
    p.add_argument("--glb", required=True, help="input campus GLB")
    p.add_argument("--graph", default="graph", help="directory holding the graph JSON files")
    p.add_argument("--out", default="build/hyperscale_campus_hq.glb", help="output GLB")
    p.add_argument("--rack-glb", default=None, help="high-detail rack GLB to swap in")
    p.add_argument("--rack-detail-rows", nargs="*", default=[],
                   help="row prefixes to receive the high-detail rack, e.g. row01 row02")
    p.add_argument("--lods", nargs="*", type=float, default=[],
                   help="decimate ratios for extra LOD collections, e.g. 0.5 0.2")
    p.add_argument("--bevel-width", type=float, default=0.0018, help="bevel width in metres")
    p.add_argument("--no-bevel", action="store_true")
    p.add_argument("--keep-copies", action="store_true", help="do not share mesh data")
    p.add_argument("--routes", action="store_true",
                   help="build tube geometry for every solved run in graph/routes.json")
    p.add_argument("--route-radius-scale", type=float, default=1.0,
                   help="multiplier on the per-service run radius")
    p.add_argument("--icd", action="store_true",
                   help="attach ICD interface records (P&ID tag, signal, safety class) to matching assets")
    p.add_argument("--report", default=None, help="write a JSON report here")
    return p.parse_args(argv)


# ----------------------------------------------------------------------------
# graph loading
# ----------------------------------------------------------------------------
def load_graph(graph_dir):
    """Return (assets_by_mesh, connections_by_run, rack_template, legends)."""
    def read(name):
        path = os.path.join(graph_dir, name)
        if not os.path.exists(path):
            print(f"  ! missing {path}")
            return None
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)

    facility = read("facility-graph.json") or {"assets": [], "connections": []}
    hall = read("hall-graph.json") or {"assets": [], "connections": []}
    rack = read("rack-graph.json")
    index = read("index.json") or {}

    assets_by_mesh = {}
    for src in (facility, hall):
        for a in src.get("assets", []):
            if a.get("mesh"):
                assets_by_mesh[a["mesh"]] = a

    connections_by_run = defaultdict(list)
    for src in (facility, hall):
        for c in src.get("connections", []):
            if c.get("physical_run"):
                connections_by_run[c["physical_run"]].append(c)

    routes = read("routes.json")
    icd = read("icd-graph.json")
    legends = index.get("legends") or facility.get("legends") or {}
    print(f"  graph: {len(assets_by_mesh)} assets with mesh bindings, "
          f"{sum(len(v) for v in connections_by_run.values())} connections on "
          f"{len(connections_by_run)} physical runs")
    return assets_by_mesh, connections_by_run, rack, legends, routes, icd


# ----------------------------------------------------------------------------
# metadata
# ----------------------------------------------------------------------------
SIMPLE_FIELDS = ("id", "label", "kind", "system", "location", "zone", "purdue",
                 "sl_target", "vendor", "standards", "template")


def nearest_asset(obj, assets_by_mesh):
    """Walk up the parent chain until a name matches an asset mesh."""
    node = obj
    while node is not None:
        if node.name in assets_by_mesh:
            return assets_by_mesh[node.name], node.name
        # Blender de-duplicates names with .001 suffixes — strip and retry
        base = node.name.rsplit(".", 1)[0]
        if base in assets_by_mesh:
            return assets_by_mesh[base], base
        node = node.parent
    return None, None


def apply_metadata(assets_by_mesh, connections_by_run):
    tagged_assets = tagged_edges = 0

    for obj in bpy.data.objects:
        name = obj.name
        base = name.rsplit(".", 1)[0]

        # --- direct asset hit: full record ---
        asset = assets_by_mesh.get(name) or assets_by_mesh.get(base)
        if asset:
            for f in SIMPLE_FIELDS:
                if asset.get(f):
                    obj[f"oxot_{f}"] = str(asset[f])
            if asset.get("attributes"):
                obj["oxot_attributes"] = json.dumps(asset["attributes"], ensure_ascii=False)
            if asset.get("attack_surface"):
                obj["oxot_attack_surface"] = json.dumps(asset["attack_surface"], ensure_ascii=False)
            obj["oxot_role"] = "asset"
            tagged_assets += 1
        else:
            # --- child of an asset: inherit the identity so picking any
            #     sub-mesh still resolves to its parent component ---
            parent_asset, parent_mesh = nearest_asset(obj, assets_by_mesh)
            if parent_asset:
                obj["oxot_parent_asset"] = parent_asset["id"]
                obj["oxot_parent_mesh"] = parent_mesh
                if parent_asset.get("system"):
                    obj["oxot_system"] = str(parent_asset["system"])
                if parent_asset.get("zone"):
                    obj["oxot_zone"] = str(parent_asset["zone"])
                obj["oxot_role"] = "component"

        # --- connection geometry ---
        conns = connections_by_run.get(name) or connections_by_run.get(base)
        if not conns:
            # pipe() emits children named <run>_s0, <run>_e0
            for suffix in ("_s", "_e"):
                if suffix in base:
                    stem = base.rsplit(suffix, 1)[0]
                    if stem in connections_by_run:
                        conns = connections_by_run[stem]
                        break
        if conns:
            obj["oxot_role"] = "conduit"
            obj["oxot_connections"] = json.dumps([{
                "id": c["id"], "from": c["from"], "to": c["to"],
                "service": c["service"], "protocol": c["protocol"],
                "critical": bool(c.get("critical_conduit")),
                "one_way": bool(c.get("one_way")),
                "zone_crossing": c.get("zone_crossing"),
            } for c in conns], ensure_ascii=False)
            obj["oxot_service"] = conns[0]["service"]
            obj["oxot_protocol"] = conns[0]["protocol"]
            obj["oxot_critical_conduit"] = any(c.get("critical_conduit") for c in conns)
            tagged_edges += 1

    print(f"  metadata: {tagged_assets} assets, {tagged_edges} conduit runs tagged")
    return tagged_assets, tagged_edges


# ----------------------------------------------------------------------------
# materials
# ----------------------------------------------------------------------------
# name fragment -> (metallic, roughness, emission strength, clearcoat-ish sheen)
MATERIAL_RULES = [
    ("copper",        (0.95, 0.28, 0.0)),
    ("busway",        (0.80, 0.35, 0.0)),
    ("conduit",       (0.70, 0.38, 0.0)),
    ("mv_cable",      (0.15, 0.55, 0.0)),
    ("steel",         (0.85, 0.30, 0.0)),
    ("yard_steel",    (0.80, 0.38, 0.0)),
    ("tray_silver",   (0.88, 0.26, 0.0)),
    ("qd_steel",      (0.90, 0.22, 0.0)),
    ("port_cage",     (0.90, 0.25, 0.0)),
    ("brass",         (0.85, 0.30, 0.0)),
    ("fence",         (0.70, 0.42, 0.0)),
    ("louver",        (0.55, 0.45, 0.0)),
    ("air_duct",      (0.60, 0.42, 0.0)),
    ("chw_supply",    (0.25, 0.35, 0.0)),
    ("chw_return",    (0.25, 0.35, 0.0)),
    ("cond_loop",     (0.25, 0.38, 0.0)),
    ("fiber",         (0.10, 0.45, 0.0)),
    ("ot_purple",     (0.15, 0.45, 0.0)),
    ("frame_black",   (0.35, 0.48, 0.0)),
    ("panel_gray",    (0.20, 0.52, 0.0)),
    ("compute_face",  (0.25, 0.42, 0.0)),
    ("nvsw_face",     (0.25, 0.42, 0.0)),
    ("psu_face",      (0.20, 0.46, 0.0)),
    ("drive_face",    (0.25, 0.45, 0.0)),
    ("cab_",          (0.25, 0.50, 0.0)),
    ("ups_beige",     (0.10, 0.55, 0.0)),
    ("batt_blue",     (0.15, 0.50, 0.0)),
    ("bess_white",    (0.10, 0.52, 0.0)),
    ("fuel_yellow",   (0.20, 0.48, 0.0)),
    ("concrete",      (0.00, 0.92, 0.0)),
    ("slab",          (0.00, 0.88, 0.0)),
    ("wall",          (0.00, 0.90, 0.0)),
    ("ground",        (0.00, 0.95, 0.0)),
    ("white_box",     (0.00, 0.70, 0.0)),
    ("label",         (0.00, 0.78, 0.0)),
    ("leak_ring",     (0.05, 0.60, 0.0)),
    ("screen",        (0.10, 0.22, 2.2)),
    ("led_green",     (0.00, 0.30, 6.0)),
    ("led_amber",     (0.00, 0.30, 5.5)),
    ("led_blue",      (0.00, 0.30, 5.5)),
    ("led_off",       (0.05, 0.40, 0.0)),
    ("light_bar",     (0.00, 0.35, 3.5)),
    ("glass",         (0.00, 0.12, 0.0)),
]


def bsdf_input(bsdf, *candidates):
    for c in candidates:
        if c in bsdf.inputs:
            return bsdf.inputs[c]
    return None


def upgrade_materials():
    touched = 0
    for mat in bpy.data.materials:
        if not mat.use_nodes:
            mat.use_nodes = True
        bsdf = next((n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
        if bsdf is None:
            continue

        low = mat.name.lower()
        rule = next((v for frag, v in MATERIAL_RULES if frag in low), None)
        if rule is None:
            continue
        metallic, roughness, emission = rule

        mi = bsdf_input(bsdf, "Metallic")
        ri = bsdf_input(bsdf, "Roughness")
        if mi:
            mi.default_value = metallic
        if ri:
            ri.default_value = roughness

        if emission > 0.0:
            base = bsdf_input(bsdf, "Base Color")
            ec = bsdf_input(bsdf, "Emission Color", "Emission")
            es = bsdf_input(bsdf, "Emission Strength")
            if ec and base:
                ec.default_value = base.default_value
            if es:
                es.default_value = emission

        if "glass" in low:
            mat.blend_method = "BLEND"
            alpha = bsdf_input(bsdf, "Alpha")
            if alpha:
                alpha.default_value = 0.22
            tr = bsdf_input(bsdf, "Transmission Weight", "Transmission")
            if tr:
                tr.default_value = 0.6

        touched += 1
    print(f"  materials: {touched} of {len(bpy.data.materials)} upgraded to PBR")
    return touched


# ----------------------------------------------------------------------------
# geometry quality
# ----------------------------------------------------------------------------
# Objects we deliberately leave un-bevelled: huge flat planes and anything
# already round. Bevelling the ground plane just wastes triangles.
NO_BEVEL = ("site_ground", "slab", "wall_", "part_", "fence_panel", "containment",
            "_led", "led_", "light_bar", "pids_fiber", "glass")


def add_bevels(width):
    n = 0
    for obj in bpy.data.objects:
        if obj.type != "MESH" or not obj.data:
            continue
        low = obj.name.lower()
        if any(frag in low for frag in NO_BEVEL):
            continue
        if len(obj.data.polygons) > 4000:      # already dense — leave alone
            continue
        if any(m.type == "BEVEL" for m in obj.modifiers):
            continue
        m = obj.modifiers.new("Bevel", "BEVEL")
        m.width = width
        m.segments = 2
        m.limit_method = "ANGLE"
        m.angle_limit = math.radians(35.0)
        m.harden_normals = False
        m.clamp_overlap = True
        n += 1
    print(f"  bevel: {n} objects")
    return n


def shade_smooth():
    """Smooth-by-angle across versions: 4.1+ dropped mesh.use_auto_smooth."""
    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    if not meshes:
        return 0
    for o in meshes:
        for poly in o.data.polygons:
            poly.use_smooth = True
    done = 0
    for o in meshes:
        if hasattr(o.data, "use_auto_smooth"):        # 3.x / 4.0
            o.data.use_auto_smooth = True
            o.data.auto_smooth_angle = math.radians(35.0)
            done += 1
        else:                                          # 4.1+
            try:
                bpy.context.view_layer.objects.active = o
                bpy.ops.object.modifier_add_node_group(
                    asset_library_type="ESSENTIALS",
                    relative_asset_identifier="geometry_nodes/smooth_by_angle.blend/NodeTree/Smooth by Angle")
                done += 1
            except Exception:
                pass
    print(f"  smooth shading: {done} meshes")
    return done


def share_mesh_data():
    """
    The 96 racks are 96 independent mesh datablocks describing identical
    geometry. Group by (mesh-name signature, vertex count, poly count) and point
    every duplicate at one canonical datablock. GLB size drops sharply and
    Babylon can instance on load.
    """
    groups = defaultdict(list)
    for obj in bpy.data.objects:
        if obj.type != "MESH" or not obj.data:
            continue
        # signature: component role, not instance identity
        name = obj.name.rsplit(".", 1)[0]
        role = name
        for prefix in ("row01_", "row02_", "row03_", "row04_", "row05_", "row06_"):
            if name.startswith(prefix):
                role = name[len(prefix):]
                break
        # strip the rack ordinal so rack01..rack16 share
        for token in ("rack01_", "rack02_", "rack03_", "rack04_", "rack05_", "rack06_",
                      "rack07_", "rack08_", "rack09_", "rack10_", "rack11_", "rack12_",
                      "rack13_", "rack14_", "rack15_", "rack16_"):
            role = role.replace(token, "rackNN_")
        key = (role, len(obj.data.vertices), len(obj.data.polygons))
        groups[key].append(obj)

    freed = 0
    for key, objs in groups.items():
        if len(objs) < 2:
            continue
        canonical = objs[0].data
        for o in objs[1:]:
            if o.data is canonical:
                continue
            old = o.data
            o.data = canonical
            if old.users == 0:
                bpy.data.meshes.remove(old)
                freed += 1
    print(f"  mesh sharing: {freed} duplicate datablocks removed "
          f"({len(bpy.data.meshes)} remain)")
    return freed


# ----------------------------------------------------------------------------
# high-detail rack swap
# ----------------------------------------------------------------------------
def swap_detail_racks(rack_glb, row_prefixes):
    """
    Replace the LOD rack bodies in the named rows with the high-detail rack
    model, matching transform. Keeps the original object name on an empty
    parent so graph bindings still resolve.
    """
    if not rack_glb or not os.path.exists(rack_glb):
        print(f"  ! rack GLB not found: {rack_glb}")
        return 0

    before = set(o.name for o in bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=rack_glb)
    imported = [o for o in bpy.data.objects if o.name not in before]
    roots = [o for o in imported if o.parent is None]
    if not roots:
        print("  ! rack GLB imported no root object")
        return 0
    source = roots[0]
    source.name = "_rack_source"
    for o in imported:
        o.hide_set(True)
        o.hide_render = True

    targets = [o for o in bpy.data.objects
               if o.parent is None or True
               if any(o.name.startswith(p) for p in row_prefixes)
               and "_rack" in o.name and o.name.count("_") == 1]

    made = 0
    for t in targets:
        copy = source.copy()
        copy.data = source.data.copy() if source.data else None
        copy.name = f"{t.name}_detail"
        bpy.context.collection.objects.link(copy)
        copy.matrix_world = t.matrix_world.copy()
        copy.parent = t
        copy.hide_set(False)
        copy.hide_render = False
        for child in source.children:
            cc = child.copy()
            if cc.data:
                cc.data = child.data
            cc.name = f"{t.name}_{child.name}"
            bpy.context.collection.objects.link(cc)
            cc.parent = copy
            cc.hide_set(False)
            cc.hide_render = False
        made += 1
    print(f"  detail racks: {made} instances placed from {os.path.basename(rack_glb)}")
    return made


# ----------------------------------------------------------------------------
# routed runs
# ----------------------------------------------------------------------------
# radius per service, in metres — pipes read heavier than signal cable
ROUTE_RADIUS = {
    "water": 0.055, "condenser": 0.055, "air": 0.075, "electricity": 0.045,
    "fuel": 0.035, "data": 0.028, "control": 0.022, "fire": 0.030, "security": 0.022,
}
ROUTE_COLOUR = {
    "water":       (0.12, 0.44, 0.82, 1.0),
    "condenser":   (0.18, 0.55, 0.34, 1.0),
    "air":         (0.60, 0.64, 0.67, 1.0),
    "electricity": (0.85, 0.70, 0.23, 1.0),
    "fuel":        (0.85, 0.76, 0.23, 1.0),
    "data":        (0.21, 0.76, 0.79, 1.0),
    "control":     (0.54, 0.31, 0.82, 1.0),
    "fire":        (0.78, 0.20, 0.16, 1.0),
    "security":    (0.88, 0.48, 0.15, 1.0),
}


def route_material(service):
    name = f"run_{service}"
    mat = bpy.data.materials.get(name)
    if mat:
        return mat
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = next((n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
    if bsdf:
        base = bsdf_input(bsdf, "Base Color")
        if base:
            base.default_value = ROUTE_COLOUR.get(service, (0.6, 0.6, 0.6, 1.0))
        r = bsdf_input(bsdf, "Roughness")
        if r:
            r.default_value = 0.45
        m = bsdf_input(bsdf, "Metallic")
        if m:
            m.default_value = 0.15
    return mat


def build_routes(routes_doc, radius_scale=1.0):
    """
    Turn every solved run in routes.json into a bevelled curve. Curves stay
    editable in Blender and export to glTF as mesh, and each carries its own
    connection metadata so the run is selectable in Babylon.
    """
    if not routes_doc or not routes_doc.get("routes"):
        print("  ! no routes.json — skipping run geometry")
        return 0

    coll = bpy.data.collections.new("Routed_runs")
    bpy.context.scene.collection.children.link(coll)

    made = 0
    for r in routes_doc["routes"]:
        pts = r.get("points") or []
        if len(pts) < 2:
            continue
        service = r.get("service", "control")
        cu = bpy.data.curves.new(f"run_{r['id']}", type="CURVE")
        cu.dimensions = "3D"
        cu.resolution_u = 3
        cu.bevel_depth = ROUTE_RADIUS.get(service, 0.03) * radius_scale
        cu.bevel_resolution = 3
        cu.use_fill_caps = True

        sp = cu.splines.new("POLY")
        sp.points.add(len(pts) - 1)
        for i, p in enumerate(pts):
            sp.points[i].co = (p[0], p[1], p[2], 1.0)

        obj = bpy.data.objects.new(f"run_{r['id']}_{r['from']}__{r['to']}", cu)
        coll.objects.link(obj)
        obj.data.materials.append(route_material(service))

        obj["oxot_role"] = "run"
        obj["oxot_run_id"] = r["id"]
        obj["oxot_from"] = r["from"]
        obj["oxot_to"] = r["to"]
        obj["oxot_service"] = service
        if r.get("protocol"):
            obj["oxot_protocol"] = r["protocol"]
        if r.get("mode"):
            obj["oxot_mode"] = r["mode"]
        if r.get("containment"):
            obj["oxot_containment"] = r["containment"]
        if r.get("length_m") is not None:
            obj["oxot_length_m"] = float(r["length_m"])
        if r.get("corridors"):
            obj["oxot_corridors"] = json.dumps(r["corridors"])
        made += 1

    print(f"  routed runs: {made} curves in collection 'Routed_runs'")
    return made


def attach_icd(icd_doc):
    """Stamp the specified ICD record onto any asset whose mesh it names."""
    if not icd_doc:
        print("  ! no icd-graph.json — skipping ICD attachment")
        return 0

    by_mesh = {}
    for e in icd_doc.get("equipment", []):
        if e.get("mesh"):
            by_mesh.setdefault(e["mesh"], []).append(e)

    ifaces = {}
    for i in icd_doc.get("interfaces", []):
        for side in ("from_tag", "to_tag"):
            ifaces.setdefault(i.get(side), []).append(i)

    tagged = 0
    for obj in bpy.data.objects:
        base = obj.name.rsplit(".", 1)[0]
        recs = by_mesh.get(obj.name) or by_mesh.get(base)
        if not recs:
            continue
        rec = recs[0]
        obj["oxot_pid_tag"] = rec.get("tag", "")
        if rec.get("manufacturer"):
            obj["oxot_manufacturer"] = rec["manufacturer"]
        if rec.get("model"):
            obj["oxot_model"] = rec["model"]
        if rec.get("firmware_os"):
            obj["oxot_firmware_os"] = rec["firmware_os"]
        rel = ifaces.get(rec.get("tag")) or []
        if rel:
            obj["oxot_icd_interfaces"] = json.dumps([{
                "icd_id": x.get("icd_id"), "from": x.get("from_tag"), "to": x.get("to_tag"),
                "medium_protocol": x.get("medium_protocol"), "signal": x.get("signal"),
                "direction": x.get("direction"), "safety_class": x.get("safety_class"),
                "sil": x.get("sil"), "hardwired": x.get("hardwired"),
            } for x in rel], ensure_ascii=False)
        tagged += 1

    print(f"  ICD: {tagged} assets stamped with P&ID tag and interface records")
    return tagged


# ----------------------------------------------------------------------------
# LODs
# ----------------------------------------------------------------------------
def build_lods(ratios):
    made = []
    src_objects = [o for o in bpy.data.objects if o.type == "MESH" and not o.hide_render]
    for i, ratio in enumerate(ratios, start=1):
        coll = bpy.data.collections.new(f"LOD{i}")
        bpy.context.scene.collection.children.link(coll)
        count = 0
        for o in src_objects:
            if len(o.data.polygons) < 40:      # already trivial
                continue
            c = o.copy()
            c.data = o.data.copy()
            c.name = f"{o.name}__LOD{i}"
            coll.objects.link(c)
            m = c.modifiers.new("Decimate", "DECIMATE")
            m.ratio = ratio
            count += 1
        coll.hide_render = True
        made.append((f"LOD{i}", ratio, count))
        print(f"  LOD{i} @ {ratio}: {count} objects")
    return made


# ----------------------------------------------------------------------------
# main
# ----------------------------------------------------------------------------
def main():
    args = parse_args()

    print("\n=== OXOT campus enhance ===")
    bpy.ops.wm.read_factory_settings(use_empty=True)

    if not os.path.exists(args.glb):
        sys.exit(f"input GLB not found: {args.glb}")
    print(f"importing {args.glb}")
    bpy.ops.import_scene.gltf(filepath=args.glb)
    n_obj = len(bpy.data.objects)
    n_mesh = len([o for o in bpy.data.objects if o.type == "MESH"])
    tris = sum(len(o.data.polygons) for o in bpy.data.objects if o.type == "MESH")
    print(f"  imported: {n_obj} objects, {n_mesh} meshes, {tris} faces")

    print("loading graph")
    (assets_by_mesh, connections_by_run, rack_template,
     legends, routes_doc, icd_doc) = load_graph(args.graph)

    print("applying metadata")
    tagged_assets, tagged_edges = apply_metadata(assets_by_mesh, connections_by_run)

    # stamp the rack template and legends onto the scene so the whole
    # taxonomy travels inside the GLB
    scene = bpy.context.scene
    if rack_template:
        scene["oxot_rack_template"] = json.dumps(rack_template, ensure_ascii=False)
    if legends:
        scene["oxot_legends"] = json.dumps(legends, ensure_ascii=False)
    scene["oxot_source"] = os.path.basename(args.glb)

    print("upgrading materials")
    upgrade_materials()

    if args.rack_detail_rows:
        print("swapping high-detail racks")
        swap_detail_racks(args.rack_glb, args.rack_detail_rows)

    if not args.no_bevel:
        print("adding bevels")
        add_bevels(args.bevel_width)

    print("smoothing")
    shade_smooth()

    icd_tagged = 0
    if args.icd:
        print("attaching ICD records")
        icd_tagged = attach_icd(icd_doc)

    runs = 0
    if args.routes:
        print("building routed runs")
        runs = build_routes(routes_doc, args.route_radius_scale)

    if not args.keep_copies:
        print("sharing mesh data")
        share_mesh_data()

    lods = []
    if args.lods:
        print("building LODs")
        lods = build_lods(args.lods)

    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    print(f"exporting {out}")
    kwargs = dict(filepath=out, export_format="GLB", export_extras=True,
                  export_apply=True, export_yup=True)
    try:
        bpy.ops.export_scene.gltf(**kwargs, export_materials="EXPORT")
    except TypeError:
        bpy.ops.export_scene.gltf(**kwargs)

    size = os.path.getsize(out) if os.path.exists(out) else 0
    report = {
        "input": args.glb,
        "output": out,
        "output_bytes": size,
        "objects": len(bpy.data.objects),
        "meshes": len(bpy.data.meshes),
        "materials": len(bpy.data.materials),
        "assets_tagged": tagged_assets,
        "conduits_tagged": tagged_edges,
        "icd_assets_tagged": icd_tagged,
        "routed_runs_built": runs,
        "lods": [{"name": n, "ratio": r, "objects": c} for n, r, c in lods],
    }
    if args.report:
        with open(args.report, "w", encoding="utf-8") as fh:
            json.dump(report, fh, indent=2)
    print("\n=== done ===")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
