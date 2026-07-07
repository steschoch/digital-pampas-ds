// ── Shared data & utilities for all NetworkBg variants ──────────────────────

export interface ToolNode {
  id: string;
  label: string;
  color: string;        // brand hex color
  initial: string;
  logo: string;         // path relative to /public
  keepColor?: boolean;  // skip brightness filter — logo already has correct colors
  logoScale?: number;   // multiplier for logo size inside the circle (default 1.0)
  bx: number;           // normalised x desktop [0,1]
  by: number;           // normalised y desktop [0,1]
  byTablet?: number;    // normalised y override for iPad (≤1024px) — clusters nodes near the diagram
  phase: number;        // drift phase offset
  r: number;            // node radius (px)
}

// Nodes are biased to the right side (≥0.44 bx) so the Hero CSS mask
// reveals them only behind the diagram column.
export const TOOLS: readonly ToolNode[] = [
  { id: 'clay',      label: 'Clay',      color: '#7C3AED', initial: 'C',  logo: '/logos/clay-icon-2.png', keepColor: true, logoScale: 0.70, bx: 0.52, by: 0.18, byTablet: 0.32, phase: 0.0, r: 24 },
  { id: 'apollo',    label: 'Apollo',    color: '#1E4DB7', initial: 'A',  logo: '/logos/apollo-icon.png',                             bx: 0.74, by: 0.14, byTablet: 0.24, phase: 1.1, r: 24 },
  { id: 'n8n',       label: 'n8n',       color: '#EA4B71', initial: 'n8', logo: '/logos/n8n.png',                                     bx: 0.83, by: 0.22, byTablet: 0.40, phase: 2.2, r: 24 },
  { id: 'instantly', label: 'Instantly', color: '#3B6CF4', initial: 'I',  logo: '/logos/instantly-icon.png',                          bx: 0.87, by: 0.52,                phase: 3.3, r: 24 },
  { id: 'make',      label: 'Make',      color: '#7B3FE4', initial: 'M',  logo: '/logos/make-nobg.png',           logoScale: 1.30,    bx: 0.86, by: 0.70,                phase: 4.4, r: 24 },
  { id: 'lemlist',   label: 'Lemlist',   color: '#059669', initial: 'L',  logo: '/logos/lemlist-icon.png',        logoScale: 0.70,    bx: 0.50, by: 0.84, byTablet: 0.70, phase: 0.7, r: 24 },
  { id: 'apify',     label: 'Apify',     color: '#00C2A8', initial: 'Ap', logo: '/logos/apify-icon.png',                              bx: 0.44, by: 0.54,                phase: 1.9, r: 24 },
  { id: 'claude',    label: 'Claude',    color: '#D97757', initial: 'Cl', logo: '/logos/claude-icon.png',                              bx: 0.72, by: 0.83, byTablet: 0.68, phase: 3.1, r: 24 },
];

// Graph connectivity — [fromIndex, toIndex]
// Claude is index 7
export const EDGES: readonly [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],
  [0,3],[1,4],[0,5],[1,6],
  [7,0],[7,1],[7,3],[7,6],
];

/** Returns start/end points on the circle PERIMETERS (not centers).
 *  Returns null if nodes overlap — those edges are skipped. */
export function clipEdge(
  ax: number, ay: number, ar: number,
  bx: number, by: number, br: number,
  gap = 3,
): { x1: number; y1: number; x2: number; y2: number } | null {
  const dx = bx - ax, dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < ar + br + gap * 2) return null;
  const nx = dx / dist, ny = dy / dist;
  return {
    x1: ax + nx * (ar + gap),
    y1: ay + ny * (ar + gap),
    x2: bx - nx * (br + gap),
    y2: by - ny * (br + gap),
  };
}

/** Quadratic bezier position at t ∈ [0,1] */
export function bezierAt(
  x1: number, y1: number,
  cx: number, cy: number,
  x2: number, y2: number,
  t: number,
): { x: number; y: number } {
  const mt = 1 - t;
  return {
    x: mt * mt * x1 + 2 * mt * t * cx + t * t * x2,
    y: mt * mt * y1 + 2 * mt * t * cy + t * t * y2,
  };
}

/** Control point offset perpendicular to the midpoint of an edge */
export function bezierControl(
  x1: number, y1: number,
  x2: number, y2: number,
  sign: number,  // +1 or -1
  curvature = 40,
): { cx: number; cy: number } {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    cx: mx + (-dy / len) * curvature * sign,
    cy: my + ( dx / len) * curvature * sign,
  };
}

export function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Draw a tool logo or fallback initial.
 *  - keepColor nodes: drawn as-is (no filter) — logo already has the right colors
 *  - other nodes: brightness(0) invert(1) to turn logo white
 *  - wordmarks (aspect > 2.2): skip image, draw initial letter instead */
export function drawLogoOrInitial(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | undefined,
  x: number, y: number, r: number,
  initial: string,
  isDark: boolean,
  keepColor = false,
  logoScale = 1.0,
) {
  const clip = r * 0.78;

  // Wordmarks are unreadable in a small circle — fall back to initial
  const isWordmark = img && img.complete && img.naturalWidth > 0 &&
    (img.naturalWidth / img.naturalHeight) > 2.2;

  if (img && img.complete && img.naturalWidth > 0 && !isWordmark) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, clip, 0, Math.PI * 2);
    ctx.clip();
    if (!(keepColor && isDark)) {
      ctx.filter = isDark ? 'brightness(0) invert(1)' : 'brightness(0)';
    }
    ctx.globalAlpha = keepColor ? 0.90 : 0.82;
    // contain-fit with per-node scale
    const maxSize = clip * 1.55 * logoScale;
    const scale = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, x - dw / 2, y - dh / 2, dw, dh);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(8,14,30,0.72)';
    ctx.font = `600 ${Math.round(r * 0.50)}px "Space Grotesk",sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, x, y);
    ctx.restore();
  }
}

/** Load all tool logos into a map; images update in place when loaded */
export function preloadLogos(): Record<string, HTMLImageElement> {
  const map: Record<string, HTMLImageElement> = {};
  TOOLS.forEach(t => {
    const img = new Image();
    img.src = t.logo;
    map[t.id] = img;
  });
  return map;
}
