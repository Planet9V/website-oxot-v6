import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { TAIL } from "./content";
import { LossTailCurve } from "./LossTailCurve";

/**
 * The counterweight to the section above it. The ridge answers "how much";
 * this answers "how much of what", and it needs its own picture because the
 * fat-tail claim is the one a reader is most likely to nod along to and not
 * actually absorb.
 *
 * Deliberately inverted from the curve section's rhythm: prose in two
 * columns first, then the figure, then the callout — so the page does not
 * settle into a repeating heading-figure-cards beat. The callout is a full
 * width band inside the canvas with display type large enough to be read as
 * a statement rather than a pull-quote decoration.
 */
export function InvestmentTail({ locale }: { locale: Locale }) {
  const t = TAIL;

  return (
    <section aria-labelledby="tail" className="mt-16 border-t border-border pt-10">
      <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
      <h2 id="tail" className="mt-4 h-section">
        {pick(t.h2, locale)}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-14">
        <p className="text-base leading-relaxed text-foreground">{pick(t.body, locale)}</p>
        <p className="text-base leading-relaxed text-muted-foreground">{pick(t.bodyTwo, locale)}</p>
      </div>

      <BlurFade inView direction="up" duration={0.5}>
        <figure className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <LossTailCurve locale={locale} />
        </figure>
      </BlurFade>

      <BlurFade inView direction="up" duration={0.5} delay={0.1}>
        <aside className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-primary/45 bg-primary/10 p-7 sm:p-9 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
          <p className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {pick(t.calloutLead, locale)}
          </p>
          <p className="text-base leading-relaxed text-foreground">{pick(t.calloutBody, locale)}</p>
        </aside>
      </BlurFade>
    </section>
  );
}
