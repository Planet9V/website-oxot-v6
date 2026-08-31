/**
 * The system under consideration. The drawn boundary comes first because
 * the argument is spatial before it is textual — what is inside, what is
 * outside, and what crosses. The two tables beneath it answer the two
 * questions the figure raises: what a boundary can reasonably be for a
 * given railway role, and what the Twin actually produces once one is
 * agreed.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCOPE } from "./content";
import { SCOPE_BOUNDARIES, SCOPE_OUTPUTS } from "./content-tables";
import { PairTable, SectionHead } from "./kit";
import { SystemBoundaryFigure } from "./SystemBoundaryFigure";

export function Ts50701Scope({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="scope" className="mt-16 border-t border-border pt-10">
      <SectionHead id="scope" heading={SCOPE.h2} lead={SCOPE.lead} locale={locale} />

      <figure className="mt-8">
        <SystemBoundaryFigure locale={locale} />
        <figcaption className="prose-measure mt-4 text-sm leading-relaxed text-muted-foreground">
          {pick(SCOPE.figureCaption, locale)}
        </figcaption>
      </figure>

      <PairTable
        caption={SCOPE.boundariesLabel}
        headKey={SCOPE.headScopeClass}
        headValue={SCOPE.headScopeExample}
        rows={SCOPE_BOUNDARIES}
        locale={locale}
      />

      <PairTable
        caption={SCOPE.outputsLabel}
        headKey={SCOPE.headEvidenceElement}
        headValue={SCOPE.headEvidenceProvided}
        rows={SCOPE_OUTPUTS}
        locale={locale}
      />
    </section>
  );
}
