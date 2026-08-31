import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { assetGlyph, TYPE_LABEL, CriticalityMark } from "./AssetNode";
import type { AssetCriticality, SystemAsset } from "./types";

/**
 * OXOT_Layout_Styles.md Pattern 3 — the nine real `SystemAsset.type` values,
 * grouped into three horizontal criticality BANDS: Critical, Important,
 * Context. Every card in a band is the same size as every other card, in that
 * band and in the others; nothing here is sized by copy length OR by tier.
 *
 * WHY POSITION AND NOT AREA. This component used to encode the three
 * criticality tiers as cell area — a 2x2 hero, 2x1 "other critical" cells and
 * a 1x1 tail — and that was the wrong channel for the job. Area is one of the
 * least reliable encodings for ordinal data, and it is at its worst exactly
 * where a CSS grid puts it: on rectangles of similar aspect ratio, where the
 * reader has to compare two dimensions at once and cannot see the ratio
 * directly. Position ranks far higher, and it is what the bands use now. The
 * area scheme also dragged a pile of machinery behind it — a single-hero cap,
 * a "too few criticals" fallback, a collapsed "+N supporting assets" cell, and
 * per-cell description rules to keep the hero from looking emptier than the
 * cells that set its height. All of it existed to prop up the encoding, so all
 * of it went with the encoding.
 *
 * TIER IS CARRIED BY THREE REDUNDANT CHANNELS, none of them area:
 *   1. band position — critical first, context last, top to bottom;
 *   2. a visible band label, as a real `<h3>` under the section's `<h2>`, so
 *      the tier is text that a reader and a screen reader both get, not an
 *      inference from geometry;
 *   3. a controlled step in ONE hue on each card's left rail — `--primary` at
 *      full strength for critical, at 40% for important, and no tint at all
 *      (plain `--border`) for context. One hue at three ordered strengths is
 *      an ordinal ramp; three different hues would not be. `--primary` is
 *      deliberately the same value in light and dark (globals.css: "the SAME
 *      orange in both themes"), so the ramp reads identically in both.
 * The rail is reinforcement, never the sole carrier — channel 2 is text — so
 * it does not become a WCAG 1.4.11 non-text-contrast dependency.
 *
 * Icons are the real, shared glyphs from `AssetNode.tsx` — the same visual
 * language the interactive Twin diagram already uses, not a second,
 * inconsistent icon set for the same 9 types. Resolution goes through
 * `assetGlyph`, so an asset that names a specific `symbol` draws that published
 * engineering mark and every other asset draws its type silhouette, unchanged.
 *
 * Focus order deliberately follows DOM/visual order, not criticality order:
 * `OXOT_Layout_Styles.md`'s own hierarchy-fallback fix corrects an earlier
 * version of this pattern that called for criticality-ordered keyboard focus,
 * specifically because that violates WCAG 2.4.3 (focus order must match visual
 * order) — this implementation follows that later, more-reviewed fix, not the
 * pattern's earlier, superseded description. With bands, visual order and
 * criticality order finally coincide anyway, and they coincide in the DOM too:
 * one array, read top to bottom. No tabIndex reordering is needed or wanted.
 *
 * The "reduced-opacity" subheader band the pattern describes deliberately does
 * NOT use CSS `opacity` — the pattern's own fix requires its contrast floor to
 * still clear 4.5:1 (WCAG 1.4.3), and `opacity` multiplies contrast down in a
 * way that's easy to get wrong. The band headings and all supporting text use
 * `text-muted-foreground` against `bg-card` or the page ground, the same
 * pairing already used for supporting text throughout this page and an
 * already-audited combination — reused here rather than inventing a new one.
 *
 * A CARD'S DESCRIPTION IS NEVER SILENTLY DISCARDED. The old grid could only
 * afford prose on its three largest cells, and routed the other six
 * descriptions into the `sr-only` summary so the renderer did not throw away
 * data it was handed. Uniform cards remove the reason for that split: every
 * card now renders its own `description` in full, unclamped, at the same type
 * size as every other card. Nothing is truncated, so nothing needs rescuing
 * into hidden text, and the `sr-only` announcement shrinks back to the one
 * thing it is actually needed for.
 *
 * That `sr-only` announcement carries only what is not already in the
 * accessibility tree: the criticality tier. Criticality is otherwise encoded
 * solely by `CriticalityMark` inside an `aria-hidden` `<svg>`, and is therefore
 * invisible to assistive tech — the band heading states it once per band, but a
 * reader moving card by card rather than heading by heading would never meet
 * it. `typeLabel` and `label` are deliberately not repeated: both are plain
 * visible `<p>`s a screen reader already reads.
 *
 * NOT A `data-balance-group`, deliberately — see the note in each consumer's
 * asset content file. The floor here is a CONTENT floor, not a height ratio:
 * bands hold different numbers of assets by definition, so relating band
 * heights would measure the inventory rather than the layout.
 */

/**
 * Bands render in this order, top to bottom — the ordinal encoding itself.
 * `same()` because these are the same short technical words the rest of the
 * Twin's labels carry untranslated (`TYPE_LABEL` in AssetNode.tsx does the
 * same); grep `same(` when the real translation pass starts.
 */
const BANDS: readonly { tier: AssetCriticality; label: Bilingual; rail: string }[] = [
  { tier: "critical", label: same("Critical"), rail: "border-l-primary" },
  { tier: "important", label: same("Important"), rail: "border-l-primary/40" },
  { tier: "context", label: same("Context"), rail: "border-l-border" }
];

export interface AssetClassBentoProps {
  assets: SystemAsset[];
  title: Bilingual;
  intro?: Bilingual;
  locale: Locale;
}

export function AssetClassBento({ assets, title, intro, locale }: AssetClassBentoProps) {
  // `criticality` is optional on `SystemAsset`; an asset that declares no tier
  // is context, which is what the previous implementation assumed too. A band
  // with no members renders nothing rather than an empty labelled rule.
  const bands = BANDS.map((band) => ({
    ...band,
    members: assets.filter((a) => (a.criticality ?? "context") === band.tier)
  })).filter((band) => band.members.length > 0);

  return (
    <section aria-labelledby="system-assets" className="mt-20">
      {/* No `max-w-xl`/`max-w-2xl`/`prose-measure` here (removed 2026-08-25,
          found by measure.mjs's automated narrow-text check, after the check
          itself was fixed to actually reach this shared component — see that
          fix's comment): this heading and intro sit standalone above the
          bands, full-width, with nothing else in the row. Measured live at
          47%/55% of section width on water-wastewater-3. Shared by every
          consumer of this component (all three water-wastewater iterations
          plus the live water-wastewater page), so this one fix reaches all of
          them at once. */}
      <h2 id="system-assets" className="h-sub text-balance">
        {pick(title, locale)}
      </h2>
      {intro && (
        <p className="mt-5 text-pretty body-lead leading-relaxed text-muted-foreground">
          {pick(intro, locale)}
        </p>
      )}

      <div className="mt-10 space-y-10">
        {bands.map((band) => (
          <div key={band.tier}>
            {/* Label and count sit TOGETHER on the left, not pushed apart by
                `justify-between`: at 1440px a right-aligned tally ends up ~1200px
                from the word it counts, and stops reading as that band's count. */}
            <div className="flex items-baseline gap-2 border-b border-border pb-2">
              <h3 className="mono-label text-muted-foreground">{pick(band.label, locale)}</h3>
              <span className="mono-label text-muted-foreground">· {band.members.length}</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {band.members.map((asset, i) => {
                return (
                  <BlurFade key={asset.id} delay={i * 0.03} duration={0.25} inView inViewMargin="-40px">
                    <div
                      tabIndex={0}
                      className={cn(
                        "flex h-full flex-col rounded-2xl border border-border border-l-[3px] bg-card p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        band.rail
                      )}
                    >
                      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8">
                        {assetGlyph(asset)}
                        {asset.criticality && <CriticalityMark tier={asset.criticality} />}
                      </svg>
                      <p className="mono-label mt-4 text-muted-foreground">{pick(TYPE_LABEL[asset.type], locale)}</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{asset.label}</p>
                      {asset.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{asset.description}</p>
                      )}
                      <span className="sr-only">{`Criticality: ${asset.criticality ?? "context"}.`}</span>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
