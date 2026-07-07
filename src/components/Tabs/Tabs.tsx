import { useRef } from 'react'
import styles from './Tabs.module.css'

export interface TabItem {
  id: string
  label: string
  count?: number
}

export interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  className?: string
  'aria-label'?: string
}

/**
 * Tabs — local filter/navigation tabs with a sliding cyan underline and a
 * neutral count badge. WAI-ARIA tablist with arrow-key navigation.
 */
export function Tabs({ tabs, active, onChange, className, 'aria-label': ariaLabel }: TabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' ? 1 : -1
    const next = (index + dir + tabs.length) % tabs.length
    const nextId = tabs[next].id
    onChange(nextId)
    refs.current[nextId]?.focus()
  }

  return (
    <div className={[styles.tablist, className].filter(Boolean).join(' ')} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab, i) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            ref={(el) => { refs.current[tab.id] = el }}
            role="tab"
            type="button"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={styles.label}>{tab.label}</span>
            {typeof tab.count === 'number' && <span className={styles.count}>{tab.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
