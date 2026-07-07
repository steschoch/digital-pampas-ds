/**
 * V1 — "Ghost" — Monochrome minimal
 *
 * • Thin solid lines, alpha 22% — visible but quiet
 * • Lines start/end at circle edge (never inside)
 * • Nodes: transparent fill + thin white border + white logo
 * • Tiny dots travel along edges — no glow, clean
 * • Drift is slow and very subtle
 */
import { useEffect, useRef } from 'react';
import {
  TOOLS, EDGES,
  clipEdge, drawLogoOrInitial, preloadLogos,
} from './toolsData';
import styles from './NetworkBg.module.css';

export interface NetworkBgV1Props {
  opacity?: number;
  blurPx?: number;
  className?: string;
}

export function NetworkBgV1({ opacity = 1, blurPx = 0, className }: NetworkBgV1Props) {
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
      canvas.width  = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // One pulse per edge
    const pulses = EDGES.map(([fi, ti]) => ({
      fi, ti, t: Math.random(), speed: 0.0006 + fi * 0.00015,
    }));

    let tick = 0;

    function draw() {
      if (stopRef.current || !ctx || !W || !H) return;
      ctx.clearRect(0, 0, W, H);
      tick++;

      const dark = document.documentElement.getAttribute('data-color-scheme') !== 'light';
      const lineCol  = dark ? 'rgba(255,255,255,0.22)' : 'rgba(8,14,30,0.14)';
      const fillCol  = dark ? 'rgba(255,255,255,0.04)' : 'rgba(8,14,30,0.03)';
      const ringCol  = dark ? 'rgba(255,255,255,0.30)' : 'rgba(8,14,30,0.22)';
      const dotCol   = dark ? 'rgba(255,255,255,0.90)' : 'rgba(8,14,30,0.80)';

      // Drifting positions
      const nodes = TOOLS.map(t => ({
        ...t,
        x: t.bx * W + Math.sin(tick * 0.0025 + t.phase) * t.r * 0.4,
        y: t.by * H + Math.cos(tick * 0.003  + t.phase * 1.4) * t.r * 0.3,
      }));

      // ── Edges ──────────────────────────────────────────────────────
      ctx.strokeStyle = lineCol;
      ctx.lineWidth = 1;
      for (const [fi, ti] of EDGES) {
        const a = nodes[fi], b = nodes[ti];
        const pts = clipEdge(a.x, a.y, a.r, b.x, b.y, b.r);
        if (!pts) continue;
        ctx.beginPath();
        ctx.moveTo(pts.x1, pts.y1);
        ctx.lineTo(pts.x2, pts.y2);
        ctx.stroke();
      }

      // ── Pulses (tiny dots) ─────────────────────────────────────────
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const a = nodes[p.fi], b = nodes[p.ti];
        const pts = clipEdge(a.x, a.y, a.r, b.x, b.y, b.r);
        if (!pts) continue;
        const px = pts.x1 + (pts.x2 - pts.x1) * p.t;
        const py = pts.y1 + (pts.y2 - pts.y1) * p.t;
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = dotCol; ctx.fill();
      }

      // ── Nodes ──────────────────────────────────────────────────────
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = fillCol; ctx.fill();

        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.strokeStyle = ringCol; ctx.lineWidth = 1; ctx.stroke();

        drawLogoOrInitial(ctx, imgsRef.current[n.id], n.x, n.y, n.r, n.initial, dark, n.keepColor, n.logoScale);
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
      style={{ opacity, ...(blurPx > 0 ? { filter: `blur(${blurPx}px)` } : {}) }}
    />
  );
}
