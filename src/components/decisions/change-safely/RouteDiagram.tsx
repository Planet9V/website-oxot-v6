import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { NODES, type NodeId, type RouteEdge, type RouteState } from "./content";

/**
 * ONE GEOMETRY, TWO READINGS. This component owns the coordinates and
 * nothing else: the same GEOMETRY table places every asset in both panels,
 * so the baseline drawing and the post-control drawing cannot drift apart.
 * That is the whole argument of a before/after route comparison — if the
 * boxes move between the two, the reader is comparing pictures instead of
 * routes. (OXOT_content-to-visual-mapping-table.md maps "Proposed control"
 * to "Before/after route comparison" and names "Checkmark list" as the
 * thing to avoid; this is the alternative, and there is no tick-list on
 * the page.)
 *
 * STATIC SVG, SERVER-RENDERED — the same build law zone-conduit-diagram.tsx
 * follows. No client boundary, no state, no handlers, no animation: every
 * glyph is in the HTML the server sends. The page's claim is that a change
 * is tested in a model before it touches the plant, so implying that a live
 * simulation runs in the reader's browser would be exactly the wrong lie to
 * tell here. The caller prints that disclaimer beside both panels.
 *
 * ACCESSIBILITY. Not `aria-hidden`: the figure carries `role="img"` with a
 * real title and description naming what changed, and the route-state table
 * the caller renders underneath is the full text equivalent at every width.
 * Below `lg` the figure scrolls inside its own container rather than
 * shrinking, so no label drops under the 11px mono floor.
 *
 * COLOUR. Token references only. The five semantic states in
 * OXOT_Visual_Foundation_Spec.md §7 map onto the real palette as:
 * red → --destructive, amber → --primary, green → --reg-nis2,
 * blue → --secondary, cyan (evidence-backed object state) → --reg-iec.
 */

/**
 * Boxes are three lines tall: two for the asset name, one for its evidence
 * tag. The tag used to sit inside the box's top-right corner and collided
 * with any asset name longer than about half the width, which is most of
 * them — giving it its own line is what stops that by construction.
 */
const W = 168;
const H = 72;

/** Column x and row y for every asset, shared by both panels. */
const GEOMETRY: Record<NodeId, { x: number; y: number }> = {
  vendor: { x: 8, y: 56 },
  gateway: { x: 248, y: 56 },
  ews: { x: 488, y: 56 },
  zone: { x: 728, y: 56 },
  siteEng: { x: 248, y: 216 },
  diag: { x: 488, y: 216 },
  loop: { x: 728, y: 216 }
};

/* Right of the last column there is 64px of clear space, which is where the
   zone→loop route's label lives: anchoring it inward instead would put it
   across the zone→diagnostics diagonal. */
const VIEW_W = 960;
const VIEW_H = 336;

/** The zone edge: the gutter between the workstation column and the zone. */
const BOUNDARY_X = 692;

const cy = (id: NodeId) => GEOMETRY[id].y + H / 2;
const cx = (id: NodeId) => GEOMETRY[id].x + W / 2;

/** Token per semantic state. The single place a state becomes a colour. */
const STROKE: Record<RouteState, string> = {
  selected: "hsl(var(--destructive))",
  proposed: "hsl(var(--primary))",
  closed: "hsl(var(--reg-nis2))",
  flow: "hsl(var(--secondary))",
  context: "hsl(var(--border))"
};

const EVIDENCE = "hsl(var(--reg-iec))";

/**
 * Edge routing keyed by edge id, so both panels trace identical paths and
 * only the stroke changes. The two cross-row runs are straight diagonals
 * rather than elbows, so they read as routes between rows and not as a
 * second grid competing with the columns.
 */
const PATHS: Record<string, string> = {
  e1: `M${GEOMETRY.vendor.x + W},${cy("vendor")} H${GEOMETRY.gateway.x - 8}`,
  e2: `M${GEOMETRY.gateway.x + W},${cy("gateway")} H${GEOMETRY.ews.x - 8}`,
  e3: `M${GEOMETRY.ews.x + W},${cy("ews")} H${GEOMETRY.zone.x - 8}`,
  e4: `M${cx("zone")},${GEOMETRY.zone.y + H} V${GEOMETRY.loop.y - 8}`,
  e5: `M${cx("gateway")},${GEOMETRY.gateway.y + H} V${GEOMETRY.siteEng.y - 8}`,
  e6: `M${GEOMETRY.siteEng.x + W - 20},${GEOMETRY.siteEng.y} L${GEOMETRY.ews.x + 30},${GEOMETRY.ews.y + H + 8}`,
  e7: `M${GEOMETRY.zone.x + 30},${GEOMETRY.zone.y + H} L${GEOMETRY.diag.x + W - 20},${GEOMETRY.diag.y - 8}`
};

/**
 * Where each route's own label sits.
 *
 * THE THREE ROW-ONE LABELS SIT ABOVE THE BOXES, NOT BESIDE THE ARROW. A
 * 72px column gutter cannot hold a phrase like "Closed in the model", so
 * putting the label on the route's own centreline buried it under the
 * neighbouring asset box. Above the row the label is free to overhang the
 * boxes horizontally, because nothing else occupies that band.
 */
const ROW1_LABEL_Y = GEOMETRY.vendor.y - 14;
const MID_Y = (GEOMETRY.gateway.y + H + GEOMETRY.siteEng.y) / 2 + 4;

const LABELS: Record<string, { x: number; y: number; anchor: "middle" | "start" | "end" }> = {
  e1: { x: (GEOMETRY.vendor.x + W + GEOMETRY.gateway.x) / 2, y: ROW1_LABEL_Y, anchor: "middle" },
  e2: { x: (GEOMETRY.gateway.x + W + GEOMETRY.ews.x) / 2, y: ROW1_LABEL_Y, anchor: "middle" },
  /* e3 and e7 both cross the zone edge, so their labels are anchored to the
     left of BOUNDARY_X rather than centred on the gutter — centred, they
     landed directly on the segmentation boundary in the controlled panel. */
  e3: { x: BOUNDARY_X - 12, y: ROW1_LABEL_Y, anchor: "end" },
  e4: { x: cx("zone") + 12, y: MID_Y, anchor: "start" },
  e5: { x: cx("gateway") - 12, y: MID_Y, anchor: "end" },
  e6: { x: GEOMETRY.siteEng.x + W + 70, y: MID_Y + 4, anchor: "start" },
  e7: { x: BOUNDARY_X - 22, y: MID_Y - 16, anchor: "end" }
};

/**
 * The break marker on a modelled closure: two ticks drawn across the route,
 * so a closed route reads as severed at a glance and not merely recoloured.
 */
function ClosureMark({ edgeId }: { edgeId: string }) {
  const vertical = edgeId === "e4" || edgeId === "e5";
  const x = edgeId === "e2" ? (GEOMETRY.gateway.x + W + GEOMETRY.ews.x) / 2 : LABELS[edgeId].x;
  const y = edgeId === "e2" ? cy("gateway") : LABELS[edgeId].y;
  const segments = vertical
    ? [`M${x - 11},${y - 5} h22`, `M${x - 11},${y + 5} h22`]
    : [`M${x - 5},${y - 11} v22`, `M${x + 5},${y - 11} v22`];
  return (
    <g>
      {segments.map((d) => (
        <path key={d} d={d} stroke={STROKE.closed} strokeWidth={3} strokeLinecap="round" fill="none" />
      ))}
    </g>
  );
}

export function RouteDiagram({
  edges,
  locale,
  variant,
  titleId,
  descId,
  title,
  description,
  boundaryLabel
}: {
  edges: readonly RouteEdge[];
  locale: Locale;
  /** "baseline" rings the target asset; "controlled" draws the boundary. */
  variant: "baseline" | "controlled";
  titleId: string;
  descId: string;
  title: string;
  description: string;
  boundaryLabel: string;
}) {
  const controlled = variant === "controlled";

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="h-auto w-full min-w-[900px]"
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{description}</desc>

        <defs>
          {(Object.keys(STROKE) as RouteState[]).map((state) => (
            <marker
              key={state}
              id={`arrow-${variant}-${state}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,1 L9,5 L0,9 z" fill={STROKE[state]} />
            </marker>
          ))}
        </defs>

        {/* The virtual segmentation boundary — controlled panel only, an
            amber dashed zone edge carrying its own label. */}
        {controlled && (
          <g>
            <path
              d={`M${BOUNDARY_X},14 V${VIEW_H - 32}`}
              stroke={STROKE.proposed}
              strokeWidth={2}
              strokeDasharray="7 6"
              fill="none"
            />
            <text
              x={BOUNDARY_X - 10}
              y={VIEW_H - 12}
              textAnchor="end"
              fontSize={12}
              fontWeight={600}
              fill="hsl(var(--primary-ink))"
            >
              {boundaryLabel}
            </text>
          </g>
        )}

        {/* Routes first, so each asset box sits over its own edges. */}
        {edges.map((edge) => {
          const dashed = edge.state === "context" || (edge.state === "selected" && edge.id === "e4");
          return (
            <g key={edge.id}>
              <path
                d={PATHS[edge.id]}
                stroke={STROKE[edge.state]}
                strokeWidth={edge.state === "context" ? 1.5 : 2.5}
                strokeDasharray={dashed ? "6 5" : undefined}
                fill="none"
                markerEnd={`url(#arrow-${variant}-${edge.state})`}
              />
              {/* Label fill is deliberately NOT STROKE[edge.state]: several
                  state tokens (--primary, --secondary, --reg-nis2) are fill
                  colours tuned for lines/markers, not text — measured under
                  4.5:1 at this 12px size (the same "raw fill vs -ink"
                  distinction globals.css's own "THREE ORANGES" comment
                  documents for --primary). The route's colour still carries
                  the state via its stroke, arrowhead and closure mark; the
                  label text uses the tokens already verified safe as text
                  everywhere else on the site. */}
              <text
                x={LABELS[edge.id].x}
                y={LABELS[edge.id].y}
                textAnchor={LABELS[edge.id].anchor}
                fontSize={12}
                fontWeight={600}
                fill={edge.state === "context" ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"}
              >
                {pick(edge.label, locale)}
              </text>
              {edge.state === "closed" && <ClosureMark edgeId={edge.id} />}
            </g>
          );
        })}

        {/* Brokered access, drawn as a gate ON the vendor route rather than
            as a caption beside it — the same amber language the segmentation
            boundary uses, so both inserted controls read as one kind of
            thing. The route's own label above the row names it; a text chip
            would not fit a 72px gutter without overflowing it. */}
        {controlled && (
          <circle
            cx={(GEOMETRY.vendor.x + W + GEOMETRY.gateway.x) / 2}
            cy={cy("vendor")}
            r={9}
            fill="hsl(var(--primary) / 0.22)"
            stroke={STROKE.proposed}
            strokeWidth={2.5}
          />
        )}

        {NODES.map((node) => {
          const { x, y } = GEOMETRY[node.id];
          /* The target asset is ringed red in the baseline only: §7 reserves
             red for the explicitly selected consequential baseline route. */
          const ringed = node.id === "zone" && !controlled;
          return (
            <g key={node.id}>
              <rect
                x={x}
                y={y}
                width={W}
                height={H}
                rx={10}
                fill="hsl(var(--card))"
                stroke={ringed ? STROKE.selected : "hsl(var(--border))"}
                strokeWidth={ringed ? 2 : 1.25}
              />
              <text x={x + 14} y={y + 25} fontSize={13.5} fontWeight={600} fill="hsl(var(--foreground))">
                {pick(node.line1, locale)}
              </text>
              <text x={x + 14} y={y + 43} fontSize={13} fill="hsl(var(--muted-foreground))">
                {pick(node.line2, locale)}
              </text>
              {node.evidence && (
                <>
                  <circle cx={x + 18} cy={y + 60} r={3.5} fill={EVIDENCE} />
                  {/* Same "fill vs text" split as the edge labels above:
                      --reg-iec marks the dot, --muted-foreground (already
                      used one line up for node.line2) carries the text. */}
                  <text x={x + 28} y={y + 64} fontSize={11} fontWeight={600} fill="hsl(var(--muted-foreground))">
                    {pick(node.evidence, locale)}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
