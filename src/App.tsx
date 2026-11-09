import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Research from './sections/Research';
import Publications from './sections/Publications';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Research />
        <Publications />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
