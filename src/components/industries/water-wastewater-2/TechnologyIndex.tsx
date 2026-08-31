"use client";

import { Fragment } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ARCHITECTURE } from "./content.architecture";

/**
 * S02, SECOND HALF · THE EIGHT TECHNOLOGY AREAS, AS A TABBED DEFINITION LIST.
 *
 * WHAT CHANGED AND WHY (chips → stacked `<dl>`s → tabbed `<dl>`, this is the
 * third pass). This section used to render each area's terms as a wrapped row
 * of chips. The terms were right; the treatment was not — a chip reading
 * "DNP3" carries exactly the information already in the word "DNP3", so every
 * term was rewritten to carry a short clause on what the Twin does with it.
 *
 * FIXED 2026-08-25: the second pass stacked all 8 areas' `<dl>`s in one
 * column, rendering ~77 rows as one continuously scrolling block — a real
 * usability defect the site owner caught by scrolling through it, not
 * something any measured check would flag (`measure.mjs` checks overflow —
 * content wider than its container — never total page length). NEW STANDING
 * RULE, recorded in `OXOT_Component_Inventory.md`: a genuinely long
 * enumerated list (many categories, each with several rows) is a real,
 * positive reason to reach for a tabbed layout — one category's rows visible
 * at a time — not a generic aesthetic preference for tabs. This section is
 * the reference case: 8 categories, 77 terms, no single category short enough
 * that flattening it back out would help.
 *
 * THE SHAPE FOLLOWS THE CONTENT, STILL. Term plus definition is a `<dl>` —
 * `<dt>` term, `<dd>` clause — laid out as the glossary's entries are
 * (src/components/resources/glossary/GlossaryEntries.tsx): a narrow term rail
 * beside the prose at `lg`, now inside one `TabsContent` panel per category
 * instead of stacked under a repeated heading. Someone scanning for "MLSS"
 * picks the right category tab, then reads a column of terms rather than the
 * left edge of eleven sentences or the whole page's worth of them.
 *
 * NO TABLE HERE, THOUGH ONE WAS CONSIDERED. Common protocols was a candidate
 * for a real comparison table — protocol, what the Twin reads, what it lets the
 * Twin model. The third column is what killed it: filling nine cells with
 * distinct, specific consequences per protocol would have required nine claims
 * this page does not make anywhere. No capability in `CAPABILITIES.items` names
 * a protocol at all. Nine near-identical cells would have been a table shaped
 * like an argument it could not carry, so protocols stay a `<dl>` with the same
 * modest, ingestion-framed glosses as every other area. Revisit if and only if
 * a protocol-level capability claim is approved for this page.
 *
 * ACCESSIBILITY. Real Radix `Tabs` (already used elsewhere on this site) —
 * roving tabindex, arrow-key navigation, real `tablist`/`tab`/`tabpanel`
 * roles, `aria-selected` state, all free from the primitive rather than
 * hand-rolled. The term count still sits inside the tab label, not floating
 * beside it, so it is announced as part of the label.
 */
export function TechnologyIndex({ locale }: { locale: Locale }) {
  const first = ARCHITECTURE.tech[0];
  const firstValue = first ? pick(first.area, locale) : undefined;

  return (
    <section aria-labelledby="tech-index-h" className="mt-16">
      {/* No `max-w-xl`/`prose-measure` here (removed 2026-08-25, found by
          measure.mjs's automated narrow-text check): this heading and lead
          sit standalone above the tabs, full-width, with nothing else in the
          row — the same "narrow island, dead space beside it" bug as
          Rule.tsx's SectionA/SectionC recipes, missed here because this
          section's own earlier 2026-08-25 rebuild fixed the LIST layout but
          never audited its own header. */}
      <h3 id="tech-index-h" className="h-sub text-balance">
        {pick(ARCHITECTURE.techLabel, locale)}
      </h3>
      <p className="mt-4 body-copy leading-relaxed text-muted-foreground">
        {pick(ARCHITECTURE.techLead, locale)}
      </p>

      <Tabs defaultValue={firstValue} className="mt-8 items-stretch gap-0">
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-x-6 gap-y-2 border-b border-border pb-3"
        >
          {ARCHITECTURE.tech.map((area) => {
            const label = pick(area.area, locale);
            return (
              <TabsTrigger
                key={label}
                value={label}
                className="h-micro flex-none px-0 py-1 text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {label}{" "}
                <span className="font-normal text-muted-foreground">
                  ({area.terms.length}
                  <span className="sr-only"> terms</span>)
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {ARCHITECTURE.tech.map((area) => {
          const label = pick(area.area, locale);
          return (
            <TabsContent key={label} value={label} className="pt-6">
              {/* min-w-0 on the grid child: without it the track sizes to the
                  longest unbreakable term and pushes the page sideways at
                  390px. Same reason StaticTable's wrapper carries it. */}
              <dl className="grid min-w-0 gap-x-6 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
                {area.terms.map((t) => (
                  <Fragment key={t.term}>
                    <dt className="border-t border-dashed border-border pt-2.5 body-copy font-semibold leading-snug text-foreground">
                      {t.term}
                    </dt>
                    {/* ml-0 kills the UA's 40px indent. The rule is the row
                        separator at lg only, where dt and dd share it —
                        stacked, a rule between a term and its own definition
                        would read as a break between two rows. */}
                    <dd className="ml-0 mt-0.5 pb-2.5 body-copy leading-snug text-muted-foreground lg:mt-0 lg:border-t lg:border-dashed lg:border-border lg:pb-2.5 lg:pt-2.5">
                      {pick(t.gloss, locale)}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
