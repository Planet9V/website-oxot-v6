"use client";

import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TECH_CAPTION, TECH_CATEGORIES } from "./content.architecture";

/**
 * S02, SECOND HALF · THE FIVE DATA-SOURCE CATEGORIES — source L134–L140.
 *
 * TABBED, ON THE STANDING RULE'S TERMS. `OXOT_Composition_Rules.md` sets the
 * threshold at roughly six categories and forty rows; this is five categories
 * and forty-two terms, which lands on the line rather than clearly past it, so
 * the call is made on the content: no category here is short (seven terms at
 * the smallest, ten at the largest), and showing all five at once reproduces
 * the exact failure that rule was written after — the water page's second pass,
 * which stacked every category into one continuously scrolling block and had to
 * be rebuilt. One category's terms visible at a time.
 *
 * A LIST, NOT A DEFINITION LIST — the one place this deliberately departs from
 * the water page's version. That page pairs every term with a clause on what
 * the Twin does with it, because a bare chip reading "DNP3" repeats the word
 * "DNP3". The same treatment here would have meant writing forty-two clauses
 * this brief does not contain: it states no per-term consequence anywhere, and
 * every capability it does state (L255–L260) is written at category level. So
 * the grounded unit is the category, and each panel opens with one sourced
 * sentence naming the capability that consumes it — then lists the source's own
 * terms, unglossed, because the source supplies nothing further and inventing
 * it would be a fabricated engineering claim dressed as a transcription.
 *
 * THE COUNT SITS INSIDE THE TAB LABEL, not floating beside it, so it is
 * announced as part of the label rather than skipped. Accessibility otherwise
 * comes from the Radix primitive already used across this site — roving
 * tabindex, arrow-key navigation, real tablist/tab/tabpanel roles and
 * `aria-selected` — none of it hand-rolled here.
 *
 * TAB VALUES ARE THE STABLE `id`, not the rendered label. The water page keys
 * its panels on `pick(area, locale)`, which makes the tab identity a function
 * of the active locale; keying on `id` keeps both locales rendering the same
 * tab structure once the translation pass replaces the `same()` placeholders.
 */
export function TechnologyIndex({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="tech-index-h" className="mt-16">
      {/* No `prose-measure` on the heading: it stands alone above the tabs with
          nothing beside it, so capping its measure would leave a narrow column
          with dead space to its right — the bug Rule.tsx's SectionA docblock
          documents for full-width section bodies. */}
      <h3 id="tech-index-h" className="h-sub text-balance">
        {pick(TECH_CAPTION, locale)}
      </h3>

      <Tabs defaultValue={TECH_CATEGORIES[0].id} className="mt-8 items-stretch gap-0">
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-x-6 gap-y-2 border-b border-border pb-3"
        >
          {TECH_CATEGORIES.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="h-micro flex-none px-0 py-1 text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {pick(category.name, locale)}{" "}
              <span className="font-normal text-muted-foreground">
                ({category.terms.length}
                <span className="sr-only"> terms</span>)
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {TECH_CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.id} className="pt-6">
            <p className="body-copy leading-relaxed text-muted-foreground">
              {pick(category.note, locale)}
            </p>
            {/* min-w-0 on every cell: without it the track sizes to the longest
                unbreakable term — "PLC ladder logic and structured text" — and
                pushes the page sideways at 390px. */}
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {category.terms.map((term) => (
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
    </section>
  );
}
