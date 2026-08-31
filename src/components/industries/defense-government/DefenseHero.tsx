import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { DefenseStamp } from "./DefenseStamp";

/**
 * The source brief's hero visual is a four-perspective interactive selector
 * over a mission-to-consequence chain — not built anywhere on this site
 * yet (the only confirmed interactive component sitewide is Cdt2Services'
 * own expand/collapse grid, same precedent energy-utilities' HERO.chain
 * comment cites). Rendered here as a static, illustrated vertical chain
 * instead of skipped or invented as a working control.
 *
 * DELIBERATELY VERTICAL AND DIAMOND-MARKED, not energy-utilities'
 * horizontal rule with round dots (EnergyLine.tsx) — this page's own
 * "angular / restrained" direction (owner brief, 2026-08-22) reads as a
 * descending decision chain rather than a schematic single-line diagram.
 * Only the rule and the diamond markers are decorative/aria-hidden; each
 * node's text label is real content, per the site's rule that a decorative
 * container must never hide the text inside it (see EnergyLine.tsx).
 */
export function DefenseHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <DefenseStamp>Defense &amp; Government</DefenseStamp>
      <h1 className="mt-6 text-balance">{pick(HERO.h1, locale)}</h1>
      <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
        </Button>
      </div>

      <div className="mt-16 max-w-xl border border-border p-8 sm:p-10">
        <p className="mono-label mb-8 text-muted-foreground">Mission to consequence</p>
        <ol className="relative flex list-none flex-col gap-8 border-l-2 border-primary/40 p-0 pl-8">
          {HERO.chain.map((n, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.15rem] top-1 size-[9px] rotate-45 bg-primary"
              />
              <span className="body-copy font-medium leading-snug text-foreground">{pick(n, locale)}</span>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
