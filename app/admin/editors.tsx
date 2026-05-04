"use client";

import { TextField, ToggleField, StringListField, ListEditor } from "./fields";
import LocalImagePicker from "./LocalImagePicker";
import type {
  Service,
  PortfolioItem,
  PricingTier,
  SocialLink,
  ProcessStep,
  GalleryItem,
  Credit,
  ThemeData
} from "@/lib/data";

const ICON_OPTIONS = ["spark", "cube", "wave", "compass", "frame", "play"];
const SOCIAL_OPTIONS = ["instagram", "tiktok", "dribbble", "behance", "linkedin", "youtube", "x"];

/* -------------------- Theme -------------------- */

export function ThemeEditor({
  value,
  onChange
}: {
  value: ThemeData;
  onChange: (next: ThemeData) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-sage/30 bg-sage/[0.06] p-5 text-sm text-cream/80">
        Switching the theme here updates the live preview instantly. Save the file to make it the default for everyone.
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(["dark", "light"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange({ ...value, mode: m })}
            className={`flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all ${
              value.mode === m
                ? "border-sage bg-sage/10"
                : "border-cream/15 bg-cream/[0.02] hover:border-cream/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`inline-block h-6 w-6 rounded-full border ${
                  m === "dark"
                    ? "border-cream/20 bg-[#1E1E1A]"
                    : "border-cream/20 bg-[#F8F5ED]"
                }`}
              />
              <span className="text-sm font-medium capitalize text-cream">{m} mode</span>
            </div>
            <p className="text-xs text-cream/55">
              {m === "dark"
                ? "Near-black background, cream text, gold accent."
                : "Warm cream background, near-black text, gold accent."}
            </p>
          </button>
        ))}
      </div>

      <TextField
        label="Accent name (display only)"
        value={value.accentName ?? "Gold"}
        onChange={(v) => onChange({ ...value, accentName: v })}
        hint="Shown in the brand kit; doesn't change the color."
      />
    </div>
  );
}

/* -------------------- Site -------------------- */

type SiteData = {
  brand: { name: string; shortName: string; tagline: string; email: string };
  nav: { label: string; href: string }[];
};

export function SiteEditor({
  value,
  onChange
}: {
  value: SiteData;
  onChange: (next: SiteData) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Brand name"
          value={value.brand.name}
          onChange={(v) => onChange({ ...value, brand: { ...value.brand, name: v } })}
        />
        <TextField
          label="Short name"
          value={value.brand.shortName}
          onChange={(v) => onChange({ ...value, brand: { ...value.brand, shortName: v } })}
        />
      </div>
      <TextField
        label="Tagline"
        value={value.brand.tagline}
        onChange={(v) => onChange({ ...value, brand: { ...value.brand, tagline: v } })}
        textarea
        rows={2}
      />
      <TextField
        label="Email"
        value={value.brand.email}
        onChange={(v) => onChange({ ...value, brand: { ...value.brand, email: v } })}
      />

      <ListEditor
        label="Navigation"
        items={value.nav}
        onChange={(nav) => onChange({ ...value, nav })}
        blank={() => ({ label: "", href: "/" })}
        itemSummary={(it) => it.label || "(unnamed)"}
        renderItem={(item, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
            <TextField
              label="Href"
              value={item.href}
              onChange={(v) => update({ href: v })}
              hint="e.g. /portfolio or /#contact"
            />
          </div>
        )}
      />
    </div>
  );
}

/* -------------------- Hero -------------------- */

type HeroData = {
  eyebrow: string;
  headline: string;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundVideoId?: string;
  rotatingWords?: string[];
  stats: { value: string; label: string }[];
};

export function HeroEditor({
  value,
  onChange
}: {
  value: HeroData;
  onChange: (next: HeroData) => void;
}) {
  return (
    <div className="space-y-5">
      <TextField
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(v) => onChange({ ...value, eyebrow: v })}
      />
      <TextField
        label="Headline"
        value={value.headline}
        onChange={(v) => onChange({ ...value, headline: v })}
        textarea
        rows={2}
      />
      <TextField
        label="Subtext"
        value={value.sub}
        onChange={(v) => onChange({ ...value, sub: v })}
        textarea
        rows={3}
      />
      <TextField
        label="Background video — YouTube ID"
        value={value.backgroundVideoId ?? ""}
        onChange={(v) => onChange({ ...value, backgroundVideoId: v })}
        placeholder="dQw4w9WgXcQ"
        hint="Plays muted + looped behind the headline. Leave empty to disable."
      />

      <StringListField
        label="Rotating words (cycle inside headline)"
        values={value.rotatingWords ?? []}
        onChange={(rotatingWords) => onChange({ ...value, rotatingWords })}
        placeholder="e.g. social films."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Primary CTA label"
          value={value.primaryCta.label}
          onChange={(v) =>
            onChange({ ...value, primaryCta: { ...value.primaryCta, label: v } })
          }
        />
        <TextField
          label="Primary CTA link"
          value={value.primaryCta.href}
          onChange={(v) =>
            onChange({ ...value, primaryCta: { ...value.primaryCta, href: v } })
          }
        />
        <TextField
          label="Secondary CTA label"
          value={value.secondaryCta.label}
          onChange={(v) =>
            onChange({ ...value, secondaryCta: { ...value.secondaryCta, label: v } })
          }
        />
        <TextField
          label="Secondary CTA link"
          value={value.secondaryCta.href}
          onChange={(v) =>
            onChange({ ...value, secondaryCta: { ...value.secondaryCta, href: v } })
          }
        />
      </div>

      <ListEditor
        label="Stats"
        items={value.stats}
        onChange={(stats) => onChange({ ...value, stats })}
        blank={() => ({ value: "", label: "" })}
        itemSummary={(s) => `${s.value || "—"} · ${s.label || "—"}`}
        renderItem={(item, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Value" value={item.value} onChange={(v) => update({ value: v })} />
            <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
          </div>
        )}
      />
    </div>
  );
}

/* -------------------- Services -------------------- */

export function ServicesEditor({
  value,
  onChange
}: {
  value: Service[];
  onChange: (next: Service[]) => void;
}) {
  return (
    <ListEditor
      label="Services"
      items={value}
      onChange={onChange}
      blank={() => ({ id: `service-${Date.now()}`, title: "", description: "", icon: "spark" })}
      itemSummary={(s) => s.title || "(untitled)"}
      renderItem={(item, update) => (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="ID" value={item.id} onChange={(v) => update({ id: v })} />
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-wide-2 text-cream/55">Icon</p>
              <select
                value={item.icon}
                onChange={(e) => update({ icon: e.target.value })}
                className="block w-full rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2.5 text-sm text-cream focus:border-sage"
              >
                {ICON_OPTIONS.map((i) => (
                  <option key={i} value={i} className="bg-ink">
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
          <TextField
            label="Description"
            value={item.description}
            onChange={(v) => update({ description: v })}
            textarea
            rows={3}
          />
        </div>
      )}
    />
  );
}

/* -------------------- Portfolio -------------------- */

export function PortfolioEditor({
  value,
  onChange
}: {
  value: PortfolioItem[];
  onChange: (next: PortfolioItem[]) => void;
}) {
  return (
    <ListEditor
      label="Portfolio items"
      items={value}
      onChange={onChange}
      blank={() => ({
        slug: "new-project",
        title: "",
        client: "",
        category: "",
        year: new Date().getFullYear().toString(),
        youtubeId: "",
        summary: "",
        intro: "",
        paragraphs: [],
        process: [],
        deliverables: [],
        gallery: [],
        credits: [],
        featured: false
      })}
      itemSummary={(p) => `${p.title || "(untitled)"} · ${p.client || ""}`}
      renderItem={(item, update) => (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Slug" value={item.slug} onChange={(v) => update({ slug: v })} hint="URL: /portfolio/[slug]" />
            <TextField label="YouTube ID" value={item.youtubeId} onChange={(v) => update({ youtubeId: v })} />
          </div>
          <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
          <div className="grid gap-3 sm:grid-cols-3">
            <TextField label="Client" value={item.client} onChange={(v) => update({ client: v })} />
            <TextField label="Category" value={item.category} onChange={(v) => update({ category: v })} />
            <TextField label="Year" value={item.year} onChange={(v) => update({ year: v })} />
          </div>
          <ToggleField
            label="Featured on homepage"
            value={item.featured}
            onChange={(v) => update({ featured: v })}
          />
          <TextField label="Summary" value={item.summary} onChange={(v) => update({ summary: v })} textarea rows={2} />
          <TextField label="Intro paragraph" value={item.intro ?? ""} onChange={(v) => update({ intro: v })} textarea rows={3} />

          <ListEditor<string>
            label="Long-form paragraphs"
            items={item.paragraphs ?? []}
            onChange={(paragraphs) => update({ paragraphs })}
            blank={() => ""}
            itemSummary={(p, i) => `Paragraph ${i + 1}${p ? ` — ${p.slice(0, 50)}…` : ""}`}
            renderItem={(p, _u, api) => (
              <TextField
                label={`Paragraph ${api.index + 1}`}
                value={p as string}
                onChange={(v) => {
                  const next = [...(item.paragraphs ?? [])];
                  next[api.index] = v;
                  update({ paragraphs: next });
                }}
                textarea
                rows={4}
              />
            )}
          />

          <ListEditor<ProcessStep>
            label="Process steps"
            items={item.process}
            onChange={(process) => update({ process })}
            blank={() => ({ title: "", body: "" })}
            itemSummary={(s) => s.title || "(step)"}
            renderItem={(s, u) => (
              <div className="space-y-3">
                <TextField label="Title" value={s.title} onChange={(v) => u({ title: v })} />
                <TextField label="Body" value={s.body} onChange={(v) => u({ body: v })} textarea rows={3} />
              </div>
            )}
          />

          <StringListField
            label="Deliverables"
            values={item.deliverables}
            onChange={(deliverables) => update({ deliverables })}
            placeholder="e.g. 30s hero film"
          />

          <ListEditor<GalleryItem>
            label="Gallery"
            items={item.gallery ?? []}
            onChange={(gallery) => update({ gallery })}
            blank={() => ({ src: "", alt: "", caption: "" })}
            itemSummary={(g, i) => `Image ${i + 1}${g.alt ? ` — ${g.alt}` : ""}`}
            renderItem={(g, u) => (
              <div className="space-y-3">
                <LocalImagePicker
                  label="Image"
                  value={g.src}
                  onChange={(v) => u({ src: v })}
                  slug={item.slug}
                  hint="Pick a file from your computer, or paste a remote URL. Local files save under /public."
                />
                <TextField label="Alt text" value={g.alt} onChange={(v) => u({ alt: v })} />
                <TextField label="Caption" value={g.caption ?? ""} onChange={(v) => u({ caption: v })} />
              </div>
            )}
          />

          <div className="rounded-xl border border-cream/10 bg-cream/[0.02] p-4">
            <p className="mb-3 text-[10px] uppercase tracking-wide-2 text-cream/55">Quote</p>
            <div className="space-y-3">
              <TextField
                label="Quote text"
                value={item.quote?.text ?? ""}
                onChange={(v) =>
                  update({ quote: { ...(item.quote ?? { author: "", role: "" }), text: v } })
                }
                textarea
                rows={3}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Author"
                  value={item.quote?.author ?? ""}
                  onChange={(v) =>
                    update({ quote: { ...(item.quote ?? { text: "", role: "" }), author: v } })
                  }
                />
                <TextField
                  label="Role"
                  value={item.quote?.role ?? ""}
                  onChange={(v) =>
                    update({ quote: { ...(item.quote ?? { text: "", author: "" }), role: v } })
                  }
                />
              </div>
            </div>
          </div>

          <ListEditor<Credit>
            label="Credits"
            items={item.credits ?? []}
            onChange={(credits) => update({ credits })}
            blank={() => ({ role: "", name: "" })}
            itemSummary={(c) => `${c.role || "—"}: ${c.name || "—"}`}
            renderItem={(c, u) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField label="Role" value={c.role} onChange={(v) => u({ role: v })} />
                <TextField label="Name" value={c.name} onChange={(v) => u({ name: v })} />
              </div>
            )}
          />
        </div>
      )}
    />
  );
}

/* -------------------- Pricing -------------------- */

export function PricingEditor({
  value,
  onChange
}: {
  value: PricingTier[];
  onChange: (next: PricingTier[]) => void;
}) {
  return (
    <ListEditor
      label="Pricing tiers"
      items={value}
      onChange={onChange}
      blank={() => ({
        id: `tier-${Date.now()}`,
        name: "",
        price: "",
        cadence: "",
        summary: "",
        features: [],
        cta: { label: "Get started", href: "/#contact" },
        featured: false
      })}
      itemSummary={(t) => `${t.name || "(unnamed)"} · ${t.price || ""}`}
      renderItem={(item, update) => (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="ID" value={item.id} onChange={(v) => update({ id: v })} />
            <TextField label="Name" value={item.name} onChange={(v) => update({ name: v })} />
            <TextField label="Price" value={item.price} onChange={(v) => update({ price: v })} />
            <TextField label="Cadence" value={item.cadence} onChange={(v) => update({ cadence: v })} />
          </div>
          <TextField
            label="Summary"
            value={item.summary}
            onChange={(v) => update({ summary: v })}
            textarea
            rows={2}
          />
          <StringListField
            label="Features"
            values={item.features}
            onChange={(features) => update({ features })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="CTA label"
              value={item.cta.label}
              onChange={(v) => update({ cta: { ...item.cta, label: v } })}
            />
            <TextField
              label="CTA link"
              value={item.cta.href}
              onChange={(v) => update({ cta: { ...item.cta, href: v } })}
            />
          </div>
          <ToggleField
            label="Featured tier"
            value={item.featured}
            onChange={(v) => update({ featured: v })}
            hint="Highlights this tier with the gold border + badge."
          />
        </div>
      )}
    />
  );
}

/* -------------------- CTA / Contact -------------------- */

type CtaData = {
  eyebrow: string;
  headline: string;
  sub: string;
  emailLabel: string;
  emailNote: string;
};

export function CtaEditor({
  value,
  onChange
}: {
  value: CtaData;
  onChange: (next: CtaData) => void;
}) {
  return (
    <div className="space-y-4">
      <TextField label="Eyebrow" value={value.eyebrow} onChange={(v) => onChange({ ...value, eyebrow: v })} />
      <TextField label="Headline" value={value.headline} onChange={(v) => onChange({ ...value, headline: v })} textarea rows={2} />
      <TextField label="Subtext" value={value.sub} onChange={(v) => onChange({ ...value, sub: v })} textarea rows={3} />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Email label" value={value.emailLabel} onChange={(v) => onChange({ ...value, emailLabel: v })} />
        <TextField label="Email note" value={value.emailNote} onChange={(v) => onChange({ ...value, emailNote: v })} />
      </div>
    </div>
  );
}

/* -------------------- Social -------------------- */

export function SocialEditor({
  value,
  onChange
}: {
  value: SocialLink[];
  onChange: (next: SocialLink[]) => void;
}) {
  return (
    <ListEditor
      label="Social links"
      items={value}
      onChange={onChange}
      blank={() => ({ id: "instagram", label: "", handle: "", href: "" })}
      itemSummary={(s) => `${s.label || "(unnamed)"} — ${s.id}`}
      renderItem={(item, update) => (
        <div className="space-y-3">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-wide-2 text-cream/55">Platform (icon key)</p>
            <select
              value={item.id}
              onChange={(e) => update({ id: e.target.value })}
              className="block w-full rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2.5 text-sm text-cream focus:border-sage"
            >
              {SOCIAL_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-ink">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Label (shown on site)" value={item.label} onChange={(v) => update({ label: v })} />
            <TextField label="Handle (internal note only)" value={item.handle} onChange={(v) => update({ handle: v })} />
          </div>
          <TextField label="URL" value={item.href} onChange={(v) => update({ href: v })} />
        </div>
      )}
    />
  );
}
