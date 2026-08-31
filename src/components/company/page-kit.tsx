/**
 * The presentational primitives the page kit needs (styleguide §13):
 * breadcrumb, the hero facts panel, the spec row, the single ask, elevation.
 *
 * ORCHESTRATOR: these are duplicated in `src/components/consulting/page-kit.tsx`
 * because my brief says to build shared components inside my own directory and
 * `src/components/` is not mine to claim. If a third page needs them, promote
 * one copy to `src/components/page-kit.tsx` and delete the other. I did not
 * cross-import between `consulting/` and `company/` — a company page reaching
 * into a consulting directory is a worse artefact than fifty duplicated lines.
 *
 * Every colour is a token. No hex, no literal hsl() — styleguide §0.
 */
import Link from "next/link";
import type { ReactNode } from "react";

/* Internal navigation goes through next/link — client-side transitions, and
   the no-html-link-for-pages lint rule fails the build otherwise. Only outbound
   links (LinkedIn, RVO) stay plain `<a>`, with rel="noopener noreferrer". */

/**
 * Elevation, styleguide §5, built per theme because that is the detail most
 * ports get wrong: on light the shadow is tinted with the ink colour and never
 * pure black; on navy a drop shadow is nearly invisible, so depth comes from an
 * inset top highlight. Both are composed from `--foreground`, so neither is a
 * literal colour and both flip with the theme. Tailwind's own `shadow-*`
 * utilities are pure black and light-only, which is why they are not used.
 */
export const ELEV_1 =
  "shadow-[0_1px_2px_hsl(var(--foreground)/0.05),0_1px_1px_hsl(var(--foreground)/0.04)] " +
  "dark:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]";

export const ELEV_2_HOVER =
  "hover:shadow-[0_4px_12px_hsl(var(--foreground)/0.07),0_2px_4px_hsl(var(--foreground)/0.05)] " +
  "dark:hover:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.09)]";

/** Visible trail. JSON-LD is the page's job, not this component's. */
export function Breadcrumb({
  here,
  homeHref
}: {
  here: string;
  /* Locale-prefixed, so it is passed in rather than hard-coded — a literal "/"
     would bounce a Dutch reader out to the proxy and back. */
  homeHref: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 text-[12.5px] leading-tight text-muted-foreground">
      <Link
        href={homeHref}
        className="border-b border-border text-muted-foreground no-underline transition-colors duration-150 ease-brand hover:border-primary-ink hover:text-primary-ink"
      >
        Home
      </Link>
      <span aria-hidden="true" className="px-2">
        /
      </span>
      <span className="text-foreground">{here}</span>
    </nav>
  );
}

/**
 * The house pattern for anything factual (styleguide §9.3): a mono uppercase
 * key on the left, a sans value on the right, separated by a dashed rule.
 * The key is `--primary-ink`, never `--primary` — 11px orange at 3.0:1 is the
 * exact failure that produced 41 contrast errors on the previous /services.
 */
export function SpecRow({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_1fr] items-baseline gap-3.5 border-b border-dashed border-border py-2.5 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[11px] font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink [overflow-wrap:break-word]">
        {k}
      </dt>
      <dd className="text-sm leading-normal text-foreground [overflow-wrap:break-word]">{children}</dd>
    </div>
  );
}

/** The facts panel that sits beside the hero and does the proving (vision §7). */
export function FactsPanel({ children }: { children: ReactNode }) {
  return <dl className={`rounded-lg border border-border bg-card px-5 py-5 ${ELEV_1}`}>{children}</dl>;
}

/**
 * The page's single ask. `.cta-lift` behaviour is inlined here rather than
 * added to globals.css, which is not my file; it is the styleguide §6.2 #8
 * spec — a 2px rise on hover AND on :focus-visible, transform only, brand
 * curve. Text on an orange fill is `--on-accent` (styleguide §2.3).
 */
export function Ask({ href, children, fine }: { href: string; children: ReactNode; fine?: ReactNode }) {
  return (
    <div>
      <Link
        href={href}
        className={`inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-accent no-underline transition-transform duration-150 ease-brand hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${ELEV_1}`}
      >
        {children}
        <span aria-hidden="true">→</span>
      </Link>
      {fine ? (
        <p className="mt-3.5 max-w-[36rem] text-[13px] leading-relaxed text-muted-foreground">{fine}</p>
      ) : null}
    </div>
  );
}

/** A quiet, non-competing onward link. Never styled to compete with `Ask`. */
export function Onward({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
