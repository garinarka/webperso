import type { ComponentType } from "react";
import { PortableTextBlock } from "@portabletext/react";

export interface SanityPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  category: "tutorial" | "thoughts" | "project" | "rant";
  tags: string[];
  featured: boolean;
  published: boolean;
  body?: PortableTextBlock[];
  imageUrl?: string;
  imageAlt?: string;
  readTime?: number;
  // New fields
  commentsEnabled?: boolean; // defaults to true if absent
  pinnedCommentId?: string; // optional: Redis comment ID to pin
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  longDescription?: string;
  category: "web" | "design" | "mobile" | "experiment";
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  status: "completed" | "in-progress" | "archived";
  order?: number;
  imageUrl?: string;
  imageAlt?: string;
  gallery?: Array<{
    url: string;
    alt?: string;
  }>;
}

export interface PortableTextComponents {
  types?: {
    image?: ComponentType<any>;
    code?: ComponentType<any>;
  };
  marks?: {
    link?: ComponentType<any>;
  };
  block?: {
    h1?: ComponentType<any>;
    h2?: ComponentType<any>;
    h3?: ComponentType<any>;
    h4?: ComponentType<any>;
    blockquote?: ComponentType<any>;
    normal?: ComponentType<any>;
  };
  list?: {
    bullet?: ComponentType<any>;
    number?: ComponentType<any>;
  };
}
