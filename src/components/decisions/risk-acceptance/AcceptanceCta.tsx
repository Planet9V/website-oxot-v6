import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { CTA } from "./content";

/**
 * The closing ask, and three onward destinations.
 *
 * ALL THREE TARGETS RENDER IN BOTH LOCALES, so none needs a
 * `locale === "en"` guard: the five /assurance framework children are
 * Bilingual (nav.ts's own comment marks the EN-only precedent as specific
 * to /assurance itself and /technical-specification, not extended to
 * them), and /cdt-2 is reachable in both. Nothing here links to
 * /assurance or /technical-specification for exactly that reason.
 */
export function AcceptanceCta({ locale }: { locale: Locale }) {
  const t = CTA;
  const onward = [
    { href: localePath(locale, PATHS.assuranceEvidenceProvenance), item: t.onward.items[0] },
    { href: localePath(locale, PATHS.assuranceIec62443), item: t.onward.items[1] },
    { href: localePath(locale, `${PATHS.cdt2}#decide`), item: t.onward.items[2] }
  ];

  return (
    <section className="mt-20 lg:mt-28">
      <div className="rounded-xl border border-border bg-card p-6 sm:p-10">
        <h2 className="">{pick(t.h2, locale)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(t.body, locale)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(t.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale, PATHS.assuranceEvidenceProvenance)}>{pick(t.ctaSecondary, locale)}</Link>
          </Button>
        </div>
      </div>

      <h3 className="mono-label mt-12">{pick(t.onward.heading, locale)}</h3>
      <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3">
        {onward.map(({ href, item }) => (
          <li key={href}>
            <Link
              href={href}
              className="block h-full rounded-xl border border-border p-5 transition-colors duration-150 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="font-display text-base font-bold leading-snug text-foreground">
                {pick(item.label, locale)}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                {pick(item.note, locale)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
