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
export function Timeline({ phases, orientation = 'horizontal', density = 'compact', className }: TimelineProps) {
  const isVertical = orientation === 'vertical'
  const isMinimal = density === 'minimal'

  return (
    <ol
      className={[
        styles.timeline,
        isVertical ? styles.vertical : styles.horizontal,
        density === 'detailed' ? styles.detailed : density === 'minimal' ? styles.minimal : styles.compact,
        className,
      ].filter(Boolean).join(' ')}
    >
      {phases.map((p, i) => (
        <li key={p.id} className={styles.phase}>
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
