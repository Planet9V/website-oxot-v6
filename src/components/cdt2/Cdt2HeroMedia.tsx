"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * THE HERO'S RIGHT PANE — a static image at first paint, with the same shot
 * as a looping video crossfading in behind it once the video has enough data
 * to play. The image is never removed from the DOM: it is the fallback for
 * slow connections, reduced-motion preference, and the ~10-40MB the video
 * takes to arrive, not a placeholder discarded once the "real" media loads.
 *
 * WHY A CLIENT COMPONENT, separate from `Cdt2Hero.tsx`: swapping opacity on
 * `loadeddata` needs `useState`/`useEffect`, and hoisting that into the hero
 * file would pull its headline, lead and CTAs into the client bundle for no
 * reason — same split rule this codebase uses everywhere else a canvas or a
 * media swap needs state (e.g. industries pages' `HeroCanvas.tsx` pattern).
 *
 * `prefers-reduced-motion` IS HONOURED: the video element is still mounted
 * (so a reduced-motion visitor is not penalised with a dead video element
 * that a screen reader might still surface metadata for) but `autoPlay` is
 * withheld and the crossfade never triggers, so the still image is what a
 * reduced-motion visitor keeps looking at.
 */
export function Cdt2HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAllowMotion(!mq.matches);
  }, []);

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
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
      <Image
        src="/images/cdt2/hero-two-pane.png"
        alt="Engineering wireframe of a plant on the left resolving into cyber-analytics dashboards on the right"
        width={1600}
        height={1600}
        className="h-full w-full object-cover"
        sizes="(min-width: 768px) 38vw, 75vw"
        priority
      />
      {allowMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
          src="/videos/cdt2/OXOT_2_pane_rotate.mp4"
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
