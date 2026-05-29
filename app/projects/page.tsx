"use client";

import { useState, useMemo, useEffect } from "react";
import GlitchText from "@/components/GlitchText";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectCard from "@/components/ProjectCard";
import PageTransition from "@/components/PageTransition";
import NeonButton from "@/components/NeonButton";
import type { Project } from "@/lib/projects";
import { Settings } from "lucide-react";

function toCardShape(p: Project) {
  return {
    _id: p.id,
    title: p.title,
    slug: { current: p.id },
    description: p.description,
    longDescription: p.longDescription,
    category: p.category,
    tags: p.tags,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    featured: p.featured,
    year: p.year,
    status: p.status,
    order: p.order,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
  };
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });

    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(!!d.isAdmin))
      .catch(() => {});
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-punk-black text-punk-white flex items-center justify-center">
          <p className="font-mono text-brutal-xl text-neon-yellow animate-pulse">
            loading projects...
          </p>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-punk-black text-punk-white flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <p className="font-mono text-brutal-2xl text-neon-red mb-4">
              error loading projects
            </p>
            <p className="font-mono text-brutal-sm text-punk-white/70">
              {error}
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-punk-black text-punk-white relative overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 py-20 relative z-20">
          <section className="mb-16 text-center">
            <GlitchText
              as="h1"
              className="text-brutal-5xl md:text-brutal-6xl lg:text-brutal-7xl font-brutal mb-6"
              intensity="medium"
            >
              PROJECTS
            </GlitchText>
            <p className="text-brutal-base md:text-brutal-lg font-mono text-punk-white/70 max-w-3xl mx-auto mb-4 px-4">
              things i've built. from web apps to experiments
            </p>
            <div className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/50">
              <span className="text-neon-yellow">
                {filteredProjects.length}
              </span>{" "}
              projects found
            </div>
            {isAdmin && (
              <div className="mt-6">
                <NeonButton href="/projects/manage" variant="yellow" size="sm">
                  <Settings size={14} /> MANAGE PROJECTS
                </NeonButton>
              </div>
            )}
          </section>

          <section className="mb-12">
            <ProjectFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </section>

          <section>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={toCardShape(project) as never}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-brutal-3xl font-brutal text-punk-white/30 mb-4">
                  NO PROJECTS YET
                </p>
                {isAdmin ? (
                  <NeonButton
                    href="/projects/manage"
                    variant="yellow"
                    size="sm"
                  >
                    <Settings size={14} /> MANAGE PROJECTS
                  </NeonButton>
                ) : (
                  <p className="font-mono text-brutal-sm text-punk-white/50">
                    check back soon
                  </p>
                )}
              </div>
            )}
          </section>

          <section className="mt-20 border-t-brutal border-punk-white pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-brutal-3xl md:text-brutal-4xl font-brutal text-neon-yellow mb-2">
                  {projects.length}
                </p>
                <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                  total projects
                </p>
              </div>
              <div className="text-center">
                <p className="text-brutal-3xl md:text-brutal-4xl font-brutal text-neon-green mb-2">
                  {projects.filter((p) => p.status === "completed").length}
                </p>
                <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                  completed
                </p>
              </div>
              <div className="text-center">
                <p className="text-brutal-3xl md:text-brutal-4xl font-brutal text-neon-pink mb-2">
                  {projects.filter((p) => p.status === "in-progress").length}
                </p>
                <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                  in progress
                </p>
              </div>
              <div className="text-center">
                <p className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk-white mb-2">
                  {new Date().getFullYear()}
                </p>
                <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                  current year
                </p>
              </div>
            </div>
          </section>

          <section className="mt-20 text-center border-brutal bg-punk-gray-100 border-neon-yellow p-8 md:p-12">
            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal mb-4">
              GOT A PROJECT IDEA?
            </h2>
            <p className="font-mono text-brutal-sm md:text-brutal-lg text-punk-white/70 mb-8 max-w-2xl mx-auto px-4">
              let's build something together
            </p>
            <NeonButton
              href="/contact"
              variant="yellow"
              size="lg"
              className="w-full sm:w-auto"
            >
              START A PROJECT
            </NeonButton>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
