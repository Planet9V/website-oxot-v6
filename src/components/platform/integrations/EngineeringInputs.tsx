import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ENGINEERING } from "./content";
import { SectionHead, SpecTable, SubHead } from "./primitives";

/**
 * Section 02 — the engineering evidence catalogue.
 *
 * THREE TABLES RATHER THAN ONE, because the three groups are held by three
 * different teams and a reader arrives looking for their own. Process and
 * control is the automation group's; the reliability and safety analyses are
 * the RAMS group's; the network evidence is the OT infrastructure group's. A
 * single fifteen-row table would make each of them scan past two-thirds of
 * the page to find the rows they can actually supply.
 *
 * They stay tables and do not become cards: the middle column — what a
 * record becomes in the model — is the column a reader scans downward, and
 * that is exactly what a table affords and a card grid does not.
 */
export function EngineeringInputs({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby={ENGINEERING.id} className="mt-16 border-t border-border pt-12">
      <SectionHead
        n={ENGINEERING.n}
        id={ENGINEERING.id}
        title={ENGINEERING.title}
        dek={ENGINEERING.dek}
        locale={locale}
      />

      <SubHead>{pick(ENGINEERING.subProcess, locale)}</SubHead>
      <SpecTable columns={ENGINEERING.columns} rows={ENGINEERING.process} locale={locale} />

      <SubHead>{pick(ENGINEERING.subAnalyses, locale)}</SubHead>
      <SpecTable columns={ENGINEERING.columns} rows={ENGINEERING.analyses} locale={locale} />

      <SubHead>{pick(ENGINEERING.subNetwork, locale)}</SubHead>
      <SpecTable columns={ENGINEERING.columns} rows={ENGINEERING.network} locale={locale} />

      <p className="prose-measure mt-6 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        {pick(ENGINEERING.note, locale)}
      </p>
    </section>
  );
}
