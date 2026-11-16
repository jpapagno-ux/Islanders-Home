import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { MeasurementTag } from "@/components/MeasurementTag";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "The Islanders Home | Exceptional Island Homes in the Florida Keys", template: "%s | The Islanders Home" },
  description:
    "Curated waterfront residences across the Florida Keys and beyond, with island guides, market intelligence and ownership tools from James Papagno of Brown Harris Stevens.",
  // Preview build: keep out of search results until content, disclosures and listing data are approved.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <MeasurementTag />
      </head>
      <body>
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-3">
          Skip to content
        </a>
        <div className="bg-sand px-4 py-2 text-center text-[12px] tracking-[0.04em]">
          Preview build · sample listing · not yet a published site
        </div>
        <Header />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
