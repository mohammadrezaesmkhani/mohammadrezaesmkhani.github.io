import { AnimatePresence, motion } from 'framer-motion';
import { useState, type PointerEvent } from 'react';
import { SectionHeader, SmartLink } from '../components/Primitives';
import { projects, type Project } from '../data/profile';
import ProjectVisual from '../visuals/ProjectVisuals';

const FILTERS = ['All', 'Research', 'Engineering'] as const;
type Filter = (typeof FILTERS)[number];

/** Asymmetric editorial rhythm: 7/5, 5/7 … a lone last card spans full width. */
function spanFor(index: number, total: number) {
  if (index === total - 1 && index % 2 === 0) return 12;
  return [7, 5, 5, 7][index % 4];
}

function ProjectCard({ p, span }: { p: Project; span: number }) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      layout
      id={`project-${p.id}`}
      className={`pcard pcard--${p.visual} span-${span}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      aria-labelledby={`pt-${p.id}`}
      tabIndex={-1}
    >
      <div className="pcard__top">
        <span className="pcard__index mono">P—{p.index}</span>
        <span className="pcard__status mono">
          <i aria-hidden="true" />
          {p.status}
        </span>
      </div>

      <div className="pcard__visual">
        <ProjectVisual kind={p.visual} />
      </div>

      <div className="pcard__body">
        <div className="pcard__heading">
          <p className="pcard__kind mono">{p.kind}</p>
          <h3 id={`pt-${p.id}`} className="pcard__title">
            {p.title}
          </h3>
          <p className="pcard__sub">{p.subtitle}</p>
        </div>
        <div className="pcard__content">
          <p className="pcard__summary">{p.summary}</p>
          <ul className="pcard__points">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pcard__foot">
        <ul className="pcard__stack" aria-label="Technologies">
          {p.stack.map((s) => (
            <li key={s} className="tag tag--line">
              {s}
            </li>
          ))}
        </ul>
        <div className="pcard__links">
          {p.links.paper && <SmartLink href={p.links.paper} label="Paper" />}
          <SmartLink href={p.links.github} label="Code" />
          {p.links.demo && <SmartLink href={p.links.demo} label="Demo" />}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const list = projects.filter((p) => filter === 'All' || p.kind === filter);

  return (
    <section id="projects" className="section projects" data-theme="dark" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          index="04"
          label="Selected Projects"
          title={
            <>
              Research &amp; <em>engineering</em> work.
            </>
          }
          aside={
            <div className="filters" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => {
                const count = f === 'All' ? projects.length : projects.filter((p) => p.kind === f).length;
                return (
                  <button
                    key={f}
                    type="button"
                    className={`filters__btn ${filter === f ? 'is-active' : ''}`}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {filter === f && <motion.span layoutId="filter-pill" className="filters__pill" />}
                    <span className="filters__label">{f}</span>
                    <sup>{String(count).padStart(2, '0')}</sup>
                  </button>
                );
              })}
            </div>
          }
        />

        <motion.div layout className="pgrid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectCard key={p.id} p={p} span={spanFor(i, list.length)} />
            ))}
          </AnimatePresence>
        </motion.div>


      </div>
    </section>
  );
}
