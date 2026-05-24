"use client";

import { useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  slug: string;
  variant?: "yellow" | "green" | "pink" | "red" | "white";
}

export default function ShareButtons({
  title,
  excerpt,
  slug,
  variant = "white",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [nativeShared, setNativeShared] = useState(false);

  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://jgarinarka.vercel.app"
  }/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} — ${excerpt.slice(0, 100)}`);

  const sizeStyles: CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0 },
    },
  };

  // Variant classes
  const variantClasses = {
    yellow:
      "bg-punk-black text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-punk-black hover:shadow-neon-yellow",
    green:
      "bg-punk-black text-neon-green border-neon-green hover:bg-neon-green hover:text-punk-black hover:shadow-neon-green",
    pink: "bg-punk-black text-neon-pink border-neon-pink hover:bg-neon-pink hover:text-punk-black hover:shadow-neon-pink",
    red: "bg-punk-black text-neon-red border-neon-red hover:bg-neon-red hover:text-punk-black hover:shadow-neon-red",
    white:
      "bg-punk-black text-punk-white border-punk-white hover:bg-punk-white hover:text-punk-black hover:shadow-neon-white",
  };

  const baseButtonClasses = cn(
    "border-brutal font-brutal text-punk uppercase tracking-wider",
    "cursor-pointer select-none inline-flex items-center gap-2",
    "active:translate-x-[2px] active:translate-y-[2px]",
    "transition-colors duration-0",
  );

  const shareLinks: {
    label: string;
    href: string;
    variant: keyof typeof variantClasses;
  }[] = [
    {
      label: "TWITTER/X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      variant: "pink",
    },
    {
      label: "WHATSAPP",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      variant: "green",
    },
    {
      label: "TELEGRAM",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      variant: "yellow",
    },
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      variant: "white",
    },
    {
      label: "FACEBOOK",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      variant: "white",
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // fallback browser tua yang masih hidup entah kenapa
      const input = document.createElement("input");

      input.value = url;

      document.body.appendChild(input);

      input.select();

      document.execCommand("copy");

      document.body.removeChild(input);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  async function handleNativeShare() {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text: excerpt,
        url,
      });

      setNativeShared(true);

      setTimeout(() => {
        setNativeShared(false);
      }, 2000);
    } catch {
      // user cancel share
    }
  }

  const hasNativeShare =
    typeof navigator !== "undefined" && Boolean(navigator.share);

  return (
    <div
      className={cn(
        "mb-8 p-6 border-brutal",
        variant === "yellow" && "border-neon-yellow",
        variant === "green" && "border-neon-green",
        variant === "pink" && "border-neon-pink",
        variant === "red" && "border-neon-red",
        variant === "white" && "border-punk-white",
      )}
    >
      <p
        className={cn(
          "font-brutal text-brutal-xl mb-4 uppercase tracking-wider",
          variant === "yellow" && "text-neon-yellow",
          variant === "green" && "text-neon-green",
          variant === "pink" && "text-neon-pink",
          variant === "red" && "text-neon-red",
          variant === "white" && "text-punk-white",
        )}
      >
        SHARE THIS POST
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Native Share */}
        {hasNativeShare && (
          <motion.button
            onClick={handleNativeShare}
            className={cn(baseButtonClasses, variantClasses[variant])}
            style={sizeStyles}
            variants={hoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Share2 size={16} />

            {nativeShared ? "SHARED!" : "SHARE"}
          </motion.button>
        )}

        {/* Social Links */}
        {shareLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(baseButtonClasses, variantClasses[link.variant])}
            style={sizeStyles}
            variants={hoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {link.label}
          </motion.a>
        ))}

        {/* Copy Link */}
        <motion.button
          onClick={handleCopy}
          className={cn(
            baseButtonClasses,
            copied ? variantClasses.green : variantClasses[variant],
          )}
          style={sizeStyles}
          variants={hoverVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}

          {copied ? "COPIED!" : "COPY LINK"}
        </motion.button>
      </div>
    </div>
  );
}
