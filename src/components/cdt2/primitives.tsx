import type { ReactNode } from "react";

/**
 * CDT-2 SHARED PRIMITIVES.
 *
 * Fixed dark palette, lifted verbatim from
 * new_material_source/redesign_cdt_page/handoff/CDT-Pillar-Page-Spec.md's
 * "Palette and type" table — this page does not follow the site's
 * light/dark toggle, matching the precedent already set by /iec-62443 (see
 * that page's own components for the same pattern: a permanently-dark
 * showcase, not a theme-reactive page).
 */
export const BG_BASE = "#060708";
export const BG_SURFACE = "#0a0c0e";
export const ACCENT = "#ff7a1a";
export const HAIRLINE = "rgba(255,255,255,.09)";

/**
 * Sized off the site's real `.oxot-kicker` (12px/600/0.18em uppercase) so
 * this page's labels match every other page's — only the color deviates,
 * since `.oxot-kicker` ties color to the theme-reactive `--primary-ink`
 * token and this page runs a fixed palette regardless of the light/dark
 * toggle. Inline style wins the cascade over the class's own color rule.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="oxot-kicker mb-3" style={{ color: ACCENT }}>
      {children}
    </div>
  );
}

/**
 * A full-width alternating band. `tone="base"` is #060708, `tone="surface"`
 * is #0a0c0e. The inner wrapper is the site's real `.oxot-canvas` — the same
 * class the header, footer and every other page's content sit in — so this
 * page's left/right edges land under the same pixels theirs do at every
 * viewport width, instead of drifting per-page container widths and
 * paddings ever again (globals.css's own comment on `.oxot-canvas`: "Never
 * introduce a new `mx-auto max-w-*` page wrapper").
 */
export function Band({
  id,
  tone,
  className = "",
  children
}: {
  id?: string;
  tone: "base" | "surface";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`border-b border-white/[0.07] py-16 md:py-20 ${className}`}
      /* `scrollMarginTop: 7rem` (112px), raised from 5rem 2026-08-31 — the
         real site header is `sticky top-0 h-16` (64px), and `Cdt2SectionNav`
         (rendered on the homepage, between Cdt2Hero and the first body
         section) now stacks its own sticky bar directly under it at
         `top-16`. That bar's own height (py-2.5 + one line of 13px text ≈
         44px) plus the header's 64px is ~108px of fixed chrome now sitting
         over the top of the viewport, not just the header's 64px `Band` was
         originally calibrated for — 7rem clears both with a few px to
         spare, matching `Capabilities.tsx`'s own "measured, not guessed"
         convention for this exact kind of arithmetic.

         SIDE EFFECT ON /home-legacy: seven of the eight Home2* components
         also use this `Band`, and that archived page has no
         `Cdt2SectionNav` bar — so its sections now scroll slightly further
         than the real header alone requires, leaving a small gap under it.
         Accepted rather than engineered around: that page is
         `robots:noindex`, unlinked from nav, kept for reference/rollback
         only, not a page real visitors land on day to day. */
      style={{ background: tone === "base" ? BG_BASE : BG_SURFACE, scrollMarginTop: "7rem" }}
    >
      <div className="oxot-canvas">{children}</div>
    </section>
  );
}

/** The site's real `.h-section` role (30px, bold display, no responsive
 *  step) — the same class every other page's section headings use. */
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="h-section text-white">{children}</h2>;
}

/** The 1px-gap card grid over a hairline background, so the gaps read as rules. */
export function CardGrid({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-xl border ${className}`}
      style={{ background: HAIRLINE, borderColor: HAIRLINE }}
    >
      {children}
    </div>
  );
}

/**
 * Hover parity with the site's shadcn Card (ui/card.tsx: 300ms translateY(-4px)
 * + shadow). A translateY lift is skipped here on purpose — Card almost always
 * sits inside CardGrid's `overflow-hidden` hairline grid, where a lifted top-row
 * cell would clip against that boundary. A same-duration shadow-only glow gets
 * the same "this responds to you" read without the clipping risk.
 */
export function Card({ accent, className = "", children }: { accent?: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={`p-6 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,122,26,.35),0_8px_24px_-8px_rgba(255,122,26,.25)] motion-reduce:transition-none motion-reduce:hover:shadow-none ${className}`}
      style={{ background: BG_SURFACE, color: accent ? ACCENT : undefined }}
    >
      {children}
    </div>
  );
}
