/**
 * V3 — "Flow" — Curved bezier paths + orbital rings
 *
 * • Quadratic bezier curved connections between nodes
 * • Each node has a slowly rotating orbit arc (45° arc on outer ring)
 * • Pulses travel along the curves (interpolated at t)
 * • Cyan primary colour for pulses (brand accent)
 * • Lines start/end at circle perimeter — never inside circles
 * • Organic, neural-network feel
 */
import { useEffect, useRef } from 'react';
import {
  TOOLS, EDGES,
  clipEdge, bezierAt, bezierControl,
  drawLogoOrInitial, preloadLogos,
} from './toolsData';
import styles from './NetworkBg.module.css';

export interface NetworkBgV3Props {
  opacity?: number;
  blurPx?: number;
  className?: string;
}

export function NetworkBgV3({ opacity = 1, blurPx = 0, className }: NetworkBgV3Props) {
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

    // Bezier curve direction: alternates per edge
    const edgeSigns = EDGES.map((_, i) => (i % 2 === 0 ? 1 : -1));

    // One pulse per edge with a short trail (last 6 positions)
    const pulses = EDGES.map(([fi, ti], i) => ({
      fi, ti,
      t: i * (1 / EDGES.length),
      speed: 0.0007 + (fi + ti) * 0.00008,
      trail: [] as { x: number; y: number }[],
      sign: edgeSigns[i],
    }));

    let tick = 0;

    function draw() {
      if (stopRef.current || !ctx || !W || !H) return;
      ctx.clearRect(0, 0, W, H);
      tick++;

      const dark = document.documentElement.getAttribute('data-color-scheme') !== 'light';
      const lineCol    = dark ? 'rgba(255,255,255,0.20)' : 'rgba(8,14,30,0.13)';
      const fillCol    = dark ? 'rgba(255,255,255,0.04)' : 'rgba(8,14,30,0.03)';
      const ringCol    = dark ? 'rgba(255,255,255,0.28)' : 'rgba(8,14,30,0.20)';
      const orbitCol   = dark ? 'rgba(38,203,245,0.35)' : 'rgba(0,127,168,0.28)';
      const pulseMain  = dark ? 'rgba(38,203,245,0.85)' : 'rgba(0,127,168,0.80)';
      const pulseGlow  = dark ? 'rgba(38,203,245,0.55)' : 'rgba(0,127,168,0.40)';

      const nodes = TOOLS.map(t => ({
        ...t,
        x: t.bx * W + Math.sin(tick * 0.0022 + t.phase) * t.r * 0.50,
        y: t.by * H + Math.cos(tick * 0.0028 + t.phase * 1.2) * t.r * 0.38,
      }));

      // ── Bezier edges ────────────────────────────────────────────────
      ctx.strokeStyle = lineCol;
      ctx.lineWidth = 1;
      EDGES.forEach(([fi, ti], idx) => {
        const a = nodes[fi], b = nodes[ti];
        const pts = clipEdge(a.x, a.y, a.r, b.x, b.y, b.r);
        if (!pts) return;
        const { cx, cy } = bezierControl(pts.x1, pts.y1, pts.x2, pts.y2, edgeSigns[idx], 38);
        ctx.beginPath();
        ctx.moveTo(pts.x1, pts.y1);
        ctx.quadraticCurveTo(cx, cy, pts.x2, pts.y2);
        ctx.stroke();
      });

      // ── Pulses with trail ────────────────────────────────────────────
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const a = nodes[p.fi], b = nodes[p.ti];
        const pts = clipEdge(a.x, a.y, a.r, b.x, b.y, b.r);
        if (!pts) { p.trail = []; continue; }

        const { cx, cy } = bezierControl(pts.x1, pts.y1, pts.x2, pts.y2, p.sign, 38);

        // Map t from edge-space [0..1] onto the clipped segment
        // (approximate: treat the clipped segment as the full bezier)
        const pos = bezierAt(pts.x1, pts.y1, cx, cy, pts.x2, pts.y2, p.t);
        p.trail.unshift(pos);
        if (p.trail.length > 6) p.trail.pop();

        // Trail
        p.trail.forEach((pt, i) => {
          if (i === 0) return;
          const alpha = (1 - i / 6) * 0.35;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(38,203,245,${alpha})`;
          ctx.fill();
        });

        // Glow
        const gr = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 9);
        gr.addColorStop(0, pulseGlow);
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();

        // Core
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = pulseMain; ctx.fill();
      }

      // ── Nodes with orbit ring ─────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const outerR = n.r + 7;
        const orbitAngle = tick * 0.015 + i * 1.2;

        // Orbit arc (45°)
        ctx.beginPath();
        ctx.arc(n.x, n.y, outerR, orbitAngle, orbitAngle + Math.PI * 0.25);
        ctx.strokeStyle = orbitCol;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Node fill
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = fillCol; ctx.fill();

        // Border
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.strokeStyle = ringCol; ctx.lineWidth = 1.2; ctx.stroke();

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
