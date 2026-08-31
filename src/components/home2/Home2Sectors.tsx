import { Reveal } from "@/components/shell/reveal";
import { SECTORS } from "./content";
import { Band, CardGrid, Card, Eyebrow } from "@/components/cdt2/primitives";

export function Home2Sectors() {
  const t = SECTORS;
  return (
    <Band id="sectors" tone="base">
      <div className="grid gap-10 lg:grid-cols-[.5fr_1fr] lg:items-start">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="font-serif text-[26px] font-semibold leading-[1.22] tracking-[-0.018em] text-white">{t.h2}</h2>
          <p className="mt-3.5 font-sans text-[14px] leading-[1.7] text-white/62">{t.intro}</p>
        </div>
        <Reveal>
          <CardGrid className="sm:grid-cols-2 lg:grid-cols-3">
            {t.industries.map((ind) => (
              <Card key={ind.name}>
                <h3 className="h-micro text-white">{ind.name}</h3>
                <p className="mt-2 font-sans text-[12.5px] leading-[1.6] text-white/62">{ind.body}</p>
              </Card>
            ))}
          </CardGrid>
        </Reveal>
      </div>
    </Band>
  );
}
