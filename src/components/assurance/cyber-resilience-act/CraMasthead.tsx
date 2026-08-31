import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { MASTHEAD, CONTENTS } from "./content";
import { Chain, Ask, Onward } from "./kit";

/**
 * Editorial masthead, not a marketing hero: a kicker, the regulation's own
 * number as a dateline, one h1, two standfirst paragraphs, and a contents
 * list. No product illustration, no animated panel, no stat row — per
 * OXOT_Composition_Rules.md, an assurance page is a reading experience.
 *
 * The contents list is a real anchor list into the twelve section ids, which
 * is the one navigational affordance a document this long genuinely needs.
 */
export function CraMasthead({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="oxot-kicker">{pick(MASTHEAD.kicker, locale)}</p>
        <p className="mono-label text-muted-foreground">{pick(MASTHEAD.regulation, locale)}</p>
      </div>

      <h1 className="h-page mt-5 text-foreground">
        {pick(MASTHEAD.h1, locale)}
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
        <div>
          <p className="prose-measure text-lg leading-relaxed text-foreground">{pick(MASTHEAD.standfirst, locale)}</p>
          <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
            {pick(MASTHEAD.standfirstTwo, locale)}
          </p>

          <Chain
            label="From product boundary to lifecycle evidence"
            steps={MASTHEAD.chain.map((c) => pick(c, locale))}
          />

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Ask href={localePath(locale, PATHS.contact)}>{pick(MASTHEAD.ctaPrimary, locale)}</Ask>
            <Onward href={localePath(locale, PATHS.cdt2)}>{pick(MASTHEAD.ctaSecondary, locale)}</Onward>
          </div>
        </div>

        <nav aria-label="On this page" className="lg:pt-1">
          <p className="mono-label border-b border-border pb-2.5 text-primary-ink">On this page</p>
          <ol className="m-0 mt-3 list-none p-0">
            {CONTENTS.map((c) => (
              <li key={c.id} className="border-b border-dashed border-border last:border-b-0">
                <Link
                  href={`#${c.id}`}
                  className="flex items-baseline gap-3 py-2 body-copy leading-snug text-muted-foreground no-underline transition-colors duration-150 ease-brand hover:text-primary-ink"
                >
                  <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-primary-ink">{c.n}</span>
                  <span>{pick(c.label, locale)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}
