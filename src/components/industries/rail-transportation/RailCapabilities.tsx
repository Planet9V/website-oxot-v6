import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { CAPABILITIES } from "./content";

/**
 * Replaces the old 3-column table (capability / passenger value / freight
 * value, each cell a full sentence) with an asymmetric capability grid —
 * the lead capability spans two columns as a featured tile, the rest run
 * one-up, each card holding its own compact passenger/freight split
 * rather than a table row.
 */
export function RailCapabilities({ locale }: { locale: Locale }) {
  const t = CAPABILITIES;
  return (
    <section aria-labelledby="capabilities" className="mt-16 border-t border-border pt-10">
      <h2 id="capabilities" className="h-sub">{pick(t.h2, locale)}</h2>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((c, i) => (
          <BlurFade key={i} inView direction="up" duration={0.4} delay={i * 0.06} className={i === 0 ? "block sm:col-span-2" : "block"}>
            <Card className="relative h-full overflow-hidden">
              {i === 0 && <BorderBeam size={140} duration={9} colorFrom="hsl(var(--primary))" colorTo="hsl(var(--primary) / 0)" />}
              <CardContent>
                <CardTitle className="text-sm">{pick(c.name, locale)}</CardTitle>
                <div className={i === 0 ? "mt-3 grid gap-4 sm:grid-cols-2" : "mt-3 flex flex-col gap-3"}>
                  <div>
                    <p className="mono-label text-primary-ink">Passenger</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(c.passenger, locale)}</p>
                  </div>
                  <div>
                    <p className="mono-label text-foreground">Freight</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(c.freight, locale)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
