import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { cn } from "@/lib/utils";
import { SectionA } from "./Rule";
import {
  CAMPUS,
  DEPENDENCY_SECTION,
  EXTERNAL_RECORDS,
  HUB_CAPTION,
  HUB_HINT,
  HUB_LINK_SUFFIX,
  HUB_NAV_LABEL,
  RUNGS,
  type DependencyRecord,
  type Rung,
  type Spoke
} from "./content.dependency";
import { COMMERCIAL_RECORDS } from "./content.dependency.commercial";

/**
 * S06 · DEPENDENCY MAP — source L193–L284, header recipe H-A.
 *
 * THE MAP IS AN INDEX, NOT A DISCLOSURE CONTROL, AND THAT IS THE WHOLE DESIGN
 * DECISION. L199 asks for "a clickable dependency map"; the obvious reading is a
 * tab strip or an accordion where clicking a node reveals its dependency. That
 * reading is rejected here. The six records ARE this section's argument — the
 * headline is "The risk is often outside the data hall" (L197) — so a control
 * showing one record and hiding five would make the section assert less than its
 * own headline, and a visitor who never clicks would leave having read one sixth
 * of the case. The topology below is instead a real in-page index: every node
 * label is an anchor that moves the reader to a record which is already there,
 * already rendered, already reachable by find-in-page, already on the printed
 * page. "Clickable" is honoured literally and nothing is hidden.
 *
 * THE DRAWING IS REAL DOM, NOT A CANVAS OR AN SVG. A node has to be a link, take
 * keyboard focus, wrap its own long label, and reflow on a phone. Every one of
 * those is free in flexbox and expensive on a drawing surface — and the usual
 * failure of the SVG version is exactly what `OXOT_Mobile_Rules.md` forbids: a
 * fixed-ratio diagram shrunk to 390px with labels no longer legible. Here the
 * connectors are borders and a 1px trunk, and below `md` the whole figure
 * reflows to a plain vertical list of nodes in the source's own order with the
 * connectors dropped, because a connector that connects nothing visible is
 * decoration.
 *
 * THE TRUNK IS THE SOURCE'S OWN FIGURE. `content.dependency.ts` sets out why the
 * L201–L213 fence is a vertical run with lateral pairs rather than a ring, and
 * why two of the three lateral pairs are ruled into the run while the third is
 * not. This file draws exactly that and adds nothing: no arrowheads, no
 * weighting, no distance, no count against any node.
 *
 * EACH RECORD KEEPS ITS OWN SHAPE. Energy, Communications, Commercial,
 * Manufacturing and Defense render lists of the source's own lengths; Water
 * renders an actual `<table>` because the source wrote a five-row comparison of
 * cooling architectures and the comparison is the record; Defense renders the
 * brief's approved statement as a real `<blockquote>` above its list. Forcing
 * the six into one uniform card would be the flattening the brief's own
 * asymmetry exists to prevent.
 *
 * THE DEFENSE BLOCKQUOTE IS LOAD-BEARING, NOT EMPHASIS. L262 forbids marketing
 * the Twin as an intelligence or classified-system tool absent authority, and
 * supplies the permitted wording at L264. That wording is rendered verbatim, at
 * full body size, at the head of the record — first thing under the heading,
 * above the four scenarios, never below the fold of its own record. See
 * `content.dependency.commercial.ts` before touching it.
 *
 * NO `data-balance-group` ANYWHERE IN THIS SECTION, AND HERE IS WHY. Sibling
 * balance exists to stop one pane of a TWO-PANE SPLIT sitting nearly empty
 * beside a full one; `scripts/measure.mjs` compares marked siblings within a
 * group. This section has no split — the six records are a single full-width
 * column run, one after another. And their lengths are unequal BY THE SOURCE:
 * Water is a table where the others are lists, Defense carries a quoted
 * statement the others do not, Manufacturing closes on a cited paragraph, and
 * the list lengths run seven, five, six and four. Marking them would measure the
 * wrong thing entirely — it would report the brief's own content distribution as
 * a layout defect, and the only way to "pass" would be filler invented to
 * satisfy a check that does not apply. Same reasoning
 * `rail-transportation-2/FreightScenarios.tsx` records for the same situation.
 *
 * NO IMAGERY. The section's claim is that the risk is OUTSIDE the data hall;
 * every asset available or generatable for this page depicts the inside of a
 * facility or a product surface, which is the subject this section exists to
 * point away from. A decorative image here would argue against the headline
 * above it.
 *
 * TOKEN DISCIPLINE: `--border`, `--card`, `--muted`, `--muted-foreground`,
 * `--foreground`, `--primary`, `--primary-ink` and `--ring` only. No
 * `--signal-*` token appears — the six signals carry model and decision state on
 * this page, and an external dependency is neither.
 */

const RECORDS: readonly DependencyRecord[] = [...EXTERNAL_RECORDS, ...COMMERCIAL_RECORDS];

/** A node's accessible name names the record it jumps to, so a screen-reader
 *  user hears the destination rather than nine bare nouns. Derived from
 *  `RECORDS` so a heading and the link pointing at it cannot drift apart. */
const HEADING_BY_ID: Record<string, Bilingual> = Object.fromEntries(
  RECORDS.map((record) => [record.id, record.heading])
);

/** The centre column, fixed so the trunk lands on the same axis on every rung. */
const TRUNK_COLUMN = "md:w-[17rem] md:shrink-0";

/** A node of the source's figure, and a link to the record that develops it. */
function Node({ spoke, locale }: { spoke: Spoke; locale: Locale }) {
  const label = pick(spoke.label, locale);
  return (
    <a
      href={`#${spoke.target}`}
      aria-label={`${label} ${pick(HUB_LINK_SUFFIX, locale)} ${pick(HEADING_BY_ID[spoke.target], locale)}`}
      className={cn(
        "flex min-h-11 items-center rounded-lg border border-border bg-card px-3.5 py-2.5",
        "body-copy leading-snug text-muted-foreground transition-colors duration-150",
        "hover:border-primary/60 hover:text-foreground",
        "focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      )}
    >
      {label}
    </a>
  );
}

/** The source's own rule from a lateral node into the trunk. Rendered as a
 *  transparent border of the same width where the source draws none, so both
 *  kinds of rung keep the same node positions and the trunk stays on axis. */
function Tie({ drawn }: { drawn: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "hidden md:block md:w-7 md:self-center md:border-t",
        drawn ? "md:border-border" : "md:border-transparent"
      )}
    />
  );
}

/** The trunk between two rungs. Dropped below `md` with the rest of the
 *  connectors — see this file's head comment on the narrow-width reflow. */
function TrunkSegment() {
  return <span aria-hidden="true" className="mx-auto hidden h-5 w-px bg-border md:block" />;
}

function RungRow({ rung, locale }: { rung: Rung; locale: Locale }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
      <div className="md:flex md:flex-1 md:items-center md:justify-end">
        {rung.left && <Node spoke={rung.left} locale={locale} />}
      </div>

      <Tie drawn={Boolean(rung.tied && rung.left)} />

      <div className={cn("md:flex md:items-center md:justify-center", TRUNK_COLUMN)}>
        {rung.hub ? (
          <span className="mono-label flex min-h-11 w-full items-center justify-center rounded-xl border border-primary/60 bg-primary/[0.05] px-5 py-3 font-semibold text-primary-ink">
            {pick(CAMPUS, locale)}
          </span>
        ) : rung.center ? (
          <Node spoke={rung.center} locale={locale} />
        ) : (
          /* A rung the source draws with the run passing straight through it. */
          <span aria-hidden="true" className="mx-auto hidden h-full w-px bg-border md:block" />
        )}
      </div>

      <Tie drawn={Boolean(rung.tied && rung.right)} />

      <div className="md:flex md:flex-1 md:items-center md:justify-start">
        {rung.right && <Node spoke={rung.right} locale={locale} />}
      </div>
    </div>
  );
}

/** A record's list body. Two tracks rather than one column crossing a full-width
 *  section; the grid fills row by row, so the source's order is the reading
 *  order. One column below `lg`. */
function Items({ items, locale }: { items: readonly Bilingual[]; locale: Locale }) {
  return (
    <ul className="mt-5 grid gap-x-10 gap-y-3 lg:grid-cols-2">
      {items.map((item) => {
        const text = pick(item, locale);
        return (
          <li
            key={text}
            className="flex min-w-0 gap-3 body-lead leading-relaxed text-muted-foreground"
          >
            <span aria-hidden="true" className="mt-[0.6875rem] h-px w-3 shrink-0 bg-border" />
            <span className="min-w-0">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Record({ record, locale }: { record: DependencyRecord; locale: Locale }) {
  const headingId = `${record.id}-h`;
  return (
    <article
      id={record.id}
      /* Focusable so that following a node link moves FOCUS here, not only the
         scroll position — otherwise a keyboard user's next Tab returns to the
         map they just left. */
      tabIndex={-1}
      aria-labelledby={headingId}
      className="scroll-mt-24 rounded-xl border-t border-border pt-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <h3 id={headingId} className="text-[1.25rem] font-semibold leading-snug text-foreground">
        {pick(record.heading, locale)}
      </h3>

      {record.lead && (
        <p className="mt-4 body-lead leading-relaxed text-muted-foreground">
          {pick(record.lead, locale)}
        </p>
      )}

      {record.quote && (
        <blockquote className="mt-5 border-l-2 border-primary-ink pl-5 body-lead leading-relaxed text-foreground">
          <p>{pick(record.quote, locale)}</p>
        </blockquote>
      )}

      {record.table && (
        <div className="mt-6">
          <StaticTable
            head={record.table.head.map((cell) => pick(cell, locale))}
            rows={record.table.rows.map((row) => row.map((cell) => pick(cell, locale)))}
            minWidth="38rem"
          />
        </div>
      )}

      {record.listLead && (
        <p className="mt-6 body-lead leading-relaxed text-muted-foreground">
          {pick(record.listLead, locale)}
        </p>
      )}

      {record.items && <Items items={record.items} locale={locale} />}

      {record.closing && (
        <p className="mt-6 body-lead leading-relaxed text-muted-foreground">
          {pick(record.closing.text, locale)}{" "}
          <Link
            href={localePath(
              locale,
              /* `/technical-specification` renders EN only, so an `nl` link is a
                 real 404. Same substitution the rest of the site uses. */
              locale === "en" ? record.closing.citation.href : PATHS.cdt2
            )}
            className="text-primary-ink underline-offset-4 hover:underline"
          >
            {pick(record.closing.citation.label, locale)}
          </Link>
        </p>
      )}
    </article>
  );
}

export function DependencyMap({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <SectionA
      id={DEPENDENCY_SECTION.id}
      index={DEPENDENCY_SECTION.index}
      datumLabel={DEPENDENCY_SECTION.datumLabel}
      heading={DEPENDENCY_SECTION.heading}
      locale={locale}
      className={className}
    >
      <figure className="m-0 rounded-2xl border border-border bg-muted/40 p-5 sm:p-8">
        <figcaption className="mono-label text-primary-ink">{pick(HUB_CAPTION, locale)}</figcaption>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(HUB_HINT, locale)}</p>

        <nav aria-label={pick(HUB_NAV_LABEL, locale)} className="mt-7 flex flex-col gap-3 md:gap-0">
          {RUNGS.map((rung, i) => (
            <div key={i} className="flex flex-col gap-3 md:gap-0">
              {i > 0 && <TrunkSegment />}
              <RungRow rung={rung} locale={locale} />
            </div>
          ))}
        </nav>
      </figure>

      <div className="mt-12 flex flex-col gap-12">
        {RECORDS.map((record) => (
          <Record key={record.id} record={record} locale={locale} />
        ))}
      </div>
    </SectionA>
  );
}
