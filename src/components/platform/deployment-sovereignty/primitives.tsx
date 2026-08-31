import type { ReactNode } from "react";

/**
 * The reading furniture for one long deployment document.
 *
 * OXOT_Composition_Rules.md puts "Deployment and assurance routing" inside
 * the Platform page's "long-form product narrative", so this page is set as
 * a document — numbered sections, real tables, drawn diagrams — rather than
 * as a marketing card grid. None of these primitives is a card, a tile or a
 * panel with a number in it.
 *
 * KEPT LOCAL, like every other page kit on this site. consulting/page-kit,
 * company/page-kit and assurance/iec-62443/primitives.tsx are already three
 * copies of a similar set, each carrying a comment saying a page reaching
 * into another section's directory is the worse artefact. This is the
 * fourth section and it follows the same rule rather than quietly breaking
 * it — and this kit diverges anyway: ChipRow and ModeHead exist for the
 * boundary diagrams and have no equivalent there.
 *
 * Every colour is a theme token from src/app/globals.css. No hex, no
 * literal hsl(). Note the token contrast rule this codebase gets wrong most
 * often: --primary is an accent FILL for graphics, --primary-ink is the
 * text colour that clears AA on both grounds. Mono text under 24px takes
 * text-primary-ink; rules, arrows and borders take --primary.
 */

/** Numbered section rule, matching the document's section counter. */
export function SectionHead({ n, id, title, dek }: { n: string; id: string; title: string; dek?: string }) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <span className="mono-label font-bold text-primary-ink">{n}</span>
        <span aria-hidden="true" className="h-0.5 flex-1 bg-primary/30" />
      </div>
      <h2 id={id} className="h-sub mt-5 text-foreground">
        {title}
      </h2>
      {dek ? (
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{dek}</p>
      ) : null}
    </header>
  );
}

/**
 * A mode heading. In the contents rail as a level-3 entry, so it takes a
 * real id — unlike SubHead below, which is furniture inside a section.
 */
export function ModeHead({ n, id, name, statement }: { n: string; id: string; name: string; statement: string }) {
  return (
    <header className="border-l-2 border-primary pl-5">
      <p className="mono-label font-bold text-primary-ink">{n}</p>
      <h3 id={id} className="h-card mt-2 text-foreground">
        {name}
      </h3>
      <p className="prose-measure mt-2.5 body-lead leading-relaxed text-foreground">{statement}</p>
    </header>
  );
}

/**
 * THE HEADER SPINE — the boundary read left to right, in one line, before
 * the document starts arguing about it.
 *
 * A flat row of steps separated by arrows rather than a vertical ladder,
 * because the body of this page already spends three full-width figures on
 * vertical flow and the header should not pre-empt them. The last step
 * ("Nothing back to the vendor") deliberately has no arrow leaving it —
 * the sequence terminates rather than trailing off, which is the same
 * claim the Island Mode diagram makes at full size.
 */
export function Spine({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-10 flex list-none flex-wrap items-center gap-x-2.5 gap-y-2 p-0">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2.5">
          {i > 0 ? (
            <span aria-hidden="true" className="font-mono text-sm text-primary">
              &#8594;
            </span>
          ) : null}
          <span className="mono-label rounded border border-border bg-card px-2.5 py-1.5 text-foreground">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** A subordinate heading inside a section. Not in the contents rail. */
export function SubHead({ children }: { children: ReactNode }) {
  return <h4 className="mono-label mt-10 font-bold text-foreground">{children}</h4>;
}

/** One sentence pulled out of the argument. The typographic move, not a quote card. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-primary py-1 pl-6">
      <p className="font-display text-[1.375rem] font-medium leading-snug tracking-tight text-foreground sm:text-[1.5rem]">
        {children}
      </p>
    </blockquote>
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
 * A row of mono chips — the contents of one box on a boundary diagram.
 *
 * `muted` is for the things sitting OUTSIDE the customer boundary. They are
 * named on the diagram so a reader can see what is excluded, and they must
 * not read with the same weight as the things inside it; a dashed border
 * carries that without needing a second colour.
 */
export function ChipRow({ items, muted = false }: { items: readonly string[]; muted?: boolean }) {
  return (
    <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
      {items.map((item) => (
        <li
          key={item}
          className={
            muted
              ? "mono-label rounded border border-dashed border-border bg-background px-2 py-1 text-muted-foreground"
              : "mono-label rounded border border-border bg-background px-2 py-1 text-foreground"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The caption under a diagram, and the place this page says out loud what a
 * drawing is and is not. Every diagram here is a static reference drawing
 * of a notional topology, and saying so beside the picture is cheaper than
 * being caught by it later.
 */
export function FigureNote({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">{children}</p>;
}
