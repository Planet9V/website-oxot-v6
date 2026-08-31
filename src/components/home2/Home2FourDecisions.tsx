import Image from "next/image";
import { Reveal } from "@/components/shell/reveal";
import { FOUR_DECISIONS } from "./content";
import { ACCENT, Band, Card, CardGrid, Eyebrow } from "@/components/cdt2/primitives";

/**
 * Sits directly above Company, per the design — the page's argument in
 * miniature before the "who we are" section makes its case. The curve
 * image is screen-blended (`mix-blend-mode: screen`) so its black
 * background drops out against the band's own dark surface, same
 * treatment as the hero's 7-box-frame image.
 */
export function Home2FourDecisions() {
  const t = FOUR_DECISIONS;
  return (
    <Band tone="surface">
      <div className="grid gap-10 lg:grid-cols-[1.34fr_.66fr] lg:items-center">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <Reveal>
            <CardGrid className="sm:grid-cols-2">
              {t.decisions.map((d) => (
                <Card key={d.title}>
                  <div className="h-card mb-2.5" style={{ color: d.accent ? ACCENT : "#fff" }}>
                    {d.title}
                  </div>
                  <p className="font-sans text-[13.5px] leading-[1.66] text-white/62">{d.body}</p>
                </Card>
              ))}
            </CardGrid>
          </Reveal>
        </div>
        <Reveal>
          <div>
            <Image
              src={t.image}
              alt="Risk reduction against spend: the curve climbs steeply, then flattens as further investment buys progressively less"
              width={900}
              height={968}
              className="block h-auto w-full"
              style={{ mixBlendMode: "screen" }}
              sizes="(min-width: 1024px) 33vw, 80vw"
            />
            <p className="mt-3 font-sans text-[11.5px] leading-[1.6] text-white/45">{t.imageCaption}</p>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
