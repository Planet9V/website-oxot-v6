import Link from "next/link";

/**
 * THE BREADCRUMB. One of them, for the whole site.
 *
 * There were four, and two of them shipped English into Dutch pages:
 *
 *   - `components/consulting/page-kit.tsx` rendered the literal word "Home" and
 *     `aria-label="Breadcrumb"`, both hardcoded — so /nl/company and
 *     /nl/consulting told a Dutch reader "Home" and told a Dutch screen-reader
 *     user "Breadcrumb". CLAUDE.md §3: no user-facing string ships in one
 *     language, and an aria-label is a user-facing string.
 *   - /check, /contact and /twin each rolled their own <ol> version with the
 *     same hardcoded aria-label.
 *   - /retainer used a third shape, labelled with the page's own name.
 *   - /cra, the site's most important page, had none at all.
 *
 * The home crumb is the wordmark, not a translated word: "OXOT" is the same in
 * both languages and it is what the reader clicked to get here.
 *
 * Semantics are the boring correct ones — a labelled nav landmark, an ordered
 * list, and `aria-current="page"` on the last crumb — because a breadcrumb that
 * is a row of divs tells assistive technology nothing about where it is.
 */
const CRUMB_LINK =
  "border-b border-border transition-colors duration-150 ease-brand hover:border-primary-ink hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function Breadcrumb({
  here,
  homeHref,
  label,
  trail = []
}: {
  /** The current page, in the reader's language. */
  here: string;
  /** Locale-prefixed: a literal "/" would send a Dutch reader to English. */
  homeHref: string;
  /** The landmark's name, translated. */
  label: string;
  /**
   * Crumbs between home and here. THE TRAIL MIRRORS THE NAVIGATION: /retainer,
   * /conformity and the check are children of CRA in the header, so they are
   * children of CRA here too. A breadcrumb that disagrees with the menu is
   * worse than no breadcrumb — it teaches the reader a structure the site
   * does not have.
   */
  trail?: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label={label} className="pt-8">
      <ol className="mono-label flex flex-wrap items-center gap-2 text-muted-foreground">
        <li>
          <Link href={homeHref} className={CRUMB_LINK}>
            OXOT
          </Link>
        </li>
        {trail.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <Link href={crumb.href} className={CRUMB_LINK}>
              {crumb.label}
            </Link>
          </li>
        ))}
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground">
          {here}
        </li>
      </ol>
    </nav>
  );
}
