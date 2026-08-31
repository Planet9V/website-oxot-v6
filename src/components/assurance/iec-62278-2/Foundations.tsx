import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CHALLENGE, POSITION, SYSTEM_DEF, clause } from "./content";
import { DataTable, Pull, SectionHead, StageChain } from "./page-kit";

/**
 * Clauses 01–03: what the problem is, where the standard sits among its
 * neighbours, and how the system under consideration gets defined. The
 * document's first movement — everything here is setup for the analysis in
 * `Analysis.tsx`.
 */
export function Foundations({ locale }: { locale: Locale }) {
  const c01 = clause("challenge");
  const c02 = clause("position");
  const c03 = clause("system-definition");

  return (
    <>
      <section aria-labelledby={c01.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c01.id} n={c01.n} clause={pick(c01.title, locale)} heading={pick(CHALLENGE.h2, locale)} />
        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="body-lead leading-relaxed text-muted-foreground">{pick(CHALLENGE.body, locale)}</p>
            <p className="mt-4 body-lead leading-relaxed text-muted-foreground">{pick(CHALLENGE.bodyTwo, locale)}</p>
          </div>
          <ul className="m-0 list-none space-y-3 p-0">
            {CHALLENGE.consequences.map((item) => (
              <li key={item.en} className="grid grid-cols-[0.5rem_1fr] items-baseline gap-3">
                <span aria-hidden="true" className="block size-2 rounded-full bg-primary" />
                <span className="body-copy leading-relaxed text-foreground">{pick(item, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-9">
          <Pull>{pick(CHALLENGE.pull, locale)}</Pull>
        </div>
      </section>

      <section aria-labelledby={c02.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c02.id} n={c02.n} clause={pick(c02.title, locale)} heading={pick(POSITION.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(POSITION.intro, locale)}</p>
        <div className="mt-8">
          <DataTable
            head={["Framework", "The question it answers"]}
            rows={POSITION.rows.map((r) => [pick(r.name, locale), pick(r.role, locale)])}
            minWidth="38rem"
          />
        </div>
        <p className="prose-measure mt-7 body-copy leading-relaxed text-muted-foreground">{pick(POSITION.note, locale)}</p>
      </section>

      <section aria-labelledby={c03.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c03.id} n={c03.n} clause={pick(c03.title, locale)} heading={pick(SYSTEM_DEF.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(SYSTEM_DEF.body, locale)}</p>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{pick(SYSTEM_DEF.bodyTwo, locale)}</p>

        <h3 className="h-micro mt-10">{pick(SYSTEM_DEF.scopeHead, locale)}</h3>
        <div className="mt-4">
          <DataTable
            head={[pick(SYSTEM_DEF.scopeCols.system, locale), pick(SYSTEM_DEF.scopeCols.context, locale)]}
            rows={SYSTEM_DEF.scopes.map((s) => [pick(s.system, locale), pick(s.context, locale)])}
            minWidth="46rem"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
          <div>
            <h3 className="h-micro">{pick(SYSTEM_DEF.modelHead, locale)}</h3>
            <div className="mt-4">
              <StageChain items={SYSTEM_DEF.model.map((m) => pick(m, locale))} />
            </div>
          </div>
          <div>
            <h3 className="h-micro">{pick(SYSTEM_DEF.directionsHead, locale)}</h3>
            <dl className="m-0 mt-4 space-y-5 p-0">
              {SYSTEM_DEF.directions.map((d) => (
                <div key={d.q.en} className="rounded-2xl border border-border bg-muted px-5 py-5">
                  <dt className="font-display body-lead font-bold leading-snug text-foreground">{pick(d.q, locale)}</dt>
                  <dd className="m-0 mt-2 body-copy leading-relaxed text-muted-foreground">{pick(d.a, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
