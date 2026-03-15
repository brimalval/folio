"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import projects from "@/data/projects.json";
import type { Project } from "@/types/portfolio";
import ProjectDetail from "@/app/components/project-detail";
import { GitHubLink } from "@/app/components/github-link";

const accentColors = ["var(--foam)", "var(--pine)", "var(--gold)", "var(--love)", "var(--iris)", "var(--rose)", "var(--leaf)", "var(--fire)"];

export default function ProjectsPage() {
  const typedProjects = projects as Project[];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <main className="min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-center"
            style={{ color: "var(--foreground)" }}
          >
            All Projects
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid md:grid-cols-2 gap-6"
          >
            {typedProjects.map((project, index) => {
              const accent = accentColors[index % accentColors.length];

              return (
                <motion.article
                  key={project.id}
                  data-testid={`project-card-${index}`}
                  tabIndex={0}
                  className="group p-6 cursor-pointer transition-all duration-300 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid rgba(var(--border-rgb, 128, 128, 128), 0.15)",
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  layoutId={`project-card-${project.id}`}
                  onClick={() => setSelectedId(project.id)}
                >
                  <div
                    style={{ color: accent }}
                    className="text-sm font-mono uppercase tracking-widest mb-3"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <motion.h2
                    layoutId={`project-title-${project.id}`}
                    className="text-xl md:text-2xl font-bold tracking-tight mb-3"
                    style={{ color: "var(--foreground)" }}
                  >
                    {project.title}
                  </motion.h2>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--subtle)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="pl-2 pr-3 py-0.5 text-xs font-mono border-l-2 tracking-wide"
                        style={{
                          borderColor: accent,
                          backgroundColor: "var(--overlay)",
                          color: "var(--muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className="text-xs font-mono"
                        style={{ color: "var(--muted)" }}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {project.githubUrl && (
                    <div className="mt-4">
                      <GitHubLink href={project.githubUrl} />
                    </div>
                  )}

                  <div
                    className="mt-4 flex items-center gap-2 text-xs group-hover:gap-3 transition-all duration-300"
                    style={{ color: "var(--muted)" }}
                  >
                    <span>View details</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {selectedId && (
          <ProjectDetail
            key={selectedId}
            selectedId={selectedId}
            projects={typedProjects}
            accentColors={accentColors}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
