"use client";

import { MotionConfig } from "framer-motion";

/**
 * The global reduced-motion guard.
 *
 * The design system (§5) records this as the reference implementation's one
 * honest gap: conformity handles reduced motion per-component with scattered
 * `useReducedMotion()` calls and has no single switch, and the spec's own
 * checklist says not to repeat that in a new app. So this ships on day one.
 *
 * `reducedMotion="user"` makes Framer drop transform and layout animations for
 * anyone whose OS asks for less motion, while leaving opacity alone — motion
 * disappears, content does not. It covers every Framer animation in the tree at
 * once, including ones nobody has written yet, which is the whole point: the
 * per-component approach fails the moment someone forgets, and forgetting is
 * invisible to everyone who does not have the setting turned on.
 *
 * This is one half of a pair. `globals.css` carries the CSS-level
 * `@media (prefers-reduced-motion: reduce)` block, which catches the plain CSS
 * transitions Framer knows nothing about (.cta-lift, the Card hover, every
 * `transition-*` utility). Neither half is sufficient alone.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
