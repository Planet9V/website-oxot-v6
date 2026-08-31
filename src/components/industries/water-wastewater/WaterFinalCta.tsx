import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

/**
 * Page-specific closing panel, ahead of the shared ThreeDoors that ends
 * every real page. Kept because the source brief's own final-CTA copy is
 * distinct, page-tailored persuasion ("bring a process-flow diagram...")
 * worth more than the generic three-door choice alone — same reasoning
 * energy-utilities' EnergyFinalCta.tsx and /assurance use for their own
 * closing panels.
 */
export function WaterFinalCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;
  /* /technical-specification is EN-only — NL falls back to /cdt-2 (no
     locale guard), same no-404 reasoning as WaterRegulatory's assurance
     link. */
  const secondaryHref = locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);
  return (
    <section aria-labelledby="final-cta" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <div className="max-w-2xl rounded-2xl border border-border bg-muted p-6 sm:p-8">
        <h2 id="final-cta" className="h-sub">{pick(t.h2, locale)}</h2>
        <p className="prose-measure mt-4 max-w-xl body-lead leading-relaxed text-foreground">{pick(t.body, locale)}</p>
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
