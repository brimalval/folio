import Navigation from "./components/navigation";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Experience from "./components/experience";
import Contact from "./components/contact";
import ReactLenis from "lenis/react";
import { MotionConfig } from "motion/react";
import { LenisProvider } from "@/lib/contexts/lenis-context";
import SectionBgManager from "./components/section-bg-manager";
import profile from "@/data/profile.json";

export default function Home() {
  return (
    <ReactLenis root options={{ allowNestedScroll: true }}>
      <LenisProvider>
        <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-3 focus:rounded-lg focus:text-sm focus:font-medium focus:bg-[var(--foam)] focus:text-[var(--base)]"
        >
          Skip to content
        </a>
        <SectionBgManager />
        <Navigation />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <div id="hero">
            <Hero />
          </div>
          <div id="about" className="section-about">
            <About />
          </div>
          <Projects />
          <Skills />
          <Experience />
          <div id="contact">
            <Contact />
          </div>
        </main>
        <footer className="px-6 py-10 text-center text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} {profile.name}
        </footer>
        </MotionConfig>
      </LenisProvider>
    </ReactLenis>
  );
}
