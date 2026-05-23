import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Images ──────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // ─── Security Headers ────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/(_next/static|favicon.ico|robots.txt)(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // If you previously had /blog/feed.xml, redirect to /api/rss
      {
        source: "/feed.xml",
        destination: "/api/rss",
        permanent: true,
      },
      {
        source: "/blog/feed",
        destination: "/api/rss",
        permanent: true,
      },
    ];
  },

  // ─── Experimental ────────────────────────────────────────────────────────
  experimental: {
    optimizeCss: true,
  },

  // ─── Output ──────────────────────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
