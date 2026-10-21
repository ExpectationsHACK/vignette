import type { Metadata } from "next";
import { Bodoni_Moda, Source_Serif_4, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { site } from "@/content/book";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seoTitle,
  description: site.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.publisher,
    title: site.seoTitle,
    description: site.metaDescription,
    images: [site.mockup.src],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${sourceSerif.variable} ${manrope.variable} antialiased`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main" className="pt-[53px]">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
