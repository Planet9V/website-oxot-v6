import { cn } from "@/lib/utils";

/**
 * THE SIGNATURE MOTIF for this page: a small glowing "status" indicator —
 * the control-room-dashboard direction's answer to energy-utilities'
 * single-line diagram (EnergyLine.tsx). Purely decorative (no real
 * telemetry behind it), built on the theme's --primary token via bg-primary
 * so the glow follows the light/dark toggle rather than a fixed hex value.
 * Always aria-hidden — see call sites for the accessible text it sits next
 * to.
 */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-2 shrink-0 rounded-full bg-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.15),0_0_8px_1px_hsl(var(--primary)/0.55)]",
        className
      )}
    />
  );
}
