import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { HERO } from "./content.hero";
import { SERVICES_A, SERVICES_INTRO, type ConsultingService } from "./content.services.a";
import { SERVICES_B } from "./content.services.b";

/**
 * The page's opening — one section carrying the promise, the method, the Twin,
 * and the six services (owner, 2026-08-31).
 *
 * WHY THESE WERE MERGED. The hero and "Six services. One operating model." each
 * ended on the same claim — that the Cyber Digital Twin is what makes the work
 * compound — so the page stated its thesis twice, weaker each time, with a
 * section break between them. Merged, the two build instead of repeat: the Twin
 * paragraph says WHAT the Twin does, the services lead says EVERY engagement
 * feeds it. Mechanism, then compounding.
 *
 * THE TWIN IS AN ENABLER, NEVER A DESTINATION. `HERO.heading` previously sat
 * under the h1 as a second headline — the "two equally large headlines" defect
 * in `OXOT_Visual_Rules.md` L11 — and a hero CTA read "Explore the Cyber
 * Digital Twin", which made the Twin a door competing with consulting on the
 * consulting page. The heading is now the hinge between method and mechanism,
 * and the Twin appears only inside a sentence about what consulting produces.
 *
 * NO CTAs IN THE OPENING (owner). Both hero buttons are gone. The page's single
 * ask is `FinalCta` at the foot, so the page earns the request rather than
 * opening with it — and L12 allows one primary CTA, not two before any claim.
 *
 * THE FOUR-NODE CHAIN IS DELETED (owner, 2026-08-31). `HERO.flow` rendered as a
 * bare bullet list in a right-hand column: the spec's own argument (L57-65)
 * shown as four unexplained nouns, which read as a feature list because nothing
 * said it was a sequence. Removed rather than redrawn — the page already
 * carries two sequences (the engagement steps and the outcome chains), and a
 * third near the top was monotony. `HERO.flow` stays in the content file as the
 * record of L57-65 and is deliberately not rendered.
 *
 * SIX CARDS AGAINST RULE 13. L13 bars "more than three visually equal cards".
 * These clear it as an index rather than a pitch: one heading is the section's
 * focal element and the six are a single directory beneath it — quiet, no fill,
 * no accent panel, no per-card button, each carrying a jump rather than an ask.
 * Six filled tiles each with its own CTA would be the failure the rule names.
 */
const SERVICES: readonly ConsultingService[] = [...SERVICES_A, ...SERVICES_B];

export function Hero({ locale }: { locale: Locale }) {
  const t = HERO;

  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">Consulting</p>

      <h1 className="h-page mt-4">{pick(t.h1, locale)}</h1>

      <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground">
        {pick(t.lede, locale)}
      </p>

      {/* The method — what makes the work engineering-led, stated before any
          mention of the product that carries it. */}
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.body[0], locale)}
      </p>

      {/* THE HINGE. Demoted from a second h1-scale headline to the statement it
          always was, and paid off immediately by the sentence explaining the
          mechanism. This pair is the page's thesis. */}
      <div className="mt-10 border-l-2 border-primary pl-5 sm:pl-6">
        <p className="h-sub text-foreground">{pick(t.heading, locale)}</p>
        <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
          {pick(t.body[1], locale)}
        </p>
      </div>

      {/* The services, as the next movement of this same section — `h-sub`, not
          `h-section`, and no kicker, so it does not read as a new section. */}
      <h2 id={SERVICES_INTRO.sectionId} className="h-sub mt-14 text-foreground">
        {pick(SERVICES_INTRO.h2, locale)}
      </h2>
      <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
        {pick(SERVICES_INTRO.lead, locale)}
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <li key={service.id} className="bg-card">
            <Link
              href={`#${service.id}`}
              className="group flex h-full flex-col p-6 no-underline transition-colors duration-150 ease-brand hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:p-7"
            >
              <span className="mono-label text-primary-ink">{service.index}</span>
              <span className="h-card mt-2 block text-foreground">
                {pick(service.title, locale)}
              </span>
              <span className="mt-3 block body-copy leading-relaxed text-muted-foreground">
                {pick(service.lead, locale)}
              </span>
              <span
                aria-hidden="true"
                className="mt-auto pt-6 text-sm text-primary-ink transition-transform duration-150 ease-brand group-hover:translate-x-0.5"
              >
                &#8594;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
