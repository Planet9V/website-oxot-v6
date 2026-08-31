import { Reveal } from "@/components/shell/reveal";
import { DECISION_02_INVESTMENT } from "./content-1";
import { Cdt2InvestmentMedia } from "./Cdt2InvestmentMedia";
import { BG_BASE, Band, CardGrid, Card, Eyebrow, H2 } from "./primitives";

export function Cdt2Investment() {
  const t = DECISION_02_INVESTMENT;
  return (
    <Band id="invest" tone="surface">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <H2>{t.h2}</H2>
      <p className="mt-4 max-w-3xl font-sans text-[15px] leading-[1.72] text-white/70">{t.intro}</p>
      <Reveal className="mt-8">
        <div
          className="grid gap-10 overflow-hidden rounded-2xl p-8 md:grid-cols-2 md:items-center md:p-10"
          style={{ background: BG_BASE }}
        >
          <div>
            <h3 className="font-sans text-[13px] font-medium uppercase tracking-wide text-white/62">{t.tailHeading}</h3>
            <p className="mt-3 font-sans text-[14px] leading-[1.72] text-white/68">{t.tailBody}</p>
            <div className="mt-4 border-l-2 border-black pl-5">
              <p className="h-card text-white">{t.callout.lead}</p>
              <p className="mt-1.5 font-sans text-[13px] leading-[1.6] text-white/62">{t.callout.body}</p>
            </div>
          </div>
          {/* 96% of the column, up from 80% — the still and its video sit in
              the same box, centred in the column as the image always was. */}
          <div className="mx-auto w-[96%]">
            <Cdt2InvestmentMedia image={t.image} />
          </div>
        </div>
      </Reveal>
      <CardGrid className="mt-8 sm:grid-cols-3">
        {t.cards.map((c) => (
          <Card key={c.title}>
            <h3 className="h-micro text-white">{c.title}</h3>
            <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{c.body}</p>
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}
