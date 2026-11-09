import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';
import { Availability } from '../components/Primitives';
import { interests, profile } from '../data/profile';
import Manifold from '../visuals/Manifold';

function SplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="hero__line" aria-hidden="true">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero__char"
          initial={{ y: '108%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const links = [
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  { href: '#coursework', label: 'Click to see grades' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section id="top" ref={ref} className="hero" data-theme="dark" aria-labelledby="hero-title">
      <motion.div className="hero__canvas" style={{ y: canvasY }}>
        <Manifold />
      </motion.div>

      <div className="container hero__inner">
        <motion.div
          className="hero__meta mono"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span>Portfolio — Index</span>
          <span className="hide-sm">Research × Engineering</span>
          <span className="hide-sm">{profile.location}</span>
        </motion.div>

        <motion.h1 id="hero-title" className="hero__name" style={{ y: nameY }}>
          <span className="sr-only">
            {profile.name} — {profile.shortTitle}
          </span>
          <SplitWord text={profile.firstName.toUpperCase()} delay={0.1} />
          <span className="surname">
            <SplitWord text={profile.lastName.toUpperCase()} delay={0.3} />
          </span>
        </motion.h1>

        <motion.div
          className="hero__columns"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          <div className="hero__col--left">
            <p className="hero__role">
              <span className="hero__slash">AI Engineer</span>
              <span className="hero__slash-sep" aria-hidden="true">·</span>
              <span>Deep Learning Researcher</span>
            </p>

            <p className="hero__tagline">
              Exploring the <em>boundaries</em> of intelligent systems.
            </p>
          </div>

          <div className="hero__col--right">
            <p className="hero__description">
              I am an AI Engineer and Deep Learning Researcher focused on developing efficient, adaptable, and
              intelligent systems. My research interests span Large Language Models, Agentic AI,
              Retrieval-Augmented Generation, Parameter-Efficient Fine-Tuning, Computer Vision, and continual
              learning. I am particularly interested in bridging fundamental research and practical engineering
              to build AI systems that are both capable and efficient.
            </p>

            <ul className="hero__links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hero__link">
                    <span>{l.label}</span>
                    <ArrowDownRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="hero__availability">
              <Availability label={profile.availability} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <div className="marquee__group" key={k}>
              {interests.map((it) => (
                <span key={it.id + k} className="marquee__item">
                  {it.label}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
