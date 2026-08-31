import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { FRAMEWORKS } from "./content";
import { FRAMEWORK_ROWS } from "./content-tables";

/**
 * The routing table, and the reason this page sits beside the other four
 * /assurance children rather than above them: they each carry one
 * regime's obligations, this one carries the evidence discipline all four
 * depend on. So each row links out to the regime page instead of
 * restating it. The governance row has no page — it is the general case
 * the other four are instances of — so it stays plain text rather than
 * linking somewhere approximate.
 */
export function FrameworkProvenance({ locale }: { locale: Locale }) {
  const t = FRAMEWORKS;
  return (
    <section aria-labelledby="framework-provenance" className="mt-16 border-t border-border pt-10">
      <h2 id="framework-provenance" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <ProseTable
        caption="Each assurance area, its evidence and provenance need, and what the Twin connects"
        head={["Assurance area", "Evidence and provenance need", "What the Twin connects"]}
        minWidth="min-w-[52rem]"
      >
        {FRAMEWORK_ROWS.map((row) => (
          <ProseRow key={row.area.en}>
            <ProseRowHead>
              {row.slug ? (
                <Link
                  href={localePath(locale, `${PATHS.assurance}/${row.slug}`)}
                  className="border-b border-primary/45 text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
                >
                  {pick(row.area, locale)}
                </Link>
              ) : (
                pick(row.area, locale)
              )}
            </ProseRowHead>
            <ProseCell muted={false}>{pick(row.need, locale)}</ProseCell>
            <ProseCell>{pick(row.connects, locale)}</ProseCell>
          </ProseRow>
        ))}
      </ProseTable>

      <p className="prose-measure mt-6 text-sm leading-relaxed text-muted-foreground">{pick(t.footnote, locale)}</p>
    </section>
  );
}
