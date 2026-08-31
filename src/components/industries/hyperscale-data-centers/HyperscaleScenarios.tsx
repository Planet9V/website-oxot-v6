import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCENARIOS } from "./content";
import { StatusDot } from "./StatusDot";

/**
 * Twelve scenarios as a dense 4-column card wall — energy-utilities used
 * an Accordion for its (shorter) scenario list; this page deliberately
 * does not repeat that pattern. Every field (pathway, consequence,
 * decision) is always visible, terminal-log style, rather than
 * expand/collapse, so the density itself carries the control-room feel.
 */
export function HyperscaleScenarios({ locale }: { locale: Locale }) {
  const t = SCENARIOS;
  return (
    <section aria-labelledby="scenarios" className="mt-16 border-t border-border pt-10">
      <h2 id="scenarios" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((s, i) => (
          <li key={i} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-2">
              <span className="font-mono text-[0.6875rem] font-semibold tabular-nums text-muted-foreground">SC-{String(i + 1).padStart(2, "0")}</span>
              <StatusDot className="mt-1" />
            </div>
            <h3 className="text-[0.9rem] font-display font-bold leading-snug text-foreground">{pick(s.title, locale)}</h3>
            <dl className="flex flex-col gap-1.5 text-xs leading-relaxed">
              <div>
                <dt className="mono-label inline text-primary-ink">Pathway </dt>
                <dd className="inline text-muted-foreground">{pick(s.pathway, locale)}</dd>
              </div>
              <div>
                <dt className="mono-label inline text-primary-ink">Consequence </dt>
                <dd className="inline text-muted-foreground">{pick(s.consequence, locale)}</dd>
              </div>
              <div>
                <dt className="mono-label inline text-primary-ink">Decision </dt>
                <dd className="inline text-foreground">{pick(s.decision, locale)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
