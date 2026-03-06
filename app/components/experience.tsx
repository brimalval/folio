"use client";

import { motion } from "motion/react";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import { experienceVariants, viewportConfig } from "@/lib/animations/variants";
import type { Experience, Education } from "@/types/portfolio";

const companyAccents: Record<string, string> = {
  "Focus Global Inc.": "var(--foam)",
  "Netzwelt Inc.": "var(--pine)",
  education: "var(--gold)",
};

const rewrittenDescriptions: Record<string, string> = {
  "focus-global-3":
    "Led frontend and backend development of OMNI Platform: an enterprise suite managing 25+ brands across 3 SE Asian markets. Shipped new e-commerce workflows, supply chain tooling, and promotional automation systems used daily by operations teams. Built using Next.js and Hono.js. Improved a legacy C#/jQuery system by introducing automations to regular processes and modernizing the stack (Next.js).",
  "focus-global-2":
    "Expanded platform capabilities with new order management modules and cross-border inventory features. Contributed to architecture decisions that reduced deployment complexity and improved team velocity. Built an AI-powered platform that streamlined the daily work of the customer success team.",
  "focus-global":
    "Built initial production-ready modules for the OMNI platform (in Python), a unified backend for 10+ in-house e-commerce platforms. Shipped real features alongside senior engineers while ramping on enterprise-scale full-stack development.",
  "netzwelt-internship":
    "2-month internship. Was put through the wringer, exploring the process of developing a production-ready full-stack application using C# with .NET MVC.",
};

export default function ExperienceSection() {
  const typedExperience = experience as Experience[];
  const typedEducation = (education as Education[])[0];

  return (
    <section
      data-testid="experience-section"
      id="experience"
      className="section-experience px-6 py-20 md:py-28"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={experienceVariants.container}
      >
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16"
          style={{ color: "var(--foreground)" }}
          variants={experienceVariants.heading}
        >
          Where I&apos;ve Worked
        </motion.h2>

        <div className="space-y-8">
          {typedExperience.map((item, index) => {
            const accentColor = companyAccents[item.company] ?? "var(--iris)";
            const description =
              rewrittenDescriptions[item.id] ?? item.description;

            return (
              <motion.div
                key={item.id}
                data-testid={`experience-item-${index}`}
                variants={experienceVariants.item}
                className="grid md:grid-cols-[1fr_3fr] gap-6 border-l-4 pl-6 py-4"
                style={{ borderLeftColor: accentColor }}
              >
                <div className="flex flex-col gap-1">
                  <p
                    className="text-sm font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.startDate} — {item.endDate ?? "Present"}
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: accentColor }}
                  >
                    {item.company}
                  </p>
                  {item.location && (
                    <p className="text-xs" style={{ color: "var(--subtle)" }}>
                      {item.location}
                    </p>
                  )}
                </div>

                <div>
                  <h3
                    className="text-lg md:text-xl font-semibold mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.position}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--subtle)" }}
                  >
                    {description}
                  </p>

                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-1.5 py-0.5 rounded"
                          style={{
                            color: "var(--muted)",
                            border: "1px solid var(--subtle)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          <motion.div
            data-testid="experience-item-4"
            variants={experienceVariants.item}
            className="grid md:grid-cols-[1fr_3fr] gap-6 border-l-4 pl-6 py-4"
            style={{ borderLeftColor: companyAccents.education }}
          >
            <div className="flex flex-col gap-1">
              <p
                className="text-sm font-mono"
                style={{ color: "var(--muted)" }}
              >
                Education
              </p>
              <p
                className="text-base font-semibold"
                style={{ color: companyAccents.education }}
              >
                {typedEducation.institution}
              </p>
              <p className="text-xs" style={{ color: "var(--subtle)" }}>
                {typedEducation.location}
              </p>
            </div>

            <div>
              <h3
                className="text-lg md:text-xl font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {typedEducation.degree}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--subtle)" }}
              >
                BS Computer Science — Technological Institute of the Philippines
                · Magna Cum Laude
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
