import type { Locale } from "@/i18n/config";
import { AssetClassBento } from "@/components/twin/AssetClassBento";
import { SYSTEM_ASSETS } from "./content.assets";

/**
 * S05 · PATTERN 3 — ASSET-CLASS BENTO. This file is short on purpose: the
 * pattern already has a real, generic, sector-agnostic implementation at
 * `src/components/twin/AssetClassBento.tsx`, which renders the three tiered
 * bands, brings its own `<section>` and `<h2>`, and owns the accessibility
 * work. Rebuilding any of that here would produce a second, weaker copy of
 * something already right.
 *
 * NOT WRAPPED IN `Rule.tsx`'s SectionA/B/C, AND NO BARE `Datum` EITHER: each of
 * those shells renders its own `<h2>`, and `AssetClassBento` already renders
 * one, so wrapping would put two headings on one section. The `Datum` path pair
 * is likewise not drawn here — no shipped page's `SystemAssets` draws one
 * (rail-transportation-2, manufacturing-process-2, energy-utilities-2 and all
 * three water-wastewater iterations render `AssetClassBento` alone), and this
 * page follows that precedent rather than starting a second convention for the
 * one section that has no source section of its own. `AssetClassBento`'s own
 * `mt-20` is therefore the only spacing in play.
 *
 * WHAT THIS PAGE OWNS IS THE DATA — see `content.assets.ts`, whose docblock
 * carries the per-class tier citations, the mechanism that pulls every element
 * string out of `content.architecture.ts` rather than re-transcribing the spec,
 * and the criticality derivation the hyperscale spec itself does not supply.
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
