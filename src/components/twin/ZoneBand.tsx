/**
 * A labeled grouping band behind a zone's assets — the Purdue-banding
 * primitive docs/OXOT-DIAGRAMMING-SPEC.md §3 requires: "never force-directed
 * for the Purdue view, since it destroys the property the view exists to
 * show." This component doesn't decide layout (that's ELK's job, driven by
 * each asset's `zone` pinning a layer via `layout.ts`) — it only draws the
 * banding that makes the zone grouping ELK already computed legible, and
 * carries a `<title>` so a screen reader's a11y tree gets "Level 3 —
 * Operations" as a real group name, not silent background decoration.
 *
 * Deliberately a plain `<g role="group">`, not `role="graphics-object"` —
 * this groups nodes for orientation, it isn't itself a drawn symbol the way
 * `AssetNode`/`PathEdge` are, so it stays out of the roving-tabindex ring
 * entirely (no `tabIndex`) rather than adding a redundant stop.
 */

export interface ZoneBandProps {
  zone: string;
  /** Already-localized display label, e.g. "Level 3 — Operations." */
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ZoneBand({ zone, label, x, y, width, height }: ZoneBandProps) {
  return (
    <g role="group" aria-label={label} data-zone={zone} data-gfx-meaning={label}>
      <title>{label}</title>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill="hsl(var(--muted) / 0.4)"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text
        x={x + 10}
        y={y + 16}
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.04em"
        fill="hsl(var(--muted-foreground))"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}
