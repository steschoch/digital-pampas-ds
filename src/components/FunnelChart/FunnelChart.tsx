import styles from './FunnelChart.module.css'

export interface FunnelStage {
  label: string
  value: number
  colorVar?: string
}

export interface FunnelChartProps {
  stages: FunnelStage[]
  yFormat?: (v: number) => string
  ariaLabel?: string
  className?: string
}

/**
 * FunnelChart — decreasing horizontal bars for a qualification/conversion funnel,
 * with stage value and conversion % vs. the previous stage. Colors via tokens.
 */
export function FunnelChart({
  stages,
  yFormat = (v) => v.toLocaleString(),
  ariaLabel = 'Funnel chart',
  className,
}: FunnelChartProps) {
  const top = stages[0]?.value || 1

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')} role="img" aria-label={ariaLabel}>
      {stages.map((s, i) => {
        const pctOfTop = (s.value / top) * 100
        const conv = i === 0 ? null : Math.round((s.value / (stages[i - 1].value || 1)) * 100)
        const color = s.colorVar ?? 'var(--dp-color-primary)'
        return (
          <div key={s.label} className={styles.row}>
            <div className={styles.head}>
              <span className={styles.label}>{s.label}</span>
              <span className={styles.value}>{yFormat(s.value)}</span>
            </div>
            <div className={styles.track}>
              <div className={styles.bar} style={{ width: `${pctOfTop}%`, background: color }} title={`${s.label}: ${yFormat(s.value)}`} />
            </div>
            {conv !== null && (
              <span className={styles.conv}>↳ {conv}% from previous</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
