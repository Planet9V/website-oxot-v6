import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CURVE_CHART } from "./content";

/**
 * THE PAGE'S SIGNATURE VISUAL — the "risk-reduction curve" the content-to-
 * visual mapping table names for the investment decision, and explicitly the
 * thing it says to build INSTEAD of a generic ROI icon.
 *
 * Two panels over one shared spend axis, because the argument is not
 * "returns diminish" (assertable in a sentence) but "here is where they stop":
 *
 *   TOP    cumulative consequential risk removed — a logistic, so it
 *          compounds before it flattens, matching the copy rather than a
 *          plain concave curve that would never compound at all.
 *   BOTTOM the derivative, drawn as one bar per tranche of spend. The bars
 *          are the diminishing return made literal: the reader can see the
 *          seventh tranche buying a fraction of what the third one did,
 *          which the smooth curve above hides inside its own slope.
 *
 * The ridge is the logistic's inflection — the exact point where the
 * marginal bar is tallest — so the annotation is derived from the geometry
 * rather than drawn wherever it looked good. Same for the "stops paying"
 * marker: the first tranche whose marginal return falls under MARGINAL_FLOOR.
 *
 * NOT INTERACTIVE, AND NOT PRETENDING TO BE. No hover states, no tooltips,
 * no scrubber — a static server-rendered figure with a real title/desc pair
 * for screen readers. The axes carry no numbers at all: the spec's claim
 * boundaries forbid publishing money values or loss percentages without
 * approved inputs, and an unnumbered axis is the honest version of "the
 * shape is the point". Colour comes from theme tokens via Tailwind
 * fill/stroke utilities, so it follows the light/dark toggle.
 */

/* Steepness and inflection of the response curve. Chosen so the three
   regions the copy describes are all comfortably visible in one frame —
   they are drawing parameters, not a claim about any estate. */
const K = 9.5;
const RIDGE = 0.36;
/** A tranche returning less than this share of the peak tranche is where the
 *  curve has stopped paying for practical purposes. */
const MARGINAL_FLOOR = 0.12;
const TRANCHES = 16;
const SAMPLES = 96;

const logistic = (s: number) => 1 / (1 + Math.exp(-K * (s - RIDGE)));
const L0 = logistic(0);
const L1 = logistic(1);
/** Cumulative risk removed, normalised to 0 at no spend and 1 at full sweep. */
const cumulative = (s: number) => (logistic(s) - L0) / (L1 - L0);
/** Marginal risk removed per euro, normalised to 1 at the ridge. */
const marginal = (s: number) => {
  const l = logistic(s);
  return 4 * l * (1 - l);
};

/** First tranche midpoint past the ridge whose return drops under the floor. */
const STOPS_PAYING = (() => {
  for (let i = 0; i < TRANCHES; i += 1) {
    const mid = (i + 0.5) / TRANCHES;
    if (mid > RIDGE && marginal(mid) < MARGINAL_FLOOR) return i / TRANCHES;
  }
  return 1;
})();

/* Frame. */
const X0 = 78;
const X1 = 712;
const W = X1 - X0;
const TOP_BASE = 250;
const TOP_H = 186;
const BAR_BASE = 408;
const BAR_H = 92;

const sx = (s: number) => X0 + s * W;
const ty = (v: number) => TOP_BASE - v * TOP_H;
const by = (v: number) => BAR_BASE - v * BAR_H;

const curvePath = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const s = i / SAMPLES;
  return `${i === 0 ? "M" : "L"} ${sx(s).toFixed(2)} ${ty(cumulative(s)).toFixed(2)}`;
}).join(" ");

const areaPath = `${curvePath} L ${X1} ${TOP_BASE} L ${X0} ${TOP_BASE} Z`;

const bars = Array.from({ length: TRANCHES }, (_, i) => {
  const start = i / TRANCHES;
  const mid = (i + 0.5) / TRANCHES;
  return {
    start,
    value: marginal(mid),
    zone: mid < RIDGE ? "early" : mid < STOPS_PAYING ? "ridge" : "tail"
  };
});

const BAR_FILL: Record<string, string> = {
  early: "fill-primary/55",
  ridge: "fill-primary",
  tail: "fill-muted-foreground/30"
};

export function RiskReductionCurve({ locale }: { locale: Locale }) {
  const t = CURVE_CHART;
  const barW = W / TRANCHES - 5;

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <svg
        viewBox="0 0 760 462"
        role="img"
        aria-labelledby="risk-curve-title risk-curve-desc"
        className="h-auto w-full min-w-[620px]"
      >
        <title id="risk-curve-title">{pick(t.title, locale)}</title>
        <desc id="risk-curve-desc">{pick(t.desc, locale)}</desc>

        {/* Zone bands, drawn first so every mark sits over them. They span
            both panels, which is what ties a bar to the part of the curve
            that produced it. */}
        <rect x={X0} y={40} width={sx(RIDGE) - X0} height={BAR_BASE - 40} className="fill-primary/[0.07]" />
        <rect
          x={sx(RIDGE)}
          y={40}
          width={sx(STOPS_PAYING) - sx(RIDGE)}
          height={BAR_BASE - 40}
          className="fill-primary/[0.14]"
        />
        <rect
          x={sx(STOPS_PAYING)}
          y={40}
          width={X1 - sx(STOPS_PAYING)}
          height={BAR_BASE - 40}
          className="fill-muted/60"
        />

        <text x={X0 + 6} y={32} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]">
          {pick(t.zoneOne, locale)}
        </text>
        <text
          x={sx(RIDGE) + 6}
          y={32}
          className="fill-primary-ink font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
        >
          {pick(t.zoneTwo, locale)}
        </text>
        <text
          x={sx(STOPS_PAYING) + 6}
          y={32}
          className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]"
        >
          {pick(t.zoneThree, locale)}
        </text>

        {/* Top panel — cumulative risk removed. */}
        <text x={X0} y={56} className="fill-foreground font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
          {pick(t.cumulativeLabel, locale)}
        </text>
        <path d={areaPath} className="fill-primary/15" />
        <path d={curvePath} fill="none" strokeWidth={2.5} strokeLinecap="round" className="stroke-primary" />
        <line x1={X0} y1={TOP_BASE} x2={X1} y2={TOP_BASE} strokeWidth={1} className="stroke-border" />
        <line x1={X0} y1={64} x2={X0} y2={TOP_BASE} strokeWidth={1} className="stroke-border" />

        {/* The ridge, marked where the geometry actually puts it. */}
        <line
          x1={sx(RIDGE)}
          y1={ty(cumulative(RIDGE))}
          x2={sx(RIDGE)}
          y2={BAR_BASE}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          className="stroke-primary"
        />
        <circle
          cx={sx(RIDGE)}
          cy={ty(cumulative(RIDGE))}
          r={5}
          strokeWidth={2}
          className="fill-primary stroke-background"
        />

        <line
          x1={sx(STOPS_PAYING)}
          y1={ty(cumulative(STOPS_PAYING))}
          x2={sx(STOPS_PAYING)}
          y2={BAR_BASE}
          strokeWidth={1.5}
          strokeDasharray="3 5"
          className="stroke-muted-foreground"
        />
        <circle
          cx={sx(STOPS_PAYING)}
          cy={ty(cumulative(STOPS_PAYING))}
          r={4}
          strokeWidth={2}
          className="fill-muted-foreground stroke-background"
        />

        {/* Bottom panel — the derivative, one bar per tranche of spend. */}
        <text x={X0} y={294} className="fill-foreground font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
          {pick(t.marginalLabel, locale)}
        </text>
        {bars.map((bar) => (
          <rect
            key={bar.start}
            x={sx(bar.start) + 2.5}
            y={by(bar.value)}
            width={barW}
            height={BAR_BASE - by(bar.value)}
            rx={2}
            className={BAR_FILL[bar.zone]}
          />
        ))}
        <line x1={X0} y1={BAR_BASE} x2={X1} y2={BAR_BASE} strokeWidth={1} className="stroke-border" />

        <text
          x={sx(RIDGE) + 9}
          y={324}
          className="fill-primary-ink font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
        >
          {pick(t.ridgeCallout, locale)}
        </text>
        <text
          x={sx(STOPS_PAYING) + 9}
          y={348}
          className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.1em]"
        >
          {pick(t.stopsPayingCallout, locale)}
        </text>

        {/* Shared x axis. An arrow, not a scale — there are no numbers here
            and the caption says why. */}
        <line x1={X0} y1={432} x2={X1 - 12} y2={432} strokeWidth={1} className="stroke-border" />
        <path d={`M ${X1 - 16} 428 L ${X1 - 6} 432 L ${X1 - 16} 436 Z`} className="fill-border" />
        <text x={X0} y={452} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]">
          {pick(t.xLabel, locale)}
        </text>
        <text
          x={X1 - 12}
          y={452}
          textAnchor="end"
          className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]"
        >
          {pick(t.axisNote, locale)}
        </text>
      </svg>
    </div>
  );
}
