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
 * S10 · FINAL CTA AND INTAKE — source L288–L311, header recipe H-D.
 *
 * H-D, NOT A SECTION SHELL. `Rule.tsx` defines this recipe as "the closing line
 * above a framed block" and names exactly one caller — this file — which is why
 * the bare `Datum` is consumed directly rather than a fourth shell being
 * exported for a single non-section caller. The process line TERMINATES here
 * instead of opening another section.
 *
 * THE SECONDARY CTA IS GATED, AND THE GATE IS THE SITE'S EXISTING ONE.
 * `/technical-specification` renders EN only, so `/nl/technical-specification`
 * is a real 404. The established resolution across this site substitutes the
 * HREF rather than dropping the button — `locale === "en" ?
 * PATHS.technicalSpecification : PATHS.cdt2` — and `content.ts` states that
 * requirement in data via `ctaSecondaryEnglishOnly`. The flag is READ, not
 * assumed, so clearing it in content.ts the day that page renders `nl` retires
 * the gate without this file being touched.
 *
 * THE FORM IS BUILT WHOLE AND SAYS SO. No submission endpoint exists in this
 * repository. Per the owner's standing rule an unbuilt interactive feature is
 * built complete and visibly placeholdered rather than omitted, so every control
 * is real, labelled and keyboard-operable, `formNote` states the position in the
 * page's own body copy, and NO submit button is rendered — a button that
 * silently discarded the entry would be the dishonest version of the same
 * disclosure. `onSubmit` is still stopped, so no browser can navigate this form.
 *
 * TWO FIELDS ARE PLAIN TEXT INPUTS, DELIBERATELY. "Manufacturing subsector"
 * (L300) and "Approximate facility or estate scope" (L302) are stated by the
 * brief as bare fields with NO option list — unlike Energy's brief, which
 * enumerates its equivalents inline. content.ts flags this explicitly. Rendering
 * either as a dropdown would require inventing a subsector taxonomy or a set of
 * scope bands, which would be this file fabricating a question the source never
 * asked. They are free text until the source says otherwise. "Decision to
 * evaluate" (L303–L310) is the ONLY enumerated field, and it is the only select.
 *
 * THE OPTIONAL FIELD IS A CHECKBOX BECAUSE THE SOURCE WROTE A YES/NO QUESTION.
 * L311 asks "Do you have a P&ID and asset list available?" and marks it
 * "Optional:". A two-state question is a checkbox, not a dropdown with two
 * invented labels. It is a native `<input type="checkbox">` because this
 * repository has no checkbox primitive in `components/ui` — adding one for a
 * single caller would be a new shared component nobody asked for. `optional` is
 * carried in content.ts as data, so the optional marker below renders from that
 * flag rather than being hard-coded here.
 *
 * ACCESSIBILITY: every text input and the checkbox have a real `<label htmlFor>`.
 * The Radix select cannot — its trigger is a `<button>`, which `htmlFor` does not
 * name — so it gets `aria-labelledby` pointing at its own visible label. The
 * `<form>` takes its accessible name from `formLabel`, which is real sourced
 * copy, rather than from an invented fieldset legend.
 */

/* Section chrome, not copy: `content.ts` carries no `datumLabel` here and is
   read-only. Its own name for this section, "Final CTA", is production
   vocabulary rather than something to print at a visitor, so the route carries
   what the section is FOR — the same locally-stated-label convention the other
   sections on this page use. */
const DATUM_LABEL = same("Start here");

/* Not copy either: the marker that renders the `optional: true` flag content.ts
   already carries. The source writes "Optional:" at L311. */
const OPTIONAL_MARKER = same("Optional");

export function IntakeCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;
  const secondaryHref =
    t.ctaSecondaryEnglishOnly && locale !== "en" ? PATHS.cdt2 : t.ctaSecondaryHref;

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
              <TextField id="mp2-name" label={t.fields.name} autoComplete="name" locale={locale} />
              <TextField
                id="mp2-email"
                type="email"
                label={t.fields.email}
                autoComplete="email"
                locale={locale}
              />
              <TextField
                id="mp2-company"
                label={t.fields.company}
                autoComplete="organization"
                locale={locale}
              />
              <TextField
                id="mp2-role"
                label={t.fields.role}
                autoComplete="organization-title"
                locale={locale}
              />
              {/* Free text: the brief states no subsector taxonomy. */}
              <TextField
                id="mp2-subsector"
                label={t.fields.manufacturingSubsector}
                locale={locale}
              />
              <TextField
                id="mp2-country-facility-region"
                label={t.fields.countryFacilityRegion}
                autoComplete="country-name"
                locale={locale}
              />
              {/* Free text: the brief states no scope bands. */}
              <TextField
                id="mp2-approximate-scope"
                label={t.fields.approximateScope}
                locale={locale}
              />
              <SelectField
                id="mp2-decision"
                label={t.fields.decision}
                placeholder={t.fields.choose}
                options={t.decisionOptions}
                locale={locale}
              />

              <div className="flex items-start gap-3 rounded-lg border border-border bg-background/60 p-4 sm:col-span-2">
                <input
                  id="mp2-pid-asset-list"
                  name="mp2-pid-asset-list"
                  type="checkbox"
                  className="mt-0.5 size-4 shrink-0 rounded-sm border border-input accent-[hsl(var(--primary-ink))] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
                <label htmlFor="mp2-pid-asset-list" className="text-sm leading-snug">
                  {pick(t.optionalField.label, locale)}
                  {t.optionalField.optional && (
                    <span className="mono-label ml-2 align-middle text-muted-foreground">
                      {pick(OPTIONAL_MARKER, locale)}
                    </span>
                  )}
                </label>
              </div>
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
