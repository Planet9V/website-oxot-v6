import type { SystemAsset } from "./types";
import type { LayoutNode } from "./layout";

/**
 * Groups already-positioned nodes by `SystemAsset.zone` and computes a
 * padded bounding box for each group, for `ZoneBand` to render behind its
 * member `AssetNode`s. Pure geometry — this file never talks to ELK or
 * decides layout, only reads positions ELK already produced.
 */

const BAND_PADDING = 16;

export interface ZoneBounds {
  zone: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Node ids belonging to this zone, in their original render order. */
  nodeIds: string[];
}

export function computeZoneBands(nodes: LayoutNode[], assets: SystemAsset[]): ZoneBounds[] {
  const assetById = new Map(assets.map((a) => [a.id, a]));
  const groups = new Map<string, LayoutNode[]>();

  for (const node of nodes) {
    const zone = assetById.get(node.id)?.zone;
    if (!zone) continue;
    const group = groups.get(zone) ?? [];
    group.push(node);
    groups.set(zone, group);
  }

  return Array.from(groups.entries()).map(([zone, members]) => {
    const minX = Math.min(...members.map((n) => n.x)) - BAND_PADDING;
    const minY = Math.min(...members.map((n) => n.y)) - BAND_PADDING;
    const maxX = Math.max(...members.map((n) => n.x + n.width)) + BAND_PADDING;
    const maxY = Math.max(...members.map((n) => n.y + n.height)) + BAND_PADDING;
    return {
      zone,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      nodeIds: members.map((n) => n.id)
    };
  });
}
