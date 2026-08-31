"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FINAL_CTA } from "./content";
import { INTAKE } from "./content.intake";

/**
 * S11 · FINAL CTA AND QUALIFICATION INTAKE.
 *
 * SECTOR-SPECIFIC CTA, per `OXOT_Composition_Rules.md`'s fourth Industries
 * requirement. Both labels are the brief's own (industry_water.md L334-335)
 * rather than the site's generic "Talk to us": "Discuss a water-system
 * scenario" and "Request the Technical Specification".
 *
 * ONE PRIMARY CTA. The Visual Rules bar a second, so the pair here is primary →
 * `/contact` and secondary outline → `PATHS.technicalSpecification`. Both
 * constants were read out of `src/components/shell/nav.ts` (`contact: "/contact"`
 * L67, `technicalSpecification: "/technical-specification"` L108); the brief's
 * own suggested `/resources/technical-specification` (L403) does not exist and
 * is not used — see the `LINKS` comment in content.ts.
 *
 * THE SECONDARY CTA IS ENGLISH-ONLY, and that is measured rather than assumed:
 * `src/app/[locale]/technical-specification/page.tsx:44` calls `notFound()` when
 * `locale !== "en"`, so `/nl/technical-specification` is a real 404. Rendering
 * the button in Dutch would put a dead link on the page's single most important
 * conversion surface. Dutch gets the primary CTA alone, which the Visual Rules
 * allow. Delete this gate the day that page renders `nl`.
 *
 * STACKED, NOT SPLIT — deliberately unlike water-wastewater-2's S10, which puts
 * the ask in a 5-column rail beside a 7-column form card. Two reasons, both
 * content: this page's whole visual grammar is the numbered datum running down a
 * single measure, and a full-width form lets the seven controls group into the
 * two labelled blocks the source list actually has (who is asking, L339-341;
 * which system and which decision, L342-367) instead of being squeezed into a
 * half-width column. A stacked layout also has no siblings to balance, so the
 * Industries floor rule on sibling content balance does not bite here.
 *
 * THE FORM IS BUILT WHOLE AND SAYS WHAT IT IS. There is no submission endpoint
 * in this repository, so the block carries a visible note stating that and
 * routes to `/contact`. It is labelled, keyboard-operable and makes no claim it
 * cannot keep; a silently dead submit button would be the dishonest version of
 * the same thing, so no submit button is rendered.
 *
 * ACCESSIBILITY: every text control has a real `<label htmlFor>`. The three
 * Radix selects get `aria-labelledby` pointing at their own label instead,
 * because a Radix trigger is a `<button>` and `htmlFor` does not name it. Each
 * field group is a `<fieldset>` with a `<legend>`, so the group name is
 * announced with the fields inside it.
 */
export function IntakeCta({ locale }: { locale: Locale }) {
  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="start">
      <p className="mono-label">11 · {pick(FINAL_CTA.datum, locale)}</p>
      <h2 className="h-section mt-4 text-balance">{pick(FINAL_CTA.h2, locale)}</h2>
      {/* No `prose-measure` (removed 2026-08-25, systemic audit) — see
          Capabilities.tsx's identical fix for the reasoning. */}
      <p className="mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(FINAL_CTA.intro, locale)}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg" className="cta-lift">
          <Link href={localePath(locale, PATHS.contact)}>{pick(FINAL_CTA.ctaPrimary, locale)}</Link>
        </Button>
        {locale === "en" && (
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale, PATHS.technicalSpecification)}>
              {pick(FINAL_CTA.ctaSecondary, locale)}
            </Link>
          </Button>
        )}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
        <p className="mono-label text-primary-ink">{pick(INTAKE.formLabel, locale)}</p>

        <fieldset className="mt-6 border-0 p-0">
          <legend className="mono-label text-muted-foreground">{pick(INTAKE.groupA, locale)}</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField
              id="ww3-name"
              label={INTAKE.fields.name}
              placeholder={INTAKE.fields.namePlaceholder}
              locale={locale}
            />
            <TextField
              id="ww3-email"
              type="email"
              label={INTAKE.fields.email}
              placeholder={INTAKE.fields.emailPlaceholder}
              locale={locale}
            />
            <TextField
              id="ww3-org"
              label={INTAKE.fields.organization}
              placeholder={INTAKE.fields.organizationPlaceholder}
              locale={locale}
            />
            <TextField
              id="ww3-role"
              label={INTAKE.fields.role}
              placeholder={INTAKE.fields.rolePlaceholder}
              locale={locale}
            />
          </div>
        </fieldset>

        {/* The rule sits on this wrapper, NOT on the `<fieldset>`. A legend
            interrupts its own fieldset's top border, which left the divider
            running only to the right of the label and gave the two groups
            different heading treatments for no content reason. */}
        <div className="mt-8 border-t border-border pt-6">
          <fieldset className="border-0 p-0">
            <legend className="mono-label text-muted-foreground">
              {pick(INTAKE.groupB, locale)}
            </legend>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <SelectField
                id="ww3-system-type"
                label={INTAKE.fields.systemType}
                placeholder={INTAKE.fields.choose}
                options={INTAKE.systemTypeOptions}
                locale={locale}
              />
              <SelectField
                id="ww3-scope"
                label={INTAKE.fields.scope}
                placeholder={INTAKE.fields.choose}
                options={INTAKE.scopeOptions}
                locale={locale}
              />
              <SelectField
                id="ww3-decision"
                label={INTAKE.fields.decision}
                placeholder={INTAKE.fields.choose}
                options={INTAKE.decisionOptions}
                locale={locale}
              />
            </div>
          </fieldset>
        </div>

        {/* Visible on the page, not a tooltip and not a source comment. */}
        <p className="mt-8 border-t border-border pt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
          {pick(INTAKE.formNote, locale)}{" "}
          <Link
            href={localePath(locale, PATHS.contact)}
            className="text-primary-ink underline-offset-4 hover:underline"
          >
            {pick(FINAL_CTA.ctaPrimary, locale)}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function TextField({
  id,
  label,
  placeholder,
  locale,
  type = "text"
}: {
  id: string;
  label: Bilingual;
  placeholder: Bilingual;
  locale: Locale;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono-label block">
        {pick(label, locale)}
      </label>
      <Input id={id} name={id} type={type} className="mt-2" placeholder={pick(placeholder, locale)} />
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
  options: Bilingual[];
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
          {options.map((option, i) => (
            <SelectItem key={i} value={option.en}>
              {pick(option, locale)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
