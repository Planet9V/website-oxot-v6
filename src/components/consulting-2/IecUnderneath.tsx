/**
 * IEC 62443 underneath the services, for `/consulting`.
 *
 * A DERIVATION CHAIN, RENDERED AS A CHAIN. The six levels run left-to-right
 * and wrap, joined by arrows — reading order, which is what a derivation is.
 * They are deliberately NOT stacked: a vertical pile of full-width bands would
 * assert physical containment (an architecture stack, a Purdue ladder) that
 * the source does not state, and `OXOT_Composition_Rules.md`'s consulting rule
 * 4 forbids a deep seven-layer architecture treatment outright. No isometric
 * treatment, no sticky per-layer scroll, and no `PurdueDiagram`/`PurdueStack`
 * anywhere on this page.
 *
 * `derivedFrom` is stated data, not something inferred from array order, so
 * the relationship it names is spoken aloud: each link past the first carries
 * a visually-hidden "derived from …" naming its predecessor by label. Sighted
 * readers get the arrow; screen-reader users get the sentence. Neither gets a
 * layer number — `index` is the chain's reading position and nothing else.
 *
 * THIS SECTION STAYS SHORT AND HANDS OFF. It shows that all six services rest
 * on one model, then exits to `/assurance/iec-62443`, where the standard is
 * actually explained. Nothing here may grow into a second explanation of
 * IEC 62443.
 *
 * The structure points describe what the standard PROVIDES. They are not a
 * checklist of work completed, so they carry no tick, no progress state and no
 * completion count — and the chain's six links are not a progress bar.
 */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { IEC } from "./content.iec";

export function IecUnderneath({ locale }: { locale: Locale }) {
  /** id → label, so `derivedFrom` can be spoken as a name rather than an id. */
  const labelById = new Map(IEC.chain.map((link) => [link.id, pick(link.label, locale)]));

  return (
    <section
      aria-labelledby={IEC.sectionId}
      className="mt-20 border-t border-border pt-12"
    >
      <p className="oxot-kicker">{pick(IEC.datumLabel, locale)}</p>
      <h2 id={IEC.sectionId} className="h-section mt-3 text-foreground">
        {pick(IEC.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 text-base leading-relaxed text-muted-foreground">
        {pick(IEC.lead, locale)}
      </p>

      {/* The chain. A wrapping horizontal sequence — never a stack. */}
      <ol className="mt-8 flex flex-wrap items-stretch gap-x-2 gap-y-3">
        {IEC.chain.map((link, i) => {
          const from = link.derivedFrom ? labelById.get(link.derivedFrom) : undefined;
          return (
            <li key={link.id} className="flex items-stretch gap-2">
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="self-center text-base font-semibold text-primary"
                >
                  &#8594;
                </span>
              ) : null}
              <span className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-2xs">
                <span className="mono-label text-primary-ink">{link.index}</span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {pick(link.label, locale)}
                </span>
                {from ? <span className="sr-only">— derived from {from}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="prose-measure text-base leading-relaxed text-muted-foreground">
            {pick(IEC.structureLead, locale)}
          </p>
          <ul className="mt-4 space-y-2.5">
            {IEC.structurePoints.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                <span>{pick(point, locale)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:self-start">
          <blockquote className="rounded-2xl border border-border bg-muted/50 p-6">
            <p className="font-display text-lg font-semibold leading-relaxed text-foreground">
              {pick(IEC.pullQuote, locale)}
            </p>
          </blockquote>

          <p className="mt-6">
            <Link
              href={localePath(locale, IEC.ctaHref)}
              className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
            >
              {pick(IEC.cta, locale)}
              <span aria-hidden="true">&#8594;</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
