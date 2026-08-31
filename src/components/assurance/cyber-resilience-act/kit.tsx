/**
 * EDITORIAL PRIMITIVES for /assurance/cyber-resilience-act.
 *
 * OXOT_Composition_Rules.md, "Assurance pages": *editorial/technical reading
 * experience; diagrams, tables, requirements traces; no sales-style dashboard
 * blocks.* So this kit deliberately has no stat tile, no metric card, no
 * gradient panel and no card grid. It has a numbered section head, a real
 * `<table>`, a keyed requirements trace, a step chain, a pull quote and one
 * ask — the vocabulary of a technical document, not of a landing page.
 *
 * Duplicated inside this section directory rather than promoted to
 * `src/components/`, following the precedent `company/page-kit.tsx` sets in
 * its own header: a section reaching into another section's directory is a
 * worse artefact than a few duplicated lines. `ELEV_1` is copied from there
 * verbatim for the same reason.
 *
 * EVERY COLOUR IS A TOKEN. No hex, no literal hsl() triplet — including
 * inside the SVG diagrams, which take `hsl(var(--border))` and friends so
 * they flip with the theme like everything else.
 */
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Per-theme elevation: on light a shadow tinted with the ink colour, on dark
 * an inset top highlight, since a drop shadow is invisible on navy. Both
 * composed from `--foreground`, so neither is a literal colour.
 */
export const ELEV_1 =
  "shadow-[0_1px_2px_hsl(var(--foreground)/0.05),0_1px_1px_hsl(var(--foreground)/0.04)] " +
  "dark:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]";

/**
 * Numbered section heading: mono decimal counter, a short `--primary` rule,
 * then the heading. The counter is text under 24px so it takes
 * `--primary-ink`; the rule is a graphic so it takes `--primary`.
 */
export function SectionHead({
  n,
  id,
  title,
  dek
}: {
  n: string;
  id: string;
  title: string;
  dek?: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <span className="mono-label font-bold text-primary-ink">{n}</span>
        <span aria-hidden="true" className="h-0.5 w-11 bg-primary" />
      </div>
      <h2 id={id} className="h-sub mt-4 text-foreground">
        {title}
      </h2>
      {dek ? <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{dek}</p> : null}
    </header>
  );
}

/** The band every section sits in: a rule above, generous space, nothing else. */
export function Section({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section aria-labelledby={id} className="mt-16 border-t border-border pt-10">
      {children}
    </section>
  );
}

/**
 * A real table, because this page's content genuinely is tabular and a card
 * grid would be a worse rendering of it. Wide content scrolls inside its own
 * container so the page body never scrolls horizontally.
 */
export function DataTable({
  head,
  rows,
  caption
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  caption?: string;
}) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left align-top">
        {caption ? (
          <caption className="mb-3 text-left text-[13px] leading-relaxed text-muted-foreground">{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-border pb-2.5 pr-6 font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="align-top">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`border-b border-dashed border-border py-3 pr-6 text-sm leading-relaxed last:pr-0 ${
                    i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
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

/**
 * The requirements trace: a mono uppercase key, a sans value, a dashed rule
 * between. The key is `--primary-ink` and never `--primary` — 11px orange
 * fill on a light ground is the exact contrast failure this repo has paid
 * for before.
 */
export function TraceList({ rows, label }: { rows: readonly { k: string; v: string }[]; label?: string }) {
  return (
    <div className={`mt-8 rounded-lg border border-border bg-card px-5 py-5 ${ELEV_1}`}>
      {label ? <p className="mono-label mb-4 text-muted-foreground">{label}</p> : null}
      <dl>
        {rows.map((r) => (
          <div
            key={r.k}
            className="grid grid-cols-[minmax(0,7rem)_1fr] items-baseline gap-3.5 border-b border-dashed border-border py-2.5 first:pt-0 last:border-b-0 last:pb-0"
          >
            <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink [overflow-wrap:break-word]">
              {r.k}
            </dt>
            <dd className="text-sm leading-relaxed text-foreground [overflow-wrap:break-word]">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * A dependency chain, rendered as a numbered list with a real connector rule
 * running down the gutter — the honest HTML rendering of the source specs'
 * ASCII arrow blocks. Static: it depicts a sequence, it does not animate or
 * simulate one.
 */
export function Chain({ steps, label }: { steps: readonly string[]; label?: string }) {
  return (
    <div className="mt-8">
      {label ? <p className="mono-label mb-4 text-muted-foreground">{label}</p> : null}
      <ol className="relative m-0 list-none border-l border-border p-0 pl-6">
        {steps.map((s, i) => (
          <li key={s} className="relative pb-5 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[1.6875rem] top-1.5 h-2 w-2 rounded-full border border-primary bg-background"
            />
            <span className="mono-label mr-3 text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm leading-relaxed text-foreground">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A held-out sentence. Serif, larger, a primary rule on the left. */
export function PullQuote({ children, body }: { children: ReactNode; body?: string }) {
  return (
    <figure className="my-10 border-l-2 border-primary pl-6">
      <blockquote className="font-display text-[1.25rem] font-bold leading-snug tracking-tight text-foreground">
        {children}
      </blockquote>
      {body ? (
        <figcaption className="prose-measure mt-4 body-copy leading-relaxed text-muted-foreground">{body}</figcaption>
      ) : null}
    </figure>
  );
}

/** A boundary or caveat that must not read as decoration. */
export function Note({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <aside className="mt-8 rounded-lg border border-border bg-muted px-5 py-5">
      {label ? <p className="mono-label mb-3 text-primary-ink">{label}</p> : null}
      <div className="prose-measure body-copy leading-relaxed text-foreground">{children}</div>
    </aside>
  );
}

/**
 * A figure wrapper that forces every diagram to caption what it actually is.
 *
 * `data-gfx-meaning` is not decoration: scripts/measure.mjs checks WCAG
 * 1.4.11 (non-text contrast, 3:1) ONLY inside figures carrying this
 * attribute, because 1.4.11 exempts decoration and the checker cannot tell a
 * meaningful stroke from a deliberately faint rule. Both diagrams on this
 * page encode argument rather than ornament — the timeline's markers carry
 * passed/ahead/target, the boundary diagram's strokes carry which
 * dependencies cross the boundary — so both must be inside the checked set.
 * An unmarked figure is silently uncovered, which is the failure mode the
 * harness's own note calls out.
 */
export function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure data-gfx-meaning className="mt-8 overflow-x-auto rounded-lg border border-border bg-card p-5 sm:p-7">
      {children}
      <figcaption className="mt-5 text-[13px] leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** The page's single ask. Text on an orange fill is `--on-accent`. */
export function Ask({ href, children, fine }: { href: string; children: ReactNode; fine?: string }) {
  return (
    <div>
      <Link
        href={href}
        className={`inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-accent no-underline transition-transform duration-150 ease-brand hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${ELEV_1}`}
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
