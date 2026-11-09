import { useEffect, useId, useState } from 'react';

/**
 * Swin Transformer, explained in one figure:
 * an 8×8 patch grid, partitioned into 4×4 local windows (W-MSA),
 * alternating with windows shifted by half a window (SW-MSA).
 * The tonal "lesion" is abstract — a stylised dermoscopic form.
 */

const P = 8; // patches per side
const S = 40; // patch size in SVG units

function lesion(i: number, j: number) {
  const cx = 3.6;
  const cy = 4.1;
  const dx = i + 0.5 - cx;
  const dy = j + 0.5 - cy;
  const ang = Math.atan2(dy, dx);
  const radius = 2.6 + 0.55 * Math.sin(ang * 3 + 0.6) + 0.3 * Math.cos(ang * 5);
  const d = Math.sqrt(dx * dx + dy * dy);
  const v = Math.max(0, 1 - d / radius);
  return Math.min(1, v * 1.25);
}

export default function SwinGrid({ compact = false, label = true }: { compact?: boolean; label?: boolean }) {
  const [shifted, setShifted] = useState(false);
  const clipId = `swin-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setShifted((s) => !s), 2600);
    return () => window.clearInterval(id);
  }, []);

  const cells = [];
  for (let j = 0; j < P; j++) {
    for (let i = 0; i < P; i++) {
      const v = lesion(i, j);
      cells.push(
        <rect
          key={`${i}-${j}`}
          x={i * S + 2}
          y={j * S + 2}
          width={S - 4}
          height={S - 4}
          fill="currentColor"
          opacity={0.06 + v * 0.8}
        />,
      );
    }
  }

  const span = P * S;
  const lines = [];
  for (let k = -1; k <= 3; k++) {
    const p = k * S * 4;
    lines.push(<line key={`v${k}`} x1={p} y1={-S * 4} x2={p} y2={span + S * 4} />);
    lines.push(<line key={`h${k}`} x1={-S * 4} y1={p} x2={span + S * 4} y2={p} />);
  }

  return (
    <div className={`swin ${compact ? 'swin--compact' : ''}`}>
      <svg viewBox={`-12 -12 ${span + 24} ${span + 24}`} aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={span} height={span} />
          </clipPath>
        </defs>
        <g>{cells}</g>
        <g clipPath={`url(#${clipId})`}>
          <g
            className="swin__windows"
            style={{ transform: shifted ? `translate(${S * 2}px, ${S * 2}px)` : 'translate(0px, 0px)' }}
          >
            {lines}
          </g>
        </g>
        <rect x="0" y="0" width={span} height={span} fill="none" stroke="currentColor" strokeOpacity="0.35" />
        {/* registration marks */}
        {[
          [-12, -12],
          [span + 12, -12],
          [-12, span + 12],
          [span + 12, span + 12],
        ].map(([x, y], i) => (
          <g key={i} stroke="currentColor" strokeOpacity="0.5">
            <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
          </g>
        ))}
      </svg>
      {label && (
        <div className="swin__legend mono">
          <span className={!shifted ? 'is-on' : ''}>W-MSA</span>
          <span aria-hidden="true">⇄</span>
          <span className={shifted ? 'is-on' : ''}>SW-MSA</span>
        </div>
      )}
    </div>
  );
}
