import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import { getFeaturedPortfolio } from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedPortfolio();
  return (
    <>
      <Hero />
      <Services limit={6} />
      <Portfolio items={featured} showViewAllCard />
      <Pricing />
      <CTA />
    </>
  );
}
