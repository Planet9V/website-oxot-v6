import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EvidenceChain } from "./EvidenceChain";
import { MODEL } from "./content";

/**
 * The page's centrepiece: the seven-stage chain drawn once forwards and
 * once backwards. The source insists on both directions — "Each
 * conclusion should be navigable in reverse" — and a chain that only runs
 * one way would illustrate a pipeline, not provenance. The reverse ladder
 * sticks to the viewport on wide screens so it stays beside whichever
 * forward stage the reader is on.
 */
export function EvidenceModel({ locale }: { locale: Locale }) {
  const t = MODEL;
  return (
    <section aria-labelledby="evidence-model" className="mt-16 border-t border-border pt-10">
      <h2 id="evidence-model" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14">
        <EvidenceChain
          numbered
          label="Forward — source record to accountable decision"
          rungs={t.stages.map((s) => ({ title: pick(s.title, locale), terms: s.terms }))}
        />

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-muted p-5 sm:p-6">
            <h3 className="h-micro">{pick(t.reverseHead, locale)}</h3>
            <EvidenceChain
              className="mt-5"
              direction="up"
              rungs={t.reverse.map((r) => ({ title: pick(r, locale) }))}
            />
          </div>
        </aside>
      </div>

      <p className="prose-measure mt-10 text-sm leading-relaxed text-muted-foreground">{pick(t.glassBox, locale)}</p>
    </section>
  );
}
