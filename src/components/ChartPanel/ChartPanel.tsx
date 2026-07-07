import type { ReactNode } from 'react'
import { Card } from '../Card'
import { Skeleton } from '../Skeleton'
import { EmptyState } from '../EmptyState'
import styles from './ChartPanel.module.css'

export interface ChartLegendItem {
  label: string
  colorVar: string
}

export interface ChartPanelProps {
  title: string
  legend?: ChartLegendItem[]
  /** Optional action slot (e.g. a Button or Select). */
  action?: ReactNode
  children: ReactNode
  loading?: boolean
  /** When true, shows a built-in empty state instead of children. */
  empty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

/**
 * ChartPanel — standard framing for a chart: header (title + legend + action)
 * over a Card, with built-in loading (skeleton) and empty states.
 */
export function ChartPanel({
  title,
  legend,
  action,
  children,
  loading,
  empty,
  emptyTitle = 'No data yet',
  emptyDescription,
  className,
}: ChartPanelProps) {
  return (
    <Card className={[styles.panel, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.headerRight}>
          {legend && legend.length > 0 && (
            <ul className={styles.legend}>
              {legend.map((l) => (
                <li key={l.label} className={styles.legendItem}>
                  <span className={styles.swatch} style={{ background: l.colorVar }} aria-hidden="true" />
                  {l.label}
                </li>
              ))}
            </ul>
          )}
          {action && <div className={styles.action}>{action}</div>}
        </div>
      </div>

      <div className={styles.body}>
        {loading ? (
          <Skeleton variant="rect" width="100%" height={200} />
        ) : empty ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          children
        )}
      </div>
    </Card>
  )
}
