import styles from './Logo.module.css'

export type LogoVariant = 'full' | 'wordmark' | 'icon'

export interface LogoProps {
  /**
   * full     = icon + wordmark lockup (used in the Nav)
   * wordmark = wordmark only (used in the Footer)
   * icon     = the mark only
   */
  variant?: LogoVariant
  /** Rendered height in px (width auto, aspect preserved). */
  height?: number
  alt?: string
  className?: string
}

/** variant → asset base name in /logos/. Consumers must serve these assets. */
const ASSET: Record<LogoVariant, string> = {
  full: 'dp-logo',
  wordmark: 'dp-wordmark',
  icon: 'dp-icon',
}

/**
 * Logo — Digital Pampas logo. Theme-reactive: shows the white asset in dark
 * mode and the black asset in light mode (no JS — CSS keyed on data-color-scheme).
 * Assets ship with the package under /logos and must be served by the consumer.
 */
export function Logo({ variant = 'full', height = 24, alt = 'Digital Pampas', className }: LogoProps) {
  const base = ASSET[variant]
  return (
    <span className={[styles.logo, className].filter(Boolean).join(' ')} style={{ height }}>
      <img
        src={`/logos/${base}-white.png`}
        alt={alt}
        className={`${styles.img} ${styles.white}`}
        style={{ height }}
      />
      <img
        src={`/logos/${base}-black.png`}
        alt=""
        aria-hidden="true"
        className={`${styles.img} ${styles.black}`}
        style={{ height }}
      />
    </span>
  )
}
