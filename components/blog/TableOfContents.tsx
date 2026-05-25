"use client";

import { useState, useEffect, useRef } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/reading-time";

interface TableOfContentsProps {
  items: TocItem[];
  mode?: "mobile" | "sidebar";
}

export default function TableOfContents({
  items,
  mode = "mobile",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0% -70% 0%", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  // ── Sidebar variant (no extra wrapper, no collapse toggle) ────────────────
  if (mode === "sidebar") {
    return (
      <div className="border-brutal border-punk-white/30 p-4">
        <p className="font-mono text-brutal-xs text-punk-white/50 mb-4 flex items-center gap-2">
          <List size={14} aria-hidden="true" />
          ON THIS PAGE
        </p>
        <nav aria-label="Table of contents">
          <TocList items={items} activeId={activeId} />
        </nav>
      </div>
    );
  }

  // ── Mobile collapsible variant ────────────────────────────────────────────
  return (
    <div className="lg:hidden border-brutal border-punk-white/30 mb-8">
      <button
        onClick={() => setExpanded((v: boolean) => !v)}
        className="w-full flex items-center justify-between p-4 font-mono text-brutal-sm text-punk-white/70 hover:text-neon-yellow transition-colors duration-0"
        aria-expanded={expanded}
        aria-controls="toc-list-mobile"
      >
        <span className="flex items-center gap-2">
          <List size={16} aria-hidden="true" />
          TABLE OF CONTENTS
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <nav
          id="toc-list-mobile"
          className="px-4 pb-4"
          aria-label="Table of contents"
        >
          <TocList items={items} activeId={activeId} />
        </nav>
      )}
    </div>
  );
}

// ─── Shared link list ─────────────────────────────────────────────────────────
function TocList({ items, activeId }: { items: TocItem[]; activeId: string }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
          <a
            href={`#${item.id}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={cn(
              "block font-mono text-brutal-xs py-1 transition-colors duration-0 hover:text-neon-yellow",
              activeId === item.id
                ? "text-neon-yellow border-l-2 border-neon-yellow pl-2"
                : "text-punk-white/50",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
