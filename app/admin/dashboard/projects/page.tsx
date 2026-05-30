"use client";

import { useState, useEffect } from "react";
import type { Project, ProjectStatus } from "@/lib/projects";
import NeonButton from "@/components/NeonButton";
import {
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Plus,
  Github,
  X,
  Check,
} from "lucide-react";

// ─── Form ─────────────────────────────────────────────────────────────────────

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

  const f =
    (key: keyof Project) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...form,
      tags: tagInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setSaving(false);
  }

  const inp =
    "w-full bg-punk-black border border-punk-white/20 px-3 py-2 font-mono text-brutal-xs text-punk-white placeholder:text-punk-white/20 focus:border-neon-yellow outline-none";
  const lbl = "block font-mono text-brutal-xs text-punk-white/40 mb-1";

  return (
    <form
      onSubmit={submit}
      className="space-y-3 p-6 border-brutal border-neon-yellow/30 bg-punk-gray-100"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-brutal text-brutal-base text-neon-yellow">
          {initial?.id ? "EDIT PROJECT" : "ADD PROJECT"}
        </h3>
        <button type="button" onClick={onCancel}>
          <X size={14} className="text-punk-white/40 hover:text-punk-white" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>TITLE*</label>
          <input
            required
            value={form.title ?? ""}
            onChange={f("title")}
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>YEAR</label>
          <input
            type="number"
            value={form.year ?? ""}
            onChange={f("year")}
            className={inp}
          />
        </div>
      </div>
      <div>
        <label className={lbl}>DESCRIPTION*</label>
        <textarea
          required
          value={form.description ?? ""}
          onChange={f("description")}
          className={inp}
          rows={2}
        />
      </div>
      <div>
        <label className={lbl}>LONG DESCRIPTION</label>
        <textarea
          value={form.longDescription ?? ""}
          onChange={f("longDescription")}
          className={inp}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>CATEGORY</label>
          <select
            value={form.category ?? "web"}
            onChange={f("category")}
            className={inp}
          >
            {["web", "mobile", "design", "experiment"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>STATUS</label>
          <select
            value={form.status ?? "completed"}
            onChange={f("status")}
            className={inp}
          >
            {["completed", "in-progress", "archived"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={lbl}>TAGS (comma separated)</label>
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className={inp}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>LIVE URL</label>
          <input
            value={form.liveUrl ?? ""}
            onChange={f("liveUrl")}
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>GITHUB URL</label>
          <input
            value={form.githubUrl ?? ""}
            onChange={f("githubUrl")}
            className={inp}
          />
        </div>
      </div>
      <div>
        <label className={lbl}>IMAGE URL</label>
        <input
          value={form.imageUrl ?? ""}
          onChange={f("imageUrl")}
          className={inp}
        />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 font-mono text-brutal-xs text-punk-white cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) =>
              setForm((p) => ({ ...p, featured: e.target.checked }))
            }
            className="accent-neon-yellow"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 font-mono text-brutal-xs text-punk-white cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.visible}
            onChange={(e) =>
              setForm((p) => ({ ...p, visible: e.target.checked }))
            }
            className="accent-neon-yellow"
          />
          Visible
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <NeonButton type="submit" variant="yellow" size="sm" disabled={saving}>
          {saving ? "SAVING..." : "SAVE"}
        </NeonButton>
        <button
          type="button"
          onClick={onCancel}
          className="font-mono text-brutal-xs text-punk-white/30 hover:text-punk-white"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function Row({
  p,
  onToggle,
  onDelete,
  onEdit,
}: {
  p: Project;
  onToggle: (id: string, v: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (p: Project) => void;
}) {
  const statusColor: Record<ProjectStatus, string> = {
    completed: "text-neon-green",
    "in-progress": "text-neon-yellow",
    archived: "text-punk-white/30",
  };
  return (
    <div
      className={`border-brutal p-4 flex items-start gap-4 ${p.visible ? "border-punk-white/20" : "border-punk-white/10 opacity-60"}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-brutal text-brutal-sm text-punk-white">
            {p.title}
          </span>
          {p.featured && (
            <span className="font-mono text-brutal-xs bg-neon-yellow text-punk-black px-1">
              FEAT
            </span>
          )}
          <span className="font-mono text-brutal-xs text-punk-white/30 flex items-center gap-1">
            {p.source === "github" ? (
              <>
                <Github size={10} />
                {p.githubOwner}
              </>
            ) : (
              "manual"
            )}
          </span>
          <span className={`font-mono text-brutal-xs ${statusColor[p.status]}`}>
            {p.status}
          </span>
          <span className="font-mono text-brutal-xs text-punk-white/20">
            {p.year}
          </span>
        </div>
        <p className="font-mono text-brutal-xs text-punk-white/40 truncate">
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {p.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-brutal-xs text-punk-white/20 border border-punk-white/10 px-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onEdit(p)}
          className="font-mono text-brutal-xs text-punk-white/30 hover:text-neon-yellow border border-punk-white/10 px-2 py-1"
        >
          EDIT
        </button>
        <button
          onClick={() => onToggle(p.id, !p.visible)}
          className="text-punk-white/30 hover:text-neon-yellow"
        >
          {p.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
        <button
          onClick={() => {
            if (confirm(`Delete "${p.title}"?`)) onDelete(p.id);
          }}
          className="text-punk-white/30 hover:text-neon-red"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [filter, setFilter] = useState<
    "all" | "visible" | "hidden" | "github" | "manual"
  >("all");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const [proj, sync] = await Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/projects/github-sync")
        .then((r) => r.json())
        .catch(() => ({})),
    ]);
    setProjects(proj.projects ?? []);
    setLastSync(sync.lastSync ?? null);
    setLoading(false);
  }

  async function handleSync() {
    setSyncing(true);
    setSyncMsg(null);
    const res = await fetch("/api/projects/github-sync", { method: "POST" });
    const d = await res.json();
    setSyncMsg(res.ok ? `✓ Synced ${d.synced} repos` : `✗ ${d.error}`);
    if (res.ok) {
      await loadAll();
    }
    setSyncing(false);
  }

  async function toggle(id: string, visible: boolean) {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible }),
    });
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, visible } : p)));
  }

  async function del(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((ps) => ps.filter((p) => p.id !== id));
  }

  async function addManual(data: Partial<Project>) {
    const res = await fetch("/api/projects/manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { project } = await res.json();
      setProjects((ps) => [project, ...ps]);
      setShowForm(false);
    }
  }

  async function saveEdit(data: Partial<Project>) {
    if (!editTarget) return;
    const res = await fetch(`/api/projects/${editTarget.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { project } = await res.json();
      setProjects((ps) => ps.map((p) => (p.id === project.id ? project : p)));
      setEditTarget(null);
    }
  }

  const filtered = projects.filter((p) =>
    filter === "visible"
      ? p.visible
      : filter === "hidden"
        ? !p.visible
        : filter === "github"
          ? p.source === "github"
          : filter === "manual"
            ? p.source === "manual"
            : true,
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-brutal text-brutal-3xl text-neon-yellow">
            PROJECTS
          </h1>
          <p className="font-mono text-brutal-xs text-punk-white/30">
            {projects.filter((p) => p.visible).length}/{projects.length} visible
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <NeonButton
            onClick={() => {
              setShowForm(true);
              setEditTarget(null);
            }}
            variant="yellow"
            size="sm"
          >
            <Plus size={13} /> ADD
          </NeonButton>
          <NeonButton
            onClick={handleSync}
            variant="green"
            size="sm"
            disabled={syncing}
          >
            <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
            {syncing ? "SYNCING..." : "SYNC GITHUB"}
          </NeonButton>
        </div>
      </div>

      {/* Sync status */}
      <div className="flex gap-4 items-center flex-wrap">
        {lastSync && (
          <p className="font-mono text-brutal-xs text-punk-white/30 flex items-center gap-1">
            <Github size={11} />
            last sync: {new Date(lastSync).toLocaleString()}
          </p>
        )}
        {syncMsg && (
          <p
            className={`font-mono text-brutal-xs ${syncMsg.startsWith("✓") ? "text-neon-green" : "text-neon-red"}`}
          >
            {syncMsg}
          </p>
        )}
      </div>

      {/* Form */}
      {(showForm || editTarget) && (
        <ProjectForm
          initial={editTarget ?? undefined}
          onSave={editTarget ? saveEdit : addManual}
          onCancel={() => {
            setShowForm(false);
            setEditTarget(null);
          }}
        />
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "visible", "hidden", "github", "manual"] as const).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-brutal-xs px-3 py-1 border transition-colors ${filter === f ? "border-neon-yellow text-neon-yellow" : "border-punk-white/20 text-punk-white/30 hover:border-punk-white/40"}`}
            >
              {f.toUpperCase()} (
              {f === "all"
                ? projects.length
                : f === "visible"
                  ? projects.filter((p) => p.visible).length
                  : f === "hidden"
                    ? projects.filter((p) => !p.visible).length
                    : f === "github"
                      ? projects.filter((p) => p.source === "github").length
                      : projects.filter((p) => p.source === "manual").length}
              )
            </button>
          ),
        )}
      </div>

      {/* List */}
      {loading ? (
        <p className="font-mono text-brutal-xs text-punk-white/30 animate-pulse">
          loading...
        </p>
      ) : filtered.length === 0 ? (
        <div className="border-brutal border-punk-white/10 p-12 text-center">
          <p className="font-mono text-brutal-xs text-punk-white/20">
            // no projects. sync github or add manually.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <Row
              key={p.id}
              p={p}
              onToggle={toggle}
              onDelete={del}
              onEdit={(p) => {
                setEditTarget(p);
                setShowForm(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
