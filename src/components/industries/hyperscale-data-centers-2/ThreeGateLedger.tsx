"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import { assetGlyph, CriticalityMark } from "@/components/twin/AssetNode";
import { PathEdge, PathEdgeMarkerDefs } from "@/components/twin/PathEdge";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { SectionA } from "./Rule";
import {
  BASELINE, CANVAS, CLOSING, CONTROLS, EVIDENCE_GROUPS, OUTPUT, RESULT, SCENARIO_PROSE, SECTION
} from "./content.workedExample";
import {
  assetLabel, CANVAS_ASSETS, CONTROL_CANDIDATES, ENTRY_ASSET_ID, INTERMEDIATE_IDS, NODE_H,
  NODE_POS, NODE_TEXT_W, NODE_W, ROUTE_POINTS, routeLabel, SCENARIO_PATHS, STATUS_SWATCH,
  TARGET_ASSET_ID, VIEWBOX, wrapLabel, type ControlCandidate
} from "./content.workedExample.canvas";

/**
 * S09 · PATTERN 2 — THE THREE-GATE LEDGER, hyperscale application. The three
 * defects `OXOT_Layout_Styles.md` records as having shipped live on earlier
 * Pattern 2 builds are designed out here rather than fixed afterwards.
 *
 * 1 · COLUMN WIDTH IS A CHECKABLE INEQUALITY, span(Baseline) > span(Proposed
 *     control) > span(Decision output). `GATE_SPAN` renders 5 / 4 / 3, summing
 *     to 12. Pattern 2 is explicit that a comment merely ASSERTING asymmetry is
 *     not evidence of it — that is the comment the original defect shipped
 *     under — so the numbers sit on one line above, checkable without rendering.
 * 2 · THE PROPOSED-CONTROL COLUMN STANDS UP BEFORE ANYONE TOUCHES IT.
 *     `CONTROLS.fixed` is three blocks of sourced supporting copy that do not
 *     depend on the selection and hold the column's height on their own —
 *     Pattern 2's remedy (b), mandatory. Remedy (a), pre-selecting a candidate,
 *     is declined on the content ground stated at `CONTROLS.fixed`.
 * 3 · DECISION OUTPUT'S EVIDENCE CATEGORIES ARE COLLAPSED BY DEFAULT, as
 *     `<details>`/`<summary>` rather than an always-open `<dl>` — the fix
 *     measured on `water-wastewater-2` and `-3`, where an always-open list left
 *     the narrowest column also the tallest (heights 1225 → 802 there, sibling
 *     balance 0.52 → 0.80). NOT applied to the other two: Baseline is the
 *     reader's entry point, and Proposed control is governed by its own
 *     minimum-density floor, where hiding content is the failure, not the fix.
 *
 * ONE SHARED CANVAS ABOVE ALL THREE COLUMNS. No column owns a diagram — that is
 * what makes the three gates readings OF something rather than three cards.
 *
 * WHERE THE CROSSHAIR GOES is read from each candidate's own `insertAt`, not
 * inferred from the routes it closes. THREE of this scenario's six candidates
 * close no route — "Separate monitoring from control", "Stage controller/firmware
 * hardening" and "Add independent operational safeguards" — and a geometric
 * inference would have left half the table marking nothing at all. See
 * content.workedExample.canvas.ts.
 *
 * TOKENS: canvas colour tracks `SystemPath.status` alone, through the shared
 * `PathEdge`, so the renderer enforces the rule rather than this file promising
 * it. Green appears only on `closed` — a route the modelled result actually
 * closes — and nowhere else. Slate carries the baseline, amber the pending
 * candidate, cyan the selected object.
 *
 * `data-balance-group` sits on each column's INNER wrapper, never on the grid
 * cell, and the cards are NOT `h-full`: the row stretches its cells by
 * construction, so measuring those would let a nearly empty column pass.
 *
 * NO DRAG INTERACTION ANYWHERE. Every control is a `<button>` or a `<summary>`.
 * NO `focus-visible:ring-*` CLASSES either: globals.css already sets a working
 * global `:focus-visible` box-shadow, and Tailwind's ring utilities overwrite it
 * with a transparent scaffold — measured on a sibling page as `:focus-visible`
 * matching with no visible indicator at all (WCAG 2.4.7).
 */

/** The inequality, as three numbers a reviewer can check without rendering. */
const GATE_SPAN = { baseline: "lg:col-span-5", control: "lg:col-span-4", output: "lg:col-span-3" } as const;

const BALANCE_GROUP = "worked-example-gates";

export function ThreeGateLedger({ locale, className }: { locale: Locale; className?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const control: ControlCandidate | null = CONTROL_CANDIDATES.find((c) => c.id === selectedId) ?? null;
  const marks = control ? control.insertAt : [];

  /* NO `useMemo` ON EITHER DERIVATION BELOW. The React Compiler is enabled in
     this repo and rejects manual memoization it cannot prove safe here
     (`react-hooks/preserve-manual-memoization`, an ERROR not a warning); both
     computations are one pass over eleven routes, so hand-memoizing them buys
     nothing the compiler does not already do. */

  /** With nothing selected this is the baseline — every route as documented,
   *  never a blank frame. */
  const paths: SystemPath[] = !control
    ? SCENARIO_PATHS
    : SCENARIO_PATHS.map((path) => {
        if (control.closesPathIds.includes(path.id)) return { ...path, status: "closed" as const };
        if (control.preservesPathIds.includes(path.id)) return { ...path, status: "controlled" as const };
        return path;
      });

  /** Real and enumerated, never a bare count: every node whose state differs
   *  from the baseline under the selected candidate, each row a control that
   *  moves the highlight to its own node on the shared canvas. */
  const discrepancies: Array<{ assetId: string; label: string; note: Bilingual }> = [];
  if (control) {
    for (const id of control.insertAt) {
      discrepancies.push({ assetId: id, label: assetLabel(id), note: CANVAS.noteInsertion });
    }
    /* Named by ROUTE, not by destination: several of this scenario's routes end
       at the same node — three arrive at the supervisory server alone — and
       labelling by target would print the same chip repeatedly with nothing to
       tell the rows apart. */
    for (const edgeId of control.closesPathIds) {
      const edge = SCENARIO_PATHS.find((p) => p.id === edgeId);
      if (edge) discrepancies.push({ assetId: edge.to, label: routeLabel(edge.id), note: CANVAS.noteClosed });
    }
    for (const edgeId of control.preservesPathIds) {
      const edge = SCENARIO_PATHS.find((p) => p.id === edgeId);
      if (edge) discrepancies.push({ assetId: edge.to, label: routeLabel(edge.id), note: CANVAS.noteControlled });
    }
  }

  return (
    <SectionA
      id={SECTION.id}
      index={SECTION.index}
      datumLabel={SECTION.datumLabel}
      heading={SECTION.heading}
      locale={locale}
      className={className}
    >
      {/* Pattern 2's guardrail, immediately under the heading and above every
          other word in the section: always visible, never state-dependent, and
          never left to a page-level note somewhere else. */}
      <p className="mono-label inline-flex rounded-full border border-border px-2.5 py-1 text-primary-ink">
        {pick(SECTION.claimBoundary, locale)}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {SCENARIO_PROSE.map((para, i) => (
          <p key={i} className="body-lead leading-relaxed text-muted-foreground">
            {pick(para, locale)}
          </p>
        ))}
      </div>

      {/* ── One shared canvas, above all three gates ──────────────────────── */}
      {/* `data-gfx-meaning` opts this figure into measure.mjs's WCAG 1.4.11
          check. Not optional: colour here carries route state, so every stroke
          is argument rather than decoration, and the harness only measures
          figures that declare themselves — an unmarked canvas reports as "not
          covered", which reads as passing. */}
      <figure className="m-0 mt-10" data-gfx-meaning>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-5">
          <svg
            viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
            className="h-auto w-full min-w-[54rem]"
            role="img"
            aria-label={pick(CANVAS.title, locale)}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <defs>
              <PathEdgeMarkerDefs idPrefix="hs2-bms-vendor" />
            </defs>
            {paths.map((path) =>
              ROUTE_POINTS[path.id] ? (
                <PathEdge key={path.id} path={path} points={ROUTE_POINTS[path.id]} markerId={`hs2-bms-vendor-${path.status}`} />
              ) : null
            )}
            {CANVAS_ASSETS.map((asset) => (
              <Node key={asset.id} asset={asset} highlighted={highlightId === asset.id} marked={marks.includes(asset.id)} />
            ))}
          </svg>
        </div>

        <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="mono-label">{pick(CANVAS.legendLabel, locale)}</span>
          {CANVAS.legend.map((row) => (
            <span key={row.status} className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
              <span aria-hidden="true" className="h-0.5 w-6 rounded-full" style={{ backgroundColor: STATUS_SWATCH[row.status] }} />
              {pick(row.text, locale)}
            </span>
          ))}
        </figcaption>
      </figure>

      {/* ── The enumerated discrepancy list ───────────────────────────────── */}
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

      {/* ── The three gates. 5 > 4 > 3. Mobile stacks in this DOM order. ──── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Gate 1 — Baseline, widest */}
        <div className={GATE_SPAN.baseline}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-slate bg-card p-5 sm:p-6">
            <div data-balance-group={BALANCE_GROUP}>
              <Caption label={BASELINE.label} caption={BASELINE.caption} locale={locale} />
              <Field label={pick(BASELINE.entryLabel, locale)} value={assetLabel(ENTRY_ASSET_ID)} />
              <Field label={pick(BASELINE.intermediateLabel, locale)} value={INTERMEDIATE_IDS.map(assetLabel).join(" · ")} />
              <Field label={pick(BASELINE.targetLabel, locale)} value={assetLabel(TARGET_ASSET_ID)} />

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

              <Field label={pick(BASELINE.exceptionLabel, locale)} value={pick(BASELINE.exception, locale)} />
              <Field label={pick(BASELINE.findingLabel, locale)} value={pick(BASELINE.finding, locale)} />
              <Field label={pick(BASELINE.constraintLabel, locale)} value={pick(BASELINE.constraint, locale)} />
            </div>
          </div>
        </div>

        {/* Gate 2 — Proposed control */}
        <div className={GATE_SPAN.control}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-amber bg-card p-5 sm:p-6">
            <div data-balance-group={BALANCE_GROUP}>
              <Caption label={CONTROLS.label} caption={CONTROLS.caption} locale={locale} />

              <p className="mono-label mt-5">{pick(CONTROLS.chooseLabel, locale)}</p>
              <div role="radiogroup" aria-label={pick(CONTROLS.chooseLabel, locale)} className="mt-2 space-y-2">
                {CONTROL_CANDIDATES.map((item) => {
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
                      <span className="block min-w-0 body-copy font-medium leading-snug text-foreground">
                        {pick(item.title, locale)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Pattern 2 remedy (b), MANDATORY — present at first paint,
                  independent of the selection, sized to hold the column alone. */}
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

              {/* Selection-dependent detail sits BELOW the fixed copy, so it adds
                  to a column that already stood up on its own. */}
              {control && (
                <div className="mt-6 border-t border-signal-amber/50 pt-4">
                  <Field label={pick(CONTROLS.evaluatesLabel, locale)} value={pick(control.evaluates, locale)} />
                  <Field label={pick(CONTROLS.outcomeLabel, locale)} value={pick(control.outcome, locale)} />
                  <Field label={pick(CONTROLS.insertionLabel, locale)} value={control.insertAt.map(assetLabel).join(" · ")} />
                  <RouteList ids={control.closesPathIds} label={pick(CONTROLS.closesLabel, locale)} empty={pick(CONTROLS.noneClosedLabel, locale)} />
                  <RouteList ids={control.preservesPathIds} label={pick(CONTROLS.preservesLabel, locale)} empty={pick(CONTROLS.nonePreservedLabel, locale)} />
                  <RouteList ids={control.residualPathIds} label={pick(CONTROLS.residualLabel, locale)} empty={pick(CONTROLS.noneClosedLabel, locale)} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gate 3 — Decision output, narrowest and densest */}
        <div className={GATE_SPAN.output}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-cyan bg-card p-5 sm:p-6">
            <div data-balance-group={BALANCE_GROUP}>
              <Caption label={OUTPUT.label} caption={OUTPUT.caption} locale={locale} />

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

              {/* THREE DISCLOSURES, COLLAPSED BY DEFAULT — not an always-open
                  <dl>. See defect 3 in this file's docblock. */}
              <p className="mono-label mt-5">{pick(OUTPUT.evidenceLabel, locale)}</p>
              <div className="mt-2">
                {EVIDENCE_GROUPS.map((group, i) => (
                  <details
                    key={i}
                    data-balance-item
                    className="group border-t border-border py-2 first:border-t-0 first:pt-0"
                  >
                    <summary
                      className={cn(
                        "flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-1",
                        "text-[0.875rem] font-semibold leading-snug text-foreground",
                        "[&::-webkit-details-marker]:hidden"
                      )}
                    >
                      {pick(group.group, locale)}
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

              <Field label={pick(OUTPUT.windowLabel, locale)} value={pick(OUTPUT.window, locale)} />
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

      <p className="mt-8 body-lead leading-relaxed text-foreground">{pick(RESULT, locale)}</p>
      <p className="mt-4 body-copy leading-relaxed text-muted-foreground">
        {pick(CLOSING.text, locale)}{" "}
        <Link
          href={localePath(
            locale,
            /* `/technical-specification` renders EN only, so an `nl` link is a
               real 404. Same substitution the rest of the site uses. */
            locale === "en" ? CLOSING.citation.href : PATHS.cdt2
          )}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(CLOSING.citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}

/** One canvas node: the shared nine-silhouette glyph set, its criticality mark,
 *  its label, and — when the selected candidate is inserted here — a persistent
 *  amber outline plus Pattern 2's crosshair reticle. */
function Node({ asset, highlighted, marked }: { asset: SystemAsset; highlighted: boolean; marked: boolean }) {
  const { x, y } = NODE_POS[asset.id];
  const lines = wrapLabel(asset.label);
  /* On the corner, not inside the box: at x + NODE_W - 12 the reticle sits on
     top of the label's own text column, which runs to x + 36 + NODE_TEXT_W. */
  const cx = x + NODE_W;
  const cy = y;
  return (
    <g>
      {/* Cyan is "selected object" per §3.1. Not brand orange, which sits ~6deg
          from --signal-amber and would read as the proposed-control state.
          Slate, not --border, carries the resting outline: --border measures
          1.2:1 on a dark card, under the 3:1 non-text floor. */}
      {highlighted && (
        <rect x={x - 4} y={y - 4} width={NODE_W + 8} height={NODE_H + 8} rx={9}
          fill="none" stroke="hsl(var(--signal-cyan))" strokeWidth={2} />
      )}
      <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={6} fill="hsl(var(--card))"
        stroke={marked ? "hsl(var(--signal-amber))" : "hsl(var(--signal-slate))"}
        strokeWidth={marked ? 1.75 : 1} />
      {/* `assetGlyph`, NOT `ASSET_GLYPHS`, since 2026-08-29 — the same change
          water-wastewater-3's ledger made. Ten assets here draw from seven type
          silhouettes, so three pairs of DIFFERENT things drew the SAME mark;
          three records in content.workedExample.canvas.ts now name a published
          `symbol`, and `ASSET_GLYPHS[asset.type]` would have discarded every
          one of them silently. The call form is deliberate:
          `{assetGlyph(asset)}` returns an ELEMENT, never
          `const G = assetGlyph(asset); <G />` — React Compiler's
          `react-hooks/static-components` rejects binding a component from a
          call, and returning the element keeps the resolver's memoisation and
          type identity stable with nothing to suppress. */}
      {/* RE-CUT 22 → 26 UNITS ON 2026-08-29, because §3.4 says derive the floor
          from the MARK YOU ARE ACTUALLY USING and two of the three new ones
          failed their own. Measured, not eyeballed: this canvas renders its
          1080-unit viewBox at 1174px (1440 viewport) and 864px (390), so a
          22-unit cell landed at 23.9px and 17.6px. Deriving each mark's floor
          from its tightest feature at 1.3 stroke — cell >= 32 / (pitch - 1.3):
          `cset/building-automation` 6-unit grid -> 6.8px (loose);
          `cset/server` 3.0-unit shelf pitch -> 18.8px; and
          `cset/remote-access-server` 2.6-unit shelf pitch -> 24.6px, which the
          old cell missed at EVERY viewport. At 26 units the cell is 28.3px and
          20.8px, clearing all three at >= 834px and clearing
          building-automation and server everywhere.

          RESIDUAL, STATED RATHER THAN HIDDEN: at a 390px viewport the canvas
          scales to 0.8 and `cset/remote-access-server` gets 0.91px of white
          between its top two shelf lines, ~9% under the 1px floor. That is a
          property of the canvas scale, not of the cell — the fix is a looser
          gateway mark upstream or a min-scale on this canvas, both outside this
          file. It is a hairline merge on one mark at one breakpoint, where the
          alternative was leaving a gateway and a network drawing the same
          topology; the collision was the worse defect.

          x+6 not x+7 keeps a 4-unit gap to the label column at x+36; y+8 keeps
          the 26-unit cell inside NODE_H=42 with 8 units below. */}
      <svg x={x + 6} y={y + 8} width={26} height={26} viewBox="0 0 32 32">
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

function Caption({ label, caption, locale }: { label: Bilingual; caption: Bilingual; locale: Locale }) {
  return (
    <p data-balance-item className="mono-label text-foreground">
      {pick(label, locale)} — {pick(caption, locale)}
    </p>
  );
}

/** One labelled field. Counted as a single content element, because a label and
 *  the sentence it introduces are one thing to a reader. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div data-balance-item className="mt-5">
      <p className="mono-label">{label}</p>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}

/** A candidate's route set, named end to end rather than by id. The empty case is
 *  a real sentence, not a blank: three of the six candidates close no route by
 *  design, and that is the source's own finding about them. */
function RouteList({ ids, label, empty }: { ids: string[]; label: string; empty: string }) {
  return (
    <div data-balance-item className="mt-5">
      <p className="mono-label">{label}</p>
      {ids.length === 0 ? (
        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">{empty}</p>
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
