import { Reveal, SectionHeader } from '../components/Primitives';
import { education } from '../data/profile';

const TRANSCRIPT_SRC = '/images/transcript.jpg';
const TRANSCRIPT_DOWNLOAD = 'Official-Academic-Transcript.jpg';

export default function Education() {
  return (
    <section id="education" className="section education" data-theme="dark" aria-labelledby="edu-title">
      <div className="container">
        <SectionHeader
          id="edu-title"
          index="06"
          label="Education"
          title={
            <>
              From circuits to <em>cognition.</em>
            </>
          }
          aside={<p>An electronics foundation, followed by a thesis-based master’s in artificial intelligence.</p>}
        />

        <div className="edu">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1} className="edu__item">
              <article aria-labelledby={`edu-${i}`}>
                <p className="edu__abbr" aria-hidden="true">
                  {e.abbr}
                </p>
                <div className="edu__meta mono">
                  <span>{e.school}</span>
                  <span>{e.place}</span>
                </div>
                <h3 id={`edu-${i}`} className="edu__degree">
                  {e.degree}
                </h3>
                <ul className="edu__notes">
                  {e.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>

                <div className="edu__foot">
                  <p className="edu__gpa">
                    <span className="mono">GPA</span>
                    <strong>{e.gpa}</strong>
                    <span className="edu__scale">/ {e.scale}</span>

                  </p>
                  <p className={`edu__status mono ${i === 0 ? 'is-live' : ''}`}>
                    {i === 0 && <span className="avail__dot" aria-hidden="true" />}
                    {e.status}
                  </p>
                </div>

                {e.coursework && (
                  <div className="coursework" id={e.abbr === 'B.Sc.' ? 'academic-highlights' : 'coursework'}>
                    <h4 className="coursework__title">
                      {e.abbr === 'B.Sc.' ? 'Selected Academic Highlights' : 'Selected Graduate Coursework'}
                    </h4>
                    <ul className="coursework__list">
                      {e.coursework.map((c, ci) => (
                        <li key={ci} className="coursework__item">
                          <span className="coursework__name">{c.course}</span>
                          {e.abbr === 'M.Sc.' ? (
                            <a
                              href={TRANSCRIPT_SRC}
                              download={TRANSCRIPT_DOWNLOAD}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="coursework__grade"
                              aria-label={`Grade for ${c.course}: ${c.grade}`}
                            >
                              {c.grade}
                            </a>
                          ) : (
                            <span className="coursework__grade">{c.grade}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {e.abbr === 'M.Sc.' && (
                      <p className="coursework__download">
                        <a
                          href={TRANSCRIPT_SRC}
                          download={TRANSCRIPT_DOWNLOAD}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="coursework__download-link"
                        >
                          Download Full Official Transcript ↓
                        </a>
                      </p>
                    )}
                  </div>
                )}

                {e.awards && (
                  <div className="awards">
                    <h4 className="awards__title">Awards &amp; Recognition</h4>
                    <ul className="awards__list">
                      {e.awards.map((a, ai) => (
                        <li key={ai} className="awards__item">
                          <div className="awards__content">
                            <span className="awards__item-title">{a.title}</span>
                            <span className="awards__org">{a.org}</span>
                            {a.place && <span className="awards__place">{a.place}</span>}
                          </div>
                          <p className="awards__detail">{a.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
