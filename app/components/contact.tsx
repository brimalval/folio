'use client'

import { motion } from 'motion/react'
import { Mail, Github, Linkedin } from 'lucide-react'
import profile from '@/data/profile.json'
import socials from '@/data/socials.json'
import { contactVariants, viewportConfig } from '@/lib/animations/variants'

export default function Contact() {
  return (
    <section
      data-testid="contact-section"
      className="section-contact px-6 py-24 md:py-32 text-center"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={contactVariants.container}
      >
        <motion.div variants={contactVariants.content}>
          <hr
            style={{ borderColor: 'var(--foam)', opacity: 0.3 }}
            className="w-12 mb-8 mx-auto"
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            Let&apos;s talk.
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: 'var(--subtle)' }}
          >
            I&apos;m open to full-time roles, contract work, and the occasional interesting side project. If what you&apos;re building needs someone who cares about both the craft and the outcome — drop me a line.
          </p>
        </motion.div>

        <motion.div
          className="mt-10"
          variants={contactVariants.cta}
        >
          <a
            href={`mailto:${profile.email}`}
            data-testid="email-link"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: 'var(--foam)', color: 'var(--base)' }}
          >
            <Mail className="w-4 h-4" />
            {profile.email}
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-6"
          variants={contactVariants.links}
        >
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              data-testid={`social-link-${social.platform}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label={social.displayName}
              style={{ color: social.platform === 'github' ? 'var(--pine)' : 'var(--rose)' }}
            >
              {social.platform === 'github' && <Github className="w-4 h-4" />}
              {social.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
              {social.displayName}
            </a>
          ))}
        </motion.div>

        {profile.resumeUrl && profile.resumeUrl !== '/' && (
          <motion.div
            className="mt-6"
            variants={contactVariants.links}
          >
            <a
              href={profile.resumeUrl}
              data-testid="resume-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] hover:text-[var(--subtle)] underline underline-offset-4 transition-colors duration-200"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
