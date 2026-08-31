import { Badge } from "@/components/ui/badge";

/**
 * Repeated column header for the dual-track sections (Architecture,
 * Scenarios, Decisions, Worked example). "Repeated" rather than
 * position:sticky, deliberately — a sticky header re-declared in four
 * separate sections risks stacking-context and z-index fights with the
 * global header; a plain repeated label at the top of each column reads
 * just as clearly on a page this long and carries none of that risk.
 *
 * `variant` gives the two tracks a visibly different treatment (filled vs
 * outline) using only the badge component already in the system — no new
 * color tokens invented for "passenger" vs "freight".
 */
export function RailTrackHeader({ label, variant }: { label: string; variant: "passenger" | "freight" }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <Badge variant={variant === "passenger" ? "default" : "outline"} className="mono-label">
        {label}
      </Badge>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}
