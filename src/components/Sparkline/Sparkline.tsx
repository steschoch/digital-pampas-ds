import styles from './Sparkline.module.css'

export interface SparklineProps {
  points: number[]
  /** CSS color (token var). Default: --dp-color-primary. */
  colorVar?: string
  width?: number
  height?: number
  /** Fill the area under the line with a faint tint. */
  fill?: boolean
  className?: string
}

/**
 * Sparkline — tiny trend line (no axes, no tooltip) for use inside StatCard.
 * Pure SVG; color via a token var so dark/light works automatically.
 */
export function Sparkline({
  points,
  colorVar = 'var(--dp-color-primary)',
  width = 96,
  height = 28,
  fill = false,
  className,
}: SparklineProps) {
  if (points.length < 2) return null
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const stepX = width / (points.length - 1)
  const pad = 2
  const h = height - pad * 2

  const coords = points.map((p, i) => {
    const x = i * stepX
    const y = pad + h - ((p - min) / range) * h
    return [x, y] as const
  })

  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <svg
      className={[styles.sparkline, className].filter(Boolean).join(' ')}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {fill && <path d={area} fill={colorVar} opacity={0.12} />}
      <path d={line} fill="none" stroke={colorVar} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
