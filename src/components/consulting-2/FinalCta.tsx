import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content.finalCta";

/**
 * The page's closing block — source L502-L511.
 *
 * THIS REPLACES THE GLOBAL CONTACT BAND RATHER THAN SITTING ABOVE IT.
 * `/consulting` is on `SUPPRESS_CONTACT_BAND` (nav.ts) for the same reason
 * every finished industry page is: a page with a real closing ask of its own
 * renders that one and the global band stands down. Three stacked closings —
 * page CTA, then ContactBand, then ThreeDoors — was a recorded defect of the
 * previous build, and suppression is how the rest of the site avoids it.
 *
 * THE NINE INTAKE ITEMS CARRY NO MARKS. Six are artifacts and three are
 * questions ("supplier concern", "hazard/RAMS question", "proposed change"),
 * and the glyph index holds no honest document or artifact symbol — grepped
 * across every slug for document/report/list/drawing/sheet/folder/file/paper/
 * checklist/clipboard/note/book, zero hits. Attaching a near-miss mark to
 * "P&ID" would claim the reader should bring the thing that mark depicts.
 * They render as text, which is what they are.
 *
 * `intakeSentence` and `intakeItems` are two renderings of the same source
 * line. Only the list ships; the sentence stays in the content file as the
 * verbatim record of L506.
 */
export function FinalCta({ locale }: { locale: Locale }) {
  return (
    <section
      id={FINAL_CTA.sectionId}
      aria-labelledby="final-cta-h"
      className="mt-20 border-t border-border pt-10"
    >
      <p className="oxot-kicker">{pick(FINAL_CTA.datumLabel, locale)}</p>
      <h2 id="final-cta-h" className="h-section mt-3 text-foreground">
        {pick(FINAL_CTA.h2, locale)}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">
            {pick(FINAL_CTA.body, locale)}
          </p>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <Button asChild size="lg">
              <Link href={localePath(locale, FINAL_CTA.ctaPrimaryHref)}>
                {pick(FINAL_CTA.ctaPrimary, locale)}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath(locale, FINAL_CTA.ctaSecondaryHref)}>
                {pick(FINAL_CTA.ctaSecondary, locale)}
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="mono-label text-primary-ink">{pick(FINAL_CTA.intakeLead, locale)}</p>
          <ul className="mt-4 space-y-2.5">
            {FINAL_CTA.intakeItems.map((item) => (
              <li key={item.en} className="flex gap-3 body-copy leading-relaxed text-foreground">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                <span>{pick(item, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
