"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { same } from "../registry";
import { SectionB } from "./Rule";
import { WORKED_EXAMPLE } from "./content.workedExample";

/**
 * PATTERN 2 — THE THREE-GATE LEDGER, defense and government application.
 * `OXOT_Layout_Styles.md` §2. The three defects that doc records as having
 * SHIPPED LIVE on earlier Pattern 2 builds are designed out here, not patched
 * afterwards.
 *
 * 1 · COLUMN WIDTH IS A CHECKABLE INEQUALITY: span(Baseline) > span(Proposed
 *     control) > span(Decision output). `GATE_SPAN` renders 5 / 4 / 3, summing
 *     to 12, on one line a reviewer can check without rendering the page. §2 is
 *     explicit that a comment merely ASSERTING asymmetry is not evidence of it —
 *     `water-wastewater-1` shipped 4 / 5 / 3 (middle column widest) under
 *     exactly such a comment.
 * 2 · THE PROPOSED-CONTROL COLUMN STANDS UP BEFORE ANYONE TOUCHES IT. §2's
 *     remedy (b) is MANDATORY: `FIXED_SUPPORT` is three blocks of copy that do
 *     not depend on the selection and hold the column's height on their own.
 *     Remedy (a) — pre-selecting the first candidate — is DECLINED on the
 *     content's own ground: `content.workedExample.ts` records that no control
 *     is marked recommended in the source and that "marking one would be OXOT
 *     choosing the customer's control for them on a sovereignty page." §2
 *     permits declining (a) for that reason and states (b) alone satisfies it.
 * 3 · DECISION OUTPUT'S EVIDENCE CATEGORIES ARE COLLAPSED BY DEFAULT, as
 *     `<details>`/`<summary>` rather than an always-open `<dl>`. This column is
 *     narrowest by mandate and densest by design, so narrow-and-tall is a
 *     structural failure mode rather than an accident. NOT applied to the other
 *     two: Baseline is the reader's entry point, and Proposed control has its
 *     own minimum-density floor, where hiding content is the failure.
 *
 * ONE SHARED CANVAS ABOVE ALL THREE COLUMNS — no column owns a diagram, which is
 * what makes the three gates readings OF something rather than three cards. It
 * is THIS PAGE'S BOUNDARY IDIOM, not an asset graph: `Rule.tsx`'s signature — a
 * run crossing a dashed perimeter at one marked point, solid inside and dashed
 * outside — at full size. Reusing the sibling pages' `TwinExplorer`/`AssetNode`
 * substrate would draw an asset topology on a page arguing about a boundary.
 *
 * EVERY NODE LABEL IS A NOUN THE SOURCE ITSELF USES — `WORKED_EXAMPLE.scenario`
 * names all eight in its own words. Nothing is added, and no country, service,
 * base, agency, vendor or product is named; the content file's docblock bars
 * exactly that. NO FIGURE APPEARS ANYWHERE IN THIS FILE and none may be added —
 * no hours, litres, kW, percentage, cost or restoration time (Visual Foundation
 * Spec L403; neither source states one).
 *
 * WHERE THE CROSSHAIR GOES is authored here as presentation geometry, in
 * `MARKS`, with the source words placing each candidate quoted beside it — the
 * same class of decision `manufacturing-process-2`'s content module makes in its
 * own `insertAt` field. It says where a marker is drawn, not what is true of a
 * customer's system, and each entry is checkable against the candidate.
 *
 * NO GREEN ANYWHERE. §2 releases green only "once the modelled result actually
 * closes a route." Nothing here closes one — the source's FIRST candidate is
 * recorded with a real downside ("may create recovery risk"), and the section's
 * honesty depends on that surviving. Slate carries the documented baseline,
 * amber the pending candidate and its insertion marks, cyan the selected object.
 *
 * NO DRAG INTERACTION ANYWHERE (Mobile Rules bans it): every control is a
 * `<button>` or a `<summary>`, each at least 44px tall. The three columns stack
 * in Baseline → Proposed control → Decision output DOM order on mobile, never
 * side-scrolled; only the canvas scrolls horizontally, with its own affordance.
 * No `focus-visible:ring-*` classes: `globals.css` already sets a working global
 * `:focus-visible` box-shadow that Tailwind's ring utilities would overwrite
 * with a transparent scaffold. `data-balance-group` sits on each column's INNER
 * wrapper, never on the grid cell, and the cards are not `h-full`: the row
 * stretches its cells by construction, so measuring those would let a nearly
 * empty column pass.
 */

/** The inequality, as three numbers a reviewer can check without rendering. */
const GATE_SPAN = {
  baseline: "lg:col-span-5",
  control: "lg:col-span-4",
  output: "lg:col-span-3"
} as const;

const BALANCE_GROUP = "worked-example-gates";

/* ── Canvas geometry ────────────────────────────────────────────────────── */

const NODE_W = 176;
const NODE_H = 46;
const VIEWBOX = { w: 880, h: 320 };
/** The dashed controlled boundary, standing across the run at one x. */
const PERIMETER_X = 210;

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  /** Pre-wrapped: SVG has no wrapping, and shrinking type below the 11px
   *  technical-label floor is not an option. */
  lines: string[];
  /** Outside the boundary — the dependency the customer does not own. */
  external?: boolean;
}

const NODES: CanvasNode[] = [
  { id: "vendor", x: 8, y: 150, lines: ["Support vendor —", "remote connection"], external: true },
  { id: "ews", x: 236, y: 150, lines: ["Facilities engineering", "workstation"] },
  { id: "utility", x: 236, y: 252, lines: ["Dual utility feeds"] },
  { id: "bms", x: 464, y: 52, lines: ["BMS / EPMS", "management systems"] },
  { id: "power", x: 464, y: 150, lines: ["Generators, UPS,", "transfer switches"] },
  { id: "fuel", x: 464, y: 252, lines: ["Fuel storage"] },
  { id: "comms", x: 692, y: 52, lines: ["Secure communications"] },
  { id: "services", x: 692, y: 170, lines: ["Crisis coordination &", "digital services"] }
];

const NODE_BY_ID = new Map(NODES.map((n) => [n.id, n]));

/** Dependency direction, as the scenario states it. */
const EDGES: Array<[from: string, to: string]> = [
  ["vendor", "ews"], ["ews", "bms"], ["ews", "power"], ["utility", "power"],
  ["fuel", "power"], ["bms", "comms"], ["power", "services"], ["comms", "services"]
];

/**
 * WHERE EACH CANDIDATE'S CROSSHAIR IS DRAWN, each entry checkable against the
 * candidate's own words: "Remove all remote vendor access" and "Introduce
 * sovereign brokered access" both act on the external connection; "Separate
 * vendor access, engineering tools, BMS/EPMS…" and "…offline runbooks,
 * break-glass procedures, manual control capability…" both act at the
 * engineering position and the control layer; "Change fuel stock… or generator
 * priority policy" acts on fuel and generation; "Service tiers, capacity
 * constraints, alternate-site failover, and protected workloads" acts on the
 * served workload.
 *
 * TWO PAIRS SHARE A MARK SET, AND THAT IS NOT A SLIP — forcing six distinct sets
 * would mean placing a marker the source does not place.
 */
const MARKS: Record<string, string[]> = {
  "remove-remote-access": ["vendor"],
  "sovereign-brokered-access": ["vendor"],
  "segment-facility-management": ["ews", "bms"],
  "local-recovery-independence": ["ews", "bms"],
  "fuel-logistics-resilience": ["fuel", "power"],
  "reprioritize-essential-services": ["services"]
};

/** Node label for the difference rows — the same words the canvas prints. */
function nodeLabel(id: string): string {
  return NODE_BY_ID.get(id)?.lines.join(" ").replace(" —", "") ?? id;
}

/* ── Section chrome ─────────────────────────────────────────────────────── */

/* `content.workedExample.ts` carries no section furniture and is read-only here,
   so the datum label is stated locally. It names the section, a real page fact. */
const DATUM_LABEL = same("Worked example");

const CANVAS_LABEL = same(
  "The scenario as documented: the support vendor's remote connection crosses the controlled boundary at one point into a facilities engineering workstation, which reaches BMS/EPMS management systems and the generator, UPS, fuel and utility-feed chain sustaining secure communications and the crisis-coordination workload."
);
const CANVAS_CAPTION = same(
  "Dashed vertical line: the controlled boundary. Solid square: the one point the vendor connection is permitted through it. Amber circled cross: where the selected candidate control is inserted."
);
const DIFFERENCE_LABEL = same("Difference from baseline");
const DIFFERENCE_EMPTY = same(
  "Nothing differs yet. Select a candidate control to mark where it is inserted and what changes on the canvas."
);
const DIFFERENCE_HINT = same("Each row moves the highlight to its own node on the shared canvas above.");
const INSERTION_NOTE = same("insertion point");

const BASELINE_LABEL = same("Baseline");
const BASELINE_CAPTION = same("as documented");
const BASELINE_CHAIN_LABEL = same("Consequence chain, as documented");

const CONTROL_LABEL = same("Proposed control");
const CONTROL_CAPTION = same("candidate, not recommended");
const CONTROL_CHOOSE_LABEL = same("Candidate controls — six, none preferred");
const CONTROL_EVALUATES_LABEL = same("What it evaluates");
const CONTROL_OUTCOME_LABEL = same("What it costs or gains");

const OUTPUT_LABEL = same("Decision output");
const OUTPUT_CAPTION = same("what the engagement produces");
const OUTPUT_RESULT_LABEL = same("The decision");
const OUTPUT_EVIDENCE_LABEL = same("Evidence the decision needs");
const OUTPUT_UNSOURCED_LABEL = same("Fields this page does not state");
const OUTPUT_UNSOURCED_BODY = same(
  "Implementation window, validation condition and responsible role are established with the customer during the engagement. They are left empty here rather than filled in from nowhere — the same principle the air-gap section states: model the pathways and their consequences, retaining source provenance and showing unsourced fields as empty rather than invented."
);

/**
 * PATTERN 2 REMEDY (b), MANDATORY — present at first paint, independent of the
 * selection, sized to hold this column on its own. A Proposed-control column
 * that is bare chrome until a user acts fails the pattern whatever its width,
 * and remedy (a) is declined for the content reason in this file's docblock.
 * These three say what a proposed control IS here, how residual exposure is read
 * with no figure stated, and what the crosshair marks — none selection-
 * dependent, all three needed before the candidates mean anything.
 */
const FIXED_SUPPORT: Array<{ term: Bilingual; body: Bilingual }> = [
  { term: same("What a proposed control is here"),
    body: same("A change tested against the model before it touches the live environment — a route closed, an access path rebuilt, a dependency moved. It is a candidate the customer may decide against; none of the six below is marked recommended, and the section would be making the customer's sovereignty decision for them if one were.") },
  { term: same("How residual exposure is read"),
    body: same("Every candidate leaves something behind, and the source states each one's cost in words rather than a score. Removing all remote vendor access reduces exposure and may create recovery risk; brokered access retains support without a persistent external pathway. Read the two together — a candidate with no stated cost has not been examined closely enough.") },
  { term: same("What the circled cross marks"),
    body: same("A P&ID-convention insertion mark, drawn on the shared canvas at the node the selected candidate acts on. It marks where the control enters the model, not that the route beyond it is closed — nothing on this canvas is shown as closed, because nothing here has been modelled against a real environment.") }
];

/* ── Component ──────────────────────────────────────────────────────────── */

/** `index` is the section's ordinal on the page — a prop with a documented
 *  default rather than a hardcoded constant, because the page's final section
 *  order is assembled in the route file, not here. */
export function WorkedExample({
  locale, index = "07", className
}: { locale: Locale; index?: string; className?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const control = WORKED_EXAMPLE.controls.find((c) => c.id === selectedId) ?? null;
  const marked = control ? (MARKS[control.id] ?? []) : [];

  return (
    <SectionB id="worked-example" index={index} datumLabel={DATUM_LABEL}
      heading={WORKED_EXAMPLE.h2} guard={WORKED_EXAMPLE.tag} locale={locale} className={className}
    >
      {/* ── One shared canvas, above all three gates. `data-gfx-meaning` opts
          this figure into measure.mjs's WCAG 1.4.11 check: colour here carries
          state, and the harness only measures figures that declare it. ─────── */}
      <figure className="m-0" data-gfx-meaning>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-5">
          <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} className="h-auto w-full min-w-[46rem]"
            role="img" aria-label={pick(CANVAS_LABEL, locale)}
            style={{ fontFamily: "var(--font-mono)" }}>
            {/* The controlled boundary: a dashed perimeter standing across the
                run, at a finer dash rhythm than any run — Rule.tsx's own rule. */}
            <path d={`M${PERIMETER_X},8 V${VIEWBOX.h - 8}`} stroke="hsl(var(--border))"
              strokeWidth={2} strokeDasharray="6 6" fill="none" />
            {EDGES.map(([from, to]) => <Edge key={`${from}-${to}`} from={from} to={to} />)}
            {/* The one crossing point, filled — the single place the external
                connection is permitted through. Square, matching Rule.tsx. */}
            <rect x={PERIMETER_X - 5} y={150 + NODE_H / 2 - 5} width={10} height={10}
              fill="hsl(var(--primary-ink))" />
            {NODES.map((n) => (
              <Node key={n.id} node={n} highlighted={highlightId === n.id} marked={marked.includes(n.id)} />
            ))}
          </svg>
        </div>
        <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
          {pick(CANVAS_CAPTION, locale)}
        </figcaption>
      </figure>

      {/* ── The enumerated difference list — real rows, never a bare count ── */}
      <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
        <p className="mono-label">{pick(DIFFERENCE_LABEL, locale)}</p>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
          {pick(marked.length > 0 ? DIFFERENCE_HINT : DIFFERENCE_EMPTY, locale)}
        </p>
        {marked.length > 0 && (
          <ol className="mt-3 flex flex-wrap gap-2">
            {marked.map((id, i) => (
              <li key={id}>
                <button type="button" onClick={() => setHighlightId(id)}
                  onFocus={() => setHighlightId(id)}
                  className={cn(
                    "min-h-11 rounded-lg border px-3 py-2 text-left text-[0.8125rem] leading-snug transition-colors duration-200",
                    highlightId === id
                      ? "border-signal-cyan bg-signal-cyan/10"
                      : "border-border bg-card hover:border-signal-cyan/50"
                  )}>
                  <span className="mono-label mr-2">{i + 1}</span>
                  <span className="font-medium text-foreground">{nodeLabel(id)}</span>
                  <span className="mono-label ml-2">{pick(INSERTION_NOTE, locale)}</span>
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
              <Caption label={BASELINE_LABEL} caption={BASELINE_CAPTION} locale={locale} />
              <p data-balance-item className="mt-5 body-copy leading-relaxed text-muted-foreground">
                {pick(WORKED_EXAMPLE.scenario, locale)}
              </p>
              <p className="mono-label mt-6">{pick(BASELINE_CHAIN_LABEL, locale)}</p>
              <ol className="mt-2 space-y-2">
                {WORKED_EXAMPLE.chain.map((step, i) => (
                  <li key={i} data-balance-item
                    className="border-l-2 border-border pl-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                    <span className="mono-label mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {pick(step, locale)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Gate 2 — Proposed control */}
        <div className={GATE_SPAN.control}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-amber bg-card p-5 sm:p-6">
            <div data-balance-group={BALANCE_GROUP}>
              <Caption label={CONTROL_LABEL} caption={CONTROL_CAPTION} locale={locale} />

              <p className="mono-label mt-5">{pick(CONTROL_CHOOSE_LABEL, locale)}</p>
              {/* NATIVE RADIOS IN A FIELDSET, not buttons wearing role="radio". The
                  hand-rolled version declared `role="radiogroup"` and shipped none
                  of that role's contract: all six were tab stops (a radiogroup
                  exposes one), arrow keys were dead, and a click could uncheck.
                  Native inputs give roving focus, arrow traversal and no-deselect
                  free — as `SovereignSystemCanvas.tsx` argues. QA, 2026-08-27. */}
              <fieldset className="mt-2 space-y-2 border-0 p-0">
                <legend className="sr-only">{pick(CONTROL_CHOOSE_LABEL, locale)}</legend>
                {WORKED_EXAMPLE.controls.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <label key={item.id} data-balance-item className="block cursor-pointer">
                      <input type="radio" name="dg2-candidate-control" className="peer sr-only"
                        checked={isSelected}
                        onChange={() => { setSelectedId(item.id); setHighlightId(null); }} />
                      <span className={cn(
                        "flex min-h-11 w-full items-start gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors duration-200",
                        "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
                        isSelected ? "border-signal-amber bg-signal-amber/10" : "border-border bg-muted/30 hover:border-signal-amber/50"
                      )}>
                        <span aria-hidden="true" className={cn("mt-1 h-4 w-0.5 shrink-0 rounded-full", isSelected ? "bg-signal-amber" : "bg-border")} />
                        <span className="block min-w-0 body-copy font-medium leading-snug text-foreground">
                          {pick(item.option, locale)}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              {/* Remedy (b), mandatory — see this file's docblock. */}
              <dl className="mt-6 space-y-4">
                {FIXED_SUPPORT.map((entry, i) => (
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
                  <Field label={pick(CONTROL_EVALUATES_LABEL, locale)} value={pick(control.evaluates, locale)} />
                  <Field label={pick(CONTROL_OUTCOME_LABEL, locale)} value={pick(control.outcome, locale)} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gate 3 — Decision output, narrowest and densest */}
        <div className={GATE_SPAN.output}>
          <div className="rounded-2xl border border-border border-l-2 border-l-signal-cyan bg-card p-5 sm:p-6">
            <div data-balance-group={BALANCE_GROUP}>
              <Caption label={OUTPUT_LABEL} caption={OUTPUT_CAPTION} locale={locale} />

              <p className="mono-label mt-5">{pick(OUTPUT_RESULT_LABEL, locale)}</p>
              <p data-balance-item className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">
                {pick(WORKED_EXAMPLE.result, locale)}
              </p>

              {/* THREE DISCLOSURES, COLLAPSED BY DEFAULT — not an always-open
                  <dl>. See defect 3 in this file's docblock. */}
              <p className="mono-label mt-6">{pick(OUTPUT_EVIDENCE_LABEL, locale)}</p>
              <div className="mt-2">
                {WORKED_EXAMPLE.inputs.map((group) => (
                  <details key={group.id} data-balance-item
                    className="group border-t border-border py-2 first:border-t-0 first:pt-0">
                    <summary
                      className={cn(
                        "flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-1",
                        "text-[0.875rem] font-semibold leading-snug text-foreground",
                        "[&::-webkit-details-marker]:hidden"
                      )}>
                      {pick(group.category, locale)}
                      <span aria-hidden="true"
                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">
                        &#8964;
                      </span>
                    </summary>
                    <p className="mt-1 pb-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {pick(group.items, locale)}
                    </p>
                  </details>
                ))}
              </div>

              <div data-balance-item className="mt-6 border-t border-border pt-3">
                <p className="mono-label">{pick(OUTPUT_UNSOURCED_LABEL, locale)}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {pick(OUTPUT_UNSOURCED_BODY, locale)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionB>
  );
}

/* ── Canvas parts ───────────────────────────────────────────────────────── */

/** One dependency run. Orthogonal between columns, straight within one. */
function Edge({ from, to }: { from: string; to: string }) {
  const a = NODE_BY_ID.get(from);
  const b = NODE_BY_ID.get(to);
  if (!a || !b) return null;

  const stroke = "hsl(var(--signal-slate))";
  if (a.x === b.x) {
    const cx = a.x + NODE_W / 2, up = a.y > b.y;
    return <path d={`M${cx},${up ? a.y : a.y + NODE_H} V${up ? b.y + NODE_H : b.y}`}
      stroke={stroke} strokeWidth={1.5} fill="none" />;
  }
  const sx = a.x + NODE_W, sy = a.y + NODE_H / 2, ex = b.x, ey = b.y + NODE_H / 2;
  const mx = (sx + ex) / 2;
  /* The vendor run is DASHED because it originates outside the perimeter — the
     page's own argument, drawn: what the organization controls ends at the
     boundary, and the dependency does not. */
  return (
    <path
      d={`M${sx},${sy} H${mx} V${ey} H${ex}`}
      stroke={stroke}
      strokeWidth={1.5}
      strokeDasharray={a.external === true ? "8 8" : undefined}
      fill="none"
    />
  );
}

/** One canvas node: its box, its label, and — when the selected candidate is
 *  inserted here — a persistent amber outline plus Pattern 2's crosshair
 *  reticle, a P&ID circled cross rather than a rounded UI pill. */
function Node({ node, highlighted, marked }: { node: CanvasNode; highlighted: boolean; marked: boolean }) {
  const { x, y, lines } = node;
  const cx = x + NODE_W;
  return (
    <g>
      {/* Cyan is "selected object" per Foundation Spec §3.1 — not brand orange,
          which sits ~6deg from --signal-amber and would read as the proposed
          state. Slate, not --border, carries the resting outline: --border is
          1.2:1 on a dark card, under the 3:1 non-text floor. */}
      {highlighted && (
        <rect x={x - 4} y={y - 4} width={NODE_W + 8} height={NODE_H + 8} rx={9}
          fill="none" stroke="hsl(var(--signal-cyan))" strokeWidth={2} />
      )}
      <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={6} fill="hsl(var(--card))"
        stroke={marked ? "hsl(var(--signal-amber))" : "hsl(var(--signal-slate))"}
        strokeWidth={marked ? 1.75 : 1}
        strokeDasharray={node.external === true ? "5 4" : undefined} />
      {lines.map((line, i) => (
        <text key={i} x={x + 12} y={y + (lines.length === 1 ? 28 : 21 + i * 14)} fontSize={11.5}
          letterSpacing="0.02em" fill="hsl(var(--foreground))">{line}</text>
      ))}
      {marked && (
        <g stroke="hsl(var(--signal-amber))" strokeWidth={1.25} fill="none">
          <circle cx={cx} cy={y} r={6.5} />
          <line x1={cx - 6.5} y1={y} x2={cx + 6.5} y2={y} />
          <line x1={cx} y1={y - 6.5} x2={cx} y2={y + 6.5} />
        </g>
      )}
    </g>
  );
}

/* ── Column parts ───────────────────────────────────────────────────────── */

function Caption({ label, caption, locale }: { label: Bilingual; caption: Bilingual; locale: Locale }) {
  return (
    <p data-balance-item className="mono-label text-foreground">
      {pick(label, locale)} — {pick(caption, locale)}
    </p>
  );
}

/** One labelled field. One content element, because a label and the sentence it
 *  introduces are one thing to a reader. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div data-balance-item className="mt-5">
      <p className="mono-label">{label}</p>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}
