import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { PRINCIPLES } from "./content";
import { PRINCIPLE_ROWS } from "./content-tables";

/** Ten rules, read as a reference table. Deliberately not ten cards. */
export function EvidencePrinciples({ locale }: { locale: Locale }) {
  const t = PRINCIPLES;
  return (
    <section aria-labelledby="evidence-principles" className="mt-16 border-t border-border pt-10">
      <h2 id="evidence-principles" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <ProseTable caption="Evidence principles and what each one means" head={["Principle", "What it means"]}>
        {PRINCIPLE_ROWS.map((row) => (
          <ProseRow key={row.principle.en}>
            <ProseRowHead>{pick(row.principle, locale)}</ProseRowHead>
            <ProseCell>{pick(row.meaning, locale)}</ProseCell>
          </ProseRow>
        ))}
      </ProseTable>

      <p className="prose-measure mt-6 text-sm leading-relaxed text-muted-foreground">{pick(t.footnote, locale)}</p>
    </section>
  );
}
