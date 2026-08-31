import Link from "next/link";
import type { Locale } from "@/i18n/config";

/**
 * The wordmark — typeset, never an image (styleguide §1).
 *
 * It exists as one component because the brand's three non-negotiables are all
 * things a second hand-written copy would eventually break:
 *   - the X is ALWAYS --primary, in both themes, and is the only coloured glyph;
 *   - the tracking never drops below 0.24em, or it stops reading as a monogram;
 *   - the mark is SANS. Headlines are serif; the mark never is.
 *
 * This is the one place brand orange is correct below 24px. WCAG exempts
 * logotypes from contrast (1.4.3), and the glyph carries no information the
 * surrounding text does not — "OXOT" is still legible with the X in any colour.
 * Everywhere else on this site, orange text under 24px is --primary-ink.
 *
 * Sizes are §1's table: 15px / 0.28em in the header, 18px / 0.30em in the
 * footer, where the mark anchors a column and so carries more weight.
 */
export function Wordmark({
  place,
  locale,
  label
}: {
  place: "header" | "footer";
  locale: Locale;
  /* The accessible name is translated; the glyphs are not. "OXOT" is the
     company's name in both languages, but "home" is a word. */
  label: string;
}) {
  const header = place === "header";
  return (
    <Link
      href={`/${locale}`}
      aria-label={label}
      className={[
        "select-none font-semibold text-foreground no-underline",
        "transition-opacity duration-150 hover:opacity-80",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        header ? "text-[15px] tracking-[0.28em]" : "text-lg tracking-[0.30em]"
      ].join(" ")}
    >
      {/* Counted exemption, not a silent skip: measure.mjs reports how many
          nodes it skipped, so a growing skip list stays visible. WCAG 1.4.3
          exempts logotypes; this is the brand name. The FOOTER TAGLINE is
          not — it is running prose and uses text-primary-ink. */}
      O<span data-contrast-exempt="logotype-wcag-1.4.3" className="text-primary">X</span>OT
    </Link>
  );
}
