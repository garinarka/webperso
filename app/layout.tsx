import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "King Jagad's Personal Website",
  description: "Combination of Next.js, TypeScript, and Tailwind CSS",
  metadataBase: new URL('https://jgarinarka.vercel.app/'),
  openGraph: {
    title: "King Jagad's Personal Website",
    description: "Combination of Next.js, TypeScript, and Tailwind CSS",
    url: 'https://jgarinarka.vercel.app/',
    siteName: 'King Jagad',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "King Jagad's Personal Website",
    description: "Combination of Next.js, TypeScript, and Tailwind CSS",
  },
  verification: {
    google: 'gMYC1Q1nQW9hg2eHsWm58lKeXF0NqrasHEsGQbaIynA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
