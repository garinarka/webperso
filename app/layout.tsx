import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="id">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
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
