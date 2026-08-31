import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ZONES } from "./content";
import { ZONE_STACK } from "./content-figures";

/**
 * THE ZONE AND CONDUIT STACK — the page's principal diagram.
 *
 * It draws what the source document draws in ASCII: six zones from
 * enterprise down to field devices, and the conduit between each adjacent
 * pair. Every zone band and every conduit connector is a real element with
 * real text in it, generated from ZONE_STACK — so the structure is in the
 * DOM, reads in source order to a screen reader, reflows on a phone, and
 * survives a copy-paste into a document. That is the whole reason it is
 * HTML rather than an exported image or an aria-hidden line drawing.
 *
 * IT IS STATIC, AND IT SAYS SO. There is no state, no toggle, no hover
 * reveal, and ZONES.diagramNote — rendered directly beneath it by the
 * caller — tells the reader in plain words that this is a reference drawing
 * of the standard's stack rather than a view of their environment. This
 * codebase has shipped a component named after a 3D engine it never
 * imported; a static diagram labelled static is the correction to that, not
 * another animation.
 *
 * THE LEFT ACCENT RAMPS by depth. Class names are written out per row
 * rather than composed, because Tailwind cannot see a class it did not read
 * in the source. The ramp carries no numeric claim — it is depth in the
 * Purdue sense, enterprise at the top through to the process at the bottom,
 * with the safety zone at full strength because the copy singles it out.
 */
const ACCENTS = [
  "bg-primary/20",
  "bg-primary/30",
  "bg-primary/45",
  "bg-primary/60",
  "bg-primary",
  "bg-primary/75"
] as const;

export function ZoneStack({ locale }: { locale: Locale }) {
  return (
    <figure className="mt-8">
      {/* Sentence case, not `mono-label`: this caption is a full sentence, and
          `mono-label` uppercases, which is unreadable much past three words. */}
      <figcaption className="mb-5 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground">
        {pick(ZONES.diagramLabel, locale)}
      </figcaption>

      <ol className="list-none p-0">
        {ZONE_STACK.map((z, i) => (
          <li key={z.purdue + i}>
            {/* The zone band. */}
            <div className="flex overflow-hidden rounded-lg border border-border bg-card">
              <span aria-hidden="true" className={`w-1.5 shrink-0 ${ACCENTS[i]}`} />
              <div className="flex flex-1 flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <p className="font-display body-lead font-bold leading-snug text-foreground">
                    {pick(z.zone, locale)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pick(z.detail, locale)}</p>
                </div>
                <span className="mono-label shrink-0 self-start rounded border border-border px-2 py-1 font-bold text-primary-ink sm:self-center">
                  {z.purdue}
                </span>
              </div>
            </div>

            {/* The conduit to the zone below. The last zone has none, so the
                stack terminates at the process instead of trailing off. */}
            {z.conduit ? (
              <div className="relative flex justify-center py-3">
                <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                <span className="relative max-w-full rounded-full border border-dashed border-primary/50 bg-background px-3.5 py-1.5 text-center">
                  <span className="mono-label font-bold text-primary-ink">Conduit</span>
                  <span aria-hidden="true" className="mono-label px-2 text-border">
                    /
                  </span>
                  <span className="mono-label text-muted-foreground">{pick(z.conduit, locale)}</span>
                </span>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
