"use client";

import { useState, useEffect } from "react";
import { Check, Trash2, MessageSquare, Pin, RefreshCw } from "lucide-react";
import type { StoredComment } from "@/app/api/blog/[postId]/comments/route";
import NeonButton from "@/components/NeonButton";

type Filter = "pending" | "approved" | "all";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pending");
  const [processing, setProcessing] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    // Fetch via server action proxy — we call our existing API
    const res = await fetch("/api/admin/comments");
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(c: StoredComment) {
    setProcessing(c.id);
    await fetch(`/api/blog/${c.postId}/comments/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    setComments((prev) =>
      prev.map((x) => (x.id === c.id ? { ...x, approved: true } : x)),
    );
    setProcessing(null);
  }

  async function remove(c: StoredComment) {
    setProcessing(c.id);
    await fetch(`/api/blog/${c.postId}/comments/${c.id}`, { method: "DELETE" });
    setComments((prev) => prev.filter((x) => x.id !== c.id));
    setProcessing(null);
  }

  async function pin(c: StoredComment) {
    setProcessing(c.id);
    await fetch(`/api/blog/${c.postId}/comments/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned: !c.pinned }),
    });
    setComments((prev) =>
      prev.map((x) => (x.id === c.id ? { ...x, pinned: !x.pinned } : x)),
    );
    setProcessing(null);
  }

  const filtered = comments
    .filter((c) =>
      filter === "pending"
        ? !c.approved
        : filter === "approved"
          ? c.approved
          : true,
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const pendingCount = comments.filter((c) => !c.approved).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-brutal text-brutal-3xl text-neon-yellow">
            COMMENTS
          </h1>
          <p className="font-mono text-brutal-xs text-punk-white/30">
            {comments.length} total · {pendingCount} pending
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 font-mono text-brutal-xs border-brutal border-punk-white/20 text-punk-white/40 hover:text-punk-white px-4 py-2 transition-colors"
        >
          <RefreshCw size={13} /> REFRESH
        </button>
      </div>

      {/* Pending alert */}
      {pendingCount > 0 && (
        <div className="border-brutal border-neon-red/40 bg-neon-red/5 p-4 flex items-center justify-between">
          <p className="font-mono text-brutal-xs text-neon-red">
            ⚠ {pendingCount} comment{pendingCount > 1 ? "s" : ""} awaiting
            approval
          </p>
          <button
            onClick={() => setFilter("pending")}
            className="font-mono text-brutal-xs text-neon-red border border-neon-red/30 px-3 py-1 hover:bg-neon-red/10"
          >
            REVIEW
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        {(["pending", "approved", "all"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-brutal-xs px-3 py-1 border transition-colors ${filter === f ? "border-neon-yellow text-neon-yellow" : "border-punk-white/20 text-punk-white/30 hover:border-punk-white/40"}`}
          >
            {f.toUpperCase()} (
            {f === "pending"
              ? pendingCount
              : f === "approved"
                ? comments.filter((c) => c.approved).length
                : comments.length}
            )
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <p className="font-mono text-brutal-xs text-punk-white/30 animate-pulse">
          loading...
        </p>
      ) : filtered.length === 0 ? (
        <div className="border-brutal border-punk-white/10 p-12 text-center">
          <MessageSquare
            size={24}
            className="text-punk-white/20 mx-auto mb-3"
          />
          <p className="font-mono text-brutal-xs text-punk-white/20">
            {filter === "pending"
              ? "// no pending comments. all clear!"
              : "// no comments found."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className={`border-brutal p-5 ${!c.approved ? "border-neon-yellow/30 bg-neon-yellow/3" : c.pinned ? "border-neon-cyan/30" : "border-punk-white/15"}`}
            >
              {/* Meta */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-brutal text-brutal-sm text-punk-white">
                    {c.authorName}
                  </span>
                  <span className="font-mono text-brutal-xs text-punk-white/30">
                    {c.authorEmail}
                  </span>
                  {c.parentId && (
                    <span className="font-mono text-brutal-xs text-neon-cyan border border-neon-cyan/20 px-1">
                      [REPLY]
                    </span>
                  )}
                  {c.pinned && (
                    <span className="font-mono text-brutal-xs text-neon-yellow border border-neon-yellow/20 px-1">
                      [PINNED]
                    </span>
                  )}
                  {!c.approved && (
                    <span className="font-mono text-brutal-xs text-neon-red border border-neon-red/20 px-1">
                      [PENDING]
                    </span>
                  )}
                </div>
                <span className="font-mono text-brutal-xs text-punk-white/30 shrink-0">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Content */}
              <p className="font-mono text-brutal-sm text-punk-white/70 mb-3 whitespace-pre-wrap break-words leading-relaxed">
                {c.text}
              </p>

              {/* Post ref */}
              <p className="font-mono text-brutal-xs text-punk-white/25 mb-4">
                post: <span className="text-punk-white/40">{c.postId}</span>
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                {!c.approved && (
                  <button
                    onClick={() => approve(c)}
                    disabled={processing === c.id}
                    className="flex items-center gap-1.5 font-mono text-brutal-xs border-brutal border-neon-green/40 text-neon-green px-3 py-1.5 hover:bg-neon-green/10 transition-colors disabled:opacity-40"
                  >
                    <Check size={12} /> APPROVE
                  </button>
                )}
                <button
                  onClick={() => pin(c)}
                  disabled={processing === c.id}
                  className={`flex items-center gap-1.5 font-mono text-brutal-xs border-brutal px-3 py-1.5 transition-colors disabled:opacity-40 ${c.pinned ? "border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10" : "border-punk-white/20 text-punk-white/40 hover:text-punk-white"}`}
                >
                  <Pin size={12} /> {c.pinned ? "UNPIN" : "PIN"}
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this comment?")) remove(c);
                  }}
                  disabled={processing === c.id}
                  className="flex items-center gap-1.5 font-mono text-brutal-xs border-brutal border-neon-red/30 text-neon-red/60 px-3 py-1.5 hover:bg-neon-red/10 hover:text-neon-red transition-colors disabled:opacity-40"
                >
                  <Trash2 size={12} /> DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
