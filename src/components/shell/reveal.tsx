"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * REVEAL — content arrives with intent instead of appearing flat.
 *
 * TRANSFORM ONLY. NEVER OPACITY. This is the constraint the whole component is
 * built around, and it comes from our own gate: `measure.mjs` flags any element
 * with opacity < 0.9 carrying more than 12 characters of text as GHOSTED, on 21
 * routes across both themes. A conventional `opacity: 0 → 1` scroll reveal
 * would therefore fail the gate on every page of this site — correctly, because
 * text that has not faded in yet is text a reader cannot read.
 *
 * So this moves and does not fade. The safety property that follows is the
 * reason to prefer it anyway: THE CONTENT IS FULLY VISIBLE AT ALL TIMES. If the
 * JavaScript never runs — an error, an old browser, a crawler, a reader on a
 * throttled connection — every word is still on screen at full contrast, just
 * 10px lower than its final position. Nothing is ever hidden behind an
 * animation that might not fire.
 *
 * 10px, 300ms, `--ease-brand`. The distance is deliberately small: enough to
 * read as intent, not so much that the page appears to assemble itself. 300ms
 * is the design system's card duration (§7e rule 6), not a new value.
 *
 * FIRES ONCE, then disconnects. A section that re-animates every time it
 * re-enters the viewport is the thing that makes scroll animation tiresome on
 * the second pass.
 *
 * REDUCED MOTION is handled without a line of JavaScript here: the global
 * `@media (prefers-reduced-motion: reduce)` block in globals.css forces every
 * transition-duration to 0.01ms, so for those readers the element simply is
 * where it belongs.
 */
export function Reveal({
  children,
  /** Stagger within a group, in ms. Keep small — 40–60ms reads as one gesture. */
  delay = 0,
  className = ""
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* If the browser cannot observe, show it immediately rather than leaving
       it offset forever. Failure mode is "no animation", never "wrong
       position".

       SET FROM A TASK, NOT SYNCHRONOUSLY. Calling setState in the effect body
       is what `react-hooks/set-state-in-effect` exists to catch, and it caught
       this — correctly, since a synchronous set here schedules a second render
       before paint for every Reveal on the page at once. A microtask defers it
       out of the effect body and costs nothing a reader could perceive. */
    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setShown(true);
        io.disconnect();
      },
      /* A negative bottom margin so it triggers slightly BEFORE the element is
         fully on screen — by the time a reader's eye arrives, the movement has
         finished and they see a settled page rather than a moving one. */
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shown ? "none" : "translateY(10px)",
        transition: `transform 300ms var(--ease-brand)`,
        transitionDelay: shown ? `${delay}ms` : "0ms",
        /* Tells the browser to promote this to its own layer for the duration
           of the move, and nothing else. No opacity, no filter, no layout. */
        willChange: shown ? "auto" : "transform"
      }}
    >
      {children}
    </div>
  );
}
