"use client";

import { useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import projects from "@/data/projects.json";
import { projectVariants, viewportConfig } from "@/lib/animations/variants";
import type { Project } from "@/types/portfolio";
import ProjectDetail, { HighlightList, TechChips } from "./project-detail";
import { GitHubLink } from "./github-link";

const accentColors = ["var(--foam)", "var(--pine)", "var(--gold)", "var(--love)"];
const HOME_TECH_LIMIT = 6;
const HOME_HIGHLIGHT_LIMIT = 4;

// Each card watches its own entry. A single whileInView on the whole list never
// reached its 20% threshold on tall mobile layouts, so the cards stayed hidden.
const cardViewport = { once: true, amount: 0.15 } as const;

export default function Projects() {
  const typedProjects = projects as Project[];
  const featuredProjects = typedProjects.filter((p) => p.featured === true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (featuredProjects.length === 0) return null;

  return (
    <>
      <section
        data-testid="projects-section"
        id="projects"
        className="section-projects px-6 overflow-x-clip"
      >
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

          <div data-testid="projects-section">
            {featuredProjects.map((project, index) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={index}
                accent={accentColors[index % accentColors.length]}
                onOpen={setSelectedId}
              />
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {selectedId && (
          <ProjectDetail
            key={selectedId}
            selectedId={selectedId}
            projects={featuredProjects}
            accentColors={accentColors}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface FeaturedCardProps {
  project: Project;
  index: number;
  accent: string;
  onOpen: (id: string) => void;
}

function FeaturedCard({ project, index, accent, onOpen }: FeaturedCardProps) {
  const eyebrow = (
    <CardEyebrow index={index} category={project.category} accent={accent} />
  );
  const summary = (
    <>
      <CardDescription>{project.description}</CardDescription>
      <TechChips
        technologies={project.technologies}
        accent={accent}
        limit={HOME_TECH_LIMIT}
      />
      <CardGitHubLink href={project.githubUrl} />
    </>
  );
  const metrics = project.metrics ?? [];

  return (
    <ProjectCardShell
      project={project}
      index={index}
      onOpen={onOpen}
      className="py-12 px-6 md:px-8 border-b"
      style={{ borderColor: "rgba(var(--border-rgb, 128, 128, 128), 0.15)" }}
      variants={index === 1 ? projectVariants.cardRight : projectVariants.cardLeft}
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
    >
      {(titleId) => {
        const title = (
          <CardTitle
            id={titleId}
            projectId={project.id}
            className={index >= 2 ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl mb-4"}
          >
            {project.title}
          </CardTitle>
        );

        if (index === 0) {
          return (
            <div className="grid md:grid-cols-[3fr_1fr] gap-8 items-start">
              <div className="min-w-0">
                {eyebrow}
                {title}
                {summary}
              </div>
              {metrics.length > 0 && (
                <div className="flex flex-col gap-4 min-w-0">
                  {metrics.map((metric, i) => (
                    <MetricBlock key={i} {...metric} accent={accent} />
                  ))}
                </div>
              )}
            </div>
          );
        }

        if (index === 1) {
          return (
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              <div className="min-w-0">
                {eyebrow}
                {project.highlights && project.highlights.length > 0 && (
                  <HighlightList
                    highlights={project.highlights.slice(0, HOME_HIGHLIGHT_LIMIT)}
                    accent={accent}
                    className="space-y-3 mt-3"
                  />
                )}
              </div>
              <div className="min-w-0">
                {title}
                {summary}
              </div>
            </div>
          );
        }

        return (
          <>
            <div className="mb-6">
              {eyebrow}
              {title}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="min-w-0">
                {metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {metrics.map((metric, i) => (
                      <MetricBlock key={i} {...metric} accent={accent} />
                    ))}
                  </div>
                )}
              </div>
              <div className="min-w-0">{summary}</div>
            </div>
          </>
        );
      }}
    </ProjectCardShell>
  );
}

interface ProjectCardShellProps {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
  className?: string;
  style?: CSSProperties;
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  viewport?: { once?: boolean; amount?: number | "some" | "all"; margin?: string };
  detailsClassName?: string;
  children: (titleId: string) => ReactNode;
}

/**
 * Clickable project card. The whole card opens the detail dialog on click; a
 * real <button> carries keyboard activation and semantics so the card itself
 * never has to pretend to be a button (it contains links).
 */
export function ProjectCardShell({
  project,
  index,
  onOpen,
  className = "",
  style,
  variants,
  initial,
  whileInView,
  viewport,
  detailsClassName = "text-sm mt-3",
  children,
}: ProjectCardShellProps) {
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = () => {
    // Focus the trigger first so the dialog can return focus here on close.
    triggerRef.current?.focus({ preventScroll: true });
    onOpen(project.id);
  };

  return (
    <motion.article
      data-testid={`project-card-${index}`}
      aria-labelledby={titleId}
      className={`group cursor-pointer transition-shadow duration-300 motion-reduce:transition-none has-[[data-card-trigger]:focus-visible]:ring-2 has-[[data-card-trigger]:focus-visible]:ring-[var(--iris)] has-[[data-card-trigger]:focus-visible]:ring-offset-2 has-[[data-card-trigger]:focus-visible]:ring-offset-[var(--background)] ${className}`}
      style={style}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      layoutId={`project-card-${project.id}`}
      onClick={open}
    >
      {children(titleId)}
      <button
        ref={triggerRef}
        type="button"
        data-card-trigger
        aria-haspopup="dialog"
        aria-label={`View details: ${project.title}`}
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className={`-ml-1 px-1 min-h-11 inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group-hover:gap-3 text-[var(--muted)] group-hover:text-[var(--foreground)] focus-visible:outline-none ${detailsClassName}`}
      >
        <span>View details</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </motion.article>
  );
}

function CardEyebrow({
  index,
  category,
  accent,
}: {
  index: number;
  category?: string;
  accent: string;
}) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{ color: accent }}
      className="text-sm font-mono uppercase tracking-widest mb-3 break-words"
    >
      {projectNumber}
      {category ? ` · ${category}` : null}
    </div>
  );
}

function CardTitle({
  id,
  projectId,
  className,
  children,
}: {
  id: string;
  projectId: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <motion.h3
      id={id}
      layoutId={`project-title-${projectId}`}
      className={`font-bold tracking-tight text-balance break-words ${className}`}
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </motion.h3>
  );
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-base leading-relaxed max-w-prose break-words mb-6"
      style={{ color: "var(--subtle)" }}
    >
      {children}
    </p>
  );
}

function CardGitHubLink({ href }: { href?: string }) {
  if (!href) return null;

  return (
    <div className="mt-4">
      <GitHubLink href={href} />
    </div>
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
    <div className="flex flex-col min-w-0">
      <span
        className="text-xl sm:text-2xl md:text-3xl font-bold tabular-nums whitespace-nowrap"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span
        className="text-xs uppercase tracking-wider break-words"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
    </div>
  );
}
