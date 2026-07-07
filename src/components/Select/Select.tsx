import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  icon?: ReactNode
  description?: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string | null
  onChange: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md'
  disabled?: boolean
  'aria-label'?: string
  className?: string
}

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Select — single-choice dropdown (WAI-ARIA listbox). Keyboard: arrows to move,
 * Enter/Space to open/pick, Esc to close. Closes on outside click.
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  size = 'md',
  disabled,
  'aria-label': ariaLabel,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value) ?? null

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  useEffect(() => {
    if (open) {
      const i = options.findIndex((o) => o.value === value)
      setActiveIndex(i >= 0 ? i : 0)
    }
  }, [open, value, options])

  const pick = (i: number) => {
    onChange(options[i].value)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => (i + 1) % options.length); return }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => (i - 1 + options.length) % options.length); return }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(activeIndex) }
  }

  return (
    <div ref={rootRef} className={[styles.root, styles[size], className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <span className={styles.triggerContent}>
          {selected?.icon && <span className={styles.optIcon}>{selected.icon}</span>}
          <span className={selected ? styles.value : styles.placeholder}>
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}><Chevron /></span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={ariaLabel} tabIndex={-1}>
          {options.map((opt, i) => {
            const isSelected = opt.value === value
            const isActive = i === activeIndex
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => pick(i)}
              >
                {opt.icon && <span className={styles.optIcon}>{opt.icon}</span>}
                <span className={styles.optText}>
                  <span className={styles.optLabel}>{opt.label}</span>
                  {opt.description && <span className={styles.optDesc}>{opt.description}</span>}
                </span>
                {isSelected && <span className={styles.check} aria-hidden="true">✓</span>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
