import { redis, keys } from "@/lib/redis";
import type { StoredComment } from "@/app/api/blog/[postId]/comments/route";
import AdminCommentsClient from "./AdminCommentsClient";
import NeonButton from "@/components/NeonButton";

async function getPendingComments(): Promise<StoredComment[]> {
  // Scan all comment:* keys from Redis
  // We use the recent:comments sorted set + brute-force for pending ones
  // Better approach: iterate all posts. But since we don't have a post list in Redis,
  // use SCAN to find all comment:* keys.
  let cursor = 0;
  const commentKeys: string[] = [];

  do {
    const [nextCursor, keys_] = await redis.scan(cursor, {
      match: "comment:*",
      count: 100,
    });
    cursor = Number(nextCursor);
    commentKeys.push(...keys_);
  } while (cursor !== 0);

  if (commentKeys.length === 0) return [];

  const comments = await Promise.all(
    commentKeys.map((k) => redis.get<StoredComment>(k)),
  );

  return comments
    .filter((c): c is StoredComment => c !== null && !c.approved)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export default async function AdminCommentsPage() {
  const pending = await getPendingComments();

  return (
    <div className="min-h-screen bg-punk-black text-punk-white p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-brutal text-brutal-3xl text-neon-yellow">
          PENDING COMMENTS
          <span className="font-mono text-brutal-base text-punk-white/50 ml-4">
            ({pending.length})
          </span>
        </h1>
        <LogoutButton />
      </div>

      {pending.length === 0 ? (
        <p className="font-mono text-brutal-sm text-punk-white/40">
          // no pending comments
        </p>
      ) : (
        <AdminCommentsClient comments={pending} />
      )}
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="POST">
      <NeonButton
        type="submit"
        formAction="/api/admin/logout"
        variant="red"
        size="lg"
        className="w-full sm:w-auto"
      >
        LOGOUT
      </NeonButton>
    </form>
  );
}
