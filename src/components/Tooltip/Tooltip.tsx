import type { ReactNode } from 'react'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  content: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
  className?: string
}

/**
 * Tooltip — floating hint shown on hover AND keyboard focus. CSS-driven (no JS
 * positioning); wrap a focusable element. Uses --dp-sem-shadow-tooltip.
 */
export function Tooltip({ content, side = 'top', children, className }: TooltipProps) {
  return (
    <span className={[styles.wrap, className].filter(Boolean).join(' ')}>
      {children}
      <span role="tooltip" className={`${styles.tip} ${styles[side]}`}>
        {content}
      </span>
    </span>
  )
}
