import type { ReactNode } from 'react'
import { Skeleton } from '../Skeleton'
import styles from './StatCard.module.css'

export interface StatDelta {
  value: string
  direction: 'up' | 'down'
  /** Whether an "up" movement is good (default true). Drives the delta color. */
  positiveIsGood?: boolean
}

export interface StatCardProps {
  label: string
  value: string
  delta?: StatDelta
  /** Optional badge slot (e.g. a Badge "under 2%"). */
  badge?: ReactNode
  /** Optional slot below (e.g. a Sparkline). */
  children?: ReactNode
  loading?: boolean
  className?: string
}

/**
 * StatCard — KPI card: label, big value, optional delta (↑/↓ with good/bad
 * color), badge, and a slot (e.g. Sparkline). Renders skeletons when loading.
 */
export function StatCard({ label, value, delta, badge, children, loading, className }: StatCardProps) {
  if (loading) {
    return (
      <div className={[styles.card, className].filter(Boolean).join(' ')}>
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="rect" width="70%" height={32} />
        <Skeleton variant="text" width="40%" />
      </div>
    )
  }

  const good = delta ? (delta.direction === 'up') === (delta.positiveIsGood ?? true) : false

  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <span className={styles.value}>{value}</span>

      {delta && (
        <span className={`${styles.delta} ${good ? styles.deltaGood : styles.deltaBad}`}>
          <span aria-hidden="true">{delta.direction === 'up' ? '↑' : '↓'}</span> {delta.value}
        </span>
      )}

      {children && <div className={styles.slot}>{children}</div>}
    </div>
  )
}
