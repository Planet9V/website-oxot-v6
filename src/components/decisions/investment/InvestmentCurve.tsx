import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { CURVE } from "./content";
import { RiskReductionCurve } from "./RiskReductionCurve";

/**
 * Figure first, prose second — and the prose is laid out to belong to the
 * figure rather than merely follow it. The three zone columns are weighted
 * 40 / 33 / 27 to sit under the three bands the chart actually draws
 * (RiskReductionCurve's RIDGE = 0.36 and STOPS_PAYING = 0.75, mapped
 * through its 78..712 plot area), so "Compounding" reads under the
 * compounding band and "Flat tail" under the flat one. Change the curve's
 * constants and these weights need changing with them; that coupling is
 * the point, not an accident.
 *
 * The illustrative disclaimer sits immediately under the chart in the same
 * bordered surface, not in a footnote further down the page — a caption a
 * reader has to go looking for is not a caption.
 */
export function InvestmentCurve({ locale }: { locale: Locale }) {
  const t = CURVE;

  return (
    <section aria-labelledby="curve" className="mt-16 border-t border-border pt-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <div>
          <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
          <h2 id="curve" className="mt-4 h-section">
            {pick(t.h2, locale)}
          </h2>
        </div>
        <p className="prose-measure text-base leading-relaxed text-muted-foreground lg:pt-9">{pick(t.intro, locale)}</p>
      </div>

      <BlurFade inView direction="up" duration={0.5}>
        <figure className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <RiskReductionCurve locale={locale} />
          <figcaption className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
            {pick(t.illustrativeNote, locale)}
          </figcaption>
        </figure>
      </BlurFade>

      <ol className="mt-10 grid list-none grid-cols-1 gap-x-0 gap-y-8 p-0 lg:grid-cols-[40fr_33fr_27fr] lg:gap-y-0">
        {t.zones.map((zone, i) => (
          <li key={zone.n} className={`border-t-2 pt-5 lg:pr-8 ${i === 2 ? "border-border" : "border-primary"}`}>
            <BlurFade inView direction="up" duration={0.4} delay={i * 0.08}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold leading-none text-primary-ink">{zone.n}</span>
                <span className="mono-label">{pick(zone.label, locale)}</span>
              </div>
              <h3 className="mt-3 h-card text-lg">{pick(zone.title, locale)}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{pick(zone.body, locale)}</p>
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}
