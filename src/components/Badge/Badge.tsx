import type { CSSProperties, ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'coral'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
  style?: CSSProperties
}

export function Badge({ children, variant = 'neutral', className, style }: BadgeProps) {
  return (
    <span
      className={[styles.badge, styles[variant], className ?? '']
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
    </span>
  )
}
