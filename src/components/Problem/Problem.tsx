import { AnimatedSection } from '../AnimatedSection'
import styles from './Problem.module.css'

export interface ProblemColumn {
  header: string
  items: string[]
}

export interface ProblemProps {
  eyebrow?: string
  title?: string
  body?: string
  bad?: ProblemColumn
  good?: ProblemColumn
  closing?: string
  closingLabel?: string
  closingHref?: string
  id?: string
}

const DEFAULT_BAD: ProblemColumn = {
  header: 'How the category does it',
  items: [
    'Buy a generic list',
    'Blast thousands of emails',
    'Burned domain reputation',
    "Leads that don't match your ICP",
  ],
}

const DEFAULT_GOOD: ProblemColumn = {
  header: 'What we do instead',
  items: [
    'Qualify by ICP criteria first',
    'Verify through 3+ providers',
    'Detect buying signals',
    'Write to fit, not to blast',
  ],
}

/**
 * Problem — before/after contrast section. A "bad way" column (coral) vs. the
 * "our way" column (cyan), framing the core problem statement.
 */
export function Problem({
  eyebrow = 'The real problem with outbound',
  title = 'Most agencies buy a list and start blasting.',
  body = "You get high bounce rates, a burned domain, and leads that don't match your ICP. The problem was never the intent. It was the architecture.",
  bad = DEFAULT_BAD,
  good = DEFAULT_GOOD,
  closing = "Higher reply rates. Fewer bounces. Leads that convert. And when we're done, you own it. Not us. You.",
  closingLabel = 'See the full process',
  closingHref = '#how-it-works',
  id = 'problem',
}: ProblemProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>

        <AnimatedSection animation="fade-up" once delay={0}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.body}>{body}</p>
        </AnimatedSection>

        <div className={styles.contrastGrid}>
          <AnimatedSection animation="slide-left" once delay={80} className={styles.contrastCell}>
            <div className={styles.cardBad}>
              <div className={styles.cardHeader}>
                <span className={styles.iconBad} aria-hidden="true">&#10007;</span>
                <span className={styles.headerBad}>{bad.header}</span>
              </div>
              <ul className={styles.itemList} role="list">
                {bad.items.map((item) => (
                  <li key={item} className={styles.itemBad}>{item}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-right" once delay={160} className={styles.contrastCell}>
            <div className={styles.cardGood}>
              <div className={styles.cardHeader}>
                <span className={styles.iconGood} aria-hidden="true">&#10003;</span>
                <span className={styles.headerGood}>{good.header}</span>
              </div>
              <ul className={styles.itemList} role="list">
                {good.items.map((item) => (
                  <li key={item} className={styles.itemGood}>{item}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fade-up" once delay={240}>
          <p className={styles.closing}>{closing}</p>
          <a href={closingHref} className={styles.closingLink}>{closingLabel}</a>
        </AnimatedSection>

      </div>
    </section>
  )
}
