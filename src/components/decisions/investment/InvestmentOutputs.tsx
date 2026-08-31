import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { OUTPUTS } from "./content";

/**
 * The three outputs, as ruled rows rather than three equal cards — the
 * pattern the visual spec explicitly names as the default to avoid, and the
 * page has already spent its card budget on the two figures above.
 *
 * Ruled rows also read correctly for what these are: line items on a
 * deliverable, not three coequal features. The numeral column is oversized
 * so the section scans as a specification sheet at a glance.
 */
export function InvestmentOutputs({ locale }: { locale: Locale }) {
  const t = OUTPUTS;

  return (
    <section aria-labelledby="outputs" className="mt-16 border-t border-border pt-10">
      <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
      <h2 id="outputs" className="mt-4 h-section">
        {pick(t.h2, locale)}
      </h2>

      <ol className="mt-10 list-none p-0">
        {t.items.map((item, i) => (
          <li key={item.n} className="border-t border-border py-7 last:border-b">
            <BlurFade inView direction="up" duration={0.4} delay={i * 0.08}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[5rem_minmax(0,20rem)_1fr] lg:items-baseline lg:gap-8">
                <span className="font-display text-4xl font-bold leading-none text-primary-ink">{item.n}</span>
                <h3 className="h-card text-xl">{pick(item.title, locale)}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{pick(item.body, locale)}</p>
              </div>
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}
