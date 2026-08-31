/**
 * The briefing's presentational primitives, kept inside its own directory —
 * the precedent set by `components/assurance/iec-62278-2/page-kit.tsx` and
 * `components/consulting/page-kit.tsx`, which duplicate rather than
 * cross-import for exactly this reason: a Resources page reaching into an
 * assurance directory is a worse artefact than a few repeated lines.
 *
 * EVERY PRIMITIVE HERE IS A DOCUMENT PART, NOT A MARKETING BAND. That is
 * the whole brief: resources_overview.md files this page under "Technical
 * Documents" and asks for something "more document-like and less
 * editorial" than the narrative it sits beside. So the vocabulary is clause
 * heads with a § numeral in the margin, key/value rows, ID-keyed registers
 * and a comparison matrix. There is no card grid, no hero treatment, no
 * diagram and no pull quote — the drawn boundaries live on
 * /deployment-sovereignty and this page links to them.
 *
 * Every colour is a token — `--border`, `--card`, `--muted`,
 * `--primary-ink` — read through Tailwind's token utilities. No hex, no
 * literal hsl() triplet, nothing that stops responding to the theme.
 */
import Link from "next/link";
import type { ReactNode } from "react";

/** Elevation composed from `--foreground` so it flips with the theme rather
 *  than using Tailwind's pure-black, light-only `shadow-*`. */
export const ELEV =
  "shadow-[0_1px_2px_hsl(var(--foreground)/0.05)] dark:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]";

/**
 * A clause head: the § numeral alone in the margin, the clause name above
 * the heading in the text column. This is what makes the page read as a
 * numbered document rather than a stack of sections, and it is why the
 * numerals live in the content file rather than being typed twice.
 */
export function ClauseHead({
  id,
  n,
  clause,
  title
}: {
  id: string;
  n: string;
  clause: string;
  title: string;
}) {
  return (
    <div className="grid gap-x-5 gap-y-1 sm:grid-cols-[2.75rem_1fr]">
      <span aria-hidden="true" className="font-mono text-[11px] font-bold leading-loose tracking-[0.1em] text-primary-ink">
        &sect;{n}
      </span>
      <div>
        <span className="mono-label block text-muted-foreground">{clause}</span>
        <h2 id={id} className="h-sub mt-1.5">
          {title}
        </h2>
      </div>
    </div>
  );
}

/** The body of a clause, indented to align under the clause head's text
 *  column on wide viewports and full-bleed on narrow ones. The 4rem is the
 *  head's own 2.75rem numeral track plus its 1.25rem gap — change one and
 *  the clause name stops sitting above its own body. */
export function ClauseBody({ children }: { children: ReactNode }) {
  return <div className="mt-6 min-w-0 sm:ml-16">{children}</div>;
}

/** Mono uppercase key, sans value, dashed rule between — the house pattern
 *  for anything factual. The key is `--primary-ink`, never `--primary`:
 *  11px orange at 3.0:1 is a contrast failure this codebase has fixed once
 *  and does not intend to reintroduce. */
export function DocRow({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,8rem)_1fr] items-baseline gap-x-4 gap-y-1 border-b border-dashed border-border py-3 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink [overflow-wrap:break-word]">
        {k}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground [overflow-wrap:break-word]">{children}</dd>
    </div>
  );
}

/** A bordered panel. The document's own paper, distinct from the page. */
export function Panel({ children, tone = "card" }: { children: ReactNode; tone?: "card" | "muted" }) {
  return (
    <div className={`rounded-2xl border border-border p-5 sm:p-7 ${tone === "muted" ? "bg-muted" : `bg-card ${ELEV}`}`}>
      {children}
    </div>
  );
}

/** The one-line note under a clause head. Never styled as body prose — this
 *  is the editorial gloss on a register, not the register. */
export function Note({ children }: { children: ReactNode }) {
  return <p className="max-w-[72ch] body-copy leading-relaxed text-muted-foreground">{children}</p>;
}

export interface IdRow {
  id: string;
  term: string;
  body: string;
  /** Single-letter owner code, rendered as a chip. Optional: only the
   *  mandatory-elements register carries one. */
  owner?: string;
  /** Expansion of the owner code, for the accessible name. A bare "C" is
   *  meaningless read aloud. */
  ownerTitle?: string;
}

/**
 * An ID-keyed register. The reference sits in its own monospace column so a
 * reader can quote "MTE-04" back at us, which is the entire reason these
 * carry IDs at all — a bulleted list cannot be cited in an email.
 */
export function Register({ rows }: { rows: readonly IdRow[] }) {
  return (
    <dl className="m-0">
      {rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[1fr] gap-x-5 gap-y-1.5 border-b border-dashed border-border py-4 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[5.5rem_minmax(0,11rem)_1fr]"
        >
          <span className="font-mono text-[11px] font-bold leading-normal tracking-[0.1em] text-primary-ink">
            {row.id}
            {row.owner ? (
              <span
                title={row.ownerTitle}
                className="ml-2 inline-flex size-[1.125rem] items-center justify-center rounded border border-border bg-muted align-[0.05em] text-[10px] font-bold text-muted-foreground"
              >
                <span className="sr-only">{row.ownerTitle ? `${row.ownerTitle}: ` : null}</span>
                {row.owner}
              </span>
            ) : null}
          </span>
          <dt className="font-display body-copy font-bold leading-snug text-foreground">{row.term}</dt>
          <dd className="max-w-[62ch] body-copy leading-relaxed text-muted-foreground">{row.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The comparison matrix. First column is the attribute — a row header, so
 * assistive technology announces which attribute a cell belongs to — and
 * the rest are the modes.
 *
 * `min-w-0` on the scroll container is load-bearing rather than tidiness: a
 * grid or flex child defaults to `min-width: auto`, so without it the
 * table's `minWidth` propagates out and sizes the whole track, scrolling
 * the page body sideways instead of the table.
 */
export function Matrix({
  head,
  rows,
  attributeLabel,
  caption
}: {
  head: readonly { ref: string; name: string }[];
  rows: readonly { attribute: string; cells: readonly string[] }[];
  attributeLabel: string;
  caption?: string;
}) {
  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <table className="w-full caption-bottom border-collapse text-left" style={{ minWidth: "56rem" }}>
        {caption ? <caption className="mono-label pt-4 text-left text-muted-foreground">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-[11rem] py-3 pr-5 align-bottom">
              <span className="mono-label">{attributeLabel}</span>
            </th>
            {head.map((h) => (
              <th key={h.ref} scope="col" className="py-3 pr-5 align-bottom last:pr-0">
                <span className="mono-label block text-primary-ink">{h.ref}</span>
                <span className="font-display mt-1 block body-copy font-bold leading-snug text-foreground">
                  {h.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.attribute} className="border-b border-dashed border-border last:border-b-0">
              <th
                scope="row"
                className="py-3.5 pr-5 align-top font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink"
              >
                {row.attribute}
              </th>
              {row.cells.map((cell, i) => (
                <td key={i} className="py-3.5 pr-5 align-top text-[0.875rem] leading-relaxed text-muted-foreground last:pr-0">
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

/** A plain data table for the registers that are genuinely tabular and do
 *  not need an ID column. Rows are `string[]` because two tables with two
 *  shapes are better served by one honest primitive than by a type
 *  parameter nobody reads. */
export function DataTable({
  head,
  rows,
  caption,
  minWidth = "44rem"
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  caption?: string;
  minWidth?: string;
}) {
  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <table className="w-full caption-bottom border-collapse text-left text-sm" style={{ minWidth }}>
        {caption ? <caption className="mono-label pt-4 text-left text-muted-foreground">{caption}</caption> : null}
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

/** The page's single ask. `.cta-lift` is the styleguide's hover AND
 *  focus-visible spec; text on an orange fill is `--on-accent`. */
export function Ask({ href, children, fine }: { href: string; children: ReactNode; fine?: ReactNode }) {
  return (
    <div>
      <Link
        href={href}
        className={`cta-lift inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-accent no-underline ${ELEV}`}
      >
        {children}
        <span aria-hidden="true">&#8594;</span>
      </Link>
      {fine ? <p className="mt-3.5 max-w-[52ch] text-[13px] leading-relaxed text-muted-foreground">{fine}</p> : null}
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
