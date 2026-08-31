/**
 * Presentational primitives for the /assurance index, kept in this page's own
 * directory — the precedent set by `src/components/assurance/iec-62278-2/
 * page-kit.tsx` and `src/components/consulting/page-kit.tsx`, which duplicate
 * rather than cross-import so an edit to one assurance page cannot silently
 * restyle another.
 *
 * FIVE DIAGRAM TREATMENTS, DELIBERATELY DIFFERENT. assurance_overview_2.md
 * carries eight `text` block chains, and rendering all eight the same way
 * would turn a reference document into wallpaper:
 *   `FlowChain`   — a compact labelled arrow chain. The hero's evidence flow,
 *                   and the baseline/candidate/result/decision sequence.
 *   `LayerStack`  — stacked bands, each a named layer carrying its own term
 *                   list. Used where the source block is layers, not steps.
 *   `Cascade`     — panels joined by drawn arrows, each link carrying a stage
 *                   name AND its evidence. Used where the chain is causal.
 *   `StepLadder`  — numbered rungs against a rail. The evidence lifecycle.
 *   `TermStrip`   — a row of mono chips. The frameworks-supported strip.
 * All of these are static SVG and DOM. Nothing here claims to be interactive,
 * live, or simulated, because none of it is.
 *
 * Every colour is a token — `--border`, `--card`, `--muted`, `--primary-ink`
 * — read through Tailwind's token utilities or `currentColor`. No hex, no
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
 * A section heading: the register number in the margin, a short section label
 * above the heading, and the section's real argument as the h2. This is what
 * makes a fifteen-section page read as a document rather than a stack of
 * marketing bands.
 */
export function SectionHead({
  id,
  n,
  label,
  heading
}: {
  id: string;
  n: string;
  label: string;
  heading: string;
}) {
  return (
    <div className="grid gap-x-5 gap-y-1 sm:grid-cols-[2.5rem_1fr]">
      <span className="font-mono text-[11px] font-bold leading-loose tracking-[0.1em] text-primary-ink">{n}</span>
      <div>
        <span className="mono-label block text-muted-foreground">{label}</span>
        <h2 id={id} className="h-sub mt-1.5">
          {heading}
        </h2>
      </div>
    </div>
  );
}

/** The arrow drawn between chain links. A real path on `currentColor`, so it
 *  takes the theme from whatever text colour its wrapper sets. */
function ArrowDown({ short = false }: { short?: boolean }) {
  const h = short ? 18 : 26;
  const tail = short ? 10 : 18;
  return (
    <svg aria-hidden="true" viewBox={`0 0 16 ${h}`} width="16" height={h} className="mx-auto block text-border">
      <line x1="8" y1="0" x2="8" y2={tail} stroke="currentColor" strokeWidth="1.5" />
      <path
        d={`M3.5 ${tail - 0.5} L8 ${tail + 5.5} L12.5 ${tail - 0.5}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The compact arrow chain. One line of text per link — used where the source
 * block is a short sequence of states and the detail belongs elsewhere on the
 * page rather than inside the diagram.
 */
export function FlowChain({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <figure className="m-0 rounded-2xl border border-border bg-muted p-5 sm:p-6">
      {label ? <figcaption className="mono-label mb-4 text-muted-foreground">{label}</figcaption> : null}
      <ol className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={item}>
            {i > 0 ? <ArrowDown short /> : null}
            <div className={`rounded-xl border border-border bg-card px-4 py-3 text-center ${ELEV_1}`}>
              <p className="body-copy font-semibold leading-snug text-foreground">{item}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export interface StackLayer {
  name: string;
  terms: readonly string[];
}

/**
 * Stacked bands. The source's three-part "customer evidence → twin → framework
 * views" block is layers, not steps: each band is one stratum of the same
 * model, and its contents are a term list rather than a sentence. Rendering it
 * as an arrow chain would misdescribe it.
 */
export function LayerStack({ layers, label }: { layers: readonly StackLayer[]; label?: string }) {
  return (
    <figure className="m-0 rounded-2xl border border-border bg-card p-5 sm:p-7">
      {label ? <figcaption className="mono-label mb-5 text-muted-foreground">{label}</figcaption> : null}
      <ol className="m-0 list-none p-0">
        {layers.map((layer, i) => (
          <li key={layer.name}>
            <div className="rounded-xl border border-border bg-muted px-4 py-4 sm:px-5">
              <p className="font-display body-copy font-bold leading-snug text-foreground">{layer.name}</p>
              <ul className="mt-2.5 flex list-none flex-wrap gap-x-2 gap-y-1.5 p-0">
                {layer.terms.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-border bg-card px-2 py-1 font-mono text-[11px] leading-normal text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 ? <ArrowDown /> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export interface CascadeStage {
  stage: string;
  detail: string;
}

/** The causal cascade: each link is a panel carrying its own stage name and
 *  evidence, joined by a drawn arrow. Used where the point is that one thing
 *  causes, or is traced from, the next. */
export function Cascade({ items, label }: { items: readonly CascadeStage[]; label?: string }) {
  return (
    <figure className="m-0 rounded-2xl border border-border bg-muted p-5 sm:p-7">
      {label ? <figcaption className="mono-label mb-5 text-muted-foreground">{label}</figcaption> : null}
      <ol className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={item.stage}>
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

export interface Step {
  stage: string;
  detail: string;
}

/** Numbered rungs against a rail. The evidence lifecycle is the one block on
 *  this page the reader is expected to count through, so it gets numerals. */
export function StepLadder({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="relative m-0 list-none p-0">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.09375rem] top-6 w-px bg-border sm:left-[1.34375rem]" />
      {steps.map((step, i) => (
        <li
          key={step.stage}
          className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-7 last:pb-0 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6"
        >
          <span
            aria-hidden="true"
            className={`flex size-9 items-center justify-center rounded-full border border-border bg-card font-mono text-[11px] font-bold text-primary-ink sm:size-11 sm:text-xs ${ELEV_1}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-2 sm:pt-3">
            <p className="font-display body-lead font-bold leading-snug text-foreground">{step.stage}</p>
            <p className="mt-2 max-w-[60ch] body-copy leading-relaxed text-muted-foreground">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A row of mono chips — the frameworks-supported strip under the hero. */
export function TermStrip({ terms, label }: { terms: readonly string[]; label: string }) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
        {terms.map((t) => (
          <li
            key={t}
            className="rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-foreground"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A plain data table. Rows are `string[]` rather than a generic row type —
 * four tables with four different shapes are better served by one honest
 * primitive than by a type parameter nobody reads. `min-w-0` on the scroll
 * container is load-bearing: a grid or flex child defaults to `min-width:
 * auto`, so without it the table's `minWidth` propagates out and scrolls the
 * page body sideways on a phone.
 */
export function DataTable({
  head,
  rows,
  caption,
  minWidth = "42rem"
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  caption: string;
  minWidth?: string;
}) {
  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <table className="w-full caption-bottom border-collapse text-left text-sm" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
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
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-dashed border-border last:border-b-0">
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

/** Mono uppercase key, sans value, dashed rule between — the house pattern for
 *  anything factual. The key is `--primary-ink`, never `--primary`: 11px
 *  orange at 3.0:1 is a contrast failure this codebase has already fixed once. */
export function SpecRow({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,8rem)_1fr] items-baseline gap-3.5 border-b border-dashed border-border py-2.5 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink [overflow-wrap:break-word]">
        {k}
      </dt>
      <dd className="text-sm leading-normal text-foreground [overflow-wrap:break-word]">{children}</dd>
    </div>
  );
}

/** A connective list — the "OXOT connects…" clauses each framework section
 *  carries. A rule marker rather than a disc, because these are clauses in a
 *  technical document, not a feature list. */
export function ConnectList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 list-none space-y-2.5 p-0">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-x-3 body-copy leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-[0.6875rem] block h-px w-3 bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The long capability inventory. Two columns on a wide viewport, one on a
 *  phone, with a rule between rows so a fifteen-item list stays scannable. */
export function InventoryList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 grid list-none gap-x-8 border-t border-border p-0 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="border-b border-dashed border-border py-3 body-copy leading-relaxed text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The scope boundary. Deliberately not styled like the capability inventory:
 *  a bordered panel with a struck marker, so "does not" cannot be skim-read as
 *  another list of things OXOT does. */
export function BoundaryList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 list-none space-y-3 rounded-2xl border border-border bg-muted p-5 sm:p-7">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-x-3.5 body-copy leading-relaxed text-foreground">
          <span aria-hidden="true" className="mt-[0.625rem] block h-0.5 w-3 rounded-full bg-muted-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The sentence a section turns on. Rule on the left, no quotation marks —
 *  this is an assertion in a technical document, not a testimonial. */
export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="m-0 border-l-2 border-primary py-1 pl-5 sm:pl-6">
      <p className="max-w-[62ch] font-display body-lead font-bold leading-snug text-foreground sm:text-lg">
        {children}
      </p>
    </blockquote>
  );
}

/** The page's ask. `.cta-lift` is the styleguide's hover AND focus-visible
 *  spec; text on an orange fill is `--on-accent`. */
export function Ask({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`cta-lift inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-accent no-underline ${ELEV_1}`}
    >
      {children}
      <span aria-hidden="true">&#8594;</span>
    </Link>
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
