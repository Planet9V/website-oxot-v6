"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FINAL_CTA } from "./content";
import { Datum } from "./Rule";

/**
 * S10 · THE CLOSING DATUM, THE FINAL CTA, AND THE REAL INTAKE FORM.
 *
 * HEADER RECIPE H-D: the datum rule appears once more and the section is a
 * framed block rather than an open one — the long-section terminates the way a
 * profile drawing terminates at its outfall or its service connection, instead
 * of trailing away.
 *
 * THE FORM `-1` OMITTED ENTIRELY. Source L337–L367 specifies name and work
 * email, organization, role, and three selects — System type (7 options,
 * L342–349), Scope (7 options, L350–357) and Decision to evaluate (9 options,
 * L358–367). That renders as four inputs and three selects: "name and work
 * email" is one source bullet and two values, so it is two inputs, the second
 * `type="email"` for real browser validation. Every option is transcribed; none
 * is paraphrased and none is dropped.
 *
 * BUILT COMPLETE, NOT DROPPED, PER THE OWNER'S OWN RULE: placeholder unbuilt
 * interactive features, do not omit them. There is no submission endpoint in
 * this repository, so the block carries a VISIBLE stated note saying so and
 * routes to `/contact` — it is rendered whole, labelled, and keyboard-operable,
 * and it makes no claim it cannot keep. A silently dead submit button would be
 * the dishonest version of the same thing.
 *
 * ACCESSIBILITY: every text control has a real `<label>` bound by
 * `htmlFor`/`id`; the three Radix selects carry `aria-labelledby` pointing at
 * their own label, because a Radix trigger is a button rather than a native
 * `<select>` and `htmlFor` alone does not name it.
 *
 * ONE PRIMARY CTA AND ONE SECONDARY, per the Visual Rules. Both point at real,
 * live destinations: `/contact` and `PATHS.technicalSpecification`.
 *
 * THE SECONDARY CTA IS ENGLISH-ONLY, and that is measured rather than assumed.
 * `/technical-specification` is one of the two pages still gated
 * `locale !== "en"`, so `/nl/technical-specification` returns 404. Rendering
 * the button in Dutch would ship a dead ask on the page's single most important
 * conversion surface. Dutch therefore gets the primary CTA alone, which the
 * Visual Rules allow, and the same request is still reachable through Contact.
 * The alternative — pointing a Dutch reader at an English URL — breaks the
 * locale-prefix rule the routing layer exists to keep. Delete this gate the day
 * the Technical Specification renders `nl`.
 */
export function IntakeCta({ locale }: { locale: Locale }) {
  return (
    <section id="final-cta" aria-labelledby="final-cta-h" className="pt-16 sm:pt-24">
      <Datum index="10" label={same("Start here")} locale={locale} />

      <div className="mt-10 rounded-3xl border border-border bg-muted/40 p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 id="final-cta-h" className="h-section text-balance">
              {pick(FINAL_CTA.h2, locale)}
            </h2>
            <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
              {pick(FINAL_CTA.body, locale)}
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
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <p className="mono-label text-primary-ink">{pick(FINAL_CTA.formLabel, locale)}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <TextField
                  id="ww2-name"
                  label={FINAL_CTA.fields.name}
                  placeholder={FINAL_CTA.fields.namePlaceholder}
                  locale={locale}
                />
                <TextField
                  id="ww2-email"
                  type="email"
                  label={FINAL_CTA.fields.email}
                  placeholder={FINAL_CTA.fields.emailPlaceholder}
                  locale={locale}
                />
                <TextField
                  id="ww2-org"
                  label={FINAL_CTA.fields.organization}
                  placeholder={FINAL_CTA.fields.organizationPlaceholder}
                  locale={locale}
                />
                <TextField
                  id="ww2-role"
                  label={FINAL_CTA.fields.role}
                  placeholder={FINAL_CTA.fields.rolePlaceholder}
                  locale={locale}
                />

                <SelectField
                  id="ww2-system-type"
                  label={FINAL_CTA.fields.systemType}
                  placeholder={FINAL_CTA.fields.choose}
                  options={FINAL_CTA.systemTypeOptions}
                  locale={locale}
                  className="sm:col-span-2"
                />
                <SelectField
                  id="ww2-scope"
                  label={FINAL_CTA.fields.scope}
                  placeholder={FINAL_CTA.fields.choose}
                  options={FINAL_CTA.scopeOptions}
                  locale={locale}
                  className="sm:col-span-2"
                />
                <SelectField
                  id="ww2-decision"
                  label={FINAL_CTA.fields.decision}
                  placeholder={FINAL_CTA.fields.choose}
                  options={FINAL_CTA.decisionOptions}
                  locale={locale}
                  className="sm:col-span-2"
                />
              </div>

              {/* The stated note. Visible, not a tooltip and not a comment. */}
              <p className="mt-6 border-t border-border pt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
                {pick(FINAL_CTA.formNote, locale)}{" "}
                <Link
                  href={localePath(locale, PATHS.contact)}
                  className="text-primary-ink underline-offset-4 hover:underline"
                >
                  {pick(FINAL_CTA.ctaPrimary, locale)}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TextField({
  id,
  label,
  placeholder,
  locale,
  type = "text",
  className
}: {
  id: string;
  label: Bilingual;
  placeholder: Bilingual;
  locale: Locale;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
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
  locale,
  className
}: {
  id: string;
  label: Bilingual;
  placeholder: Bilingual;
  options: Bilingual[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={className}>
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
