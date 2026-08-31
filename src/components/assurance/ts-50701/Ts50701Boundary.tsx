/**
 * Scope statement. The list of what OXOT does not do, then the two
 * statements the source briefs require verbatim — the calculation boundary
 * and the RAMS boundary. Both are rendered in the heavier `tone="fixed"`
 * callout precisely so that a future editor can see the wording is not
 * theirs to soften; see content.ts's header before changing a word of
 * either.
 *
 * This section sits immediately before the onward links, not buried in a
 * footer. A reader deciding whether TS 50701 evidence from a model is
 * usable in their assurance process needs the limits at decision time.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BOUNDARY } from "./content";
import { Callout, SectionHead } from "./kit";

export function Ts50701Boundary({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="boundary" className="mt-16 border-t border-border pt-10">
      <SectionHead id="boundary" heading={BOUNDARY.h2} lead={BOUNDARY.lead} locale={locale} />

      <ul className="mt-6 flex list-none flex-col p-0">
        {BOUNDARY.notList.map((n, i) => (
          <li
            key={i}
            className="border-b border-dashed border-border py-3 body-copy leading-relaxed text-foreground last:border-b-0"
          >
            {pick(n, locale)}
          </li>
        ))}
      </ul>

      <Callout tone="fixed" label="Calculation boundary">
        {pick(BOUNDARY.calculation, locale)}
      </Callout>

      <Callout tone="fixed" label="RAMS boundary">
        {pick(BOUNDARY.rams, locale)}
      </Callout>
    </section>
  );
}
