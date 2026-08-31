import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "./content";

/**
 * THE PAGE'S ONE ASK, and the only button on it.
 *
 * The Platform composition rules call for a single strong final CTA, so the
 * hero carries no competing button and this section carries no secondary
 * one. There is exactly one destination: /contact, bilingual, no guard.
 *
 * The offer is the source's own — "bring one P&ID and an asset list for one
 * facility" — which is both the strongest ask it lists and a description of
 * how onboarding actually starts, rather than a generic "book a demo" that
 * commits the reader to a meeting and OXOT to nothing.
 */
export function WorkFinalCta({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="final-cta" className="mt-16">
      <div className="rounded-2xl border border-border bg-muted p-7 sm:p-10">
        <h2 id="final-cta" className="h-section">
          {pick(FINAL_CTA.h2, locale)}
        </h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-foreground">
          {pick(FINAL_CTA.body, locale)}
        </p>
        <div className="mt-7">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(FINAL_CTA.cta, locale)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
