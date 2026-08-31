import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { SOURCES } from "./content";
import { SOURCE_ROWS } from "./content-tables";

/**
 * Ten evidence domains, three columns: the artifact list and the "what it
 * supports" column only mean something read against each other, which is
 * the case for a table rather than a card per domain.
 */
export function EvidenceSources({ locale }: { locale: Locale }) {
  const t = SOURCES;
  return (
    <section aria-labelledby="evidence-sources" className="mt-16 border-t border-border pt-10">
      <h2 id="evidence-sources" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <ProseTable
        caption="Evidence domains, their typical source artifacts, and what each supports"
        head={["Evidence domain", "Typical source artifacts", "What it supports"]}
        minWidth="min-w-[52rem]"
      >
        {SOURCE_ROWS.map((row) => (
          <ProseRow key={row.domain.en}>
            <ProseRowHead>{pick(row.domain, locale)}</ProseRowHead>
            <ProseCell>{pick(row.artifacts, locale)}</ProseCell>
            <ProseCell muted={false}>{pick(row.supports, locale)}</ProseCell>
          </ProseRow>
        ))}
      </ProseTable>

      <p className="prose-measure mt-6 text-sm leading-relaxed text-muted-foreground">{pick(t.footnote, locale)}</p>
    </section>
  );
}
