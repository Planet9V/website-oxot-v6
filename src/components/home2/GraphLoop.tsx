"use client";

import { useEffect, useRef } from "react";

/**
 * GRAPH LOOP — travelling spotlight over a node field, behind the hero.
 *
 * Ported verbatim (same math, same draw order) from `oxot-graph-loop.js`
 * in the Claude Design source (claude.ai/design project
 * 65e687bd-763e-4bf9-a99f-ca682458c385), where it shipped as a vanilla-JS
 * custom element. Reimplemented here as a plain canvas + rAF loop inside a
 * client component instead of registering a custom element, since nothing
 * else on this page needs the web-component wrapper.
 *
 * Same three animation-hygiene guarantees as the original: pauses when
 * scrolled offscreen (IntersectionObserver), redraws once and stops for
 * `prefers-reduced-motion: reduce`, and resizes its backing canvas to the
 * container via ResizeObserver rather than a fixed size.
 */

type Point = { x: number; y: number; w: number };

const W = 2560;
const H = 1100;

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
}

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function buildField(seed: number) {
  const r = rng(seed);
  const pts: Point[] = [];
  const centers: [number, number][] = [];
  for (let c = 0; c < 170; c++) {
    const cx = 60 + r() * (W - 120);
    const cy = 40 + r() * (H - 80);
    centers.push([cx, cy]);
    const n = 8 + ((r() * 18) | 0);
    for (let i = 0; i < n; i++) {
      const a = r() * 6.283;
      const rad = Math.pow(r(), 0.6) * (24 + r() * 40);
      pts.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.8, w: r() * 6.283 });
    }
  }
  const pairs: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < Math.min(pts.length, i + 24); j++) {
      const d = Math.hypot(pts[j].x - pts[i].x, pts[j].y - pts[i].y);
      if (d < 56) pairs.push([i, j]);
    }
  }
  let inner = centers.filter((c) => c[0] > W * 0.11 && c[0] < W * 0.89 && c[1] > H * 0.11 && c[1] < H * 0.89);
  if (!inner.length) inner = centers.slice();
  let spread: [number, number][] = [];
  for (let minD = Math.min(W, H) * 0.7; minD >= 20 && spread.length < 5; minD *= 0.82) {
    spread = [];
    for (const c of inner) {
      if (spread.every((s) => Math.hypot(s[0] - c[0], s[1] - c[1]) > minD)) spread.push(c);
      if (spread.length === 5) break;
    }
  }
  while (spread.length < 5) spread.push(inner[spread.length % inner.length]);
  return { pts, pairs, stops: spread.slice(0, 5) };
}

function draw(ctx: CanvasRenderingContext2D, field: ReturnType<typeof buildField>, accent: string, reachBase: number, ph: number) {
  ctx.clearRect(0, 0, W, H);
  const th = ph * 6.283;
  const S = field.stops;
  const n = S.length;
  const seg = ph * n;
  const k = Math.floor(seg);
  const u = seg - k;
  const from = S[k % n];
  const to = S[(k + 1) % n];
  const travel = 0.45;
  const moving = u < travel;
  const ease = (t: number) => t * t * (3 - 2 * t);
  const e = moving ? ease(u / travel) : 1;
  const dwell = moving ? 0 : (u - travel) / (1 - travel);
  const sx = from[0] + (to[0] - from[0]) * e;
  const sy = from[1] + (to[1] - from[1]) * e;
  const reach = reachBase * (moving ? 0.72 : 1 + 0.1 * Math.sin(dwell * 12.566));
  const drift = 7;

  const P = field.pts.map((p) => {
    const s1 = th + p.w;
    const s2 = th + p.x * 0.006 + p.y * 0.004;
    const x = p.x + drift * Math.sin(s1) + drift * 0.8 * Math.sin(s2);
    const y = p.y + drift * 0.7 * Math.cos(s1) + drift * 0.6 * Math.cos(s2 + 1.1);
    return { x, y, g: Math.max(0, 1 - Math.hypot(x - sx, y - sy) / reach) };
  });

  const linkR = 48 + 7 * Math.sin(th);
  ctx.lineWidth = 0.6;
  for (const [i, j] of field.pairs) {
    const a = P[i];
    const b = P[j];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    if (d > linkR) continue;
    const g = Math.max(a.g, b.g);
    ctx.strokeStyle = g > 0.02 ? rgba(accent, 0.05 + 0.5 * g * g) : `rgba(150,156,166,${0.03 + 0.055 * (1 - d / linkR)})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  for (const p of P) {
    ctx.fillStyle = p.g > 0.02 ? rgba(accent, 0.28 + 0.55 * p.g) : "rgba(190,195,203,.3)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.g > 0.3 ? 1.4 + p.g : 1, 0, 6.3);
    ctx.fill();
  }

  const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, reach);
  halo.addColorStop(0, rgba(accent, 0.085));
  halo.addColorStop(1, rgba(accent, 0));
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, W, H);

  const R = reach * 0.86;
  ctx.strokeStyle = rgba(accent, moving ? 0.22 : 0.45);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(sx, sy, R, 0, 6.3);
  ctx.stroke();

  const br = R + 9;
  ctx.strokeStyle = rgba(accent, moving ? 0.18 : 0.6);
  ctx.lineWidth = 1.4;
  for (const [dx, dy] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1]
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(sx + dx * br, sy + dy * br - dy * 9);
    ctx.lineTo(sx + dx * br, sy + dy * br);
    ctx.lineTo(sx + dx * br - dx * 9, sy + dy * br);
    ctx.stroke();
  }

  if (moving) {
    ctx.strokeStyle = rgba(accent, 0.16);
    ctx.setLineDash([5, 7]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
    ctx.setLineDash([]);
  } else {
    for (const p of [0, 0.5]) {
      const t = (dwell + p) % 1;
      ctx.strokeStyle = rgba(accent, 0.3 * (1 - t));
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(sx, sy, R * (0.2 + 1.5 * t), 0, 6.3);
      ctx.stroke();
    }
    const sweep = -1.571 + dwell * 6.283;
    ctx.strokeStyle = rgba(accent, 0.38);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + Math.cos(sweep) * R, sy + Math.sin(sweep) * R);
    ctx.stroke();
  }
}

export function GraphLoop({
  accent = "#ff7a1a",
  loopSeconds = 16,
  reach = 200,
  className = ""
}: {
  accent?: string;
  loopSeconds?: number;
  reach?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = buildField(20260812);
    let raf: number | null = null;
    let t0 = performance.now();
    let last = 0.25;

    function resize() {
      const r = container!.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(r.width * dpr);
      canvas!.height = Math.round(r.height * dpr);
      ctx!.setTransform(canvas!.width / W, 0, 0, canvas!.height / H, 0, 0);
      if (raf === null) draw(ctx!, field, accent, reach, last);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(ctx, field, accent, reach, 0.25);
      return () => ro.disconnect();
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      last = ((performance.now() - t0) / 1000 / loopSeconds) % 1;
      draw(ctx!, field, accent, reach, last);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const on = entries.some((e) => e.isIntersecting);
        if (on && raf === null) {
          t0 = performance.now() - (last * loopSeconds * 1000);
          tick();
        }
        if (!on && raf !== null) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(container);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [accent, loopSeconds, reach]);

  return (
    <div ref={containerRef} className={className} style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", background: "transparent" }} />
    </div>
  );
}
