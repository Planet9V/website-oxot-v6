import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { ENGAGEMENT } from "./content";

/**
 * Replaces the old 4-column table with three tiered progression cards —
 * Sprint, then Build, then Continuous Operations reads as a maturity
 * ladder, not an arbitrary table order, so a connected horizontal
 * step sequence carries that meaning a table row can't.
 */
export function RailEngagement({ locale }: { locale: Locale }) {
  const t = ENGAGEMENT;
  return (
    <section aria-labelledby="engagement" className="mt-16 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="engagement" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={localePath(locale, PATHS.consulting)}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          The full engagement model <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      <div className="relative mt-10">
        <span className="absolute left-0 right-0 top-6 hidden h-px bg-primary/40 lg:block" aria-hidden="true" />
        <ol className="grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3">
          {t.items.map((e, i) => (
            <BlurFade key={i} inView direction="up" duration={0.4} delay={i * 0.1} className="block">
              <li className="relative h-full rounded-2xl border border-border bg-card p-6">
                <span className="relative z-10 -mt-9 mb-3 hidden size-3 rounded-full border-2 border-background bg-primary lg:block" aria-hidden="true" />
                <p className="mono-label text-primary-ink">Step 0{i + 1}</p>
                <h3 className="mt-1.5 h-card text-base">{pick(e.name, locale)}</h3>
                <div className="mt-4 flex flex-col gap-3 text-xs leading-relaxed">
                  <div>
                    <Badge className="mono-label">Passenger / transit</Badge>
                    <p className="mt-1.5 text-muted-foreground">{pick(e.passenger, locale)}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mono-label">Freight rail</Badge>
                    <p className="mt-1.5 text-muted-foreground">{pick(e.freight, locale)}</p>
                  </div>
                </div>
                <p className="mt-4 border-t border-border pt-3 text-sm leading-relaxed text-foreground">{pick(e.output, locale)}</p>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  );
}
