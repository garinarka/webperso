"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { StoredComment } from "@/app/api/blog/[postId]/comments/route";
import NeonButton from "@/components/NeonButton";

interface Props {
  comments: StoredComment[];
}

export default function AdminCommentsClient({ comments: initial }: Props) {
  const [comments, setComments] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function approve(comment: StoredComment) {
    await fetch(`/api/blog/${comment.postId}/comments/${comment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    setComments((prev) => prev.filter((c) => c.id !== comment.id));
  }

  async function remove(comment: StoredComment) {
    await fetch(`/api/blog/${comment.postId}/comments/${comment.id}`, {
      method: "DELETE",
    });
    setComments((prev) => prev.filter((c) => c.id !== comment.id));
  }

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="border-brutal border-punk-white/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-brutal text-brutal-sm text-punk-white">
                  {c.authorName}
                </span>
                <span className="font-mono text-brutal-xs text-punk-white/40">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
                {c.parentId && (
                  <span className="font-mono text-brutal-xs text-neon-cyan">
                    [REPLY]
                  </span>
                )}
              </div>
              <p className="font-mono text-brutal-sm text-punk-white/70 break-words">
                {c.text}
              </p>
              <p className="font-mono text-brutal-xs text-punk-white/30 mt-2">
                Post: {c.postId}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <NeonButton
                onClick={() =>
                  startTransition(() => {
                    approve(c);
                  })
                }
                disabled={isPending}
                variant="green"
                size="md"
                // className="w-full sm:w-auto"
              >
                APPROVE
              </NeonButton>
              <NeonButton
                onClick={() => {
                  if (confirm("Delete this comment?"))
                    startTransition(() => {
                      remove(c);
                    });
                }}
                disabled={isPending}
                variant="red"
                size="md"
                // className="w-full sm:w-auto"
              >
                DELETE
              </NeonButton>
            </div>
          </div>
        </div>
      ))}

      {comments.length === 0 && (
        <p className="font-mono text-brutal-sm text-punk-white/40">
          // all clear
        </p>
      )}
    </div>
  );
}
