import type { Locale } from "@/i18n/config";
import { AssetClassBento } from "@/components/twin/AssetClassBento";
import { SYSTEM_ASSETS } from "./content";

/** Thin host — all real Pattern-3 logic lives in the shared, reusable
 *  AssetClassBento; this file just supplies Water's own real asset data. */
export function WaterSystemAssets({ locale }: { locale: Locale }) {
  return (
    <AssetClassBento assets={SYSTEM_ASSETS.assets} title={SYSTEM_ASSETS.h2} intro={SYSTEM_ASSETS.intro} locale={locale} />
  );
}
