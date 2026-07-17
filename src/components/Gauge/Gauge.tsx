import styles from './Gauge.module.css'

export interface GaugeThresholds {
  /** Below this → error color; between warn and good → warning; ≥ good → success. */
  warn: number
  good: number
}

export interface GaugeProps {
  /** 0–100. */
  value: number
  label?: string
  thresholds?: GaugeThresholds
  size?: number
  className?: string
  /**
   * How to render the value in the center and in the aria-label:
   * - `'percent'` → "98%" / "…: 98%"
   * - `'ratio100'` → "92/100" / "…: 92 of 100"
   * - default → "92" / "…: 92 of 100"
   */
  format?: 'percent' | 'ratio100'
}

function colorFor(value: number, t?: GaugeThresholds): string {
  if (!t) return 'var(--dp-color-primary)'
  if (value >= t.good) return 'var(--dp-color-success)'
  if (value >= t.warn) return 'var(--dp-color-warning)'
  return 'var(--dp-color-error)'
}

/**
 * Gauge — radial 0–100 meter (270° arc). Color shifts by threshold band.
 * Pure SVG; colors via tokens.
 */
export function Gauge({ value, label, thresholds, size = 140, className, format }: GaugeProps) {
  const v = Math.max(0, Math.min(100, value))
  const stroke = Math.max(10, Math.round(size * 0.09))
  const r = (size - stroke) / 2
  const cx = size / 2
  const c = 2 * Math.PI * r
  const sweep = 0.75 // 270°
  const track = c * sweep
  const gap = c - track
  const valueDash = track * (v / 100)
  const color = colorFor(v, thresholds)
  const rounded = Math.round(v)
  const display = format === 'percent' ? `${rounded}%` : format === 'ratio100' ? `${rounded}/100` : `${rounded}`
  const ariaValue = format === 'percent' ? `${rounded}%` : `${rounded} of 100`

  // Fit the centered value inside the inner circle: scale with the gauge and shrink
  // for longer strings (e.g. "92/100" vs "92") so it never touches or clips against
  // the arc. ~0.62 approximates the display font's average char width in em.
  const innerWidth = size - stroke * 2
  const fontPx = Math.max(12, Math.min(size * 0.28, (innerWidth * 0.9) / (display.length * 0.62)))

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')} style={{ width: size }}>
      <div className={styles.chart} style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={`${label ?? 'Gauge'}: ${ariaValue}`}>
          <g transform={`rotate(135 ${cx} ${cx})`}>
            <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--dp-color-surface-container)" strokeWidth={stroke} strokeDasharray={`${track} ${gap}`} strokeLinecap="round" />
            <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${valueDash} ${c - valueDash}`} strokeLinecap="round" className={styles.value} />
          </g>
        </svg>
        <div className={styles.center}>
          <span className={styles.num} style={{ color, fontSize: `${fontPx}px` }}>{display}</span>
        </div>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
