import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { hasLocale } from "@/i18n/config";
import { fmt, pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { getSection } from "@/components/longform/content";
import {
  BREADCRUMB,
  CLOSING,
  ENTRIES,
  HERO,
  META,
  SECTIONS
} from "@/components/resources/guides-briefings/content";

/* The owner added the real /resources entries to nav.ts's PATHS on
   2026-08-23, mid-session. This page originally held its own locale-free
   literal (and components/resources/index/content.ts a local RESOURCE_PATHS
   map) only because neither existed yet; both are now redundant, and
   RESOURCE_PATHS is gone. Reading PATHS is the point of that file — a second
   copy of the string here is exactly the drift it exists to prevent. */
const PATH = PATHS.resourcesGuidesBriefings;

export async function generateMetadata(
  props: PageProps<"/[locale]/resources/guides-briefings">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return { title: META.title, description: META.description, alternates: localeAlternates(locale, PATH) };
}

/**
 * /resources/guides-briefings — the index for the section's two long-form
 * formats.
 *
 * THE LAYOUT ARGUES THE FORMAT SPEC RATHER THAN LISTING ITS OUTPUT. The
 * source (resources-format-guides-briefings.md) is emphatic that a Guide and
 * a Briefing are different things for different people, and the failure mode
 * for an index page is to reduce that to two identical cards with different
 * titles. So the page is two sections with two card shapes:
 *
 *   Guide     — a diptych. The framing on the left, and on the right the
 *               nine-step method spine as an ordered list, so the reader can
 *               see the shape of the work before committing to the read.
 *   Briefing  — a single column opening on the decision sentence, set as a
 *               ruled pull-quote. A board reader's first question is "what
 *               am I deciding", so that sentence is the largest thing in the
 *               card, and the three options sit under it as a row.
 *
 * Neither shape would work for the other document, which is the point.
 *
 * READS THE DOCUMENTS RATHER THAN RESTATING THEM. Title, excerpt, word count
 * and reading time come from getSection() — the same long-form loader
 * /reference and /resources/insights use — so a card cannot drift out of
 * step with the markdown it links to. Only the things markdown cannot
 * express (format, audience, the method spine, the decision sentence) live
 * in the local registry.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Each document has a
 * .nl.md carrying a Dutch not-yet-translated banner above the English body,
 * the convention /resources/insights set this session. That is also why
 * components/resources/index/content.ts's GUIDES entry has no `enOnly` flag:
 * a Dutch reader arriving from the shelf gets a Dutch-locale route.
 */
export default async function GuidesBriefingsIndex(
  props: PageProps<"/[locale]/resources/guides-briefings">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  const docs = await getSection("guides-briefings", locale);
  const bySlug = new Map(docs.map((doc) => [doc.slug, doc]));

  const guides = ENTRIES.filter((e) => e.format === "guide");
  const briefings = ENTRIES.filter((e) => e.format === "briefing");

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.resources), label: pick(BREADCRUMB.section, locale) }]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{pick(HERO.kicker, locale)}</p>
        <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
        <p className="mt-8 max-w-[52ch] border-l-2 border-primary pl-5 font-display text-[1.25rem] leading-snug text-foreground">
          {pick(HERO.rule, locale)}
        </p>
      </header>

      {/* ── Guides ─────────────────────────────────────────────────────────
          The diptych: framing on the left, method spine on the right. */}
      <section aria-labelledby="guides" className="mt-16 border-t border-border pt-10">
        <p className="oxot-kicker">{pick(SECTIONS.guide.eyebrow, locale)}</p>
        <h2 id="guides" className="h-section mt-4">
          {pick(SECTIONS.guide.h2, locale)}
        </h2>
        <p className="prose-measure mt-5 leading-relaxed text-muted-foreground">{pick(SECTIONS.guide.dek, locale)}</p>

        <ul className="mt-10 grid list-none gap-6 p-0">
          {guides.map((entry) => {
            const doc = bySlug.get(entry.slug);
            if (!doc) return null;
            return (
              <li key={entry.slug}>
                <article className="grid gap-8 rounded-2xl border border-border bg-card p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12 lg:p-8">
                  <div className="min-w-0">
                    <p className="mono-label inline-block rounded-full border border-primary/45 px-3 py-1 text-primary-ink">
                      {pick(SECTIONS.guide.badge, locale)}
                    </p>

                    <h3 className="h-sub mt-5">
                      <Link
                        href={localePath(locale, `${PATH}/${entry.slug}`)}
                        className="text-foreground no-underline outline-ring transition-colors duration-200 ease-brand hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
                      >
                        {doc.title}
                      </Link>
                    </h3>

                    {doc.excerpt ? (
                      <p className="mt-4 leading-relaxed text-muted-foreground">{doc.excerpt}</p>
                    ) : null}

                    <dl className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                      <div>
                        <dt className="mono-label text-muted-foreground">
                          {pick(SECTIONS.guide.decisionLabel, locale)}
                        </dt>
                        <dd className="mt-2 body-copy leading-relaxed text-foreground">
                          {pick(entry.decision, locale)}
                        </dd>
                      </div>
                      <div>
                        <dt className="mono-label text-muted-foreground">
                          {pick(SECTIONS.guide.audienceLabel, locale)}
                        </dt>
                        <dd className="mt-2 body-copy leading-relaxed text-muted-foreground">
                          {pick(entry.audience, locale)}
                        </dd>
                      </div>
                    </dl>

                    <p className="mono-label mt-6 flex flex-wrap gap-x-5 gap-y-1 text-muted-foreground">
                      <span>{fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}</span>
                      <span>
                        {fmt(d.longform.words, {
                          words: doc.words.toLocaleString(locale === "nl" ? "nl-NL" : "en-GB")
                        })}
                      </span>
                    </p>

                    <p className="mono-label mt-5">
                      <Link
                        href={localePath(locale, `${PATH}/${entry.slug}`)}
                        className="border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
                      >
                        {pick(SECTIONS.guide.read, locale)} <span aria-hidden="true">&#8594;</span>
                      </Link>
                    </p>
                  </div>

                  {/* The spine. A reader deciding whether to spend twenty
                      minutes wants the shape of the method, not a promise
                      that there is one. */}
                  {entry.spine ? (
                    <div className="min-w-0 rounded-xl border border-border bg-muted p-5">
                      <p className="mono-label text-muted-foreground">{pick(SECTIONS.guide.spineLabel, locale)}</p>
                      <ol className="mt-4 list-none space-y-2.5 p-0">
                        {entry.spine.map((step, i) => (
                          <li key={pick(step, "en")} className="flex gap-3 body-copy leading-snug">
                            <span className="mono-label shrink-0 tabular-nums text-primary-ink">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-muted-foreground">{pick(step, locale)}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Briefings ──────────────────────────────────────────────────────
          The decision sentence first, at the largest size in the card. */}
      <section aria-labelledby="briefings" className="mt-16 border-t border-border pt-10">
        <p className="oxot-kicker">{pick(SECTIONS.briefing.eyebrow, locale)}</p>
        <h2 id="briefings" className="h-section mt-4">
          {pick(SECTIONS.briefing.h2, locale)}
        </h2>
        <p className="prose-measure mt-5 leading-relaxed text-muted-foreground">
          {pick(SECTIONS.briefing.dek, locale)}
        </p>

        <ul className="mt-10 grid list-none gap-6 p-0">
          {briefings.map((entry) => {
            const doc = bySlug.get(entry.slug);
            if (!doc) return null;
            return (
              <li key={entry.slug}>
                <article className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <p className="mono-label inline-block rounded-full border border-secondary/45 px-3 py-1 text-secondary">
                      {pick(SECTIONS.briefing.badge, locale)}
                    </p>
                    <p className="mono-label text-muted-foreground">{pick(entry.audience, locale)}</p>
                  </div>

                  <h3 className="h-sub mt-5">
                    <Link
                      href={localePath(locale, `${PATH}/${entry.slug}`)}
                      className="text-foreground no-underline outline-ring transition-colors duration-200 ease-brand hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
                    >
                      {doc.title}
                    </Link>
                  </h3>

                  {entry.sentence ? (
                    <figure className="mt-6 border-l-2 border-secondary pl-5">
                      <figcaption className="mono-label text-muted-foreground">
                        {pick(SECTIONS.briefing.sentenceLabel, locale)}
                      </figcaption>
                      <blockquote className="mt-3 max-w-[46ch] font-display text-[1.375rem] leading-snug text-foreground">
                        {pick(entry.sentence, locale)}
                      </blockquote>
                    </figure>
                  ) : null}

                  {entry.options ? (
                    <div className="mt-8 border-t border-border pt-6">
                      <p className="mono-label text-muted-foreground">{pick(SECTIONS.briefing.optionsLabel, locale)}</p>
                      <ul className="mt-4 grid list-none gap-3 p-0 md:grid-cols-3">
                        {entry.options.map((option) => (
                          <li
                            key={pick(option, "en")}
                            className="rounded-xl border border-border bg-muted px-4 py-3 body-copy leading-snug text-muted-foreground"
                          >
                            {pick(option, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* The decision sentence above already states what this
                      briefing decides, so the meta row carries only the cost
                      of reading it. */}
                  <p className="mono-label mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-muted-foreground">
                    <span>{fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}</span>
                    <span>
                      {fmt(d.longform.words, {
                        words: doc.words.toLocaleString(locale === "nl" ? "nl-NL" : "en-GB")
                      })}
                    </span>
                    <Link
                      href={localePath(locale, `${PATH}/${entry.slug}`)}
                      className="border-b border-secondary/45 font-bold text-secondary no-underline transition-colors duration-150 ease-brand hover:border-secondary"
                    >
                      {pick(SECTIONS.briefing.read, locale)} <span aria-hidden="true">&#8594;</span>
                    </Link>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="gating" className="mt-16 border-t border-border pt-10">
        <h2 id="gating" className="h-card">
          {pick(CLOSING.h2, locale)}
        </h2>
        <p className="prose-measure mt-4 leading-relaxed text-muted-foreground">{pick(CLOSING.body, locale)}</p>
        <p className="mono-label mt-5 max-w-[68ch] text-muted-foreground">{pick(CLOSING.note, locale)}</p>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
