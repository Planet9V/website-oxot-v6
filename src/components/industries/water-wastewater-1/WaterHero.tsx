import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { Datum } from "./Datum";
import { HydraulicProfile } from "./HydraulicProfile";

/**
 * `OXOT_Layout_Styles.md` Pattern 1 — Consequence Cascade Hero. Two panes:
 * strategic copy left, the product's own mechanic right. Everything in the left
 * pane is server-rendered and present at first paint; neither the headline nor
 * the lead waits on the diagram, which is that pattern's own hard-won
 * correction after a 2.5s gated sequence was flagged and left unfixed twice.
 *
 * On a narrow viewport the panes stack copy-first, per the same pattern's
 * mobile fix.
 */
export function WaterHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <Datum index="00" label={HERO.eyebrow} locale={locale} />

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="oxot-kicker">{pick(HERO.eyebrow, locale)}</p>
          <h1 className="mt-4 text-balance">{pick(HERO.h1, locale)}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="cta-lift">
              <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <HydraulicProfile locale={locale} />
        </div>
      </div>
    </header>
  );
}
