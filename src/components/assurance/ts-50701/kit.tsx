/**
 * The presentational primitives this page repeats. Editorial, not
 * dashboard — OXOT_Composition_Rules.md says an assurance page is a
 * reading experience made of diagrams, tables and requirements traces,
 * so what lives here is a spec row, a reference table, a section head and
 * a callout, and deliberately not a stat tile or a metric card.
 *
 * Local to this directory on purpose. `src/components/consulting/page-kit.tsx`
 * carries near-identical SpecRow/Onward and says in its own header that a
 * page reaching into another page's directory is the worse artefact; if a
 * third assurance page needs these, promote one copy to a shared module
 * rather than cross-importing this one.
 *
 * Every colour is a theme token. No hex, no literal hsl().
 */
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Pair } from "./content-tables";

/** Section heading + optional standfirst. */
export function SectionHead({
  id,
  heading,
  lead,
  locale
}: {
  id: string;
  heading: Bilingual;
  lead?: Bilingual;
  locale: Locale;
}) {
  return (
    <>
      <h2 id={id} className="h-sub">
        {pick(heading, locale)}
      </h2>
      {lead ? (
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(lead, locale)}</p>
      ) : null}
    </>
  );
}

/** The house pattern for anything factual: mono key, sans value, dashed rule. */
export function SpecRow({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-dashed border-border py-3 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-4">
      <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink [overflow-wrap:break-word]">
        {k}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground [overflow-wrap:break-word]">{children}</dd>
    </div>
  );
}

export function SpecPanel({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {label ? <p className="mono-label mb-4 text-muted-foreground">{label}</p> : null}
      <dl>{children}</dl>
    </div>
  );
}

/** A two-column reference table. The page's default way of stating detail. */
export function PairTable({
  caption,
  headKey,
  headValue,
  rows,
  locale
}: {
  caption?: Bilingual;
  headKey: Bilingual;
  headValue: Bilingual;
  rows: readonly Pair[];
  locale: Locale;
}) {
  return (
    <figure className="mt-8">
      {caption ? <figcaption className="mono-label mb-3 text-muted-foreground">{pick(caption, locale)}</figcaption> : null}
      <div className="overflow-hidden rounded-2xl border border-border">
        <Table className="min-w-[36rem]">
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="w-[30%] align-top text-foreground">{pick(headKey, locale)}</TableHead>
              <TableHead className="align-top text-foreground">{pick(headValue, locale)}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-semibold text-foreground">{pick(r.k, locale)}</TableCell>
                <TableCell className="align-top leading-relaxed text-muted-foreground">{pick(r.v, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </figure>
  );
}

/**
 * A quoted principle or boundary statement. `tone="fixed"` marks the two
 * statements the source briefs require verbatim — visually heavier, so an
 * editor can see at a glance that the wording is not theirs to soften.
 */
export function Callout({
  children,
  label,
  tone = "default"
}: {
  children: ReactNode;
  label?: string;
  tone?: "default" | "fixed";
}) {
  return (
    <blockquote
      className={
        tone === "fixed"
          ? "mt-8 rounded-2xl border border-border bg-muted p-6 sm:p-7"
          : "mt-8 border-l-2 border-primary py-1 pl-5 sm:pl-6"
      }
    >
      {label ? <p className="mono-label mb-3 text-muted-foreground">{label}</p> : null}
      <p className="prose-measure font-display body-lead font-semibold leading-relaxed text-foreground sm:text-lg">
        {children}
      </p>
    </blockquote>
  );
}

/** A quiet onward link. Never styled to compete with the page's own ask. */
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
