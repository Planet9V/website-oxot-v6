import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CLAUSES, HERO } from "./content";
import { ELEV_1, SpecRow, StageChain } from "./page-kit";

/**
 * The document masthead. Not a hero: a standard record (designation, title,
 * domain, related standards, what OXOT's role actually is) beside the
 * argument and the lifecycle spine, with the clause register underneath it.
 *
 * The register's links are same-page anchors, so they are plain `<a>`. The
 * no-html-link-for-pages rule is about route navigation; a `#` fragment is
 * not a route, and routing a fragment through next/link would remount the
 * page to scroll it.
 */
export function Masthead({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">
        {pick(HERO.kicker, locale)} &middot; {pick(HERO.standard, locale)}
      </p>
      <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>

      <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
        <div>
          <p className="prose-measure text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
          <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{pick(HERO.leadTwo, locale)}</p>
          <div className="mt-8">
            <StageChain items={HERO.chain.map((c) => pick(c, locale))} label="The RAMS lifecycle, end to end" />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <dl className={`rounded-2xl border border-border bg-card px-5 py-5 ${ELEV_1}`}>
            {HERO.spec.map((row) => (
              <SpecRow key={row.k.en} k={pick(row.k, locale)}>
                {pick(row.v, locale)}
              </SpecRow>
            ))}
          </dl>

          <nav aria-label="Contents" className="mt-6 rounded-2xl border border-border bg-muted px-5 py-5">
            <p className="mono-label text-muted-foreground">Contents</p>
            <ol className="m-0 mt-3.5 list-none space-y-2 p-0">
              {CLAUSES.map((c) => (
                <li key={c.id} className="grid grid-cols-[1.75rem_1fr] items-baseline gap-2">
                  <span aria-hidden="true" className="font-mono text-[11px] font-bold tracking-[0.1em] text-primary-ink">
                    {c.n}
                  </span>
                  <a
                    href={`#${c.id}`}
                    className="text-sm leading-snug text-foreground no-underline transition-colors duration-150 ease-brand hover:text-primary-ink"
                  >
                    {pick(c.title, locale)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}
