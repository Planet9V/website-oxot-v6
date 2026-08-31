import { pick } from "@/i18n/bilingual";
import type { Bilingual } from "@/i18n/bilingual";
import { PAD } from "./layout-shared";
import type { PurdueBand, RoutedEdge } from "./layout-shared";
import type { Point } from "./geometry";
import {
  DiagramEdgeLayer,
  DiagramNodeMark,
  INK,
  INK_STRONG,
  PLATE,
  type TypeRendererProps
} from "./BlockDiagram";
import {
  ConduitTick,
  perimeterRules,
  tickHalf,
  zoneCrossings,
  ZONE_DASH,
  ZONE_STROKE,
  ZonePerimeter,
  zoneSegments,
  type ZoneTick
} from "./purdue-zones";
import { PURDUE_LEVEL_LABEL } from "./types";

/**
 * PURDUE — strict horizontal bands, one per level, L5 at the top and L0 at the
 * bottom. The band geometry comes from `layoutPurdue`; ELK only decided the
 * left-to-right order inside each band.
 *
 * EVERY BAND IN THE SPEC IS DRAWN AT FULL WIDTH, including a band holding one
 * node. A band that shrinks to fit its contents stops being a level and becomes
 * a group box, and the reader loses the thing the drawing exists to assert:
 * that an asset's vertical position is a claim about where it sits in the
 * reference architecture, not a consequence of how many neighbours it happened
 * to have. The one exception is stated at `drawsAsLevel` below, and it is an
 * exception about what a level IS rather than about how wide one is drawn.
 *
 * THE CAPTION GUTTER IS PART OF THE BAND, not a separate axis-label column, so
 * a band and its name cannot drift apart when the canvas scrolls horizontally
 * on a narrow viewport.
 */

/** The industrial DMZ, drawn as its own level rather than folded into a neighbour. */
const DMZ = 3.5;

const GUTTER_X = 124;
/**
 * How far the DMZ's perimeter sits inside its band's own border.
 *
 * 9, up from 5 on 2026-08-28, and the reason is the tick that crosses both. A
 * conduit tick is two bars 3.5 either side of the band border, each 1.6 wide, so
 * the lower bar occupies 370.7–372.3; at an inset of 5 the perimeter ran at
 * 372.35–373.65 with the stroke width `ZONE_DASH` now carries. That is 0.05
 * units of clear space — the bar and the rule painted as ONE 3-unit mark, and
 * the tick stopped reading as a pair and started reading as a thickening of the
 * boundary. At 9 the bar clears the rule by 4 units and both marks say their own
 * thing.
 */
const BAND_INSET = 9;

function BandRow({ band, width, caption }: { band: PurdueBand; width: number; caption: string[] }) {
  const dmz = band.level === DMZ;
  const size = captionSize(caption);
  return (
    <g data-purdue-level={band.level}>
      <rect
        x={PAD}
        y={band.y}
        width={width}
        height={band.height}
        rx={4}
        fill={PLATE}
        stroke={dmz ? INK_STRONG : INK}
        strokeWidth={dmz ? 1.75 : 1.25}
      />
      {/* THE DMZ IS DRAWN AS A DOUBLE, BROKEN BAND, AND THAT IS THE WHOLE POINT
          OF GIVING IT A LEVEL. Until 2026-08-28 it was an identical rect with an
          identical stroke and an identical fill, and the audit said so: "only
          the text says DMZ". A reader scanning the geometry — which is how an
          architecture chart is read — saw six equivalent zones and no boundary.
          The second, dashed rule reads as a perimeter rather than as a
          container, which is what a 62443 broker zone is; the conduit marks
          below say where each connection pierces it. */}
      {dmz && (
        <rect
          x={PAD + BAND_INSET}
          y={band.y + BAND_INSET}
          width={width - BAND_INSET * 2}
          height={band.height - BAND_INSET * 2}
          rx={2}
          fill="none"
          stroke={INK_STRONG}
          strokeWidth={ZONE_STROKE}
          strokeDasharray={ZONE_DASH}
        />
      )}
      {/* The gutter divider: where the caption ends and the level's assets begin. */}
      <line
        x1={PAD + GUTTER_X}
        y1={band.y}
        x2={PAD + GUTTER_X}
        y2={band.y + band.height}
        stroke={INK}
        strokeWidth={1}
      />
      {caption.map((line, i) => (
        <text
          key={i}
          x={PAD + CAPTION_X}
          y={band.y + 25 + i * 13.5}
          fontSize={i === 0 ? 12.5 : size}
          fontWeight={i === 0 ? 600 : 400}
          letterSpacing={i === 0 ? "0.08em" : "0.02em"}
          fill={i === 0 ? INK_STRONG : INK}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** "L3 · Site operations" → ["L3", "Site", "operations"], wrapped to the gutter. */
function captionLines(text: string): string[] {
  const [code, ...rest] = text.split(" · ");
  const lines: string[] = [code];
  let line = "";
  for (const word of rest.join(" · ").split(" ")) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= 15) line = `${line} ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

/** Where a caption line starts, measured from the sheet margin. */
const CAPTION_X = 14;
const CAPTION_SIZE = 11.5;
/**
 * The floor a fitted caption stops at: the size the ISA tags on this sheet are
 * ALREADY set in. A name at tag size introduces no new smallest type and does
 * not move the drawing's measured minimum; anything under it would.
 */
const CAPTION_MIN = 9;
/** Line length the gutter affords: its width, less the inset, less clear space. */
const CAPTION_BUDGET = GUTTER_X - CAPTION_X - 14;

/**
 * HOW WIDE A CAPTION LINE PAINTS, with no browser to ask at render time.
 *
 * TWO CLASSES, NOT ONE AVERAGE ADVANCE, because one ratio cannot separate
 * `Toezichthoudende` (102.3 units painted) from `Locatiebedrijfsvoering`
 * (122.9) — six characters longer and only 20 units wider, since a Dutch
 * compound is full of `i`, `j`, `f`, `r` and `t`. Solved against the captions
 * this drawing actually renders: 0.30 em narrow, 0.62 em otherwise, worst case
 * -3.4% (`Industriële DMZ`, which is nowhere near the divider) and +4% the other
 * way. The overshoot is the safe direction — it can only set a line slightly
 * smaller than it strictly had to be, never leave one long.
 */
const NARROW = /[iljtfrI.,:;·'\s]/;
function captionWidth(text: string, size: number): number {
  let em = 0;
  for (const ch of text) em += NARROW.test(ch) ? 0.3 : 0.62;
  return em * size;
}

/**
 * A LEVEL NAME IS SET TO FIT ITS GUTTER, AT ONE SIZE FOR THE WHOLE BLOCK.
 *
 * `captionLines` wraps on a 15-character WORD budget and therefore cannot touch
 * a single long word. The Dutch L3 name is one: `Locatiebedrijfsvoering` painted
 * 122.9 units from x = 38 against the gutter divider at x = 148, so the divider
 * ran through `…ing` — a rule striking a caption, on every render, in one of the
 * site's two languages. `Toezichthoudende` at L2 cleared it by 7.7.
 *
 * THE DIVIDER CANNOT BE THE THING THAT MOVES. `GUTTER_X` here and
 * `BAND_LABEL_W` in `layout-purdue` are the same 124 read twice, and the first
 * asset column sits 30 units past the divider; fitting that word at 11.5 needs
 * the divider at ~177, which is 1 unit off the first card. There is no gutter
 * width that holds it at full size, so the type yields instead.
 *
 * ONE SIZE PER CAPTION, not per line: two lines of one name at two sizes reads
 * as two different labels. The level CODE keeps 12.5 — it is the rank marker,
 * it is four characters at most, and it always fits.
 *
 * Nothing English is touched: the longest EN line estimates at 84.9 against a
 * budget of 96, so `L4 · Site business systems` and the rest render
 * byte-identical.
 */
function captionSize(lines: string[]): number {
  let size = CAPTION_SIZE;
  for (const line of lines.slice(1)) {
    const width = captionWidth(line, CAPTION_SIZE);
    if (width > CAPTION_BUDGET) size = Math.min(size, (CAPTION_SIZE * CAPTION_BUDGET) / width);
  }
  return Math.max(CAPTION_MIN, size);
}

/**
 * WHERE EACH CONNECTION PIERCES THE DMZ.
 *
 * A zone boundary that nothing is drawn crossing is decoration. IEC 62443's
 * unit of analysis is the CONDUIT — the controlled crossing — so the mark goes
 * where a route actually cuts the band edge, computed from the routed geometry
 * rather than from the edge list. An edge that terminates inside the DMZ never
 * crosses its boundary and correctly gets no mark.
 */
function conduitCrossings(edges: RoutedEdge[], band: PurdueBand, right: number): Point[] {
  const out: Point[] = [];
  for (const edge of edges) {
    for (let i = 1; i < edge.points.length; i++) {
      const a = edge.points[i - 1];
      const b = edge.points[i];
      if (Math.abs(b.x - a.x) > 0.5) continue; // vertical runs only
      if (a.x < PAD || a.x > right) continue;
      for (const y of [band.y, band.y + band.height]) {
        if ((a.y - y) * (b.y - y) < 0) out.push({ x: a.x, y });
      }
    }
  }
  return out;
}

/**
 * THE THREE ZONES THIS DRAWING OUTLINES, AND WHY THEY ARE THE ONLY THREE.
 *
 * Every node carries an IEC 62443 `zone`, and until 2026-08-28 the drawing did
 * nothing with any of them — the audit's phrase for it was "zones carried but
 * not drawn". Outlining all of them would be worse than outlining none: a
 * dashed rectangle round an arbitrary group is inventing security notation, and
 * five overlapping rectangles on six bands is a plaid. That reasoning stands,
 * and this is NOT a generalisation of it to "outline any declared zone". It is
 * an explicit list, and the test each member had to pass is stated here.
 *
 * A ZONE IS OUTLINED WHEN ITS PERIMETER SAYS SOMETHING THE BANDING CANNOT — and
 * is not outlined when the band's own caption already says it.
 *
 * SAFETY INSTRUMENTED passes because it CROSSES a band boundary. It is the one
 * grouping the drawing already argues for in prose — the safety PLC takes its
 * interlock straight from the guard switches and never through the line PLC,
 * IEC 61511 §11.2.4 — and spanning L1 and L0 it states the thing stacked bands
 * cannot: that a zone is not a level. It is also the zone that forced the
 * perimeter to become a staircase; see `zoneSegments`.
 *
 * ENTERPRISE passes because the band holding it is captioned "Site business
 * systems" while the word "enterprise" appears on no band this drawing now
 * draws. Its members are `ERP-01` and `SIEM-01` at L4, so the perimeter is the
 * only mark that can state where the enterprise zone actually is — precisely a
 * thing the banding cannot say.
 *
 * EXTERNAL passes because it is the boundary the whole sheet is about, and
 * because after the repair at `drawsAsLevel` it is the ONLY mark round `EXT-01`.
 *
 * SITE OPERATIONS, BODY SHOP CELL and PAINT SHOP still fail both tests. Each
 * sits under a caption that agrees with it, so a rectangle round any of them
 * would restate the caption in a heavier notation and buy the plaid. They stay
 * carried and undrawn, which is a rule rather than an omission.
 */
const SAFETY_ZONE = "Safety instrumented";
const EXTERNAL_ZONE = "External";
const ENTERPRISE_ZONE = "Enterprise";
const DRAWN_ZONES: { zone: string; caption: Bilingual }[] = [
  { zone: SAFETY_ZONE, caption: { en: "Safety zone", nl: "Veiligheidszone" } },
  // "Bedrijfszone" is the reading this sheet's own Dutch already uses for the
  // enterprise tier — `Bedrijfssystemen locatie` at L4, `Bedrijfsbrede SIEM` on
  // the node itself — with the 62443 qualifier taken into Dutch and `zone` left
  // standing, as NEN-EN-IEC 62443 leaves it.
  { zone: ENTERPRISE_ZONE, caption: { en: "Enterprise zone", nl: "Bedrijfszone" } },
  // "Externe zone" is the ordinary Dutch reading of a 62443 zone name: NEN-EN-IEC
  // 62443 keeps `zone` itself untranslated and takes the qualifier into Dutch,
  // which is what this node's own label already does — `Externe
  // leveranciersondersteuning`.
  { zone: EXTERNAL_ZONE, caption: { en: "External zone", nl: "Externe zone" } }
];

/**
 * A BAND HOLDING NOTHING BUT THIRD PARTIES IS NOT A LEVEL, AND IS NO LONGER
 * DRAWN AS ONE.
 *
 * `EXT-01` is a vendor. It was banded `purdue: 4` until 2026-08-28, which put an
 * outsider inside "L4 · Site business systems" beside the site's own ERP; the
 * repair moved it to 5, which put it inside "L5 · Enterprise network" instead.
 * That is better and still wrong, and a check against Rockwell's published
 * Converged Plantwide Ethernet material says why. The Enterprise Zone there does
 * legitimately span Levels 4 and 5 — so L5 is a real level and the band was not
 * the mistake. But Rockwell never puts the partner IN it: their remote-access
 * figures draw the partner as a separate "Remote site" compartment facing the
 * industrial plantwide systems across a remote-access server, and their
 * defence-in-depth figure places remote engineers and partners as the OUTERMOST
 * ring, outside the enterprise altogether. A vendor is not an L5 asset. It is
 * not an asset of the site's architecture at all.
 *
 * A drawn perimeter mitigated the reading and could not fix it, because a
 * rectangle inside a captioned rectangle reads as containment however it is
 * stroked. So the LEVEL is what goes. A band whose every occupant is in the
 * External zone is drawn without its plate, without its caption and without its
 * divider — it becomes a compartment above the stack rather than the top of it,
 * and the level stack a reader scans now runs L4 down to L0, which is exactly
 * the set of levels this site has assets in. What remains round `EXT-01` is its
 * 62443 zone perimeter, which keeps the standard's requirement that every asset
 * belong to a zone or a conduit, and the TLS VPN riser running down into the
 * DMZ jump host — the brokered session still arriving through L3.5.
 *
 * THE BAND STILL EXISTS IN THE LAYOUT, and that is deliberate rather than
 * leftover: `layoutPurdue` sizes gutters, books conduit lanes and assigns riser
 * corridors from the band stack, so removing the row there would move every
 * conduit on the sheet to fix a caption. The row keeps its geometry and loses
 * its claim.
 *
 * THE REST OF THE FIX NEEDS A `types.ts` CHANGE THIS FILE MAY NOT MAKE.
 * `PurdueLevel` is `0 | 1 | 2 | 3 | 3.5 | 4 | 5` with no tier for somebody
 * else's network, and `assertSpecResolves` throws for a `purdue` spec node with
 * no level at all — so the spec still has to say `purdue: 5` for `EXT-01` to be
 * placed above L4, and `Diagram`'s screen-reader list still reads that number
 * back as "L5 · Enterprise network". The drawing no longer says it; the
 * accessible text still does. Closing that needs either an `external` tier on
 * `PurdueLevel` or an exemption in `assertSpecResolves` for a node whose zone
 * puts it off-site.
 */
function drawsAsLevel(band: PurdueBand, nodes: TypeRendererProps["spec"]["nodes"]): boolean {
  const members = nodes.filter((n) => n.purdue === band.level);
  return members.length === 0 || members.some((n) => n.zone !== EXTERNAL_ZONE);
}

export function PurdueDiagram({ spec, layout, locale, idPrefix }: TypeRendererProps) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const bandWidth = layout.bandWidth;
  const dmzBand = layout.bands.find((b) => b.level === DMZ);
  const conduits = dmzBand ? conduitCrossings(layout.edges, dmzBand, PAD + bandWidth) : [];

  const zones = DRAWN_ZONES.flatMap(({ zone, caption }) => {
    const segs = zoneSegments(
      layout.nodes.filter((placed) => byId.get(placed.id)?.zone === zone),
      PAD + GUTTER_X,
      // EVERY ROUTE ON THE SHEET, so the perimeter's step can be kept off the
      // conduit lanes it is dropped among — see `zoneSegments`. Not this zone's
      // own conduits only: a foreign conduit running beside the boundary doubles
      // it exactly as one of its own would.
      layout.edges
    );
    if (segs.length === 0) return [];
    const rules = perimeterRules(segs);
    return [
      { zone, segs, label: pick(caption, locale), crossings: zoneCrossings(layout.edges, rules) }
    ];
  });
  // EVERY TICK ON THE SHEET AS ONE SET, computed before anything is drawn.
  //
  // It is one set for two reasons. The edge layer needs all of them to keep its
  // marks off them: a mark every 26 units along a conduit and a tick at every
  // boundary piercing are two placement rules that never consulted each other,
  // and since the Industrial DMZ zone IS the L3.5 band they collided at seven of
  // eight ticks — the bar bisecting the bubble, painting one blob. The tick is
  // the stronger, 62443-meaningful claim, so the mark yields; see
  // `TICK_CLEARANCE`. And `tickHalf` needs all of them to know which ticks
  // crowd each other, which it cannot see one boundary at a time.
  const ticks: ZoneTick[] = [
    ...conduits.map((p) => ({ p, vertical: false })),
    ...zones.flatMap((z) => z.crossings)
  ];

  return (
    <>
      {/* Bands first: edges and nodes are drawn ON them, never under them. */}
      {layout.bands
        .filter((band) => drawsAsLevel(band, spec.nodes))
        .map((band) => (
          <BandRow
            key={band.level}
            band={band}
            caption={captionLines(pick(PURDUE_LEVEL_LABEL[band.level], locale))}
            width={bandWidth}
          />
        ))}
      {zones.map((z) => (
        <ZonePerimeter key={z.zone} segs={z.segs} label={z.label} />
      ))}
      <DiagramEdgeLayer
        conduitTicks={ticks.map((t) => t.p)}
        idPrefix={idPrefix}
        layout={layout}
        locale={locale}
        spec={spec}
      />
      {ticks.map((t) => (
        <ConduitTick
          key={`${t.vertical ? "v" : "h"}-${t.p.x}-${t.p.y}`}
          half={tickHalf(t, ticks)}
          p={t.p}
          vertical={t.vertical}
        />
      ))}
      {layout.nodes.map((box) => {
        const node = byId.get(box.id);
        return node ? <DiagramNodeMark key={box.id} box={box} locale={locale} node={node} /> : null;
      })}
    </>
  );
}
