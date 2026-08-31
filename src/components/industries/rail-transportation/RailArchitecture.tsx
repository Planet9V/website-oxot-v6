import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { ARCHITECTURE } from "./content";
import { RailTrackHeader } from "./RailTrackHeader";
import { RailArchitectureScroller } from "./RailArchitectureScroller";

/**
 * Each track's six OT layers as a real sticky-scroll reveal (see
 * RailArchitectureScroller) instead of a horizontal snap-scroll strip.
 * Passenger and freight run as two independent scrollers stacked
 * vertically rather than merged into one diagram — their layer names and
 * abstraction levels genuinely differ tier-by-tier (freight has no
 * equivalent to passenger's explicit "operations and security boundary"
 * layer, for instance), so forcing them into a shared row-by-row diagram
 * would imply a 1:1 correspondence the source content doesn't support.
 */
function Track({
  data,
  variant,
  locale
}: {
  data: (typeof ARCHITECTURE)["passenger"];
  variant: "passenger" | "freight";
  locale: Locale;
}) {
  const layers = data.layers.map((l) => ({ name: pick(l.name, locale), body: pick(l.body, locale) }));
  return (
    <div>
      <RailTrackHeader label={pick(data.label, locale)} variant={variant} />
      <RailArchitectureScroller layers={layers} />
    </div>
  );
}

export function RailArchitecture({ locale }: { locale: Locale }) {
  const t = ARCHITECTURE;
  const concerns = [
    ...t.passenger.concerns.map((c) => ({ ...c, variant: "passenger" as const })),
    ...t.freight.concerns.map((c) => ({ ...c, variant: "freight" as const }))
  ];

  return (
    <section aria-labelledby="architecture" className="mt-16 border-t border-border pt-10">
      <h2 id="architecture" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-10 flex flex-col gap-20">
        <Track data={t.passenger} variant="passenger" locale={locale} />
        <Track data={t.freight} variant="freight" locale={locale} />
      </div>

      <h3 className="mono-label mt-12 text-muted-foreground">Operational concerns, both tracks</h3>
      <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {concerns.map((c, i) => (
          <li key={i}>
            <BlurFade inView direction="up" duration={0.35} delay={(i % 6) * 0.05}>
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm">{pick(c.term, locale)}</CardTitle>
                    <Badge variant={c.variant === "passenger" ? "default" : "outline"} className="mono-label shrink-0 text-[9px]">
                      {c.variant === "passenger" ? "PAX" : "FRT"}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{pick(c.body, locale)}</p>
                </CardContent>
              </Card>
            </BlurFade>
          </li>
        ))}
      </ul>
    </section>
  );
}
