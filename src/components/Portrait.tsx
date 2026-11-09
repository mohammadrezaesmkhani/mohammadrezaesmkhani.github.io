import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { profile } from '../data/profile';

/**
 * PORTRAIT
 * ------------------------------------------------------------------
 * To add your photo: save it as  public/images/profile.jpg  and rebuild.
 * (profile.jpeg / .webp / .png also work — detected in vite.config.ts.)
 * Without a file, an editorial monogram plate is rendered instead.
 */
const SRC = __PORTRAIT__ ? `${import.meta.env.BASE_URL}${__PORTRAIT__}` : null;

export default function Portrait() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const showImage = SRC && !failed;

  return (
    <figure className="portrait">
      <div className="portrait__frame" ref={ref}>
        {showImage ? (
          <motion.img
            className="portrait__img"
            src={SRC}
            alt={`Portrait of ${profile.name}`}
            width={1200}
            height={1500}
            loading="lazy"
            decoding="async"
            style={{ y, scale: 1.14 }}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="portrait__fallback" role="img" aria-label={`${profile.name} — portrait forthcoming`}>
            <svg className="portrait__dots" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="pf-fade" cx="62%" cy="38%" r="70%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <pattern id="pf-dot" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1.1" fill="currentColor" />
                </pattern>
                <mask id="pf-mask">
                  <rect width="200" height="250" fill="url(#pf-fade)" />
                </mask>
              </defs>
              <rect width="200" height="250" fill="url(#pf-dot)" mask="url(#pf-mask)" opacity="0.5" />
              <circle cx="124" cy="96" r="54" fill="none" stroke="currentColor" strokeOpacity="0.25" />
              <circle cx="124" cy="96" r="3" fill="var(--lime)" />
              <line x1="0" y1="96" x2="200" y2="96" stroke="currentColor" strokeOpacity="0.12" />
              <line x1="124" y1="0" x2="124" y2="250" stroke="currentColor" strokeOpacity="0.12" />
            </svg>
            <span className="portrait__mono" aria-hidden="true">
              R<em>e</em>
            </span>
            <span className="portrait__note mono">
              Portrait — forthcoming
              {import.meta.env.DEV && <small>Add public/images/profile.jpg</small>}
            </span>
          </div>
        )}
        {/* crop marks */}
        <i className="crop crop--tl" aria-hidden="true" />
        <i className="crop crop--tr" aria-hidden="true" />
        <i className="crop crop--bl" aria-hidden="true" />
        <i className="crop crop--br" aria-hidden="true" />
      </div>
      <figcaption className="portrait__cap mono">
        <span>Pl. 01</span>
        <span>{profile.name}</span>
        <span>AI / Research</span>
      </figcaption>
    </figure>
  );
}
