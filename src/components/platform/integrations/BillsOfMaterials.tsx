import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BOMS } from "./content";
import { BomGraph } from "./BomGraph";
import { SectionHead, SpecTable } from "./primitives";

/**
 * Section 04 — the five bills of materials, stated twice on purpose.
 *
 * The table says what the five views are and what each one answers. The
 * graph below it shows them as one nested structure under a single asset,
 * which is the thing the table cannot say: that these are not five separate
 * documents but five branches of the same object, and that depth is where
 * the interesting finding usually sits.
 *
 * The five names, their coverage lines and the CycloneDX sentence come from
 * WHY_ANSWERS_HOLD on the protected /cdt-2 page — read, not imported, so the
 * terminology matches without this page depending on that one.
 *
 * THE TECHNICAL SPECIFICATION LINK IS EN-ONLY. nav.ts records
 * /technical-specification as an English-only page. A Dutch reader is not
 * sent to a 404; the button simply is not rendered for them, and the
 * section's own closing sentence carries the same fact in prose either way.
 * Reversible: once that page is bilingual, drop the conditional.
 */
export function BillsOfMaterials({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby={BOMS.id} className="mt-16 border-t border-border pt-12">
      <SectionHead n={BOMS.n} id={BOMS.id} title={BOMS.title} dek={BOMS.dek} locale={locale} />

      <SpecTable columns={BOMS.columns} rows={BOMS.rows} locale={locale} />

      <BomGraph label={pick(BOMS.graphLabel, locale)} note={pick(BOMS.graphNote, locale)} locale={locale} />

      <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">{pick(BOMS.closing, locale)}</p>

      {locale === "en" ? (
        <p className="mt-6">
          <Button asChild variant="outline">
            <Link href={localePath("en", PATHS.technicalSpecification)}>{pick(BOMS.specCta, locale)}</Link>
          </Button>
        </p>
      ) : null}
    </section>
  );
}
