import type { CSSProperties, ReactNode } from 'react'
import { AnimatedSection } from '../AnimatedSection'
import type { LinkRenderer } from '../BlogCard'
import styles from './CaseStudyCard.module.css'

export type CaseMetricAccent = 'primary' | 'secondary' | 'tertiary' | 'sky' | 'plum'

export interface CaseMetricLike {
  value: string
  label: string
  accent?: CaseMetricAccent
}

export interface CaseStudyLike {
  slug: string
  industry: string
  headline: string
  excerpt: string
  heroMetrics: CaseMetricLike[]
}

export interface CaseStudyCardProps {
  case: CaseStudyLike
  delay?: number
  /** Base path for the case link. Default: "/case-studies". */
  hrefBase?: string
  /** Base path for the background image. Default: "/images/cases". */
  imageBase?: string
  /** Custom link renderer (e.g. a router Link). Default renders an <a>. */
  renderLink?: LinkRenderer
}

function accentVar(accent?: CaseMetricAccent): string {
  switch (accent) {
    case 'primary': return 'var(--dp-color-primary)'
    case 'secondary': return 'var(--dp-color-secondary)'
    case 'tertiary': return 'var(--dp-color-tertiary)'
    case 'sky': return 'var(--dp-color-sky-blue)'
    case 'plum': return 'var(--dp-color-plum-text)'
    default: return 'var(--dp-color-on-surface)'
  }
}

const defaultRenderLink: LinkRenderer = ({ href, className, children, ...rest }) => (
  <a href={href} className={className} {...rest}>{children}</a>
)

/**
 * CaseStudyCard — case preview: industry eyebrow, headline, a two-metric result
 * pair (accent-coloured), excerpt, and a "View case" link over a background
 * image. Router-agnostic via `renderLink`.
 */
export function CaseStudyCard({
  case: cs,
  delay = 0,
  hrefBase = '/case-studies',
  imageBase = '/images/cases',
  renderLink = defaultRenderLink,
}: CaseStudyCardProps) {
  const href = `${hrefBase}/${cs.slug}`
  return (
    <AnimatedSection animation="fade-up" delay={delay} once className={styles.cardWrapper}>
      <article
        className={styles.card}
        aria-label={`Case study: ${cs.headline}`}
        style={{ '--card-bg': `url('${imageBase}/${cs.slug}.jpg')` } as CSSProperties}
      >
        <p className={styles.cardEyebrow}>{cs.industry}</p>
        <h3 className={styles.cardHeadline}>{cs.headline}</h3>

        <div className={styles.metricsRow}>
          {cs.heroMetrics.slice(0, 2).map((m, j) => (
            <div key={j} className={styles.metric}>
              <span className={styles.metricValue} style={{ color: accentVar(m.accent) }}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.excerpt}>{cs.excerpt}</p>

        {renderLink({
          href,
          className: styles.cta,
          'aria-label': `View case study: ${cs.headline}`,
          children: 'View case →' as ReactNode,
        })}
      </article>
    </AnimatedSection>
  )
}
