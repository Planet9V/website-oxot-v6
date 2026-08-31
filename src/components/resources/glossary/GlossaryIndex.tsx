import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { HERO } from "./content";
import { letterGroups } from "./grouping";

/**
 * THE INSTRUMENT. A glossary's index is not decoration wrapped around the
 * content — for the reader this page exists for, who arrived from another
 * page holding one unfamiliar word, the index *is* the page and
 * everything below it is the answer they jump to.
 *
 * So it is a real index rather than an A–Z strip alone: the letter rail
 * gets a reader to the neighbourhood, and the full term list below it
 * gets them to the entry in one click. A bare strip of letters would have
 * made them guess which letter their word files under and then scan for
 * it — two steps to do what one can, and worse here than it sounds, since
 * many of these terms are acronyms whose initial is not obvious until you
 * already know what it stands for.
 *
 * Same-page anchors, so it works with JavaScript unavailable and the back
 * button returns the reader here rather than to the page they came from —
 * for a lookup, that is the behaviour you want.
 */
const TERM_LINK =
  "block border-b border-border/60 py-2 text-sm leading-snug transition-colors duration-150 ease-brand hover:border-primary-ink hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const LETTER_LINK =
  "flex h-8 w-8 items-center justify-center rounded-md border border-border font-mono text-sm text-muted-foreground transition-colors duration-150 ease-brand hover:border-primary hover:bg-accent hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function GlossaryIndex({ locale }: { locale: Locale }) {
  const groups = letterGroups();

  return (
    <nav aria-labelledby="glossary-index" className="mt-14 border-t border-border pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="glossary-index" className="h-micro">
          {pick(HERO.indexHead, locale)}
        </h2>
        <p className="mono-label">{pick(HERO.indexNote, locale)}</p>
      </div>

      {/* The letter rail. Few enough targets to read as a rule of type
          across the top rather than a row of buttons. */}
      <ul className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-2">
        {groups.map((g) => (
          <li key={g.id}>
            <Link href={`#${g.id}`} className={LETTER_LINK}>
              {g.letter}
            </Link>
          </li>
        ))}
      </ul>

      {/* Every term, in columns. `columns-*` rather than a grid: this is
          one alphabetical sequence and should stay readable down each
          column, which is what a multi-column flow does and a grid's
          row-major order does not. */}
      <ul className="mt-6 gap-x-10 sm:columns-2 lg:columns-3">
        {groups.flatMap((g) =>
          g.entries.map((e) => (
            <li key={e.id} className="break-inside-avoid">
              <Link href={`#${e.id}`} className={TERM_LINK}>
                <span aria-hidden="true" className="mr-2 font-mono text-xs text-muted-foreground">
                  {g.letter}
                </span>
                {pick(e.term, locale)}
              </Link>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
}
