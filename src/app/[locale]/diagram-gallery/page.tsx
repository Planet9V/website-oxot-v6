import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import type { Bilingual } from "@/i18n/bilingual";
import { Diagram } from "@/components/diagrams/Diagram";
import type { DiagramSpec } from "@/components/diagrams/types";
import { WATER_TREATMENT_TRAIN } from "@/components/diagrams/specs/water-treatment-train";
import { ENERGY_BESS_INFEED } from "@/components/diagrams/specs/energy-bess-infeed";
import { MANUFACTURING_PURDUE } from "@/components/diagrams/specs/manufacturing-purdue";

/**
 * /diagram-gallery — INTERNAL AND UNLINKED, exactly like the `-2` pages.
 *
 * It is not in `nav.ts`, no page links to it, and it is `noindex`. It exists so
 * the three proof diagrams (task_plan Phase 7) can be rendered, measured and
 * visually audited against real page chrome — real tokens, real fonts, real
 * dark and light — rather than in a harness that agrees with itself. A diagram
 * that only ever renders inside its own test page has not been shown to survive
 * the site it has to live on.
 *
 * ONE h1, and it is the page's, not a diagram's. Each drawing's own name is an
 * h2, which is also what `measure.mjs` requires and what a screen reader needs
 * in order to skim three figures.
 *
 * NO READING-WIDTH CAP ON THE NOTES. `prose-measure` on a lone block inside a
 * full-width section is the orphaned-narrow-text defect `measure.mjs` was
 * extended to catch; these notes sit at full width deliberately.
 */
export const metadata: Metadata = {
  title: "Diagram gallery — OXOT",
  robots: { index: false, follow: false }
};

const UI = {
  kicker: { en: "Internal · engineering diagram proof", nl: "Intern · bewijs technische schema's" },
  heading: {
    en: "Three engineering diagrams from one contract",
    nl: "Drie technische schema's uit één contract"
  },
  lede: {
    en:
      "Each drawing below is a DiagramSpec — a list of symbols, tags, zones and connection kinds — " +
      "laid out by ELK in Node at build time and painted entirely from theme tokens. No page here " +
      "contains a single hand-placed coordinate, and no symbol is an approximation of an " +
      "engineering symbol: every glyph is compiled from draw.io's own ISO/DIN stencil geometry, " +
      "from CISA's CSET OT asset set, or drawn to ISA-5.1 for the instrument bubbles.",
    nl:
      "Elk schema hieronder is een DiagramSpec — een lijst symbolen, tags, zones en verbindingssoorten — " +
      "opgemaakt door ELK in Node tijdens de build en volledig geschilderd met thematokens. Geen " +
      "enkele coördinaat op deze pagina is met de hand geplaatst, en geen enkel symbool is een " +
      "benadering: elke glyph komt uit de ISO/DIN-stencilgeometrie van draw.io, uit de CSET " +
      "OT-assetset van CISA, of is getekend volgens ISA-5.1 voor de instrumentbollen."
  },
  provenance: {
    en:
      "Symbol provenance — P&ID and electrical geometry compiled from the draw.io 31.3.2 mxGraph " +
      "stencil library. OT asset portraits from CISA's CSET symbol set, © Battelle Energy " +
      "Alliance, MIT. Purdue banding, IEC 62443 notation and the ISA-5.1 instrument bubbles are " +
      "drawn for this site.",
    nl:
      "Herkomst van de symbolen — P&ID- en elektrische geometrie gecompileerd uit de mxGraph-" +
      "stencilbibliotheek van draw.io 31.3.2. OT-assetportretten uit de CSET-symboolset van CISA, " +
      "© Battelle Energy Alliance, MIT. Purdue-banden, IEC 62443-notatie en de ISA-5.1-" +
      "instrumentbollen zijn voor deze site getekend."
  }
} satisfies Record<string, Bilingual>;

interface Plate {
  spec: DiagramSpec;
  id: string;
  note: Bilingual;
  /**
   * A width cap on the FRAME, not on the drawing.
   *
   * `Diagram` sizes its SVG to whatever column it is given and lets the viewBox
   * scale, so the rendered symbol size is the column width divided by the
   * canvas width. Three drawings at three different scales do not read as one
   * system, whatever else is right about them, so the frame is what brings the
   * plates into one band.
   *
   * 960 SINCE 2026-08-28, UP FROM 720. The old number was set against a
   * 598-unit canvas, where the full 1,166-pixel column would have rendered this
   * plate at a 1.95 scale — twice the size of the same symbols one section
   * above. Drawing the busbar as a rail rather than as a boxed symbol widened
   * that canvas to 825, and 720 then took the plate the other way, to a 0.87
   * scale and 10.5-pixel labels. 960 puts it at 1.16, beside the water train's
   * 1.23 and the Purdue chart's 1.40, and clear of the 11-pixel type floor
   * `Diagram` enforces through `MIN_RENDER_SCALE`.
   */
  frame?: string;
}

/**
 * One note per drawing, and each one states what an auditor should check rather
 * than describing the picture. A caption that says "this diagram shows a water
 * treatment plant" adds nothing a reader cannot see; a caption that says which
 * symbol stands in for a missing one is the thing that cannot be seen.
 */
const PLATES: Plate[] = [
  {
    spec: WATER_TREATMENT_TRAIN,
    id: "dg-water",
    note: {
      en:
        "P&ID · Twenty-two elements, twenty-five connections. Process lines run heavy and solid; " +
        "instrument outputs run dashed as electrical signals; the controller's link to the PLC is " +
        "a data link with interposed marks. Each bubble carries its own ISA-5.1 identification " +
        "letters and loop number as real text, so FT-101 and AIT-601 are not interchangeable " +
        "circles. AIC-601 is a circle in a square with a solid location line — a shared display " +
        "and control function in the control room, not a field instrument — and it is lettered A " +
        "because the variable it controls is chlorine residual, not flow. Eight marks are drawn " +
        "for this project rather than borrowed: the bar screen, clarifier, day tank, metering " +
        "pump, rapid-mix chamber, clearwell, UV reactor and inline check valve. The bubbles hang " +
        "off the run they measure on a fine instrument connection, the way ISA-5.1 draws them, " +
        "rather than being spliced into the pipe; and the train ends at the distribution network " +
        "rather than at a valve pointing nowhere.",
      nl:
        "P&ID · Tweeëntwintig elementen, vijfentwintig verbindingen. Processleidingen zijn zwaar " +
        "en doorgetrokken; instrumentuitgangen zijn gestreept als elektrisch signaal; de " +
        "verbinding van de regelaar met de PLC is een dataverbinding met tussenliggende " +
        "markeringen. Elke bol draagt de eigen ISA-5.1-letters en loopnummer als echte tekst, dus " +
        "FT-101 en AIT-601 zijn geen verwisselbare cirkels. AIC-601 is een cirkel in een vierkant " +
        "met doorgetrokken locatielijn — een gedeelde weergave- en regelfunctie in de " +
        "controlekamer, geen veldinstrument — met de letter A, omdat de geregelde grootheid het " +
        "chloorrestgehalte is en niet het debiet. Acht symbolen zijn voor dit project getekend in " +
        "plaats van geleend: grofrooster, bezinkbassin, dagtank, doseerpomp, snelmengkamer, " +
        "reinwaterkelder, UV-reactor en inline terugslagklep. De bollen hangen met een dunne " +
        "instrumentaansluiting aan de leiding die zij meten, zoals ISA-5.1 ze tekent, in plaats " +
        "van in de leiding te zijn opgenomen; en de straat eindigt op het distributienet."
    }
  },
  {
    spec: ENERGY_BESS_INFEED,
    id: "dg-energy",
    frame: "max-w-[960px]",
    note: {
      en:
        "Network · Twenty-three assets, drawn top-down because that is the direction supply " +
        "authority runs on a single-line diagram. The protection relay (IED-01) takes CT and VT " +
        "signals off the busbar and trips the incomer, which is the loop that makes it a " +
        "protection relay rather than a meter. The PV inverter and the battery power-conversion " +
        "system share one bridge symbol on purpose: an inverter and a rectifier are the same " +
        "four-device bridge, and direction is a control decision. Every mark on the drawing is " +
        "its own IEC 60617 symbol rather than a borrowed stand-in: the grid infeed (PCC) is the " +
        "AC-source circle-and-sine mark, the PV array draws its own diode-and-radiation glyph, " +
        "and the star-point earth (E-01) is a bare reference mark with no card and no arrowhead, " +
        "because a bond is not a load you feed.",
      nl:
        "Netwerk · Drieëntwintig assets, van boven naar beneden getekend omdat dat de richting is " +
        "waarin de voedingsautoriteit loopt op een eenlijnschema. Het beveiligingsrelais (IED-01) " +
        "neemt CT- en VT-signalen van de rail en schakelt de inkomende schakelaar uit; die lus " +
        "maakt het een beveiligingsrelais en geen meter. De PV-omvormer en de vermogensomzetter " +
        "van de batterij delen bewust één bruggesymbool: een omvormer en een gelijkrichter zijn " +
        "dezelfde brug van vier componenten. Elk symbool op de tekening is een eigen " +
        "IEC 60617-symbool en geen geleend vervangingssymbool: de netaansluiting (PCC) is het " +
        "AC-bronsymbool met cirkel en sinus, het PV-veld tekent zijn eigen diode-met-straling, en " +
        "de sterpuntaarding (E-01) is een kaal referentiesymbool zonder kader en zonder pijlpunt, " +
        "want een aardverbinding is geen belasting die gevoed wordt."
    }
  },
  {
    spec: MANUFACTURING_PURDUE,
    id: "dg-manufacturing",
    note: {
      en:
        "Purdue · Twenty assets and twenty-one connections across six bands, L4 down to L0, with " +
        "the industrial DMZ drawn as its own level 3.5 rather than folded into the levels either " +
        "side of it. Every node states its level; the contract refuses to render this type " +
        "otherwise, because an asset guessed into the wrong band is a false security claim. The " +
        "safety loop is complete and independent: ZSH-201 into SIS-01 into KM-207, sensor to logic " +
        "solver to final element, with only a status report going to the line PLC — and the safety " +
        "zone is outlined across the L0/L1 boundary, because a zone is not a level. Two edges skip " +
        "a level, historian replication through the unidirectional gateway and the engineering " +
        "workstation's logic download to the PLC, and both are routed out into the right-hand " +
        "corridor so the exception looks like an exception. XV-306 is a valve body with its tag, " +
        "not an instrument bubble; a bubble is a measuring function and would not say a valve is " +
        "there. What the drawing still does not carry is the actuator above that valve body — " +
        "ISA-5.1 puts the tag bubble on an actuator stem, and no actuator geometry exists in the " +
        "glyph set yet.",
      nl:
        "Purdue · Twintig assets en eenentwintig verbindingen over zes banden, L4 tot L0, met de " +
        "industriële DMZ als eigen niveau 3.5 in plaats van samengevouwen met de niveaus eromheen. " +
        "Elk knooppunt vermeldt zijn niveau; het contract weigert dit type anders te renderen, " +
        "omdat een asset die in de verkeerde band wordt geraden een onjuiste beveiligingsclaim is. " +
        "De veiligheidslus is compleet en onafhankelijk: ZSH-201 naar SIS-01 naar KM-207, sensor " +
        "naar logicaverwerker naar eindregelelement, met alleen een statusmelding naar de " +
        "lijn-PLC — en de veiligheidszone is over de grens tussen L0 en L1 omlijnd, omdat een zone " +
        "geen niveau is. Twee verbindingen slaan een niveau over, historianreplicatie via de " +
        "unidirectionele gateway en de logica-download van het engineeringwerkstation naar de PLC; " +
        "beide lopen via de rechterkolom, zodat de uitzondering er ook als uitzondering uitziet. " +
        "XV-306 is een klephuis met zijn tag, geen instrumentbol; een bol is een meetfunctie en " +
        "zegt niet dat er een klep staat. Wat het schema nog niet toont is de aandrijving boven " +
        "dat klephuis — ISA-5.1 plaatst de tagbol op een aandrijfsteel, en die geometrie bestaat " +
        "nog niet in de symbolenset."
    }
  }
];

export default async function DiagramGalleryPage(props: PageProps<"/[locale]/diagram-gallery">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();

  return (
    <div className="oxot-canvas pb-24">
      <header className="pt-12 lg:pt-16">
        <p className="oxot-kicker">{pick(UI.kicker, locale)}</p>
        <h1 className="mt-4">{pick(UI.heading, locale)}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{pick(UI.lede, locale)}</p>
      </header>

      {PLATES.map((plate) => (
        <section key={plate.id} className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-[1.375rem] font-bold leading-snug text-foreground">
            {pick(plate.spec.title, locale)}
          </h2>
          <p className="mt-4 body-copy leading-relaxed text-muted-foreground">
            {pick(plate.note, locale)}
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <div className={plate.frame ? `${plate.frame} mx-auto` : undefined}>
              <Diagram id={plate.id} locale={locale} spec={plate.spec} />
            </div>
          </div>
        </section>
      ))}

      <p className="mono-label mt-14 border-t border-border pt-8 text-muted-foreground">
        {pick(UI.provenance, locale)}
      </p>
    </div>
  );
}
