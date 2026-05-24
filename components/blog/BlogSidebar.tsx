/**
 * components/blog/BlogSidebar.tsx
 *
 * Server component — sticky right sidebar for blog detail pages.
 * Contains TOC (sidebar mode) + ShareButtons (compact aside mode).
 */

import type { TocItem } from "@/lib/reading-time";
import TableOfContents  from "@/components/blog/TableOfContents";
import ShareButtons     from "@/components/blog/ShareButtons";

interface BlogSidebarProps {
  toc:     TocItem[];
  title:   string;
  excerpt: string;
  slug:    string;
}

export default function BlogSidebar({ toc, title, excerpt, slug }: BlogSidebarProps) {
  return (
    <aside
      className="hidden lg:flex flex-col gap-4 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto"
      aria-label="Article sidebar"
    >
      {/* Table of contents in sidebar mode */}
      {toc.length >= 2 && <TableOfContents items={toc} mode="sidebar" />}

      {/* Sticky share buttons */}
      <ShareButtons
        title={title}
        excerpt={excerpt}
        slug={slug}
        variant="white"
        asAside
      />
    </aside>
  );
}
