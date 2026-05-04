import Link from "next/link";
import { siteData } from "@/lib/data";

/**
 * Spire Frames logo — gold camera aperture + vertical divider + bold wordmark.
 *
 * Implementation: a solid gold circle with six "chord" strokes drawn in the
 * page background color. The strokes carve the circle into six aperture
 * blades. Because the cut color uses the `--c-ink` CSS variable, the blade
 * gaps automatically follow whichever theme is active.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${siteData.brand.name} — home`}
    >
      {/* Aperture mark */}
      <span aria-hidden="true" className="relative inline-block h-7 w-7 shrink-0 text-sage sm:h-8 sm:w-8">
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full transition-transform duration-700 ease-soft group-hover:rotate-[60deg]"
        >
          {/* Gold body */}
          <circle cx="12" cy="12" r="10.6" fill="currentColor" />

          {/* Blade-gap chords — drawn in page-background color so they cut
              the circle into 6 blades that match the page beneath. */}
          <g
            stroke="rgb(var(--c-ink))"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          >
            <path d="m14.31 8 5.74 9.94" />
            <path d="M9.69 8h11.48" />
            <path d="m7.38 12 5.74-9.94" />
            <path d="M9.69 16 3.95 6.06" />
            <path d="M14.31 16H2.83" />
            <path d="m16.62 12-5.74 9.94" />
          </g>
        </svg>
      </span>

      {/* Vertical divider */}
      <span aria-hidden="true" className="block h-6 w-px bg-sage sm:h-7" />

      {/* Wordmark */}
      <span className="font-serif text-lg font-bold tracking-tight text-cream sm:text-xl lg:text-[1.35rem]">
        Spire Frames
      </span>
    </Link>
  );
}
