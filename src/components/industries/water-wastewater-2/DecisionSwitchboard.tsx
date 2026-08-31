"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import { DECISIONS } from "./content";

/**
 * S05 · FOUNDATION DELIVERABLE 2 — the Four Decisions Switchboard, built to
 * the Foundation Spec §6 rather than to a layout pattern. §6 is unusually
 * prescriptive and is followed literally: a switchboard, not four equal static
 * cards; a real accessible tab control; ONE decision active by default; amber
 * for the selected proposed-decision state and cyan for the evidence/model
 * line.
 *
 * A DEFAULT IS CORRECT HERE AND WRONG IN THE WORKED EXAMPLE, and the difference
 * is falsifiable rather than stylistic. These are the four buyer questions and
 * all four always apply, so opening "What do we fix first?" pre-picks no answer
 * — it only opens the first question. In the worked example a default control
 * WOULD assert an answer, against a source whose own conclusion is that the
 * answer is a combination, so no candidate is pre-selected there.
 *
 * NOW / NEXT / NEVER IS CORRECT AS WRITTEN and is not softened to "Deferred".
 * The owner reversed the earlier public-label restriction on 2026-08-24; the
 * README open item implying a vocabulary violation is stale on this point.
 *
 * NOT PATTERN 7, Decision Ledger, even though that pattern also serves this
 * deliverable: a ledger is a row-per-decision register with status stamps on
 * decisions already taken. None of these four has been answered, so a ledger
 * here would render four empty status chips — the shape of the pattern with
 * none of its content.
 *
 * NO BALANCE GROUP, and that is a decision rather than an omission: a key row
 * is nav-shaped, and the balance rule says not to sweep those. Four tabs are
 * meant to be equal; relating their heights to the panel below them would
 * measure a relationship that does not exist.
 */

const DESTINATIONS = {
  fixFirst: PATHS.decisionFixFirst,
  investment: PATHS.decisionInvestment,
  changeSafely: PATHS.decisionChangeSafely,
  riskAcceptance: PATHS.decisionRiskAcceptance
} as const;

export function DecisionSwitchboard({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = DECISIONS.items[selected];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % DECISIONS.items.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + DECISIONS.items.length) % DECISIONS.items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = DECISIONS.items.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={pick(DECISIONS.h2, locale)} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DECISIONS.items.map((item, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`ww2-decision-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls="ww2-decision-panel"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                "flex min-h-11 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                isSelected
                  ? "border-signal-amber bg-signal-amber/10"
                  : "border-border bg-card hover:border-signal-amber/50"
              )}
            >
              <span className="mono-label text-primary-ink">D{i + 1}</span>
              <span className={cn("h-card leading-snug", isSelected ? "text-foreground" : "text-foreground/85")}>
                {pick(item.name, locale)}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="ww2-decision-panel"
        aria-labelledby={`ww2-decision-tab-${active.id}`}
        tabIndex={0}
        className="mt-4 rounded-2xl border border-signal-amber/60 bg-card p-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="mono-label">{pick(DECISIONS.questionLabel, locale)}</p>
            {/* No `max-w-3xl` (removed 2026-08-25, found by measure.mjs's
                automated narrow-text check): this tabpanel is single-column
                full-width, same as DECISIONS.note below — a fixed cap here is
                the same island-with-dead-space bug, just missed in the
                earlier pass that fixed .note in this same file. */}
            <p className="h-sub mt-3 text-balance text-foreground">
              &ldquo;{pick(active.question, locale)}&rdquo;
            </p>

            {/* Cyan is the evidence/model line, per the Foundation Spec's own
                colour assignment for this deliverable. */}
            <div className="mt-8 border-l-2 border-signal-cyan pl-4">
              <p className="mono-label">{pick(DECISIONS.providesLabel, locale)}</p>
              {/* No `prose-measure` (removed 2026-08-25) — same reason as the
                  question above. */}
              <p className="mt-2 body-lead leading-relaxed text-foreground">
                {pick(active.provides, locale)}
              </p>
            </div>

            <Link
              href={localePath(locale, DESTINATIONS[active.href])}
              className="mono-label mt-7 inline-flex min-h-11 items-center gap-2 text-primary-ink underline-offset-4 hover:underline"
            >
              {pick(active.name, locale)}
              <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* No `prose-measure` here (removed 2026-08-25): that class is for
          long-form flowing body copy. This is one closing sentence under a
          section that's otherwise full-width — capped at 68ch it read as a
          narrow, left-hugging island beside its own section's real width. */}
      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(DECISIONS.note, locale)}
      </p>
    </div>
  );
}
