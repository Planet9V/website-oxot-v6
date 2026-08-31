import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BOUNDARY } from "./content";
import { RuleList, SectionHead } from "./primitives";

/**
 * Section 05 — the boundary, written as a list of absences.
 *
 * A catalogue of what connects has to say what does not, and on this product
 * the absences are the differentiator rather than a caveat. The whole section
 * is negative statements on purpose: an OT engineer reading an integrations
 * page is scanning for the sentence that says an agent goes on the
 * controller, and the honest thing is to put that sentence where they are
 * looking rather than in a footnote three sections away.
 *
 * The five constraints and the three deployment configurations are DEPLOYMENT
 * and FAQ on the protected /cdt-2 page. The deployment options are named here
 * in one sentence and linked, not re-explained — /cdt-2 is where that
 * material lives, and this page's job is the input catalogue.
 */
export function Boundary({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby={BOUNDARY.id} className="mt-16 border-t border-border pt-12">
      <SectionHead n={BOUNDARY.n} id={BOUNDARY.id} title={BOUNDARY.title} dek={BOUNDARY.dek} locale={locale} />

      <RuleList items={BOUNDARY.items} locale={locale} />

      <p className="prose-measure mt-8 body-lead leading-relaxed text-muted-foreground">
        {pick(BOUNDARY.closing, locale)}
      </p>

      <p className="mt-6">
        <Button asChild variant="outline">
          <Link href={localePath(locale, PATHS.cdt2)}>{pick(BOUNDARY.cta, locale)}</Link>
        </Button>
      </p>
    </section>
  );
}
