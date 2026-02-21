import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PunkNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ClientProviders from "@/components/ClientProviders";

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#000000",
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
      <head>
        {/* performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="flex flex-col min-h-screen">

        {/* main navigation */}
        <PunkNavbar />

        {/* main content */}
        <main className="flex-grow pt-16">
          {children}
        </main>

        {/* footer */}
        <Footer />

        {/* client-side only components */}
        <ClientProviders />

        {/* vercel analytics */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
