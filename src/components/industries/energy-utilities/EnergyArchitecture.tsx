import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { ARCHITECTURE } from "./content";
import { EnergyLine } from "./EnergyLine";

export function EnergyArchitecture({ locale }: { locale: Locale }) {
  const t = ARCHITECTURE;
  return (
    <section aria-labelledby="architecture" className="mt-16 border-t border-border pt-10">
      <h2 id="architecture" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <p className="mono-label mb-6 text-muted-foreground">Five segments, one line</p>
        <EnergyLine nodes={t.segments} locale={locale} />
        <p className="mt-6 text-sm text-muted-foreground">{pick(t.segmentNote, locale)}</p>
      </div>

      {/* The vertical "riser" — five layers, one connecting rule, read top
          (enterprise) to bottom (physical assets), continuing the line
          motif at 90 degrees instead of switching to a plain card grid. */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative border-l-2 border-primary/40 pl-6">
          {t.layers.map((l, i) => (
            <div key={i} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[1.72rem] top-1 size-[9px] rounded-full bg-primary" aria-hidden="true" />
              <h3 className="h-card">{pick(l.name, locale)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(l.body, locale)}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mono-label text-muted-foreground">Typical technology and data sources</h3>
          <dl className="mt-4 divide-y divide-border border-t border-border">
            {t.dataSources.map((d, i) => (
              <div key={i} className="py-4">
                <dt className="text-sm font-semibold text-foreground">{pick(d.domain, locale)}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(d.examples, locale)}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mono-label mt-8 text-muted-foreground">Protocols</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {t.protocols.map((p) => (
              <Badge key={p} variant="outline">{p}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
