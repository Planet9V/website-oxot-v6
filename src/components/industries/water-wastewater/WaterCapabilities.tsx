import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Separator } from "@/components/ui/separator";
import { CAPABILITIES } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

/** A model register — mono-numbered rows on a divided list, not a card
 *  grid — so this reads as a spec sheet rather than repeating
 *  WaterEngagement's card-grid layout immediately below it on the page. */
export function WaterCapabilities({ locale }: { locale: Locale }) {
  const t = CAPABILITIES;
  return (
    <section aria-labelledby="capabilities" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <h2 id="capabilities" className="h-sub">{pick(t.h2, locale)}</h2>

      <div className="mt-8 max-w-3xl rounded-2xl border border-border bg-card">
        {t.items.map((c, i) => (
          <div key={i}>
            <div className="grid grid-cols-[3.5rem_1fr] items-start gap-3 px-5 py-4 sm:grid-cols-[4rem_1fr]">
              <span className="mono-label pt-0.5 text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{pick(c.name, locale)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pick(c.body, locale)}</p>
              </div>
            </div>
            {i < t.items.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <p className="prose-measure mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">{pick(t.note, locale)}</p>
    </section>
  );
}
