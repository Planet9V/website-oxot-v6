import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CAPABILITIES } from "./content";

/**
 * CUSTOM TREATMENT, DELIBERATE — seven strata of one model.
 *
 * Asset-Class Bento is the pattern that nominally "serves … Industries
 * applications sections", and it is deliberately not reused here. Its cells
 * *are* the nine `SystemAsset.type` values — that binding is the whole reason
 * the pattern is a taxonomy rather than a layout convenience. These are seven
 * capabilities of one model, not nine asset classes; putting them in that grid
 * would keep the pattern's shape while discarding the only thing that makes the
 * shape mean anything. The bento is used once on this page, on the section
 * whose content genuinely is the nine types.
 *
 * Seven equal cards is barred outright by `OXOT_Visual_Rules.md`. So: seven
 * full-width strata, each stepping one notch further in, carrying the page's
 * hydraulic-profile language sideways — layers of one model rather than a rack
 * of separate products, which is exactly what the source's own headline claims
 * ("One model spanning source, treatment, field assets, and recovery").
 * Hierarchy comes from the index, the serif name and the indent; no stratum is
 * tinted, because a second colour here would be a competing accent.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  return (
    <div>
      {/* NO ENTRANCE ANIMATION, deliberately — see SectorReality's note: a
          strand fading in on scroll explains no system state, and the
          Foundation Spec calls decorative motion a defect. */}
      <ol className="border-t border-border">
        {CAPABILITIES.items.map((item, i) => (
          <li key={i} className="border-b border-border" style={{ paddingLeft: `${i * 10}px` }}>
            <div className="grid gap-x-8 gap-y-2 py-6 lg:grid-cols-12">
              <div className="flex items-baseline gap-4 lg:col-span-5">
                <span className="mono-label shrink-0 text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-card text-foreground">{pick(item.name, locale)}</h3>
              </div>
              <p className="body-copy leading-relaxed text-muted-foreground lg:col-span-7">
                {pick(item.body, locale)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="prose-measure mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(CAPABILITIES.note, locale)}
      </p>
    </div>
  );
}
