"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SCENARIOS as SECTION } from "./content";
import { CONSEQUENCE_CLASSES, SCENARIOS } from "./content.scenarios";
import { ScenarioTrace } from "./ScenarioTrace";

/**
 * S05 · THE RISK-SCENARIO REGISTER — a master/detail register whose detail is a
 * DRAWING, not a text panel.
 *
 * WHY NO NAMED PATTERN, AND WHY PATTERN 7 SPECIFICALLY IS A TRAP. Pattern 7
 * (Decision Ledger) is the closest-looking fit and the wrong one. It is scoped
 * to the Four Decisions deliverable "full stop, never repurposed", and its rows
 * carry NOW/NEXT/NEVER status stamps on decisions already taken. These are
 * threat scenarios with no status to stamp, and this register's fourth column is
 * "the decision the Twin supports" — a CAPABILITY, not a status. Forcing Pattern
 * 7 onto it would mean inventing a NOW/NEXT/NEVER value per scenario: fabricated
 * content wearing a ratified pattern's clothes. Pattern 3's bento cells are
 * asset types; Pattern 8 was rescoped by its own review to case studies; ten
 * equal cards breaks the Visual Rules cap outright. So this is custom, and
 * `OXOT_content-to-visual-mapping-table.md` is what says what it must be: a
 * network path gets a pathway overlay, an operational consequence gets a process
 * chain, and neither gets a generic warning card.
 *
 * THE INDEX IS TWO COLUMNS ON DESKTOP AND THE FLOW DIRECTION IS LOAD-BEARING.
 * `lg:grid-flow-col lg:grid-rows-5` fills rows 1-5 of column one, then rows 1-5
 * of column two, so items 1-5 read DOWN the left and 6-10 DOWN the right. The
 * default row-major flow would put item 2 to the RIGHT of item 1 while the
 * keyboard handler still treats ArrowDown as "next" — the arrow key and the eye
 * would disagree on every press. Column-major keeps DOM order, reading order and
 * arrow order the same one order. Below `lg` it is a single stacked column.
 *
 * THE `line-clamp` / `.block` SPECIFICITY COLLISION — CHECKED FOR EXPLICITLY,
 * because it is the defect that made the equivalent `-2` section imbalanced and
 * it is invisible on inspection. `line-clamp-2` works by setting
 * `display:-webkit-box`. Tailwind emits `.block` AFTER `.line-clamp-2` in the
 * sheet at equal specificity, so writing `line-clamp-2 block` silently resets
 * display to `block` and the clamp does nothing at all. It is undetectable at
 * full single-column width, where the sentence happens to fit two lines anyway,
 * and only shows up once the list reflows into half-width cells and the same
 * sentence runs to four. The impact `<span>` below therefore carries
 * `line-clamp-2` and NO `block` class. Note that the two spans ABOVE it in the
 * same row do carry `block` — deliberately, and safely, because neither is
 * clamped; the hazard is the combination, not the class.
 *
 * NOTHING CLAMPED IS LOST. Every row shows its title and its consequence class
 * in full and its impact clamped to two lines; the same sentence is the detail
 * pane's impact beat, in full, for whichever row is selected.
 *
 * SIBLING BALANCE — `data-balance-group="scenario-register"` marks the list
 * wrapper (`lg:col-span-5`, ten row controls in a 5x2 grid) and the detail
 * wrapper (`lg:col-span-7`, sticky). The mark is on the INNER CONTENT WRAPPER in
 * both cases, never on the stretched grid cell, because a row that is
 * `items-stretch` makes its children equal by construction and measuring the
 * cells would let an empty stretched box pass. The governing threshold is the
 * site-wide 2x floor: shorter >= 50% of taller, on BOTH height and marked-item
 * count, worse governing.
 *
 * MEASURED, off `scripts/measure.mjs`, at both 1440x900 and 2560x1440 —
 * identical at the two widths, so one pair of numbers covers both:
 *   heights=[731,545]  counts=[10,9]  h = 0.75  n = 0.90  worst = 0.75
 *
 * THAT IS THE PRE-INTERACTION NUMBER, WHICH IS THE ONLY ONE THE GATE SEES, so it
 * is not the whole truth and is not quoted as if it were. The gate measures the
 * default selection — scenario 01, the one row carrying a `citation` — and 01 is
 * therefore the most flattering of the ten. Walking all ten selections in a real
 * browser at 1440 gives:
 *   01 [731,545] n=[10,9] worst 0.75     06 [731,493] n=[10,8] worst 0.67
 *   02 [731,510] n=[10,8] worst 0.70     07 [731,493] n=[10,8] worst 0.67
 *   03 [731,510] n=[10,8] worst 0.70     08 [731,493] n=[10,8] worst 0.67
 *   04 [731,510] n=[10,8] worst 0.70     09 [731,493] n=[10,8] worst 0.67
 *   05 [731,477] n=[10,8] worst 0.65     10 [731,493] n=[10,8] worst 0.67
 * THE HONEST WORST CASE IS 0.65, on scenario 05 (aeration — the shortest three
 * beats in the register), against the 0.50 floor. Every selection clears it.
 * These are measured on the real wired route, not on a preview harness.
 *
 * The marked blocks in the detail are: label, title, figure, the three beat
 * `<g>`s inside the trace, the token legend and the consequence-class gloss —
 * eight always — plus the `citation` `<p>`, which is conditional and which only
 * scenario 01 has. Hence 9 on the measured state and 8 on the other nine.
 *
 * THE STATED REASON FOR THE RESIDUAL ASYMMETRY is a content reason, not an
 * assertion that the asymmetry was intended: a register INDEX is necessarily
 * longer than a single register ENTRY — ten rows against one — and the entry is
 * `lg:sticky` for exactly that reason, so it stays paired with whichever row is
 * being read. Two columns do not repeal that reason; they stop the index from
 * running to twice the entry's height to honour it. A comment merely asserting
 * "unequal by construction, not by accident" is NOT a stated reason — that is
 * the comment `water-wastewater-1`'s inverted ledger shipped under.
 *
 * SELECTION IS KEYBOARD-OPERABLE AND HAS NO HOVER-ONLY STATE. Roving tabindex
 * over a `listbox`/`option` pair: one row is tabbable, arrows move selection and
 * focus together, Home/End jump the ends. Hover changes a border colour only,
 * never content. No drag interaction exists anywhere here — Mobile Rules bans it
 * outright. The detail pane is populated on first paint (`useState(0)`), so the
 * section never renders as a list beside an empty panel awaiting a click.
 */
export function ScenarioRegister({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = SCENARIOS.items[selected];
  const activeClass = CONSEQUENCE_CLASSES[active.consequence];

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
    /* THE SECTION SHELL IS THIS COMPONENT'S, not page.tsx's — the convention
       every wired section on this page follows, so the route file stays a list
       of section components rather than a mix of components and inline chrome.
       `SECTION` is the heading trio from `content.ts` (Wave 0's, read-only);
       `SCENARIOS` is this section's own ten-row register. The alias keeps two
       legitimately different things from sharing one name in this file. */
    <section className="oxot-canvas pt-16 sm:pt-24" id="scenarios">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        05 · {pick(SECTION.datum, locale)}
      </p>
      <h2 className="mt-4 text-balance">{pick(SECTION.h2, locale)}</h2>
      {/* L169's constraint, carried as the section's lead: these are not
          production-outage examples with the nouns swapped. */}
      {/* No `prose-measure`/`max-w-2xl` (removed 2026-08-25, systemic audit) —
          see TechnologyIndex.tsx's docblock; this is a standalone lead above
          the master-detail grid, not inside it. */}
      <p className="mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(SECTION.intro, locale)}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* ── The index ────────────────────────────────────────────────── */}
      <div className="lg:col-span-5">
        <p className="mono-label">{pick(SCENARIOS.listLabel, locale)}</p>
        <div
          role="listbox"
          aria-label={pick(SCENARIOS.listLabel, locale)}
          data-balance-group="scenario-register"
          className="mt-3 grid gap-1.5 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-5"
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
                role="option"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                data-balance-item
                onClick={() => setSelected(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  isSelected ? "border-primary/60 bg-primary/10" : "border-border bg-card hover:border-primary/40"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 h-4 w-0.5 shrink-0 rounded-full transition-colors duration-200",
                    isSelected ? "bg-primary" : "bg-border"
                  )}
                />
                <span className="min-w-0">
                  {/* The consequence class, on every row. This is the one thing
                      stopping ten rows from reading as ten interchangeable
                      warnings, which is what L169 of the brief forbids. It is
                      TEXT, never a colour: five classes cannot be five accent
                      hues without breaking the single-accent rule, and an
                      unlabelled coloured dot is precisely what the mapping table
                      exists to keep off this site. */}
                  <span className="mono-label block text-muted-foreground">
                    {pick(CONSEQUENCE_CLASSES[item.consequence].label, locale)}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block body-copy leading-snug",
                      isSelected ? "font-semibold text-foreground" : "font-medium text-foreground/90"
                    )}
                  >
                    {pick(item.title, locale)}
                  </span>
                  {/* NO `block` HERE, DELIBERATELY — see the collision note in
                      this file's docblock. Adding it silently kills the clamp. */}
                  <span className="mt-0.5 line-clamp-2 text-[0.8125rem] leading-snug text-muted-foreground">
                    {pick(item.impact, locale)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── The entry ──────────────────────────────────────────────────── */}
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div data-balance-group="scenario-register" aria-live="polite">
              <p data-balance-item className="mono-label text-primary-ink">
                {pick(SCENARIOS.detailLabel, locale)} · {String(selected + 1).padStart(2, "0")} /{" "}
                {SCENARIOS.items.length}
              </p>
              <h3 data-balance-item className="h-sub mt-3 text-balance">
                {pick(active.title, locale)}
              </h3>

              {/* `data-gfx-meaning` opts this figure into the harness's WCAG
                  1.4.11 non-text-contrast check. It is not decoration: the
                  spine colours ARE the argument (pathway / impact / decision)
                  and the chip outline carries the consequence class, so every
                  stroke in here has to clear 3:1 against its backdrop in both
                  themes. An unmarked figure is silently NOT covered — the
                  harness says so itself, and reports the marked count as the
                  only way to notice. */}
              <figure data-balance-item data-gfx-meaning className="m-0 mt-6">
                <ScenarioTrace
                  key={active.id}
                  locale={locale}
                  title={pick(active.title, locale)}
                  beats={[
                    { label: SCENARIOS.beat.pathway, text: active.pathway, token: "blue" },
                    {
                      label: SCENARIOS.beat.impact,
                      text: active.impact,
                      token: "red",
                      chip: pick(activeClass.label, locale)
                    },
                    { label: SCENARIOS.beat.decision, text: active.decision, token: "amber" }
                  ]}
                />
              </figure>

              {/* The trace's colours mean something, so they are named in words.
                  A drawn state nobody can decode is a decoration. */}
              <ul data-balance-item className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                <li className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-signal-blue" />
                  {pick(SCENARIOS.beat.pathway, locale)}
                </li>
                <li className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-signal-red" />
                  {pick(SCENARIOS.beat.impact, locale)}
                </li>
                <li className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-signal-amber" />
                  {pick(SCENARIOS.beat.decision, locale)}
                </li>
              </ul>

              {/* The class chip inside the drawing is two words. This is what
                  those two words mean. Without it the chip is a category label
                  whose boundary the reader has to guess — and this taxonomy is
                  DERIVED rather than transcribed from the brief, so it owes the
                  reader a definition on the page, not only in a source comment. */}
              <p
                data-balance-item
                className="prose-measure mt-5 border-t border-border pt-4 text-[0.875rem] leading-relaxed text-muted-foreground"
              >
                <span className="font-medium text-foreground">
                  {pick(SCENARIOS.classLabel, locale)} · {pick(activeClass.label, locale)}
                </span>{" "}
                — {pick(activeClass.gloss, locale)}
              </p>

              {/* Source L184's opening clause, attached to the one scenario it is
                  about. Conditional, so it renders on scenario 01 only. */}
              {active.citation && (
                <p
                  data-balance-item
                  className="prose-measure mt-3 text-[0.875rem] leading-relaxed text-muted-foreground"
                >
                  {pick(active.citation, locale)}
                </p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
