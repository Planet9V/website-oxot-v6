"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, type Locale } from "@/i18n/config";

/**
 * The language switch.
 *
 * IT KEEPS YOUR PLACE. Swapping only the first path segment means a reader on
 * `/en/cra` lands on `/nl/cra`, not on the Dutch homepage. That sounds obvious
 * and is the thing most bilingual sites get wrong: dumping someone back to the
 * front door is a good way to make them stop reading, and it happens precisely
 * to the reader who was interested enough to be three pages deep.
 *
 * Real <a> elements to real URLs — not a client-side string swap. Each language
 * has its own canonical URL (that is what the layout's hreflang pair asserts),
 * so the switch has to be something a crawler can follow and a reader can
 * bookmark.
 *
 * The current language is rendered as `aria-current="true"`, not disabled: a
 * disabled control vanishes from the tab order, and a keyboard user then cannot
 * tell which of the two is active.
 *
 * IT KEEPS YOUR PLACE TWICE OVER. `swap()` keeps the PAGE — /en/cra goes to
 * /nl/cra, not to the Dutch homepage. `scroll={false}` keeps the POSITION: a
 * reader three screens into the CRA page stays three screens in rather than
 * being thrown back to the top, which is Next's default for <Link> and is
 * right for changing page but wrong for changing language — the reader has not
 * gone anywhere, they have asked for the same words in their own language.
 *
 * That it works at all is worth recording: a cross-locale navigation remounts
 * <html> (see layout.tsx), and the scroll position survives anyway. Measured
 * on all seven long routes, both directions: preserved to the pixel. Ordinary
 * navigation between pages still starts at the top, as it should.
 *
 * TWO PLACES, ONE COMPONENT. `compact` renders the header form — a segmented
 * EN|NL control sized to sit beside the theme toggle, with the label as an
 * accessible name instead of a visible heading. It exists because for a while
 * the switch was in the FOOTER ONLY: on a site whose first rule is that nothing
 * ships in one language, a Dutch reader landing on an English page had to scroll
 * the entire page to discover Dutch existed. The swap logic lives here once so
 * the two copies can never disagree about where a switch lands you.
 */
export function LanguageSwitch({
  locale,
  label,
  compact = false
}: {
  locale: Locale;
  label: string;
  /** Header form: segmented, no visible heading, h-9 to match the theme toggle. */
  compact?: boolean;
}) {
  const pathname = usePathname();

  /* Replace the leading /xx segment. Falls back to the bare locale root if the
     path somehow has no locale prefix — which the proxy should prevent, but a
     switch that throws is worse than one that goes home. */
  const swap = (next: Locale) => {
    const segments = pathname.split("/");
    if (segments.length > 1 && (LOCALES as readonly string[]).includes(segments[1])) {
      segments[1] = next;
      return segments.join("/") || `/${next}`;
    }
    return `/${next}`;
  };

  if (compact) {
    return (
      <nav aria-label={label} className="flex items-center rounded-md border border-border p-0.5">
        {LOCALES.map((code) => {
          const active = code === locale;
          return (
            <Link
              key={code}
              href={swap(code)}
              scroll={false}
              hrefLang={code}
              aria-current={active ? "true" : undefined}
              aria-label={LOCALE_LABEL[code]}
              className={[
                "inline-flex h-8 min-w-8 items-center justify-center rounded-[0.3rem] px-2",
                "font-mono text-xs uppercase tracking-wider",
                "transition-colors duration-150 ease-brand",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active
                  ? "bg-primary/15 text-primary-ink"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              ].join(" ")}
            >
              {LOCALE_SHORT[code]}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div>
      <p className="mono-label">{label}</p>
      <ul className="mt-4 flex items-center gap-1" role="list">
        {LOCALES.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                href={swap(code)}
                scroll={false}
                hrefLang={code}
                aria-current={active ? "true" : undefined}
                /* The full endonym for screen readers; the two-letter code is
                   what fits, but "EN" read aloud is not a language. */
                aria-label={LOCALE_LABEL[code]}
                className={[
                  "inline-flex h-8 min-w-10 items-center justify-center rounded-md px-2",
                  "font-mono text-xs uppercase tracking-wider",
                  "transition-colors duration-200 ease-brand",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active
                    ? "bg-primary/15 text-primary-ink"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                ].join(" ")}
              >
                {LOCALE_SHORT[code]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
