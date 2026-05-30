"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  MessageSquare,
  Eye,
  TrendingUp,
  Github,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  BarChart3,
} from "lucide-react";

interface Stats {
  projects: {
    total: number;
    visible: number;
    hidden: number;
    github: number;
    manual: number;
    lastGithubSync: string | null;
    byStatus: { completed: number; inProgress: number; archived: number };
    byCategory: {
      web: number;
      mobile: number;
      design: number;
      experiment: number;
    };
  };
  comments: {
    total: number;
    pending: number;
    approved: number;
    recent: {
      id: string;
      postId: string;
      text: string;
      authorName: string;
      createdAt: string;
    }[];
  };
  content: {
    totalViews: number;
    topPosts: { postId: string; count: number }[];
    trending: { postId: string; score: number }[];
  };
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "yellow",
  href,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color?: "yellow" | "green" | "red" | "cyan" | "white";
  href?: string;
}) {
  const colorMap = {
    yellow: "text-neon-yellow border-neon-yellow/30",
    green: "text-neon-green border-neon-green/30",
    red: "text-neon-red border-neon-red/30",
    cyan: "text-neon-cyan border-neon-cyan/30",
    white: "text-punk-white border-punk-white/20",
  };
  const inner = (
    <div
      className={`border-brutal ${colorMap[color]} p-5 bg-punk-gray-100 hover:bg-punk-gray-200 transition-colors`}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon size={18} className={colorMap[color].split(" ")[0]} />
        <span className="font-mono text-brutal-xs text-punk-white/30">
          {label}
        </span>
      </div>
      <p
        className={`font-brutal text-brutal-4xl ${colorMap[color].split(" ")[0]} mb-1`}
      >
        {value}
      </p>
      {sub && (
        <p className="font-mono text-brutal-xs text-punk-white/40">{sub}</p>
      )}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function ProgressBar({
  label,
  value,
  max,
  color = "#FFE600",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-brutal-xs text-punk-white/50 w-20 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2 bg-punk-white/10 border border-punk-white/10">
        <div
          className="h-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-mono text-brutal-xs text-punk-white/50 w-8 text-right">
        {value}
      </span>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [now] = useState(new Date());

  async function load(showRefresh = false) {
    if (showRefresh) setRefreshing(true);
    const res = await fetch("/api/admin/stats");
    if (res.ok) setStats(await res.json());
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <p className="font-mono text-brutal-sm text-punk-white/40 animate-pulse">
          loading dashboard...
        </p>
      </div>
    );
  }

  const s = stats!;
  const maxCategory = Math.max(...Object.values(s.projects.byCategory));

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-brutal text-brutal-3xl text-neon-yellow">
            DASHBOARD
          </h1>
          <p className="font-mono text-brutal-xs text-punk-white/30 mt-1">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="flex items-center gap-2 font-mono text-brutal-xs border-brutal border-punk-white/20 text-punk-white/50 hover:text-punk-white hover:border-punk-white/40 px-4 py-2 transition-colors"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          REFRESH
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="TOTAL PROJECTS"
          value={s.projects.total}
          sub={`${s.projects.visible} visible`}
          icon={FolderKanban}
          color="yellow"
          href="/admin/dashboard/projects"
        />
        <StatCard
          label="TOTAL COMMENTS"
          value={s.comments.total}
          sub={`${s.comments.pending} pending`}
          icon={MessageSquare}
          color={s.comments.pending > 0 ? "red" : "green"}
          href="/admin/dashboard/comments"
        />
        <StatCard
          label="TOTAL VIEWS"
          value={s.content.totalViews.toLocaleString()}
          sub="all posts"
          icon={Eye}
          color="cyan"
        />
        <StatCard
          label="GITHUB REPOS"
          value={s.projects.github}
          sub={
            s.projects.lastGithubSync
              ? `synced ${new Date(s.projects.lastGithubSync).toLocaleDateString()}`
              : "never synced"
          }
          icon={Github}
          color="white"
        />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project breakdown */}
        <div className="border-brutal border-punk-white/20 p-6 bg-punk-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={16} className="text-neon-yellow" />
            <h2 className="font-brutal text-brutal-sm text-punk-white">
              PROJECTS BREAKDOWN
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Completed",
                  value: s.projects.byStatus.completed,
                  color: "#4ade80",
                },
                {
                  label: "In Progress",
                  value: s.projects.byStatus.inProgress,
                  color: "#FFE600",
                },
                {
                  label: "Archived",
                  value: s.projects.byStatus.archived,
                  color: "#ffffff40",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="text-center border border-punk-white/10 p-3"
                >
                  <p
                    className="font-brutal text-brutal-2xl mb-1"
                    style={{ color }}
                  >
                    {value}
                  </p>
                  <p className="font-mono text-brutal-xs text-punk-white/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-brutal-xs text-punk-white/30 mb-2">
              BY CATEGORY
            </p>
            <ProgressBar
              label="Web"
              value={s.projects.byCategory.web}
              max={maxCategory}
              color="#FFE600"
            />
            <ProgressBar
              label="Mobile"
              value={s.projects.byCategory.mobile}
              max={maxCategory}
              color="#00e5ff"
            />
            <ProgressBar
              label="Design"
              value={s.projects.byCategory.design}
              max={maxCategory}
              color="#ff00ff"
            />
            <ProgressBar
              label="Experiment"
              value={s.projects.byCategory.experiment}
              max={maxCategory}
              color="#4ade80"
            />
          </div>

          <div className="mt-5 pt-4 border-t border-punk-white/10 flex items-center justify-between">
            <div className="flex gap-4">
              <div>
                <p className="font-brutal text-brutal-xl text-neon-yellow">
                  {s.projects.visible}
                </p>
                <p className="font-mono text-brutal-xs text-punk-white/40">
                  visible
                </p>
              </div>
              <div>
                <p className="font-brutal text-brutal-xl text-punk-white/40">
                  {s.projects.hidden}
                </p>
                <p className="font-mono text-brutal-xs text-punk-white/40">
                  hidden
                </p>
              </div>
            </div>
            <Link
              href="/admin/dashboard/projects"
              className="font-mono text-brutal-xs text-neon-yellow border border-neon-yellow/30 px-3 py-1 hover:bg-neon-yellow/10 transition-colors"
            >
              MANAGE →
            </Link>
          </div>
        </div>

        {/* Comments status */}
        <div className="border-brutal border-punk-white/20 p-6 bg-punk-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare size={16} className="text-neon-cyan" />
            <h2 className="font-brutal text-brutal-sm text-punk-white">
              COMMENTS
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="border border-neon-green/30 p-4 text-center">
              <CheckCircle size={16} className="text-neon-green mx-auto mb-2" />
              <p className="font-brutal text-brutal-3xl text-neon-green">
                {s.comments.approved}
              </p>
              <p className="font-mono text-brutal-xs text-punk-white/40">
                approved
              </p>
            </div>
            <div
              className={`border p-4 text-center ${s.comments.pending > 0 ? "border-neon-red/30" : "border-punk-white/10"}`}
            >
              <AlertCircle
                size={16}
                className={`mx-auto mb-2 ${s.comments.pending > 0 ? "text-neon-red" : "text-punk-white/30"}`}
              />
              <p
                className={`font-brutal text-brutal-3xl ${s.comments.pending > 0 ? "text-neon-red" : "text-punk-white/30"}`}
              >
                {s.comments.pending}
              </p>
              <p className="font-mono text-brutal-xs text-punk-white/40">
                pending
              </p>
            </div>
          </div>

          {s.comments.pending > 0 && (
            <Link
              href="/admin/dashboard/comments"
              className="flex items-center justify-center gap-2 w-full border-brutal border-neon-red/50 text-neon-red font-mono text-brutal-xs px-4 py-2 hover:bg-neon-red/10 transition-colors mb-4"
            >
              <AlertCircle size={12} />
              REVIEW {s.comments.pending} PENDING
            </Link>
          )}

          <div className="space-y-2">
            <p className="font-mono text-brutal-xs text-punk-white/30 mb-2">
              RECENT
            </p>
            {s.comments.recent.length === 0 ? (
              <p className="font-mono text-brutal-xs text-punk-white/20">
                // no recent comments
              </p>
            ) : (
              s.comments.recent.slice(0, 3).map((c, i) => (
                <div key={i} className="border border-punk-white/10 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-brutal-xs text-neon-yellow">
                      {c.authorName}
                    </span>
                    <span className="font-mono text-brutal-xs text-punk-white/30">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-mono text-brutal-xs text-punk-white/50 truncate">
                    {c.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top content */}
        <div className="border-brutal border-punk-white/20 p-6 bg-punk-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-neon-green" />
            <h2 className="font-brutal text-brutal-sm text-punk-white">
              TOP CONTENT
            </h2>
          </div>

          <div className="space-y-2 mb-6">
            <p className="font-mono text-brutal-xs text-punk-white/30 mb-2">
              MOST VIEWED
            </p>
            {s.content.topPosts.length === 0 ? (
              <p className="font-mono text-brutal-xs text-punk-white/20">
                // no view data yet
              </p>
            ) : (
              s.content.topPosts.map((p, i) => (
                <div
                  key={p.postId}
                  className="flex items-center gap-3 border border-punk-white/10 p-3"
                >
                  <span className="font-brutal text-brutal-sm text-punk-white/20 w-4">
                    {i + 1}
                  </span>
                  <span className="font-mono text-brutal-xs text-punk-white/60 flex-1 truncate">
                    {p.postId}
                  </span>
                  <span className="font-mono text-brutal-xs text-neon-cyan">
                    {p.count}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2">
            <p className="font-mono text-brutal-xs text-punk-white/30 mb-2">
              TRENDING (engagement)
            </p>
            {s.content.trending.length === 0 ? (
              <p className="font-mono text-brutal-xs text-punk-white/20">
                // no engagement data
              </p>
            ) : (
              s.content.trending.map((t, i) => (
                <div
                  key={t.postId}
                  className="flex items-center gap-3 border border-punk-white/10 p-3"
                >
                  <span className="font-brutal text-brutal-sm text-punk-white/20 w-4">
                    {i + 1}
                  </span>
                  <span className="font-mono text-brutal-xs text-punk-white/60 flex-1 truncate">
                    {t.postId}
                  </span>
                  <span className="font-mono text-brutal-xs text-neon-yellow">
                    ↑{t.score}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="border-brutal border-punk-white/10 p-6 bg-punk-gray-100">
        <h2 className="font-brutal text-brutal-sm text-punk-white/50 mb-4">
          QUICK ACTIONS
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/dashboard/projects"
            className="font-mono text-brutal-xs border-brutal border-neon-yellow/30 text-neon-yellow px-4 py-2 hover:bg-neon-yellow/10 transition-colors flex items-center gap-2"
          >
            <FolderKanban size={13} /> MANAGE PROJECTS
          </Link>
          <Link
            href="/admin/dashboard/comments"
            className="font-mono text-brutal-xs border-brutal border-neon-cyan/30 text-neon-cyan px-4 py-2 hover:bg-neon-cyan/10 transition-colors flex items-center gap-2"
          >
            <MessageSquare size={13} /> MODERATE COMMENTS
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="font-mono text-brutal-xs border-brutal border-punk-white/20 text-punk-white/50 px-4 py-2 hover:text-punk-white hover:border-punk-white/40 transition-colors flex items-center gap-2"
          >
            <Eye size={13} /> VIEW BLOG
          </Link>
          <Link
            href="/projects"
            target="_blank"
            className="font-mono text-brutal-xs border-brutal border-punk-white/20 text-punk-white/50 px-4 py-2 hover:text-punk-white hover:border-punk-white/40 transition-colors flex items-center gap-2"
          >
            <Eye size={13} /> VIEW PROJECTS
          </Link>
        </div>
      </div>

      {/* System info */}
      <div className="border-brutal border-punk-white/10 p-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 font-mono text-brutal-xs text-punk-white/30">
            <Clock size={12} />
            Last sync:{" "}
            {s.projects.lastGithubSync
              ? new Date(s.projects.lastGithubSync).toLocaleString()
              : "never"}
          </div>
          <div className="flex items-center gap-2 font-mono text-brutal-xs">
            <span className="w-2 h-2 rounded-full bg-neon-green inline-block" />
            <span className="text-punk-white/30">Redis: connected</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-brutal-xs text-punk-white/30">
            Storage: {s.projects.github} github + {s.projects.manual} manual
            projects · {s.comments.total} comments
          </div>
        </div>
      </div>
    </div>
  );
}
