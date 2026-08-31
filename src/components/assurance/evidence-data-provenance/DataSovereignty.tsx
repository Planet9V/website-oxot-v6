import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { SOVEREIGNTY } from "./content";
import { DEPLOYMENT_ROWS } from "./content-tables";

/**
 * Provenance means the Twin holds the customer's most sensitive
 * engineering material, so the page owes the reader the deployment
 * answer rather than leaving it to a separate page. Two parts: what the
 * model may end up containing, then the handling position each
 * deployment option takes.
 */
export function DataSovereignty({ locale }: { locale: Locale }) {
  const t = SOVEREIGNTY;
  return (
    <section aria-labelledby="data-sovereignty" className="mt-16 border-t border-border pt-10">
      <h2 id="data-sovereignty" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>
          <ul className="mt-5 flex list-none flex-col gap-0 rounded-2xl border border-border p-0">
            {t.sensitive.map((s) => (
              <li
                key={s.en}
                className="border-b border-dashed border-border px-4 py-3 text-sm leading-relaxed text-foreground last:border-b-0 sm:px-5"
              >
                {pick(s, locale)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="body-lead leading-relaxed text-foreground">{pick(t.modesIntro, locale)}</p>
          <ProseTable
            caption="Deployment options and the evidence-handling position each takes"
            head={["Deployment", "Evidence handling position"]}
            minWidth="min-w-[28rem]"
          >
            {DEPLOYMENT_ROWS.map((row) => (
              <ProseRow key={row.mode.en}>
                <ProseRowHead>{pick(row.mode, locale)}</ProseRowHead>
                <ProseCell>{pick(row.position, locale)}</ProseCell>
              </ProseRow>
            ))}
          </ProseTable>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{pick(t.footnote, locale)}</p>
        </div>
      </div>
    </section>
  );
}
