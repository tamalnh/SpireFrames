import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Portfolio — Spire Frames",
  description: "Selected campaigns, product visuals, and editorial work."
};

export default function PortfolioPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <SectionHeader
          eyebrow="Portfolio"
          title="Recent work."
          body="A wider selection of recent campaigns. Each project is its own world — built from concept through delivery."
        />
      </section>
      <Portfolio showHeader={false} />
      <CTA />
    </>
  );
}
