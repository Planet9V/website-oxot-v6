import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HERO } from "./content";
import { ManuStationLine } from "./ManuStationLine";
import { ManuCornerFrame } from "./ManuCornerFrame";

/**
 * Decorative engineering-ruler tick strip — reinforces the "technical
 * drawing" reading of the hero panel. Pure SVG, currentColor only (no fixed
 * hex), aria-hidden: it carries no information a screen reader needs, same
 * rule as the line/markers in ManuStationLine.
 */
function RulerStrip() {
  return (
    <svg viewBox="0 0 400 16" preserveAspectRatio="none" className="mb-6 h-4 w-full text-primary/30" aria-hidden="true">
      <line x1="0" y1="15" x2="400" y2="15" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 41 }, (_, i) => (
        <line key={i} x1={i * 10} y1={i % 5 === 0 ? 4 : 9} x2={i * 10} y2="15" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

export function ManuHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">Manufacturing & Process</p>
      <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
      <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
        </Button>
      </div>

      <div className="relative mt-14">
        <ManuCornerFrame />
        <div className="rounded-2xl border-2 border-border bg-muted/40 p-6 sm:p-8">
          <RulerStrip />
          <p className="mono-label mb-8 text-muted-foreground">Physical route to operational outcome</p>
          <ManuStationLine nodes={HERO.chain} locale={locale} orientation="vertical" />

          <div className="mt-10 border-t border-border pt-6">
            <p className="mono-label mb-3 text-muted-foreground">Four synchronized views</p>
            <div className="flex flex-wrap gap-2">
              <Badge>{pick(HERO.views[0], locale)}</Badge>
              <Badge variant="outline">{pick(HERO.views[1], locale)}</Badge>
              <Badge variant="outline">{pick(HERO.views[2], locale)}</Badge>
              <Badge variant="outline">{pick(HERO.views[3], locale)}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{pick(HERO.viewsNote, locale)}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
