import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { OPERATIONAL_REALITY } from "./content";
import { ManuCornerFrame } from "./ManuCornerFrame";

export function ManuConcerns({ locale }: { locale: Locale }) {
  const t = OPERATIONAL_REALITY;
  return (
    <section aria-labelledby="concerns" className="mt-16 border-t border-border pt-10">
      <h2 id="concerns" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.body, locale)}</p>
      <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{pick(t.bodyTwo, locale)}</p>
      <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {t.concerns.map((c, i) => (
          <li key={i} className="relative">
            <ManuCornerFrame />
            <Card className="h-full">
              <CardContent>
                <span className="mono-label text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                <CardTitle className="mt-1">{pick(c.term, locale)}</CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(c.body, locale)}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
