import { useEffect, useRef, useState } from 'react';

/**
 * FIG. 01 — LATENT MANIFOLD
 * A point cloud that slowly morphs between geometric manifolds
 * (sphere → torus → swiss roll → clusters → loss surface).
 * A lime "query" point retrieves its k nearest neighbours in 3-D —
 * a quiet nod to embedding spaces and retrieval.
 *
 * Lightweight: one 2-D canvas, ~900 points, paused when off-screen or
 * when the tab is hidden, and static under prefers-reduced-motion.
 */

const SHAPES = ['S² · sphere', 'T² · torus', 'Swiss roll', 'k-clusters', 'Loss surface'] as const;
const K = 7;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShapes(n: number): Float32Array[] {
  const rnd = mulberry32(7);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const sphere = new Float32Array(n * 3);
  const torus = new Float32Array(n * 3);
  const roll = new Float32Array(n * 3);
  const clusters = new Float32Array(n * 3);
  const surface = new Float32Array(n * 3);

  // cluster centres
  const C = 6;
  const centres: number[][] = [];
  for (let c = 0; c < C; c++) {
    const y = 1 - (c / (C - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * c * 2.3;
    centres.push([Math.cos(th) * r * 0.8, y * 0.7, Math.sin(th) * r * 0.8]);
  }
  const gauss = () => {
    const u = Math.max(1e-6, rnd());
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const side = Math.ceil(Math.sqrt(n));

  for (let i = 0; i < n; i++) {
    const k = i * 3;
    // sphere (Fibonacci lattice)
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    sphere[k] = Math.cos(th) * r;
    sphere[k + 1] = y;
    sphere[k + 2] = Math.sin(th) * r;

    // torus
    const u = (i / n) * Math.PI * 2 * 1;
    const v = golden * i * 1.0;
    const R = 0.78;
    const rr = 0.3;
    torus[k] = (R + rr * Math.cos(v)) * Math.cos(u);
    torus[k + 1] = rr * Math.sin(v);
    torus[k + 2] = (R + rr * Math.cos(v)) * Math.sin(u);

    // swiss roll
    const s = i / n;
    const t = 1.5 * Math.PI * (1 + 2 * ((i * 0.618034) % 1));
    roll[k] = (t * Math.cos(t)) / 14;
    roll[k + 1] = (s - 0.5) * 1.5;
    roll[k + 2] = (t * Math.sin(t)) / 14;

    // gaussian clusters
    const c = centres[i % C];
    clusters[k] = c[0] + gauss() * 0.11;
    clusters[k + 1] = c[1] + gauss() * 0.11;
    clusters[k + 2] = c[2] + gauss() * 0.11;

    // loss surface (grid)
    const gx = (i % side) / (side - 1) - 0.5;
    const gz = Math.floor(i / side) / (side - 1) - 0.5;
    const X = gx * 2.1;
    const Z = gz * 2.1;
    surface[k] = X;
    surface[k + 1] = 0.28 * Math.sin(X * 2.4) * Math.cos(Z * 2.1) - 0.18 * Math.exp(-(X * X + Z * Z) * 2.2) * 2;
    surface[k + 2] = Z;
  }
  return [sphere, torus, roll, clusters, surface];
}

export default function Manifold() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<() => void>(() => {});
  const [shapeIdx, setShapeIdx] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 720;
    const N = small ? 520 : 900;
    const shapes = buildShapes(N);
    const pos = new Float32Array(shapes[0]);
    let from = shapes[0];
    let to = shapes[0];
    let current = 0;
    let morphT = 1;
    const delays = new Float32Array(N);
    const rnd = mulberry32(11);
    for (let i = 0; i < N; i++) delays[i] = rnd();
    const proj = new Float32Array(N * 3); // sx, sy, depth
    let query = Math.floor(N * 0.37);

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (reduce) draw(0);
    };

    let rotY = 0.6;
    let tiltX = -0.32;
    let targetTilt = -0.32;
    let targetYaw = 0;
    let yawOffset = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const morph = () => {
      from = new Float32Array(pos);
      current = (current + 1) % shapes.length;
      to = shapes[current];
      morphT = 0;
      query = Math.floor(rnd() * N);
      setShapeIdx(current);
      if (reduce) {
        pos.set(to);
        morphT = 1;
        draw(0);
      }
    };
    morphRef.current = morph;

    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const draw = (dt: number) => {
      // update morph
      if (morphT < 1) {
        morphT = Math.min(1, morphT + dt / 2.4);
        for (let i = 0; i < N; i++) {
          const local = Math.min(1, Math.max(0, (morphT - delays[i] * 0.35) / 0.65));
          const e = ease(local);
          const k = i * 3;
          pos[k] = from[k] + (to[k] - from[k]) * e;
          pos[k + 1] = from[k + 1] + (to[k + 1] - from[k + 1]) * e;
          pos[k + 2] = from[k + 2] + (to[k + 2] - from[k + 2]) * e;
        }
      }

      if (!reduce) {
        rotY += dt * 0.14;
        tiltX += (targetTilt - tiltX) * Math.min(1, dt * 2.5);
        yawOffset += (targetYaw - yawOffset) * Math.min(1, dt * 2.5);
      }

      const cy = Math.cos(rotY + yawOffset);
      const sy = Math.sin(rotY + yawOffset);
      const cx = Math.cos(tiltX);
      const sx = Math.sin(tiltX);
      const scale = Math.min(w, h) * 0.36;
      const ox = w * 0.5;
      const oy = h * 0.5;
      const f = 3.2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const project = (x: number, y: number, z: number, out: Float32Array, o: number) => {
        const x1 = x * cy - z * sy;
        const z1 = x * sy + z * cy;
        const y1 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const p = f / (f + z2);
        out[o] = ox + x1 * scale * p;
        out[o + 1] = oy + y1 * scale * p;
        out[o + 2] = z2;
      };

      // axes
      const ax = new Float32Array(3);
      const o0 = new Float32Array(3);
      project(0, 0, 0, o0, 0);
      ctx.lineWidth = 1;
      ctx.font = '500 10px "JetBrains Mono Variable", ui-monospace, monospace';
      const axes: [number, number, number, string][] = [
        [1.3, 0, 0, 'x₁'],
        [0, -1.3, 0, 'x₂'],
        [0, 0, 1.3, 'x₃'],
      ];
      for (const [a, b, c, label] of axes) {
        project(a, b, c, ax, 0);
        ctx.strokeStyle = 'rgba(238,236,229,0.16)';
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(o0[0], o0[1]);
        ctx.lineTo(ax[0], ax[1]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(238,236,229,0.45)';
        ctx.fillText(label, ax[0] + 4, ax[1] - 4);
      }

      // project points
      for (let i = 0; i < N; i++) {
        const k = i * 3;
        project(pos[k], pos[k + 1], pos[k + 2], proj, k);
      }

      // pointer repulsion in screen space
      const R = 90;
      for (let i = 0; i < N; i++) {
        const k = i * 3;
        let px = proj[k];
        let py = proj[k + 1];
        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const push = (1 - d / R) * 22;
            px += (dx / d) * push;
            py += (dy / d) * push;
            proj[k] = px;
            proj[k + 1] = py;
          }
        }
        const depth = proj[k + 2]; // ~ -1.3..1.3, negative = closer
        const a = 0.18 + (1 - (depth + 1.3) / 2.6) * 0.72;
        const size = 1 + (1 - (depth + 1.3) / 2.6) * 1.5;
        ctx.fillStyle = `rgba(238,236,229,${a.toFixed(3)})`;
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }

      // k-NN retrieval from query point (3-D distance)
      const qk = query * 3;
      const qx = pos[qk];
      const qy = pos[qk + 1];
      const qz = pos[qk + 2];
      const best: { i: number; d: number }[] = [];
      for (let i = 0; i < N; i++) {
        if (i === query) continue;
        const k = i * 3;
        const dx = pos[k] - qx;
        const dy = pos[k + 1] - qy;
        const dz = pos[k + 2] - qz;
        const d = dx * dx + dy * dy + dz * dz;
        if (best.length < K) {
          best.push({ i, d });
          best.sort((m, n) => m.d - n.d);
        } else if (d < best[K - 1].d) {
          best[K - 1] = { i, d };
          best.sort((m, n) => m.d - n.d);
        }
      }
      const qsx = proj[qk];
      const qsy = proj[qk + 1];
      ctx.strokeStyle = 'rgba(200,255,46,0.85)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (const b of best) {
        const k = b.i * 3;
        ctx.moveTo(qsx, qsy);
        ctx.lineTo(proj[k], proj[k + 1]);
      }
      ctx.stroke();
      ctx.fillStyle = '#c8ff2e';
      for (const b of best) {
        const k = b.i * 3;
        ctx.fillRect(proj[k] - 1.75, proj[k + 1] - 1.75, 3.5, 3.5);
      }
      ctx.beginPath();
      ctx.arc(qsx, qsy, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = '#c8ff2e';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(qsx, qsy, 2, 0, Math.PI * 2);
      ctx.fill();
      // label
      ctx.strokeStyle = 'rgba(200,255,46,0.5)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(qsx + 6, qsy - 6);
      ctx.lineTo(qsx + 30, qsy - 30);
      ctx.lineTo(qsx + 78, qsy - 30);
      ctx.stroke();
      ctx.fillStyle = '#c8ff2e';
      ctx.fillText(`q · k=${K}`, qsx + 32, qsy - 35);
    };

    // loop
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let morphTimer = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      morphTimer += dt;
      if (morphTimer > 7.5 && morphT >= 1) {
        morphTimer = 0;
        morph();
      }
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    const host = wrap.closest('section') ?? wrap;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = e.pointerType === 'mouse';
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTilt = -0.32 + ny * 0.25;
      targetYaw = nx * 0.35;
    };
    const onLeave = () => {
      mouse.active = false;
      targetTilt = -0.32;
      targetYaw = 0;
    };
    host.addEventListener('pointermove', onMove as EventListener);
    host.addEventListener('pointerleave', onLeave);

    if (reduce) draw(0);
    else start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onMove as EventListener);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <figure className="manifold" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated point cloud morphing between geometric manifolds, with a highlighted query point connected to its nearest neighbours."
        onClick={() => morphRef.current()}
      />
      <figcaption className="manifold__cap mono">
        <span className="manifold__state">
          <span>{SHAPES[shapeIdx]}</span>
          <button type="button" className="manifold__btn" onClick={() => morphRef.current()}>
            Morph ↻
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
