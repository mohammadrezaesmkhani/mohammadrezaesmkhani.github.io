import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Reveal — subtle scroll-triggered entrance (disabled for reduced motion
   automatically through <MotionConfig reducedMotion="user">).         */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeader — editorial header used by every section.            */
/* ------------------------------------------------------------------ */
export function SectionHeader({
  index,
  label,
  title,
  aside,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <header className="sh">
      <div className="sh__meta">
        <span className="mono">§ {index}</span>
        <span className="sh__rule" aria-hidden="true" />
        <span className="mono">{label}</span>
      </div>
      <div className="sh__row">
        <motion.h2
          id={id}
          className="sh__title"
          initial={{ opacity: 0, y: '0.35em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        {aside && <div className="sh__aside">{aside}</div>}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* SmartLink — renders a real link when `href` is set, otherwise a calm
   "pending" label. Prevents broken links while placeholders remain.  */
/* ------------------------------------------------------------------ */
export function SmartLink({
  href,
  label,
  pendingLabel,
  className = 'slink',
}: {
  href: string | undefined;
  label: string;
  pendingLabel?: string;
  className?: string;
}) {
  if (!href) {
    return (
      <span className={`${className} is-pending`} aria-disabled="true">
        {pendingLabel ?? `${label} · forthcoming`}
      </span>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.6} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/* Availability indicator */
export function Availability({ label }: { label: string }) {
  return (
    <p className="avail">
      <span className="avail__dot" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}
