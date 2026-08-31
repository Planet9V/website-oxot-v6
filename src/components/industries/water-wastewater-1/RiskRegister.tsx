"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SCENARIOS } from "./content";

/**
 * CUSTOM TREATMENT, DELIBERATE — a selectable scenario register.
 *
 * Ten scenarios, each a three-beat trace: pathway → impact → decision. Why no
 * named pattern is used here, stated plainly:
 *  · Decision Ledger (Pattern 7) is the obvious-looking fit and is wrong. Its
 *    own entry scopes it to the Four Decisions Switchboard, "full stop, never
 *    repurposed", and its rows carry NOW/NEXT/NEVER status stamps. These rows
 *    carry no status; they are threat scenarios, not decisions taken.
 *  · Case File Index (Pattern 8) was rescoped by its own third review to case
 *    studies primarily, precisely because stretching one card schema across
 *    three different content types was an unaddressed structural gap.
 *  · Asset-Class Bento's cells are asset types. These are not assets.
 * Ten equal cards would in any case break `OXOT_Visual_Rules.md`'s "more than
 * three visually equal cards".
 *
 * So the treatment comes from `OXOT_content-to-visual-mapping-table.md`
 * directly: network path → pathway overlay, operational consequence → process
 * chain, never a generic warning card. A register with a live detail trace is
 * the honest rendering of a table whose rows are routes.
 *
 * TOKENS ARE THE THREE BEATS, NOT DECORATION: blue rules the pathway (blue
 * means pathway/network), red rules the impact (critical consequence — the only
 * other place red appears on this page), amber rules the decision
 * (proposed/pending). Three colours in one panel is not three competing accents;
 * each carries its own defined meaning, which is what the token system is for.
 *
 * NOTHING CRUCIAL HIDES: every row shows its title *and* its impact at all
 * times, so the list alone answers "what could happen"; selecting a row adds
 * the pathway and the decision. That is the difference between a master/detail
 * register and an accordion used to make a page look shorter, which the
 * Foundation Spec bars.
 */
export function RiskRegister({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = SCENARIOS.items[selected];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % SCENARIOS.items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + SCENARIOS.items.length) % SCENARIOS.items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SCENARIOS.items.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* The register. */}
        {/* The radios are direct children of the group. Wrapping them in a
            <ul>/<li> would put `list`/`listitem` roles between the radiogroup
            and the radios it is supposed to own, which is an ownership break,
            not a cosmetic one. */}
        <div
          role="radiogroup"
          aria-label={pick(SCENARIOS.listLabel, locale)}
          className="border-t border-border lg:col-span-6 xl:col-span-5"
        >
          {SCENARIOS.items.map((item, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  "group flex min-h-11 w-full gap-3 border-b border-border py-4 pr-3 text-left transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-0.5 shrink-0 self-stretch rounded-full transition-colors duration-200",
                    isSelected ? "bg-signal-cyan" : "bg-border group-hover:bg-primary/40"
                  )}
                />
                <span className="mono-label mt-0.5 shrink-0 text-primary-ink">R{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block body-copy leading-snug",
                      isSelected ? "font-medium text-foreground" : "text-foreground/85"
                    )}
                  >
                    {pick(item.title, locale)}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted-foreground">
                    {pick(item.impact, locale)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* The trace. Sticky on wide screens so the register can be walked
            without losing sight of what is being described. */}
        <div className="lg:col-span-6 xl:col-span-7">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7" aria-live="polite">
              <p className="mono-label text-primary-ink">R{String(selected + 1).padStart(2, "0")}</p>
              <h3 className="h-sub mt-2 text-balance">{pick(active.title, locale)}</h3>

              <dl className="mt-7 space-y-6">
                <Beat
                  term={pick(SCENARIOS.beat.pathway, locale)}
                  body={pick(active.pathway, locale)}
                  rule="border-signal-blue"
                />
                <Beat
                  term={pick(SCENARIOS.beat.impact, locale)}
                  body={pick(active.impact, locale)}
                  rule="border-signal-red"
                />
                <Beat
                  term={pick(SCENARIOS.beat.decision, locale)}
                  body={pick(active.decision, locale)}
                  rule="border-signal-amber"
                />
              </dl>
            </div>
          </div>
        </div>
      </div>

      <p className="prose-measure mt-10 border-t border-border pt-6 body-copy leading-relaxed text-muted-foreground">
        {pick(SCENARIOS.citation, locale)}
      </p>
    </div>
  );
}

function Beat({ term, body, rule }: { term: string; body: string; rule: string }) {
  return (
    <div className={cn("border-l-2 pl-4", rule)}>
      <dt className="mono-label">{term}</dt>
      <dd className="mt-1.5 body-copy leading-relaxed text-foreground">{body}</dd>
    </div>
  );
}
