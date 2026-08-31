import { ImageResponse } from "next/og";

/**
 * THE SHARE CARD — what a pasted OXOT link looks like in Slack, Teams,
 * LinkedIn, WhatsApp or a search result's rich preview.
 *
 * There was none, so a link to this site previewed with the Next.js default.
 * For a firm selling engineering credibility to industrial operators, a link
 * that arrives in a buyer's Teams channel wearing a framework's logo is a
 * worse first impression than no preview at all.
 *
 * DELIBERATELY TYPOGRAPHIC. No photography, same as the site — the wordmark,
 * the sentence the company leads with, and the one credential that is
 * externally adjudicated. 1200x630 is the size every platform crops toward.
 *
 * Drawn with the site's own values: `--background` #0B0C10, `--foreground`
 * #F2F4F8, `--primary` #F2820D. Kept in sync by being the same three hexes the
 * icon uses; if the brand moves, both move together.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OXOT — Operational eXcellence in Operational Technology";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0C10",
          padding: 72,
          fontFamily: "Helvetica, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#F2F4F8", letterSpacing: 6 }}>O</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#F2820D", letterSpacing: 6 }}>X</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#F2F4F8", letterSpacing: 6 }}>O</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#F2F4F8", letterSpacing: 6 }}>T</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, lineHeight: 1.15, color: "#F2F4F8", maxWidth: 960 }}>
            The full picture of your OT risk — and where your next euro reduces it most.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9AA3B2", marginTop: 28 }}>
            Dutch OT security engineering · IEC 62443 native
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderTop: "2px solid #F2820D",
            paddingTop: 22
          }}
        >
          <span style={{ fontSize: 22, color: "#9AA3B2" }}>
            Cyber Digital Twin co-funded under CIF-NL 2025 · Oxot B.V., Netherlands
          </span>
        </div>
      </div>
    ),
    size
  );
}
