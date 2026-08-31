import type { ReactNode } from "react";

/**
 * A BAND — one shaded section, full-bleed, content on the canvas.
 *
 * WHY THIS EXISTS AS A COMPONENT. This site has no photography, so the only
 * thing separating one section from the next is rhythm. `/twin` had this
 * markup defined privately inside its own page file and the home page had an
 * inline copy of it; every other page had nothing, which is why /cra, /check,
 * /company and the rest read as one undifferentiated column of text. Nine
 * copies of four lines is how nine pages drift apart, so there is one.
 *
 * THE RULE: sections alternate. A page's hero is unshaded, the section under it
 * is shaded, and so on down. Two adjacent sections must never share a
 * background — when they do, the boundary disappears and the two read as one
 * very long section.
 *
 * `bg-muted` is a TOKEN, so a band follows the reader's theme instead of
 * forcing dark on a light-mode reader. That is also where this can go wrong:
 * text that clears contrast on `--background` is not guaranteed to clear it on
 * `--muted`. `measure.mjs` checks text contrast in BOTH themes on every route,
 * which is the gate that catches it.
 *
 * Full-bleed on the outside, `.oxot-canvas` on the inside, so a band's shading
 * runs edge to edge while its content stays aligned with every other page —
 * left edge under the O of OXOT, right edge under the language toggle.
 */
export function Band({
  children,
  id,
  labelledBy,
  className = ""
}: {
  children: ReactNode;
  id?: string;
  /**
   * The id of the heading that names this section. A band REPLACES the
   * `<section aria-labelledby>` it was converted from, so without this the
   * conversion silently strips the section's accessible name — a screen-reader
   * user loses the ability to navigate by region, and no gate here catches it
   * (the harnesses check contrast, overflow and headings, not accessible
   * names). Pass it whenever the section had one.
   */
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`mt-16 border-y border-border bg-muted py-16 ${className}`}
    >
      <div className="oxot-canvas">{children}</div>
    </section>
  );
}

/**
 * The unshaded counterpart, so a page reads as a list of sections rather than
 * a mix of `<Band>` and bare `<section className="oxot-canvas mt-16">`. Same
 * spacing, no shading — use them alternately.
 */
export function Plain({
  children,
  id,
  labelledBy,
  className = ""
}: {
  children: ReactNode;
  id?: string;
  /** See `Band` — same reason. */
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`oxot-canvas mt-16 ${className}`}>
      {children}
    </section>
  );
}
