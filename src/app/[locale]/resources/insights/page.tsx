import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { hasLocale } from "@/i18n/config";
import { fmt, pick, type Bilingual } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { getSection } from "@/components/longform/content";

/**
 * /resources/insights — the Insight index.
 *
 * The articles are markdown under `content/insights/`, read by the shared
 * long-form engine (src/components/longform/content.ts) with the new section
 * key "insights". No new plumbing: the same `getSection` / `getDoc` /
 * `getSlugs` that /reference and /case-studies already use.
 *
 * WHY THIS IS NOT /reference's CARD GRID. Reference is five standing documents
 * a reader arrives at knowing which one they want — a grid is a shelf, and a
 * shelf is right for that. Insights is a dated series that grows, where the
 * useful signals are order, recency and what each piece argues. So it reads as
 * a numbered editorial list at full measure: one row per article, the argument
 * visible before the click. Same tokens, different shape, per the house rule
 * that two sections of similar content should not share one template.
 *
 * Copy is `Bilingual` and local rather than in the shared dictionary — `nav`
 * and `en.ts`/`nl.ts` have no Insights keys and adding them would mean editing
 * two files this task does not own. `nl` holds the English string as an honest
 * placeholder pending translation, the same convention as the Industries,
 * Decisions and Assurance pages.
 */
function same(en: string): Bilingual {
  return { en, nl: en };
}

const META = {
  title: "Insights — question-led technical articles on OT security and assurance | OXOT",
  description:
    "Ungated, research-backed articles on OT cybersecurity, standards and cyber-physical risk. Each one answers a question an engineer, CISO or safety lead actually asked, with primary sources and a revision date."
};

const COPY = {
  kicker: same("Resources · Insights"),
  heading: same("Insights"),
  lede: same(
    "Research-backed, question-led technical articles. Each one answers a question somebody actually asked — about a standard, an architecture decision, or a risk that is harder to reason about than it looks — and stays useful whether or not you ever talk to us."
  ),
  /* {count} and {words} are filled from the corpus itself, so the line cannot
     drift out of step with what is published. */
  weight: same("{count} articles · {words} words · ungated"),
  ruleHeading: same("What an Insight has to do"),
  rule: [
    same("Name the decision it helps you make."),
    same("Say what evidence or system context that decision needs."),
    same("Show where a Cyber Digital Twin adds something a document cannot.")
  ],
  ruleNote: same(
    "Every article carries its sources and a revision date, and is updated when the standard underneath it moves. The OXOT view sits near the end, not in the opening paragraph."
  ),
  empty: same("No Insights are published yet in this language.")
};

export async function generateMetadata(
  props: PageProps<"/[locale]/resources/insights">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATHS.resourcesInsights)
  };
}

export default async function InsightsIndex(props: PageProps<"/[locale]/resources/insights">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  const docs = await getSection("insights", locale);
  const totalWords = docs.reduce((n, x) => n + x.words, 0);
  const numbers = locale === "nl" ? "nl-NL" : "en-GB";

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(COPY.heading, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.resources), label: "Resources" }]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{pick(COPY.kicker, locale)}</p>
        <h1 className="mt-4">{pick(COPY.heading, locale)}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
          {pick(COPY.lede, locale)}
        </p>
        <p className="mono-label mt-6 text-muted-foreground">
          {fmt(pick(COPY.weight, locale), {
            count: docs.length,
            words: totalWords.toLocaleString(numbers)
          })}
        </p>
      </header>

      {docs.length === 0 ? (
        <p className="mt-12 border-t border-border pt-10 text-muted-foreground">
          {pick(COPY.empty, locale)}
        </p>
      ) : (
        <ol className="mt-12 list-none border-t border-border p-0">
          {docs.map((doc, i) => (
            <li key={doc.slug} className="border-b border-border">
              <Link
                href={localePath(locale, `${PATHS.resourcesInsights}/${doc.slug}`)}
                className="group grid gap-x-8 gap-y-3 py-8 outline-ring transition-colors duration-200 ease-brand hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none sm:grid-cols-[3rem_minmax(0,1fr)] lg:py-10"
              >
                <span
                  aria-hidden="true"
                  className="mono-label pt-1 text-muted-foreground transition-colors duration-200 group-hover:text-primary-ink group-focus-visible:text-primary-ink motion-reduce:transition-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="block min-w-0">
                  <span className="block max-w-[34ch] font-display text-[1.375rem] font-bold leading-snug text-foreground lg:text-[1.625rem]">
                    {doc.title}
                  </span>
                  {doc.excerpt ? (
                    <span className="prose-measure mt-4 block leading-relaxed text-muted-foreground">
                      {doc.excerpt}
                    </span>
                  ) : null}
                  <span className="mono-label mt-6 flex flex-wrap gap-x-5 gap-y-1 text-muted-foreground transition-colors duration-200 group-hover:text-primary-ink group-focus-visible:text-primary-ink motion-reduce:transition-none">
                    <span>{fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}</span>
                    <span>{fmt(d.longform.words, { words: doc.words.toLocaleString(numbers) })}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      {/* The standard the articles are held to, stated where a reader can see
          it before spending twenty minutes on one. Source: the Insight format
          brief's own "OXOT content rule". */}
      <section className="mt-14 rounded-2xl border border-border bg-card p-6 lg:p-8">
        <h2 className="h-sub">{pick(COPY.ruleHeading, locale)}</h2>
        <ol className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-muted-foreground">
          {COPY.rule.map((line) => (
            <li key={line.en}>{pick(line, locale)}</li>
          ))}
        </ol>
        <p className="prose-measure mt-5 body-copy leading-relaxed text-muted-foreground">
          {pick(COPY.ruleNote, locale)}
        </p>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
