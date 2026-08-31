import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { PATHS, localePath } from "@/components/shell/nav";
import { CLOSING, HERO, LIMITS, WORKED, clause } from "./content";
import { Ask, Cascade, ELEV_1, Onward, Pull, SectionHead } from "./page-kit";

/**
 * Clauses 10–11 and the page's single ask: the worked vendor-access
 * scenario, the boundaries of what OXOT actually does, and the onward
 * links.
 *
 * THE BOUNDARIES CLAUSE IS NOT A DISCLAIMER FOOTER. It is set at full
 * weight, immediately before the ask, because on an assurance page the
 * reader most worth keeping is the one checking whether we are claiming to
 * be an assessor. We are not, and saying so plainly is the more credible
 * position — not fine print to be got past.
 *
 * TS 50701 IS CROSS-LINKED, and this is the one link on the page that has to
 * be justified rather than assumed: both standards are railway, they run
 * over the same lifecycle, and clause 02 has already told the reader they
 * answer different questions. `/assurance/ts-50701` is composed from
 * `PATHS.assurance` rather than added to nav.ts, which is not this page's
 * file to edit.
 *
 * The /assurance overview is still EN-only (its own `locale !== "en"`
 * guard), so an NL reader is sent to /consulting instead of a deliberate
 * 404 — the same fallback the rail industry page uses for the same reason.
 */
export function Closing({ locale }: { locale: Locale }) {
  const c10 = clause("worked");
  const c11 = clause("limits");

  const assuranceHref = locale === "en" ? localePath("en", PATHS.assurance) : localePath("nl", PATHS.consulting);
  const ts50701Href = `${localePath(locale, PATHS.assurance)}/ts-50701`;
  const railHref = `${localePath(locale, PATHS.industries)}/rail-transportation`;

  return (
    <>
      <section aria-labelledby={c10.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c10.id} n={c10.n} clause={pick(c10.title, locale)} heading={pick(WORKED.h2, locale)} />
        <p className="mono-label mt-6 text-muted-foreground">{pick(WORKED.note, locale)}</p>
        <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">{pick(WORKED.body, locale)}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-12">
          <Cascade
            items={WORKED.chain.map((s) => ({ stage: pick(s.stage, locale), detail: pick(s.detail, locale) }))}
            label={pick(WORKED.chainHead, locale)}
          />
          <div>
            <h3 className="h-micro">{pick(WORKED.resultHead, locale)}</h3>
            <ul className="m-0 mt-4 list-none space-y-3 p-0">
              {WORKED.results.map((r) => (
                <li key={r.en} className="grid grid-cols-[0.5rem_1fr] items-baseline gap-3">
                  <span aria-hidden="true" className="block size-2 rounded-full bg-primary" />
                  <span className="body-copy leading-relaxed text-foreground">{pick(r, locale)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Pull>{pick(WORKED.pull, locale)}</Pull>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby={c11.id} className="mt-16 border-t border-border pt-10">
        <SectionHead id={c11.id} n={c11.n} clause={pick(c11.title, locale)} heading={pick(LIMITS.h2, locale)} />
        <p className="prose-measure mt-7 body-lead leading-relaxed text-muted-foreground">{pick(LIMITS.body, locale)}</p>
        <ul className="m-0 mt-6 grid list-none gap-3 p-0 lg:grid-cols-2">
          {LIMITS.items.map((item) => (
            <li
              key={item.en}
              className="rounded-xl border border-border bg-muted px-4 py-3.5 body-copy leading-relaxed text-foreground"
            >
              {pick(item, locale)}
            </li>
          ))}
        </ul>
        <div className="mt-9">
          <Pull>{pick(LIMITS.close, locale)}</Pull>
        </div>
      </section>

      <section aria-labelledby="closing" className="mt-16 border-t border-border pt-10">
        <h2 id="closing" className="h-sub">
          {pick(CLOSING.h2, locale)}
        </h2>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
          <div>
            <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{pick(CLOSING.body, locale)}</p>
            <div className="mt-8">
              <Ask href={localePath(locale, PATHS.contact)} fine={pick(CLOSING.fine, locale)}>
                {pick(CLOSING.ctaPrimary, locale)}
              </Ask>
            </div>
          </div>

          <div className={`rounded-2xl border border-border bg-card px-5 py-5 ${ELEV_1}`}>
            <p className="mono-label text-muted-foreground">{pick(CLOSING.onwardHead, locale)}</p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-3.5 p-0">
              <li>
                <Onward href={ts50701Href}>TS 50701 — railway cybersecurity</Onward>
              </li>
              <li>
                <Onward href={railHref}>Rail &amp; Transportation</Onward>
              </li>
              <li>
                <Onward href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Onward>
              </li>
              <li>
                <Onward href={assuranceHref}>Assurance overview</Onward>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
