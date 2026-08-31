import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EVIDENCE_GAP, BOM_VIEWS } from "./content-model";
import { Section, SectionHead, DataTable, PullQuote, Note } from "./kit";

/**
 * 04 — WHERE THE EVIDENCE LIVES, and 05 — THE FIVE BOM VIEWS. Kept in one
 * file because they are one argument in two halves: the evidence is
 * scattered across ten owners, and the model's answer to that is five
 * projections of a single object rather than five more inventories.
 *
 * Both are tables. The source material is tabular, an assurance page is
 * allowed to be tabular, and rendering a ten-row ownership matrix as a card
 * grid would lose the column that carries the point.
 */
export function CraEvidence({ locale }: { locale: Locale }) {
  return (
    <>
      <Section id="evidence-gap">
        <SectionHead
          n="04"
          id="evidence-gap"
          title={pick(EVIDENCE_GAP.title, locale)}
          dek={pick(EVIDENCE_GAP.dek, locale)}
        />

        <DataTable
          head={EVIDENCE_GAP.tableHead.map((h) => pick(h, locale))}
          rows={EVIDENCE_GAP.rows.map((r) => r.map((c) => pick(c, locale)))}
        />

        <div className="mt-10">
          <h3 className="mono-label text-primary-ink">{pick(EVIDENCE_GAP.questionsHead, locale)}</h3>
          <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-x-10 p-0 md:grid-cols-2">
            {EVIDENCE_GAP.questions.map((q) => (
              <li
                key={q.en}
                className="border-b border-dashed border-border py-2.5 text-sm leading-relaxed text-foreground"
              >
                {pick(q, locale)}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="bom-views">
        <SectionHead n="05" id="bom-views" title={pick(BOM_VIEWS.title, locale)} dek={pick(BOM_VIEWS.dek, locale)} />

        <DataTable
          head={BOM_VIEWS.tableHead.map((h) => pick(h, locale))}
          rows={BOM_VIEWS.rows.map((r) => r.map((c) => pick(c, locale)))}
        />

        <PullQuote body={pick(BOM_VIEWS.pullBody, locale)}>{pick(BOM_VIEWS.pullQuote, locale)}</PullQuote>

        <Note label="Exports">{pick(BOM_VIEWS.exports, locale)}</Note>
      </Section>
    </>
  );
}
