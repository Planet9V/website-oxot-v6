import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EvidenceChain } from "./EvidenceChain";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { CONFIDENCE } from "./content";
import { CONFIDENCE_ROWS } from "./content-tables";

/**
 * Two halves of one idea. The table ranks how much authority a source
 * carries; the ladder beside the questions shows what happens at the
 * bottom of that ranking, where the honest rendering of missing evidence
 * is an empty slot rather than a zero. The last rung of the ladder is
 * drawn dashed and marked "null" for exactly that reason — the "null over
 * zero" principle rendered rather than restated.
 */
export function SourceConfidence({ locale }: { locale: Locale }) {
  const t = CONFIDENCE;
  return (
    <section aria-labelledby="source-confidence" className="mt-16 border-t border-border pt-10">
      <h2 id="source-confidence" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <ProseTable
        caption="Evidence classes ordered by authority, with an example and the confidence each typically carries"
        head={["Evidence class", "Example", "Typical confidence"]}
        minWidth="min-w-[48rem]"
      >
        {CONFIDENCE_ROWS.map((row) => (
          <ProseRow key={row.cls.en}>
            <ProseRowHead>
              <span className="mono-label block tabular-nums text-primary-ink">
                {String(row.rank).padStart(2, "0")}
              </span>
              <span className="mt-1.5 block">{pick(row.cls, locale)}</span>
            </ProseRowHead>
            <ProseCell>{pick(row.example, locale)}</ProseCell>
            <ProseCell muted={false}>{pick(row.confidence, locale)}</ProseCell>
          </ProseRow>
        ))}
      </ProseTable>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
        <div>
          <h3 className="h-micro">{pick(t.gapHead, locale)}</h3>
          <EvidenceChain
            className="mt-5"
            rungs={t.gap.map((g, i) => ({
              title: pick(g, locale),
              empty: i === t.gap.length - 1
            }))}
          />
        </div>

        <div>
          <p className="body-lead leading-relaxed text-foreground">{pick(t.gapIntro, locale)}</p>
          <ul className="mt-5 flex list-none flex-col gap-0 rounded-2xl border border-border p-0">
            {t.gapQuestions.map((q) => (
              <li
                key={q.en}
                className="border-b border-dashed border-border px-4 py-3.5 text-sm leading-relaxed text-foreground last:border-b-0 sm:px-5"
              >
                {pick(q, locale)}
              </li>
            ))}
          </ul>
          <blockquote className="mt-8 border-l-2 border-primary py-1 pl-5 font-display body-lead font-bold leading-relaxed text-foreground">
            {pick(t.pullQuote, locale)}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
