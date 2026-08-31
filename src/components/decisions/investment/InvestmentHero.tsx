import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { HERO } from "./content";

/**
 * Asymmetric hero, but built the opposite way round from the industry
 * pages: no illustration beside the headline. The buyer question sits there
 * instead, in a bordered plaque, because this page exists to answer one
 * sentence and putting that sentence at eye level next to the headline is
 * more useful than a decorative render.
 *
 * The page's real opening image is the risk-reduction curve, and it runs
 * full width in the section below rather than being squeezed into a hero
 * column — a two-panel chart at 40% of the canvas is unreadable, and a
 * chart the reader cannot read is decoration.
 */
export function InvestmentHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <BlurFade inView direction="up" duration={0.5}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-14">
          <div>
            <p className="oxot-kicker">{pick(HERO.eyebrow, locale)}</p>
            <h1 className="h-page mt-5 text-foreground">
              {pick(HERO.h1, locale)}
            </h1>
          </div>

          <aside className="border-l-2 border-primary pl-5 lg:pb-3">
            <p className="mono-label">{pick(HERO.buyerQuestionLabel, locale)}</p>
            <p className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-foreground">
              {pick(HERO.buyerQuestion, locale)}
            </p>
          </aside>
        </div>
      </BlurFade>

      <BlurFade inView direction="up" duration={0.5} delay={0.1}>
        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-8 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <p className="prose-measure text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
          <div className="flex flex-wrap items-start gap-3 lg:justify-end">
            <Button asChild size="lg">
              <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`${localePath(locale, PATHS.cdt2)}#invest`}>{pick(HERO.ctaSecondary, locale)}</Link>
            </Button>
          </div>
        </div>
      </BlurFade>
    </header>
  );
}
