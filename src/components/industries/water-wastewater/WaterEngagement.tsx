import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ENGAGEMENT } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

export function WaterEngagement({ locale }: { locale: Locale }) {
  const t = ENGAGEMENT;
  return (
    <section aria-labelledby="engagement" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <div className="flex flex-wrap items-baseline justify-between gap-4 max-w-xl">
        <h2 id="engagement" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={localePath(locale, PATHS.consulting)}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          The full engagement model <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
      <ul className="mt-8 grid max-w-3xl list-none gap-4 p-0 sm:grid-cols-2">
        {t.items.map((e, i) => (
          <li key={i}>
            <Card className="h-full">
              <CardContent>
                <span className="mono-label text-primary-ink">0{i + 1}</span>
                <CardTitle className="mt-1">{pick(e.name, locale)}</CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(e.useCase, locale)}</p>
                <p className="mt-3 text-sm font-medium text-foreground">{pick(e.output, locale)}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
