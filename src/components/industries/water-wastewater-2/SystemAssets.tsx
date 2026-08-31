import type { Locale } from "@/i18n/config";
import { AssetClassBento } from "@/components/twin/AssetClassBento";
import { SYSTEM_ASSETS } from "./content.assets";

/**
 * S03 · PATTERN 3 — ASSET-CLASS BENTO, and the reason this file is a few lines
 * long: the pattern already has a real, generic, sector-agnostic implementation
 * at `src/components/twin/AssetClassBento.tsx`. That component was rebuilt on
 * 2026-08-25 to render three horizontal tiered bands (Critical / Important /
 * Context) — tier is carried by band position, a visible band label, and a
 * rail-intensity step, never by cell area or size; every card within a band
 * is uniform, and every card's full description renders unclamped. It is the
 * correct reference implementation. Rebuilding the grid logic here would
 * produce a second, weaker copy of something already right.
 *
 * WHAT THIS PAGE OWNS IS THE DATA — see `content.assets.ts`, whose own
 * docblock records the tier-encoding rebuild and explicitly withdraws the
 * earlier hero-cell content-floor arithmetic; that machinery no longer
 * exists in the renderer, so it isn't restated here either.
 *
 * THE BENTO IS NOT FORCED ON THE CAPABILITIES SECTION further down the page.
 * Its cells ARE the nine `SystemAsset.type` values; the capabilities are seven
 * capabilities of one model. Keeping the pattern's shape while discarding its
 * taxonomy is exactly the "named a pattern then substituted something else"
 * failure.
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
