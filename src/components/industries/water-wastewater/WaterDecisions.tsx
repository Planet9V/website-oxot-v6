import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { DECISIONS } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

export function WaterDecisions({ locale }: { locale: Locale }) {
  const t = DECISIONS;
  return (
    <section aria-labelledby="decisions" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="decisions" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={`${localePath(locale, PATHS.cdt2)}#decide`}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          How the four decisions work <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      {/* Vertical, not Energy's horizontal 4-column grid — decisions read as
          four more stations threaded on the same spine, in keeping with the
          editorial, one-column-at-a-time reading rhythm of this page. */}
      <ol className="mt-10 flex max-w-xl list-none flex-col gap-8 border-l-2 border-primary/30 p-0 pl-6">
        {t.items.map((d, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.72rem] top-1 size-[9px] rounded-full bg-primary" aria-hidden="true" />
            <span className="font-display text-2xl font-bold text-primary-ink">0{i + 1}</span>
            <h3 className="mt-2 h-card">{pick(d.name, locale)}</h3>
            <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">&ldquo;{pick(d.question, locale)}&rdquo;</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
          </li>
        ))}
      </ol>

      <p className="prose-measure mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">{pick(t.note, locale)}</p>
    </section>
  );
}
