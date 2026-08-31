"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SectionA } from "./Rule";
import { ScenarioTrace } from "./ScenarioTrace";
import { PASSENGER_SCENARIOS, PASSENGER_SCENARIOS_SECTION } from "./content.scenarios.passenger";

/**
 * S05 · PASSENGER-TRANSIT CYBER SCENARIOS — a master/detail register whose
 * detail is a DRAWING. Source L151–L161.
 *
 * A REGISTER, NOT A TABBED LIST, AND THE THRESHOLD IS WHY.
 * `OXOT_Composition_Rules.md`'s floor rule reaches for tabs where a section is
 * many categories each holding several rows — "roughly 6+ categories and 40+
 * total rows is the working threshold, judged on the actual content". THIS
 * SECTION IS 7 SCENARIOS × 4 FIELDS = 28 CELLS, comfortably below that floor,
 * and it is not the shape the rule is aimed at either: these are not categories
 * with rows underneath, they are seven records of four fields each, and only
 * one record's fields are ever visible at a time. Tabs would additionally
 * promise a separate panel per item when there is ONE shared detail pane that
 * every selection writes into — the same mis-fit `SegmentSelector.tsx` already
 * records for this page's two-way segment toggle.
 *
 * SO THE SEMANTIC IS `radiogroup` / `radio` WITH A ROVING TABINDEX, built
 * directly rather than bent out of Radix `Tabs` (separate panel per tab, wrong
 * promise) or `ToggleGroup` (independent on/off per item, also wrong: exactly
 * one scenario is in force at all times, never none and never two). Only the
 * checked radio is in the tab sequence; Arrow / Home / End move the selection
 * AND move DOM focus with it, so Tab crosses the whole register in one stop.
 *
 * THE DETAIL PANE IS A LABELLED REGION AND DELIBERATELY NOT A LIVE REGION.
 * `Architecture.tsx` puts `aria-live` on a one-line summary, which is right for
 * one line; announcing this pane on every arrow press would read a heading, a
 * pathway sentence, a whole topology and two captions each time the selection
 * moved by one. The selected radio's own label already announces the change,
 * and the region is reachable as a landmark for the reader who wants the rest.
 *
 * NOTHING IS CLAMPED IN THE LIST, so the `line-clamp` / `.block` specificity
 * collision that broke an earlier register on another page cannot occur here.
 * Each row carries its full scenario name and its entry point, both short by
 * construction; the pathway, impact and decision live in the pane, in full, for
 * the selected row. The list is ONE column at every breakpoint, so DOM order,
 * reading order and arrow order are the same order without needing a grid-flow
 * correction.
 *
 * MOBILE RULES (OXOT_Mobile_Rules.md), binding. DOM order IS the mobile
 * stacking order — register, then detail pane — with no order-swapping
 * utilities anywhere. `min-h-11` on every row control. Selection is carried by
 * a filled marker and a weight change as well as by colour, so it survives a
 * greyscale read, and nothing essential sits behind hover.
 *
 * SIBLING BALANCE, `data-balance-group="passenger-scenarios"`, site-wide 2x
 * floor (shorter ≥ 50% of taller): the mark is on the list's own wrapper here
 * and on the pane's own wrapper inside `ScenarioTrace.tsx` — the INNER CONTENT
 * WRAPPERS in both cases, never the stretched grid cells.
 *
 * TOKEN DISCIPLINE in this file: `--border`, `--primary`, `--primary-ink`,
 * `--card`, `--ring`. NO `--signal-*` token appears here. The one signal this
 * section spends is amber, and it is spent inside `ScenarioTrace.tsx` on the
 * operational-impact rule only. A selector is chrome; a scenario register is
 * not a model state.
 */

const BALANCE_GROUP = "passenger-scenarios";
const REGISTER_LABEL = "Passenger-transit cyber scenarios";
const DETAIL_LABEL = "Selected scenario, traced";

export function PassengerScenarios({ locale }: { locale: Locale }) {
  const [selectedId, setSelectedId] = useState(PASSENGER_SCENARIOS[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = PASSENGER_SCENARIOS.find((s) => s.id === selectedId) ?? PASSENGER_SCENARIOS[0];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % PASSENGER_SCENARIOS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + PASSENGER_SCENARIOS.length) % PASSENGER_SCENARIOS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PASSENGER_SCENARIOS.length - 1;
    else return;
    event.preventDefault();
    setSelectedId(PASSENGER_SCENARIOS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <SectionA
      id={PASSENGER_SCENARIOS_SECTION.id}
      index={PASSENGER_SCENARIOS_SECTION.index}
      datumLabel={PASSENGER_SCENARIOS_SECTION.datumLabel}
      heading={PASSENGER_SCENARIOS_SECTION.heading}
      locale={locale}
    >
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-balance-group={BALANCE_GROUP}>
            <div role="radiogroup" aria-label={REGISTER_LABEL} className="flex flex-col gap-2">
              {PASSENGER_SCENARIOS.map((scenario, i) => {
                const isSelected = scenario.id === selectedId;
                return (
                  <button
                    key={scenario.id}
                    data-balance-item
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedId(scenario.id)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className={cn(
                      "flex min-h-11 w-full items-start gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary/60 bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {/* Not colour alone: a filled bar on the selected row, a
                        hairline on the rest. Readable in greyscale. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1 h-4 w-0.5 shrink-0 rounded-full transition-colors duration-200",
                        isSelected ? "bg-primary" : "bg-border"
                      )}
                    />
                    <span className="min-w-0">
                      <span className={cn("block text-sm leading-snug", isSelected && "font-medium")}>
                        {pick(scenario.name, locale)}
                      </span>
                      <span className="mono-label mt-1 block text-muted-foreground">
                        {pick(scenario.entryPoint, locale)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div role="region" aria-label={DETAIL_LABEL} className="lg:sticky lg:top-24">
            <ScenarioTrace scenario={selected} balanceGroup={BALANCE_GROUP} locale={locale} />
          </div>
        </div>
      </div>
    </SectionA>
  );
}
