import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TECHNICAL_DOCS, TECHNICAL_DOCS_SECTION, resourceHref } from "./content";

/**
 * TECHNICAL DOCUMENTS — the source's instruction is explicit: "keep these
 * visibly separate from thought leadership… use a different card style,
 * more document-like and less editorial."
 *
 * So: no rounded editorial cards, no lift-on-hover, no excerpt voice. One
 * bordered frame containing three flush rows separated by hairlines, each
 * opening with a monospace document code (DOC-01…03) in a fixed-width
 * column. It reads as a controlled document register, which is what a
 * technical evaluator arriving for a spec expects to be looking at, and it
 * is the only block on this page with no card radius of its own.
 *
 * THIS SECTION CARRIES THE #technical-documents ANCHOR that the fourth
 * "choose your path" card points at — that card has three destinations
 * rather than one, so it routes here instead of guessing which of the
 * three the reader wants.
 *
 * Three items, not two: Air-Gapped Deployments is the third, alongside the
 * Product Sheet and the Technical Specification.
 */
export function ResourcesTechnicalDocs({ locale }: { locale: Locale }) {
  return (
    <section
      id="technical-documents"
      aria-labelledby="technical-documents-heading"
      className="mt-14 border-t border-border pt-10"
    >
      <h2 id="technical-documents-heading" className="h-sub">
        {pick(TECHNICAL_DOCS_SECTION.h2, locale)}
      </h2>
      <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
        {pick(TECHNICAL_DOCS_SECTION.lead, locale)}
      </p>

      <ul className="mt-8 flex list-none flex-col gap-px overflow-hidden rounded-md border border-border bg-border p-0">
        {TECHNICAL_DOCS.map((doc) => (
          <li key={doc.id}>
            <Link
              href={resourceHref(locale, doc.href, doc.enOnly)}
              hrefLang={doc.enOnly ? "en" : undefined}
              className="group flex flex-col gap-3 bg-card px-5 py-6 outline-ring transition-colors duration-200 ease-brand hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 motion-reduce:transition-none sm:flex-row sm:gap-8 sm:px-7"
            >
              <span className="mono-label w-20 shrink-0 pt-1 text-primary-ink" aria-hidden="true">
                {doc.code}
              </span>
              <div className="flex-1">
                <h3 className="font-display body-lead font-bold leading-snug text-foreground transition-colors duration-150 ease-brand group-hover:text-primary-ink">
                  {pick(doc.name, locale)}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-muted-foreground">
                  &ldquo;{pick(doc.question, locale)}&rdquo;
                </p>
                <p className="prose-measure mt-3 body-copy leading-relaxed text-muted-foreground">
                  {pick(doc.body, locale)}
                </p>
              </div>
              <span className="mono-label shrink-0 self-end text-muted-foreground transition-colors duration-200 ease-brand group-hover:text-primary-ink motion-reduce:transition-none sm:self-center">
                Open <span aria-hidden="true">&#8594;</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
