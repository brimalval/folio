import Navigation from "./components/navigation";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Experience from "./components/experience";
import Contact from "./components/contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
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
    </>
  );
}
