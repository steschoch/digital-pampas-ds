import { useEffect, useState } from 'react'
import type { ReactNode, Ref } from 'react'
import styles from './TopBar.module.css'

export interface TopBarProps {
  /** Left slot — e.g. context selectors (ClientSelector/CampaignSelector). */
  leading?: ReactNode
  /** Right slot — e.g. theme toggle, user menu. */
  trailing?: ReactNode
  /** Mobile hamburger handler (opens the Sidebar drawer). */
  onMenuClick?: () => void
  /**
   * Ref to the hamburger. Closing a drawer must return focus to the control that
   * opened it, otherwise the keyboard user lands back at the top of the document
   * (WCAG 2.4.3). Hold this ref in the consumer and focus it on close.
   */
  menuButtonRef?: Ref<HTMLButtonElement>
  /** Accessible name of the hamburger. Default: "Open menu". */
  menuButtonLabel?: string
  /** Drawer state, exposed as `aria-expanded` on the hamburger. */
  menuExpanded?: boolean
  className?: string
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

/**
 * TopBar — application top bar. Sticky, gains a shadow on scroll. Left slot for
 * context selectors, right slot for actions; a hamburger appears on mobile.
 */
export function TopBar({
  leading,
  trailing,
  onMenuClick,
  menuButtonRef,
  menuButtonLabel = 'Open menu',
  menuExpanded,
  className,
}: TopBarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={[styles.topbar, scrolled ? styles.scrolled : '', className].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        {onMenuClick && (
          <button
            type="button"
            ref={menuButtonRef}
            className={styles.menuBtn}
            onClick={onMenuClick}
            aria-label={menuButtonLabel}
            aria-expanded={menuExpanded}
          >
            <MenuIcon />
          </button>
        )}
        {leading}
      </div>
      <div className={styles.right}>{trailing}</div>
    </header>
  )
}
