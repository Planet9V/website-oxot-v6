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
 * S05 · FOUR MANUFACTURING DECISIONS — OXOT_Visual_Foundation_Spec.md §6,
 * Foundation Deliverable 2. That section is this component's visual contract; it
 * is not a numbered `OXOT_Layout_Styles.md` pattern and does not spend one.
 *
 * A SWITCHBOARD, NOT FOUR EQUAL STATIC CARDS (spec §6, "Interaction model").
 * Four side-by-side cards would say these are four things a plant buys; the
 * commercial point is that a buyer arrives holding exactly ONE of these
 * questions, so exactly one is engaged and the panel beside them is the board's
 * single readout.
 *
 * DRAWN IN THIS PAGE'S OWN P&ID GRAMMAR, NOT THE ENERGY PAGE'S. `Rule.tsx`
 * establishes the signature — a process line with instruments tapping it — and
 * `Architecture.tsx` already reads that line vertically. Here the four decisions
 * are four taps on one continuous line, unboxed, with the engaged tap filled and
 * ringed. The energy page draws the same section as four bordered pill rows
 * carrying toggle throws, which is an electrical control-panel idiom; repeating
 * it here would make two sectors' decisions look like one component with the
 * words swapped.
 *
 * ONE DECISION IS ENGAGED FROM FIRST PAINT and the initial state is a real id
 * (`DECISIONS.items[0].id`), never `null` or `""`. That is the spec's own rule
 * ("One decision is active by default") and also a regression this exact
 * component has already shipped elsewhere on the site: with a null initial state
 * the first render put bare buttons beside a dead panel. Seeding from the data
 * means there is no empty state to fall into.
 *
 * TABS, NOT A RADIOGROUP. The spec permits "a native tab pattern, radio group,
 * or equivalent accessible control", and they are not interchangeable here: each
 * decision owns its OWN panel of copy, which is what `tablist` / `tab` /
 * `tabpanel` means. A radiogroup is right when several selections write into one
 * shared canvas, which is not this. Roving tabindex, Arrow/Home/End and
 * selection-follows-focus are all real, so Tab enters and leaves the board in
 * one stop.
 *
 * ALL FOUR PANELS ARE IN THE DOM, the inactive three carrying `hidden`. Every
 * tab's `aria-controls` therefore resolves to an element that exists. Rendering
 * only the engaged panel leaves three tabs pointing at ids that are not in the
 * document, which is a dangling reference to assistive technology. `hidden`
 * removes the other three from the accessibility tree, so nothing is announced
 * twice.
 *
 * The panel carries no `tabIndex` because it contains a focusable link. WAI-ARIA
 * APG asks for `tabindex="0"` on a tabpanel only when the panel has no focusable
 * content of its own.
 *
 * SIGNAL TOKENS, per spec §6: amber is the selected/proposed decision, cyan is
 * the evidence/model side. `--signal-green` APPEARS NOWHERE IN THIS FILE and
 * must not be added — green is reserved for an actually-modelled closure, and
 * nothing in this section is closed or validated. These are questions a plant is
 * still holding.
 *
 * COLOUR RIDES THE NODES, NOT THE TEXT. `--signal-amber` and `--signal-cyan` are
 * tuned to clear 1.4.11's 3:1 non-text floor but not 1.4.3's 4.5:1 text floor,
 * so both appear only as node fills, borders and rings. The two stops are also
 * separated by FILL, not only hue: the proposed stop is an outline node, the
 * evidence stop a solid one. The engaged tap likewise survives a greyscale read,
 * through fill, ring, weight and background together.
 *
 * NO STATUS VOCABULARY IS INVENTED. "NOW / NEXT / NEVER" is permitted publicly
 * (owner reversal, 2026-08-24) and does appear inside decision 1's `provides`
 * string, where the source put it — but the source carries no per-decision
 * status label, so none is rendered as a badge. Four invented badges would be a
 * classification the brief never made.
 *
 * THE SPEC'S FULL PANEL CHAIN is question → evidence required → model action →
 * output → roles → CTA. `content.ts` sources only the question, the output
 * (`provides`) and the destination; the middle three are not in the brief, so
 * the chain renders as the two sourced taps on one line rather than six stops
 * with three filled in from nowhere.
 */

/* Section chrome, not copy: `content.ts` carries no `datumLabel` for this
   section and is read-only here, so the route's short name is stated locally. It
   names the section, which is a real fact about the page. */
const DATUM_LABEL = same("Four decisions");

/** The per-decision link label. Routing furniture, not sourced copy. */
const CTA_LABEL = same("See how this works");

/** One tap on the readout's line: node in the gutter, label and body beside it. */
function ReadoutStop({
  label,
  body,
  tone,
  last
}: {
  label: string;
  body: string;
  tone: "proposed" | "evidence";
  last?: boolean;
}) {
  return (
    <li className="grid grid-cols-[0.625rem_minmax(0,1fr)] gap-x-5 sm:gap-x-6">
      {/* The rule is clipped at the first and last nodes so the run starts and
          stops at a tap rather than trailing into the frame. */}
      <div className="relative flex justify-center" aria-hidden="true">
        <span className={cn("absolute w-px bg-border", last ? "top-0 h-2" : "bottom-0 top-2")} />
        {/* mt-[3px] centres a 10px node on the first line of an 11px mono label. */}
        <span
          className={cn(
            "relative mt-[3px] block size-2.5 rounded-full border-2",
            tone === "proposed" ? "border-signal-amber bg-card" : "border-signal-cyan bg-signal-cyan"
          )}
        />
      </div>

      <div className={cn("min-w-0", !last && "pb-9")}>
        <p className="mono-label text-muted-foreground">{label}</p>
        <p className="mt-2.5 body-lead leading-relaxed text-foreground">{body}</p>
      </div>
    </li>
  );
}

export function DecisionSwitchboard({ locale, className }: { locale: Locale; className?: string }) {
  const { items } = DECISIONS;
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  /* `/technical-specification` renders EN only, so an `nl` link to it is a real
     404. Same substitution the rest of the site uses, and the one `content.ts`
     names in data at `FINAL_CTA.ctaSecondaryEnglishOnly`. */
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
    <SectionA
      id="four-decisions"
      index="05"
      datumLabel={DATUM_LABEL}
      heading={DECISIONS.h2}
      locale={locale}
      className={className}
    >
      {/* DOM order IS the mobile stacking order: board, then readout. No
          order-swapping utility anywhere — desktop only pulls the board into a
          left column via the grid. */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div
            role="tablist"
            aria-label={pick(DECISIONS.h2, locale)}
            aria-orientation="vertical"
            className="flex flex-col"
          >
            {items.map((item, i) => {
              const engaged = item.id === activeId;
              const first = i === 0;
              const last = i === items.length - 1;
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
                  className="group grid grid-cols-[0.625rem_minmax(0,1fr)] gap-x-5 rounded-md text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {/* The line runs unbroken behind all four taps; only the first
                      and last segments are clipped to their own node. */}
                  <span className="relative flex justify-center" aria-hidden="true">
                    <span
                      className={cn(
                        "absolute w-px bg-border",
                        first && "bottom-0 top-6",
                        last && "top-0 h-6",
                        !first && !last && "inset-y-0"
                      )}
                    />
                    {/* `top-6` above matches this offset: 14px of row padding,
                        then 5px to centre a 10px node on a 21px line. */}
                    <span
                      className={cn(
                        "relative mt-[19px] block size-2.5 rounded-full border-2 transition-colors duration-200",
                        engaged
                          ? "border-signal-amber bg-signal-amber ring-4 ring-signal-amber/15"
                          : "border-border bg-card group-hover:border-signal-amber/50"
                      )}
                    />
                  </span>

                  <span
                    className={cn(
                      "rounded-md px-3 py-3.5 body-copy leading-snug transition-colors duration-200",
                      engaged
                        ? "bg-signal-amber/10 font-medium text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {pick(item.name, locale)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          {items.map((item) => (
            <div
              key={item.id}
              role="tabpanel"
              id={`decision-panel-${item.id}`}
              aria-labelledby={`decision-tab-${item.id}`}
              hidden={item.id !== activeId}
              /* The same framed sheet the architecture diagram sits in, so the
                 two drawings on this page read as one document. */
              className="rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
            >
              <h3 className="h-sub text-balance">{pick(item.name, locale)}</h3>

              <ul className="mt-7">
                <ReadoutStop
                  label={pick(DECISIONS.questionLabel, locale)}
                  body={pick(item.question, locale)}
                  tone="proposed"
                />
                <ReadoutStop
                  label={pick(DECISIONS.providesLabel, locale)}
                  body={pick(item.provides, locale)}
                  tone="evidence"
                  last
                />
              </ul>

              <p className="mt-8 border-t border-border pt-6">
                <Link
                  href={localePath(locale, item.href)}
                  className="body-copy font-medium text-primary-ink underline-offset-4 hover:underline"
                >
                  {pick(CTA_LABEL, locale)}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          ))}
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
