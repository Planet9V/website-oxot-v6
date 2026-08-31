import type { ComponentType } from "react";
import { DRAWIO_STENCILS } from "./drawio-manifest";

/**
 * ONE RENDERER FOR ALL 1,007 COMPILED STENCILS — task_plan Phase 3.2.
 *
 *   <svg viewBox="0 0 32 32"><DrawioGlyph src="pid/vessels/container_tank_cistern" /></svg>
 *
 * WHAT THIS REPLACES. Until this file existed, putting a draw.io symbol on a
 * page cost two hand edits: a named React export in the generated
 * `drawio-glyphs.tsx`, and a `"slug": Component` line in `diagrams/types.ts`.
 * That is why a 1,007-shape compiled library exposed 118 slugs. Here a slug
 * resolves because the geometry EXISTS in `./drawio-manifest`, which is emitted
 * from the same `loadStencils()` pass the Gate 0 oracle verifies at 0.9995 IoU
 * against draw.io's own renderer. Adding a symbol to a diagram is now a spec
 * edit and nothing else.
 *
 * WHAT THIS DOES NOT REPLACE. `GLYPH_REGISTRY` in `diagrams/types.ts` still wins
 * on any slug it holds, and it must. Five of its entries are deliberate
 * CORRECTIONS of stencils draw.io ships wrong — `pid/valves/globe_valve` is
 * byte-identical to `ball_valve` in `valves.xml`, and the four
 * `electrical/electro-mechanical/…` marks collapse into blobs at the size this
 * site draws them. Nothing here overrides those; this is a fall-through, not a
 * replacement, and the hand-drawn set (`pid-hand-drawn`, `electrical-hand-drawn`,
 * `ot-notation`, `cset-glyphs`, the ISA bubble grammar) is untouched by it.
 *
 * WHY `dangerouslySetInnerHTML`. The manifest stores each glyph as SVG markup
 * emitted by `paintToSvg` in `scripts/compile-stencils.mjs` — the compiler's own
 * emitter, the one the golden-render oracle diffs. Parsing that back into React
 * elements here would be a SECOND geometry converter, in a pipeline whose entire
 * failure history is one lossy second converter that silently dropped every
 * `<arc>` it ever saw. The markup is build-time output over a closed vocabulary
 * (`path`, `ellipse`, `rect`), carries no interpolated caller input, and every
 * paint value in it is checked against a two-token allow-list by
 * `assertPaintTokens` before it is written. `src` only ever indexes the map; no
 * caller string reaches the markup.
 */
export function DrawioGlyph({ src }: { src: string }) {
  const entry = DRAWIO_STENCILS[src];
  if (!entry) throw new Error(unknownStencil(src));
  /* The transform lives on the wrapper and the stroke widths inside `s` are
     pre-divided by its scale, so a 98-unit stencil and a 100-unit one land on
     the same 1.3 cell weight. Do NOT add `strokeWidth` here: a presentation
     attribute on a child beats anything inherited from an ancestor, so it would
     be silently inert — the bug that shipped in `Rule.tsx`. */
  return <g transform={entry.t} dangerouslySetInnerHTML={{ __html: entry.s }} />;
}

/**
 * GATE 3, AT THE RENDERER. An unresolvable slug throws and names the gap; it
 * never draws a placeholder box. `assertSpecResolves` catches this earlier for
 * anything arriving through a `DiagramSpec`, but `<DrawioGlyph>` is usable
 * directly, and a symbol that silently renders nothing is the exact defect the
 * gate exists to prevent — an empty cell reads as "this equipment is absent",
 * which on a security drawing is a false claim rather than a missing asset.
 */
function unknownStencil(src: string): string {
  const tail = src.split("/").pop() ?? "";
  const near = tail
    ? Object.keys(DRAWIO_STENCILS)
        .filter((k) => (k.split("/").pop() ?? "").includes(tail))
        .slice(0, 3)
    : [];
  return (
    `DrawioGlyph: no compiled stencil "${src}". ${MANIFEST_SLUG_COUNT} slugs are in the manifest ` +
    `(src/components/twin/drawio-manifest.ts — regenerate with node scripts/build-drawio-glyphs.mjs).` +
    (near.length ? ` Nearest: ${near.join(", ")}.` : "") +
    ` This is a BUILD ERROR BY DESIGN (docs/diagram-system/task_plan.md, GATE 3).`
  );
}

/** How many slugs the manifest resolves. Quoted by `assertSpecResolves`'s error. */
export const MANIFEST_SLUG_COUNT = Object.keys(DRAWIO_STENCILS).length;

/** Manifest slugs, for the "nearest registered" suggestion a build error carries. */
export const manifestSlugs = (): string[] => Object.keys(DRAWIO_STENCILS);

/**
 * MEMOISED PER SLUG, and that is correctness rather than a micro-optimisation:
 * React remounts a subtree whose element TYPE changed identity, so a fresh
 * closure per render would tear down and rebuild every manifest symbol on every
 * pass. It is also what makes `manifestPorts` work — `ports.ts` keys its port
 * lookup by component identity, because two modules in this project export a
 * `Fuse` with different terminals and a name-keyed table would hand one's ports
 * to the other.
 */
const bySlug = new Map<string, ComponentType>();
const portsOf = new Map<ComponentType, ReadonlyArray<{ name: string; x: number; y: number }>>();

/** The component for a manifest slug, or `undefined` so the caller can fail loudly. */
export function manifestSymbol(slug: string): ComponentType | undefined {
  const cached = bySlug.get(slug);
  if (cached) return cached;
  const entry = DRAWIO_STENCILS[slug];
  if (!entry) return undefined;

  const Glyph = () => <DrawioGlyph src={slug} />;
  Glyph.displayName = `DrawioGlyph(${slug})`;
  bySlug.set(slug, Glyph);
  /* The stencil's own `<connections><constraint>` points, already in cell space.
     A symbol with no ports falls back to the cell edge, which is what made the
     water train's pipes terminate on bounding boxes instead of on nozzles — so
     the 2,698 the compiler harvests are carried through to here rather than
     stopping at the manifest. */
  portsOf.set(
    Glyph,
    (entry.p ?? []).map(([name, x, y]) => ({ name, x, y }))
  );
  return Glyph;
}

/** The ports a manifest-backed glyph declares, or `undefined` if it is not one. */
export function manifestPorts(
  Glyph: ComponentType | undefined
): ReadonlyArray<{ name: string; x: number; y: number }> | undefined {
  return Glyph && portsOf.get(Glyph);
}
