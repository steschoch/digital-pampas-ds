import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle'
  width?: number | string
  height?: number | string
  /** For variant="text": render N stacked lines (last one shorter). */
  lines?: number
  className?: string
}

/**
 * Skeleton — loading placeholder with a subtle shimmer (disabled under
 * prefers-reduced-motion). Decorative: always aria-hidden.
 */
export function Skeleton({ variant = 'text', width, height, lines = 1, className }: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <span className={[styles.stack, className].filter(Boolean).join(' ')} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={`${styles.skeleton} ${styles.text}`}
            style={{ width: i === lines - 1 ? '70%' : (width ?? '100%') }}
          />
        ))}
      </span>
    )
  }

  const style: CSSProperties = { width, height }
  return (
    <span
      className={[styles.skeleton, styles[variant], className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    />
  )
}
