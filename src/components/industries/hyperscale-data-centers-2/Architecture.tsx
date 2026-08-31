"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import { SectionA } from "./Rule";
import {
  ABOVE_LABEL,
  ARCH_SECTION,
  BELOW_LABEL,
  BOTTOM_OF_RUN,
  LAYER_NOTE,
  LAYER_SELECTOR_LABEL,
  PASSIVE_FIRST,
  SELECTED_LAYER_CAPTION,
  STACK_CAPTION,
  TIERS,
  TOP_OF_RUN,
  type Tier
} from "./content.architecture";

/**
 * S03 · TYPICAL HYPERSCALE ARCHITECTURE — source L138–L191, header recipe H-A.
 *
 * THE LAYERS ARE THE CONTROL, WHICH IS WHY THERE IS NO SEPARATE SELECTOR STRIP.
 * L144 asks for "a large interactive architecture graphic with selectable
 * layers" — the layers themselves are what is selectable, so each layer's header
 * IS its radio and the graphic is the control. The rail page puts its selector
 * in a left column because there the control chooses between two whole
 * architectures and belongs beside the canvas rather than inside it; here the
 * control lives on the drawing. A sidebar listing the same seven names a second
 * time would be a duplicate of the thing it points at.
 *
 * NOTHING IS HIDDEN BEHIND THE SELECTION. Every layer renders its full element
 * list at all times; what the selection changes is the marked layer, the two
 * joins touching it, and the live-region line stating where in the run it sits.
 * `content.architecture.ts` sets out why: the source supplies a name and an
 * element list per layer and nothing else, so a control that collapsed six
 * layers to expand a seventh would take material away from the reader, and a
 * control that swapped in per-layer prose would have to invent that prose.
 * Emphasis is the only behaviour this source actually pays for.
 *
 * THE ACCENT ON THE JOINS IS THE PAGE'S OWN IDIOM, READ VERTICALLY. `Rule.tsx`
 * gives this page a two-run pair with one accented cross-tie, because a shared
 * element bridging otherwise separate paths is what the whole brief argues
 * about. Marking the joins either side of the selected layer says the same thing
 * on the stack: the selected layer is what stands between the run above it and
 * the run below it. Marking the layer's own frame alone would say only "this one
 * is highlighted".
 *
 * ABOVE / BELOW IS POSITIONAL, NOT CAUSAL. The live-region line names the
 * neighbouring layers in the DRAWING. The source draws the seven tiers joined
 * top to bottom and frames the section as running "from utility interconnect to
 * workload consequence" (L142), so the ordering is the source's; a claim that a
 * layer depends on, feeds, or fails with its neighbour is not, and none is made.
 * No Purdue level number is printed against any layer either — the source
 * assigns none.
 *
 * A ROVING TABINDEX, NOT SEVEN TAB STOPS. Only the checked layer is in the tab
 * sequence; Arrow / Home / End move the selection and DOM focus together. Both
 * axes are bound because the group is drawn vertically but reads as a single
 * ordered set — `aria-orientation="vertical"` states which axis is primary.
 *
 * THE SUMMARY LINE IS A LIVE REGION, not decoration: arrow keys change the
 * marked layer and the marked joins while focus stays inside the group, so
 * without `aria-live` a screen-reader user would move through the stack and hear
 * nothing about where they had landed in it.
 *
 * MOBILE RULES (OXOT_Mobile_Rules.md), binding. One column throughout and DOM
 * order is reading order — caption, note, stack, summary — with no
 * order-swapping utilities anywhere. Every layer header is `min-h-11`, a 44px
 * touch target reachable in a single tap. The selected state is carried by a
 * filled marker and a weight change as well as by colour, so it survives a
 * greyscale read. `min-w-0` on the element lists so a long term such as
 * "transmission/distribution operator" wraps instead of widening the page.
 *
 * TOKEN DISCIPLINE: `--border`, `--card`, `--muted`, `--muted-foreground`,
 * `--primary`, `--primary-ink` and `--ring` only. No `--signal-*` token appears
 * — the six signals carry model and decision state on this page, and an
 * architecture layer is neither.
 */

/** One line of a layer, laid out as a schedule rather than a run-on sentence.
 *  The source separates these with bullets only because a fenced code block has
 *  no other way to put eight terms on one line; at 390px a run-on line of eight
 *  terms wraps into a ribbon. The line GROUPING is preserved — one `TierRow` per
 *  source line — which is the part that carries meaning. */
function TierRow({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item} className="min-w-0 body-copy leading-snug text-muted-foreground">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The source's own vertical run between two layers. Accented when it touches
 *  the selected layer — see the cross-tie note in this file's head comment. */
function TierJoin({ marked }: { marked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mx-auto block h-5 w-px transition-colors duration-200",
        marked ? "bg-primary-ink" : "bg-border"
      )}
    />
  );
}

function TierCard({
  tier,
  selected,
  locale,
  buttonRef,
  onSelect,
  onKeyDown
}: {
  tier: Tier;
  selected: boolean;
  locale: Locale;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const elementsId = `${ARCH_SECTION.id}-${tier.id}-elements`;
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors duration-200",
        selected ? "border-primary/60 bg-primary/[0.05]" : "border-border bg-card"
      )}
    >
      <button
        ref={buttonRef}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-describedby={elementsId}
        tabIndex={selected ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        className={cn(
          "flex min-h-11 w-full items-center gap-2.5 rounded-t-xl px-5 pt-3.5 text-left",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )}
      >
        {/* Not colour alone: a filled disc on the selected layer, a hollow ring
            on the other six. Readable in greyscale. */}
        <span
          aria-hidden="true"
          className={cn(
            "size-2 shrink-0 rounded-full border transition-colors duration-200",
            selected ? "border-primary bg-primary" : "border-current bg-transparent"
          )}
        />
        <span
          className={cn(
            "mono-label",
            selected ? "font-semibold text-primary-ink" : "text-muted-foreground"
          )}
        >
          {pick(tier.name, locale)}
        </span>
      </button>

      <div id={elementsId} className="min-w-0 px-5 pb-4 pl-[2.625rem]">
        {tier.rows.map((row, i) => (
          <TierRow key={i} items={row} />
        ))}
      </div>
    </div>
  );
}

export function Architecture({ locale, className }: { locale: Locale; className?: string }) {
  /* The source names no default layer, so the selection opens at the top of the
     run — which is where L142's own framing starts, "from utility interconnect".
     Any other opening layer would be an unstated preference. */
  const [selectedId, setSelectedId] = useState(TIERS[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  /* Selection is held and compared by `Tier.id`, never by array position, so
     reordering the drawing cannot silently mark a different layer. */
  const selectedIndex = Math.max(
    0,
    TIERS.findIndex((tier) => tier.id === selectedId)
  );
  const selected = TIERS[selectedIndex];
  const above = TIERS[selectedIndex - 1];
  const below = TIERS[selectedIndex + 1];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % TIERS.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + TIERS.length) % TIERS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TIERS.length - 1;
    else return;
    event.preventDefault();
    setSelectedId(TIERS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <SectionA
      id={ARCH_SECTION.id}
      index={ARCH_SECTION.index}
      datumLabel={ARCH_SECTION.datumLabel}
      heading={ARCH_SECTION.heading}
      locale={locale}
      className={className}
    >
      <figure className="m-0 rounded-2xl border border-border bg-muted/40 p-5 sm:p-8">
        <figcaption className="mono-label text-primary-ink">
          {pick(STACK_CAPTION, locale)}
        </figcaption>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {pick(LAYER_NOTE, locale)}
        </p>

        <div
          role="radiogroup"
          aria-orientation="vertical"
          aria-label={pick(LAYER_SELECTOR_LABEL, locale)}
          className="mt-7 flex flex-col"
        >
          {TIERS.map((tier, i) => (
            <div key={tier.id}>
              {i > 0 && <TierJoin marked={i === selectedIndex || i - 1 === selectedIndex} />}
              <TierCard
                tier={tier}
                selected={tier.id === selectedId}
                locale={locale}
                buttonRef={(el) => {
                  refs.current[i] = el;
                }}
                onSelect={() => setSelectedId(tier.id)}
                onKeyDown={(event) => handleKeyDown(event, i)}
              />
            </div>
          ))}
        </div>

        <p aria-live="polite" className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {pick(SELECTED_LAYER_CAPTION, locale)}{" "}
          <span className="font-medium text-foreground">{pick(selected.name, locale)}</span>.{" "}
          {above
            ? `${pick(ABOVE_LABEL, locale)} ${pick(above.name, locale)}.`
            : pick(TOP_OF_RUN, locale)}{" "}
          {below
            ? `${pick(BELOW_LABEL, locale)} ${pick(below.name, locale)}.`
            : pick(BOTTOM_OF_RUN, locale)}
        </p>
      </figure>

      <p className="mt-8 body-lead leading-relaxed text-muted-foreground">
        {pick(PASSIVE_FIRST.fusion, locale)} {pick(PASSIVE_FIRST.deployment, locale)}{" "}
        <Link
          href={localePath(
            locale,
            /* `/technical-specification` renders EN only, so an `nl` link is a
               real 404. Same substitution the rest of the site uses. */
            locale === "en" ? PASSIVE_FIRST.citation.href : PATHS.cdt2
          )}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(PASSIVE_FIRST.citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}
