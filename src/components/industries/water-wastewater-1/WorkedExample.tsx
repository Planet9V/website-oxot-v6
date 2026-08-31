"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import type { SystemPath } from "@/components/twin/types";
import { CLAIM_BOUNDARY, DOSING_ASSETS, DOSING_PATHS, WORKED_EXAMPLE } from "./content";
import { DosingCanvas } from "./DosingCanvas";

/**
 * `OXOT_Layout_Styles.md` Pattern 2 — THREE-GATE LEDGER, implemented against
 * that pattern's real text clause by clause, because the failure this build is
 * correcting was a pattern named in a plan and quietly abandoned in the code.
 * What the pattern requires, and where each requirement lands here:
 *
 *  · "Three unequal columns over one shared canvas … rather than each column
 *    owning its own visual." — one `DosingCanvas` above; the columns are 4/5/3
 *    of a twelve-column grid, widest Baseline, narrowest and densest Decision
 *    output.
 *  · "Baseline (widest, rendered --signal-slate): entry point, intermediate
 *    systems, target asset, consequence chain, known constraints." — all five,
 *    in that order, slate-ruled.
 *  · "Proposed control (--signal-amber) … which routes it affects, which
 *    required flows it preserves, the residual exposure it leaves." — all three
 *    enumerated per control, amber-ruled.
 *  · "Decision output (narrowest, densest) — recommended sequence, evidence
 *    needed, implementation window, validation condition, responsible role." —
 *    the three the source actually states are printed. The other two are not
 *    stated, and are declared as not asserted rather than invented; a fabricated
 *    implementation window on a page arguing that evidence is traceable would be
 *    worse than an honest gap.
 *  · "each list item is itself a control that moves focus/highlight to its
 *    canvas node" — selecting a control redraws the shared canvas: routes it
 *    closes turn `closed`, routes it preserves or leaves residual stay `open`,
 *    everything it does not touch drops to `unknown` context, and the insertion
 *    point takes the amber crosshair.
 *  · "No drag-only interaction anywhere." — the control list is buttons with a
 *    roving tabindex and arrow keys. There is no slider on this page.
 *  · "'Illustrative scenario — no customer data' always visible, not buried." —
 *    printed at the head of the section, above everything else in it.
 *
 * The three semantic states are the pattern's own: slate for the unverified
 * baseline, amber for a proposed control, green *only* where the modelled
 * result actually closes a route — never before, which is why nothing is green
 * until a control is selected.
 */

const CONTROLS = WORKED_EXAMPLE.controls.items;

export function WorkedExample({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<number | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = selected === null ? null : CONTROLS[selected];

  const paths: SystemPath[] = DOSING_PATHS.map((path) => {
    if (!active) return path;
    if (active.closes.includes(path.id)) return { ...path, status: "closed" };
    if (active.preserves.includes(path.id) || active.residual.includes(path.id)) return { ...path, status: "open" };
    return { ...path, status: "unknown" };
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % CONTROLS.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + CONTROLS.length) % CONTROLS.length;
    else return;
    event.preventDefault();
    setSelected(next);
    refs.current[next]?.focus();
  }

  const routeNames = (ids: string[]) =>
    ids.length === 0
      ? pick(WORKED_EXAMPLE.controls.noneLabel, locale)
      : ids
          .map((id) => {
            const path = DOSING_PATHS.find((p) => p.id === id);
            const from = DOSING_ASSETS.find((a) => a.id === path?.from)?.label ?? "";
            const to = DOSING_ASSETS.find((a) => a.id === path?.to)?.label ?? "";
            return `${from} → ${to}`;
          })
          .join("; ");

  return (
    <div>
      <p className="mono-label mb-6 inline-block rounded-full border border-border px-2.5 py-1">
        {pick(CLAIM_BOUNDARY, locale)}
      </p>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <p className="prose-measure body-lead leading-relaxed text-foreground lg:col-span-6">
          {pick(WORKED_EXAMPLE.scenarioOne, locale)}
        </p>
        <p className="prose-measure body-lead leading-relaxed text-muted-foreground lg:col-span-6">
          {pick(WORKED_EXAMPLE.scenarioTwo, locale)}
        </p>
      </div>

      {/* THE SHARED CANVAS — one drawing, three gates beneath it. */}
      <div className="mt-10">
        <DosingCanvas
          assets={DOSING_ASSETS}
          paths={paths}
          marks={active?.marks ?? []}
          title={pick(WORKED_EXAMPLE.canvasTitle, locale)}
          locale={locale}
        />
        {/* A real legend: every swatch is paired with its words. An unlabelled
            coloured line is exactly the traffic-light indicator the mapping
            table exists to keep off this site. */}
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { colour: "bg-signal-blue", text: "Open route" },
            { colour: "bg-signal-green", text: "Closed in the model" },
            { colour: "bg-signal-slate", text: "Not affected by this control" }
          ].map((key) => (
            <li key={key.text} className="flex items-center gap-2">
              <span aria-hidden="true" className={cn("h-0.5 w-5 rounded-full", key.colour)} />
              <span className="mono-label">{key.text}</span>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-3 rounded-full border border-signal-amber" />
            <span className="mono-label">Control inserted</span>
          </li>
        </ul>
      </div>

      {/* THE THREE GATES. Unequal by construction, not by accident. */}
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* 1 — Baseline. Widest, slate. */}
        <section aria-labelledby="gate-baseline" className="lg:col-span-4">
          <div className="h-full rounded-2xl border-l-2 border-signal-slate bg-muted/40 p-5 sm:p-6">
            <h3 id="gate-baseline" className="h-card">
              {pick(WORKED_EXAMPLE.baseline.label, locale)}
            </h3>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">
              {pick(WORKED_EXAMPLE.baseline.caption, locale)}
            </p>

            <dl className="mt-6 space-y-4">
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
            </dl>

            <p className="mono-label mt-6">{pick(WORKED_EXAMPLE.baseline.chainLabel, locale)}</p>
            <ol className="mt-3 space-y-2">
              {WORKED_EXAMPLE.baseline.chain.map((stepText, i) => (
                <li key={i} className="flex gap-3 text-[0.875rem] leading-snug text-foreground">
                  <span className="mono-label shrink-0 text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span>{pick(stepText, locale)}</span>
                </li>
              ))}
            </ol>

            <dl className="mt-6">
              <Field
                label={pick(WORKED_EXAMPLE.baseline.constraintLabel, locale)}
                value={pick(WORKED_EXAMPLE.baseline.constraint, locale)}
              />
            </dl>
          </div>
        </section>

        {/* 2 — Proposed control. Amber, enumerated, individually focusable. */}
        <section aria-labelledby="gate-control" className="lg:col-span-5">
          <div className="h-full rounded-2xl border-l-2 border-signal-amber bg-card p-5 sm:p-6">
            <h3 id="gate-control" className="h-card">
              {pick(WORKED_EXAMPLE.controls.label, locale)}
            </h3>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">
              {pick(WORKED_EXAMPLE.controls.caption, locale)}
            </p>

            <div role="radiogroup" aria-label={pick(WORKED_EXAMPLE.controls.label, locale)} className="mt-5 space-y-2">
              {CONTROLS.map((control, i) => {
                const isSelected = selected === i;
                return (
                  <div key={control.id}>
                    <button
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={selected === null ? (i === 0 ? 0 : -1) : isSelected ? 0 : -1}
                      onClick={() => setSelected(i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        isSelected ? "border-signal-amber bg-signal-amber/10" : "border-border hover:border-signal-amber/50"
                      )}
                    >
                      <span className="mono-label shrink-0 text-primary-ink">C{i + 1}</span>
                      <span className={cn("body-copy leading-snug", isSelected && "font-medium")}>
                        {pick(control.option, locale)}
                      </span>
                    </button>

                    {isSelected && (
                      <dl className="mt-2 space-y-3 rounded-lg bg-muted/50 px-4 py-4">
                        <Field label={pick(WORKED_EXAMPLE.controls.testsLabel, locale)} value={pick(control.tests, locale)} />
                        <Field
                          label={pick(WORKED_EXAMPLE.controls.insightLabel, locale)}
                          value={pick(control.insight, locale)}
                        />
                        <Field label={pick(WORKED_EXAMPLE.controls.closesLabel, locale)} value={routeNames(control.closes)} />
                        <Field
                          label={pick(WORKED_EXAMPLE.controls.preservesLabel, locale)}
                          value={routeNames(control.preserves)}
                        />
                        <Field
                          label={pick(WORKED_EXAMPLE.controls.residualLabel, locale)}
                          value={routeNames(control.residual)}
                        />
                      </dl>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 — Decision output. Narrowest, densest. */}
        <section aria-labelledby="gate-output" className="lg:col-span-3">
          <div className="h-full rounded-2xl border-l-2 border-border bg-muted/40 p-5 sm:p-6">
            <h3 id="gate-output" className="h-card">
              {pick(WORKED_EXAMPLE.output.label, locale)}
            </h3>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">{pick(WORKED_EXAMPLE.output.caption, locale)}</p>

            <dl className="mt-6 space-y-5">
              <Field
                label={pick(WORKED_EXAMPLE.output.recommendedLabel, locale)}
                value={pick(WORKED_EXAMPLE.output.recommended, locale)}
              />
              <div>
                <dt className="mono-label">{pick(WORKED_EXAMPLE.output.evidenceLabel, locale)}</dt>
                <dd className="mt-1.5 space-y-2.5">
                  {WORKED_EXAMPLE.output.evidence.map((group, i) => (
                    <span key={i} className="block">
                      <span className="block text-[0.8125rem] font-medium text-foreground">
                        {pick(group.category, locale)}
                      </span>
                      <span className="block text-[0.8125rem] leading-snug text-muted-foreground">
                        {pick(group.items, locale)}
                      </span>
                    </span>
                  ))}
                </dd>
              </div>
              <Field
                label={pick(WORKED_EXAMPLE.output.validationLabel, locale)}
                value={pick(WORKED_EXAMPLE.output.validation, locale)}
              />
              <Field
                label={pick(WORKED_EXAMPLE.output.omissionLabel, locale)}
                value={pick(WORKED_EXAMPLE.output.omission, locale)}
              />
            </dl>
          </div>
        </section>
      </div>

      <p className="prose-measure mt-10 border-t border-border pt-6 body-copy leading-relaxed text-muted-foreground">
        {pick(WORKED_EXAMPLE.output.citation, locale)}
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono-label">{label}</dt>
      <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
