/**
 * THE SIGNATURE MOTIF for this page: a "process-flow spine" — a persistent
 * vertical accent rule run down the left edge of the content column, the way
 * a pipe or a hydraulic line threads through a plant drawing. The reader
 * scrolls alongside it; every section hangs a small "station" marker off it
 * where it opens. This is deliberately NOT energy-utilities' EnergyLine.tsx
 * (a horizontal single-line diagram in boxed panels) — water's story is
 * continuous flow and threshold, so the line runs the length of the page
 * instead of appearing in isolated panels.
 *
 * `WaterSpineRail` is rendered once by page.tsx, absolutely positioned
 * against a shared `relative` wrapper that contains every section from Hero
 * through FinalCta, so the rule is visually continuous across section gaps.
 * `WaterStop` is rendered by each section to drop a station dot at its own
 * top edge — because the dot is positioned relative to the section itself
 * (not the page), it lands on the shared rail wherever that section falls
 * in the flow, with no JS/scroll math required.
 *
 * `WaterWave` replaces the site's usual hairline `border-t` between major
 * bands with a soft, hand-drawn-looking curve — literally a wave, since the
 * page's subject is hydraulic. Pure decoration: currentColor/text-border,
 * low opacity, aria-hidden.
 */
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

export function WaterSpineRail() {
  return (
    <span
      className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary/50 via-border to-border sm:left-0"
      aria-hidden="true"
    />
  );
}

/** A station dot on the shared rail, plus an optional short label riding
 *  beside it (e.g. "Stop 1"). The label is real text, not decoration, so it
 *  is never aria-hidden — only the dot and connector are. */
export function WaterStop({
  label,
  locale,
  size = "sm"
}: {
  label?: Bilingual;
  locale?: Locale;
  size?: "sm" | "lg";
}) {
  const dot = size === "lg" ? "size-3" : "size-[9px]";
  return (
    <span className="absolute -left-6 top-1.5 flex -translate-x-1/2 items-center sm:-left-10">
      <span className={`${dot} rounded-full bg-primary ring-4 ring-background`} aria-hidden="true" />
      {label && locale ? (
        <span className="mono-label ml-3 whitespace-nowrap text-primary-ink">{pick(label, locale)}</span>
      ) : null}
    </span>
  );
}

/** A soft curved divider standing in for `border-t border-border`. Sits at
 *  the top of a section, spanning the section's own width (including the
 *  rail gutter), so consecutive sections read as bands separated by a wave
 *  rather than a hard line. */
export function WaterWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 32"
      preserveAspectRatio="none"
      className={`absolute -top-10 left-[-1.5rem] right-0 h-8 w-[calc(100%+1.5rem)] text-border sm:left-[-2.5rem] sm:w-[calc(100%+2.5rem)] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,18 C180,4 360,30 600,16 C840,2 1020,28 1200,14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
