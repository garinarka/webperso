import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PunkNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ClientProviders from "@/components/ClientProviders";
import type { Viewport } from "next";

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

export const viewport: Viewport = {
  themeColor: 'black',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://jgarinarka.vercel.app'),
  title: {
    default: 'JAGADDHITA | wannabe developer',
    template: '%s | JAGADDHITA'
  },
  description: 'full-stack developer wannabe. breaking conventions, building experiences. no templates, no corporate BS',
  keywords: ['web developer', 'full-stack', 'next.js', 'react', 'typescript', 'portfolio', 'brutalist design'],
  authors: [{ name: 'jagaddhita' }],
  creator: 'jagaddhita',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://jgarinarka.vercel.app',
    title: 'JAGADDHITA | wannabe developer',
    description: 'full-stack developer wannabe. breaking conventions, building experiences. no templates, no corporate BS',
    siteName: 'JAGADDHITA PORTFOLIO',
    // images: [
    //   {
    //     url: '/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'JAGADDHITA PORTFOLIO'
    //   }
    // ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'JAGADDHITA | wannabe developer',
  //   description: 'full-stack developer wannabe. breaking conventions, building experiences. no templates, no corporate BS',
  //   images: ['/og-image.png'],
  //   creator: '@mytwitterhandle'
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
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
        {/* skip to main content - accessibility */}
        <a href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 bg-neon-yellow text-punk-black font-brutal"
        >
          skip to main content
        </a>

        {/* main navigation */}
        <PunkNavbar />

        {/* main content */}
        <main id="main-content" className="flex-grow pt-16">
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
