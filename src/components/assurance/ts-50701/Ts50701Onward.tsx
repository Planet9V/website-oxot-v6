/**
 * Onward routing plus the closing ask, in one section rather than two.
 *
 * WHY THE DEEP DIVE IS A LINK, NOT A SECTION: content/reference/
 * ts-50701.en.md already carries the full regulatory treatment and renders
 * at /reference/ts-50701. This page is the product framing — what the Twin
 * does with the specification — so it routes there instead of reprinting
 * it. Same reasoning for the rail cross-link: /industries/rail-transportation
 * carries the sector's operating models, and this page assumes that context
 * rather than restating it.
 *
 * ONE CLOSING ASK, not a full CTA band: /assurance/* is not in
 * SUPPRESS_CONTACT_BAND, so the site's own ContactBand and ThreeDoors
 * already close the page. A third full-width call to action would be the
 * "sales-style block" the assurance composition rules rule out.
 *
 * /technical-specification is EN-only (it carries a `locale !== "en"`
 * guard), so a Dutch reader is sent to /contact rather than a 404 — same
 * fallback pattern as industries/rail-transportation/RailRegulatory.tsx.
 */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { CTA, ONWARD } from "./content";
import { Onward, SectionHead } from "./kit";

export function Ts50701Onward({ locale }: { locale: Locale }) {
  const routes = [
    {
      href: localePath(locale, `${PATHS.reference}/ts-50701`),
      label: pick(ONWARD.deepDiveLabel, locale),
      body: pick(ONWARD.deepDiveBody, locale)
    },
    {
      href: localePath(locale, `${PATHS.industries}/rail-transportation`),
      label: pick(ONWARD.railLabel, locale),
      body: pick(ONWARD.railBody, locale)
    },
    {
      href: localePath(locale, PATHS.cdt2),
      label: pick(ONWARD.twinLabel, locale),
      body: pick(ONWARD.twinBody, locale)
    }
  ];

  const specHref = locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath(locale, PATHS.contact);

  return (
    <section aria-labelledby="onward" className="mt-16 border-t border-border pt-10">
      <SectionHead id="onward" heading={ONWARD.h2} locale={locale} />

      <ul className="mt-7 flex list-none flex-col p-0">
        {routes.map((r) => (
          <li key={r.href} className="border-b border-border py-5 first:pt-0 last:border-b-0">
            <Onward href={r.href}>{r.label}</Onward>
            <p className="prose-measure mt-2.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-border bg-muted p-6 sm:p-9">
        <h2 className="h-sub">{pick(CTA.h2, locale)}</h2>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{pick(CTA.body, locale)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(CTA.primary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={specHref}>{pick(CTA.secondary, locale)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
