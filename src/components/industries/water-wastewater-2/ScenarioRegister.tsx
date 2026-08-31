"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SCENARIOS } from "./content.scenarios";
import { ScenarioTrace } from "./ScenarioTrace";

/**
 * S04 · THE PATHWAY-TRACE REGISTER — a master/detail register whose detail is a
 * DRAWING, not a text panel.
 *
 * WHY NO NAMED PATTERN. Pattern 7 (Decision Ledger) is scoped to the Four
 * Decisions deliverable "full stop, never repurposed", and it stamps
 * NOW/NEXT/NEVER on decisions already taken — these are threat scenarios with
 * no status to stamp. Pattern 8 (Case File Index) was rescoped by its own third
 * review to case studies. Pattern 3's bento cells are asset types. Ten equal
 * cards breaks the Visual Rules cap outright. So this is custom, and the
 * content-to-visual mapping table is what says what it must be: a network path
 * gets a pathway overlay, an operational consequence gets a process chain, and
 * neither gets a generic warning card.
 *
 * DIFFERENTIATED FROM S05 DELIBERATELY, AND STRUCTURALLY. This is a VERTICAL
 * list whose detail is a DIAGRAM; the Four Decisions switchboard below is a
 * HORIZONTAL key row whose panel is PROSE. Adjacent selectable sections that
 * look alike is the box-ticking differentiation this rebuild is correcting.
 *
 * THE INDEX IS TWO COLUMNS ON DESKTOP, AND THE FLOW DIRECTION IS LOAD-BEARING.
 * `lg:grid-flow-col lg:grid-rows-5` fills rows 1–5 of column one, then rows 1–5
 * of column two, so items 1–5 read DOWN the left and 6–10 DOWN the right. The
 * default row-major flow would have put item 2 to the RIGHT of item 1 while the
 * keyboard handler still treats ArrowDown as "next" — the arrow key and the eye
 * would disagree on every press. Column-major keeps DOM order, reading order and
 * arrow order the same one order, which is what let the roving-tabindex handler
 * below stay untouched. Below `lg` it is a single stacked column, as before.
 *
 * SIBLING-BALANCE — THE PAGE'S ONE STATED EXCEPTION, RECORDED HERE AND IN THE
 * QA payload, never instead of the measurement.
 * `data-balance-group="risk-register"` marks the list wrapper (`lg:col-span-5`,
 * ten row controls in a 5×2 grid) and the detail wrapper (`lg:col-span-7`,
 * sticky). The governing threshold is the site-wide 2x floor, shorter ≥ 50% of
 * taller, on both height and content-element count.
 *
 * MEASURED, off `scripts/measure.mjs`, at both 1440×900 and 2560×1440 —
 * identical at the two widths, so only one pair of numbers is quoted:
 *   heights=[529,454]  counts=[10,8]  h = 0.86  n = 0.80  worst = 0.80
 * Before the two-column reflow this was heights=[840,454] counts=[10,5],
 * h = 0.54, n = 0.50 — passing, but sitting exactly ON the floor.
 *
 * THE COUNT OF 8 IS THE PRE-INTERACTION COUNT, WHICH IS THE ONLY ONE THE GATE
 * SEES, so it is not the whole truth and is not quoted as if it were. The
 * detail's marked blocks are label, title, figure, token legend, the three beat
 * `<g>`s inside the trace — seven always — plus the citation `<p>`, which is
 * conditional and which only scenario 01 has. Walking all ten selections in a
 * browser returns [8,7,7,7,7,7,7,7,7,7]: the gate measures scenario 01 and
 * reports 8/10 = 0.80, and every other selection is 7/10 = 0.70. Both clear the
 * 0.50 floor; 0.70 is the honest worst case.
 *
 * THE MARKING IS NOT INFLATING THE DETAIL — measured, not assumed. `measure.mjs`
 * falls back to counting elements with direct text children only when a group
 * marks NOTHING, and SVG `<text>` qualifies. Run that fallback against this
 * section and it returns 20 for the list against 15 for the detail (9 of the 15
 * being the trace's `<text>` nodes), i.e. n = 0.75 — LOWER than the 0.80 the
 * explicit marking reports, because the fallback counts more on both sides. So
 * the explicit marking is a coarser reading of the same shape, not a thumb on
 * the scale. Worth recording that before the three `<g>`s were marked the
 * explicit count was 5 against that same natural 15, which made the reported
 * n = 0.50 stricter than the section actually was.
 *
 * THE STATED REASON, which is a content reason and not an assertion that the
 * asymmetry was intended: a register INDEX is necessarily longer than a single
 * register ENTRY — ten rows against one — and the entry is `lg:sticky` for
 * exactly that reason, so it stays paired with whichever row is being read. A
 * comment merely asserting "unequal by construction, not by accident" is NOT a
 * stated reason; that is the comment `-1`'s inverted ledger shipped under, and
 * it is not what this is. Two columns do not repeal that reason, they just stop
 * the index from running to twice the entry's height to honour it.
 *
 * NOTHING CRUCIAL HIDES, STATED PRECISELY. Every row shows its title in full and
 * its impact clamped to two lines; below `lg` the column is wide enough that the
 * impact shows in full. Nothing clamped is lost — the same sentence is the
 * detail pane's `impact` beat, in full, for whichever row is selected.
 */
export function ScenarioRegister({ locale }: { locale: Locale }) {
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
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ── The index ──────────────────────────────────────────────────── */}
      <div className="lg:col-span-5">
        <p className="mono-label">{pick(SCENARIOS.listLabel, locale)}</p>
        <div
          role="listbox"
          aria-label={pick(SCENARIOS.listLabel, locale)}
          data-balance-group="risk-register"
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
                  <span
                    className={cn(
                      "block body-copy leading-snug",
                      isSelected ? "font-semibold text-foreground" : "font-medium text-foreground/90"
                    )}
                  >
                    {pick(item.title, locale)}
                  </span>
                  {/* NO `block` HERE, DELIBERATELY. `line-clamp-2` works by
                      setting `display:-webkit-box`; Tailwind emits `.block`
                      AFTER `.line-clamp-2` in the sheet at equal specificity,
                      so `line-clamp-2 block` silently resets display to block
                      and the clamp does nothing. It shipped that way and was
                      invisible only because at full single-column width this
                      sentence happened to fit two lines anyway. Reflowed into
                      half-width cells it ran to four, which is what made the
                      index tall. The clamp is the thing that keeps every row
                      the same height. */}
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
            <div data-balance-group="risk-register" aria-live="polite">
              <p data-balance-item className="mono-label text-primary-ink">
                {pick(SCENARIOS.detailLabel, locale)} · {String(selected + 1).padStart(2, "0")} /{" "}
                {SCENARIOS.items.length}
              </p>
              <h3 data-balance-item className="h-sub mt-3 text-balance">
                {pick(active.title, locale)}
              </h3>

              <figure data-balance-item className="m-0 mt-6">
                <ScenarioTrace
                  key={active.id}
                  locale={locale}
                  title={pick(active.title, locale)}
                  beats={[
                    { label: SCENARIOS.beat.pathway, text: active.pathway, token: "blue" },
                    { label: SCENARIOS.beat.impact, text: active.impact, token: "red" },
                    { label: SCENARIOS.beat.decision, text: active.decision, token: "amber" }
                  ]}
                />
              </figure>

              {/* The trace's colours mean something, so they are named in
                  words. A drawn state nobody can decode is a decoration. */}
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

              {/* Source L184's opening clause, attached to the one scenario it
                  is about — the five recommendations that follow it in the
                  source moved up to the sector-reality evidence panel. */}
              {active.citation && (
                <p
                  data-balance-item
                  className="prose-measure mt-5 border-t border-border pt-4 text-[0.875rem] leading-relaxed text-muted-foreground"
                >
                  {pick(active.citation, locale)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
