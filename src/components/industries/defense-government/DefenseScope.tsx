import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCOPE } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/**
 * The scope boundary is load-bearing, not decorative copy — content.ts's
 * own doc comment flags it. OXOT models supporting cyber-physical
 * infrastructure and operational dependencies; it explicitly does not
 * model weapons systems, classified battle-management systems, or
 * intelligence operations. Given the top billing, not buried in a table
 * cell: a wide, high-contrast statement on its own line.
 */
export function DefenseScope({ locale }: { locale: Locale }) {
  const t = SCOPE;
  return (
    <section aria-labelledby="scope">
      <DefenseSectionHead id="scope" kicker="Scope" heading={pick(t.h2, locale)} />

      <p className="prose-measure mt-10 border-l-4 border-primary pl-6 text-xl font-medium leading-snug text-foreground sm:text-2xl">
        {pick(t.boundary, locale)}
      </p>

      <div className="mt-14 divide-y divide-border border-y border-border">
        {t.environments.map((e, i) => (
          <div key={i} className="grid gap-2 py-7 sm:grid-cols-[16rem_1fr] sm:gap-8">
            <h3 className="h-card">{pick(e.name, locale)}</h3>
            <p className="body-copy leading-relaxed text-muted-foreground">{pick(e.body, locale)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
