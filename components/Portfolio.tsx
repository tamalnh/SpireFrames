import Link from "next/link";
import Image from "next/image";
import { portfolioData, type PortfolioItem } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";

type Props = {
  items?: PortfolioItem[];
  showHeader?: boolean;
  /**
   * When true, append a "View more work" CTA card at the end of the grid.
   * Used on the home page so a small featured set still routes the visitor
   * onward to the full portfolio.
   */
  showViewAllCard?: boolean;
};

export default function Portfolio({
  items,
  showHeader = true,
  showViewAllCard = false
}: Props) {
  const list = items ?? portfolioData;

  return (
    <section id="portfolio" className="border-t border-hairline/15 py-24 sm:py-32">
      <div className="container-edge">
        {showHeader && (
          <SectionHeader
            eyebrow="Selected work"
            title="Frames that earn a second look."
            body="A small selection from recent campaigns. Click any film for the full case study."
          />
        )}

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {list.map((item, idx) => (
            <article
              key={item.slug}
              className="group"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <Link href={`/portfolio/${item.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={`https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-wide-2 text-cream/80 backdrop-blur">
                    {item.category}
                  </span>
                  <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Icon name="play" className="h-6 w-6" />
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 sm:mt-6 sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wide-2 text-cream/55 sm:text-xs">
                      {item.client} · {item.year}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-cream transition-colors duration-300 group-hover:text-sage sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs text-cream/60 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream">
                    View case study
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          ))}

          {showViewAllCard && (
            <article
              className="group"
              style={{ animationDelay: `${list.length * 60}ms` }}
            >
              <Link
                href="/portfolio"
                className="block h-full"
                aria-label="View more work"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-sage/40 bg-surface transition-all duration-500 group-hover:border-sage group-hover:bg-surface-2">
                  {/* Decorative corner ticks */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-4 ring-1 ring-sage/20" />

                  {/* Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 60% at 50% 50%, rgb(var(--c-accent) / 0.15), transparent 70%)"
                    }}
                  />

                  <div className="relative flex flex-col items-center text-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-sage/50 text-sage transition-all duration-500 group-hover:scale-110 group-hover:bg-sage group-hover:text-ink">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <p className="mt-5 font-serif text-2xl text-cream sm:text-3xl">
                      Explore more
                    </p>
                    <p className="mt-2 max-w-[20ch] text-xs text-cream/60">
                      A wider archive of recent campaigns.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 sm:mt-6 sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wide-2 text-sage sm:text-xs">
                      The full archive
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-cream transition-colors duration-300 group-hover:text-sage sm:text-2xl">
                      View more work
                    </h3>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs text-cream/60 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream">
                    All projects
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
