"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import projects from "@/data/projects.json";
import { projectVariants, viewportConfig } from "@/lib/animations/variants";
import type { Project } from "@/types/portfolio";
import ProjectDetail from "./project-detail";
import StickySectionHeader from "./sticky-section-header";

export default function Projects() {
  const typedProjects = projects as Project[];
  const accentColors = ["var(--foam)", "var(--pine)", "var(--gold)"];
  const categoryLabels = [
    "Enterprise Platform",
    "HR Automation",
    "AI Assistant",
  ];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <section
        data-testid="projects-section"
        id="projects"
        className="section-projects px-6"
      >
        {/* <StickySectionHeader sectionId="projects" title="Selected Work" /> */}
        <div className="pt-20 pb-20 md:pb-28 max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-center"
            style={{ color: "var(--foreground)" }}
            variants={projectVariants.heading}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            Selected Work
          </motion.h2>

          <motion.div
            data-testid="projects-section"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={projectVariants.container}
          >
            {typedProjects.slice(0, 3).map((project, index) => {
              const accent = accentColors[index];
              const categoryLabel = categoryLabels[index];
              const projectNumber = String(index + 1).padStart(2, "0");

              if (index === 0) {
                return (
                  <motion.article
                    key={project.id}
                    data-testid={`project-card-${index}`}
                    tabIndex={0}
                    className="group py-12 px-6 md:px-8 cursor-pointer transition-all duration-300 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    style={{
                      borderColor:
                        "rgba(var(--border-rgb, 128, 128, 128), 0.15)",
                    }}
                    variants={projectVariants.cardLeft}
                    layoutId={`project-card-${project.id}`}
                    onClick={() => setSelectedId(project.id)}
                  >
                    <div className="grid md:grid-cols-[3fr_1fr] gap-8 items-start">
                      <div>
                        <div
                          style={{ color: accent }}
                          className="text-sm font-mono uppercase tracking-widest mb-3"
                        >
                          {projectNumber} · {categoryLabel}
                        </div>
                        <motion.h3
                          layoutId={`project-title-${project.id}`}
                          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                          style={{ color: "var(--foreground)" }}
                        >
                          {project.title}
                        </motion.h3>
                        <p
                          className="text-base leading-relaxed mb-6"
                          style={{ color: "var(--subtle)" }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="pl-2 pr-3 py-0.5 text-xs font-mono border-l-2 tracking-wide"
                              style={{
                                borderColor: accent,
                                backgroundColor: "var(--surface)",
                                color: "var(--muted)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="flex flex-col gap-4">
                            {project.metrics.map((metric, i) => (
                              <MetricBlock
                                key={i}
                                value={metric.value}
                                label={metric.label}
                                accent={accent}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <ExpandAffordance />
                  </motion.article>
                );
              }

              if (index === 1) {
                return (
                  <motion.article
                    key={project.id}
                    data-testid={`project-card-${index}`}
                    tabIndex={0}
                    className="group py-12 px-6 md:px-8 cursor-pointer transition-all duration-300 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    style={{
                      borderColor:
                        "rgba(var(--border-rgb, 128, 128, 128), 0.15)",
                    }}
                    variants={projectVariants.cardRight}
                    layoutId={`project-card-${project.id}`}
                    onClick={() => setSelectedId(project.id)}
                  >
                    <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                      <div>
                        <div
                          style={{ color: accent }}
                          className="text-sm font-mono uppercase tracking-widest mb-6"
                        >
                          {projectNumber} · {categoryLabel}
                        </div>
                        {project.highlights &&
                          project.highlights.length > 0 && (
                            <ul className="space-y-3">
                              {project.highlights
                                .slice(0, 4)
                                .map((highlight, i) => (
                                  <li
                                    key={i}
                                    className="text-sm flex items-start gap-2"
                                    style={{ color: "var(--subtle)" }}
                                  >
                                    <span style={{ color: accent }}>—</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                            </ul>
                          )}
                      </div>
                      <div>
                        <motion.h3
                          layoutId={`project-title-${project.id}`}
                          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                          style={{ color: "var(--foreground)" }}
                        >
                          {project.title}
                        </motion.h3>
                        <p
                          className="text-base leading-relaxed mb-6"
                          style={{ color: "var(--subtle)" }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="pl-2 pr-3 py-0.5 text-xs font-mono border-l-2 tracking-wide"
                              style={{
                                borderColor: accent,
                                backgroundColor: "var(--surface)",
                                color: "var(--muted)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ExpandAffordance />
                  </motion.article>
                );
              }

              return (
                <motion.article
                  key={project.id}
                  data-testid={`project-card-${index}`}
                  tabIndex={0}
                  className="group py-12 px-6 md:px-8 cursor-pointer transition-all duration-300 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  style={{
                    borderColor: "rgba(var(--border-rgb, 128, 128, 128), 0.15)",
                  }}
                  variants={projectVariants.cardLeft}
                  layoutId={`project-card-${project.id}`}
                  onClick={() => setSelectedId(project.id)}
                >
                  <div className="mb-6">
                    <div
                      style={{ color: accent }}
                      className="text-sm font-mono uppercase tracking-widest mb-3"
                    >
                      {projectNumber} · {categoryLabel}
                    </div>
                    <motion.h3
                      layoutId={`project-title-${project.id}`}
                      className="text-4xl md:text-5xl font-bold tracking-tight"
                      style={{ color: "var(--foreground)" }}
                    >
                      {project.title}
                    </motion.h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {project.metrics.map((metric, i) => (
                            <MetricBlock
                              key={i}
                              value={metric.value}
                              label={metric.label}
                              accent={accent}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p
                        className="text-base leading-relaxed mb-6"
                        style={{ color: "var(--subtle)" }}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="pl-2 pr-3 py-0.5 text-xs font-mono border-l-2 tracking-wide"
                            style={{
                              borderColor: accent,
                              backgroundColor: "var(--surface)",
                              color: "var(--muted)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ExpandAffordance />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>
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

function MetricBlock({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col">
      <span
        className="text-2xl md:text-3xl font-bold tabular-nums"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span
        className="text-xs uppercase tracking-wider"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ExpandAffordance() {
  return (
    <div
      className="mt-6 flex items-center gap-2 text-sm group-hover:gap-3 transition-all duration-300"
      style={{ color: "var(--muted)" }}
    >
      <span>View full case study</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </div>
  );
}
