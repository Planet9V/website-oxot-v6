import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { DECISIONS } from "./content";

export function EnergyDecisions({ locale }: { locale: Locale }) {
  const t = DECISIONS;
  return (
    <section aria-labelledby="decisions" className="mt-16 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="decisions" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={`${localePath(locale, PATHS.cdt2)}#decide`}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          How the four decisions work <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      <ol className="relative mt-10 grid list-none gap-8 p-0 border-t border-primary/40 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((d, i) => (
          <li key={i} className="relative">
            <span className="absolute -top-[2.6rem] left-0 size-[9px] rounded-full bg-primary" aria-hidden="true" />
            <span className="font-display text-2xl font-bold text-primary-ink">0{i + 1}</span>
            <h3 className="mt-2 h-card">{pick(d.name, locale)}</h3>
            <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">&ldquo;{pick(d.question, locale)}&rdquo;</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
