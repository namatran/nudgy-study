import type { Metadata, Viewport } from "next";
import { Nunito, Poor_Story } from "next/font/google";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { site } from "@/data/content";
import "./globals.css";

const poorStory = Poor_Story({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poor-story",
});

// Fallback for the system rounded face (SF Pro Rounded) on non-Apple machines.
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2d78cf",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poorStory.variable} ${nunito.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
