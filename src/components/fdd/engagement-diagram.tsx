import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * THE ENGAGEMENT, DRAWN.
 *
 * Three stages, five site days, four disciplines as swim lanes. The precedents
 * are the roads map and the timeline on /cra: real geometry in the markup,
 * correct before a line of JavaScript runs, nothing animated.
 *
 * ORANGE APPEARS EXACTLY ONCE — on the twenty-one day lead time, because that
 * is the surprising part. Coordination starts three weeks before anyone
 * arrives on site, and every reader who has commissioned an assessment before
 * expects to be booking a week out. The accent is doing the same job it does
 * on the roads map, where it marks the gate: it points at the argument.
 *
 * NOTHING IS ENCODED BY COLOUR ALONE. Each stage is labelled in words, each
 * discipline is named, and the lane markers are shape rather than hue — an OT
 * engineer may be colour-blind, and this site has been caught by that before.
 */
export async function EngagementDiagram({ locale }: { locale: Locale }) {
  const t = (await getDictionary(locale)).fdd;

  const DAYS = ["D1", "D2", "D3", "D4", "D5"];
  const LANES = [
    { label: t.laneOt, days: [1, 1, 1, 1, 1] },
    { label: t.laneGovernance, days: [1, 1, 1, 1, 1] },
    /* Physical security runs the first three days: the walk, the doors and the
       access matrix are done by then. Drawn as it is scheduled, not padded to
       make the figure symmetrical. */
    { label: t.lanePhysical, days: [1, 1, 1, 0, 0] },
    { label: t.lanePm, days: [1, 1, 1, 1, 1] }
  ];

  const X0 = 236;
  const STEP = 62;
  const laneY = (i: number) => 168 + i * 34;

  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card p-5 sm:p-7">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label={t.diagramAlt}
          data-gfx-meaning="the engagement: three stages, five site days, four disciplines"
          className="block w-full min-w-[38rem] font-mono"
        >
          {/* ── stage headings ─────────────────────────────────────────── */}
          <text x={0} y={22} fontSize={12} fontWeight={700} letterSpacing={1.2} fill="hsl(var(--foreground))">
            {t.stage1Short}
          </text>
          <text x={X0} y={22} fontSize={12} fontWeight={700} letterSpacing={1.2} fill="hsl(var(--foreground))">
            {t.stage2Short}
          </text>
          <text x={556} y={22} fontSize={12} fontWeight={700} letterSpacing={1.2} fill="hsl(var(--foreground))">
            {t.stage3Short}
          </text>

          {/* ── the spine ──────────────────────────────────────────────── */}
          <line x1={0} y1={92} x2={720} y2={92} stroke="hsl(var(--muted-foreground))" strokeWidth={2} />

          {/* Stage 1 — the lead time. The one orange thing in the figure. */}
          <line x1={0} y1={92} x2={X0 - 14} y2={92} stroke="hsl(var(--primary))" strokeWidth={4} />
          <text x={0} y={78} fontSize={15} fontWeight={700} fill="hsl(var(--primary-ink))">
            {t.leadTime}
          </text>
          <text x={0} y={116} fontSize={12} fill="hsl(var(--muted-foreground))">
            {t.leadTimeNote}
          </text>

          {/* Stage 2 — the site block. */}
          <rect
            x={X0 - 14}
            y={62}
            width={5 * STEP + 6}
            height={60}
            rx={8}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--muted-foreground))"
          />
          {DAYS.map((d, i) => (
            <text
              key={d}
              x={X0 + i * STEP + 14}
              y={98}
              fontSize={14}
              fontWeight={700}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
            >
              {d}
            </text>
          ))}

          {/* Stage 3 — closure. */}
          <text x={556} y={78} fontSize={12} fill="hsl(var(--muted-foreground))">
            {t.closureNote}
          </text>

          {/* ── the four disciplines ───────────────────────────────────── */}
          <text x={0} y={148} fontSize={11} fontWeight={700} letterSpacing={1.1} fill="hsl(var(--muted-foreground))">
            {t.disciplinesLabel}
          </text>
          {LANES.map((lane, i) => (
            <g key={lane.label}>
              <text x={0} y={laneY(i) + 4} fontSize={12} fill="hsl(var(--foreground))">
                {lane.label}
              </text>
              <line
                x1={X0 - 8}
                y1={laneY(i)}
                x2={X0 + 4 * STEP + 22}
                y2={laneY(i)}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
              />
              {lane.days.map((on, d) =>
                on ? (
                  /* A filled square is "on site this day". Shape, not hue. */
                  <rect
                    key={d}
                    x={X0 + d * STEP + 7}
                    y={laneY(i) - 7}
                    width={14}
                    height={14}
                    rx={3}
                    fill="hsl(var(--foreground))"
                  />
                ) : (
                  <rect
                    key={d}
                    x={X0 + d * STEP + 7}
                    y={laneY(i) - 7}
                    width={14}
                    height={14}
                    rx={3}
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="3 2"
                  />
                )
              )}
            </g>
          ))}

          <text x={0} y={308} fontSize={12} fill="hsl(var(--muted-foreground))">
            {t.diagramFoot}
          </text>
        </svg>
      </div>
      <figcaption className="mono-label mt-3 text-muted-foreground">{t.diagramCaption}</figcaption>
    </figure>
  );
}
