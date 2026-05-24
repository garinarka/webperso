import type { TocItem } from "@/lib/reading-time";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";

interface BlogSidebarProps {
  toc: TocItem[];
  title: string;
  excerpt: string;
  slug: string;
}

export default function BlogSidebar({
  toc,
  title,
  excerpt,
  slug,
}: BlogSidebarProps) {
  return (
    /*
     * `sticky top-24 self-start` is the correct sticky sidebar pattern in CSS Grid.
     * - top-24  = offset from top of viewport (clears the navbar)
     * - self-start = don't stretch to fill the grid row (default is stretch,
     *   which makes the element as tall as the tallest cell, killing sticky)
     * - No overflow-y-auto here — that would make the aside its own scroll container
     *   and sticky would position relative to the aside, not the page.
     */
    <aside
      className="hidden lg:flex flex-col gap-4 sticky top-24 self-start"
      aria-label="Article sidebar"
    >
      {toc.length >= 2 && <TableOfContents items={toc} mode="sidebar" />}

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
