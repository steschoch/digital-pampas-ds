import { useEffect, useRef } from 'react';
import styles from './NetworkBg.module.css';

// ── Tool definitions ────────────────────────────────────────────────────────
// bx/by: normalised [0,1] positions; biased to right side for Hero use
// logo:  path relative to /public
const TOOLS = [
  { id: 'clay',      initial: 'C',  logo: '/logos/clay-nobg.png',    bx: 0.50, by: 0.03, phase: 0.0 },
  { id: 'apollo',    initial: 'A',  logo: '/logos/apollo-nobg.png',  bx: 0.80, by: 0.02, phase: 1.1 },
  { id: 'n8n',       initial: 'n8', logo: '/logos/n8n.png',          bx: 0.97, by: 0.20, phase: 2.2 },
  { id: 'instantly', initial: 'I',  logo: '/logos/instantly.png',    bx: 0.97, by: 0.58, phase: 3.3 },
  { id: 'make',      initial: 'M',  logo: '/logos/make-nobg.png',    bx: 0.80, by: 0.92, phase: 4.4 },
  { id: 'lemlist',   initial: 'L',  logo: '/logos/lemlist-nobg.png', bx: 0.55, by: 0.95, phase: 0.7 },
  { id: 'apify',     initial: 'Ap', logo: '/logos/apify.png',        bx: 0.44, by: 0.58, phase: 1.9 },
] as const;

const EDGES: readonly [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],
  [1,3],[0,4],[2,5],[1,6],
];

export interface NetworkBgProps {
  /** CSS opacity on the canvas wrapper — use for subtle sections */
  opacity?: number;
  /** CSS blur on the canvas (px) */
  blurPx?: number;
  /** Circle radius (px) */
  nodeRadius?: number;
  /** Run the animation loop */
  animated?: boolean;
  className?: string;
}

export function NetworkBg({
  opacity = 1,
  blurPx = 0,
  nodeRadius = 26,
  animated = true,
  className,
}: NetworkBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const stopRef   = useRef(false);
  const imgsRef   = useRef<Record<string, HTMLImageElement>>({});

  // ── Pre-load logos ─────────────────────────────────────────────────
  useEffect(() => {
    TOOLS.forEach(t => {
      if (imgsRef.current[t.id]) return;
      const img = new Image();
      img.src = t.logo;
      imgsRef.current[t.id] = img;
    });
  }, []);

  // ── Canvas animation ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    stopRef.current = false;

    function resize() {
      if (!canvas || !ctx) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = Math.round(W * (window.devicePixelRatio || 1));
      canvas.height = Math.round(H * (window.devicePixelRatio || 1));
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resize();
    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    // Pulses — 1 or 2 per edge, staggered
    const pulses = EDGES.flatMap(([fi, ti], idx) => {
      const count = idx % 3 === 0 ? 2 : 1;
      return Array.from({ length: count }, (_, k) => ({
        fi, ti,
        t:     k === 0 ? 0.05 : 0.58,
        speed: 0.0005 + fi * 0.0002,
      }));
    });

    let tick = 0;

    function isDark() {
      return document.documentElement.getAttribute('data-color-scheme') !== 'light';
    }

    function draw() {
      if (stopRef.current || !ctx || !W || !H) return;

      // Re-apply scale after resize (canvas.width/height cleared the transform)
      ctx.clearRect(0, 0, W, H);
      if (animated) tick++;

      const dark = isDark();

      // Colours that flip per mode
      const edgeColour  = dark ? 'rgba(255,255,255,0.40)' : 'rgba(8,14,30,0.22)';
      const borderCol   = dark ? 'rgba(255,255,255,0.45)' : 'rgba(8,14,30,0.28)';
      const fillCol     = dark ? 'rgba(255,255,255,0.05)' : 'rgba(8,14,30,0.04)';
      const pulseGlow   = dark ? 'rgba(200,230,255,0.70)' : 'rgba(0,100,160,0.55)';
      const pulseCore   = dark ? 'rgba(255,255,255,0.95)' : 'rgba(8,14,30,0.85)';
      const logoFilter  = dark ? 'brightness(0) invert(1)' : 'brightness(0)';
      const initialCol  = dark ? 'rgba(255,255,255,0.80)' : 'rgba(8,14,30,0.70)';

      // Current positions (gentle drift)
      const nodes = TOOLS.map((t) => ({
        id: t.id,
        initial: t.initial,
        x: t.bx * W + (animated ? Math.sin(tick * 0.003 + t.phase) * nodeRadius * 0.55 : 0),
        y: t.by * H + (animated ? Math.cos(tick * 0.004 + t.phase * 1.3) * nodeRadius * 0.45 : 0),
      }));

      // ── Edges ───────────────────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = edgeColour;
      ctx.lineWidth = 1.5;
      for (const [fi, ti] of EDGES) {
        const a = nodes[fi], b = nodes[ti];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();

      // ── Pulses ──────────────────────────────────────────────────────
      if (animated) {
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          const a = nodes[p.fi], b = nodes[p.ti];
          const px = a.x + (b.x - a.x) * p.t;
          const py = a.y + (b.y - a.y) * p.t;

          const gr = ctx.createRadialGradient(px, py, 0, px, py, 9);
          gr.addColorStop(0, pulseGlow);
          gr.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fillStyle = gr; ctx.fill();

          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = pulseCore; ctx.fill();
        }
      }

      // ── Nodes ───────────────────────────────────────────────────────
      for (const n of nodes) {
        // Transparent fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillCol;
        ctx.fill();

        // Border ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Logo or fallback initial
        const img = imgsRef.current[n.id];
        const clip = nodeRadius * 0.82;
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          // Clip to circle
          ctx.beginPath();
          ctx.arc(n.x, n.y, clip, 0, Math.PI * 2);
          ctx.clip();
          ctx.filter = logoFilter;
          ctx.globalAlpha = 0.80;
          ctx.drawImage(img, n.x - clip, n.y - clip, clip * 2, clip * 2);
          ctx.restore();
        } else {
          ctx.fillStyle = initialCol;
          ctx.font = `600 ${Math.round(nodeRadius * 0.50)}px "Space Grotesk",sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.initial, n.x, n.y);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    // Pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(rafRef.current);
          stopRef.current = true;
        } else {
          stopRef.current = false;
          rafRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      stopRef.current = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [nodeRadius, animated]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={[styles.canvas, className].filter(Boolean).join(' ')}
      style={{
        opacity,
        ...(blurPx > 0 ? { filter: `blur(${blurPx}px)` } : {}),
      }}
    />
  );
}
