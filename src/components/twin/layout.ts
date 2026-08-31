import ELK, { type ElkNode } from "elkjs/lib/elk.bundled.js";
import type { SystemAsset, SystemPath } from "./types";

/**
 * ELK computes WHERE; the render layer draws WHAT. Per
 * docs/OXOT-DIAGRAMMING-SPEC.md §1.3: bend points come straight out of ELK's
 * own output and map directly to an SVG path (`M`/`L`), no adapter, no lossy
 * translation. Imports `elk.bundled.js` directly rather than the default
 * worker-based entry — elkjs's web-worker import has a known history of
 * bundler-resolution failures ("Could not resolve 'web-worker'") in other
 * projects, and the bundled build runs synchronously in-thread instead.
 */

/** Matches AssetNode's 32×32 glyph cell plus room for the focus ring and label. */
export const TWIN_NODE_SIZE = 44;

export interface LayoutNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutEdgePoint {
  x: number;
  y: number;
}

export interface LayoutEdge {
  id: string;
  points: LayoutEdgePoint[];
}

export interface LayoutResult {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  width: number;
  height: number;
}

/**
 * Purdue/fixed-layer view: `elk.layered` with each asset's `zone` (when
 * present) pinned to a layer so cross-band traffic routes through named
 * conduits instead of collapsing the banding — per
 * docs/OXOT-DIAGRAMMING-SPEC.md §3, "never force-directed for Purdue."
 * Assets without a `zone` fall back to unconstrained placement within the
 * layered algorithm.
 */
export async function layoutTwin(assets: SystemAsset[], paths: SystemPath[]): Promise<LayoutResult> {
  const elk = new ELK();

  const graph: ElkNode = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.layered.spacing.nodeNodeBetweenLayers": "56",
      "elk.spacing.nodeNode": "36",
      "elk.spacing.edgeNode": "20"
    },
    children: assets.map((a) => ({
      id: a.id,
      width: TWIN_NODE_SIZE,
      height: TWIN_NODE_SIZE,
      ...(a.zone ? { layoutOptions: { "elk.layered.layering.layerId": a.zone } } : {})
    })),
    edges: paths.map((p) => ({
      id: p.id,
      sources: [p.from],
      targets: [p.to]
    }))
  };

  const result = await elk.layout(graph);

  const nodes: LayoutNode[] = (result.children ?? []).map((c) => ({
    id: c.id,
    x: c.x ?? 0,
    y: c.y ?? 0,
    width: c.width ?? TWIN_NODE_SIZE,
    height: c.height ?? TWIN_NODE_SIZE
  }));

  const edges: LayoutEdge[] = (result.edges ?? []).map((e) => {
    const section = e.sections?.[0];
    const points: LayoutEdgePoint[] = section
      ? [section.startPoint, ...(section.bendPoints ?? []), section.endPoint]
      : [];
    return { id: e.id, points };
  });

  return {
    nodes,
    edges,
    width: result.width ?? 0,
    height: result.height ?? 0
  };
}
