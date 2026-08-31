import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BOUNDARIES } from "./content";

/**
 * Claim boundaries, stated as plainly as the record itself. A page whose
 * whole argument is "write down what you decided and why" cannot then
 * overstate what the artefact does — so the limits are a section, not a
 * disclaimer in small type at the bottom.
 *
 * The last line is about this page rather than the product: the record
 * above is a static illustration and nothing here is interactive. Saying
 * so is cheaper than a reader discovering it.
 */
export function Boundaries({ locale }: { locale: Locale }) {
  const t = BOUNDARIES;
  return (
    <section className="mt-20 lg:mt-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
          <h2 className="mt-4">{pick(t.h2, locale)}</h2>
        </div>

        <dl className="m-0 divide-y divide-border border-t border-border">
          {t.items.map((item) => (
            <div
              key={item.label.en}
              className="grid grid-cols-1 gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]"
            >
              <dt className="mono-label normal-case tracking-normal text-foreground">{pick(item.label, locale)}</dt>
              <dd className="ml-0 text-sm leading-relaxed text-muted-foreground">{pick(item.body, locale)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mono-label mt-8 rounded-lg border border-dashed border-border px-4 py-3 normal-case tracking-normal">
        {pick(t.staticNote, locale)}
      </p>
    </section>
  );
}
