/**
 * COMPILE mxGRAPH STENCIL XML → SVG GEOMETRY + CONNECTION PORTS.
 *
 * WHY THIS EXISTS. `new_material_source/asset_icons_drawio/libraries/` holds
 * SVGs produced by a converter that never implemented `<arc>` or `<curve>`:
 * exactly 1 of 478 P&ID files retains a curve command. `ball_valve` comes out as
 * `M 0 0 L 31.9 19.7 L 98 0 …` — a bowtie with no ball — plus a second path,
 * `M 31.9 40.5 M 66.2 19.7`, that draws nothing at all, because the two arcs
 * between those moves were dropped. Twenty-five of the 39 curated glyph paths
 * the site ships today have zero curves. Those are wrong ISA symbols.
 *
 * The fix is to stop reading the lossy SVGs and compile draw.io's OWN stencil
 * XML, the format that converter was translating in the first place. mxGraph's
 * `<arc rx ry x-axis-rotation large-arc-flag sweep-flag x y>` maps 1:1 onto
 * SVG's `A`, and `<curve x1 y1 x2 y2 x3 y3>` onto `C` — nothing is approximated.
 *
 * The XML also carries `<connections><constraint name x y/></connections>` —
 * ports the SVG conversion discarded whole. No other asset source in this
 * project has them, and they are what later turns "place a symbol" into "route a
 * pipe to the suction port", so they are compiled out alongside the geometry
 * rather than dropped a second time.
 *
 * Source of truth is the installed draw.io's `app.asar`, extracted once into a
 * version-keyed temp cache. Nothing is vendored, so the compiler cannot drift
 * from the renderer `--verify` diffs it against.
 *
 * Usage:
 *   node scripts/compile-stencils.mjs            summary of the compiled corpus
 *   node scripts/compile-stencils.mjs --verify   Gate 0: coverage + oracle diff
 *   node scripts/compile-stencils.mjs --emit f   write the compiled registry JSON
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";

export const DRAWIO_APP = "/Applications/draw.io.app/Contents/MacOS/draw.io";
const ASAR = "/Applications/draw.io.app/Contents/Resources/app.asar";
const ASAR_STENCILS = "drawio/src/main/webapp/stencils";
/**
 * The stencil families this site draws from. Widen deliberately, not by default.
 *
 * WHAT IS IN. Engineering and process NOTATION only — vocabularies with a
 * published or de-facto grammar the reader is expected to already know:
 * ISA-5.1 (`pid`), IEC 60617 (`electrical`), ISO 1219 (`fluid_power`),
 * ISO 5807 (`flowchart`), OMG BPMN 2.0 (`bpmn`), value-stream mapping
 * (`lean_mapping`), Hohpe's Enterprise Integration Patterns (`eip`),
 * ISO 7010 safety signage (`signs`), plus the physical- and
 * information-architecture sets an OT page needs to draw a plant that is not a
 * pipe: `networks`/`networks2` (Purdue levels, firewalls, DMZ),
 * `rack/general` and `cabinets` (19" equipment elevations), `floorplan` (site
 * layout), `sitemap` (information architecture), `office` (people, documents,
 * process actors), `arrows` and `basic` (flow-direction and callout
 * primitives).
 *
 * WHAT IS DELIBERATELY OUT. Every vendor/cloud family draw.io ships — aws*,
 * gcp*, azure, mscae, cisco*, citrix*, veeam, salesforce, kubernetes*, ibm*,
 * openstack, alibaba_cloud, atlassian, weblogos, webicons — and the UI-chrome
 * sets (bootstrap, ios7, gmdl, mockup, vvd, android). Those are BRAND MARKS and
 * widget chrome, not notation: they carry a third party's trade dress, they go
 * stale the moment that vendor rebrands, and no reader decodes them from a
 * standard.
 *
 * WHY `rack` IS NAMED FILE-BY-FILE. An entry is a path PREFIX, not just a
 * family, because `rack` is nine files and eight of them are the same brand
 * problem drawn instead of logotyped: `rack/hpe_aruba` alone compiles to 187
 * Aruba switch faceplates and 1.5 MB of manifest — a photorealistic front panel
 * with the vendor's own port layout on it, not a symbol anybody reads. Only
 * `rack/general` (rack frame, unit, blanking plate, patch panel) is notation, so
 * only `rack/general` is listed.
 */
export const GROUPS = [
  "pid",
  "electrical",
  "fluid_power",
  "flowchart",
  "bpmn",
  "lean_mapping",
  "eip",
  "signs",
  "networks",
  "networks2",
  "rack/general",
  "cabinets",
  "floorplan",
  "sitemap",
  "office",
  "arrows",
  "basic"
];

/* ── source acquisition ──────────────────────────────────────────────────── */

export const drawioVersion = () => execFileSync(DRAWIO_APP, ["--version"], { encoding: "utf8" }).trim();

/**
 * Extract stencil XML out of app.asar into a version-keyed temp cache. Keyed by
 * version so a draw.io upgrade cannot leave the compiler compiling geometry the
 * oracle no longer renders, AND by the GROUPS set, because the cache's
 * `.complete` marker is a short-circuit: widening GROUPS against a marker
 * written for a narrower set would silently keep compiling the old families and
 * report success.
 */
export function ensureStencilCache() {
  if (!existsSync(ASAR)) throw new Error(`draw.io not installed at ${ASAR}`);
  const key = createHash("sha256").update(GROUPS.join(",")).digest("hex").slice(0, 8);
  const dir = join(tmpdir(), `oxot-drawio-stencils-${drawioVersion()}-${key}`);
  if (existsSync(join(dir, ".complete"))) return dir;

  const want = execFileSync("npx", ["--yes", "@electron/asar", "list", ASAR], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024
  })
    .split("\n")
    .map((l) => l.trim().replace(/^\//, ""))
    /* An entry names EITHER a directory of stencil files (`pid` → `pid/*.xml`)
       or one file (`flowchart` → `flowchart.xml`, `rack/general` →
       `rack/general.xml`). Matching only the directory form drops 8 of the
       families named above without a word of complaint. */
    .filter(
      (l) =>
        l.endsWith(".xml") &&
        GROUPS.some((g) => l.startsWith(`${ASAR_STENCILS}/${g}/`) || l === `${ASAR_STENCILS}/${g}.xml`)
    );
  if (!want.length) throw new Error("no stencil XML found inside app.asar");

  for (const entry of want) {
    const out = join(dir, entry.slice(ASAR_STENCILS.length + 1));
    if (existsSync(out) && statSync(out).size > 0) continue;
    mkdirSync(dirname(out), { recursive: true });
    execFileSync("npx", ["--yes", "@electron/asar", "extract-file", ASAR, entry], { cwd: dirname(out) });
  }
  writeFileSync(join(dir, ".complete"), `${drawioVersion()}\n`);
  return dir;
}

/* ── XML scanning ────────────────────────────────────────────────────────── */

/* The stencil dialect is closed and regular — 30 tags, all attributes double
   quoted, and across all 48 files zero comments, zero entities, zero CDATA and
   no XML declaration (measured). A tokenizer is exact here and keeps the
   compiler dependency-free. */
const TAG = /<(\/?)([\w-]+)((?:\s+[\w-]+\s*=\s*"[^"]*")*)\s*(\/?)>/g;
const ATTR = /([\w-]+)\s*=\s*"([^"]*)"/g;

function* scan(xml) {
  TAG.lastIndex = 0;
  for (let m; (m = TAG.exec(xml)); ) {
    const attrs = {};
    ATTR.lastIndex = 0;
    for (let a; (a = ATTR.exec(m[3])); ) attrs[a[1]] = a[2];
    yield { close: m[1] === "/", name: m[2], attrs };
  }
}

const num = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`non-numeric stencil attribute "${v}"`);
  return n;
};
/** The SVG converter's slug, which our curated ids and filenames already use. */
export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
/**
 * draw.io's OWN registration name — spaces to underscores, lowercased, and
 * punctuation left alone. It is NOT `slug`: 301 of 1,007 shape names carry
 * punctuation, so "Barrel, Drum" registers as `barrel,_drum` and "Agitator
 * (Propeller)" as `agitator_(propeller)`. Getting this wrong asks draw.io for a
 * shape it does not have, and it answers with a placeholder rectangle and
 * exit 0 — a silent pass. Only the oracle uses this form.
 */
const stencilName = (name) => name.replace(/ /g, "_").toLowerCase();
/** A path with no drawing command draws nothing — the broken converter's artefact. */
const drawsInk = (p) => p.kind !== "path" || p.cmds.some((c) => /^[LACQZ]/.test(c));

/* ── the mxGraph drawing vocabulary ──────────────────────────────────────── */

/* Geometry: move line arc curve quad close ellipse rect roundrect
   Paint:    fillstroke stroke fill
   State:    save restore strokewidth dashed dashpattern linejoin linecap
             miterlimit fillcolor strokecolor
   Dropped:  text fontsize fontcolor fontstyle fontfamily labelBounds
             alpha fillalpha strokealpha */
const GEOMETRY = new Set(["move", "line", "arc", "curve", "quad", "close", "ellipse", "rect", "roundrect"]);
const PAINT = new Set(["fillstroke", "stroke", "fill"]);
/* `labelBounds` is where a stencil wants its LABEL drawn, not geometry; it sits
   with the font tags because both exist only to serve text this compiler does
   not emit. */
const TEXTUAL = new Set(["text", "fontsize", "fontcolor", "fontstyle", "fontfamily", "labelBounds"]);
const BASE = { strokeWidth: 1, dashArray: null, linejoin: null, linecap: null, miterlimit: null };

/**
 * Replay one shape's `<background>` then `<foreground>` children as mxGraph
 * does, emitting one record per paint operation.
 *
 * TWO NON-OBVIOUS SEMANTICS, both load-bearing:
 *  1. Path state survives the background→foreground boundary. `ball_valve` puts
 *     its outline in `<background>` and the `<fillstroke/>` that paints it in
 *     `<foreground>`; treating the sections as independent loses the outline.
 *  2. `<ellipse>`/`<rect>`/`<roundrect>` REPLACE the pending path rather than
 *     extend it — mxGraph's canvas begins a new path for each — so the next
 *     paint op paints that primitive alone.
 */
function replay(children, shapeId) {
  const out = [];
  const stack = [];
  const unknown = new Set();
  let state = { ...BASE };
  let pending = null;

  const flush = (op) => {
    if (!pending) return;
    if (drawsInk(pending)) out.push({ ...pending, op, ...state });
    pending = null;
  };

  for (const { name, attrs } of children) {
    if (TEXTUAL.has(name)) continue;

    if (GEOMETRY.has(name)) {
      if (name === "ellipse" || name === "rect" || name === "roundrect") {
        const box = [attrs.x, attrs.y, attrs.w, attrs.h].map(Number);
        /* 57 stencils carry a bare `<rect/>`. mxGraph passes its missing
           attributes straight through as NaN, so draw.io draws nothing — match
           that rather than throwing on someone else's authoring artefact. */
        pending = box.every(Number.isFinite)
          ? { kind: name, x: box[0], y: box[1], w: box[2], h: box[3], arcsize: Number(attrs.arcsize) || 0 }
          : null;
        continue;
      }
      if (!pending || pending.kind !== "path") pending = { kind: "path", cmds: [] };
      const c = pending.cmds;
      if (name === "move") c.push(`M ${num(attrs.x)} ${num(attrs.y)}`);
      else if (name === "line") c.push(`L ${num(attrs.x)} ${num(attrs.y)}`);
      else if (name === "close") c.push("Z");
      else if (name === "curve")
        c.push(
          `C ${num(attrs.x1)} ${num(attrs.y1)} ${num(attrs.x2)} ${num(attrs.y2)} ` +
            `${num(attrs.x3)} ${num(attrs.y3)}`
        );
      else if (name === "quad") c.push(`Q ${num(attrs.x1)} ${num(attrs.y1)} ${num(attrs.x2)} ${num(attrs.y2)}`);
      else if (name === "arc")
        /* The 1:1 mapping this whole file exists for. Argument order and
           semantics are identical to SVG's elliptical-arc command. */
        c.push(
          `A ${num(attrs.rx)} ${num(attrs.ry)} ${num(attrs["x-axis-rotation"])} ` +
            `${num(attrs["large-arc-flag"])} ${num(attrs["sweep-flag"])} ${num(attrs.x)} ${num(attrs.y)}`
        );
      continue;
    }

    if (PAINT.has(name)) {
      /* `fill` is emitted as an outline like `fillstroke`. The Visual Foundation
         Spec requires single-colour stroke-only glyphs, so a filled subpath has
         no paint of its own — dropping it would delete real geometry instead. */
      flush(name === "fill" ? "fillstroke" : name);
      continue;
    }

    switch (name) {
      /* `<path>` BEGINS a path — mxGraph's canvas.begin(). It does not extend
         whatever was pending, so an unpainted predecessor is discarded here. */
      case "path": pending = { kind: "path", cmds: [] }; break;
      case "save": stack.push({ ...state }); break;
      case "restore": state = stack.pop() ?? { ...BASE }; break;
      case "strokewidth": state = { ...state, strokeWidth: attrs.width === "inherit" ? 1 : num(attrs.width) }; break;
      case "dashed": if (attrs.dashed !== "1") state = { ...state, dashArray: null }; break;
      /* `pattern="none"` is a solid line, not a dash array. mxGraph reaches the
         same result by accident — it runs the word through `Number`, gets NaN,
         and hands the renderer a dash array no SVG engine will honour — so
         emitting null here matches what draw.io actually draws. */
      case "dashpattern":
        state = {
          ...state,
          dashArray: attrs.pattern.trim() === "none" ? null : attrs.pattern.trim().split(/\s+/).map(num)
        };
        break;
      case "linejoin": state = { ...state, linejoin: attrs.join }; break;
      case "linecap": state = { ...state, linecap: attrs.cap }; break;
      case "miterlimit": state = { ...state, miterlimit: num(attrs.limit) }; break;
      /* fillcolor/strokecolor are read and discarded: every glyph is recoloured
         to one token, so a stencil's own palette never reaches the output. That
         is what lets the downstream paint guard be a strict allow-list. */
      /* alpha/fillalpha/strokealpha are discarded for the SAME reason and with
         the same consequence: opacity is paint, and `rack`/`networks2` use it to
         shade a vendor's faceplate. A glyph recoloured to one token at one
         weight has no place to put a 0.3 alpha, and honouring it would put a
         non-token paint value into the manifest the paint guard then rejects. */
      case "fillcolor": case "strokecolor":
      case "alpha": case "fillalpha": case "strokealpha": break;
      default: unknown.add(name);
    }
  }
  flush("stroke"); // an unpainted trailing path is a stencil bug, not ours
  if (unknown.size) throw new Error(`${shapeId}: unimplemented stencil tag(s) ${[...unknown].join(", ")}`);
  return out;
}

/** Parse one stencil file into compiled shapes keyed `<group>/<file>/<slug>`. */
function parseFile(xml, relId, prefix) {
  const shapes = [];
  let cur = null;
  let section = null;
  for (const node of scan(xml)) {
    if (node.name === "shape") {
      if (node.close) { shapes.push(cur); cur = null; continue; }
      cur = {
        id: `${relId}/${slug(node.attrs.name)}`,
        stencil: `${prefix.toLowerCase()}.${stencilName(node.attrs.name)}`,
        name: node.attrs.name,
        /* `w`/`h` are optional in the dialect. mxStencil reads them as
           `Number(desc.getAttribute('w') || 100)`, so an absent box is 100×100 —
           `flowchart`'s Decision and Process both rely on it and both do draw in
           a 0–100 space. Defaulting matches mxGraph; throwing would drop two of
           ISO 5807's most-used symbols. */
        w: node.attrs.w === undefined ? 100 : num(node.attrs.w),
        h: node.attrs.h === undefined ? 100 : num(node.attrs.h),
        ports: [],
        hasText: false,
        nodes: []
      };
      continue;
    }
    if (!cur) continue;
    if (node.name === "background" || node.name === "foreground") { section = node.close ? null : node.name; continue; }
    if (node.name === "constraint") {
      cur.ports.push({
        name: node.attrs.name,
        x: num(node.attrs.x),
        y: num(node.attrs.y),
        perimeter: node.attrs.perimeter === "1"
      });
      continue;
    }
    if (node.name === "text") cur.hasText = true;
    if (node.close || node.name === "connections" || node.name === "shapes") continue;
    if (section) cur.nodes.push(node);
  }
  for (const s of shapes) {
    s.paints = replay(s.nodes, s.id);
    delete s.nodes;
  }
  return shapes;
}

/**
 * The registry path for one stencil file. A family that ships as a directory
 * gives `<group>/<file>`; a family that ships as a single file gives `<group>`
 * on its own, so ids stay `<family>/…` either way rather than `/flowchart/…`.
 */
const fileId = (rel, fileName) => {
  const base = fileName.slice(0, -4);
  return rel ? `${rel}/${base}` : base;
};

/** Compile every stencil in GROUPS. Returns a Map keyed `<group>[/<file>]/<slug>`. */
export function loadStencils() {
  const root = ensureStencilCache();
  const registry = new Map();
  const walk = (dir, rel) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, rel ? `${rel}/${e.name}` : e.name);
      else if (e.name.endsWith(".xml")) {
        const xml = readFileSync(p, "utf8");
        const prefix = xml.match(/<shapes\s+name="([^"]+)"/)?.[1];
        if (!prefix) throw new Error(`${p}: no <shapes name>`);
        for (const s of parseFile(xml, fileId(rel, e.name), prefix)) registry.set(s.id, s);
      }
    }
  };
  walk(root, "");
  return registry;
}

/** One compiled subpath as an SVG element, in the stencil's own coordinate space. */
export function paintToSvg(p, { stroke, strokeWidth }) {
  const sw = (strokeWidth * p.strokeWidth).toFixed(4);
  const extra =
    (p.dashArray ? ` stroke-dasharray="${p.dashArray.map((v) => v * p.strokeWidth).join(" ")}"` : "") +
    (p.linejoin ? ` stroke-linejoin="${p.linejoin}"` : "") +
    (p.linecap ? ` stroke-linecap="${p.linecap}"` : "") +
    (p.miterlimit ? ` stroke-miterlimit="${p.miterlimit}"` : "");
  const paint = `fill="none" stroke="${stroke}" stroke-width="${sw}"${extra}`;
  if (p.kind === "path") return `<path d="${p.cmds.join(" ")}" ${paint}/>`;
  if (p.kind === "ellipse")
    return `<ellipse cx="${p.x + p.w / 2}" cy="${p.y + p.h / 2}" rx="${p.w / 2}" ry="${p.h / 2}" ${paint}/>`;
  const r = p.kind === "roundrect" ? Math.min(p.w, p.h) * (p.arcsize / 100) : 0;
  return `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}"${r ? ` rx="${r.toFixed(3)}"` : ""} ${paint}/>`;
}

/** A whole compiled shape as a standalone SVG, for rasterising and diffing. */
export function shapeToSvg(shape, opts = { stroke: "#000000", strokeWidth: 1 }, px = 4) {
  const body = shape.paints.map((p) => paintToSvg(p, opts)).join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${shape.w} ${shape.h}" ` +
    `width="${shape.w * px}" height="${shape.h * px}">${body}</svg>`
  );
}

/* ── verification ────────────────────────────────────────────────────────── */

/** Which stencils curve in the SOURCE XML, and whether the compile kept it. */
export function curveCoverage(registry, sourceDir = ensureStencilCache()) {
  const byFile = new Map();
  const walk = (dir, rel) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, rel ? `${rel}/${e.name}` : e.name);
      else if (e.name.endsWith(".xml")) byFile.set(fileId(rel, e.name), readFileSync(p, "utf8"));
    }
  };
  walk(sourceDir, "");

  const lost = [];
  let curved = 0;
  for (const [id, shape] of registry) {
    const xml = byFile.get(id.slice(0, id.lastIndexOf("/"))) ?? "";
    const esc = shape.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const block = xml.match(new RegExp(`<shape[^>]*name="${esc}"[\\s\\S]*?</shape>`))?.[0];
    if (!block || !/<(arc|curve|quad)\b/.test(block)) continue;
    curved += 1;
    if (!shape.paints.some((p) => p.kind === "path" && /(^| )[ACQ] /.test(p.cmds.join(" ")))) lost.push(id);
  }
  return { curved, kept: curved - lost.length, lost, rate: curved ? (curved - lost.length) / curved : 1 };
}

/** Paths that draw no ink — the exact artefact the broken converter left behind. */
export const noOpPaths = (shapes) =>
  shapes.flatMap((s) => s.paints.filter((p) => !drawsInk(p)).map(() => s.id));

/**
 * THE ORACLE. draw.io renders arcs by flattening them to cubic béziers, so its
 * exported `d` never string-matches a compiled `A`. The comparison is therefore
 * made on ink, not text: rasterise both, crop each to its own ink bounding box,
 * resample to a common grid, and score the symmetric difference. That is
 * invariant to draw.io's export padding and scale but not to a missing ball.
 *
 * KNOWN TRAP, guarded below: an unknown shape name renders a white rectangle and
 * exits 0. Every id is validated against the compiled registry before export.
 */
async function oracleDiff(shapes) {
  const sharp = (await import("sharp")).default;
  const dir = mkdtempSync(join(tmpdir(), "oxot-oracle-"));
  const [inDir, outDir] = [join(dir, "in"), join(dir, "out")];
  mkdirSync(inDir);
  mkdirSync(outDir);

  const S = 4; // export at 4x so a 1px stroke survives the resample
  for (const s of shapes) {
    const style = `shape=${s.stencil};html=0;fillColor=none;strokeColor=#000000;strokeWidth=1;`;
    writeFileSync(
      join(inDir, `${slug(s.id)}.drawio`),
      `<mxfile><diagram id="d" name="p"><mxGraphModel grid="0" page="0" background="none"><root>` +
        `<mxCell id="0"/><mxCell id="1" parent="0"/>` +
        `<mxCell id="2" style="${style}" vertex="1" parent="1">` +
        `<mxGeometry x="0" y="0" width="${s.w * S}" height="${s.h * S}" as="geometry"/></mxCell>` +
        `</root></mxGraphModel></diagram></mxfile>`
    );
  }
  execFileSync(DRAWIO_APP, ["--no-sandbox", "-x", "-f", "svg", "--theme", "light", "-t", "-o", outDir, inDir], {
    stdio: "pipe"
  });

  /**
   * Put draw.io's export onto the shape's OWN coordinate box so the two rasters
   * are pixel-comparable without cropping. draw.io pads the canvas by a pixel
   * and draws at `translate(0.5,0.5)`, so the shape occupies exactly
   * `0.5 0.5 w*S h*S`. Cropping to the ink bounding box instead — the obvious
   * approach — silently rescales the two sides by a percent or so, which drags a
   * geometrically IDENTICAL glyph down to ~0.75 IoU and makes the threshold
   * meaningless. Re-framed, identical geometry scores exactly 1.0000.
   *
   * Two things are normalised out, because both are deliberate divergences
   * rather than geometry errors, and neither should be able to fail the gate:
   *  - `<text>`: not emitted at all (a baked letter cannot be themed or
   *    re-tagged), so leaving it in would compare a circle against a circle
   *    with "LI" written inside it.
   *  - solid fills: a stencil's own `<fillcolor>` overrides the style, so
   *    `optical_fiber` fills its arrowheads black while ISA-5.1 and this glyph
   *    set draw outlines. The comparison is of geometry, not paint.
   */
  const reframe = (svg, s) =>
    svg
      .replace(/<g[^>]*font-family[\s\S]*?<\/g>/g, "")
      .replace(/<text[\s\S]*?<\/text>/g, "")
      .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="none"')
      .replace(/fill:\s*rgb\([^)]*\);?/g, "")
      .replace(
        /width="\d+px" height="\d+px" viewBox="[^"]*"/,
        `width="${s.w * S}" height="${s.h * S}" viewBox="0.5 0.5 ${s.w * S} ${s.h * S}"`
      );

  /** Alpha → a dilated ink mask on a common N×N grid. */
  const N = 160;
  const mask = async (svg) => {
    const px = await sharp(Buffer.from(svg)).resize(N, N, { fit: "fill" }).blur(1.5).ensureAlpha().raw().toBuffer();
    const out = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i += 1) out[i] = px[i * 4 + 3] > 24 ? 1 : 0;
    return out;
  };

  const results = [];
  for (const s of shapes) {
    const golden = readFileSync(join(outDir, `${slug(s.id)}.svg`), "utf8");
    /* The placeholder for an unknown shape name is exactly one rect at the
       requested size, and draw.io still exits 0. Match it precisely and fail. */
    const drawn = golden.match(/<(path|rect|ellipse|polygon|polyline)\b/g) ?? [];
    if (
      drawn.length === 1 &&
      new RegExp(`<rect x="0" y="0" width="${s.w * S}" height="${s.h * S}"`).test(golden)
    )
      throw new Error(`${s.id}: draw.io does not know shape "${s.stencil}" — placeholder rectangle`);
    /* draw.io scales the GEOMETRY by S and keeps a 1-device-pixel stroke, so the
       compiled side must divide its stroke by S to match. Skipping this compares
       line weights instead of shapes and fails every glyph, correct ones included. */
    const mine = shapeToSvg(s, { stroke: "#000000", strokeWidth: 1 / S }, S);
    const [a, b] = [await mask(reframe(golden, s)), await mask(mine)];
    let inter = 0;
    let union = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] & b[i]) inter += 1;
      if (a[i] | b[i]) union += 1;
    }
    results.push({ id: s.id, iou: union ? inter / union : 0 });
  }
  return results;
}

/** Gate 0, measured. Returns true only if every criterion holds. */
export async function verify(registry, curated) {
  const IOU_MIN = 0.9;
  const shapes = curated.map((id) => {
    const s = registry.get(id);
    if (!s) throw new Error(`curated id not in stencil registry: ${id}`);
    return s;
  });
  const cov = curveCoverage(registry);
  const noops = noOpPaths(shapes);
  const diffs = await oracleDiff(shapes);
  const failed = diffs.filter((d) => d.iou < IOU_MIN);
  const ball = diffs.find((d) => d.id === "pid/valves/ball_valve");
  const ballCurves = (registry.get("pid/valves/ball_valve")?.paints ?? []).reduce(
    (n, p) => n + (p.cmds ?? []).filter((c) => c.startsWith("A")).length,
    0
  );

  const checks = [
    [`curve coverage ${(cov.rate * 100).toFixed(1)}% (${cov.kept}/${cov.curved})`, cov.rate >= 0.95],
    [`no-op paths in curated set: ${noops.length}`, noops.length === 0],
    [`ball_valve arc commands: ${ballCurves}`, ballCurves >= 4],
    [`ball_valve oracle IoU ${ball?.iou.toFixed(4)}`, (ball?.iou ?? 0) >= IOU_MIN],
    [`oracle diff ${diffs.length - failed.length}/${diffs.length} ≥ ${IOU_MIN} IoU`, failed.length === 0]
  ];
  for (const [label, ok] of checks) console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  for (const f of failed) console.log(`      below threshold: ${f.id} IoU ${f.iou.toFixed(4)}`);
  for (const l of cov.lost.slice(0, 10)) console.log(`      curves lost: ${l}`);
  return checks.every(([, ok]) => ok);
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

async function main() {
  const argv = process.argv.slice(2);
  const registry = loadStencils();
  const emitAt = argv.indexOf("--emit");

  if (emitAt !== -1) {
    const out = argv[emitAt + 1];
    if (!out) throw new Error("--emit needs a path");
    writeFileSync(out, `${JSON.stringify({ drawio: drawioVersion(), shapes: Object.fromEntries(registry) })}\n`);
    console.log(`wrote ${out} — ${registry.size} shapes`);
    return;
  }

  const ports = [...registry.values()].reduce((n, s) => n + s.ports.length, 0);
  const cov = curveCoverage(registry);
  console.log(`draw.io ${drawioVersion()} · ${registry.size} shapes · ${ports} connection ports`);
  console.log(`curve-bearing stencils ${cov.curved}, emitting curves ${cov.kept} (${(cov.rate * 100).toFixed(1)}%)`);

  if (!argv.includes("--verify")) return;
  const { CURATED } = await import("./build-drawio-glyphs.mjs");
  process.exitCode = (await verify(registry, CURATED.map(([, id]) => id))) ? 0 : 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e.stack ?? e.message);
    process.exit(1);
  });
}
