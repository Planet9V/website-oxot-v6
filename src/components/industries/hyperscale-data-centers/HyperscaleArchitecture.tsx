import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { ARCHITECTURE } from "./content";
import { StatusDot } from "./StatusDot";

/**
 * The seven-layer physical/operational stack rendered as a vertical
 * "rack" of readout rows (mono layer index, status dot, name, body) —
 * a dashboard-log treatment, distinct from energy-utilities' bordered
 * vertical riser. The eight technology domains sit beside it as a dense
 * definition list, and protocols as a badge row underneath.
 */
export function HyperscaleArchitecture({ locale }: { locale: Locale }) {
  const t = ARCHITECTURE;
  return (
    <section aria-labelledby="architecture" className="mt-16 border-t border-border pt-10">
      <h2 id="architecture" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mono-label mb-4 text-muted-foreground">{pick(t.stackLabel, locale)}</p>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {t.stack.map((l, i) => (
              <div key={i} className="grid grid-cols-[2.75rem_1fr] gap-3 p-4">
                <div className="flex items-start gap-1.5 pt-0.5">
                  <StatusDot className="mt-1" />
                  <span className="font-mono text-xs font-semibold tabular-nums text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="h-card text-base">{pick(l.name, locale)}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(l.body, locale)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mono-label text-muted-foreground">{pick(t.domainsLabel, locale)}</p>
          <dl className="mt-4 divide-y divide-border border-t border-border">
            {t.domains.map((d, i) => (
              <div key={i} className="py-3.5">
                <dt className="text-sm font-semibold text-foreground">{pick(d.name, locale)}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(d.body, locale)}</dd>
              </div>
            ))}
          </dl>

          <p className="mono-label mt-8 text-muted-foreground">{pick(t.protocolsLabel, locale)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {t.protocols.map((p) => (
              <Badge key={p} variant="outline" className="font-mono text-[0.6875rem]">{p}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
