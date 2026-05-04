import Link from "next/link";
import { pricingData } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-hairline/15 py-24 sm:py-32">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Pricing"
          title="Honest pricing, transparent process."
          body="Every engagement starts with a short discovery call. Pick the package that fits — or we'll shape one with you."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingData.map((tier) => {
            const featured = tier.featured;
            return (
              <article
                key={tier.id}
                className={[
                  "group relative flex flex-col rounded-2xl border p-8",
                  // Narrow, explicit transitions — no `transition-all`.
                  "transition-[transform,border-color,background-color] duration-500 ease-soft",
                  // GPU-composite the lift to avoid paint flicker.
                  "transform-gpu will-change-transform [backface-visibility:hidden]",
                  "motion-safe:hover:-translate-y-1",
                  featured
                    ? "border-sage/60 bg-surface-2"
                    : "border-hairline/15 bg-surface hover:border-sage/40"
                ].join(" ")}
              >
                {featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-sage px-3 py-1 text-[10px] uppercase tracking-wide-2 text-ink">
                    Most chosen
                  </span>
                )}

                <div>
                  <p className="eyebrow">{tier.name}</p>
                  <p className="mt-4 font-serif text-4xl text-cream sm:text-[2.5rem]">
                    {tier.price}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide-2 text-cream/55">
                    {tier.cadence}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-cream/75">
                    {tier.summary}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3 border-t border-hairline/15 pt-6 text-sm text-cream/85">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-sage" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.cta.href}
                  className={[
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
                    // Only colors transition on the button — no transform.
                    "transition-colors duration-300 ease-soft",
                    featured
                      ? "bg-sage text-ink hover:bg-sage/90"
                      : "border border-hairline/30 text-cream hover:border-sage hover:text-sage"
                  ].join(" ")}
                >
                  {tier.cta.label}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-cream/55">
          All packages include source files, commercial usage rights, and asynchronous Loom updates.
        </p>
      </div>
    </section>
  );
}
