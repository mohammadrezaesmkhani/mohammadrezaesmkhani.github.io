import { ArrowUp, AtSign, Github } from 'lucide-react';
import { contact, profile } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" data-theme="dark">
      <div className="container footer__inner">
        <p className="footer__sig" aria-hidden="true">
          M. Reza <em>Esmkhani</em>
        </p>
        <div className="footer__row mono">
          <span>
            © {year} {profile.name}
          </span>
          <span>Designed &amp; built with curiosity</span>
          <span className="footer__colophon">Inter Tight · Instrument Serif · JetBrains Mono</span>
          <a href="https://github.com/mohammadrezaesmkhani" target="_blank" rel="noopener noreferrer" className="footer__social">
            <Github size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <a href={`mailto:${contact.email}`} className="footer__social">
            <AtSign size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <a href="#top" className="footer__top">
            Back to top <ArrowUp size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
