"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectCategory, ProjectStatus } from "@/lib/projects";
import PageTransition from "@/components/PageTransition";
import NeonButton from "@/components/NeonButton";
import {
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Plus,
  Github,
  Star,
  X,
} from "lucide-react";

// ─── Add/Edit Form ────────────────────────────────────────────────────────────

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Project>;
  onSave: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Project>>({
    title: "",
    description: "",
    category: "web",
    status: "completed",
    tags: [],
    year: new Date().getFullYear(),
    featured: false,
    visible: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    longDescription: "",
    ...initial,
  });
  const [tagInput, setTagInput] = useState((initial?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);

  const field =
    (key: keyof Project) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const tags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    await onSave({ ...form, tags });
    setSaving(false);
  }

  const inputCls =
    "w-full bg-punk-black border-brutal border-punk-white/20 px-3 py-2 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:border-neon-yellow outline-none";
  const labelCls = "block font-mono text-brutal-xs text-punk-white/50 mb-1";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>TITLE *</label>
          <input
            required
            value={form.title ?? ""}
            onChange={field("title")}
            className={inputCls}
            placeholder="Project name"
          />
        </div>
        <div>
          <label className={labelCls}>YEAR</label>
          <input
            type="number"
            value={form.year ?? new Date().getFullYear()}
            onChange={field("year")}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>DESCRIPTION *</label>
        <textarea
          required
          value={form.description ?? ""}
          onChange={field("description")}
          className={inputCls}
          rows={2}
          placeholder="Short description"
        />
      </div>

      <div>
        <label className={labelCls}>LONG DESCRIPTION</label>
        <textarea
          value={form.longDescription ?? ""}
          onChange={field("longDescription")}
          className={inputCls}
          rows={4}
          placeholder="Detailed description (optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>CATEGORY</label>
          <select
            value={form.category ?? "web"}
            onChange={field("category")}
            className={inputCls}
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="design">Design</option>
            <option value="experiment">Experiment</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>STATUS</label>
          <select
            value={form.status ?? "completed"}
            onChange={field("status")}
            className={inputCls}
          >
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>TAGS (comma separated)</label>
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className={inputCls}
          placeholder="React, TypeScript, Next.js"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>LIVE URL</label>
          <input
            value={form.liveUrl ?? ""}
            onChange={field("liveUrl")}
            className={inputCls}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className={labelCls}>GITHUB URL</label>
          <input
            value={form.githubUrl ?? ""}
            onChange={field("githubUrl")}
            className={inputCls}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>IMAGE URL</label>
        <input
          value={form.imageUrl ?? ""}
          onChange={field("imageUrl")}
          className={inputCls}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer font-mono text-brutal-sm text-punk-white">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) =>
              setForm((f) => ({ ...f, featured: e.target.checked }))
            }
            className="accent-neon-yellow"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-mono text-brutal-sm text-punk-white">
          <input
            type="checkbox"
            checked={!!form.visible}
            onChange={(e) =>
              setForm((f) => ({ ...f, visible: e.target.checked }))
            }
            className="accent-neon-yellow"
          />
          Visible
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <NeonButton type="submit" variant="yellow" size="sm" disabled={saving}>
          {saving ? "SAVING..." : "SAVE PROJECT"}
        </NeonButton>
        <button
          type="button"
          onClick={onCancel}
          className="font-mono text-brutal-xs text-punk-white/40 hover:text-punk-white"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

// ─── Project Row ──────────────────────────────────────────────────────────────

function ProjectRow({
  project,
  onToggleVisible,
  onDelete,
  onEdit,
}: {
  project: Project;
  onToggleVisible: (id: string, visible: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (p: Project) => void;
}) {
  const statusColors: Record<ProjectStatus, string> = {
    completed: "text-neon-green",
    "in-progress": "text-neon-yellow",
    archived: "text-punk-white/40",
  };

  return (
    <div
      className={`border-brutal p-4 flex items-start justify-between gap-4 ${project.visible ? "border-punk-white/20" : "border-punk-white/10 opacity-60"}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-brutal text-brutal-sm text-punk-white truncate">
            {project.title}
          </span>
          {project.featured && (
            <span className="font-mono text-brutal-xs bg-neon-yellow text-punk-black px-1">
              FEAT
            </span>
          )}
          <span className="font-mono text-brutal-xs text-punk-white/30">
            {project.source === "github" ? (
              <span className="flex items-center gap-1">
                <Github size={10} /> {project.githubOwner}
              </span>
            ) : (
              "manual"
            )}
          </span>
          <span
            className={`font-mono text-brutal-xs ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
          <span className="font-mono text-brutal-xs text-punk-white/30">
            {project.year}
          </span>
        </div>
        <p className="font-mono text-brutal-xs text-punk-white/50 truncate">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {project.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="font-mono text-brutal-xs text-punk-white/30 border border-punk-white/10 px-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onEdit(project)}
          className="font-mono text-brutal-xs text-punk-white/40 hover:text-neon-yellow border border-punk-white/20 px-2 py-1"
        >
          EDIT
        </button>
        <button
          onClick={() => onToggleVisible(project.id, !project.visible)}
          className="text-punk-white/40 hover:text-neon-yellow transition-colors"
          title={project.visible ? "Hide" : "Show"}
        >
          {project.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
        <button
          onClick={() => {
            if (confirm(`Delete "${project.title}"?`)) onDelete(project.id);
          }}
          className="text-punk-white/40 hover:text-neon-red transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManageProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<
    "all" | "visible" | "hidden" | "github" | "manual"
  >("all");

  useEffect(() => {
    fetchProjects();
    fetchSyncInfo();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects ?? []);
    setLoading(false);
  }

  async function fetchSyncInfo() {
    const res = await fetch("/api/projects/github-sync");
    if (res.ok) {
      const data = await res.json();
      setLastSync(data.lastSync);
    }
  }

  async function handleSync() {
    setSyncing(true);
    setSyncResult(null);
    const res = await fetch("/api/projects/github-sync", { method: "POST" });
    const data = await res.json();
    if (res.ok) {
      setSyncResult(
        `✓ Synced ${data.synced} repos from: ${data.accounts.join(", ")}`,
      );
      await fetchProjects();
      await fetchSyncInfo();
    } else {
      setSyncResult(`✗ ${data.error}`);
    }
    setSyncing(false);
  }

  async function toggleVisible(id: string, visible: boolean) {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible }),
    });
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, visible } : p)));
  }

  async function handleDelete(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((ps) => ps.filter((p) => p.id !== id));
  }

  async function handleAddManual(data: Partial<Project>) {
    const res = await fetch("/api/projects/manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { project } = await res.json();
      setProjects((ps) => [project, ...ps]);
      setShowAddForm(false);
    }
  }

  async function handleEdit(data: Partial<Project>) {
    if (!editProject) return;
    const res = await fetch(`/api/projects/${editProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { project } = await res.json();
      setProjects((ps) => ps.map((p) => (p.id === project.id ? project : p)));
      setEditProject(null);
    }
  }

  const filtered = projects.filter((p) => {
    if (filter === "visible") return p.visible;
    if (filter === "hidden") return !p.visible;
    if (filter === "github") return p.source === "github";
    if (filter === "manual") return p.source === "manual";
    return true;
  });

  const visibleCount = projects.filter((p) => p.visible).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-punk-black text-punk-white">
        <div className="max-w-5xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-brutal text-brutal-4xl text-neon-yellow">
                MANAGE PROJECTS
              </h1>
              <p className="font-mono text-brutal-xs text-punk-white/40 mt-1">
                {visibleCount}/{projects.length} visible
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => router.push("/projects")}
                className="font-mono text-brutal-xs text-punk-white/40 hover:text-punk-white border border-punk-white/20 px-3 py-2"
              >
                ← BACK
              </button>
              <NeonButton
                onClick={() => {
                  setShowAddForm(true);
                  setEditProject(null);
                }}
                variant="yellow"
                size="sm"
              >
                <Plus size={14} /> ADD MANUAL
              </NeonButton>
              <NeonButton
                onClick={handleSync}
                variant="green"
                size="sm"
                disabled={syncing}
              >
                <RefreshCw
                  size={14}
                  className={syncing ? "animate-spin" : ""}
                />
                {syncing ? "SYNCING..." : "SYNC GITHUB"}
              </NeonButton>
            </div>
          </div>

          {/* Sync info */}
          <div className="mb-6 flex items-center gap-4 flex-wrap">
            {lastSync && (
              <p className="font-mono text-brutal-xs text-punk-white/30 flex items-center gap-1">
                <Github size={12} /> last sync:{" "}
                {new Date(lastSync).toLocaleString()}
              </p>
            )}
            {syncResult && (
              <p
                className={`font-mono text-brutal-xs ${syncResult.startsWith("✓") ? "text-neon-green" : "text-neon-red"}`}
              >
                {syncResult}
              </p>
            )}
          </div>

          {/* Add / Edit Form */}
          {(showAddForm || editProject) && (
            <div className="border-brutal border-neon-yellow p-6 mb-8 bg-punk-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-brutal text-brutal-xl text-neon-yellow">
                  {editProject ? "EDIT PROJECT" : "ADD PROJECT"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditProject(null);
                  }}
                >
                  <X
                    size={16}
                    className="text-punk-white/40 hover:text-punk-white"
                  />
                </button>
              </div>
              <ProjectForm
                initial={editProject ?? undefined}
                onSave={editProject ? handleEdit : handleAddManual}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditProject(null);
                }}
              />
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["all", "visible", "hidden", "github", "manual"] as const).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-brutal-xs px-3 py-1 border transition-colors ${filter === f ? "border-neon-yellow text-neon-yellow" : "border-punk-white/20 text-punk-white/40 hover:border-punk-white/40"}`}
                >
                  {f.toUpperCase()}{" "}
                  {f === "all"
                    ? `(${projects.length})`
                    : f === "visible"
                      ? `(${projects.filter((p) => p.visible).length})`
                      : f === "hidden"
                        ? `(${projects.filter((p) => !p.visible).length})`
                        : f === "github"
                          ? `(${projects.filter((p) => p.source === "github").length})`
                          : `(${projects.filter((p) => p.source === "manual").length})`}
                </button>
              ),
            )}
          </div>

          {/* Project list */}
          {loading ? (
            <p className="font-mono text-brutal-sm text-punk-white/40 animate-pulse">
              loading...
            </p>
          ) : filtered.length === 0 ? (
            <div className="border-brutal border-punk-white/10 p-12 text-center">
              <p className="font-mono text-brutal-sm text-punk-white/30">
                {filter === "all"
                  ? "// no projects yet. sync github or add manually."
                  : `// no ${filter} projects.`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  onToggleVisible={toggleVisible}
                  onDelete={handleDelete}
                  onEdit={(p) => {
                    setEditProject(p);
                    setShowAddForm(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
