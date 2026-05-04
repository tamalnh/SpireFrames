import { servicesData } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";

export default function Services({ limit }: { limit?: number }) {
  const items = limit ? servicesData.slice(0, limit) : servicesData;

  return (
    <section id="services" className="border-t border-hairline/15 py-20 sm:py-28 lg:py-32">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Services"
          title="A studio without a studio."
          body="From single hero stills to multi-week campaigns, we deliver production-grade work using AI as the primary medium — no compromises on craft."
        />

        <div className="mt-12 grid gap-px bg-hairline/15 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <article
              key={service.id}
              className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-surface sm:p-8 lg:p-10"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage/40 text-sage transition-colors duration-500 group-hover:bg-sage group-hover:text-ink sm:h-11 sm:w-11">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl text-cream sm:text-2xl">{service.title}</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-cream/75 sm:mt-6">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
