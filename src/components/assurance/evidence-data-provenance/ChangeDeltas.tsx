import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EvidenceChain } from "./EvidenceChain";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { CHANGE } from "./content";
import { CHANGE_ROWS } from "./content-tables";

/**
 * Change is the fourth chain on this page, and it deliberately uses the
 * same drawing as the first three: a change is not a separate mechanism,
 * it is the evidence model running again from a new starting point. The
 * three reasons an output changes sit under it as three numbered panels —
 * the one place a small grid is right, because they are alternatives
 * rather than steps.
 */
export function ChangeDeltas({ locale }: { locale: Locale }) {
  const t = CHANGE;
  return (
    <section aria-labelledby="change-deltas" className="mt-16 border-t border-border pt-10">
      <h2 id="change-deltas" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
        <div>
          <p className="body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>
          <EvidenceChain
            className="mt-6"
            label="A change is an evidence event"
            rungs={t.pipeline.map((p) => ({ title: pick(p, locale) }))}
          />
        </div>

        <div>
          <h3 className="h-micro">{pick(t.triggersHead, locale)}</h3>
          <ProseTable
            caption="Common change triggers and the evidence each one puts back in question"
            head={["Change", "Evidence that may need review"]}
            minWidth="min-w-[34rem]"
          >
            {CHANGE_ROWS.map((row) => (
              <ProseRow key={row.change.en}>
                <ProseRowHead>{pick(row.change, locale)}</ProseRowHead>
                <ProseCell>{pick(row.evidence, locale)}</ProseCell>
              </ProseRow>
            ))}
          </ProseTable>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="h-micro">{pick(t.reasonsHead, locale)}</h3>
        <ol className="mt-5 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
          {t.reasons.map((r, i) => (
            <li key={r.title.en} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <span className="mono-label block tabular-nums text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-3 block font-display body-lead font-bold leading-snug text-foreground">
                {pick(r.title, locale)}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{pick(r.body, locale)}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="prose-measure mt-8 text-sm leading-relaxed text-muted-foreground">{pick(t.footnote, locale)}</p>
    </section>
  );
}
