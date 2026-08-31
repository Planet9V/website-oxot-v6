"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { CLAIM_BOUNDARY, HERO } from "./content";
import { PROFILE, type ProfileSystem } from "./content.profile";
import { ProfileCanvas } from "./ProfileCanvas";
import { SegmentedControl } from "./SegmentedControl";

/**
 * THE HERO'S DIAGRAM PANE. It holds exactly two pieces of state — which system
 * is selected and which view is open — and nothing about the route animation,
 * which is declarative inside `ProfileCanvas`.
 *
 * SIX CONTENT ELEMENTS, MARKED, AND THE COUNT IS THE POINT. Pattern 1's
 * pane-balance floor is measured on two things, with the worse governing:
 * rendered height AND count of distinct content elements. This pane carries
 * six — system selector, view selector, canvas, state summary, claim chip,
 * legend — against the copy pane's eight, which is 6/8 = 0.75, clear of the
 * 0.67 floor. Each is marked `data-balance-item` so the harness counts what a
 * reader would count rather than guessing at leaf text nodes.
 *
 * THE MARK GOES ON THE INNER WRAPPER, NEVER ON THE GRID CELL. The hero row is
 * `items-stretch`, so both grid CELLS are equal by construction and measuring
 * them would let a stretched empty box pass. The wrapper below sizes to its
 * content; the card around it takes `h-full` so the two panes still visually
 * agree.
 *
 * MOBILE RULES, IN ORDER: view selector, canvas, selected-state summary. The
 * narrow-viewport rendering is a genuinely different drawing (a stacked grade
 * ladder) rather than the desktop SVG scaled down, because scaling it down
 * would take its 12px stage labels below legibility. Both renderings are driven
 * by one piece of state, so they cannot disagree.
 *
 * The page's primary CTA sits in the copy pane and is deliberately not repeated
 * here — one primary CTA per section.
 *
 * ACCESSIBILITY: both visual renderings are `aria-hidden`, and the diagram's
 * real text equivalent is the always-present summary, which is a live region —
 * so assistive technology reads one description of the current state rather
 * than two competing ones.
 */
export function ProfilePanel({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() ?? false;
  const [systemId, setSystemId] = useState<string>(PROFILE[0].id);
  const [view, setView] = useState(0);

  const system = PROFILE.find((s) => s.id === systemId) ?? PROFILE[0];
  const targetIndex = system.stages.findIndex((s) => s.id === system.route.targetStageId);
  const targetStage = system.stages[targetIndex];

  return (
    <div className="h-full rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div data-balance-group="hero-panes">
        {/* 1 · system selector */}
        <div data-balance-item>
          <p className="mono-label">{pick(HERO.systemLabel, locale)}</p>
          <SegmentedControl
            className="mt-3"
            variant="gate"
            ariaLabel={pick(HERO.systemLabel, locale)}
            value={systemId}
            onValueChange={setSystemId}
            items={PROFILE.map((s) => ({ value: s.id, label: pick(s.label, locale) }))}
          />
        </div>

        {/* 2 · view selector */}
        <div data-balance-item className="mt-4">
          <p className="mono-label">{pick(HERO.viewLabel, locale)}</p>
          <SegmentedControl
            className="mt-3"
            ariaLabel={pick(HERO.viewLabel, locale)}
            value={String(view)}
            onValueChange={(v) => setView(Number(v))}
            items={HERO.views.map((v, i) => ({ value: String(i), label: pick(v, locale), index: `V${i + 1}` }))}
          />
        </div>

        {/* 3 · the canvas. Keyed on system + view so switching either remounts
               it and the route sequence plays again from the start. */}
        <div data-balance-item className="mt-4">
          <div className="hidden sm:block">
            <ProfileCanvas key={`${systemId}-${view}`} system={system} view={view} reduced={reduced} locale={locale} />
          </div>
          <div className="sm:hidden">
            <ProfileStack system={system} view={view} locale={locale} />
          </div>
        </div>

        {/* 4 · selected-state summary — the diagram's real text equivalent. */}
        <div data-balance-item className="mt-4 rounded-xl border border-border bg-muted/50 p-3.5" aria-live="polite">
          <p className="mono-label">{pick(HERO.views[view], locale)}</p>
          <p className="prose-measure mt-2 text-sm leading-relaxed text-muted-foreground">
            {buildSummary(system, view, locale)}
          </p>

          {view === 2 && (
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground">
              <span>{pick(system.route.entry, locale)}</span>
              <span aria-hidden="true" className="text-muted-foreground">
                &#8594;
              </span>
              <span>Comms</span>
              <span aria-hidden="true" className="text-muted-foreground">
                &#8594;
              </span>
              <span>Control</span>
              <span aria-hidden="true" className="text-muted-foreground">
                &#8594;
              </span>
              <span className="font-medium">{pick(targetStage.name, locale)}</span>
              <span aria-hidden="true" className="text-muted-foreground">
                &#8594;
              </span>
              <span className="rounded-md border border-signal-amber px-2 py-0.5 text-[0.8125rem]">
                {pick(system.route.consequence, locale)}
              </span>
            </p>
          )}

          {view === 3 && (
            <p className="prose-measure mt-3 border-l-2 border-signal-red pl-3 text-sm leading-relaxed text-foreground">
              {pick(system.route.impact, locale)}
            </p>
          )}
        </div>

        {/* 5 and 6 · the claim boundary and the legend, on ONE row.
               The claim boundary is printed on the hero itself because Pattern 1
               requires it there, not in a footnote further down the page; the
               legend is beside it because every colour the canvas uses has to
               be decodable in words, and because the harness measured this pane
               0.59 against the copy pane at Pattern 1's 0.67 floor. The rule's
               own remedy is to reduce the DIAGRAM pane, so the legend lost its
               own label and its own block rather than the copy pane gaining
               filler. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p data-balance-item className="mono-label inline-flex rounded-full border border-border px-2.5 py-1">
            {pick(CLAIM_BOUNDARY, locale)}
          </p>
          <ul data-balance-item aria-label={pick(HERO.legendLabel, locale)} className="flex flex-wrap gap-x-3 gap-y-1">
            {HERO.legend.map((entry, i) => (
              <li key={i} className="text-[0.8125rem] leading-snug text-muted-foreground">
                {pick(entry, locale)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function buildSummary(system: ProfileSystem, view: number, locale: Locale): string {
  const focus = pick(HERO.viewFocus[view], locale);
  if (view === 0) {
    const stages = system.stages.map((s) => pick(s.name, locale)).join(" → ");
    return `${focus} ${pick(system.label, locale)}: ${stages}.`;
  }
  if (view === 2) return `${pick(system.route.title, locale)}. ${focus}`;
  return focus;
}

/**
 * The narrow-viewport profile: one row per stage, with a bar whose length is the
 * remaining hydraulic grade, so the fall through treatment and the lift at a
 * pump station still read at a glance. Same data, same state, no shrunken
 * labels.
 */
function ProfileStack({ system, view, locale }: { system: ProfileSystem; view: number; locale: Locale }) {
  const targetIndex = system.stages.findIndex((s) => s.id === system.route.targetStageId);
  /* No staging on the narrow-viewport rendering. Mobile Rules ask for a simple,
     tap-driven alternative rather than a shrunken copy of the desktop
     behaviour, so the route reads as already traced the moment the view is
     chosen — same information, no waiting. */
  const reached = view === 2;

  return (
    <div aria-hidden="true">
      <ol className="space-y-2.5">
        {system.stages.map((stage, i) => {
          const receded = view === 3 && i > targetIndex;
          const flagged = view === 3 && i === targetIndex;
          const lit = reached && i === targetIndex;
          return (
            <li
              key={stage.id}
              className={cn(
                "border-l-2 pl-3 transition-colors duration-200",
                flagged
                  ? "border-signal-red"
                  : lit
                    ? "border-signal-blue"
                    : receded
                      ? "border-signal-slate"
                      : "border-signal-cyan"
              )}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-sm leading-snug",
                    flagged ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {pick(stage.name, locale)}
                </span>
                {stage.lift && <span className="mono-label shrink-0">Lift</span>}
              </div>
              {/* The grade track: how much head is left at this stage. */}
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", receded ? "bg-signal-slate/40" : "bg-signal-cyan/45")}
                  style={{ width: `${(stage.grade / 6) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {view >= 1 && (
        <div className="mt-4 space-y-2">
          {[
            { caption: "Control", text: pick(system.controlLayer, locale), lit: view === 2 },
            { caption: "Comms", text: pick(system.commsLayer, locale), lit: view === 2 }
          ].map((band) => (
            <div
              key={band.caption}
              className={cn(
                "rounded-lg border bg-muted/60 px-3 py-2 transition-colors duration-200",
                band.lit ? "border-signal-blue" : "border-border"
              )}
            >
              <p className="mono-label text-foreground">{band.caption}</p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{band.text}</p>
            </div>
          ))}
        </div>
      )}

      {view === 2 && (
        <div className="mt-3 rounded-lg border border-signal-blue bg-card px-3 py-2">
          <p className="mono-label text-foreground">{pick(system.route.entry, locale)}</p>
        </div>
      )}
    </div>
  );
}
