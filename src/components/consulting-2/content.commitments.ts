/**
 * COMMITMENTS — "Vendor neutral. Evidence owned by you." content slice for
 * `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L473–L498. Every exported string carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * AN UNORDERED SET, NOT A FLOW. L483–L496 is a fenced block holding four
 * labelled commitments — vendor-neutral, passive-first, evidence you own,
 * designed for handover. There are NO arrows between them, no numbering, and no
 * dependency: each is true on its own and none follows from another. They are
 * modelled as a flat `readonly` array of cards for that reason, and the array
 * order is the source's print order only. Nothing downstream may render them as
 * a sequence, a funnel, a timeline, a maturity ladder or connected nodes, and
 * nothing may number them on screen — a rendered order would assert a
 * progression the source explicitly does not have.
 *
 * WHY `label` AND `body` ARE SEPARATE FIELDS. Each block in the fence is a short
 * label on its own line followed by its explanation (e.g. L484 then L485). The
 * split is the source's own, kept so a card can style the promise and its
 * qualification differently without either being reworded.
 *
 * ZERO NUMERIC CLAIMS. L473–L498 contains no percentage, currency, duration,
 * count, headcount, customer name or certification. There is nothing here to
 * render as a figure, a score or a bar.
 *
 * NOT CLAIMED: no certification, audit result, accreditation or third-party
 * attestation is asserted anywhere in this range. L481 states the opposite
 * posture in the source's own words — findings are argued from evidence, not
 * authority. The passive-first commitment (L487–L488) is a statement about how
 * OXOT works, NOT a security guarantee, and must not be restyled into one.
 *
 * EXCLUDED CITATION: the source's citation at L498 is a presigned S3 URL
 * carrying an `Expires=` parameter and an embedded access key — a short-lived
 * credentialed link, not a publishable reference. Its supporting sentence is
 * therefore not transcribed and the link must not be shipped. The passive-first
 * commitment still ships on the strength of the fenced block at L487–L488, which
 * is body copy in its own right and needs no citation to be printed. If a
 * durable public reference for the platform's passive-first operation is
 * obtained later it can be added here; until then this section carries no
 * citation at all.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

/** One commitment card. Members of an unordered set — see the file header. */
export interface Commitment {
  /** DOM identity, not copy. Never derive it from array position, never
   *  translate it. */
  id: string;
  /** The commitment's short label, verbatim. */
  label: Bilingual;
  /** The sentence that qualifies the label, verbatim. */
  body: Bilingual;
}

export const COMMITMENTS = {
  /** Section anchor, matching ANCHORS in ./content. */
  sectionId: "commitments",
  /** Source L473 — the source's own section title. */
  datumLabel: same("Vendor neutral. Evidence owned by you."),
  /** Source L475. */
  h2: same("Engagements designed to end."),

  /** Source L477–L481, the three paragraphs preceding the cards, in source
   *  order. Kept separate rather than joined: each makes its own point, and
   *  L481 in particular is a posture statement that must not be absorbed into
   *  the paragraph above it. */
  paragraphs: [
    /** Source L477. */
    same(
      "The best consulting engagement leaves the customer stronger, not more dependent."
    ),
    /** Source L479. */
    same(
      "OXOT works with customer engineers rather than at them. The people responsible for safety, reliability, controls, operations, IT, procurement, security, and budget should be able to see the reasoning behind a decision."
    ),
    /** Source L481. */
    same(
      "Nobody is being audited for the sake of it. Findings are argued from evidence, not authority."
    )
  ],

  /** Source L484–L495. FOUR CARDS, NO ORDER. Array order is the source's print
   *  order and carries no meaning — do not number, connect or sequence these. */
  items: [
    {
      id: "vendor-neutral",
      /** Source L484. */
      label: same("Vendor-neutral"),
      /** Source L485. */
      body: same("No product resale agenda.")
    },
    {
      id: "passive-first",
      /** Source L487. */
      label: same("Passive-first"),
      /** Source L488. A statement of method, not a security guarantee. */
      body: same(
        "No agents on controllers and no active scanning of production networks."
      )
    },
    {
      id: "evidence-you-own",
      /** Source L490. */
      label: same("Evidence you own"),
      /** Source L491–L492. The source wraps this sentence across two lines
       *  inside the fence; it is one sentence and is joined here. */
      body: same(
        "Your system model, source material, decision rationale, and outputs remain available to your team."
      )
    },
    {
      id: "designed-for-handover",
      /** Source L494. */
      label: same("Designed for handover"),
      /** Source L495. */
      body: same(
        "The method, model, and reasoning stay when the engagement ends."
      )
    }
  ] satisfies readonly Commitment[]

  /* GAP, FLAGGED NOT FILLED: the source states no contract term, no data
     retention period, no deployment option and no handover date in L473–L498.
     (Deployment options are named only inside the excluded L498 citation
     sentence, which is not transcribed.) None is invented here. */
};
