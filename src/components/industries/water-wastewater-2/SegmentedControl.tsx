"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A single-select control with real `radiogroup` / `radio` semantics and a
 * roving tabindex.
 *
 * WHY NOT THE REPO'S `ToggleGroup`: it is Radix's toggle group, which renders
 * pressed-button semantics — an independent on/off state per item. Every use of
 * this control on the page is genuinely one-of-N (which system, which view).
 * `Tabs` was the other candidate and is used on this page where the content
 * really is tab panels (the Four Decisions switchboard); it is wrong here,
 * because a view selector over one shared canvas has no per-item panel.
 *
 * Mobile Rules compliance: every item is a real button (never a drag, never
 * hover-only), min-height 44px, and the selected state is carried by a visible
 * marker and text weight as well as by colour.
 */

export interface SegmentedItem {
  value: string;
  label: string;
  /** Optional mono prefix, e.g. "V1". */
  index?: string;
}

export interface SegmentedControlProps {
  items: SegmentedItem[];
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  /** "gate" is the wide two-up system selector; "view" is the compact row. */
  variant?: "gate" | "view";
  className?: string;
}

export function SegmentedControl({
  items,
  value,
  onValueChange,
  ariaLabel,
  variant = "view",
  className
}: SegmentedControlProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    onValueChange(items[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(variant === "gate" ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2", className)}
    >
      {items.map((item, i) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "relative flex min-h-11 items-center gap-2 rounded-lg border px-3 text-left transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              variant === "gate" ? "justify-start px-4 py-2.5" : "py-2",
              selected
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {/* The selected marker is a filled bar, not colour alone. */}
            <span
              aria-hidden="true"
              className={cn(
                "h-4 w-0.5 shrink-0 rounded-full transition-colors duration-200",
                selected ? "bg-primary" : "bg-border"
              )}
            />
            {item.index && (
              <span className="mono-label shrink-0" aria-hidden="true">
                {item.index}
              </span>
            )}
            <span className={cn("text-sm leading-snug", selected && "font-medium")}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
