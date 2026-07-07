import styles from './LineChart.module.css'

export interface LineSeries {
  label: string
  /** CSS color token var, e.g. 'var(--dp-color-primary)'. */
  colorVar: string
  points: { date: string; value: number }[]
}

export interface LineChartProps {
  series: LineSeries[]
  height?: number
  /** Format a y value for the axis + tooltips. */
  yFormat?: (v: number) => string
  showGrid?: boolean
  showDots?: boolean
  /** Accessible description of the chart. */
  ariaLabel?: string
  className?: string
}

const PAD_L = 44
const PAD_R = 12
const PAD_T = 12
const PAD_B = 26
const VW = 640

/**
 * LineChart — 1–3 time series as pure SVG (no external lib). Colors via tokens
 * (auto dark/light). Native hover tooltips on dots; sr-only data table for a11y.
 */
export function LineChart({
  series,
  height = 240,
  yFormat = (v) => String(v),
  showGrid = true,
  showDots = true,
  ariaLabel = 'Line chart',
  className,
}: LineChartProps) {
  const n = series[0]?.points.length ?? 0
  if (n < 2) return null

  const all = series.flatMap((s) => s.points.map((p) => p.value))
  const min = Math.min(...all, 0)
  const max = Math.max(...all)
  const range = max - min || 1

  const plotW = VW - PAD_L - PAD_R
  const plotH = height - PAD_T - PAD_B
  const stepX = plotW / (n - 1)

  const x = (i: number) => PAD_L + i * stepX
  const y = (v: number) => PAD_T + plotH - ((v - min) / range) * plotH

  const ticks = 4
  const gridLines = Array.from({ length: ticks + 1 }, (_, i) => min + (range * i) / ticks)
  const dates = series[0].points.map((p) => p.date)

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <svg viewBox={`0 0 ${VW} ${height}`} width="100%" height={height} role="img" aria-label={ariaLabel} preserveAspectRatio="none">
        {/* grid + y labels */}
        {showGrid && gridLines.map((v, i) => {
          const gy = y(v)
          return (
            <g key={i}>
              <line x1={PAD_L} y1={gy} x2={VW - PAD_R} y2={gy} className={styles.grid} />
              <text x={PAD_L - 8} y={gy + 3} textAnchor="end" className={styles.axisLabel}>{yFormat(v)}</text>
            </g>
          )
        })}

        {/* x labels (first, middle, last) */}
        {[0, Math.floor((n - 1) / 2), n - 1].map((i) => (
          <text key={i} x={x(i)} y={height - 8} textAnchor="middle" className={styles.axisLabel}>{dates[i]}</text>
        ))}

        {/* series */}
        {series.map((s) => {
          const d = s.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ')
          return (
            <g key={s.label}>
              <path d={d} fill="none" stroke={s.colorVar} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              {showDots && s.points.map((p, i) => (
                <circle key={i} cx={x(i)} cy={y(p.value)} r={2.5} fill={s.colorVar}>
                  <title>{`${s.label} · ${p.date}: ${yFormat(p.value)}`}</title>
                </circle>
              ))}
            </g>
          )
        })}
      </svg>

      {/* Accessible data table */}
      <table className={styles.srOnly}>
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th>Date</th>
            {series.map((s) => <th key={s.label}>{s.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {dates.map((date, i) => (
            <tr key={date}>
              <td>{date}</td>
              {series.map((s) => <td key={s.label}>{yFormat(s.points[i]?.value ?? 0)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
