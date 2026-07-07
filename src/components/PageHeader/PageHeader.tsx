import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

export interface PageHeaderProps {
  /** Main page title. */
  title: ReactNode
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode
  /** Supporting line below the title. */
  subtitle?: ReactNode
  /** Right-aligned slot — e.g. a `<LastSync>` indicator or an action button. */
  aside?: ReactNode
  className?: string
}

/**
 * PageHeader — consistent page title block (eyebrow + title + subtitle + aside slot).
 * Pure layout/composition; router- and data-agnostic.
 */
export function PageHeader({ title, eyebrow, subtitle, aside, className }: PageHeaderProps) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(' ')}>
      <div className={styles.titles}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {aside && <div>{aside}</div>}
    </div>
  )
}

export interface LastSyncProps {
  /** The freshness value, e.g. "2h ago". */
  label: string
  /** Prefix before the label. Default: "Last sync:". */
  prefix?: string
}

/** LastSync — data-freshness indicator (a live dot + "Last sync: …"). */
export function LastSync({ label, prefix = 'Last sync:' }: LastSyncProps) {
  return (
    <span className={styles.sync}>
      <span className={styles.syncDot} aria-hidden="true" />
      {prefix} {label}
    </span>
  )
}
