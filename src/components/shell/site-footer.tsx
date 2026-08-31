import Link from "next/link";
import { AS_OF, GRANT } from "@/content/claims";
import { localePath, PATHS, primaryNav } from "./nav";
import { Wordmark } from "./wordmark";
import { CookieSettingsButton } from "./cookie-consent";
import { LanguageSwitch } from "./language-switch";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * The footer — universal: identical on every route in both languages, because
 * it is rendered once in the locale layout rather than per page.
 *
 * WHAT IS DELIBERATELY ABSENT, because inventing it would be the single most
 * expensive kind of error this project can make:
 *   - No KvK number. There is none anywhere in this repository, and a fabricated
 *     company registration on a compliance firm's own footer is a claim the
 *     reader can falsify in one lookup, on the exact axis we sell.
 *   - No registered address, for the same reason.
 *   - Privacy, Terms, and Cookies were held back until they were real routes
 *     (they now exist, and are linked in the bottom bar further down this
 *     file) — BUILD-LAW §7 requires every link to resolve 200 with no
 *     redirect hop.
 *   - No newsletter signup. There is no list behind it. A subscribe field that
 *     drops the address on the floor is worse than no field, and worst of all
 *     on the site of a firm selling evidence and traceability.
 *
 * WHAT IS PRESENT: the legal entity (`GRANT.announced` — applicant of record),
 * one real mailbox, the language switch, and two outbound links to sources that
 * can contradict us. Linking out is a confidence signal; a compliance firm
 * whose footer contains no checkable third party is asking for trust it has not
 * earned.
 *
 * A server component, so it receives the whole dictionary. Unlike the header
 * that costs nothing: server-component props are never serialized to the
 * client.
 */

const EUR_LEX = "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng";

const footerLink = [
  "text-sm text-foreground/70 transition-colors duration-150 ease-brand",
  "hover:text-primary-ink",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
].join(" ");

export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  /* FLATTENED, deliberately. The header groups pages behind disclosures; the
     footer is the site's index and lists every page at one level. Without
     the flatten, a page hidden behind a dropdown could silently drop out of
     the footer too, which is how a page becomes unreachable without anyone
     editing the page. `theAsk()` (the /check CTA) was removed here on
     2026-08-21 along with the CRA product line it pointed at.

     DEDUPED BY HREF, 2026-08-22 — Company's "About OXOT" child points at the
     same /company URL as the Company parent itself (added when Company's
     dropdown was rebuilt around About OXOT + Contact), so the un-deduped
     flatten listed /company twice with two different labels: a genuine
     React key collision (`key={item.href}` below), not just a cosmetic
     double link. First occurrence wins, so the parent's "Company" label
     is what survives, not the child's "About OXOT". */
  const seenHrefs = new Set<string>();
  const destinations = primaryNav(locale, t.nav)
    .flatMap((item) => [item, ...(item.children ?? [])])
    .filter((item) => {
      if (seenHrefs.has(item.href)) return false;
      seenHrefs.add(item.href);
      return true;
    });

  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="oxot-canvas grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_auto]">
        <div>
          <Wordmark place="footer" locale={locale} label={t.nav.home} />
          {/* The tagline, set in the serif, mirroring the capital X of the
              mark. A brand asset, not a factual claim — and deliberately the
              same in both languages, because the X is the point. */}
          <p className="mt-3 font-display text-sm font-medium text-foreground/90">
            {/* `text-primary-ink`, not `text-primary`. This is the tagline —
                running prose at 14px, not the wordmark — so WCAG's logotype
                exception does not cover it and design-system §7e rule 2
                applies: small orange TEXT uses the ink, the accent fill is for
                fills. Measured at 2.44:1 on the light background before this,
                against a 4.5:1 bar. Two independent reviewers found it on the
                same day; the harness did not, because it only ever looked
                inside <main>. The three wordmark instances keep `text-primary`
                and their documented exemption. */}
            Operational e<span className="text-primary-ink">X</span>cellence in
            Operational Technology
          </p>
          {/* The tagline above is a brand lockup; THIS is the sentence that
              says what the firm does. The old footer had it, this one had
              dropped it, and without it the footer opens with a slogan and no
              explanation. */}
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
            {t.footer.descriptor}
          </p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-muted-foreground">
            {t.footer.entity}
            <br />
            <a href="mailto:info@oxot.nl" className={footerLink}>
              info@oxot.nl
            </a>
          </address>
        </div>

        <nav aria-label={t.nav.footer}>
          <p className="mono-label">{t.footer.site}</p>
          <ul className="mt-4 space-y-2">
            {destinations.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mono-label">{t.footer.checkUs}</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={GRANT.fund.proof}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                {t.footer.rvoLink}
                <span aria-hidden="true"> ↗</span>
              </a>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.footer.rvoNote}
              </p>
            </li>
            <li>
              <a
                href={EUR_LEX}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                {t.footer.euLink}
                <span aria-hidden="true"> ↗</span>
              </a>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.footer.euNote}
              </p>
            </li>
          </ul>
        </div>

        <LanguageSwitch locale={locale} label={t.language.label} />
      </div>

      {/* TWO ITEMS, and no repeated tagline. This row had six things in it
          and ended with "OXOT — Operational eXcellence in Operational
          Technology" — which is already printed at the top of this same
          footer, in the serif, next to the wordmark. Printing the lockup twice
          about 600px apart was the clutter. Copyright left, legal right. */}
      <div className="border-t border-border">
        <div className="oxot-canvas flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {AS_OF.slice(0, 4)} OXOT B.V.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href={localePath(locale, PATHS.privacy)} className={footerLink}>
              {t.legal.privacyShort}
            </Link>
            <Link href={localePath(locale, PATHS.cookies)} className={footerLink}>
              {t.legal.cookiesShort}
            </Link>
            <Link href={localePath(locale, PATHS.terms)} className={footerLink}>
              {t.legal.termsShort}
            </Link>
            <CookieSettingsButton label={t.cookieBanner.settings} />
          </div>
        </div>
      </div>
    </footer>
  );
}
