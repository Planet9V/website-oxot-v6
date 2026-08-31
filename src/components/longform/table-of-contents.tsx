"use client";

import { useEffect, useState } from "react";

/**
 * ON THIS PAGE — the left rail.
 *
 * The CRA reference document is 74,000 characters. Without this, finding the
 * section on conformity assessment means scrolling past everything else and
 * hoping. With it, the document is navigable in one glance and one click.
 *
 * IT HIGHLIGHTS WHERE YOU ARE, and that is the part worth the JavaScript. A
 * list of links is a table of contents; a list that tracks the reader is a
 * position indicator, and in a document this long the second one is what stops
 * people getting lost. An IntersectionObserver watches the headings — no
 * scroll handler, no measuring on every frame.
 *
 * IT DEGRADES TO A LIST OF LINKS. Server-rendered anchors, so with JavaScript
 * off or before hydration the whole contents is there and every entry works.
 * Nothing here is invisible until hydration; this site has been caught by that
 * before, and the harness now counts it.
 */
export function TableOfContents({
  headings,
  label
}: {
  headings: readonly { id: string; text: string; level: 2 | 3 }[];
  label: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (!headings.length) return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target.id, entry.isIntersecting);
        /* The topmost heading currently on screen wins. Reading order, not
           firing order — entries arrive in whatever order the browser likes. */
        const current = headings.find((h) => seen.get(h.id));
        if (current) setActiveId(current.id);
      },
      /* A band across the upper third: a heading counts as "here" once it has
         cleared the sticky header, and stops counting well before it leaves. */
      { rootMargin: "-88px 0px -66% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  /* SMOOTH SCROLLING, SCOPED TO THIS RAIL AND NOTHING ELSE.
   *
   * The tempting version of this is `html { scroll-behavior: smooth }`, and it
   * is the wrong one: it was tried here, it made EVERY route change animate
   * from the old scroll position, and the chrome guard caught it with
   * "changing page still starts at the top — scrollY 65". It shipped for one
   * deploy before being reverted. A global rule cannot tell an in-page jump
   * from a navigation; a handler on the links that are actually in-page can.
   *
   * This rail is the only genuine in-page anchor set on the site. The other
   * `#` links are deliberately left alone: `#phases` and `#engagements` are
   * cross-page links that happen to carry a hash, the `#main` skip link must
   * jump INSTANTLY (animating a skip link defeats its purpose for the keyboard
   * users it exists for), and the contact form's error links are recovery
   * jumps, where landing immediately on the broken field beats a pretty ride.
   *
   * REDUCED MOTION FALLS THROUGH ON PURPOSE — no preventDefault, so the browser
   * performs its own instant jump and its own focus handling. Doing nothing is
   * the correct behaviour, and it needs no special case below.
   */
  function smoothTo(id: string) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      /* Never swallow a modified click — cmd/ctrl/shift-click and middle-click
         belong to the browser, not to us. */
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      /* `scroll-margin-top: 6rem` on `main [id]` (globals.css) already keeps the
         heading clear of the sticky header, and scrollIntoView honours it. */
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      /* preventDefault also cancelled the two things the browser does for free,
         so both are restored by hand. Focus first: without it a keyboard reader
         stays parked in the rail and tabs on from there rather than into the
         section they just chose. `preventScroll` stops focus from yanking the
         page to the target and fighting the animation. */
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      /* And the address bar, so the section stays linkable and the back button
         still works. `pushState`, not a hash assignment — assigning
         `location.hash` re-triggers the browser's instant jump. */
      history.pushState(null, "", `#${id}`);
    };
  }

  return (
    <nav aria-label={label} /* `self-start` is load-bearing: a grid item stretches to the row
         height by default, so `sticky` had nothing to stick within and the
         rail scrolled away with the article. Measured at 1440. */
      className="lg:sticky lg:top-24 lg:self-start">
      <p className="mono-label mb-3 font-bold text-foreground">{label}</p>
      <ul className="list-none space-y-1 border-l border-border p-0">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={smoothTo(h.id)}
                aria-current={active ? "location" : undefined}
                className={[
                  "-ml-px block border-l-2 py-1.5 text-[0.8125rem] leading-snug transition-colors duration-150 ease-brand",
                  h.level === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-primary font-medium text-primary-ink"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                ].join(" ")}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
