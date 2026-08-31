import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TAIL_CHART } from "./content";

/**
 * The second real figure on the page, and the reason the first one is not
 * the whole argument: a right-skewed loss density, drawn from a lognormal
 * PDF, with the mean sitting visibly to the RIGHT of the most likely
 * outcome and a long shaded tail past the 95th percentile.
 *
 * This is the picture the copy needs. "Averaging never surfaces it" is a
 * claim a reader has to take on trust in prose; here the mode and the mean
 * are two separate marks with daylight between them, and the shaded region
 * is plainly where the money is even though almost none of the probability
 * mass is. A bar chart or a shield icon could not carry that.
 *
 * Same rules as RiskReductionCurve: static, server-rendered, no numbers on
 * either axis, theme tokens only, and a caption that says out loud this is
 * an illustrative shape rather than a modelled result.
 */

/* Lognormal shape parameters. Sigma is large enough that the tail is
   genuinely fat rather than a slightly skewed bell — which is the point
   being made — and the median places the peak early in the frame. */
const SIGMA = 0.85;
const MEDIAN = 0.13;
/** Where the tail begins, for shading: the 95th percentile. */
const TAIL_START = MEDIAN * Math.exp(1.645 * SIGMA);
const MODE = MEDIAN * Math.exp(-SIGMA * SIGMA);
const MEAN = MEDIAN * Math.exp((SIGMA * SIGMA) / 2);
const SAMPLES = 200;

const density = (x: number) => {
  if (x <= 0) return 0;
  const z = Math.log(x / MEDIAN) / SIGMA;
  return Math.exp(-0.5 * z * z) / x;
};
const PEAK = density(MODE);

const X0 = 78;
const X1 = 712;
const BASE = 300;
const H = 216;

const px = (x: number) => X0 + x * (X1 - X0);
const py = (d: number) => BASE - (d / PEAK) * H;

const points = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const x = i / SAMPLES;
  return { x, d: density(x) };
});

const toPath = (from: number) =>
  points
    .filter((p) => p.x >= from)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${px(p.x).toFixed(2)} ${py(p.d).toFixed(2)}`)
    .join(" ");

const curvePath = toPath(0);
const areaPath = `${curvePath} L ${X1} ${BASE} L ${X0} ${BASE} Z`;
const tailPath = `${toPath(TAIL_START)} L ${X1} ${BASE} L ${px(TAIL_START).toFixed(2)} ${BASE} Z`;

export function LossTailCurve({ locale }: { locale: Locale }) {
  const t = TAIL_CHART;

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <svg
        viewBox="0 0 760 356"
        role="img"
        aria-labelledby="loss-tail-title loss-tail-desc"
        className="h-auto w-full min-w-[620px]"
      >
        <title id="loss-tail-title">{pick(t.title, locale)}</title>
        <desc id="loss-tail-desc">{pick(t.desc, locale)}</desc>

        <text x={X0} y={30} className="fill-foreground font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
          {pick(t.yLabel, locale)}
        </text>

        <path d={areaPath} className="fill-muted-foreground/15" />
        <path d={tailPath} className="fill-primary/25" />
        <path d={curvePath} fill="none" strokeWidth={2.5} strokeLinecap="round" className="stroke-foreground" />

        {/* Mode and mean as two separate marks. The gap between them IS the
            argument — an average sits to the right of the outcome you will
            most often actually see. */}
        <line
          x1={px(MODE)}
          y1={py(PEAK)}
          x2={px(MODE)}
          y2={BASE}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          className="stroke-muted-foreground"
        />
        <text
          x={px(MODE) + 8}
          y={py(PEAK) + 14}
          className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.1em]"
        >
          {pick(t.modeLabel, locale)}
        </text>

        <line
          x1={px(MEAN)}
          y1={py(density(MEAN)) - 34}
          x2={px(MEAN)}
          y2={BASE}
          strokeWidth={1.5}
          className="stroke-primary"
        />
        <circle cx={px(MEAN)} cy={py(density(MEAN)) - 34} r={4} className="fill-primary" />
        <text
          x={px(MEAN) + 8}
          y={py(density(MEAN)) - 38}
          className="fill-primary-ink font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
        >
          {pick(t.meanLabel, locale)}
        </text>

        {/* The shaded tail, called out where it is wide and flat. */}
        <line
          x1={px(TAIL_START)}
          y1={BASE - 62}
          x2={X1 - 14}
          y2={BASE - 62}
          strokeWidth={1.5}
          className="stroke-primary"
        />
        <path
          d={`M ${X1 - 18} ${BASE - 66} L ${X1 - 8} ${BASE - 62} L ${X1 - 18} ${BASE - 58} Z`}
          className="fill-primary"
        />
        <text
          x={px(TAIL_START)}
          y={BASE - 72}
          className="fill-primary-ink font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
        >
          {pick(t.tailLabel, locale)}
        </text>

        <line x1={X0} y1={BASE} x2={X1 - 12} y2={BASE} strokeWidth={1} className="stroke-border" />
        <path d={`M ${X1 - 16} ${BASE - 4} L ${X1 - 6} ${BASE} L ${X1 - 16} ${BASE + 4} Z`} className="fill-border" />
        <line x1={X0} y1={40} x2={X0} y2={BASE} strokeWidth={1} className="stroke-border" />

        <text x={X0} y={324} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]">
          {pick(t.xLabel, locale)}
        </text>
        <text
          x={X1 - 12}
          y={324}
          textAnchor="end"
          className="fill-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]"
        >
          {pick(t.axisNote, locale)}
        </text>
      </svg>
    </div>
  );
}
