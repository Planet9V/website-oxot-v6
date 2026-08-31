import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content";
import { DefenseStamp } from "./DefenseStamp";

/**
 * Page-specific closing panel ahead of the shared ThreeDoors that ends
 * every real page — optional per the brief, included because the source's
 * own final-CTA copy ("bring a site diagram...") is distinct, page-tailored
 * persuasion, same reasoning energy-utilities' EnergyFinalCta.tsx and
 * /assurance's own closing panel use.
 */
export function DefenseFinalCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;
  return (
    <section aria-labelledby="final-cta" className="mt-20 border border-border p-8 sm:p-12">
      <DefenseStamp>Start here</DefenseStamp>
      <h2 id="final-cta" className="mt-4 h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-foreground">{pick(t.body, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localePath(locale, PATHS.contact)}>{pick(t.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={localePath(locale, PATHS.cdt2)}>{pick(t.ctaSecondary, locale)}</Link>
        </Button>
      </div>
    </section>
  );
}
