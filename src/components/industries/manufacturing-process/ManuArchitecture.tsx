import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { ARCHITECTURE } from "./content";
import { ManuCornerFrame } from "./ManuCornerFrame";

/**
 * The six-layer stack, rendered as a heavy vertical assembly line — bigger,
 * bordered, numbered station squares connected by a thick bar — carrying
 * name + body copy per station, unlike ManuStationLine (plain string
 * labels only). Mirrors how EnergyArchitecture hand-rolled its own riser
 * rather than reusing EnergyLine for richer content.
 */
export function ManuArchitecture({ locale }: { locale: Locale }) {
  const t = ARCHITECTURE;
  return (
    <section aria-labelledby="architecture" className="mt-16 border-t border-border pt-10">
      <h2 id="architecture" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative rounded-2xl border-2 border-border bg-muted/40 p-6 sm:p-8">
          <ManuCornerFrame />
          <p className="mono-label mb-9 text-muted-foreground">{pick(t.stationCaption, locale)}</p>
          <ol className="relative flex list-none flex-col gap-8 border-l-4 border-primary p-0 pl-9">
            {t.layers.map((l, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[2.85rem] top-0 flex size-9 items-center justify-center rounded-sm border-2 border-primary bg-background font-display text-sm font-bold text-primary-ink"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-card">{pick(l.name, locale)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(l.body, locale)}</p>
              </li>
            ))}
          </ol>
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
