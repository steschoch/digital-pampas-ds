/**
 * V2 — "Spectrum" — Tool brand colors
 *
 * • Each node uses its tool's brand color (low-alpha fill + colored border)
 * • Edges are color gradients from node A to node B at ~25% opacity
 * • Pulses travel with a small colored glow matching the source node
 * • Tool name label appears below each node in small type
 * • Lines start/end at circle perimeter
 */
import { useEffect, useRef } from 'react';
import {
  TOOLS, EDGES,
  clipEdge, hex2rgba, drawLogoOrInitial, preloadLogos,
} from './toolsData';
import styles from './NetworkBg.module.css';

export interface NetworkBgV2Props {
  opacity?: number;
  blurPx?: number;
  className?: string;
  forceDark?: boolean;
}

export function NetworkBgV2({ opacity = 1, blurPx = 0, className, forceDark = false }: NetworkBgV2Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const stopRef   = useRef(false);
  const imgsRef   = useRef(preloadLogos());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    stopRef.current = false;

    function resize() {
      if (!canvas || !ctx) return;
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pulses = EDGES.map(([fi, ti]) => ({
      fi, ti, t: Math.random(), speed: 0.0007 + fi * 0.00018,
    }));

    let tick = 0;

    function draw() {
      if (stopRef.current || !ctx || !W || !H) return;
      ctx.clearRect(0, 0, W, H);
      tick++;

      const dark = forceDark || document.documentElement.getAttribute('data-color-scheme') !== 'light';

      const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
      const nodes = TOOLS.map(t => ({
        ...t,
        x: t.bx * W + Math.sin(tick * 0.0028 + t.phase) * t.r * 0.45,
        y: (isTablet && t.byTablet !== undefined ? t.byTablet : t.by) * H
          + Math.cos(tick * 0.0032 + t.phase * 1.3) * t.r * 0.35,
      }));

      // ── Edges — colored gradient ────────────────────────────────────
      ctx.lineWidth = 1.2;
      for (const [fi, ti] of EDGES) {
        const a = nodes[fi], b = nodes[ti];
        const pts = clipEdge(a.x, a.y, a.r, b.x, b.y, b.r);
        if (!pts) continue;
        const g = ctx.createLinearGradient(pts.x1, pts.y1, pts.x2, pts.y2);
        g.addColorStop(0, hex2rgba(a.color, dark ? 0.30 : 0.20));
        g.addColorStop(1, hex2rgba(b.color, dark ? 0.30 : 0.20));
        ctx.beginPath(); ctx.moveTo(pts.x1, pts.y1); ctx.lineTo(pts.x2, pts.y2);
        ctx.strokeStyle = g; ctx.stroke();
      }

      // ── Pulses ─────────────────────────────────────────────────────
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const a = nodes[p.fi], b = nodes[p.ti];
        const pts = clipEdge(a.x, a.y, a.r, b.x, b.y, b.r);
        if (!pts) continue;
        const px = pts.x1 + (pts.x2 - pts.x1) * p.t;
        const py = pts.y1 + (pts.y2 - pts.y1) * p.t;

        // Glow
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 8);
        gr.addColorStop(0, hex2rgba(a.color, dark ? 0.18 : 0.20));
        gr.addColorStop(1, hex2rgba(a.color, 0));
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();

        // Core
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.30)' : hex2rgba(a.color, 0.20);
        ctx.fill();
      }

      // ── Nodes ──────────────────────────────────────────────────────
      for (const n of nodes) {
        // Colored fill
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = hex2rgba(n.color, dark ? 0.12 : 0.20);
        ctx.fill();

        // Colored border
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.strokeStyle = hex2rgba(n.color, dark ? 0.50 : 0.20);
        ctx.lineWidth = 1.5; ctx.stroke();

        drawLogoOrInitial(ctx, imgsRef.current[n.id], n.x, n.y, n.r, n.initial, dark, n.keepColor, n.logoScale);

        // Tool name label below
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.35)' : 'rgba(8,14,30,0.30)';
        ctx.font = `500 10px "Figtree",sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(n.label, n.x, n.y + n.r + 4);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { cancelAnimationFrame(rafRef.current); stopRef.current = true; }
      else { stopRef.current = false; rafRef.current = requestAnimationFrame(draw); }
    }, { threshold: 0 });
    io.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      stopRef.current = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect(); io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef} aria-hidden="true"
      className={[styles.canvas, className].filter(Boolean).join(' ')}
      style={{ ...(opacity !== 1 ? { opacity } : {}), ...(blurPx > 0 ? { filter: `blur(${blurPx}px)` } : {}) }}
    />
  );
}
