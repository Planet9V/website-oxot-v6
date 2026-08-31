import Link from "next/link";
import { localePath, PATHS } from "./nav";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * THE DOORS — "Where would you like to start?"
 *
 * The owner's chosen pattern for routing a reader into the site's pillars, and
 * it matches the top menu so the site says the same thing twice rather than two
 * different things once.
 *
 * CRA WAS THE THIRD DOOR UNTIL 2026-08-21 (owner) — pulled along with the rest
 * of the CRA product line. Twin leads now as the flagship and long-term asset;
 * Consulting is the revenue that bills today.
 *
 * Each card names its own ask rather than repeating the site CTA — a reader
 * choosing between doors is not yet ready for one button.
 */
export function ThreeDoors({
  locale,
  t
}: {
  locale: Locale;
  t: Dictionary["doors"];
}) {
  const doors = [
    { href: localePath(locale, PATHS.cdt2), title: t.twinTitle, body: t.twinBody, cta: t.twinCta },
    {
      href: localePath(locale, PATHS.consulting),
      title: t.consultingTitle,
      body: t.consultingBody,
      cta: t.consultingCta
    }
  ];

  return (
    <section aria-labelledby="doors" className="mt-14 border-t border-border pt-10">
      <h2 id="doors" className="h-section">
        {t.heading}
      </h2>

      <ul className="mt-8 grid list-none gap-4 p-0 lg:grid-cols-2">
        {doors.map((d) => (
          <li
            key={d.href}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <h3 className="h-card text-foreground">{d.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            <p className="mt-6">
              <Link
                href={d.href}
                className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 ease-brand hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {d.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
