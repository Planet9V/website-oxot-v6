/**
 * TECHNICAL-DRAWING CORNER BRACKETS — the repeated framing device for this
 * page's "assembly line / technical drawing" direction (CLAUDE.md-style
 * owner brief, 2026-08-22): distinct from energy-utilities' single-line
 * diagram (EnergyLine.tsx), which this page deliberately does not reuse.
 *
 * Four L-shaped crop marks, drawn with plain CSS borders on real theme
 * tokens (border-primary) rather than fixed hex, so they respect the
 * light/dark toggle like every other real page. Purely decorative —
 * aria-hidden — and offset slightly outside the card edge (-inset-1.5) so
 * they read as registration marks around the card, evoking an engineering
 * drawing's crop marks, rather than a border on it.
 *
 * Usage: wrap the target in a `relative` element and render this as a
 * sibling, e.g. `<div className="relative"><ManuCornerFrame />{card}</div>`.
 */
export function ManuCornerFrame() {
  return (
    <span className="pointer-events-none absolute -inset-1.5 z-10" aria-hidden="true">
      <span className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-primary/70" />
      <span className="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-primary/70" />
      <span className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-primary/70" />
      <span className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-primary/70" />
    </span>
  );
}
