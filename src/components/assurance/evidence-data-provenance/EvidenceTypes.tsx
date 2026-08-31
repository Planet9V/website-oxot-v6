import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ProseTable, ProseRow, ProseRowHead, ProseCell } from "./ProseTable";
import { TYPES } from "./content";
import { TYPE_ROWS } from "./content-tables";

/**
 * The strip is one situation read six times, each reading carrying its own
 * type label — which is the source's actual argument: the statements are
 * about the same PLC, and only the label stops the calculation being read
 * as the fact. So the six rows hang off a single left rail (they are one
 * situation) while each keeps its own type in a mono chip (they are not
 * one kind of statement). The table below names the seven types formally.
 */
export function EvidenceTypes({ locale }: { locale: Locale }) {
  const t = TYPES;
  return (
    <section aria-labelledby="evidence-types" className="mt-16 border-t border-border pt-10">
      <h2 id="evidence-types" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <dl className="mt-8 flex list-none flex-col gap-0 border-l-2 border-primary pl-5 sm:pl-7">
        {t.strip.map((s) => (
          <div key={s.tag.en} className="border-b border-dashed border-border py-4 first:pt-0 last:border-b-0 last:pb-0">
            <dt className="mono-label text-primary-ink">{pick(s.tag, locale)}</dt>
            <dd className="prose-measure m-0 mt-2 body-lead leading-relaxed text-foreground">
              {pick(s.body, locale)}
            </dd>
          </div>
        ))}
      </dl>

      <ProseTable
        caption="The seven evidence types, what each means, and an example of each"
        head={["Type", "Meaning", "Example"]}
        minWidth="min-w-[48rem]"
      >
        {TYPE_ROWS.map((row) => (
          <ProseRow key={row.type.en}>
            <ProseRowHead>{pick(row.type, locale)}</ProseRowHead>
            <ProseCell muted={false}>{pick(row.meaning, locale)}</ProseCell>
            <ProseCell>{pick(row.example, locale)}</ProseCell>
          </ProseRow>
        ))}
      </ProseTable>

      <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">{pick(t.close, locale)}</p>
    </section>
  );
}
