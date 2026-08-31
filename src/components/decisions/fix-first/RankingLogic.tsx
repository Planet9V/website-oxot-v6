import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { RANKING } from "./content";

/**
 * The argument the board rests on, set as a two-column ledger: the same
 * five questions answered by a score-led triage and by this one. A table
 * is the honest form here — the content is genuinely paired comparisons,
 * and pairing them in prose would make the reader hold five contrasts in
 * their head at once.
 *
 * The comparison carries no colour coding. Marking one column green and
 * the other red would be the exact traffic-light reflex the content-to-
 * visual mapping table tells this page to avoid, one section before the
 * board makes the same point structurally. The only accent is the rule
 * separating the two columns.
 */
export function RankingLogic({ locale }: { locale: Locale }) {
  const t = RANKING;
  return (
    <section aria-labelledby="ranking" className="mt-20 border-t border-border pt-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
        <h2 id="ranking" className="h-section">
          {pick(t.h2, locale)}
        </h2>
        <div className="flex flex-col gap-5">
          {t.paragraphs.map((p, i) => (
            <p key={i} className="prose-measure text-base leading-relaxed text-foreground">
              {pick(p, locale)}
            </p>
          ))}
        </div>
      </div>

      <BlurFade inView direction="up" duration={0.45}>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th scope="col" className="mono-label w-[10rem] px-5 py-4 font-medium">
                  <span className="sr-only">Dimension</span>
                </th>
                <th scope="col" className="mono-label px-5 py-4 font-bold">
                  {pick(t.compare.scoreHeading, locale)}
                </th>
                <th scope="col" className="mono-label border-l border-primary/30 px-5 py-4 font-bold text-primary-ink">
                  {pick(t.compare.modelHeading, locale)}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-5 py-4 align-top text-sm font-semibold text-foreground">
                    {pick(row.dimension, locale)}
                  </th>
                  <td className="px-5 py-4 align-top text-sm leading-relaxed text-muted-foreground">
                    {pick(row.score, locale)}
                  </td>
                  <td className="border-l border-primary/30 px-5 py-4 align-top text-sm leading-relaxed text-foreground">
                    {pick(row.model, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BlurFade>
    </section>
  );
}
