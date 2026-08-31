import type { Locale } from "@/i18n/config";
import { AssetClassBento } from "@/components/twin/AssetClassBento";
import { SYSTEM_ASSETS } from "./content";

/**
 * `OXOT_Layout_Styles.md` Pattern 3 — Asset-Class Bento, and the reason this
 * file is a few lines long: the pattern already has a real, generic,
 * sector-agnostic implementation at `src/components/twin/AssetClassBento.tsx`.
 * That component was rebuilt on 2026-08-25 to render three horizontal tiered
 * bands (Critical / Important / Context) — tier is carried by band position, a
 * visible band label, and a rail-intensity step, never by cell area or size —
 * with its DOM-order focus rule carried forward unchanged. Re-implementing any
 * of that here would produce a second, weaker copy of a pattern that is
 * already correct.
 *
 * What this iteration owns is the *data*: one asset per `SystemAsset.type`, all
 * nine, each named by the source brief itself. That is the pattern's own point
 * — it is a renderer, not a design, and each industry's bands change shape
 * because the underlying inventory does.
 *
 * Its cells being the nine type values is also why this pattern appears nowhere
 * else on the page. The product-capability section further down is seven
 * capabilities, not nine asset classes; dropping it into this grid would keep
 * the shape while losing the taxonomy that gives the shape its meaning.
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
