"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { localePath } from "@/components/shell/nav";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { DECISIONS, type StampTone } from "./content.decisions";

/**
 * S07 · FOUR RAIL DECISIONS — `OXOT_Layout_Styles.md` Pattern 7, Decision
 * Ledger. That pattern is this component's visual contract.
 *
 * A DECISION REGISTER, NOT A PRICING GRID AND NOT A SWITCHBOARD. Pattern 7 is
 * explicit that this is modelled on an actual engineering decision register:
 * row per decision, a sticky column header naming what each column holds, and
 * rows that expand in place to show supporting detail. It is a DIFFERENT spec
 * from Foundation Deliverable 2's Four Decisions Switchboard (built on the
 * energy and manufacturing pages as `DecisionSwitchboard.tsx`), and the two
 * must not be conflated — a switchboard engages exactly one throw against one
 * shared readout, which would be the wrong shape here because a register's
 * whole point is that every row is legible at once.
 *
 * ONE DECISION SET, READ TWICE. The source table (L232–237) gives each row a
 * passenger-transit phrasing AND a freight-rail phrasing, so both sit in the
 * row, side by side, ALWAYS VISIBLE — never behind the disclosure. Two things
 * follow from that:
 *   · The dual-track claim is this page's central structural demand (L3, L169).
 *     Hiding half of it behind a click would make the page's own thesis
 *     conditional on interaction.
 *   · What the disclosure carries instead is the row's fourth column — what the
 *     Twin returns — which is genuinely supporting detail: the model's output
 *     for a decision you have already read.
 *
 * PASSENGER AND FREIGHT ARE NOT COLOUR-CODED, and no `--signal-*` token
 * separates them. The six signals encode model/decision STATE; passenger vs
 * freight is an audience split, and spending a semantic token on it would
 * repurpose state colour as categorisation — the same trap `Rule.tsx` names for
 * the railway-signal/OXOT-signal name collision. The two columns are told apart
 * by their mono label and their position, which is how a real register does it.
 *
 * THE STAMPS RENDER WHERE THE SOURCE PUTS THEM, AND NOWHERE ELSE. Pattern 7
 * specifies a rubber-stamp status chip per row; the source assigns no per-row
 * status. It uses NOW / NEXT / NEVER exactly once — as row 1's Twin OUTPUT
 * (L234), the triage the model returns per pathway. So the three stamps render
 * inside that row's output panel with their full Foundation Spec §3.1
 * treatment, and no row is given a fabricated status of its own. See
 * `content.decisions.ts` for the full reasoning; the short version is that
 * "What should we spend?" has no NOW/NEXT/NEVER state, and inventing one would
 * be a fabricated classification.
 *
 * EVERY STAMP CARRIES ITS WORD AND ITS OWN SHAPE, never colour alone — Pattern
 * 7's hard ban on bare checkmarks and unlabelled coloured dots. The three are
 * separable in greyscale: NOW is a solid fill with an urgency glyph, NEXT is a
 * plain outline, NEVER is an outline with the word struck through.
 *
 * EXACTLY ONE PRIMARY CTA FOR THE WHOLE LEDGER, at the foot — Pattern 7's other
 * hard rule. The per-row "Read the decision method" links inside expanded rows
 * are quiet inline navigation to an existing route, not four repetitions of the
 * primary offer.
 */

/* Section chrome, not sourced copy: the section's short name on the running
   block rule. It names the section, which is a real fact about the page. */
const DATUM_LABEL = same("Four rail decisions");

/* The first column's header. The source's table (L232) heads that column "OXOT
   decision"; this is that heading, not a coinage. */
const DECISION_COLUMN = same("OXOT decision");

/**
 * NOW's solid stamp needs a dark word on a mid-light blue, and that ink must
 * NOT flip with the theme: `--signal-blue` is deliberately mid-light in both
 * themes (light `212 80% 56%`, dark `212 91% 61%`), so a dark word clears
 * 5.9:1 on light and 6.9:1 on dark while a white word would fail both
 * (3.56:1 / 3.05:1). `--foreground` and `--background` both invert, so neither
 * can serve. This is the ink globals.css names as the tuning reference the six
 * signals were contrast-balanced against ("--ink-900", lines 83 and 144) and is
 * numerically the dark theme's own `--background`.
 */
const STAMP_INK = "hsl(220 15% 6%)";

/** Foundation Spec §3.1's mapping, and the shape that carries it in greyscale. */
const STAMP_STYLES: Record<StampTone, string> = {
  now: "border-signal-blue bg-signal-blue",
  next: "border-signal-amber text-foreground",
  never: "border-signal-slate text-muted-foreground line-through"
};

/** The urgency glyph. NOW only, and only because it now sits on a token whose
 *  meaning is already "committed/active" — the glyph reinforces the state, it
 *  does not stand in for it (§3.1's own account of why the earlier amber-plus-
 *  glyph fix was rejected). Decorative: the word "NOW" is beside it. */
function UrgencyGlyph() {
  return (
    <svg viewBox="0 0 8 10" width="7" height="9" aria-hidden="true" className="shrink-0">
      <path d="M4 0.5v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="4" cy="8.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

function Stamp({ tone, word }: { tone: StampTone; word: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-[3px]",
        "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
        STAMP_STYLES[tone]
      )}
      style={tone === "now" ? { color: STAMP_INK } : undefined}
    >
      {tone === "now" && <UrgencyGlyph />}
      {word}
    </span>
  );
}

export function DecisionLedger({ locale }: { locale: Locale }) {
  /* Row 1 is open from first paint. A register that opens with four collapsed
     bars reads as an empty state, and the same regression has already shipped
     on this site once (see energy-utilities-2/DecisionSwitchboard.tsx's note on
     a null initial selection). Seeded from the data, so there is no empty state
     to fall into. Rows toggle INDEPENDENTLY — unlike a tablist, a register lets
     you hold several rows open to compare them. */
  const [openIds, setOpenIds] = useState<string[]>([DECISIONS.items[0].id]);

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  }

  return (
    <SectionA
      id="four-rail-decisions"
      index="07"
      datumLabel={DATUM_LABEL}
      heading={DECISIONS.h2}
      locale={locale}
    >
      {/* No `overflow-hidden` on this container, deliberately: it would break
          the sticky column header below, and there is nothing to clip. */}
      <div className="rounded-2xl border border-border bg-card">
        {/* THE STICKY COLUMN HEADER (Pattern 7). `top-24` clears the site
            header — `sticky top-0` at `h-16`/64px — with 32px to spare, the
            same offset the Capabilities sections on the sibling pages use.
            Desktop only: below `lg` the row is stacked, so each cell carries
            its own label inline and a column header would be describing a
            layout that isn't on screen. */}
        <div className="sticky top-24 z-10 hidden rounded-t-2xl border-b border-border bg-card px-6 py-3.5 lg:grid lg:grid-cols-12 lg:gap-8">
          <p className="mono-label lg:col-span-4">{pick(DECISION_COLUMN, locale)}</p>
          <p className="mono-label lg:col-span-4">{pick(DECISIONS.passengerLabel, locale)}</p>
          <p className="mono-label lg:col-span-4">{pick(DECISIONS.freightLabel, locale)}</p>
        </div>

        <ul className="list-none">
          {DECISIONS.items.map((item, i) => {
            const open = openIds.includes(item.id);
            const panelId = `decision-panel-${item.id}`;

            return (
              <li key={item.id} className={cn(i > 0 && "border-t border-border")}>
                {/* The row proper: the decision, then the same decision in each
                    operator's language. All three always on screen. */}
                <div className="grid gap-6 px-6 pb-5 pt-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-4">
                    <span className="mono-label text-primary-ink">{item.index}</span>
                    <h3 className="mt-2 body-lead font-semibold leading-snug text-foreground">
                      {pick(item.name, locale)}
                    </h3>
                  </div>

                  <div className="border-l border-border pl-4 lg:col-span-4">
                    <p className="mono-label lg:hidden">{pick(DECISIONS.passengerLabel, locale)}</p>
                    <p className="body-copy leading-relaxed text-muted-foreground max-lg:mt-2">
                      {pick(item.passenger, locale)}
                    </p>
                  </div>

                  <div className="border-l border-border pl-4 lg:col-span-4">
                    <p className="mono-label lg:hidden">{pick(DECISIONS.freightLabel, locale)}</p>
                    <p className="body-copy leading-relaxed text-muted-foreground max-lg:mt-2">
                      {pick(item.freight, locale)}
                    </p>
                  </div>
                </div>

                {/* The disclosure. A native button gives Enter/Space and the
                    aria-expanded/aria-controls pairing for free — the pattern
                    already in use at cdt2/Cdt2Services.tsx. */}
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-2.5 px-6 pb-5 text-left",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-[0.8125rem] leading-none text-muted-foreground transition-transform duration-200",
                      "motion-reduce:transition-none",
                      open && "rotate-45"
                    )}
                  >
                    +
                  </span>
                  <span className="mono-label text-primary-ink">
                    {pick(DECISIONS.toggleLabel, locale)} {pick(item.name, locale)}
                  </span>
                </button>

                {/* Row-expand at 200ms — inside the Foundation Spec's 160-280ms
                    UI band, which `OXOT_Layout_Styles.md` states wins over the
                    external ~300ms accordion recommendation. `invisible` while
                    collapsed keeps the panel out of the accessibility tree and
                    its link out of the tab order, which a bare `overflow-hidden`
                    would not. */}
                <div
                  id={panelId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className={cn("overflow-hidden", !open && "invisible")}>
                    <div className="mx-6 mb-6 rounded-xl border border-border bg-muted/40 p-5">
                      <p className="mono-label">{pick(DECISIONS.providesLabel, locale)}</p>
                      <p className="mt-2.5 body-copy leading-relaxed text-foreground">
                        {pick(item.provides, locale)}
                      </p>

                      {/* Only the row whose sourced output IS the triage. */}
                      {item.outputIsTriage && (
                        <div className="mt-5 border-t border-border pt-4">
                          <p className="mono-label">{pick(DECISIONS.stampsCaption, locale)}</p>
                          <div className="mt-2.5 flex flex-wrap items-center gap-2">
                            {DECISIONS.stamps.map((stamp) => (
                              <Stamp key={stamp.tone} tone={stamp.tone} word={pick(stamp.word, locale)} />
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="mt-5">
                        <Link
                          href={localePath(locale, item.href)}
                          className="text-[0.875rem] font-medium text-primary-ink underline-offset-4 hover:underline"
                        >
                          {pick(DECISIONS.methodLabel, locale)}
                          <span aria-hidden="true"> &rarr;</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-10 body-lead leading-relaxed text-muted-foreground">
        {pick(DECISIONS.closing, locale)}
      </p>
      <p className="mt-4 body-lead leading-relaxed text-muted-foreground">
        {pick(DECISIONS.closingBasis, locale)}
      </p>

      {/* THE LEDGER'S ONE PRIMARY CTA. */}
      <p className="mt-8">
        <Link
          href={localePath(locale, DECISIONS.cta.href)}
          className={cn(
            "inline-flex min-h-11 items-center rounded-md border border-primary-ink/40 px-5 py-2.5",
            "body-copy font-medium text-primary-ink transition-colors duration-200",
            "hover:border-primary-ink hover:bg-primary-ink/5",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "motion-reduce:transition-none"
          )}
        >
          {pick(DECISIONS.cta.label, locale)}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </p>
    </SectionA>
  );
}
