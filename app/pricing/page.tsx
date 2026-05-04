import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Pricing — Spire Frames",
  description: "Honest, transparent pricing for AI creative work."
};

export default function PricingPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <SectionHeader
          eyebrow="Investment"
          title="Built for clarity, not negotiation."
          body="Three packages that fit most engagements. If you're somewhere in-between, we'll meet you there."
        />
      </section>
      <Pricing />
      <CTA />
    </>
  );
}
