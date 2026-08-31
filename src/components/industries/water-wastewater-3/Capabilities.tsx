import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CAPABILITIES } from "./content";
import { CAPABILITIES_CLOSE, CAPABILITY_ITEMS } from "./content.capabilities";

/**
 * S08 · PRODUCT CAPABILITIES. A numbered index rail of seven capabilities
 * beside the CDT's own 7-layer architecture figure.
 *
 * THE FIGURE IS AN EXPLICIT OWNER REVERSAL, 2026-08-25, of this section's own
 * prior rule ("no diagram, no chart" — `OXOT_Composition_Rules.md`,
 * "component variety"). That rule is not wrong in general — it is why the
 * seven capabilities are still a rail, not seven cards, and why this stays the
 * page's only capabilities-with-figure section. The reversal is narrow: this
 * ONE figure, this ONE section, on explicit instruction, not a licence to add
 * diagrams wherever a section feels plain. The seven-row rail is still the
 * primary reading path; the figure supports it, occupying the smaller of the
 * two columns (5 of 12) rather than competing with it for focus.
 *
 * TWO REAL PNGs, NOT ONE RECOLOURED, same convention as `ThemeToggle`'s own
 * "both in server HTML, CSS picks one" pattern (`dark:hidden` /
 * `hidden dark:block`, keyed off `[data-theme]` on `<html>`, never
 * `prefers-color-scheme` — this site's theme is a cookie, not the OS
 * preference). Source: `new_material_source/1_website_layout_v4/images/`
 * `1_CDT_Arch_Dark.png` / `1_CDT_Arch_light.png`, both originally 2048×2048
 * with several hundred px of flat padding on every side. Trimmed to content
 * and downsized to 1400×1400 (dark: 4.94MB→1.73MB, light: 4.18MB→1.47MB)
 * before being copied into `public/images/` — the untrimmed originals would
 * have rendered as a small diagram floating in a large dead margin at any
 * realistic display size.
 *
 * NOT PATTERN 3, THE ASSET-CLASS BENTO, AND THE REASON IS THE CONTENT. The
 * bento's cells ARE the nine `SystemAssetType` values — that binding is what
 * makes it a taxonomy rather than a grid. These are seven abstract product
 * functions, and `OXOT_Component_Inventory.md` names this exact substitution as
 * a failure: "a list of abstract product capabilities is not a SystemAsset[]".
 * The bento is used once on this page, at S03, where the content genuinely is
 * the nine types.
 *
 * HANGING INDEX RAIL, not a card grid: seven equal cards are barred outright
 * by `OXOT_Visual_Rules.md`, and the brief's own headline claims one model
 * ("One model spanning source, treatment, field assets, and recovery"), which
 * a rack of seven separate tiles would contradict. The number sits in the
 * margin and the heading and its clause share a single text column, so the
 * capability name and the value it delivers read as one continuous line of
 * thought rather than as two table cells.
 *
 * NO SECOND SENTENCE PER ROW. The brief's table already carries a value column;
 * everything rendered here is transcribed from it. See content.capabilities.ts.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  return (
    <section
      className="oxot-canvas bg-white pt-16 dark:bg-black sm:pt-24"
      id="capabilities"
    >
      {/* `.oxot-canvas` not `mx-auto w-full max-w-5xl px-6` (fixed 2026-08-25,
          systemic audit) — see TechnologyIndex.tsx's docblock. */}
      {/* `bg-white dark:bg-black` — NOT the site's `--background`/`--card`
          tokens, and not decoration. The two CDT-architecture PNGs below are
          not cropped with transparency: each carries its own baked-in FLAT
          background, pure white in the light variant and pure black in the
          dark. `--card` in dark theme is `hsl(220 15% 6%)` — a very dark
          blue-grey, not true black — so a token-coloured section leaves a
          faint tonal seam at the image's edge. The section must therefore be
          LITERALLY pure black / pure white, so the image's own ground and the
          section's ground are the same colour. Light mode's `--card` happens
          to be pure white today, but that is a coincidence a future token
          change would silently break, so light mode is stated explicitly here
          too rather than left to chance.

          RULE FOR FUTURE REUSE: anytime this CDT-architecture figure is used,
          the section it sits in carries this same `bg-white dark:bg-black`
          treatment. This component is not yet extracted into a shared
          cross-page component; if the figure pattern ever is, the rule
          travels with it — every consuming section must apply it. */}
      <p className="mono-label">08 · {pick(CAPABILITIES.datum, locale)}</p>
      <h2 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
        {pick(CAPABILITIES.h2, locale)}
      </h2>

      {/* THE BORDERED PANEL, added 2026-08-26 on owner instruction: this page
          carries three tables, and the other two — `TechnologyIndex.tsx` and
          `SectorReality.tsx` — are each already enclosed in
          `rounded-2xl border border-signal-amber/60 p-5 sm:p-7`. A reader
          scrolling the page saw two framed tables and one unframed one, which
          reads as an omission rather than as variety. The frame goes on this
          existing grid element rather than on a new wrapper, matching
          TechnologyIndex.tsx, which likewise carries the panel classes on the
          same div as its own top margin.

          NO `bg-card`, AND THAT IS THE ONE DELIBERATE DIFFERENCE from the other
          two panels. The section's ground is literally `bg-white dark:bg-black`
          for the reason set out immediately above: the CDT PNGs carry their own
          baked-in flat white/black ground, and `--card` in dark theme is
          `hsl(220 15% 6%)`, not true black. Painting `bg-card` on this inner
          wrapper would put a near-black panel directly behind a pure-black
          image and reintroduce exactly the tonal seam the section background
          was changed to eliminate. The frame is a border only; the section's
          own pure ground shows through it. */}
      <div className="mt-10 grid gap-8 rounded-2xl border border-signal-amber/60 p-5 sm:p-7 lg:grid-cols-12 lg:gap-10">
        <ol className="border-t border-border lg:col-span-7">
          {CAPABILITY_ITEMS.map((item, i) => {
            const name = pick(item.name, locale);
            /* ROW DENSITY, tightened 2026-08-26 on owner instruction ("too
               larger and overlong", "remove the horizontal spacing to make the
               table list tighter"). The arithmetic behind the complaint: the
               figure beside this rail is square (1400×1400) and occupies 5 of
               12 columns of a ~1216px canvas, so it renders roughly 480–520px
               tall, while seven rows of heading-plus-two-line-clause at the
               previous `py-6` ran close to 1000px — near double. `py-6` →
               `py-4` (24px → 16px each side, 112px off the rail across seven
               rows) and `gap-x-4`/`sm:gap-x-6` → `gap-x-3`/`sm:gap-x-4` pull
               the index number in against its text so the pair reads as one
               unit rather than as two separated table cells.

               NOT TIGHTENED FURTHER, deliberately. Full height parity with the
               figure is not reachable by spacing alone — it would take
               compressing real two-line descriptions below a readable leading,
               and this is prose a person reads down, not a dense data table.
               The remaining height difference is absorbed by the sticky figure
               below instead. */
            return (
              <li
                key={name}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-border py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-4"
              >
                {/* `aria-hidden`: the index is the reader's visual anchor down
                    the rail, but an <ol> already announces position to a
                    screen reader, so reading it aloud would say "seven"
                    twice. */}
                <span aria-hidden className="mono-label pt-1 text-primary-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* No `prose-measure` (removed 2026-08-25, systemic audit):
                    this page has no genuine narrower-column context to
                    justify a reading-width cap — a capped text block just
                    leaves dead space beside it. */}
                <div>
                  <h3 className="h-card text-balance text-foreground">{name}</h3>
                  {/* `mt-1.5`, not `mt-2` (same 2026-08-26 tightening): with
                      the row's own vertical padding cut to `py-4`, an 8px gap
                      between a capability's name and its clause was the widest
                      space inside the row, which made the two look less
                      related than they are. 6px keeps them legibly separate
                      while reading as one thought. */}
                  <p className="mt-1.5 text-pretty body-copy leading-relaxed text-muted-foreground">
                    {pick(item.value, locale)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* The figure, in the smaller column — see the docblock for the
            reversal this represents and why it stays subordinate to the
            rail. `self-start` keeps it pinned to the top rather than
            centred against a much taller rail on most viewports.

            STICKY, added 2026-08-26: even after the row tightening above, the
            rail stays materially taller than this square figure, so a reader
            partway down the seven capabilities had the architecture diagram
            already scrolled off while the rail it illustrates was still going
            — the figure sat orphaned above a column of whitespace. `lg:sticky`
            holds it beside the rows it explains for the whole read.

            `lg:` AND UP ONLY, on both classes, and that is load-bearing.
            Below `lg` the two columns stack, so a sticky figure would pin
            itself to the viewport and ride along past content it has nothing
            to do with. `self-start` is what makes sticky work at all here: a
            grid item stretched to its row's full height has no free space to
            travel within, so it never sticks.

            `top-24` (96px) is measured, not guessed. `site-header.tsx` is
            `sticky top-0` and its bar is `h-16` — 64px, per that file's own
            comment citing design system §7 — so 96px clears the header with
            32px of breathing room rather than butting the figure against its
            underside. */}
        <div className="self-start lg:sticky lg:top-24 lg:col-span-5">
          <Image
            src="/images/cdt-architecture-dark.png"
            alt={pick(CAPABILITIES.figureAlt, locale)}
            width={1400}
            height={1400}
            className="hidden w-full rounded-2xl dark:block"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <Image
            src="/images/cdt-architecture-light.png"
            alt={pick(CAPABILITIES.figureAlt, locale)}
            width={1400}
            height={1400}
            className="w-full rounded-2xl dark:hidden"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </div>
      </div>

      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(CAPABILITIES_CLOSE, locale)}
      </p>
    </section>
  );
}
