import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content";
import { Datum } from "./Datum";

/**
 * The page's closing datum. The section-divider rule that has run the length of
 * the page appears once more here — the long-section is closed off, the way a
 * profile drawing terminates at its outfall or its service connection rather
 * than trailing away.
 *
 * One primary CTA and one secondary, per `OXOT_Visual_Rules.md`. Both point at
 * real, live destinations; neither is a placeholder.
 */
export function FinalCta({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="final-cta-h" className="pt-16 sm:pt-24">
      <Datum index="10" label={FINAL_CTA.ctaPrimary} locale={locale} />

      <div className="mt-10 rounded-3xl border border-border bg-muted/40 p-8 sm:p-12">
        <h2 id="final-cta-h" className="h-section text-balance">
          {pick(FINAL_CTA.h2, locale)}
        </h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(FINAL_CTA.body, locale)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="cta-lift">
            <Link href={localePath(locale, PATHS.contact)}>{pick(FINAL_CTA.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale, PATHS.technicalSpecification)}>{pick(FINAL_CTA.ctaSecondary, locale)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
