import type { ReactNode } from "react";

/**
 * The reading furniture for one long technical document.
 *
 * OXOT_Composition_Rules.md asks assurance pages for an "editorial/technical
 * reading experience… no sales-style dashboard blocks", so none of these are
 * cards, tiles or panels with a number in them. They are the parts of a
 * specification: a numbered section rule, a pulled sentence, a definition
 * list, a numbered trace, and a citation line.
 *
 * KEPT LOCAL, like every other page kit on this site. `consulting/page-kit`
 * and `company/page-kit` are already two copies of the same primitives, each
 * one carrying a comment saying a page reaching into another section's
 * directory is the worse artefact. This is the third section, and it follows
 * the same rule rather than quietly breaking it.
 *
 * Every colour is a theme token. No hex, no literal hsl().
 */

/**
 * Numbered section rule. The counter is mono text under 24px so it takes
 * --primary-ink, not --primary; the rule is a graphic so it takes --primary.
 * That pair is the contrast rule this codebase gets wrong most often.
 *
 * The rule runs the full column width rather than stopping at 44px, because
 * in a twelve-section document it is the thing the eye uses to count
 * sections while scrolling, and a short tick does not read at speed.
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
      <div className="flex items-center gap-4">
        <span className="mono-label font-bold text-primary-ink">{n}</span>
        <span aria-hidden="true" className="h-0.5 flex-1 bg-primary/30" />
      </div>
      <h2 id={id} className="h-sub mt-5 text-foreground">
        {title}
      </h2>
      {dek ? <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{dek}</p> : null}
    </header>
  );
}

/** A subordinate heading inside a section. Not in the contents rail. */
export function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="mono-label mt-10 font-bold text-foreground">{children}</h3>;
}

/**
 * One sentence pulled out of the argument. Serif, oversized, hung off a
 * --primary rule — the typographic move, not a quote card.
 */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-primary py-1 pl-6">
      <p className="font-display text-[1.375rem] font-medium leading-snug tracking-tight text-foreground sm:text-[1.5rem]">
        {children}
      </p>
    </blockquote>
  );
}

/**
 * A citation. External, so a plain anchor with rel="noopener noreferrer" —
 * next/link is for internal routes.
 */
export function SourceNote({ children, href, source }: { children: ReactNode; href: string; source: string }) {
  return (
    <p className="prose-measure mt-6 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
      {children}{" "}
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className="mono-label whitespace-nowrap border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
      >
        {source} <span aria-hidden="true">&#8599;</span>
      </a>
    </p>
  );
}

/** The house list: a hanging --primary marker, no bullet glyph. */
export function TraceList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 list-none space-y-3 p-0">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-3">
          <span aria-hidden="true" className="mt-[0.6875rem] h-px w-3 bg-primary" />
          <span className="body-lead leading-relaxed text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A definition list for the attributes of one object — the system boundary's
 * six outputs. Deliberately not a two-column table: a table invites the
 * reader to compare rows against each other, and these do not compare.
 */
export function SpecList({ rows }: { rows: readonly { k: string; v: string }[] }) {
  return (
    <dl className="mt-6 border-t border-border">
      {rows.map((row) => (
        <div
          key={row.k}
          className="grid grid-cols-1 gap-1 border-b border-border py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6"
        >
          <dt className="mono-label font-bold text-primary-ink [overflow-wrap:break-word]">{row.k}</dt>
          <dd className="body-copy leading-relaxed text-foreground [overflow-wrap:break-word]">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * THE PAGE'S SIGNATURE MOTIF: a numbered trace, drawn as a continuous rule
 * with numbered nodes sitting on it.
 *
 * The source document uses the same shape four times at four depths — the
 * consequence chain, the risk chain, baseline-to-decision, and claim-to-
 * review-condition — because IEC 62443 reasoning IS a trace. Drawing them
 * alike is the point: a reader who has followed one can follow the rest.
 * The alternative, four different illustrations of the same idea, would be
 * decoration rather than notation.
 *
 * Static by construction and honest about it — there is no state here, no
 * hover reveal, and nothing claims otherwise.
 */
export function Trace({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="mt-6 list-none p-0">
      {steps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[1.75rem_1fr] gap-4 pb-7 last:pb-0 sm:grid-cols-[2rem_1fr] sm:gap-5">
          {/* The rule between this node and the next. Absent on the last
              step, so the trace terminates rather than trailing off. */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[0.84375rem] top-8 w-px bg-border sm:left-[0.96875rem]"
            />
          ) : null}
          <span className="z-10 flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-[11px] font-bold text-primary-ink sm:h-8 sm:w-8 sm:text-xs">
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="font-display body-lead font-bold leading-snug text-foreground">{step.title}</p>
            <p className="mt-1.5 body-copy leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * The caption under a diagram, and the place this page says out loud what a
 * drawing is and is not. Used under both diagrams, because both are static
 * reference drawings rather than views of a reader's own environment, and
 * saying so beside the picture is cheaper than being caught by it later.
 */
export function FigureNote({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{children}</p>;
}
