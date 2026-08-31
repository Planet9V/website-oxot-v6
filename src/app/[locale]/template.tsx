/**
 * THE PER-NAVIGATION ENTRANCE.
 *
 * `template.tsx` is the App Router slot that REMOUNTS on every navigation,
 * where `layout.tsx` persists. That is the whole mechanism here: the wrapper is
 * new on each route change, so a CSS animation on it runs once per navigation
 * without a single line of JavaScript, no state, and no client boundary. This
 * file is a server component.
 *
 * WHY NOT THE OBVIOUS ANSWERS. React's `<ViewTransition>` is the 2026
 * recommendation and it is NOT AVAILABLE to us: this app is on React 19.2.8
 * stable, where both `ViewTransition` and `unstable_ViewTransition` are absent
 * — the component ships on React's experimental channel. Moving a production
 * site onto experimental React to buy a crossfade is not a trade worth making.
 * `document.startViewTransition` was the other candidate and carries the
 * documented App Router scroll pitfall, which is the same failure that
 * `scroll-behavior: smooth` already caused here once.
 *
 * TRANSFORM ONLY, NEVER OPACITY — the same rule as `Reveal`, for the same
 * reason: `measure.mjs` flags text under 0.9 opacity as ghosted, and a page
 * that fades in is a page whose text is briefly unreadable. Movement only means
 * every word is legible in the first frame.
 *
 * THE ANIMATION ENDS AT `transform: none`, WITH NO FILL MODE, and that detail is
 * load-bearing. A transformed element becomes the containing block for
 * `position: fixed` descendants and can disturb `position: sticky` ones — and
 * this app has sticky rails (`page-rail`, the long-form contents rail, the
 * check wizard) inside `<main>`. Because the animation holds no final state,
 * the transform is gone the moment it finishes, and the containing block with
 * it. Sticky behaviour was measured after this shipped, not assumed.
 *
 * Reduced motion needs nothing here: the global `@media (prefers-reduced-motion)`
 * block in globals.css already forces every animation-duration to 0.01ms.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
