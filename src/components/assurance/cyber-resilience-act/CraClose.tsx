import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { LIMITS, CLOSE } from "./content-model";
import { Section, SectionHead, Ask, Onward } from "./kit";

/**
 * 12 — WHAT OXOT DOES NOT DO, and the close.
 *
 * The limits list is the last full section rather than a footnote under the
 * CTA, deliberately: the source spec's own note says this distinction
 * "strengthens OXOT's credibility with serious manufacturers", and a
 * disclaimer set in 12px grey under a button is not a distinction, it is a
 * disclaimer. Every line is a plain negative statement with no hedging verb.
 *
 * Onward links resolve through PATHS (src/components/shell/nav.ts, READ
 * ONLY — route registration for this page is handled separately). They point
 * only at destinations that exist today; the source spec's
 * /platform/decisions/* and /resources/* targets are not built yet and are
 * therefore not linked.
 */
export function CraClose({ locale }: { locale: Locale }) {
  /* /assurance and /technical-specification still carry a `locale !== "en"`
     guard, so in Dutch those two links would 404 — a dead link that
     scripts/measure.mjs counts and that a reader experiences as a broken
     page. They are offered only where they resolve, following the same
     "retarget to what is real today" rule the industry pages use. Once both
     render in Dutch, delete the filter and let the list be unconditional. */
  const enOnly = locale === "en";
  const onward = [
    enOnly
      ? { label: "Assurance — how evidence falls out of the engineering work", href: localePath(locale, PATHS.assurance) }
      : null,
    { label: "The Cyber Digital Twin", href: localePath(locale, PATHS.cdt2) },
    enOnly ? { label: "Technical specification", href: localePath(locale, PATHS.technicalSpecification) } : null,
    { label: "The document library", href: localePath(locale, PATHS.reference) }
  ].filter((o): o is { label: string; href: string } => o !== null);

  return (
    <>
      <Section id="limits">
        <SectionHead n="12" id="limits" title={pick(LIMITS.title, locale)} dek={pick(LIMITS.dek, locale)} />

        <ul className="m-0 mt-8 list-none p-0">
          {LIMITS.items.map((item) => (
            <li
              key={item.en}
              className="border-b border-dashed border-border py-3 body-copy leading-relaxed text-foreground"
            >
              {pick(item, locale)}
            </li>
          ))}
        </ul>

        <p className="prose-measure mt-8 body-copy font-semibold leading-relaxed text-foreground">
          {pick(LIMITS.responsibility, locale)}
        </p>
      </Section>

      <Section>
        <h2 className="h-sub text-foreground">{pick(CLOSE.title, locale)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(CLOSE.body, locale)}
        </p>

        <div className="mt-8">
          <Ask href={localePath(locale, PATHS.contact)} fine={pick(CLOSE.fine, locale)}>
            {pick(CLOSE.ctaPrimary, locale)}
          </Ask>
        </div>

        <div className="mt-12 border-t border-dashed border-border pt-8">
          <p className="mono-label text-muted-foreground">{pick(CLOSE.onwardHead, locale)}</p>
          <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
            {onward.map((o) => (
              <li key={o.href}>
                <Onward href={o.href}>{o.label}</Onward>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
