"use client";

import { motion } from "motion/react";
import { MapPin, CheckCircle2 } from "lucide-react";
import profile from "@/data/profile.json";
import { aboutVariants, viewportConfig } from "@/lib/animations/variants";

export default function About() {
  return (
    <section className="section-about py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            className="relative"
            variants={aboutVariants.photo}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <img
                src={profile.fullPhoto}
                alt="Brian Valencia at Glico Running Man, Osaka"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "4/5" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(40, 105, 131, 0.2) 0%, transparent 50%)",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={aboutVariants.textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-6"
          >
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--foam)" }}
            >
              About
            </span>

            <motion.h2
              variants={aboutVariants.heading}
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              I build things that work.
            </motion.h2>

            <motion.p
              variants={aboutVariants.paragraph}
              className="text-base leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              {profile.about.body}
            </motion.p>

            <div className="space-y-3 pt-2">
              {profile.about.statements.map((statement, index) => (
                <motion.p
                  key={index}
                  variants={aboutVariants.paragraph}
                  className="pl-4 border-l-2 italic text-base"
                  style={{
                    borderColor: "var(--foam)",
                    color: "var(--foreground)",
                  }}
                >
                  {statement}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={aboutVariants.tag}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <MapPin size={18} style={{ color: "var(--foam)" }} />
                <span
                  className="text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {profile.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: "var(--foam)" }} />
                <span
                  className="text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  Open to opportunities
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={aboutVariants.tag}
              className="flex flex-wrap gap-4 pt-2"
            >
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--subtle)" }}
                >
                  {interest}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
