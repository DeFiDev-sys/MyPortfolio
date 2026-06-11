import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import { profile } from './data/portfolio';

function App(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <div className="grid-lines">
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center">
        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js
          &amp; Tailwind CSS.
        </p>
      </footer>
    </>
  );
}

export default App;
