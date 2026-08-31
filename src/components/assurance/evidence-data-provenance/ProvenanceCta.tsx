import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content";

/**
 * The page's own closing ask, ahead of the global ThreeDoors — same
 * precedent as /assurance's closing panel and RailFinalCta: the source
 * brief's final CTA is specific ("bring one decision, and one document")
 * and does more work than the generic three-door choice alone.
 *
 * /technical-specification is EN-only, so NL falls back to /cdt-2 rather
 * than sending a Dutch reader to a 404 — the convention RailFinalCta set.
 */
export function ProvenanceCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;
  const secondaryHref =
    locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);

  return (
    <section aria-labelledby="provenance-cta" className="mt-16 border-t border-border pt-10">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 id="provenance-cta" className="h-sub">{pick(t.h2, locale)}</h2>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-foreground">{pick(t.body, locale)}</p>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
          {pick(t.bodyTwo, locale)}
        </p>
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
