"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const motionAllowed = () => !window.matchMedia(REDUCED_MOTION).matches;

// The server cannot know the preference, so it renders the still alone — the
// same first paint the client produces before the subscription resolves.
const motionAllowedOnServer = () => false;

/**
 * THE WHAT-IF TEST SECTION'S IMAGE — same treatment as `Cdt2HeroMedia` and
 * `Cdt2InvestmentMedia`: the still renders first and stays mounted, and the
 * looping video crossfades in over it once it has enough data to play.
 *
 * NO SIZE CHANGE HERE, unlike the hero (-25%) and investment (+20%) panes —
 * the container keeps its existing `h-auto w-full` sizing from the still
 * image's own 1600x1600 square. The video source (`CDT_arch_motion.mp4`,
 * corrected 2026-08-31 — the prior source was the wrong clip and, at
 * 1792x1024, was being force-cropped into the square frame, which read as
 * oversized/misaligned against the still) is 1440x1440, the same 1:1 ratio as
 * the still, so `object-cover` scales rather than crops and the two layers
 * stay pixel-aligned edge to edge.
 */
export function Cdt2TestMedia({ image }: { image: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const allowMotion = useSyncExternalStore(subscribeToMotionPreference, motionAllowed, motionAllowedOnServer);

  useEffect(() => {
    if (!allowMotion) return;
    const el = videoRef.current;
    if (!el) return;
    // `readyState >= 3` (HAVE_FUTURE_DATA) covers the case the video is
    // already cached and fires `loadeddata` before this effect attaches.
    if (el.readyState >= 3) {
      setVideoReady(true);
      return;
    }
    const onReady = () => setVideoReady(true);
    el.addEventListener("loadeddata", onReady);
    return () => el.removeEventListener("loadeddata", onReady);
  }, [allowMotion]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt="Layered what-if control experiment: baseline digital twin above, simulated control layer below"
        width={1600}
        height={1600}
        className="block h-auto w-full"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      {allowMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
          src="/videos/cdt2/CDT_arch_motion.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
