"use client";

import { useEffect, useMemo, useState } from "react";

const FALLBACK_WORDS = [
  "Promo ads.",
  "product visuals.",
  "social films.",
  "brand worlds."
];

/**
 * Cross-faded rotating word. We render only the active word (no width slot),
 * which keeps it flush to the surrounding text — no trailing dead space
 * pulling a centered headline off-balance for shorter words.
 *
 * Sequence: fade out (≈280ms) → swap word during the invisible moment
 * (so any reflow is hidden) → fade back in.
 */
export function RotatingWord({
  words,
  intervalMs = 2400
}: {
  words?: string[];
  intervalMs?: number;
}) {
  const list = useMemo(
    () => (words && words.length > 0 ? words : FALLBACK_WORDS),
    [words]
  );
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (list.length < 2) return;
    // Reset to first word whenever the source list changes.
    setI(0);
    setVisible(true);
    let alive = true;
    const id = window.setInterval(() => {
      // fade out, swap word while invisible, fade back in
      setVisible(false);
      window.setTimeout(() => {
        if (!alive) return;
        setI((n) => (n + 1) % list.length);
        setVisible(true);
      }, 280);
    }, intervalMs);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [list, intervalMs]);

  return (
    <span
      className={`inline-block whitespace-nowrap italic text-sage transition-opacity duration-300 ease-soft ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {list[i]}
    </span>
  );
}

/**
 * Background video — full-bleed, dimmed, behind the hero copy.
 * Uses a YouTube embed with autoplay + mute + loop.
 * The 16:9 iframe is upscaled with a CSS hack so it always covers
 * the parent regardless of aspect ratio.
 */
export function HeroBackgroundVideo({ videoId }: { videoId?: string }) {
  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    modestbranding: "1",
    showinfo: "0",
    rel: "0",
    iv_load_policy: "3",
    playsinline: "1",
    disablekb: "1"
  }).toString();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[calc(50%-50vw)] inset-y-0 -z-10 w-screen overflow-hidden"
    >
      {/* The iframe is sized so its 16:9 frame always covers the viewport.
         width = 16/9 of viewport height, height = 9/16 of viewport width,
         then min-w/min-h clamp to 100% so the larger axis wins. */}
      <iframe
        title="Background reel"
        src={`https://www.youtube.com/embed/${videoId}?${params}`}
        allow="autoplay; encrypted-media; picture-in-picture"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
        style={{
          width: "177.78vh",
          height: "56.25vw",
          minWidth: "100vw",
          minHeight: "100%"
        }}
      />
      {/* Dim + warm overlay for legibility */}
      <div className="absolute inset-0 bg-ink/80" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgb(var(--c-accent) / 0.10), transparent 65%), linear-gradient(to bottom, rgb(var(--c-ink) / 0.4), rgb(var(--c-ink) / 0.85))"
        }}
      />
      {/* Subtle film grain via repeating noise */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px"
        }}
      />
    </div>
  );
}

/**
 * Full-width stats strip — replaces the old "Now showing" rail.
 * Shows the three key numbers with vertical hairlines between them.
 */
export function StatsStrip({
  stats
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col items-center justify-center gap-2.5 px-5 py-9 text-center sm:gap-3 sm:px-6 sm:py-10 lg:px-8 lg:py-12 ${
            i > 0 ? "border-t border-hairline/20 sm:border-l sm:border-t-0" : ""
          }`}
        >
          <span className="font-serif text-4xl leading-none text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            {s.value}
          </span>
          <span className="text-[10px] uppercase tracking-wide-2 text-cream/60 sm:text-[11px]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
