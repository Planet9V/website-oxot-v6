"use client";

import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionA } from "./Rule";
import { EXAMPLES_CAPTION, INDEX_NOTE, TECH_DOMAINS, TECH_SECTION } from "./content.technology";

/**
 * S04 · KEY TECHNOLOGY DOMAINS — the H-A recipe over a tabbed index.
 *
 * TABBED, AND AT THIS VOLUME THAT IS THE ONLY HONEST TREATMENT. Eight domains
 * and seventy-nine terms flattened onto one page is the exact failure
 * `OXOT_Composition_Rules.md` sets its roughly-six-categories threshold after —
 * the water page's second pass stacked every category into one continuously
 * scrolling block and had to be rebuilt. This clears that threshold on both
 * axes, and no domain here is short enough to make a flat list defensible: nine
 * terms at the smallest, ten at every other. One domain's examples at a time.
 *
 * A LIST, NOT A DEFINITION LIST. The source pairs each term with nothing — a
 * table row here is a domain name and a comma-separated run of examples, with no
 * per-term gloss anywhere in the brief. A `<dl>` would commit this section to a
 * definition per term, and the seventy-nine definitions would have to be written
 * rather than transcribed. Where a sibling page does use a definition list for
 * its technology index, it is because its own brief supplies the second half of
 * each pair; this one does not, so the grounded unit is the domain and the terms
 * are listed unglossed. `content.technology.ts` records the same call from the
 * content side.
 *
 * ACCESSIBILITY COMES FROM THE PRIMITIVE, NOT FROM HAND-ROLLED ARIA. The Radix
 * tabs already used across this site supply real `tablist` / `tab` / `tabpanel`
 * roles, `aria-selected`, `aria-controls`, roving tabindex and arrow-key
 * traversal. The first domain is engaged on first paint via `defaultValue`, so
 * the section never renders an empty panel — matching every other selector on
 * this page, which all default to their first entry. The seven unengaged panels
 * stay reachable by keyboard and are announced as tabs, so no domain is stranded
 * behind a mechanism.
 *
 * THE COUNT SITS INSIDE THE TAB LABEL rather than floating beside it, so a
 * screen reader announces it as part of the label instead of skipping it. It is
 * a fact about this page's own transcription, not facility data.
 *
 * TAB VALUES ARE THE STABLE `id`, never the rendered label: keying on
 * `pick(name, locale)` would make tab identity a function of the active locale
 * and change the panel structure once the translation pass replaces the `same()`
 * placeholders.
 */
export function TechnologyIndex({ locale }: { locale: Locale }) {
  return (
    <SectionA
      id={TECH_SECTION.id}
      index={TECH_SECTION.index}
      datumLabel={TECH_SECTION.datumLabel}
      heading={TECH_SECTION.heading}
      locale={locale}
    >
      {/* Above the tablist rather than below the panel: it is an instruction
          about the control immediately beneath it, and it is what keeps the
          seven closed domains reading as available rather than withheld. */}
      <p className="body-copy leading-relaxed text-muted-foreground">{pick(INDEX_NOTE, locale)}</p>

      <Tabs defaultValue={TECH_DOMAINS[0].id} className="mt-8 items-stretch gap-0">
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-x-6 gap-y-2 border-b border-border pb-3"
        >
          {TECH_DOMAINS.map((domain) => (
            <TabsTrigger
              key={domain.id}
              value={domain.id}
              className="h-micro flex-none px-0 py-1 text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {pick(domain.name, locale)}{" "}
              <span className="font-normal text-muted-foreground">
                ({domain.terms.length}
                <span className="sr-only"> terms</span>)
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {TECH_DOMAINS.map((domain) => (
          <TabsContent key={domain.id} value={domain.id} className="pt-6">
            <p className="mono-label text-primary-ink">{pick(EXAMPLES_CAPTION, locale)}</p>
            {/* min-w-0 on every cell: without it the track sizes to the longest
                unbreakable term — "generator/UPS autonomy calculations" — and
                pushes the page sideways at 390px. */}
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {domain.terms.map((term) => (
                <li
                  key={term}
                  className="min-w-0 border-t border-dashed border-border py-2.5 body-copy leading-snug text-foreground"
                >
                  {term}
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </SectionA>
  );
}
