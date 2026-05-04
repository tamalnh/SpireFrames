import { ctaData, siteData, socialData } from "@/lib/data";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-hairline/15 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgb(var(--c-accent) / 0.18), transparent 65%)"
        }}
      />

      <div className="container-edge text-center">
        <p className="eyebrow">{ctaData.eyebrow}</p>
        <h2 className="display mx-auto mt-4 max-w-3xl text-[2rem] leading-[1.05] sm:mt-5 sm:text-5xl lg:text-6xl">
          {ctaData.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cream/75 sm:mt-6 sm:text-base">
          {ctaData.sub}
        </p>

        {/* Highlighted email */}
        <div className="mx-auto mt-10 max-w-2xl px-2">
          <div className="group relative overflow-hidden rounded-2xl border border-sage/40 bg-surface p-6 transition-all duration-500 hover:border-sage hover:bg-surface-2 sm:p-8">
            <p className="text-[10px] uppercase tracking-wide-2 text-mist">
              {ctaData.emailLabel}
            </p>
            <a
              href={`mailto:${siteData.brand.email}`}
              className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 break-all font-serif text-xl text-cream transition-colors duration-300 hover:text-sage sm:gap-3 sm:text-3xl lg:text-4xl"
            >
              <span className="break-all">{siteData.brand.email}</span>
              <Icon
                name="arrow"
                className="h-4 w-4 shrink-0 text-sage transition-transform duration-500 group-hover:translate-x-1 sm:h-5 sm:w-5"
              />
            </a>
            <p className="mt-3 text-[11px] text-cream/55 sm:text-xs">{ctaData.emailNote}</p>
          </div>
        </div>

        {/* Social — icons + text only */}
        <div className="mt-14">
          <p className="eyebrow">Or find us</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {socialData.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline/20 px-4 py-2.5 text-xs uppercase tracking-wide-2 text-cream/85 hover:-translate-y-0.5 hover:border-sage hover:text-cream sm:px-5"
                  aria-label={s.label}
                >
                  <SocialIcon name={s.id} className="h-4 w-4" />
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
