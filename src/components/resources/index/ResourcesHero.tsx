import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO, resourceHref } from "./content";

/**
 * NO INDEX RAIL IN THE HERO. The obvious hub hero puts the resource names
 * in a row of chips at the top and then repeats them as cards below —
 * which is precisely the failure /case-studies' own doc comment records
 * and fixed: a reader scrolled past the same set twice before reaching the
 * one that mattered. "Choose your path" is four screens' worth of page
 * away at most, and it does that job properly.
 *
 * The headline runs at the site's normal h1 role rather than the oversized
 * clamp the industry pages use. A hub is a signpost, not a pitch — the
 * reader arrived intending to browse, and a 5rem headline would push the
 * featured resource below the fold.
 *
 * Both CTAs are the source's, verbatim, and both point at real routes.
 */
export function ResourcesHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">{pick(HERO.kicker, locale)}</p>
      <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
      <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
        {pick(HERO.lead, locale)}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={resourceHref(locale, PATHS.resourcesInsights)}>{pick(HERO.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={resourceHref(locale, PATHS.technicalSpecification, true)} hrefLang="en">
            {pick(HERO.ctaSecondary, locale)}
          </Link>
        </Button>
      </div>
    </header>
  );
}
