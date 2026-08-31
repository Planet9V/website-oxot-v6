import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { assetGlyph, CriticalityMark, TYPE_LABEL } from "@/components/twin/AssetNode";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { DOSING_CHAIN_ASSET_IDS, DOSING_PATHS, DOSING_SCENARIO } from "./content.scenario";
import { WATER_ASSETS } from "./content.assets";

/**
 * S00's canvas: geometry, the verified chain, and the three shapes drawn on it.
 *
 * A FIFTH FILE, WHICH THE WAVE BRIEF DID NOT NAME — recorded rather than slipped
 * in. `HeroPath.tsx` reached 635 lines (489 of code), over the project's
 * 500-line rule, once the measured-defect notes were written down. Cutting
 * comments alone lands around 525 AND deletes the record of two real defects
 * this canvas shipped and fixed, which is the more expensive loss. Splitting the
 * pure geometry and the presentational SVG out is the structural fix rather than
 * the cosmetic one. `HeroPath.tsx` keeps the pattern argument, the copy and the
 * play/replay state; nothing here holds state or reads a media query.
 *
 * Every reasoning note stays attached to the line it explains — see `Segment`
 * for the Tailwind class-scan defect, and `AssetRow` for the two WCAG failures.
 */

/* ── Geometry, in viewBox units ──────────────────────────────────────────── */

export const VB_W = 448;
const RAIL_X = 18;
const NODE_X = 42;
const NODE_W = VB_W - NODE_X - 6;
const NODE_H = 34;
const PITCH = 80;
/** Leaves a band above row 0 for the ENTRY node's own zone. Without it the
 *  canvas labels the two zone CROSSINGS and never says which zone the path
 *  starts in — which is the vendor's, and the one a reader most needs. */
const ROW_Y0 = 28;
const BADGE_R = 10;

const row = (i: number) => ROW_Y0 + i * PITCH;
const badgeCy = (i: number) => row(i) + NODE_H / 2;

/** Every segment is a straight vertical run down the badge rail, so its length
 *  is one constant and `stroke-dashoffset` needs no per-path measurement. */
const SEG_LEN = PITCH - 2 * BADGE_R;

/** Width available to a gap label: from its left inset to the canvas edge. */
const GAP_TEXT_W = VB_W - 6 - (NODE_X + 10);

/* ── The chain, derived and verified against the scenario's own data ─────── */

export interface Link {
  asset: SystemAsset;
  /** The modelled path that REACHES this asset. Absent on the entry node only. */
  path?: SystemPath;
}

/** Entry node, two intermediates, target — Pattern 1's own node count. The slice
 *  is the only edit made to Wave 0's export: same ids, same order. */
const CHAIN_IDS = DOSING_CHAIN_ASSET_IDS.slice(0, 4);

export const CHAIN: Link[] = CHAIN_IDS.map((id, i) => {
  const asset = WATER_ASSETS.find((a) => a.id === id);
  if (!asset) throw new Error(`HeroPath: no asset "${id}" in WATER_ASSETS`);
  if (i === 0) return { asset };
  const from = CHAIN_IDS[i - 1];
  const path = DOSING_PATHS.find((p) => p.from === from && p.to === id);
  if (!path) throw new Error(`HeroPath: no modelled path ${from} → ${id} in DOSING_PATHS`);
  return { asset, path };
});

/* The slice must not silently drop the scenario's own endpoints. */
if (CHAIN[0].asset.id !== DOSING_SCENARIO.entryAssetId) {
  throw new Error("HeroPath: first node is not the scenario's entryAssetId");
}
if (CHAIN[CHAIN.length - 1].asset.id !== DOSING_SCENARIO.targetAssetId) {
  throw new Error("HeroPath: last node is not the scenario's targetAssetId");
}

/** Three asset-to-asset links plus the cascade into the `Consequence` record. */
export const SEGMENT_COUNT = CHAIN.length;

const CONSEQUENCE_Y = row(CHAIN.length - 1) + PITCH;
const CONSEQUENCE_H = 62;
export const VB_H = CONSEQUENCE_Y + CONSEQUENCE_H + 8;

/* ── Text fitting ────────────────────────────────────────────────────────── */

/** Condense rather than shrink. The technical-label floor is 11px and Dutch runs
 *  longer than English, so an over-wide label is fitted with SVG's own
 *  `textLength` instead of dropping below the floor. */
function fitted(text: string, width: number, perChar: number) {
  return text.length * perChar > width
    ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const }
    : {};
}

/** Balanced two-line break for a label that will not fit on one. Three gap
 *  labels here are two words long and never split; the fourth is L249's full
 *  sentence, which is not going to be shortened to fit a drawing. */
function twoLines(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  if (words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/* ── Shapes ──────────────────────────────────────────────────────────────── */

/** The zone the path starts in. No dashed rule above it: this is the opening
 *  zone, not a crossing, and a boundary drawn at the top of the canvas would
 *  assert one the model does not have. */
export function EntryZone({ zone }: { zone: string }) {
  return (
    <text x={VB_W - 6} y={18} fontSize={11} textAnchor="end" fill="hsl(var(--muted-foreground))">
      {zone.toUpperCase()}
    </text>
  );
}

/** One connector, plus the two things that belong in the gap it spans: what kind
 *  of path it is, and the zone boundary it crosses where it crosses one. */
export function Segment({
  drawn,
  index,
  label,
  zone
}: {
  drawn: boolean;
  index: number;
  label: string;
  zone: string | null;
}) {
  const gapY = row(index) + NODE_H;
  return (
    <g>
      <line
        x1={RAIL_X}
        y1={badgeCy(index) + BADGE_R}
        x2={RAIL_X}
        y2={badgeCy(index + 1) - BADGE_R}
        stroke="hsl(var(--signal-blue))"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={SEG_LEN}
        /* `--seg-len` is carried by INLINE STYLE and `--seg-off` by CLASS, and
           the split is not arbitrary. Tailwind emits a utility only if it can
           find the literal class string in the source; a template literal like
           `[--seg-off:${SEG_LEN}px]` is invisible to that scan, so the rule was
           never generated, `var(--seg-off)` resolved to nothing, and every
           segment painted fully drawn. Caught on a 390px screenshot showing a
           complete path under a button reading "PLAY THE PATH" — the harness
           could not see it, because it measures after the sequence would have
           finished anyway. Both class names below are literals; only the length,
           which no CSS selector depends on, is dynamic. */
        style={{ "--seg-len": `${SEG_LEN}px`, strokeDashoffset: "var(--seg-off)" } as CSSProperties}
        className={[
          drawn ? "[--seg-off:0px]" : "[--seg-off:var(--seg-len)]",
          "transition-[stroke-dashoffset] duration-[340ms] ease-linear",
          "motion-reduce:transition-none motion-reduce:[--seg-off:0px]"
        ].join(" ")}
      />
      {twoLines(label.toUpperCase(), 56).map((line, i) => (
        <text
          key={i}
          x={NODE_X + 10}
          y={gapY + 15 + i * 14}
          fontSize={11}
          fill="hsl(var(--muted-foreground))"
          {...fitted(line, GAP_TEXT_W, 6.9)}
        >
          {line}
        </text>
      ))}
      {zone && (
        <>
          {/* A conduit boundary in the brief's own zone language, drawn in
              `--border` rather than a signal colour: a zone boundary is
              structure, not state. */}
          <line
            x1={NODE_X}
            y1={gapY + 25}
            x2={VB_W - 6}
            y2={gapY + 25}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text
            x={VB_W - 6}
            y={gapY + 39}
            fontSize={11}
            textAnchor="end"
            fill="hsl(var(--muted-foreground))"
          >
            {zone.toUpperCase()}
          </text>
        </>
      )}
    </g>
  );
}

/** A numbered station on the rail plus its asset box. The badge is the only
 *  thing that changes as the path arrives — one property, so a reader tracking
 *  the draw is not also tracking four other things. */
export function AssetRow({
  asset,
  index,
  lit,
  locale,
  tag
}: {
  asset: SystemAsset;
  index: number;
  lit: boolean;
  locale: Locale;
  tag: string | null;
}) {
  const y = row(index);
  const tagW = tag ? tag.length * 7.2 + 14 : 0;
  const labelW = NODE_W - 44 - (tag ? tagW + 10 : 0);
  /* The UNLIT numeral is `--foreground`, not `--signal-blue`. Blue-on-card is
     3.56:1 — fine for the ring around it (1.4.11 wants 3:1) and short of 1.4.3's
     4.5:1 for the digit. The harness never caught it because by the time it
     measures, the desktop sequence has finished and every badge is lit; on a
     phone the unlit state is what a reader sits with until they tap. */
  const stateClass = [
    lit
      ? "[--badge-fill:hsl(var(--signal-blue))] [--badge-ink:hsl(var(--on-accent))]"
      : "[--badge-fill:hsl(var(--card))] [--badge-ink:hsl(var(--foreground))]",
    "motion-reduce:[--badge-fill:hsl(var(--signal-blue))] motion-reduce:[--badge-ink:hsl(var(--on-accent))]"
  ].join(" ");

  return (
    <g className={stateClass}>
      <circle
        cx={RAIL_X}
        cy={badgeCy(index)}
        r={BADGE_R}
        stroke="hsl(var(--signal-blue))"
        strokeWidth={1.5}
        style={{ fill: "var(--badge-fill)" }}
        className="transition-[fill] duration-[200ms] motion-reduce:transition-none"
      />
      <text
        x={RAIL_X}
        y={badgeCy(index) + 4}
        fontSize={11}
        textAnchor="middle"
        style={{ fill: "var(--badge-ink)" }}
      >
        {index + 1}
      </text>

      {/* `--muted-foreground`, NOT `--border`, and the difference is measured.
          Marking this figure `data-gfx-meaning` put its shapes under WCAG
          1.4.11, and the node boxes came back at 1.25:1 light / 1.2:1 dark
          against the panel: `--card` on `--card` is 1:1 on the fill, and
          `--border` is a hairline tuned for separating text blocks, not for
          carrying a shape on its own. A signal token would have passed and would
          have been wrong — a node outline is structure, not state, and the
          Foundation Spec reserves the six signals for state. The neutral that
          already clears the text floor is the honest one. */}
      <rect
        x={NODE_X}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx={6}
        fill="hsl(var(--card))"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth={1}
      />
      {/* 26 UNITS, NOT 22, AND NO NODE MOVED FOR IT — the same trade S07's
          `ThreeGateLedger` made, re-measured here because this canvas is much
          smaller and the answer was not safe to assume.

          MEASURED, at deviceScaleFactor 1 with the raster upscaled
          nearest-neighbour rather than re-shot at 4x: this figure renders 414.66
          css px against its 448-unit viewBox, so one unit is 0.9256 px and a
          22-unit box is 20.4 px — against S07's 32. That is the whole problem
          with this canvas: it is a narrow rail, not a schematic, and no amount
          of slack inside a 34-unit node row will reach 32 px.

          WHAT THE MEASUREMENT SETTLED. At 20.4 px the four marks all resolve but
          three degrade visibly — the firewall's lower brick joints muddy, the
          workstation's two screen lines smear together, and the PLC's field pins
          fringe into one grey band. At 24.1 px every one of those separates
          again. The gain is 18% and it is the difference between a mark that
          reads and a mark that nearly reads, so it is not tidiness.

          WHY 26 IS THE CEILING. The box starts at x+7 and the label column at
          x+36, so 26 ends at x+33 with three units to spare; `CriticalityMark`
          sits at 25..29 of the 32-unit cell and lands at x+28.3..x+30.6, still
          clear of the text. Vertically 26 centres as y+4..y+30 inside NODE_H 34.
          28 would touch the label and leave three units against the node
          outline. `row()`, `badgeCy()`, `RAIL_X` and every segment endpoint are
          untouched: this is a bigger mark in the same hole, not a layout change.

          THE ONE MARK THAT DOES NOT FULLY SURVIVE is
          `cset/remote-access-server`. Its dashed zone boundary is a 1.9/1.7
          dasharray and its direction arrow spans 1.71 units — 1.2 px and 1.1 px
          here — so the dashes merge into a grey column and the arrowhead is a
          smudge at both 22 and 26. It is kept anyway: the tower silhouette and
          the boundary-crossing gesture both still read, and the generic mark it
          replaces is two overlapping rectangles that say less. Recorded as the
          weakest of the four rather than fixed, because thickening a shared
          CSET glyph for one small consumer would break it everywhere else. */}
      <svg x={NODE_X + 7} y={y + 4} width={26} height={26} viewBox="0 0 32 32">
        {assetGlyph(asset)}
        {asset.criticality && <CriticalityMark tier={asset.criticality} />}
      </svg>
      <text
        x={NODE_X + 36}
        y={y + 21}
        fontSize={12.5}
        fill="hsl(var(--foreground))"
        style={{ fontFamily: "var(--font-sans)" }}
        {...fitted(asset.label, labelW, 6.4)}
      >
        {asset.label}
      </text>

      {tag && (
        <>
          <rect
            x={NODE_X + NODE_W - tagW - 8}
            y={y + 9}
            width={tagW}
            height={16}
            rx={8}
            fill="none"
            stroke="hsl(var(--signal-blue))"
            strokeWidth={1}
          />
          <text
            x={NODE_X + NODE_W - tagW / 2 - 8}
            y={y + 20}
            fontSize={11}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
          >
            {tag.toUpperCase()}
          </text>
        </>
      )}

      {/* Asset type is announced, never drawn: the glyph carries it visually.
          The TITLE still names the type even though the glyph may now be a
          specific symbol, and that is deliberate — `symbol` refines what is
          drawn, never what the asset IS, so the accessible name stays keyed to
          `TYPE_LABEL` and matches what S03 and S07 announce for the same
          record. */}
      <title>{`${asset.label} — ${pick(TYPE_LABEL[asset.type], locale)}`}</title>
    </g>
  );
}

/**
 * The endpoint's amber LABEL CHIP. Amber is on the chip's outline; the path above
 * it stays blue for its entire length, and the words inside sit in
 * `--foreground`. The sentence is the scenario's own
 * `Consequence.operationalEffect`, not a restatement of it.
 */
export function ConsequenceChip({ label }: { label: string }) {
  const lines = twoLines(DOSING_SCENARIO.consequence.operationalEffect, 40);
  return (
    <g>
      <rect
        x={NODE_X}
        y={CONSEQUENCE_Y}
        width={NODE_W}
        height={CONSEQUENCE_H}
        rx={6}
        fill="none"
        stroke="hsl(var(--signal-amber))"
        strokeWidth={1.5}
      />
      <text x={NODE_X + 12} y={CONSEQUENCE_Y + 19} fontSize={11} fill="hsl(var(--foreground))">
        {label.toUpperCase()}
      </text>
      {lines.map((line, i) => (
        <text
          key={i}
          x={NODE_X + 12}
          y={CONSEQUENCE_Y + 37 + i * 16}
          fontSize={12.5}
          fill="hsl(var(--foreground))"
          style={{ fontFamily: "var(--font-sans)" }}
          {...fitted(line, NODE_W - 24, 6.4)}
        >
          {line}
        </text>
      ))}
      {/* The rail's terminus. A diamond, not a fifth numbered station: this is a
          consequence, not another asset. */}
      <path
        d={`M${RAIL_X} ${CONSEQUENCE_Y + 7} l9 9 l-9 9 l-9 -9 z`}
        fill="hsl(var(--card))"
        stroke="hsl(var(--signal-amber))"
        strokeWidth={1.5}
      />
    </g>
  );
}
