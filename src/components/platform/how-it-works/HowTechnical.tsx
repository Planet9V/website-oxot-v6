import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TECHNICAL } from "./content-technical";
import { SectionOpener } from "./page-kit";

/**
 * THE TECHNICAL LAYER — eight modules, collapsed.
 *
 * OXOT_Composition_Rules.md asks the Platform pages for "technical
 * architecture as progressive disclosure", and platform.md says why: printed
 * open, this material is longer than the narrative it exists to support, and
 * buries it. So it is an accordion.
 *
 * `type="multiple"` rather than `"single"`. A chief architect checking three
 * specific claims should not have the previous one close behind them; a
 * disclosure that fights its reader is worse than a wall. Nothing is open by
 * default — the reader arrives here having just finished the argument, and
 * the section's job at that moment is to look answerable rather than to start
 * answering.
 *
 * EVERY TRIGGER CARRIES ITS OWN SUMMARY LINE, so the section is useful while
 * fully closed: a reader can tell which drawer holds their question without
 * opening any of them. Eight bare nouns would cost eight clicks to find one
 * paragraph.
 *
 * The only client component on this page — Radix's accordion is a `"use
 * client"` module, so importing it puts this subtree on the client. That is
 * the whole of the page's JavaScript, and it does exactly what it appears to
 * do: it opens and closes drawers.
 */
export function HowTechnical({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="technical" className="mt-24 border-t border-border pt-14">
      <SectionOpener
        id="technical"
        kicker={pick(TECHNICAL.kicker, locale)}
        title={pick(TECHNICAL.h2, locale)}
        intro={pick(TECHNICAL.intro, locale)}
      />

      <Accordion type="multiple" className="mt-10 border-t border-border">
        {TECHNICAL.modules.map((mod) => (
          <AccordionItem key={mod.id} value={mod.id} className="border-b border-border">
            <AccordionTrigger className="py-5 hover:no-underline">
              <span className="flex flex-col gap-1.5 pr-4 text-left">
                <span className="h-card text-foreground">{pick(mod.name, locale)}</span>
                <span className="text-sm font-normal leading-snug text-muted-foreground">
                  {pick(mod.summary, locale)}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent className="pb-7">
              <p className="prose-measure body-copy leading-relaxed text-foreground">{pick(mod.body, locale)}</p>
              {/* The house list: a hanging --primary marker, no bullet glyph. */}
              <ul className="mt-5 list-none space-y-2.5 p-0">
                {mod.detail.map((item, i) => (
                  <li key={i} className="grid grid-cols-[0.75rem_1fr] gap-3">
                    <span aria-hidden="true" className="mt-[0.5625rem] h-px w-3 bg-primary" />
                    <span className="body-copy leading-relaxed text-muted-foreground">{pick(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
