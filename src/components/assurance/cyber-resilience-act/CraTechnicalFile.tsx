import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TECHNICAL_FILE, SUPPORT_PERIOD } from "./content-model";
import { Section, SectionHead, DataTable, TraceList, Note } from "./kit";

/**
 * 09 — TECHNICAL DOCUMENTATION, and 10 — SUPPORT PERIOD AND RETENTION.
 *
 * Section 09 ends in the page's central artefact: a requirements trace that
 * takes one sentence a technical file would actually contain and follows it
 * down through architecture, artefacts and lifecycle record. That is what
 * "requirements traces" in the assurance composition rule means, and it is
 * the reason this page uses a keyed spec list rather than prose here.
 *
 * Section 10 states Article 13(8) and 13(13) as a DEPENDENCY, not as two
 * sibling bullets — the support period sets the retention floor, and a page
 * that lists them side by side hides the one relationship a manufacturer has
 * to plan around. Both quotations come from docs/reference/CRA-DATES.md.
 */
export function CraTechnicalFile({ locale }: { locale: Locale }) {
  return (
    <>
      <Section id="technical-file">
        <SectionHead
          n="09"
          id="technical-file"
          title={pick(TECHNICAL_FILE.title, locale)}
          dek={pick(TECHNICAL_FILE.dek, locale)}
        />

        <DataTable
          head={TECHNICAL_FILE.tableHead.map((h) => pick(h, locale))}
          rows={TECHNICAL_FILE.rows.map((r) => r.map((c) => pick(c, locale)))}
        />

        <TraceList
          label={pick(TECHNICAL_FILE.traceLabel, locale)}
          rows={TECHNICAL_FILE.trace.map((t) => ({ k: pick(t.k, locale), v: pick(t.v, locale) }))}
        />

        <div className="mt-12">
          <h3 className="h-sub text-foreground">{pick(TECHNICAL_FILE.principlesHead, locale)}</h3>
          <dl className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {TECHNICAL_FILE.principles.map(([name, body]) => (
              <div key={name.en} className="border-b border-dashed border-border py-3.5">
                <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink">
                  {pick(name, locale)}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(body, locale)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="support-period">
        <SectionHead
          n="10"
          id="support-period"
          title={pick(SUPPORT_PERIOD.title, locale)}
          dek={pick(SUPPORT_PERIOD.dek, locale)}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SUPPORT_PERIOD.rows.map((r) => (
            <div key={r.k.en} className="rounded-lg border border-border bg-card p-6">
              <p className="mono-label text-primary-ink">{pick(r.k, locale)}</p>
              <h3 className="mt-3 font-display body-lead font-bold leading-snug text-foreground">
                {pick(r.title, locale)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(r.v, locale)}</p>
            </div>
          ))}
        </div>

        <Note label="The dependency">
          <p className="font-semibold">{pick(SUPPORT_PERIOD.consequence, locale)}</p>
          <p className="mt-3 text-muted-foreground">{pick(SUPPORT_PERIOD.modelPoint, locale)}</p>
        </Note>
      </Section>
    </>
  );
}
