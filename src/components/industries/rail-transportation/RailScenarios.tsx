import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCENARIOS } from "./content";
import { RailScenarioSwitcher } from "./RailScenarioSwitcher";

export function RailScenarios({ locale }: { locale: Locale }) {
  const t = SCENARIOS;
  const toItem = (s: (typeof SCENARIOS)["passenger"]["items"][number]) => ({
    title: pick(s.title, locale),
    pathway: pick(s.pathway, locale),
    impact: pick(s.impact, locale),
    decision: pick(s.decision, locale)
  });

  return (
    <section aria-labelledby="scenarios" className="mt-16 border-t border-border pt-10">
      <h2 id="scenarios" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <RailScenarioSwitcher
        passengerLabel={pick(t.passenger.label, locale)}
        freightLabel={pick(t.freight.label, locale)}
        passengerItems={t.passenger.items.map(toItem)}
        freightItems={t.freight.items.map(toItem)}
      />
    </section>
  );
}
