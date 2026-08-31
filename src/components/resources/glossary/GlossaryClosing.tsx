import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { CLOSING } from "./content";

/**
 * The one ask on the page, and deliberately not "book a demo". A reader
 * who came here to look up a word is mid-task on some other page;
 * interrupting that with a sales CTA is how a reference page stops being
 * used as a reference. The only thing worth asking of them is the thing
 * only they know — which term sent them here and did not resolve.
 */
export function GlossaryClosing({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="glossary-gap" className="mt-16 border-t border-border pt-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
        <div>
          <h2 id="glossary-gap" className="h-sub">
            {pick(CLOSING.h2, locale)}
          </h2>
          <p className="prose-measure mt-4 body-copy leading-relaxed text-muted-foreground">
            {pick(CLOSING.body, locale)}
          </p>
        </div>
        <p>
          <Link
            href={localePath(locale, CLOSING.ctaPath)}
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 ease-brand hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {pick(CLOSING.cta, locale)}
            <span aria-hidden="true">&#8594;</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
