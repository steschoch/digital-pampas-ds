import styles from './ThemeToggle.module.css'

export type ColorScheme = 'dark' | 'light'

export interface ThemeToggleProps {
  /** Current scheme (controlled). */
  scheme: ColorScheme
  /** Called when the user toggles. The app decides where to persist + apply. */
  onToggle: () => void
  className?: string
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="1.5" x2="10" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="16.5" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="10" x2="3.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.5" y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.93" y1="3.93" x2="5.34" y2="5.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14.66" y1="14.66" x2="16.07" y2="16.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.93" y1="16.07" x2="5.34" y2="14.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14.66" y1="5.34" x2="16.07" y2="3.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.5 10.925A7.5 7.5 0 0 1 9.075 2.5a7.5 7.5 0 1 0 8.425 8.425Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * ThemeToggle — standalone dark/light switch (controlled). Extracted from Nav so
 * Nav, the portal, and the showroom can share one toggle. The consumer applies
 * `data-color-scheme` on <html> and persists the choice.
 */
export function ThemeToggle({ scheme, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className={[styles.toggle, className].filter(Boolean).join(' ')}
      onClick={onToggle}
      aria-pressed={scheme === 'light'}
      aria-label={scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {scheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
