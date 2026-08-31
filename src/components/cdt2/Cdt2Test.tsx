import { Reveal } from "@/components/shell/reveal";
import { DECISION_03_TEST } from "./content-1";
import { Band, CardGrid, Card, Eyebrow, H2 } from "./primitives";
import { Cdt2TestMedia } from "./Cdt2TestMedia";

export function Cdt2Test() {
  const t = DECISION_03_TEST;
  return (
    <Band id="test" tone="base">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <H2>{t.h2}</H2>
            {t.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 font-sans text-[15px] leading-[1.72] text-white/70">
                {p}
              </p>
            ))}
            <CardGrid className="mt-8 sm:grid-cols-3">
              {t.cards.map((c) => (
                <Card key={c.title}>
                  <h3 className="h-micro text-white">{c.title}</h3>
                  <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{c.body}</p>
                </Card>
              ))}
            </CardGrid>
            <p className="mt-6 font-sans text-[14px] italic leading-[1.6] text-white/62">{t.closing}</p>
          </div>
          <Cdt2TestMedia image={t.image} />
        </div>
      </Reveal>
    </Band>
  );
}
