import type { ReactNode } from "react";

/**
 * The "classification stamp" kicker — this page's replacement for the
 * site's plain text-only `.oxot-kicker` (see energy-utilities' Hero and
 * every section, which just print a bare uppercase line). A bordered,
 * boxed label with hairline corner notches, evocative of a document-header
 * stamp convention — WITHOUT claiming any real classification level: the
 * text passed in here is always a plain descriptive label ("Defense &
 * Government", "Sovereignty", "Air-gapped deployment", ...), never a word
 * like CLASSIFIED, SECRET, or RESTRICTED (owner brief, 2026-08-22 — the
 * visual treatment may echo the convention, the page must never claim the
 * status).
 *
 * Built on --primary-ink, the same AA-safe orange every kicker on the site
 * already uses (globals.css's own note on why 12px kicker text must never
 * use --primary directly), so this reads as "the same brand, a more formal
 * register" rather than a second color system. Only the corner notches are
 * aria-hidden — the label text itself is real, readable content.
 */
export function DefenseStamp({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block border border-primary-ink/50 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-ink">
      <span aria-hidden="true" className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-primary-ink" />
      <span aria-hidden="true" className="absolute -right-px -bottom-px h-2 w-2 border-r-2 border-b-2 border-primary-ink" />
      {children}
    </span>
  );
}
