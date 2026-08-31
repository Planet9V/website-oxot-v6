import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { SECTOR_REALITY } from "./content";

/**
 * Shared, full-width — the fork hasn't happened yet. Replaces the old
 * 3-column data table (dimension / passenger / freight, each cell a full
 * paragraph — unreadable at table widths) with a stacked "VS" comparison:
 * one dimension label per row, its passenger and freight paragraphs
 * running side by side split by a center rule, not table cells. Reads
 * like a spec-sheet comparison, not a spreadsheet.
 */
export function RailSectorReality({ locale }: { locale: Locale }) {
  const t = SECTOR_REALITY;
  return (
    <section aria-labelledby="sector-reality" className="mt-16 border-t border-border pt-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div>
          <h2 id="sector-reality" className="h-sub">{pick(t.h2, locale)}</h2>
          <p className="mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.body, locale)}</p>
          <p className="mt-4 body-lead leading-relaxed text-foreground">{pick(t.bodyTwo, locale)}</p>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {t.outcomes.map((o, i) => (
              <li key={i}>{pick(o, locale)}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <Badge className="mono-label">Passenger rail / transit</Badge>
            <span className="mono-label text-muted-foreground">vs</span>
            <Badge variant="outline" className="mono-label">US freight rail</Badge>
          </div>
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {t.compareRows.map((r, i) => (
              <BlurFade key={i} inView direction="up" duration={0.4} delay={i * 0.04} className={i % 2 === 1 ? "block bg-muted/30" : "block"}>
                <div className="p-5 sm:p-6">
                  <p className="mono-label text-muted-foreground">{pick(r.dimension, locale)}</p>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-0">
                    <p className="text-sm leading-relaxed text-foreground sm:pr-6">{pick(r.passenger, locale)}</p>
                    <p className="text-sm leading-relaxed text-foreground sm:border-l sm:border-border sm:pl-6">{pick(r.freight, locale)}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
