import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './Timeline.module.css'

export type PhaseStatus = 'done' | 'active' | 'upcoming' | 'delayed'

export interface TimelinePhase {
  id: string
  label: string
  description?: string
  status: PhaseStatus
  plannedStart?: string
  plannedEnd?: string
  startedAt?: string
  completedAt?: string
  deliverables?: string[]
}

export interface TimelineProps {
  phases: TimelinePhase[]
  orientation?: 'horizontal' | 'vertical'
  /** 'minimal' = nodes only (fits tight cards); 'compact' = nodes + labels;
   *  'detailed' = labels + planned/actual dates + deliverables. */
  density?: 'minimal' | 'compact' | 'detailed'
  /**
   * Reveal done/active/delayed phases in sequence instead of showing them
   * instantly: they start looking "upcoming" (dotted, grey) and light up
   * left-to-right (or top-to-bottom) as the timeline scrolls into view.
   * Pending phases need no motion — they already read as "not done yet".
   * Plays once. Skipped under prefers-reduced-motion. Default: false.
   */
  animate?: boolean
  className?: string
}

function Node({ status }: { status: PhaseStatus }) {
  return (
    <span className={`${styles.node} ${styles[`node_${status}`]}`} aria-hidden="true">
      {status === 'done' && '✓'}
      {status === 'delayed' && '!'}
    </span>
  )
}

/**
 * Timeline — data-driven phase tracker. Horizontal/compact for overviews,
 * vertical/detailed (planned vs. actual dates + deliverables) for detail views.
 * Node states: done · active (pulsing ring, respects reduced-motion) · upcoming · delayed.
 */
export function Timeline({ phases, orientation = 'horizontal', density = 'compact', animate = false, className }: TimelineProps) {
  const isVertical = orientation === 'vertical'
  const isMinimal = density === 'minimal'

  const ref = useRef<HTMLOListElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!animate) return
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animate])

  return (
    <ol
      ref={ref}
      className={[
        styles.timeline,
        isVertical ? styles.vertical : styles.horizontal,
        density === 'detailed' ? styles.detailed : density === 'minimal' ? styles.minimal : styles.compact,
        animate ? styles.animate : '',
        animate && playing ? styles.playing : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {phases.map((p, i) => (
        <li key={p.id} className={styles.phase} style={{ '--i': i } as CSSProperties}>
          <div className={styles.track}>
            <Node status={p.status} />
            {i < phases.length - 1 && <span className={`${styles.connector} ${p.status === 'done' ? styles.connectorDone : ''}`} aria-hidden="true" />}
          </div>

          {!isMinimal && (
          <div className={styles.content}>
            <span className={styles.label}>{p.label}</span>
            <span className={`${styles.status} ${styles[`statusText_${p.status}`]}`}>{p.status}</span>

            {density === 'detailed' && (
              <div className={styles.detail}>
                {p.description && <p className={styles.description}>{p.description}</p>}
                {(p.plannedStart || p.startedAt) && (
                  <div className={styles.dates}>
                    {(p.plannedStart || p.plannedEnd) && (
                      <span className={styles.dateRow}>Planned: {p.plannedStart ?? '—'} → {p.plannedEnd ?? '—'}</span>
                    )}
                    {(p.startedAt || p.completedAt) && (
                      <span className={styles.dateRow}>Actual: {p.startedAt ?? '—'} → {p.completedAt ?? '—'}</span>
                    )}
                  </div>
                )}
                {p.deliverables && p.deliverables.length > 0 && (
                  <ul className={styles.deliverables}>
                    {p.deliverables.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                )}
              </div>
            )}
          </div>
          )}
        </li>
      ))}
    </ol>
  )
}
