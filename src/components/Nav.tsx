import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navItems, profile } from '../data/profile';

type Theme = 'dark' | 'light' | 'accent';

/**
 * Fixed navigation that adapts its colour to the section beneath it
 * (via each section's `data-theme`) and tracks the active section.
 */
export default function Nav() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    let raf = 0;
    const probe = () => {
      raf = 0;
      const y = 36; // vertical probe line, just under the nav bar
      const sections = document.querySelectorAll<HTMLElement>('[data-theme]');
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          setTheme((s.dataset.theme as Theme) || 'dark');
          break;
        }
      }
      const mid = window.innerHeight * 0.4;
      let current = '';
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = id;
      }
      setActive(current);
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(probe);
    };
    probe();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`} data-nav-theme={open ? 'dark' : theme}>
        <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
        <div className="nav__inner container">
          <a className="nav__brand" href="#top" aria-label={`${profile.name} — back to top`}>
            <span className="nav__mark" aria-hidden="true">
              re<i />
            </span>
            <span className="nav__name">{profile.name}</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
                    {item.label}
                    {active === item.id && <motion.span layoutId="nav-underline" className="nav__underline" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__right">
            <span className="nav__status mono">
              <span className="avail__dot" aria-hidden="true" /> Available
            </span>
            <button
              className="nav__toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="nav__burger" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mmenu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container" aria-label="Mobile">
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6 }}
                  >
                    <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="mmenu__foot mono">
                <span className="avail__dot" aria-hidden="true" /> {profile.availability}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
