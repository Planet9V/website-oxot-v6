import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { RECORDS } from "./content";
import { SectionHead } from "./primitives";

/**
 * Section 06 — what happens when the record does not match the plant.
 *
 * Every section above this one lists something the reader is supposed to
 * send, which quietly builds an objection: none of ours are current. The
 * page has to answer that before the closing ask, and the answer is already
 * settled product policy on /cdt-2 — everyone's are, reconciliation is part
 * of the engagement, and the gap list that falls out of it is usually the
 * first thing customers find valuable.
 *
 * A FOUR-STEP TRACE, because this is the one part of the page that is a
 * sequence rather than a catalogue, and the shape should say so. Static
 * markup with a drawn rule between the nodes; nothing here expands, and
 * nothing claims to.
 */
export function Records({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby={RECORDS.id} className="mt-16 border-t border-border pt-12">
      <SectionHead n={RECORDS.n} id={RECORDS.id} title={RECORDS.title} dek={RECORDS.dek} locale={locale} />

      <ol className="mt-8 list-none p-0">
        {RECORDS.steps.map((step, i) => (
          <li
            key={i}
            className="relative grid grid-cols-[1.75rem_1fr] gap-4 pb-7 last:pb-0 sm:grid-cols-[2rem_1fr] sm:gap-5"
          >
            {/* The rule between this node and the next. Absent on the last
                step, so the trace terminates rather than trailing off. */}
            {i < RECORDS.steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[0.84375rem] top-8 w-px bg-border sm:left-[0.96875rem]"
              />
            ) : null}
            <span className="z-10 flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-[11px] font-bold text-primary-ink sm:h-8 sm:w-8 sm:text-xs">
              {i + 1}
            </span>
            <div className="pt-1">
              <p className="font-display body-lead font-bold leading-snug text-foreground">
                {pick(step.title, locale)}
              </p>
              <p className="mt-1.5 body-copy leading-relaxed text-muted-foreground">{pick(step.body, locale)}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* The smallest true ask on the site, given its own frame because it is
          the sentence a reader is meant to leave with. */}
      <div className="mt-10 rounded-xl border border-primary/40 bg-muted px-5 py-5">
        <p className="mono-label font-bold text-primary-ink">{pick(RECORDS.minimumLabel, locale)}</p>
        <p className="mt-2 font-display text-[1.25rem] font-bold leading-snug tracking-tight text-foreground">
          {pick(RECORDS.minimum, locale)}
        </p>
      </div>
    </section>
  );
}
