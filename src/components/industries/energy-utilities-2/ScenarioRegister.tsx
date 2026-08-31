"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { localePath, PATHS } from "@/components/shell/nav";
import { SectionA } from "./Rule";
import { ScenarioTrace } from "./ScenarioTrace";
import {
  CHAIN_LABEL,
  CHAIN_STAGES,
  SCENARIOS,
  SCENARIOS_CLOSING,
  SCENARIOS_SECTION
} from "./content.scenarios";

/**
 * S04 · ENERGY RISK SCENARIOS — a master/detail register whose detail is a
 * DRAWING. Source L131–L155.
 *
 * A REGISTER, NOT A TABBED LIST, AND THE THRESHOLD IS WHY.
 * `OXOT_Composition_Rules.md`'s floor rule reaches for tabs where a section is
 * many categories each holding several rows — "roughly 6+ categories and 40+
 * total rows is the working threshold, judged on the actual content". This
 * section is 8 scenarios × 4 columns = 32 cells, and they are not categories
 * with rows underneath: each scenario is ONE record with four fields, and only
 * one record's fields are ever visible at a time. Tabs would also promise a
 * separate panel per item when there is one shared detail pane that every
 * selection writes into — the same mis-fit `SegmentSelector.tsx` records for
 * S02. `TechnologyIndex.tsx` on `/industries/water-wastewater-2` (8 categories,
 * 77 terms) is what that rule is actually aimed at, and this is not that shape.
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
 * collision that broke the equivalent water-sector register cannot occur here —
 * checked for rather than assumed. Each row carries its full scenario name and
 * its entry point, both short by construction; the pathway, consequence and
 * decision live in the pane, in full, for the selected row. The list is ONE
 * column at every breakpoint, so DOM order, reading order and arrow order are
 * the same order without needing a grid-flow correction.
 *
 * MOBILE RULES (OXOT_Mobile_Rules.md), binding. DOM order IS the mobile
 * stacking order — chain legend, register, detail pane — with no order-swapping
 * utilities anywhere. `min-h-11` on every row control. Selection is carried by
 * a filled marker and a weight change as well as by colour, so it survives a
 * greyscale read, and nothing essential sits behind hover.
 *
 * SIBLING BALANCE, `data-balance-group="scenario-register"`, site-wide 2x floor
 * (shorter ≥ 50% of taller): the mark is on the list's own wrapper here and on
 * the pane's own wrapper in `ScenarioTrace.tsx` — the INNER CONTENT WRAPPERS in
 * both cases, never the stretched grid cells.
 *
 * TOKEN DISCIPLINE in this file: `--border`, `--primary`, `--primary-ink`,
 * `--card`, `--muted`, `--ring`. The one signal token this section spends is
 * amber, and it is spent inside `ScenarioTrace.tsx` on the consequence caption
 * only. A selector is chrome; a scenario register is not a model state.
 */

const REGISTER_LABEL = "Energy and utility cyber-risk scenarios";
const DETAIL_LABEL = "Selected scenario, traced";

export function ScenarioRegister({ locale }: { locale: Locale }) {
  const [selectedId, setSelectedId] = useState(SCENARIOS[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = SCENARIOS.find((s) => s.id === selectedId) ?? SCENARIOS[0];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % SCENARIOS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + SCENARIOS.length) % SCENARIOS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SCENARIOS.length - 1;
    else return;
    event.preventDefault();
    setSelectedId(SCENARIOS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <SectionA
      id={SCENARIOS_SECTION.id}
      index={SCENARIOS_SECTION.index}
      datumLabel={SCENARIOS_SECTION.datumLabel}
      heading={SCENARIOS_SECTION.heading}
      locale={locale}
    >
      {/* Source L139–L142's chain, printed as the legend for what the pane
          below shows. Its first three stages are the graph and its last three
          are the graph's captions — stated here so that split reads as a
          structure rather than as a diagram that stopped early. */}
      <div className="rounded-2xl border border-border bg-muted/40 p-5">
        <p className="mono-label text-primary-ink">{pick(CHAIN_LABEL, locale)}</p>
        <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
          {CHAIN_STAGES.map((stage, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="mono-label rounded-full border border-border bg-card px-2.5 py-1">
                {pick(stage, locale)}
              </span>
              {i < CHAIN_STAGES.length - 1 && (
                <span aria-hidden="true" className="text-muted-foreground">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-balance-group="scenario-register">
            <div role="radiogroup" aria-label={REGISTER_LABEL} className="flex flex-col gap-2">
              {SCENARIOS.map((scenario, i) => {
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
            <ScenarioTrace scenario={selected} locale={locale} />
          </div>
        </div>
      </div>

      {/* Source L155, with its dangling citation marker resolved. */}
      <p className="mt-12 body-lead leading-relaxed text-muted-foreground">
        {pick(SCENARIOS_CLOSING.text, locale)}{" "}
        <Link
          href={localePath(
            locale,
            /* `/technical-specification` renders EN only, so an `nl` link is a
               real 404. Same substitution the rest of the site uses. */
            locale === "en" ? SCENARIOS_CLOSING.citation.href : PATHS.cdt2
          )}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(SCENARIOS_CLOSING.citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}
