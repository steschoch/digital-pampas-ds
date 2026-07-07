import styles from './BarChart.module.css'

export interface BarItem {
  label: string
  value: number
  colorVar?: string
}

export interface BarChartProps {
  bars: BarItem[]
  orientation?: 'vertical' | 'horizontal'
  yFormat?: (v: number) => string
  height?: number
  ariaLabel?: string
  className?: string
}

/**
 * BarChart — comparisons/distributions as pure-SVG-free CSS bars. Colors via
 * tokens. Vertical (default) or horizontal.
 */
export function BarChart({
  bars,
  orientation = 'vertical',
  yFormat = (v) => String(v),
  height = 220,
  ariaLabel = 'Bar chart',
  className,
}: BarChartProps) {
  const max = Math.max(...bars.map((b) => b.value), 0) || 1

  return (
    <div
      className={[styles.wrap, orientation === 'horizontal' ? styles.horizontal : styles.vertical, className].filter(Boolean).join(' ')}
      style={orientation === 'vertical' ? { height } : undefined}
      role="img"
      aria-label={ariaLabel}
    >
      {bars.map((b) => {
        const pct = (b.value / max) * 100
        const color = b.colorVar ?? 'var(--dp-color-primary)'
        return (
          <div key={b.label} className={styles.item}>
            <div className={styles.track}>
              <div
                className={styles.bar}
                style={orientation === 'vertical' ? { height: `${pct}%`, background: color } : { width: `${pct}%`, background: color }}
                title={`${b.label}: ${yFormat(b.value)}`}
              />
            </div>
            <span className={styles.label}>{b.label}</span>
            <span className={styles.value}>{yFormat(b.value)}</span>
          </div>
        )
      })}
    </div>
  )
}
