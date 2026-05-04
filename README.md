# Spire Frames — Agency Website

A minimal, premium agency site built with **Next.js (App Router)** and **Tailwind CSS**. All content is driven from local JSON files in `/data`, and a development-only admin panel lets you edit those files in-browser.

## Stack

- Next.js 15 (App Router, RSC)
- React 19
- TypeScript
- Tailwind CSS 3
- Cormorant Garamond + Montserrat (Google Fonts via `next/font`)

## Color & Type

The site ships with **two themes**, both centered on a **Gold accent**:

### Dark theme (default)
| Token  | Value    | Use                         |
|--------|----------|-----------------------------|
| ink    | #1E1E1A  | Background (near black)     |
| cream  | #F4F1E8  | Primary text                |
| sage   | #C9A961  | Gold accent                 |
| mist   | #D4C28A  | Soft gold (muted)           |

### Light theme (softened)
| Token  | Value    | Use                         |
|--------|----------|-----------------------------|
| ink    | #EFEAD9  | Warm off-cream background   |
| cream  | #2A2820  | Warm dark text              |
| sage   | #997533  | Readable gold on cream      |
| mist   | #745826  | Muted gold                  |
| surface | #E6DEC8 | Tonal card surface          |
| surface-2 | #DBD1B8 | Hover surface              |

The light palette intentionally avoids pure white and pure black — a warm off-cream paired with a warm dark gives editorial contrast without harshness, and the dedicated `surface` tokens keep cards and overlays visible (the previous low-alpha overlay pattern collapses on a light background).

Both themes share the same Tailwind tokens (`ink`, `cream`, `sage`, `mist`) — values are switched via CSS variables on `<html data-theme="dark|light">`. The default theme is read from [`data/theme.json`](data/theme.json) and can be toggled live in the admin panel.

Headings use **Cormorant Garamond**, body uses **Montserrat**.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

For production:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx              # Root layout, fonts, navbar, footer, preloader
  page.tsx                # Home (Hero + Services + Portfolio + Pricing + CTA)
  services/page.tsx
  portfolio/page.tsx
  portfolio/[slug]/page.tsx   # Dynamic case study route
  pricing/page.tsx
  admin/                  # Dev-only — see below
  not-found.tsx
  globals.css

components/
  Navbar.tsx              # Fixed nav with smooth-scroll to #contact
  Footer.tsx
  Preloader.tsx
  Hero.tsx
  Services.tsx
  Portfolio.tsx           # YouTube-thumb cards, click → /portfolio/[slug]
  Pricing.tsx             # Horizontal tier cards, featured highlight
  CTA.tsx                 # Bottom contact section (id="contact")
  SectionHeader.tsx
  Logo.tsx
  Icon.tsx                # Inline SVG icon set

data/
  site.json               # Brand info + nav links
  hero.json
  services.json
  portfolio.json          # Each item: slug, youtubeId, process, deliverables
  pricing.json
  cta.json
  social.json

lib/
  data.ts                 # Typed re-exports + helpers
  env.ts                  # isAdminEnabled() flag
```

## Editing content

All content lives in `/data` as JSON. Edit a file and refresh — pages re-render with the new data.

- **Brand & nav** — `data/site.json`
- **Hero copy** — `data/hero.json`
- **Services list** — `data/services.json` (each entry has `id`, `title`, `description`, `icon`)
- **Portfolio** — `data/portfolio.json` (each entry has `slug`, `youtubeId`, `process[]`, `deliverables[]`, `featured`)
- **Pricing tiers** — `data/pricing.json` (set `featured: true` to highlight one)
- **Contact / CTA** — `data/cta.json`
- **Social links** — `data/social.json`

### Available service icons

`spark`, `cube`, `wave`, `compass`, `frame`, `play` — defined in `components/Icon.tsx`. Add more there.

### Portfolio images — local or remote

Each `gallery[].src` (and any image URL elsewhere) accepts **either**:

- A **remote URL** (e.g. `https://images.unsplash.com/...`). The hostname must be allowlisted in [`next.config.js`](next.config.js) under `images.remotePatterns`.
- A **local public path** (e.g. `/portfolio/atelier-noir-fragrance/hero-01.jpg`). Drop the file into [`public/portfolio/<slug>/`](public/portfolio/) and reference it from that root-relative path. No config changes needed — `next/image` handles it.

In the admin panel's Portfolio editor, each gallery slot has a **Pick local image…** button. It:

1. Reads the file and shows an instant preview.
2. Suggests a path of the form `/portfolio/{slug}/{sanitized-filename}` and writes it into `src`.
3. Re-downloads the file so you can drop it under `public/portfolio/{slug}/`.

After you save the file to `public/...` and the JSON to `data/portfolio.json`, the image is live.

## Admin panel (development only)

The `/admin` route is only mounted when admin mode is enabled. It now ships a **structured form editor per section** instead of a raw JSON textarea:

- **Theme** — toggle between dark/light with a live preview applied to `<html data-theme>`. Save the file to make it the default.
- **Site & Nav** — brand name, email, tagline, and a reorderable nav list.
- **Hero** — eyebrow, headline, subtext, CTAs, and a stats list with add/remove/reorder.
- **Services** — list editor with icon picker per item.
- **Portfolio** — full structured editor: slug, video, summary, **intro**, **long-form paragraphs**, **process steps**, **deliverables**, **gallery**, **quote**, **credits**, and the featured toggle.
- **Pricing** — tier list with feature bullets and featured-tier toggle.
- **CTA / Contact** — eyebrow, headline, subtext, email labels.
- **Social** — list editor with platform-icon picker.

Each section has **Copy JSON**, **Download**, and **Reset** buttons; a one-click **Download all JSON** button packages every file at once. Save the downloaded file(s) to `/data` to persist changes — the site is JSON-driven, so refresh to see them live.

### How the gating works

- In **development**, `NODE_ENV !== "production"` → admin is enabled by default.
- In **production**, admin is disabled by default. The route returns 404 and the navbar hides the link.
- You can override either way via `NEXT_PUBLIC_ENABLE_ADMIN=true|false` (see `.env.example`).

### Recommended workflow

- Keep day-to-day work on a `dev` branch where the panel is available.
- Merge to `main` for production — `NODE_ENV=production` ensures the panel is gone.
- If you want the panel deliberately enabled on a staging deploy, set `NEXT_PUBLIC_ENABLE_ADMIN=true` in that environment's variables.

The gating is implemented in two places:

- `lib/env.ts` — `isAdminEnabled()`
- `app/admin/layout.tsx` — calls `notFound()` when disabled
- `components/Navbar.tsx` — hides the Admin link when disabled

## Routing notes

- The **Contact** nav link points to `/#contact`. On the home page it smooth-scrolls to the CTA section. On other pages it navigates home and lands at the CTA.
- Portfolio detail pages live at `/portfolio/[slug]` and are statically generated via `generateStaticParams`.

## Performance

- `next/font` self-hosts both Google fonts at build time.
- YouTube thumbnails are served via `next/image` with `i.ytimg.com` allowlisted.
- The case-study video is a lazy `<iframe>` — it doesn't load until the route is open.

## License

Proprietary — all visuals and copy are placeholders for the Spire Frames brand.
