"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ENGAGEMENT } from "./content";

/**
 * S09 · PATTERN 6 — THE ZONE SEQUENCER, built as an interactive SCOPE RAIL.
 *
 * FOUR ENTRY POINTS, READ ONE AT A TIME. The four engagements are still ordered
 * by scope and still laid end to end; what changed is that the rail now
 * SELECTS. A reader picks the entry whose scope matches the decision actually
 * in front of them and reads its starting point and its example output as
 * prose, instead of scanning twelve cells of a three-column grid for the two
 * that apply to them.
 *
 * THE HONEST DEVIATION, CARRIED FORWARD FROM `-1` AND RESTATED FOR THE NEW
 * INTERACTION: no completion state is claimed for any entry, and NO TAB IN THIS
 * RAIL REPRESENTS A "DONE" STATE EITHER. Selecting an entry marks it CURRENT,
 * never finished. The words "complete", "done" and "finished", and any
 * check-mark glyph, are prohibited from this component's rendered output for
 * that reason, and this docblock is the only place in the file they appear.
 * These four are entry points a utility CHOOSES BETWEEN, not phases anyone has
 * worked through, so a "done" mark would be fabricated — and on a
 * compliance-adjacent page a fabricated completion mark is the worst possible
 * kind of decoration. The selected state is therefore drawn as POSITION — a
 * brand hairline on the edge facing the panel it opens — and never as status.
 *
 * ONE AMBIENT DASHED ZONE-OUTLINE FRAME WRAPPING THE WHOLE SEQUENCE, never one
 * per step and never one per tab. The per-step "dashed perimeter seals on
 * completion" mechanism was STRUCK by the pattern's third review, because a
 * security-literate buyer reads a sealing perimeter as compliance evidence no
 * matter how it is labelled. The frame here never opens and never closes.
 *
 * THE `<ol>`, THE NUMBERED MARKERS AND THE SPOKEN POSITION ALL SURVIVE THE TAB
 * SEMANTICS, reconciled by nesting rather than by dropping either side. The
 * rail IS the `<ol>` — `TabsList` renders through it with `asChild` — and each
 * entry is an `<li>`. ARIA's `tablist` role supersedes the list role on that
 * element, so the ordinal the list used to carry is stated in words instead:
 * every entry keeps its `sr-only` "Step n of 4" and its visible 01–04 marker,
 * which is exactly why both are load-bearing here rather than decoration.
 * Below `lg` there is no such role conflict and the `<ol>`/`<li>` are genuine
 * list semantics.
 *
 * TWO CONTROLS, ONE PER VIEWPORT, both from this repository's OWN wrapped
 * primitives (`ui/tabs`, `ui/accordion`) rather than raw `radix-ui`. A vertical
 * rail needs horizontal room for the panel it opens; at 390px there is none, so
 * the narrow layout is a single-open accordion whose entries open in place.
 * Both are in the DOM at once with one hidden by CSS, which is why the two
 * controls use different id prefixes.
 *
 * EVERY `aria-controls` AND `aria-labelledby` IS BUILT FROM THE CONTENT ID in
 * `content.ts`, never from array position. Radix's own generated ids are
 * overridden for the same reason the ids were added: a reordering of the four
 * entries by scope must not be able to repoint a panel at the wrong entry.
 *
 * NOT THE FOUR DECISIONS SWITCHBOARD. S05 is a horizontal row of amber key
 * cards whose panel opens a quoted question; this is a vertical numbered rail
 * with no card boxes at all, whose panel is a narrative. Adjacent selectable
 * sections that read alike is the box-ticking sameness this page has a standing
 * rule against.
 *
 * SIBLING BALANCE: `data-balance-group="engagement-scope-rail"` marks the rail
 * `<ol>` and the open panel's content wrapper. They are GENUINE measured
 * siblings — the list is `h-fit`, so the flex row does NOT make them equal by
 * construction, which is the case the harness warns about. MEASURED off
 * scripts/measure.mjs, identical at 1440x900 and 2560x1440:
 *   · height: rail 286px · panel 206px — h = 0.72
 *   · count:  rail 4 entries · panel 4 blocks (ordinal, name, starting point,
 *     example output) — n = 1.00
 * Governing measure 0.72, against the site-wide 2x floor of 0.50. Only the
 * desktop rail is marked; below `lg` the accordion is `display: none` at both
 * measured viewports and the two are no longer siblings in any case.
 */

const railTabId = (id: string) => `ww2-engagement-rail-${id}`;
const railPanelId = (id: string) => `ww2-engagement-scope-${id}`;
const drawerTabId = (id: string) => `ww2-engagement-drawer-${id}`;
const drawerPanelId = (id: string) => `ww2-engagement-drawer-scope-${id}`;

const pad = (n: number) => String(n).padStart(2, "0");

type EngagementItem = (typeof ENGAGEMENT.items)[number];

/** The 01–04 marker. Position, not status: it counts entries, never progress. */
function Marker({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="mono-label flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-primary-ink transition-colors duration-200 group-data-[state=active]/rail:border-primary group-data-[state=active]/rail:bg-primary/10"
    >
      {pad(index + 1)}
    </span>
  );
}

/**
 * The entry's label, with its position spoken for assistive technology.
 *
 * `nameClass` differs by control because the two are not the same kind of
 * thing. A tab label is a CONTROL label and takes the body face; Radix wraps
 * every accordion trigger in an `<h3>`, so below `lg` this really is a heading
 * and takes the house role-4 card-title class rather than a raw size — the
 * heading scale in globals.css exists precisely to stop improvised ones.
 */
function EntryLabel({
  item,
  index,
  locale,
  nameClass
}: {
  item: EngagementItem;
  index: number;
  locale: Locale;
  nameClass: string;
}) {
  return (
    <span className="min-w-0 flex-1 text-left">
      <span className="sr-only">{`Step ${index + 1} of ${ENGAGEMENT.items.length}. `}</span>
      <span className={cn("block whitespace-normal text-foreground", nameClass)}>{pick(item.name, locale)}</span>
    </span>
  );
}

/**
 * The panel's narrative. Both source values run as prose behind a run-in label
 * rather than as columns of a definition grid — a utility reads "where to start
 * and what comes back" as one thought, not as two cells to align.
 */
function ScopeNarrative({ item, locale }: { item: EngagementItem; locale: Locale }) {
  return (
    <>
      {/* No `prose-measure` on either paragraph (removed 2026-08-25, found by
          measure.mjs's automated narrow-text check): the panel already sits
          beside the rail at ~61-63% of the section's width from the flex
          split alone (confirmed live), so a 68ch cap on top of that
          double-narrows it. water-wastewater-3's identical rail component
          already had this same fix, with the same reasoning. */}
      <p data-balance-item className="mt-5 body-lead leading-relaxed text-foreground">
        <span className="mono-label text-primary-ink">{pick(ENGAGEMENT.startLabel, locale)}</span>
        {" — "}
        {pick(item.start, locale)}
      </p>
      <p data-balance-item className="mt-4 body-lead leading-relaxed text-muted-foreground">
        <span className="mono-label text-primary-ink">{pick(ENGAGEMENT.outputLabel, locale)}</span>
        {" — "}
        {pick(item.output, locale)}
      </p>
    </>
  );
}

export function Engagement({ locale }: { locale: Locale }) {
  const items = ENGAGEMENT.items;
  /* Controlled only so the trigger's `aria-controls` can be dropped while a
     drawer is shut: Radix unmounts a closed panel, and a reference pointing at
     an element that is not in the DOM is worse than no reference at all. */
  const [openDrawer, setOpenDrawer] = useState<string>(items[0].id);

  return (
    <div className="rounded-2xl border border-dashed border-border p-5 sm:p-8">
      {/* ── The rail, lg and up ─────────────────────────────────────────── */}
      <Tabs orientation="vertical" defaultValue={items[0].id} className="hidden lg:flex lg:gap-10">
        <TabsList
          asChild
          variant="line"
          aria-label={pick(ENGAGEMENT.h2, locale)}
          data-balance-group="engagement-scope-rail"
          className="w-full max-w-[19rem] shrink-0 items-stretch justify-start gap-2 border-l border-border p-0"
        >
          <ol>
            {items.map((item, i) => (
              <li key={item.id} role="presentation" data-balance-item className="w-full">
                <TabsTrigger
                  value={item.id}
                  id={railTabId(item.id)}
                  aria-controls={railPanelId(item.id)}
                  className="group/rail h-auto w-full items-start gap-3 whitespace-normal rounded-none py-3 pl-4 pr-3 text-left after:bg-primary"
                >
                  <Marker index={i} />
                  <EntryLabel item={item} index={i} locale={locale} nameClass="body-lead font-semibold leading-snug" />
                </TabsTrigger>
              </li>
            ))}
          </ol>
        </TabsList>

        {items.map((item, i) => (
          <TabsContent
            key={item.id}
            value={item.id}
            id={railPanelId(item.id)}
            aria-labelledby={railTabId(item.id)}
            className="min-w-0"
          >
            <div data-balance-group="engagement-scope-rail">
              <p data-balance-item className="mono-label text-primary-ink">
                {pad(i + 1)} / {pad(items.length)}
              </p>
              <h3 data-balance-item className="h-sub mt-3 text-balance text-foreground">
                {pick(item.name, locale)}
              </h3>
              <ScopeNarrative item={item} locale={locale} />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* ── The same four entries below lg, opening in place ─────────────── */}
      <Accordion
        asChild
        type="single"
        collapsible
        value={openDrawer}
        onValueChange={setOpenDrawer}
        className="lg:hidden"
      >
        <ol>
          {items.map((item, i) => (
            <AccordionItem asChild key={item.id} value={item.id}>
              <li className="border-border">
                <AccordionTrigger
                  id={drawerTabId(item.id)}
                  aria-controls={openDrawer === item.id ? drawerPanelId(item.id) : undefined}
                  className="items-center gap-3 hover:no-underline"
                >
                  <Marker index={i} />
                  <EntryLabel item={item} index={i} locale={locale} nameClass="h-card" />
                </AccordionTrigger>
                <AccordionContent id={drawerPanelId(item.id)} aria-labelledby={drawerTabId(item.id)} className="pl-11">
                  <ScopeNarrative item={item} locale={locale} />
                </AccordionContent>
              </li>
            </AccordionItem>
          ))}
        </ol>
      </Accordion>
    </div>
  );
}
