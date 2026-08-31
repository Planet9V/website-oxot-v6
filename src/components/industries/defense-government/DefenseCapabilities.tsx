import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CAPABILITIES } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/** Wide numbered spec rows — sharp-edged (no card), consistent with this
 *  page's own restraint rather than energy-utilities' rounded-2xl panels. */
export function DefenseCapabilities({ locale }: { locale: Locale }) {
  const t = CAPABILITIES;
  return (
    <section aria-labelledby="capabilities">
      <DefenseSectionHead id="capabilities" kicker="Capabilities" heading={pick(t.h2, locale)} />
      <div className="mt-10 divide-y divide-border border-y border-border">
        {t.items.map((c, i) => (
          <div key={i} className="grid gap-2 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
            <span className="font-display text-2xl font-bold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="h-card">{pick(c.name, locale)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(c.body, locale)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
