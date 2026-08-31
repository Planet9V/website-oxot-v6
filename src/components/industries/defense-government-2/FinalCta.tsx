import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { same } from "../registry";
import { Datum } from "./Rule";
import { FINAL_CTA } from "./content";

/**
 * S12 · FINAL CTA — header recipe H-D.
 *
 * H-D, NOT A SECTION SHELL. `Rule.tsx` defines this recipe as the closing
 * crossing above a framed block and names exactly one caller — this file —
 * which is why the bare `Datum` is consumed directly rather than a fourth shell
 * being exported for a single non-section caller. The run TERMINATES here
 * instead of opening another section.
 *
 * ─── THE CLOSING SENTENCE ───────────────────────────────────────────────────
 *
 * `FINAL_CTA.body` ENDS ON THE ONLY INSTRUCTION ON THIS PAGE THAT GOVERNS WHAT
 * THE READER MAY SEND OXOT: "Do not include classified, operationally
 * sensitive, or personally identifiable information in any enquiry." That
 * sentence is load-bearing. `content.ts` requires that it never be trimmed for
 * length, never demoted to a footnote below the button, and that the body never
 * be split so a renderer can drop the tail.
 *
 * SO IT IS RENDERED AS ONE PARAGRAPH, WHOLE, AND NO STRING SURGERY IS DONE. The
 * tempting move — split the body on its last sentence and emphasise the tail —
 * was rejected outright: it means slicing approved copy at a delimiter this
 * file guesses at, which is the exact operation the content module's warning is
 * about, and a locale whose punctuation differs would silently split in the
 * wrong place or not at all. The whole string is passed to one `<p>`.
 *
 * PROMINENCE COMES FROM THE PARAGRAPH'S OWN TREATMENT INSTEAD, in three
 * separate steps rather than one:
 *   1. `text-[1.0625rem]` — lead size, not body size. Larger than the prose in
 *      every section above it.
 *   2. `text-foreground`, not `text-muted-foreground`. Every other lead on this
 *      page is muted; this one is at full strength.
 *   3. THE DASHED LEFT RULE — the page's own claim-boundary marking, the same
 *      mark `Rule.tsx`'s SectionB puts beside all five of the page's guards. A
 *      reader who has come this far has met it five times and knows what it
 *      means. It marks the WHOLE body rather than the last sentence alone,
 *      which is the honest reading: the first two sentences state what to
 *      bring, the third states what not to send, and both are conditions on the
 *      same enquiry.
 * It sits directly above the primary button, inside the framed block, at the
 * end of the page. Nothing about it is fine print.
 *
 * ─── NO FORM, DELIBERATELY, AND THE REASON IS THIS PAGE'S SUBJECT ───────────
 *
 * `content.ts` records that no intake form is defined anywhere in this folder:
 * the source's lead-form field list was dropped because this site has one
 * shared contact mechanism rather than a per-page form, and — the reason that
 * matters here — a bespoke form on this page would invite exactly the enquiry
 * content the closing sentence tells the visitor not to send. A free-text
 * "describe your environment" field on a defense and government page is a
 * standing invitation to paste something classified into a marketing website.
 * That decision is carried, not revisited, and the sibling `-2` pages'
 * `IntakeCta` form is deliberately not reused here.
 *
 * ONE COLUMN, FULL WIDTH, AND NO SECOND PANE. The sibling pages split this
 * block into copy beside a form; with no form there is nothing to put in a
 * second column, and a stretched empty pane beside the copy is precisely the
 * failure `OXOT_Composition_Rules.md`'s sibling-balance floor names — an
 * `items-stretch` container making an empty box tall passes the CSS and fails
 * the rule. So there is no grid, no group and no balance marking in this file:
 * a single full-width column has no siblings to relate, and that is stated here
 * rather than left as an unmarked gap.
 *
 * BOTH CTAs ARE REAL, LIVE DESTINATIONS AND NEITHER IS GATED. `ctaPrimaryHref`
 * is `/contact` and `ctaSecondaryHref` is `/cdt-2`; both render in both
 * locales, so unlike the sibling pages' `/technical-specification` button
 * neither needs a locale substitution. `content.ts` notes the secondary CTA
 * names this page's own sovereign-system model and may be retargeted to that
 * section's anchor once it has an id — a change that belongs in the content
 * module, not here, so this file reads the href it is given rather than
 * second-guessing it.
 *
 * TOKEN DISCIPLINE: `--border`, `--muted`, `--foreground` and the button
 * primitive's own tokens. No `--signal-*` token appears in this file. There is
 * no classification marking, caveat label or handling banner anywhere on this
 * block, and none may be added.
 *
 * MOBILE (OXOT_Mobile_Rules.md): one column at every width, the buttons wrap
 * rather than shrink, and `size="lg"` keeps both above the 44px minimum target.
 */

/* Section chrome, not copy: `content.ts` carries no datum labels, and its own
   name for this section — "Final CTA" — is production vocabulary rather than
   something to print at a visitor. The run's closing label says what the block
   is FOR, in the same locally-stated-label convention the rest of this page
   uses. */
const DATUM_LABEL = same("Start here");

export function FinalCta({ locale }: { locale: Locale }) {
  return (
    <section id="start" aria-labelledby="final-cta-h" className="pt-16 sm:pt-24">
      <Datum index="12" label={DATUM_LABEL} locale={locale} />

      <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
        <h2 id="final-cta-h" className="h-section text-balance">
          {pick(FINAL_CTA.h2, locale)}
        </h2>

        {/* Whole, verbatim, one paragraph, at lead size, at full strength,
            behind the page's own claim-boundary rule. See the docblock — the
            closing sentence is load-bearing and is never split out of this
            string. */}
        <p className="mt-8 border-l-2 border-dashed border-border pl-5 body-lead leading-relaxed text-foreground">
          {pick(FINAL_CTA.body, locale)}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="cta-lift">
            <Link href={localePath(locale, FINAL_CTA.ctaPrimaryHref)}>
              {pick(FINAL_CTA.ctaPrimary, locale)}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale, FINAL_CTA.ctaSecondaryHref)}>
              {pick(FINAL_CTA.ctaSecondary, locale)}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
