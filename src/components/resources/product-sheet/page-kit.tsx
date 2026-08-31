import type { ReactNode } from "react";
import Link from "next/link";

/**
 * The furniture for a one-page product sheet.
 *
 * KEPT LOCAL, like every other page kit on this site. `consulting/page-kit`,
 * `company/page-kit`, `assurance/iec-62278-2/page-kit` and
 * `platform/how-it-works/page-kit` are already four copies of the same idea,
 * each carrying a comment explaining that a page reaching into another
 * section's directory is the worse artefact. This is the fifth, and it
 * follows the rule rather than quietly breaking it.
 *
 * NOT THE how-it-works KIT'S SHAPES. That kit is for a narrative walked in
 * order, so its workhorse is an oversized serif numeral announcing which of
 * six links you are standing on. This page is not walked — it is scanned, and
 * often by someone who will read two of its five blocks. So the counting
 * device is a small mono index in a fixed left gutter, the same width all the
 * way down the page, which reads as a printed data sheet's margin rather than
 * as a progress indicator. Blocks are short enough that the gutter is never
 * far from the text it labels.
 *
 * Every colour is a theme token. No hex and no literal hsl(): this page has no
 * drawn figures, so there is nothing here that needs a raw paint value.
 */

/** The gutter width, shared by every block so the margin stays a straight
 *  line down the page. Changing it in one place changes the sheet. */
const GUTTER = "sm:grid-cols-[minmax(0,7.5rem)_1fr]";

/**
 * A SHEET BLOCK. Index and kicker in the margin, heading and body in the
 * column — the shape of a spec sheet's numbered clause.
 *
 * The rule above each block is what separates them; there is no vertical
 * spacing large enough to do that job on a page this dense without making it
 * long, which is the one thing a one-pager cannot be.
 */
export function SheetBlock({
  id,
  n,
  kicker,
  title,
  intro,
  children
}: {
  id: string;
  n: string;
  kicker: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`mt-14 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-border pt-8 ${GUTTER}`}
    >
      <div className="flex items-baseline gap-3 sm:block">
        <p className="mono-label font-bold text-primary-ink">{n}</p>
        <p className="mono-label text-muted-foreground sm:mt-1.5">{kicker}</p>
      </div>
      <div>
        <h2 id={id} className="h-section text-foreground">
          {title}
        </h2>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{intro}</p>
        {children}
      </div>
    </section>
  );
}

/**
 * The at-a-glance table. Mono keys, sentence values, one hairline per row.
 *
 * A <dl> rather than a <table>: these rows do not compare with each other and
 * nobody reads down the value column looking for a pattern. They are eight
 * separate answers to eight separate questions, which is what a definition
 * list is for.
 */
export function GlanceTable({ rows }: { rows: readonly { k: string; v: string }[] }) {
  return (
    <dl className="mt-5 border-t border-border">
      {rows.map((row) => (
        <div
          key={row.k}
          className="grid grid-cols-1 gap-1 border-b border-border py-3 sm:grid-cols-[minmax(0,6.5rem)_1fr] sm:gap-4"
        >
          <dt className="mono-label font-bold text-primary-ink [overflow-wrap:break-word]">{row.k}</dt>
          <dd className="body-copy leading-relaxed text-foreground [overflow-wrap:break-word]">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A short titled list — used twice in the definition block, for "It is" and
 * "It is not" side by side. The two lists are drawn identically on purpose:
 * the reader is meant to compare them line for line, and any styling
 * difference between the columns would suggest one carries more weight.
 */
export function ClaimList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <p className="mono-label font-bold text-foreground">{heading}</p>
      <ul className="mt-3 list-none space-y-2 border-t border-border p-0 pt-3">
        {items.map((item) => (
          <li key={item} className="body-copy leading-relaxed text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A numbered card — the deployment modes and the mechanism steps. Small,
 * evenly weighted, no prose beyond a sentence, because the argument for each
 * one is on the page this block links to.
 */
export function NumberCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="oxot-glass rounded-lg p-4">
      <p className="mono-label font-bold text-primary-ink">{n}</p>
      <p className="mt-2 font-display body-lead font-semibold leading-snug text-foreground">{title}</p>
      <p className="mt-2 body-copy leading-relaxed text-muted-foreground">{body}</p>
    </li>
  );
}

/**
 * The link that ends a block. Every summary on this page owes the reader the
 * page where the claim is argued in full, so this is the sheet's most
 * repeated element and it is drawn the same way every time — a mono label
 * with a trailing arrow, on the block's own baseline.
 */
export function SheetLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mono-label mt-6 inline-flex items-center gap-2 font-bold text-primary-ink underline-offset-4 transition-colors duration-150 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/** Mono chips — the input list and the framework list. Scanned for
 *  recognition, not read in order, which is what a chip row is for. */
export function ChipRow({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
      {items.map((item) => (
        <li key={item} className="mono-label rounded border border-border bg-card px-2 py-1 text-muted-foreground">
          {item}
        </li>
      ))}
    </ul>
  );
}
