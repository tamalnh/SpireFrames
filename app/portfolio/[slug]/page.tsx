import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPortfolioBySlug, portfolioData } from "@/lib/data";
import CTA from "@/components/CTA";
import Icon from "@/components/Icon";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return portfolioData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: `${item.title} — Spire Frames`,
    description: item.summary
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  const others = portfolioData.filter((p) => p.slug !== item.slug).slice(0, 2);

  return (
    <>
      <article className="container-edge pt-10 pb-20 sm:pt-14 sm:pb-24">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wide-2 text-cream/60 hover:text-sage"
        >
          <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
          Back to portfolio
        </Link>

        <header className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <p className="eyebrow">
              {item.category} · {item.client} · {item.year}
            </p>
            <h1 className="display mt-4 text-[2rem] leading-[1.05] sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-cream/75 sm:text-base lg:text-lg">
              {item.summary}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-xl border border-hairline/15 bg-hairline/15 sm:grid-cols-4 lg:grid-cols-2">
            <div className="bg-ink p-4 sm:p-5">
              <dt className="text-[10px] uppercase tracking-wide-2 text-cream/55">Client</dt>
              <dd className="mt-2 text-sm text-cream/90 break-words">{item.client}</dd>
            </div>
            <div className="bg-ink p-4 sm:p-5">
              <dt className="text-[10px] uppercase tracking-wide-2 text-cream/55">Year</dt>
              <dd className="mt-2 text-sm text-cream/90">{item.year}</dd>
            </div>
            <div className="bg-ink p-4 sm:p-5">
              <dt className="text-[10px] uppercase tracking-wide-2 text-cream/55">Category</dt>
              <dd className="mt-2 text-sm text-cream/90">{item.category}</dd>
            </div>
            <div className="bg-ink p-4 sm:p-5">
              <dt className="text-[10px] uppercase tracking-wide-2 text-cream/55">Scope</dt>
              <dd className="mt-2 text-sm text-cream/90">
                {item.deliverables.length} deliverables
              </dd>
            </div>
          </dl>
        </header>

        {/* Video */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-hairline/15 bg-black sm:mt-14">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
              title={item.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* Intro paragraph */}
        {item.intro && (
          <section className="mx-auto mt-12 max-w-3xl sm:mt-20">
            <p className="font-serif text-xl leading-snug text-cream sm:text-2xl lg:text-3xl">
              {item.intro}
            </p>
          </section>
        )}

        {/* Long-form paragraphs */}
        {item.paragraphs && item.paragraphs.length > 0 && (
          <section className="mx-auto mt-10 grid max-w-3xl gap-5 text-sm leading-relaxed text-cream/75 sm:mt-12 sm:gap-6 sm:text-base lg:text-lg">
            {item.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        )}

        {/* Gallery */}
        {item.gallery && item.gallery.length > 0 && (
          <section className="mt-20 sm:mt-24">
            <p className="eyebrow mb-6">Gallery</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((g, i) => (
                <figure
                  key={i}
                  className={`group overflow-hidden rounded-xl border border-hairline/15 ${
                    i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="border-t border-hairline/15 bg-surface px-4 py-3 text-xs text-cream/55">
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Process + deliverables */}
        <div className="mt-20 grid gap-12 sm:mt-24 lg:grid-cols-[1fr_320px] lg:gap-16">
          <section>
            <p className="eyebrow mb-8">Process</p>
            <ol className="space-y-10">
              {item.process.map((step, idx) => (
                <li key={step.title} className="grid gap-3 sm:grid-cols-[80px_1fr]">
                  <span className="font-serif text-2xl text-sage">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-cream">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/70 sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <aside className="h-fit space-y-6">
            <div className="rounded-2xl border border-hairline/15 bg-surface p-6 sm:p-8">
              <p className="eyebrow mb-5">Deliverables</p>
              <ul className="space-y-3 text-sm text-cream/80">
                {item.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1 w-1 rounded-full bg-sage" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {item.credits && item.credits.length > 0 && (
              <div className="rounded-2xl border border-hairline/15 bg-surface p-6 sm:p-8">
                <p className="eyebrow mb-5">Credits</p>
                <ul className="space-y-3 text-sm">
                  {item.credits.map((c) => (
                    <li key={`${c.role}-${c.name}`} className="flex justify-between gap-4">
                      <span className="text-cream/55">{c.role}</span>
                      <span className="text-cream/90">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Quote */}
        {item.quote && (
          <section className="mx-auto mt-16 max-w-3xl border-y border-hairline/15 py-12 text-center sm:mt-24 sm:py-16">
            <span className="font-serif text-5xl leading-none text-sage sm:text-6xl">“</span>
            <blockquote className="mt-2 font-serif text-xl leading-snug text-cream sm:text-2xl lg:text-3xl">
              {item.quote.text}
            </blockquote>
            <figcaption className="mt-6 text-xs uppercase tracking-wide-2 text-cream/55">
              {item.quote.author}
              {item.quote.role && (
                <>
                  <span className="mx-2 text-sage">·</span>
                  <span>{item.quote.role}</span>
                </>
              )}
            </figcaption>
          </section>
        )}

        {/* Continue */}
        {others.length > 0 && (
          <section className="mt-24 border-t border-hairline/15 pt-14">
            <p className="eyebrow mb-8">Continue</p>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/portfolio/${o.slug}`}
                  className="group block overflow-hidden rounded-xl border border-hairline/15 transition-all duration-500 hover:-translate-y-1 hover:border-sage/40"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={`https://i.ytimg.com/vi/${o.youtubeId}/maxresdefault.jpg`}
                      alt={o.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide-2 text-cream/50">
                      {o.category}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-cream group-hover:text-sage">
                      {o.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-cream/60 group-hover:text-cream">
                      Read case study
                      <Icon name="arrow" className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTA />
    </>
  );
}
