import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import { siteData, themeData } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${siteData.brand.name} — ${siteData.brand.tagline}`,
  description:
    "Spire Frames is an AI creative studio crafting ultra-realistic ads, product visuals, and social content for premium brands.",
  metadataBase: new URL("https://spireframes.com"),
  openGraph: {
    title: siteData.brand.name,
    description: siteData.brand.tagline,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={themeData.mode}
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-ink text-cream antialiased">
        <Preloader />
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
