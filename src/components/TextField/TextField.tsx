import { useId } from 'react'
import type { ReactNode } from 'react'
import styles from './TextField.module.css'

export interface TextFieldProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  helpText?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  /** Visual style: standard, or a mono "terminal" look with a `>` prompt. */
  variant?: 'default' | 'terminal'
  /** Optional trailing slot (e.g. a reveal-password button). */
  trailing?: ReactNode
  autoComplete?: string
  name?: string
  className?: string
}

/**
 * TextField — labelled text/password input with help/error text and an optional
 * "terminal" variant. Label is always associated; errors are announced.
 */
export function TextField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  helpText,
  placeholder,
  required,
  disabled,
  variant = 'default',
  trailing,
  autoComplete,
  name,
  className,
}: TextFieldProps) {
  const id = useId()
  const describedById = error ? `${id}-error` : helpText ? `${id}-help` : undefined

  return (
    <div className={[styles.field, variant === 'terminal' ? styles.terminal : '', className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>

      <div className={`${styles.inputWrap} ${error ? styles.inputWrapError : ''} ${disabled ? styles.inputWrapDisabled : ''}`}>
        {variant === 'terminal' && <span className={styles.prompt} aria-hidden="true">&gt;</span>}
        <input
          id={id}
          name={name}
          type={type}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedById}
        />
        {trailing && <span className={styles.trailing}>{trailing}</span>}
      </div>

      {error ? (
        <p id={`${id}-error`} className={styles.error}>{error}</p>
      ) : helpText ? (
        <p id={`${id}-help`} className={styles.help}>{helpText}</p>
      ) : null}
    </div>
  )
}
