"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const onReady = () => {
      const t = window.setTimeout(() => setHidden(true), 350);
      return () => window.clearTimeout(t);
    };
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const t = window.setTimeout(() => setRemoved(true), 700);
    return () => window.clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-700 ease-soft ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-7">
        {/* Aperture mark — same shape as the navbar logo, scaled up.
            The blade-cut chords slowly rotate around the circle's
            centre so the iris reads as opening/closing while loading. */}
        <svg viewBox="0 0 24 24" className="h-14 w-14 text-sage animate-fadeIn">
          <circle cx="12" cy="12" r="10.6" fill="currentColor" />
          <g
            stroke="rgb(var(--c-ink))"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "12px 12px",
              animation: "lens-spin 6s linear infinite"
            }}
          >
            <path d="m14.31 8 5.74 9.94" />
            <path d="M9.69 8h11.48" />
            <path d="m7.38 12 5.74-9.94" />
            <path d="M9.69 16 3.95 6.06" />
            <path d="M14.31 16H2.83" />
            <path d="m16.62 12-5.74 9.94" />
          </g>
        </svg>

        {/* Wordmark in compact form, mirroring the navbar lockup */}
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-5 w-px bg-sage" />
          <p className="font-serif text-base font-bold tracking-tight text-cream">
            Spire Frames
          </p>
        </div>

        {/* Loader bar */}
        <div className="relative h-px w-44 overflow-hidden bg-cream/10">
          <div className="absolute inset-y-0 w-1/3 bg-sage animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
