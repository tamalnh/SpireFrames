import {
  servicesData,
  portfolioData,
  pricingData,
  socialData,
  siteData,
  heroData,
  ctaData,
  themeData
} from "@/lib/data";
import AdminEditor from "./AdminEditor";

export default function AdminPage() {
  const initial = {
    theme: themeData,
    site: siteData,
    hero: heroData,
    services: servicesData,
    portfolio: portfolioData,
    pricing: pricingData,
    cta: ctaData,
    social: socialData
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-sage/30 bg-sage/[0.06] p-5 text-sm text-cream/80 sm:p-6">
        <p className="mb-2 font-medium text-cream">How this works</p>
        <p className="leading-relaxed">
          Edit any section using the structured form below. Changes are kept locally in your
          browser until you <span className="text-sage">Download</span> the updated JSON and
          drop it into <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">/data</code>.
          The Theme switcher applies a live preview instantly. This panel is only mounted in
          development (or when{" "}
          <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_ENABLE_ADMIN=true
          </code>
          ) — production returns 404.
        </p>
      </div>

      <AdminEditor initial={initial} />
    </div>
  );
}
