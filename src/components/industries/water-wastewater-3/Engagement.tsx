"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ENGAGEMENT } from "./content";
import { ENGAGEMENT_ENTRIES, ENGAGEMENT_LABELS, type EngagementEntry } from "./content.engagement";

/**
 * S10 · PATTERN 6 (Zone Sequencer), built as the SCOPE RAIL variant registered
 * in OXOT_Component_Inventory.md on 2026-08-25.
 *
 * WHY THE SELECTING VARIANT AND NOT THE PLAIN SEQUENCE. The brief's four
 * engagements (industry_water.md L321-326) are ordered by scope but are read
 * ONE AT A TIME: a utility picks the entry whose scope matches the decision in
 * front of them. That is exactly the case the Scope Rail exists for — content
 * chosen between rather than stepped through — so the rail selects, and the
 * reader gets one entry's starting point and example output as prose instead of
 * scanning twelve cells of a three-column table for the two that apply.
 *
 * NO ENTRY EVER CLAIMS A COMPLETION, PROGRESS OR "FINISHED" STATE, and no tab
 * in this rail represents one either. Selecting an entry marks it CURRENT,
 * never worked through. Any check-mark glyph, and the words for a finished
 * state, are prohibited from this component's rendered output; this docblock is
 * the only place in the file they may appear at all. These are options, and a
 * fabricated completion mark on a page that sits next to safe-drinking-water
 * regulation is the worst possible kind of decoration.
 *
 * THE PATTERN'S OWN "STEP n OF 4" WORDING IS DELIBERATELY NOT USED. Pattern 6's
 * accessibility rule requires position to be spoken rather than left to visual
 * order, and that rule is honoured — but "step" is sequence language, and these
 * are not steps. Each entry announces "Entry point n of 4" instead. Same
 * guarantee to a screen reader, without asserting an order of operations the
 * brief does not describe.
 *
 * ONE AMBIENT DASHED FRAME WRAPPING THE WHOLE SEQUENCE, never one per entry.
 * Pattern 6's third review STRUCK the per-step "dashed perimeter seals on
 * completion" mechanism: a security-literate buyer reads a sealing perimeter as
 * compliance evidence regardless of its label. The frame here is the
 * family-recognition nod to Assurance's zone/conduit language and nothing else.
 * It never opens and never closes.
 *
 * THE `<ol>`, THE NUMBERED MARKERS AND THE SPOKEN POSITION SURVIVE THE TAB
 * SEMANTICS BY NESTING. The rail IS the `<ol>` — `TabsList` renders through it
 * with `asChild` — and each entry is an `<li>`. ARIA's `tablist` role supersedes
 * the list role on that element, so the ordinal the list would have carried is
 * stated in words: every entry keeps its `sr-only` position and its visible
 * 01-04 marker, and both are load-bearing rather than decorative for that exact
 * reason. Below `lg` there is no role conflict and the `<ol>`/`<li>` are genuine
 * list semantics.
 *
 * TWO CONTROLS, ONE PER VIEWPORT, both from this repository's OWN wrapped
 * primitives (`ui/tabs`, `ui/accordion`), never raw `radix-ui`. A vertical rail
 * needs horizontal room for the panel it opens; at 390px there is none, so the
 * narrow layout is a single-open accordion whose entries open in place. Both are
 * in the DOM at once with one hidden by CSS, which is why the two use different
 * id prefixes — duplicate ids across the pair would be a real defect.
 *
 * EVERY `aria-controls` AND `aria-labelledby` IS BUILT FROM THE CONTENT ID in
 * content.engagement.ts, never from array position, and Radix's own generated
 * ids are overridden for the same reason those ids exist: reordering the four
 * entries by scope must not be able to repoint a panel at the wrong entry.
 *
 * NOT THE FOUR DECISIONS SWITCHBOARD (S06). That section is a horizontal row of
 * key cards whose panel opens a quoted question; this is a vertical numbered
 * rail with no card boxes at all, whose panel is a narrative. Two adjacent
 * selectable sections that read alike is the sameness this page has a standing
 * rule against.
 *
 * SIBLING BALANCE: `data-balance-group="engagement-scope-rail"` marks the rail
 * `<ol>` and the open panel's content wrapper. They are GENUINE measured
 * siblings — the vertical `TabsList` is `h-fit`, so the flex row does NOT make
 * them equal by construction, which is the case the harness warns about. Only
 * the desktop rail is marked; below `lg` the accordion is `display: none` at
 * both measured viewports and the two are not siblings in any case.
 */

const railTabId = (id: string) => `ww3-engagement-rail-${id}`;
const railPanelId = (id: string) => `ww3-engagement-scope-${id}`;
const drawerTabId = (id: string) => `ww3-engagement-drawer-${id}`;
const drawerPanelId = (id: string) => `ww3-engagement-drawer-scope-${id}`;

const pad = (n: number) => String(n).padStart(2, "0");

/** The 01-04 marker. Position, not status: it counts entries, never progress. */
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
 * every accordion trigger in a heading, so below `lg` this really is a heading
 * and takes the house card-title class rather than an improvised size.
 */
function EntryLabel({
  entry,
  index,
  locale,
  nameClass
}: {
  entry: EngagementEntry;
  index: number;
  locale: Locale;
  nameClass: string;
}) {
  return (
    <span className="min-w-0 flex-1 text-left">
      <span className="sr-only">{`Entry point ${index + 1} of ${ENGAGEMENT_ENTRIES.length}. `}</span>
      <span className={cn("block whitespace-normal text-foreground", nameClass)}>
        {pick(entry.name, locale)}
      </span>
    </span>
  );
}

/**
 * The panel's narrative. Both source values run as prose behind a run-in label
 * rather than as columns of a definition grid — a utility reads "where to start
 * and what comes back" as one thought, not as two cells to align.
 */
function ScopeNarrative({ entry, locale }: { entry: EngagementEntry; locale: Locale }) {
  return (
    <>
      {/* No `prose-measure` on either paragraph below (removed 2026-08-25,
          systemic audit): measured empirically at 0.6x section width on this
          page's actual layout — unlike -2's Scope Rail, this panel isn't
          inside a genuinely narrower grid column. */}
      <p
        data-balance-item
        className="mt-5 body-lead leading-relaxed text-foreground"
      >
        <span className="mono-label text-primary-ink">{pick(ENGAGEMENT_LABELS.start, locale)}</span>
        {" — "}
        {pick(entry.start, locale)}
      </p>
      <p
        data-balance-item
        className="mt-4 body-lead leading-relaxed text-muted-foreground"
      >
        <span className="mono-label text-primary-ink">{pick(ENGAGEMENT_LABELS.output, locale)}</span>
        {" — "}
        {pick(entry.output, locale)}
      </p>
    </>
  );
}

export function Engagement({ locale }: { locale: Locale }) {
  const entries = ENGAGEMENT_ENTRIES;
  /* Controlled only so a trigger's `aria-controls` can be dropped while its
     drawer is shut: Radix unmounts a closed panel, and a reference pointing at
     an element that is not in the DOM is worse than no reference at all. */
  const [openDrawer, setOpenDrawer] = useState<string>(entries[0].id);

  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="engagement">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        10 · {pick(ENGAGEMENT.datum, locale)}
      </p>
      <h2 className="mt-4 h-section text-balance text-foreground">{pick(ENGAGEMENT.h2, locale)}</h2>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-5 sm:p-8">
        {/* ── The rail, lg and up ───────────────────────────────────────── */}
        <Tabs
          orientation="vertical"
          defaultValue={entries[0].id}
          className="hidden lg:flex lg:gap-10"
        >
          <TabsList
            asChild
            variant="line"
            aria-label={pick(ENGAGEMENT.h2, locale)}
            data-balance-group="engagement-scope-rail"
            className="w-full max-w-[19rem] shrink-0 items-stretch justify-start gap-2 border-l border-border p-0"
          >
            <ol>
              {entries.map((entry, i) => (
                <li key={entry.id} role="presentation" data-balance-item className="w-full">
                  <TabsTrigger
                    value={entry.id}
                    id={railTabId(entry.id)}
                    aria-controls={railPanelId(entry.id)}
                    className="group/rail h-auto w-full items-start gap-3 whitespace-normal rounded-none py-3 pl-4 pr-3 text-left after:bg-primary"
                  >
                    <Marker index={i} />
                    <EntryLabel
                      entry={entry}
                      index={i}
                      locale={locale}
                      nameClass="body-lead font-semibold leading-snug"
                    />
                  </TabsTrigger>
                </li>
              ))}
            </ol>
          </TabsList>

          {entries.map((entry, i) => (
            <TabsContent
              key={entry.id}
              value={entry.id}
              id={railPanelId(entry.id)}
              aria-labelledby={railTabId(entry.id)}
              className="min-w-0"
            >
              <div data-balance-group="engagement-scope-rail">
                <p data-balance-item className="mono-label text-primary-ink">
                  {pad(i + 1)} / {pad(entries.length)}
                </p>
                <h3 data-balance-item className="h-sub mt-3 text-balance text-foreground">
                  {pick(entry.name, locale)}
                </h3>
                <ScopeNarrative entry={entry} locale={locale} />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* ── The same four entries below lg, opening in place ───────────── */}
        <Accordion
          asChild
          type="single"
          collapsible
          value={openDrawer}
          onValueChange={setOpenDrawer}
          className="lg:hidden"
        >
          <ol>
            {entries.map((entry, i) => (
              <AccordionItem asChild key={entry.id} value={entry.id}>
                <li className="border-border">
                  <AccordionTrigger
                    id={drawerTabId(entry.id)}
                    aria-controls={openDrawer === entry.id ? drawerPanelId(entry.id) : undefined}
                    className="items-center gap-3 hover:no-underline"
                  >
                    <Marker index={i} />
                    <EntryLabel entry={entry} index={i} locale={locale} nameClass="h-card" />
                  </AccordionTrigger>
                  <AccordionContent
                    id={drawerPanelId(entry.id)}
                    aria-labelledby={drawerTabId(entry.id)}
                    className="pl-11"
                  >
                    <ScopeNarrative entry={entry} locale={locale} />
                  </AccordionContent>
                </li>
              </AccordionItem>
            ))}
          </ol>
        </Accordion>
      </div>
    </section>
  );
}
