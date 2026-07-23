import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './CaseFlow.module.css'

export type CaseFlowNodeTone = 'default' | 'gate' | 'outcome'
export type CaseFlowEdgeTone = 'primary' | 'muted' | 'accent'

export interface CaseFlowNode {
  id: string
  /** Box heading (rendered uppercase). */
  title: string
  /** Bullet lines inside the box. */
  bullets?: string[]
  /** Small outlined chips in a grid (e.g. "6 signal agents", "V1…V9"). Used instead of bullets. */
  chips?: string[]
  /** 1-based grid row (top = 1). */
  row: number
  /** 1-based grid column (left = 1). */
  col: number
  tone?: CaseFlowNodeTone
}

export interface CaseFlowEdge {
  /** Source node id. */
  from: string
  /** Target node id. */
  to: string
  tone?: CaseFlowEdgeTone
}

export interface CaseFlowProps {
  nodes: CaseFlowNode[]
  edges: CaseFlowEdge[]
  /** Grid column count. Defaults to the max node col. */
  columns?: number
  /** Free-floating annotation above the diagram. */
  topNote?: string
  /** Free-floating annotation below the diagram. */
  bottomNote?: string
  once?: boolean
  threshold?: number
  /** When the same content repeats as text nearby, hide from screen readers. */
  decorative?: boolean
  className?: string
  'aria-label'?: string
}

interface Seg {
  x1: number
  y1: number
  x2: number
  y2: number
  len: number
  tone: CaseFlowEdgeTone
  order: number
}

/** Ray/rectangle border intersection from a box center along a unit direction. */
function borderPoint(cx: number, cy: number, hw: number, hh: number, dx: number, dy: number) {
  const tx = dx !== 0 ? hw / Math.abs(dx) : Infinity
  const ty = dy !== 0 ? hh / Math.abs(dy) : Infinity
  const t = Math.min(tx, ty)
  return { x: cx + dx * t, y: cy + dy * t }
}

/**
 * CaseFlow — the case-study "system map" as an animated flow diagram.
 *
 * Data-driven from boxes (title + bullets/chips, placed on a grid) and directed
 * edges. On scroll, the boxes reveal in flow order and real SVG arrows draw
 * between them along the exact path (arrows are the information here, so they stay).
 * Arrow geometry is measured from the live boxes, so it stays correct on any width
 * and collapses to a single column on mobile. Respects prefers-reduced-motion.
 *
 * Accent comes from --cf-accent (defaults to the DS primary); override per context,
 * e.g. --cf-accent: var(--case-hue-soft).
 */
export function CaseFlow({
  nodes,
  edges,
  columns,
  topNote,
  bottomNote,
  once = true,
  threshold = 0.25,
  decorative = false,
  className,
  'aria-label': ariaLabel = 'System flow diagram',
}: CaseFlowProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({})
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [segs, setSegs] = useState<Seg[]>([])
  const [playing, setPlaying] = useState(false)
  const markerId = useId().replace(/[:]/g, '')

  const cols = columns ?? Math.max(1, ...nodes.map((n) => n.col))
  const orderOf: Record<string, number> = {}
  nodes.forEach((n, i) => { orderOf[n.id] = i })

  // Measure boxes → recompute arrow segments (on mount, resize, layout change).
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const measure = () => {
      const base = canvas.getBoundingClientRect()
      setSize({ w: base.width, h: base.height })
      const rectOf = (id: string) => {
        const el = nodeRefs.current[id]
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          cx: r.left - base.left + r.width / 2,
          cy: r.top - base.top + r.height / 2,
          hw: r.width / 2,
          hh: r.height / 2,
        }
      }
      const next: Seg[] = []
      edges.forEach((e) => {
        const a = rectOf(e.from)
        const b = rectOf(e.to)
        if (!a || !b) return
        const dx = b.cx - a.cx
        const dy = b.cy - a.cy
        const dist = Math.hypot(dx, dy) || 1
        const ux = dx / dist
        const uy = dy / dist
        const start = borderPoint(a.cx, a.cy, a.hw, a.hh, ux, uy)
        const rawEnd = borderPoint(b.cx, b.cy, b.hw, b.hh, -ux, -uy)
        const gap = 9 // pull back so the arrowhead sits just off the box
        const end = { x: rawEnd.x - ux * gap, y: rawEnd.y - uy * gap }
        const len = Math.hypot(end.x - start.x, end.y - start.y)
        next.push({
          x1: start.x, y1: start.y, x2: end.x, y2: end.y,
          len, tone: e.tone ?? 'primary', order: orderOf[e.from] ?? 0,
        })
      })
      setSegs(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(canvas)
    const raf = requestAnimationFrame(measure) // re-measure after fonts settle
    return () => { ro.disconnect(); cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges])

  // Play once when scrolled into view.
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true)
          if (once) io.disconnect()
        } else if (!once) {
          setPlaying(false)
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold])

  return (
    <figure
      className={[styles.flow, playing ? styles.playing : '', className].filter(Boolean).join(' ')}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : ariaLabel}
    >
      {topNote && <figcaption className={styles.noteTop}>{topNote}</figcaption>}

      <div ref={canvasRef} className={styles.canvas} style={{ '--cf-cols': cols } as CSSProperties}>
        <svg
          className={styles.edges}
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden="true"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="9"
              markerHeight="9"
              refX="6.5"
              refY="4.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0.5,0.5 L8.5,4.5 L0.5,8.5 Z" fill="context-stroke" />
            </marker>
          </defs>
          {segs.map((s, i) => (
            <line
              key={i}
              className={`${styles.edge} ${styles[`edge_${s.tone}`]}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              markerEnd={`url(#${markerId})`}
              style={{
                strokeDasharray: s.len,
                ['--cf-len']: s.len,
                transitionDelay: `calc(${s.order} * var(--cf-step) + var(--cf-step) * 0.7)`,
              } as CSSProperties}
            />
          ))}
        </svg>

        {nodes.map((n, i) => (
          <div
            key={n.id}
            ref={(el) => { nodeRefs.current[n.id] = el }}
            className={`${styles.node} ${n.tone ? styles[`node_${n.tone}`] : ''}`}
            style={{ ['--cf-r']: n.row, ['--cf-c']: n.col, transitionDelay: `calc(${i} * var(--cf-step))` } as CSSProperties}
          >
            <span className={styles.nodeTitle}>{n.title}</span>
            {n.chips && n.chips.length > 0 ? (
              <ul className={styles.chips}>
                {n.chips.map((c) => <li key={c} className={styles.chip}>{c}</li>)}
              </ul>
            ) : n.bullets && n.bullets.length > 0 ? (
              <ul className={styles.bullets}>
                {n.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      {bottomNote && <figcaption className={styles.noteBottom}>{bottomNote}</figcaption>}
    </figure>
  )
}
