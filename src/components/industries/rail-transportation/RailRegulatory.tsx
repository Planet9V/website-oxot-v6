import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "@/components/ui/blur-fade";
import { REGULATORY } from "./content";

/**
 * Replaces the old 4-column table (framework / passenger applicability /
 * freight applicability / OXOT support, every cell a paragraph — the
 * widest, least scannable table on the page at 58rem min-width) with a
 * two-column framework card grid: name and link up top, applicability
 * split passenger/freight beneath it, OXOT's support statement set off
 * below a divider instead of a fourth cramped column.
 */
export function RailRegulatory({ locale }: { locale: Locale }) {
  const t = REGULATORY;
  /* /assurance is EN-only — this page is not, so an NL reader falls back to
     /consulting rather than a 404, same pattern as energy-utilities'
     EnergyRegulatory. */
  const assuranceHref = locale === "en" ? localePath("en", PATHS.assurance) : localePath("nl", PATHS.consulting);
  return (
    <section aria-labelledby="regulatory" className="mt-16 border-t border-border pt-10">
      <h2 id="regulatory" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {t.rows.map((r, i) => (
          <BlurFade key={i} inView direction="up" duration={0.35} delay={(i % 4) * 0.05}>
            <Card className="h-full">
              <CardContent>
                <CardTitle className="text-base">
                  {r.href === "assurance" ? (
                    <Link href={assuranceHref} className="text-primary-ink underline underline-offset-4">
                      {r.framework}
                    </Link>
                  ) : (
                    r.framework
                  )}
                </CardTitle>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Badge className="mono-label">Passenger / EU rail</Badge>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{pick(r.passenger, locale)}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mono-label">US freight</Badge>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{pick(r.freight, locale)}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="mono-label text-muted-foreground">How OXOT supports the work</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground">{pick(r.support, locale)}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
