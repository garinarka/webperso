"use client";

/**
 * components/blog/AuthorPopover.tsx
 *
 * Renders the author name with a popover card on hover.
 * - Pure CSS positioning (no portal, no z-index battles).
 * - Keyboard accessible: opens on focus, closes on Escape / blur.
 * - No external deps beyond what already exists in the project.
 */

import { useState, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Globe, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorPopoverProps {
  className?: string;
}

const AUTHOR = {
  name: "jagaddhita",
  handle: "@jjgarinarka",
  bio: "student • developer(?) • punk!!!!!",
  role: "full-stack dev wannabe",
  location: "Yogyakarta, ID",
  links: [
    {
      label: "Website",
      href: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jgarinarka.vercel.app",
      icon: Globe,
    },
    {
      label: "GitHub",
      href: process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/garinarka",
      icon: Github,
    },
    {
      label: "Twitter",
      href:
        process.env.NEXT_PUBLIC_TWITTER ?? "https://twitter.com/jjgarinarka",
      icon: Twitter,
    },
  ],
} as const;

const POP_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.97,
    transition: { duration: 0.1 },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
} as const;

export default function AuthorPopover({ className }: AuthorPopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  // Open on mouse enter / focus
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape") {
      hide();
      triggerRef.current?.focus();
    }
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "font-brutal text-brutal-base text-punk-white",
          "underline decoration-dotted underline-offset-4",
          "hover:text-neon-yellow focus-visible:text-neon-yellow",
          "focus-visible:outline-none focus-visible:decoration-solid",
          "transition-colors duration-0 cursor-pointer",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        onFocus={show}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>) => {
          // Only hide if focus leaves both trigger AND popover
          if (
            !e.currentTarget.parentElement?.contains(e.relatedTarget as Element)
          ) {
            hide();
          }
        }}
        onKeyDown={handleKeyDown}
      >
        {AUTHOR.name}
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={popoverId}
            role="dialog"
            aria-label={`Profile of ${AUTHOR.name}`}
            className={cn(
              // Positioning: above the trigger on desktop, below on mobile
              "absolute bottom-full left-0 mb-3 z-50",
              "w-72",
              // Prevent going off-screen to the right
              "max-w-[calc(100vw-2rem)]",
            )}
            variants={POP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onMouseEnter={show}
            onMouseLeave={hide}
            onKeyDown={handleKeyDown}
          >
            {/* Card */}
            <div className="border-brutal border-neon-yellow bg-punk-black p-4 shadow-brutal-lg">
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 border-brutal border-neon-yellow flex items-center justify-center text-2xl shrink-0 select-none"
                  aria-hidden="true"
                >
                  👤
                </div>
                <div>
                  <p className="font-brutal text-brutal-base text-neon-yellow leading-none">
                    {AUTHOR.name}
                  </p>
                  <p className="font-mono text-brutal-xs text-punk-white/50 mt-0.5">
                    {AUTHOR.handle}
                  </p>
                </div>
              </div>

              {/* Role + location */}
              <div className="flex items-center gap-2 mb-2">
                <Code2
                  size={12}
                  className="text-neon-green shrink-0"
                  aria-hidden="true"
                />
                <span className="font-mono text-brutal-xs text-neon-green">
                  {AUTHOR.role}
                </span>
              </div>
              <p className="font-mono text-brutal-xs text-punk-white/60 mb-3 leading-relaxed">
                {AUTHOR.bio}
              </p>
              <p className="font-mono text-brutal-xs text-punk-white/40 mb-4">
                📍 {AUTHOR.location}
              </p>

              {/* Links */}
              <div className="flex gap-2 border-t border-punk-white/10 pt-3">
                {AUTHOR.links.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "flex items-center justify-center w-8 h-8",
                      "border border-punk-white/30 text-punk-white/50",
                      "hover:border-neon-yellow hover:text-neon-yellow",
                      "transition-colors duration-0",
                    )}
                  >
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Arrow pointing down */}
            <div
              className="absolute top-full left-5 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neon-yellow"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
