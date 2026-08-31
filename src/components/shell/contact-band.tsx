import Link from "next/link";
import { localePath, PATHS } from "./nav";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * THE CONVERSION BAND — the site's one standing ask, above the footer.
 *
 * WHY IT EXISTS. This is a sales site whose lead-capture page was unreachable:
 * `/contact` had a working form and appeared in neither the nav nor the footer,
 * so the only route to it was a bare `mailto:` in the footer's address block.
 * A reader who wanted to talk to us had to know to type the URL.
 *
 * WHY IT IS NOT IN THE THREE DOOR CARDS. The obvious alternative was to hang a
 * form or an ask off each of CRA Readiness / Cyber Digital Twin / Consulting.
 * The doors do one job well — routing a reader to the right pillar — and a
 * second ask inside each would compete with that, triple the ask surface, and
 * produce three half-considered leads instead of one qualified one.
 *
 * SO IT SITS DIRECTLY BELOW THEM, which is the position that earns it: a
 * reader who scrolled past three doors without choosing one is exactly the
 * reader who needs a low-commitment way to start a conversation. The doors
 * qualify; this catches everyone they did not.
 *
 * TWO ROUTES, DELIBERATELY. The form for people who want to be contacted, the
 * address for people who would rather write themselves — some industrial
 * buyers will not put anything into a web form, and losing them to a missing
 * mailto would be a self-inflicted wound.
 *
 * A THIRD ROUTE — `/check`, a sharper CRA-specific magnet — sat here until
 * 2026-08-21 (owner), when it was pulled along with the CRA product line it
 * qualified leads for.
 */
export function ContactBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section
      aria-labelledby="contact-band"
      className="mt-16 border-y border-border bg-muted py-14"
    >
      <div className="oxot-canvas">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div>
            <p className="oxot-kicker">{t.contactBand.kicker}</p>
            <h2 id="contact-band" className="mt-3">
              {t.contactBand.heading}
            </h2>
            <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
              {t.contactBand.body}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={localePath(locale, PATHS.contact)}
              className={[
                "inline-flex h-12 items-center justify-center gap-2 rounded-md",
                "bg-primary px-6 body-copy font-semibold text-on-accent",
                "cta-lift hover:bg-primary/90",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              ].join(" ")}
            >
              {t.contactBand.cta} <span aria-hidden="true">&#8594;</span>
            </Link>

            <p className="mono-label mt-1 text-muted-foreground">
              {t.contactBand.orMail}{" "}
              <a
                href="mailto:info@oxot.nl"
                className="border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
              >
                info@oxot.nl
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
