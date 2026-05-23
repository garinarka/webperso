"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function BlogSearch({
  value,
  onChange,
  className,
}: BlogSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "relative border-brutal border-punk-white/30 flex items-center",
        className,
      )}
    >
      <Search
        size={16}
        className="absolute left-4 text-punk-white/40 shrink-0 pointer-events-none"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search posts..."
        className="w-full bg-punk-black pl-10 pr-10 py-3 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:outline-none"
        aria-label="Search blog posts"
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-4 text-punk-white/40 hover:text-punk-white transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
