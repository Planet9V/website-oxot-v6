/**
 * The OXOT Digital Twin data contract — the slice needed by `AssetNode`,
 * `PathEdge`, and `TwinExplorer`.
 *
 * Source: `OXOT_content-to-visual-mapping-table.md` (oxot_website_public_sept
 * repo, new_material_source/1_website_layout_v4/) and
 * `docs/OXOT-DIAGRAMMING-SPEC.md` §3 in this repo. `SystemAsset` and
 * `SystemPath` here match that mapping table's TypeScript contract verbatim.
 * Full `TwinScenario` / `TwinView` / `ProposedControl` / `Consequence` are
 * still out of scope — they belong to whichever component first needs
 * scenario-level data (multi-view switching, controls, consequences), not
 * yet built.
 */

/**
 * The nine asset classes the Twin models. Exactly nine — verified against the
 * mapping table. `AssetNode` gives each one a distinct silhouette, not a
 * distinct colour: shape carries type, so type reads correctly even to a
 * colour-blind viewer or a screen reader (colour is reserved for
 * `SystemPath.status` on `PathEdge`, per docs/OXOT-DIAGRAMMING-SPEC.md §3).
 */
export type SystemAssetType =
  | "process-equipment"
  | "field-device"
  | "controller"
  | "hmi"
  | "engineering-workstation"
  | "network-device"
  | "remote-access"
  | "safety-function"
  | "service";

/**
 * Three tiers, never colour-coded (a non-colour marker is required — see
 * `CriticalityMark` in docs/OXOT-DIAGRAMMING-SPEC.md §3). `context` renders no
 * mark at all; `important` and `critical` are told apart by solid-vs-hollow
 * fill, the same technique `PurdueGlyph` uses in view-glyphs.tsx, because
 * opacity multiplies stroke as well as fill and fails WCAG 1.4.11 at low
 * values.
 */
export type AssetCriticality = "context" | "important" | "critical";

export interface SystemAsset {
  id: string;
  type: SystemAssetType;
  /** Already-localized display label, authored per scenario by content, not by this component. */
  label: string;
  /** Already-localized longer description. Not read by `AssetNode` — carried for parity with the mapping table's contract and for a future evidence/detail panel. */
  description: string;
  /** Purdue/network zone. Read by `ZoneBand`, not by `AssetNode` itself. */
  zone?: string;
  criticality?: AssetCriticality;
  /**
   * OPTIONAL OVERRIDE: the specific engineering symbol for THIS asset, where
   * the nine type silhouettes are too coarse to be correct.
   *
   * `type` answers "what class of thing is this", and nine silhouettes is the
   * right resolution for that question. It is the wrong resolution for a
   * drawing an engineer reads: three different instrument loops are all
   * `field-device`, and a metering pump and a dosing skid are both
   * `process-equipment` — so each pair draws identically, and a reader who
   * knows the notation reads "these are the same device". That is a false
   * statement made by a renderer, not a shortfall in detail.
   *
   * A slug here names a real published mark instead. Resolution, and the list
   * of admissible namespaces, live in `assetGlyph` in ./AssetNode.tsx —
   * deliberately a SEPARATE, curated resolver from
   * `../diagrams/types.ts::resolveSymbol`, which additionally falls through to
   * the 462 KB compiled stencil manifest and therefore must never be imported
   * by anything inside a `"use client"` boundary. Every Twin canvas is one.
   *
   * Absent, the asset draws `ASSET_GLYPHS[type]` exactly as before. Nothing is
   * obliged to set it, and no asset outside water-wastewater-3 does.
   */
  symbol?: string;
}

/**
 * A connection between two assets. `role` and `status` are the two encoding
 * axes `PathEdge` uses — colour comes from `status` (spec-mandated: §5's
 * required-states table has a control turning an edge green "after
 * simulation" with `role` unchanged, which only works if colour tracks
 * status), stroke geometry from `role`. Neither is optional: an edge with no
 * declared state can't be rendered meaningfully.
 */
export interface SystemPath {
  id: string;
  from: string;
  to: string;
  protocol?: string;
  role: "required-flow" | "attack-path" | "management" | "vendor-access";
  status: "open" | "controlled" | "closed" | "unknown";
}

export const SYSTEM_ASSET_TYPES: readonly SystemAssetType[] = [
  "process-equipment",
  "field-device",
  "controller",
  "hmi",
  "engineering-workstation",
  "network-device",
  "remote-access",
  "safety-function",
  "service"
] as const;
