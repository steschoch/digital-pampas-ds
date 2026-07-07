import type { CSSProperties, ReactNode } from 'react'
import styles from './Card.module.css'

type CardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  variant?: 'default' | 'outlined' | 'elevated'
  onClick?: () => void
}

export function Card({ children, className, style, variant = 'default', onClick }: CardProps) {
  return (
    <div
      style={style}
      className={[
        styles.card,
        styles[variant],
        onClick ? styles.interactive : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}
