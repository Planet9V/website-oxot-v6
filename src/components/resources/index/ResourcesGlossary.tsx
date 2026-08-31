import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { GLOSSARY, GLOSSARY_SAMPLE, resourceHref } from "./content";

/**
 * THE GLOSSARY IS NOT A SEVENTH CARD. The source calls it "a technical
 * reference layer, not an afterthought" — the thing sitting UNDER the
 * Insights, case studies and guides, catching a reader who hit an
 * unfamiliar term inside one of them. It is absent from the four "choose
 * your path" cards for exactly that reason: nobody arrives at a hub
 * intending to read a glossary, they arrive at one from inside something
 * else.
 *
 * So it closes the page as a strip rather than competing for attention
 * higher up, and it leads with real terms rather than with a description
 * of itself — a glossary is only credible if you can see what an entry is
 * about.
 *
 * The terms are text, not links. Each one's destination is an anchor on a
 * page being built in parallel; eight speculative deep links that may not
 * resolve would be worse than one that certainly does.
 */
export function ResourcesGlossary({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="glossary" className="mt-14 border-t border-border pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-12">
        <div>
          <h2 id="glossary" className="h-sub">
            {pick(GLOSSARY.h2, locale)}
          </h2>
          <p className="mt-3 font-display text-[1.125rem] font-bold leading-snug text-foreground">
            &ldquo;{pick(GLOSSARY.question, locale)}&rdquo;
          </p>
          <p className="mono-label mt-3">{pick(GLOSSARY.role, locale)}</p>
          <p className="mt-5 body-copy leading-relaxed text-muted-foreground">
            {pick(GLOSSARY.body, locale)}
          </p>
          <p className="mt-6">
            <Link
              href={resourceHref(locale, GLOSSARY.href)}
              className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 ease-brand hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {pick(GLOSSARY.cta, locale)}
              <span aria-hidden="true">&#8594;</span>
            </Link>
          </p>
        </div>

        <ul className="flex list-none flex-col border-t border-border p-0">
          {GLOSSARY_SAMPLE.map((term) => (
            <li
              key={term.en}
              className="border-b border-border py-3 font-display body-lead font-bold leading-snug text-foreground"
            >
              {pick(term, locale)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
