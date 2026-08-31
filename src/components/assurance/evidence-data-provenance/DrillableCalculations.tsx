import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EvidenceChain } from "./EvidenceChain";
import { DRILL } from "./content";

/**
 * The one place on this page where the reader can actually perform the
 * drill-down the rest of the page describes: each worked example is a
 * native <details>, so opening it genuinely reveals the trace from the
 * decision at the top to the source artifacts at the bottom. That is real
 * behaviour in plain HTML — no JavaScript, no client boundary, and no
 * copy claiming anything the markup does not do. The site has a history
 * of components advertising capability they never implemented; a
 * disclosure element that really discloses is the honest version of the
 * "drillable" promise at this stage.
 */
export function DrillableCalculations({ locale }: { locale: Locale }) {
  const t = DRILL;
  return (
    <section aria-labelledby="drillable" className="mt-16 border-t border-border pt-10">
      <h2 id="drillable" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-14">
        <div>
          <p className="body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>
          <EvidenceChain
            className="mt-6"
            label="Summary figure back to artifact"
            rungs={t.chain.map((c) => ({ title: pick(c, locale) }))}
          />
        </div>

        <div>
          <h3 className="h-micro">{pick(t.examplesHead, locale)}</h3>
          <p className="mono-label mt-2">{pick(t.examplesNote, locale)}</p>

          <div className="mt-5 flex flex-col gap-4">
            {t.examples.map((ex) => (
              <details key={ex.id} className="group rounded-2xl border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-start gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 12 12"
                    width="12"
                    height="12"
                    className="mt-1.5 shrink-0 text-primary transition-transform duration-150 ease-brand group-open:rotate-90"
                  >
                    <polygon points="3,1 10,6 3,11" fill="currentColor" />
                  </svg>
                  <span className="flex-1">
                    <span className="mono-label block">{pick(ex.label, locale)}</span>
                    <span className="mt-1.5 block font-display body-lead font-bold leading-snug text-foreground">
                      {pick(ex.summary, locale)}
                    </span>
                  </span>
                </summary>
                <div className="border-t border-border px-5 py-5">
                  <EvidenceChain
                    rungs={ex.steps.map((s) => ({
                      title: pick(s.label, locale),
                      body: pick(s.body, locale)
                    }))}
                  />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <p className="prose-measure mt-10 text-sm leading-relaxed text-muted-foreground">{pick(t.footnote, locale)}</p>
    </section>
  );
}
