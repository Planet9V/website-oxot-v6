"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { localePath, PATHS } from "@/components/shell/nav";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { DECISIONS } from "./content";

/**
 * S05 · FOUR ENERGY DECISIONS — OXOT_Visual_Foundation_Spec.md §6, Foundation
 * Deliverable 2. That section is this component's visual contract; it is not a
 * numbered `OXOT_Layout_Styles.md` pattern, and it does not spend one.
 *
 * A SWITCHBOARD, NOT FOUR EQUAL STATIC CARDS (spec §6, "Interaction model"). The
 * four decisions are throws on one board and exactly one is engaged; the panel
 * beside them is the board's single readout. Four side-by-side cards would say
 * the opposite — that these are four things you buy — when the commercial point
 * is that a buyer arrives holding ONE of these questions.
 *
 * ONE DECISION IS ENGAGED FROM FIRST PAINT, and the initial state is a real id
 * (`DECISIONS.items[0].id`), never `null` or `""`. This is the spec's own rule
 * ("One decision is active by default") and it is also a regression this exact
 * component has already shipped elsewhere on the site: with a null initial
 * state the first render put three bare buttons beside two fully-populated
 * siblings. `activeId` is therefore seeded from the data, so there is no empty
 * state for the component to fall into.
 *
 * TABS, NOT A RADIOGROUP. The spec permits "a native tab pattern, radio group,
 * or equivalent accessible control", and the two are not interchangeable here:
 * each decision owns its OWN panel of copy, which is what `tablist` / `tab` /
 * `tabpanel` means. `SegmentSelector`'s radiogroup is correct for its case —
 * five selections writing into ONE shared canvas — and would understate this
 * one. Roving tabindex, Arrow/Home/End and selection-follows-focus are all
 * real: only the engaged tab is in the tab sequence, so Tab enters and leaves
 * the board in one stop.
 *
 * SIGNAL TOKENS, per spec §6: amber is the selected/proposed decision, cyan is
 * the evidence/model side. `--signal-green` APPEARS NOWHERE IN THIS FILE, and
 * must not be added: green is reserved for an actually-modelled closure, and
 * nothing in this section represents a closed or validated state — these are
 * questions a buyer is still holding.
 *
 * NO STATUS VOCABULARY IS INVENTED. "NOW / NEXT / NEVER" is permitted publicly
 * (owner reversal, 2026-08-24) and it does appear inside one decision's
 * `provides` string, where the source put it — but the source carries no
 * per-decision status label, so none is rendered as a badge. Inventing four
 * would be fabricating a classification the brief never made.
 *
 * THE SPEC'S FULL PANEL CHAIN IS question → evidence required → model action →
 * output → roles → CTA. `content.ts` sources only the question, the output
 * (`provides`) and the destination; the middle three are not in the brief, so
 * the chain renders as the two sourced stops joined by a real connector rather
 * than as six stops with three of them filled in from nowhere.
 */

/* Section chrome, not copy: `content.ts` carries no `datumLabel` for this
   section and is read-only here, so the route's short name is stated locally.
   It names the section, which is a real fact about the page. */
const DATUM_LABEL = same("Four decisions");

/** The per-decision link label. Routing furniture, not sourced copy. */
const CTA_LABEL = same("See how this works");

export function DecisionSwitchboard({ locale }: { locale: Locale }) {
  const { items } = DECISIONS;
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = items.findIndex((item) => item.id === activeId);
  const active = items[activeIndex];

  /* `/technical-specification` is English-only — content.ts states the
     requirement in data at `ctaSecondaryEnglishOnly` and names this exact
     gate. Ungated, the nl build linked to `/nl/technical-specification`,
     which 404s. Same gate IntakeCta.tsx applies to its own link. */
  const citationHref = locale === "en" ? DECISIONS.citation.href : PATHS.cdt2;

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActiveId(items[next].id);
    refs.current[next]?.focus();
  }

  return (
    <SectionA id="four-decisions" index="05" datumLabel={DATUM_LABEL} heading={DECISIONS.h2} locale={locale}>
      {/* DOM order IS the mobile stacking order: board, then readout. No
          order-swapping utility anywhere — desktop only pulls the board into a
          left column via the grid. */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div
            role="tablist"
            aria-label={pick(DECISIONS.h2, locale)}
            aria-orientation="vertical"
            className="flex flex-col gap-2"
          >
            {items.map((item, i) => {
              const engaged = item.id === activeId;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`decision-tab-${item.id}`}
                  aria-selected={engaged}
                  aria-controls={`decision-panel-${item.id}`}
                  tabIndex={engaged ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    engaged
                      ? "border-signal-amber/60 bg-signal-amber/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-signal-amber/40 hover:text-foreground"
                  )}
                >
                  {/* The throw. Knob POSITION and fill both change, so the
                      engaged row survives a greyscale or colour-blind read
                      without leaning on the amber. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-6 w-3.5 shrink-0 flex-col items-center rounded-full border p-[3px] transition-colors duration-200",
                      engaged ? "justify-start border-signal-amber/70" : "justify-end border-border"
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors duration-200",
                        engaged ? "bg-signal-amber" : "bg-border"
                      )}
                    />
                  </span>
                  <span className={cn("body-copy leading-snug", engaged && "font-medium")}>
                    {pick(item.name, locale)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            role="tabpanel"
            id={`decision-panel-${active.id}`}
            aria-labelledby={`decision-tab-${active.id}`}
            tabIndex={0}
            className="rounded-2xl border border-border bg-muted/40 p-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:p-8"
          >
            <h3 className="text-[1.25rem] font-semibold leading-snug text-foreground">
              {pick(active.name, locale)}
            </h3>

            {/* Stop one: the decision as the buyer states it — the proposed
                state, so amber. */}
            {/* The amber rides the RULE, not the label text. As text,
                `--signal-amber` measured 3.3:1 in light theme — under 1.4.3's
                4.5:1 floor — while the same colour as a border is non-text
                (1.4.11) and passes. The stop is still unmistakably the amber
                one. Same treatment as water-wastewater-2/DecisionSwitchboard. */}
            <div className="mt-6 border-l-2 border-signal-amber/70 pl-5">
              <p className="mono-label">{pick(DECISIONS.questionLabel, locale)}</p>
              <p className="mt-2.5 body-lead leading-relaxed text-foreground">
                {pick(active.question, locale)}
              </p>
            </div>

            {/* The run between the two stops — the page's own conductor idiom,
                one hairline dropping onto a node, not a decorative arrow glyph. */}
            <div aria-hidden="true" className="ml-[3px] flex h-8 flex-col items-center">
              <span className="w-px flex-1 bg-border" />
              <span className="h-[5px] w-[5px] rounded-full bg-signal-cyan" />
            </div>

            {/* Stop two: what the model returns — evidence/model side, so cyan. */}
            <div className="border-l-2 border-signal-cyan/70 pl-5">
              {/* Cyan on the rule, not on the text — same 1.4.3 reason as the
                  amber stop above (this label measured 3.24:1). */}
              <p className="mono-label">{pick(DECISIONS.providesLabel, locale)}</p>
              <p className="mt-2.5 body-lead leading-relaxed text-foreground">
                {pick(active.provides, locale)}
              </p>
            </div>

            <p className="mt-8 border-t border-border pt-6">
              <Link
                href={localePath(locale, active.href)}
                className="body-copy font-medium text-primary-ink underline-offset-4 hover:underline"
              >
                {pick(CTA_LABEL, locale)}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12 body-lead leading-relaxed text-muted-foreground">
        {pick(DECISIONS.note, locale)} {pick(DECISIONS.noteTwo, locale)}{" "}
        <Link
          href={localePath(locale, citationHref)}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(DECISIONS.citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}
