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
 * FOUNDATION DELIVERABLE 2 — the Four Decisions Switchboard, built to
 * `OXOT_Visual_Foundation_Spec.md` §6 rather than to a layout pattern.
 *
 * §6 is unusually prescriptive and is followed literally: "Use a switchboard,
 * not four equal static cards"; a native tab pattern or equivalent accessible
 * control; one decision active by default; amber for the selected proposed
 * decision state and cyan for the evidence/model state. So the four keys are a
 * real ARIA tablist with roving tabindex and arrow-key navigation, the open
 * panel is the Foundation Spec's fourth surface type (a Decision panel, amber
 * edge), and the "what the Twin provides" line inside it carries the cyan
 * evidence rule.
 *
 * NOT Pattern 7, Decision Ledger, even though that pattern also serves this
 * deliverable: a ledger is a row-per-decision *register* with NOW/NEXT/NEVER
 * status stamps on decisions already taken. This section is the four buyer
 * questions, none of which has been answered yet, so there is no status to
 * stamp. Using the ledger here would render four empty status chips — the shape
 * of the pattern with none of its content.
 *
 * The section is visually and structurally unlike the scenario register above
 * it on purpose: horizontal keys and one large panel, against that section's
 * vertical list and sticky trace. Adjacent selectable sections that look alike
 * are the box-ticking differentiation this build is correcting.
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
              id={`decision-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls="decision-panel"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                "flex min-h-11 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                isSelected ? "border-signal-amber bg-signal-amber/10" : "border-border bg-card hover:border-signal-amber/50"
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
        id="decision-panel"
        aria-labelledby={`decision-tab-${active.id}`}
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
            <p className="h-sub mt-3 max-w-3xl text-balance text-foreground">
              &ldquo;{pick(active.question, locale)}&rdquo;
            </p>

            <div className="mt-8 border-l-2 border-signal-cyan pl-4">
              <p className="mono-label">{pick(DECISIONS.providesLabel, locale)}</p>
              <p className="prose-measure mt-2 body-lead leading-relaxed text-foreground">
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

      <p className="prose-measure mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(DECISIONS.note, locale)}
      </p>
    </div>
  );
}
