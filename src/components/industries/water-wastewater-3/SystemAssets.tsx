import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { AssetClassBento } from "@/components/twin/AssetClassBento";
import { ASSET_CLASSES } from "./content";
import { WATER_ASSETS } from "./content.assets";

/**
 * S03 · PATTERN 3 — ASSET-CLASS BENTO. A THIN HOST, DELIBERATELY, and that is
 * the whole design decision in this file.
 *
 * `src/components/twin/AssetClassBento.tsx` is the pattern's real, generic,
 * sector-agnostic reference implementation. It was rebuilt on 2026-08-25 to
 * match Pattern 3's CURRENT text — three horizontal tiered bands (Critical /
 * Important / Context), every card inside a band at uniform size, tier carried
 * by band position, a visible band label with its item count, and a single-hue
 * rail-intensity step. It is NOT the criticality-sized grid the pattern's
 * earlier drafts described, where `critical` assets took `col-span-2 row-span-2`
 * and cell AREA encoded the ordinal tier; independent research found area the
 * wrong encoding channel, and that scheme is gone along with the single-hero
 * cap, the "too few criticals" fallback and the collapsed "+N supporting
 * assets" cell that existed only to prop it up. Re-deriving any of that here
 * would produce a second, weaker copy of something already correct, so this
 * file reuses the shared component per the reusable-technique convention and
 * owns nothing but the wiring.
 *
 * WHAT THIS PAGE OWNS IS THE DATA. `content.assets.ts` is Wave 0's, read-only
 * to this file, and its own docblock carries the 9-of-9 falsification check
 * (all nine `SystemAssetType` values sourceable from industry_water.md without
 * fabricating an asset) that is the condition this section exists under at all.
 * Its per-asset comments argue every `criticality` tier from what the brief says
 * a compromise of that asset does to the process. None of that is restated here.
 *
 * NINE TYPES, THIRTEEN CARDS — not the same number, and worth stating because
 * the heading reads "Nine asset classes". The nine is the `SystemAssetType`
 * union; `WATER_ASSETS` instantiates thirteen assets across those nine types,
 * because the brief names three `field-device`s and two `service`s. The bands
 * therefore render 6 critical / 6 important / 1 context.
 *
 * NOT A `data-balance-group`, and that is not an omission. Bands hold different
 * numbers of assets by definition — six against one here — so relating band
 * heights would measure the INVENTORY rather than the layout, and the honest
 * one-member Context band would "fail" a ratio gate for accurately reporting
 * that the brief gives the historian no traced consequence. The floor that does
 * apply is a CONTENT floor: every card renders its own `description` in full,
 * unclamped. That is the shared component's behaviour — no `line-clamp`
 * anywhere in `AssetClassBento.tsx`, and no per-cell description rules — and it
 * was verified by reading the rendered text back against `WATER_ASSETS`, not
 * assumed from the source.
 */
export function SystemAssets({ locale }: { locale: Locale }) {
  return (
    /* THE DATUM RULE IS THIS FILE'S, THE HEADING IS THE BENTO'S. Every other
       section on this page renders `<section class="oxot-canvas pt-16 sm:pt-24">`
       with its own datum `<p>` and `<h2>`; the shared bento already brings a
       `<section>` and an `<h2>`, so wrapping it in that same shell would render
       two headings for one section. It gets the datum rule and the page
       container only.

       The `-mt-16` cancels most of `AssetClassBento`'s internal `mt-20`, landing
       its heading 16px under the datum — the same datum-to-heading gap (`mt-4`)
       every other section on this page uses. Left alone, the bento's 80px would
       open a second vertical rhythm on one section. */
    <div className="oxot-canvas pt-16 sm:pt-24" id="asset-classes">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        03 · {pick(ASSET_CLASSES.datum, locale)}
      </p>
      <div className="-mt-16">
        <AssetClassBento
          assets={WATER_ASSETS}
          title={ASSET_CLASSES.h2}
          intro={ASSET_CLASSES.intro}
          locale={locale}
        />
      </div>
    </div>
  );
}
