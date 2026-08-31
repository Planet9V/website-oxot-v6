/**
 * Security-engineering outputs, then provenance. Two sections in one file
 * because they are one argument in two halves: what the model produces,
 * and why any of it can be trusted. Splitting them across files would put
 * the claim and its warrant in different places.
 *
 * The provenance trace uses spec rows rather than another drawn chain —
 * a single claim drilled to its accountability record reads as a record,
 * which is the point.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { OUTPUTS, PROVENANCE } from "./content";
import { OUTPUT_ROWS, PROVENANCE_PRINCIPLES } from "./content-tables";
import { PairTable, SectionHead, SpecPanel, SpecRow } from "./kit";

export function Ts50701Evidence({ locale }: { locale: Locale }) {
  return (
    <>
      <section aria-labelledby="outputs" className="mt-16 border-t border-border pt-10">
        <SectionHead id="outputs" heading={OUTPUTS.h2} lead={OUTPUTS.lead} locale={locale} />
        <PairTable headKey={OUTPUTS.headOutput} headValue={OUTPUTS.headUse} rows={OUTPUT_ROWS} locale={locale} />
      </section>

      <section aria-labelledby="provenance" className="mt-16 border-t border-border pt-10">
        <SectionHead id="provenance" heading={PROVENANCE.h2} lead={PROVENANCE.lead} locale={locale} />

        <div className="mt-8">
          <SpecPanel label="One claim, drilled">
            {PROVENANCE.trace.map((t, i) => (
              <SpecRow key={i} k={pick(t.k, locale)}>
                {pick(t.v, locale)}
              </SpecRow>
            ))}
          </SpecPanel>
        </div>

        <PairTable
          caption={PROVENANCE.principlesLabel}
          headKey={PROVENANCE.headPrinciple}
          headValue={PROVENANCE.headMeaning}
          rows={PROVENANCE_PRINCIPLES}
          locale={locale}
        />
      </section>
    </>
  );
}
