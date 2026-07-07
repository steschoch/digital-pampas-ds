import styles from './DonutChart.module.css'

export interface DonutSegment {
  label: string
  value: number
  /** CSS color token var. */
  colorVar: string
}

export interface DonutChartProps {
  segments: DonutSegment[]
  centerLabel?: string
  centerValue?: string
  size?: number
  ariaLabel?: string
  className?: string
}

/**
 * DonutChart — proportions as a pure-SVG ring with a centered total and a
 * legend (absolute value + %). Colors via tokens (auto dark/light).
 */
export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 160,
  ariaLabel = 'Donut chart',
  className,
}: DonutChartProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1
  const stroke = Math.max(12, Math.round(size * 0.14))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const cx = size / 2

  let offset = 0
  const arcs = segments.map((seg) => {
    const frac = seg.value / total
    const dash = frac * c
    const arc = { ...seg, dash, gap: c - dash, offset: -offset * c, pct: Math.round(frac * 100) }
    offset += frac
    return arc
  })

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <div className={styles.chart} style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={ariaLabel}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--dp-color-surface-container)" strokeWidth={stroke} />
          <g transform={`rotate(-90 ${cx} ${cx})`}>
            {arcs.map((a) => (
              <circle
                key={a.label}
                cx={cx}
                cy={cx}
                r={r}
                fill="none"
                stroke={a.colorVar}
                strokeWidth={stroke}
                strokeDasharray={`${a.dash} ${a.gap}`}
                strokeDashoffset={a.offset}
                strokeLinecap="butt"
              >
                <title>{`${a.label}: ${a.value} (${a.pct}%)`}</title>
              </circle>
            ))}
          </g>
        </svg>
        {(centerValue || centerLabel) && (
          <div className={styles.center}>
            {centerValue && <span className={styles.centerValue}>{centerValue}</span>}
            {centerLabel && <span className={styles.centerLabel}>{centerLabel}</span>}
          </div>
        )}
      </div>

      <ul className={styles.legend}>
        {arcs.map((a) => (
          <li key={a.label} className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: a.colorVar }} aria-hidden="true" />
            <span className={styles.legendLabel}>{a.label}</span>
            <span className={styles.legendValue}>{a.value} · {a.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
