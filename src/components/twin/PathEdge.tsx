import type { SystemPath } from "./types";

/**
 * TWO ENCODING AXES, NEVER CONFLATED.
 *
 * Colour comes from `status` alone, never `role` — spec-mandated
 * (docs/OXOT-DIAGRAMMING-SPEC.md §3, resolved from a real conflict: §5's
 * required-states table has a control turning a segment green "after
 * simulation" with the segment's `role` unchanged, which only renders
 * correctly if colour tracks `status`). `open` stays blue rather than
 * jumping straight to red — this matches the precedent already set in
 * `OXOT_Layout_Styles.md`'s Consequence Cascade Hero pattern ("path =
 * `--signal-blue` until the path resolves"): a path being shown is neutral
 * information until something resolves it, not an alarm by default. Red is
 * reserved for a specific flagged consequence, which this component doesn't
 * render — that's `ConsequenceChain`'s job, not the edge's.
 *
 * Role comes through as stroke geometry, never colour — a `required-flow`
 * edge and an `attack-path` edge can share a status (both "open") and still
 * need to read as different kinds of thing on sight.
 */

const STATUS_TOKEN: Record<SystemPath["status"], string> = {
  open: "hsl(var(--signal-blue))",
  controlled: "hsl(var(--signal-amber))",
  closed: "hsl(var(--signal-green))",
  unknown: "hsl(var(--signal-slate))"
};

const ROLE_DASH: Record<SystemPath["role"], string | undefined> = {
  "required-flow": undefined, // solid — the expected, permanent case needs no texture
  "attack-path": "6 4",
  management: "1.5 3",
  "vendor-access": "6 2 1.5 2"
};

export interface PathEdgePoint {
  x: number;
  y: number;
}

export interface PathEdgeProps {
  path: SystemPath;
  /** ELK's own bend-point sequence for this edge (start, any bends, end), already resolved to the parent canvas's coordinate space. */
  points: PathEdgePoint[];
  markerId: string;
}

/** Builds a polyline `d` string directly from ELK's bend points — no adapter, no lossy translation, per docs/OXOT-DIAGRAMMING-SPEC.md §1.3. */
function pointsToPath(points: PathEdgePoint[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

export function PathEdge({ path, points, markerId }: PathEdgeProps) {
  if (points.length < 2) return null;
  const stroke = STATUS_TOKEN[path.status];
  const dash = ROLE_DASH[path.role];
  return (
    <path
      d={pointsToPath(points)}
      fill="none"
      stroke={stroke}
      strokeWidth={1.75}
      strokeDasharray={dash}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={`url(#${markerId})`}
    />
  );
}

/** One arrowhead `<marker>` per status colour, since SVG markers don't inherit `currentColor` reliably across browsers. Rendered once by `TwinExplorer`'s `<defs>`, referenced here by id. */
export function PathEdgeMarkerDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {(Object.keys(STATUS_TOKEN) as Array<SystemPath["status"]>).map((status) => (
        <marker
          key={status}
          id={`${idPrefix}-${status}`}
          viewBox="0 0 8 8"
          refX={7}
          refY={4}
          markerWidth={5}
          markerHeight={5}
          orient="auto-start-reverse"
        >
          <path d="M0,0 L8,4 L0,8 z" fill={STATUS_TOKEN[status]} />
        </marker>
      ))}
    </>
  );
}
