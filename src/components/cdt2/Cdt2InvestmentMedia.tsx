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
 * THE INVESTMENT SECTION'S RIGHT PANE — same treatment as the hero's
 * `Cdt2HeroMedia`: the still S-curve renders first and stays mounted, and the
 * looping video crossfades in over it once it has enough data to play. The
 * image is the fallback for slow connections and reduced-motion visitors, not
 * a placeholder to be discarded.
 *
 * SIZING: the wrapper takes its height from the `<Image>` itself (`h-auto
 * w-full`, `block` to kill the inline-image baseline gap) rather than a fixed
 * `aspect-[...]` class, so the still can never disagree with its own intrinsic
 * ratio. The video (1924x1076) is within a thousandth of the image's ratio, so
 * `object-cover` crops nothing perceptible while guaranteeing the two layers
 * stay pixel-aligned.
 */
export function Cdt2InvestmentMedia({ image }: { image: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const allowMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    motionAllowed,
    motionAllowedOnServer,
  );

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
    <div className="relative w-full overflow-hidden">
      <Image
        src={image}
        alt="Spend response surface bending into a diminishing-returns ridge, with a priced-separately tail"
        width={1376}
        height={768}
        className="block h-auto w-full"
        sizes="(min-width: 768px) 48vw, 96vw"
      />
      {allowMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
          src="/videos/cdt2/curve_dark.mp4"
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
