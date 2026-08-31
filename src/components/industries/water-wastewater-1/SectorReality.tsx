import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SECTOR_REALITY } from "./content";
import { ProfileSection } from "./Datum";

/**
 * CUSTOM TREATMENT, DELIBERATE — and here is why nothing named fits.
 *
 * This section is two paragraphs of sector narrative, one cited finding, and a
 * ten-row "why it is different here" table. None of the eight named patterns
 * covers it: Asset-Class Bento's cells *are* the nine `SystemAsset.type` values
 * and these ten rows are not assets; Decision Ledger is reserved for the Four
 * Decisions deliverable and these are not decisions; Evidence Dossier is
 * Assurance's alone by its own restriction; Case File Index is scoped to case
 * studies. Reaching for any of them would be the exact failure this build is
 * meant to avoid — naming a pattern and then not implementing it.
 *
 * So: an engineering **schedule**, which is what the source already is. Ten
 * hairline rows with a hanging mono index and a hanging term — never ten cards.
 * `OXOT_Visual_Rules.md` bars more than three visually equal cards, and ten of
 * them is that rule's worst case. The section's single primary focal element is
 * the cited finding beside the narrative; the schedule is the secondary
 * explanatory layer.
 */
export function SectorReality({ locale }: { locale: Locale }) {
  return (
    <ProfileSection
      id="sector-reality"
      index="01"
      datumLabel={SECTOR_REALITY.challengesLabel}
      heading={SECTOR_REALITY.h2}
      locale={locale}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="prose-measure body-lead leading-relaxed text-foreground">
            {pick(SECTOR_REALITY.bodyOne, locale)}
          </p>
          <p className="prose-measure mt-6 body-lead leading-relaxed text-muted-foreground">
            {pick(SECTOR_REALITY.bodyTwo, locale)}
          </p>
        </div>

        {/* The focal element: a real cited finding, set as a technical panel
            rather than a pull-quote, because it is evidence and not rhetoric. */}
        <aside className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-border bg-muted/50 p-6">
            <p className="mono-label">{pick(SECTOR_REALITY.findingSource, locale)}</p>
            <p className="mt-4 body-lead leading-relaxed text-foreground">
              {pick(SECTOR_REALITY.finding, locale)}
            </p>
          </div>
        </aside>
      </div>

      {/* The schedule. A definition list, not a grid of cards.
          NO ENTRANCE ANIMATION, deliberately: the Foundation Spec's motion
          rules allow motion that shows a selected view, a pathway trace, a
          control being placed, a route closing, an evidence drill-down or a
          state comparison. A table row fading in on scroll is none of those,
          and the same spec calls decorative motion a defect. */}
      <dl className="mt-14 border-t border-border">
        {SECTOR_REALITY.challenges.map((row, i) => (
          <div key={i} className="grid gap-x-6 gap-y-1 border-b border-border py-5 sm:grid-cols-12">
            <dt className="flex items-baseline gap-3 sm:col-span-5">
              <span className="mono-label shrink-0 text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-micro text-foreground">{pick(row.term, locale)}</span>
            </dt>
            <dd className="body-copy leading-relaxed text-muted-foreground sm:col-span-7">
              {pick(row.body, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </ProfileSection>
  );
}
