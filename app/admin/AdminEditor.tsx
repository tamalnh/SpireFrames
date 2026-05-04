"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ThemeEditor,
  SiteEditor,
  HeroEditor,
  ServicesEditor,
  PortfolioEditor,
  PricingEditor,
  CtaEditor,
  SocialEditor
} from "./editors";

type Bundle = {
  theme: any;
  site: any;
  hero: any;
  services: any;
  portfolio: any;
  pricing: any;
  cta: any;
  social: any;
};

const SECTIONS = [
  { key: "theme", label: "Theme", file: "data/theme.json" },
  { key: "site", label: "Site & Nav", file: "data/site.json" },
  { key: "hero", label: "Hero", file: "data/hero.json" },
  { key: "services", label: "Services", file: "data/services.json" },
  { key: "portfolio", label: "Portfolio", file: "data/portfolio.json" },
  { key: "pricing", label: "Pricing", file: "data/pricing.json" },
  { key: "cta", label: "CTA / Contact", file: "data/cta.json" },
  { key: "social", label: "Social", file: "data/social.json" }
] as const;

type Key = (typeof SECTIONS)[number]["key"];

export default function AdminEditor({ initial }: { initial: Bundle }) {
  const [data, setData] = useState<Bundle>(initial);
  const [active, setActive] = useState<Key>("theme");
  const [savedKey, setSavedKey] = useState<string | null>(null);

  // Live theme preview — apply data-theme on <html> as the user toggles.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", data.theme?.mode ?? "dark");
    }
  }, [data.theme]);

  const update = <K extends keyof Bundle>(key: K, value: Bundle[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const downloadJSON = (key: Key) => {
    const file = SECTIONS.find((s) => s.key === key)!.file;
    const json = JSON.stringify(data[key as keyof Bundle], null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.split("/").pop()!;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    SECTIONS.forEach((s, i) => {
      // small stagger so the browser doesn't block multi-download
      setTimeout(() => downloadJSON(s.key), i * 150);
    });
  };

  const copyJSON = async (key: Key) => {
    await navigator.clipboard.writeText(JSON.stringify(data[key as keyof Bundle], null, 2));
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 1400);
  };

  const reset = (key: Key) => update(key as keyof Bundle, initial[key as keyof Bundle]);

  const currentFile = useMemo(
    () => SECTIONS.find((s) => s.key === active)!.file,
    [active]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Side nav */}
      <aside className="space-y-1 lg:sticky lg:top-24 lg:self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors duration-300 ${
              active === s.key
                ? "bg-sage/15 text-cream"
                : "text-cream/70 hover:bg-cream/[0.04] hover:text-cream"
            }`}
          >
            <span>{s.label}</span>
            <span className="text-[10px] uppercase tracking-wide-2 text-cream/40">
              {s.file.replace("data/", "")}
            </span>
          </button>
        ))}
        <div className="mt-4 border-t border-cream/10 pt-4">
          <button
            onClick={downloadAll}
            className="w-full rounded-full bg-sage px-4 py-2 text-xs font-medium text-ink hover:opacity-90"
          >
            Download all JSON
          </button>
        </div>
      </aside>

      {/* Editor */}
      <section className="rounded-xl border border-cream/10 bg-cream/[0.02]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/10 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-cream">
              {SECTIONS.find((s) => s.key === active)!.label}
            </p>
            <p className="text-xs text-cream/50">
              Editing <code className="rounded bg-cream/10 px-1.5 py-0.5">{currentFile}</code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => reset(active)}
              className="rounded-full border border-cream/15 px-4 py-1.5 text-xs hover:border-cream/40"
            >
              Reset
            </button>
            <button
              onClick={() => copyJSON(active)}
              className="rounded-full border border-cream/15 px-4 py-1.5 text-xs hover:border-cream/40"
            >
              {savedKey === active ? "Copied" : "Copy JSON"}
            </button>
            <button
              onClick={() => downloadJSON(active)}
              className="rounded-full bg-sage px-4 py-1.5 text-xs font-medium text-ink hover:opacity-90"
            >
              Download
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {active === "theme" && (
            <ThemeEditor value={data.theme} onChange={(v) => update("theme", v)} />
          )}
          {active === "site" && (
            <SiteEditor value={data.site} onChange={(v) => update("site", v)} />
          )}
          {active === "hero" && (
            <HeroEditor value={data.hero} onChange={(v) => update("hero", v)} />
          )}
          {active === "services" && (
            <ServicesEditor value={data.services} onChange={(v) => update("services", v)} />
          )}
          {active === "portfolio" && (
            <PortfolioEditor value={data.portfolio} onChange={(v) => update("portfolio", v)} />
          )}
          {active === "pricing" && (
            <PricingEditor value={data.pricing} onChange={(v) => update("pricing", v)} />
          )}
          {active === "cta" && (
            <CtaEditor value={data.cta} onChange={(v) => update("cta", v)} />
          )}
          {active === "social" && (
            <SocialEditor value={data.social} onChange={(v) => update("social", v)} />
          )}
        </div>

        <div className="border-t border-cream/10 px-5 py-3 text-xs text-cream/45">
          Save by replacing the file at <code>{currentFile}</code> with the downloaded JSON.
        </div>
      </section>
    </div>
  );
}
