"use client";

import { Fragment } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TECHNOLOGY_INDEX } from "./content";
import { TECHNOLOGY } from "./content.technology";

/**
 * S04 · THE TECHNOLOGY INDEX. Eight areas, seventy-seven terms, as a TABBED
 * definition list.
 *
 * FIXED 2026-08-25, TWO REAL DEFECTS FOUND IN A CROSS-PAGE AUDIT, NEITHER
 * FLAGGED BY THIS FILE'S OWN ORIGINAL REVIEW.
 *
 * (1) THE SECTION CONTAINER used `mx-auto w-full max-w-5xl px-6` (1024px)
 * instead of `.oxot-canvas` (the real site canvas, `--canvas-max: 80rem` =
 * 1280px). `globals.css`'s own comment on `.oxot-canvas` is explicit: "Never
 * introduce a new `mx-auto max-w-*` page wrapper." This section, plus
 * Architecture/Capabilities/Regulatory — 4 of this page's 12 sections — all
 * independently reinvented the same wrong pattern, built by different agents
 * in the same batch. That is the real signal: the DOCS did not make the
 * correct pattern unmistakable enough, twice, on two separately-built pages
 * (`-2` had the identical mistake in a different component). Fixed here to
 * `.oxot-canvas`, matching the other 8 sections on this page.
 *
 * (2) EIGHT STACKED `<dl>`s, all rendered at once, put ~77 rows on the page as
 * one continuously scrolling block. `OXOT_Composition_Rules.md`'s 2026-08-25
 * floor rule ("long enumerated lists get a tabbed layout") exists for exactly
 * this shape — 8 categories, 77 terms, no single category short enough that
 * flattening the section back out would help. Rebuilt as real Radix `Tabs`,
 * one category visible at a time — same `<dt>`/`<dd>` content and narrow-term-
 * rail treatment as before, just not all-stacked. Real `tablist`/`tab`/
 * `tabpanel` roles, roving tabindex, arrow-key navigation, all free from the
 * primitive.
 *
 * NOT CHIPS, WHICH IS WHAT THIS REPLACES ELSEWHERE. A chip reading "DNP3"
 * carries exactly the information already in the word "DNP3"; seventy-seven of
 * them are seventy-seven labels a reader must already know to get anything
 * from, and the reason the page prints the list at all — that the Twin does
 * something with each — goes unsaid.
 *
 * NOT A FILTERED COMMAND PALETTE AND NOT `data-table.tsx` EITHER. Seventy-seven
 * short pairs read fine in eight labelled groups; a search box over them adds a
 * thing to operate before anything can be read, and a sortable table would
 * promise sorting nobody needs on a two-column list with no numbers in it.
 *
 * NOT CARDS. Eight equal cards would break the Visual Rules' one-focal-element
 * cap and would flatten a real fact: the areas are deliberately unequal in
 * size because their term counts are unequal. The count is printed in the tab
 * label, so a reader does not have to judge it from the height of a block.
 */
export function TechnologyIndex({ locale }: { locale: Locale }) {
  const first = TECHNOLOGY.areas[0];
  const firstValue = first ? pick(first.area, locale) : undefined;

  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="technology-index">
      <p className="mono-label">04 · {pick(TECHNOLOGY_INDEX.datum, locale)}</p>
      <h2 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
        {pick(TECHNOLOGY_INDEX.h2, locale)}
      </h2>
      {/* No `prose-measure` (removed 2026-08-25, systemic audit): this page
          has no genuine narrower-column context to justify a reading-width
          cap on a standalone lead. */}
      <p className="mt-4 text-pretty body-copy leading-relaxed text-muted-foreground">
        {pick(TECHNOLOGY.lead, locale)}
      </p>

      {/* Bordered panel, matching DecisionSwitchboard's panel (S06) —
          added 2026-08-25 (owner request), and the border color EXPLICITLY
          matches that panel's `border-signal-amber/60` per a direct, repeated
          owner instruction ("use the SAME color"), overriding this file's own
          earlier reasoning that amber should stay reserved for §6's
          proposed/selected DECISION state. Documenting the override rather
          than silently dropping the original reasoning: this is a deliberate
          content decision (owner wants the same edge treatment site-wide on
          bordered tables), not evidence the earlier semantic-color rule was
          wrong in general. */}
      <div className="mt-8 rounded-2xl border border-signal-amber/60 bg-card p-5 sm:p-7">
        <Tabs defaultValue={firstValue} className="items-stretch gap-0">
          <TabsList
            variant="line"
            className="h-auto w-full flex-wrap justify-start gap-x-6 gap-y-2 border-b border-border pb-3"
          >
            {TECHNOLOGY.areas.map((area) => {
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
                    <span className="sr-only"> {locale === "nl" ? "termen" : "terms"}</span>)
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {TECHNOLOGY.areas.map((area) => {
            const label = pick(area.area, locale);
            return (
              <TabsContent key={label} value={label} className="pt-6">
                {/* `min-w-0` on the grid child: without it the track sizes to
                    the longest unbreakable term and pushes the page sideways
                    at 390px. */}
                <dl className="grid min-w-0 gap-x-6 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
                  {area.terms.map((t) => (
                    <Fragment key={`${label}-${t.term}`}>
                      <dt className="border-t border-dashed border-border pt-2.5 body-copy font-semibold leading-snug text-foreground">
                        {t.term}
                      </dt>
                      {/* `ml-0` kills the user-agent's 40px indent. The rule is
                          the row separator at `lg` only, where the term and
                          its clause share it — stacked, a rule between a term
                          and its own definition would read as a break between
                          two rows. */}
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
      </div>
    </section>
  );
}
