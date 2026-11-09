import type { Project } from '../data/profile';
import SwinGrid from './SwinGrid';

/**
 * Diagrammatic visuals for each project — drawn, not illustrated.
 * Colour comes from `currentColor` + the CSS variable --lime.
 * Animations are pure CSS and only run on hover / focus (see global.css).
 */

function RagVisual() {
  const docs = [0, 1, 2];
  return (
    <svg viewBox="0 0 400 240" aria-hidden="true" className="pv pv--rag">
      {docs.map((d) => (
        <g key={d} transform={`translate(${28 + d * 22}, ${30 + d * 14})`}>
          <rect width="150" height="170" fill="var(--card-bg)" stroke="currentColor" strokeOpacity="0.45" />
          {d === 2 && (
            <text x="10" y="18" className="pv__mono" fill="currentColor" opacity="0.55">
              10-K · Item 7
            </text>
          )}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x="10"
              y={30 + i * 14}
              width={i % 3 === 2 ? 90 : 130}
              height="5"
              fill="currentColor"
              opacity="0.22"
              className={d === 2 && [1, 4, 6].includes(i) ? `pv__chunk pv__chunk--${i}` : undefined}
            />
          ))}
        </g>
      ))}
      {/* retrieval lines */}
      <g className="pv__beams" stroke="var(--lime)" strokeWidth="1" fill="none">
        <path d="M 308 112 C 260 112, 250 88, 222 88" />
        <path d="M 308 118 C 260 118, 250 130, 222 130" />
        <path d="M 308 124 C 270 124, 250 158, 182 158" />
      </g>
      <g transform="translate(308, 96)">
        <rect width="80" height="44" fill="var(--lime)" />
        <text x="10" y="18" className="pv__mono" fill="#0e0e0d">
          query
        </text>
        <text x="10" y="34" className="pv__mono" fill="#0e0e0d">
          [1][2][3]
        </text>
      </g>
      <text x="308" y="166" className="pv__mono" fill="currentColor" opacity="0.55">
        cite → verify
      </text>
    </svg>
  );
}

function ReftVisual() {
  const dots = [
    [150, 150],
    [175, 160],
    [200, 140],
    [168, 132],
    [222, 158],
    [190, 170],
    [240, 142],
    [140, 168],
    [210, 175],
    [255, 160],
    [185, 150],
  ];
  return (
    <svg viewBox="0 0 400 240" aria-hidden="true" className="pv pv--reft">
      {/* subspace plane */}
      <path d="M 70 170 L 250 205 L 340 140 L 160 110 Z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.35" />
      <text x="292" y="196" className="pv__mono" fill="currentColor" opacity="0.6">
        span(R)
      </text>
      {dots.map(([x, y], i) => (
        <rect key={i} x={x - 1.5} y={y - 1.5} width="3" height="3" fill="currentColor" opacity="0.55" />
      ))}
      {/* base representation h */}
      <line x1="200" y1="158" x2="300" y2="150" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 300 150 l -8 -4 l 1 8 z" fill="currentColor" />
      <text x="306" y="154" className="pv__mono" fill="currentColor">
        h
      </text>
      {/* orthogonal shift */}
      <g className="pv__shift">
        <line x1="200" y1="158" x2="200" y2="48" stroke="var(--lime)" strokeWidth="1.6" />
        <path d="M 200 48 l -4.5 9 l 9 0 z" fill="var(--lime)" />
        <text x="208" y="54" className="pv__mono" fill="var(--lime)">
          Δ⊥
        </text>
      </g>
      {/* right angle marker */}
      <path d="M 200 144 L 214 143 L 214 157" fill="none" stroke="var(--lime)" strokeWidth="1" />
      <circle cx="200" cy="158" r="3" fill="var(--lime)" />
      <text x="24" y="40" className="pv__mono" fill="currentColor" opacity="0.6">
        h′ = h + Δ⊥ , Δ⊥ ⟂ prior subspace
      </text>
    </svg>
  );
}

function WhisperVisual() {
  const bars = Array.from({ length: 46 }, (_, i) => {
    const v = Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 0.85 + 0.12;
    return v;
  });
  // Persian reads right-to-left, so tokens are laid out reversed.
  const tokens = ['سل', 'ام', '·', 'خو', 'ش', '·', 'آم', 'دی', 'د'].reverse();
  return (
    <svg viewBox="0 0 400 240" aria-hidden="true" className="pv pv--whisper">
      <text x="24" y="34" className="pv__mono" fill="currentColor" opacity="0.6">
        log-mel · 30s window
      </text>
      <g transform="translate(24, 92)">
        {bars.map((v, i) => (
          <rect
            key={i}
            className="pv__bar"
            style={{ animationDelay: `${(i % 12) * 60}ms` }}
            x={i * 7.6}
            y={-v * 42}
            width="3.2"
            height={v * 84}
            fill="currentColor"
            opacity="0.7"
          />
        ))}
      </g>
      <line x1="24" y1="150" x2="376" y2="150" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 4" />
      <text x="24" y="170" className="pv__mono" fill="currentColor" opacity="0.6">
        tokens
      </text>
      <g transform="translate(24, 180)">
        {tokens.map((t, i) => {
          const flagged = i === 4 || i === 5;
          return (
            <g key={i} transform={`translate(${i * 39}, 0)`} className={flagged ? 'pv__tok is-flag' : 'pv__tok'}>
              <rect
                width="34"
                height="30"
                fill={flagged ? 'var(--lime)' : 'none'}
                fillOpacity={flagged ? 0.18 : 0}
                stroke={flagged ? 'var(--lime)' : 'currentColor'}
                strokeOpacity={flagged ? 1 : 0.4}
                strokeDasharray={flagged ? '3 2' : undefined}
              />
              <text x="17" y="20" textAnchor="middle" className="pv__fa" fill="currentColor">
                {t}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function TryOnVisual() {
  // garment silhouette mask for the "student" grid
  const inShirt = (x: number, y: number) => {
    // x,y in 0..1
    const body = x > 0.3 && x < 0.7 && y > 0.18 && y < 0.95;
    const sleeves = y > 0.18 && y < 0.42 && x > 0.08 && x < 0.92 && y - 0.18 < (0.5 - Math.abs(x - 0.5)) * 0.9;
    const neck = y < 0.26 && Math.abs(x - 0.5) < 0.09;
    return (body || sleeves) && !neck;
  };
  const cols = 16;
  const rows = 14;
  const cells = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const on = inShirt((i + 0.5) / cols, (j + 0.5) / rows);
      cells.push(
        <rect
          key={`${i}-${j}`}
          x={i * 9}
          y={j * 9}
          width="6"
          height="6"
          fill={on ? 'var(--lime)' : 'currentColor'}
          opacity={on ? 1 : 0.13}
          className={on ? 'pv__px' : undefined}
          style={on ? { animationDelay: `${(i + j) * 35}ms` } : undefined}
        />,
      );
    }
  }
  const teacher = [];
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 12; i++) {
      teacher.push(<rect key={`${i}-${j}`} x={i * 9} y={j * 9} width="6" height="6" fill="currentColor" opacity={0.18 + ((i * 7 + j * 3) % 5) * 0.1} />);
    }
  }
  return (
    <svg viewBox="0 0 600 240" aria-hidden="true" className="pv pv--tryon" preserveAspectRatio="xMidYMid meet">
      <text x="30" y="36" className="pv__mono" fill="currentColor" opacity="0.6">
        teacher · FLUX
      </text>
      <g transform="translate(30, 52)">{teacher}</g>
      <g className="pv__arrow" stroke="currentColor" strokeOpacity="0.6" fill="none">
        <line x1="170" y1="120" x2="290" y2="120" strokeDasharray="3 4" />
        <path d="M 284 114 L 292 120 L 284 126" />
      </g>
      <text x="186" y="108" className="pv__mono" fill="currentColor" opacity="0.6">
        distill + PEFT
      </text>
      <text x="320" y="36" className="pv__mono" fill="currentColor" opacity="0.6">
        student · local
      </text>
      <g transform="translate(320, 52)">{cells}</g>
      <text x="480" y="186" className="pv__mono" fill="currentColor" opacity="0.6">
        try-on
      </text>
    </svg>
  );
}

export default function ProjectVisual({ kind }: { kind: Project['visual'] }) {
  switch (kind) {
    case 'rag':
      return <RagVisual />;
    case 'reft':
      return <ReftVisual />;
    case 'whisper':
      return <WhisperVisual />;
    case 'swin':
      return <SwinGrid compact />;
    case 'tryon':
      return <TryOnVisual />;
  }
}
