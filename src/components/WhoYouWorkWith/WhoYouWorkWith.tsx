import type { ReactNode } from 'react'
import { AnimatedSection } from '../AnimatedSection'
import styles from './WhoYouWorkWith.module.css'

export interface WhoYouWorkWithProps {
  eyebrow?: string
  name?: string
  role?: string
  photoSrc?: string
  photoAlt?: string
  summaryLabel?: string
  /** Bio revealed when the disclosure is expanded. Falls back to the DP default. */
  children?: ReactNode
  id?: string
}

const DEFAULT_BIO = (
  <>
    <p>
      I spent close to 10 years selling B2B before I touched a single automation. Quota, cold
      calls, discovery calls, the whole thing. Then I got tired of watching good offers die in
      bad prospecting, so I went technical and learned to build the systems myself.
    </p>
    <p>
      Since then I have built and operated outbound infrastructure end to end: 342,000+ cold
      emails sent across client portfolios, 3,276 inboxes on 89 domains operated without losing
      deliverability discipline, and 6 client engagements running in parallel across 4 markets in
      3 languages. The stack is Clay, SmartLead, Instantly, Apollo, and Claude.
    </p>
    <p>
      That double background is the point. The copy converts because I carried a quota. The data
      holds because I build like an engineer. Every client works directly with me: the person who
      scopes your system is the same person who builds it, launches it, and documents it so your
      team can run it without me.
    </p>
    <p>The mate cup in the logo is not a stock icon. It is on my desk right now.</p>
  </>
)

/**
 * WhoYouWorkWith — founder section. Shows the founder's photo and identity, with
 * a native <details> disclosure that keeps the long bio collapsed until the
 * visitor chooses to expand it.
 */
export function WhoYouWorkWith({
  eyebrow = 'WHO YOU WORK WITH',
  name = 'Leandro Brufal',
  role = 'Founder & GTM Engineer',
  photoSrc = '/leandro-brufal.jpg',
  photoAlt,
  summaryLabel = 'Read my background',
  children,
  id = 'who-you-work-with',
}: WhoYouWorkWithProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <AnimatedSection animation="fade-up" once>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.h2}>{name}</h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" once delay={100}>
          <div className={styles.card}>
            <img
              src={photoSrc}
              alt={photoAlt ?? name}
              className={styles.photo}
              width={96}
              height={96}
              loading="lazy"
            />
            <div className={styles.body}>
              <p className={styles.role}>{role}</p>
              <details className={styles.disclosure}>
                <summary className={styles.summary}>
                  <span>{summaryLabel}</span>
                  <span className={styles.chev} aria-hidden="true">›</span>
                </summary>
                <div className={styles.bio}>{children ?? DEFAULT_BIO}</div>
              </details>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
