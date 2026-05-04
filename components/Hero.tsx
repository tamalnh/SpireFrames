import Link from "next/link";
import { heroData, getFeaturedPortfolio } from "@/lib/data";
import Icon from "./Icon";
import { RotatingWord, HeroBackgroundVideo, StatsStrip } from "./HeroVisual";

export default function Hero() {
  const featured = getFeaturedPortfolio();
  // Hero background video: explicit hero.json ID > first featured project > none.
  const bgVideoId =
    (heroData as { backgroundVideoId?: string }).backgroundVideoId ||
    featured[0]?.youtubeId;

  return (
    <section className="relative isolate">
      {/* Top meta strip */}
      <div className="border-b border-hairline/20">
        <div className="container-edge flex flex-col gap-1.5 py-3 text-[10px] uppercase tracking-wide-2 text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            AI Creative Studio · Est. 2024
          </span>
          <span className="truncate">
            Open for 2025 bookings <span className="hidden sm:inline">· Worldwide, remote-first</span>
          </span>
        </div>
      </div>

      {/* Hero with background video */}
      <div className="relative overflow-hidden">
        <HeroBackgroundVideo videoId={bgVideoId} />

        <div className="container-edge relative flex min-h-[78vh] flex-col items-center justify-center py-16 text-center sm:py-24 lg:min-h-[84vh] lg:py-32">
          <div className="animate-fadeUp w-full">
            <p className="eyebrow flex items-center justify-center gap-3">
              <span className="hidden h-px w-8 bg-sage/60 sm:inline-block" />
              {heroData.eyebrow}
              <span className="hidden h-px w-8 bg-sage/60 sm:inline-block" />
            </p>

            <h1 className="display mx-auto mt-5 max-w-5xl text-[2rem] leading-[1.05] sm:mt-6 sm:text-5xl md:text-6xl lg:text-[5.6rem] lg:leading-[0.98]">
              <span className="block">Cinematic</span>
              <span className="block">
                <em className="font-normal italic text-mist">AI-made</em>{" "}
                <RotatingWord
                  words={
                    (heroData as { rotatingWords?: string[] }).rotatingWords
                  }
                />
              </span>
              <span className="block text-cream/85">
                for brands worth watching.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream/80 sm:mt-8 sm:text-base lg:text-lg">
              {heroData.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
              <Link href={heroData.primaryCta.href} className="btn-primary">
                {heroData.primaryCta.label}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href={heroData.secondaryCta.href} className="btn-ghost">
                {heroData.secondaryCta.label}
              </Link>
            </div>

            {/* Tiny "watch" hint */}
            <p className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-wide-2 text-cream/45 sm:mt-12">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              Reel playing — muted by default
            </p>
          </div>
        </div>
      </div>

      {/* Stats strip — replaces the old Now Showing rail */}
      <div className="border-y border-hairline/20 bg-ink/60 backdrop-blur">
        <StatsStrip stats={heroData.stats} />
      </div>
    </section>
  );
}
