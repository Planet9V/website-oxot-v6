import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CAPABILITIES } from "./content";

/** Wide numbered spec-sheet rows — distinct from both the Card grid used for
 *  Operational reality and the vertical riser used for Architecture. */
export function EnergyCapabilities({ locale }: { locale: Locale }) {
  const t = CAPABILITIES;
  return (
    <section aria-labelledby="capabilities" className="mt-16 border-t border-border pt-10">
      <h2 id="capabilities" className="h-sub">{pick(t.h2, locale)}</h2>
      <div className="mt-8 divide-y divide-border border-y border-border">
        {t.items.map((c, i) => (
          <div key={i} className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
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
