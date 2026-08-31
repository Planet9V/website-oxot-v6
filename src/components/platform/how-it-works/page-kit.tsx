import type { ReactNode } from "react";

/**
 * The furniture for one long product narrative.
 *
 * KEPT LOCAL, like every other page kit on this site. `consulting/page-kit`,
 * `company/page-kit` and `assurance/iec-62278-2/page-kit` are already three
 * copies of the same idea, each carrying a comment explaining that a page
 * reaching into another section's directory is the worse artefact. This is
 * the fourth, and it follows the rule rather than quietly breaking it.
 *
 * NOT THE ASSURANCE KIT'S SHAPES. That kit is for a specification: numbered
 * rules, requirement traces, citation lines. This page is a narrative with
 * one supporting figure per link, so its two workhorses are a chain-link
 * header carrying a large index numeral, and a key/value rail for the
 * figures. Deliberately different furniture for deliberately different prose.
 *
 * Every colour is a theme token. No hex, no literal hsl() here — the drawn
 * figures use `hsl(var(--token))` because SVG paint needs a value, and they
 * live in their own files.
 */

/**
 * A CHAIN-LINK HEADER. The numeral is the page's counting device — the
 * reader is walking a six-link chain and needs to know which link they are
 * standing on without scrolling back to the map.
 *
 * Serif and oversized rather than a mono tick, because at 06 of 06 it is
 * doing the work a progress indicator would otherwise do. It takes
 * --primary-ink rather than --primary: text still has to clear AA in both
 * themes, and the fill orange at --primary does not.
 */
export function ChainHead({
  n,
  id,
  title,
  dek
}: {
  n: string;
  id: string;
  title: string;
  dek: string;
}) {
  return (
    <header className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[4.5rem_1fr]">
      <div aria-hidden="true" className="flex items-start gap-4 sm:block">
        <span className="font-display text-[2.75rem] font-bold leading-none tracking-tight text-primary-ink">{n}</span>
        <span className="mt-5 h-px flex-1 bg-primary/30 sm:mt-6 sm:block sm:w-full" />
      </div>
      <div>
        <h2 id={id} className="h-section text-foreground">
          {title}
        </h2>
        <p className="prose-measure mt-5 font-display text-[1.25rem] font-medium leading-snug text-muted-foreground">
          {dek}
        </p>
      </div>
    </header>
  );
}

/** Body prose for a chain link, at reading measure, on the header's rail. */
export function ChainBody({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="prose-measure mt-8 space-y-5 sm:ml-[4.5rem] sm:pl-8">
      {paragraphs.map((p) => (
        <p key={p} className="body-lead leading-relaxed text-foreground">
          {p}
        </p>
      ))}
    </div>
  );
}

/**
 * The supporting figure slot. Indented to the same rail as the body so a
 * figure reads as part of its link rather than as a break between links.
 */
export function ChainFigure({ heading, note, children }: { heading: string; note?: string; children: ReactNode }) {
  return (
    <figure className="mt-10 sm:ml-[4.5rem] sm:pl-8">
      <figcaption className="mono-label font-bold text-foreground">{heading}</figcaption>
      {children}
      {note ? <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
    </figure>
  );
}

/**
 * A key/value rail. Used by four of the six links, because four of them
 * genuinely have the same shape of supporting detail: a short label and a
 * sentence. Drawing them alike is the point — a reader who has parsed one
 * parses the rest without re-learning the layout.
 *
 * Deliberately not a table. A table invites comparison down its columns and
 * these rows do not compare with each other; they enumerate.
 */
export function SpecRail({ rows }: { rows: readonly { k: string; v: string }[] }) {
  return (
    <dl className="mt-5 border-t border-border">
      {rows.map((row) => (
        <div
          key={row.k}
          className="grid grid-cols-1 gap-1 border-b border-border py-3.5 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-6"
        >
          <dt className="mono-label font-bold text-primary-ink [overflow-wrap:break-word]">{row.k}</dt>
          <dd className="body-copy leading-relaxed text-foreground [overflow-wrap:break-word]">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Grouped mono chips — the input inventory. Chips rather than a list,
 * because the reader is meant to scan for the documents they recognise from
 * their own site rather than read all twenty-two in order.
 */
export function ChipGroups({ groups }: { groups: readonly { label: string; items: readonly string[] }[] }) {
  return (
    <div className="mt-5 space-y-5">
      {groups.map((group) => (
        <div key={group.label} className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6">
          <p className="mono-label pt-1 font-bold text-primary-ink">{group.label}</p>
          <ul className="flex list-none flex-wrap gap-1.5 p-0">
            {group.items.map((item) => (
              <li key={item} className="mono-label rounded border border-border bg-card px-2 py-1 text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * A section header for the parts of the page that are not chain links — the
 * build sequence, the views, the technical layer, the routing. The kicker
 * carries the change of subject, so these do not need the chain's numeral.
 */
export function SectionOpener({
  id,
  kicker,
  title,
  intro
}: {
  id: string;
  kicker: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="max-w-[62ch]">
      <p className="oxot-kicker">{kicker}</p>
      <h2 id={id} className="mt-4 text-foreground">
        {title}
      </h2>
      <p className="mt-5 body-lead leading-relaxed text-muted-foreground">{intro}</p>
    </header>
  );
}
