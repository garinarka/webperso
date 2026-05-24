import type {
  PortableTextComponents,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Mirror of lib/reading-time.ts slugify — must match for TOC links to work
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { _ref?: string }; alt?: string } & Record<
        string,
        unknown
      >;
    }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={(value.alt as string) || "Blog image"}
            width={800}
            height={450}
            className="border-brutal border-punk-white w-full"
          />
          {value.alt && (
            <p className="text-brutal-xs font-mono text-punk-white/50 mt-2 text-center">
              {value.alt}
            </p>
          )}
        </div>
      );
    },

    // Code block (Sanity blockContent often includes a code type)
    code: ({
      value,
    }: {
      value: { code?: string; language?: string; filename?: string };
    }) => {
      if (!value?.code) return null;
      return (
        <div className="my-6 overflow-x-auto">
          {value.filename && (
            <div className="border-brutal border-punk-white/30 border-b-0 px-4 py-2 bg-punk-gray-200">
              <span className="font-mono text-brutal-xs text-neon-yellow">
                {value.filename}
              </span>
              {value.language && (
                <span className="ml-3 font-mono text-brutal-xs text-punk-white/40">
                  {value.language}
                </span>
              )}
            </div>
          )}
          <pre className="border-brutal border-punk-white/30 p-4 bg-punk-gray-100 overflow-x-auto">
            <code
              className={`font-mono text-brutal-sm text-punk-white/90 ${
                value.language ? `language-${value.language}` : ""
              }`}
            >
              {value.code}
            </code>
          </pre>
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value?.href?.startsWith("/") ? "_blank" : undefined;

      return (
        <a
          href={value?.href || "#"}
          rel={rel}
          target={target}
          className="text-neon-yellow hover:text-punk-white underline"
        >
          {children}
        </a>
      );
    },

    // Inline code
    code: ({ children }: PortableTextMarkComponentProps) => (
      <code className="font-mono text-brutal-sm text-neon-green bg-punk-gray-200 px-2 py-0.5 border border-punk-white/10">
        {children}
      </code>
    ),
  },

  block: {
    // ── Headings with IDs for TOC ─────────────────────────────────────────────
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => {
      const text = Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : String(children || "");
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="text-brutal-3xl font-brutal text-neon-yellow mb-4 mt-10 scroll-mt-24"
        >
          {children}
        </h2>
      );
    },

    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => {
      const text = Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : String(children || "");
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="text-brutal-2xl font-brutal text-neon-green mb-4 mt-8 scroll-mt-24"
        >
          {children}
        </h3>
      );
    },

    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => {
      const text = Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : String(children || "");
      const id = slugify(text);
      return (
        <h4
          id={id}
          className="text-brutal-xl font-brutal text-neon-pink mb-3 mt-6 scroll-mt-24"
        >
          {children}
        </h4>
      );
    },

    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-brutal-4xl font-brutal text-punk-white mb-6 mt-8">
        {children}
      </h1>
    ),

    blockquote: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-l-brutal border-neon-yellow pl-6 py-2 my-6 italic text-punk-white/80">
        {children}
      </blockquote>
    ),

    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="font-mono text-brutal-base text-punk-white/80 mb-4 leading-relaxed">
        {children}
      </p>
    ),
  },

  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-none ml-6 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-none ml-6 mb-6 space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="font-mono text-brutal-base text-punk-white/80 flex items-start">
        <span className="text-neon-yellow mr-3 shrink-0 mt-0.5">→</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="font-mono text-brutal-base text-punk-white/80 flex items-start">
        <span className="text-neon-green mr-3 shrink-0 w-5 text-right">
          {(index || 0) + 1}.
        </span>
        <span>{children}</span>
      </li>
    ),
  },
};
