/**
 * The angular section-opening mark — this page's replacement for the site's
 * usual straight `border-t border-border` divider between major sections
 * (see energy-utilities' own sections, every one opened with
 * `border-t border-border pt-10`). Assigned design direction for this page
 * is "angular / restrained" (owner brief, 2026-08-22): a shallow clip-path
 * cut, read as a drafting or survey tick, rather than energy-utilities'
 * horizontal single-line-diagram thread (EnergyLine.tsx) — a different
 * motif, not a re-skin of the same one.
 *
 * Deliberately a small, bounded decorative element (a fixed ~160-180px
 * width, not the full section width) sitting above the section's own
 * kicker/heading, not a clip applied to the section box itself — clipping
 * the whole section risks shearing a heading's own glyphs at some viewport
 * width. Verified in the rendered page, not just in the CSS: the diagonal
 * never crosses a character, because it never shares a box with one.
 */
export function DefenseEdge() {
  return (
    <div
      aria-hidden="true"
      className="h-4 w-36 bg-border [clip-path:polygon(0_6px,100%_0,100%_100%,0_100%)] sm:w-44"
    />
  );
}
