/**
 * The reference table. Six of this page's sections are tables in the
 * source material, and OXOT_Composition_Rules.md's Assurance rule is
 * explicit that they should stay tables — "editorial/technical reading
 * experience. Diagrams, tables, requirements traces. No sales-style
 * dashboard blocks." Summarizing ten rows of evidence-domain data into
 * six cards would be exactly the block this page must not have.
 *
 * Plain semantic <table> rather than src/components/ui/table.tsx, which
 * is a "use client" module: these tables are entirely static reference
 * material and have no business opening a client boundary. Scrolls
 * horizontally inside its own container so a three-column table never
 * makes the page body scroll sideways on a phone.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProseTable({
  caption,
  head,
  minWidth = "min-w-[40rem]",
  children
}: {
  /** Screen-reader caption. Every table here already has a visible h2. */
  caption: string;
  head: readonly string[];
  minWidth?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
      <table className={cn("w-full border-collapse text-left align-top", minWidth)}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-muted">
            {head.map((h) => (
              <th key={h} scope="col" className="mono-label px-4 py-3 align-bottom sm:px-5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

/** A body row. */
export function ProseRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-border align-top last:border-b-0">{children}</tr>;
}

/** The row-header cell — the term the row is about. */
export function ProseRowHead({ children }: { children: ReactNode }) {
  return (
    <th
      scope="row"
      className="px-4 py-4 text-left align-top font-display body-copy font-bold leading-snug text-foreground sm:px-5"
    >
      {children}
    </th>
  );
}

/** An ordinary data cell. */
export function ProseCell({ children, muted = true }: { children: ReactNode; muted?: boolean }) {
  return (
    <td
      className={cn(
        "px-4 py-4 align-top text-sm leading-relaxed sm:px-5",
        muted ? "text-muted-foreground" : "text-foreground"
      )}
    >
      {children}
    </td>
  );
}
