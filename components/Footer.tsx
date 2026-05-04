import { siteData, socialData } from "@/lib/data";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-hairline/15 bg-ink">
      {/* Oversized typographic statement */}
      <div className="container-edge pt-16 pb-10 sm:pt-24 sm:pb-12 lg:pt-28">
        <p className="eyebrow">— A note from the studio</p>
        <p className="mt-5 max-w-4xl font-serif text-2xl leading-tight text-cream sm:mt-6 sm:text-4xl lg:text-5xl">
          We make pictures that pretend to be photographs and films that pretend to be memories.
          <span className="text-sage"> The pretending </span>
          is the craft.
        </p>
      </div>

      {/* Giant brand wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden whitespace-nowrap leading-none text-cream/[0.08]"
      >
        <span className="block font-serif font-bold tracking-tighter text-[22vw] sm:text-[18vw] lg:text-[14rem]">
          Spire&nbsp;Frames
        </span>
      </div>

      {/* Bottom row — three columns: studio / contact / social */}
      <div className="border-t border-hairline/15">
        <div className="container-edge grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="eyebrow mb-3">The studio</p>
            <p className="text-sm leading-relaxed text-cream/70">
              {siteData.brand.tagline}
            </p>
            <p className="mt-3 text-xs text-cream/45">
              Remote-first, working worldwide.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Say hello</p>
            <a
              href={`mailto:${siteData.brand.email}`}
              className="link-underline text-base text-cream hover:text-sage"
            >
              {siteData.brand.email}
            </a>
            <p className="mt-3 text-xs text-cream/45">
              We reply to every message within one business day.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <ul className="flex flex-wrap gap-2">
              {socialData.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex items-center gap-2 rounded-full border border-hairline/20 px-3 py-2 text-[11px] uppercase tracking-wide-2 text-cream/80 hover:border-sage hover:text-cream"
                  >
                    <SocialIcon name={s.id} className="h-3.5 w-3.5" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline/15">
        <div className="container-edge flex flex-col items-start gap-3 py-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteData.brand.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            Crafted with restraint in the studio.
          </p>
        </div>
      </div>
    </footer>
  );
}
