import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { ANATOMY } from "./content";

/**
 * The switchboard's content contract, rendered for this one decision:
 * evidence required, model action, output, relevant roles. The spec calls
 * for a selectable switchboard on the Decisions OVERVIEW page; this is the
 * detailed form of a single entry, so there is nothing to select and no
 * control is drawn. A tab strip with one tab would be a lie about what the
 * page does.
 *
 * Laid out as a line rather than four cards: the steps hang off one shared
 * rule with a node marking each, because the relationship between them is
 * sequential and a card grid says the opposite.
 */
export function InvestmentAnatomy({ locale }: { locale: Locale }) {
  const t = ANATOMY;

  return (
    <section aria-labelledby="anatomy" className="mt-16 border-t border-border pt-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <div>
          <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
          <h2 id="anatomy" className="mt-4 h-section">
            {pick(t.h2, locale)}
          </h2>
        </div>
        <p className="prose-measure text-base leading-relaxed text-muted-foreground lg:pt-9">{pick(t.intro, locale)}</p>
      </div>

      <ol className="mt-12 grid list-none grid-cols-1 gap-y-10 border-t-2 border-primary/40 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
        {t.steps.map((step, i) => (
          <li key={step.n} className={`relative pt-8 ${i === 0 ? "" : "sm:border-l sm:border-border sm:pl-6"} sm:pr-6`}>
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary"
            />
            <BlurFade inView direction="up" duration={0.4} delay={i * 0.08}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold leading-none text-primary-ink">{step.n}</span>
                <span className="mono-label">{pick(step.label, locale)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(step.body, locale)}</p>
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}
