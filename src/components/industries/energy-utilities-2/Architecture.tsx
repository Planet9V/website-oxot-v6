"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { localePath, PATHS } from "@/components/shell/nav";
import { SectionA } from "./Rule";
import { SegmentSelector } from "./SegmentSelector";
import { TechnologyTable } from "./TechnologyTable";
import {
  ARCH_SECTION,
  COMMON_TIERS,
  COMMON_TIER_NOTE,
  DEFAULT_SEGMENT,
  FIELD_ASSETS_BY_SEGMENT,
  FIELD_SUMMARY_CAPTION,
  FIELD_TIER_NAME,
  INTEGRATION_MODEL,
  INTEGRATION_MODEL_CITATION,
  SEGMENTS,
  SELECTOR_LABEL,
  TECH_TABLE,
  type Tier
} from "./content.architecture";

/**
 * S02 · TYPICAL OT ARCHITECTURE — source L90–L129.
 *
 * THE STACK IS DRAWN AS A STACK because that is what the source draws: five
 * tiers, top to bottom, joined by a single vertical run (L100–116). It is not
 * re-cast as a Purdue ladder with zone numbers or as a network graph — the
 * brief states neither, and either would print engineering facts the source
 * does not contain.
 *
 * FOUR TIERS ARE INERT, AND THE PAGE SAYS SO. The brief asks for five
 * selectable segments but supplies one stack. Rather than invent four more
 * stacks, the upper four tiers are drawn once and `COMMON_TIER_NOTE` states
 * that they do not change; only the field tier is partitioned. The alternative
 * — animating an unchanged diagram so the control looks like it did something —
 * is the failure mode this page is explicitly built to avoid.
 *
 * MOBILE RULES (OXOT_Mobile_Rules.md), binding. The DOM order below IS the
 * mandatory mobile stacking order — view selector, canvas, selected-state
 * summary — with no order-swapping utilities anywhere, so the phone reads the
 * markup as written. Desktop pulls the selector into a left column via the grid
 * only; it never reorders. There is no drag interaction, and no state the
 * visitor needs is behind hover: the field tier's contents and the summary line
 * are both plain rendered text.
 *
 * THE SUMMARY LINE IS A LIVE REGION, not decoration. Arrow keys move the radio
 * selection while DOM focus stays inside the selector, so without `aria-live` a
 * screen-reader user would change the canvas and hear nothing about it.
 *
 * TOKEN DISCIPLINE: `--border`, `--primary`, `--primary-ink`, `--card`,
 * `--muted` only. No `--signal-*` token appears here — those six carry model
 * and decision state on this page, and an architecture tier is neither.
 */

function TierItems({ items }: { items: readonly string[] }) {
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

/** The vertical run between tiers — the source's own `│`. */
function TierLink() {
  return <span aria-hidden="true" className="mx-auto block h-5 w-px bg-border" />;
}

function CommonTier({ tier, locale }: { tier: Tier; locale: Locale }) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4">
      <p className="mono-label text-muted-foreground">{pick(tier.name, locale)}</p>
      <TierItems items={tier.items} />
    </div>
  );
}

export function Architecture({ locale, className }: { locale: Locale; className?: string }) {
  const [segment, setSegment] = useState(DEFAULT_SEGMENT);
  const selected = SEGMENTS.find((s) => s.id === segment) ?? SEGMENTS[0];
  const fieldAssets = FIELD_ASSETS_BY_SEGMENT[selected.id];

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
        {/* 1 · View selector. First in the DOM, so it is first on a phone. */}
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
            {pick(COMMON_TIER_NOTE, locale)}
          </p>
        </div>

        {/* 2 · Canvas, then 3 · selected-state summary. */}
        <div className="min-w-0 lg:col-span-8 xl:col-span-9">
          <div className="flex flex-col">
            {COMMON_TIERS.map((tier, i) => (
              <div key={tier.id}>
                {i > 0 && <TierLink />}
                <CommonTier tier={tier} locale={locale} />
              </div>
            ))}

            <TierLink />

            {/* The one tier the selection acts on. Marked out by border weight
                and ground as well as by colour, so the distinction survives a
                greyscale read. */}
            <div
              className={cn(
                "rounded-xl border-2 border-primary/50 bg-primary/[0.06] px-5 py-4",
                "transition-colors duration-200"
              )}
            >
              <p className="mono-label text-primary-ink">{pick(FIELD_TIER_NAME, locale)}</p>
              <TierItems items={fieldAssets} />
            </div>
          </div>

          <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {pick(FIELD_SUMMARY_CAPTION, locale)}{" "}
            <span className="font-medium text-foreground">{pick(selected.label, locale)}</span>
          </p>
        </div>
      </div>

      <div className="mt-16">
        <p className="mono-label text-primary-ink">{pick(TECH_TABLE.caption, locale)}</p>
        <div className="mt-4">
          <TechnologyTable locale={locale} />
        </div>
        <p className="mt-8 body-lead leading-relaxed text-muted-foreground">
          {pick(INTEGRATION_MODEL, locale)}{" "}
          <Link
            href={localePath(
              locale,
              /* `/technical-specification` renders EN only, so an `nl` link is a
                 real 404. Same substitution the rest of the site uses. */
              locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2
            )}
            className="text-primary-ink underline-offset-4 hover:underline"
          >
            {pick(INTEGRATION_MODEL_CITATION, locale)}
          </Link>
        </p>
      </div>
    </SectionA>
  );
}
