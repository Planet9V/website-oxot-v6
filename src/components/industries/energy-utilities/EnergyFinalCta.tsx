import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content";

/**
 * Page-specific closing panel, ahead of the shared ThreeDoors that ends
 * every real page. Kept because the source brief's own final-CTA copy is
 * distinct, page-tailored persuasion ("bring a single-line diagram...")
 * worth more than the generic three-door choice alone — same reasoning
 * /assurance uses for its own "Where each regime is covered" panel before
 * ThreeDoors.
 */
export function EnergyFinalCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;
  /* /technical-specification is EN-only — NL falls back to /cdt-2 (no
     locale guard), same no-404 reasoning as EnergyRegulatory's assurance
     link. */
  const secondaryHref = locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);
  return (
    <section aria-labelledby="final-cta" className="mt-16 border-t border-border pt-10">
      <div className="rounded-2xl border border-border bg-muted p-6 sm:p-8">
        <h2 id="final-cta" className="h-sub">{pick(t.h2, locale)}</h2>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-foreground">{pick(t.body, locale)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(t.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={secondaryHref}>{pick(t.ctaSecondary, locale)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
