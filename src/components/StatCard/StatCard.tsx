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
  /**
   * 'hero' promotes this card to the protagonist metric of a view: bigger
   * number, roomier box. Use at most ONE per view — the point is that one
   * figure leads instead of a row of equals. Default: 'default'.
   */
  emphasis?: 'default' | 'hero'
  loading?: boolean
  className?: string
}

/**
 * StatCard — KPI card: label, big value, optional delta (↑/↓ with good/bad
 * color), badge, and a slot (e.g. Sparkline). Renders skeletons when loading.
 */
export function StatCard({ label, value, delta, badge, children, emphasis = 'default', loading, className }: StatCardProps) {
  const rootClass = [styles.card, emphasis === 'hero' ? styles.hero : '', className]
    .filter(Boolean)
    .join(' ')

  if (loading) {
    return (
      <div className={rootClass}>
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="rect" width="70%" height={emphasis === 'hero' ? 48 : 32} />
        <Skeleton variant="text" width="40%" />
      </div>
    )
  }

  const good = delta ? (delta.direction === 'up') === (delta.positiveIsGood ?? true) : false

  return (
    <div className={rootClass}>
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
