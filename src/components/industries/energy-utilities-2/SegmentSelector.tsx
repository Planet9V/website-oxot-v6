"use client";

import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import type { Segment } from "./content.architecture";

/**
 * THE FIVE-SEGMENT VIEW SELECTOR for S02 — one-of-N over a single shared
 * architecture canvas.
 *
 * WHY NOT A RADIX PRIMITIVE. `ToggleGroup` renders pressed-button semantics —
 * an independent on/off state per item — which is a different promise from the
 * one this control makes: exactly one of Generation / T&D / Renewables &
 * Storage / Gas / Hydrogen / District Energy is in force at all times, never
 * none and never two. `Tabs` was the other candidate and is wrong for the
 * opposite reason: it implies a separate content panel per item, and here
 * there is ONE canvas that all five selections write into. `radiogroup` /
 * `radio` with a roving tabindex is the semantic that matches, so it is built
 * directly rather than bent out of a component that means something else.
 *
 * THE ROVING TABINDEX IS REAL, NOT DECORATIVE. Only the checked radio is in the
 * tab sequence (`tabIndex={0}`); the other four are `-1`. Tab therefore enters
 * and leaves the group in one stop, and Arrow / Home / End move the selection
 * AND move DOM focus with it — which is what makes the group operable by
 * keyboard rather than merely labelled as though it were.
 *
 * MOBILE RULES (OXOT_Mobile_Rules.md), binding:
 *   • `min-h-11` — 44px minimum touch target on every segment button.
 *   • Every state is reachable by a single tap. No drag anywhere.
 *   • Selected state is carried by a filled marker and a font-weight change as
 *     well as by colour, so it survives a colour-blind or greyscale read.
 *   • Nothing essential is behind hover; hover only warms the border.
 *
 * TOKEN DISCIPLINE: `--border`, `--primary`, `--card`, `--ring` only. No
 * `--signal-*` token appears here. The six signals mean model and decision
 * state on this page; a view selector is chrome, and spending a semantic
 * colour on it would drain the meaning out of the ones that carry it.
 */

export interface SegmentSelectorProps {
  segments: readonly Segment[];
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  locale: Locale;
  className?: string;
}

export function SegmentSelector({
  segments,
  value,
  onValueChange,
  ariaLabel,
  locale,
  className
}: SegmentSelectorProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % segments.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + segments.length) % segments.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = segments.length - 1;
    else return;
    event.preventDefault();
    onValueChange(segments[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn("flex flex-col gap-2", className)}>
      {segments.map((segment, i) => {
        const selected = segment.id === value;
        return (
          <button
            key={segment.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(segment.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "flex min-h-11 w-full items-center gap-3 rounded-lg border px-3.5 py-2 text-left transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              selected
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {/* Not colour alone: a filled bar on the selected item, hairline on
                the rest. Readable in greyscale and at low contrast. */}
            <span
              aria-hidden="true"
              className={cn(
                "h-4 w-0.5 shrink-0 rounded-full transition-colors duration-200",
                selected ? "bg-primary" : "bg-border"
              )}
            />
            <span className={cn("text-sm leading-snug", selected && "font-medium")}>
              {pick(segment.label, locale)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
