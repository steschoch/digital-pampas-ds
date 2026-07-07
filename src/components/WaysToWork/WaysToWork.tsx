import { AnimatedSection } from '../AnimatedSection'
import styles from './WaysToWork.module.css'

export interface Engagement {
  num: string
  title: string
  body: string
  cta: string
  tinted?: boolean
}

export interface WaysToWorkProps {
  eyebrow?: string
  title?: string
  engagements?: Engagement[]
  ctaHref?: string
  id?: string
}

const DEFAULT_ENGAGEMENTS: Engagement[] = [
  {
    num: '01',
    title: 'Full-stack outbound build.',
    body: 'For founders and sales leaders with no SDR team, or a team buried in manual prospecting. We build the complete engine, ICP to inbox, and hand it over. You own it.',
    cta: 'This is me →',
    tinted: false,
  },
  {
    num: '02',
    title: 'Agency infrastructure partner.',
    body: 'For outbound agencies that need a technical partner behind their client campaigns. End-to-end data infrastructure, multi-language, built to scale, without leaving you dependent on us.',
    cta: 'This is me →',
    tinted: false,
  },
  {
    num: '03',
    title: 'Technical audit.',
    body: 'A one-week diagnostic of your CRM, domain reputation, data, and sequences, with a written report and a plan. The low-commitment way to start.',
    cta: 'Start here →',
    tinted: true,
  },
]

/**
 * WaysToWork — three engagement models as a 3-column card grid. The last card
 * can be tinted to highlight the low-commitment entry point.
 */
export function WaysToWork({
  eyebrow = 'WAYS TO WORK TOGETHER',
  title = 'Three ways to build with us.',
  engagements = DEFAULT_ENGAGEMENTS,
  ctaHref = '#book-call',
  id = 'ways',
}: WaysToWorkProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>

        <AnimatedSection animation="fade-up" once>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.h2}>{title}</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {engagements.map((e, i) => (
            <AnimatedSection
              key={e.num}
              animation="fade-up"
              once
              delay={i * 100}
              className={styles.cardWrapper}
            >
              <article className={[styles.card, e.tinted ? styles.cardTinted : ''].join(' ')}>
                <span className={styles.num}>{e.num}</span>
                <h3 className={styles.cardTitle}>{e.title}</h3>
                <p className={styles.cardBody}>{e.body}</p>
                <a
                  href={ctaHref}
                  className={[styles.cardCta, e.tinted ? styles.cardCtaTinted : ''].join(' ')}
                >
                  {e.cta}
                </a>
              </article>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
