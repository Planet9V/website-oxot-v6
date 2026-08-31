import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { CAPABILITIES } from "./content";

/**
 * S09 · PRODUCT CAPABILITIES — header recipe H-A.
 *
 * NINE ABSTRACT DESCRIPTIONS OF ONE PRODUCT MODEL — that is the content shape,
 * and it is what rules out the obvious pattern. Pattern 3 (Asset-Class Bento)
 * is barred here twice over: its cells ARE real `SystemAsset` records carrying
 * a criticality tier, and these nine are model capabilities with neither, so
 * keeping the pattern's shape while substituting a different taxonomy is the
 * failure `OXOT_Component_Inventory.md` names by name; and this page's four
 * named patterns are already spent on the hero, the worked example, the
 * decision ledger and the case-file index. Everything in this file is an
 * editorial treatment.
 *
 * A RULED SHEET, NOT NINE CARDS. Three columns, three rows, each entry opened
 * by a hairline running the full width of its column — one continuous ruled
 * surface rather than nine bordered boxes floating on the canvas. Nine equal
 * bordered cards is the "flat catalogue of equal cards" the Foundation Spec's
 * brand posture rules out in its opening paragraph, and it is also the shape
 * every other section on this page has been built to avoid.
 *
 * NO ORDINALS AND NO LETTERS. The nine are a set, not a sequence: the source
 * lists them as rows of a table and states no order of importance, and nothing
 * anywhere ranks them. This page already spends numerals in two different mono
 * voices — `Rule.tsx`'s per-section datum index, and the scenario register's
 * `S01`–`S10` — so a third numbering system here would put three unrelated
 * counts in one typeface on one page. The absence is the honest reading:
 * nothing distinguishes capability four from capability seven.
 *
 * WHY THREE COLUMNS AND NOT TWO. Nine entries divide evenly into three, so no
 * column carries a short tail, and every body runs to three or four lines at a
 * third of the canvas — dense enough to read as a sheet, short enough that no
 * cell dominates. Two columns would leave a four-five split and a ragged last
 * row.
 *
 * NO IMAGERY, AND THIS IS THE PAGE'S DECLINE — RECORDED, NOT SILENT.
 * `OXOT_Component_Inventory.md` requires an explicit reuse / generate / decline
 * call with reasoning rather than a bare "no imagery", and requires that a page
 * be able to point at where it declined. This is that section, and the reason
 * is neither "no existing asset fits" nor a dislike of the pipeline:
 *   · REUSE fails the depictive test. The obvious candidate is
 *     `/images/cdt-architecture-{dark,light}`, the seven-layer engine drawing
 *     sibling pages pair with their capability sections. These nine
 *     capabilities are not those seven layers — they are a mission-to-
 *     infrastructure map, a facility model, a cyber-pathway model, a dependency
 *     model, a BOM provenance model, a hybrid-event simulator, an investment
 *     model, an evidence trace and a set of deployment options. Nothing in
 *     `CAPABILITIES` names a seven-layer stack, so the figure would sit beside
 *     the text rather than be of it.
 *   · GENERATE fails on subject, not on effort. The only image this section
 *     could honestly want is a picture of a defense or government environment,
 *     and Visual Foundation Spec L531 bars depicting actual sensitive sites,
 *     national infrastructure, classified systems or real topology. A generated
 *     "notional sovereign facility" is exactly the fabricated-evidence image
 *     the same guidance warns is easiest to produce by accident at generation
 *     time. On this vertical, declining is the correct call rather than the
 *     lazy one.
 * The page's real visual weight sits where it is earned: the hero canvas, the
 * architecture stack, the worked example and the decision ledger.
 *
 * TOKEN DISCIPLINE: `--border`, `--foreground` and `--muted-foreground` only.
 * No `--signal-*` token appears in this file, and no accent: a capability is
 * not a model state, and nine tinted cards would be the "one accent color for
 * all controls, panels, icons, warnings, and CTAs" the Foundation Spec's
 * do-not list bars outright.
 *
 * SIBLING BALANCE: `data-balance-group="capabilities-sheet"` on each entry's
 * INNER wrapper — never the grid cell, which stretches to its row and would let
 * a thin entry pass on height alone. `data-balance-item` on each entry's name
 * and body, so the count measure reads two against two across all nine rather
 * than one mark per cell. One group for all nine is correct here, unlike the
 * per-row groups in S01 and S04: these nine ARE siblings of each other, laid
 * out in one grid at one size, so pooling them is the layout fact.
 *
 * MOBILE (OXOT_Mobile_Rules.md): three columns to two at `sm`, one below it,
 * DOM order is reading order and matches the content module's order. Every
 * description renders in full and unclamped at every width — no line-clamp, no
 * "read more", nothing behind a disclosure.
 */

/* Section chrome, not copy: `content.ts` carries no datum labels. */
const DATUM_LABEL = same("Capabilities");

export function Capabilities({ locale }: { locale: Locale }) {
  return (
    <SectionA
      id="capabilities"
      index="09"
      datumLabel={DATUM_LABEL}
      heading={CAPABILITIES.h2}
      locale={locale}
    >
      <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.items.map((item) => (
          <div key={item.name.en} className="border-t border-border pb-8 pt-5">
            <div data-balance-group="capabilities-sheet" className="min-w-0">
              <h3
                data-balance-item
                className="font-display body-lead font-bold leading-snug text-foreground"
              >
                {pick(item.name, locale)}
              </h3>
              <p
                data-balance-item
                className="mt-3 body-copy leading-relaxed text-muted-foreground"
              >
                {pick(item.body, locale)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionA>
  );
}
