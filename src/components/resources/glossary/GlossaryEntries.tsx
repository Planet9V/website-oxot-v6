import { Fragment } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { formatDate, pick, type Bilingual } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { FIELD_LABELS, type GlossaryEntry } from "./content";
import { letterGroups } from "./grouping";

/**
 * THE ENTRIES. A real definition list — <dl> / <dt> / <dd> — because that
 * is what this is, and because it means a screen-reader user is told how
 * many terms the list holds and can move term to term through it.
 * Rendered as a stack of cards it would be a stack of cards.
 *
 * THE SPLIT: the <dl> is a two-column grid at lg, <dt> left and <dd>
 * right. The term, its aliases, the standards it belongs to and its
 * review date all live in the left rail — everything a reader uses to
 * decide "is this the entry I want" — and the prose lives on the right.
 * Someone scanning for one term then reads a narrow column of terms
 * rather than the left edge of fifteen paragraphs.
 *
 * The fields keep the spec's own order (definition, why it matters, OXOT
 * context, example, related resources) and each keeps its label: the
 * value of a fixed template is that a reader learns it once and can skip
 * straight to the field they came for in every entry after. The
 * definition is set larger than the rest — it is the answer, and the
 * fields under it are the reasons.
 *
 * Optional fields are dropped rather than rendered empty. An "Example"
 * label sitting over nothing is worse than no example.
 */
function Field({ label, body, locale, lead }: { label: Bilingual; body: Bilingual; locale: Locale; lead?: boolean }) {
  return (
    <div>
      <p className="mono-label">{pick(label, locale)}</p>
      <p
        className={
          lead
            ? "mt-1.5 body-lead leading-relaxed text-foreground"
            : "mt-1.5 body-copy leading-relaxed text-muted-foreground"
        }
      >
        {pick(body, locale)}
      </p>
    </div>
  );
}

function Entry({ entry, locale }: { entry: GlossaryEntry; locale: Locale }) {
  return (
    <Fragment>
      <dt id={entry.id} className="scroll-mt-24 border-t-2 border-primary/50 pt-4 lg:border-t lg:border-border">
        <span className="h-card block text-foreground">{pick(entry.term, locale)}</span>

        {entry.aka && (
          <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
            <span className="mono-label">{pick(FIELD_LABELS.alsoKnownAs, locale)}</span> {entry.aka.join(" · ")}
          </span>
        )}

        {entry.standards && (
          <span className="mt-4 block">
            <span className="mono-label">{pick(FIELD_LABELS.standards, locale)}</span>
            <span className="mt-1.5 flex flex-wrap gap-1.5">
              {entry.standards.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </span>
          </span>
        )}

        <span className="mono-label mt-4 block">
          {pick(FIELD_LABELS.reviewed, locale)} {formatDate(entry.reviewed, locale)}
        </span>
      </dt>

      {/* mt-4 only below lg: stacked, the <dd> would otherwise start
          immediately under the review date with no gap between them. At lg
          the two are side by side and share the rule instead. */}
      <dd className="mt-4 mb-4 ml-0 space-y-5 border-b border-border pb-10 lg:mt-0 lg:mb-0 lg:border-t lg:pt-4">
        <Field label={FIELD_LABELS.definition} body={entry.definition} locale={locale} lead />
        <Field label={FIELD_LABELS.why} body={entry.why} locale={locale} />
        {entry.oxot && <Field label={FIELD_LABELS.oxot} body={entry.oxot} locale={locale} />}

        {entry.example && (
          <div className="border-l-2 border-primary/40 pl-4">
            <p className="mono-label">{pick(FIELD_LABELS.example, locale)}</p>
            <p className="mt-1.5 body-copy leading-relaxed text-foreground">{pick(entry.example, locale)}</p>
          </div>
        )}

        {entry.related && (
          <div>
            <p className="mono-label">{pick(FIELD_LABELS.related, locale)}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
              {entry.related.map((r) => (
                <li key={r.path}>
                  <Link
                    href={localePath(locale, r.path)}
                    className="text-sm text-primary-ink underline underline-offset-4 transition-opacity duration-150 ease-brand hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {pick(r.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </dd>
    </Fragment>
  );
}

export function GlossaryEntries({ locale }: { locale: Locale }) {
  const groups = letterGroups();

  return (
    <div className="mt-16">
      {groups.map((g) => (
        <section key={g.id} aria-labelledby={g.id} className="mt-12 first:mt-0">
          {/* The letter is a heading, so its entries form a real
              subsection — but "B" on its own tells a screen-reader user
              nothing, hence the spelled-out label beside the mark. */}
          <h2 id={g.id} className="flex scroll-mt-24 items-baseline gap-4 border-b border-border pb-2">
            <span aria-hidden="true" className="font-serif text-4xl leading-none text-primary-ink">
              {g.letter}
            </span>
            <span className="sr-only">{pick(FIELD_LABELS.termsBeginning, locale)} {g.letter}</span>
            <Link
              href="#glossary-index"
              className="mono-label ml-auto transition-colors duration-150 ease-brand hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              &#8593; {pick(FIELD_LABELS.backToIndex, locale)}
            </Link>
          </h2>

          <dl className="mt-8 grid gap-x-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
            {g.entries.map((e) => (
              <Entry key={e.id} entry={e} locale={locale} />
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
