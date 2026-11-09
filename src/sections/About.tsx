import Portrait from '../components/Portrait';
import { Reveal, SectionHeader, SmartLink } from '../components/Primitives';
import { profile } from '../data/profile';

const pillars = [
  {
    n: '01',
    title: 'Technical depth',
    text: 'Opening up models to understand how they work — from tokenizers and attention layers to adapters and quantized weights.',
  },
  {
    n: '02',
    title: 'Creative experimentation',
    text: 'Designing new adaptation strategies and testing unconventional ideas, with honest evaluation as the guide.',
  },
  {
    n: '03',
    title: 'Research × engineering',
    text: 'A first-author publication alongside industry systems in speech, retrieval and generative AI.',
  },
];

const facts = [
  { k: 'Focus', v: 'LLMs · RAG · PEFT · Vision' },
  { k: 'Currently', v: 'M.Sc. in AI — thesis defense pending' },
  { k: 'Seeking', v: 'PhD positions & research collaborations' },
];

export default function About() {
  return (
    <section id="about" className="section about" data-theme="light" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              Curious about <em>how</em> models think — and how to make them better.
            </>
          }
        />

        {/* ── Academic Snapshot ── */}
        <Reveal>
          <div className="academic-snapshot">
            <div className="snapshot__row snapshot__row--edu">
              <div className="snapshot__item">
                <span className="snapshot__label mono">Education</span>
                <p className="snapshot__value">
                  M.Sc. in Artificial Intelligence — North Tehran University
                </p>
                <p className="snapshot__sub">GPA: 19.34 / 20</p>
              </div>
              <div className="snapshot__item">
                <span className="snapshot__label mono">Research Areas</span>
                <div className="snapshot__tags">
                  <span>LLMs</span><span>RAG</span><span>Agentic AI</span><span>Computer Vision</span><span>Vision Transformers</span><span>PEFT</span><span>Continual Learning</span>
                </div>
              </div>
            </div>

            <div className="snapshot__row snapshot__row--pub">
              <div className="snapshot__item snapshot__item--pub">
                <span className="snapshot__label mono">Selected Publication</span>
                <p className="snapshot__pub-title">
                  'An efficient Swin Transformer architecture for cutaneous melanoma detection.'
                </p>
                <p className="snapshot__pub-detail">
                  First-author Q2 journal · Intelligence-Based Medicine
                </p>
                <SmartLink
                  href="https://doi.org/10.1016/j.ibmed.2026.100484"
                  label="Read the paper"
                  pendingLabel="Paper forthcoming"
                />
              </div>
            </div>

            <div className="snapshot__row snapshot__row--exp">
              <div className="snapshot__item snapshot__item--exp">
                <span className="snapshot__label mono">Technical &amp; Research Experience</span>
                <ul className="snapshot__list">
                  <li>Persian Whisper fine-tuning using QLoRA.</li>
                  <li>Agentic RAG for complex banking questions.</li>
                  <li>Efficient retrieval using embedding-based clustering.</li>
                  <li>Parameter-efficient adaptation of large models.</li>
                  <li>Research on knowledge preservation and catastrophic forgetting.</li>
                </ul>
              </div>
              <div className="snapshot__item snapshot__item--interests">
                <span className="snapshot__label mono">Research Interests</span>
                <p className="snapshot__interests-text">
                  Efficient foundation models, multimodal AI, continual learning, and intelligent
                  retrieval systems.
                </p>
              </div>
            </div>

            <div className="snapshot__transition">
              <h3 className="snapshot__transition-title">Beyond the Snapshot</h3>
              <p className="snapshot__transition-text">
                My research interests extend beyond a single application domain. Explore my selected
                projects, publications, and technical experiments to discover how I approach
                challenging problems in artificial intelligence.
              </p>
              <div className="snapshot__transition-links">
                <a href="#research" className="snapshot__link">
                  Research &amp; Publications<span className="snapshot__link-arrow">→</span>
                </a>
                <a href="#projects" className="snapshot__link">
                  Selected Projects<span className="snapshot__link-arrow">→</span>
                </a>
                <a href="#experience" className="snapshot__link">
                  Technical Experience<span className="snapshot__link-arrow">→</span>
                </a>
                <a href="#contact" className="snapshot__link">
                  Contact<span className="snapshot__link-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__portrait">
            <Portrait />
          </Reveal>

          <div className="about__body">
            <Reveal>
              <p className="lead">{profile.summary[0]}</p>
            </Reveal>
            <Reveal delay={0.08} className="about__cols">
              {profile.summary.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="facts">
                {facts.map((f) => (
                  <div key={f.k} className="facts__row">
                    <dt className="mono">{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <ol className="pillars">
          {pillars.map((p, i) => (
            <li key={p.n}>
              <Reveal delay={i * 0.08} className="pillar">
                <span className="pillar__n mono">{p.n}</span>
                <h3 className="pillar__title">{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
