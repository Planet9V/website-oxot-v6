import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { CAPABILITIES } from "./content";

/**
 * S07 · PRODUCT CAPABILITIES — source L246–L258, header recipe H-A.
 *
 * TWO-COLUMN LAYOUT, ADDED 2026-08-26 (owner instruction). The rail of seven
 * capabilities sits beside the CDT's own 7-layer architecture figure — same
 * technique as `water-wastewater-3/Capabilities.tsx`, which this file's layout
 * is directly modelled on (structure and sizing only; none of its water-sector
 * content). See `content.ts`'s `CAPABILITIES` docblock for why this reuses an
 * EXISTING, already-shipped image rather than a new fabrication: the prior
 * "no imagery" call was scoped to energy-sector EQUIPMENT specifically, never
 * to OXOT's own product architecture.
 *
 * `bg-white dark:bg-black`, NOT the site's `--card`/`--background` tokens. The
 * two CDT-architecture PNGs each carry a baked-in FLAT background — pure white
 * in the light variant, pure black in the dark — and `--card` in dark theme is
 * `hsl(220 15% 6%)`, a dark blue-grey, not true black. A token-coloured section
 * would leave a visible tonal seam at the image's edge, so the section is
 * LITERALLY pure black/white instead, matching the image's own ground exactly.
 * This is layered ON TOP of `SectionA`'s own datum/heading recipe via its
 * `className` prop — the single-line-diagram datum stays this page's own idiom,
 * only the section's background changes.
 *
 * STILL NOT A BENTO, NOT A CARD GRID. Pattern 3 (Asset-Class Bento) is already
 * spent on this page at S03, where its cells ARE real `SystemAsset` records.
 * These seven rows are abstract descriptions of one product model — not
 * `SystemAsset` instances — and keeping the pattern's shape while substituting a
 * different taxonomy is the failure mode `OXOT_Component_Inventory.md` names by
 * name. Seven visually-equal cards would break `OXOT_Visual_Rules.md` L13
 * outright as well.
 *
 * THE SHAPE IS STILL A HANGING-LETTERED SCHEDULE, now in the wider of two
 * columns (7 of 12) rather than the page's full width — the figure occupies the
 * smaller column (5 of 12) and stays subordinate to the rail, which is still the
 * primary reading path. Deliberately not either of the two definition-split
 * shapes it would otherwise collide with:
 *   · S01 on this page sets its terms in a rail BESIDE their clauses.
 *   · water-wastewater-2's own S07 sets name in a 4-col beside prose in an
 *     8-col.
 *
 * LETTERS, NOT NUMERALS, and they carry no ranking. S01 already spends mono
 * `01`–`09` numerals on this page; reusing numerals here is exactly the marker
 * duplication water-wastewater-2's S07 had to strip out. A–G reads as a set
 * rather than a sequence, which is what these seven are: the source lists them
 * as rows of a table (L250–256) and states no order of importance.
 *
 * THE MARGIN FIGURE SITS IN A REAL RAIL (`w-12`), not a decorative offset. That
 * is a ~2.8em hanging indent at this body size, which is what puts the figure
 * outside the text block instead of inside its first line.
 *
 * BALANCE, HANDLED THE SAME WAY water-wastewater-3 HANDLES IT: `lg:sticky
 * lg:top-24` on the image column (`self-start` is what lets sticky work at all
 * on a stretched grid item), `lg:` and up only — below `lg` the two columns
 * stack and a sticky figure would ride along past unrelated content. `top-24`
 * (96px) clears the site header (`sticky top-0`, `h-16` = 64px) with 32px of
 * breathing room. Seven rows of heading-plus-clause will not reach exact height
 * parity with a square 1400×1400 figure by spacing alone — the sticky figure
 * absorbs the remaining difference, same reasoning as the water-3 precedent.
 *
 * `note` AND `noteTwo` ARE ONE SENTENCE, split in content.ts at the em dash the
 * source itself writes (L258). They are concatenated with no separator so the
 * dash closes onto "and supports" as the source has it — setting them as two
 * paragraphs would leave a sentence hanging on a dash. The citation link then
 * closes that paragraph, the same way S02's does.
 */

/** Not in content.ts, which carries no datum labels — taken from that file's own
 *  name for this section, "S07 · Product capabilities". */
const DATUM_LABEL = same("Product capabilities");

const FIGURES = ["A", "B", "C", "D", "E", "F", "G"] as const;

export function Capabilities({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <SectionA
      id="product-capabilities"
      index="07"
      datumLabel={DATUM_LABEL}
      heading={CAPABILITIES.h2}
      locale={locale}
      className={cn("bg-white dark:bg-black", className)}
    >
      {/* The source's own header for its second cell (L248), naming what the
          prose under each entry is. Same mono caption idiom this page already
          uses above the S02 technology table. */}
      <p className="mono-label text-primary-ink">{pick(CAPABILITIES.valueLabel, locale)}</p>

      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <ol className="list-none border-t border-border lg:col-span-7">
          {CAPABILITIES.items.map((item, i) => (
            <li key={item.name.en} className="flex items-baseline gap-4 border-b border-border py-5">
              {/* aria-hidden: the `<ol>` already conveys position to a screen
                  reader, and the letter is a list position, not a designation. */}
              <span aria-hidden="true" className="mono-label w-12 shrink-0 text-primary-ink">
                {FIGURES[i]}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="body-lead font-semibold leading-snug text-foreground">
                  {pick(item.name, locale)}
                </h3>
                <p className="prose-measure mt-1.5 body-lead leading-relaxed text-muted-foreground">
                  {pick(item.body, locale)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* The figure, in the smaller column — see the docblock for the
            imagery-reversal reasoning and why it stays subordinate to the
            rail. `self-start` + `lg:sticky lg:top-24` keeps it beside the rows
            it explains for the whole read, `lg:` and up only. */}
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

      <p className="mt-8 body-lead leading-relaxed text-muted-foreground">
        {pick(CAPABILITIES.note, locale)}
        {pick(CAPABILITIES.noteTwo, locale)}{" "}
        <Link
          href={localePath(
            locale,
            /* `/technical-specification` renders EN only, so an `nl` link is a
               real 404. Same substitution the rest of the site uses. */
            locale === "en" ? CAPABILITIES.citation.href : PATHS.cdt2
          )}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(CAPABILITIES.citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}
