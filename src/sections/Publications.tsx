import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Reveal, SectionHeader } from '../components/Primitives';
import { publications } from '../data/profile';
import SwinGrid from '../visuals/SwinGrid';

function CopyDoi({ doi }: { doi: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://doi.org/${doi}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };
  return (
    <button type="button" className="doi__copy" onClick={copy} aria-label="Copy DOI link">
      {copied ? <Check size={14} strokeWidth={1.8} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.6} aria-hidden="true" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export default function Publications() {
  return (
    <section id="publications" className="section pubs" data-theme="light" aria-labelledby="pubs-title">
      <div className="container">
        <SectionHeader
          id="pubs-title"
          index="03"
          label="Selected Publications"
          title={
            <>
              Published <em>research.</em>
            </>
          }
          aside={<p>Peer-reviewed work in medical AI and efficient vision architectures.</p>}
        />

        {publications.map((p, i) => (
          <Reveal key={p.doi}>
            <article className="pub" aria-labelledby={`pub-${i}`}>
              <div className="pub__visual" data-theme-inline="dark">
                <div className="pub__visual-top mono">
                  <span>Fig. 02</span>
                  <span>Shifted-window attention</span>
                </div>
                <SwinGrid />
              </div>

              <div className="pub__body">
                <div className="pub__head">
                  <span className="pub__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ul className="pub__badges" aria-label="Publication details">
                    <li className="badge badge--lime">{p.role}</li>
                    <li className="badge pub__badge--subtle">{p.type}</li>
                    <li className="badge pub__badge--subtle">{p.quartile} Journal</li>
                    <li className="badge pub__badge--subtle">{p.year}</li>
                  </ul>
                </div>

                <h2 id={`pub-${i}`} className="pub__title">
                  <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="pub__title-link">
                    {p.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </h2>

                <p className="pub__venue">
                  <em>{p.venue}</em>
                </p>

                <ul className="pub__areas">
                  {p.areas.map((a) => (
                    <li key={a} className="tag">
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="pub__foot">
                  <div className="doi">
                    <span className="doi__k mono">DOI</span>
                    <a className="doi__v mono" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">
                      {p.doi}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <CopyDoi doi={p.doi} />
                  </div>
                  <a className="btn btn--ink" href={p.url ?? `https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">
                    Read the paper
                    <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <p className="pubs__next mono">
            <span className="pubs__dash" aria-hidden="true" />
            In progress — representation fine-tuning & continual learning.{' '}
            <a href="#project-ds-reft">See DS-ReFT →</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
