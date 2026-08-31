"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { same } from "../registry";
import { Datum } from "./Rule";
import { FINAL_CTA } from "./content";

/**
 * S10 · FINAL CTA AND INTAKE — source L295–L318, header recipe H-D.
 *
 * H-D, NOT A SECTION SHELL. `Rule.tsx` defines this recipe as "the closing route
 * above a framed block" and states it has exactly one caller — this file — which
 * is why the bare `Datum` is consumed directly instead of a fourth shell being
 * exported for a single non-section caller. The run TERMINATES here rather than
 * opening another section, so there is no `SectionA`/`B`/`C` around it.
 *
 * ONE FRAME, NOT TWO. The ask and the intake sit inside a single framed block,
 * split 5/7 across it: the closing argument on the left, the eight things OXOT
 * needs on the right, divided by a hairline that reads as the last tap-off of
 * the page's conductor run. That is deliberately unlike water-wastewater-3's
 * S11, which leaves its ask unframed and frames only the form card — two blocks
 * where the source here writes one closing move. The pages share a data shape,
 * not a composition.
 *
 * THE SECONDARY CTA IS GATED, AND THE GATE IS THE SITE'S EXISTING ONE.
 * `/technical-specification` renders EN only, so `/nl/technical-specification`
 * is a real 404. `EnergyFinalCta.tsx:21` (and Manu/Hyperscale/Rail) resolve this
 * by substituting the HREF rather than dropping the button —
 * `locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2` — and
 * `content.ts` states that requirement in data via `ctaSecondaryEnglishOnly`.
 * Both are honoured below: the flag is READ, not assumed, so clearing it in
 * content.ts the day that page renders `nl` retires the gate without this file
 * being touched.
 *
 * THE FORM IS BUILT WHOLE AND SAYS SO. No submission endpoint exists in this
 * repository. Per the owner's standing rule an unbuilt interactive feature is
 * built complete and visibly placeholdered rather than omitted, so all eight
 * controls are real, labelled and keyboard-operable, `formNote` states the
 * position in the page's own body copy, and NO submit button is rendered — a
 * button that silently discarded the entry would be the dishonest version of
 * the same disclosure. `onSubmit` is still stopped, so no browser can navigate
 * this form anywhere.
 *
 * FIELD ORDER IS THE SOURCE'S (L304–L311): name, email, company, role, energy
 * segment, country/region, approximate scope, decision. Selects and text inputs
 * therefore interleave. Regrouping them into "inputs, then dropdowns" would read
 * tidier and would be this file inventing a question order the brief never
 * wrote.
 *
 * OPTION CASING IS THE SOURCE'S. Two of the three lists are lowercase because
 * the brief writes them that way inline; content.ts documents this at its
 * `energySegmentOptions` declaration and says not to "correct" it. Nothing here
 * title-cases them.
 *
 * ACCESSIBILITY: every text input has a real `<label htmlFor>`. The three Radix
 * selects cannot use one — the trigger is a `<button>`, which `htmlFor` does not
 * name — so each gets `aria-labelledby` pointing at its own visible label. The
 * `<form>` takes its accessible name from `formLabel`, which is real sourced
 * copy, rather than from an invented fieldset legend.
 */

/* Section chrome, not copy: `content.ts` carries no `datumLabel` here and is
   read-only. Its own name for this section, "Final CTA", is production
   vocabulary rather than something to print at a visitor, so the route carries
   what the section is FOR — the same locally-stated-label convention
   Capabilities.tsx and DecisionSwitchboard.tsx use. */
const DATUM_LABEL = same("Start here");

export function IntakeCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;
  const secondaryGated = t.ctaSecondaryEnglishOnly && locale !== "en";
  const secondaryHref = secondaryGated ? PATHS.cdt2 : t.ctaSecondaryHref;

  return (
    <section id="start" aria-labelledby="final-cta-h" className="pt-16 sm:pt-24">
      <Datum index="10" label={DATUM_LABEL} locale={locale} />

      <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="final-cta-h" className="h-section text-balance">
              {pick(t.h2, locale)}
            </h2>
            <p className="mt-5 body-lead leading-relaxed text-muted-foreground">
              {pick(t.body, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="cta-lift">
                <Link href={localePath(locale, t.ctaPrimaryHref)}>{pick(t.ctaPrimary, locale)}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={localePath(locale, secondaryHref)}>{pick(t.ctaSecondary, locale)}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-12">
            <p id="intake-label" className="mono-label text-primary-ink">
              {pick(t.formLabel, locale)}
            </p>

            <form
              aria-labelledby="intake-label"
              /* No endpoint exists. Stopping submission here is what keeps the
                 disclosure below true in every browser. */
              onSubmit={(event) => event.preventDefault()}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <TextField id="eu2-name" label={t.fields.name} autoComplete="name" locale={locale} />
              <TextField
                id="eu2-email"
                type="email"
                label={t.fields.email}
                autoComplete="email"
                locale={locale}
              />
              <TextField
                id="eu2-company"
                label={t.fields.company}
                autoComplete="organization"
                locale={locale}
              />
              <TextField
                id="eu2-role"
                label={t.fields.role}
                autoComplete="organization-title"
                locale={locale}
              />
              <SelectField
                id="eu2-energy-segment"
                label={t.fields.energySegment}
                placeholder={t.fields.choose}
                options={t.energySegmentOptions}
                locale={locale}
              />
              <TextField
                id="eu2-country-region"
                label={t.fields.countryRegion}
                autoComplete="country-name"
                locale={locale}
              />
              <SelectField
                id="eu2-approximate-scope"
                label={t.fields.approximateScope}
                placeholder={t.fields.choose}
                options={t.approximateScopeOptions}
                locale={locale}
              />
              <SelectField
                id="eu2-decision"
                label={t.fields.decision}
                placeholder={t.fields.choose}
                options={t.decisionOptions}
                locale={locale}
              />
            </form>

            {/* On the page, in body copy — not a tooltip, not a source comment. */}
            <p className="mt-8 border-t border-border pt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
              {pick(t.formNote, locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TextField({
  id,
  label,
  locale,
  type = "text",
  autoComplete
}: {
  id: string;
  label: Bilingual;
  locale: Locale;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono-label block">
        {pick(label, locale)}
      </label>
      <Input id={id} name={id} type={type} autoComplete={autoComplete} className="mt-2" />
    </div>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  locale
}: {
  id: string;
  label: Bilingual;
  placeholder: Bilingual;
  options: readonly Bilingual[];
  locale: Locale;
}) {
  return (
    <div>
      <span id={`${id}-label`} className="mono-label block">
        {pick(label, locale)}
      </span>
      <Select name={id}>
        <SelectTrigger id={id} aria-labelledby={`${id}-label`} className="mt-2 w-full">
          <SelectValue placeholder={pick(placeholder, locale)} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.en} value={option.en}>
              {pick(option, locale)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
