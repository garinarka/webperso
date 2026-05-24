"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareVariant =
  | "yellow"
  | "green"
  | "pink"
  | "red"
  | "white"
  | "blue"
  | "cyan";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  slug: string;
  variant?: ShareVariant;
  asAside?: boolean;
}

// ─── Static variant maps ──────────────────────────────────────────────────────
// These are defined outside the component so they're never recreated per render.

/** Heading text colour */
const VARIANT_TEXT: Record<ShareVariant, string> = {
  yellow: "text-neon-yellow",
  green: "text-neon-green",
  pink: "text-neon-pink",
  red: "text-neon-red",
  white: "text-punk-white",
  blue: "text-neon-blue",
  cyan: "text-neon-cyan",
};

/**
 * Per-variant button hover styles.
 *
 * Most variants: fill bg + invert text + neon shadow on hover.
 * blue / cyan: NO fill (solid blue fill looks like a default browser button).
 *              Instead: neon glow shadow + underline — stays on-brand.
 */
const BUTTON_CLASSES: Record<ShareVariant, string> = {
  yellow:
    "border-neon-yellow text-neon-yellow hover:bg-neon-yellow   hover:text-punk-black hover:shadow-neon-yellow",
  green:
    "border-neon-green  text-neon-green  hover:bg-neon-green    hover:text-punk-black hover:shadow-neon-green",
  pink: "border-neon-pink   text-neon-pink   hover:bg-neon-pink     hover:text-punk-black hover:shadow-neon-pink",
  red: "border-neon-red    text-neon-red    hover:bg-neon-red      hover:text-punk-black hover:shadow-neon-red",
  white:
    "border-punk-white  text-punk-white  hover:bg-punk-white    hover:text-punk-black hover:shadow-neon-white",
  // blue & cyan: glow + underline only — NO fill
  blue: "border-neon-blue   text-neon-blue   hover:underline hover:shadow-neon-blue  hover:border-neon-blue",
  cyan: "border-neon-cyan   text-neon-cyan   hover:underline hover:shadow-neon-cyan  hover:border-neon-cyan",
};

const BASE_BTN = [
  "bg-punk-black border-brutal font-brutal uppercase tracking-wider",
  "cursor-pointer select-none inline-flex items-center justify-center gap-2",
  "active:translate-x-[2px] active:translate-y-[2px]",
  "transition-[box-shadow,text-decoration] duration-150",
].join(" ");

const HOVER_VARIANTS = {
  hover: { scale: 1.02, transition: { duration: 0.08 } },
  tap: { scale: 0.97, transition: { duration: 0.05 } },
};

// ─── Share link list ──────────────────────────────────────────────────────────

function buildLinks(
  encodedTitle: string,
  encodedUrl: string,
  encodedText: string,
) {
  return [
    {
      label: "TWITTER/X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      variant: "pink" as const,
    },
    {
      label: "WHATSAPP",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      variant: "green" as const,
    },
    {
      label: "TELEGRAM",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      variant: "yellow" as const,
    },
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      variant: "cyan" as const,
    },
    {
      label: "FACEBOOK",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      variant: "blue" as const,
    },
  ] as const;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShareButtons({
  title,
  excerpt,
  slug,
  variant = "white",
  asAside = false,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [nativeShared, setNativeShared] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://jgarinarka.vercel.app"}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} — ${excerpt.slice(0, 100)}`);
  const shareLinks = buildLinks(encodedTitle, encodedUrl, encodedText);

  const btnPadding = asAside ? "px-3 py-2 text-xs" : "px-5 py-3 text-sm";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("input");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.cssText = "position:absolute;left:-9999px";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleNativeShare() {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, text: excerpt, url });
      setNativeShared(true);
      setTimeout(() => setNativeShared(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  const hasNativeShare =
    typeof navigator !== "undefined" && Boolean(navigator.share);

  return (
    <div
      className={cn(
        "border-brutal",
        VARIANT_TEXT[variant], // sets currentColor → border-brutal uses it
        asAside ? "p-3" : "mb-8 p-6",
      )}
    >
      <p
        className={cn(
          "font-brutal uppercase tracking-wider",
          asAside ? "text-brutal-xs mb-3" : "text-brutal-xl mb-4",
          VARIANT_TEXT[variant],
        )}
      >
        {asAside ? "SHARE" : "SHARE THIS POST"}
      </p>

      <div className={cn("flex gap-2", asAside ? "flex-col" : "flex-wrap")}>
        {/* Native share — mobile only */}
        {hasNativeShare && (
          <motion.button
            onClick={handleNativeShare}
            className={cn(BASE_BTN, btnPadding, BUTTON_CLASSES[variant])}
            variants={HOVER_VARIANTS}
            whileHover="hover"
            whileTap="tap"
            aria-label="Share via native share sheet"
          >
            <Share2 size={14} aria-hidden="true" />
            {nativeShared ? "SHARED!" : "SHARE"}
          </motion.button>
        )}

        {shareLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(BASE_BTN, btnPadding, BUTTON_CLASSES[link.variant])}
            variants={HOVER_VARIANTS}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Share on ${link.label}`}
          >
            {link.label}
          </motion.a>
        ))}

        {/* Copy link */}
        <motion.button
          onClick={handleCopy}
          className={cn(
            BASE_BTN,
            btnPadding,
            copied ? BUTTON_CLASSES.green : BUTTON_CLASSES[variant],
          )}
          variants={HOVER_VARIANTS}
          whileHover="hover"
          whileTap="tap"
          aria-label="Copy post URL to clipboard"
          aria-live="polite"
        >
          {copied ? (
            <Check size={12} aria-hidden="true" />
          ) : (
            <Copy size={12} aria-hidden="true" />
          )}
          {copied ? "COPIED!" : "COPY LINK"}
        </motion.button>
      </div>
    </div>
  );
}
