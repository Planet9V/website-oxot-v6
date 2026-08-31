"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import type { SystemPath } from "@/components/twin/types";
import { CLAIM_BOUNDARY } from "./content";
import { DOSING_ASSETS, DOSING_PATHS, WORKED_EXAMPLE } from "./content.workedExample";
import { DosingCanvas } from "./DosingCanvas";

/**
 * S06 · PATTERN 2 — THE THREE-GATE LEDGER, and the section where iteration 1
 * failed hardest. Three defects are fixed here by construction:
 *
 * 1 · COLUMN ORDER. Pattern 2 requires a STRICT inequality
 *     span(Baseline) > span(Proposed control) > span(Decision output).
 *     `-1` shipped 4 / 5 / 3 — middle column widest, the inequality inverted —
 *     under a code comment reading "Unequal by construction, not by accident."
 *     Pattern 2 says explicitly: do not accept such a comment as evidence.
 *     This renders `lg:col-span-5` / `lg:col-span-4` / `lg:col-span-3`.
 *     5 > 4 > 3, summing to 12. Check the three numbers, not the widths.
 *
 * 2 · FIRST-PAINT DENSITY. `-1` used `useState<number | null>(null)`, so on
 *     first paint its Proposed-control column was three bare option buttons
 *     beside two fully-populated siblings. Here the column carries mandatory
 *     FIXED SUPPORTING COPY (`controls.fixed`) that is present regardless of
 *     selection — what a proposed control is, how residual exposure is
 *     computed, what the crosshair means — which is Pattern 2's remedy (b).
 *     Remedy (a), pre-selecting the first candidate, is DECLINED with a content
 *     reason: the source's own Result message concludes the answer is a
 *     COMBINATION of measures, so a forced default would misrepresent the
 *     source's conclusion. The shared canvas still renders the baseline route
 *     set at first paint, so nothing is blank.
 *
 * 3 · ONE SHARED VISUAL. The canvas sits ABOVE all three columns and no column
 *     owns a visual of its own — which is what the pattern specifies and what
 *     makes the three gates readings OF something rather than three panels.
 *
 * SIBLING-BALANCE FLOOR. `data-balance-group="worked-example-gates"` marks each
 * column's INNER content wrapper, never the stretched grid cell (the cards take
 * `h-full`, so measuring the cell would measure the tallest column three
 * times). Site-wide 2x floor: shortest ≥ 50% of tallest, on both height and
 * content-element count, worse governing, in the DEFAULT pre-interaction state.
 * Target counts:
 *   · Baseline (5):         caption + entry + intermediate + target + 6 chain
 *                           steps + constraints = 11
 *   · Proposed control (4): caption + 5 control buttons + 3 fixed-copy blocks
 *                           = 9
 *   · Decision output (3):  caption + 4 recommended items + 3 evidence
 *                           categories + validation + not-asserted = 10
 * MEASURED, off `scripts/measure.mjs`, at both 1440×900 and 2560×1440:
 *   · counts [11, 9, 10] → n = 9/11 = 0.82
 *   · heights [643, 761, 802] → h = 643/802 = 0.80.
 * UPDATED 2026-08-25: heights were [643, 761, 1225] (h=0.52) before this date —
 * technically clearing the 0.50 floor, but Decision-output was simultaneously
 * the NARROWEST column (span-3, smallest of the mandated 5>4>3) and the
 * TALLEST, a real visual defect (a long, thin, dense strip) the height-ratio
 * floor alone did not capture. The owner flagged it directly and named it a
 * candidate for "a different component." Fixed WITHOUT touching Pattern 2's
 * span ordering: the three evidence categories (each one long
 * semicolon-joined sentence) now render as collapsed-by-default `<details>`
 * disclosures instead of an always-open `<dl>` — the DEFAULT pre-interaction
 * state this harness measures is now the category names alone, with the full
 * text one tap away. 802px still isn't the shortest of the three, honestly:
 * Decision-output still carries real content (4 recommended items + 3
 * category names + validation + not-asserted) that the other two columns
 * don't, so it settles just above Proposed control rather than matching
 * Baseline exactly — which is a legitimate content difference, not chrome.
 *
 * TOKENS: slate for the baseline record, amber for the proposed control, green
 * ONLY where the modelled result actually closes a route — which is exactly
 * what `PathEdge` does with `status: "closed"`, so the rule is enforced by the
 * shared renderer rather than restated here.
 *
 * HONEST GAP, KEPT FROM `-1` BECAUSE IT WAS RIGHT: implementation window and
 * responsible role are not stated by the source, so they are declared NOT
 * ASSERTED rather than invented. A fabricated implementation window on a page
 * arguing that evidence is traceable would be worse than an honest gap.
 *
 * NO DRAG INTERACTION ANYWHERE. Every control is a button.
 */
export function ThreeGateLedger({ locale }: { locale: Locale }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const control = WORKED_EXAMPLE.controls.items.find((c) => c.id === selectedId) ?? null;

  /** The route set the canvas draws. With no control selected this is the
   *  baseline — every route `open` — never an empty frame. */
  const paths: SystemPath[] = useMemo(() => {
    if (!control) return DOSING_PATHS;
    return DOSING_PATHS.map((path) => {
      if (control.closes.includes(path.id)) return { ...path, status: "closed" as const };
      if (control.preserves.includes(path.id)) return { ...path, status: "controlled" as const };
      return path;
    });
  }, [control]);

  /** The discrepancy list: every node whose state differs from the baseline
   *  under the selected control. Real and enumerated, not a count. */
  const discrepancies = useMemo(() => {
    if (!control) return [] as Array<{ assetId: string; label: string; note: string }>;
    const byId = new Map(DOSING_ASSETS.map((a) => [a.id, a]));
    const rows: Array<{ assetId: string; label: string; note: string }> = [];
    for (const id of control.marks) {
      const asset = byId.get(id);
      if (asset) rows.push({ assetId: id, label: asset.label, note: pick(WORKED_EXAMPLE.controls.label, locale) });
    }
    for (const edgeId of control.closes) {
      const edge = DOSING_PATHS.find((p) => p.id === edgeId);
      const target = edge && byId.get(edge.to);
      if (edge && target) {
        rows.push({ assetId: edge.to, label: target.label, note: pick(WORKED_EXAMPLE.controls.closesLabel, locale) });
      }
    }
    for (const edgeId of control.preserves) {
      const edge = DOSING_PATHS.find((p) => p.id === edgeId);
      const target = edge && byId.get(edge.to);
      if (edge && target) {
        rows.push({
          assetId: edge.to,
          label: target.label,
          note: pick(WORKED_EXAMPLE.controls.preservesLabel, locale)
        });
      }
    }
    return rows;
  }, [control, locale]);

  const routeLabel = (id: string) => {
    const edge = DOSING_PATHS.find((p) => p.id === id);
    if (!edge) return id;
    const from = DOSING_ASSETS.find((a) => a.id === edge.from)?.label ?? edge.from;
    const to = DOSING_ASSETS.find((a) => a.id === edge.to)?.label ?? edge.to;
    return `${from} → ${to}`;
  };

  return (
    <div>
      {/* Claim boundary at the head of the section, always visible — Pattern 2
          requires it on its own surface, not once at the top of the page. */}
      <p className="mono-label inline-flex rounded-full border border-border px-2.5 py-1">
        {pick(CLAIM_BOUNDARY, locale)}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <p className="prose-measure body-lead leading-relaxed text-muted-foreground lg:col-span-6">
          {pick(WORKED_EXAMPLE.scenarioOne, locale)}
        </p>
        <p className="prose-measure body-lead leading-relaxed text-muted-foreground lg:col-span-6">
          {pick(WORKED_EXAMPLE.scenarioTwo, locale)}
        </p>
      </div>

      {/* ── The one shared canvas, above all three gates ─────────────────── */}
      <div className="mt-10">
        <DosingCanvas
          assets={DOSING_ASSETS}
          paths={paths}
          marks={control?.marks ?? []}
          highlightId={highlightId}
          title={pick(WORKED_EXAMPLE.canvasTitle, locale)}
          locale={locale}
        />

        {discrepancies.length > 0 && (
          <div className="mt-4 rounded-xl border border-signal-amber/60 bg-card p-4">
            <p className="mono-label">{pick(WORKED_EXAMPLE.discrepancyLabel, locale)}</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {pick(WORKED_EXAMPLE.discrepancyHint, locale)}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {discrepancies.map((row, i) => (
                <li key={`${row.assetId}-${i}`}>
                  <button
                    type="button"
                    onClick={() => setHighlightId(row.assetId)}
                    onFocus={() => setHighlightId(row.assetId)}
                    className={cn(
                      "min-h-11 rounded-lg border px-3 py-2 text-left text-[0.8125rem] leading-snug transition-colors",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      highlightId === row.assetId
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <span className="font-medium text-foreground">{row.label}</span>
                    <span className="mono-label ml-2">{row.note}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── The three gates. 5 > 4 > 3. ──────────────────────────────────── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Gate 1 — Baseline, lg:col-span-5 (widest) */}
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-border border-l-2 border-l-signal-slate bg-card p-5 sm:p-6">
            <div data-balance-group="worked-example-gates">
              <p data-balance-item className="mono-label text-foreground">
                {pick(WORKED_EXAMPLE.baseline.label, locale)} — {pick(WORKED_EXAMPLE.baseline.caption, locale)}
              </p>

              <Field
                label={pick(WORKED_EXAMPLE.baseline.entryLabel, locale)}
                value={pick(WORKED_EXAMPLE.baseline.entry, locale)}
              />
              <Field
                label={pick(WORKED_EXAMPLE.baseline.intermediateLabel, locale)}
                value={pick(WORKED_EXAMPLE.baseline.intermediate, locale)}
              />
              <Field
                label={pick(WORKED_EXAMPLE.baseline.targetLabel, locale)}
                value={pick(WORKED_EXAMPLE.baseline.target, locale)}
              />

              <p className="mono-label mt-5">{pick(WORKED_EXAMPLE.baseline.chainLabel, locale)}</p>
              <ol className="mt-2 space-y-2">
                {WORKED_EXAMPLE.baseline.chain.map((step, i) => (
                  <li
                    key={i}
                    data-balance-item
                    className="border-l-2 border-border pl-3 text-[0.875rem] leading-relaxed text-muted-foreground"
                  >
                    {pick(step, locale)}
                  </li>
                ))}
              </ol>

              <Field
                label={pick(WORKED_EXAMPLE.baseline.constraintLabel, locale)}
                value={pick(WORKED_EXAMPLE.baseline.constraint, locale)}
              />
            </div>
          </div>
        </div>

        {/* Gate 2 — Proposed control, lg:col-span-4 */}
        <div className="lg:col-span-4">
          <div className="h-full rounded-2xl border border-border border-l-2 border-l-signal-amber bg-card p-5 sm:p-6">
            <div data-balance-group="worked-example-gates">
              <p data-balance-item className="mono-label text-foreground">
                {pick(WORKED_EXAMPLE.controls.label, locale)} — {pick(WORKED_EXAMPLE.controls.caption, locale)}
              </p>

              <div role="radiogroup" aria-label={pick(WORKED_EXAMPLE.controls.label, locale)} className="mt-4 space-y-2">
                {WORKED_EXAMPLE.controls.items.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      data-balance-item
                      onClick={() => {
                        setSelectedId(isSelected ? null : item.id);
                        setHighlightId(null);
                      }}
                      className={cn(
                        "flex min-h-11 w-full items-start gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        isSelected
                          ? "border-signal-amber bg-signal-amber/10"
                          : "border-border bg-muted/30 hover:border-signal-amber/50"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1 h-4 w-0.5 shrink-0 rounded-full",
                          isSelected ? "bg-signal-amber" : "bg-border"
                        )}
                      />
                      <span className="body-copy font-medium leading-snug text-foreground">
                        {pick(item.option, locale)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Pattern 2 remedy (b), MANDATORY: present at first paint,
                  independent of selection, sized to hold the column on its own.
                  A column that is bare chrome until a user acts fails the
                  pattern regardless of its width. */}
              <dl className="mt-6 space-y-4">
                {WORKED_EXAMPLE.controls.fixed.map((entry, i) => (
                  <div key={i} data-balance-item className="border-t border-border pt-3">
                    <dt className="mono-label">{pick(entry.term, locale)}</dt>
                    <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                      {pick(entry.body, locale)}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Selection-dependent detail sits BELOW the fixed copy, so it
                  adds to a column that already stood up on its own. */}
              {control && (
                <div className="mt-6 border-t border-signal-amber/50 pt-4">
                  <p className="mono-label">{pick(WORKED_EXAMPLE.controls.testsLabel, locale)}</p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">{pick(control.tests, locale)}</p>
                  <p className="mono-label mt-4">{pick(WORKED_EXAMPLE.controls.insightLabel, locale)}</p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">
                    {pick(control.insight, locale)}
                  </p>
                  <p className="mono-label mt-4">{pick(WORKED_EXAMPLE.controls.residualLabel, locale)}</p>
                  <ul className="mt-1.5 space-y-1">
                    {control.residual.length === 0 ? (
                      <li className="text-[0.875rem] leading-relaxed text-muted-foreground">
                        {pick(WORKED_EXAMPLE.controls.noneLabel, locale)}
                      </li>
                    ) : (
                      control.residual.map((id) => (
                        <li key={id} className="text-[0.875rem] leading-relaxed text-muted-foreground">
                          {routeLabel(id)}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gate 3 — Decision output, lg:col-span-3 (narrowest) */}
        <div className="lg:col-span-3">
          <div className="h-full rounded-2xl border border-border border-l-2 border-l-primary bg-card p-5 sm:p-6">
            <div data-balance-group="worked-example-gates">
              <p data-balance-item className="mono-label text-foreground">
                {pick(WORKED_EXAMPLE.output.label, locale)} — {pick(WORKED_EXAMPLE.output.caption, locale)}
              </p>

              <p className="mono-label mt-5">{pick(WORKED_EXAMPLE.output.recommendedLabel, locale)}</p>
              <ol className="mt-2 space-y-2">
                {WORKED_EXAMPLE.output.recommended.map((step, i) => (
                  <li
                    key={i}
                    data-balance-item
                    className="border-l-2 border-primary/50 pl-3 text-[0.875rem] leading-relaxed text-foreground"
                  >
                    {pick(step, locale)}
                  </li>
                ))}
              </ol>

              {/* Three DISCLOSURES, not an always-open <dl> (changed
                  2026-08-25): each category's `items` is one long
                  semicolon-joined sentence, and at this column's mandated
                  span-3 width (the narrowest of the three, by Pattern 2's own
                  5>4>3 rule) three of those stacked open is what made this
                  column both the narrowest AND the tallest — height 1225px
                  against Baseline's 643px, a real visual defect even though
                  the numeric balance floor (0.52) technically cleared 0.50.
                  The owner named this column a candidate for "a different
                  component"; the fix keeps Pattern 2's span ordering intact
                  (changing it would contradict an already-validated rule) and
                  instead shortens the DEFAULT pre-interaction state, which is
                  what the balance harness measures — collapsed by default,
                  the category name alone is what a reader sees first, same
                  as the always-visible caption/recommended/validation
                  content; the full evidence text is one tap away. */}
              <p className="mono-label mt-5">{pick(WORKED_EXAMPLE.output.evidenceLabel, locale)}</p>
              <div className="mt-2">
                {WORKED_EXAMPLE.output.evidence.map((entry, i) => (
                  <details key={i} data-balance-item className="group border-t border-border py-2 first:border-t-0 first:pt-0">
                    <summary
                      className={cn(
                        "flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-1",
                        "text-[0.875rem] font-semibold leading-snug text-foreground",
                        "[&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      )}
                    >
                      {pick(entry.category, locale)}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                      >
                        &#8964;
                      </span>
                    </summary>
                    <p className="mt-1 pb-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {pick(entry.items, locale)}
                    </p>
                  </details>
                ))}
              </div>

              <Field
                label={pick(WORKED_EXAMPLE.output.validationLabel, locale)}
                value={pick(WORKED_EXAMPLE.output.validation, locale)}
              />
              <Field
                label={pick(WORKED_EXAMPLE.output.omissionLabel, locale)}
                value={pick(WORKED_EXAMPLE.output.omission, locale)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* No `prose-measure` (removed 2026-08-25) — see DecisionSwitchboard.tsx's
          identical fix for the reasoning. */}
      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(WORKED_EXAMPLE.output.citation, locale)}
      </p>
    </div>
  );
}

/** One labelled field. Marked as a single content element, because that is what
 *  a reader counts: a label and the sentence it introduces are one thing. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div data-balance-item className="mt-5">
      <p className="mono-label">{label}</p>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}
