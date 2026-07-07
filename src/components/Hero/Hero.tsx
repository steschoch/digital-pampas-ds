import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { HeroDiagram } from './HeroDiagram'
import { NetworkBgV2 } from '../NetworkBg/NetworkBgV2'
import styles from './Hero.module.css'

export interface HeroMetric {
  value: string
  label: string
}

export interface HeroCTA {
  label: ReactNode
  href: string
}

export interface HeroProps {
  eyebrow?: ReactNode
  title?: ReactNode
  /** Accented second line of the headline. */
  titleAccent?: ReactNode
  subheadline?: ReactNode
  primaryCta?: HeroCTA
  ghostCta?: HeroCTA
  microcopy?: ReactNode
  metrics?: HeroMetric[]
  /** Override the network background canvas. Defaults to NetworkBgV2. */
  networkSlot?: ReactNode
  /** Right-column visual. Defaults to the animated HeroDiagram. */
  diagramSlot?: ReactNode
  id?: string
}

const DEFAULT_METRICS: HeroMetric[] = [
  { value: '1.58%', label: 'bounce rate' },
  { value: '340k+', label: 'sends' },
  { value: '95%+', label: 'email accuracy' },
  { value: '3+', label: 'verification providers' },
  { value: '~4 weeks', label: 'to live' },
]

/**
 * Hero — landing hero: copy + CTAs on the left, animated diagram on the right,
 * a masked network background, and a full-bleed metrics strip.
 */
export function Hero({
  eyebrow = (
    <>B2B Outbound Infrastructure&nbsp;&middot;&nbsp;Built on Clay</>
  ),
  title = (
    <>The machine that fills your pipeline.<br /></>
  ),
  titleAccent = "You keep it when we're done.",
  subheadline = "We build your full outbound system, ICP to inbox, on your own domains. Live in about four weeks. Then it's yours to run.",
  primaryCta = { label: 'Book a 15-min call', href: '#book-call' },
  ghostCta = { label: <>See how we build it&nbsp;&rarr;</>, href: '#how-it-works' },
  microcopy = (
    <>15-minute call&nbsp;&middot;&nbsp;No pitch deck&nbsp;&middot;&nbsp;No commitment</>
  ),
  metrics = DEFAULT_METRICS,
  networkSlot,
  diagramSlot,
  id = 'hero',
}: HeroProps = {}) {
  return (
    <section className={styles.section} id={id}>
      {networkSlot ?? <NetworkBgV2 className={styles.networkMask} />}
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.left}>
            <p className={styles.eyebrow}>{eyebrow}</p>

            <h1 className={styles.h1}>
              {title}
              <span className={styles.h1Accent}>{titleAccent}</span>
            </h1>

            <p className={styles.subheadline}>{subheadline}</p>

            <div className={styles.actions}>
              <a href={primaryCta.href} className={styles.btnPrimary}>{primaryCta.label}</a>
              <a href={ghostCta.href} className={styles.btnGhost}>{ghostCta.label}</a>
            </div>

            <p className={styles.microcopy}>{microcopy}</p>
          </div>

          <div className={styles.right} aria-hidden="true">
            {diagramSlot ?? <HeroDiagram />}
          </div>

        </div>
      </div>

      <div className={styles.metricsStrip} aria-label="Key performance metrics">
        {metrics.map((m, i) => (
          <Fragment key={m.value}>
            {i > 0 && <span className={styles.metricSep} aria-hidden="true">&middot;</span>}
            <span className={styles.metricItem}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
