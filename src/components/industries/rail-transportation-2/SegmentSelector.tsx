"use client";

import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Bilingual } from "@/i18n/bilingual";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE TWO-WAY RAIL SEGMENT SELECTOR — Passenger Transit / Freight Rail.
 *
 * ONE CONTROL, TWO CALL SITES. S00's hero toggle and S03's architecture toggle
 * are the same selector over the same `SEGMENTS` array (content.ts L26–29), so
 * they are one component rendered twice rather than two lookalikes free to
 * drift apart.
 *
 * THIS FILE HOLDS NO STATE. Each call site owns its own `useState` and passes
 * `value` / `onValueChange` in. That is deliberate: content.ts L181–187 flags
 * as an open question whether the hero's choice should carry into the
 * architecture toggle or be set independently there, and a controlled component
 * lets the page answer that either way — two call sites sharing one state hook,
 * or holding one each — without this file changing.
 *
 * WHY NOT A RADIX PRIMITIVE. `Tabs` implies a separate content panel per item;
 * both consumers here have exactly ONE surface (the hero's model, the
 * architecture's canvas) that the selection re-renders, not a panel each.
 * `ToggleGroup` implies independent on/off state per item; exactly one segment
 * is in force at all times, never none and never two. `radiogroup` / `radio`
 * with a roving tabindex is the semantic that actually matches, so it is built
 * directly rather than bent out of a component that means something else.
 *
 * THE ROVING TABINDEX IS REAL, NOT DECORATIVE. Only the checked radio is in the
 * tab sequence (`tabIndex={0}`); the other is `-1`. Tab therefore enters and
 * leaves the whole group in one stop, and Arrow / Home / End move the selection
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
 * TOKEN DISCIPLINE: `--border`, `--primary`, `--primary-ink`, `--ring` and the
 * baseline text tokens only. No `--signal-*` token appears here — the signals
 * carry model and decision state on this page, and spending a semantic colour
 * on chrome would drain the meaning out of the ones that carry it.
 *
 * WHY `--primary-ink` AND NOT A `--primary` FILL for the selected segment:
 * globals.css L19–24 splits the three oranges by job — `--primary` is accent
 * FILL at ~3.0:1 and fails AA under 24px, and the ink that belongs on top of it
 * is `--primary-foreground`. These labels are 14px, so the selected label takes
 * `--primary-ink`, the token that exists precisely for orange text under 24px,
 * and `--primary` is spent on the marker and the border where fill is its job.
 */

/**
 * The shape this control needs from a segment — DOM identity and a label.
 * Declared structurally rather than imported, because `content.ts` exports
 * `SEGMENTS` as data without a named type. `SEGMENTS` satisfies this; its
 * `tableLabel` and `heroModel` belong to the surfaces the selector drives, not
 * to the selector itself.
 *
 * `id` is DOM identity, not copy (content.ts L73–75) — selection is compared
 * and reported by `id`, never by array position.
 */
export interface Segment {
  id: string;
  label: Bilingual;
}

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
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex flex-wrap items-stretch gap-1 rounded-xl border border-border p-1",
        className
      )}
    >
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
              "flex min-h-11 flex-1 items-center justify-center gap-2.5 rounded-lg border px-4 py-2 transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              selected
                ? "border-primary/60 bg-primary/10 text-primary-ink"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {/* Not colour alone: a filled disc on the selected segment, a
                hollow ring on the other. Readable in greyscale. */}
            <span
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 rounded-full border transition-colors duration-200",
                selected ? "border-primary bg-primary" : "border-current bg-transparent"
              )}
            />
            <span className={cn("text-sm leading-snug", selected ? "font-semibold" : "font-normal")}>
              {pick(segment.label, locale)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
