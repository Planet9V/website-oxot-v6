"use client";

import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ASSET_GLYPHS, CriticalityMark, TYPE_LABEL } from "@/components/twin/AssetNode";
import { PathEdge, PathEdgeMarkerDefs } from "@/components/twin/PathEdge";
import type { SystemAsset, SystemPath } from "@/components/twin/types";

/**
 * S06's SHARED CANVAS — ONE drawing that all three ledger columns refer to,
 * rather than one visual per column, which is what Pattern 2 actually
 * specifies.
 *
 * WHY HAND-AUTHORED GEOMETRY AND NOT `TwinExplorer`. `TwinExplorer` is real and
 * verified, and it is the right tool where a layout must be computed from data
 * whose shape changes. Here it is the wrong one: this canvas re-renders on
 * every control selection, and re-running an ELK layout each time would make
 * the nodes jump, which reads as a live simulation running in the browser — a
 * claim OXOT does not make. Fixed geometry holds the eight nodes still, so the
 * only thing that changes is the thing that actually changed: the state of each
 * route.
 *
 * REUSED RATHER THAN REDRAWN: `PathEdge` and `PathEdgeMarkerDefs` for every
 * edge, so colour still tracks `SystemPath.status` and stroke geometry still
 * tracks `role`; and `ASSET_GLYPHS` / `CriticalityMark` / `TYPE_LABEL` from
 * `AssetNode`, so the nine asset silhouettes are the same nine the Twin canvas
 * and the bento use. No second icon set, no second colour rule.
 *
 * THE CROSSHAIR is Pattern 2's own idiom — a circled cross in P&ID convention,
 * marking where a proposed control is inserted — drawn in `--signal-amber`
 * because amber means proposed/pending. It is never a rounded UI pill. Every
 * node whose state differs between baseline and the proposed control takes a
 * PERSISTENT amber outline, not a transient flash, so the discrepancy is
 * readable for as long as the reader wants to look at it.
 *
 * `highlightId` is driven by the ledger's discrepancy list: each list item is a
 * real control that moves the highlight to its node here. There is no drag
 * interaction anywhere on this canvas.
 *
 * FIRST PAINT IS INFORMATIVE. With no control selected the canvas renders the
 * BASELINE route set — every path `open` — rather than a blank frame. That is
 * the direct fix for iteration 1's `useState<number | null>(null)`, which left
 * the middle column as three bare buttons beside two populated siblings.
 */

const NODE_W = 168;
const NODE_H = 40;
/** Text runs from the glyph's right edge to the node's inner right edge. */
const NODE_TEXT_W = NODE_W - 36 - 10;
const VB_W = 768;
const VB_H = 252;

const POS: Record<string, { x: number; y: number }> = {
  vendor: { x: 10, y: 110 },
  ews: { x: 196, y: 34 },
  "maintenance-net": { x: 196, y: 110 },
  scada: { x: 196, y: 186 },
  plc: { x: 396, y: 110 },
  analyzer: { x: 396, y: 186 },
  skid: { x: 584, y: 110 },
  interlock: { x: 584, y: 186 }
};

/** Hand-authored orthogonal routes, in the same `{x, y}` point-sequence shape
 *  `PathEdge` already consumes from ELK, so the renderer is untouched. */
const POINTS: Record<string, Array<{ x: number; y: number }>> = {
  "e-vendor": [
    { x: 178, y: 130 },
    { x: 196, y: 130 }
  ],
  "e-maint-ews": [
    { x: 280, y: 110 },
    { x: 280, y: 74 }
  ],
  "e-maint-plc": [
    { x: 364, y: 130 },
    { x: 396, y: 130 }
  ],
  "e-ews-plc": [
    { x: 364, y: 54 },
    { x: 480, y: 54 },
    { x: 480, y: 110 }
  ],
  "e-scada-plc": [
    { x: 364, y: 206 },
    { x: 440, y: 206 },
    { x: 440, y: 150 }
  ],
  "e-analyzer-plc": [
    { x: 480, y: 186 },
    { x: 480, y: 150 }
  ],
  "e-plc-skid": [
    { x: 564, y: 130 },
    { x: 584, y: 130 }
  ],
  "e-interlock-skid": [
    { x: 668, y: 186 },
    { x: 668, y: 150 }
  ]
};

/** Dashed `--border` outlines with plain labels. They carry the zone/conduit
 *  language the source's own control list asks for and deliberately use no
 *  signal colour, because a zone boundary is structure, not state. */
const ZONES = [
  { id: "external", label: "External", x: 2, y: 96, w: 184, h: 68, labelY: 90 },
  { id: "plant", label: "Plant network", x: 188, y: 20, w: 184, h: 220, labelY: 14 },
  { id: "process", label: "Process control", x: 388, y: 96, w: 372, h: 144, labelY: 90 }
];

function wrap(text: string, maxChars = 19): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  if (words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

export interface DosingCanvasProps {
  assets: SystemAsset[];
  /** Already carrying the status the selected control produces. */
  paths: SystemPath[];
  /** Asset ids where the selected control is inserted. */
  marks: string[];
  /** Asset id the discrepancy list has pointed at, or null. */
  highlightId: string | null;
  title: string;
  locale: Locale;
}

export function DosingCanvas({ assets, paths, marks, highlightId, title, locale }: DosingCanvasProps) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-5">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full min-w-[38rem]"
          role="img"
          aria-label={title}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <defs>
            <PathEdgeMarkerDefs idPrefix="ww2-dosing-arrow" />
          </defs>

          {ZONES.map((zone) => (
            <g key={zone.id}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.w}
                height={zone.h}
                rx={8}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={1}
                strokeDasharray="5 4"
              />
              <text
                x={zone.x + 4}
                y={zone.labelY}
                fontSize={11}
                letterSpacing="0.06em"
                fill="hsl(var(--muted-foreground))"
              >
                {zone.label.toUpperCase()}
              </text>
            </g>
          ))}

          {paths.map((path) => {
            const points = POINTS[path.id];
            if (!points) return null;
            return <PathEdge key={path.id} path={path} points={points} markerId={`ww2-dosing-arrow-${path.status}`} />;
          })}

          {assets.map((asset) => {
            const pos = POS[asset.id];
            if (!pos) return null;
            const Glyph = ASSET_GLYPHS[asset.type];
            const marked = marks.includes(asset.id);
            const highlighted = highlightId === asset.id;
            const lines = wrap(asset.label);
            return (
              <g key={asset.id}>
                {highlighted && (
                  <rect
                    x={pos.x - 4}
                    y={pos.y - 4}
                    width={NODE_W + 8}
                    height={NODE_H + 8}
                    rx={9}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                )}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill="hsl(var(--card))"
                  stroke={marked ? "hsl(var(--signal-amber))" : "hsl(var(--border))"}
                  strokeWidth={marked ? 1.75 : 1}
                />
                <svg x={pos.x + 7} y={pos.y + 4} width={22} height={22} viewBox="0 0 32 32">
                  <Glyph />
                  {asset.criticality && <CriticalityMark tier={asset.criticality} />}
                </svg>
                {lines.map((line, li) => {
                  /* Two of the eight real labels run past the node box, and the
                     Dutch translations will be longer still. Rather than drop
                     the font below the 11px technical-label floor, an over-long
                     line is condensed to the available width with SVG's own
                     `textLength` — the type stays at size and inside its box. */
                  const overflows = line.length * 6.6 > NODE_TEXT_W;
                  return (
                    <text
                      key={li}
                      x={pos.x + 36}
                      y={pos.y + (lines.length === 1 ? 24 : 17 + li * 13)}
                      fontSize={11}
                      letterSpacing="0.03em"
                      fill="hsl(var(--foreground))"
                      textLength={overflows ? NODE_TEXT_W : undefined}
                      lengthAdjust={overflows ? "spacingAndGlyphs" : undefined}
                    >
                      {line}
                    </text>
                  );
                })}
                {marked && <Crosshair cx={pos.x + NODE_W - 11} cy={pos.y + 11} />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* The mandatory text equivalent: every route, its role and its state, in
          words. A screen-reader user reads this instead of the drawing. */}
      <figcaption className="sr-only">
        <ol>
          {paths.map((path) => {
            const from = assets.find((a) => a.id === path.from);
            const to = assets.find((a) => a.id === path.to);
            return (
              <li key={path.id}>
                {from?.label ?? path.from} ({from ? pick(TYPE_LABEL[from.type], locale) : ""}) → {to?.label ?? path.to} (
                {to ? pick(TYPE_LABEL[to.type], locale) : ""}): {path.role}, {path.status}
              </li>
            );
          })}
        </ol>
      </figcaption>
    </figure>
  );
}

/** Pattern 2's crosshair reticle: a circled cross in P&ID convention, marking
 *  where the proposed control is inserted in the model. */
function Crosshair({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke="hsl(var(--signal-amber))" strokeWidth={1.25} fill="none">
      <circle cx={cx} cy={cy} r={6.5} />
      <line x1={cx - 6.5} y1={cy} x2={cx + 6.5} y2={cy} />
      <line x1={cx} y1={cy - 6.5} x2={cx} y2={cy + 6.5} />
    </g>
  );
}
