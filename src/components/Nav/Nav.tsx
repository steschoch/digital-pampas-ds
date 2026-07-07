import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Nav.module.css'

type ColorScheme = 'dark' | 'light'

export interface NavLink {
  label: string
  href: string
  type: 'anchor' | 'page' | 'external'
}

export interface NavProps {
  /** Nav links. Defaults to the Digital Pampas set. */
  links?: NavLink[]
  /** Logo image (dark theme) served by the consuming app. */
  logoSrc?: string
  /** Logo image (light theme). */
  logoLightSrc?: string
  ctaLabel?: string
  /** In-page anchor for the CTA (prefixed with "/" off the home page). */
  ctaAnchor?: string
  /**
   * Current route path. Consumers using a router should pass their reactive
   * path (e.g. `useLocation().pathname`). The DS does NOT depend on a router.
   */
  pathname?: string
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'How it works', href: '#how-it-works', type: 'anchor' },
  { label: 'Process', href: '#ways', type: 'anchor' },
  { label: 'Cases', href: '/case-studies', type: 'page' },
  { label: 'About', href: '#about', type: 'anchor' },
  { label: 'Blog', href: '/blog', type: 'page' },
]

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

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Nav — sticky primary navigation with theme toggle, active-anchor tracking,
 * and an accessible mobile overlay (focus trap + Esc). Router-agnostic: pass
 * `pathname` from your router for reactive route awareness.
 */
export function Nav({
  links = DEFAULT_LINKS,
  logoSrc = '/logo-nav.png',
  logoLightSrc = '/logo-nav-light.png',
  ctaLabel = 'Book a call',
  ctaAnchor = '#book-call',
  pathname,
}: NavProps) {
  const path = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const isHome = path === '/'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const [activeAnchor, setActiveAnchor] = useState('')

  const overlayRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('dp-theme') as ColorScheme | null
    if (saved === 'light' || saved === 'dark') setColorScheme(saved)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorScheme)
    localStorage.setItem('dp-theme', colorScheme)
  }, [colorScheme])

  useEffect(() => {
    const anchorIds = links.filter((l) => l.type === 'anchor').map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveAnchor('#' + e.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    anchorIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [links])

  useEffect(() => {
    if (!menuOpen) return
    const overlay = overlayRef.current
    document.body.style.overflow = 'hidden'

    const focusable = overlay?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    firstFocusRef.current = focusable?.[0] ?? null
    firstFocusRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (e.key === 'Tab' && overlay) {
        const all = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
        if (!all.length) return
        const first = all[0]
        const last = all[all.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setMenuOpen(false)
      if (!isHome) {
        window.location.href = '/' + href
        return
      }
      const target = document.querySelector(href)
      target?.scrollIntoView({ behavior: 'smooth' })
    },
    [isHome],
  )

  const toggleTheme = () => setColorScheme((s) => (s === 'dark' ? 'light' : 'dark'))

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  const ctaHref = isHome ? ctaAnchor : '/' + ctaAnchor

  return (
    <>
      <nav className={[styles.nav, scrolled ? styles.scrolled : ''].join(' ')} aria-label="Primary">
        <div className={styles.container}>
          <a href="/" className={styles.wordmark} aria-label="Digital Pampas, home">
            <img src={colorScheme === 'light' ? logoLightSrc : logoSrc} alt="Digital Pampas" className={styles.logoImg} />
          </a>

          <ul className={styles.links} role="list">
            {links.map((link) => {
              const isActive = link.type === 'anchor' && activeAnchor === link.href
              const isExternal = link.type === 'external'
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={[styles.link, isActive ? styles.linkActive : '', isExternal ? styles.linkExternal : ''].join(' ')}
                    aria-current={isActive ? 'true' : undefined}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : link.type === 'anchor'
                        ? { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, link.href) }
                        : {})}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={toggleTheme}
              aria-pressed={colorScheme === 'light'}
              aria-label={colorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <a href={ctaHref} className={styles.cta}>{ctaLabel}</a>

            <button
              ref={menuButtonRef}
              className={styles.hamburger}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="dp-mobile-menu"
              aria-label="Open navigation menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div id="dp-mobile-menu" ref={overlayRef} className={styles.overlay} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className={styles.overlayHeader}>
            <a href="/" className={styles.wordmark} onClick={() => setMenuOpen(false)} aria-label="Digital Pampas, home">
              <img src={colorScheme === 'light' ? logoLightSrc : logoSrc} alt="Digital Pampas" className={styles.logoImg} />
            </a>
            <button className={styles.iconBtn} onClick={closeMenu} aria-label="Close navigation menu">
              <CloseIcon />
            </button>
          </div>

          <ul className={styles.overlayLinks} role="list">
            {links.map((link, i) => (
              <li key={link.href} className={styles.overlayItem} style={{ '--delay': `${i * 60 + 80}ms` } as React.CSSProperties}>
                <a
                  href={link.href}
                  className={[styles.overlayLink, link.type === 'external' ? styles.overlayLinkExternal : ''].join(' ')}
                  {...(link.type === 'external'
                    ? { target: '_blank', rel: 'noopener noreferrer', onClick: () => setMenuOpen(false) }
                    : link.type === 'anchor'
                      ? { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, link.href) }
                      : { onClick: () => setMenuOpen(false) })}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.overlayFooter}>
            <a href={ctaHref} className={styles.ctaOverlay} onClick={() => setMenuOpen(false)}>{ctaLabel}</a>
          </div>
        </div>
      )}
    </>
  )
}
