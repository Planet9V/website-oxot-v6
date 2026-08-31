"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { MODEL } from "./content";
import { FINAL_CTA } from "./content.finalCta";
import { Datum } from "./Rule";

/**
 * S14 · FINAL CTA AND INTAKE — source L488–L532, header recipe H-D.
 *
 * H-D, NOT A SECTION SHELL. `Rule.tsx` L71–L76 defines this recipe as "the
 * closing pair above a framed block" with exactly one caller — this file — which
 * is why the bare `Datum` is consumed directly rather than a fourth shell being
 * exported for a single non-section caller. The block run TERMINATES here
 * instead of opening another section, so there is no `SectionA`/`B`/`C` around
 * it. `Datum` still takes an index and carries "14", the ordinal after S13, so
 * the run reads continuously with every block above it.
 *
 * ONE FRAME, SPLIT 5/7: the closing ask on the left, the seven things OXOT asks
 * for on the right, divided by a hairline. The source writes one closing move
 * (L488–L532), so it is drawn as one block rather than an unframed ask above a
 * separate form card.
 *
 * NEITHER CTA IS LOCALE-GATED, AND THAT WAS CHECKED RATHER THAN ASSUMED.
 * `content.ts` ships `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY` and
 * `ASSURANCE_IS_ENGLISH_ONLY`, and any section linking to those routes must
 * substitute the href on `nl`. This section links to neither. Its primary CTA
 * goes to `/contact` via `LINKS.contact`, which renders in both locales; its
 * secondary is the in-page fragment `#${MODEL.id}`, and `localePath` is
 * deliberately NOT applied to it — a fragment is not a route, and prefixing it
 * with a locale would turn a same-page jump into a navigation. `Hero.tsx`
 * composes the identical anchor from the identical constant, so the two ends of
 * the anchor contract cannot drift apart.
 *
 * THE FORM IS BUILT WHOLE AND SAYS SO. No submission endpoint exists in this
 * repository. Per the owner's standing rule an unbuilt interactive feature is
 * built complete and visibly placeholdered rather than omitted, so all seven
 * controls are real, labelled and keyboard-operable, `formNote` states the
 * position in the page's own body copy, and NO submit button is rendered — a
 * button that silently discarded the entry would be the dishonest version of the
 * same disclosure. `onSubmit` is still stopped, so no browser can navigate this
 * form anywhere. This is the same non-submitting pattern as
 * `rail-transportation-2/IntakeCta.tsx`; no new submission mechanism is
 * invented.
 *
 * FIELD ORDER IS THE SOURCE'S (L499–L522): name, work email, organization, role,
 * organization type, facility scope, decision to evaluate. Text inputs and
 * choosers therefore interleave, and the three full-width choosers sit below the
 * paired inputs in that order. Regrouping into "inputs, then dropdowns" would
 * read tidier and would be this file inventing a question order the brief never
 * wrote.
 *
 * FACILITY SCOPE IS THE ONE MULTI-SELECT, AND THAT IS A JUDGMENT CALL WORTH
 * NAMING. The source (L502, L511, L522) states no cardinality for any of its
 * three lists. Organization type and Decision to evaluate are single-answer by
 * their own wording — an operator is one type of organization, and the field is
 * "Decision" singular — so both are `Select`. Facility scope is a list of ten
 * things that genuinely co-exist inside one estate (a campus contains data halls
 * *and* electrical power paths *and* a chiller plant *and* a BMS/EPMS
 * environment, all named separately at L512–L521), and forcing one answer would
 * make the visitor understate their own scope. It is therefore a multiple
 * `ToggleGroup` with its cardinality stated in the label text
 * (`fields.chooseAny`) rather than left to be discovered by clicking. All ten
 * options are visible at once; none is hidden behind a menu.
 *
 * ACCESSIBILITY: every text input has a real `<label htmlFor>`. The two Radix
 * selects cannot use one — the trigger is a `<button>`, which `htmlFor` does not
 * name — so each gets `aria-labelledby` pointing at its own visible label, and
 * the toggle group (a `role="group"` of pressed buttons) is labelled the same
 * way. The `<form>` takes its accessible name from `formLabel`, which is the
 * source's own heading for the field block, rather than from an invented legend.
 *
 * MOBILE (OXOT_Mobile_Rules.md): every scope chip is `min-h-11` for the 44px
 * touch target and wraps rather than truncating, so a long option such as "New
 * build / commissioning / expansion" stays fully readable at 390px. A chip's
 * selected state is carried by border and fill together, not by colour alone.
 *
 * TOKEN DISCIPLINE: `--border`, `--muted`, `--primary-ink` and the primitives'
 * own baseline tokens. No `--signal-*` token appears here; nothing in an intake
 * form is model or decision state.
 */

export function IntakeCta({ locale }: { locale: Locale }) {
  const t = FINAL_CTA;

  return (
    <section id={t.sectionId} aria-labelledby="hdc2-final-cta-h" className="pt-16 sm:pt-24">
      <Datum index={t.index} label={t.datumLabel} locale={locale} />

      <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="hdc2-final-cta-h" className="h-section text-balance">
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
                <Link href={`#${MODEL.id}`}>{pick(t.ctaSecondary, locale)}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-12">
            <p id="hdc2-intake-label" className="mono-label text-primary-ink">
              {pick(t.formLabel, locale)}
            </p>

            <form
              aria-labelledby="hdc2-intake-label"
              /* No endpoint exists. Stopping submission here is what keeps the
                 disclosure below true in every browser. */
              onSubmit={(event) => event.preventDefault()}
              className="mt-6 grid gap-5 sm:grid-cols-2"
            >
              <TextField id="hdc2-name" label={t.fields.name} autoComplete="name" locale={locale} />
              <TextField
                id="hdc2-email"
                type="email"
                label={t.fields.email}
                autoComplete="email"
                locale={locale}
              />
              <TextField
                id="hdc2-organization"
                label={t.fields.organization}
                autoComplete="organization"
                locale={locale}
              />
              <TextField
                id="hdc2-role"
                label={t.fields.role}
                autoComplete="organization-title"
                locale={locale}
              />
              <SelectField
                id="hdc2-organization-type"
                label={t.fields.organizationType}
                placeholder={t.fields.choose}
                options={t.organizationTypeOptions}
                locale={locale}
                className="sm:col-span-2"
              />
              <MultiSelectField
                id="hdc2-facility-scope"
                label={t.fields.facilityScope}
                hint={t.fields.chooseAny}
                options={t.facilityScopeOptions}
                locale={locale}
                className="sm:col-span-2"
              />
              <SelectField
                id="hdc2-decision"
                label={t.fields.decision}
                placeholder={t.fields.choose}
                options={t.decisionOptions}
                locale={locale}
                className="sm:col-span-2"
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

/**
 * A LONG SELECTED OPTION PUSHED THE WHOLE DOCUMENT SIDEWAYS, and the fix is not
 * where it looks like it should be. Measured at 390px on 2026-08-29 after
 * `measure.mjs` gained interactive-state coverage and drove this control with a
 * real `selectOption`: `documentElement.scrollWidth` came back 41px over the
 * 390px client, in BOTH locales, with the harness naming the culprit exactly —
 * a 340px `<span>` reading "Government / sovereign / defense-adjacent".
 *
 * WHAT HAPPENS. `Select name={id}` makes Radix mirror the control into a hidden
 * native `<select>` for form autofill, and that mirror is what the harness
 * finds and drives. The chosen label lands in the trigger's
 * `[data-slot=select-value]` span; `SelectTrigger` carries `whitespace-nowrap`,
 * so that span has an unbounded min-content width. This wrapper is a grid item
 * of the form's `grid gap-5 sm:grid-cols-2`, its `min-width` resolves to `auto`,
 * and a grid item's automatic minimum size IS its content-based minimum. The
 * track therefore took 340px plus padding and chevron as its FLOOR and refused
 * to shrink to the viewport. Clean again at 834px, where the column is wide
 * enough that the floor never binds.
 *
 * WHY THE OBVIOUS FIXES MEASURE AS EXACTLY ZERO. Four candidates were tried in
 * a real browser on the sibling page before this one and every one left
 * `scrollWidth` unchanged: `overflow:hidden` on the trigger, a working ellipsis
 * on the value span, both together, and both scoped to these two ids.
 * `overflow` zeroes a box's OWN automatic minimum size; it does not change the
 * box's min-content size, which is what this wrapper's `min-width:auto` reads.
 * The blow-out is a property of the ITEM, so the fix has to be on the item.
 *
 * TRUNCATE, NOT WRAP, AND THAT IS A CHOICE. Letting the trigger wrap
 * (`whitespace-normal` + `h-auto`) also clears the overflow, and it is what the
 * facility-scope chips below deliberately do. It was rejected here: those chips
 * show all ten options at once and every one must be readable BEFORE it is
 * clicked, whereas a select trigger shows back only the answer the visitor has
 * just read in the open list. Wrapping also grew the control 36px → 58px on
 * selection — a layout shift caused by answering the question. The full string
 * stays reachable in the open list, in the mirrored native `<select>`, and to a
 * screen reader.
 *
 * GENERALISES. Any layout item holding a `SelectTrigger` needs `min-w-0`
 * whenever an option can be longer than the narrowest column it must fit. Both
 * call sites here pass `sm:col-span-2`, so both are affected and both are fixed
 * by the one wrapper class.
 */
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
  options: readonly Bilingual[];
  locale: Locale;
  className?: string;
}) {
  return (
    /* `min-w-0` is load-bearing and has to be HERE, on the grid item, not on
       the trigger — see the block comment above this function. */
    <div className={cn("min-w-0", className)}>
      <span id={`${id}-label`} className="mono-label block">
        {pick(label, locale)}
      </span>
      <Select name={id}>
        <SelectTrigger
          id={id}
          aria-labelledby={`${id}-label`}
          /* The descendant form, not `*:data-[slot=select-value]:…`, is
             deliberate: the primitive already ships that exact variant, so at
             equal specificity the winner would depend on tailwind-merge's
             conflict table. `[&>span[data-slot=select-value]]` compiles to
             `.cls > span[data-slot=select-value]` (0,2,1) against the
             primitive's `.cls > *[data-slot=select-value]` (0,2,0) and wins on
             specificity in either order. `block` is what re-enables the
             ellipsis: the primitive sets `line-clamp-1` and then `flex` in the
             same string, and `flex` overrides `line-clamp`'s
             `display:-webkit-box`, leaving the clip with nothing clamping it. */
          className="mt-2 w-full min-w-0 [&>span[data-slot=select-value]]:block [&>span[data-slot=select-value]]:truncate"
        >
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

/**
 * The one field that accepts several answers. Its cardinality is part of the
 * visible label rather than placeholder text, so it is readable before the
 * visitor touches the control and sits inside the group's accessible name.
 */
function MultiSelectField({
  id,
  label,
  hint,
  options,
  locale,
  className
}: {
  id: string;
  label: Bilingual;
  hint: Bilingual;
  options: readonly Bilingual[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={className}>
      <span id={`${id}-label`} className="mono-label block">
        {pick(label, locale)}
        <span className="ml-2 text-muted-foreground">{pick(hint, locale)}</span>
      </span>
      <ToggleGroup
        id={id}
        type="multiple"
        variant="outline"
        spacing={2}
        aria-labelledby={`${id}-label`}
        /* `spacing` must be non-zero: at its default of 0 the primitive applies
           its segmented-bar rules (shared borders, only the first and last chip
           rounded), which break apart the moment ten chips wrap onto several
           lines. `gap-2` is stated explicitly as well because no other consumer
           in this repository exercises the primitive's own gap variable. */
        className="mt-3 w-full flex-wrap justify-start gap-2"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.en}
            value={option.en}
            className="h-auto min-h-11 whitespace-normal rounded-md px-3 py-2 text-left"
          >
            {pick(option, locale)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
