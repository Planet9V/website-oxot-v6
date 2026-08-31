"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { CLAIM_BOUNDARY, HERO, PROFILE, type ProfileSystem } from "./content";
import { ProfileCanvas } from "./ProfileCanvas";
import { SegmentedControl } from "./SegmentedControl";

/**
 * State container for the hero's hydraulic profile. It holds exactly two
 * things — which system is selected and which view is open — and nothing about
 * the route animation, which is declarative (see the note in the body).
 *
 * MOBILE RULES, FOLLOWED IN ORDER. The stacking order inside this panel is the
 * mandated one — view selector, canvas, selected-state summary — and the
 * narrow-viewport rendering is a genuinely different drawing (a stacked grade
 * ladder) rather than the desktop SVG scaled down, because scaling it down
 * would take its 11px stage labels below legibility, which the same rules name
 * as the failure to avoid. Both renderings are driven by one piece of state, so
 * they cannot disagree. Every control is a real button with a 44px target;
 * nothing depends on hover or drag; no state text hides behind either.
 *
 * The page's primary CTA sits above this panel, in the hero's copy column, and
 * is deliberately not repeated inside it — `OXOT_Visual_Rules.md` allows one
 * primary CTA per section, and duplicating it to satisfy a literal reading of
 * the mobile stack's trailing "CTA" step would break the stronger rule.
 *
 * ACCESSIBILITY: both visual renderings are `aria-hidden`, and the diagram's
 * real text equivalent is the always-present summary below, which is a live
 * region — so assistive technology reads one description of the current state
 * rather than two competing ones.
 */
export function HydraulicProfile({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() ?? false;
  const [systemId, setSystemId] = useState<string>(PROFILE[0].id);
  const [view, setView] = useState(0);

  const system = PROFILE.find((s) => s.id === systemId) ?? PROFILE[0];
  const targetIndex = system.stages.findIndex((s) => s.id === system.route.targetStageId);
  const targetStage = system.stages[targetIndex];

  /* NO TIMER AND NO STEP COUNTER. An earlier version drove the route's staging
     from a `setTimeout` chain writing a step index back into React state on
     every view change — which is a cascading-render pattern React's own rules
     reject, and which this repo's lint config catches. The staging is
     declarative instead: `ProfileCanvas` gives every staged element an
     animation delay on the same 320ms grid as the segment draws, and the whole
     sequence replays simply because switching view or system remounts it. */

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="mono-label">{pick(HERO.systemLabel, locale)}</p>
        <p className="mono-label rounded-full border border-border px-2.5 py-1">{pick(CLAIM_BOUNDARY, locale)}</p>
      </div>

      <SegmentedControl
        className="mt-3"
        variant="gate"
        ariaLabel={pick(HERO.systemLabel, locale)}
        value={systemId}
        onValueChange={setSystemId}
        items={PROFILE.map((s) => ({ value: s.id, label: pick(s.label, locale) }))}
      />

      <p className="mono-label mt-6">{pick(HERO.viewLabel, locale)}</p>
      <SegmentedControl
        className="mt-3"
        ariaLabel={pick(HERO.viewLabel, locale)}
        value={String(view)}
        onValueChange={(v) => setView(Number(v))}
        items={HERO.views.map((v, i) => ({ value: String(i), label: pick(v, locale), index: `V${i + 1}` }))}
      />

      {/* Desktop drawing. Keyed on system + view so switching either remounts
          it and the route sequence plays again from the start. */}
      <div className="mt-6 hidden sm:block">
        <ProfileCanvas key={`${systemId}-${view}`} system={system} view={view} reduced={reduced} locale={locale} />
      </div>

      {/* Narrow-viewport drawing: the same profile as a grade ladder. */}
      <div className="mt-6 sm:hidden">
        <ProfileStack system={system} view={view} locale={locale} />
      </div>

      {/* Selected-state summary — the diagram's real text equivalent. */}
      <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4" aria-live="polite">
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
          <>
            <p className="prose-measure mt-3 border-l-2 border-signal-red pl-3 text-sm leading-relaxed text-foreground">
              {pick(system.route.impact, locale)}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {HERO.impactTags.map((tag, i) => (
                <li key={i} className="rounded-md border border-border px-2 py-1 text-[0.8125rem] text-muted-foreground">
                  {pick(tag, locale)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="prose-measure mt-4 text-sm leading-relaxed text-muted-foreground">{pick(HERO.note, locale)}</p>
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
 * The narrow-viewport profile: one row per stage, with a bar whose length is
 * the remaining hydraulic grade, so the fall through treatment and the lift at
 * a pump station still read at a glance. Same data, same state, no shrunken
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
      {/* The label sits on its own line above its grade track. An earlier
          version put the track and the label side by side, which squeezed the
          stage name to nothing at the high-grade stages — the exact
          unreadable-label failure the desktop canvas is skipped on mobile to
          avoid, reintroduced by a different route. */}
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
