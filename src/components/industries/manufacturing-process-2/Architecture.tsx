import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SectionA } from "./Rule";
import { TechnologyIndex } from "./TechnologyIndex";
import { ARCH_SECTION, STACK_CAPTION, TIERS, type Tier } from "./content.architecture";

/**
 * S02 · TYPICAL OT ENVIRONMENT — source L102–L140.
 *
 * THE STACK IS STATIC, AND THAT IS THE SOURCE'S DOING. L112 heads the block
 * "Common architecture" — one stack, for the whole sector, with no segments
 * asked for anywhere in this brief. The energy page's equivalent carries a
 * five-way selector because its brief asks for five segments; adding one here
 * would be a control that redraws the same six tiers and reports that it did
 * something. Nothing on this diagram is behind a hover or a click.
 *
 * DRAWN AS A SHEET, NOT AS SIX CARDS. The six tiers sit inside one framed panel
 * with a single continuous rail running the height of it and one tap node per
 * tier — the same P&ID grammar the page's section rule uses (`Rule.tsx`: a
 * process line with an instrument tapping it), read vertically. Six separate
 * bordered cards joined by short connector strokes is the energy page's
 * drawing, and repeating it here would make two different sectors'
 * architectures look like one component with the words changed.
 *
 * THE RAIL IS CSS, NOT SVG, on purpose. Every rule in it is a straight line
 * whose length is set by the row's own text height — six SVGs with hard-coded
 * heights would have to be re-measured every time a tier's element list rewraps
 * at a new breakpoint. The nodes are the only fixed geometry, and they are
 * round dots that need no path data. `OXOT_Component_Inventory.md` requires
 * process/system diagrams to be hand-built rather than pulled from a diagram
 * library, which this is; it does not require them to be SVG.
 *
 * ELEMENTS ARE A SCHEDULE, NOT A SENTENCE. Each tier's items are laid out as a
 * short 2-up/3-up list rather than run together with `•` separators as the
 * source's plain-text block does. Those separators exist in the source only
 * because a fenced code block has no other way to put eight terms on one line;
 * carrying them across would import a plain-text limitation into a rendered
 * page, and at 390px a run-on line of eight terms wraps into a ribbon.
 *
 * TOKEN DISCIPLINE: `--border`, `--card`, `--muted`, `--muted-foreground`,
 * `--primary-ink` only. No `--signal-*` token appears — those carry model and
 * decision state on this page, and an architecture tier is neither.
 *
 * MOBILE (OXOT_Mobile_Rules.md): one column throughout, DOM order is reading
 * order, `min-w-0` on every grid child so a long term such as "PLC ladder logic
 * and structured text" wraps instead of widening the page at 390px.
 */

/** One tier: a tap node on the shared rail, its name, and its element list. */
function TierRow({
  tier,
  first,
  last,
  locale
}: {
  tier: Tier;
  first: boolean;
  last: boolean;
  locale: Locale;
}) {
  return (
    <li className="grid grid-cols-[0.625rem_minmax(0,1fr)] gap-x-5 sm:gap-x-6">
      {/* The rail column. The rule is clipped at the first and last nodes so the
          run starts and stops at a tap rather than trailing into the frame. */}
      <div className="relative flex justify-center" aria-hidden="true">
        <span
          className={cn(
            "absolute w-px bg-border",
            first && "bottom-0 top-2",
            last && "top-0 h-2",
            !first && !last && "inset-y-0"
          )}
        />
        {/* mt-[3px] centres a 10px dot on the first line of an 11px mono label. */}
        <span className="relative mt-[3px] block size-2.5 rounded-full border-2 border-border bg-card" />
      </div>

      <div className={cn("min-w-0", !last && "pb-9")}>
        <p className="mono-label text-primary-ink">{pick(tier.name, locale)}</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
          {tier.elements.map((element) => (
            <li
              key={element}
              className="min-w-0 body-copy leading-snug text-muted-foreground"
            >
              {element}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Architecture({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <SectionA
      id={ARCH_SECTION.id}
      index={ARCH_SECTION.index}
      datumLabel={ARCH_SECTION.datumLabel}
      heading={ARCH_SECTION.heading}
      lead={ARCH_SECTION.lead}
      locale={locale}
      className={className}
    >
      <figure className="m-0 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <figcaption className="mono-label text-primary-ink">
          {pick(STACK_CAPTION, locale)}
        </figcaption>
        <ul className="mt-7">
          {TIERS.map((tier, i) => (
            <TierRow
              key={tier.id}
              tier={tier}
              first={i === 0}
              last={i === TIERS.length - 1}
              locale={locale}
            />
          ))}
        </ul>
      </figure>

      <TechnologyIndex locale={locale} />
    </SectionA>
  );
}
