import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { REPORTING } from "./content";
import { Section, SectionHead, DataTable, Note } from "./kit";

/**
 * 03 — ARTICLE 14. The source spec for this page states the reporting
 * obligation as a single three-step sequence: 24 hours, 72 hours, 14 days.
 * That is wrong, and this section follows docs/reference/CRA-DATES.md
 * instead: Article 14 carries two tracks and four notifications, and the two
 * final-report clocks start from different kinds of event.
 *
 * `scripts/content-guards.mjs` guard 1 exists because this exact error
 * shipped on eight surfaces of the old site. Guard 2 exists because a future
 * obligation was described as already in force. Article 14 applies from a
 * date that is still ahead, so every verb here stays future or neutral —
 * nothing in this section says the reporting duty is already binding.
 */
export function CraReporting({ locale }: { locale: Locale }) {
  return (
    <Section id="reporting">
      <SectionHead n="03" id="reporting" title={pick(REPORTING.title, locale)} dek={pick(REPORTING.dek, locale)} />

      <DataTable
        head={REPORTING.tableHead.map((h) => pick(h, locale))}
        rows={REPORTING.rows.map((r) => r.map((c) => pick(c, locale)))}
        caption={pick(REPORTING.tableCaption, locale)}
      />

      <Note label="The trap">{pick(REPORTING.trap, locale)}</Note>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <h3 className="mono-label text-primary-ink">Products already on the market</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(REPORTING.grandfather, locale)}</p>
        </div>
        <div>
          <h3 className="mono-label text-primary-ink">What the clock actually demands</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(REPORTING.support, locale)}</p>
        </div>
      </div>
    </Section>
  );
}
