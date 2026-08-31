import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CAPABILITIES } from "./content";

/**
 * Wide numbered spec-sheet rows — same underlying idea as
 * EnergyCapabilities.tsx, but the numeral is pushed to a much larger,
 * bolder scale (text-5xl vs energy's text-2xl) and sits inside a bordered
 * station square rather than floating bare, per the brief's "bigger/bolder
 * numerals, more industrial" direction.
 */
export function ManuCapabilities({ locale }: { locale: Locale }) {
  const t = CAPABILITIES;
  return (
    <section aria-labelledby="capabilities" className="mt-16 border-t border-border pt-10">
      <h2 id="capabilities" className="h-sub">{pick(t.h2, locale)}</h2>
      <div className="mt-8 divide-y-2 divide-border border-y-2 border-border">
        {t.items.map((c, i) => (
          <div key={i} className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr] sm:gap-6">
            <span className="flex size-14 items-center justify-center rounded-sm border-2 border-primary font-display text-3xl font-bold text-primary-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
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
