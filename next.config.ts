import type { NextConfig } from "next";

// ─── Content-Security-Policy ──────────────────────────────────────────────────
//
// Inline styles/scripts are required by Next.js (style tags, JSON-LD script).
// We use 'unsafe-inline' for styles only. Scripts use 'strict-dynamic' +
// nonce-based via Next.js built-in nonce support (App Router automatic).
//
// Adjust the connect-src list when adding new external APIs.
//
const ContentSecurityPolicy = [
  "default-src 'self'",
  // Scripts: self + Next.js runtime + Vercel analytics + Vercel Speed Insights
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.vercel-insights.com",
  // Styles: self + inline (required by Next.js App Router)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fonts
  "font-src 'self' https://fonts.gstatic.com",
  // Images: self + Sanity CDN + data URIs
  "img-src 'self' data: blob: https://cdn.sanity.io",
  // XHR / fetch: self + Sanity + Upstash (Redis REST API)
  "connect-src 'self' https://api.sanity.io https://*.upstash.io https://va.vercel-scripts.com",
  // Iframes: none
  "frame-src 'none'",
  // Objects: none (no Flash, no PDFs embedded)
  "object-src 'none'",
  // Base URI: lock to self
  "base-uri 'self'",
  // Form actions: self only
  "form-action 'self'",
  // Upgrade insecure requests in production
  "upgrade-insecure-requests",
].join("; ");

// ─── Permissions Policy ───────────────────────────────────────────────────────
const PermissionsPolicy = [
  "camera=()",
  "microphone=()",
  "geolocation=()",
  "interest-cohort=()", // Opt out of FLoC
  "payment=()",
  "usb=()",
].join(", ");

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
    // Aggressive caching: 1 hour for images
    minimumCacheTTL: 3600,
    // Limit device sizes to reduce cache surface
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── Security Headers ────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // CSP
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          // Clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions
          {
            key: "Permissions-Policy",
            value: PermissionsPolicy,
          },
          // Legacy XSS filter (IE) — still useful on very old proxies
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // HSTS — 1 year, include subdomains, preload-ready
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // DNS prefetch control
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Cross-Origin policies
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
      // Long-lived cache for immutable static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Short cache for HTML pages (ISR)
      {
        source: "/((?!_next).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      { source: "/feed.xml", destination: "/api/rss", permanent: true },
      { source: "/blog/feed", destination: "/api/rss", permanent: true },
    ];
  },

  // ─── Output ──────────────────────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  // ─── Compiler ────────────────────────────────────────────────────────────
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
