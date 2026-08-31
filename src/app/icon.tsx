import { ImageResponse } from "next/og";

/**
 * THE BROWSER TAB ICON — "OX", with the X in Dutch orange.
 *
 * There was no icon of any kind in this app: no `icon`, no `favicon.ico`, no
 * `apple-icon`. Next serves its own default when none is declared, so every
 * tab and every pasted link showed the Next.js logo on a site whose entire
 * argument is that it is a Dutch OT engineering firm.
 *
 * GENERATED, NOT A BINARY. It is drawn from the same two values the site
 * already uses — the foreground and `--primary` (28 90% 55%) — so it cannot
 * drift from the wordmark the way a checked-in .ico silently does. The X is
 * the accent for the same reason it is in the header wordmark: O-X-O-T, and
 * the X is the one that carries the colour.
 *
 * 32px is the size a browser actually renders in a tab. Anything larger is
 * downscaled by the browser and loses the counters in the O.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          /* Near-black plate rather than transparent: a transparent favicon
             disappears against a dark browser chrome, which is most of them. */
          background: "#0B0C10",
          borderRadius: 6,
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: -0.5,
          fontFamily: "Helvetica, Arial, sans-serif"
        }}
      >
        <span style={{ color: "#F2F4F8" }}>O</span>
        <span style={{ color: "#F2820D" }}>X</span>
      </div>
    ),
    size
  );
}
