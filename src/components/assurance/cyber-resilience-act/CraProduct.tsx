import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { PRODUCT_BOUNDARY, BY_DESIGN } from "./content-model";
import { Section, SectionHead, DataTable, Figure, TraceList } from "./kit";

/**
 * 06 — THE PRODUCT BOUNDARY, and 07 — SECURITY BY DESIGN.
 *
 * The SVG below is a real drawing of the structure the source spec describes
 * in ASCII: a product core, a boundary, and the seven classes of dependency
 * that cross it. It is STATIC and its caption says so. There is no toggle,
 * no hover state, no data behind it and no text anywhere claiming otherwise
 * — a diagram that implies a live model it does not have is the failure this
 * repo has already paid for once.
 *
 * Every stroke and fill is a theme token, so it inverts with the theme
 * instead of becoming a white rectangle on navy.
 */

const VB_W = 940;
const VB_H = 430;
const CORE_X = 24;
const CORE_Y = 145;
const CORE_W = 268;
const CORE_H = 140;
const BOUNDARY_X = 372;
const EDGE_X = 452;
const EDGE_W = 464;
const EDGE_H = 44;
const EDGE_GAP = 12;
const EDGE_TOP = 18;

export function CraProduct({ locale }: { locale: Locale }) {
  const coreCy = CORE_Y + CORE_H / 2;

  return (
    <>
      <Section id="product-boundary">
        <SectionHead
          n="06"
          id="product-boundary"
          title={pick(PRODUCT_BOUNDARY.title, locale)}
          dek={pick(PRODUCT_BOUNDARY.dek, locale)}
        />

        <Figure caption={pick(PRODUCT_BOUNDARY.figCaption, locale)}>
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="img"
            aria-label="A product core containing embedded software, firmware, hardware and security functions, with seven classes of dependency crossing its boundary: user and operator interfaces; OT and IT protocols and network interfaces; configuration and diagnostics; update and recovery interfaces; certificates and cryptography; cloud, API and mobile services; and vendor, integrator and field-service support"
            className="h-auto w-full min-w-[42rem]"
          >
            {/* The boundary itself — the line the whole section is about. */}
            <line
              x1={BOUNDARY_X}
              y1={8}
              x2={BOUNDARY_X}
              y2={VB_H - 8}
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              strokeDasharray="6 6"
            />
            <text
              x={BOUNDARY_X - 8}
              y={VB_H - 10}
              textAnchor="end"
              fontSize={11}
              letterSpacing={1}
              fill="hsl(var(--primary-ink))"
            >
              PRODUCT BOUNDARY
            </text>

            {/* The core. */}
            <rect
              x={CORE_X}
              y={CORE_Y}
              width={CORE_W}
              height={CORE_H}
              rx={10}
              fill="hsl(var(--muted))"
              /* --primary-ink, not --primary: this outline is what marks the
                 core as the product, so 1.4.11 applies and orange measures
                 2.55:1 against the light card. */
              stroke="hsl(var(--primary-ink))"
              strokeWidth={1.5}
            />
            <text x={CORE_X + 22} y={CORE_Y + 46} fontSize={19} fontWeight={700} fill="hsl(var(--foreground))">
              {pick(PRODUCT_BOUNDARY.core, locale)}
            </text>
            {pick(PRODUCT_BOUNDARY.coreSub, locale)
              .split(" · ")
              .map((part, i) => (
                <text
                  key={part}
                  x={CORE_X + 22}
                  y={CORE_Y + 72 + i * 18}
                  fontSize={12}
                  fill="hsl(var(--muted-foreground))"
                >
                  {part}
                </text>
              ))}

            {PRODUCT_BOUNDARY.edges.map((edge, i) => {
              const y = EDGE_TOP + i * (EDGE_H + EDGE_GAP);
              const cy = y + EDGE_H / 2;
              return (
                <g key={edge.en}>
                  {/* Connector: out of the core, across the boundary, into the box. */}
                  <path
                    d={`M ${CORE_X + CORE_W} ${coreCy} C ${BOUNDARY_X} ${coreCy}, ${BOUNDARY_X} ${cy}, ${EDGE_X} ${cy}`}
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.25}
                  />
                  <rect
                    x={EDGE_X}
                    y={y}
                    width={EDGE_W}
                    height={EDGE_H}
                    rx={8}
                    fill="hsl(var(--card))"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1}
                  />
                  <text x={EDGE_X + 18} y={cy + 5} fontSize={13} fill="hsl(var(--foreground))">
                    {pick(edge, locale)}
                  </text>
                </g>
              );
            })}
          </svg>
        </Figure>

        <DataTable
          head={PRODUCT_BOUNDARY.tableHead.map((h) => pick(h, locale))}
          rows={PRODUCT_BOUNDARY.rows.map((r) => r.map((c) => pick(c, locale)))}
        />
      </Section>

      <Section id="by-design">
        <SectionHead n="07" id="by-design" title={pick(BY_DESIGN.title, locale)} dek={pick(BY_DESIGN.dek, locale)} />

        <DataTable
          head={BY_DESIGN.tableHead.map((h) => pick(h, locale))}
          rows={BY_DESIGN.rows.map((r) => r.map((c) => pick(c, locale)))}
        />

        <TraceList
          label={pick(BY_DESIGN.worked.label, locale)}
          rows={BY_DESIGN.worked.steps.map((s) => ({ k: pick(s.k, locale), v: pick(s.v, locale) }))}
        />
      </Section>
    </>
  );
}
