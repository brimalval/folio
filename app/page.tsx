import Navigation from "./components/navigation";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Experience from "./components/experience";
import Education from "./components/education";
import Contact from "./components/contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
    </>
  );
}
