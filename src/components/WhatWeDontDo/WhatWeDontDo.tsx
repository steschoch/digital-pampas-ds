import { AnimatedSection } from '../AnimatedSection'
import styles from './WhatWeDontDo.module.css'

export type WhatWeDontDoCard = {
  num: string
  title: string
  body: string
}

export interface WhatWeDontDoProps {
  /** Small uppercase label above the heading */
  eyebrow?: string
  /** Section heading */
  title?: string
  /** The disqualifier cards (2×2 grid). Defaults to the Digital Pampas copy. */
  cards?: WhatWeDontDoCard[]
  /** Anchor id for in-page navigation */
  id?: string
}

/** Default content — Digital Pampas. Override via props for other products. */
const DEFAULT_CARDS: WhatWeDontDoCard[] = [
  {
    num: '01',
    title: 'Not a fractional SDR.',
    body: "We don't send 50 emails a day on your behalf. We build the system that does it, then hand you the keys.",
  },
  {
    num: '02',
    title: 'Not a tool setup service.',
    body: "You won't get a Clay login, a Loom, and 'good luck.' You get a working engine, documented, that keeps running after we're gone.",
  },
  {
    num: '03',
    title: 'Not a vanishing retainer.',
    body: "No discovery decks. No 90-day 'strategy.' We build in week one. Three months in, you own infrastructure, not a dependency on us.",
  },
  {
    num: '04',
    title: 'Not for pre-revenue guessing.',
    body: "No closed deals and no clear ICP yet? Outbound just scales the wrong message faster. Come back once you know who buys.",
  },
]

/**
 * WhatWeDontDo — honest-filter section. A 2×2 grid of "what we don't do" cards
 * that pre-qualifies visitors and builds trust through candor.
 */
export function WhatWeDontDo({
  eyebrow = 'Honest Filter',
  title = "What we don't do.",
  cards = DEFAULT_CARDS,
  id = 'what-we-dont-do',
}: WhatWeDontDoProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <AnimatedSection animation="fade-up" once delay={0}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.h2}>{title}</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <AnimatedSection
              key={card.num}
              animation="fade-up"
              once
              delay={i * 100}
              className={styles.cardWrapper}
            >
              <article className={styles.card}>
                <span className={styles.num} aria-hidden="true">{card.num}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
