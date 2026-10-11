"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/types/portfolio";
import ProjectDetail, { TechChips } from "@/app/components/project-detail";
import { ProjectCardShell } from "@/app/components/projects";
import { GitHubLink } from "@/app/components/github-link";

const accentColors = ["var(--foam)", "var(--pine)", "var(--gold)", "var(--love)", "var(--iris)", "var(--rose)"];
const CARD_TECH_LIMIT = 4;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  const typedProjects = projects as Project[];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <main className="min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/#projects"
              className="-ml-1 px-1 min-h-11 inline-flex items-center gap-2 text-sm rounded transition-colors text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Link>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-center"
            style={{ color: "var(--foreground)" }}
          >
            All Projects
          </motion.h1>

          {typedProjects.length === 0 ? (
            <p className="text-center" style={{ color: "var(--subtle)" }}>
              No projects to show yet.
            </p>
          ) : (
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
                  <ProjectCardShell
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={setSelectedId}
                    className="p-6 rounded-xl min-w-0 flex flex-col"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid rgba(var(--border-rgb, 128, 128, 128), 0.15)",
                    }}
                    variants={cardVariants}
                    detailsClassName="text-xs mt-auto self-start"
                  >
                    {(titleId) => (
                      <div className="mb-3">
                        <div
                          style={{ color: accent }}
                          className="text-sm font-mono uppercase tracking-widest mb-3"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <motion.h2
                          id={titleId}
                          layoutId={`project-title-${project.id}`}
                          className="text-xl md:text-2xl font-bold tracking-tight text-balance break-words mb-3"
                          style={{ color: "var(--foreground)" }}
                        >
                          {project.title}
                        </motion.h2>

                        <p
                          className="text-sm leading-relaxed break-words mb-4"
                          style={{ color: "var(--subtle)" }}
                        >
                          {project.description}
                        </p>

                        <TechChips
                          technologies={project.technologies}
                          accent={accent}
                          background="var(--overlay)"
                          limit={CARD_TECH_LIMIT}
                        />

                        {project.githubUrl && (
                          <div className="mt-4">
                            <GitHubLink href={project.githubUrl} />
                          </div>
                        )}
                      </div>
                    )}
                  </ProjectCardShell>
                );
              })}
            </motion.div>
          )}
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
