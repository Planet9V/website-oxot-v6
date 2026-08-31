import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CAPABILITIES } from "./content";
import { StatusDot } from "./StatusDot";

/** Nine capabilities as a dense 3-column stat-card wall — distinct from
 *  energy-utilities' full-width numbered spec rows. */
export function HyperscaleCapabilities({ locale }: { locale: Locale }) {
  const t = CAPABILITIES;
  return (
    <section aria-labelledby="capabilities" className="mt-16 border-t border-border pt-10">
      <h2 id="capabilities" className="h-sub">{pick(t.h2, locale)}</h2>
      <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((c, i) => (
          <li key={i}>
            <Card className="h-full py-5">
              <CardContent className="px-5">
                <div className="flex items-center gap-2">
                  <StatusDot />
                  <span className="font-mono text-[0.6875rem] font-semibold tabular-nums text-muted-foreground">CAP-{String(i + 1).padStart(2, "0")}</span>
                </div>
                <CardTitle className="mt-2 text-base">{pick(c.name, locale)}</CardTitle>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pick(c.body, locale)}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
