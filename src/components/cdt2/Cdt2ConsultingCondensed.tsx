import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { Reveal } from "@/components/shell/reveal";
import { ACCENT, Band, Eyebrow, H2 } from "./primitives";

/**
 * Replaces the full six-card Cdt2Services interactive grid on /cdt-2,
 * 2026-08-22 (owner request), per platform_critique_review.md's ICE review
 * item 2: the six services already have a canonical home at /consulting
 * (src/components/consulting/services.consulting.ts) — this page was
 * duplicating them, not introducing them. Cdt2Services itself is untouched
 * and still fully live on /home-2, which reuses it directly; nothing here
 * changes that.
 *
 * The three-tier framing below ("Decision Sprint / Twin Build / Continuous
 * Twin Operations") is new positioning language, not a mechanical extract
 * from existing copy — the review flagged this explicitly as needing its
 * own authoring rather than a content move, and it should be reviewed as
 * new copy, not assumed pre-validated because everything else on this page
 * is a reorganization of existing material.
 */
export function Cdt2ConsultingCondensed({ locale }: { locale: Locale }) {
  const tiers = [
    { title: "Decision Sprint", body: "A defined change, risk, investment or supplier question, answered against the model — not a training engagement." },
    { title: "Twin Build", body: "A durable model of a facility, system, product or estate, built once and kept current as the plant changes." },
    { title: "Continuous Twin Operations", body: "Ongoing change, supplier, vulnerability, risk and evidence support, run alongside the model rather than as a separate programme." }
  ];

  return (
    <Band id="services" tone="base">
      <Eyebrow>Built with you</Eyebrow>
      <H2>Built with you, not installed and abandoned.</H2>
      <Reveal className="mt-8">
        <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3" style={{ background: "rgba(255,255,255,.09)", borderColor: "rgba(255,255,255,.09)" }}>
          {tiers.map((tier) => (
            <div key={tier.title} className="p-6" style={{ background: "#0a0c0e" }}>
              <h3 className="h-micro text-white">{tier.title}</h3>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{tier.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Link
        href={localePath(locale, PATHS.consulting)}
        className="mt-6 inline-block border-b pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
        style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
      >
        Explore Consulting Services →
      </Link>
    </Band>
  );
}
