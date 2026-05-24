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
  /** Accent colour for the wrapper border + "SHARE THIS POST" heading. */
  variant?: ShareVariant;
  /** Render as a compact vertical aside (used in sticky sidebar). */
  asAside?: boolean;
}

// ─── Static maps (defined outside component to avoid re-creation per render) ──

const VARIANT_BORDER: Record<ShareVariant, string> = {
  yellow: "border-neon-yellow",
  green: "border-neon-green",
  pink: "border-neon-pink",
  red: "border-neon-red",
  white: "border-punk-white",
  blue: "border-neon-blue",
  cyan: "border-neon-cyan",
};

const VARIANT_TEXT: Record<ShareVariant, string> = {
  yellow: "text-neon-yellow",
  green: "text-neon-green",
  pink: "text-neon-pink",
  red: "text-neon-red",
  white: "text-punk-white",
  blue: "text-neon-blue",
  cyan: "text-neon-cyan",
};

const BUTTON_CLASSES: Record<ShareVariant, string> = {
  yellow:
    "border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-punk-black hover:shadow-neon-yellow",
  green:
    "border-neon-green text-neon-green hover:bg-neon-green hover:text-punk-black hover:shadow-neon-green",
  pink: "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-punk-black hover:shadow-neon-pink",
  red: "border-neon-red text-neon-red hover:bg-neon-red hover:text-punk-black hover:shadow-neon-red",
  white:
    "border-punk-white text-punk-white hover:bg-punk-white hover:text-punk-black hover:shadow-neon-white",
  blue: "border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-punk-black hover:shadow-neon-blue",
  cyan: "border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-punk-black hover:shadow-neon-cyan",
};

const BASE_BTN = [
  "bg-punk-black border-brutal font-brutal uppercase tracking-wider",
  "cursor-pointer select-none inline-flex items-center justify-center gap-2",
  "active:translate-x-[2px] active:translate-y-[2px]",
  "transition-colors duration-0",
].join(" ");

const HOVER_VARIANTS = {
  hover: { scale: 1.02, transition: { duration: 0 } },
  tap: { scale: 0.98, transition: { duration: 0 } },
};

// ─── Share link definitions ───────────────────────────────────────────────────

function buildLinks(
  encodedTitle: string,
  encodedUrl: string,
  encodedText: string,
) {
  return [
    {
      label: "TWITTER/X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      variant: "pink" as ShareVariant,
    },
    {
      label: "WHATSAPP",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      variant: "green" as ShareVariant,
    },
    {
      label: "TELEGRAM",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      variant: "yellow" as ShareVariant,
    },
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      variant: "cyan" as ShareVariant,
    },
    // {
    //   label: "FACEBOOK",
    //   href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    //   variant: "blue" as ShareVariant,
    // },
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

  // Pill size: compact when rendered inside sticky aside
  const btnPadding = asAside ? "px-3 py-2 text-xs" : "px-5 py-3 text-sm";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Graceful fallback for older / restricted browsers
      const el = document.createElement("input");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      // execCommand is deprecated but safe as a fallback
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      document.execCommand("copy");
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
      // User cancelled — no-op
    }
  }

  const hasNativeShare =
    typeof navigator !== "undefined" && Boolean(navigator.share);

  return (
    <div
      className={cn(
        "border-brutal",
        VARIANT_BORDER[variant],
        asAside ? "p-3" : "mb-8 p-6",
      )}
    >
      <p
        className={cn(
          "font-brutal uppercase tracking-wider mb-3",
          asAside ? "text-brutal-xs" : "text-brutal-xl mb-4",
          VARIANT_TEXT[variant],
        )}
      >
        {asAside ? "SHARE" : "SHARE THIS POST"}
      </p>

      <div className={cn("flex gap-2", asAside ? "flex-col" : "flex-wrap")}>
        {/* Native Share — mobile only */}
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

        {/* Social links */}
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
