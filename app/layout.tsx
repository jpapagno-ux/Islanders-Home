import type { Metadata } from "next";
import { MeasurementTag } from "@/components/MeasurementTag";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Islanders Home", template: "%s · Islanders Home" },
  description: "Islanders Home — island real estate intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <MeasurementTag />
      </head>
      <body>{children}</body>
    </html>
  );
}
