"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { assetGlyph, CriticalityMark } from "@/components/twin/AssetNode";
import { PathEdge, PathEdgeMarkerDefs } from "@/components/twin/PathEdge";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { DOSING_PATHS, DOSING_RESULT, DOSING_SCENARIO, type ProposedControl } from "./content.scenario";
import {
  assetLabel, BASELINE, CANVAS, CANVAS_ASSETS, CONTROLS, EVIDENCE_GROUPS, INTERMEDIATE_IDS,
  NODE_H, NODE_POS, NODE_TEXT_W, NODE_W, OUTPUT, ROUTE_POINTS, routeLabel, SCENARIO_PROSE,
  STATUS_SWATCH, VIEWBOX, wrapLabel
} from "./content.workedExample";
import { WORKED_EXAMPLE } from "./content";

/**
 * S07 · PATTERN 2 — THE THREE-GATE LEDGER. Three defects the pattern names as
 * live in an earlier iteration are designed out here, not fixed afterwards.
 *
 * 1 · COLUMN WIDTH IS A CHECKABLE INEQUALITY, span(Baseline) > span(Proposed
 *     control) > span(Decision output). `GATE_SPAN` renders 5 / 4 / 3, summing
 *     to 12, and measured 466 / 368 / 270px at 1440. Pattern 2 is explicit
 *     that a comment merely ASSERTING asymmetry is not evidence of it — that
 *     is the comment the original defect shipped under.
 * 2 · THE PROPOSED-CONTROL COLUMN STANDS UP BEFORE ANYONE TOUCHES IT.
 *     `CONTROLS.fixed` is three blocks of real, sourced supporting copy,
 *     independent of the selection, holding the column's height on their own —
 *     Pattern 2's remedy (b), mandatory. Remedy (a), pre-selecting a candidate,
 *     is DECLINED on a content ground: `DOSING_RESULT` concludes in the
 *     source's own words that the answer is not one control, so a
 *     checked-by-default radio would print an answer the source never gives.
 *
 * 3 · ONE SHARED CANVAS ABOVE ALL THREE COLUMNS. No column owns a diagram —
 *     that is what makes the three gates readings OF something.
 *
 * THE SAME RECORD AS THE HERO: every asset, path, control, consequence and
 * result is read from Wave 0's `DOSING_SCENARIO` / `DOSING_PATHS` /
 * `DOSING_EVIDENCE` / `DOSING_RESULT`, nothing re-derived or re-typed —
 * including `ProposedControlType`'s fifth value (`process-safeguard`) and the
 * `decisionInsight` field, since dropping either would silently discard the
 * two places the source did not fit the original contract.
 *
 * WHERE THE CROSSHAIR GOES, derived not invented: a control is inserted at the
 * `from` endpoint of every route it closes. `ctl-process-safeguards` closes no
 * route by design, marks no node, and says so in words.
 *
 * TOKENS: canvas colour tracks `SystemPath.status` alone through the shared
 * `PathEdge`, so the renderer enforces the rule. Green appears only on
 * `closed` — a route the modelled result actually closes — nowhere else.
 *
 * `data-balance-group="worked-example-gates"` IS MARKED, because width and
 * height are different questions: Pattern 2 mandates unequal WIDTHS, while
 * `measure.mjs` only ever measures height and content-element count, and
 * Composition Rules' floor names "ledger columns" outright. The mark sits on
 * each column's INNER wrapper, never the grid cell, and the cards are NOT
 * `h-full` — a critique measured the previous iteration's stretched columns
 * 48% and 38% empty. Contrast the switchboard above, deliberately NOT marked:
 * a key rail is not a sibling content pane.
 *
 * NO DRAG INTERACTION ANYWHERE. Every control is a `<button>`.
 */

/** The inequality, as three numbers a reviewer can check without rendering. */
const GATE_SPAN = { baseline: "lg:col-span-5", control: "lg:col-span-4", output: "lg:col-span-3" } as const;

/* Geometry and scenario-derived lookups live in content.workedExample.ts. */
/* NO `focus-visible:ring-*` HERE, DELIBERATELY: globals.css already sets a
   working global `:focus-visible { box-shadow: 0 0 0 1px hsl(var(--ring)) }`,
   and Tailwind's ring utilities override that box-shadow with a transparent
   scaffold. Measured: `:focus-visible` matched while the computed shadow was
   fully transparent and outline `none` — no focus indicator at all (WCAG
   2.4.7). Ring classes here BREAK a ring that already works. */
export function ThreeGateLedger({ locale }: { locale: Locale }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const control: ProposedControl | null = DOSING_SCENARIO.controls.find((c) => c.id === selectedId) ?? null;

  /** Insertion points: the `from` end of every route the control closes. */
  const marks = useMemo(() => {
    if (!control) return [] as string[];
    const from = control.closesPathIds.map((id) => DOSING_PATHS.find((p) => p.id === id)?.from);
    return [...new Set(from.filter((id): id is string => Boolean(id)))];
  }, [control]);

  /** With nothing selected this is the baseline — every route as documented,
   *  never a blank frame. */
  const paths: SystemPath[] = useMemo(() => {
    if (!control) return DOSING_PATHS;
    return DOSING_PATHS.map((path) => {
      if (control.closesPathIds.includes(path.id)) return { ...path, status: "closed" as const };
      if (control.preservesPathIds.includes(path.id)) return { ...path, status: "controlled" as const };
      return path;
    });
  }, [control]);

  /** Real and enumerated, never a bare count: every node whose state differs
   *  from the baseline under the selected control, each row a control that
   *  moves the highlight to its own node on the shared canvas. */
  const discrepancies = useMemo(() => {
    if (!control) return [] as Array<{ assetId: string; label: string; note: Bilingual }>;
    const rows: Array<{ assetId: string; label: string; note: Bilingual }> = [];
    for (const id of marks) rows.push({ assetId: id, label: assetLabel(id), note: CANVAS.noteInsertion });
    /* Named by ROUTE, not by destination: four of the required flows all end
       at the dosing PLC, so labelling these rows with the target asset
       rendered four identical chips in a row. */
    for (const edgeId of control.closesPathIds) {
      const edge = DOSING_PATHS.find((p) => p.id === edgeId);
      if (edge) rows.push({ assetId: edge.to, label: routeLabel(edge.id), note: CANVAS.noteClosed });
    }
    for (const edgeId of control.preservesPathIds) {
      const edge = DOSING_PATHS.find((p) => p.id === edgeId);
      if (edge) rows.push({ assetId: edge.to, label: routeLabel(edge.id), note: CANVAS.noteControlled });
    }
    return rows;
  }, [control, marks]);

  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="worked-example">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        07 · {pick(WORKED_EXAMPLE.datum, locale)}
      </p>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="h-section text-balance text-foreground">{pick(WORKED_EXAMPLE.h2, locale)}</h2>
        {/* Pattern 2's guardrail, on the heading line itself: always visible on
            this surface, never buried and never left to a page-level note. */}
        <span className="mono-label inline-flex rounded-full border border-border px-2.5 py-1">
          {DOSING_SCENARIO.label}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {SCENARIO_PROSE.map((para, i) => (
          <p key={i} className="prose-measure body-lead leading-relaxed text-muted-foreground">
            {pick(para, locale)}
          </p>
        ))}
      </div>

      {/* ── One shared canvas, above all three gates ─────────────────────── */}
      {/* `data-gfx-meaning` opts this figure into measure.mjs's WCAG 1.4.11
          check. It is not optional here: colour on this canvas carries route
          state, so every stroke is argument rather than decoration, and the
          harness only measures figures that declare themselves. An unmarked
          canvas reports as "not covered", which reads as passing. */}
      <figure className="m-0 mt-10" data-gfx-meaning>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-5">
          <svg
            viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
            className="h-auto w-full min-w-[44rem]"
            role="img"
            aria-label={pick(CANVAS.title, locale)}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <defs>
              <PathEdgeMarkerDefs idPrefix="ww3-dosing" />
            </defs>
            {paths.map((path) =>
              ROUTE_POINTS[path.id] ? (
                <PathEdge key={path.id} path={path} points={ROUTE_POINTS[path.id]} markerId={`ww3-dosing-${path.status}`} />
              ) : null
            )}
            {CANVAS_ASSETS.map((asset) => (
              <Node
                key={asset.id}
                asset={asset}
                highlighted={highlightId === asset.id}
                marked={marks.includes(asset.id)}
              />
            ))}
          </svg>
        </div>

        {/* Colour on this canvas carries route state and nothing else, so the
            legend naming each state is load-bearing, not decoration. */}
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="mono-label">{pick(CANVAS.legendLabel, locale)}</span>
          {CANVAS.legend.map((row) => (
            <span key={row.status} className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
              <span
                aria-hidden="true"
                className="h-0.5 w-6 rounded-full"
                style={{ backgroundColor: STATUS_SWATCH[row.status] }}
              />
              {pick(row.text, locale)}
            </span>
          ))}
        </figcaption>
      </figure>

      {/* ── The enumerated discrepancy list ──────────────────────────────── */}
      <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
        <p className="mono-label">{pick(CANVAS.discrepancyLabel, locale)}</p>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
          {pick(control ? CANVAS.discrepancyHint : CANVAS.discrepancyEmpty, locale)}
        </p>
        {discrepancies.length > 0 && (
          <ol className="mt-3 flex flex-wrap gap-2">
            {discrepancies.map((row, i) => (
              <li key={`${row.assetId}-${i}`}>
                <button
                  type="button"
                  onClick={() => setHighlightId(row.assetId)}
                  onFocus={() => setHighlightId(row.assetId)}
                  className={cn(
                    "min-h-11 rounded-lg border px-3 py-2 text-left text-[0.8125rem] leading-snug transition-colors",
                    highlightId === row.assetId
                      ? "border-signal-cyan bg-signal-cyan/10"
                      : "border-border bg-card hover:border-signal-cyan/50"
                  )}
                >
                  <span className="mono-label mr-2">{i + 1}</span>
                  <span className="font-medium text-foreground">{row.label}</span>
                  <span className="mono-label ml-2">{pick(row.note, locale)}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* ── The three gates. 5 > 4 > 3. Mobile stacks in this DOM order. ─── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Gate 1 — Baseline, widest */}
        <div className={GATE_SPAN.baseline}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-slate bg-card p-5 sm:p-6">
            <div data-balance-group="worked-example-gates">
              <Caption caption={BASELINE.caption} label={BASELINE.label} locale={locale} />
              <Field label={pick(BASELINE.entryLabel, locale)} value={assetLabel(DOSING_SCENARIO.entryAssetId)} />
              <Field
                label={pick(BASELINE.intermediateLabel, locale)}
                value={INTERMEDIATE_IDS.map(assetLabel).join(" · ")}
              />
              <Field label={pick(BASELINE.targetLabel, locale)} value={assetLabel(DOSING_SCENARIO.targetAssetId)} />

              <p className="mono-label mt-5">{pick(BASELINE.chainLabel, locale)}</p>
              <ol className="mt-2 space-y-2">
                {BASELINE.chain.map((step, i) => (
                  <li
                    key={i}
                    data-balance-item
                    className="border-l-2 border-border pl-3 text-[0.875rem] leading-relaxed text-muted-foreground"
                  >
                    {pick(step, locale)}
                  </li>
                ))}
              </ol>

              <Field label={pick(BASELINE.constraintLabel, locale)} value={pick(BASELINE.constraint, locale)} />
              {DOSING_SCENARIO.consequence.safetyOrReliabilityContext && (
                <Field
                  label={pick(BASELINE.safetyLabel, locale)}
                  value={DOSING_SCENARIO.consequence.safetyOrReliabilityContext}
                />
              )}
              {DOSING_SCENARIO.consequence.businessImpact && (
                <Field
                  label={pick(BASELINE.impactLabel, locale)}
                  value={DOSING_SCENARIO.consequence.businessImpact}
                />
              )}
            </div>
          </div>
        </div>

        {/* Gate 2 — Proposed control */}
        <div className={GATE_SPAN.control}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-amber bg-card p-5 sm:p-6">
            <div data-balance-group="worked-example-gates">
              <Caption caption={CONTROLS.caption} label={CONTROLS.label} locale={locale} />

              <p className="mono-label mt-5">{pick(CONTROLS.chooseLabel, locale)}</p>
              <div role="radiogroup" aria-label={pick(CONTROLS.chooseLabel, locale)} className="mt-2 space-y-2">
                {DOSING_SCENARIO.controls.map((item) => {
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
                      <span className="min-w-0">
                        <span className="block body-copy font-medium leading-snug text-foreground">
                          {item.title}
                        </span>
                        <span className="mono-label mt-0.5 block">{pick(CONTROLS.typeLabels[item.type], locale)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Pattern 2 remedy (b), MANDATORY — present at first paint,
                  independent of selection, sized to hold the column alone. */}
              <dl className="mt-6 space-y-4">
                {CONTROLS.fixed.map((entry, i) => (
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
                  <Field label={pick(CONTROLS.testsLabel, locale)} value={control.implementationConstraint} />
                  <Field label={pick(CONTROLS.insightLabel, locale)} value={control.decisionInsight} />
                  <RouteList ids={control.closesPathIds} label={pick(CONTROLS.closesLabel, locale)} locale={locale} />
                  <RouteList
                    ids={control.preservesPathIds}
                    label={pick(CONTROLS.preservesLabel, locale)}
                    locale={locale}
                  />
                  <RouteList
                    ids={control.residualPathIds}
                    label={pick(CONTROLS.residualLabel, locale)}
                    locale={locale}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gate 3 — Decision output, narrowest and densest */}
        <div className={GATE_SPAN.output}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-cyan bg-card p-5 sm:p-6">
            <div data-balance-group="worked-example-gates">
              <Caption caption={OUTPUT.caption} label={OUTPUT.label} locale={locale} />

              <p className="mono-label mt-5">{pick(OUTPUT.recommendedLabel, locale)}</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {pick(OUTPUT.headlineLabel, locale)}
              </p>
              <ol className="mt-2 space-y-2">
                {OUTPUT.recommended.map((step, i) => (
                  <li
                    key={i}
                    data-balance-item
                    className="border-l-2 border-signal-cyan/50 pl-3 text-[0.875rem] leading-relaxed text-foreground"
                  >
                    {pick(step, locale)}
                  </li>
                ))}
              </ol>

              {/* Three DISCLOSURES, not an always-open <dl> (changed
                  2026-08-25, same fix as water-wastewater-2's identical
                  component, same reasoning): this is the narrowest of the
                  three gate columns (span-3, smallest of Pattern 2's mandated
                  5>4>3) yet was carrying every evidence group's full joined
                  item list open by default, making it the tallest column too
                  — a real visual defect distinct from what the numeric
                  balance floor measures. Collapsed by default keeps Pattern
                  2's span ordering untouched and shortens exactly the
                  DEFAULT pre-interaction state the balance harness reads. */}
              <p className="mono-label mt-5">{pick(OUTPUT.evidenceLabel, locale)}</p>
              <div className="mt-2">
                {EVIDENCE_GROUPS.map((group) => (
                  <details key={group.group} data-balance-item className="group border-t border-border py-2 first:border-t-0 first:pt-0">
                    <summary
                      className={cn(
                        "flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-1",
                        "text-[0.875rem] font-semibold leading-snug text-foreground",
                        "[&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      )}
                    >
                      {group.group}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                      >
                        &#8964;
                      </span>
                    </summary>
                    <p className="mt-1 pb-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {group.items.join("; ")}
                    </p>
                  </details>
                ))}
              </div>

              <Field label={pick(OUTPUT.validationLabel, locale)} value={pick(OUTPUT.validation, locale)} />
              <Field label={pick(OUTPUT.notAssertedLabel, locale)} value={pick(OUTPUT.notAsserted, locale)} />
              <p
                data-balance-item
                className="mt-5 border-t border-border pt-3 text-[0.8125rem] leading-relaxed text-muted-foreground"
              >
                {pick(OUTPUT.approvalNote, locale)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* No `prose-measure` on either paragraph below (removed 2026-08-25,
          systemic audit) — see TechnologyIndex.tsx's docblock. */}
      <p className="mt-8 body-lead leading-relaxed text-foreground">{DOSING_RESULT}</p>
      <p className="mt-4 body-copy leading-relaxed text-muted-foreground">
        {pick(OUTPUT.citation, locale)}
      </p>
    </section>
  );
}

/** One canvas node: its engineering symbol, its criticality mark, its label,
 *  and — when the selected control is inserted here — a persistent amber
 *  outline plus Pattern 2's crosshair reticle.
 *
 *  THE GLYPH IS `assetGlyph`, NOT `ASSET_GLYPHS`, since 2026-08-29. Twelve of
 *  these nodes were drawing from nine type silhouettes, so the metering pump
 *  and the dosing skid shared one open cistern and the flow meter, residual
 *  analyser and tank-level transmitter shared one circle-plus-waveform. The
 *  slugs are on the asset records in ./content.assets.ts, where the sourcing
 *  argument for each belongs; this file only resolves them. */
function Node({ asset, highlighted, marked }: { asset: SystemAsset; highlighted: boolean; marked: boolean }) {
  const { x, y } = NODE_POS[asset.id];
  const lines = wrapLabel(asset.label);
  /* On the corner, not inside the box: at x + NODE_W - 12 the reticle sat on
     top of the label's own text column (which runs to x + 36 + NODE_TEXT_W)
     and collided with the longer labels. */
  const cx = x + NODE_W;
  const cy = y;
  return (
    <g>
      {/* Cyan is "selected object" per §3.1, and replaces the brand-orange
          --primary an independent critique caught on the previous iteration:
          brand orange sits ~6deg from --signal-amber and reads as the
          proposed-control state. Slate, not --border, carries the resting
          outline — --border measures 1.2:1 on a dark card, under the 3:1
          non-text floor, where slate is re-equalized to ~6:1. */}
      {highlighted && (
        <rect x={x - 4} y={y - 4} width={NODE_W + 8} height={NODE_H + 8} rx={9}
          fill="none" stroke="hsl(var(--signal-cyan))" strokeWidth={2} />
      )}
      <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={6} fill="hsl(var(--card))"
        stroke={marked ? "hsl(var(--signal-amber))" : "hsl(var(--signal-slate))"}
        strokeWidth={marked ? 1.75 : 1} />
      {/* 26 UNITS, NOT 22, AND NO NODE MOVED FOR IT. The symbols that replaced
          the silhouettes carry information the silhouettes did not — an ISA
          bubble's tag letters, a metering pump's stroke-adjust arrow — and that
          information has a legibility floor the old marks did not have. The
          canvas measures 1110 css px against its 900-unit viewBox, so a 22-unit
          box renders 27.1 px and a 26-unit box 32.1: the same 32 px an S03 card
          icon already gets, reached by spending slack that was already inside
          the node. The box still ends at x+33 against a label column starting
          at x+36, and at y+34 inside a NODE_H of 42. `NODE_POS`, `ROUTE_POINTS`
          and every edge are untouched — nothing here is a layout change. */}
      <svg x={x + 7} y={y + 8} width={26} height={26} viewBox="0 0 32 32">
        {assetGlyph(asset)}
        {asset.criticality && <CriticalityMark tier={asset.criticality} />}
      </svg>
      {lines.map((line, i) => {
        /* Several real labels run past the node box, and Dutch will be longer
           still. Rather than drop below the 11px technical-label floor, an
           over-long line is condensed with SVG's own `textLength`: the type
           stays at size and inside its box. */
        const overflows = line.length * 6.4 > NODE_TEXT_W;
        return (
          <text key={i} x={x + 36} y={y + (lines.length === 1 ? 26 : 19 + i * 13)} fontSize={11}
            letterSpacing="0.02em" fill="hsl(var(--foreground))"
            textLength={overflows ? NODE_TEXT_W : undefined}
            lengthAdjust={overflows ? "spacingAndGlyphs" : undefined}>{line}</text>
        );
      })}
      {marked && (
        <g stroke="hsl(var(--signal-amber))" strokeWidth={1.25} fill="none">
          <circle cx={cx} cy={cy} r={6.5} />
          <line x1={cx - 6.5} y1={cy} x2={cx + 6.5} y2={cy} />
          <line x1={cx} y1={cy - 6.5} x2={cx} y2={cy + 6.5} />
        </g>
      )}
    </g>
  );
}

function Caption({ caption, label, locale }: { caption: Bilingual; label: Bilingual; locale: Locale }) {
  return (
    <p data-balance-item className="mono-label text-foreground">
      {pick(label, locale)} — {pick(caption, locale)}
    </p>
  );
}

/** One labelled field. Counted as a single content element, because a label
 *  and the sentence it introduces are one thing to a reader. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div data-balance-item className="mt-5">
      <p className="mono-label">{label}</p>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}

/** A control's route set, named end to end rather than by id. */
function RouteList({ ids, label, locale }: { ids: string[]; label: string; locale: Locale }) {
  return (
    <div data-balance-item className="mt-5">
      <p className="mono-label">{label}</p>
      {ids.length === 0 ? (
        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
          {pick(CONTROLS.noneLabel, locale)}
        </p>
      ) : (
        <ul className="mt-1.5 space-y-1">
          {ids.map((id) => (
            <li key={id} className="text-[0.875rem] leading-relaxed text-muted-foreground">
              {routeLabel(id)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
