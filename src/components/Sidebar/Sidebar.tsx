import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { LinkRenderer } from '../BlogCard'
import styles from './Sidebar.module.css'

export interface SidebarItem {
  id: string
  label: string
  icon?: ReactNode
  href: string
  active?: boolean
}

export interface SidebarProps {
  items: SidebarItem[]
  logo?: ReactNode
  footer?: ReactNode
  collapsed?: boolean
  /** Router-agnostic link renderer (default: <a>). */
  renderLink?: LinkRenderer
  /** Mobile drawer open state (controlled). */
  mobileOpen?: boolean
  onMobileClose?: () => void
  ariaLabel?: string
  className?: string
}

const defaultRenderLink: LinkRenderer = ({ href, className, children, ...rest }) => (
  <a href={href} className={className} {...rest}>{children}</a>
)

/**
 * Sidebar — application side navigation. Expanded (~240px) / collapsed icons-only
 * (~64px) / mobile drawer (overlay + focus trap + Esc). Router-agnostic via renderLink.
 */
export function Sidebar({
  items,
  logo,
  footer,
  collapsed = false,
  renderLink = defaultRenderLink,
  mobileOpen = false,
  onMobileClose,
  ariaLabel = 'Sidebar',
  className,
}: SidebarProps) {
  const drawerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!mobileOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onMobileClose?.() }
    document.addEventListener('keydown', onKey)
    drawerRef.current?.querySelector<HTMLElement>('a,button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileOpen, onMobileClose])

  const list = (
    <ul className={styles.items} role="list">
      {items.map((item) => (
        <li key={item.id}>
          {renderLink({
            href: item.href,
            className: `${styles.item} ${item.active ? styles.itemActive : ''}`,
            'aria-label': collapsed ? item.label : undefined,
            children: (
              <>
                {item.icon && <span className={styles.icon} aria-hidden="true">{item.icon}</span>}
                <span className={styles.label}>{item.label}</span>
              </>
            ),
            ...(item.active ? { 'aria-current': 'page' } : {}),
          })}
        </li>
      ))}
    </ul>
  )

  const inner = (
    <>
      {logo && <div className={styles.logo}>{logo}</div>}
      <nav className={styles.nav} aria-label={ariaLabel}>{list}</nav>
      {footer && <div className={styles.footer}>{footer}</div>}
    </>
  )

  return (
    <>
      {/* Desktop / persistent */}
      <aside className={[styles.sidebar, collapsed ? styles.collapsed : '', className].filter(Boolean).join(' ')}>
        {inner}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={ariaLabel}>
          <div className={styles.backdrop} onClick={onMobileClose} aria-hidden="true" />
          <aside ref={drawerRef} className={`${styles.sidebar} ${styles.drawer}`}>
            {inner}
          </aside>
        </div>
      )}
    </>
  )
}
