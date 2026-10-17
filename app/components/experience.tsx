"use client";

import { motion } from "motion/react";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import { experienceVariants, viewportConfig } from "@/lib/animations/variants";
import type { Experience, Education } from "@/types/portfolio";

const companyAccents: Record<string, string> = {
  "Focus Global Inc.": "var(--foam)",
  "Netzwelt Inc.": "var(--pine-text)",
  education: "var(--gold)",
};

function TimelineDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="absolute left-0 top-[1.4rem] h-[11px] w-[11px] rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: "0 0 0 4px var(--section-bg-color, var(--background))",
      }}
    />
  );
}

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

        <div className="relative space-y-8">
          <span
            aria-hidden
            className="absolute left-[5px] top-7 bottom-7 w-px"
            style={{ backgroundColor: "rgba(var(--border-rgb), 0.12)" }}
          />
          {typedExperience.map((item, index) => {
            const accentColor = companyAccents[item.company] ?? "var(--iris)";

            return (
              <motion.div
                key={item.id}
                data-testid={`experience-item-${index}`}
                variants={experienceVariants.item}
                className="relative grid md:grid-cols-[1fr_3fr] gap-x-6 gap-y-3 pl-8 py-4"
              >
                <TimelineDot color={accentColor} />
                <div className="flex flex-col gap-1">
                  <p
                    className="text-sm font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    <span className="whitespace-nowrap">{item.startDate} —</span>{" "}
                    <span className="whitespace-nowrap">{item.endDate ?? "Present"}</span>
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
                    {item.description}
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
            className="relative grid md:grid-cols-[1fr_3fr] gap-x-6 gap-y-3 pl-8 py-4"
          >
            <TimelineDot color={companyAccents.education} />
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
                {typedEducation.highlights?.join(" · ") ??
                  typedEducation.description}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
