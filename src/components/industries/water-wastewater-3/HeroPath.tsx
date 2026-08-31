"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import type { SystemPath } from "@/components/twin/types";
import { same } from "../registry";
import { DOSING_SCENARIO } from "./content.scenario";
import {
  AssetRow,
  CHAIN,
  ConsequenceChip,
  EntryZone,
  SEGMENT_COUNT,
  Segment,
  VB_H,
  VB_W
} from "./HeroPathCanvas";

/**
 * S00's RIGHT PANE — PATTERN 1's mechanic, STRICT SINGLE PATH.
 *
 * One path: entry node, two intermediate assets, highlighted target, then the
 * scenario's own `Consequence` record. No view switcher and no second
 * illustration — the four-view switcher (source L62) and the drinking-water /
 * wastewater selector (L102) belong to S02, per the plan in page.tsx.
 *
 * ZERO FABRICATED NODES — checked at module load, not asserted in a comment.
 * Every consecutive pair of `CHAIN_IDS` is looked up in `DOSING_PATHS` by
 * (from, to), and the two ends are checked against the scenario's own
 * `entryAssetId` / `targetAssetId`. All four checks throw. Adding a node the
 * scenario does not model breaks the page rather than drawing a plausible lie.
 *
 * FOUR NODES, AND THE SIX-NODE VERSION THAT CAME FIRST. Built first with all six
 * ids Wave 0 exported — vendor, firewall, workstation, PLC, metering pump,
 * dosing skid — arguing that stopping at the controller states the generic "a
 * PLC was reachable" claim this page exists in order not to make.
 * `scripts/measure.mjs` failed it: hero-panes h=0.57 against Pattern 1's 0.67,
 * heights [441, 767] at 1440 and 2560. Six stacked stations in a narrow column
 * is simply a tall box, and the rule's own remedy is to SHRINK THE OVERSIZED
 * SIBLING, never pad the short one. Returning to the pattern's stated node count
 * is that shrink, and it costs the argument nothing: the amber consequence chip
 * still ends the cascade at the disinfection outcome, so the hero still ends
 * where the water does, and the two process assets render at S07 where the full
 * ledger has room. `DOSING_CHAIN_ASSET_IDS` is sliced, never reordered.
 *
 * WHAT ANIMATES, AND WHAT NEVER DOES. Every node, label and the consequence chip
 * are server-rendered at full opacity, readable before a line of JavaScript
 * runs. The only animated things are the blue connector, drawn a segment at a
 * time, and the station badge each segment arrives at. Nothing load-bearing is
 * gated behind motion — Pattern 1's own correction — and nothing trips
 * `measure.mjs`'s GHOSTED check, which fails text under 0.9 opacity.
 *
 * TIMING: four discrete per-segment draws, 340ms each, 400ms apart. Every
 * individual motion sits inside the Foundation Spec's 300-500ms diagram tier,
 * which is the point of "N discrete draws, never one continuous sweep".
 *
 * `prefers-reduced-motion` IS HANDLED IN CSS, NOT JAVASCRIPT, and that is
 * load-bearing. The canvas server-renders UNDRAWN so the sequence starts from
 * the beginning with no visible reset; a JS reduced-motion check runs only after
 * hydration, by which time the server HTML has painted, so a reader who asked
 * for less motion would watch the drawn state appear and then rebuild itself.
 * `motion-reduce:` on the state variables puts them at the lit end-state before
 * first paint, and hides the play button, which would be a no-op for them.
 *
 * EVERY ANIMATED VALUE GOES THROUGH ONE CSS VARIABLE (`--seg-off`,
 * `--badge-fill`, `--badge-ink`), written by exactly one class at a time and
 * never by a base class a state class must out-order — two arbitrary-property
 * utilities have identical specificity, so that contest would be settled by
 * Tailwind's emission order.
 *
 * MOBILE IS TAP-TO-PLAY: autoplay only when `(min-width: 1024px)` matches.
 * Otherwise the sequence waits on the button above the canvas — a 44px target
 * per Mobile Rules, present at every viewport since it doubles as desktop
 * replay, and not a drag interaction.
 *
 * TOKENS. The path is `--signal-blue` end to end and never resolves to green:
 * nothing is validated-closed at first paint. Amber appears once, on the
 * consequence chip, never on the path — amber means *proposed/pending*, and
 * painting a breached target amber reads as a remediation proposal.
 *
 * NO WORD IS PAINTED IN A SIGNAL TOKEN, and that is a measured correction. The
 * first build set ENTRY, TARGET and CONSEQUENCE in `--signal-blue` and
 * `--signal-amber`; the harness returned 3.56, 3.56 and 3.57:1 on `--card` in
 * light theme, under WCAG 1.4.3's 4.5:1. Not a bug in the tokens: the Foundation
 * Spec computed each `-on-light` signal to clear the 3:1 NON-TEXT floor of
 * 1.4.11 "with headroom (3.31-3.33:1)", which is the entire budget they were
 * given. A signal token is a colour for a SHAPE. So shapes stay signal-coloured
 * and every word sits in `--foreground` — which strengthens "never colour alone"
 * rather than weakening it: the outline carries the signal, the word names it.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  entry: same("Entry"),
  target: same("Target"),
  consequence: same("Consequence"),
  play: same("Play the path"),
  replay: same("Replay the path"),
  summaryLabel: same("Modelled path, in words"),
  diagramTitle: same(
    "Single modelled path: vendor remote support through to the disinfection consequence"
  ),
  legendLabel: same("What the two colours mean"),
  legendPath: same("Modelled path — open, nothing closed"),
  legendConsequence: same("Consequence"),
  scenarioLabel: same("Scenario"),
  /* Source L249, verbatim. This is the chain step between the controller and
     the disinfection outcome, and the reason the last connector exists — the
     one link on this canvas that is not itself a modelled `SystemPath`, because
     it is what an attacker DOES at the target rather than a route to it. */
  manipulation: same("Setpoint, logic, mode, or pump-state manipulation becomes possible"),
  role: {
    "required-flow": same("required flow"),
    "attack-path": same("attack path"),
    management: same("management"),
    "vendor-access": same("vendor access")
  } as Record<SystemPath["role"], Bilingual>
};

export function HeroPath({ locale }: { locale: Locale }) {
  const [drawn, setDrawn] = useState(0);
  const [played, setPlayed] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    setPlayed(true);
    setDrawn(0);
    timer.current = setInterval(() => {
      setDrawn((n) => {
        if (n >= SEGMENT_COUNT) {
          if (timer.current) clearInterval(timer.current);
          return n;
        }
        return n + 1;
      });
    }, 400);
  }, []);

  useEffect(() => {
    /* Desktop autoplay only. Reduced motion is deliberately NOT consulted here:
       the CSS already holds those readers at the end-state, and running the
       sequence for them would fight it.

       DEFERRED BY A TIMEOUT rather than called inline, and not merely to quiet
       `react-hooks/set-state-in-effect`. Calling `play()` in the effect body
       sets state during the hydration commit, so React re-renders before the
       browser has painted the undrawn canvas once — the first segment would
       animate out of a frame nobody saw. A macrotask lets the undrawn state
       paint first, which is the state the whole sequence starts from. */
    let start: ReturnType<typeof setTimeout> | undefined;
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(min-width: 1024px)").matches
    ) {
      start = setTimeout(play, 0);
    }
    return () => {
      if (start) clearTimeout(start);
      if (timer.current) clearInterval(timer.current);
    };
  }, [play]);

  const summary =
    CHAIN.map((l) => l.asset.label).join(" → ") +
    " → " +
    DOSING_SCENARIO.consequence.operationalEffect;

  return (
    /* THE GROUP MARK IS ON THIS `figure`, NOT on the grid cell WaterHero puts
       it in. The cell is `items-stretch` and therefore equal by construction;
       measuring it would let a stretched empty box pass the ratio, which is the
       exact defect the floor rule exists to catch. This element's height is
       real content height. */
    /* `data-gfx-meaning` opts this figure into the harness's WCAG 1.4.11 pass.
       It is not optional here: the harness only checks marked figures, and its
       own note says an unmarked figure that carries meaning is simply not
       covered. Every shape on this canvas is argument, not ornament. */
    <figure data-balance-group="hero-panes" data-gfx-meaning className="m-0">
      <div data-balance-item className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Pattern 1's claim boundary, printed rather than implied. The
              literal is the scenario record's own required `label`, so the
              disclaimer cannot drift from the data it disclaims. */}
          <p data-balance-item className="mono-label rounded-full border border-border px-2.5 py-1">
            {DOSING_SCENARIO.label}
          </p>
          <button
            data-balance-item
            type="button"
            onClick={play}
            className="mono-label inline-flex min-h-[44px] items-center rounded-full border border-border px-4 text-primary-ink transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:hidden"
          >
            {pick(played ? T.replay : T.play, locale)}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="mt-3 h-auto w-full"
          role="img"
          aria-label={pick(T.diagramTitle, locale)}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {CHAIN[0].asset.zone && <EntryZone zone={CHAIN[0].asset.zone} />}

          {/* Connectors first, so the node boxes paint over their ends. */}
          {CHAIN.map((link, i) =>
            i === 0 ? null : (
              <Segment
                key={link.asset.id}
                drawn={drawn >= i}
                index={i - 1}
                label={link.path ? pick(T.role[link.path.role], locale) : ""}
                zone={
                  link.asset.zone && link.asset.zone !== CHAIN[i - 1].asset.zone
                    ? link.asset.zone
                    : null
                }
              />
            )
          )}
          <Segment
            drawn={drawn >= SEGMENT_COUNT}
            index={CHAIN.length - 1}
            label={pick(T.manipulation, locale)}
            zone={null}
          />

          {CHAIN.map((link, i) => (
            <AssetRow
              key={link.asset.id}
              asset={link.asset}
              index={i}
              lit={drawn >= i}
              locale={locale}
              tag={
                link.asset.id === DOSING_SCENARIO.entryAssetId
                  ? pick(T.entry, locale)
                  : link.asset.id === DOSING_SCENARIO.targetAssetId
                    ? pick(T.target, locale)
                    : null
              }
            />
          ))}

          <ConsequenceChip label={pick(T.consequence, locale)} />
        </svg>
      </div>

      {/* Names the record the reader is looking at, and the same one S07 works
          in full. Without it the canvas is an unattributed drawing. */}
      <p data-balance-item className="mt-4 body-copy leading-relaxed text-foreground">
        <span className="mono-label mr-2">{pick(T.scenarioLabel, locale)}</span>
        {DOSING_SCENARIO.title}
      </p>

      {/* Colour is never the only carrier of meaning (Visual Foundation Spec
          §3.1's hard rule), and this canvas uses exactly two signal colours.
          Naming both in words is what discharges that rule here. */}
      <ul
        data-balance-item
        aria-label={pick(T.legendLabel, locale)}
        className="mt-3 flex flex-col gap-1.5"
      >
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-0.5 w-6 shrink-0 rounded-full bg-signal-blue"
          />
          <span className="mono-label">{pick(T.legendPath, locale)}</span>
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-3 w-6 shrink-0 rounded-sm border border-signal-amber"
          />
          <span className="mono-label">{pick(T.legendConsequence, locale)}</span>
        </li>
      </ul>

      {/* Pattern 1's required visually-hidden summary. The animation is
          decorative precisely because this sentence carries the same path. */}
      <figcaption className="sr-only">
        {pick(T.summaryLabel, locale)}: {summary}.
      </figcaption>
    </figure>
  );
}
