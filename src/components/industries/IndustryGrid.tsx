"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "./registry";
import { SECTOR_MARKS } from "./sector-marks";

/**
 * The six sectors, as a bento grid or as a bento list.
 *
 * WHY THIS IS A CLIENT COMPONENT AND WHAT THAT COSTS. The view toggle needs
 * state, so this crosses the client boundary — which is exactly why its marks
 * come from `./sector-marks` and NOT from `resolveSymbol` / `DrawioGlyph`.
 * Those pull the ~3 MB compiled stencil manifest, which is server-only. Do not
 * import them here.
 *
 * SIX CARDS AGAINST RULE 13. `OXOT_Visual_Rules.md` L13 bars "more than three
 * visually equal cards". The grid clears it the way an index does rather than
 * a pitch does: the six are one object — a directory — under a single heading
 * that is the section's only focal element. So the cards stay quiet (no fill,
 * no accent panel, no per-card button) and the one varying element is the
 * mark, which identifies rather than ranks. Six filled tiles each with its own
 * CTA would be the failure the rule names.
 *
 * DEFAULT IS THE GRID AT THREE ACROSS on desktop (owner, 2026-08-31), two at
 * `sm`, one below. The list view is the same records at full width, for
 * readers comparing summaries without scanning across columns.
 *
 * `liveSlug`, NEVER `slug`. `slug` is the sector's identity; `liveSlug` is the
 * build currently published. They had drifted — the nav pointed at the `-2` /
 * `-3` rebuilds while this index still pointed at the originals, so the menu
 * and the index led to different pages for the same sector.
 *
 * NO ORDINALS IN THE GRID. A numbered 01-06 rail across a bento reads as a
 * ranking, and the registry's order is editorial, not a priority. The list
 * keeps its ordinals because a vertical run is plainly a running order.
 */

type View = "grid" | "list";

const TOGGLE = [
  { id: "grid" as const, label: "Cards" },
  { id: "list" as const, label: "List" }
];

export function IndustryGrid({ locale }: { locale: Locale }) {
  const [view, setView] = useState<View>("grid");

  return (
    <div className="mt-10">
      {/* Chrome, not copy — the control names two renderings of the same six
          records, so it carries no claim and no source line. */}
      <div className="flex justify-end">
        <div
          role="group"
          aria-label="Layout"
          className="inline-flex rounded-lg border border-border p-0.5"
        >
          {TOGGLE.map((option) => {
            const active = view === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setView(option.id)}
                className={cn(
                  "mono-label rounded-md px-3 py-1.5 transition-colors duration-150 ease-brand",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {view === "grid" ? (
        <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const Mark = SECTOR_MARKS[ind.slug];
            return (
              <li key={ind.slug} className="bg-card">
                <Link
                  href={localePath(locale, `${PATHS.industries}/${ind.liveSlug}`)}
                  className="group flex h-full flex-col p-6 no-underline transition-colors duration-150 ease-brand hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:p-7"
                >
                  {Mark ? <Mark className="size-8 text-primary-ink" /> : null}
                  <span className="h-card mt-5 block text-foreground">
                    {pick(ind.name, locale)}
                  </span>
                  <span className="mt-2.5 block body-copy leading-relaxed text-muted-foreground">
                    {pick(ind.summary, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-6 text-sm text-primary-ink transition-transform duration-150 ease-brand group-hover:translate-x-0.5"
                  >
                    &#8594;
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <ol className="mt-5 flex list-none flex-col border-t border-border p-0">
          {INDUSTRIES.map((ind, i) => {
            const Mark = SECTOR_MARKS[ind.slug];
            return (
              <li key={ind.slug} className="border-b border-border">
                <Link
                  href={localePath(locale, `${PATHS.industries}/${ind.liveSlug}`)}
                  className="group flex flex-col gap-3 py-7 no-underline transition-colors duration-150 ease-brand sm:flex-row sm:items-center sm:gap-7"
                >
                  <span className="mono-label w-8 shrink-0 text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {Mark ? <Mark className="size-7 shrink-0 text-primary-ink" /> : null}
                  <span className="flex-1">
                    <span className="h-card block text-foreground transition-colors duration-150 ease-brand group-hover:text-primary-ink">
                      {pick(ind.name, locale)}
                    </span>
                    <span className="prose-measure mt-1.5 block body-copy leading-relaxed text-muted-foreground">
                      {pick(ind.summary, locale)}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mono-label shrink-0 text-primary-ink opacity-60 transition-opacity duration-150 ease-brand group-hover:opacity-100"
                  >
                    &#8594;
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
