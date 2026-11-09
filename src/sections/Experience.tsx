import { Reveal, SectionHeader } from '../components/Primitives';
import { experience } from '../data/profile';

export default function Experience() {
  return (
    <section id="experience" className="section experience" data-theme="light" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeader
          id="exp-title"
          index="05"
          label="Professional Experience"
          title={
            <>
              Where research meets <em>production.</em>
            </>
          }
          aside={<p>Speech recognition, retrieval systems, generative models and embedded vision — in industry and as a founder.</p>}
        />

        <ol className="roles">
          {experience.map((r) => (
            <li key={r.org + r.role}>
              <Reveal className="role">
                <p className="role__period mono">{r.period}</p>

                <div className="role__head">
                  <h3 className="role__title">{r.role}</h3>
                  <p className="role__org">
                    <span className="role__at" aria-hidden="true">
                      @
                    </span>
                    {r.website ? (
                      <a
                        href={r.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="role__org-link"
                      >
                        {r.org}
                      </a>
                    ) : (
                      r.org
                    )}
                    {r.place && <span className="role__place">{r.place}</span>}
                  </p>
                  {r.highlight && (
                    <p className="role__stat">
                      <span className="role__stat-v">{r.highlight.value}</span>
                      <span className="role__stat-l mono">{r.highlight.label}</span>
                    </p>
                  )}
                </div>

                <div className="role__body">
                  {r.groups.map((g, gi) => (
                    <div key={gi} className="role__group">
                      {g.label && <p className="role__glabel mono">{g.label}</p>}
                      <ul>
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <ul className="role__tags" aria-label="Keywords">
                    {r.tags.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
