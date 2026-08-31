"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { AssetNode, ASSET_NODE_SIZE } from "./AssetNode";
import { PathEdge, PathEdgeMarkerDefs } from "./PathEdge";
import { ZoneBand } from "./ZoneBand";
import { computeZoneBands } from "./zones";
import { layoutTwin, TWIN_NODE_SIZE, type LayoutResult } from "./layout";
import type { SystemAsset, SystemPath } from "./types";

/**
 * THE ROOT CANVAS. One `<svg>` per docs/OXOT-DIAGRAMMING-SPEC.md §1.3 —
 * `role="graphics-document document"`, owns the roving-tabindex ring across
 * every `AssetNode` it renders, feeds ELK's own bend points straight into
 * `PathEdge`. Layout runs client-side in a `useEffect` for this first build
 * (the spec's own "prefer build-time" guidance applies once real, static
 * scenario data exists to precompute against — not yet the case; a build-time
 * path is a follow-up optimization, not a correctness requirement).
 */

export interface TwinExplorerProps {
  assets: SystemAsset[];
  paths: SystemPath[];
  locale: Locale;
  /** Already-localized, e.g. "Water treatment vendor-access route." */
  title: string;
  /** Already-localized display label per zone id, e.g. `{ process: "Process control" }`. Zones without an entry render their raw id. */
  zoneLabels?: Record<string, string>;
}

const PADDING = 24;

export function TwinExplorer({ assets, paths, locale, title, zoneLabels = {} }: TwinExplorerProps) {
  const [layout, setLayout] = useState<LayoutResult | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);

  useEffect(() => {
    let cancelled = false;
    layoutTwin(assets, paths).then((result) => {
      if (!cancelled) setLayout(result);
    });
    return () => {
      cancelled = true;
    };
  }, [assets, paths]);

  const assetById = useMemo(() => new Map(assets.map((a) => [a.id, a])), [assets]);
  const pathById = useMemo(() => new Map(paths.map((p) => [p.id, p])), [paths]);

  // Roving tabindex: one tab stop enters the canvas, arrow keys move between
  // nodes — the pattern docs/OXOT-DIAGRAMMING-SPEC.md §1.3 requires so a
  // diagram of N assets never costs N sequential tab stops. React state
  // alone doesn't move DOM focus, so the index change is paired with an
  // imperative .focus() call on the newly active node's ref.
  function handleKeyDown(event: React.KeyboardEvent<SVGGElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % assets.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + assets.length) % assets.length;
    } else {
      return;
    }
    event.preventDefault();
    setFocusedIndex(next);
    nodeRefs.current[next]?.focus();
  }

  if (!layout) {
    return (
      <div role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {pick(same("Loading diagram…"), locale)}
      </div>
    );
  }

  const centerOffset = (TWIN_NODE_SIZE - ASSET_NODE_SIZE) / 2;
  const zoneBands = computeZoneBands(layout.nodes, assets);

  return (
    <figure>
      <svg
        role="graphics-document document"
        aria-label={title}
        viewBox={`0 0 ${layout.width + PADDING * 2} ${layout.height + PADDING * 2}`}
        className="h-auto w-full"
      >
        <defs>
          <PathEdgeMarkerDefs idPrefix="twin-arrow" />
        </defs>
        <g transform={`translate(${PADDING}, ${PADDING})`}>
          {zoneBands.map((band) => (
            <ZoneBand
              key={band.zone}
              zone={band.zone}
              label={zoneLabels[band.zone] ?? band.zone}
              x={band.x}
              y={band.y}
              width={band.width}
              height={band.height}
            />
          ))}
          {layout.edges.map((edge) => {
            const path = pathById.get(edge.id);
            if (!path) return null;
            return <PathEdge key={edge.id} path={path} points={edge.points} markerId={`twin-arrow-${path.status}`} />;
          })}
          {layout.nodes.map((node, i) => {
            const asset = assetById.get(node.id);
            if (!asset) return null;
            return (
              <AssetNode
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                asset={asset}
                locale={locale}
                x={node.x + centerOffset}
                y={node.y + centerOffset}
                tabIndex={i === focusedIndex ? 0 : -1}
                onFocus={() => setFocusedIndex(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            );
          })}
        </g>
      </svg>
      <ScenarioSummary assets={assets} paths={paths} />
    </figure>
  );
}

/**
 * The mandatory text equivalent (docs/OXOT-DIAGRAMMING-SPEC.md §1.3,
 * "All diagrams have plain-language text equivalents"). Visually hidden, not
 * decorative — a screen-reader user reads this instead of navigating the
 * canvas node-by-node, and for a Purdue-style diagram it's often more direct
 * than the visual ("Level 3 connects to Level 2") rather than less.
 */
function ScenarioSummary({ assets, paths }: { assets: SystemAsset[]; paths: SystemPath[] }) {
  const assetById = new Map(assets.map((a) => [a.id, a]));
  return (
    <ol className="sr-only">
      {paths.map((p) => {
        const from = assetById.get(p.from)?.label ?? p.from;
        const to = assetById.get(p.to)?.label ?? p.to;
        return (
          <li key={p.id}>
            {from} → {to} ({p.role}, {p.status})
          </li>
        );
      })}
    </ol>
  );
}
