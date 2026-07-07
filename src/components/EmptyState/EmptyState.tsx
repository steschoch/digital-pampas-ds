import type { ReactNode } from 'react'
import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  /** Optional icon/illustration slot (e.g. a lucide icon). */
  icon?: ReactNode
  title: string
  description?: string
  /** Optional action slot (e.g. a Button). */
  action?: ReactNode
  className?: string
}

/**
 * EmptyState — centered placeholder for empty/blank views. Direct, on-brand tone.
 */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={[styles.empty, className].filter(Boolean).join(' ')} role="status">
      {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
