import type { Metadata } from "next";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Services — Spire Frames",
  description:
    "AI ad campaigns, product visuals, social content, and editorial imagery for premium brands."
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <SectionHeader
          eyebrow="What we do"
          title="Production-grade work, generated with intent."
          body="We treat AI as a craft medium — not a shortcut. Every brief is met with research, art direction, and finishing."
        />
      </section>
      <Services />
      <CTA />
    </>
  );
}
