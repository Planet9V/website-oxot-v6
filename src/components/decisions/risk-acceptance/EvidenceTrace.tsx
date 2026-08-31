import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EVIDENCE_TRACE } from "./content";

/**
 * The drill-down evidence chain the content-to-visual mapping table names
 * for this content type, applied to one field of the record above rather
 * than to the page as a whole: a single claim, then the four things
 * standing behind it, ending at a named accountable role.
 *
 * Visually consistent with the chain on /assurance/evidence-data-
 * provenance — same downward arrow, same rung framing — but this one
 * carries the claim it descends from as a labelled header, because here
 * the chain is an argument about one record entry rather than a
 * description of the evidence model in general.
 *
 * The arrow is real inline SVG using `currentColor` on a token class, so
 * the direction survives zoom and both themes with no hardcoded colour.
 */
function TraceArrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 30"
      width="12"
      height="30"
      className="ml-5 block shrink-0 text-primary sm:ml-7"
    >
      <line x1="6" y1="0" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="6,29 1.75,20.5 10.25,20.5" fill="currentColor" />
    </svg>
  );
}

export function EvidenceTrace({ locale }: { locale: Locale }) {
  const t = EVIDENCE_TRACE;
  return (
    <section className="mt-20 lg:mt-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
        <div>
          <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
          <h2 className="mt-4">{pick(t.h2, locale)}</h2>
          <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
            {pick(t.intro, locale)}
          </p>
          <p className="prose-measure mt-6 rounded-lg border border-dashed border-border p-4 text-sm leading-relaxed text-muted-foreground">
            {pick(t.gapNote, locale)}
          </p>
          <p className="prose-measure mt-4 border-l-2 border-primary py-1 pl-5 text-sm leading-relaxed text-foreground">
            {pick(t.noBadge, locale)}
          </p>
        </div>

        <figure className="m-0">
          <figcaption className="rounded-t-xl border border-border bg-muted/50 px-5 py-3">
            {/* --reg-iec has no verified AA-safe text ("-ink") variant —
                using --primary-ink, the token this codebase's own
                eyebrow/label pattern already relies on. */}
            <span className="mono-label text-primary-ink">Traced claim</span>
            <span className="mt-1 block font-mono text-sm leading-relaxed text-foreground">
              {pick(t.claim, locale)}
            </span>
          </figcaption>
          <ol className="m-0 flex list-none flex-col rounded-b-xl border border-t-0 border-border p-5">
            {t.rungs.map((rung, i) => (
              <li key={rung.title.en} className="flex flex-col">
                {i > 0 ? <TraceArrow /> : null}
                <div className="rounded-xl border border-border bg-card px-4 py-3 sm:px-5 sm:py-4">
                  <div className="flex items-baseline gap-3">
                    <span className="mono-label shrink-0 tabular-nums text-primary-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display body-lead font-bold leading-snug text-foreground">
                      {pick(rung.title, locale)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(rung.body, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}
