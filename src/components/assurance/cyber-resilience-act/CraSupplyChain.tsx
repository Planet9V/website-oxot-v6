import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SUPPLY_CHAIN } from "./content-model";
import { Section, SectionHead, DataTable, PullQuote, Chain } from "./kit";

/**
 * 11 — SUPPLY CHAIN, LIFECYCLE AND CHANGE. The source spec treats supply
 * chain and change management as two sections; they are one here because the
 * second is the first observed over time. A supplier dependency only becomes
 * legible when a release changes it and the model can show the difference.
 */
export function CraSupplyChain({ locale }: { locale: Locale }) {
  return (
    <Section id="supply-chain">
      <SectionHead
        n="11"
        id="supply-chain"
        title={pick(SUPPLY_CHAIN.title, locale)}
        dek={pick(SUPPLY_CHAIN.dek, locale)}
      />

      <DataTable
        head={SUPPLY_CHAIN.tableHead.map((h) => pick(h, locale))}
        rows={SUPPLY_CHAIN.rows.map((r) => r.map((c) => pick(c, locale)))}
      />

      <PullQuote>{pick(SUPPLY_CHAIN.pullQuote, locale)}</PullQuote>

      <div className="mt-12 border-t border-dashed border-border pt-10">
        <h3 className="h-sub text-foreground">{pick(SUPPLY_CHAIN.changeHead, locale)}</h3>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
          {pick(SUPPLY_CHAIN.changeDek, locale)}
        </p>

        <Chain label="What a release changes" steps={SUPPLY_CHAIN.changeChain.map((c) => pick(c, locale))} />

        <p className="prose-measure mt-8 border-l-2 border-primary pl-6 font-display text-[1.125rem] font-bold leading-snug text-foreground">
          {pick(SUPPLY_CHAIN.changeQuestion, locale)}
        </p>
      </div>
    </Section>
  );
}
