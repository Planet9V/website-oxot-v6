"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { ENGAGEMENT } from "./content";

/**
 * S09 · ENGAGEMENT APPROACH — header recipe H-A, `OXOT_Layout_Styles.md`
 * Pattern 6 (Zone Sequencer) built as the "Scope Rail" variant recorded in
 * `OXOT_Component_Inventory.md`.
 *
 * THIS SECTION'S COPY IS SOURCED DIFFERENTLY FROM THE REST OF THE PAGE, and
 * `content.ts`'s `ENGAGEMENT` docblock is the record of it: the Manufacturing
 * brief NAMES this section but carries no body copy for it, so the owner
 * approved reusing OXOT's standard cross-sector three-tier framework with every
 * use case and output rewritten from facts already cited elsewhere in this
 * page's own brief. That resolution lives in the data. Nothing here adds to it.
 *
 * THE THREE TIERS ARE CHOSEN BETWEEN, NOT WORKED THROUGH, and the control says
 * so. They are ordered by scope — one decision, then one line or facility, then
 * a plant that keeps changing — and the rail SELECTS: a plant engineer picks the
 * entry matching the decision actually in front of them and reads its use case
 * and its output as prose, rather than scanning six cells of a table for the two
 * that apply. Selecting an entry marks it CURRENT. It never marks it reached,
 * passed or finished.
 *
 * NO COMPLETION STATE IS CLAIMED ANYWHERE IN THE RENDERED OUTPUT. The words
 * "complete", "done" and "finished" and every check-mark glyph are barred from
 * it, and this docblock is the only place in the file they appear at all. A
 * progress mark here would be fabricated — nobody has walked these tiers — and
 * this page sits its engagement section between a regulatory reference matrix
 * and a final CTA, where a fabricated progress mark reads as compliance
 * evidence. The selected state is therefore drawn as POSITION: a brand hairline
 * on the rail edge facing the panel it opens, plus a marker outline. Never as
 * status.
 *
 * ONE AMBIENT DASHED FRAME WRAPS THE WHOLE SEQUENCE, never one per entry. The
 * pattern's original per-step "dashed perimeter seals on completion" mechanism
 * was struck by its own third review, because a security-literate buyer reads a
 * sealing perimeter as zone certification however it is labelled. This frame
 * never opens and never closes.
 *
 * NOT S05, THE FOUR-DECISIONS SWITCHBOARD, which is the other selectable
 * section on this page and also runs a vertical selector beside a panel. The two
 * are separated on every axis that carries meaning:
 *   · S05 is drawn in this page's P&ID grammar — 10px taps on a hairline, the
 *     engaged tap filled and ringed. This section is drawn in Pattern 6's own
 *     grammar: numbered 01–03 markers beside the rail, no taps. The page's
 *     drawing idiom is S05's; borrowing it a second time four sections later
 *     would make two adjacent selectable sections read as one component with the
 *     words swapped, which is the sameness `OXOT_Composition_Rules.md` exists to
 *     prevent.
 *   · S05 keys on `--signal-amber` and `--signal-cyan`. NO `--signal-*` TOKEN
 *     APPEARS IN THIS FILE and none may be added: the six signal tokens mean
 *     model and decision state, an engagement tier is neither, and spending one
 *     on a selection highlight would repurpose it as decoration. This section
 *     holds to `--primary`, `--primary-ink` and `--border`.
 *   · S05's panel is a framed sheet carrying a two-stop readout and a
 *     per-decision link. This panel is unboxed prose inside the one dashed
 *     frame, with no CTA — the section's conversion is the final CTA immediately
 *     below it, and repeating one here would compete with it.
 *
 * THE `<ol>`, THE MARKERS AND THE SPOKEN POSITION ALL SURVIVE THE TAB SEMANTICS,
 * reconciled by nesting rather than by dropping either side. The rail IS the
 * `<ol>` — `TabsList` renders through it with `asChild` — and each entry is an
 * `<li>`. ARIA's `tablist` role supersedes the list role on that element, so the
 * ordinal the list would otherwise carry is stated in words: every entry keeps
 * an `sr-only` "Engagement n of 3" beside its visible marker. The wording is
 * deliberately not "Step n of 3" — a step belongs to a sequence someone walks
 * through, and these three are a menu.
 *
 * TWO CONTROLS, ONE PER VIEWPORT, both from this repository's OWN wrapped
 * primitives (`ui/tabs`, `ui/accordion`) rather than raw `radix-ui`. A vertical
 * rail needs horizontal room for the panel it opens; at 390px there is none, so
 * the narrow layout is a single-open accordion whose entries open in place. The
 * split is real, not cosmetic: two different controls with two different ARIA
 * patterns and two separate id namespaces, one hidden by CSS at a time.
 *
 * EVERY `aria-controls` AND `aria-labelledby` IS BUILT FROM THE CONTENT ID in
 * `content.ts`, never from array position — that file's own comment at the
 * `items` declaration states the requirement. Radix's generated ids are
 * overridden for the same reason: reordering the three tiers by scope must not
 * be able to repoint a panel at the wrong engagement.
 *
 * SIBLING BALANCE: `data-balance-group="engagement-scope-rail"` marks the rail
 * `<ol>` and the open panel's content wrapper. They are GENUINE measured
 * siblings — the list is `h-fit`, so the flex row does NOT make them equal by
 * construction, which is the case the harness warns about. NO MEASURED RATIO IS
 * TRANSCRIBED HERE: `scripts/measure.mjs` has not been run against this section,
 * and quoting a number nobody measured would be worse than quoting none. Only
 * the desktop rail is marked; below `lg` the accordion is the only control
 * rendered and the two are not siblings.
 *
 * GAP, FLAGGED NOT FILLED: `content.ts` records that neither brief gives a
 * duration, price, team shape or prerequisite for any tier. None is invented
 * here, and no empty slot is drawn for one either — an unbuilt INTERACTION gets
 * a visible placeholder; absent FACTS get silence.
 */

/* Section chrome, not copy: `content.ts` carries no datum label for this section
   and is read-only here, so the route's short name is stated locally. It names
   the section, which is a real fact about the page. */
const DATUM_LABEL = same("Engagement approach");

const railTabId = (id: string) => `engagement-rail-${id}`;
const railPanelId = (id: string) => `engagement-scope-${id}`;
const drawerTabId = (id: string) => `engagement-drawer-${id}`;
const drawerPanelId = (id: string) => `engagement-drawer-scope-${id}`;

const pad = (n: number) => String(n).padStart(2, "0");

type EngagementItem = (typeof ENGAGEMENT.items)[number];

/** The 01–03 marker. Position, not status: it counts entries, never progress. */
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
 * `nameClass` differs by control because the two are not the same kind of thing.
 * A tab label is a CONTROL label and takes the body face; Radix wraps every
 * accordion trigger in a heading element, so below `lg` this really is a heading
 * and takes the house card-title class rather than an improvised size.
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
      <span className="sr-only">{`Engagement ${index + 1} of ${ENGAGEMENT.items.length}. `}</span>
      <span className={cn("block whitespace-normal text-foreground", nameClass)}>{pick(item.name, locale)}</span>
    </span>
  );
}

/**
 * The panel's narrative. Both source cells run as prose behind a run-in mono
 * label rather than as two aligned columns of a definition grid — a plant reads
 * "what this is for, and what comes back" as one thought.
 *
 * NO `prose-measure` on either paragraph: the panel already sits beside the rail
 * at roughly three-fifths of the section's width from the flex split alone, so a
 * 68ch cap on top of that would double-narrow it.
 */
function ScopeNarrative({ item, locale }: { item: EngagementItem; locale: Locale }) {
  return (
    <>
      <p data-balance-item className="mt-5 body-lead leading-relaxed text-foreground">
        <span className="mono-label text-primary-ink">{pick(ENGAGEMENT.useCaseLabel, locale)}</span>
        {" — "}
        {pick(item.useCase, locale)}
      </p>
      <p data-balance-item className="mt-4 body-lead leading-relaxed text-muted-foreground">
        <span className="mono-label text-primary-ink">{pick(ENGAGEMENT.outputLabel, locale)}</span>
        {" — "}
        {pick(item.output, locale)}
      </p>
    </>
  );
}

export function Engagement({ locale, className }: { locale: Locale; className?: string }) {
  const items = ENGAGEMENT.items;
  /* Controlled only so the trigger's `aria-controls` can be dropped while a
     drawer is shut: Radix unmounts a closed panel, and a reference pointing at
     an element that is not in the DOM is worse than no reference at all. */
  const [openDrawer, setOpenDrawer] = useState<string>(items[0].id);

  return (
    <SectionA
      id="engagement-approach"
      index="09"
      datumLabel={DATUM_LABEL}
      heading={ENGAGEMENT.h2}
      locale={locale}
      className={className}
    >
      <div className="rounded-2xl border border-dashed border-border p-5 sm:p-8">
        {/* ── The rail, lg and up ───────────────────────────────────────── */}
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
                    <EntryLabel
                      item={item}
                      index={i}
                      locale={locale}
                      nameClass="body-lead font-semibold leading-snug"
                    />
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

        {/* ── The same three entries below lg, opening in place ──────────── */}
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
                  <AccordionContent
                    id={drawerPanelId(item.id)}
                    aria-labelledby={drawerTabId(item.id)}
                    className="pl-11"
                  >
                    <ScopeNarrative item={item} locale={locale} />
                  </AccordionContent>
                </li>
              </AccordionItem>
            ))}
          </ol>
        </Accordion>
      </div>
    </SectionA>
  );
}
