"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { localePath, PATHS } from "@/components/shell/nav";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { DECISIONS } from "./content";

/**
 * PATTERN 7 — THE DECISION LEDGER, defense and government application.
 * `OXOT_Layout_Styles.md` §7, serving Foundation Deliverable 2.
 *
 * A ROW-PER-DECISION REGISTER, NOT A NOW/NEXT/NEVER BOARD. §7 records that the
 * three-column board reading was a contradiction in its own earlier wording and
 * does not exist: there are no NOW/NEXT/NEVER columns, only a status stamp, and
 * the rows are decisions. Four rows, each expanding inline.
 *
 * THE STAMPS RENDER WHERE THE SOURCE PUTS THEM, AND NOWHERE ELSE. §7 specifies a
 * rubber-stamp status chip per row; this page's source assigns no per-row
 * status. It uses NOW / NEXT / NEVER exactly once — as row 1's Twin OUTPUT
 * ("NOW / NEXT / NEVER priority based on mission effect, physical consequence,
 * reachability, recovery constraints, and dependency cascade", CORPUS L180) — so
 * the three stamps render inside that row's output pane at their full Foundation
 * Spec §3.1 treatment, and no row is given a fabricated status of its own. "What
 * should we spend?" has no NOW/NEXT/NEVER state; inventing one would be a
 * fabricated classification on a sovereignty page, which is the failure
 * `content.ts`'s own docblock spends its length guarding against. The same
 * resolution is already shipped on `rail-transportation-2`.
 *
 * ROW 1 IS OPEN FROM FIRST PAINT, so the stamps are on screen without an
 * interaction and the register does not open as four collapsed bars. Rows toggle
 * INDEPENDENTLY — unlike a tablist, a register lets several rows stand open for
 * comparison.
 *
 * EVERY STAMP CARRIES ITS WORD AND ITS OWN SHAPE, never colour alone — §7's hard
 * ban on bare checkmarks and unlabelled red/amber/green dots. The three are
 * separable in greyscale: NOW is a SOLID fill with an urgency glyph, NEXT is a
 * plain outline, NEVER is an outline with the word struck through. NOW is
 * `--signal-blue`, not amber: amber means proposed/pending, which is the wrong
 * meaning for a committed, active decision (Foundation Spec §3.1, resolved by
 * owner decision 2026-08-24 — a prior fix that glued an urgency glyph onto amber
 * was rejected for patching the symptom rather than the token).
 *
 * EXACTLY ONE PRIMARY CTA FOR THE WHOLE LEDGER, at the foot. The per-row "See
 * how this decision works" links inside expanded rows are quiet inline
 * navigation to four real, live routes — `content.ts` makes that routing
 * decision explicitly, so that none of the four dead-ends — and they are not
 * four repetitions of the primary offer.
 *
 * ITS LAYOUT IS NOT THE SIBLING PAGES'. `rail-transportation-2` draws its
 * register as a sticky three-column table because its source carries three cells
 * per row; this page carries two, so a third column would be an empty one. The
 * register here is a compact row list whose expanded panel splits into two panes
 * either side of A DASHED VERTICAL RULE — the page's own perimeter idiom from
 * `Rule.tsx`, standing between the question a department asks and what the model
 * returns. `manufacturing-process-2`'s tabbed switchboard is a different shape
 * again; none of the three is the others with the words swapped.
 *
 * NO `--signal-green` ANYWHERE, and none may be added: green means a modelled,
 * validated closure, and nothing in this section is closed. These are questions
 * a department is still holding.
 */

/* Section chrome, not sourced copy: `content.ts` carries no `datumLabel`, and is
   read-only here. It names the section, which is a real fact about the page. */
const DATUM_LABEL = same("Four decisions");
const REGISTER_CAPTION = same("Decision register — four rows, expand any row");
const METHOD_LABEL = same("See how this decision works");
const STAMPS_CAPTION = same("The triage this decision returns");

/** The ledger's one primary CTA. Routing furniture authored here — neither
 *  source names a destination for the section as a whole, and `/contact` is the
 *  page's single real enquiry mechanism (`content.ts`: no per-page form). */
const CTA = {
  label: same("Request the full decision register"),
  href: PATHS.contact
};

type StampTone = "now" | "next" | "never";

const STAMPS: Array<{ tone: StampTone; word: Bilingual }> = [
  { tone: "now", word: same("NOW") },
  { tone: "next", word: same("NEXT") },
  { tone: "never", word: same("NEVER") }
];

/**
 * NOW's solid stamp needs a dark word on a mid-light blue, and that ink must NOT
 * flip with the theme: `--signal-blue` is deliberately mid-light in both themes
 * (light `212 80% 56%`, dark `212 91% 61%`), so a dark word clears ~5.9:1 on
 * light and ~6.9:1 on dark while a white word would fail both. `--foreground`
 * and `--background` both invert, so neither can serve. This is the ink
 * globals.css names as the tuning reference the six signals were contrast-
 * balanced against, and is numerically the dark theme's own `--background`.
 */
const STAMP_INK = "hsl(220 15% 6%)";

const STAMP_STYLES: Record<StampTone, string> = {
  now: "border-signal-blue bg-signal-blue",
  next: "border-signal-amber text-foreground",
  never: "border-signal-slate text-muted-foreground line-through"
};

/** The urgency glyph — a double chevron, i.e. motion. NOW only, and only because
 *  it now sits on a token whose meaning is already "committed/active"; the glyph
 *  reinforces the state, it does not stand in for it. Decorative: the word "NOW"
 *  is beside it and carries the meaning on its own. */
function UrgencyGlyph() {
  return (
    <svg viewBox="0 0 10 10" width="8" height="8" aria-hidden="true" className="shrink-0">
      <path
        d="M1 1.5 4.2 5 1 8.5M5 1.5 8.2 5 5 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
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

export function DecisionLedger({
  locale,
  /* The section's ordinal on the page. A prop with a documented default rather
     than a hardcoded constant, because the page's final section order is
     assembled in the route file, not here. */
  index = "06",
  className
}: {
  locale: Locale;
  index?: string;
  className?: string;
}) {
  const { items } = DECISIONS;
  const [openIds, setOpenIds] = useState<string[]>([items[0].id]);

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  }

  return (
    <SectionA
      id="four-decisions"
      index={index}
      datumLabel={DATUM_LABEL}
      heading={DECISIONS.h2}
      locale={locale}
      className={className}
    >
      <p className="mono-label text-primary-ink">{pick(REGISTER_CAPTION, locale)}</p>

      <div className="mt-4 rounded-2xl border border-border bg-card">
        <ol className="list-none">
          {items.map((item, i) => {
            const open = openIds.includes(item.id);
            const panelId = `decision-panel-${item.id}`;
            /* The one row whose SOURCED output is the triage — matched on the
               row's own id, not on its position, so a reorder in the content
               module cannot silently move the stamps onto another decision. */
            const outputIsTriage = item.id === "fix-first";

            return (
              <li key={item.id} className={cn(i > 0 && "border-t border-border")}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-4 px-5 py-5 text-left sm:px-6",
                      "transition-colors duration-200 hover:bg-muted/40 motion-reduce:transition-none"
                    )}
                  >
                    <span className="mono-label shrink-0 text-primary-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 body-lead font-semibold leading-snug text-foreground">
                      {pick(item.name, locale)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-muted-foreground transition-transform duration-200",
                        "motion-reduce:transition-none",
                        open && "rotate-180"
                      )}
                    >
                      &#8964;
                    </span>
                  </button>
                </h3>

                {/* A grid-rows transition rather than a height animation: it
                    needs no measurement, and 200ms sits inside the Foundation
                    Spec's 160-280ms UI band, which §7's own motion note says
                    wins over the external 300ms accordion recommendation. */}
                <div
                  id={panelId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className={cn("overflow-hidden", !open && "invisible")}>
                    {/* TWO PANES EITHER SIDE OF THE PAGE'S OWN PERIMETER — the
                        question a department is holding, and what the model
                        returns. The dashed rule is `Rule.tsx`'s boundary idiom
                        turned vertical; `--border` only, never a signal token,
                        because a divider is chrome and not model state. */}
                    <div className="mx-5 mb-6 grid gap-6 sm:mx-6 lg:grid-cols-2 lg:gap-0">
                      {/* The column label is marked on BOTH panes, symmetrically:
                          it is a real content element naming what the pane holds,
                          and leaving it unmarked understated the sparser pane —
                          `measure.mjs` read the item counts as 1 vs 3 (0.33,
                          under its 0.50 floor) while the two heights were equal. */}
                      <div data-balance-group="decision-detail" className="lg:pr-8">
                        <p data-balance-item className="mono-label">
                          {pick(DECISIONS.questionLabel, locale)}
                        </p>
                        <p
                          data-balance-item
                          className="mt-2.5 body-copy leading-relaxed text-muted-foreground"
                        >
                          {pick(item.question, locale)}
                        </p>
                      </div>

                      <div
                        data-balance-group="decision-detail"
                        className="border-t border-dashed border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                      >
                        <p data-balance-item className="mono-label">
                          {pick(DECISIONS.providesLabel, locale)}
                        </p>
                        <p
                          data-balance-item
                          className="mt-2.5 body-copy leading-relaxed text-foreground"
                        >
                          {pick(item.provides, locale)}
                        </p>

                        {/* Only the row whose sourced output IS the triage. */}
                        {outputIsTriage && (
                          <div data-balance-item className="mt-5 border-t border-border pt-4">
                            <p className="mono-label">{pick(STAMPS_CAPTION, locale)}</p>
                            <div className="mt-2.5 flex flex-wrap items-center gap-2">
                              {STAMPS.map((stamp) => (
                                <Stamp
                                  key={stamp.tone}
                                  tone={stamp.tone}
                                  word={pick(stamp.word, locale)}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <p data-balance-item className="mt-5">
                          <Link
                            href={localePath(locale, item.href)}
                            className="text-[0.875rem] font-medium text-primary-ink underline-offset-4 hover:underline"
                          >
                            {pick(METHOD_LABEL, locale)}
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* THE SOURCE'S CLOSING NOTE IS DELIBERATELY NOT RENDERED. `DECISIONS.note`
          is BRIEF L125, an instruction addressed to whoever builds this page — it
          begins "The page should emphasize that…" — not copy addressed to a
          visitor. Printed, it had the site telling its own reader what the page
          ought to emphasize, in the third person, in the middle of the decision
          register. Found live by adversarial QA, 2026-08-27.

          Dropping it is the option `content.ts` itself names: its GAP note says
          "a renderer may legitimately drop this note rather than print a
          reconstructed sentence — that call belongs to the section owner." This
          is the section owner making that call. The alternative — stripping the
          directive prefix and keeping the remainder — was rejected because the
          source sentence is truncated mid-clause in the brief, so any rendering
          is a reconstruction, and reconstructing copy is authoring rather than
          transcribing. The strings stay exported and documented in `content.ts`;
          only the render is withdrawn. */}
      {/* THE LEDGER'S ONE PRIMARY CTA. */}
      <p className="mt-8">
        <Link
          href={localePath(locale, CTA.href)}
          className={cn(
            "inline-flex min-h-11 items-center rounded-md border border-primary-ink/40 px-5 py-2.5",
            "body-copy font-medium text-primary-ink transition-colors duration-200",
            "hover:border-primary-ink hover:bg-primary-ink/5 motion-reduce:transition-none"
          )}
        >
          {pick(CTA.label, locale)}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </p>
    </SectionA>
  );
}
