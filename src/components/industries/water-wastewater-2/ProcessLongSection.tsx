"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ARCHITECTURE, type ArchSystem } from "./content.architecture";
import { SegmentedControl } from "./SegmentedControl";

/**
 * S02 · THE PROCESS LONG-SECTION — an actual drawn section, and the single
 * biggest structural upgrade over iteration 1.
 *
 * `-1` rendered the source's architecture stages as a stepped `<ol>` indented
 * by index: a text row wearing a diagram's name. This draws the real thing — a
 * grade line falling through each treatment barrier and lifted again by
 * pumping, with stage nodes on the line and the source's own equipment lists as
 * labelled callouts hanging beneath it.
 *
 * MANDATED CUSTOM, NOT CHOSEN. The content-to-visual mapping table routes
 * "operational consequence" to a process-chain diagram and explicitly not to a
 * generic warning card, and the Component Inventory's process-diagram row says
 * these stay custom SVG/HTML because no viable library exists. Pattern 4
 * (Facility Cross-Section Scroll) is the near miss and is deliberately NOT
 * used: its layers are the Seldon Engine's seven, serving Deliverable 4. These
 * are process stages.
 *
 * TWO SELECTABLE SYSTEMS, because source L102 requires exactly that: Drinking
 * Water and Wastewater, sharing a SCADA/telemetry layer and sharing almost
 * nothing else.
 *
 * WHAT IS AND IS NOT A STAGE. The source's architecture blocks each end with
 * one or two entries that are not process stages — "Control and operations",
 * "Communications", "Control and monitoring". Putting a radio link at an
 * elevation would be nonsense, so those render as the bands beneath the
 * section, which is also exactly how the source lays them out.
 *
 * NO ACCORDION. The Foundation Spec bars hiding complex technical content
 * behind disclosure merely to shorten a page. Every stage renders in full.
 *
 * NO BALANCE GROUP HERE, deliberately: the long-section is one drawing, not a
 * pair of siblings, so there is nothing to relate. Stating that is the point —
 * the harness prints how many marked groups a route has, and an unmarked
 * section should read as reasoned rather than missed.
 *
 * NOT MARKED `data-gfx-meaning` either, and for the harness's own stated
 * reason: WCAG 1.4.11 exempts decoration, and this drawing's faint `--border`
 * datum ticks and stage divisions are meant to be faint. Marking the figure
 * would report them as failures on every run. The information the drawing
 * carries is also carried in words by the callout list below it, which is the
 * accessible equivalent that actually helps.
 */

const W = 960;
const PAD = 28;
const TOP = 54;
const BASE = 186;
const NAME_Y = 212;
const BAND_H = 28;
const CTRL_Y = 246;
const COMMS_Y = 288;

const CYAN = "hsl(var(--signal-cyan))";
const BLUE = "hsl(var(--signal-blue))";
const LINE = "hsl(var(--border))";
const INK = "hsl(var(--muted-foreground))";

const gradeY = (grade: number) => BASE - ((grade - 1) / 5) * (BASE - TOP);

function wrapLabel(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) current = word;
    else if ((current + " " + word).length <= maxChars) current = `${current} ${word}`;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export function ProcessLongSection({ locale }: { locale: Locale }) {
  const [systemId, setSystemId] = useState<string>(ARCHITECTURE.systems[0].id);
  const system = (ARCHITECTURE.systems.find((s) => s.id === systemId) ?? ARCHITECTURE.systems[0]) as ArchSystem;

  const n = system.stages.length;
  const col = (W - PAD * 2) / n;
  const centerX = (i: number) => PAD + i * col + col / 2;
  const height = system.commsBand ? 336 : 294;
  const maxChars = Math.max(12, Math.floor(col / 7.4));

  return (
    <div>
      <SegmentedControl
        variant="gate"
        ariaLabel={pick(ARCHITECTURE.h2, locale)}
        value={systemId}
        onValueChange={setSystemId}
        items={ARCHITECTURE.systems.map((s) => ({ value: s.id, label: pick(s.label, locale) }))}
        className="max-w-md"
      />

      <figure className="m-0 mt-8">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-6">
          <svg
            viewBox={`0 0 ${W} ${height}`}
            className="h-auto w-full min-w-[44rem]"
            aria-hidden="true"
            focusable="false"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {/* The datum the section is measured against — the same ticked rule
                the page's dividers use, doing its original job. */}
            <line x1={PAD} y1={BASE} x2={W - PAD} y2={BASE} stroke={LINE} strokeWidth={1} />
            {Array.from({ length: Math.floor((W - PAD * 2) / 32) + 1 }).map((_, i) => (
              <line
                key={`tick-${i}`}
                x1={PAD + i * 32}
                y1={BASE}
                x2={PAD + i * 32}
                y2={BASE + 4}
                stroke={LINE}
                strokeWidth={1}
              />
            ))}

            {system.stages.map((stage, i) => {
              const y = gradeY(stage.grade);
              const prevY = i > 0 ? gradeY(system.stages[i - 1].grade) : y;
              const x0 = PAD + i * col;
              return (
                <g key={stage.id}>
                  {/* The water body at this stage: how much head is still in
                      hand once the barrier above it has taken its share. */}
                  <rect x={x0} y={y} width={col} height={BASE - y} fill={CYAN} fillOpacity={0.12} />
                  <line x1={x0} y1={y} x2={x0 + col} y2={y} stroke={CYAN} strokeWidth={1.75} strokeLinecap="square" />
                  {i > 0 && (
                    <>
                      <line
                        x1={x0}
                        y1={Math.min(y, prevY)}
                        x2={x0}
                        y2={BASE}
                        stroke={LINE}
                        strokeWidth={1}
                        strokeDasharray="2 3"
                      />
                      {/* The riser: a fall through the barrier, or — at a pump
                          or lift station — a lift, marked with a chevron. That
                          asymmetry is why this is a long-section and not a
                          left-to-right chain of boxes. */}
                      <line x1={x0} y1={prevY} x2={x0} y2={y} stroke={CYAN} strokeWidth={1.75} />
                      {stage.lift && (
                        <path
                          d={`M ${x0 - 6},${prevY - 9} L ${x0},${prevY - 18} L ${x0 + 6},${prevY - 9}`}
                          fill="none"
                          stroke={CYAN}
                          strokeWidth={1.75}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </>
                  )}

                  {/* The stage node, sitting on the grade line. */}
                  <circle cx={centerX(i)} cy={y} r={5} fill="hsl(var(--card))" stroke={CYAN} strokeWidth={2} />
                  {/* The callout leader, from the node down past the datum to
                      the equipment list rendered in HTML below. */}
                  <line
                    x1={centerX(i)}
                    y1={y + 6}
                    x2={centerX(i)}
                    y2={NAME_Y - 14}
                    stroke={LINE}
                    strokeWidth={1}
                    strokeDasharray="2 3"
                  />
                  {wrapLabel(pick(stage.name, locale), maxChars).map((line, li) => (
                    <text
                      key={li}
                      x={centerX(i)}
                      y={NAME_Y + li * 14}
                      textAnchor="middle"
                      fontSize={12}
                      letterSpacing="0.04em"
                      fill={INK}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}

            {/* The shared layers, spanning every stage — never assigned to one,
                because the source assigns none. */}
            <Band
              y={CTRL_Y}
              caption={pick(system.controlBand.caption, locale)}
              text={pick(system.controlBand.text, locale)}
            />
            {system.commsBand && (
              <Band
                y={COMMS_Y}
                caption={pick(system.commsBand.caption, locale)}
                text={pick(system.commsBand.text, locale)}
              />
            )}
          </svg>
        </div>

        {/* The equipment callouts, as real HTML so the source's own lists wrap
            naturally at any width instead of being condensed into SVG text. */}
        <figcaption className="mt-6">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={pick(system.label, locale)}>
            {system.stages.map((stage) => (
              <li key={stage.id} className="border-t border-border pt-3">
                <p className="body-copy font-semibold leading-snug text-foreground">{pick(stage.name, locale)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(stage.equipment, locale)}</p>
              </li>
            ))}
            <li className="border-t border-signal-blue pt-3">
              <p className="body-copy font-semibold leading-snug text-foreground">
                {pick(system.controlBand.caption, locale)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {pick(system.controlBand.text, locale)}
              </p>
            </li>
            {system.commsBand && (
              <li className="border-t border-signal-blue pt-3">
                <p className="body-copy font-semibold leading-snug text-foreground">
                  {pick(system.commsBand.caption, locale)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pick(system.commsBand.text, locale)}
                </p>
              </li>
            )}
          </ol>
        </figcaption>
      </figure>

      {/* No `prose-measure` (removed 2026-08-25) — see DecisionSwitchboard.tsx's
          identical fix for the reasoning. Found proactively, not flagged by
          name — same copy-pasted closing-note idiom as the other 3. */}
      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(ARCHITECTURE.twinNote, locale)}
      </p>
    </div>
  );
}

function Band({ y, caption, text }: { y: number; caption: string; text: string }) {
  return (
    <g>
      <rect
        x={PAD}
        y={y}
        width={W - PAD * 2}
        height={BAND_H}
        rx={4}
        fill="hsl(var(--muted))"
        stroke={BLUE}
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <text x={PAD + 12} y={y + 18} fontSize={12} letterSpacing="0.06em" fill="hsl(var(--foreground))" fontWeight={600}>
        {caption.toUpperCase()}
      </text>
      <text x={PAD + 26 + caption.length * 8.4} y={y + 18} fontSize={12} letterSpacing="0.03em" fill={INK}>
        {text}
      </text>
    </g>
  );
}
