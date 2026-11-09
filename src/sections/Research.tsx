import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeader } from '../components/Primitives';
import { interests } from '../data/profile';

/** Node positions on the constellation map (viewBox 0 0 520 520). */
const POS: Record<string, [number, number]> = {
  llm: [250, 120],
  rag: [420, 92],
  peft: [215, 285],
  cl: [92, 400],
  cv: [400, 400],
  mm: [300, 455],
  eff: [425, 245],
};

export default function Research() {
  const [active, setActive] = useState(interests[0].id);
  const current = interests.find((i) => i.id === active)!;

  // unique undirected edges
  const edges: [string, string][] = [];
  const seen = new Set<string>();
  for (const it of interests) {
    for (const l of it.links) {
      const key = [it.id, l].sort().join('|');
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([it.id, l]);
      }
    }
  }
  const isLinked = (id: string) => id === active || current.links.includes(id);

  return (
    <section id="research" className="section research" data-theme="dark" aria-labelledby="research-title">
      <div className="container">
        <SectionHeader
          id="research-title"
          index="02"
          label="Research Interests"
          title={
            <>
              A map of open <em>questions.</em>
            </>
          }
          aside={<p>Seven connected directions. Hover or focus an interest to trace its relationships.</p>}
        />

        <div className="research__grid">
          <ol className="ilist" role="list">
            {interests.map((it, i) => (
              <li key={it.id}>
                <button
                  type="button"
                  className={`ilist__item ${active === it.id ? 'is-active' : ''} ${isLinked(it.id) && active !== it.id ? 'is-linked' : ''}`}
                  onMouseEnter={() => setActive(it.id)}
                  onFocus={() => setActive(it.id)}
                  onClick={() => setActive(it.id)}
                  aria-pressed={active === it.id}
                >
                  <span className="ilist__n mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ilist__label">{it.label}</span>
                  <span className="ilist__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="cmap">
            <svg viewBox="0 0 520 520" className="cmap__svg" aria-hidden="true">
              {/* polar guides */}
              {[80, 160, 240].map((r) => (
                <circle key={r} cx="260" cy="270" r={r} fill="none" stroke="currentColor" strokeOpacity="0.08" />
              ))}
              <line x1="20" y1="270" x2="500" y2="270" stroke="currentColor" strokeOpacity="0.06" />
              <line x1="260" y1="20" x2="260" y2="510" stroke="currentColor" strokeOpacity="0.06" />

              {edges.map(([a, b]) => {
                const on = (a === active || b === active) && isLinked(a) && isLinked(b);
                const [x1, y1] = POS[a];
                const [x2, y2] = POS[b];
                return (
                  <line
                    key={a + b}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={`cmap__edge ${on ? 'is-on' : ''}`}
                  />
                );
              })}

              {interests.map((it, i) => {
                const [x, y] = POS[it.id];
                const on = it.id === active;
                const linked = isLinked(it.id);
                return (
                  <g
                    key={it.id}
                    className={`cmap__node ${on ? 'is-active' : ''} ${linked ? 'is-linked' : ''}`}
                    transform={`translate(${x}, ${y})`}
                    onMouseEnter={() => setActive(it.id)}
                  >
                    <circle r="26" className="cmap__halo" />
                    <circle r={on ? 9 : 5} className="cmap__dot" />
                    <text y="-18" textAnchor="middle" className="cmap__label">
                      {String(i + 1).padStart(2, '0')} · {it.short}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="cmap__detail" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="cmap__desc">{current.description}</p>
                  <p className="cmap__related mono">
                    <span>Related work</span>
                    {current.related.map((r) => (
                      <span key={r} className="tag tag--line">
                        {r}
                      </span>
                    ))}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="research__statement">
          Efficient foundation models, multimodal AI, continual learning, and intelligent retrieval systems.
        </p>
      </div>
    </section>
  );
}
