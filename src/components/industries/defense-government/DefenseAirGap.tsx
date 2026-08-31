import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { AIR_GAP } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/**
 * The dedicated air-gap subsection the brief calls for — grounded in both
 * industry_defense_airgap.md and 6_resources/air-gapped_deployment.md, not
 * industry_defence.md, per the task's own sourcing split.
 *
 * The one-way data-diode diagram is a real, standing OXOT deployment
 * concept, not a not-yet-built interactive feature, but it has no existing
 * visual anywhere on the site — an illustrative static inline SVG earns its
 * place here rather than a wall of prose. Built on currentColor/theme
 * classes (text-primary, text-muted-foreground), never fixed hex, so it
 * follows the light/dark toggle. Purely decorative graphic elements
 * (lines, the diode glyph, the boundary) are aria-hidden; the two captions
 * are ordinary text underneath the SVG, not inside it — the graphic never
 * hides real words, matching EnergyLine.tsx's own rule.
 */
export function DefenseAirGap({ locale }: { locale: Locale }) {
  const t = AIR_GAP;
  return (
    <section aria-labelledby="air-gap">
      <DefenseSectionHead id="air-gap" kicker="Air-gapped deployment" heading={pick(t.h2, locale)} intro={pick(t.body, locale)} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <svg viewBox="0 0 400 190" className="w-full max-w-md text-primary" aria-hidden="true">
          <line x1="14" y1="70" x2="150" y2="70" stroke="currentColor" strokeWidth="2" />
          <polygon points="150,70 138,63 138,77" fill="currentColor" />
          <polygon points="118,58 118,82 144,70" fill="currentColor" />
          <line x1="144" y1="58" x2="144" y2="82" stroke="currentColor" strokeWidth="3" />

          <line x1="208" y1="16" x2="208" y2="174" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
          <rect x="230" y="46" width="150" height="98" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <line x1="250" y1="80" x2="360" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="250" y1="98" x2="340" y2="98" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="250" y1="116" x2="350" y2="116" stroke="currentColor" strokeWidth="1" opacity="0.5" />

          <line x1="150" y1="128" x2="66" y2="128" stroke="currentColor" strokeWidth="2" opacity="0.55" />
          <line x1="58" y1="118" x2="58" y2="138" stroke="currentColor" strokeWidth="3" opacity="0.55" />
        </svg>
        <div className="flex gap-8 text-sm sm:col-span-1">
          <div className="max-w-[10rem]">
            <p className="mono-label text-primary-ink">In</p>
            <p className="mt-1 text-muted-foreground">Approved threat and vulnerability intelligence, one direction only.</p>
          </div>
          <div className="max-w-[10rem]">
            <p className="mono-label text-primary-ink">Out</p>
            <p className="mt-1 text-muted-foreground">No customer data, telemetry, or model state leaves the enclave.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
        {t.modes.map((m, i) => (
          <div key={i} className="border-t-2 border-primary pt-4">
            <h3 className="h-card">{pick(m.name, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(m.body, locale)}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-border p-6 sm:p-8">
        <p className="mono-label text-muted-foreground">What works offline</p>
        <ul className="mt-4 flex list-none flex-col gap-3 p-0 text-sm leading-relaxed text-foreground">
          {t.offline.map((line, i) => (
            <li key={i} className="border-l-2 border-primary/40 pl-4">
              {pick(line, locale)}
            </li>
          ))}
        </ul>
      </div>

      <p className="prose-measure mt-8 text-sm leading-relaxed text-muted-foreground">{pick(t.caveat, locale)}</p>
    </section>
  );
}
