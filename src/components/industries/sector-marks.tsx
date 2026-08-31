import type { ComponentType } from "react";

/**
 * One line mark per sector, for the /industries index cards.
 *
 * DRAWN HERE RATHER THAN PULLED FROM THE GLYPH LIBRARY, DELIBERATELY. The
 * compiled draw.io manifest is server-only (~3 MB) and `resolveSymbol` /
 * `DrawioGlyph` must never cross a `"use client"` boundary — the index grid is
 * a client component because it carries a view toggle. They are also a
 * different KIND of drawing: a manifest glyph is an engineering symbol
 * asserting what a specific asset IS, whereas these stand for a whole sector.
 * Putting a P&ID pump on a card headed "Manufacturing & Process" would claim
 * the sector is that pump.
 *
 * ONE GRAMMAR ACROSS ALL SIX so the grid reads as a set: 32-unit box,
 * `currentColor` stroke at 1.5, round caps and joins, no fill, no interior
 * detail below ~2 units. They inherit colour from the card, so they follow
 * theme and hover state without a single per-mark token.
 *
 * Each mark names its sector's own subject rather than a generic icon — the
 * pylon carries conductors, the basin carries a weir, the rack carries units.
 * None encodes state, count or capacity: nothing here is a claim.
 */

type Mark = ComponentType<{ className?: string }>;

const BOX = "0 0 32 32";
const S = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

/** Transmission pylon carrying two conductor levels. */
function EnergyMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BOX} className={className} aria-hidden="true" {...S}>
      <path d="M11 27 L16 6 L21 27" />
      <path d="M6.5 12.5 H25.5" />
      <path d="M8.5 18 H23.5" />
      <path d="M12.6 18 L16 12.5 L19.4 18" />
      <path d="M9.5 12.5 v2.5 M22.5 12.5 v2.5" />
    </svg>
  );
}

/** Treatment basin with a weir and the water line across it. */
function WaterMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BOX} className={className} aria-hidden="true" {...S}>
      <path d="M5 9 v14 a2 2 0 0 0 2 2 h18 a2 2 0 0 0 2-2 V9" />
      <path d="M5 15.5 c2.6 0 2.6 2.2 5.2 2.2 s2.6-2.2 5.2-2.2 2.6 2.2 5.2 2.2 2.6-2.2 5.2-2.2" />
      <path d="M20 9 v6.2" />
    </svg>
  );
}

/** Two rails running to a vanishing point, over sleepers. */
function RailMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BOX} className={className} aria-hidden="true" {...S}>
      <path d="M11 27 L14.6 6" />
      <path d="M21 27 L17.4 6" />
      <path d="M9.6 23 H22.4" />
      <path d="M10.7 17.5 H21.3" />
      <path d="M11.8 12 H20.2" />
    </svg>
  );
}

/** A process vessel on a line, with the run continuing past it. */
function ManufacturingMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BOX} className={className} aria-hidden="true" {...S}>
      <rect x={11} y={9} width={10} height={14} rx={5} />
      <path d="M4 16 H11" />
      <path d="M21 16 H28" />
      <path d="M14.2 13 H17.8" />
      <path d="M14.2 19 H17.8" />
    </svg>
  );
}

/** A rack of units — the sector's own object, not a cloud. */
function DataCenterMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BOX} className={className} aria-hidden="true" {...S}>
      <rect x={7} y={5} width={18} height={22} rx={1.5} />
      <path d="M7 12 H25" />
      <path d="M7 19 H25" />
      <path d="M10.5 8.5 h4" />
      <path d="M10.5 15.5 h4" />
      <path d="M10.5 22.5 h4" />
    </svg>
  );
}

/** A shield with an internal boundary — sovereignty drawn as containment. */
function DefenseMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BOX} className={className} aria-hidden="true" {...S}>
      <path d="M16 4 L27 8 v8.5 c0 6.4-4.6 9.9-11 11.5 -6.4-1.6-11-5.1-11-11.5 V8 Z" />
      <path d="M16 9.5 L21.5 11.5 v4.4 c0 3.2-2.3 5-5.5 5.9 -3.2-.9-5.5-2.7-5.5-5.9 v-4.4 Z" />
    </svg>
  );
}

/** Keyed by the registry's own `slug`, so a sector cannot get another's mark. */
export const SECTOR_MARKS: Record<string, Mark> = {
  "energy-utilities": EnergyMark,
  "water-wastewater": WaterMark,
  "rail-transportation": RailMark,
  "manufacturing-process": ManufacturingMark,
  "hyperscale-data-centers": DataCenterMark,
  "defense-government": DefenseMark
};
