import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REALITY } from "./content";
import { StatusDot } from "./StatusDot";

/**
 * "What is redundant" vs "what is shared" as two dashboard-style readout
 * panels, then the 11 hyperscale-specific challenges as a dense 4-column
 * card wall — more columns than energy-utilities' 3-col Concerns grid,
 * per the control-room-dashboard brief for this page.
 */
export function HyperscaleReality({ locale }: { locale: Locale }) {
  const t = REALITY;
  return (
    <section aria-labelledby="reality" className="mt-16 border-t border-border pt-10">
      <h2 id="reality" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.body, locale)}</p>
      <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{pick(t.bodyTwo, locale)}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/40 p-5">
          <p className="mono-label mb-4 text-muted-foreground">{pick(t.redundantLabel, locale)}</p>
          <ul className="flex list-none flex-wrap gap-2 p-0">
            {t.redundant.map((r, i) => (
              <li key={i}>
                <Badge variant="outline" className="gap-1.5 border-primary/40 py-1 text-primary-ink">
                  <StatusDot />
                  {pick(r, locale)}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-muted/40 p-5">
          <p className="mono-label mb-4 text-muted-foreground">{pick(t.sharedLabel, locale)}</p>
          <ul className="flex list-none flex-wrap gap-2 p-0">
            {t.shared.map((s, i) => (
              <li key={i}>
                <Badge variant="outline" className="py-1 text-muted-foreground">{pick(s, locale)}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mono-label mb-4 mt-10 text-muted-foreground">{pick(t.challengesLabel, locale)}</p>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {t.challenges.map((c, i) => (
          <li key={i}>
            <Card className="h-full py-4">
              <CardContent className="px-4">
                <div className="flex items-start gap-2">
                  <StatusDot className="mt-1.5" />
                  <CardTitle className="text-[0.95rem]">{pick(c.term, locale)}</CardTitle>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pick(c.body, locale)}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
