import type { Locale } from "@/i18n/config";
import { AssetClassBento } from "@/components/twin/AssetClassBento";
import { SYSTEM_ASSETS } from "./content.assets";

/**
 * S04 · PATTERN 3 — ASSET-CLASS BENTO. This file is a few lines long on
 * purpose: the pattern already has a real, generic, sector-agnostic
 * implementation at `src/components/twin/AssetClassBento.tsx`, which renders
 * the three tiered bands, brings its own `<section>` and `<h2>`, and owns the
 * accessibility work. Rebuilding any of that here would produce a second,
 * weaker copy of something already right.
 *
 * NOT WRAPPED IN `Rule.tsx`'s SectionA/B/C: those supply their own `<h2>`, and
 * `AssetClassBento` already renders one, so wrapping would put two headings on
 * one section.
 *
 * NO SEGMENT PROP. Every other segment-aware section on this page takes the
 * passenger/freight selection; this one deliberately does not. All nine classes
 * appear in both architecture stacks, so a selector here would change almost
 * nothing — see the reasoning, and the per-segment `zone` values that carry the
 * difference instead, in `content.assets.ts`.
 *
 * WHAT THIS PAGE OWNS IS THE DATA — see `content.assets.ts`, whose docblock
 * carries the per-asset spec citations and the criticality derivation the rail
 * spec itself does not supply.
 */
export function SystemAssets({ locale }: { locale: Locale }) {
  return (
    <AssetClassBento
      assets={SYSTEM_ASSETS.assets}
      title={SYSTEM_ASSETS.h2}
      intro={SYSTEM_ASSETS.intro}
      locale={locale}
    />
  );
}
