import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { DECISIONS } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/** Two large columns, not energy-utilities' four-across riser
 *  (EnergyDecisions.tsx) — fewer, bigger elements, each with more room to
 *  read as a real question a leader has to answer. */
export function DefenseDecisions({ locale }: { locale: Locale }) {
  const t = DECISIONS;
  return (
    <section aria-labelledby="decisions">
      <DefenseSectionHead id="decisions" kicker="Decisions" heading={pick(t.h2, locale)} />

      <p className="mt-6">
        <Link
          href={`${localePath(locale, PATHS.cdt2)}#decide`}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          How the four decisions work <span aria-hidden="true">&#8594;</span>
        </Link>
      </p>

      <ol className="mt-10 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2">
        {t.items.map((d, i) => (
          <li key={i} className="border-t-2 border-primary pt-6">
            <span className="font-display text-3xl font-bold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 h-card">{pick(d.name, locale)}</h3>
            <p className="prose-measure mt-3 body-copy italic leading-relaxed text-muted-foreground">
              &ldquo;{pick(d.question, locale)}&rdquo;
            </p>
            <p className="prose-measure mt-3 body-copy leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
