import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { SectionA } from "./Rule";
import {
  CAPABILITIES,
  CAPABILITIES_CLOSE,
  CAPABILITIES_SECTION,
  FIGURE_ALT
} from "./content.capabilities";

/**
 * S11 · PRODUCT CAPABILITIES — the H-A recipe over a nine-row index rail with
 * the CDT's own layered-architecture render held beside it.
 *
 * THE ONLY IMAGE ON THIS PAGE, AND IT IS EARNED BY THE ROW CONTENT RATHER THAN
 * BY THE SECTION FEELING PLAIN. Seven of the nine rows literally name a MODEL —
 * electrical-system and power-path, mechanical and thermal, BMS/EPMS/DCIM
 * control, network and access-path, capacity and consequence, external
 * dependency, supply-chain and provenance — and the two remaining rows name what
 * that model is exercised for, simulation and evidence. The headline above them
 * (source L436) says the same thing in one line: "One model from facility
 * control to tenant-impact decision." The render beside the rail is that model's
 * own seven-layer architecture, and it names on its face several of the exact
 * things the rows describe: network topology (row four), facility physics (rows
 * one and two), threat intelligence entering the stack (row six), full-stack
 * simulation (row eight) and a unified bill of materials (row seven). It depicts
 * the rows; it does not decorate them. `DependencyMap.tsx` records the opposite
 * call on this same page — no imagery there, because every available asset shows
 * the inside of a facility and that section's whole claim is that the risk is
 * outside it.
 *
 * SHIPPED ASSET, NOT A GENERATED ONE. `/images/cdt-architecture-light.png` and
 * `/images/cdt-architecture-dark.png` already exist in `public/images/` and
 * already ship on `water-wastewater-3`. Nothing was generated for this section.
 *
 * TWO REAL PNGs, NOT ONE RECOLOURED — this site's `ThemeToggle` convention: both
 * variants land in the server HTML and CSS picks one (`dark:hidden` /
 * `hidden dark:block`), keyed off `[data-theme]` on `<html>`, never
 * `prefers-color-scheme`. The theme here is a cookie, not the OS preference.
 *
 * LITERAL WHITE / LITERAL BLACK ON THE FIGURE PLATE, AND IT IS LOAD-BEARING.
 * Neither render is cropped with transparency: each carries its own baked-in
 * flat ground, pure white in the light variant and pure black in the dark. This
 * site's `--background` is `24 10% 98%` in light — a warm off-white, not pure
 * white — and `220 15% 6%` in dark, a very dark blue-grey, not true black. Drop
 * either image straight onto the page ground and its own flat field terminates
 * against a near-miss tone, which reads as a faint rectangular seam rather than
 * as a figure. So the plate holding it is stated in literal colours,
 * `bg-white dark:bg-black`, and carries real padding: the padding is the same
 * colour as the image's own margin, so the two grounds fuse and the only visible
 * edge is the plate's deliberate rounded border.
 *
 * THE PLATE IS THE ONLY THING PAINTED PURE, NOT THE WHOLE SECTION.
 * `water-wastewater-3/Capabilities.tsx` paints its entire section
 * `bg-white dark:bg-black` because that page's sections carry their own full
 * grounds. This page does not work that way — `Rule.tsx`'s `SectionShell`
 * renders a plain `<section>` with no ground of its own, so every section here
 * sits on the page background, and painting this one pure white would put an
 * unexplained bright band across the middle of the page.
 *
 * NO `bg-card` ANYWHERE INSIDE THE PLATE, deliberately, and it is the same
 * reason one level down: `--card` is `220 15% 8%` in dark, a near-black panel
 * directly behind a pure-black image — exactly the seam the literal ground
 * exists to eliminate. `border-border` is fine; a border is an edge, not a
 * field.
 *
 * A HANGING INDEX RAIL, NOT NINE CARDS. `OXOT_Visual_Rules.md` bars a rack of
 * equal cards outright, and here the content bars it too: the headline claims
 * ONE model, and nine separate tiles would argue the opposite of the sentence
 * directly above them. The number sits in the margin and the capability name and
 * its clause share one text column, so each row reads as a continuous line of
 * thought rather than as two table cells.
 *
 * ROW DENSITY IS SET AGAINST THE FIGURE, not copied from the water page. That
 * rail is seven rows under `h-card` (1.25rem/700) at `py-4`; this one is nine
 * rows, so the same treatment would run materially taller beside the same square
 * render. Two changes, both reasoned rather than shaved: the row heading takes
 * `h-micro` (1rem/700) because at nine items this is a row LABEL, not a card
 * title — the same role `TechnologyIndex.tsx` gives its own densest labelled
 * control on this page — and `py-3.5` replaces `py-4`. The gap between a
 * capability's name and its clause stays at `mt-1.5`: the water page already
 * reasoned that value to a conclusion (8px made the pair look less related than
 * it is, 6px keeps them legibly separate while reading as one thought) and
 * nothing here contradicts it.
 *
 * THE RESIDUAL HEIGHT DIFFERENCE IS CONTENT, AND STICKY IS THE ANSWER TO IT.
 * Nine transcribed table rows against one square render cannot be brought to
 * parity by spacing — closing the rest of the gap would mean compressing real
 * multi-line descriptions below a readable leading, or dropping transcribed
 * source content. So the figure travels instead: `lg:sticky lg:top-24` holds it
 * beside the rows it explains for the whole read, rather than scrolling off
 * above a column of rail the reader is still working down.
 *
 * `self-start` IS WHAT MAKES STICKY WORK AT ALL, and it is not decoration. The
 * grid row is `items-stretch` by default, so a stretched grid item fills its
 * row's full height and has no free space to travel within — it would never
 * visually stick. Both classes are `lg:`-gated: below `lg` the two columns
 * stack, and a sticky figure would then pin itself to the viewport and ride past
 * content it has nothing to do with.
 *
 * `top-24` (96px) IS MEASURED, NOT GUESSED. `site-header.tsx` is `sticky top-0`
 * with an `h-16` bar — 64px, per that file's own comment citing design system
 * §7 — so 96px clears the header with 32px of breathing room instead of butting
 * the figure against its underside.
 *
 * NO `data-balance-group` ON THIS SECTION, and the reason is that the check does
 * not describe this shape. `scripts/measure.mjs` takes BOTH a height ratio and a
 * COUNT of content elements across a group's marked siblings, and the WORSE
 * governs. The rail contains nine headings and nine clauses; the plate contains
 * one image and no text at all. On the count axis that is a guaranteed failure
 * however the heights land — and the only way to "pass" would be to invent text
 * beside the figure to satisfy a check written for a different defect: one pane
 * of a two-pane split sitting nearly EMPTY beside a full one. This plate is not
 * nearly empty; it is a single indivisible figure, which is what it is supposed
 * to be. Same reasoning `DependencyMap.tsx` records on this page for its own
 * unmarked run.
 *
 * NO `data-gfx-meaning` EITHER. That mark exists so the harness can contrast-
 * check a figure's `rect`/`circle`/`path` fills in both themes. These are raster
 * PNGs with no shapes to inspect, so marking them would add a figure to the
 * count and check nothing inside it. The two-variant swap above is what makes
 * this figure legible in both themes.
 *
 * TOKEN DISCIPLINE: `--border`, `--foreground`, `--muted-foreground` and
 * `--primary-ink`, plus the two literal grounds explained above. No `--signal-*`
 * token appears here — the six signals carry model and decision state on this
 * page, and a product-capability rail is neither.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  const { citation } = CAPABILITIES_CLOSE;
  /* The flag is READ, not assumed: `/technical-specification` renders EN only
     today, so an `nl` link is a real 404. Clearing the flag in `content.ts` the
     day that page renders Dutch retires this gate without either file changing. */
  const citationHref =
    citation.englishOnly && locale !== "en" ? citation.fallbackHref : citation.href;

  return (
    <SectionA
      id={CAPABILITIES_SECTION.id}
      index={CAPABILITIES_SECTION.index}
      datumLabel={CAPABILITIES_SECTION.datumLabel}
      heading={CAPABILITIES_SECTION.heading}
      locale={locale}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <ol className="border-t border-border lg:col-span-7">
          {CAPABILITIES.map((capability, i) => (
            <li
              key={capability.name.en}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-border py-3.5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-4"
            >
              {/* `aria-hidden`: the number is the reader's visual anchor down the
                  rail, but an <ol> already announces position to a screen
                  reader, so reading it aloud would say "nine" twice. */}
              <span aria-hidden className="mono-label pt-0.5 text-primary-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="h-micro text-balance text-foreground">
                  {pick(capability.name, locale)}
                </h3>
                <p className="mt-1.5 text-pretty body-copy leading-relaxed text-muted-foreground">
                  {pick(capability.value, locale)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* The figure plate. See the docblock for why the ground is stated in
            literal colours, why `self-start` is what makes `lg:sticky` work, and
            why `top-24` is 96px. */}
        <div className="self-start rounded-2xl border border-border bg-white p-3 dark:bg-black sm:p-4 lg:sticky lg:top-24 lg:col-span-5">
          <Image
            src="/images/cdt-architecture-dark.png"
            alt={pick(FIGURE_ALT, locale)}
            width={1400}
            height={1400}
            className="hidden w-full dark:block"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <Image
            src="/images/cdt-architecture-light.png"
            alt={pick(FIGURE_ALT, locale)}
            width={1400}
            height={1400}
            className="w-full dark:hidden"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </div>
      </div>

      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(CAPABILITIES_CLOSE.text, locale)}{" "}
        <Link
          href={localePath(locale, citationHref)}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}
