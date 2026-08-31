"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ACCENT } from "./primitives";

/**
 * THIS PAGE'S OWN SECTION MAP — the seven section anchors that used to live
 * in the global primaryNav's "CDT-2" dropdown (shell/nav.ts), moved here
 * 2026-08-31 when CDT-2's content was promoted to the homepage. Same
 * anchors, same targets (`id="decide"` etc. on each `Band`, unchanged);
 * only where they render — and how they look — changed.
 *
 * REDESIGNED 2026-08-31 (owner feedback, verbatim: "the design of the
 * anchor navigation is not presented in a way that is useful or actually
 * for someone to understand what it is") into a STICKY SECONDARY NAV BAR
 * with an active-section indicator, replacing the original flat row of
 * unlabelled pills that sat once under the hero and gave no sense of
 * "this is navigation" or "you are here." Three directions were briefed
 * (vertical rail, sticky bar, editorial chapter list); sticky bar won on:
 * it's the standard, immediately legible pattern for "long single page,
 * persistent section nav" (most long-form B2B pages use exactly this), it
 * doesn't collide with this page's own two-column sections the way a side
 * rail would (hero's split panel, Investment/Test's video panes), and its
 * mobile story (horizontal scroll) is simpler to get right than a rail's
 * narrow-width collapse.
 *
 * RENDERED AS A SIBLING OF EVERY SECTION, NOT NESTED IN THE HERO. `page.tsx`
 * places this directly between `<Cdt2Hero>` and the first body section, not
 * inside Cdt2Hero's own `<section>` (where it used to live) — `position:
 * sticky` only tracks within its nearest containing block, so nesting it in
 * the hero would have unstuck it the moment the hero itself scrolled past,
 * long before a reader reached section 15.
 *
 * `top-16` (64px) matches the real site header's own height exactly
 * (`site-header.tsx`: `sticky top-0`, `h-16`) so this bar sits flush under
 * it with no gap and no overlap. `Band`'s own `scrollMarginTop` (primitives.
 * tsx) was raised from 5rem to 7rem to account for this bar's own height
 * stacking on top of the header — see that file's comment for the exact
 * arithmetic.
 *
 * ONE DELIBERATE EXCEPTION TO THIS CODEBASE'S USUAL ZERO-JS ANCHOR NAV
 * (`ChainMap` on /how-it-works, and this component's own prior version,
 * are both real anchor links and nothing else). An `IntersectionObserver`
 * drives the active-section highlight here because the owner's actual
 * complaint was legibility/orientation — "understand what it is" — and a
 * highlight showing WHERE YOU ARE is the highest-leverage fix for that; a
 * static list of links doesn't solve it no matter how it's styled. No
 * other behavior depends on JavaScript: every link is still a real `<a
 * href="#id">`, so the page works identically with JS disabled, just
 * without the highlight.
 *
 * FIXED DARK PALETTE, unlike `ChainMap` (theme tokens — correct there,
 * since /how-it-works follows the site's light/dark toggle; CDT-2 does
 * not, primitives.tsx's own docblock). Literal hex/rgba throughout.
 */
const SECTIONS = [
  { id: "decide", n: "01", label: "Decisions" },
  { id: "invest", n: "02", label: "Investment" },
  { id: "test", n: "03", label: "Test first" },
  { id: "risk", n: "04", label: "Risk" },
  { id: "engine", n: "05", label: "The engine" },
  { id: "services", n: "06", label: "Services" },
  { id: "faq", n: "07", label: "FAQ" }
] as const;

export function Cdt2SectionNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    /* The "active band" is a thin strip starting just below this sticky bar
       (top-16 header + this bar's own ~52px) and ending at 60% down the
       viewport — a section counts as current once its heading has cleared
       the fixed chrome and is genuinely the thing being read, not the
       instant its top pixel appears at the very bottom of the screen. */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActive(topmost.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-16 z-40 border-b border-white/[0.14]"
      /* Lighter than BOTH of Band's own tones (BG_BASE #060708, BG_SURFACE
         #0a0c0e), 2026-08-31 — the original rgba(6,7,8,.92) was nearly
         identical to the page's own background and read as invisible
         against it (confirmed: the bar was rendering and correctly
         positioned per getBoundingClientRect, just impossible to spot).
         #14171b reads as a distinct strip of chrome, the way the real
         header's own bg-background/80 does against the page beneath it. */
      style={{ background: "rgba(20,23,27,.97)", backdropFilter: "blur(8px)" }}
    >
      {/* Edge fades on the scroll container, not the canvas wrapper — Tailwind's
          arbitrary mask-image utility, so seven labels that overflow a narrow
          viewport read as "scroll for more" rather than getting hard-clipped. */}
      <div className="oxot-canvas">
        <ol
          className="flex list-none gap-1 overflow-x-auto p-0 py-2.5 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <Link
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium no-underline transition-colors duration-150"
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,.6)",
                    background: isActive ? "rgba(255,122,26,.14)" : "transparent"
                  }}
                >
                  <span className="font-mono text-[10px] font-bold" style={{ color: isActive ? ACCENT : "rgba(255,255,255,.4)" }}>
                    {s.n}
                  </span>
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
