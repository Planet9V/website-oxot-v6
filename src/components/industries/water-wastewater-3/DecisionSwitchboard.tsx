"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import {
  DECISION_DESTINATIONS,
  DECISION_ITEMS,
  DECISION_PANEL_LABELS,
  DECISIONS_NOTE
} from "./content.decisions";
import { DECISIONS } from "./content";

/**
 * S06 · FOUNDATION DELIVERABLE 2 — the Four Decisions Switchboard, built to
 * `OXOT_Visual_Foundation_Spec.md` §6 rather than to a layout pattern, because
 * §6 is unusually prescriptive and every one of its five rules is checkable.
 *
 * A SWITCHBOARD, NOT FOUR EQUAL CARDS. §6 says that in those words, and
 * `OXOT_Visual_Rules.md` independently bars "more than three visually equal
 * cards" — four equal cards would fail both. What is rendered is a KEY COLUMN
 * (four labelled keys, each with an indicator lamp) driving ONE panel: the
 * literal shape of a switchboard, where the keys are small and identical by
 * design and the thing they select is the large element. The section's single
 * primary focal element is therefore the panel, not the keys, which is what
 * Visual_Rules asks for.
 *
 * ONE ACTIVE BY DEFAULT, NEVER FOUR EXPANDED. `useState(0)` — the first key is
 * live at first paint and exactly one panel exists in the DOM at any time.
 * There is no all-open state to reach, by construction rather than by rule.
 *
 * WHY A DEFAULT IS CORRECT HERE AND DECLINED IN S07. These are the four buyer
 * questions and all four always apply, so opening the first one pre-picks no
 * answer — it only opens a question. In the worked example a default control
 * WOULD assert an answer, against a source (`DOSING_RESULT`) whose own
 * conclusion is that the answer is a combination. The two sections differ on a
 * content fact, not on taste.
 *
 * REAL KEYBOARD OPERATION, not a mouse control with ARIA attributes bolted on.
 * `role="tablist"` with `aria-orientation="vertical"`, roving `tabIndex` (one
 * tab stop for the whole group, per WCAG 2.4.3 and the APG tabs pattern), and
 * Up/Down as the primary keys because the rail is vertical — Left/Right are
 * accepted too, since a reader who has met horizontal tabs elsewhere on this
 * site will reach for them. Home/End jump to the ends. Every key clears the
 * 44px target floor (`min-h-11` plus padding).
 *
 * TOKENS, per §6's own colour rule: AMBER is the selected/proposed decision
 * state (the key's lamp and border, the panel's border, the output rail).
 * CYAN is the evidence/model state (the evidence and model-action rails).
 * GREEN APPEARS NOWHERE IN THIS SECTION — §6 permits it only for a modelled
 * closure, and nothing here is one: these are four open questions, not four
 * resolved ones. Slate carries the roles line, which is supporting context.
 * `--brand-orange` appears nowhere; the amber is `--signal-amber` through
 * `border-signal-amber`, which §3.1's identity-vs-signal rule requires.
 *
 * NOT A `data-balance-group`, AND THAT IS A DECISION RATHER THAN AN OMISSION.
 * `scripts/measure.mjs` relates the RENDERED HEIGHTS of siblings meant to say
 * comparable amounts. The key rail and the panel are not that relationship: a
 * key is a label plus a lamp and is SUPPOSED to be short, so relating its
 * height to the panel it opens would assert a comparison the layout never
 * makes and would fail a control that is working correctly.
 * `OXOT_Composition_Rules.md`'s floor names "hero copy/diagram panes, bento
 * cells, ledger columns" — sibling CONTENT panes. This is a nav-shaped key row
 * driving a single pane, so the group is left off deliberately. The worked
 * example's three columns below ARE sibling content panes and ARE marked; the
 * difference is stated in both files rather than left to be inferred.
 *
 * MOTION: a ~200ms crossfade on panel change, inside §3.4's 160-280ms UI band
 * (the 300-500ms tier is for diagrams; this is not one), and disabled outright
 * under `prefers-reduced-motion` rather than merely shortened.
 */
/* NO `focus-visible:ring-*` HERE, DELIBERATELY. globals.css already sets a
   working global `:focus-visible { box-shadow: 0 0 0 1px hsl(var(--ring)) }`.
   Tailwind's ring utilities write their own `box-shadow` scaffold, which
   OVERRIDES that rule with transparent values — measured: `:focus-visible`
   matched while the computed box-shadow was fully transparent and the
   outline was `none`, i.e. no visible focus indicator at all (WCAG 2.4.7).
   Adding ring classes here breaks a ring that already works. */

export function DecisionSwitchboard({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const keyRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const active = DECISION_ITEMS[selected];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = DECISION_ITEMS.length - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setSelected(next);
    keyRefs.current[next]?.focus();
  }

  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="decisions">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        06 · {pick(DECISIONS.datum, locale)}
      </p>
      <h2 className="mt-4 h-section text-balance text-foreground">{pick(DECISIONS.h2, locale)}</h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
        {/* ── The key column ───────────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <p className="mono-label" id="ww3-decision-keys-label">
            {pick(DECISION_PANEL_LABELS.keys, locale)}
          </p>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby="ww3-decision-keys-label"
            className="mt-3 flex flex-col gap-2"
          >
            {DECISION_ITEMS.map((item, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    keyRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`ww3-decision-key-${item.id}`}
                  aria-selected={isSelected}
                  aria-controls="ww3-decision-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors duration-200",
                    isSelected
                      ? "border-signal-amber bg-signal-amber/10"
                      : "border-border bg-card hover:border-signal-amber/50"
                  )}
                >
                  {/* The indicator lamp. A rectangle, not a dot: this is a
                      panel key, and a bare round light is exactly the
                      unlabelled-status idiom the Decision Ledger pattern
                      bans outright. It is never the only signal — the key's
                      border, its label weight and `aria-selected` all carry
                      the same state. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-6 w-1.5 shrink-0 rounded-sm transition-colors duration-200",
                      isSelected ? "bg-signal-amber" : "bg-border"
                    )}
                  />
                  <span className="min-w-0">
                    <span className="mono-label block">D{i + 1}</span>
                    <span
                      className={cn(
                        "mt-0.5 block body-copy font-semibold leading-snug",
                        isSelected ? "text-foreground" : "text-foreground/80"
                      )}
                    >
                      {pick(item.name, locale)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── The one panel the keys drive ─────────────────────────────── */}
        <div
          role="tabpanel"
          id="ww3-decision-panel"
          aria-labelledby={`ww3-decision-key-${active.id}`}
          tabIndex={0}
          className="rounded-2xl border border-signal-amber/60 bg-card p-5 sm:p-7 lg:col-span-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              <p className="mono-label">{pick(DECISION_PANEL_LABELS.question, locale)}</p>
              <p className="h-sub mt-3 text-balance text-foreground">
                &ldquo;{pick(active.question, locale)}&rdquo;
              </p>

              {/* Cyan is the evidence/model state, per §6's own colour rule. */}
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Step accent="cyan" body={active.evidence} label={DECISION_PANEL_LABELS.evidence} locale={locale} />
                <Step
                  accent="cyan"
                  body={active.modelAction}
                  label={DECISION_PANEL_LABELS.modelAction}
                  locale={locale}
                />
              </div>

              {/* Amber is the proposed/decision state. Never green: nothing on
                  this surface is a modelled closure. */}
              <div className="mt-5">
                <Step accent="amber" body={active.output} label={DECISION_PANEL_LABELS.output} locale={locale} />
              </div>

              <div className="mt-5">
                {/* The roles field's provenance is recorded in
                    content.decisions.ts, NOT printed here: a note explaining
                    how this page sourced its own copy is build-spec narration
                    aimed at a reviewer, and an independent critique of the
                    previous iteration found exactly that leaking into
                    customer-facing copy. */}
                <Step accent="slate" body={active.roles} label={DECISION_PANEL_LABELS.roles} locale={locale} />
              </div>

              <Link
                href={localePath(locale, DECISION_DESTINATIONS[active.destination])}
                className="mono-label mt-7 inline-flex min-h-11 items-center gap-2 text-primary-ink underline-offset-4 hover:underline"
              >
                {pick(DECISION_PANEL_LABELS.cta, locale)}: {pick(active.name, locale)}
                <span aria-hidden="true">&#8594;</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* No `prose-measure` (removed 2026-08-25, systemic audit) — see
          Capabilities.tsx's identical fix for the reasoning. */}
      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(DECISIONS_NOTE, locale)}
      </p>
    </section>
  );
}

const ACCENT_RAIL = {
  cyan: "border-signal-cyan",
  amber: "border-signal-amber",
  slate: "border-signal-slate"
} as const;

/** One step of §6's panel flow: a technical label over its sentence, on a
 *  coloured rail carrying that step's semantic state. The rail is never the
 *  only signal — the label above it names the step in words. */
function Step({
  accent,
  body,
  label,
  locale
}: {
  accent: keyof typeof ACCENT_RAIL;
  body: Bilingual;
  label: Bilingual;
  locale: Locale;
}) {
  return (
    <div className={cn("border-l-2 pl-4", ACCENT_RAIL[accent])}>
      <p className="mono-label">{pick(label, locale)}</p>
      <p className="mt-1.5 body-copy leading-relaxed text-foreground">{pick(body, locale)}</p>
    </div>
  );
}
