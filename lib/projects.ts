import { redis } from "./redis";

export type ProjectSource = "github" | "manual";
export type ProjectCategory = "web" | "design" | "mobile" | "experiment";
export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface Project {
  id: string;
  source: ProjectSource;
  // GitHub-synced fields
  githubId?: number;
  githubOwner?: string; // which account this came from
  // Display fields
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  status: ProjectStatus;
  order?: number;
  imageUrl?: string;
  imageAlt?: string;
  // Visibility (admin-controlled)
  visible: boolean;
  // Timestamps
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
}

// Redis key helpers
export const projectKeys = {
  all: () => "projects:all", // sorted set: score=order, member=id
  item: (id: string) => `project:${id}`,
  githubSync: () => "projects:github:last_sync",
};

export async function getAllProjects(): Promise<Project[]> {
  const ids = await redis.zrange(projectKeys.all(), 0, -1);
  if (!ids.length) return [];

  const items = await Promise.all(
    ids.map((id) => redis.get<Project>(projectKeys.item(id as string))),
  );
  return items.filter((p): p is Project => p !== null);
}

export async function getVisibleProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter((p) => p.visible)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.order ?? 0) - (a.order ?? 0);
    });
}

export async function upsertProject(project: Project): Promise<void> {
  await redis.set(projectKeys.item(project.id), JSON.stringify(project));
  await redis.zadd(projectKeys.all(), {
    score: project.order ?? Date.now(),
    member: project.id,
  });
}

export async function deleteProject(id: string): Promise<void> {
  await Promise.all([
    redis.del(projectKeys.item(id)),
    redis.zrem(projectKeys.all(), id),
  ]);
}
