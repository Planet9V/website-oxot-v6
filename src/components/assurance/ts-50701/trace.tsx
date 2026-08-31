/**
 * THE TRACE — this page's structural device. TS 50701's whole argument is
 * that a cyber finding only means something once it has been followed
 * through to a railway consequence, so the same ordered trace renders the
 * hero's system-to-evidence chain, the scenario logic, the OXOT evidence
 * flow, the safety consequence chain, the risk-treatment loop and the
 * worked example's modelled pathway.
 *
 * THREE FORMS, deliberately not one. `TraceRail` runs left to right for
 * short stage names — a process read at a glance. `TraceLadder` runs down
 * a hairline with a numbered node in the gutter and the vocabulary of that
 * stage beside it, which is how a requirements trace is read, not a stack
 * of cards. `TracePath` is the plain sequence, for a modelled route where
 * the order is the whole point.
 *
 * NOT the vertical box-stack in assurance/evidence-data-provenance/
 * EvidenceChain.tsx. Same house, different page; two assurance pages
 * sharing one signature diagram would make the section look templated.
 *
 * Connectors are real inline SVG — line plus arrowhead, `currentColor`
 * inheriting a token class — so direction survives at any zoom. Nothing
 * here is interactive and nothing claims to be: no state, no client
 * boundary, no copy implying a live drill-down.
 */
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/** Points right on wide viewports, down once the rail has wrapped. */
function RailArrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 12"
      width="24"
      height="12"
      className="shrink-0 rotate-90 self-center text-primary sm:rotate-0"
    >
      <line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="23,6 15,10.25 15,1.75" fill="currentColor" />
    </svg>
  );
}

/**
 * A horizontal run of numbered stages. Becomes a vertical run below `sm`,
 * where the arrows rotate rather than disappear.
 */
export function TraceRail({
  stages,
  label,
  locale
}: {
  stages: readonly Bilingual[];
  label?: string;
  locale: Locale;
}) {
  return (
    <figure className="m-0">
      {label ? <figcaption className="mono-label mb-4 text-muted-foreground">{label}</figcaption> : null}
      <ol className="m-0 flex list-none flex-col gap-2 p-0 sm:flex-row sm:items-stretch sm:gap-1">
        {stages.map((stage, i) => (
          <li key={i} className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-1">
            <div className="flex-1 rounded-xl border border-border bg-card px-4 py-3">
              <span className="mono-label tabular-nums text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-foreground">{pick(stage, locale)}</p>
            </div>
            {i < stages.length - 1 ? <RailArrow /> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export interface TraceStage {
  stage: Bilingual;
  detail: Bilingual;
}

/**
 * A vertical trace: numbered nodes on a continuous hairline, the stage
 * name in the gutter, the vocabulary that belongs to it alongside. Used
 * where each stage needs its own examples — the safety consequence chain,
 * the treatment loop.
 */
export function TraceLadder({
  stages,
  label,
  locale
}: {
  stages: readonly TraceStage[];
  label?: string;
  locale: Locale;
}) {
  return (
    <figure className="m-0">
      {label ? <figcaption className="mono-label mb-5 text-muted-foreground">{label}</figcaption> : null}
      <ol className="relative m-0 flex list-none flex-col border-l border-border p-0 pl-8 sm:pl-10">
        {stages.map((s, i) => (
          <li key={i} className="relative pb-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-11 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-background font-mono text-[10px] font-bold tabular-nums text-primary-ink sm:-left-[3.25rem]"
            >
              {i + 1}
            </span>
            <p className="font-display body-copy font-bold leading-snug text-foreground">{pick(s.stage, locale)}</p>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{pick(s.detail, locale)}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/**
 * A single-column pathway: stage names only, no vocabulary column. The
 * worked example's modelled route, where the point is the sequence itself.
 */
export function TracePath({
  steps,
  label,
  locale
}: {
  steps: readonly Bilingual[];
  label?: string;
  locale: Locale;
}) {
  return (
    <figure className="m-0">
      {label ? <figcaption className="mono-label mb-4 text-muted-foreground">{label}</figcaption> : null}
      <ol className="m-0 flex list-none flex-col p-0">
        {steps.map((step, i) => (
          <li key={i} className="flex flex-col">
            {i > 0 ? (
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 12 22"
                width="12"
                height="22"
                className="ml-5 block shrink-0 text-primary"
              >
                <line x1="6" y1="0" x2="6" y2="15" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="6,21 2,13.5 10,13.5" fill="currentColor" />
              </svg>
            ) : null}
            <div className="rounded-xl border border-border bg-card px-4 py-2.5">
              <p className="text-sm leading-snug text-foreground">{pick(step, locale)}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
