import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CAPABILITIES } from "./content";

/**
 * S07 · CAPABILITIES — a hairline-ruled definition split, and THE PAGE'S ONE
 * EDITORIAL-SCHEDULE-SHAPED SECTION.
 *
 * COUNTED HONESTLY. Nine body sections; this is 1 of 9 = 11%, against the
 * Composition Rules cap of about one third, and it is not adjacent to another
 * section of the same shape (S06 is a three-column ledger, S08 is a reference
 * table). The rule is met by arithmetic, not by assertion.
 *
 * SEVEN EQUAL CARDS IS BARRED by the Visual Rules cap on more than three
 * visually equal cards, so the seven capabilities are a two-column definition
 * split instead: name in a fixed left rail, value prose right, separated by a
 * hairline.
 *
 * WHAT WAS DROPPED FROM `-1`, DELIBERATELY: its mono index and its progressive
 * `paddingLeft: i * 10px` indent. The indent was decoration — it encoded no
 * ordering anyone can act on — and the numbering is what made that section a
 * duplicate of the sector-reality recipe. Removing both is most of the reason
 * this page no longer reads as one recipe applied nine times.
 *
 * NO ENTRANCE ANIMATION. A row fading in on scroll explains no system state,
 * and the Foundation Spec calls decorative motion a defect.
 *
 * NOT THE BENTO. Pattern 3's cells ARE the nine `SystemAsset.type` values;
 * these are seven capabilities of one model. Keeping the pattern's shape while
 * discarding its taxonomy is the "named a pattern then substituted something
 * else" failure.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  return (
    <div>
      <dl className="border-t border-border">
        {CAPABILITIES.items.map((item, i) => (
          <div key={i} className="grid gap-2 border-b border-border py-5 lg:grid-cols-12 lg:gap-8">
            <dt className="body-lead font-semibold leading-snug text-foreground lg:col-span-4">
              {pick(item.name, locale)}
            </dt>
            <dd className="prose-measure body-lead leading-relaxed text-muted-foreground lg:col-span-8">
              {pick(item.body, locale)}
            </dd>
          </div>
        ))}
      </dl>

      {/* No `prose-measure` (removed 2026-08-25) — see DecisionSwitchboard.tsx's
          identical fix for the reasoning. */}
      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(CAPABILITIES.note, locale)}
      </p>
    </div>
  );
}
