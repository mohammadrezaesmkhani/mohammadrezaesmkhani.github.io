import { Reveal, SectionHeader } from '../components/Primitives';
import { skills } from '../data/profile';

export default function Skills() {
  return (
    <section id="skills" className="section skills" data-theme="light" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          index="07"
          label="Technical Expertise"
          title={
            <>
              The <em>toolkit.</em>
            </>
          }
          aside={<p>Tools and methods used across research and production work.</p>}
        />

        <div className="sgrid">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06} className="sgroup">
              <div className="sgroup__head">
                <span className="mono">{String(gi + 1).padStart(2, '0')}</span>
                <h3 className="sgroup__title">{g.group}</h3>
                <span className="mono sgroup__count">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <ul className="sgroup__list">
                {g.items.map((s, i) => (
                  <li key={s}>
                    <span className="sgroup__i mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="sgroup__name">{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
