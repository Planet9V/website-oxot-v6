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
 * S07 · PRODUCT CAPABILITIES — source L249–L262, header recipe H-A.
 *
 * THE FIGURE IS A REUSE, AND IT PASSES THE DEPICTIVE TEST. `content.ts`'s
 * closing note (source L262) names "a seven-layer stack spanning facility
 * physics, assets, interoperation, networks, data fusion, services, and
 * governance" — which is precisely what `/images/cdt-architecture-{dark,light}`
 * draw. The figure is not decoration standing in for a photograph; it is the
 * literal subject of the sentence beneath it. Both files are real, already-
 * shipped assets, not fabrications, and this is the third section across the
 * site to make the same reuse on the same grounds (water-wastewater-3 and
 * energy-utilities-2 carry it at their equivalent sections).
 *
 * `bg-white dark:bg-black`, LITERALLY, NOT `--card`/`--background`. Each PNG
 * carries a baked-in FLAT ground — pure white in the light variant, pure black
 * in the dark — and `--card` in dark theme is a dark blue-grey, not true black.
 * A token-coloured section would leave a visible tonal seam at the image's
 * edge. This propagates inward: no wrapper inside this section may use
 * `bg-card` or `bg-muted` either, or the seam simply moves one element in.
 * The class is layered onto `SectionA` via its `className` prop, so the page's
 * own P&ID datum and heading recipe are untouched — only the ground changes.
 *
 * NOT A BENTO, NOT A CARD GRID. Pattern 3 (Asset-Class Bento) is already spent
 * on this page at S03, where its cells ARE real `SystemAsset` records. These
 * six rows are abstract descriptions of one product model — not asset
 * instances — and keeping a pattern's shape while substituting a different
 * taxonomy is the failure mode `OXOT_Component_Inventory.md` names by name.
 * Six visually-equal cards would break `OXOT_Visual_Rules.md` L13 outright.
 *
 * THE SHAPE IS A HANGING-LETTERED SCHEDULE in the wider of two columns (7 of
 * 12), with the figure subordinate in the smaller (5 of 12). The rail stays the
 * primary reading path. Deliberately not the definition-split shape S01 uses,
 * which sets its terms in a rail BESIDE their clauses rather than above them.
 *
 * LETTERS, NOT NUMERALS, AND THEY CARRY NO RANKING. This page DOES use numeral
 * ordinals — `Rule.tsx`'s `Datum` takes one per section, and S01/S02 already
 * spend `01` and `02` in the same `mono-label` treatment. Reusing numerals in
 * this rail would put two different numbering systems in one mono voice on one
 * screen. A–F reads as a set rather than a sequence, which is what these six
 * are: the source lists them as rows of a table (L255–L260) and states no order
 * of importance. Source L251's "Use a six-module layout:" is a layout directive
 * to the designer, honoured as this rail's six rows, never rendered as copy.
 *
 * THE LETTER SITS IN A REAL RAIL (`w-12`), not a decorative offset — a ~2.8em
 * hanging indent at this body size, which puts the letter outside the text
 * block rather than inside its first line.
 *
 * BALANCE: `lg:sticky lg:top-24` on the figure column, with `self-start` — that
 * is what lets sticky work at all on an otherwise-stretched grid item. `lg:`
 * and up ONLY; below `lg` the columns stack and a sticky figure would ride
 * along past unrelated content. `top-24` (96px) clears the site header
 * (`sticky top-0`, `h-16` = 64px) with room to spare. Six rows of heading-plus-
 * clause will not reach height parity with a square 1400×1400 figure by spacing
 * alone, and the sticky figure absorbs the difference.
 *
 * `note` AND `noteTwo` ARE ONE SENTENCE, split in content.ts at the em dash the
 * source itself writes (L262). They are concatenated with NO separator so the
 * dash closes onto "along with" as the source has it; setting them as two
 * paragraphs would leave a sentence hanging on a dash. The citation link closes
 * that same paragraph — L262 ends in a dangling reference marker citing "the
 * OXOT specification" without naming a document, and content.ts resolves it to
 * the real `/technical-specification` route. That page is EN-only, so the `nl`
 * locale substitutes `/cdt-2` rather than shipping a known 404.
 */

/** Not in content.ts, which carries no datum labels — taken from that file's
 *  own name for this section, "S07 · Product capabilities". */
const DATUM_LABEL = same("Product capabilities");

/** Not in content.ts either, and deliberately so: alt text describes THIS
 *  component's imagery decision, which is a rendering call. It names what the
 *  render actually shows — the seven layers L262 lists — rather than repeating
 *  the section heading, which a screen reader has already announced. */
const FIGURE_ALT = same(
  "The OXOT Cyber Digital Twin architecture: a seven-layer stack running from facility physics and assets, through interoperation, networks and data fusion, up to services and governance."
);

const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

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
      {/* The source's own header for its second cell (L253), naming what the
          prose under each entry is. Same mono caption idiom this page already
          uses above the S02 architecture sheet. */}
      <p className="mono-label text-primary-ink">{pick(CAPABILITIES.valueLabel, locale)}</p>

      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <ol className="list-none border-t border-border lg:col-span-7">
          {CAPABILITIES.items.map((item, i) => (
            <li key={item.name.en} className="flex items-baseline gap-4 border-b border-border py-5">
              {/* aria-hidden: the `<ol>` already conveys position to a screen
                  reader, and the letter is a list position, not a designation. */}
              <span aria-hidden="true" className="mono-label w-12 shrink-0 text-primary-ink">
                {LETTERS[i]}
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

        {/* The figure, in the smaller column — subordinate to the rail, which
            stays the primary reading path. `self-start` + `lg:sticky lg:top-24`
            keeps it beside the rows it depicts for the whole read. No panel
            wrapper and no filled frame: the section ground IS the image's
            ground, so any inset panel would reintroduce the seam. */}
        <div className="self-start lg:sticky lg:top-24 lg:col-span-5">
          <Image
            src="/images/cdt-architecture-dark.png"
            alt={pick(FIGURE_ALT, locale)}
            width={1400}
            height={1400}
            className="hidden w-full rounded-2xl dark:block"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <Image
            src="/images/cdt-architecture-light.png"
            alt={pick(FIGURE_ALT, locale)}
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
