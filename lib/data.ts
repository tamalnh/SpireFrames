import site from "@/data/site.json";
import hero from "@/data/hero.json";
import services from "@/data/services.json";
import portfolio from "@/data/portfolio.json";
import pricing from "@/data/pricing.json";
import social from "@/data/social.json";
import cta from "@/data/cta.json";
import theme from "@/data/theme.json";

export type NavItem = { label: string; href: string };
export type CtaLink = { label: string; href: string };

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ProcessStep = { title: string; body: string };
export type GalleryItem = { src: string; alt: string; caption?: string };
export type Credit = { role: string; name: string };

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  youtubeId: string;
  summary: string;
  intro?: string;
  paragraphs?: string[];
  process: ProcessStep[];
  deliverables: string[];
  gallery?: GalleryItem[];
  quote?: { text: string; author: string; role?: string };
  credits?: Credit[];
  featured: boolean;
};

export type ThemeMode = "dark" | "light";
export type ThemeData = { mode: ThemeMode; accentName: string; note?: string };

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  cta: CtaLink;
  featured: boolean;
};

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

export const siteData = site;
export const heroData = hero;
export const servicesData = services as Service[];
export const portfolioData = portfolio as PortfolioItem[];
export const pricingData = pricing as PricingTier[];
export const socialData = social as SocialLink[];
export const ctaData = cta;
export const themeData = theme as ThemeData;

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolioData.find((p) => p.slug === slug);
}

export function getFeaturedPortfolio(): PortfolioItem[] {
  return portfolioData.filter((p) => p.featured);
}
