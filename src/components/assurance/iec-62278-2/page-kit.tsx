/**
 * The presentational primitives this page needs, kept inside its own
 * directory — the precedent set by `src/components/consulting/page-kit.tsx`
 * and `src/components/company/page-kit.tsx`, which duplicate rather than
 * cross-import for exactly this reason: an assurance page reaching into a
 * consulting directory is a worse artefact than a few repeated lines. If a
 * third assurance page needs these, promote one copy to
 * `src/components/assurance/page-kit.tsx` and delete the others.
 *
 * THREE DIAGRAM TREATMENTS, DELIBERATELY DIFFERENT. The source material
 * carries several `text` block chains, and rendering all of them the same
 * way would turn a technical document into wallpaper:
 *   `StageChain`   — a lifecycle read as one continuous spine (rail + node
 *                    markers). Used where the stages are a single sequence.
 *   `Cascade`      — stacked panels joined by drawn arrows, each carrying a
 *                    stage name AND its examples. Used where the chain is
 *                    causal and each link needs its own evidence.
 *   `TraceLadder`  — numbered rungs, the requirements trace the composition
 *                    rules name explicitly. Used exactly once.
 * All three are static SVG and DOM that render the structure described. No
 * component here claims to be interactive, live, or simulated, because none
 * of them is.
 *
 * Every colour is a token — `--border`, `--card`, `--primary-ink` and so on,
 * read through Tailwind's token utilities or `currentColor`. No hex, no
 * literal hsl() triplet.
 */
import Link from "next/link";
import type { ReactNode } from "react";

/** Elevation composed from `--foreground` so it flips with the theme, rather
 *  than Tailwind's own pure-black, light-only `shadow-*`. */
export const ELEV_1 =
  "shadow-[0_1px_2px_hsl(var(--foreground)/0.05),0_1px_1px_hsl(var(--foreground)/0.04)] " +
  "dark:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]";

/**
 * A clause heading: the register number and short clause name in the gutter,
 * the section's real argument as the h2 beneath it. This is what makes the
 * page read as a document with clauses rather than a stack of marketing
 * bands, and it is why the numerals live in `CLAUSES` rather than being
 * typed twice.
 */
export function SectionHead({
  id,
  n,
  clause,
  heading
}: {
  id: string;
  n: string;
  clause: string;
  heading: string;
}) {
  return (
    /* The numeral alone sits in the margin; the clause name runs above the
       heading in the text column. An earlier version put both in the gutter
       and a name like "Requirements and allocation" broke across three
       ragged lines in 5.5rem. */
    <div className="grid gap-x-5 gap-y-1 sm:grid-cols-[2.5rem_1fr]">
      <span className="font-mono text-[11px] font-bold leading-loose tracking-[0.1em] text-primary-ink">{n}</span>
      <div>
        <span className="mono-label block text-muted-foreground">{clause}</span>
        <h2 id={id} className="h-sub mt-1.5">
          {heading}
        </h2>
      </div>
    </div>
  );
}

/** Mono uppercase key, sans value, dashed rule between — the house pattern
 *  for anything factual. The key is `--primary-ink`, never `--primary`:
 *  11px orange at 3.0:1 is the contrast failure this codebase has fixed once
 *  already and does not intend to reintroduce. */
export function SpecRow({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_1fr] items-baseline gap-3.5 border-b border-dashed border-border py-2.5 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink [overflow-wrap:break-word]">
        {k}
      </dt>
      <dd className="text-sm leading-normal text-foreground [overflow-wrap:break-word]">{children}</dd>
    </div>
  );
}

/**
 * The lifecycle spine. An ordered list with a drawn rail down the marker
 * gutter and a node on each stage — the structure the source's `text` block
 * describes, rendered rather than reprinted as preformatted ASCII.
 */
export function StageChain({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <figure className={`rounded-2xl border border-border bg-card p-6 sm:p-7 ${ELEV_1}`}>
      {label ? <figcaption className="mono-label mb-5 text-muted-foreground">{label}</figcaption> : null}
      <ol className="relative m-0 list-none space-y-4 p-0">
        {/* The rail. Inset top and bottom so it starts and ends at a node
            rather than floating past the first and last markers. */}
        <span aria-hidden="true" className="absolute bottom-3 left-[0.34375rem] top-3 w-px bg-border" />
        {items.map((item, i) => (
          <li key={i} className="relative grid grid-cols-[0.75rem_1fr] items-start gap-x-4">
            <span
              aria-hidden="true"
              className={`mt-[0.4375rem] block size-3 rounded-full border-2 border-primary ${
                i === items.length - 1 ? "bg-primary" : "bg-card"
              }`}
            />
            <span className="body-copy leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** The arrow drawn between cascade panels. A real path, `currentColor`, so
 *  it takes the theme from whatever text colour its wrapper sets. */
function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 26" width="16" height="26" className="mx-auto block text-border">
      <line x1="8" y1="0" x2="8" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 17.5 L8 23.5 L12.5 17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface CascadeStage {
  stage: string;
  detail: string;
}

/**
 * The causal cascade: each link is a panel carrying its own stage name and
 * examples, joined by a drawn arrow. Used where the point is that one thing
 * causes the next — the cyber-entry-to-consequence chain, and the worked
 * example's model.
 */
export function Cascade({ items, label }: { items: readonly CascadeStage[]; label?: string }) {
  return (
    <figure className="rounded-2xl border border-border bg-muted p-5 sm:p-7">
      {label ? <figcaption className="mono-label mb-5 text-muted-foreground">{label}</figcaption> : null}
      <ol className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={i}>
            <div className={`rounded-xl border border-border bg-card px-4 py-3.5 ${ELEV_1}`}>
              <p className="font-display body-copy font-bold leading-snug text-foreground">{item.stage}</p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
            {i < items.length - 1 ? <ArrowDown /> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export interface TraceRung {
  stage: string;
  worked: string;
}

/**
 * The requirements trace — the one artefact OXOT_Composition_Rules.md names
 * for an assurance page by name. Numbered rungs against a rail: the stage on
 * the left, the worked requirement's content on the right, so the abstract
 * chain and the concrete example are read as one thing rather than as a
 * diagram followed by an example that repeats it.
 */
export function TraceLadder({ rungs }: { rungs: readonly TraceRung[] }) {
  return (
    <ol className="relative m-0 list-none p-0">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.09375rem] top-6 w-px bg-border sm:left-[1.34375rem]" />
      {rungs.map((rung, i) => (
        <li key={i} className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-7 last:pb-0 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6">
          <span
            aria-hidden="true"
            className={`flex size-9 items-center justify-center rounded-full border border-border bg-card font-mono text-[11px] font-bold text-primary-ink sm:size-11 sm:text-xs ${ELEV_1}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-2 sm:pt-3">
            <p className="font-display body-lead font-bold leading-snug text-foreground">{rung.stage}</p>
            <p className="mt-2 max-w-[60ch] body-copy leading-relaxed text-muted-foreground">{rung.worked}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * A plain data table. Rows are `string[]`, not a generic row type, because
 * six tables with six different shapes are better served by one honest
 * primitive than by a type parameter nobody reads. The inline `min-width`
 * keeps columns from collapsing into single characters on a phone; the
 * wrapper scrolls instead of the page.
 */
export function DataTable({
  head,
  rows,
  minWidth = "42rem"
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  minWidth?: string;
}) {
  return (
    /* `min-w-0` is load-bearing, not tidiness. A grid or flex child defaults
       to `min-width: auto`, so without it the table's `minWidth` propagates
       out through the scroll container and sizes the whole track — which at
       390px stretched a neighbouring figure to 34rem and scrolled the page
       body sideways. Measured, not theorised. */
    <div className="w-full min-w-0 overflow-x-auto">
      <table className="w-full caption-bottom border-collapse text-left text-sm" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-border">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="py-2.5 pr-5 align-bottom font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-dashed border-border last:border-b-0">
              <th scope="row" className="py-3.5 pr-5 align-top body-copy font-semibold leading-relaxed text-foreground">
                {row[0]}
              </th>
              {row.slice(1).map((cell, j) => (
                <td key={j} className="py-3.5 pr-5 align-top body-copy leading-relaxed text-muted-foreground last:pr-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The sentence the section turns on. Rule on the left, no quotation marks —
 *  this is an assertion in a technical document, not a testimonial. */
export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-primary py-1 pl-5 sm:pl-6">
      <p className="max-w-[62ch] font-display body-lead font-bold leading-snug text-foreground sm:text-lg">{children}</p>
    </blockquote>
  );
}

/** The page's single ask. `.cta-lift` is the styleguide's hover AND
 *  focus-visible spec; text on an orange fill is `--on-accent`. */
export function Ask({ href, children, fine }: { href: string; children: ReactNode; fine?: ReactNode }) {
  return (
    <div>
      <Link
        href={href}
        className={`cta-lift inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-accent no-underline ${ELEV_1}`}
      >
        {children}
        <span aria-hidden="true">&#8594;</span>
      </Link>
      {fine ? <p className="mt-3.5 max-w-[36rem] text-[13px] leading-relaxed text-muted-foreground">{fine}</p> : null}
    </div>
  );
}

/** A quiet onward link. Never styled to compete with `Ask`. */
export function Onward({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
    >
      {children}
      <span aria-hidden="true">&#8594;</span>
    </Link>
  );
}
