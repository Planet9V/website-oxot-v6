"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HERO, SCENARIOS } from "./content";

/** Views, in HERO.views order: 0 Water process, 1 OT/SCADA paths,
 *  2 Cyber route, 3 Public-health/compliance impact. */
export function WaterHero({ locale }: { locale: Locale }) {
  const [view, setView] = useState(0);
  const cyberExample = SCENARIOS.items[0];

  return (
    <header className="relative pt-10 lg:pt-14">
      <p className="oxot-kicker">Water & Wastewater</p>
      <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
      <p className="prose-measure mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
        </Button>
      </div>

      {/* Static hero visual — the source brief calls for an interactive,
          switchable source-to-tap / influent-to-effluent diagram. No
          view-switching UI exists anywhere on this site yet, so this is a
          deliberately finished-looking static illustration instead of an
          omission: two labelled process chains, the shared control layer,
          and the four views the (not-yet-built) switcher would offer. */}
      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <svg viewBox="0 0 64 64" className="mt-1 size-10 shrink-0 text-primary" aria-hidden="true">
            <path
              d="M32 6c8 10 16 20 16 30a16 16 0 0 1-32 0c0-10 8-20 16-30Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M22 40c2 6 8 8 12 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
          <div>
            <p className="mono-label text-muted-foreground">Two systems, one physical route</p>
            <p className="prose-measure mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {pick(HERO.visualNote, locale)}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "mt-8 grid gap-6 sm:grid-cols-2 transition-opacity duration-200",
            view === 1 && "opacity-50"
          )}
        >
          <div>
            <p className="mono-label text-primary-ink">Drinking water</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-foreground">
              {HERO.drinkingChain.map((n, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true" className="text-muted-foreground">&#8594;</span>}
                  {pick(n, locale)}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className="mono-label text-primary-ink">Wastewater</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-foreground">
              {HERO.wastewaterChain.map((n, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true" className="text-muted-foreground">&#8594;</span>}
                  {pick(n, locale)}
                </span>
              ))}
            </p>
          </div>
        </div>

        <p className="mono-label mt-8 text-muted-foreground">Controls layered over both processes</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {HERO.controls.map((c, i) => (
            <Badge
              key={i}
              variant="outline"
              className={cn("transition-colors duration-200", view === 1 && "border-primary bg-primary/10 text-primary-ink")}
            >
              {pick(c, locale)}
            </Badge>
          ))}
        </div>

        <p className="mono-label mt-8 text-muted-foreground">Switch views</p>
        <ToggleGroup
          type="single"
          value={String(view)}
          onValueChange={(v) => v !== "" && setView(Number(v))}
          className="mt-3 flex flex-wrap justify-start gap-2"
          aria-label="Switch the diagram view"
        >
          {HERO.views.map((v, i) => (
            <ToggleGroupItem
              key={i}
              value={String(i)}
              variant="outline"
              className="min-h-11 rounded-full border-border px-4 text-xs leading-snug data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary-ink"
            >
              {pick(v, locale)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="mt-5 min-h-[4.5rem] rounded-xl border border-border bg-card p-4" aria-live="polite">
          {view === 2 ? (
            <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
              <p className="text-foreground">
                <span className="mono-label mr-1.5 text-primary-ink">Example route</span>
                {pick(cyberExample.pathway, locale)}
              </p>
              <p className="text-muted-foreground">
                <span aria-hidden="true">&#8594;</span> {pick(cyberExample.impact, locale)}
              </p>
            </div>
          ) : view === 3 ? (
            <div className="flex flex-wrap gap-2">
              {HERO.impactTags.map((t, i) => (
                <Badge key={i} variant="outline" className="border-destructive/40 text-destructive">
                  {pick(t, locale)}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">{pick(HERO.viewFocus[view], locale)}</p>
          )}
        </div>
      </div>
    </header>
  );
}
