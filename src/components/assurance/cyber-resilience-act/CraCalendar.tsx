import type { Locale } from "@/i18n/config";
import { pick, formatDate } from "@/i18n/bilingual";
import { AS_OF } from "@/content/claims";
import { CALENDAR } from "./content";
import { Section, SectionHead, DataTable, Figure, Note } from "./kit";

/**
 * 02 — THE CALENDAR. Every date comes from docs/reference/CRA-DATES.md, this
 * repo's single source for dated CRA claims; none is recalled or re-derived.
 *
 * THE DIAGRAM IS A REAL SVG AND IT IS STATIC, and it says so in its caption.
 * Two honesty constraints shaped it:
 *
 *  1. It is NOT drawn to scale. Four of the seven milestones fall inside six
 *     months of 2026 — at true linear scale their labels overlap into
 *     illegibility. So the stops are evenly spaced and the caption states
 *     that plainly rather than letting a reader infer intervals that are not
 *     there. A diagram that lies about spacing is worse than one admitting
 *     it does not encode it.
 *  2. Applied-vs-ahead is DERIVED by comparing each `iso` against `AS_OF`
 *     from src/content/claims.ts, never hard-coded into the copy. A written
 *     "five weeks out" is correct for about five weeks and then silently
 *     wrong.
 *
 * WHY `AS_OF` AND NOT `Date.now()`. Reading the clock during render is
 * impure — React's purity rule rejects it, and eslint caught it here. But
 * the deeper reason is the one src/content/claims.ts gives for `AS_OF`
 * existing at all: eight surfaces of the old site told readers Article 14
 * "already requires" something 35 days before it applied. A pinned anchor
 * makes that class of error visible instead of ambient, and
 * `guardAsOfFreshness` in scripts/content-guards.mjs fails the build once
 * the anchor is more than 30 days old. So the page states the anchor to the
 * reader rather than implying it is live — a frozen date that admits it is
 * frozen beats a "today" that quietly is not.
 *
 * No client JS, no animation, no claim of interactivity.
 */

/* Geometry. Even spacing across a fixed viewBox; labels alternate above and
   below the axis so each gets a full lane rather than half of one. */
const VB_W = 960;
const VB_H = 186;
const PAD_X = 56;
const AXIS_Y = 100;

const NOW = Date.parse(`${AS_OF}T00:00:00Z`);

export function CraCalendar({ locale }: { locale: Locale }) {
  const entries = CALENDAR.entries;
  const step = (VB_W - PAD_X * 2) / (entries.length - 1);

  const stops = entries.map((e, i) => {
    const t = Date.parse(`${e.iso}T00:00:00Z`);
    return {
      iso: e.iso,
      ref: e.ref,
      target: e.target === true,
      x: PAD_X + i * step,
      /* Above the axis on even indices, below on odd. */
      above: i % 2 === 0,
      applied: t <= NOW,
      short: new Date(t).toLocaleDateString(locale === "nl" ? "nl-NL" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
      })
    };
  });

  const tableRows = entries.map((e) => {
    const applied = Date.parse(`${e.iso}T00:00:00Z`) <= NOW;
    const state = e.target ? "Target, not an obligation." : applied ? "Applies now." : "Ahead.";
    return [formatDate(e.iso, locale), pick(e.ref, locale), pick(e.what, locale), `${pick(e.detail, locale)} ${state}`];
  });

  return (
    <Section id="calendar">
      <SectionHead n="02" id="calendar" title={pick(CALENDAR.title, locale)} dek={pick(CALENDAR.dek, locale)} />

      <Figure caption="Static diagram. Stops are ordered by date and spaced evenly — the spacing does not encode the intervals between them, which are very uneven. A filled marker is a date that has passed; a hollow marker is ahead; a square marker is a standardisation or capacity target rather than an obligation falling on manufacturers.">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Cyber Resilience Act milestones in date order, from entry into force in December 2024 to full application in December 2027"
          className="h-auto w-full min-w-[44rem]"
        >
          <line
            x1={PAD_X - 24}
            y1={AXIS_Y}
            x2={VB_W - PAD_X + 24}
            y2={AXIS_Y}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
          />

          {stops.map((s) => {
            const labelY = s.above ? AXIS_Y - 30 : AXIS_Y + 30;
            const stemY = s.above ? AXIS_Y - 14 : AXIS_Y + 14;
            const refY = labelY + (s.above ? -17 : 17);
            return (
              <g key={s.iso}>
                <line x1={s.x} y1={AXIS_Y} x2={s.x} y2={stemY} stroke="hsl(var(--muted-foreground))" strokeWidth={1} />
                {s.target ? (
                  <rect
                    x={s.x - 5}
                    y={AXIS_Y - 5}
                    width={10}
                    height={10}
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                  />
                ) : (
                  /* --primary-ink, NOT --primary. The markers carry the
                     passed/ahead distinction, so WCAG 1.4.11 wants 3:1
                     against the card behind them, and --primary orange
                     measures 2.55:1 on the light theme — the same failure
                     the styleguide records for small orange text, reaching
                     a graphic this time. --primary-ink clears it in both
                     themes and is still unmistakably the brand orange. */
                  <circle
                    cx={s.x}
                    cy={AXIS_Y}
                    r={6}
                    fill={s.applied ? "hsl(var(--primary-ink))" : "hsl(var(--background))"}
                    stroke="hsl(var(--primary-ink))"
                    strokeWidth={1.5}
                  />
                )}
                <text x={s.x} y={labelY} textAnchor="middle" fontSize={13} fontWeight={700} fill="hsl(var(--foreground))">
                  {s.short}
                </text>
                <text x={s.x} y={refY} textAnchor="middle" fontSize={11} letterSpacing={1} fill="hsl(var(--muted-foreground))">
                  {pick(s.ref, locale).toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </Figure>

      <DataTable
        head={["Date", "Reference", "What applies", "Detail"]}
        rows={tableRows}
        caption={`Applies-now and ahead are derived by comparing each date against ${formatDate(AS_OF, locale)}, the anchor this site measures date-sensitive copy from — not written into the sentences.`}
      />

      <div className="mt-12">
        <h3 className="h-sub text-foreground">{pick(CALENDAR.which.head, locale)}</h3>
        <DataTable
          head={["If the question is about…", "Anchor to"]}
          rows={CALENDAR.which.rows.map((r) => r.map((c) => pick(c, locale)))}
        />
      </div>

      <Note label="Source">{pick(CALENDAR.source, locale)}</Note>
    </Section>
  );
}
