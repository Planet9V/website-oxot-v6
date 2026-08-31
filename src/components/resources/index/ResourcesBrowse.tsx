import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BROWSE_GROUPS, BROWSE_SECTION, resourceHref } from "./content";

const CHIP = "rounded-md border border-border px-3 py-1.5 text-[0.8125rem] leading-tight";

/**
 * BROWSE BY TOPIC. The source calls these filters, and says they become
 * "particularly useful once the library grows". The library is four
 * articles today, so a filter UI would be a control that returns a list
 * shorter than the control itself.
 *
 * What ships instead is the honest version of the same idea: each chip
 * routes to the page that already covers that topic in depth — an industry
 * vertical, an assurance framework, a decision page. That is genuinely
 * useful now and converts to real filters later without moving.
 *
 * THE AUDIENCE CHIPS ARE NOT LINKS, AND THAT IS THE POINT. Board, CISO,
 * Engineer, Safety/RAMS, Product team and Procurement have no
 * audience-tagged index to route to — nothing on this site is filtered by
 * reader role yet. They render as plain, visibly inert dashed chips with
 * the group's note saying so, rather than either omitted (which hides a
 * planned capability) or wired to a href that 404s. A chip that looks
 * clickable and is not is a broken promise; a chip that admits it is not
 * wired up yet is a roadmap.
 */
export function ResourcesBrowse({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="browse" className="mt-14 border-t border-border pt-10">
      <h2 id="browse" className="h-sub">
        {pick(BROWSE_SECTION.h2, locale)}
      </h2>
      <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
        {pick(BROWSE_SECTION.lead, locale)}
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {BROWSE_GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="mono-label text-primary-ink">{pick(group.label, locale)}</h3>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {pick(group.note, locale)}
            </p>
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li key={item.label.en}>
                  {item.href ? (
                    <Link
                      href={resourceHref(locale, item.href, item.enOnly)}
                      hrefLang={item.enOnly ? "en" : undefined}
                      className={`${CHIP} inline-block text-foreground transition-colors duration-150 ease-brand hover:border-primary/60 hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
                    >
                      {pick(item.label, locale)}
                    </Link>
                  ) : (
                    <span className={`${CHIP} inline-block border-dashed text-muted-foreground`}>
                      {pick(item.label, locale)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
