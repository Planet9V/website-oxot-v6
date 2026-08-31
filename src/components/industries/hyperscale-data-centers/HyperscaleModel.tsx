"use client";

import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MODEL } from "./content";
import { StatusDot } from "./StatusDot";

/**
 * NOT BUILT YET — the source brief specifies this vertical's interactive
 * model as the site's best interactive demonstration ("a navigable
 * dependency model," not a rotating 3D building), but no such tool exists
 * anywhere on the site today. Per the brief for this page: build a
 * well-designed STATIC placeholder — real descriptive copy plus an
 * illustrative diagram — rather than skip the section.
 *
 * The scenario ToggleGroup is real shadcn/ui, wired with a defaultValue so
 * it renders a plausible "selected scenario" state, but it is decorative:
 * selecting another item does not change anything else on the page. The
 * flow diagram is inline SVG on currentColor/theme tokens (not fixed hex),
 * marked fully aria-hidden because every label it carries is also written
 * out as real text in the two lists beside it.
 */
export function HyperscaleModel({ locale }: { locale: Locale }) {
  const t = MODEL;
  return (
    <section id="model" aria-labelledby="model" className="mt-16 scroll-mt-24 border-t border-border pt-10">
      <h2 id="model" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
          <p className="mono-label mb-5 text-muted-foreground">{pick(t.drillDownLabel, locale)}</p>
          <ol className="flex list-none flex-col gap-3 border-l-2 border-primary/40 p-0 pl-6">
            {t.drillDown.map((step, i) => (
              <li key={i} className="relative text-sm leading-relaxed text-foreground">
                <span className="absolute -left-[1.72rem] top-1 flex size-[9px] items-center justify-center">
                  <StatusDot />
                </span>
                <span className="mono-label mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                {pick(step, locale)}
              </li>
            ))}
          </ol>

          <p className="mono-label mb-4 mt-8 text-muted-foreground">{pick(t.viewsLabel, locale)}</p>
          <ul className="grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
            {t.views.map((v, i) => (
              <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                <StatusDot />
                <span className="text-xs leading-snug text-foreground">{pick(v, locale)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
          <p className="mono-label mb-4 text-muted-foreground">{pick(t.scenariosLabel, locale)}</p>
          <ToggleGroup
            type="single"
            defaultValue="scenario-0"
            className="flex flex-wrap items-start justify-start gap-2"
            aria-label={pick(t.scenariosLabel, locale)}
          >
            {t.scenarios.map((s, i) => (
              <ToggleGroupItem
                key={i}
                value={`scenario-${i}`}
                variant="outline"
                className="h-auto whitespace-normal rounded-full border-border px-3 py-1.5 text-left text-xs leading-snug data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary-ink"
              >
                {pick(s, locale)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <p className="mt-6 text-xs italic leading-relaxed text-muted-foreground">{pick(t.note, locale)}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <svg
            viewBox="0 0 640 360"
            className="w-full text-border"
            role="img"
            aria-hidden="true"
          >
            <line x1="60" y1="16" x2="60" y2="344" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
            {t.layers.map((_, i) => {
              const y = 16 + i * 65.6;
              return (
                <g key={i}>
                  <rect x="20" y={y - 14} width="80" height="28" rx="14" className="fill-primary/15 stroke-primary" strokeWidth="1.5" />
                  <text x="60" y={y + 4} textAnchor="middle" className="fill-primary-ink font-mono text-[11px] font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  <line x1="100" y1={y} x2="220" y2={y} stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
                  <rect x="220" y={y - 20} width="400" height="40" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
                  <text x="238" y={y + 5} className="fill-foreground font-sans text-[13px] font-medium">
                    {pick(t.layers[i].short, locale)}
                  </text>
                </g>
              );
            })}
          </svg>

          <dl className="flex flex-col gap-3">
            {t.layers.map((l, i) => (
              <div key={i} className="flex gap-3">
                <dt className="mono-label w-6 shrink-0 pt-0.5 text-primary-ink">{String(i + 1).padStart(2, "0")}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{pick(l.short, locale)}</span> — {pick(l.detail, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
