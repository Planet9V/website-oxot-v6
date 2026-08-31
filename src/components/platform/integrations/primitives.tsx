import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/**
 * The reading furniture for one catalogue page.
 *
 * KEPT LOCAL, like every other page kit on this site. assurance/iec-62443/
 * primitives.tsx, consulting/page-kit and company/page-kit are already three
 * copies of a similar set, each carrying a comment saying a page reaching
 * into another section's directory is the worse artefact. This is the fourth
 * section and it follows the same rule rather than quietly breaking it — and
 * it needs different parts anyway: a catalogue's unit is a three-column row,
 * where an assurance document's is a numbered trace.
 *
 * Every colour is a theme token. No hex, no literal hsl().
 */

/**
 * Numbered section rule. The counter is mono text under 24px so it takes
 * --primary-ink, not --primary; the rule is a graphic so it takes --primary.
 * That pair is the contrast rule this codebase gets wrong most often.
 */
export function SectionHead({
  n,
  id,
  title,
  dek,
  locale
}: {
  n: string;
  id: string;
  title: Bilingual;
  dek?: Bilingual;
  locale: Locale;
}) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <span className="mono-label font-bold text-primary-ink">{n}</span>
        <span aria-hidden="true" className="h-0.5 flex-1 bg-primary/30" />
      </div>
      <h2 id={id} className="h-section mt-5 text-foreground">
        {pick(title, locale)}
      </h2>
      {dek ? (
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(dek, locale)}</p>
      ) : null}
    </header>
  );
}

/** A subordinate heading inside a section. */
export function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="mono-label mt-10 font-bold text-foreground">{children}</h3>;
}

/**
 * THE CATALOGUE ROW — a real <table>, because these rows genuinely compare.
 * A reader scanning "what it becomes in the model" down one column is the
 * whole point of the section, and a stack of cards cannot be scanned that
 * way.
 *
 * The wrapper is the `overflow-x-auto` container the /cra console failure
 * taught this codebase to write: a wide table scrolls inside its own box
 * rather than widening the page.
 *
 * First column is mono, because it is the name of a record type — data, not
 * prose. `scope` on every header cell, so a screen reader can announce which
 * column a cell belongs to on a three-column table.
 */
export function SpecTable({
  columns,
  rows,
  locale
}: {
  columns: readonly Bilingual[];
  rows: readonly (readonly Bilingual[])[];
  locale: Locale;
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted">
            {columns.map((c, i) => (
              <th key={i} scope="col" className="mono-label px-4 py-3 align-bottom font-bold text-foreground">
                {pick(c, locale)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "w-[14rem] px-4 py-4 align-top font-mono text-[0.8125rem] font-medium leading-relaxed text-primary-ink"
                      : "px-4 py-4 align-top text-[0.9375rem] leading-relaxed text-foreground"
                  }
                >
                  {pick(cell, locale)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A mono chip. The unit of the intake map and the dependency graph. */
export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "quiet" }) {
  const cls =
    tone === "accent"
      ? "border-primary/45 bg-primary/10 text-primary-ink"
      : tone === "quiet"
        ? "border-dashed border-border bg-transparent text-muted-foreground"
        : "border-border bg-background text-muted-foreground";
  return <span className={`mono-label rounded border px-2 py-1 ${cls}`}>{children}</span>;
}

/**
 * The caption under a figure, and the place this page says out loud what a
 * drawing is and is not. This project has a documented history of components
 * claiming interactivity they did not have; every figure here carries one of
 * these, and every one of them is true.
 */
export function FigureNote({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

/** The house list: a hanging --primary marker, no bullet glyph. */
export function RuleList({ items, locale }: { items: readonly Bilingual[]; locale: Locale }) {
  return (
    <ul className="mt-6 list-none space-y-3.5 p-0">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[0.75rem_1fr] gap-3">
          <span aria-hidden="true" className="mt-[0.6875rem] h-px w-3 bg-primary" />
          <span className="body-lead leading-relaxed text-foreground">{pick(item, locale)}</span>
        </li>
      ))}
    </ul>
  );
}
