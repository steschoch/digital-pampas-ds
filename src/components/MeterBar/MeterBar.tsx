import type { ReactNode } from 'react'
import styles from './MeterBar.module.css'

export type MeterBarTone = 'auto' | 'neutral' | 'success' | 'warning' | 'error'

export interface MeterBarProps {
  /** Metric name, e.g. "Reply rate". */
  label: string
  /** Current value, in the metric's own unit. */
  value: number
  /**
   * The benchmark this metric is held to. Drives the target marker, the tone and
   * the "target …" note. Omit for metrics that have no goal (pure volume).
   */
  target?: number
  /** `'higher'` (default): above target is good. `'lower'`: below target is good (bounce rate). */
  better?: 'higher' | 'lower'
  /**
   * End of the scale. Defaults to `target * 1.5`: rows left on the default share
   * a ruler, so their markers land at the same x and the group reads as "who
   * cleared the line". Pass an explicit `max` for metrics with a natural ceiling
   * (a percentage of a whole is honest only on a 0–100 ruler).
   */
  max?: number
  /** Formats value and target for display. Default: `String(v)`. */
  format?: (v: number) => string
  /** Overrides the auto-generated note (default: `target {formatted target}`). */
  targetLabel?: string
  /** Extra note shown after the target (e.g. a qualitative band like "Strong"). */
  note?: ReactNode
  /** `'lead'` enlarges the value: use on the ONE metric that leads the group. */
  emphasis?: 'default' | 'lead'
  /**
   * Bar color. `'auto'` (default) keeps on-target bars neutral and colors only
   * the misses, so color signals exception rather than decorating everything.
   */
  tone?: MeterBarTone
  className?: string
}

export interface MeterListProps {
  children: ReactNode
  className?: string
}

/**
 * MeterList — the container a stack of MeterBars belongs in.
 *
 * Each bar on its own is an independent grid, so its four columns size to its
 * own content and the target markers land at different x positions — which
 * destroys the one thing this layout is for. Inside a MeterList the rows
 * collapse into the list's grid (`display: contents`), so every row shares one
 * set of columns: values right-align into a column, tracks start and end
 * together, and the markers line up into a single vertical reference.
 */
export function MeterList({ children, className }: MeterListProps) {
  // Two elements on purpose: the outer one is the query container and the inner
  // one is the grid it resizes. A container cannot query itself, so a single
  // element would never restack — the failure looks like labels collapsing to
  // nothing and the note spilling out of the card on narrow screens.
  return (
    <div className={[styles.listOuter, className].filter(Boolean).join(' ')}>
      <div className={styles.list}>{children}</div>
    </div>
  )
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * MeterBar — one metric as a single line: label, value, a track with the value
 * bar and a target marker, and the benchmark in words.
 *
 * It is a compact bullet chart (Few, 2006): the alternative to a radial gauge
 * when several metrics must be read against their goals in the same glance.
 * A gauge spends a whole block on one number; this spends one line and still
 * carries value + goal + status.
 */
export function MeterBar({
  label,
  value,
  target,
  better = 'higher',
  max,
  format,
  targetLabel,
  note,
  emphasis = 'default',
  tone = 'auto',
  className,
}: MeterBarProps) {
  const fmt = format ?? ((v: number) => String(v))
  const hasTarget = typeof target === 'number' && Number.isFinite(target)

  const scaleMax = max ?? (hasTarget ? (target as number) * 1.5 : Math.max(value, 1))
  const valuePct = clamp01(value / scaleMax) * 100
  const targetPct = hasTarget ? clamp01((target as number) / scaleMax) * 100 : null

  const met = hasTarget ? (better === 'lower' ? value <= (target as number) : value >= (target as number)) : null
  // "Near" = missed the target but within 15% of it — worth a nudge, not an alarm.
  const near =
    hasTarget && !met ? Math.abs(value - (target as number)) / Math.max(Math.abs(target as number), 1) <= 0.15 : false

  const resolvedTone: Exclude<MeterBarTone, 'auto'> =
    tone !== 'auto' ? tone : met === null || met ? 'neutral' : near ? 'warning' : 'error'

  const noteText = hasTarget ? (targetLabel ?? `target ${better === 'lower' ? '<' : ''}${fmt(target as number)}`) : null

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <div className={styles.row} data-tone={resolvedTone} data-emphasis={emphasis}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{fmt(value)}</span>

        {/* Decorative: label, value and note already carry the same information
            as text, so the bar is hidden from screen readers instead of being
            announced as a second, redundant reading of the row. */}
        <span className={styles.track} aria-hidden="true">
          <span className={styles.fill} style={{ width: `${valuePct}%` }} />
          {targetPct !== null && <span className={styles.tick} style={{ left: `${targetPct}%` }} />}
        </span>

        <span className={styles.note}>
          {noteText}
          {met === true && (
            <>
              <svg className={styles.check} viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                <path
                  d="M2.5 6.4 4.8 8.7 9.5 3.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.srOnly}>target met</span>
            </>
          )}
          {note && <span className={styles.noteExtra}>{note}</span>}
        </span>
      </div>
    </div>
  )
}
