import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Availability } from '../components/Primitives';
import { contact, profile } from '../data/profile';

/** Strip protocol / prefixes so links read cleanly. */
const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const channels = [
  { key: 'email', label: 'Email', href: contact.email ? `mailto:${contact.email}` : '', display: contact.email },
  { key: 'github', label: 'GitHub Profile', href: contact.github, display: contact.github && pretty(contact.github) },
  { key: 'scholar', label: 'Google Scholar', href: contact.scholar, display: contact.scholar && 'Scholar profile' },
  { key: 'linkedin', label: 'LinkedIn', href: contact.linkedin, display: contact.linkedin && pretty(contact.linkedin) },
];

export default function Contact() {
  return (
    <section id="contact" className="contact" data-theme="accent" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__meta">
          <span className="mono">§ 08</span>
          <span className="sh__rule" aria-hidden="true" />
          <span className="mono">Contact</span>
        </div>

        <p className="contact__q">Have an interesting research idea?</p>

        <h2 id="contact-title" className="contact__big">
          {['Let’s', 'explore', 'what’s', 'possible.'].map((w, i) => (
            <span className="contact__wline" key={w}>
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="contact__grid">
          <div className="contact__intro">
            <p>
              I’m looking for PhD positions and research collaborations in large language models, efficient adaptation
              and multimodal learning. I’d be glad to hear from labs, supervisors and teams working on related problems.
            </p>
            <Availability label={profile.availability} />
          </div>

          <ul className="channels">
            {channels.map((c) => (
              <li key={c.key}>
                {c.href ? (
                  <a
                    className="channel"
                    href={c.href}
                    {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="channel__label">{c.label}</span>
                    <span className="channel__value mono">{c.display}</span>
                    <ArrowUpRight className="channel__icon" size={28} strokeWidth={1.4} aria-hidden="true" />
                  </a>
                ) : (
                  <div className="channel is-pending" aria-disabled="true">
                    <span className="channel__label">{c.label}</span>
                    <span className="channel__value mono">To be added</span>
                    <span className="channel__icon channel__icon--pending" aria-hidden="true">
                      ···
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
