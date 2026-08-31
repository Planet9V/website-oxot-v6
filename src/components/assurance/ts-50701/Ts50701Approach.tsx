/**
 * The OXOT approach, laid out as a ledger rather than a flow chart: the
 * railway evidence that goes in on the left, the TS 50701-oriented
 * evidence that comes out on the right, and what the Twin holds in between
 * spanning both columns beneath them. The page already carries three
 * traces; a fourth arrow diagram here would be repetition, not structure.
 */
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { APPROACH } from "./content";
import { Callout, SectionHead } from "./kit";

function EvidenceColumn({
  label,
  items,
  locale
}: {
  label: string;
  items: readonly Bilingual[];
  locale: Locale;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="mono-label text-primary-ink">{label}</p>
      <ul className="mt-4 flex list-none flex-col p-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="border-b border-dashed border-border py-2.5 text-sm leading-relaxed text-muted-foreground last:border-b-0 last:pb-0"
          >
            {pick(item, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Ts50701Approach({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="approach" className="mt-16 border-t border-border pt-10">
      <SectionHead id="approach" heading={APPROACH.h2} lead={APPROACH.lead} locale={locale} />

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <EvidenceColumn label={pick(APPROACH.inputsLabel, locale)} items={APPROACH.inputs} locale={locale} />
        <EvidenceColumn label={pick(APPROACH.outputsLabel, locale)} items={APPROACH.outputs} locale={locale} />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-muted p-6">
        <p className="mono-label text-muted-foreground">{pick(APPROACH.modelLabel, locale)}</p>
        <ul className="mt-3 flex list-none flex-col gap-1.5 p-0">
          {APPROACH.model.map((m, i) => (
            <li key={i} className="body-copy leading-relaxed text-foreground">
              {pick(m, locale)}
            </li>
          ))}
        </ul>
      </div>

      <Callout label="The OXOT principle">{pick(APPROACH.principle, locale)}</Callout>

      <p className="prose-measure mt-9 body-lead leading-relaxed text-foreground">
        {pick(APPROACH.distinctionsLead, locale)}
      </p>
      <ul className="mt-4 flex list-none flex-col p-0">
        {APPROACH.distinctions.map((d, i) => (
          <li
            key={i}
            className="border-l-2 border-border py-2 pl-5 body-copy leading-relaxed text-muted-foreground"
          >
            {pick(d, locale)}
          </li>
        ))}
      </ul>
    </section>
  );
}
