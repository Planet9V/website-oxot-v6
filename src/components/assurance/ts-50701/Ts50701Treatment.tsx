/**
 * Risk treatment. The four-stage loop runs horizontally here — baseline,
 * candidate, simulation, decision — with each stage's detail as a spec row
 * beneath, rather than a second vertical ladder immediately after the
 * safety chain. Same trace, different reading, so the two sections do not
 * look like one section rendered twice.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TREATMENT } from "./content";
import { TREATMENT_DECISIONS } from "./content-tables";
import { PairTable, SectionHead, SpecPanel, SpecRow } from "./kit";
import { TraceRail } from "./trace";

export function Ts50701Treatment({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="treatment" className="mt-16 border-t border-border pt-10">
      <SectionHead id="treatment" heading={TREATMENT.h2} lead={TREATMENT.lead} locale={locale} />

      <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <TraceRail stages={TREATMENT.flow.map((f) => f.stage)} label="Modelled before implemented" locale={locale} />
      </div>

      <div className="mt-4">
        <SpecPanel label="What each stage holds">
          {TREATMENT.flow.map((f, i) => (
            <SpecRow key={i} k={pick(f.stage, locale)}>
              {pick(f.detail, locale)}
            </SpecRow>
          ))}
        </SpecPanel>
      </div>

      <PairTable
        caption={TREATMENT.tableLabel}
        headKey={TREATMENT.headDecision}
        headValue={TREATMENT.headEvaluate}
        rows={TREATMENT_DECISIONS}
        locale={locale}
      />
    </section>
  );
}
