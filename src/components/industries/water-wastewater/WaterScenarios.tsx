import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SCENARIOS } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

export function WaterScenarios({ locale }: { locale: Locale }) {
  const t = SCENARIOS;
  return (
    <section aria-labelledby="scenarios" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <h2 id="scenarios" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <Accordion type="single" collapsible className="mt-8 max-w-2xl rounded-2xl border border-border bg-card px-6">
        {t.items.map((s, i) => (
          <AccordionItem key={i} value={`scenario-${i}`}>
            <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:no-underline">
              {pick(s.title, locale)}
            </AccordionTrigger>
            <AccordionContent>
              <ol className="flex list-none flex-col gap-3 border-l-2 border-primary/30 p-0 pl-4 text-sm leading-relaxed">
                <li>
                  <span className="mono-label text-primary-ink">Pathway </span>
                  <span className="text-muted-foreground">{pick(s.pathway, locale)}</span>
                </li>
                <li>
                  <span className="mono-label text-primary-ink">Impact </span>
                  <span className="text-muted-foreground">{pick(s.impact, locale)}</span>
                </li>
                <li>
                  <span className="mono-label text-primary-ink">Decision the Twin supports </span>
                  <span className="text-foreground">{pick(s.decision, locale)}</span>
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="prose-measure mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{pick(t.citation, locale)}</p>
    </section>
  );
}
