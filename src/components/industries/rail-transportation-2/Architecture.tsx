"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SectionA } from "./Rule";
import { SegmentSelector } from "./SegmentSelector";
import { DEFAULT_SEGMENT, SEGMENTS } from "./content";
import {
  ARCH_SECTION,
  PARALLEL_NOTE,
  SELECTOR_LABEL,
  STACK_BY_SEGMENT,
  STACK_SUMMARY_CAPTION,
  type Tier
} from "./content.architecture";

/**
 * S03 · TYPICAL OT ARCHITECTURE, SEGMENT-SELECTED — source L113–136 and
 * L171–194 of industry_rail-transportation.md.
 *
 * THE SELECTOR HERE IS LOAD-BEARING, WHICH IS NOT TRUE OF EVERY SUCH CONTROL ON
 * THIS SITE. The energy page's architecture selector offers five segments over a
 * brief that supplies one stack, so four of its five tiers are drawn once and
 * flagged inert. This brief supplies TWO COMPLETE STACKS — six tiers each, with
 * different tier names AND different contents at every level — so every part of
 * the canvas below is downstream of the selection. Nothing is animated to look
 * like it changed; the whole stack is a different stack.
 *
 * ONE CANVAS, NOT TWO STACKS SIDE BY SIDE. The brief's own instruction at L169
 * is that freight must be "a dedicated subpage or major tab, not a paragraph
 * under passenger rail" — a tab, not a column. Printing both at once would also
 * invite the reader to compare tier 3 against tier 3, an alignment the source
 * does not state (see content.architecture.ts's head comment); the segment
 * control makes the reader hold one architecture at a time, which is how the
 * source presents them.
 *
 * SEGMENT STATE IS LOCAL AND INDEPENDENT OF THE HERO'S. `content.ts` L181–187
 * flags shared-vs-independent as an open question and leaves the decision to the
 * consumer; `SegmentSelector` deliberately holds no state so either answer is
 * available. The resolved decision for this page is independent per call site,
 * so this section owns its own `useState` and a visitor's hero choice does not
 * silently pre-set the architecture they are shown here.
 *
 * THE TWO STACKS ARE ONE LOOKUP APART, keyed by `SEGMENTS[n].id` and never by
 * array position, so reordering the toggle cannot swap the architectures.
 *
 * MOBILE RULES (OXOT_Mobile_Rules.md), binding. The DOM order below IS the
 * mandatory mobile stacking order — segment selector, canvas, selected-state
 * summary — with no order-swapping utilities anywhere, so a phone reads the
 * markup as written. Desktop pulls the selector into a left column via the grid
 * only; it never reorders. There is no drag interaction, and nothing the visitor
 * needs is behind hover: every tier's contents and the summary line are plain
 * rendered text.
 *
 * THE SUMMARY LINE IS A LIVE REGION, not decoration. Arrow keys move the radio
 * selection while DOM focus stays inside the selector, so without `aria-live` a
 * screen-reader user would replace the entire canvas and hear nothing about it.
 *
 * TOKEN DISCIPLINE: `--border`, `--primary`, `--primary-ink`, `--card` only. No
 * `--signal-*` token appears here — the six signals carry model and decision
 * state on this page, and an architecture tier is neither. The rail-signal /
 * OXOT-signal name collision is the same trap `Rule.tsx` names.
 */

/** One line of a tier, bullet-separated the way the source's code fence prints it. */
function TierRow({ items }: { items: readonly string[] }) {
  return (
    <p className="mt-2 body-copy leading-relaxed text-muted-foreground">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span className="px-1.5 text-border">•</span>}
          {item}
        </span>
      ))}
    </p>
  );
}

function TierCard({ tier, locale }: { tier: Tier; locale: Locale }) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4">
      <p className="mono-label text-muted-foreground">{pick(tier.name, locale)}</p>
      {tier.rows.map((row, i) => (
        <TierRow key={i} items={row} />
      ))}
    </div>
  );
}

/** The vertical run between tiers — the source's own `│`. */
function TierLink() {
  return <span aria-hidden="true" className="mx-auto block h-5 w-px bg-border" />;
}

export function Architecture({ locale, className }: { locale: Locale; className?: string }) {
  const [segment, setSegment] = useState(DEFAULT_SEGMENT);
  const selected = SEGMENTS.find((s) => s.id === segment) ?? SEGMENTS[0];
  const stack = STACK_BY_SEGMENT[selected.id];

  return (
    <SectionA
      id={ARCH_SECTION.id}
      index={ARCH_SECTION.index}
      datumLabel={ARCH_SECTION.datumLabel}
      heading={ARCH_SECTION.heading}
      locale={locale}
      className={className}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* 1 · Segment selector. First in the DOM, so it is first on a phone. */}
        <div className="lg:col-span-4 xl:col-span-3">
          <p className="mono-label text-primary-ink">{pick(SELECTOR_LABEL, locale)}</p>
          <SegmentSelector
            segments={SEGMENTS}
            value={segment}
            onValueChange={setSegment}
            ariaLabel={pick(SELECTOR_LABEL, locale)}
            locale={locale}
            className="mt-4"
          />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {pick(PARALLEL_NOTE, locale)}
          </p>
        </div>

        {/* 2 · Canvas, then 3 · selected-state summary. */}
        <div className="min-w-0 lg:col-span-8 xl:col-span-9">
          {/* The whole canvas is what the selection acts on, so the accent goes
              on its frame rather than on any one tier — marking a single tier
              would say the others are common, which here they are not. The
              frame is carried by border weight and ground as well as by colour,
              so it survives a greyscale read. */}
          <div
            className={cn(
              "rounded-2xl border-2 border-primary/40 bg-primary/[0.04] p-5 sm:p-6",
              "transition-colors duration-200"
            )}
          >
            {/* The stack's own source title. It changes with the selection too,
                which is the first thing that moves when the toggle is used. */}
            <p className="mono-label text-primary-ink">{pick(stack.title, locale)}</p>

            <div className="mt-5 flex flex-col">
              {stack.tiers.map((tier, i) => (
                <div key={`${selected.id}-${tier.id}`}>
                  {i > 0 && <TierLink />}
                  <TierCard tier={tier} locale={locale} />
                </div>
              ))}
            </div>
          </div>

          <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {pick(STACK_SUMMARY_CAPTION, locale)}{" "}
            <span className="font-medium text-foreground">{pick(stack.title, locale)}</span>
          </p>
        </div>
      </div>
    </SectionA>
  );
}
