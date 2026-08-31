import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCOPE } from "./content";
import { Section, SectionHead, Note } from "./kit";

/**
 * 01 — SCOPE. The source spec calls this "the most important distinction on
 * the page", and it is: the CRA binds products placed on the market, not
 * organisations that operate technology. Most of this site's audience
 * operates plants and does not manufacture products, so a page that skipped
 * this would be quietly mis-selling to nine readers in ten.
 *
 * Rendered as an opposed pair of lists rather than as two cards, because the
 * relationship between them is contrastive and a card grid flattens that.
 */
export function CraScope({ locale }: { locale: Locale }) {
  return (
    <Section id="scope">
      <SectionHead n="01" id="scope" title={pick(SCOPE.title, locale)} dek={pick(SCOPE.dek, locale)} />

      <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div className="md:border-r md:border-border md:pr-10">
          <h3 className="mono-label text-muted-foreground">{pick(SCOPE.notHead, locale)}</h3>
          <ul className="m-0 mt-4 list-none p-0">
            {SCOPE.notItems.map((item) => (
              <li
                key={item.en}
                className="border-b border-dashed border-border py-2.5 text-sm leading-relaxed text-muted-foreground last:border-b-0"
              >
                {pick(item, locale)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mono-label text-primary-ink">{pick(SCOPE.yesHead, locale)}</h3>
          <ul className="m-0 mt-4 list-none p-0">
            {SCOPE.yesItems.map((item) => (
              <li
                key={item.en}
                className="border-b border-dashed border-border py-2.5 text-sm leading-relaxed text-foreground last:border-b-0"
              >
                {pick(item, locale)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Note label="Boundary">
        <p className="font-semibold">{pick(SCOPE.boundary, locale)}</p>
        <p className="mt-3 text-muted-foreground">{pick(SCOPE.boundaryTail, locale)}</p>
      </Note>
    </Section>
  );
}
