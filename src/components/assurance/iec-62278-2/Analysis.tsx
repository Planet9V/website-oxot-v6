import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { HAZARD, OBJECTIVES, TRACE, clause } from "./content";
import { Cascade, DataTable, Pull, SectionHead, StageChain, TraceLadder } from "./page-kit";

/**
 * Clauses 04–06: hazard and risk analysis, safety objectives, and the
 * requirements trace. The document's analytical middle, and the reason the
 * page exists — clause 06 is the requirements trace the composition rules
 * ask an assurance page for, run once, end to end, with a real requirement
 * in it rather than a diagram of one.
 */
export function Analysis({ locale }: { locale: Locale }) {
  const c04 = clause("hazard");
  const c05 = clause("objectives");
  const c06 = clause("trace");

  return (
    <>
      <section aria-labelledby={c04.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c04.id} n={c04.n} clause={pick(c04.title, locale)} heading={pick(HAZARD.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(HAZARD.body, locale)}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-12">
          <StageChain items={HAZARD.chain.map((s) => pick(s, locale))} label="The safety method" />
          <div>
            <h3 className="h-micro">{pick(HAZARD.initiatorsHead, locale)}</h3>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {HAZARD.initiators.map((item) => (
                <li
                  key={item.en}
                  className="rounded-md border border-border bg-muted px-3 py-1.5 text-[0.8125rem] leading-normal text-foreground"
                >
                  {pick(item, locale)}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[52ch] body-copy leading-relaxed text-muted-foreground">
              Every one of these enters the analysis the same way. A cyber compromise is the last item on the list, not a
              parallel list of its own.
            </p>
          </div>
        </div>

        <h3 className="h-micro mt-12">{pick(HAZARD.cyberHead, locale)}</h3>
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-12">
          <Cascade items={HAZARD.cascade.map((s) => ({ stage: pick(s.stage, locale), detail: pick(s.detail, locale) }))} />
          {/* `min-w-0`: this grid item wraps a table, and a grid item's default
              `min-width: auto` let the table's min-width size the whole track —
              which below lg (one column) stretched the cascade beside it to
              34rem and scrolled the page body sideways at 390px. */}
          <div className="min-w-0">
            <h3 className="h-micro">{pick(HAZARD.evidenceHead, locale)}</h3>
            <div className="mt-4">
              <DataTable
                head={[pick(HAZARD.evidenceCols.element, locale), pick(HAZARD.evidenceCols.support, locale)]}
                rows={HAZARD.evidence.map((e) => [pick(e.element, locale), pick(e.support, locale)])}
                minWidth="34rem"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby={c05.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c05.id} n={c05.n} clause={pick(c05.title, locale)} heading={pick(OBJECTIVES.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(OBJECTIVES.body, locale)}</p>
        <div className="mt-8">
          <DataTable
            head={[pick(OBJECTIVES.cols.env, locale), pick(OBJECTIVES.cols.objective, locale)]}
            rows={OBJECTIVES.rows.map((r) => [pick(r.env, locale), pick(r.objective, locale)])}
            minWidth="40rem"
          />
        </div>

        <h3 className="h-micro mt-12">{pick(OBJECTIVES.assumptionHead, locale)}</h3>
        <p className="prose-measure mt-3 body-copy leading-relaxed text-muted-foreground">
          {pick(OBJECTIVES.assumptionIntro, locale)}
        </p>
        <div className="mt-6 grid gap-6 rounded-2xl border border-border bg-muted p-6 sm:p-7 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-10">
          <div>
            <p className="mono-label text-muted-foreground">Safety objective</p>
            <p className="mt-2 font-display body-lead font-bold leading-snug text-foreground">
              {pick(OBJECTIVES.objective, locale)}
            </p>
          </div>
          <div>
            <p className="mono-label text-muted-foreground">Rests on these security assumptions</p>
            <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
              {OBJECTIVES.assumptions.map((a) => (
                <li key={a.en} className="grid grid-cols-[0.5rem_1fr] items-baseline gap-3">
                  <span aria-hidden="true" className="block size-2 rounded-full border border-primary" />
                  <span className="body-copy leading-relaxed text-foreground">{pick(a, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-9">
          <Pull>{pick(OBJECTIVES.question, locale)}</Pull>
        </div>
      </section>

      <section aria-labelledby={c06.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c06.id} n={c06.n} clause={pick(c06.title, locale)} heading={pick(TRACE.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(TRACE.body, locale)}</p>

        <h3 className="h-micro mt-10">{pick(TRACE.ladderHead, locale)}</h3>
        <div className="mt-6">
          <TraceLadder rungs={TRACE.ladder.map((r) => ({ stage: pick(r.stage, locale), worked: pick(r.worked, locale) }))} />
        </div>

        <h3 className="h-micro mt-14">{pick(TRACE.allocHead, locale)}</h3>
        <p className="prose-measure mt-3 body-copy leading-relaxed text-muted-foreground">{pick(TRACE.allocIntro, locale)}</p>
        <div className="mt-6">
          <DataTable
            head={[pick(TRACE.allocCols.type, locale), pick(TRACE.allocCols.allocation, locale)]}
            rows={TRACE.alloc.map((a) => [pick(a.type, locale), pick(a.allocation, locale)])}
            minWidth="42rem"
          />
        </div>
        <div className="mt-9">
          <Pull>{pick(TRACE.key, locale)}</Pull>
        </div>
      </section>
    </>
  );
}
