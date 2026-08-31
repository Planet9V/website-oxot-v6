import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { EnergyLine } from "./EnergyLine";

export function EnergyHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">Energy & Utilities</p>
      <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
      <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={`${localePath(locale, PATHS.contact)}`}>{pick(HERO.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
        </Button>
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <p className="mono-label mb-6 text-muted-foreground">Physical route to operational outcome</p>
        <EnergyLine nodes={HERO.chain} locale={locale} />
      </div>
    </header>
  );
}
