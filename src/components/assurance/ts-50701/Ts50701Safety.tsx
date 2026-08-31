/**
 * Safety-linked consequence. The centre of the page, and the one section
 * whose diagram carries its own vocabulary at every stage — this is the
 * chain the rest of the page keeps referring to, so it is drawn in full
 * rather than abbreviated.
 *
 * The disclaimer that a Twin is not a safety case is in the standfirst,
 * ahead of the diagram, not appended after it.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SAFETY } from "./content";
import { SAFETY_EVIDENCE } from "./content-tables";
import { Callout, PairTable, SectionHead } from "./kit";
import { TraceLadder } from "./trace";

export function Ts50701Safety({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="safety" className="mt-16 border-t border-border pt-10">
      <SectionHead id="safety" heading={SAFETY.h2} lead={SAFETY.lead} locale={locale} />

      <div className="mt-9 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <TraceLadder stages={SAFETY.chain} label={pick(SAFETY.chainLabel, locale)} locale={locale} />
      </div>

      <PairTable
        caption={SAFETY.evidenceLabel}
        headKey={SAFETY.headEvidenceType}
        headValue={SAFETY.headEvidenceContributes}
        rows={SAFETY_EVIDENCE}
        locale={locale}
      />

      <Callout>{pick(SAFETY.keyMessage, locale)}</Callout>
    </section>
  );
}
