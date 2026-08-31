import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EVIDENCE, INTEGRITY, VERIFICATION, clause } from "./content";
import { DataTable, ELEV_1, SectionHead, StageChain } from "./page-kit";

/**
 * Clauses 07–09: safety-integrity context, verification and validation, and
 * the safety argument itself. The document's demonstration movement — where
 * the analysis has to survive contact with evidence.
 *
 * Clause 07 states plainly that the Twin does not assign SIL. That sentence
 * is load-bearing and is set as the section's closing note rather than
 * buried in the boundaries clause at the end, because the reader who needs
 * it is reading this section, not that one.
 */
export function Demonstration({ locale }: { locale: Locale }) {
  const c07 = clause("integrity");
  const c08 = clause("verification");
  const c09 = clause("evidence");

  return (
    <>
      <section aria-labelledby={c07.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c07.id} n={c07.n} clause={pick(c07.title, locale)} heading={pick(INTEGRITY.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(INTEGRITY.body, locale)}</p>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{pick(INTEGRITY.bodyTwo, locale)}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-12">
          <StageChain items={INTEGRITY.chain.map((s) => pick(s, locale))} label="What the Twin exposes" />
          <DataTable
            head={[pick(INTEGRITY.cols.fn, locale), pick(INTEGRITY.cols.assumptions, locale)]}
            rows={INTEGRITY.rows.map((r) => [pick(r.fn, locale), pick(r.assumptions, locale)])}
            minWidth="34rem"
          />
        </div>

        <p className="prose-measure mt-8 border-l-2 border-border pl-5 body-copy leading-relaxed text-foreground">
          {pick(INTEGRITY.caveat, locale)}
        </p>
      </section>

      <section aria-labelledby={c08.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c08.id} n={c08.n} clause={pick(c08.title, locale)} heading={pick(VERIFICATION.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(VERIFICATION.body, locale)}</p>
        <div className="mt-8">
          <DataTable
            head={[
              pick(VERIFICATION.cols.activity, locale),
              pick(VERIFICATION.cols.question, locale),
              pick(VERIFICATION.cols.support, locale)
            ]}
            rows={VERIFICATION.rows.map((r) => [pick(r.activity, locale), pick(r.question, locale), pick(r.support, locale)])}
            minWidth="52rem"
          />
        </div>

        <h3 className="h-micro mt-12">{pick(VERIFICATION.changeHead, locale)}</h3>
        <div className={`mt-4 rounded-2xl border border-border bg-card p-6 sm:p-7 ${ELEV_1}`}>
          <p className="mono-label text-muted-foreground">Proposed change</p>
          <p className="mt-2 max-w-[62ch] font-display body-lead font-bold leading-snug text-foreground">
            {pick(VERIFICATION.proposal, locale)}
          </p>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="mono-label text-primary-ink">{pick(VERIFICATION.verificationHead, locale)}</p>
              <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
                {VERIFICATION.verification.map((v) => (
                  <li key={v.en} className="grid grid-cols-[0.5rem_1fr] items-baseline gap-3">
                    <span aria-hidden="true" className="block size-2 rounded-full bg-primary" />
                    <span className="body-copy leading-relaxed text-foreground">{pick(v, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label text-primary-ink">{pick(VERIFICATION.validationHead, locale)}</p>
              <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
                {VERIFICATION.validation.map((v) => (
                  <li key={v.en} className="grid grid-cols-[0.5rem_1fr] items-baseline gap-3">
                    <span aria-hidden="true" className="block size-2 rounded-full border border-primary" />
                    <span className="body-copy leading-relaxed text-foreground">{pick(v, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="prose-measure mt-7 body-copy leading-relaxed text-muted-foreground">{pick(VERIFICATION.note, locale)}</p>
      </section>

      <section aria-labelledby={c09.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c09.id} n={c09.n} clause={pick(c09.title, locale)} heading={pick(EVIDENCE.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(EVIDENCE.body, locale)}</p>

        <div className="mt-8 rounded-2xl border border-border bg-muted p-6 sm:p-7">
          <dl className="m-0 space-y-6 p-0">
            <div>
              <dt className="mono-label text-primary-ink">{pick(EVIDENCE.claimHead, locale)}</dt>
              <dd className="m-0 mt-2 max-w-[62ch] font-display body-lead font-bold leading-snug text-foreground">
                {pick(EVIDENCE.claim, locale)}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-primary-ink">{pick(EVIDENCE.argumentHead, locale)}</dt>
              <dd className="m-0 mt-2 max-w-[68ch] body-copy leading-relaxed text-foreground">
                {pick(EVIDENCE.argument, locale)}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-primary-ink">{pick(EVIDENCE.evidenceHead, locale)}</dt>
              <dd className="m-0 mt-3">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {EVIDENCE.evidenceItems.map((item) => (
                    <li
                      key={item.en}
                      className="rounded-md border border-border bg-card px-3 py-1.5 text-[0.8125rem] leading-normal text-foreground"
                    >
                      {pick(item, locale)}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <h3 className="h-micro mt-12">{pick(EVIDENCE.outputsHead, locale)}</h3>
        <div className="mt-4">
          <DataTable
            head={[pick(EVIDENCE.outputCols.output, locale), pick(EVIDENCE.outputCols.use, locale)]}
            rows={EVIDENCE.outputs.map((o) => [pick(o.output, locale), pick(o.use, locale)])}
            minWidth="46rem"
          />
        </div>
      </section>
    </>
  );
}
