import { Reveal } from "@/components/shell/reveal";
import { FAQ } from "./content-2";
import { ACCENT, Band, Eyebrow, H2 } from "./primitives";

/** Section 14. The spec flags #faq as "a strong candidate for FAQPage
 *  structured data" — added here since the content already exists in a
 *  clean question/answer shape. */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
}

export function Cdt2Faq() {
  return (
    <Band id="faq" tone="base">
      <div className="grid gap-8 md:grid-cols-[.66fr_1.34fr] md:items-start">
        <div>
          <Eyebrow>{FAQ.eyebrow}</Eyebrow>
          <H2>{FAQ.h2}</H2>
        </div>
        <p className="font-sans text-[15px] leading-[1.72] text-white/68">{FAQ.intro}</p>
      </div>
      <Reveal className="mt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {FAQ.items.map((item) => (
            <div key={item.q} className="rounded-xl border border-white/10 p-6" style={{ background: "#0a0c0e" }}>
              <h3 className="font-serif text-[15px] font-semibold text-white">{item.q}</h3>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.65] text-white/68">{item.a}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <p className="mt-8 font-sans text-[14px] text-white/70">
        {FAQ.closing.split("info@oxot.nl")[0]}
        <a href="mailto:info@oxot.nl" style={{ color: ACCENT }}>
          info@oxot.nl
        </a>
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
    </Band>
  );
}
